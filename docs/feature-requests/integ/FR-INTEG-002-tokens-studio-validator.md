---
id: FR-INTEG-002
title: "Tokens Studio export validator — `@dsaf/tokens-validator` CLI + library; scores A.1 Foundations & Tokens subset from tokens.json"
module: INTEG
priority: SHOULD
status: done
verify: T
phase: P2
milestone: P2 · slice 1 · Community velocity
slice: 1
owner: Stephen Cheng (Founder) + community engineer
created: 2026-05-17
shipped: 2026-05-18
related_frs: [FR-CORE-001, FR-CORE-003, FR-CORE-004, FR-INTEG-001, FR-INTEG-003, FR-CLI-001]
depends_on: [FR-CORE-001, FR-INTEG-001]
blocks: [FR-INTEG-003]
source_pages:
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Phase 2 — Community velocity action 2)"
  - "scripts/check-apca.mjs (parses tokens/colour.tokens.json; informs the tokens-validator's parsing approach)"
source_decisions:
  - "DEC-084: validator is a standalone CLI (`@dsaf/tokens-validator`) + a library importable from the Storybook addon (per FR-INTEG-001 §3 runner pattern reuse)"
  - "DEC-085: supports Tokens Studio JSON format (the primary export from the Tokens Studio Figma plugin) AND DTCG-conformant tokens.json (per criterion A.1.8)"
  - "DEC-086: scoring scope = A.1 Foundations & Tokens category (9 criteria: A.1.1-A.1.9); other categories out of scope (this is a tokens-focused validator)"
  - "DEC-087: validator ships with same scoring-engine contract as FR-INTEG-001 (CriterionScore[] output via audit_targets pattern) — INTEG-001's @dsaf/storybook-addon imports this validator as a runner"
language: typescript + nodejs
service: npm package `@dsaf/tokens-validator`
new_files:
  - packages/tokens-validator/package.json
  - packages/tokens-validator/tsconfig.json
  - packages/tokens-validator/src/index.ts
  - packages/tokens-validator/src/cli.ts
  - packages/tokens-validator/src/validators/three-tier.ts
  - packages/tokens-validator/src/validators/spacing-scale.ts
  - packages/tokens-validator/src/validators/dtcg-conformance.ts
  - packages/tokens-validator/src/validators/typography-scale.ts
  - packages/tokens-validator/src/validators/elevation-tokens.ts
  - packages/tokens-validator/src/validators/motion-tokens.ts
  - packages/tokens-validator/src/validators/iconography.ts
  - packages/tokens-validator/src/validators/grid-layout.ts
  - packages/tokens-validator/src/validators/modern-color-spaces.ts
  - packages/tokens-validator/src/scoring.ts
  - packages/tokens-validator/src/parser.ts
  - packages/tokens-validator/src/types.ts
  - packages/tokens-validator/tests/parser.test.ts
  - packages/tokens-validator/tests/validators.test.ts
  - packages/tokens-validator/tests/fixtures/dtcg-conformant.tokens.json
  - packages/tokens-validator/tests/fixtures/tokens-studio.tokens.json
  - packages/tokens-validator/tests/fixtures/hex-only.tokens.json
  - packages/tokens-validator/README.md
  - packages/tokens-validator/CHANGELOG.md
  - .github/workflows/tokens-validator-ci.yml
  - docs/integrations/tokens-validator.md
modified_files:
  - packages/storybook-addon/src/runners/coverage.ts   # FR-INTEG-001 coverage runner extended to optionally use tokens-validator output
  - README.md                                          # cross-link to the integration
  - dsaf.dev/index.html                                # Integrations footer link
allowed_tools:
  - "file_read/write packages/tokens-validator/**, .github/workflows/**, docs/integrations/**, README.md"
  - "npm publish for the validator package"
  - "Vitest for unit tests"
disallowed_tools:
  - "modify tokens-studio's output format (we consume what they emit; we don't dictate)"
  - "score criteria outside A.1 (A.2 components, A.3 docs, etc. are scored by other runners/validators)"
  - "ship as a paid tool (MIT-licensed free per FR-BRAND-001 sacredness)"
  - "include paid-funnel CTAs in CLI output or README"
  - "duplicate the FR-INTEG-001 scoring engine — import from `@dsaf/storybook-addon` OR a shared `@dsaf/scoring-core` package (refactor at FR-INTEG-003 or follow-on FR)"
effort_hours: 10
sub_tasks:
  - "1. (1h) Scaffold packages/tokens-validator/ — package.json, tsconfig.json, exports config"
  - "2. (1.5h) Author src/types.ts + src/parser.ts — Tokens Studio + DTCG JSON parsing into common shape"
  - "3. (3h) Author src/validators/ — 9 validators (one per A.1.1-A.1.9 criterion)"
  - "4. (1h) Author src/scoring.ts — reuses FR-INTEG-001 scoring engine; emits CriterionScore[] in same shape"
  - "5. (1h) Author src/cli.ts + bin entry — node CLI: `npx @dsaf/tokens-validator path/to/tokens.json`"
  - "6. (1.5h) Author tests/ — Vitest unit tests; fixture corpus (3 fixtures: DTCG, Tokens Studio, hex-only)"
  - "7. (30m) Author .github/workflows/tokens-validator-ci.yml + README.md + docs/integrations/tokens-validator.md"
  - "8. (15m) Patch FR-INTEG-001 coverage runner to optionally consume tokens-validator output"
  - "9. (15m) Patch README + dsaf.dev with integration cross-links"
risk_if_skipped: "Plan §Phase 2 action 2 names the Tokens Studio export validator alongside the Storybook addon + zeroheight reader as the three integrations that 'turn lurkers into stargazers.' Tokens Studio is the dominant Figma plugin for design tokens (~50k+ active users per Figma community stats); skipping this validator means tokens-focused DS teams have no DSAF-aware tooling for the A.1 Foundations & Tokens category — the highest-weight category in DSAF-125 (14%). The cost is operational (10h); the value is the design-token-first audience slice + the reusable validator pattern that FR-INTEG-003 (zeroheight reader) inherits. Skipping also breaks the FR-INTEG-001 + FR-INTEG-003 scoring-engine-sharing contract (the 3 INTEG FRs together form a cohesive integration suite; missing one leaves uneven coverage)."
---

## §1 — Specification (BCP-14 normative)

The framework SHOULD ship the Tokens Studio export validator at `@dsaf/tokens-validator` (npm) as a standalone CLI + a library importable from FR-INTEG-001's Storybook addon. The validator parses Tokens Studio JSON exports + DTCG-conformant `tokens.json` files; runs 9 validators (one per A.1 Foundations & Tokens criterion A.1.1-A.1.9); emits `CriterionScore[]` in the same shape as FR-INTEG-001's scoring engine. Supports MIT license, Vitest tests with ≥ 80% coverage, GitHub Actions CI, npm publishing under `@dsaf` org.

**2026-05-18 implementation note:** the local package surface is repo-shipped at `packages/tokens-validator/` with CLI/library exports, nine A.1 validators, fixtures, tests, docs, changelog, and CI. The repository compatibility command is `npm run integ:tokens -- <tokens.json>`.

1. **MUST** ship the validator at npm package name `@dsaf/tokens-validator`. The package is published from `packages/tokens-validator/` in the framework repo.
2. **MUST** support two input formats: (a) **Tokens Studio JSON** — the format emitted by the Tokens Studio Figma plugin (https://tokens.studio); (b) **DTCG-conformant tokens.json** per criterion A.1.8 (DTCG 2024.06 minimum; DTCG 2025.10 preferred). Auto-detect format from the JSON shape at parse time.
3. **MUST** ship 9 validators per §3, one per A.1 Foundations & Tokens criterion:
   - A.1.1 — Color tokens with primitive→semantic→component layers
   - A.1.2 — Typography scale and type tokens
   - A.1.3 — Spacing scale (4 / 8 px geometric)
   - A.1.4 — Elevation / shadow tokens
   - A.1.5 — Motion tokens (duration, easing, springs)
   - A.1.6 — Iconography system (tokens for icon size + grid)
   - A.1.7 — Grid & layout system (column/gutter/breakpoint tokens)
   - A.1.8 — Token format & DTCG conformance
   - A.1.9 — Modern color spaces (OKLCH, P3)
4. **MUST** emit `CriterionScore[]` in the same shape as FR-INTEG-001's scoring engine. The validator exports a `validate(tokens: ParsedTokens): CriterionScore[]` function that the addon imports. Cross-package consistency = shared scoring contract.
5. **MUST** ship a standalone CLI at `bin/dsaf-tokens-validator` (or `npx @dsaf/tokens-validator path/to/tokens.json`). The CLI: parses the input file, runs all 9 validators, prints per-criterion table to stdout, exits 0 on success / 1 on validation errors.
6. **MUST** include `audit_targets` output convention matching existing DSAF scripts. CLI output includes a JSON section at the end with `audit_targets: { "A.1.1": 4, "A.1.3": 5, ... }` that downstream tools (FR-INTEG-001 addon, FR-CLI-001 P5 `npx dsaf scan`) can consume.
7. **MUST** include ≥ 80% Vitest unit-test coverage. Tests cover: parser (Tokens Studio + DTCG + invalid input), each of the 9 validators against fixture tokens, scoring aggregation.
8. **MUST** include a fixture corpus at `tests/fixtures/`: (a) `dtcg-conformant.tokens.json` — a DTCG 2024.06 example with three-tier color tokens, spacing scale, typography; (b) `tokens-studio.tokens.json` — a Tokens Studio export sample; (c) `hex-only.tokens.json` — anti-pattern fixture with hex-coded colors instead of token references.
9. **MUST** include GitHub Actions CI at `.github/workflows/tokens-validator-ci.yml` matching FR-INTEG-001's pattern (matrix Node 20/22 + lint + test + build + coverage check).
10. **MUST** publish user-facing docs at `docs/integrations/tokens-validator.md` covering: installation, CLI usage, library integration with `@dsaf/storybook-addon`, per-criterion scoring rationale, troubleshooting (≥ 5 entries).
11. **MUST NOT** modify the Tokens Studio output format. The validator consumes what they emit; we don't dictate format changes upstream.
12. **MUST NOT** score criteria outside A.1 Foundations & Tokens. Other categories (A.2 components, A.3 docs, etc.) are scored by other runners (FR-INTEG-001 + FR-INTEG-003) or future validators.
13. **MUST** apply the FR-CORE-004 cap-rule disclosure in CLI output footer. After per-criterion scores, the CLI prints: "These scores are self-assessment. Public DSAF Level caps at L3 (Managed) without third-party verification per https://dsaf.dev/branding/self-audit-policy."
14. **MUST** apply FR-BRAND-002 handle taxonomy + FR-BRAND-004 decoupling. `DSAF` proper noun; no `Framework` noun-handle; no audit.cyberskill.world CTAs; MIT license matching framework.
15. **MUST** integrate with FR-INTEG-001 coverage runner — the addon's `runCoverage()` may optionally invoke `runTokensValidator()` if a tokens.json exists in the framework root. Integration is opt-in (the addon doesn't fail if tokens.json doesn't exist).

---

## §2 — Why this design

**Why a standalone CLI + library (§1 #1, #5):** the dual-mode shape serves two audiences: (a) tokens-focused engineers running ad-hoc validation (CLI); (b) Storybook addon users getting integrated scoring (library import). One package, two entry points. Tokens Studio users particularly benefit from CLI mode (their workflow is Figma → export tokens.json → validate before commit).

**Why support Tokens Studio + DTCG (§1 #2):** Tokens Studio is the dominant Figma plugin (~50k+ users); DTCG is the W3C standard (criterion A.1.8). Many teams export from Tokens Studio + transform to DTCG via Style Dictionary; the validator handles both as inputs to lower friction. Auto-detection at parse time prevents user config burden.

**Why 9 validators specifically (§1 #3):** A.1 has 9 criteria (A.1.1-A.1.9) per `docs/03-criteria-part-a.md`. One validator per criterion = clear mapping; the validator's `CriterionScore[]` output aligns 1:1 with the rubric. Combining validators (e.g., "color + typography in one") would obscure the per-criterion mapping.

**Why shared scoring engine with FR-INTEG-001 (§1 #4):** consistency is structural. Both the Storybook addon + this validator emit `CriterionScore[]` with the same fields (id, name, score, tag, rationale, computedAt, deepDiveUrl). Downstream tools (FR-CLI-001 P5) aggregate from multiple sources; same shape = trivial aggregation. The §3 implementation imports the scoring engine OR (post-refactor) extracts to a shared `@dsaf/scoring-core` package.

**Why opt-in integration with FR-INTEG-001 (§1 #15):** not all DSAF audits use tokens.json (some teams have CSS variables in stylesheets). The addon's coverage runner detects tokens.json presence + invokes the validator only if found. Opt-in means the addon doesn't fail-loud for non-tokens-using teams.

**Why audit_targets output convention (§1 #6):** matches existing DSAF scripts (per `scripts/check-coverage.mjs` lines 191-195). Downstream tools (FR-INTEG-001 addon + FR-CLI-001 CLI) parse `audit_targets` for per-criterion scores; consistency means the validator is a drop-in source for these tools.

**Why fixture corpus with 3 fixtures (§1 #8):** (a) DTCG-conformant = positive case (validator should produce high scores); (b) Tokens Studio export = format-detection test (validator should parse correctly); (c) hex-only = anti-pattern (validator should produce low scores + identify the gap). The 3 fixtures cover the test matrix.

**Why ≥ 80% Vitest coverage (§1 #7):** matches FR-INTEG-001 §1 #7 + §2. Standard floor for production-ready packages; covers parser + validators + scoring without over-engineering.

**Why MIT license (§1 #14):** framework license is MIT (per FR-BRAND-001); integration packages match. Plan §"What NOT to do" item 1 + sacredness rule.

**Why cap-rule disclosure in CLI footer (§1 #13):** users running the CLI may interpret scores as certification. Disclosure prevents misuse; matches FR-INTEG-001 panel disclosure + FR-BENCH-001 + FR-CONTENT-001 patterns.

---

## §3 — File shapes / API contracts / code skeletons

### `packages/tokens-validator/package.json`

```json
{
  "name": "@dsaf/tokens-validator",
  "version": "0.1.0",
  "description": "DSAF Tokens Studio + DTCG validator — scores A.1 Foundations & Tokens criteria from tokens.json.",
  "keywords": ["design-tokens", "tokens-studio", "dtcg", "dsaf", "design-system", "audit", "validator"],
  "homepage": "https://dsaf.dev/integrations/tokens-validator",
  "license": "MIT",
  "author": "Stephen Cheng <hello@dsaf.dev>",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/cyberskill-official/design-system-audit-framework.git",
    "directory": "packages/tokens-validator"
  },
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "bin": {
    "dsaf-tokens-validator": "./dist/cli.js"
  },
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./cli": "./dist/cli.js"
  },
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
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@vitest/coverage-v8": "^1.0.0",
    "typescript": "^5.0.0",
    "vitest": "^1.0.0"
  },
  "publishConfig": { "access": "public" }
}
```

### `packages/tokens-validator/src/types.ts`

```typescript
/**
 * DSAF Tokens Studio + DTCG validator — TypeScript types.
 * Per FR-INTEG-002 §3. Shares CriterionScore shape with FR-INTEG-001.
 */

// Re-export shared types from FR-INTEG-001 storybook-addon for consistency.
// If FR-INTEG-001 is not installed, fall back to local definitions.
export type { CriterionScore } from '@dsaf/storybook-addon';

/** Parsed tokens — common shape regardless of input format (Tokens Studio vs DTCG). */
export interface ParsedTokens {
  /** Source format detected at parse time */
  format: 'tokens-studio' | 'dtcg' | 'unknown';
  /** All color tokens, flattened with token-name + value + token-layer */
  colors: ColorToken[];
  /** All spacing tokens */
  spacing: SpacingToken[];
  /** All typography tokens (font-size, line-height, weight, etc.) */
  typography: TypographyToken[];
  /** Elevation / shadow tokens */
  elevation: ElevationToken[];
  /** Motion tokens (duration, easing) */
  motion: MotionToken[];
  /** Iconography tokens (icon-size, icon-grid) */
  iconography: IconographyToken[];
  /** Grid / layout tokens (column, gutter, breakpoint) */
  grid: GridToken[];
  /** Raw input for inspection */
  raw: unknown;
  /** Parser warnings (non-fatal issues) */
  warnings: string[];
}

export interface ColorToken {
  name: string;
  value: string;       // hex/rgb/oklch/etc.
  layer: 'primitive' | 'semantic' | 'component' | 'unknown';
  colorSpace: 'srgb' | 'p3' | 'oklch' | 'unknown';
  references?: string;  // if this token references another (e.g., '{color.primary}')
}

export interface SpacingToken {
  name: string;
  value: number;       // px
  unit: 'px' | 'rem' | 'em';
}

export interface TypographyToken {
  name: string;
  property: 'font-size' | 'line-height' | 'font-weight' | 'letter-spacing' | 'font-family';
  value: string;
}

export interface ElevationToken {
  name: string;
  shadows: Array<{ x: number; y: number; blur: number; spread: number; color: string }>;
}

export interface MotionToken {
  name: string;
  property: 'duration' | 'easing' | 'spring';
  value: string;
}

export interface IconographyToken {
  name: string;
  size?: number;
}

export interface GridToken {
  name: string;
  property: 'columns' | 'gutter' | 'breakpoint' | 'max-width';
  value: number | string;
}

/** Validator function signature */
export type Validator = (tokens: ParsedTokens) => {
  criterionId: string;
  score: 0 | 1 | 2 | 3 | 4 | 5;
  rationale: string;
};
```

### `packages/tokens-validator/src/parser.ts`

```typescript
/**
 * Parses Tokens Studio JSON or DTCG-conformant tokens.json into ParsedTokens.
 *
 * Per FR-INTEG-002 §1 #2: auto-detect format from JSON shape.
 */

import type { ParsedTokens, ColorToken, SpacingToken } from './types.js';
import { readFileSync } from 'node:fs';

/** Detect format from JSON shape: DTCG has $value/$type/$description; Tokens Studio has flat name→value. */
export function detectFormat(json: unknown): 'tokens-studio' | 'dtcg' | 'unknown' {
  if (typeof json !== 'object' || json == null) return 'unknown';
  const flat = JSON.stringify(json);
  if (flat.includes('"$value"') && flat.includes('"$type"')) return 'dtcg';
  if (flat.match(/"value"\s*:\s*"[^"]+"/)) return 'tokens-studio';
  return 'unknown';
}

/** Parse a tokens.json file (path or string) into ParsedTokens. */
export function parseTokens(input: string | object): ParsedTokens {
  let json: unknown;
  if (typeof input === 'string' && input.startsWith('{')) {
    json = JSON.parse(input);
  } else if (typeof input === 'string') {
    json = JSON.parse(readFileSync(input, 'utf-8'));
  } else {
    json = input;
  }

  const format = detectFormat(json);
  const warnings: string[] = [];

  // Flatten the nested JSON into per-token-type arrays
  const colors: ColorToken[] = [];
  const spacing: SpacingToken[] = [];
  // ... (typography, elevation, motion, iconography, grid)

  function walkDtcg(node: any, path: string[]) {
    if (node == null || typeof node !== 'object') return;
    if (node.$value !== undefined) {
      const name = path.join('.');
      switch (node.$type) {
        case 'color':
          colors.push({
            name,
            value: String(node.$value),
            layer: inferColorLayer(name),
            colorSpace: inferColorSpace(String(node.$value)),
            references: extractReference(String(node.$value))
          });
          break;
        case 'dimension':
          const pxValue = parseFloat(String(node.$value));
          spacing.push({
            name,
            value: pxValue,
            unit: String(node.$value).endsWith('rem') ? 'rem' : 'px'
          });
          break;
        // ... (other types)
      }
      return;
    }
    for (const [k, v] of Object.entries(node)) {
      walkDtcg(v, [...path, k]);
    }
  }

  function walkTokensStudio(node: any, path: string[]) {
    if (node == null || typeof node !== 'object') return;
    if (node.value !== undefined && node.type !== undefined) {
      // Tokens Studio format: { value: "#fff", type: "color" }
      const name = path.join('.');
      switch (node.type) {
        case 'color':
          colors.push({
            name,
            value: String(node.value),
            layer: inferColorLayer(name),
            colorSpace: inferColorSpace(String(node.value)),
            references: extractReference(String(node.value))
          });
          break;
        // ... (other types)
      }
      return;
    }
    for (const [k, v] of Object.entries(node)) {
      walkTokensStudio(v, [...path, k]);
    }
  }

  if (format === 'dtcg') walkDtcg(json, []);
  else if (format === 'tokens-studio') walkTokensStudio(json, []);
  else warnings.push('Unknown token format; parser cannot proceed reliably.');

  return {
    format,
    colors,
    spacing,
    typography: [], // ... populated similarly
    elevation: [],
    motion: [],
    iconography: [],
    grid: [],
    raw: json,
    warnings
  };
}

function inferColorLayer(name: string): 'primitive' | 'semantic' | 'component' | 'unknown' {
  if (/\b(text|background|border|surface|interactive)\b/i.test(name)) return 'semantic';
  if (/\b(button|input|card|modal|tooltip)\b/i.test(name)) return 'component';
  if (/^color\.[a-z]+\.\d/i.test(name) || /\b(primary|gray|red|blue)\b\.\d/i.test(name)) return 'primitive';
  return 'unknown';
}

function inferColorSpace(value: string): 'srgb' | 'p3' | 'oklch' | 'unknown' {
  if (value.startsWith('oklch(')) return 'oklch';
  if (value.startsWith('color(display-p3')) return 'p3';
  if (value.startsWith('#') || value.startsWith('rgb')) return 'srgb';
  return 'unknown';
}

function extractReference(value: string): string | undefined {
  const m = value.match(/\{([^}]+)\}/);
  return m ? m[1] : undefined;
}
```

### `packages/tokens-validator/src/validators/three-tier.ts` (illustrative; 8 more validators follow same pattern)

```typescript
/**
 * A.1.1 — Color tokens with primitive→semantic→component layers.
 *
 * Rubric:
 *   0: Hex codes hard-coded throughout (no token system)
 *   3: Semantic layer ("text-primary", "background-surface") references primitives
 *   5: Three-tier architecture; aliases support multi-brand and modes; values are math/HSL-derived.
 */

import type { ParsedTokens, Validator } from '../types.js';

export const threeTierValidator: Validator = (tokens) => {
  const colors = tokens.colors;
  if (colors.length === 0) {
    return {
      criterionId: 'A.1.1',
      score: 0,
      rationale: 'No color tokens found. Hex codes likely hard-coded throughout.'
    };
  }

  const byLayer = {
    primitive: colors.filter(c => c.layer === 'primitive'),
    semantic: colors.filter(c => c.layer === 'semantic'),
    component: colors.filter(c => c.layer === 'component'),
    unknown: colors.filter(c => c.layer === 'unknown')
  };

  const hasSemantic = byLayer.semantic.length > 0;
  const hasComponent = byLayer.component.length > 0;
  const semanticReferencesPrimitive = byLayer.semantic.some(c => c.references != null);
  const unknownRatio = byLayer.unknown.length / colors.length;

  // Score:
  // - 0: no tokens (handled above) OR > 80% unknown (no naming convention)
  // - 1: tokens exist but no clear semantic/component pattern
  // - 2: semantic layer defined but not referencing primitives
  // - 3: semantic layer references primitives
  // - 4: 3 + component layer present
  // - 5: 4 + multi-mode support detected (mode tokens or theme tokens present)

  if (unknownRatio > 0.8) {
    return { criterionId: 'A.1.1', score: 1, rationale: `${colors.length} color tokens found but ${Math.round(unknownRatio * 100)}% lack semantic/component naming.` };
  }

  if (!hasSemantic) {
    return { criterionId: 'A.1.1', score: 1, rationale: 'Color tokens found but no semantic layer detected (text-*, background-*, etc.).' };
  }

  if (!semanticReferencesPrimitive) {
    return { criterionId: 'A.1.1', score: 2, rationale: `Semantic layer present (${byLayer.semantic.length} tokens) but does not reference primitives.` };
  }

  if (!hasComponent) {
    return { criterionId: 'A.1.1', score: 3, rationale: `Semantic layer (${byLayer.semantic.length}) references primitives (${byLayer.primitive.length}). Add component-layer aliases for 4+.` };
  }

  const hasMultiMode = /\b(light|dark|mode|theme)\b/i.test(JSON.stringify(tokens.raw));
  if (!hasMultiMode) {
    return { criterionId: 'A.1.1', score: 4, rationale: `Three-tier architecture present (P:${byLayer.primitive.length}, S:${byLayer.semantic.length}, C:${byLayer.component.length}). Add multi-mode support for 5.` };
  }

  return { criterionId: 'A.1.1', score: 5, rationale: 'Three-tier architecture + multi-mode support detected.' };
};
```

### `packages/tokens-validator/src/scoring.ts`

```typescript
/**
 * Aggregates validator outputs into CriterionScore[] shape per FR-INTEG-001 contract.
 */

import type { CriterionScore } from './types.js';
import type { ParsedTokens, Validator } from './types.js';

import { threeTierValidator } from './validators/three-tier.js';
import { typographyValidator } from './validators/typography-scale.js';
import { spacingValidator } from './validators/spacing-scale.js';
import { elevationValidator } from './validators/elevation-tokens.js';
import { motionValidator } from './validators/motion-tokens.js';
import { iconographyValidator } from './validators/iconography.js';
import { gridValidator } from './validators/grid-layout.js';
import { dtcgValidator } from './validators/dtcg-conformance.js';
import { modernColorValidator } from './validators/modern-color-spaces.js';

const ALL_VALIDATORS: Validator[] = [
  threeTierValidator,    // A.1.1
  typographyValidator,   // A.1.2
  spacingValidator,      // A.1.3
  elevationValidator,    // A.1.4
  motionValidator,       // A.1.5
  iconographyValidator,  // A.1.6
  gridValidator,         // A.1.7
  dtcgValidator,         // A.1.8
  modernColorValidator   // A.1.9
];

const CRITERION_METADATA: Record<string, { name: string; tag: 'FIXED' | 'DYNAMIC' }> = {
  'A.1.1': { name: 'Color tokens with primitive→semantic→component layers', tag: 'FIXED' },
  'A.1.2': { name: 'Typography scale and type tokens', tag: 'FIXED' },
  'A.1.3': { name: 'Spacing scale (4 / 8 px geometric)', tag: 'FIXED' },
  'A.1.4': { name: 'Elevation / shadow tokens', tag: 'FIXED' },
  'A.1.5': { name: 'Motion tokens (duration, easing, springs)', tag: 'FIXED' },
  'A.1.6': { name: 'Iconography system', tag: 'FIXED' },
  'A.1.7': { name: 'Grid & layout system', tag: 'FIXED' },
  'A.1.8': { name: 'Token format & DTCG conformance', tag: 'DYNAMIC' },
  'A.1.9': { name: 'Modern color spaces (OKLCH, P3)', tag: 'DYNAMIC' }
};

export function validate(tokens: ParsedTokens): CriterionScore[] {
  const computedAt = new Date().toISOString();
  const scores: CriterionScore[] = [];

  for (const validator of ALL_VALIDATORS) {
    const result = validator(tokens);
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

/** Output shape matching existing DSAF scripts' audit_targets convention. */
export function toAuditTargets(scores: CriterionScore[]): Record<string, number> {
  const targets: Record<string, number> = {};
  for (const s of scores) {
    targets[s.id] = s.score;
  }
  return targets;
}
```

### `packages/tokens-validator/src/cli.ts`

```typescript
#!/usr/bin/env node
/**
 * CLI entry point: `npx @dsaf/tokens-validator path/to/tokens.json`
 */

import { parseTokens } from './parser.js';
import { validate, toAuditTargets } from './scoring.js';

const args = process.argv.slice(2);
if (args.length === 0 || args[0] === '--help') {
  console.log(`
Usage: dsaf-tokens-validator <path-to-tokens.json>

Validates a Tokens Studio export or DTCG-conformant tokens.json against
the 9 DSAF Foundations & Tokens criteria (A.1.1 - A.1.9).

Output: per-criterion table + audit_targets JSON + cap-rule disclosure.
`);
  process.exit(0);
}

const path = args[0];

try {
  const tokens = parseTokens(path);
  console.log(`Detected format: ${tokens.format}`);
  console.log(`Parsed: ${tokens.colors.length} colors, ${tokens.spacing.length} spacings, ${tokens.typography.length} typography tokens.\n`);

  if (tokens.warnings.length > 0) {
    console.log('Warnings:');
    tokens.warnings.forEach(w => console.log(`  - ${w}`));
    console.log();
  }

  const scores = validate(tokens);

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
  console.log(`Overall A.1 Foundations & Tokens: ${(total / max * 100).toFixed(1)}% (${total}/${max})\n`);

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

### `packages/tokens-validator/tests/validators.test.ts` (excerpt)

```typescript
import { describe, it, expect } from 'vitest';
import { threeTierValidator } from '../src/validators/three-tier.js';
import { parseTokens } from '../src/parser.js';
import { readFileSync } from 'node:fs';

describe('three-tier validator (A.1.1)', () => {
  it('scores 5 for DTCG-conformant with three layers + multi-mode', () => {
    const tokens = parseTokens(readFileSync('./tests/fixtures/dtcg-conformant.tokens.json', 'utf-8'));
    const result = threeTierValidator(tokens);
    expect(result.criterionId).toBe('A.1.1');
    expect(result.score).toBe(5);
  });

  it('scores 1 for hex-only fixture', () => {
    const tokens = parseTokens(readFileSync('./tests/fixtures/hex-only.tokens.json', 'utf-8'));
    const result = threeTierValidator(tokens);
    expect(result.score).toBeLessThanOrEqual(1);
  });

  it('scores 0 when no color tokens exist', () => {
    const tokens = parseTokens('{}');
    const result = threeTierValidator(tokens);
    expect(result.score).toBe(0);
  });
});
```

### `packages/tokens-validator/tests/fixtures/dtcg-conformant.tokens.json` (excerpt)

```json
{
  "color": {
    "primary": {
      "100": { "$value": "#e6f0ff", "$type": "color" },
      "500": { "$value": "#0a58ca", "$type": "color" },
      "900": { "$value": "#062f6e", "$type": "color" }
    }
  },
  "text": {
    "primary": { "$value": "{color.primary.900}", "$type": "color" },
    "background": { "$value": "{color.primary.100}", "$type": "color" }
  },
  "button": {
    "primary-background": { "$value": "{color.primary.500}", "$type": "color" }
  },
  "mode": {
    "dark": {
      "text-primary": { "$value": "#ffffff", "$type": "color" }
    }
  },
  "space": {
    "100": { "$value": "8px", "$type": "dimension" },
    "200": { "$value": "16px", "$type": "dimension" }
  }
}
```

### `docs/integrations/tokens-validator.md` (excerpt — full doc follows FR-INTEG-001 docs pattern)

```markdown
# DSAF Tokens Validator

CLI + library to score your design tokens against the 9 A.1 Foundations & Tokens DSAF criteria.

## Install

```bash
npm install -D @dsaf/tokens-validator
```

## CLI usage

```bash
npx @dsaf/tokens-validator path/to/tokens.json
```

Outputs per-criterion scores (A.1.1 - A.1.9) + audit_targets JSON + cap-rule disclosure.

## Library usage (in Storybook addon or your own tooling)

```typescript
import { parseTokens, validate } from '@dsaf/tokens-validator';

const tokens = parseTokens('tokens.json');
const scores = validate(tokens);
// scores: CriterionScore[] matching FR-INTEG-001 shape
```

## Supported formats

- **Tokens Studio JSON** — the Figma plugin's export format.
- **DTCG-conformant tokens.json** — W3C Design Tokens Community Group standard.

Auto-detected at parse time.

## Criteria scored

A.1.1 Color tokens (three-tier architecture) · A.1.2 Typography scale · A.1.3 Spacing scale · A.1.4 Elevation · A.1.5 Motion · A.1.6 Iconography · A.1.7 Grid · A.1.8 DTCG conformance · A.1.9 Modern color spaces (OKLCH/P3).

## Troubleshooting

[5+ entries: format detection failure, missing color layer, etc.]

## License: MIT
```

---

## §4 — Acceptance criteria

1. **Package scaffolded** — `packages/tokens-validator/package.json`, `tsconfig.json`, `src/index.ts` exist.
2. **9 validators shipped** — `src/validators/*.ts` has 9 files, one per A.1.1-A.1.9.
3. **Parser supports both formats** — `parseTokens()` auto-detects DTCG vs Tokens Studio; tests verify both.
4. **CLI works** — `npx @dsaf/tokens-validator <fixture>` runs end-to-end + exits 0.
5. **CriterionScore[] shape matches FR-INTEG-001** — output structure identical to FR-INTEG-001 §3 `CriterionScore`.
6. **audit_targets output** — CLI prints JSON section with `audit_targets: { ... }` per criterion.
7. **≥ 80% Vitest coverage** — `npm test` shows lines ≥ 80%.
8. **3 fixtures** — `tests/fixtures/dtcg-conformant.tokens.json`, `tokens-studio.tokens.json`, `hex-only.tokens.json`.
9. **CI workflow** — `.github/workflows/tokens-validator-ci.yml` exists with matrix Node 20/22.
10. **User docs** — `docs/integrations/tokens-validator.md` covers install, CLI, library, formats, criteria scored, troubleshooting (≥ 5).
11. **Cap-rule disclosure in CLI** — CLI prints the L3-cap text from FR-CORE-004.
12. **MIT license** — `package.json` `"license": "MIT"`.
13. **Handle taxonomy + no paid CTAs** — grep checks per FR-INTEG-001 pattern.
14. **A.1 scope only** — validators only score A.1.1-A.1.9; no other criteria.
15. **FR-INTEG-001 integration** — addon's `coverage.ts` runner optionally calls `validate()` if tokens.json exists.

---

## §5 — Verification

```bash
# AC1, AC2 — scaffolding + 9 validators
test -f packages/tokens-validator/package.json
ls packages/tokens-validator/src/validators/ | wc -l  # expected: 9 .ts files

# AC3 — parser auto-detect
cd packages/tokens-validator && npm test -- parser.test
# Tests verify detectFormat returns correct format for each fixture

# AC4 — CLI works
cd packages/tokens-validator && npm run build
node dist/cli.js tests/fixtures/dtcg-conformant.tokens.json
# Expected: per-criterion table + audit_targets JSON + cap-rule disclosure

# AC5 — CriterionScore shape
grep -q "export type { CriterionScore } from '@dsaf/storybook-addon'" packages/tokens-validator/src/types.ts

# AC6 — audit_targets in CLI
node packages/tokens-validator/dist/cli.js tests/fixtures/dtcg-conformant.tokens.json | grep -q 'audit_targets'

# AC7 — coverage
cd packages/tokens-validator && npm test
# Vitest output shows lines >= 80%

# AC8 — fixtures
for fx in dtcg-conformant tokens-studio hex-only; do
  test -f packages/tokens-validator/tests/fixtures/${fx}.tokens.json || echo "MISSING: ${fx}"
done

# AC9 — CI workflow
test -f .github/workflows/tokens-validator-ci.yml

# AC11 — cap-rule disclosure
grep -q 'L3' packages/tokens-validator/src/cli.ts
grep -q 'self-audit-policy' packages/tokens-validator/src/cli.ts

# AC12 — MIT license
grep -q '"license": "MIT"' packages/tokens-validator/package.json

# AC14 — A.1 scope only
grep -oE 'A\.[0-9]+\.[0-9]+' packages/tokens-validator/src/scoring.ts | sort -u
# Expected: only A.1.1 through A.1.9

# AC15 — addon integration
grep -q '@dsaf/tokens-validator\|runTokensValidator' packages/storybook-addon/src/runners/coverage.ts
```

---

## §6 — Implementation skeleton

The operator playbook (10h):

1. **(1h)** Scaffold `packages/tokens-validator/` — package.json, tsconfig.json.
2. **(1.5h)** Author `src/types.ts` + `src/parser.ts`.
3. **(3h)** Author 9 validators in `src/validators/`.
4. **(1h)** Author `src/scoring.ts` (aggregator) + `src/index.ts` (exports).
5. **(1h)** Author `src/cli.ts` + bin entry.
6. **(1.5h)** Author tests + 3 fixtures.
7. **(30m)** Author CI workflow + README + dsaf.dev docs.
8. **(15m)** Patch FR-INTEG-001 coverage runner.
9. **(15m)** Patch README + dsaf.dev cross-links.

---

## §7 — Dependencies

- **Upstream:** FR-CORE-001 (criterion metadata), FR-INTEG-001 (shared CriterionScore type).
- **Coordinated:** FR-CORE-004 (cap-rule), FR-BRAND-001/002/004 (sacredness + taxonomy + decoupling).
- **Downstream:** FR-INTEG-003 (zeroheight reader follows same pattern), FR-CLI-001 P5 (consumes validator output).
- **External:** Tokens Studio Figma plugin (consumer-side), DTCG specification.

---

## §8 — Example payloads

### CLI output for DTCG-conformant fixture

```
$ npx @dsaf/tokens-validator tests/fixtures/dtcg-conformant.tokens.json
Detected format: dtcg
Parsed: 6 colors, 2 spacings, 0 typography tokens.

Per-criterion scores:
--------------------------------------------------------------------------------
ID      Score   Tag       Rationale
--------------------------------------------------------------------------------
A.1.1   5/5     FIXED     Three-tier architecture + multi-mode support detected.
A.1.2   1/5     FIXED     No typography tokens found.
A.1.3   4/5     FIXED     2 spacing tokens; 4px-base scale detected; add 2-tier (component vs layout) for 5.
A.1.4   0/5     FIXED     No elevation tokens found.
A.1.5   0/5     FIXED     No motion tokens found.
A.1.6   0/5     FIXED     No iconography tokens found.
A.1.7   0/5     FIXED     No grid/layout tokens found.
A.1.8   5/5     DYNAMIC   DTCG-conformant ($value/$type detected throughout).
A.1.9   1/5     DYNAMIC   sRGB-only; OKLCH/P3 color spaces not detected.
--------------------------------------------------------------------------------

Overall A.1 Foundations & Tokens: 35.6% (16/45)

audit_targets:
{
  "A.1.1": 5,
  "A.1.2": 1,
  ...
}

---
Cap-rule: These scores are self-assessment. Public DSAF Level caps at L3 (Managed) without
third-party verification per https://dsaf.dev/branding/self-audit-policy.
```

---

## §9 — Open questions

- **Q1: Support Style Dictionary output format?** Deferred. Style Dictionary outputs in many formats (CSS, JS, JSON); DTCG is the canonical intermediate. Future-FR if user demand.
- **Q2: Validator strictness levels?** Resolved → default strictness; CLI flag `--strict` for future iteration.
- **Q3: Score caching?** Resolved → no cache; each run is fresh.

---

## §10 — Failure modes inventory

| Failure | Detection | Outcome | Recovery |
|---|---|---|---|
| Invalid JSON | parser throws | Exit 1 with error | User fixes JSON; re-run |
| Unknown format | parser warns, format='unknown' | Validators produce low scores | User exports in supported format |
| Missing color layer inference | name doesn't match heuristic | Layer='unknown'; A.1.1 score lower | User renames tokens OR adds explicit metadata (future FR) |
| Tokens Studio breaking change | format detection fails | Need parser update | Pin to known-good Tokens Studio version; ship validator update |
| FR-INTEG-001 not installed | type re-export fails | Build error | Make @dsaf/storybook-addon a peerDependency; fall back to local types if absent |
| Score regression after FR-CORE-003 dedup | validator scores against old criteria | Audit drift | Update CRITERION_METADATA + bump validator version |
| CLI hangs on large tokens.json | performance | UX degraded | Stream-parse for large files (future iteration) |
| User runs CLI against wrong file | scoring against non-token JSON | Misleading scores | Validate JSON shape upfront; warn if shape doesn't match expected |
| audit_targets format mismatches downstream | downstream consumer breaks | Integration fail | Contract is in @dsaf/storybook-addon types; both packages versioned together |
| MIT license not displayed in npm UI | metadata issue | Compliance signal weak | Verify package.json metadata at publish-time |

---

## §11 — Implementation notes

- **The 9 validators reuse common helpers** (token-flattening, name-pattern matching, reference-resolution). Future refactor: extract to `src/lib/`.
- **The Tokens Studio format may evolve.** Pin to a known-good version + ship validator updates as new fixtures appear.
- **Cross-package consistency with FR-INTEG-001.** Both packages ship under @dsaf scope; both use same `CriterionScore` shape; both apply cap-rule disclosure. Visit-once pattern.
- **CLI exit codes:** 0 = success (any score, even low); 1 = parse/runtime error. Score-based exit (e.g., fail CI if score < threshold) is a future flag.

---

*End of FR-INTEG-002.*
