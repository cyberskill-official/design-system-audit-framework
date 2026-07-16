# E1 — Rubric & engine integrity

Goal: the rubric discriminates, the keywords match real vocabulary, and no criteria change can land unversioned. Sources: first `evolve:mine` run (2026-07-06), review items R23, R36, R37.

---

## IMP-101 · Disposition the 8 dead criteria

- Priority P1 · Owner @Agent analysis → @Human[decide] · Effort M · Depends on IMP-001
- Status: todo

**Why.** `evolve:mine` found 8 criteria scoring 0 across all 10 calibration cases: `A1.6, A4.2, A5.3, A5.5, A5.6, B10.2, B10.5, B10.6`. A criterion that never scores is either mis-worded (vocabulary miss), unprobed (artifact gap), or genuinely absent from every fixture — each cause has a different fix, and until dispositioned these rows add noise to every audit.

**Scope (agent).**
1. For each of the 8 ids: quote the criterion row from `docs/framework/03-full-criteria.md`, list its extracted keywords (`keywordsForCriterion`), and grep the calibration fixtures (`scripts/test/fixtures/design-md/*/DESIGN.md`) for near-miss vocabulary (synonyms, morphological variants).
2. Classify each as `vocabulary-miss` (fixture text exists, words differ), `probe-gap` (only provable from a repo tree — needs an ARTIFACT_RULES/VERIFY_RULES entry), or `corpus-gap` (fixtures genuinely lack the practice; expected 0).
3. Write the classification table + one proposed fix per row into this section, then hand to human.

**Scope (human).** Approve/amend each disposition. Approved `vocabulary-miss` rows feed IMP-105; approved `probe-gap` rows become engine-probe edits (agent, follow-up commit); `corpus-gap` rows get a note in the criterion's 0-anchor so future miners skip them.

**Out of scope.** Deleting or rewording criteria rows (that is IMP-104/IMP-108 territory).

**Acceptance criteria.**
- [ ] Classification table for all 8 ids with fixture-grep evidence per row.
- [ ] Human disposition recorded per row (approve/amend, initials, date).
- [ ] Follow-up items filed (IMP-105 rows and/or probe edits) for every non-`corpus-gap` id.

**Verification.** `npm run verify` green; re-run `npm run evolve:mine` and confirm each dispositioned id either leaves the dead list or is annotated `corpus-gap`.

**Evidence.** _(agent fills at execution)_

**Review.** _(human sign-off: date, initials, verdict)_

---

## IMP-102 · Stop deriving keywords from category headings

- Priority P1 · Owner @Agent[fix] · Effort M · Depends on —
- Status: todo

**Why.** `scoreCriteria` builds keywords from `"${item.category} ${item.criterion}"`, so every criterion in `A.1 — Foundations & Design Tokens (Weight: 14%)` carries "foundations" as a keyword. The miner shows this word missing in 9/9 rows of A1 across every fixture — the heading noun punishes (or, when present, inflates) all rows of a category identically. Signal must come from the criterion text; the category is context, not evidence.

**Scope.**
1. In `scripts/bin/maximal-audit.mjs`, derive keywords from the criterion text only (`keywordsForCriterion(item.criterion)`), keeping the stopword list.
2. Where a criterion is too short to yield ≥ 3 keywords, fall back to category-augmented extraction (guard, not default).
3. Bump `ENGINE_VERSION` minor (scoring behaviour change) and note it in the engine header comment.
4. Regenerate the calibration corpus; extend `check-engine-robustness.mjs` with an assertion that a synthetic criterion under a noisy heading does not inherit heading nouns.
5. Re-run `npm run evolve:mine`; paste before/after dead-criteria and vocabulary-gap counts into Evidence.

**Acceptance criteria.**
- [ ] No keyword in any A1 row equals "foundations" (spot-check via scores.json missing_signals).
- [ ] Robustness check pins the new extraction rule.
- [ ] `ENGINE_VERSION` bumped; `npm run verify` 18/18 green.
- [ ] Miner vocabulary-gap count drops materially (expected: most "category-noun" misses disappear); numbers recorded.

**Verification.** `npm run verify && npm run evolve:mine`.

**Evidence.** _(agent fills)_

**Review.** _(human sign-off)_

---

## IMP-103 · Rubric-version contract (R37)

- Priority P1 · Owner @Agent[fix] · Effort M · Depends on —
- Status: todo

**Why.** Criteria rows can currently change without any version signal; downstream `scores.json` files stamp `rubric_version` from `dsaf-25.md` frontmatter, so an unversioned rubric edit silently invalidates cross-run comparisons.

**Scope.**
1. New check `scripts/checks/check-rubric-version-contract.mjs` + lib + node:test suite, following the existing contract pattern (payload JSON under `docs/framework/core/`, audit output under `docs/outputs/_audit/`).
2. Mechanism: the payload pins a SHA-256 over the normalised criterion rows (id + text + tag) of `03-full-criteria.md` alongside the `dsaf_125_version` string. The check fails when the hash changes while the version string does not. A helper flag (`--accept`) rewrites the payload after a human-approved bump.
3. Wire into `scripts/bin/dsaf-verify.mjs` and `package.json` (`contract:rubric-version`, `test:rubric-version-contract`).
4. Document the bump procedure in `docs/guidelines/self-improving-loop-guidelines.md` §3C (one sentence exists; link the contract).

**Acceptance criteria.**
- [ ] Editing any criterion row without bumping `dsaf_125_version` fails `npm run verify` with a message naming the changed ids.
- [ ] Bump + `--accept` path documented and demonstrated in Evidence (temp edit, fail, bump, accept, green, revert).
- [ ] Contract has its own node:test suite mirroring the other contracts.

**Verification.** `npm run verify`; deliberate-edit demo in Evidence.

**Evidence.** _(agent fills)_

**Review.** _(human sign-off)_

---

## IMP-104 · Category heading dedup RFC (R23)

- Priority P3 · Owner @Agent draft → @Human[decide] · Effort M · Depends on —
- Status: todo

**Why.** `03-full-criteria.md` reuses heading numbers: canonical `B.4 Visual Design & Hierarchy` … `B.8 Performance & CWV` collide with absorbed overlay sections (`B.4 Absorbed Proof Criteria`, `B.5 Doctrine navigation`, `B.6 Governance`, `B.7 Token architecture`, `B.8 Figma parity`). The overlay rows use `ENT-*` ids (invisible to the engine) so scoring is unaffected, but humans reading the rubric meet two different "B.5"s. Pure doc-structure fix — still human-gated because it renumbers public rubric surface.

**Scope (agent draft).** RFC in `docs/internal/rfcs/` proposing: renumber overlay sections to `ENT.1–ENT.5` (or move them to a dedicated overlay doc), zero criterion-id changes, link updates repo-wide, alias table note in `docs/framework/criteria-aliases.md`. Include a link-integrity checklist (`npm run check:links`).

**Acceptance criteria.**
- [ ] RFC drafted with before/after heading map and zero-id-change guarantee.
- [ ] Human decision recorded; if approved, implementation lands as a follow-up commit with `dsaf_125_version` bump (headings are rubric surface) and `check:links` green.

**Evidence / Review.** _(fill at execution)_

---

## IMP-105 · Synonym batch 1 from miner vocabulary gaps

- Priority P1 · Owner @Agent proposal → @Human[decide] · Effort M · Depends on IMP-102
- Status: todo

**Why.** After IMP-102 removes heading noise, the remaining universal keyword misses (miner: 118 rows pre-fix, expect far fewer post-fix) indicate genuine vocabulary mismatches — e.g. criteria say "iconography" while fixtures say "icon set". The engine's `SYNONYMS` map is the reviewed place for such equivalences.

**Scope.**
1. Re-run `evolve:mine`; rank remaining universal misses by frequency × criterion weight.
2. Propose ≤ 20 synonym entries with, for each: the keyword, proposed variants, and fixture quotes showing the variant used with the same meaning. No speculative entries.
3. Human approves per entry; agent lands approved entries + regenerates corpus + records score movement per affected criterion (movement is expected and legitimate here — record it in [overrides.md](overrides.md) as `rubric-tightened`/`D-RT`-style vocabulary recalibration for transparency even though scores rise).

**Acceptance criteria.**
- [ ] Proposal table with evidence quotes per entry; human verdict per entry.
- [ ] Approved entries in `SYNONYMS` with the map's "deliberate equivalence" comment maintained.
- [ ] `ENGINE_VERSION` patch bump; verify green; before/after unified averages per fixture recorded.

**Evidence / Review.** _(fill at execution)_

---

## IMP-108 · Weight rebalance RFC (R36)

- Priority P3 · Owner @Agent draft → @Human[decide] · Effort M · Depends on IMP-104
- Status: todo

**Why.** Documented category weights are consumed by the engine's weighted roll-up. With overlay sections carrying their own weights, per-part totals exceed 100%; today the engine normalises within observed prefixes so the math stays sound, but the *documented* contract ("weights total 100%") is false as written.

**Scope (agent draft).** RFC with three options: (a) rebalance canonical weights to absorb overlay, (b) exclude overlay weights from Part totals explicitly (document the normalisation the engine already performs), (c) move overlay out of the criteria doc entirely (pairs with IMP-104). Include the exact roll-up formula from `computeRollup` so the doc matches the code.

**Acceptance criteria.**
- [ ] RFC drafted with worked score examples per option (same fixture scored three ways).
- [ ] Human decision recorded; implementation (if any) lands with `dsaf_125_version` bump and calibration regen.

**Evidence / Review.** _(fill at execution)_
