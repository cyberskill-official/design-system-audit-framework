import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { basename, extname, join, relative, resolve } from "node:path";

const require = createRequire(import.meta.url);
let cheerio = null;
try {
  cheerio = require("cheerio");
} catch {
  cheerio = null;
}

const CRITERIA = [
  ["A3.1", "Usage guidelines per component"],
  ["A3.2", "Code outputs/examples"],
  ["A3.3", "Do's and Don'ts"],
  ["A3.4", "Accessibility notes"],
  ["A3.5", "Contribution guide"],
  ["A3.6", "Search and navigation"],
  ["A3.7", "Documentation freshness"],
  ["A5.1", "Figma library integration"],
  ["A5.2", "Code package integration"],
  ["A5.4", "Storybook integration"]
];

const CAP_FOOTER = "These scores are self-assessment evidence. Public DSAF Level caps at L3 without third-party verification.";

function decodeEntities(value) {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");
}

function stripTags(html) {
  if (cheerio?.load) {
    const $ = cheerio.load(html);
    $("script, style, svg").remove();
    return decodeEntities($.root().text().replace(/\s+/g, " ").trim());
  }
  return decodeEntities(html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim());
}

function allMatches(source, pattern) {
  return Array.from(source.matchAll(pattern)).map((match) => match[1] || match[0]);
}

function hasAny(text, patterns) {
  return patterns.some((pattern) => pattern.test(text));
}

function hasAll(text, patterns) {
  return patterns.every((pattern) => pattern.test(text));
}

function score(condition5, condition3) {
  if (condition5) return 5;
  if (condition3) return 3;
  return 0;
}

function criterion(id, criterionName, scoreValue, evidence) {
  return { id, criterion: criterionName, score: scoreValue, evidence };
}

function listHtmlFiles(input) {
  const absolute = resolve(input);
  if (!existsSync(absolute)) {
    throw new Error(`Missing input: ${absolute}`);
  }
  const stat = statSync(absolute);
  if (stat.isFile()) {
    if (extname(absolute).toLowerCase() !== ".html") {
      throw new Error(`Expected an .html file or directory of .html files: ${absolute}`);
    }
    return [absolute];
  }
  const files = [];
  function walk(dir) {
    for (const entry of readdirSync(dir)) {
      if (entry.startsWith(".") || entry === "node_modules") continue;
      const path = join(dir, entry);
      const current = statSync(path);
      if (current.isDirectory()) walk(path);
      else if (extname(path).toLowerCase() === ".html") files.push(path);
    }
  }
  walk(absolute);
  return files.sort();
}

function extractTitle(html, fallback) {
  const h1 = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1) return stripTags(h1[1]);
  const title = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  if (title) return stripTags(title[1]);
  return basename(fallback, ".html");
}

function extractSections(html) {
  return allMatches(html, /<h[2-4]\b[^>]*>([\s\S]*?)<\/h[2-4]>/gi)
    .map(stripTags)
    .filter(Boolean);
}

function extractLastUpdated(text) {
  const match = text.match(/\b(?:last updated|updated|reviewed)\s*:?\s*([A-Z][a-z]+ \d{1,2}, \d{4}|\d{4}-\d{2}-\d{2})\b/i);
  return match ? match[1] : null;
}

function classifyComponentPage(page) {
  const path = page.path.toLowerCase();
  const title = page.title.toLowerCase();
  const componentNameTitle = /\b(button|input|card|alert|modal|badge|accordion)\b/.test(title) && /usage|guidelines|component/.test(page.text_lc);
  return /components?\//.test(path) || componentNameTitle || /\b(button|input|card|alert|modal|badge|accordion)\b.*\bcomponent\b|\bcomponent\b.*\b(button|input|card|alert|modal|badge|accordion)\b/.test(title);
}

export function parseZeroheightExport(input) {
  const absolute = resolve(input);
  const root = statSync(absolute).isDirectory() ? absolute : resolve(absolute, "..");
  const files = listHtmlFiles(absolute);
  const pages = files.map((file) => {
    const html = readFileSync(file, "utf8");
    const text = stripTags(html);
    const lowerHtml = html.toLowerCase();
    const textLc = text.toLowerCase();
    const sections = extractSections(html);
    return {
      path: relative(root, file) || basename(file),
      title: extractTitle(html, file),
      text,
      text_lc: textLc,
      sections,
      hasCodeBlock: /<(pre|code)\b/i.test(html) || /\bnpm install\b|\bimport\s+.*\s+from\b/i.test(text),
      hasA11ySection: /accessibility|aria|keyboard|screen reader|focus state/i.test(text),
      hasDosDontsSection: /\bdo\b[\s\S]{0,80}\b(don't|dont|do not|avoid)\b/i.test(text) || sections.some((s) => /do'?s|don'?ts|avoid/i.test(s)),
      lastUpdated: extractLastUpdated(text),
      raw_lc: lowerHtml
    };
  });

  const combinedText = pages.map((page) => page.text).join("\n");
  const combined = combinedText.toLowerCase();
  const raw = pages.map((page) => page.raw_lc).join("\n");
  const componentPages = pages.filter(classifyComponentPage).map((page) => ({
    ...page,
    componentName: page.title,
    hasUsageGuidelines: /usage|when to use|when not to use|guidelines/.test(page.text_lc),
    hasAnatomy: /anatomy|parts|structure/.test(page.text_lc),
    hasVariants: /variant|state|size|density/.test(page.text_lc)
  }));
  const pagesWithLastUpdated = pages.filter((page) => page.lastUpdated).length;

  return {
    input: absolute,
    pages,
    components: componentPages,
    widgets: {
      hasFigmaEmbed: /figma|figma\.com|data-widget=["']figma|embed-figma/.test(raw) || /\bfigma\b/.test(combined),
      hasCodeEmbed: /<(pre|code)\b|data-widget=["']code|code-snippet|npm install|import\s+.*\s+from/.test(raw) || /\bnpm install\b|\bimport\s+.*\s+from\b/.test(combined),
      hasStorybookEmbed: /storybook|iframe[^>]+src=["'][^"']*storybook|data-widget=["']storybook/.test(raw)
    },
    navigation: {
      hasSearch: /type=["']search|placeholder=["'][^"']*search|class=["'][^"']*search|data-search/.test(raw) || /\bsearch docs\b|\bsearch components\b/.test(combined),
      hasSidebar: /<aside\b|role=["']navigation|class=["'][^"']*(sidebar|side-nav|sidenav)|data-navigation/.test(raw),
      hasBreadcrumbs: /breadcrumb|aria-label=["']breadcrumb/.test(raw)
    },
    freshness: {
      pagesWithLastUpdated,
      totalPages: pages.length
    },
    warnings: pages.length === 0 ? ["No HTML files were found in the input."] : []
  };
}

function validateParsedExport(exp) {
  const text = exp.pages.map((page) => page.text_lc).join("\n");
  const components = exp.components;
  const componentWithFullUsage = components.find((page) => page.hasUsageGuidelines && page.hasAnatomy && (page.hasVariants || /decision|choose|pattern/.test(page.text_lc)));
  const componentWithUsage = components.find((page) => page.hasUsageGuidelines);
  const codePages = exp.pages.filter((page) => page.hasCodeBlock);
  const hasInstallAndImport = hasAll(text, [/\bnpm install\b|\bpnpm add\b|\byarn add\b/, /\bimport\s+.*\s+from\b/]);
  const hasDosDonts = exp.pages.some((page) => page.hasDosDontsSection);
  const hasA11yDepth = hasAll(text, [/\baria\b/, /\bkeyboard\b/, /\bscreen reader\b|\bfocus\b/]);
  const hasPositiveA11yMention = hasAny(text, [/\baccessibility notes?\b/, /\baria\b/, /\bkeyboard\b/, /\bscreen reader\b/, /\bfocus state\b/])
    && !/\bno\s+(?:navigation, freshness, tooling embeds, code examples, or\s+)?accessibility notes?\b/.test(text);
  const hasContributionDepth = hasAll(text, [/\bcontribut(e|ion|ing)\b/, /\brfc\b|\bproposal\b/, /\breview\b|\bdecision\b/]);
  const hasFigmaDepth = exp.widgets.hasFigmaEmbed && hasAny(text, [/\bfigma library\b/, /\bfigma embed\b/, /\blibrary key\b/]);
  const hasStorybookDepth = exp.widgets.hasStorybookEmbed && hasAll(text, [/\bstorybook\b/, /\bviewport\b/, /\btheme\b/]);

  const checks = {
    "A3.1": criterion(
      "A3.1",
      "Usage guidelines per component",
      score(Boolean(componentWithFullUsage), Boolean(componentWithUsage)),
      `${components.filter((page) => page.hasUsageGuidelines).length}/${components.length} component pages include usage guidance; anatomy=${components.filter((page) => page.hasAnatomy).length}`
    ),
    "A3.2": criterion(
      "A3.2",
      "Code outputs/examples",
      score(codePages.length > 0 && hasInstallAndImport, codePages.length > 0 || /\bexample\b|\bcode snippet\b/.test(text)),
      `${codePages.length} pages include code blocks; install+import=${hasInstallAndImport}`
    ),
    "A3.3": criterion(
      "A3.3",
      "Do's and Don'ts",
      score(hasDosDonts && /because|rationale|accessibility|avoid/.test(text), hasDosDonts),
      `do/don't sections=${exp.pages.filter((page) => page.hasDosDontsSection).length}`
    ),
    "A3.4": criterion(
      "A3.4",
      "Accessibility notes",
      score(hasA11yDepth, hasPositiveA11yMention),
      `aria=${/\baria\b/.test(text)}; keyboard=${/\bkeyboard\b/.test(text)}; screen_reader_or_focus=${/\bscreen reader\b|\bfocus\b/.test(text)}`
    ),
    "A3.5": criterion(
      "A3.5",
      "Contribution guide",
      score(hasContributionDepth, /\bcontribut(e|ion|ing)\b|\bguideline\b/.test(text)),
      `contribution_depth=${hasContributionDepth}`
    ),
    "A3.6": criterion(
      "A3.6",
      "Search and navigation",
      score(exp.navigation.hasSearch && exp.navigation.hasSidebar && exp.navigation.hasBreadcrumbs, exp.navigation.hasSearch && exp.navigation.hasSidebar),
      `search=${exp.navigation.hasSearch}; sidebar=${exp.navigation.hasSidebar}; breadcrumbs=${exp.navigation.hasBreadcrumbs}`
    ),
    "A3.7": criterion(
      "A3.7",
      "Documentation freshness",
      score(exp.freshness.pagesWithLastUpdated >= 2, exp.freshness.pagesWithLastUpdated >= 1),
      `${exp.freshness.pagesWithLastUpdated}/${exp.freshness.totalPages} pages include last-updated or reviewed dates`
    ),
    "A5.1": criterion(
      "A5.1",
      "Figma library integration",
      score(hasFigmaDepth, exp.widgets.hasFigmaEmbed),
      `figma_embed=${exp.widgets.hasFigmaEmbed}; figma_depth=${hasFigmaDepth}`
    ),
    "A5.2": criterion(
      "A5.2",
      "Code package integration",
      score(exp.widgets.hasCodeEmbed && hasInstallAndImport, exp.widgets.hasCodeEmbed),
      `code_embed=${exp.widgets.hasCodeEmbed}; install+import=${hasInstallAndImport}`
    ),
    "A5.4": criterion(
      "A5.4",
      "Storybook integration",
      score(hasStorybookDepth, exp.widgets.hasStorybookEmbed || /\bstorybook\b/.test(text)),
      `storybook_embed=${exp.widgets.hasStorybookEmbed}; storybook_depth=${hasStorybookDepth}`
    )
  };

  return checks;
}

export function scoreZeroheightExport(input) {
  const parsed = parseZeroheightExport(input);
  const checks = validateParsedExport(parsed);
  const raw = Object.values(checks).reduce((sum, item) => sum + item.score, 0);
  const max = CRITERIA.length * 5;
  return {
    generated: new Date().toISOString(),
    input: parsed.input,
    page_count: parsed.pages.length,
    component_count: parsed.components.length,
    score_pct: max === 0 ? 0 : Number(((raw / max) * 100).toFixed(1)),
    checks,
    criterion_scores: Object.values(checks),
    audit_targets: Object.fromEntries(Object.entries(checks).map(([id, item]) => [id, item.score])),
    parser: "static-html-lightweight-dom-reader",
    warnings: parsed.warnings,
    footer: CAP_FOOTER
  };
}

export { CAP_FOOTER, CRITERIA };
