# E2 — Hybrid scoring (R31)

Goal: close the gap between the deterministic engine (evidence radar, bands) and the LLM SCAN (judgement, 0–5 anchors) without giving up determinism. The engine's score remains the floor; an LLM assigns rubric anchors from engine-collected evidence with citations; disagreements become mining input. Design principle: the LLM never sees less than the engine saw, and the human never sees an anchor without its citation.

---

## IMP-201 · Evidence-bundle emitter (`--emit-bundles`)

- Priority P2 · Owner @Agent[fix] · Effort M · Depends on —
- Status: todo

**Why.** An LLM can only score honestly from evidence it can cite. The engine already knows, per criterion: keyword hits with locations, artifact probes satisfied (with file lists), and verification signals. Packaging that per criterion turns "paste the whole repo at the model" into a bounded, auditable input.

**Scope.**
1. New flag `--emit-bundles` on `scripts/bin/maximal-audit.mjs`: writes `output-bundles/<criterion-id>.json` per criterion — `{ id, criterion, tag, type, anchors: {0,3,5 text}, bands, keyword_hits: [{keyword, file, line_or_excerpt}], probes_satisfied: [{probe, files}], verification: [...], excerpts: [≤10 snippets ≤500 chars each, deduped] }`.
2. Excerpt extraction: for each hit keyword, capture the surrounding line(s) from the owning file (engine already holds `contents`); cap total bundle size (~8 KB) with a `truncated: true` marker.
3. A `bundles-index.json` with per-criterion byte sizes and the run's `input_hash` so a bundle set is verifiably tied to one scores.json.
4. Contract addition: robustness check asserts bundle count == criteria count and every bundle parses.

**Acceptance criteria.**
- [ ] `npm run audit:maximal -- --input <fixture> --out /tmp/x --emit-bundles` produces 125 parseable bundles + index tied to `input_hash`.
- [ ] Bundles carry the criterion's 0/3/5 anchor text (parsed from `03-full-criteria.md`) so the scoring model reads the rubric verbatim.
- [ ] Size caps enforced; verify 18/18 green; `ENGINE_VERSION` minor bump.

**Verification.** Robustness check + manual bundle inspection pasted into Evidence.

**Evidence / Review.** _(fill at execution)_

---

## IMP-202 · LLM anchor-assignment protocol + hybrid merge tool

- Priority P2 · Owner @Agent[fix] → @Human[decide] on protocol text · Effort L · Depends on IMP-201
- Status: todo

**Why.** The anchors (0 Absent … 5 Industry-leading) need judgement the bands cannot encode ("industry-leading", "externally validated"). The protocol makes that judgement reproducible: fixed prompt, fixed evidence input, mandatory citations, and a merge rule that keeps the deterministic floor.

**Scope.**
1. Prompt file `docs/guidelines/prompts/hybrid-score-mode.md`: given one bundle, output `{ id, anchor_0_5, confidence, citations: [bundle excerpt refs], rationale ≤ 80 words, manual_evidence_required: bool }`. Hard rules in the prompt: cite or abstain; MANUAL-type criteria may never exceed anchor 3 without dated human evidence; unknown ≠ 0 (abstain flag instead).
2. Merge tool `scripts/bin/hybrid-merge.mjs`: consumes engine `scores.json` + a directory of LLM verdict JSONs → emits `scores.hybrid.json` (schema `dsaf-scores/1-hybrid`) where `final_0_5 = max(floor_from_bands, llm_anchor_capped)`; floor mapping documented in-file (0–20→0/1, 21–40→2, 41–60→3, 61–80→4, 81–100→5 candidate, with MANUAL cap intact). Engine floor can raise, never lower, an LLM verdict; LLM can raise above floor only with ≥ 2 citations.
3. Validation: merge tool rejects verdicts whose citations do not resolve to bundle excerpts (anti-hallucination gate).
4. Docs: extend `01-framework-overview.md` §1 with a short "hybrid mode" paragraph (SCAN prompt remains the deep path; hybrid is the repeatable middle path).

**Acceptance criteria.**
- [ ] End-to-end demo on one calibration fixture: bundles → 10 sample verdicts (agent-generated in-session is acceptable for the demo) → `scores.hybrid.json` validates.
- [ ] Citation-resolution gate demonstrably rejects a fabricated citation (negative test in Evidence).
- [ ] Floor rule property-tested: for all rows, `final ≥ floor` and MANUAL rows ≤ 3 without human evidence.
- [ ] Human approves the protocol text before the prompt file is marked stable.

**Evidence / Review.** _(fill at execution)_

---

## IMP-203 · Engine-vs-LLM disagreement report

- Priority P2 · Owner @Agent[fix] · Effort M · Depends on IMP-202
- Status: todo

**Why.** Systematic disagreement between bands and anchors is the highest-value mining signal there is: it points at probes that under-collect, keywords that over-claim, or anchors that need rewording. This closes the hybrid loop back into `evolve:mine`.

**Scope.**
1. Extend `evolution-mine.mjs` to ingest `scores.hybrid.json` when present: report criteria where `|floor_level − llm_anchor| ≥ 2`, grouped by direction (engine-under vs engine-over), with citations.
2. Add a `disagreements` section to `gap-report.json` and a human-readable block in `proposals.md`.
3. Keep the human gate: disagreements produce proposals, never automatic band changes.

**Acceptance criteria.**
- [ ] Mining a corpus containing hybrid files yields a disagreement section with per-criterion direction + citation refs.
- [ ] Corpora without hybrid files behave exactly as today (backward compatible; verify green).

**Evidence / Review.** _(fill at execution)_
