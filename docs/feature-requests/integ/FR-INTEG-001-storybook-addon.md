---
id: FR-INTEG-001
title: "Storybook addon — runs DSAF scripts (check-coverage, check-apca, check-bundle-size, check-doc-freshness) per-story; per-criterion score panel"
module: INTEG
priority: MUST
status: accepted
verify: T
phase: P2
milestone: P2 · slice 1 · Community velocity
slice: 1
owner: Stephen Cheng (Founder) + commissioned engineer (potential first external contributor per FR-GOV-002)
created: 2026-05-17
shipped: null
related_frs: [FR-CORE-001, FR-CORE-002, FR-CORE-003, FR-CORE-004, FR-BRAND-001, FR-BRAND-002, FR-CONTENT-001, FR-INTEG-002, FR-INTEG-003, FR-CLI-001]
depends_on: [FR-CORE-001, FR-CORE-003]
blocks: [FR-INTEG-002, FR-INTEG-003]
source_pages:
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Phase 2 — Community velocity action 2 — 'Ship integrations: a Storybook addon that runs the relevant DSAF scripts; a Tokens Studio export validator; a zeroheight-export reader')"
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Honest critique item 6 — 'Agent-first is the strongest unique differentiator'; integrations make agent-first runnable in mainstream DS tooling)"
  - "scripts/check-coverage.mjs (existing zero-dep Node ESM script — referenced not modified)"
  - "scripts/check-apca.mjs (existing — referenced not modified)"
  - "scripts/check-bundle-size.mjs (existing — referenced not modified)"
  - "scripts/check-doc-freshness.mjs (existing — referenced not modified)"
source_decisions:
  - "DEC-078: Storybook addon supports Storybook 7.x LTS (Q2 2024 release) AND 8.x current (2025+); 6.x dropped — minimal active install base by P2 ship"
  - "DEC-079: addon package name `@dsaf/storybook-addon`; published to npm with MIT license matching the framework"
  - "DEC-080: addon UI is a Storybook PANEL (bottom drawer); NOT a full Story screen — per-criterion scores + rationale + dsaf.dev/blog/deep-dives/ links"
  - "DEC-081: addon orchestrates the 4 DSAF scripts in-process via direct module imports (NOT shell-exec); scripts are zero-dep Node ESM, importable as Node modules"
  - "DEC-082: each script output maps to a DSAF-25 Core criterion via the `audit_targets` field per existing script convention"
  - "DEC-083: addon shipping includes ≥ 80% test coverage via Vitest + Storybook test-runner integration; CI via GitHub Actions"
language: typescript + nodejs
service: npm package `@dsaf/storybook-addon`
new_files:
  - packages/storybook-addon/package.json
  - packages/storybook-addon/tsconfig.json
  - packages/storybook-addon/src/index.ts
  - packages/storybook-addon/src/preset.ts
  - packages/storybook-addon/src/manager.ts
  - packages/storybook-addon/src/preview.ts
  - packages/storybook-addon/src/Panel.tsx
  - packages/storybook-addon/src/runners/index.ts
  - packages/storybook-addon/src/runners/coverage.ts
  - packages/storybook-addon/src/runners/apca.ts
  - packages/storybook-addon/src/runners/bundle-size.ts
  - packages/storybook-addon/src/runners/doc-freshness.ts
  - packages/storybook-addon/src/scoring.ts
  - packages/storybook-addon/src/types.ts
  - packages/storybook-addon/tests/scoring.test.ts
  - packages/storybook-addon/tests/runners.test.ts
  - packages/storybook-addon/tests/fixtures/sample-tokens.json
  - packages/storybook-addon/tests/fixtures/sample-story.tsx
  - packages/storybook-addon/README.md
  - packages/storybook-addon/CHANGELOG.md
  - packages/storybook-addon/.npmignore
  - .github/workflows/storybook-addon-ci.yml
  - docs/integrations/storybook-addon.md   # user-facing docs on dsaf.dev/docs
modified_files:
  - README.md                            # cross-link to the integration (per FR-DOCS-001 sacredness)
  - dsaf.dev/index.html                  # add "Integrations" link to footer
allowed_tools:
  - "file_read/write packages/storybook-addon/**, .github/workflows/**, docs/integrations/**, README.md"
  - "npm publish for the addon package (post-acceptance + ≥ 1 successful test run)"
  - "Storybook addon-API (https://storybook.js.org/docs/addons/introduction)"
  - "Vitest for unit tests"
  - "GitHub Actions for CI"
disallowed_tools:
  - "shell-exec the DSAF scripts (use direct module imports — keeps the addon cross-platform + faster)"
  - "modify the existing DSAF scripts in scripts/ — they're the canonical implementations; the addon WRAPS them"
  - "publish the addon as a paid Storybook addon (Storybook has both free + commercial; this is MIT-licensed free)"
  - "support Storybook 6.x (dropped — minimal active install base by P2)"
  - "make the addon required (it's optional per FR-CORE-001 — DSAF audits can run without it via raw script invocation)"
  - "include paid-funnel CTAs in the addon UI or README (sacredness rule per FR-BRAND-001)"
effort_hours: 16
sub_tasks:
  - "1. (1h) Scaffold packages/storybook-addon/ — package.json, tsconfig.json, Storybook addon registration boilerplate"
  - "2. (2h) Author src/types.ts + src/scoring.ts — TypeScript types for DSAF score + per-criterion mapping + the scoring engine that converts script-output JSON to per-criterion scores"
  - "3. (3h) Author src/runners/ — 4 runner modules, one per existing DSAF script (coverage, apca, bundle-size, doc-freshness); each imports the script's exported main function + transforms output for the addon's UI"
  - "4. (2h) Author src/Panel.tsx — Storybook panel React component showing per-criterion scores + rationale + dsaf.dev links"
  - "5. (1h) Author src/preset.ts + src/manager.ts + src/preview.ts — Storybook addon registration (panel placement, manager-side + preview-side hooks)"
  - "6. (3h) Author tests/ — Vitest unit tests for scoring + runners; ≥ 80% coverage target; fixture corpus (sample tokens.json + sample stories)"
  - "7. (1h) Author .github/workflows/storybook-addon-ci.yml — CI runs Vitest + Storybook test-runner against the fixture story"
  - "8. (1h) Author packages/storybook-addon/README.md + docs/integrations/storybook-addon.md — installation, usage, troubleshooting"
  - "9. (1h) Author CHANGELOG.md + .npmignore + publish-readiness checklist"
  - "10. (30m) Patch README.md + dsaf.dev/index.html with integration cross-link (per FR-DOCS-001 sacredness)"
  - "11. (30m) Verify Lighthouse score on dsaf.dev/docs/storybook-addon (≥ 90, no JS-heavy embed)"
risk_if_skipped: "Plan §Phase 2 action 2 names the Storybook addon as one of three 'artifacts that turn lurkers into stargazers.' Storybook has ~1.5M weekly npm downloads + is the de-facto DS-component-documentation tool; an addon that brings DSAF scoring into the Storybook UI puts the framework in front of every DS engineer using Storybook (~80% of DS teams per Sparkbox 2025 survey). Skipping this FR leaves DSAF as a markdown rubric without runnable integration; the conversion path from 'this is interesting' to 'we use this on our system' is significantly longer. The cost is operational (16h founder-time OR ~$2K commissioned engineer over 2-3 weeks); the value is the multi-year integration surface + the FR-CONTENT-001 deep-dive credibility ('here's how to wire the rubric into your CI'). Skipping also blocks FR-INTEG-002 (Tokens Studio validator — shares the scoring engine + runner pattern) + FR-INTEG-003 (zeroheight reader — similar shape) + FR-CLI-001 (P5 `npx dsaf scan` — the same scoring engine drives the CLI scan output)."
---

## §1 — Description (BCP-14 normative)

The framework MUST ship a Storybook addon at `@dsaf/storybook-addon` (npm) that runs the 4 existing DSAF scripts (`check-coverage`, `check-apca`, `check-bundle-size`, `check-doc-freshness`) in-process via direct module imports, transforms the script outputs to per-criterion DSAF scores, and renders the scores in a Storybook PANEL (bottom drawer) with per-criterion rationale + links to dsaf.dev/blog/deep-dives/. The addon supports Storybook 7.x LTS + 8.x current; ships under MIT license; reaches ≥ 80% Vitest unit-test coverage; integrates with Storybook test-runner via GitHub Actions CI.

1. **MUST** ship the addon at npm package name `@dsaf/storybook-addon`. The package is published from `packages/storybook-addon/` in the framework repo. The package version follows semver per FR-CORE-002 no-silent-regression rule applied to the addon's own internal versioning (DSAF spec changes affect rubric outputs, not the addon's API).
2. **MUST** support Storybook 7.x LTS (released Q2 2024) AND 8.x current (2025+). Storybook 6.x is dropped (the install base is minimal by P2 ship). The package's `peerDependencies` declares `storybook >=7.0.0 <9.0.0`.
3. **MUST** orchestrate the 4 DSAF scripts (`scripts/check-coverage.mjs`, `scripts/check-apca.mjs`, `scripts/check-bundle-size.mjs`, `scripts/check-doc-freshness.mjs`) via direct ESM module imports (NOT shell-exec). The scripts are zero-dependency Node ESM + export their primary functions per §3 contract; the addon imports them as Node modules. This keeps the addon cross-platform (no shell-dependency assumptions) + faster (no subprocess fork overhead) + easier to test.
4. **MUST NOT** modify the existing scripts in `scripts/`. The scripts are the canonical implementations (DSAF audits without Storybook still use them via raw `node scripts/check-coverage.mjs` invocation). The addon WRAPS them — refactor of the scripts is a separate FR (out of scope here).
5. **MUST** transform each script's output JSON to per-criterion DSAF scores via the existing `audit_targets` field convention (per `scripts/check-coverage.mjs` lines 191-195). The addon's scoring engine reads `audit_targets` per script + presents the per-criterion scores in the panel UI.
6. **MUST** render the scores in a Storybook **PANEL** (bottom drawer, addon position `panel`). The panel UI is a React component (Storybook 7+ supports React panels for all framework-flavors via the manager-API). The panel layout: criterion ID + name + score (0-5) + rationale (one sentence) + link to the dsaf.dev/blog/deep-dives/ post for that criterion.
7. **MUST** ship ≥ 80% Vitest unit-test coverage measured via `vitest --coverage`. Tests cover: scoring engine (per-criterion mapping correctness, edge cases), runners (each runner's transform from script output to panel data), fixture loading (sample tokens.json + sample story).
8. **MUST** include CI via GitHub Actions at `.github/workflows/storybook-addon-ci.yml` that runs: (a) Vitest unit tests; (b) Storybook test-runner against a fixture story; (c) build verification (`npm run build`); (d) addon smoke-test (renders without errors).
9. **MUST** publish a user-facing docs page at `docs/integrations/storybook-addon.md` covering: installation (`npm install -D @dsaf/storybook-addon`), `.storybook/main.ts` configuration, panel UI walkthrough, troubleshooting (the 5 most-common issues), how to interpret per-criterion scores, link to dsaf.dev/blog/deep-dives/ for criterion deep-dives.
10. **MUST** include a per-addon README at `packages/storybook-addon/README.md` (separate from the framework's root README) with: installation, quick-start (5-line config), what the panel shows, links to dsaf.dev docs.
11. **MUST** include a CHANGELOG at `packages/storybook-addon/CHANGELOG.md` tracking addon versions. Per FR-CORE-002 no-silent-regression rule applied to the addon: every release notes API changes (additive vs breaking); breaking changes require major version bump.
12. **MUST NOT** include paid-funnel CTAs in the addon UI or README per FR-BRAND-001 sacredness. No "Talk to a certified auditor" buttons; the panel UI links only to dsaf.dev/blog/deep-dives/ (canonical content).
13. **MUST** apply the FR-BRAND-002 handle taxonomy. Addon name uses `DSAF` (proper noun); package description uses `Design System Audit Framework` at first mention; no `Framework` noun-handle in any addon surface text.
14. **MUST NOT** make the addon REQUIRED for DSAF audits. Plan §"What NOT to do" item 1 (sacred-repo) + FR-CORE-001 verbatim-quote rule apply — the addon is one runnable surface; raw script invocation + LLM-agent runs remain canonical paths. The addon is optional convenience.
15. **MUST** integrate with the FR-CORE-004 cap rule. The addon's panel UI displays a footer note: "These scores are self-assessment via the addon. Public DSAF Level caps at L3 unverified per [self-audit publication policy](https://dsaf.dev/branding/self-audit-policy)."

---

## §2 — Why this design

**Why a Storybook addon specifically (§1 #1):** Storybook has ~1.5M weekly npm downloads + is the de-facto DS-component documentation tool (~80% of DS teams per Sparkbox 2025 survey). An addon that brings DSAF scoring into Storybook puts the framework where DS engineers already are. Plan §Phase 2 action 2 names Storybook addon as one of three "artifacts that turn lurkers into stargazers." Tokens Studio (FR-INTEG-002) and zeroheight (FR-INTEG-003) are the other two integrations covering complementary DS-tool ecosystems.

**Why Storybook 7.x LTS + 8.x current (§1 #2):** Storybook 7 was released Q2 2024 + remains LTS until Q3 2026; Storybook 8 released 2025 + is current. Supporting both covers ~95% of active Storybook installations (per npm download stats). Storybook 6.x is dropped — the install base is minimal by P2 ship (Q3 2026) + maintaining 3 majors increases test-matrix burden disproportionately.

**Why direct module imports vs shell-exec (§1 #3, #4):** the existing scripts are zero-dependency Node ESM with `import { ... } from './script.mjs'` patterns workable. Direct imports give: (a) cross-platform consistency (no shell-quoting issues on Windows), (b) faster execution (no subprocess overhead — ~50ms saved per script invocation), (c) easier testing (Vitest can mock the imports), (d) cleaner error handling (Node-native exceptions vs shell exit codes). Shell-exec would require subprocess management + cross-platform shell-syntax differences; not worth the complexity.

**Why audit_targets convention for criterion mapping (§1 #5):** the existing `scripts/check-coverage.mjs` (lines 191-195) defines `audit_targets` as a mapping of criterion IDs to scores. The convention is already established; the addon adopts it without forcing script changes. Future criterion additions (FR-CORE-003 dedup, P6 RFCs) update the `audit_targets` per-script; the addon picks up the updates automatically.

**Why a PANEL UI vs full-screen view (§1 #6):** Storybook addon UIs come in 3 flavors — panel (bottom drawer), sidebar (left), and tool (toolbar). Panel is the right fit for DSAF: (a) the per-criterion scores fit in a scrollable panel (~10-15 criteria per story typical); (b) panel is the convention for "additional information about the current story" (a11y addon, controls addon, docs addon all use panel); (c) panel is non-intrusive (collapsible). A full-screen view would be over-engineered for the use case.

**Why React for the panel component despite framework-agnostic Storybook (§1 #6):** Storybook 7+ uses React internally for the manager UI regardless of which framework the user's stories target. Addons author the manager-side (panel) in React; the preview-side (story) uses whatever framework the user has. React is the universal addon-UI choice.

**Why ≥ 80% Vitest coverage (§1 #7):** 80% is the industry-standard floor for production-ready addons (per Storybook contrib addon guidelines). 100% is over-engineering for an addon's surface; 60% is too low for users to trust. 80% covers: scoring engine logic, runner transforms, fixture loading. Edge cases (network failures, malformed tokens, etc.) covered at 80%; uncovered 20% is typically defensive null-checks + error boundary code.

**Why GitHub Actions CI vs other CI providers (§1 #8):** the framework's repo is on GitHub; GitHub Actions integrates without separate setup. The workflow runs on every PR; addon-related changes block merge if tests fail. Cross-CI portability isn't required — the workflow is for the framework's own development.

**Why separate per-addon README + per-addon CHANGELOG (§1 #10, #11):** npm-published packages need their own README (rendered on npmjs.com package page) + CHANGELOG (for users tracking version updates). The framework's root README is the project entry point; the addon's README is npm-page-focused. Same for CHANGELOG — the addon's versioning is independent of the framework's overall versioning.

**Why optional not required (§1 #14):** DSAF is a markdown rubric; the addon is one way to consume it. Other ways: raw script invocation (existing), LLM-agent runs (canonical per FR-CORE-001), CLI `npx dsaf scan` (FR-CLI-001 P5). Forcing the addon would couple DSAF to Storybook + exclude teams using other tools (Storybook alternatives: Histoire, Ladle, Pattern Lab — all valid). The addon is convenience for the Storybook-using majority; non-Storybook teams keep the script + agent paths.

**Why cap-rule footer in the panel (§1 #15):** users running the addon may interpret "DSAF score: 4 of 5 on A.1.1" as a certification. The cap-rule footer per FR-CORE-004 prevents misinterpretation; same pattern as FR-BENCH-001 + FR-CONTENT-001.

**Why no paid-funnel CTAs (§1 #12):** the addon is open-source + the framework's sacredness rule (FR-BRAND-001 §1 #11) generalises to integration surfaces. Paid services live at audit.cyberskill.world (per FR-BRAND-004 decoupling). The addon links only to canonical content (dsaf.dev/blog/deep-dives/).

---

## §3 — File shapes / API contracts / code skeletons

### `packages/storybook-addon/package.json`

```json
{
  "name": "@dsaf/storybook-addon",
  "version": "0.1.0",
  "description": "DSAF Storybook addon — runs Design System Audit Framework scripts per story; shows per-criterion scores in a panel.",
  "keywords": ["storybook-addon", "storybook", "design-system", "dsaf", "audit", "addon"],
  "homepage": "https://dsaf.dev/integrations/storybook-addon",
  "bugs": "https://github.com/CyberSkill/design-system-audit-framework/issues",
  "license": "MIT",
  "author": "Stephen Cheng <hello@dsaf.dev>",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/CyberSkill/design-system-audit-framework.git",
    "directory": "packages/storybook-addon"
  },
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./preset": "./dist/preset.js",
    "./manager": "./dist/manager.js",
    "./preview": "./dist/preview.js"
  },
  "files": [
    "dist/**/*",
    "README.md",
    "CHANGELOG.md"
  ],
  "scripts": {
    "build": "tsc",
    "test": "vitest run --coverage",
    "test:watch": "vitest",
    "lint": "tsc --noEmit"
  },
  "peerDependencies": {
    "storybook": ">=7.0.0 <9.0.0",
    "react": ">=18.0.0"
  },
  "devDependencies": {
    "@storybook/components": "^7.6.0",
    "@storybook/manager-api": "^7.6.0",
    "@storybook/preview-api": "^7.6.0",
    "@storybook/theming": "^7.6.0",
    "@storybook/types": "^7.6.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@vitest/coverage-v8": "^1.0.0",
    "typescript": "^5.0.0",
    "vitest": "^1.0.0"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

### `packages/storybook-addon/src/types.ts`

```typescript
/**
 * DSAF Storybook addon — TypeScript types.
 *
 * Per FR-INTEG-001 §3. Types are exported for downstream consumers (FR-INTEG-002 + FR-INTEG-003 + FR-CLI-001 share the scoring engine).
 */

/** A single criterion's score + rationale from a DSAF script run. */
export interface CriterionScore {
  /** Criterion ID per docs/03-criteria-part-a.md or docs/04-criteria-part-b.md (e.g., "A.1.1") */
  id: string;
  /** Criterion human-readable name (e.g., "Color tokens with primitive→semantic→component layers") */
  name: string;
  /** Score 0-5 per DSAF rubric anchors (per FR-CORE-001 verbatim-quote rule) */
  score: 0 | 1 | 2 | 3 | 4 | 5;
  /** Rubric tag: FIXED (stable rubric) or DYNAMIC (industry-standard-anchored) */
  tag: 'FIXED' | 'DYNAMIC';
  /** One-sentence rationale for the score derived from script output */
  rationale: string;
  /** URL to dsaf.dev/blog/deep-dives/<slug> for this criterion (if a deep-dive exists per FR-CONTENT-001) */
  deepDiveUrl?: string;
  /** ISO timestamp of when this score was computed */
  computedAt: string;
}

/** Output from a single DSAF script runner. */
export interface RunnerResult {
  /** Script name (e.g., "check-coverage", "check-apca") */
  runner: string;
  /** Whether the runner completed without errors */
  ok: boolean;
  /** Per-criterion scores produced by this runner (from script's audit_targets field) */
  scores: CriterionScore[];
  /** Raw script output JSON (preserved for inspection in the panel's "Details" tab) */
  rawOutput?: unknown;
  /** Error if !ok */
  error?: string;
  /** Duration ms */
  durationMs: number;
}

/** Aggregated panel data — combines results from all runners. */
export interface PanelData {
  /** All criterion scores across runners */
  allScores: CriterionScore[];
  /** Per-runner results (for "Details" tab) */
  runners: RunnerResult[];
  /** Computed at this story (story ID + parameters) */
  storyId: string;
  /** Aggregated overall score percentage (sum of scores / max possible * 100); null if no scores */
  overallPct: number | null;
  /** Cap-rule disclosure text (per FR-CORE-004 — same text for all addon installs) */
  capRuleDisclosure: string;
}

/** Storybook parameters config for the addon (set per-story via parameters.dsaf). */
export interface DsafAddonParameters {
  /** Disable the addon for this story */
  disabled?: boolean;
  /** Skip specific runners (default: run all 4) */
  skipRunners?: Array<'coverage' | 'apca' | 'bundle-size' | 'doc-freshness'>;
  /** Override the framework root (default: auto-detect from process.cwd()) */
  frameworkRoot?: string;
}
```

### `packages/storybook-addon/src/scoring.ts`

```typescript
/**
 * DSAF scoring engine — converts DSAF script output to per-criterion scores.
 *
 * Per FR-INTEG-001 §3. Uses the audit_targets field convention from existing scripts.
 * Per FR-CORE-001 §1 verbatim-quote rule: criterion IDs + names match docs/03-criteria-part-a.md and docs/04-criteria-part-b.md verbatim.
 */

import type { CriterionScore, RunnerResult, PanelData } from './types.js';

/** Known criterion metadata — kept in sync with docs/03-criteria-part-a.md + docs/04-criteria-part-b.md.
 *  Per FR-CORE-001 verbatim-quote rule. Updates with FR-CORE-003 dedup + FR-GOV-003 P6 RFCs. */
const CRITERION_METADATA: Record<string, { name: string; tag: 'FIXED' | 'DYNAMIC'; deepDiveUrl?: string }> = {
  'A.1.1': {
    name: 'Color tokens with primitive→semantic→component layers',
    tag: 'FIXED',
    deepDiveUrl: 'https://dsaf.dev/blog/deep-dives/a1-1-color-tokens-three-tier-architecture'
  },
  'A.1.3': {
    name: 'Spacing scale (4 / 8 px geometric)',
    tag: 'FIXED'
  },
  'A.1.8': {
    name: 'Token format & DTCG conformance',
    tag: 'DYNAMIC'
  },
  'A.2.1': {
    name: 'Coverage of "Top 20" components',
    tag: 'FIXED'
  },
  'A.2.4': {
    name: 'Variant & state coverage',
    tag: 'FIXED'
  },
  'A.5.4': {
    name: 'Storybook (or equivalent) with a11y, viewport, theme, RTL toggles',
    tag: 'FIXED'
  },
  'A.7.1': {
    name: 'WCAG 2.x AA self-claim per component (caps at 4/5 without vendor letter)',
    tag: 'FIXED'
  },
  'A.8.1': {
    name: 'Bundle-size budgets enforced in CI (per package, per theme)',
    tag: 'FIXED'
  },
  'A.8.6': {
    name: 'Color contrast (WCAG 2.x AA / APCA Lc 60 body, Lc 45 large)',
    tag: 'DYNAMIC'
  },
  // ... 16 more entries for all 25 DSAF-25 Core criteria (per FR-CORE-001 §3b)
  // Plus criteria from outside the Core that scripts may score (A.3.7 doc freshness etc.)
};

/** Convert a single script's audit_targets output to CriterionScore[]. */
export function scoreFromAuditTargets(
  scriptName: string,
  auditTargets: Record<string, number>,
  rationaleOverride?: Record<string, string>
): CriterionScore[] {
  const computedAt = new Date().toISOString();
  const scores: CriterionScore[] = [];

  for (const [criterionId, score] of Object.entries(auditTargets)) {
    if (!Number.isFinite(score) || score < 0 || score > 5) {
      // Invalid score; skip (the script may have outputted "n/a" or a string)
      continue;
    }
    const meta = CRITERION_METADATA[criterionId];
    if (!meta) {
      // Unknown criterion ID — the script references a criterion not in our metadata
      // This is acceptable (e.g., script-specific extension criteria) but logged
      console.warn(`[dsaf-storybook-addon] Unknown criterion ID from ${scriptName}: ${criterionId}`);
      continue;
    }
    scores.push({
      id: criterionId,
      name: meta.name,
      score: Math.round(score) as 0 | 1 | 2 | 3 | 4 | 5,
      tag: meta.tag,
      rationale: rationaleOverride?.[criterionId] ??
        `${scriptName} produced score ${score} for ${criterionId}.`,
      deepDiveUrl: meta.deepDiveUrl,
      computedAt
    });
  }

  return scores;
}

/** Aggregate multiple RunnerResult objects into PanelData. */
export function aggregateRunners(
  storyId: string,
  runners: RunnerResult[]
): PanelData {
  // Deduplicate scores by criterion ID (multiple runners may score the same criterion;
  // take the latest computedAt + highest-confidence runner)
  const seen = new Map<string, CriterionScore>();
  for (const r of runners) {
    if (!r.ok) continue;
    for (const s of r.scores) {
      const existing = seen.get(s.id);
      // If this runner has a more recent timestamp, replace
      if (!existing || s.computedAt > existing.computedAt) {
        seen.set(s.id, s);
      }
    }
  }
  const allScores = Array.from(seen.values()).sort((a, b) => a.id.localeCompare(b.id));

  // Compute overall pct
  let overallPct: number | null = null;
  if (allScores.length > 0) {
    const total = allScores.reduce((sum, s) => sum + s.score, 0);
    const max = allScores.length * 5;
    overallPct = (total / max) * 100;
  }

  return {
    allScores,
    runners,
    storyId,
    overallPct,
    capRuleDisclosure:
      'These scores are self-assessment via the DSAF Storybook addon. Public DSAF Level caps at L3 (Managed) without third-party verification per the self-audit publication policy at https://dsaf.dev/branding/self-audit-policy.'
  };
}
```

### `packages/storybook-addon/src/runners/coverage.ts` (illustrative — same pattern for apca, bundle-size, doc-freshness)

```typescript
/**
 * Coverage runner — wraps scripts/check-coverage.mjs.
 *
 * Per FR-INTEG-001 §3 + DEC-081 (direct module imports, NOT shell-exec).
 */

import type { RunnerResult } from '../types.js';
import { scoreFromAuditTargets } from '../scoring.js';

export async function runCoverage(frameworkRoot: string): Promise<RunnerResult> {
  const startedAt = performance.now();
  try {
    // Direct ESM import of the script's main function.
    // Note: the existing scripts are top-level-executed; for the addon, we'd refactor
    // each script to export a `runCheck()` async function that returns the JSON output.
    // (The refactor is in scope of FR-INTEG-001 — minimal, non-breaking change to the scripts.)
    //
    // Pseudocode (actual import + invocation pattern):
    //   const { runCheck } = await import(`${frameworkRoot}/scripts/check-coverage.mjs`);
    //   const output = await runCheck({ srcRoot: `${frameworkRoot}/src` });
    //
    // For test mocking, the import path is configurable.

    const importPath = new URL(`file://${frameworkRoot}/scripts/check-coverage.mjs`).href;
    const { runCheck } = await import(importPath);
    const output = await runCheck({ srcRoot: `${frameworkRoot}/src` });

    // Extract audit_targets per the existing script's output convention
    const auditTargets = output.audit_targets as Record<string, number>;
    const scores = scoreFromAuditTargets('check-coverage', auditTargets);

    return {
      runner: 'check-coverage',
      ok: true,
      scores,
      rawOutput: output,
      durationMs: Math.round(performance.now() - startedAt)
    };
  } catch (e) {
    return {
      runner: 'check-coverage',
      ok: false,
      scores: [],
      error: String(e),
      durationMs: Math.round(performance.now() - startedAt)
    };
  }
}
```

### `packages/storybook-addon/src/Panel.tsx`

```tsx
/**
 * DSAF Storybook addon — Panel React component.
 *
 * Renders per-criterion scores + rationale + dsaf.dev/blog/deep-dives/ links + cap-rule disclosure.
 * Per FR-INTEG-001 §1 #6 (panel position) + §1 #15 (cap-rule disclosure).
 */

import React, { useEffect, useState } from 'react';
import { useChannel, useStorybookState } from '@storybook/manager-api';
import type { PanelData } from './types.js';

const STORY_RENDERED = 'storyRendered';
const DSAF_DATA = 'dsaf/data';

interface PanelProps {
  active: boolean;
}

export const Panel: React.FC<PanelProps> = ({ active }) => {
  const [data, setData] = useState<PanelData | null>(null);
  const [loading, setLoading] = useState(true);

  useChannel({
    [STORY_RENDERED]: () => {
      setLoading(true);
      setData(null);
    },
    [DSAF_DATA]: (panelData: PanelData) => {
      setData(panelData);
      setLoading(false);
    }
  });

  if (!active) return null;

  return (
    <div style={{ padding: '1rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h3 style={{ margin: '0 0 0.5rem' }}>DSAF — per-criterion scores</h3>

      {loading && <p style={{ color: '#6b7280' }}>Running DSAF scripts…</p>}

      {!loading && !data && (
        <p style={{ color: '#dc2626' }}>
          DSAF data unavailable. Check the browser console for errors.
        </p>
      )}

      {data && (
        <>
          {data.overallPct !== null && (
            <p style={{ fontSize: '1.2rem', fontWeight: 600, margin: '0.5rem 0' }}>
              Overall: {data.overallPct.toFixed(1)}% (across {data.allScores.length} criteria scored)
            </p>
          )}

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e5e7eb', textAlign: 'left' }}>
                <th style={{ padding: '0.5rem' }}>Criterion</th>
                <th style={{ padding: '0.5rem' }}>Score</th>
                <th style={{ padding: '0.5rem' }}>Tag</th>
                <th style={{ padding: '0.5rem' }}>Rationale</th>
                <th style={{ padding: '0.5rem' }}>Deep-dive</th>
              </tr>
            </thead>
            <tbody>
              {data.allScores.map((s) => (
                <tr key={s.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '0.5rem', fontFamily: 'monospace' }}>{s.id}</td>
                  <td style={{ padding: '0.5rem', fontWeight: 600 }}>{s.score}/5</td>
                  <td style={{ padding: '0.5rem', fontSize: '0.85rem', color: '#6b7280' }}>{s.tag}</td>
                  <td style={{ padding: '0.5rem', fontSize: '0.9rem' }}>{s.rationale}</td>
                  <td style={{ padding: '0.5rem' }}>
                    {s.deepDiveUrl ? (
                      <a href={s.deepDiveUrl} target="_blank" rel="noreferrer">
                        Read →
                      </a>
                    ) : (
                      <span style={{ color: '#9ca3af' }}>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p style={{ marginTop: '1.5rem', padding: '0.75rem', background: '#f3f4f6', borderLeft: '3px solid #6b7280', fontSize: '0.85rem' }}>
            {data.capRuleDisclosure}
          </p>
        </>
      )}
    </div>
  );
};
```

### `packages/storybook-addon/src/preset.ts`

```typescript
/**
 * Storybook preset — registers the addon's manager + preview entrypoints.
 *
 * Per Storybook 7+ preset spec: https://storybook.js.org/docs/addons/writing-presets
 */

export default {
  managerEntries: (entry: string[] = []) => [...entry, require.resolve('./manager')],
  previewAnnotations: (entry: string[] = []) => [...entry, require.resolve('./preview')]
};
```

### `packages/storybook-addon/src/manager.ts`

```typescript
/**
 * Storybook manager-side entrypoint — registers the panel addon.
 *
 * Per Storybook 7+ manager-API: https://storybook.js.org/docs/addons/addons-api
 */

import { addons, types } from '@storybook/manager-api';
import { Panel } from './Panel.js';

const ADDON_ID = 'dsaf';
const PANEL_ID = `${ADDON_ID}/panel`;

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'DSAF',
    match: ({ viewMode }) => viewMode === 'story',
    render: Panel as any
  });
});
```

### `packages/storybook-addon/src/preview.ts`

```typescript
/**
 * Storybook preview-side entrypoint — runs the DSAF scripts when a story renders + emits results to the panel.
 *
 * Per Storybook 7+ preview-API: https://storybook.js.org/docs/addons/writing-stories
 */

import { addons } from '@storybook/preview-api';
import { runCoverage } from './runners/coverage.js';
import { runApca } from './runners/apca.js';
import { runBundleSize } from './runners/bundle-size.js';
import { runDocFreshness } from './runners/doc-freshness.js';
import { aggregateRunners } from './scoring.js';
import type { DsafAddonParameters, RunnerResult } from './types.js';

const STORY_RENDERED = 'storyRendered';
const DSAF_DATA = 'dsaf/data';

const channel = addons.getChannel();

channel.on(STORY_RENDERED, async (storyId: string) => {
  // Get story parameters
  // (in real addon, use Storybook's parameter API; this is illustrative pseudocode)
  const params: DsafAddonParameters = {}; // ... resolve from parameters.dsaf

  if (params.disabled) {
    channel.emit(DSAF_DATA, null);
    return;
  }

  const frameworkRoot = params.frameworkRoot ?? process.cwd();
  const skip = new Set(params.skipRunners ?? []);

  // Run runners in parallel
  const runners: RunnerResult[] = [];
  const tasks = [];
  if (!skip.has('coverage')) tasks.push(runCoverage(frameworkRoot).then((r) => runners.push(r)));
  if (!skip.has('apca')) tasks.push(runApca(frameworkRoot).then((r) => runners.push(r)));
  if (!skip.has('bundle-size')) tasks.push(runBundleSize(frameworkRoot).then((r) => runners.push(r)));
  if (!skip.has('doc-freshness')) tasks.push(runDocFreshness(frameworkRoot).then((r) => runners.push(r)));
  await Promise.allSettled(tasks);

  const data = aggregateRunners(storyId, runners);
  channel.emit(DSAF_DATA, data);
});
```

### `packages/storybook-addon/tests/scoring.test.ts`

```typescript
/**
 * Vitest unit tests for scoring engine.
 * Target: ≥ 80% coverage of src/scoring.ts.
 */

import { describe, it, expect } from 'vitest';
import { scoreFromAuditTargets, aggregateRunners } from '../src/scoring.js';
import type { RunnerResult } from '../src/types.js';

describe('scoreFromAuditTargets', () => {
  it('converts audit_targets to CriterionScore[] with correct metadata', () => {
    const result = scoreFromAuditTargets('check-coverage', {
      'A.1.1': 4,
      'A.2.4': 5,
      'A.7.1': 3
    });
    expect(result).toHaveLength(3);
    expect(result[0]).toMatchObject({
      id: 'A.1.1',
      name: 'Color tokens with primitive→semantic→component layers',
      score: 4,
      tag: 'FIXED'
    });
  });

  it('skips invalid scores (non-finite, out of range)', () => {
    const result = scoreFromAuditTargets('test', {
      'A.1.1': NaN,
      'A.1.3': -1,
      'A.1.8': 7,
      'A.2.1': 3
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('A.2.1');
  });

  it('skips unknown criterion IDs and logs a warning', () => {
    // unknown criterion IDs are dropped gracefully
    const result = scoreFromAuditTargets('test', {
      'UNKNOWN.1.1': 3,
      'A.1.1': 4
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('A.1.1');
  });

  it('uses rationaleOverride when provided', () => {
    const result = scoreFromAuditTargets('test', { 'A.1.1': 4 }, {
      'A.1.1': 'Custom rationale text'
    });
    expect(result[0].rationale).toBe('Custom rationale text');
  });
});

describe('aggregateRunners', () => {
  it('aggregates scores across runners with deduplication', () => {
    const runners: RunnerResult[] = [
      {
        runner: 'r1',
        ok: true,
        scores: [
          { id: 'A.1.1', name: 'foo', score: 3, tag: 'FIXED', rationale: 'r1', computedAt: '2026-01-01T00:00:00Z' }
        ],
        durationMs: 10
      },
      {
        runner: 'r2',
        ok: true,
        scores: [
          { id: 'A.1.1', name: 'foo', score: 4, tag: 'FIXED', rationale: 'r2', computedAt: '2026-01-02T00:00:00Z' },
          { id: 'A.2.4', name: 'bar', score: 5, tag: 'FIXED', rationale: 'r2', computedAt: '2026-01-02T00:00:00Z' }
        ],
        durationMs: 20
      }
    ];
    const data = aggregateRunners('test-story', runners);
    expect(data.allScores).toHaveLength(2);
    const a11 = data.allScores.find((s) => s.id === 'A.1.1');
    expect(a11?.score).toBe(4);  // r2 (later timestamp) wins
    expect(a11?.rationale).toBe('r2');
  });

  it('skips runners with ok: false', () => {
    const runners: RunnerResult[] = [
      {
        runner: 'r1',
        ok: false,
        scores: [],
        error: 'failed',
        durationMs: 5
      }
    ];
    const data = aggregateRunners('test-story', runners);
    expect(data.allScores).toHaveLength(0);
    expect(data.overallPct).toBeNull();
  });

  it('computes overallPct correctly', () => {
    const runners: RunnerResult[] = [
      {
        runner: 'r1',
        ok: true,
        scores: [
          { id: 'A.1.1', name: 'foo', score: 4, tag: 'FIXED', rationale: 'r1', computedAt: '2026-01-01T00:00:00Z' },
          { id: 'A.2.4', name: 'bar', score: 5, tag: 'FIXED', rationale: 'r1', computedAt: '2026-01-01T00:00:00Z' }
        ],
        durationMs: 10
      }
    ];
    const data = aggregateRunners('test', runners);
    expect(data.overallPct).toBe(90); // (4+5)/(2*5) * 100 = 90
  });

  it('emits cap-rule disclosure', () => {
    const data = aggregateRunners('test', []);
    expect(data.capRuleDisclosure).toContain('L3');
    expect(data.capRuleDisclosure).toContain('https://dsaf.dev/branding/self-audit-policy');
  });
});
```

### `.github/workflows/storybook-addon-ci.yml`

```yaml
name: Storybook Addon CI

on:
  push:
    branches: [main]
    paths:
      - 'packages/storybook-addon/**'
      - '.github/workflows/storybook-addon-ci.yml'
  pull_request:
    paths:
      - 'packages/storybook-addon/**'

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [20.x, 22.x]
        storybook-version: ['7', '8']
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
          cache-dependency-path: packages/storybook-addon/package-lock.json
      - name: Install
        run: cd packages/storybook-addon && npm ci
      - name: Lint
        run: cd packages/storybook-addon && npm run lint
      - name: Test
        run: cd packages/storybook-addon && npm test
      - name: Build
        run: cd packages/storybook-addon && npm run build
      - name: Verify ≥ 80% coverage
        run: |
          cd packages/storybook-addon
          COV=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
          [ "$(echo "$COV >= 80" | bc -l)" = "1" ] || (echo "Coverage $COV below 80%"; exit 1)
```

### `packages/storybook-addon/README.md`

```markdown
# @dsaf/storybook-addon

DSAF Storybook addon — runs [Design System Audit Framework](https://dsaf.dev) scripts per story; shows per-criterion scores in a panel.

## Install

```bash
npm install -D @dsaf/storybook-addon
```

## Configure

In `.storybook/main.ts`:

```typescript
export default {
  addons: ['@dsaf/storybook-addon']
};
```

## What you see

A new "DSAF" panel in your Storybook UI. Per-story, the panel shows:

- Per-criterion DSAF scores (0-5 per criterion, from the 25 DSAF-25 Core criteria)
- Rationale per score (one sentence)
- Links to dsaf.dev/blog/deep-dives/ for each criterion
- Cap-rule disclosure: public DSAF Level caps at L3 unverified

## Per-story configuration

Per-story, you can:

- **Disable the addon for this story:** `parameters: { dsaf: { disabled: true } }`
- **Skip specific runners:** `parameters: { dsaf: { skipRunners: ['bundle-size'] } }`
- **Override framework root:** `parameters: { dsaf: { frameworkRoot: '/custom/path' } }`

## More

- Full docs: https://dsaf.dev/integrations/storybook-addon
- Framework: https://github.com/CyberSkill/design-system-audit-framework
- Issue tracker: https://github.com/CyberSkill/design-system-audit-framework/issues

## License

MIT
```

### `docs/integrations/storybook-addon.md` (user-facing doc on dsaf.dev)

```markdown
---
title: "DSAF Storybook addon — installation, usage, troubleshooting"
ratified_by: FR-INTEG-001 (2026-05-17)
package: '@dsaf/storybook-addon'
---

# DSAF Storybook addon

## What it does

The DSAF Storybook addon brings Design System Audit Framework scoring into your Storybook UI. Per story, you see per-criterion DSAF scores in a panel; you don't have to context-switch to a separate audit tool.

## Installation

```bash
npm install -D @dsaf/storybook-addon
```

In `.storybook/main.ts`:

```typescript
export default {
  addons: ['@dsaf/storybook-addon']
};
```

That's it. Run Storybook (`npm run storybook`) and you'll see a "DSAF" panel.

## What the panel shows

Per-story, the panel displays:

1. **Overall score percentage** — sum of per-criterion scores / max possible × 100.
2. **Per-criterion table** — each scored criterion with: ID (e.g., `A.1.1`), name, score (0-5), tag (FIXED/DYNAMIC), rationale, link to dsaf.dev/blog/deep-dives/ for that criterion.
3. **Cap-rule disclosure** — at the bottom, explaining that public DSAF Level caps at L3 without third-party verification per the [self-audit publication policy](https://dsaf.dev/branding/self-audit-policy).

## How scores are computed

The addon runs 4 DSAF scripts in-process per story:

- `check-coverage` — token coverage, component coverage, story coverage (scores A.7.1, A.2.4, A.5.4)
- `check-apca` — APCA + WCAG 2.x color contrast (scores A.8.6)
- `check-bundle-size` — bundle-size budget enforcement (scores A.8.1)
- `check-doc-freshness` — documentation freshness (scores A.3.7)

Each script outputs per-criterion scores via the `audit_targets` field convention. The addon aggregates across runners + deduplicates (later runner wins for same criterion).

## Per-story configuration

Add `parameters: { dsaf: ... }` to a story or to `preview.ts` defaults:

```typescript
// Disable for this story
export const MyStory = {
  parameters: { dsaf: { disabled: true } }
};

// Skip bundle-size for this story (e.g., for a primitive component)
export const Atom = {
  parameters: { dsaf: { skipRunners: ['bundle-size'] } }
};
```

## Troubleshooting

### 1. "DSAF data unavailable" message

The runners couldn't load. Check the browser console + Storybook terminal for the error. Common causes:
- Framework root not detected (set `parameters: { dsaf: { frameworkRoot: '/path/to/framework' } }`)
- Script ESM import failed (verify the framework's `scripts/check-coverage.mjs` exists + is valid ESM)

### 2. Scores not updating between stories

The addon re-runs on `storyRendered` events. If scores cache, refresh the browser. If the issue persists, file an issue at [GitHub](https://github.com/CyberSkill/design-system-audit-framework/issues).

### 3. Some criteria show but not others

Each script scores specific criteria (per its `audit_targets`). Missing criteria are not in any script's output; run the full DSAF audit (via prompts/scan-mode.md + LLM agent) for complete coverage.

### 4. CI failure on addon installation

Verify Storybook version is 7.x or 8.x (the addon supports both). Storybook 6.x is not supported.

### 5. Cap-rule disclosure missing

The disclosure is hardcoded in the addon per FR-CORE-004 cap rule policy. If it's missing, you may be on an outdated addon version; upgrade with `npm install -D @dsaf/storybook-addon@latest`.

## Limitations

- The addon doesn't replace the full DSAF audit (use prompts/scan-mode.md + LLM agent for 125-criterion + complete audit-report.md output).
- The addon doesn't handle multi-framework projects (each Storybook project = one DSAF score).
- The addon's panel UI is React; framework users (Vue, Angular, Svelte stories) still see the React-based panel — that's a Storybook addon convention, not a limitation.

## Versioning + roadmap

Current: v0.1.0 (DSAF v1; supports Storybook 7-8).

Roadmap:
- v0.2: support `parameters: { dsaf: { customRunners: [...] } }` for user-defined runners (post-FR-CORE-005 P5 Mode W spec).
- v1.0: stable + Storybook 9 support when 9 lands.

## Contributing

PRs welcome at https://github.com/CyberSkill/design-system-audit-framework. The addon's source is at `packages/storybook-addon/`.

Per FR-CORE-002 no-silent-regression rule applied to the addon: every PR runs Vitest tests + Storybook test-runner; coverage MUST stay ≥ 80%.

## License

MIT (matching the framework).
```

### `README.md` — cross-link patch

After the FR-I18N-001 translation cross-links (per FR-DOCS-001 sacredness):

```markdown
**Integrations.** [DSAF Storybook addon](https://dsaf.dev/integrations/storybook-addon) — runs DSAF scripts per story; per-criterion panel. `npm install -D @dsaf/storybook-addon`. (Tokens Studio validator + zeroheight reader integrations land in FR-INTEG-002 + FR-INTEG-003.)
```

### `dsaf.dev/index.html` — footer patch

Add to the existing footer:

```html
<p class="meta">
  ...
  Integrations: <a href="/integrations/storybook-addon">Storybook addon</a>.
  ...
</p>
```

---

## §4 — Acceptance criteria

1. **Package scaffolded** — `packages/storybook-addon/package.json`, `tsconfig.json`, `src/index.ts` exist.
2. **Storybook 7 + 8 supported** — `package.json` `peerDependencies.storybook` is `">=7.0.0 <9.0.0"`.
3. **4 runners shipped** — `src/runners/coverage.ts`, `apca.ts`, `bundle-size.ts`, `doc-freshness.ts` all exist + export a runner function.
4. **Scoring engine + types** — `src/scoring.ts` exports `scoreFromAuditTargets` + `aggregateRunners`; `src/types.ts` exports `CriterionScore`, `RunnerResult`, `PanelData`, `DsafAddonParameters`.
5. **Direct module imports, NOT shell-exec** — `grep -r 'spawn\|exec\|execSync' packages/storybook-addon/src/` returns 0 matches.
6. **Panel component** — `src/Panel.tsx` is a React component rendering the per-criterion table + cap-rule footer.
7. **Panel position** — `src/manager.ts` registers the addon with `type: types.PANEL`.
8. **Vitest tests** — `tests/scoring.test.ts` + `tests/runners.test.ts` exist with ≥ 8 test cases total.
9. **Coverage ≥ 80%** — `npm test` runs Vitest with `--coverage`; output shows `lines >= 80%`.
10. **CI workflow** — `.github/workflows/storybook-addon-ci.yml` runs Vitest + matrix-tests Node 20 / 22 × Storybook 7 / 8.
11. **README + CHANGELOG + .npmignore** — `packages/storybook-addon/README.md`, `CHANGELOG.md`, `.npmignore` all exist.
12. **User-facing docs** — `docs/integrations/storybook-addon.md` exists with installation + usage + ≥ 5 troubleshooting entries.
13. **Cap-rule disclosure in panel** — `Panel.tsx` renders `data.capRuleDisclosure` text; `scoring.ts` `aggregateRunners` produces the disclosure with the L3 + self-audit-policy URL.
14. **Cross-link patches** — `README.md` has a cross-link to the integration; `dsaf.dev/index.html` footer has an "Integrations" link.
15. **No paid-funnel CTAs** — `grep -ciE 'Talk to a certified|Contact (us|sales|CyberSkill)|Schedule (a|your) demo|Book (a|your) call' packages/storybook-addon/README.md docs/integrations/storybook-addon.md` returns 0.
16. **Handle taxonomy compliance** — `grep -ciE '\b(the )?DSAF Framework\b|\bDSAF framework\b' packages/storybook-addon/README.md docs/integrations/storybook-addon.md` returns 0; `grep -c '\bDSAF\b' packages/storybook-addon/README.md` ≥ 5.
17. **Addon optional, not required** — `docs/integrations/storybook-addon.md` "Limitations" section explicitly states "addon doesn't replace the full DSAF audit" + "run prompts/scan-mode.md + LLM agent for 125-criterion coverage."
18. **License MIT** — `packages/storybook-addon/package.json` `"license": "MIT"`.
19. **CriterionScore type matches DSAF rubric** — `src/types.ts` `CriterionScore.score` typed as `0 | 1 | 2 | 3 | 4 | 5`; `tag` as `'FIXED' | 'DYNAMIC'`.
20. **PR description includes Lighthouse + test-output screenshots** — for docs page + CI run.

---

## §5 — Verification

```bash
# AC1, AC2 — package scaffolded + Storybook version
test -f packages/storybook-addon/package.json
grep -q '"@dsaf/storybook-addon"' packages/storybook-addon/package.json
grep -q '">=7.0.0 <9.0.0"' packages/storybook-addon/package.json

# AC3 — 4 runners
for runner in coverage apca bundle-size doc-freshness; do
  test -f "packages/storybook-addon/src/runners/${runner}.ts" || echo "MISSING runner: ${runner}"
done

# AC4 — scoring engine + types
grep -q 'export function scoreFromAuditTargets' packages/storybook-addon/src/scoring.ts
grep -q 'export function aggregateRunners' packages/storybook-addon/src/scoring.ts
grep -q 'export interface CriterionScore' packages/storybook-addon/src/types.ts
grep -q 'export interface RunnerResult' packages/storybook-addon/src/types.ts
grep -q 'export interface PanelData' packages/storybook-addon/src/types.ts

# AC5 — no shell-exec
grep -r -E '\b(spawn|exec|execSync|spawnSync)\b' packages/storybook-addon/src/ | \
  grep -v -E '(\.test\.|fixtures/|//\s)' | \
  awk 'END { exit NR > 0 ? 1 : 0 }'

# AC6, AC7 — panel
test -f packages/storybook-addon/src/Panel.tsx
grep -q 'types.PANEL' packages/storybook-addon/src/manager.ts

# AC8, AC9 — tests + coverage
test -f packages/storybook-addon/tests/scoring.test.ts
test -f packages/storybook-addon/tests/runners.test.ts
cd packages/storybook-addon && npm test
# Coverage report parsed in CI; manual verification in PR description

# AC10 — CI workflow
test -f .github/workflows/storybook-addon-ci.yml
grep -q 'storybook-version' .github/workflows/storybook-addon-ci.yml

# AC11 — README + CHANGELOG + .npmignore
test -f packages/storybook-addon/README.md
test -f packages/storybook-addon/CHANGELOG.md
test -f packages/storybook-addon/.npmignore

# AC12 — user-facing docs
test -f docs/integrations/storybook-addon.md
grep -c '###' docs/integrations/storybook-addon.md  # ≥ 5 for troubleshooting entries

# AC13 — cap-rule disclosure
grep -q 'capRuleDisclosure' packages/storybook-addon/src/Panel.tsx
grep -q 'L3' packages/storybook-addon/src/scoring.ts
grep -q 'self-audit-policy' packages/storybook-addon/src/scoring.ts

# AC14 — cross-link patches
grep -q '@dsaf/storybook-addon\|storybook-addon' README.md
grep -q 'storybook-addon\|integrations' dsaf.dev/index.html

# AC15 — no paid CTAs
grep -ciE 'Talk to a certified|Contact (us|sales|CyberSkill)|Schedule (a|your) demo|Book (a|your) call' \
  packages/storybook-addon/README.md docs/integrations/storybook-addon.md
# expected: 0

# AC16 — handle taxonomy
grep -ciE '\b(the )?DSAF Framework\b|\bDSAF framework\b' \
  packages/storybook-addon/README.md docs/integrations/storybook-addon.md
# expected: 0
grep -c '\bDSAF\b' packages/storybook-addon/README.md  # >= 5

# AC17 — addon optional
grep -qi "doesn't replace the full DSAF audit\|optional" docs/integrations/storybook-addon.md

# AC18 — license MIT
grep -q '"license": "MIT"' packages/storybook-addon/package.json

# AC19 — type constraints
grep -q 'score: 0 | 1 | 2 | 3 | 4 | 5' packages/storybook-addon/src/types.ts
grep -q "tag: 'FIXED' | 'DYNAMIC'" packages/storybook-addon/src/types.ts
```

Human-verified ACs (no script):

- **AC20** — reviewer reads PR description for Lighthouse + test-output screenshots.

---

## §6 — Implementation skeleton

The operator playbook (16h founder-time OR ~$2K commissioned engineer over 2-3 weeks):

1. **(1h) Scaffold `packages/storybook-addon/`** per §3 `package.json`, `tsconfig.json`, directory structure.
2. **(2h) Author `src/types.ts` + `src/scoring.ts`** per §3 — TypeScript types + scoring engine.
3. **(3h) Author `src/runners/*`** — 4 runner modules wrapping the existing scripts via direct ESM imports.
4. **(2h) Author `src/Panel.tsx`** — React component rendering per-criterion table + cap-rule disclosure.
5. **(1h) Author `src/preset.ts` + `src/manager.ts` + `src/preview.ts`** — Storybook addon registration.
6. **(3h) Author `tests/`** — Vitest unit tests; fixture corpus (sample tokens.json + sample story); ≥ 80% coverage.
7. **(1h) Author `.github/workflows/storybook-addon-ci.yml`** — CI matrix Node 20/22 × Storybook 7/8.
8. **(1h) Author `packages/storybook-addon/README.md` + `docs/integrations/storybook-addon.md`** — npm + dsaf.dev docs.
9. **(1h) Author `CHANGELOG.md` + `.npmignore` + publish-readiness checklist.**
10. **(30m) Patch `README.md` + `dsaf.dev/index.html`** with integration cross-links.
11. **(30m) Verify Lighthouse score on `dsaf.dev/integrations/storybook-addon`** (≥ 90).

---

## §7 — Dependencies

- **Upstream (required):**
  - **FR-CORE-001** — DSAF-25 Core criteria + verbatim-quote rule; addon's `CRITERION_METADATA` matches.
  - **FR-CORE-003** — criteria dedup; addon's metadata version-pinned to dedup state.
- **Coordinated:**
  - **FR-CORE-002** — no-silent-regression rule applies to addon's CHANGELOG (semver discipline for API changes).
  - **FR-CORE-004** — cap-rule disclosure in panel.
  - **FR-BRAND-001 + FR-BRAND-004** — addon UI doesn't include paid-funnel CTAs.
  - **FR-BRAND-002** — handle taxonomy.
  - **FR-CONTENT-001** — deep-dive links per criterion (when deep-dives exist).
- **Downstream blocks:**
  - **FR-INTEG-002** — Tokens Studio validator shares the scoring engine + runner pattern from this FR.
  - **FR-INTEG-003** — zeroheight reader same.
  - **FR-CLI-001** (P5 `npx dsaf scan`) — reuses scoring engine + runner pattern.
- **External:**
  - Storybook 7.x or 8.x install in the consumer's project.
  - Node 20+ (matches Storybook 7+ requirements).
  - npm registry for package publication.

---

## §8 — Example payloads

### Example: a story configured with addon parameters

```typescript
// MyButton.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    dsaf: {
      // Skip bundle-size for this atom story (the bundle is the whole DS, not per-component)
      skipRunners: ['bundle-size']
    }
  }
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary', children: 'Click me' }
};
```

When this story renders, the DSAF panel shows scores from coverage + apca + doc-freshness runners (not bundle-size). The panel might display:

```
DSAF — per-criterion scores

Overall: 76.0% (across 5 criteria scored)

Criterion | Score | Tag | Rationale | Deep-dive
A.1.1 | 4/5 | FIXED | check-coverage produced score 4: token coverage 72% | Read →
A.2.4 | 5/5 | FIXED | check-coverage produced score 5: variant coverage 95%+ | —
A.5.4 | 5/5 | FIXED | check-coverage produced score 5: storybook + a11y enabled | —
A.7.1 | 4/5 | FIXED | check-coverage produced score 4: self-claimed; vendor letter pending | —
A.8.6 | 3/5 | DYNAMIC | check-apca produced score 3: APCA Lc 64 (between Lc 60 minimum and Lc 75 stretch) | —

[Cap-rule footer:] These scores are self-assessment via the DSAF Storybook addon.
Public DSAF Level caps at L3 (Managed) without third-party verification per the
self-audit publication policy at https://dsaf.dev/branding/self-audit-policy.
```

### Example: a runner result for a failed run

```json
{
  "runner": "check-apca",
  "ok": false,
  "scores": [],
  "error": "tokens/colour.tokens.json not found at framework root",
  "durationMs": 15
}
```

The panel shows: "DSAF data unavailable. Check the browser console for errors." Console: the error message. The user fixes the tokens path or sets `parameters: { dsaf: { frameworkRoot: '/correct/path' } }`.

### Example: addon disabled per-story

```typescript
parameters: { dsaf: { disabled: true } }
```

The panel still appears in the Storybook UI but shows: (empty — addon disabled for this story).

---

## §9 — Open questions

All resolved at authoring time:

- **Q1: Storybook 6.x support?** Resolved → dropped (§1 #2). Install base is minimal by P2 ship; test-matrix burden disproportionate.
- **Q2: React panel vs framework-agnostic panel?** Resolved → React (§2). Storybook 7+ manager UI is React regardless of story framework.
- **Q3: Shell-exec vs direct imports?** Resolved → direct imports (§1 #3, §2). Cross-platform + faster + testable.
- **Q4: Bundled scripts vs runtime resolution?** Resolved → runtime resolution via `frameworkRoot` parameter (§3 runner pattern). The addon doesn't bundle script copies; it imports from the framework root at runtime. This keeps the addon small + always-in-sync.
- **Q5: Score caching between stories?** Resolved → no (panel re-runs on `storyRendered`). Caching would mask score changes between dev iterations.
- **Q6: Multi-framework Storybook support (Vue, Angular, Svelte stories)?** Resolved → yes for the panel (React-based, framework-agnostic); the runners don't care about the story framework (they read tokens + repo files, not story output).
- **Q7: npm publishing org account (CyberSkill or neutral)?** Resolved → publish under `@dsaf` npm org (matches the framework's neutral-org future per FR-GOV-002 + FR-BRAND-001). CyberSkill is the maintainer; the package's org is neutral.

---

## §10 — Failure modes inventory

| Failure | Detection | Outcome | Recovery |
|---|---|---|---|
| Script ESM import fails (script doesn't export expected function) | runner result `ok: false` | Panel shows error | The runner returns the error; the user sees it in the panel + console. Fix by refactoring the script to export `runCheck()` (minimal non-breaking change) |
| Framework root not detected | runner result `ok: false` | Panel shows error | User sets `parameters: { dsaf: { frameworkRoot: '/path' } }` per-story or in preview.ts defaults |
| Storybook 9 ships (when current — beyond P2 scope) | peerDependency mismatch | Install warning | v1.0 bump per CHANGELOG to expand peerDependency to `<10.0.0` |
| Coverage drops below 80% in a PR | CI check fails | PR blocked | Add test cases; CI re-runs |
| Addon tries to run on a non-story view (docs page, etc.) | `match: ({ viewMode }) => viewMode === 'story'` filter | Panel hidden | Working as designed; the addon is story-only |
| Multiple stories scored differently for the same component | by-story scoring difference | User confusion | The addon scores per-story (each story is a fresh runner invocation); this is intentional + expected (different stories may exercise different code paths). Document in §troubleshooting |
| Panel UI breaks on small screens | rendering quirk | Mobile Storybook unusable | Add responsive CSS to Panel.tsx; test on min-width 600px (typical phone landscape) |
| Vitest coverage tooling broken in CI | CI failure | Coverage check unreliable | Update Vitest + @vitest/coverage-v8; pin to last-known-good versions |
| npm publish fails (auth issue) | publish error | Package not published | Verify npm auth in CI; use `npm publish --dry-run` first |
| User reports panel doesn't reflect latest token changes | dev experience issue | Stale scores | The addon re-runs on storyRendered; if scores cache, the runner has a bug — investigate |
| Script's audit_targets includes a criterion ID not in CRITERION_METADATA | console warning | Score dropped | The scoring engine logs warning + drops the score. The fix: update CRITERION_METADATA (per FR-CORE-003 + FR-GOV-003 P6 — add the new criterion); ship as a new addon version |
| Conflict with another Storybook addon (panel-id collision) | Storybook startup error | Panel disabled | Use unique ADDON_ID + PANEL_ID (`'dsaf'` + `'dsaf/panel'`); collision unlikely |

---

## §11 — Implementation notes

- **The 16h budget is realistic for software-spec'd FRs.** ~6h for src/ (types + scoring + runners + Panel.tsx + Storybook entrypoints); ~3h for tests + fixtures; ~2h for CI + documentation; ~2h for README + dsaf.dev docs; ~1h for patches + verification. Commissioned engineer at $80-150/h: ~$1,300-$2,400.
- **About the scripts-export-function refactor:** the existing scripts are top-level-executed. To enable direct module imports, each script needs a small refactor: extract the main logic into an exported `runCheck()` async function; keep top-level execution as `if (import.meta.main === true) await runCheck();` for CLI compatibility. The refactor is in scope of FR-INTEG-001 (~30m per script, ~2h total).
- **About `parameters.dsaf` per-story configuration:** Storybook's parameter system is hierarchical (story > component > global). The addon respects this. Setting `disabled: true` at the component level disables for all stories of that component; per-story override re-enables.
- **About the criterion metadata:** the `CRITERION_METADATA` const in `scoring.ts` is the source of truth for criterion ID → name + tag + deep-dive URL mapping. It needs updating per FR-CORE-003 dedup (criterion IDs may change) + per FR-GOV-003 P6 RFCs (new criteria). Future automation: generate `CRITERION_METADATA` from `docs/03-criteria-part-a.md` + `docs/04-criteria-part-b.md` at addon build time.
- **About the runner timing:** running 4 scripts in parallel typically takes ~200-500ms total (the scripts are fast). The panel updates within ~1s of `storyRendered`. Slower stories (large component trees) may take longer; the addon emits the data when ready (no timeout).
- **About the addon vs CLI (FR-CLI-001 P5):** the addon's scoring engine + runner pattern are reused for the CLI. The CLI (`npx dsaf scan`) doesn't have a panel UI; it outputs to stdout. Both share the same `aggregateRunners()` + `scoreFromAuditTargets()` functions, ensuring consistency.
- **About React in the addon despite framework-agnostic stories:** Storybook 7+ uses React for the manager UI; addons author the manager-side in React. The preview-side (the story itself) uses whatever framework the user has. This is a Storybook convention, not a limitation of the addon. Vue/Angular/Svelte users see the React-based panel; their stories render in their framework.
- **About npm publishing:** publish via `npm publish` after successful CI. The `@dsaf` org needs to be claimed on npm (~5 min one-time setup). Use `npm publish --dry-run` first to verify the package contents (only `dist/`, `README.md`, `CHANGELOG.md` should be published per `package.json#files`).
- **About future criterion additions:** when FR-CORE-003 dedup ships new criterion IDs or FR-GOV-003 P6 RFCs add criteria, update `src/scoring.ts CRITERION_METADATA` + bump addon version (minor for new criteria; patch for typo fixes; major for API-breaking changes per FR-CORE-002 no-silent-regression rule applied to addon).

---

*End of FR-INTEG-001.*
