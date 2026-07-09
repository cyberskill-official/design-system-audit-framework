# E4 — Calibration (R33)

Goal: the 40/40/20 band splits, the MANUAL cap, and the verification scaling were designed from first principles this cycle — now earn them empirically. Calibration needs two substrates that don't exist yet: repo-mode fixtures (all 10 current calibration cases are prose-only) and score history over time.

---

## IMP-106 · Repo-mode calibration fixtures + ordering invariant

- Priority P1 · Owner @Agent[fix] · Effort M · Depends on —
- Status: todo

**Why.** The hermetic corpus contains only single `DESIGN.md` files, so artifact and verification bands are structurally zero in every calibration case — the miner cannot mine probe gaps (`repo_mode_cases: 0`) and band changes are untested against repo-shaped input. The engine's richest code paths have no fixture coverage.

**Scope.**
1. Vendor two SYNTHETIC mini-repos under `scripts/test/fixtures/repo-mode/` (hand-written, ~30 files each, no external code):
   - `prototype-ds/`: DESIGN.md + tokens.json (DTCG) + 2 components + package.json with version — artifacts present, no CI, no tests, no check outputs.
   - `measured-ds/`: everything in prototype plus `.github/workflows/ci.yml`, `"test"` script, test files, a `_audit/*.json` check output, CHANGELOG, CODEOWNERS — the "measured" shape.
2. Add both to `design-md-manifest.json`; regenerate the corpus.
3. New assertions in `check-maximal-cases.mjs` (the ordering invariant that makes band semantics falsifiable):
   - `measured-ds` combined > `prototype-ds` combined > best prose-only fixture combined;
   - `prototype-ds` has ≥ 1 criterion with artifacts > 0 and all verification == 0 for AUTO rows whose category probe depends on CI;
   - `measured-ds` has ≥ 1 criterion with verification > 0.
4. Re-run `evolve:mine`: `repo_mode_cases` must now be ≥ 2 and probe-gap mining active.

**Acceptance criteria.**
- [ ] Both fixtures vendored, license-clean (authored, not copied), each ≤ 50 KB total.
- [ ] Ordering invariant enforced in verify and demonstrably falsifiable (temporarily break a probe → check fails; negative test in Evidence).
- [ ] Miner reports probe gaps against a real repo-mode corpus.
- [ ] `npm run verify` green.

**Evidence / Review.** _(fill at execution)_

---

## IMP-107 · Score-trend register + `audit-trend.mjs`

- Priority P1 · Owner @Agent[fix] · Effort M · Depends on —
- Status: todo

**Why.** L5's own definition demands "trend data across ≥ 2 audits", and the loop's health is a time series: today each run overwrites yesterday's knowledge. A tiny append-only register turns scores.json runs into trends without a database.

**Scope.**
1. `scripts/bin/audit-trend.mjs`: `append <scores.json>` adds a compact row (date, input_hash, engine/rubric versions, unified, weighted, tier, floors pass/fail, per-category averages) to a register file; `report` renders a Markdown trend table + per-category sparkline-style deltas; `--register <path>` overrides the default.
2. Default register locations: framework self-runs → `docs/outputs/generated/evolution/trend.jsonl` (regenerable); targets commit their own (CDS: `docs/audit-trend.jsonl`, wired in the CDS follow-up PR referenced from IMP-601).
3. Guard rails: refuses appends whose engine major differs from the register's last row unless `--rebase` is passed (mirrors audit-diff semantics); duplicate input_hash+engine rows are skipped idempotently.
4. Wire `audit-trend append` into the CDS `scripts/audit.mjs` wrapper behind `--trend` (opt-in until IMP-601 formalises cadence).

**Acceptance criteria.**
- [ ] Append + report round-trip demonstrated on ≥ 3 synthetic runs (Evidence shows the rendered table).
- [ ] Engine-major guard + idempotency negative-tested.
- [ ] Framework verify green; CDS wrapper flag documented in its README §9.3 (follow-up PR reference).

**Evidence / Review.** _(fill at execution)_

---

## IMP-401 · External calibration study (2+ public systems)

- Priority P2 · Owner hybrid (@Agent runs + drafts, @Human[manual] reviews scores) · Effort L · Depends on IMP-106
- Status: todo

**Why.** Band weights are only defensible against ground truth: systems whose maturity is publicly legible (e.g. IBM Carbon, GOV.UK — mature; a mid-size OSS system — middling). The study measures where the engine's placement diverges from a human-reviewed rubric pass.

**Scope.**
1. Select 2–3 public repos (license-respecting, shallow clones at pinned SHAs; never vendored). Record selection rationale.
2. For each: engine run (repo mode) + a human-reviewed DSAF-25 pass (25 rows is deliberately the review-affordable subset) using the hybrid bundles if E2 has landed, plain evidence reading otherwise.
3. Deliverable: divergence table per system per category (engine level vs human anchor), a written diagnosis per divergence ≥ 2 levels, and raw materials under `docs/internal/audits/calibration-study-<date>/`.
4. No engine changes in this task — measurement only (changes are IMP-402).

**Acceptance criteria.**
- [ ] ≥ 2 systems studied end-to-end with pinned SHAs recorded.
- [ ] Divergence table complete; every ≥ 2-level divergence diagnosed (probe gap / vocabulary / anchor judgement / genuine engine error).
- [ ] Human reviewer initials on the anchor column.

**Evidence / Review.** _(fill at execution)_

---

## IMP-402 · Band-weight tuning proposal

- Priority P2 · Owner @Agent analysis → @Human[decide] · Effort M · Depends on IMP-401
- Status: todo

**Why.** If the study shows systematic bias (e.g. verification band over-credits categories with generic `auditOutputs`), the splits should move — by decision, not drift.

**Scope.**
1. From IMP-401 data: fit/argue concrete adjustments (split ratios, per-category verify probes replacing generic fallbacks, MANUAL cap level) with predicted effect on every calibration fixture and on the CDS baseline.
2. Present ≤ 3 options with a recommendation; human picks; agent implements the pick with `ENGINE_VERSION` **major** bump (cross-major comparisons are already refused by audit-diff, so targets re-baseline explicitly — that is the designed migration path).
3. Regenerate corpus; CDS re-baseline PR prepared in the sibling repo (human merges).

**Acceptance criteria.**
- [ ] Options memo with per-fixture predicted deltas; decision recorded.
- [ ] Implementation behind an engine major bump; verify green; ordering invariant (IMP-106) still holds.
- [ ] CDS re-baseline PR prepared and linked.

**Evidence / Review.** _(fill at execution)_
