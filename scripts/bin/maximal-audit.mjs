#!/usr/bin/env node
// @ts-check
import fs, { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, extname, join, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { execSync } from "node:child_process";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const TEXT_EXT = new Set([".md", ".mdx", ".txt", ".json", ".js", ".mjs", ".ts", ".tsx", ".html", ".css", ".yml", ".yaml"]);
const SKIP_DIRS = new Set([".git", "node_modules", "dist", "coverage", ".next", ".vercel", ".cyberos-memory"]);
const MAX_TEXT = 180000;
const CRITERIA_FILES = ["docs/framework/03-full-criteria.md"];

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
 * @property {string} text
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
    "Usage: node scripts/bin/maximal-audit.mjs --input <DESIGN.md|url> --out <dir> [--mode analyze|improve|both] [--model <id>] [--max-pages 8]",
    "",
    "Outputs:",
    "  ANALYZED_DESIGN_REPORT.md",
    "  IMPROVED_DESIGN.md"
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
 * @param {number} [limit=400]
 * @returns {string[]}
 */
function walkLocalFiles(root, limit = 400) {
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
      const path = join(dir, entry);
      let st;
      try {
        // statSync follows symlinks: valid links to real files are included,
        // but broken/dangling symlinks (and other stat failures) throw.
        st = statSync(path);
      } catch {
        continue; // Broken symlink or unreadable entry: skip, do not crash the audit.
      }
      if (st.isDirectory()) walk(path);
      else if (st.isFile() && TEXT_EXT.has(extname(path).toLowerCase()) && st.size <= 240000) files.push(path);
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
 * @returns {Promise<AuditSource>}
 */
async function loadInput(input, maxPages, outDir) {
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
    return {
      kind: "url",
      input,
      title: pages[0]?.title || input,
      pages,
      files: [],
      text: pages.map((page) => `# ${page.title}\nURL: ${page.url}\n${page.text}`).join("\n\n").slice(0, MAX_TEXT),
      fullText: pages.map((page) => `# ${page.title}\nURL: ${page.url}\n\n${page.text}`).join("\n\n---\n\n")
    };
  }

  const resolvedPath = resolve(input);
  if (!existsSync(resolvedPath)) throw new Error(`Input does not exist: ${resolvedPath}`);
  const st = statSync(resolvedPath);
  const root = st.isDirectory() ? resolvedPath : dirname(resolvedPath);
  const files = st.isDirectory() ? walkLocalFiles(resolvedPath) : [resolvedPath, ...walkLocalFiles(root, 120).filter((file) => file !== resolvedPath)];
  
  // Copy to fixtures
  if (resolvedPath !== fixturesDir) {
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
  const chunks = files.map((file) => `# ${file}\n${safeRead(file).slice(0, 20000)}`);
  return {
    kind: "file",
    input: resolvedPath,
    title: basename(primary ?? resolvedPath),
    pages: [],
    files,
    primary,
    text: chunks.join("\n\n").slice(0, MAX_TEXT),
    primaryText: safeRead(primary ?? resolvedPath),
    fullText: safeRead(primary ?? resolvedPath)
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

/**
 * @param {AuditSource} source
 * @returns {DsafCriterion[]}
 */
function scoreCriteria(source) {
  const text = source.text.toLowerCase();
  return ALL_CRITERIA.map((item) => {
    const keywords = item.keywords ?? keywordsForCriterion(`${item.category} ${item.criterion}`);
    const hits = keywords.filter((/** @type {string} */ keyword) => text.includes(keyword));
    const score = keywords.length ? Math.round((hits.length / keywords.length) * 100) : 0;
    const missing = keywords.filter((/** @type {string} */ keyword) => !hits.includes(keyword));
    const sourceScope = source.kind === "url" ? `${source.pages.length} crawled page(s)` : `${source.files.length} scanned file(s)`;
    const type = item.type ?? inferType(`${item.category} ${item.criterion}`);
    const evidence = hits.length
      ? `${sourceScope}; found ${hits.length}/${keywords.length} signal(s): ${hits.slice(0, 8).join(", ")}.`
      : `${sourceScope}; no direct keyword signal found.`;
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
        : "Medium-High";
    return {
      ...item,
      type,
      score,
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
 * @param {number} scorePct
 * @returns {string}
 */
function level(scorePct) {
  if (scorePct >= 90) return "L5";
  if (scorePct >= 75) return "L4";
  if (scorePct >= 60) return "L3";
  if (scorePct >= 40) return "L2";
  if (scorePct >= 20) return "L1";
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
  const pages = source.kind === "url"
    ? source.pages.map((page) => `- ${page.status} ${page.url} — ${page.title}`).join("\n")
    : source.files.slice(0, 40).map((file) => `- ${file}`).join("\n");

  return `# Analyzed Design Report

| Field | Value |
|---|---|
| Generated | ${new Date().toISOString()} |
| Input type | ${source.kind} |
| Input | ${source.input} |
| Title | ${source.title} |
| LLM / agent context | ${model} |
| Pages/files scanned | ${source.kind === "url" ? source.pages.length : source.files.length} |
| Unified enterprise level estimate | ${level(combined)} (${combined} / 100 average) |
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
 */

/**
 * @param {MaximalAuditOptions} param0
 */
export async function runMaximalAudit({ input, outDir, mode = "both", model = "auto-detected-current-agent", maxPages = 8 }) {
  const source = await loadInput(input, maxPages, outDir);
  const criteria = scoreCriteria(source);
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

    // Synthesize artifacts
    console.log(`[runMaximalAudit] Synthesizing mock artifacts in ${artifactsDir}...`);
    const mockTokens = {
      colors: { primary: "#0055FF", secondary: "#333333", background: "#FFFFFF", surface: "#F4F5F7" },
      typography: { fontStack: "Inter, sans-serif", baseSize: "16px" },
      spacing: { small: "4px", medium: "8px", large: "16px" }
    };
    writeFileSync(join(artifactsDir, "design-tokens.json"), JSON.stringify(mockTokens, null, 2), "utf8");
    
    const mockCss = `:root {\n  --color-primary: #0055FF;\n  --color-secondary: #333333;\n  --font-base: 'Inter', sans-serif;\n  --spacing-md: 8px;\n}\n`;
    writeFileSync(join(artifactsDir, "theme.css"), mockCss, "utf8");
    
    const mockJs = `export const Button = () => console.log("Button Component");\nexport const Card = () => console.log("Card Component");\n`;
    writeFileSync(join(artifactsDir, "components-stub.js"), mockJs, "utf8");
  }

  return {
    input,
    outDir,
    reportPath,
    reportHtmlPath,
    improvedPath,
    criteriaCount: criteria.length,
    autoCriteriaCount: criteria.filter((item) => item.type === "AUTO").length,
    manualCriteriaCount: criteria.filter((item) => item.type === "MANUAL").length,
    unifiedAverage: averageScore(criteria)
  };
}

async function main() {
  const parsed = parseArgs({
    options: {
      input: { type: "string" },
      out: { type: "string" },
      mode: { type: "string", default: "both" },
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
  const result = await runMaximalAudit({
    input: String(parsed.values.input),
    outDir: resolve(String(parsed.values.out)),
    mode,
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
