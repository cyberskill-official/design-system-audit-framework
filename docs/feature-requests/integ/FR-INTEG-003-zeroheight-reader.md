---
id: FR-INTEG-003
title: "zeroheight-export HTML reader — `@dsaf/zeroheight-reader` CLI + library; scores A.3 Documentation + A.5 Tooling subset"
module: INTEG
priority: SHOULD
status: accepted
verify: T
phase: P2
milestone: P2 · slice 1 · Community velocity
slice: 1
owner: Stephen Cheng (Founder) + community engineer
created: 2026-05-17
shipped: null
related_frs: [FR-CORE-001, FR-CORE-003, FR-CORE-004, FR-INTEG-001, FR-INTEG-002, FR-CLI-001]
depends_on: [FR-CORE-001, FR-INTEG-001]
blocks: []
source_pages:
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Phase 2 — Community velocity action 2)"
source_decisions:
  - "DEC-088: reader supports zeroheight static HTML export (their canonical 'export your docs site' feature)"
  - "DEC-089: scoring scope = A.3 Documentation + A.5 Tooling subset (~10 criteria across these two categories)"
  - "DEC-090: reader is standalone CLI + library; shares FR-INTEG-001 scoring contract"
  - "DEC-091: HTML parsing via lightweight DOM library (cheerio or linkedom); no headless browser required"
language: typescript + nodejs
service: npm package `@dsaf/zeroheight-reader`
new_files:
  - packages/zeroheight-reader/package.json
  - packages/zeroheight-reader/tsconfig.json
  - packages/zeroheight-reader/src/index.ts
  - packages/zeroheight-reader/src/cli.ts
  - packages/zeroheight-reader/src/parser.ts
  - packages/zeroheight-reader/src/types.ts
  - packages/zeroheight-reader/src/scoring.ts
  - packages/zeroheight-reader/src/validators/usage-guidelines.ts
  - packages/zeroheight-reader/src/validators/code-examples.ts
  - packages/zeroheight-reader/src/validators/dos-donts.ts
  - packages/zeroheight-reader/src/validators/a11y-notes.ts
  - packages/zeroheight-reader/src/validators/contribution-guide.ts
  - packages/zeroheight-reader/src/validators/search-nav.ts
  - packages/zeroheight-reader/src/validators/doc-freshness.ts
  - packages/zeroheight-reader/src/validators/figma-library.ts
  - packages/zeroheight-reader/src/validators/code-package.ts
  - packages/zeroheight-reader/src/validators/storybook.ts
  - packages/zeroheight-reader/tests/parser.test.ts
  - packages/zeroheight-reader/tests/validators.test.ts
  - packages/zeroheight-reader/tests/fixtures/zeroheight-export-sample/
  - packages/zeroheight-reader/README.md
  - packages/zeroheight-reader/CHANGELOG.md
  - .github/workflows/zeroheight-reader-ci.yml
  - docs/integrations/zeroheight-reader.md
modified_files:
  - README.md
  - dsaf.dev/index.html
allowed_tools:
  - "file_read/write packages/zeroheight-reader/**, .github/workflows/**, docs/integrations/**"
  - "npm publish"
  - "Vitest"
disallowed_tools:
  - "scrape zeroheight.com directly (violates ToS); reader operates on exported HTML files only"
  - "score criteria outside A.3 + A.5"
  - "ship as paid"
  - "include paid-funnel CTAs"
effort_hours: 12
sub_tasks:
  - "1. (1h) Scaffold packages/zeroheight-reader/"
  - "2. (2h) Author src/types.ts + src/parser.ts — HTML parsing via cheerio; extract pages, sections, components"
  - "3. (4h) Author 10 validators (one per A.3 + A.5 criterion in scope)"
  - "4. (1h) Author src/scoring.ts + src/cli.ts"
  - "5. (2.5h) Author tests + sample export fixture (synthetic small zeroheight HTML structure)"
  - "6. (1h) Author CI workflow + README + dsaf.dev docs"
  - "7. (30m) Patch README + dsaf.dev cross-links"
risk_if_skipped: "Plan §Phase 2 action 2 names zeroheight reader as the third of three integrations. zeroheight is the largest standalone DS-documentation SaaS (~50k+ teams per their public stats); skipping leaves zeroheight-using teams without DSAF-aware tooling for A.3 Documentation + A.5 Tooling categories. The cost is operational (12h); the value is reach into the zeroheight-using subset of DS teams + completion of the 3-integration trio."
---

## §1 — Specification (BCP-14 normative)

The framework SHOULD ship the zeroheight-export reader at `@dsaf/zeroheight-reader` (npm) as a standalone CLI + library. The reader parses zeroheight static HTML exports; runs 10 validators across A.3 Documentation (7 criteria) + A.5 Tooling (3 of 6 criteria in scope); emits `CriterionScore[]` matching FR-INTEG-001 contract.

1. **MUST** ship at npm package `@dsaf/zeroheight-reader`.
2. **MUST** accept input as: (a) path to a directory containing the zeroheight HTML export; (b) path to a single index.html file (single-page export).
3. **MUST** ship 10 validators scoring criteria in scope per §3:
   - **A.3 Documentation (7):** A.3.1 Usage guidelines, A.3.2 Code examples, A.3.3 Do's/Don'ts, A.3.4 Accessibility notes, A.3.5 Contribution guide, A.3.6 Search & nav, A.3.7 Doc freshness
   - **A.5 Tooling (3):** A.5.1 Figma library (presence via zeroheight Figma integration), A.5.2 Code package (presence via zeroheight code-snippet embedding), A.5.4 Storybook (presence via zeroheight Storybook embed)
4. **MUST** emit `CriterionScore[]` matching FR-INTEG-001 contract.
5. **MUST** ship a CLI: `npx @dsaf/zeroheight-reader path/to/export/`.
6. **MUST** include `audit_targets` output convention.
7. **MUST** parse HTML via lightweight library (cheerio recommended; ~70KB unpacked). NO headless browser.
8. **MUST NOT** scrape zeroheight.com directly. Reader operates only on exported HTML files (the user invokes zeroheight's "Export" feature, then runs the reader against the local export).
9. **MUST** ship ≥ 80% Vitest coverage.
10. **MUST** include a synthetic fixture at `tests/fixtures/zeroheight-export-sample/` — a small HTML structure mimicking zeroheight's export shape. Real zeroheight exports are not committed (per zeroheight ToS + customer confidentiality).
11. **MUST** include CI matching FR-INTEG-001/002 pattern.
12. **MUST** include user docs at `docs/integrations/zeroheight-reader.md`.
13. **MUST** apply cap-rule disclosure in CLI footer per FR-CORE-004.
14. **MUST** apply FR-BRAND-002 taxonomy + FR-BRAND-004 decoupling + MIT license.
15. **MUST NOT** score criteria outside A.3 + A.5.

---

## §2 — Why this design

**Why HTML-export not API:** zeroheight has a customer-facing "Export your docs as static HTML" feature; using exports respects customer data ownership + doesn't require API auth + works offline. Scraping zeroheight.com would violate their ToS.

**Why cheerio not headless browser:** zeroheight exports are static HTML with no JS runtime requirement; cheerio is ~70KB vs Puppeteer's ~300MB. Massive overhead savings.

**Why scope A.3 + A.5 only:** zeroheight is fundamentally a documentation tool with light tooling-integration features. Documentation criteria (A.3) are core; some tooling criteria (Figma + code + Storybook integrations) are detectable via zeroheight's standard widgets. Other categories aren't observable from zeroheight HTML alone.

**Why synthetic fixture:** real zeroheight exports may contain customer-proprietary content. The synthetic fixture mimics structure without confidentiality risk.

---

## §3 — File shapes / API contracts

### `packages/zeroheight-reader/package.json` (matches FR-INTEG-002 pattern)

```json
{
  "name": "@dsaf/zeroheight-reader",
  "version": "0.1.0",
  "description": "DSAF zeroheight-export reader — scores A.3 Documentation + A.5 Tooling criteria from zeroheight HTML exports.",
  "license": "MIT",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "bin": { "dsaf-zeroheight-reader": "./dist/cli.js" },
  "files": ["dist/**/*", "README.md", "CHANGELOG.md"],
  "scripts": {
    "build": "tsc",
    "test": "vitest run --coverage",
    "lint": "tsc --noEmit"
  },
  "peerDependencies": {
    "@dsaf/storybook-addon": ">=0.1.0"
  },
  "peerDependenciesMeta": {
    "@dsaf/storybook-addon": { "optional": true }
  },
  "dependencies": {
    "cheerio": "^1.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@vitest/coverage-v8": "^1.0.0",
    "typescript": "^5.0.0",
    "vitest": "^1.0.0"
  },
  "publishConfig": { "access": "public" }
}
```

### `packages/zeroheight-reader/src/types.ts`

```typescript
export type { CriterionScore } from '@dsaf/storybook-addon';

/** Parsed zeroheight export */
export interface ParsedExport {
  /** All discoverable pages */
  pages: ZeroheightPage[];
  /** All discoverable component pages (subset of pages) */
  components: ComponentPage[];
  /** Detected widgets (Figma embed, code embed, Storybook embed) */
  widgets: WidgetDetection;
  /** Detected search/navigation features */
  navigation: NavigationDetection;
  /** Last-updated timestamps detected in pages */
  freshness: FreshnessSignals;
  warnings: string[];
}

export interface ZeroheightPage {
  url: string;          // relative path within export
  title: string;
  sections: string[];   // detected H2 sections
  hasCodeBlock: boolean;
  hasA11ySection: boolean;
  hasDosDontsSection: boolean;
  lastUpdated?: string;
}

export interface ComponentPage extends ZeroheightPage {
  componentName: string;
  hasUsageGuidelines: boolean;
  hasAnatomy: boolean;
  hasVariants: boolean;
}

export interface WidgetDetection {
  hasFigmaEmbed: boolean;
  hasCodeEmbed: boolean;
  hasStorybookEmbed: boolean;
}

export interface NavigationDetection {
  hasSearch: boolean;
  hasSidebar: boolean;
  hasBreadcrumbs: boolean;
}

export interface FreshnessSignals {
  pagesWithLastUpdated: number;
  totalPages: number;
  oldestPageDays: number | null;
  newestPageDays: number | null;
}

export type Validator = (exp: ParsedExport) => {
  criterionId: string;
  score: 0 | 1 | 2 | 3 | 4 | 5;
  rationale: string;
};
```

### `packages/zeroheight-reader/src/parser.ts` (excerpt)

```typescript
import * as cheerio from 'cheerio';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import type { ParsedExport, ZeroheightPage, ComponentPage } from './types.js';

export function parseExport(exportPath: string): ParsedExport {
  const isDir = statSync(exportPath).isDirectory();
  const htmlFiles = isDir ? collectHtmlFiles(exportPath) : [exportPath];

  const pages: ZeroheightPage[] = [];
  const components: ComponentPage[] = [];
  let widgets = { hasFigmaEmbed: false, hasCodeEmbed: false, hasStorybookEmbed: false };
  let navigation = { hasSearch: false, hasSidebar: false, hasBreadcrumbs: false };
  const warnings: string[] = [];

  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf-8');
    const $ = cheerio.load(html);

    const title = $('h1').first().text().trim() || $('title').text().trim();
    const sections = $('h2').map((_, el) => $(el).text().trim()).get();
    const hasCodeBlock = $('pre code, .code-block').length > 0;
    const hasA11ySection = sections.some(s => /accessibility|a11y/i.test(s));
    const hasDosDontsSection = sections.some(s => /do'?s|don'?ts/i.test(s));
    const lastUpdated = $('[data-last-updated], time').first().attr('datetime');

    const page: ZeroheightPage = {
      url: file,
      title,
      sections,
      hasCodeBlock,
      hasA11ySection,
      hasDosDontsSection,
      lastUpdated
    };
    pages.push(page);

    // Detect component pages by URL pattern (zeroheight component pages typically under /components/...)
    if (/\/components\//.test(file) || /\bcomponent\b/i.test(title)) {
      components.push({
        ...page,
        componentName: title,
        hasUsageGuidelines: sections.some(s => /usage|when to use/i.test(s)),
        hasAnatomy: sections.some(s => /anatomy/i.test(s)),
        hasVariants: sections.some(s => /variants?|states?/i.test(s))
      });
    }

    // Widget detection
    if ($('[data-figma], iframe[src*="figma.com"]').length > 0) widgets.hasFigmaEmbed = true;
    if ($('[data-code-snippet], pre.codepen, iframe[src*="codesandbox"]').length > 0) widgets.hasCodeEmbed = true;
    if ($('iframe[src*="storybook"], [data-storybook]').length > 0) widgets.hasStorybookEmbed = true;

    // Navigation detection
    if ($('[data-search], .search, input[type="search"]').length > 0) navigation.hasSearch = true;
    if ($('aside, nav.sidebar, [role="navigation"]').length > 0) navigation.hasSidebar = true;
    if ($('.breadcrumbs, [aria-label*="breadcrumb"]').length > 0) navigation.hasBreadcrumbs = true;
  }

  const pagesWithLastUpdated = pages.filter(p => p.lastUpdated).length;
  const dates = pages.map(p => p.lastUpdated).filter(Boolean).map(d => new Date(d!).getTime());
  const now = Date.now();
  const dayMs = 86400_000;

  return {
    pages,
    components,
    widgets,
    navigation,
    freshness: {
      pagesWithLastUpdated,
      totalPages: pages.length,
      oldestPageDays: dates.length > 0 ? Math.round((now - Math.min(...dates)) / dayMs) : null,
      newestPageDays: dates.length > 0 ? Math.round((now - Math.max(...dates)) / dayMs) : null
    },
    warnings
  };
}

function collectHtmlFiles(dir: string): string[] {
  const results: string[] = [];
  function walk(d: string) {
    for (const entry of readdirSync(d)) {
      const full = join(d, entry);
      const st = statSync(full);
      if (st.isDirectory()) walk(full);
      else if (extname(entry) === '.html') results.push(full);
    }
  }
  walk(dir);
  return results;
}
```

### `packages/zeroheight-reader/src/validators/usage-guidelines.ts`

```typescript
/**
 * A.3.1 — Usage guidelines per component.
 *
 * Rubric:
 *   0: Code only (no docs at all)
 *   3: Usage + anatomy + examples present per component
 *   5: Decision tree for variant choice + real product screenshots
 */

import type { ParsedExport, Validator } from '../types.js';

export const usageGuidelinesValidator: Validator = (exp) => {
  if (exp.components.length === 0) {
    return {
      criterionId: 'A.3.1',
      score: 0,
      rationale: 'No component pages detected in zeroheight export.'
    };
  }

  const withGuidelines = exp.components.filter(c => c.hasUsageGuidelines).length;
  const withAnatomy = exp.components.filter(c => c.hasAnatomy).length;
  const withVariants = exp.components.filter(c => c.hasVariants).length;

  const guidelinesRatio = withGuidelines / exp.components.length;
  const anatomyRatio = withAnatomy / exp.components.length;
  const variantsRatio = withVariants / exp.components.length;

  const avgRatio = (guidelinesRatio + anatomyRatio + variantsRatio) / 3;

  let score: 0 | 1 | 2 | 3 | 4 | 5;
  let rationale: string;

  if (avgRatio >= 0.9) {
    score = 5;
    rationale = `${exp.components.length} components; ${Math.round(avgRatio * 100)}% have usage + anatomy + variants. Look for decision trees + screenshots for 5 fidelity.`;
  } else if (avgRatio >= 0.7) {
    score = 4;
    rationale = `${exp.components.length} components; ${Math.round(avgRatio * 100)}% have usage/anatomy/variants coverage.`;
  } else if (avgRatio >= 0.5) {
    score = 3;
    rationale = `Usage guidelines partial (${Math.round(avgRatio * 100)}%). Aim for 70%+ for 4.`;
  } else if (avgRatio >= 0.2) {
    score = 2;
    rationale = `Documentation light. ${withGuidelines} of ${exp.components.length} components have usage guidelines.`;
  } else if (exp.components.length > 0) {
    score = 1;
    rationale = `Components documented but no structured usage guidelines.`;
  } else {
    score = 0;
    rationale = 'No discoverable usage guidelines.';
  }

  return { criterionId: 'A.3.1', score, rationale };
};
```

### `packages/zeroheight-reader/src/scoring.ts`

```typescript
import type { CriterionScore, ParsedExport, Validator } from './types.js';

import { usageGuidelinesValidator } from './validators/usage-guidelines.js';
import { codeExamplesValidator } from './validators/code-examples.js';
import { dosDontsValidator } from './validators/dos-donts.js';
import { a11yNotesValidator } from './validators/a11y-notes.js';
import { contributionGuideValidator } from './validators/contribution-guide.js';
import { searchNavValidator } from './validators/search-nav.js';
import { docFreshnessValidator } from './validators/doc-freshness.js';
import { figmaLibraryValidator } from './validators/figma-library.js';
import { codePackageValidator } from './validators/code-package.js';
import { storybookValidator } from './validators/storybook.js';

const ALL_VALIDATORS: Validator[] = [
  usageGuidelinesValidator,   // A.3.1
  codeExamplesValidator,      // A.3.2
  dosDontsValidator,          // A.3.3
  a11yNotesValidator,         // A.3.4
  contributionGuideValidator, // A.3.5
  searchNavValidator,         // A.3.6
  docFreshnessValidator,      // A.3.7
  figmaLibraryValidator,      // A.5.1
  codePackageValidator,       // A.5.2
  storybookValidator          // A.5.4
];

const CRITERION_METADATA: Record<string, { name: string; tag: 'FIXED' | 'DYNAMIC' }> = {
  'A.3.1': { name: 'Usage guidelines per component', tag: 'FIXED' },
  'A.3.2': { name: 'Code examples (live, copy-paste)', tag: 'FIXED' },
  'A.3.3': { name: "Do's / Don'ts", tag: 'FIXED' },
  'A.3.4': { name: 'Accessibility notes per component', tag: 'FIXED' },
  'A.3.5': { name: 'Contribution guide', tag: 'FIXED' },
  'A.3.6': { name: 'Search & navigation', tag: 'FIXED' },
  'A.3.7': { name: 'Doc freshness signals', tag: 'DYNAMIC' },
  'A.5.1': { name: 'Figma library with components, variables, modes', tag: 'FIXED' },
  'A.5.2': { name: 'Code package(s) distributed via npm', tag: 'FIXED' },
  'A.5.4': { name: 'Storybook (or equivalent)', tag: 'FIXED' }
};

export function validate(exp: ParsedExport): CriterionScore[] {
  const computedAt = new Date().toISOString();
  const scores: CriterionScore[] = [];

  for (const validator of ALL_VALIDATORS) {
    const result = validator(exp);
    const meta = CRITERION_METADATA[result.criterionId];
    if (!meta) continue;
    scores.push({
      id: result.criterionId,
      name: meta.name,
      score: result.score,
      tag: meta.tag,
      rationale: result.rationale,
      computedAt
    });
  }

  return scores;
}

export function toAuditTargets(scores: CriterionScore[]): Record<string, number> {
  const targets: Record<string, number> = {};
  for (const s of scores) targets[s.id] = s.score;
  return targets;
}
```

### `packages/zeroheight-reader/src/cli.ts`

```typescript
#!/usr/bin/env node
import { parseExport } from './parser.js';
import { validate, toAuditTargets } from './scoring.js';

const args = process.argv.slice(2);
if (args.length === 0 || args[0] === '--help') {
  console.log(`
Usage: dsaf-zeroheight-reader <path-to-export-directory-or-html>

Reads a zeroheight static HTML export + scores A.3 Documentation + A.5 Tooling criteria.

Export from zeroheight via your team admin: Settings → Export → Static HTML.
Output: per-criterion table + audit_targets JSON + cap-rule disclosure.
`);
  process.exit(0);
}

const path = args[0];

try {
  const exp = parseExport(path);
  console.log(`Parsed: ${exp.pages.length} pages, ${exp.components.length} component pages.`);
  console.log(`Widgets: Figma=${exp.widgets.hasFigmaEmbed}, Code=${exp.widgets.hasCodeEmbed}, Storybook=${exp.widgets.hasStorybookEmbed}`);
  console.log(`Navigation: Search=${exp.navigation.hasSearch}, Sidebar=${exp.navigation.hasSidebar}\n`);

  const scores = validate(exp);

  console.log('Per-criterion scores:');
  console.log('--------------------------------------------------------------------------------');
  console.log(`${'ID'.padEnd(8)}${'Score'.padEnd(8)}${'Tag'.padEnd(10)}Rationale`);
  console.log('--------------------------------------------------------------------------------');
  for (const s of scores) {
    console.log(`${s.id.padEnd(8)}${(`${s.score}/5`).padEnd(8)}${s.tag.padEnd(10)}${s.rationale}`);
  }
  console.log('--------------------------------------------------------------------------------\n');

  const total = scores.reduce((sum, s) => sum + s.score, 0);
  const max = scores.length * 5;
  console.log(`Overall A.3 + A.5 subset: ${(total / max * 100).toFixed(1)}% (${total}/${max})\n`);

  console.log('audit_targets:');
  console.log(JSON.stringify(toAuditTargets(scores), null, 2));
  console.log();

  console.log('---');
  console.log('Cap-rule: These scores are self-assessment. Public DSAF Level caps at L3 (Managed) without');
  console.log('third-party verification per https://dsaf.dev/branding/self-audit-policy.');

  process.exit(0);
} catch (e) {
  console.error(`Error: ${e instanceof Error ? e.message : String(e)}`);
  process.exit(1);
}
```

### `packages/zeroheight-reader/tests/fixtures/zeroheight-export-sample/index.html` (synthetic)

```html
<!doctype html>
<html lang="en">
<head>
<title>Sample Design System — zeroheight</title>
<meta data-last-updated="2026-03-15">
</head>
<body>
<nav class="sidebar">
  <input type="search" placeholder="Search docs">
  <ul>
    <li><a href="components/button.html">Button</a></li>
    <li><a href="components/input.html">Input</a></li>
  </ul>
</nav>
<main>
  <h1>Sample Design System</h1>
  <p>Welcome to our design system documentation.</p>
</main>
</body>
</html>
```

### `packages/zeroheight-reader/tests/fixtures/zeroheight-export-sample/components/button.html`

```html
<!doctype html>
<html lang="en">
<head>
<title>Button — Sample Design System</title>
<time datetime="2026-03-10">Last updated</time>
</head>
<body>
<main>
  <h1>Button Component</h1>
  <h2>Usage</h2>
  <p>Use buttons to trigger actions...</p>
  <h2>Anatomy</h2>
  <p>A button consists of...</p>
  <h2>Variants</h2>
  <p>Primary, secondary, ghost...</p>
  <h2>Accessibility</h2>
  <p>Keyboard support: Tab, Enter, Space...</p>
  <h2>Do's and Don'ts</h2>
  <ul>
    <li>Do: use buttons for actions</li>
    <li>Don't: use buttons for navigation</li>
  </ul>
  <pre><code>&lt;button&gt;Click me&lt;/button&gt;</code></pre>
  <iframe src="https://figma.com/embed/..."></iframe>
  <iframe src="https://storybook.example.com/?id=button"></iframe>
</main>
</body>
</html>
```

---

## §4 — Acceptance criteria

1. **Package scaffolded** — `packages/zeroheight-reader/package.json` etc. exist.
2. **10 validators shipped** — `src/validators/*.ts` has 10 files.
3. **Parser handles dir + single file** — both modes tested.
4. **CLI works** — `npx @dsaf/zeroheight-reader tests/fixtures/zeroheight-export-sample/` runs + exits 0.
5. **CriterionScore[] matches FR-INTEG-001** — type re-export.
6. **audit_targets output** — CLI prints JSON section.
7. **≥ 80% Vitest coverage**.
8. **Synthetic fixture** — `tests/fixtures/zeroheight-export-sample/` exists with ≥ 2 HTML files mimicking zeroheight structure.
9. **CI workflow** — `.github/workflows/zeroheight-reader-ci.yml`.
10. **User docs** — `docs/integrations/zeroheight-reader.md` with install, CLI, formats, troubleshooting.
11. **Cap-rule disclosure** — CLI prints L3-cap text.
12. **MIT license**.
13. **Handle taxonomy + no paid CTAs** — grep checks.
14. **Scope A.3 + A.5 only** — `grep -oE 'A\.[35]\.[0-9]+' src/scoring.ts | sort -u` returns only A.3.x and A.5.x.
15. **No zeroheight.com scraping** — `grep -r 'fetch\|http\|axios' packages/zeroheight-reader/src/` returns 0 matches.

---

## §5 — Verification

```bash
# AC1, AC2 — scaffolding + 10 validators
test -f packages/zeroheight-reader/package.json
ls packages/zeroheight-reader/src/validators/ | wc -l  # 10

# AC4 — CLI works
cd packages/zeroheight-reader && npm run build
node dist/cli.js tests/fixtures/zeroheight-export-sample/

# AC7 — coverage
cd packages/zeroheight-reader && npm test  # lines >= 80%

# AC8 — fixture exists
test -d packages/zeroheight-reader/tests/fixtures/zeroheight-export-sample/

# AC9 — CI
test -f .github/workflows/zeroheight-reader-ci.yml

# AC11 — cap-rule disclosure
grep -q 'L3' packages/zeroheight-reader/src/cli.ts

# AC12 — MIT
grep -q '"license": "MIT"' packages/zeroheight-reader/package.json

# AC14 — A.3 + A.5 scope only
grep -oE "A\.[0-9]+\.[0-9]+" packages/zeroheight-reader/src/scoring.ts | sort -u
# Expected: A.3.1, A.3.2, A.3.3, A.3.4, A.3.5, A.3.6, A.3.7, A.5.1, A.5.2, A.5.4

# AC15 — no scraping
grep -r -E '\b(fetch|axios|http\.)' packages/zeroheight-reader/src/ | grep -v 'http://www\.w3\.org'
# Expected: empty (or only namespace URIs)
```

---

## §6 — Implementation skeleton

The operator playbook (12h):

1. (1h) Scaffold packages/zeroheight-reader/
2. (2h) Author types + parser
3. (4h) Author 10 validators
4. (1h) Author scoring + CLI
5. (2.5h) Author tests + fixture
6. (1h) CI + README + docs
7. (30m) Cross-link patches

---

## §7 — Dependencies

- **Upstream:** FR-CORE-001 (criterion metadata), FR-INTEG-001 (shared CriterionScore type).
- **Coordinated:** FR-CORE-004 cap-rule, FR-BRAND-001/002/004, FR-INTEG-002 (sibling validator pattern).
- **Downstream:** FR-CLI-001 P5 consumes audit_targets.
- **External:** cheerio HTML parser, zeroheight Export feature (user-side).

---

## §8 — Example payloads

### CLI output

```
$ npx @dsaf/zeroheight-reader tests/fixtures/zeroheight-export-sample/
Parsed: 3 pages, 2 component pages.
Widgets: Figma=true, Code=true, Storybook=true
Navigation: Search=true, Sidebar=true

Per-criterion scores:
--------------------------------------------------------------------------------
ID      Score   Tag       Rationale
--------------------------------------------------------------------------------
A.3.1   4/5     FIXED     2 components; 100% have usage + anatomy + variants. Look for decision trees for 5.
A.3.2   3/5     FIXED     Code blocks detected on 100% of component pages.
A.3.3   4/5     FIXED     Do's/Don'ts section on 100% of components.
A.3.4   4/5     FIXED     Accessibility section on 100% of components.
A.3.5   0/5     FIXED     No CONTRIBUTING.md or contribution-guide page detected.
A.3.6   4/5     FIXED     Search + sidebar present; breadcrumbs not detected.
A.3.7   3/5     DYNAMIC   2 of 3 pages have last-updated; oldest 78 days; newest 5 days.
A.5.1   3/5     FIXED     Figma embed detected on component pages.
A.5.2   2/5     FIXED     Code embed detected; need explicit npm package metadata for 4+.
A.5.4   3/5     FIXED     Storybook embed detected.
--------------------------------------------------------------------------------

Overall A.3 + A.5 subset: 60.0% (30/50)

audit_targets:
{
  "A.3.1": 4,
  "A.3.2": 3,
  ...
}

---
Cap-rule: These scores are self-assessment. Public DSAF Level caps at L3 (Managed) without
third-party verification per https://dsaf.dev/branding/self-audit-policy.
```

---

## §9 — Open questions

- **Q1: Other DS-doc tools?** Deferred. Notion exports, Confluence, Docusaurus — future-FRs.
- **Q2: Real zeroheight customer fixture?** Resolved → no (confidentiality). Synthetic is the test mode.
- **Q3: zeroheight API integration?** Resolved → no for v0.1 (ToS + auth complexity). HTML-only.

---

## §10 — Failure modes inventory

| Failure | Detection | Outcome | Recovery |
|---|---|---|---|
| zeroheight changes export format | parser produces sparse data | Low scores misleadingly | Pin to known-good zeroheight export version; ship parser updates as format evolves |
| User exports incomplete docs | sparse pages | Low scores | Cli warns if < 5 pages found |
| Component detection heuristic fails | components.length = 0 | Validators score 0 | User can pass `--component-pattern` (future flag) |
| Widget detection false negatives | hasFigmaEmbed=false despite embed | A.5.x score lower than reality | Update widget selectors per real export samples |
| HTML malformed | cheerio parse error | Validator throws | Catch + warn + skip page |
| Last-updated metadata missing | freshness=null | A.3.7 score lower | User adds zeroheight last-updated metadata (zeroheight feature) |
| zeroheight customer data in repo accidentally | git commit | Privacy breach | .gitignore'd fixtures dir + only synthetic checked in |
| Score regression after criterion changes | downstream tools see drift | Audit drift | Update CRITERION_METADATA + version bump |
| Large export performance | slow CLI | Bad UX | Stream-parse for >1000 pages (future) |
| ToS concerns from zeroheight | community feedback | Brand risk | Operate on user-exported HTML only; never scrape live |

---

## §11 — Implementation notes

- **Heuristic detection has limits.** Component-page detection via URL pattern + title keyword works for ~90% of standard zeroheight setups; edge cases warrant configuration flags (future).
- **Widget selectors evolve.** zeroheight may change how they embed Figma/code/Storybook; the parser's selectors are best-effort + need maintenance.
- **Real customer fixtures are forbidden in the repo.** The synthetic fixture is intentionally small + structurally minimal but format-faithful.
- **Cross-package consistency:** matches FR-INTEG-001 + FR-INTEG-002 patterns — same scoring contract, same CLI shape, same disclosure footer. The 3 INTEG packages are a cohesive trio.
- **Future-FR potential:** other DS-doc tools (Notion, Docusaurus, custom static sites). Each is its own integration package; the scoring engine is reusable.

---

*End of FR-INTEG-003.*
