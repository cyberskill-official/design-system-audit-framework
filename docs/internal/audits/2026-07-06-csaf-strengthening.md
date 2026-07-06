# CSAF Strengthening Review — 2026-07-06

Deep investigation of the framework (engine, contracts, loop, CI, docs) plus a full read of the CyberSkill Design System (CDS) as the primary audit target. 37 recommendations, tiered. Status column tracks what was applied in the 2026-07-06 evolution pass (branch `auto/csaf-evolution` here, `auto/audit-loop` in CDS).

Verification baseline before any change: `npm run verify` GREEN (18/18 checks) in this repo; `npm run verify:all` GREEN in CDS.

## Findings that motivated the work

1. Two scoring truths coexisted. The docs define 0-5 anchors, weighted categories, the L0-L5 ladder, and enterprise floors, but `maximal-audit.mjs` scored by naive keyword presence (0-100), ignored weights, never computed floors, and used a *different* L0-L5 mapping (>=90 L5 vs documented >=85 L5). Mature systems (IBM, Stripe fixtures) scored L0 13-18/100 while the LLM-driven SCAN of CDS reported 80.3% — the two paths could not be reconciled.
2. Goodhart loop. `self-improving-loop.mjs` fed `IMPROVED_DESIGN.md` (which embeds the criterion keywords) back into the keyword scorer, so scores rose because the text now contained the words the scorer looks for. The loop optimised the metric, not the design system. It also appended junk rows (`PEND-<timestamp> | <case> Specific Needs`) to `pending_criteria.md` and hard-coded `/Users/stephencheng/...` paths with a hard `exit(1)` when absent.
3. Blind scanning. Global `MAX_TEXT` 180k chars and the 240k per-file size filter meant CDS's 1.3 MB `DESIGN.md` was mostly (repo mode: entirely) unscanned.
4. Fake evidence. `mode=improve` synthesised mock artifacts (`design-tokens.json` with `#0055FF`, `theme.css`, `components-stub.js`) into `output-artifacts/` — fabricated files that look like evidence.
5. CI never fired. `conformance-agent.yml` watches `framework/**` and `internal/**`, but the repo paths are `docs/framework/**` and `docs/internal/**`, so the verify workflow effectively never ran on PRs; no push or scheduled trigger existed.
6. No machine-readable output, no history. The engine emitted only Markdown/HTML; nothing downstream could diff two runs, so the no-silent-regression policy (FR-CORE-002) had no enforcement path at engine level.
7. Doc drift. `self-improving-loop-guidelines.md` claims "371+ criteria" (engine loads 125); root `CLAUDE.md`/`AGENTS.md` carry only the CyberOS memory protocol, with zero project onboarding for agents; category headings `B.4`-`B.8` appear twice with different names (canonical UX categories vs absorbed ENT overlay sections).

## Recommendations

Legend: [DONE] applied this pass · [PART] partially applied · [OPEN] recommended, human-gated or future.

### A. Engine truth and calibration

| # | Recommendation | Status |
|---|---|---|
| R1 | Three-band evidence model per criterion: prose mentions cap at 40, structural artifact probes add up to 40, verification signals (CI, tests, check outputs) add up to 20. Aligns the deterministic score with the 0-5 anchors (prose-only can never claim "Built") and makes keyword-stuffing pointless. | DONE |
| R2 | Scan the full corpus: remove the 180k global truncation for scoring; raise the per-file size gate so large doctrine files (CDS `DESIGN.md`) are included; raise the file-walk cap (400 -> 1200) with config override. | DONE |
| R3 | Align `level()` with the documented ladder (L0 <40, L1 40-55, L2 55-65, L3 65-75, L4 75-85, L5 >=85). | DONE |
| R4 | Compute per-category roll-ups and a weighted combined score using the documented category weights. | DONE |
| R5 | Compute the enterprise-grade floor verdict programmatically (combined >=65, A.8 >=75, B.5 >=75, A.1 >=70, A.4 >=60, A.3 >=65, every category >=40). | DONE |
| R6 | Synonym expansion for keyword matching plus per-target `dsaf.config.json` (`extraKeywords`, `excludePaths`, `maxFiles`, `profile`). | DONE |
| R7 | Remove mock-artifact synthesis; emit a real `evidence-index.json` (which files satisfied which probes). | DONE |
| R8 | Emit machine-readable `scores.json` (engine version, rubric version, input hash, per-criterion bands, categories, tier, floors) beside every report. | DONE |
| R9 | `--profile dsaf-25` fast path scoring only the 25 core rows (parsed from `dsaf-25.md`). | DONE |
| R10 | Keep the wide criterion table contract-stable; enrich evidence cells with band detail instead of changing columns. | DONE |

### B. Auto-evolution machinery

| # | Recommendation | Status |
|---|---|---|
| R11 | `audit-diff.mjs`: compare two `scores.json` files, print the regression table in the FR-CORE-002 shape, exit non-zero on unapproved per-criterion drops. This is the enforcement half of the no-silent-regression policy. | DONE |
| R12 | Make the self-improving loop honest: bands break the keyword-echo feedback (embedding words caps at 40); loop logs band breakdowns per iteration. | DONE |
| R13 | Replace junk `pending_criteria.md` appends with evidence-driven gap mining: `evolution-mine.mjs` scans verification-case `scores.json` files and writes `gap-report.json` + human-gated proposals (never mutates the rubric). | DONE |
| R14 | Dead-criterion mining: flag criteria that score 0 across the whole calibration corpus for human rubric review. | DONE (part of R13 output) |
| R15 | Loop portability: local cases move to `scripts/test/fixtures/local-cases.json` (optional, skip-with-warning), no hard-coded home paths, no hard exit on missing optional cases. | DONE |
| R16 | Calibration invariants: `check-maximal-cases` now also asserts `scores.json` exists, parses, carries 125 criteria, and unified stays in [0,100]; `check-engine-robustness` asserts the tier mapping and the prose-only cap. | DONE |
| R17 | Scheduled CI: weekly cron runs `npm run verify` + `evolve:mine` and uploads evolution artifacts for human review. | DONE |
| R18 | Stamp engine + rubric versions in every output; bump `ENGINE_VERSION` on scoring-behaviour changes. | DONE |

### C. Repo hygiene and CI

| # | Recommendation | Status |
|---|---|---|
| R19 | Fix `conformance-agent.yml` path filters (`docs/framework/**`, `docs/internal/**`, `scripts/**`, `packages/**`), add `push` on main and `workflow_dispatch`. | DONE |
| R20 | Add `PROJECT-GUIDE.md` (agent onboarding: commands, layout, contracts, evolution loop) imported from `CLAUDE.md` alongside the memory protocol. | DONE |
| R21 | Fix `self-improving-loop-guidelines.md` drift (371+ -> 125; document bands, mining, config). | DONE |
| R22 | Clean stale local `docs/outputs/generated/maximal-cases` (0-criteria runs from an older engine; gitignored, local-only). | DONE (best-effort local clean) |
| R23 | Rename the duplicated category headings (`B.4`-`B.8` appear twice: canonical UX categories and absorbed ENT overlay). ENT rows are doc-only (engine ignores them), but the numbering is confusing. Rubric edit -> human-gated. | OPEN |
| R24 | Extend engine tests beyond robustness: bands, tier mapping, floors, profile filtering. | DONE (in check-engine-robustness) |

### D. CDS-side wiring (applied in the design-system repo)

| # | Recommendation | Status |
|---|---|---|
| R25 | `npm run audit` + `npm run audit:diff` in CDS, resolving the framework via `DSAF_HOME` (default: sibling checkout). | DONE |
| R26 | Committed audit baseline `docs/audit-baseline.json`; diff against it is the regression gate; updating the baseline is the explicit human sign-off act. | DONE |
| R27 | CI `audit` job: weekly cron + manual dispatch; clones CSAF, runs audit + diff, uploads the report, fails on unapproved regression. | DONE |
| R28 | `dsaf.config.json` in CDS (exclude generated dirs, raise file cap so all packages are scanned). | DONE |
| R29 | Close real governance/AI-readiness gaps with real artifacts: `CONTRIBUTING.md`, `.github/CODEOWNERS`, `SECURITY.md`, `llms.txt`. | DONE |
| R30 | Document the loop in CDS `README.md` §Auditing + `CHANGELOG.md` [Unreleased]; refresh `HANDOFF.md`. | DONE |

### E. Human-gated / future

| # | Recommendation | Status |
|---|---|---|
| R31 | Hybrid scoring mode: engine emits a per-criterion evidence bundle; an LLM assigns the 0-5 anchor with citations; deterministic bands remain the floor. Closes the engine-vs-SCAN gap without giving up determinism. | OPEN |
| R32 | Publish `@cyberskill/dsaf` CLI to npm with the rubric versioned as a package, so targets can `npx` the audit instead of cloning. | OPEN |
| R33 | Calibrate band weights against 2+ external systems with human-reviewed full SCANs; adjust 40/40/20 splits with evidence. | OPEN |
| R34 | Wire the Storybook addon and Figma plugin to consume `scores.json` (per-criterion panels). | OPEN |
| R35 | Hosted benchmark at audit.cyberskill.world ingests `scores.json` uploads (schema is now stable). | OPEN |
| R36 | RFC: category heading dedup + weight rebalance (weights currently sum >100% per part once absorbed sections are counted). | OPEN |
| R37 | Rubric changelog discipline: bump `dsaf_125_version` on any criteria edit; add a contract that fails when criteria rows change without a version bump. | OPEN |

## The auto-evolution loop (as now wired)

```
CDS (target)                              CSAF (framework)
────────────                              ────────────────
npm run audit ──────────────────────────▶ engine scores repo (bands, floors)
  meta/audits/<date>/scores.json          scores.json schema vX + rubric vY
npm run audit:diff ◀───────────────────── audit-diff.mjs (FR-CORE-002 gate)
  fails on unapproved regression
  baseline update = human sign-off
CI weekly cron re-audits                  CI weekly cron: verify + evolve:mine
                                            gap-report.json (missed vocab,
                                            dead criteria, probe gaps)
                                            → human reviews → rubric/probe PR
```

Each side feeds the other: CDS audit runs generate the evidence the miner learns from; the miner's proposals (human-approved) tighten the rubric and probes; the tighter engine re-audits CDS on schedule; regressions cannot land silently on either side because both `verify` suites pin behaviour with fixtures.

*Owner: Stephen (sign-off) · Author: agent session 2026-07-06.*
