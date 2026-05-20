import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

export const CORE_CRITERIA = [
  ["A1.1", "Color tokens with primitive-semantic-component layers", [/tokens?\.json$/i, /color.*token|semantic.*token|component.*token/i]],
  ["A1.8", "Token format and DTCG conformance", [/tokens?\.json$/i, /dtcg|\$type|\$value|design token/i]],
  ["A1.9", "Modern color spaces", [/tokens?\.json$/i, /oklch|display-p3|color\(p3|lab\(/i]],
  ["A2.1", "Top component coverage", [/storybook|components?|packages/i, /button|input|select|modal|table|tabs|tooltip/i]],
  ["A2.4", "Variant and state coverage", [/storybook|components?|packages/i, /variant|state|hover|focus|disabled|pressed/i]],
  ["A3.1", "Usage guidelines per component", [/docs|readme|storybook/i, /usage guideline|when to use|do's|don'ts|component/i]],
  ["A4.2", "RFC process", [/rfcs?|governance|contributing/i, /RFC|request for comments|proposal/i]],
  ["A4.3", "Semver discipline", [/changelog|package\.json|version/i, /semver|breaking change|major|minor|patch/i]],
  ["A5.4", "Storybook or equivalent", [/storybook|zeroheight|docs/i, /storybook|component explorer|preview/i]],
  ["A5.5", "CI/CD for the system", [/\.github|workflows?|ci/i, /test|verify|bundle|coverage|workflow/i]],
  ["A6.1", "Light/dark mode parity", [/theme|tokens?|css|svg/i, /dark mode|light mode|prefers-color-scheme|theme/i]],
  ["A7.1", "Adoption metrics", [/metrics?|adoption|benchmark|report/i, /coverage %|adoption|telemetry|benchmark/i]],
  ["A8.1", "Contrast guarantees", [/accessibility|a11y|apca|wcag/i, /WCAG|APCA|contrast/i]],
  ["A9.1", "Bundle size budgets", [/bundle|package\.json|scripts/i, /bundle size|gzip|budget/i]],
  ["A10.3", "AI rules file", [/prompts?|agents?|ai|mcp/i, /agent|AI|MCP|prompt/i]],
  ["B1.1", "Research method diversity", [/research|discovery|audit/i, /interview|survey|usability|analytics/i]],
  ["B2.1", "Information architecture", [/ia|navigation|sitemap|docs/i, /information architecture|navigation|mental model|sitemap/i]],
  ["B3.3", "Error prevention and recovery", [/interaction|forms?|ux|docs/i, /error prevention|recovery|validation|undo/i]],
  ["B4.1", "Visual hierarchy", [/visual|brand|design|docs/i, /hierarchy|typography|spacing|layout/i]],
  ["B5.2", "WCAG AA conformance", [/accessibility|a11y|wcag/i, /WCAG 2\.2|AA|inclusive/i]],
  ["B6.1", "Voice and tone documentation", [/content|voice|tone|ux writing/i, /voice|tone|content design|microcopy/i]],
  ["B7.1", "Heuristic evaluation cadence", [/heuristic|audit|review/i, /Nielsen|heuristic|cadence|coverage/i]],
  ["B8.1", "Core Web Vitals", [/performance|web vitals|lighthouse/i, /LCP|Core Web Vitals|INP|CLS|Lighthouse/i]],
  ["B9.1", "No-dark-pattern guarantee", [/privacy|ethics|trust|dark/i, /dark pattern|privacy|consent|FTC/i]],
  ["B10.1", "HEART framework adoption", [/metrics?|heart|measurement/i, /HEART|happiness|engagement|adoption|retention|task success/i]]
];

const SKIP_DIRS = new Set([".git", "node_modules", ".vercel", ".next", "dist", "coverage"]);
const TEXT_EXT = new Set([".md", ".mdx", ".txt", ".json", ".js", ".mjs", ".ts", ".tsx", ".html", ".css", ".svg", ".yml", ".yaml"]);

function extname(path) {
  const dot = path.lastIndexOf(".");
  return dot >= 0 ? path.slice(dot).toLowerCase() : "";
}

export function walkFiles(root, limit = 1500) {
  const out = [];
  function walk(dir) {
    if (out.length >= limit) return;
    for (const entry of readdirSync(dir)) {
      if (entry.startsWith(".") && entry !== ".github") continue;
      if (SKIP_DIRS.has(entry)) continue;
      const path = join(dir, entry);
      const st = statSync(path);
      if (st.isDirectory()) walk(path);
      else if (TEXT_EXT.has(extname(path)) && st.size <= 300000) out.push(path);
      if (out.length >= limit) return;
    }
  }
  if (existsSync(root)) walk(root);
  return out;
}

function levelFor(scorePct) {
  if (scorePct >= 90) return "L5";
  if (scorePct >= 75) return "L4";
  if (scorePct >= 60) return "L3";
  if (scorePct >= 40) return "L2";
  if (scorePct >= 20) return "L1";
  return "L0";
}

function publicCap(level) {
  const order = ["L0", "L1", "L2", "L3", "L4", "L5"];
  return order.indexOf(level) > order.indexOf("L3") ? "L3" : level;
}

function scoreCriterion(files, corpus, criterion) {
  const [id, name, patterns] = criterion;
  const fileHit = files.some((file) => patterns[0].test(relative(corpus.root, file)));
  const textHits = corpus.texts.filter((text) => patterns[1].test(text)).length;
  const score = fileHit && textHits >= 2 ? 5 : (fileHit || textHits > 0 ? 3 : 0);
  return {
    id,
    criterion: name,
    score,
    evidence: `${fileHit ? "file evidence" : "no file evidence"}; ${textHits} text hit(s)`
  };
}

export function scanRepository(inputRoot = ".") {
  const root = resolve(inputRoot);
  const started = Date.now();
  const files = walkFiles(root);
  const texts = files.map((file) => {
    try {
      return readFileSync(file, "utf8").slice(0, 12000);
    } catch {
      return "";
    }
  });
  const corpus = { root, texts };
  const criteria = CORE_CRITERIA.map((criterion) => scoreCriterion(files, corpus, criterion));
  const raw = criteria.reduce((sum, item) => sum + item.score, 0);
  const scorePct = Number(((raw / (CORE_CRITERIA.length * 5)) * 100).toFixed(1));
  const level = levelFor(scorePct);
  return {
    generated: new Date().toISOString(),
    input: root,
    elapsed_ms: Date.now() - started,
    files_scanned: files.length,
    core_count: CORE_CRITERIA.length,
    score_pct: scorePct,
    level,
    public_level: publicCap(level),
    criteria,
    footer: "DSAF CLI scores are fast self-assessment evidence. Public self-audits cap at L3 without third-party verification."
  };
}

export function formatSummary(result) {
  const rows = result.criteria.map((item) => `${item.id.padEnd(6)} ${String(item.score).padStart(1)}/5  ${item.criterion}`);
  return [
    `DSAF-25 Core scan`,
    `Input: ${result.input}`,
    `Score: ${result.score_pct}% (${result.level}; public self-audit cap ${result.public_level})`,
    `Files scanned: ${result.files_scanned} in ${result.elapsed_ms}ms`,
    "",
    ...rows,
    "",
    result.footer
  ].join("\n");
}
