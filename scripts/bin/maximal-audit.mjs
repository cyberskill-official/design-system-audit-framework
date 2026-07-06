#!/usr/bin/env node
// @ts-check
import fs, { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, extname, join, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { execSync } from "node:child_process";
import { createHash } from "node:crypto";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const TEXT_EXT = new Set([".md", ".mdx", ".txt", ".json", ".js", ".mjs", ".ts", ".tsx", ".html", ".css", ".yml", ".yaml", ".csv"]);
const SKIP_DIRS = new Set([".git", "node_modules", "dist", "coverage", ".next", ".vercel", ".cyberos-memory", "meta", "_audit", "test-results", "playwright-report"]);
/**
 * The engine's own outputs must never become audit input — ingesting a prior
 * report/baseline feeds rubric vocabulary back into the mentions band and
 * silently inflates every later run (self-reference loop).
 */
const SKIP_FILES = new Set(["scores.json", "audit-baseline.json", "analyzed_design_report.md", "improved_design.md", "audit_diff.md", "evidence-index.json", "gap-report.json"]);
/** Display-text budget for the report only. Scoring uses the full corpus (searchText). */
const MAX_TEXT = 180000;
/** Per-file and total scanning budgets for the scoring corpus. */
const MAX_FILE_SCAN = 2_000_000;
const MAX_TOTAL_SCAN = 24_000_000;
const DEFAULT_MAX_FILES = 1200;
const CRITERIA_FILES = ["docs/framework/03-full-criteria.md"];
const DSAF25_FILE = "docs/framework/dsaf-25.md";

/** Engine semantic version. Bump on any scoring-behaviour change. */
export const ENGINE_VERSION = "2.0.0";

/** @returns {string} rubric version parsed from dsaf-25.md frontmatter (shared stamp). */
function loadRubricVersion() {
  const match = /dsaf_125_version:\s*"([^"]+)"/.exec(safeRead(resolve(ROOT, DSAF25_FILE)));
  return match?.[1] ?? "unversioned";
}

/**
 * Domain synonyms. When a criterion keyword has an entry here, any variant hit
 * counts as a hit for that keyword. Keep small and reviewed — every entry is a
 * deliberate vocabulary equivalence, not a fuzzy matcher.
 * @type {Record<string, string[]>}
 */
const SYNONYMS = {
  storybook: ["stories", "story explorer"],
  semver: ["semantic versioning"],
  accessibility: ["a11y"],
  a11y: ["accessibility"],
  localization: ["localisation", "l10n", "i18n"],
  internationalization: ["internationalisation", "i18n"],
  changelog: ["change log", "keep a changelog"],
  dark: ["dark-mode", "dark mode"],
  oklch: ["ok lch"],
  contrast: ["apca", "wcag contrast"],
  telemetry: ["analytics", "instrumentation"],
  governance: ["rfc process", "decision process"],
  heuristic: ["heuristics", "nielsen"],
  research: ["user research", "usability study"],
  provenance: ["c2pa", "content credentials"],
  sustainability: ["wsg", "carbon footprint"],
  versioning: ["semver", "semantic versioning"]
};

/**
 * @typedef {Object} DsafConfig
 * @property {Record<string, string[]>} [extraKeywords] criterion-id -> extra keywords
 * @property {string[]} [excludePaths] substrings; matching paths are skipped
 * @property {number} [maxFiles]
 * @property {"full"|"dsaf-25"} [profile]
 */

/**
 * Load an optional dsaf.config.json from the target root (file input: its directory).
 * @param {string} inputPath
 * @returns {DsafConfig}
 */
function loadTargetConfig(inputPath) {
  try {
    const st = statSync(inputPath);
    const root = st.isDirectory() ? inputPath : dirname(inputPath);
    const raw = safeRead(join(root, "dsaf.config.json"));
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

/** @returns {Set<string>} the 25 core criterion ids parsed from dsaf-25.md */
export function loadDsaf25Ids() {
  const ids = new Set();
  const text = safeRead(resolve(ROOT, DSAF25_FILE));
  for (const line of text.split(/\r?\n/)) {
    const match = /^\|\s*\d+\s*\|\s*([AB]\d+\.\d+)\s*\|/.exec(line);
    if (match) ids.add(match[1]);
  }
  return ids;
}

/**
 * @typedef {Object} DsafCriterion
 * @property {string} id
 * @property {string} criterion
 * @property {string} tag
 * @property {string} category
 * @property {string} source
 * @property {string[]} refs
 * @property {string} [type]
 * @property {number} [score]
 * @property {string} [level]
 * @property {string} [confidence]
 * @property {{mentions: number, artifacts: number, verification: number}} [bands]
 * @property {string} [evidence]
 * @property {string[]} [missing]
 * @property {string} [missingSignals]
 * @property {string} [suggestion]
 * @property {string} [requiredProof]
 * @property {string} [acceptanceGate]
 * @property {string} [outputAction]
 * @property {string[]} [keywords]
 */

/**
 * @typedef {Object} SourcePage
 * @property {string} url
 * @property {boolean} ok
 * @property {number} status
 * @property {string} title
 * @property {string} html
 * @property {string} text
 */

/**
 * @typedef {Object} AuditSource
 * @property {"url"|"file"} kind
 * @property {string} input
 * @property {string} title
 * @property {SourcePage[]} pages
 * @property {string[]} files
 * @property {Map<string, string>} [contents]
 * @property {string} [root]
 * @property {string} text          display excerpt (MAX_TEXT budget, report only)
 * @property {string} searchText    full lowercased scoring corpus (no global truncation)
 * @property {string} fullText
 * @property {string} [primary]
 * @property {string} [primaryText]
 */

const EVIDENCE_SOURCES = [
  ["DSAF-A", "DSAF Part A criteria", "local source", "docs/framework/03-criteria-part-a.md", "2026-05-24", "A"],
  ["DSAF-B", "DSAF Part B criteria", "local source", "docs/framework/04-criteria-part-b.md", "2026-05-24", "A"],
  ["DTCG-2025.10", "Design Tokens Format Module 2025.10", "official standard", "https://www.w3.org/community/reports/design-tokens/CG-FINAL-format-20251028/", "2026-05-24", "A"],
  ["WCAG-2.2", "Web Content Accessibility Guidelines 2.2", "official standard", "https://www.w3.org/TR/WCAG22/", "2026-05-24", "A"],
  ["ARIA-APG", "ARIA Authoring Practices Guide", "official guidance", "https://www.w3.org/WAI/ARIA/apg/", "2026-05-24", "A"],
  ["CARBON-A11Y", "IBM Carbon accessibility guidance", "official design-system guidance", "https://carbondesignsystem.com/guidelines/accessibility/overview/", "2026-05-24", "A"],
  ["CARBON-AI", "IBM Carbon AI label usage", "official design-system guidance", "https://carbondesignsystem.com/components/ai-label/usage/", "2026-05-24", "A"],
  ["GOVUK-A11Y", "GOV.UK Design System accessibility", "official design-system guidance", "https://design-system.service.gov.uk/accessibility/", "2026-05-24", "A"],
  ["REACT-ARIA", "Adobe React Aria accessibility primitives", "official implementation guidance", "https://react-aria.adobe.com/", "2026-05-24", "A"],
  ["FLUENT-TOKENS", "Fluent 2 design tokens", "official design-system guidance", "https://fluent2.microsoft.design/design-tokens", "2026-05-24", "A"],
  ["POLARIS-TOKENS", "Shopify Polaris color tokens", "official design-system guidance", "https://polaris-react.shopify.com/design/colors/color-tokens", "2026-05-24", "A"],
  ["PRIMER-COLOR", "GitHub Primer color usage", "official design-system guidance", "https://primer.style/product/getting-started/foundations/color-usage/", "2026-05-24", "B"],
  ["MATERIAL-EXPRESSIVE", "Material 3 Expressive design language", "official platform guidance", "https://developer.android.com/design/ui/wear/guides/get-started/design-language?hl=en", "2026-05-24", "A"],
  ["APPLE-GLASS", "Apple WWDC25 Liquid Glass", "official platform guidance", "https://developer.apple.com/videos/play/wwdc2025/219/", "2026-05-24", "A"],
  ["ATLASSIAN-TOKENS", "Atlassian design tokens", "official design-system guidance", "https://atlassian.design/foundations/design-tokens/", "2026-05-24", "B"],
  ["SAP-FIORI", "SAP Fiori for Web", "official design-system guidance", "https://www.sap.com/design-system/fiori-design-web", "2026-05-24", "A"],
  ["SALESFORCE-A11Y", "Salesforce base component accessibility", "official platform guidance", "https://developer.salesforce.com/docs/platform/lwc/guide/base-components-accessibility.html", "2026-05-24", "A"],
  ["ANT-DESIGN", "Ant Design specification introduction", "official design-system guidance", "https://ant.design/docs/spec/introduce/", "2026-05-24", "A"],
  ["C2PA", "Coalition for Content Provenance and Authenticity specifications", "official specification", "https://c2pa.org/specifications/specifications/2.2/index.html", "2026-05-24", "B"],
  ["WSG", "Web Sustainability Guidelines", "official guideline", "https://w3c.github.io/sustainableweb-wsg/", "2026-05-24", "B"]
];

/** @returns {string} */
function usage() {
  return [
    "Usage: node scripts/bin/maximal-audit.mjs --input <DESIGN.md|repo|url> --out <dir> [--mode analyze|improve|both] [--profile full|dsaf-25] [--model <id>] [--max-pages 8]",
    "",
    "The target repo may carry a dsaf.config.json ({ extraKeywords, excludePaths, maxFiles, profile }).",
    "",
    "Outputs:",
    "  ANALYZED_DESIGN_REPORT.md   scores, category roll-up, enterprise floors, evidence",
    "  scores.json                 machine-readable scores (dsaf-scores/1) for diff/trend",
    "  output-improved/IMPROVED_DESIGN.md",
    "  output-artifacts/evidence-index.json"
  ].join("\n");
}

/** @returns {DsafCriterion[]} */
function loadDsafCriteria() {
  /** @type {DsafCriterion[]} */
  const rows = [];
  for (const file of CRITERIA_FILES) {
    const source = safeRead(resolve(ROOT, file));
    let category = "Uncategorised";
    for (const line of source.split(/\r?\n/)) {
      const categoryMatch = /^##\s+([AB]\.\d+\s+—\s+.+)$/.exec(line);
      if (categoryMatch) category = categoryMatch[1];
      const cells = line.split("|").map((/** @type {string} */ cell) => cell.trim());
      const rowMatch = /^([AB]\d+\.\d+)$/.exec(cells[1] ?? "");
      if (!rowMatch) continue;
      rows.push({
        id: rowMatch[1],
        criterion: (cells[2] ?? "").replace(/\*\*/g, "").replace(/`/g, "").replace(/\s+/g, " ").trim(),
        tag: cells[3] ?? "DYNAMIC",
        category,
        source: file,
        refs: [file.includes("part-a") ? "DSAF-A" : "DSAF-B"]
      });
    }
  }
  return rows;
}

/**
 * @param {string} text
 * @returns {"MANUAL"|"AUTO"}
 */
function inferType(text) {
  return /manual|counsel|lawyer|legal review|independent|third-party|external|customer|community|pilot|production|telemetry|sign-off|executive|human|research|interview|workshop|designer workflow|assistive|nvda|jaws|voiceover|talkback|calibration|evaluator/i.test(text)
    ? "MANUAL"
    : "AUTO";
}

const DSAF_CRITERIA = loadDsafCriteria().map((item) => ({
  ...item,
  type: inferType(`${item.category} ${item.criterion}`),
  refs: item.refs ?? [item.id.startsWith("A") ? "DSAF-A" : "DSAF-B"]
}));
const ALL_CRITERIA = [...DSAF_CRITERIA];

/** Words excluded from criterion keyword extraction (see keywordsForCriterion). */
const KEYWORD_STOPWORDS = new Set([
  // Grammatical / connective filler.
  "the", "and", "or", "with", "for", "per", "into", "itself", "like", "etc",
  "all", "one", "some", "none", "that", "this", "are", "via", "from", "each",
  "must", "should", "across", "where", "when", "your", "they", "them",
  // Near-universal design-system words that appear in almost every document and
  // therefore carry no discriminating signal. Leaving these in lets a doc score
  // highly just by being "about design", and inflates every criterion. The real
  // signal lives in the specific terms (primitive, semantic, elevation, OKLCH,
  // container, etc.), so the generic umbrella words are dropped.
  "design", "designs", "system", "systems", "token", "tokens", "weight",
  "class", "style", "styles", "component", "components", "support", "supported"
]);

/**
 * @param {string} criterion
 * @returns {string[]}
 */
export function keywordsForCriterion(criterion) {
  const text = criterion
    .toLowerCase()
    .replace(/[`*_()[\]/.,:;→+&%"'-]/g, " ");
  return [...new Set(
    text
      .split(/\s+/)
      .filter((/** @type {string} */ word) => word.length >= 4 && !KEYWORD_STOPWORDS.has(word))
  )].slice(0, 8);
}

/**
 * @param {string} path
 * @returns {string}
 */
function safeRead(path) {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "";
  }
}

/**
 * @param {string} html
 * @returns {string}
 */
function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, "\"")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * @param {string} html
 * @param {string} fallback
 * @returns {string}
 */
function extractTitle(html, fallback) {
  const match = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html);
  return stripHtml(match?.[1] ?? fallback);
}

/**
 * @param {string} html
 * @param {string} baseUrl
 * @returns {string[]}
 */
function extractLinks(html, baseUrl) {
  const links = [];
  const base = new URL(baseUrl);
  const re = /href\s*=\s*["']([^"']+)["']/gi;
  let match;
  while ((match = re.exec(html))) {
    try {
      const url = new URL(match[1], base);
      if (url.hostname !== base.hostname) continue;
      if (!/^https?:$/.test(url.protocol)) continue;
      url.hash = "";
      if (/\.(png|jpg|jpeg|gif|webp|svg|ico|pdf|zip|mp4|mov|css|js|json|xml|txt)$/i.test(url.pathname)) continue;
      if (/\/(assets|static|fonts|images|img)\//i.test(url.pathname)) continue;
      links.push(url.toString());
    } catch {
      // Ignore malformed links.
    }
  }
  return [...new Set(links)];
}

/**
 * @param {string} url
 * @returns {Promise<SourcePage>}
 */
async function fetchPage(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "user-agent": "DSAF-Maximal-Audit/0.1 (+https://audit.cyberskill.world)",
        "accept": "text/html, text/plain;q=0.9, */*;q=0.8"
      }
    });
    const text = await response.text();
    return { url, ok: response.ok, status: response.status, title: extractTitle(text, url), html: text, text: stripHtml(text) };
  } catch (error) {
    return { url, ok: false, status: 0, title: url, html: "", text: `Fetch failed: ${error instanceof Error ? error.message : String(error)}` };
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * @param {string} root
 * @param {number} [limit=DEFAULT_MAX_FILES]
 * @param {string[]} [excludePaths=[]]
 * @returns {string[]}
 */
function walkLocalFiles(root, limit = DEFAULT_MAX_FILES, excludePaths = []) {
  /** @type {string[]} */
  const files = [];
  /** @param {string} dir */
  function walk(dir) {
    if (files.length >= limit) return;
    /** @type {string[]} */
    let entries;
    try {
      entries = readdirSync(dir);
    } catch {
      return; // Unreadable directory (permissions, race): skip rather than crash.
    }
    for (const entry of entries) {
      if (entry.startsWith(".") && entry !== ".github") continue;
      if (SKIP_DIRS.has(entry)) continue;
      if (SKIP_FILES.has(entry.toLowerCase())) continue;
      const path = join(dir, entry);
      if (excludePaths.some((needle) => needle && path.includes(needle))) continue;
      let st;
      try {
        // statSync follows symlinks: valid links to real files are included,
        // but broken/dangling symlinks (and other stat failures) throw.
        st = statSync(path);
      } catch {
        continue; // Broken symlink or unreadable entry: skip, do not crash the audit.
      }
      if (st.isDirectory()) walk(path);
      else if (st.isFile() && TEXT_EXT.has(extname(path).toLowerCase()) && st.size <= MAX_FILE_SCAN) files.push(path);
      if (files.length >= limit) return;
    }
  }
  let rootStat;
  try {
    rootStat = statSync(root);
  } catch {
    return files; // Root missing or unreadable: return empty rather than throwing.
  }
  if (rootStat.isDirectory()) walk(root);
  return files;
}

/**
 * @param {string} input
 * @param {number} maxPages
 * @param {string} outDir
 * @param {DsafConfig} [config={}]
 * @returns {Promise<AuditSource>}
 */
async function loadInput(input, maxPages, outDir, config = {}) {
  const fixturesDir = join(outDir, "input-fixtures");
  
  if (/^https?:\/\/github\.com/i.test(input)) {
    // Only create after clone, or let git clone create it
    if (fs.existsSync(fixturesDir)) {
      fs.rmSync(fixturesDir, { recursive: true, force: true });
    }
    console.log(`[loadInput] Cloning repository ${input} into fixtures...`);
    try {
      execSync(`git clone --depth 1 ${input} ${fixturesDir}`, { stdio: 'ignore' });
    } catch (err) {
      console.log(`[loadInput] Clone failed or partially failed, proceeding with whatever was fetched.`);
      if (!fs.existsSync(fixturesDir)) {
        fs.mkdirSync(fixturesDir, { recursive: true });
      }
    }
    input = fixturesDir; // Treat as local folder from now on
  } else if (/^https?:\/\//i.test(input)) {
    mkdirSync(fixturesDir, { recursive: true });
    const seen = new Set();
    const queue = [input];
    /** @type {SourcePage[]} */
    const pages = [];
    let pageIndex = 1;
    while (queue.length && pages.length < maxPages) {
      const url = queue.shift();
      if (!url || seen.has(url)) continue;
      seen.add(url);
      const page = await fetchPage(url);
      pages.push(page);
      if (page.html) {
        writeFileSync(join(fixturesDir, `page-${pageIndex++}.html`), page.html, "utf8");
        for (const link of extractLinks(page.html, url)) {
          if (!seen.has(link) && queue.length < maxPages * 5) queue.push(link);
        }
      }
    }
    const urlFull = pages.map((page) => `# ${page.title}\nURL: ${page.url}\n\n${page.text}`).join("\n\n---\n\n");
    return {
      kind: "url",
      input,
      title: pages[0]?.title || input,
      pages,
      files: [],
      contents: new Map(),
      text: pages.map((page) => `# ${page.title}\nURL: ${page.url}\n${page.text}`).join("\n\n").slice(0, MAX_TEXT),
      searchText: urlFull.toLowerCase().slice(0, MAX_TOTAL_SCAN),
      fullText: urlFull
    };
  }

  const resolvedPath = resolve(input);
  if (!existsSync(resolvedPath)) throw new Error(`Input does not exist: ${resolvedPath}`);
  const st = statSync(resolvedPath);
  const root = st.isDirectory() ? resolvedPath : dirname(resolvedPath);
  const maxFiles = Number(config.maxFiles) > 0 ? Number(config.maxFiles) : DEFAULT_MAX_FILES;
  const excludePaths = Array.isArray(config.excludePaths) ? config.excludePaths : [];
  const files = st.isDirectory()
    ? walkLocalFiles(resolvedPath, maxFiles, excludePaths)
    : [resolvedPath, ...walkLocalFiles(root, Math.min(maxFiles, 400), excludePaths).filter((file) => file !== resolvedPath)];
  
  // Copy to fixtures — but never when the fixtures dir nests inside the input
  // tree (auditing a repo with --out inside that repo would recurse into itself).
  const fixturesInsideInput = st.isDirectory() && (fixturesDir === resolvedPath || fixturesDir.startsWith(resolvedPath + "/"));
  if (resolvedPath !== fixturesDir && !fixturesInsideInput) {
    mkdirSync(fixturesDir, { recursive: true });
    if (st.isDirectory()) {
      try {
        fs.cpSync(resolvedPath, fixturesDir, {
          recursive: true,
          // Skip dangling symlinks so one broken link cannot abort the whole copy.
          filter: (/** @type {string} */ src) => {
            try {
              fs.statSync(src);
              return true;
            } catch {
              return false;
            }
          }
        });
      } catch (e) { console.error(e); }
    } else {
      try { fs.copyFileSync(resolvedPath, join(fixturesDir, basename(resolvedPath))); } catch (e) { console.error(e) }
    }
  }

  const primary = st.isDirectory() ? files.find((file) => basename(file).toLowerCase() === "design.md") ?? files[0] : resolvedPath;

  // Read every scanned file ONCE into a content map. This map powers:
  //   - the display text (per-file 20k excerpt, MAX_TEXT budget, report only)
  //   - the full scoring corpus (searchText — no global truncation)
  //   - the structural evidence probes (buildEvidenceProfile)
  /** @type {Map<string, string>} */
  const contents = new Map();
  let totalScan = 0;
  for (const file of files) {
    if (totalScan >= MAX_TOTAL_SCAN) break;
    const body = safeRead(file).slice(0, MAX_FILE_SCAN);
    contents.set(file, body);
    totalScan += body.length;
  }
  const chunks = files.map((file) => `# ${file}\n${(contents.get(file) ?? "").slice(0, 20000)}`);
  return {
    kind: "file",
    input: resolvedPath,
    title: basename(primary ?? resolvedPath),
    pages: [],
    files,
    contents,
    root,
    primary,
    text: chunks.join("\n\n").slice(0, MAX_TEXT),
    searchText: [...contents.values()].join("\n").toLowerCase().slice(0, MAX_TOTAL_SCAN),
    primaryText: contents.get(primary ?? resolvedPath) ?? safeRead(primary ?? resolvedPath),
    fullText: contents.get(primary ?? resolvedPath) ?? safeRead(primary ?? resolvedPath)
  };
}

/**
 * @param {string} text
 * @param {string[]} needles
 * @returns {number}
 */
function countHits(text, needles) {
  const lower = text.toLowerCase();
  return needles.reduce((sum, needle) => sum + (lower.includes(needle.toLowerCase()) ? 1 : 0), 0);
}

// ─────────────────────────────────────────────────────────────────────────────
// Structural evidence probes (band 2 + band 3)
//
// The three-band model maps the deterministic score onto the 0–5 rubric anchors:
//   band 1 — mentions      (0..40)  prose keyword coverage; "Mentioned/Defined"
//   band 2 — artifacts     (0..40)  real files/configs in the scanned tree; "Built"
//   band 3 — verification  (0..20)  CI + tests + generated check outputs; "Measured"
// Prose alone can therefore never exceed 40/100, which is what the anchors say
// ("Defined: designed but not built or enforced"). Keyword-stuffing a doctrine
// document no longer moves a criterion past the Defined band.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @typedef {Object} EvidenceProfile
 * @property {boolean} isRepo
 * @property {Record<string, boolean|number>} probes
 * @property {Record<string, string[]>} satisfiedBy
 */

/**
 * @param {AuditSource} source
 * @returns {EvidenceProfile}
 */
export function buildEvidenceProfile(source) {
  /** @type {Record<string, boolean|number>} */
  const probes = {};
  /** @type {Record<string, string[]>} */
  const satisfiedBy = {};
  const isRepo = source.kind === "file" && source.files.length > 1;
  const relFiles = source.files.map((file) => (source.root ? relative(source.root, file) : file).toLowerCase());
  const corpus = source.searchText ?? "";

  /** @param {string} name @param {RegExp} pathRe */
  const pathProbe = (name, pathRe) => {
    const matched = [];
    for (let i = 0; i < relFiles.length; i++) {
      if (pathRe.test(relFiles[i])) matched.push(relFiles[i]);
      if (matched.length >= 5) break;
    }
    probes[name] = matched.length > 0;
    if (matched.length) satisfiedBy[name] = matched;
    return matched.length > 0;
  };
  /** @param {string} name @param {RegExp} pathRe */
  const pathCount = (name, pathRe) => {
    let count = 0;
    const matched = [];
    for (const rel of relFiles) {
      if (pathRe.test(rel)) {
        count++;
        if (matched.length < 5) matched.push(rel);
      }
    }
    probes[name] = count;
    if (matched.length) satisfiedBy[name] = matched;
    return count;
  };
  /** @param {string} name @param {string[]} needles any-match against the full corpus */
  const corpusProbe = (name, needles) => {
    const hit = needles.some((needle) => corpus.includes(needle));
    probes[name] = hit;
    if (hit) satisfiedBy[name] = [`corpus:${needles.find((needle) => corpus.includes(needle))}`];
    return hit;
  };
  /** Content probe over scanned json/config files. @param {string} name @param {RegExp} fileRe @param {RegExp} contentRe */
  const contentProbe = (name, fileRe, contentRe) => {
    const matched = [];
    if (source.contents) {
      for (const [file, body] of source.contents) {
        const rel = (source.root ? relative(source.root, file) : file).toLowerCase();
        if (!fileRe.test(rel)) continue;
        if (contentRe.test(body)) {
          matched.push(rel);
          if (matched.length >= 5) break;
        }
      }
    }
    probes[name] = matched.length > 0;
    if (matched.length) satisfiedBy[name] = matched;
    return matched.length > 0;
  };

  // Foundations & tokens
  contentProbe("tokensDtcg", /\.json$/, /"\$value"/);
  pathProbe("tokensFile", /tokens?[^/]*\.(json|css|ts|js)$/);
  pathProbe("tokensBuild", /tokens.*(build|generate)|(build|generate).*tokens/);
  corpusProbe("darkMode", ["prefers-color-scheme", "data-theme=\"dark\"", "data-theme='dark'", "[data-theme=\"dark\"]"]);
  pathProbe("multiPlatform", /(swift|kotlin|flutter|react-native|android|ios|figma).*(tokens|variables)|(tokens|variables).*(swift|kotlin|flutter|android|ios|figma)/);
  // Components
  pathCount("componentFiles", /\.(tsx|jsx|vue|svelte)$/);
  pathCount("storyFiles", /\.stories\.(tsx|jsx|ts|js|mdx)$/);
  pathProbe("componentSpecs", /component[-.]?(specs|catalog|contracts)/);
  corpusProbe("variantStates", ["variant"]);
  corpusProbe("stateModel", ["disabled", "focused"]);
  probes.variantAndStates = Boolean(probes.variantStates) && Boolean(probes.stateModel);
  // Documentation
  pathCount("docFiles", /\.(md|mdx)$/);
  pathProbe("storybookSetup", /(^|\/)\.storybook\/|storybook/);
  corpusProbe("usageGuidelines", ["usage guidelines", "when to use", "do and don"]);
  pathProbe("contributing", /(^|\/)contributing\.md$/);
  // Governance
  pathProbe("changelog", /(^|\/)changelog\.md$/);
  contentProbe("semverVersion", /(^|\/)package\.json$/, /"version"\s*:\s*"\d+\.\d+\.\d+/);
  pathProbe("rfcDir", /(^|\/)(rfcs?|proposals)(\/|$)|rfc-template/);
  corpusProbe("rfcProcess", ["rfc process", "rfc required", "request for comments"]);
  pathProbe("codeowners", /(^|\/)codeowners$/);
  pathProbe("security", /(^|\/)security\.md$/);
  pathProbe("license", /(^|\/)license(\.md|\.txt)?$/);
  corpusProbe("governanceDoc", ["governance"]);
  // Tooling & distribution
  pathCount("ciWorkflows", /\.github\/workflows\/.+\.(yml|yaml)$/);
  contentProbe("testScript", /(^|\/)package\.json$/, /"test"\s*:\s*"(?!echo)/);
  contentProbe("publishReady", /(^|\/)package\.json$/, /"(files|publishConfig|bin|exports)"\s*:/);
  pathProbe("figmaAssets", /figma/);
  // Adoption & metrics
  pathProbe("telemetry", /(coverage|telemetry|analytics|metrics|benchmark)[^/]*\.(json|csv|mjs|js|ts)$/);
  corpusProbe("adoptionTracking", ["adoption", "coverage %", "usage analytics"]);
  // Accessibility — a script that computes APCA/axe checks IS a11y tooling even
  // when its filename says "verify"; probe contents of executable files too.
  const a11yByPath = pathProbe("a11yTooling", /(apca|axe|pa11y|contrast|a11y|wcag)/);
  if (!a11yByPath) contentProbe("a11yTooling", /\.(mjs|js|ts)$/, /\bapca\b|axe-core|pa11y|contrast\s*ratio|wcag/i);
  probes.ariaUsage = (corpus.match(/aria-/g) || []).length >= 10;
  if (probes.ariaUsage) satisfiedBy.ariaUsage = ["corpus:aria- (>=10 uses)"];
  corpusProbe("contrastEvidence", ["apca", "wcag 2.2", "contrast ratio", "lc ≥", "lc >="]);
  corpusProbe("focusManagement", [":focus-visible", "focus trap", "focus ring", "focus restore"]);
  corpusProbe("reducedMotion", ["prefers-reduced-motion"]);
  // Performance & DX
  contentProbe("perfBudget", /(^|\/)package\.json$/, /"(size-limit|bundlesize)"|check-bundle-size/);
  pathProbe("bundleCheck", /(bundle-size|size-limit|bundlesize)/);
  corpusProbe("treeShaking", ["sideeffects", "tree-shak", "tree shak"]);
  // AI / emerging tech
  pathProbe("aiDoctrine", /(^|\/)(design\.md|llms\.txt)$/);
  pathProbe("aiRules", /(^|\/)(agents\.md|claude\.md|\.cursorrules|copilot-instructions\.md)$/);
  pathProbe("mcpServer", /mcp/);
  // UX-part evidence
  pathProbe("researchDocs", /(research|interview|persona|usability|survey)/);
  corpusProbe("iaEvidence", ["information architecture", "navigation model", "mental model", "sitemap"]);
  corpusProbe("interactionEvidence", ["error prevention", "undo", "confirmation dialog", "error recovery"]);
  corpusProbe("keyboardModel", ["keyboard"]);
  corpusProbe("hierarchyEvidence", ["visual hierarchy", "type scale", "grid system"]);
  corpusProbe("contentGuidelines", ["ux writing", "voice and tone", "content design", "microcopy"]);
  corpusProbe("localizationEvidence", ["localization", "localisation", "i18n", "vietnamese", "rtl"]);
  corpusProbe("heuristicEvidence", ["nielsen", "heuristic"]);
  corpusProbe("perfUxEvidence", ["core web vitals", "lcp", "inp", "cls"]);
  corpusProbe("privacyEthics", ["privacy", "consent", "pdpl", "gdpr", "ethics"]);
  corpusProbe("measurementEvidence", ["benchmark", "kpi", "success metric", "nps", "sus score"]);
  // Verification outputs (band 3)
  pathProbe("auditOutputs", /(_audit\/.+\.json|scores\.json|coverage\.json|conformance.*\.json)/);
  pathCount("testFiles", /(\.test\.|\.spec\.|__tests__\/|\/tests?\/)/);
  pathProbe("visualBaselines", /(__screenshots__|playwright|chromatic|percy)/);
  pathProbe("provenance", /(provenance|c2pa)/);

  return { isRepo, probes, satisfiedBy };
}

/**
 * Per-category artifact scoring (band 2, 0..40) and verification scoring (band 3, 0..20).
 * Category key is the criterion-id prefix ("A1".."A10", "B1".."B10").
 * Each entry lists [probeName, points]; boolean probes score full points, numeric
 * probes score full points at >= threshold and half at >= 1.
 * @type {Record<string, Array<[string, number, number?]>>}
 */
const ARTIFACT_RULES = {
  A1: [["tokensDtcg", 14], ["tokensFile", 10], ["tokensBuild", 6], ["darkMode", 4], ["multiPlatform", 6]],
  A2: [["componentFiles", 14, 5], ["storyFiles", 8, 3], ["componentSpecs", 10], ["variantAndStates", 8]],
  A3: [["docFiles", 12, 10], ["storybookSetup", 8], ["usageGuidelines", 8], ["contributing", 6], ["changelog", 6]],
  A4: [["changelog", 8], ["semverVersion", 6], ["rfcDir", 6], ["rfcProcess", 4], ["codeowners", 6], ["contributing", 4], ["governanceDoc", 3], ["security", 3]],
  A5: [["ciWorkflows", 14, 1], ["publishReady", 8], ["storybookSetup", 6], ["figmaAssets", 6], ["testScript", 6]],
  A6: [["darkMode", 16], ["multiPlatform", 14], ["tokensFile", 10]],
  A7: [["telemetry", 16], ["adoptionTracking", 12], ["auditOutputs", 12]],
  A8: [["a11yTooling", 16], ["ariaUsage", 8], ["contrastEvidence", 8], ["focusManagement", 4], ["reducedMotion", 4]],
  A9: [["perfBudget", 14], ["bundleCheck", 14], ["treeShaking", 6], ["perfUxEvidence", 6]],
  A10: [["aiDoctrine", 14], ["aiRules", 12], ["mcpServer", 14]],
  B1: [["researchDocs", 24], ["measurementEvidence", 16]],
  B2: [["iaEvidence", 28], ["researchDocs", 12]],
  B3: [["interactionEvidence", 20], ["keyboardModel", 20]],
  B4: [["hierarchyEvidence", 24], ["darkMode", 8], ["tokensFile", 8]],
  B5: [["a11yTooling", 14], ["ariaUsage", 6], ["contrastEvidence", 8], ["focusManagement", 6], ["localizationEvidence", 6]],
  B6: [["contentGuidelines", 24], ["localizationEvidence", 16]],
  B7: [["heuristicEvidence", 24], ["researchDocs", 16]],
  B8: [["perfUxEvidence", 24], ["perfBudget", 8], ["bundleCheck", 8]],
  B9: [["privacyEthics", 28], ["provenance", 12]],
  B10: [["measurementEvidence", 24], ["telemetry", 16]]
};

/** @type {Record<string, string>} category prefix -> band-3 verification probe */
const VERIFY_RULES = {
  A1: "tokensBuild", A2: "testFiles", A3: "auditOutputs", A4: "auditOutputs", A5: "ciWorkflows",
  A6: "visualBaselines", A7: "auditOutputs", A8: "a11yTooling", A9: "bundleCheck", A10: "auditOutputs",
  B1: "auditOutputs", B2: "auditOutputs", B3: "testFiles", B4: "visualBaselines", B5: "a11yTooling",
  B6: "auditOutputs", B7: "auditOutputs", B8: "bundleCheck", B9: "auditOutputs", B10: "auditOutputs"
};

/** @param {string} id @returns {string} */
export function categoryPrefixOf(id) {
  return /^([AB]\d+)\./.exec(id)?.[1] ?? "";
}

/**
 * @param {EvidenceProfile} profile
 * @param {string} prefix
 * @returns {{ points: number, satisfied: string[] }}
 */
function artifactBand(profile, prefix) {
  if (!profile.isRepo) return { points: 0, satisfied: [] };
  const rules = ARTIFACT_RULES[prefix] ?? [];
  let points = 0;
  const satisfied = [];
  for (const [probe, weight, threshold] of rules) {
    const value = profile.probes[probe];
    if (typeof value === "number") {
      const floor = threshold ?? 1;
      if (value >= floor) { points += weight; satisfied.push(`${probe}=${value}`); }
      else if (value >= 1) { points += Math.round(weight / 2); satisfied.push(`${probe}=${value}(partial)`); }
    } else if (value) {
      points += weight;
      satisfied.push(probe);
    }
  }
  return { points: Math.min(40, points), satisfied };
}

/**
 * @param {EvidenceProfile} profile
 * @param {string} prefix
 * @returns {{ points: number, satisfied: string[] }}
 */
function verificationBand(profile, prefix) {
  if (!profile.isRepo) return { points: 0, satisfied: [] };
  let points = 0;
  const satisfied = [];
  const ciAndTests = Number(profile.probes.ciWorkflows) >= 1 && Boolean(profile.probes.testScript);
  if (ciAndTests) { points += 8; satisfied.push("ci+tests"); }
  const probe = VERIFY_RULES[prefix];
  const value = probe ? profile.probes[probe] : false;
  if (typeof value === "number" ? value >= 1 : Boolean(value)) { points += 12; satisfied.push(probe); }
  return { points: Math.min(20, points), satisfied };
}

/** @param {string[]} keywords @param {DsafConfig} config @param {string} id @returns {string[][]} keyword variant groups */
function expandKeywords(keywords, config, id) {
  const extra = config.extraKeywords?.[id] ?? [];
  const all = [...new Set([...keywords, ...extra.map((word) => word.toLowerCase())])];
  return all.map((keyword) => [keyword, ...(SYNONYMS[keyword] ?? [])]);
}

/**
 * @param {AuditSource} source
 * @param {DsafConfig} [config={}]
 * @param {Set<string>|null} [idFilter=null]
 * @returns {DsafCriterion[]}
 */
function scoreCriteria(source, config = {}, idFilter = null) {
  const text = source.searchText ?? source.text.toLowerCase();
  const profile = buildEvidenceProfile(source);
  const pool = idFilter ? ALL_CRITERIA.filter((item) => idFilter.has(item.id)) : ALL_CRITERIA;
  return pool.map((item) => {
    const baseKeywords = item.keywords ?? keywordsForCriterion(`${item.category} ${item.criterion}`);
    const groups = expandKeywords(baseKeywords, config, item.id);
    const hits = groups.filter((group) => group.some((variant) => text.includes(variant))).map((group) => group[0]);
    const missing = groups.filter((group) => !group.some((variant) => text.includes(variant))).map((group) => group[0]);
    const prefix = categoryPrefixOf(item.id);
    const ratio = groups.length ? hits.length / groups.length : 0;
    const mentions = Math.round(ratio * 40);
    const type = item.type ?? inferType(`${item.category} ${item.criterion}`);
    let artifacts = artifactBand(profile, prefix);
    let verification = verificationBand(profile, prefix);
    // Verification artifacts are category-shared evidence; credit them to a
    // criterion only in proportion to how clearly that criterion's specifics
    // appear at all (stops blanket 20/20 across a whole category).
    verification = { ...verification, points: Math.round(verification.points * ratio) };
    // MANUAL criteria (counsel review, independent audits, user research,
    // assistive-technology sessions...) can never be auto-verified: no CI job
    // proves a lawyer read the policy. Zero verification credit, artifact
    // credit halved, total capped at 60 — "may not be claimed audited until
    // human evidence is attached" (framework overview §1).
    if (type === "MANUAL") {
      verification = { points: 0, satisfied: [] };
      artifacts = { ...artifacts, points: Math.min(20, Math.round(artifacts.points / 2)) };
    }
    const score = Math.min(type === "MANUAL" ? 60 : 100, mentions + artifacts.points + verification.points);
    const sourceScope = source.kind === "url" ? `${source.pages.length} crawled page(s)` : `${source.files.length} scanned file(s)`;
    const evidence = [
      `${sourceScope}.`,
      `Mentions ${mentions}/40 (${hits.length}/${groups.length} signals${hits.length ? `: ${hits.slice(0, 6).join(", ")}` : ""}).`,
      `Artifacts ${artifacts.points}/40${artifacts.satisfied.length ? ` (${artifacts.satisfied.slice(0, 5).join(", ")})` : profile.isRepo ? "" : " (prose-only input: no repo tree to probe)"}.`,
      `Verification ${verification.points}/20${verification.satisfied.length ? ` (${verification.satisfied.join(", ")})` : ""}.`
    ].join(" ");
    const missingSignals = missing.length ? missing.slice(0, 8).join(", ") : "none";
    const suggestion = score >= 100
      ? "Preserve this requirement, keep citations current, and prevent regression with the stated acceptance gate."
      : `Add explicit doctrine, artifact evidence, examples, owner, maturity state, and verification for this requirement. Missing signals to address: ${missing.slice(0, 6).join(", ") || "none"}.`;
    const requiredProof = type === "MANUAL"
      ? "Dated human evidence: named reviewer or role, method, scope, sample, limitations, confidence, and follow-up owner."
      : "Automated or source evidence: path or URL, generated artifact, test/check command, owner, date, confidence, and limitation.";
    const acceptanceGate = type === "MANUAL"
      ? "May not be claimed audited until human evidence is attached and reviewed; keep as manual backlog otherwise."
      : "Pass when source doctrine and real artifacts include this requirement and a re-runnable verification gate proves it.";
    const outputAction = score >= 100
      ? "Preserve"
      : type === "MANUAL"
        ? "Manual evidence backlog"
        : "Apply to improved doctrine";
    const confidence = source.kind === "url" && source.pages.some((/** @type {SourcePage} */ page) => !page.ok)
      ? "Medium-Low"
      : score === 0
        ? "Medium"
        : profile.isRepo
          ? "High"
          : "Medium-High";
    return {
      ...item,
      type,
      score,
      bands: { mentions, artifacts: artifacts.points, verification: verification.points },
      level: level(score),
      confidence,
      evidence,
      missing,
      missingSignals,
      suggestion,
      requiredProof,
      acceptanceGate,
      outputAction,
      refs: item.refs?.length ? item.refs : ["DSAF-A"]
    };
  });
}

/**
 * DSAF Levels ladder — MUST match docs/framework/04-maturity-tiers.md §1.
 * @param {number} scorePct
 * @returns {string}
 */
export function level(scorePct) {
  if (scorePct >= 85) return "L5";
  if (scorePct >= 75) return "L4";
  if (scorePct >= 65) return "L3";
  if (scorePct >= 55) return "L2";
  if (scorePct >= 40) return "L1";
  return "L0";
}

/**
 * @param {string[]} rows
 * @returns {string}
 */
function markdownTable(rows) {
  return rows.join("\n");
}

/**
 * @param {any} value
 * @returns {string}
 */
function escapeCell(value) {
  return String(value ?? "")
    .replace(/\r?\n/g, " ")
    .replace(/\|/g, "\\|")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * @param {DsafCriterion[]} criteria
 * @returns {number}
 */
function averageScore(criteria) {
  return Math.round(criteria.reduce((sum, item) => sum + (item.score || 0), 0) / Math.max(1, criteria.length));
}

/**
 * @param {DsafCriterion[]} criteria
 * @returns {string}
 */
function renderCriteria(criteria) {
  /** @type {Map<string, DsafCriterion[]>} */
  const byCategory = new Map();
  for (const item of criteria) {
    if (!byCategory.has(item.category)) byCategory.set(item.category, []);
    byCategory.get(item.category)?.push(item);
  }
  return [...byCategory.entries()].map(([category, rows]) => `### ${category}

| ID | Type | Category | Criterion | Score | Level | Confidence | Evidence found | Missing signals | Citation refs | Required proof | Suggested improvement | Acceptance gate | Output action |
|---|---|---|---|---:|---|---|---|---|---|---|---|---|---|
${rows.map((item) => `| ${item.id} | ${item.type} | ${escapeCell(item.category)} | ${escapeCell(item.criterion)} | ${item.score} / 100 | ${item.level} | ${item.confidence} | ${escapeCell(item.evidence)} | ${escapeCell(item.missingSignals)} | ${item.refs.map((/** @type {string} */ ref) => `[${ref}]`).join(", ")} | ${escapeCell(item.requiredProof)} | ${escapeCell(item.suggestion)} | ${escapeCell(item.acceptanceGate)} | ${escapeCell(item.outputAction)} |`).join("\n")}`).join("\n\n");
}

/**
 * @returns {string}
 */
function renderSourceReferences() {
  return `| Ref | Source | Type | URL/path | Fetched | Confidence |
|---|---|---|---|---|---|
${EVIDENCE_SOURCES.map(([id, label, type, url, fetched, confidence]) => `| [${id}] | ${escapeCell(label)} | ${escapeCell(type)} | ${escapeCell(url)} | ${fetched} | ${confidence} |`).join("\n")}`;
}

/**
 * Category roll-up + enterprise floors, computed the way the docs define them:
 * per-category averages grouped by criterion-id prefix, per-part weighted combines
 * using the documented category weights, combined = mean(Part A, Part B), floors
 * per docs/framework/04-maturity-tiers.md §2.
 * @param {DsafCriterion[]} criteria
 */
export function computeRollup(criteria) {
  /** @type {Map<string, {prefix: string, label: string, weight: number, scores: number[]}>} */
  const byPrefix = new Map();
  for (const item of criteria) {
    const prefix = categoryPrefixOf(item.id);
    if (!prefix) continue;
    if (!byPrefix.has(prefix)) {
      const weight = Number(/Weight:\s*(\d+)%/.exec(item.category)?.[1] ?? 0);
      byPrefix.set(prefix, { prefix, label: item.category, weight, scores: [] });
    }
    byPrefix.get(prefix)?.scores.push(item.score || 0);
  }
  const categories = [...byPrefix.values()]
    .map((entry) => ({
      prefix: entry.prefix,
      label: entry.label,
      weight: entry.weight,
      criteria: entry.scores.length,
      average: Math.round(entry.scores.reduce((sum, value) => sum + value, 0) / Math.max(1, entry.scores.length))
    }))
    .sort((a, b) => a.prefix.localeCompare(b.prefix, undefined, { numeric: true }));

  /** @param {"A"|"B"} part */
  const partScore = (part) => {
    const rows = categories.filter((category) => category.prefix.startsWith(part));
    const weightTotal = rows.reduce((sum, row) => sum + row.weight, 0);
    if (!rows.length) return 0;
    if (!weightTotal) return Math.round(rows.reduce((sum, row) => sum + row.average, 0) / rows.length);
    return Math.round(rows.reduce((sum, row) => sum + row.average * row.weight, 0) / weightTotal);
  };
  const partA = partScore("A");
  const partB = partScore("B");
  const combined = Math.round((partA + partB) / 2);

  /** @param {string} prefix @returns {number} */
  const avgOf = (prefix) => categories.find((category) => category.prefix === prefix)?.average ?? 0;
  const minCategory = categories.length ? Math.min(...categories.map((category) => category.average)) : 0;
  const floors = [
    { requirement: "Combined score", floor: 65, actual: combined },
    { requirement: "A.8 Accessibility (system)", floor: 75, actual: avgOf("A8") },
    { requirement: "B.5 Accessibility & Inclusive (UX)", floor: 75, actual: avgOf("B5") },
    { requirement: "A.1 Foundations & Tokens", floor: 70, actual: avgOf("A1") },
    { requirement: "A.4 Governance", floor: 60, actual: avgOf("A4") },
    { requirement: "A.3 Documentation", floor: 65, actual: avgOf("A3") },
    { requirement: "Every category", floor: 40, actual: minCategory }
  ].map((row) => ({ ...row, pass: row.actual >= row.floor }));

  return {
    categories,
    partA,
    partB,
    combined,
    tier: level(combined),
    enterpriseGrade: floors.every((row) => row.pass),
    floors
  };
}

/** @param {ReturnType<typeof computeRollup>} rollup @returns {string} */
function renderRollup(rollup) {
  return `## Category Roll-up & Enterprise Floors

| Category | Criteria | Average | Weight | Level |
|---|---:|---:|---:|---|
${rollup.categories.map((category) => `| ${escapeCell(category.label)} | ${category.criteria} | ${category.average} / 100 | ${category.weight}% | ${level(category.average)} |`).join("\n")}

| Roll-up | Score | DSAF Level |
|---|---:|---|
| Part A (weighted) | ${rollup.partA} / 100 | ${level(rollup.partA)} |
| Part B (weighted) | ${rollup.partB} / 100 | ${level(rollup.partB)} |
| **Combined (mean of parts)** | **${rollup.combined} / 100** | **${rollup.tier}** |

### Enterprise-grade floors (docs/framework/04-maturity-tiers.md §2)

| Requirement | Floor | Actual | Verdict |
|---|---:|---:|---|
${rollup.floors.map((row) => `| ${row.requirement} | ≥ ${row.floor} | ${row.actual} | ${row.pass ? "PASS" : "FAIL"} |`).join("\n")}

**Enterprise-grade verdict: ${rollup.enterpriseGrade ? "PASS — every floor crossed" : "NOT YET — at least one floor below threshold"}.** Floors are floors, not targets; a failing floor names the next investment, it does not shame the system.

> Self-audit publication cap: these are heuristic evidence scores from the deterministic engine, not an external audit. Without third-party verification a publicly cited DSAF Level caps at **L3** regardless of the number above (self-audit publication policy). MANUAL criteria are capped at 60/100 by construction until dated human evidence is attached.
`;
}

/**
 * @param {AuditSource} source
 * @param {DsafCriterion[]} criteria
 * @param {string} model
 * @returns {string}
 */
function renderReport(source, criteria, model) {
  const autoCriteria = criteria.filter((item) => item.type === "AUTO");
  const manualCriteria = criteria.filter((item) => item.type === "MANUAL");
  const gaps = criteria.filter((item) => (item.score || 0) < 100);
  const autoGaps = autoCriteria.filter((item) => (item.score || 0) < 100);
  const manualGaps = manualCriteria.filter((item) => (item.score || 0) < 100);
  const combined = averageScore(criteria);
  const autoAverage = averageScore(autoCriteria);
  const manualAverage = averageScore(manualCriteria);
  const rollup = computeRollup(criteria);
  const pages = source.kind === "url"
    ? source.pages.map((page) => `- ${page.status} ${page.url} — ${page.title}`).join("\n")
    : source.files.slice(0, 40).map((file) => `- ${file}`).join("\n");

  return `# Analyzed Design Report

| Field | Value |
|---|---|
| Generated | ${new Date().toISOString()} |
| Engine version | ${ENGINE_VERSION} |
| Rubric version | ${loadRubricVersion()} |
| Input type | ${source.kind} |
| Input | ${source.input} |
| Title | ${source.title} |
| LLM / agent context | ${model} |
| Pages/files scanned | ${source.kind === "url" ? source.pages.length : source.files.length} |
| Unified enterprise level estimate | ${level(combined)} (${combined} / 100 average) |
| Weighted combined (docs ladder) | ${rollup.tier} (${rollup.combined} / 100; Part A ${rollup.partA}, Part B ${rollup.partB}) |
| Enterprise-grade floors | ${rollup.enterpriseGrade ? "PASS" : "NOT YET"} |
| Total criteria scanned | ${criteria.length} |
| AUTO criteria | ${autoCriteria.length} |
| MANUAL criteria | ${manualCriteria.length} |
| AUTO average | ${autoAverage} / 100 |
| MANUAL evidence average | ${manualAverage} / 100 |

## Unified Score Summary

The report uses one unified enterprise criterion table. Earlier doctrine, artifact, and manual proof scorecards are absorbed into criterion rows with a required \`Type\` column:

- \`AUTO\` means the gap can be addressed through doctrine, source files, generated artifacts, scripts, tests, examples, or crawler-visible documentation.
- \`MANUAL\` means the gap requires human evidence such as counsel review, manual assistive-technology testing, independent audit, customer research, designer workflow review, executive sign-off, or production telemetry review.

| Summary | Count / score |
|---|---:|
| Total criteria | ${criteria.length} |
| Criteria below perfect | ${gaps.length} |
| AUTO gaps applied to improved doctrine | ${autoGaps.length} |
| MANUAL evidence gaps retained for human proof | ${manualGaps.length} |
| Unified average | ${combined} / 100 |
| AUTO average | ${autoAverage} / 100 |
| MANUAL evidence average | ${manualAverage} / 100 |

Scores follow the three-band evidence model: prose mentions cap at 40/100, structural artifacts add up to 40, and verification signals (CI, tests, generated check outputs) add up to 20. A doctrine document alone therefore reads as "Defined", never "Built" — parity with the 0-5 rubric anchors.

${renderRollup(rollup)}

## Scanned Evidence

${pages || "- No readable pages/files discovered."}

## Executive Interpretation

- **Scope.** ${criteria.length} criteria were scored: the canonical 125 DSAF criteria, the absorbed strict proof-loop criteria, and expanded large-enterprise criteria covering doctrine, artifacts, accessibility, localization, governance, AI, legal, security, sustainability, support, procurement, and multi-surface product operations.
- **Automatable work.** ${autoGaps.length} AUTO gap(s) were translated into \`IMPROVED_DESIGN.md\` as normative doctrine requirements.
- **Human proof work.** ${manualGaps.length} MANUAL gap(s) require human evidence before audited claims are made.
- **Output quality rule.** This report contains scores, scan metadata, evidence, citations, and suggestions. \`IMPROVED_DESIGN.md\` is doctrine-only.
- **Benchmark caveat.** Scores are heuristic evidence scans, not legal, accessibility, security, or procurement certification.

## Full Enterprise DSAF Criterion Scores And Suggestions

${renderCriteria(criteria)}

## Source Reference Appendix

${renderSourceReferences()}

## Output Contract

This run produced:

- \`ANALYZED_DESIGN_REPORT.md\`
- \`IMPROVED_DESIGN.md\`

\`ANALYZED_DESIGN_REPORT.md\` keeps descriptive analysis, scores, evidence, citations, and suggestions. \`IMPROVED_DESIGN.md\` keeps only the improved standalone doctrine.
`;
}

/**
 * @param {DsafCriterion[]} items
 * @returns {string}
 */
function doctrineRequirementRows(items) {
  return items.map((item, index) => `| R${index + 1} | ${item.id} | ${escapeCell(item.category)} | ${escapeCell(item.criterion)} | ${escapeCell(item.suggestion)} | ${escapeCell(item.acceptanceGate)} |`).join("\n");
}

/**
 * @param {AuditSource} source
 * @param {DsafCriterion[]} criteria
 * @returns {string}
 */
function renderImprovedDesign(source, criteria) {
  const autoFindings = criteria.filter((item) => (item.score || 0) < 100 && item.type === "AUTO");
  const manualFindings = criteria.filter((item) => (item.score || 0) < 100 && item.type === "MANUAL");
  const fullSource = source.kind === "file"
    ? (source.fullText || source.primaryText || source.text)
    : (source.fullText || source.text);
  const title = source.kind === "url"
    ? `Suggested Design System Doctrine For ${source.title}`
    : `Improved ${source.title}`;
  const sourceSectionTitle = source.kind === "url" ? "Reference Corpus" : "Base Doctrine";

  return `# ${title}

> This standalone doctrine applies the automatable improvements identified by DSAF. Analytical scores, scan metadata, evidence, citations, and recommendations live in \`ANALYZED_DESIGN_REPORT.md\`, not here.

## Doctrine Status

- **Source:** ${source.input}
- **Doctrine type:** ${source.kind === "url" ? "Generated suggested doctrine from crawled public URL" : "Improved doctrine from direct file input"}
- **Authority:** This file is the improved standalone doctrine for the audited case.
- **Manual proof boundary:** Human-only review remains required before audited or regulated external claims.

## Unified Criterion Operating Rule

Every design-system rule must map to a criterion row with a declared \`AUTO\` or \`MANUAL\` proof type. AUTO requirements must be satisfied through doctrine, source files, generated artifacts, examples, scripts, tests, and recreation commands. MANUAL requirements must be blocked from audited claims until humans provide the named evidence.

## Applied Automatable Requirements

| Row | Criterion ID | Area | Requirement | Doctrine addition | Acceptance gate |
|---|---|---|---|---|---|
${doctrineRequirementRows(autoFindings.length ? autoFindings : [{ id: "AUTO-FRESHNESS", category: "Freshness", criterion: "Preserve existing automatable coverage.", tag: "", source: "", refs: [], suggestion: "Refresh source doctrine and generated artifacts after each material change.", acceptanceGate: "Pass when the report and improved doctrine are regenerated and verified." }])}

## Manual Evidence Boundaries

${manualFindings.length ? manualFindings.map((finding, index) => `${index + 1}. ${finding.id} ${finding.category}: ${finding.criterion} requires human evidence before audited claims.`).join("\n") : "No manual-only requirements were detected by this scan, but audited claims still require appropriate human review."}

## Artifact Recreation Doctrine

| Artifact | Source input | Recreate | Verify | Status |
|---|---|---|---|---|
| Evidence register | Doctrine or crawled site evidence | Rerun DSAF maximal audit | Report includes full enterprise criterion table | Required after each material change |
| Criterion scores | Scored criteria and source evidence | Rerun DSAF maximal audit | Unified criterion table exists in report | Required after each material change |
| Improved doctrine | Report suggestions | Rerun DSAF maximal audit | This file is standalone and source-preserving for file inputs | Required after each material change |

## ${sourceSectionTitle}

${source.kind === "url" ? "The following corpus was used to generate this suggested doctrine." : "The following base doctrine is preserved in full and extended by the requirements above."}

---

${fullSource}
`;
}

/**
 * @param {string} md
 * @returns {string}
 */
function mdToHtml(md) {
  let html = md;
  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  html = html.replace(/^>\s?(.*)$/gm, '<blockquote>$1</blockquote>');
  html = html.replace(/^### (.*)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*)$/gm, '<h1>$1</h1>');
  html = html.replace(/^---$/gm, '<hr>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/`([^`\n]+)`/g, '<code>$1</code>');
  html = html.replace(/^- (.*)$/gm, '<ul><li>$1</li></ul>');
  html = html.replace(/<\/ul>\n<ul>/g, '\n');
  html = html.replace(/^\|(.*)\|$/gm, function(match, inner) {
    const isDivider = inner.replace(/\|/g, "").replace(/-/g, "").replace(/:/g, "").trim().length === 0;
    if (isDivider) return '<tr data-divider="true"></tr>';
    const cells = inner.split(/(?<!\\)\|/).map((/** @type {string} */ s) => s.trim().replace(/\\\|/g, '|'));
    return '<tr><td>' + cells.join('</td><td>') + '</td></tr>';
  });
  html = html.replace(/<tr data-divider="true"><\/tr>\n?/g, '');
  html = html.replace(/(<tr>.*?<\/tr>(?:\n<tr>.*?<\/tr>)*)/g, '<table>\n$1\n</table>');
  html = html.replace(/<table>\n<tr>(.*?)<\/tr>/g, '<table>\n<thead><tr>$1</tr></thead>\n<tbody>');
  html = html.replace(/<\/table>/g, '</tbody>\n</table>');
  html = html.replace(/<thead><tr>(.*?)<\/tr><\/thead>/g, function(match, inner) {
     return '<thead><tr>' + inner.replace(/<td/g, '<th').replace(/<\/td>/g, '</th>') + '</tr></thead>';
  });
  // Add badge classes for scores
  html = html.replace(/<td>(\d{1,3}) \/ 100<\/td>/g, function(match, scoreStr) {
    const score = parseInt(scoreStr, 10);
    const cls = score >= 90 ? 'score-high' : score >= 60 ? 'score-medium' : 'score-low';
    return `<td><span class="score-badge ${cls}">${scoreStr}</span></td>`;
  });
  html = html.replace(/^(?!<)(.+)$/gm, '<p>$1</p>');
  return html;
}

/**
 * @typedef {Object} MaximalAuditOptions
 * @property {string} input
 * @property {string} outDir
 * @property {string} [mode]
 * @property {string} [model]
 * @property {number} [maxPages]
 * @property {"full"|"dsaf-25"} [profile]
 * @property {DsafConfig} [config]
 */

/**
 * @param {MaximalAuditOptions} param0
 */
export async function runMaximalAudit({ input, outDir, mode = "both", model = "auto-detected-current-agent", maxPages = 8, profile, config }) {
  const targetConfig = { ...loadTargetConfig(/^https?:\/\//i.test(input) ? outDir : resolve(input)), ...(config ?? {}) };
  const activeProfile = profile ?? targetConfig.profile ?? "full";
  const idFilter = activeProfile === "dsaf-25" ? loadDsaf25Ids() : null;
  const source = await loadInput(input, maxPages, outDir, targetConfig);
  const criteria = scoreCriteria(source, targetConfig, idFilter);
  const rollup = computeRollup(criteria);
  mkdirSync(outDir, { recursive: true });

  const reportPath = join(outDir, "ANALYZED_DESIGN_REPORT.md");
  const reportHtmlPath = join(outDir, "ANALYZED_DESIGN_REPORT.html");
  const improvedDir = join(outDir, "output-improved");
  const artifactsDir = join(outDir, "output-artifacts");
  const fixturesDir = join(outDir, "input-fixtures");
  mkdirSync(improvedDir, { recursive: true });
  mkdirSync(artifactsDir, { recursive: true });
  mkdirSync(fixturesDir, { recursive: true });
  const improvedPath = join(improvedDir, "IMPROVED_DESIGN.md");
  
  if (mode === "analyze" || mode === "both") {
    const reportMd = renderReport(source, criteria, model);
    writeFileSync(reportPath, reportMd, "utf8");
    
    // Generate HTML
    try {
      const templatePath = resolve(ROOT, "docs/framework/assets/report-template.html");
      const templateStr = readFileSync(templatePath, "utf8");
      const reportHtml = templateStr
        .replace("{{REPORT_TITLE}}", "Analyzed Design Report")
        .replace("{{REPORT_CONTENT}}", mdToHtml(reportMd));
      writeFileSync(reportHtmlPath, reportHtml, "utf8");
    } catch (err) {
      console.warn("Could not generate HTML report (template missing?)", err);
    }
  }
  
  if (mode === "improve" || mode === "both") {
    if (source.kind === "file" && source.files && source.files.length > 1) {
      // Reconstruct folder logic
      const rootDir = statSync(resolve(input)).isDirectory() ? resolve(input) : dirname(resolve(input));
      for (const f of source.files) {
        const rel = relative(rootDir, f);
        const outPath = join(improvedDir, rel);
        mkdirSync(dirname(outPath), { recursive: true });
        
        if (f === source.primary) {
          writeFileSync(outPath, renderImprovedDesign(source, criteria), "utf8");
        } else {
          try { writeFileSync(outPath, readFileSync(f, "utf8"), "utf8"); } catch(e) {}
        }
      }
      writeFileSync(improvedPath, renderImprovedDesign(source, criteria), "utf8");
    } else {
      writeFileSync(improvedPath, renderImprovedDesign(source, criteria), "utf8");
    }

    // Real evidence index — which scanned files satisfied which structural probes.
    // (Replaces the former mock-artifact synthesis: an audit must never fabricate
    // artifacts that could be mistaken for target evidence.)
    const profileData = buildEvidenceProfile(source);
    writeFileSync(join(artifactsDir, "evidence-index.json"), JSON.stringify({
      generated: new Date().toISOString(),
      engine_version: ENGINE_VERSION,
      input,
      is_repo: profileData.isRepo,
      probes: profileData.probes,
      satisfied_by: profileData.satisfiedBy
    }, null, 2) + "\n", "utf8");
  }

  // Machine-readable scores — the substrate for trend tracking, regression diffs
  // (scripts/bin/audit-diff.mjs) and the evolution miner (scripts/bin/evolution-mine.mjs).
  const scoresPath = join(outDir, "scores.json");
  const scoresPayload = {
    schema: "dsaf-scores/1",
    engine_version: ENGINE_VERSION,
    rubric_version: loadRubricVersion(),
    generated: new Date().toISOString(),
    input,
    input_kind: source.kind,
    input_hash: createHash("sha256").update(source.searchText ?? source.text).digest("hex"),
    profile: activeProfile,
    files_scanned: source.kind === "url" ? source.pages.length : source.files.length,
    self_audit_publication_cap: "L3",
    unified_average: averageScore(criteria),
    weighted: {
      part_a: rollup.partA,
      part_b: rollup.partB,
      combined: rollup.combined,
      tier: rollup.tier
    },
    enterprise_grade: { pass: rollup.enterpriseGrade, floors: rollup.floors },
    categories: rollup.categories,
    criteria: criteria.map((item) => ({
      id: item.id,
      type: item.type,
      tag: item.tag,
      score: item.score ?? 0,
      level: item.level,
      bands: item.bands ?? { mentions: item.score ?? 0, artifacts: 0, verification: 0 },
      missing_signals: item.missingSignals
    }))
  };
  writeFileSync(scoresPath, JSON.stringify(scoresPayload, null, 2) + "\n", "utf8");

  return {
    input,
    outDir,
    reportPath,
    reportHtmlPath,
    improvedPath,
    scoresPath,
    profile: activeProfile,
    criteriaCount: criteria.length,
    autoCriteriaCount: criteria.filter((item) => item.type === "AUTO").length,
    manualCriteriaCount: criteria.filter((item) => item.type === "MANUAL").length,
    unifiedAverage: averageScore(criteria),
    weightedCombined: rollup.combined,
    tier: rollup.tier,
    enterpriseGrade: rollup.enterpriseGrade
  };
}

async function main() {
  const parsed = parseArgs({
    options: {
      input: { type: "string" },
      out: { type: "string" },
      mode: { type: "string", default: "both" },
      profile: { type: "string" },
      model: { type: "string", default: process.env.DSAF_MODEL || process.env.CODEX_MODEL || "auto-detected-current-agent" },
      "max-pages": { type: "string", default: "8" },
      help: { type: "boolean", short: "h" }
    }
  });

  if (parsed.values.help || !parsed.values.input || !parsed.values.out) {
    console.log(usage());
    process.exit(parsed.values.help ? 0 : 2);
  }
  const mode = String(parsed.values.mode);
  if (!["analyze", "improve", "both"].includes(mode)) throw new Error(`Invalid --mode: ${mode}`);
  const profile = parsed.values.profile ? String(parsed.values.profile) : undefined;
  if (profile && !["full", "dsaf-25"].includes(profile)) throw new Error(`Invalid --profile: ${profile}`);
  const result = await runMaximalAudit({
    input: String(parsed.values.input),
    outDir: resolve(String(parsed.values.out)),
    mode,
    profile: /** @type {"full"|"dsaf-25"|undefined} */ (profile),
    model: String(parsed.values.model),
    maxPages: Number(parsed.values["max-pages"]) || 8
  });
  console.log(JSON.stringify(result, null, 2));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  // Enhanced error boundary logic
  process.on('uncaughtException', (/** @type {Error} */ err) => {
    console.error(`[maximal-audit:CRITICAL] Uncaught Exception:`, err.message);
    if (err.stack) console.error(err.stack);
    process.exit(1);
  });

  process.on('unhandledRejection', (/** @type {any} */ reason) => {
    console.error(`[maximal-audit:CRITICAL] Unhandled Rejection:`, reason);
    process.exit(1);
  });

  main().catch((error) => {
    console.error(`[maximal-audit:ERROR] ${error instanceof Error ? error.stack || error.message : String(error)}`);
    process.exit(1);
  });
}
