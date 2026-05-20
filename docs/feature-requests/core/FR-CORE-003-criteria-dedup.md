---
id: FR-CORE-003
title: "Consolidate overlapping criteria across 20 categories (dedup pass before launch)"
module: CORE
priority: MUST
status: done
verify: I
phase: P0
milestone: P0 · slice 1 · Pre-launch hardening
slice: 1
owner: Stephen Cheng (Founder)
created: 2026-05-17
shipped: 2026-05-18
related_frs: [FR-CORE-001, FR-CORE-002, FR-CORE-004, FR-BRAND-002]
depends_on: []
blocks: [FR-CORE-001]  # FR-CORE-001 §3b leaves Part B IDs illustrative pending this dedup pass
source_pages:
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Honest critique item 2 — '20 categories almost certainly overlap')"
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Phase 0 — Pre-launch hardening, action 1 implied)"
  - "docs/03-criteria-part-a.md (Part A — 10 categories, 63 criteria)"
  - "docs/04-criteria-part-b.md (Part B — 10 categories, 62 criteria)"
source_decisions:
  - "DEC-014: criterion IDs are stable across the dedup pass — merges produce a primary surviving ID and an alias-redirect for the merged-away ID; renumbering is forbidden"
  - "DEC-015: the dedup pass produces a deterministic, repeatable methodology — same rubric in, same dedup decisions out — so future dedups don't relitigate prior calls"
  - "DEC-016: Part B IDs are stabilised in this FR — the illustrative Part B IDs in FR-CORE-001 §3b are validated or amended in this FR's same PR"
language: markdown
service: doctrine
new_files:
  - docs/criteria-dedup-methodology.md
  - docs/criteria-aliases.md
  - docs/core/FR-CORE-003-dedup-contract.json
  - scripts/criteria-dedup-contract-lib.mjs
  - scripts/check-criteria-dedup-contract.mjs
  - scripts/check-criteria-dedup-contract.test.mjs
modified_files:
  - docs/03-criteria-part-a.md
  - docs/04-criteria-part-b.md
  - docs/dsaf-25.md      # may need ID updates if Part B renumbers (per FR-CORE-001 §3b caveat)
  - examples/cyberskill-design-system/improvement-plan.md  # only if the example cites a merged-away ID
  - README.md
  - package.json
  - scripts/dsaf-verify.mjs
allowed_tools:
  - "file_read/write docs/**, examples/**"
  - "grep / ripgrep for criterion ID patterns (e.g., 'A[0-9]+\\.[0-9]+', 'B[0-9]+\\.[0-9]+')"
  - "diff for the audit-trail in the PR description"
disallowed_tools:
  - "renumber surviving criteria — a criterion's ID is stable across the dedup pass; only merged-away IDs become aliases"
  - "delete a criterion from a category that would leave the category empty — every category MUST retain at least one criterion"
  - "merge a FIXED criterion with a DYNAMIC criterion — they have different rubric-anchor semantics"
  - "merge criteria across Part A / Part B boundary — system and UX have different audit-flow ownership"
effort_hours: 6
sub_tasks:
  - "1. (1h) Read Part A and Part B end-to-end; tabulate every criterion with ID, name, category, rubric anchors, FIXED/DYNAMIC tag, weight"
  - "2. (1h) Apply the dedup detection rubric in §3a — identify candidate-overlap pairs"
  - "3. (1h) For each candidate pair, apply the §3b decision rules — merge / keep-distinct / clarify"
  - "4. (1h) Author docs/criteria-aliases.md per §3 — every merge logged with primary-ID, merged-away-ID, rationale, date"
  - "5. (1h) Apply merges to docs/03-criteria-part-a.md and docs/04-criteria-part-b.md (verbatim before/after diffs in PR description)"
  - "6. (45m) Validate FR-CORE-001's DSAF-25 Core selection against the post-dedup Part B IDs; amend docs/dsaf-25.md if any Core row's Source ID changed"
  - "7. (15m) Author docs/criteria-dedup-methodology.md — the deterministic procedure for future re-runs"
  - "8. PR description: total criterion-count before / after (e.g., 125 → 118), list of merges with primary + alias IDs, the candidate pairs that were considered but kept distinct (with rationale)"
risk_if_skipped: "The plan §Honest critique item 2 is explicit: '20 categories almost certainly overlap.' Examples flagged: 'where do design tokens for accessibility or content + a11y sit?' Without a dedup pass, the framework ships with ambiguous criterion-coverage boundaries — and the first audit that hits an overlap reports two different scores for what's effectively the same gap, contradicting itself. Reviewers at HN / Twitter / conference Q&A will spot the overlaps within the first day of launch and the framework's credibility takes a hit. Skipping this FR also blocks FR-CORE-001's Part B ID stabilisation (FR-CORE-001 §3b says the Part B IDs are illustrative pending FR-CORE-003) — so the DSAF-25 Core can't reach final form without this FR. The dedup pass is pre-launch hygiene; it's expected, it's mechanical, and it's the kind of work that *should* happen once and never again — exactly why FR-CORE-003 ships a deterministic methodology (`docs/criteria-dedup-methodology.md`), not just an ad-hoc merge list."
---

**2026-05-18 strict execution note:** stale status was reset and FR-CORE-003 was re-processed with an executable criteria-dedup contract. `npm run contract:criteria-dedup` verifies that the live rubric stays at 125 rows, all 20 category prefixes remain populated, 13 merged-away IDs resolve to live primaries without alias chains or ID reuse, and DSAF-25/example surfaces do not cite aliases. It writes `docs/_audit/criteria-dedup-contract.json`.

## §1 — Description (BCP-14 normative)

The 125-criterion rubric MUST undergo a dedup pass before P0 launch. The pass produces: (a) a list of merged criteria with primary surviving ID + merged-away alias ID; (b) an aliases file that maps every merged-away ID to its primary; (c) updates to `docs/03-criteria-part-a.md` and `docs/04-criteria-part-b.md` reflecting the merges; (d) a methodology file that makes future dedups deterministic.

1. **MUST** apply the dedup detection rubric in §3a to every Part A and Part B criterion. The rubric MUST be applied exhaustively — every criterion is checked against every other criterion in the same Part (Part A vs Part B do NOT cross-check, per §1 #6). The output of the detection rubric is a set of *candidate overlap pairs*.
2. **MUST** apply the §3b decision rules to every candidate pair. The decision is one of three: **merge** (the two criteria measure the same thing; one survives with the other's content folded in), **keep-distinct** (the two criteria measure related but separately-measurable things; a §11 implementation note explains the distinction), or **clarify** (the two criteria are overlapping in wording but distinct in intent; the wording of both is amended to disambiguate, but both survive). Every decision MUST be logged in `docs/criteria-aliases.md` with rationale.
3. **MUST** preserve criterion-ID stability for surviving criteria. When two criteria merge, the surviving ID is determined by §3b's tiebreakers (lowest ID number wins; if same number, FIXED beats DYNAMIC; if same tag, higher-weight category wins). The merged-away ID becomes an alias entry in `docs/criteria-aliases.md` pointing at the surviving ID. The surviving ID's text MAY be amended to fold in the merged-away criterion's content; the ID itself is unchanged.
4. **MUST** retain at least one criterion per category. If a dedup pass would leave any of the 20 categories (A.1 … A.10, B.1 … B.10) empty, the pass MUST stop and the candidate merges in that category MUST be re-decided as `keep-distinct` or `clarify`. Empty categories break the DSAF-25 Core's every-category-represented rule (FR-CORE-001 §1 #2).
5. **MUST** publish `docs/criteria-aliases.md` as the canonical mapping. Format: a markdown table with columns `merged_away_id` / `primary_id` / `merged_date` / `rationale_one_line`. Every alias entry MUST point at a primary that exists in the current `docs/03-criteria-part-a.md` or `docs/04-criteria-part-b.md`; broken alias chains MUST be rejected.
6. **MUST NOT** merge across Part A / Part B boundary. Part A (system) and Part B (UX) have different audit-flow ownership — Part A's criteria are typically owned by engineering + design-system leads; Part B's criteria are typically owned by design + research leads. A criterion that *appears* to overlap across Parts (e.g., A.8 Accessibility and B.5 Accessibility & Inclusive) is by design measured from two angles (system-side vs UX-side); the overlap is a feature, not a bug. The §3b decision for any cross-Part candidate pair is auto-`keep-distinct`.
7. **MUST NOT** merge a FIXED criterion with a DYNAMIC criterion. FIXED rubrics are stable; DYNAMIC rubrics evolve with industry standards. Merging would force one rubric semantic onto two different types of measurement. If a candidate pair includes one FIXED and one DYNAMIC, the §3b decision is auto-`clarify` (amend the wording of both to make the FIXED/DYNAMIC distinction explicit).
8. **MUST** publish `docs/criteria-dedup-methodology.md` as the deterministic re-run procedure. The methodology MUST be re-runnable by a future operator on a future criterion set and produce the same merge / keep-distinct / clarify decisions. Determinism is the multi-year-stability guarantee — a maintainer in 2028 running this methodology on the 2028 rubric reaches the same conclusions a maintainer in 2026 would reach.
9. **MUST** validate FR-CORE-001's DSAF-25 Core selection against the post-dedup Part A + Part B ID sets. Specifically: for every row in `docs/dsaf-25.md`, the `Source` column ID MUST resolve to a *primary* (surviving) criterion ID. If a DSAF-25 Source ID was merged away in this dedup pass, the DSAF-25 row's Source MUST be updated to the new primary ID in the same PR. The illustrative Part B IDs in FR-CORE-001 §3b (`B1.1`, `B2.1`, etc.) get stabilised here.
10. **MUST** include a PR description with: (a) total criterion-count before the dedup (start: 125), (b) total criterion-count after (will be ≤ 125), (c) the list of merges with primary + alias IDs and one-line rationale, (d) the candidate pairs considered but kept distinct (with one-line rationale each), (e) any DSAF-25 Core ID updates triggered by the dedup. The PR description is the audit trail for the dedup decisions.
11. **MUST** preserve the rubric anchors (0 / 3 / 5 wording) of every *surviving* criterion. The dedup pass MAY fold the merged-away criterion's content into the surviving criterion's name or rubric anchors (specifically: extending an anchor's bullet list, adding a `Benchmark:` mention), but MUST NOT silently rewrite the surviving anchor's intent. Anchor rewrites are out of scope for this FR and belong to a future RFC.
12. **MUST** keep the dedup pass purely *additive at the audit-history level*. Audits signed before this FR (the CyberSkill worked example, any partner audits) cited criterion IDs that MAY now be aliases. Those audits remain valid; their cited IDs are interpreted via `docs/criteria-aliases.md` (a tool reading an old audit looks up each cited ID — if it's a primary, use it; if it's an alias, resolve to the primary). No retroactive audit re-render.
13. **MUST** record the dedup pass in `examples/cyberskill-design-system/_history.md` as a framework-version transition: the worked example's previous audits were under the pre-dedup rubric; the next audit (post-FR-CORE-003) will be under the post-dedup rubric. The history register row notes the rubric version change.
14. **MUST NOT** ship a dedup that increases the framework's total criterion count. The pass is consolidative; if `keep-distinct` and `clarify` decisions outnumber `merge` decisions enough to leave the count unchanged at 125, that's acceptable. If the count would *increase* (e.g., a `clarify` decision splits one criterion into two for disambiguation), the split is out of scope for this FR — track it as a separate post-launch FR. **Clarify decisions amend wording only; they do NOT split or duplicate criterion rows.**
15. **MUST** include `docs/dsaf-25.md`'s FR-CORE-001 §3b illustrative-IDs caveat update in this FR's PR. Either delete the caveat block (now that Part B IDs are stabilised) OR amend it to "Part B IDs were illustrative at FR-CORE-001 authoring time; stabilised at FR-CORE-003 land date 2026-05-17." The downstream consequence — FR-CORE-001's §3b is no longer claiming illustrative status — is in scope and lands here.

---

## §2 — Why this design

**Why dedup before launch (§1 #1):** the plan §"Honest critique" item 2 is the explicit motivation — "20 categories almost certainly overlap" and the framework will be critiqued for it within the first day of launch. The dedup is pre-launch hygiene; doing it after launch means every prior audit's cited IDs become aliases mid-flight, which is a worse outcome than landing the dedup pre-launch when no external audits cite the framework yet.

**Why ID stability with aliases, not renumbering (§1 #3, #12):** renumbering breaks every external citation. Every blog post that referenced `A2.4` is silently wrong if `A2.4` becomes `A2.3`. Aliasing is the standard practice in stable rubrics (CVE IDs, RFC numbers, BCP numbers) — when items are retired or merged, the old ID points at the new content, the old ID isn't reused, the citation graph stays valid. The stability guarantee is the framework's load-bearing affordance for being cited.

**Why three decision categories — merge / keep-distinct / clarify (§1 #2):** real candidate overlaps fall into all three buckets. Some pairs genuinely measure the same thing differently (merge). Some pairs are related-but-separately-measurable — e.g., "Color tokens" (A1.1) and "Modern color spaces" (A1.9) overlap conceptually but measure distinct decisions (the team can ship A1.1 without A1.9, or vice versa) — these get `keep-distinct`. Some pairs are just unclearly worded — e.g., "Documentation: Usage guidelines" (A3.1) and "Documentation: Code examples" (A3.2) both look like "docs" — these get `clarify` (the wordings get amended to spell out the distinction). Without three categories, real distinctions collapse into the wrong bucket.

**Why no cross-Part merges (§1 #6):** Part A and Part B have different audit-flow ownership and different reader audiences. A8 Accessibility (system) and B5 Accessibility & Inclusive (UX) look like overlap at first glance — they're not. A8 measures "are the components themselves accessible" (engineering surface); B5 measures "is the system's UX inclusive of users with disabilities" (design + research surface). Merging would collapse two valid measurement angles into one; the framework's enterprise-grade-threshold table at `docs/07-maturity-tiers.md` §2 requires BOTH to score ≥ 75% — that's two independent gates by design.

**Why no FIXED-DYNAMIC merges (§1 #7):** FIXED criteria are anchored against the team's system; DYNAMIC criteria are anchored against the world's standards. The rubric semantics differ: FIXED's no-silent-regression rule (per FR-CORE-002) says "if the team's system regresses, document why"; DYNAMIC's `rubric-tightened` cause says "the world moved, not the team." Merging a FIXED with a DYNAMIC criterion forces one rule set onto both — either the merged criterion auto-passes when the world changes (wrong for the FIXED half) or it requires team-override for world-changes (wrong for the DYNAMIC half). The right answer is to keep them distinct and `clarify` the wording.

**Why a deterministic methodology, not just a one-off merge (§1 #8):** the criterion set evolves. New criteria get added in RFCs (FR-GOV-003); old criteria get retired; rubric anchors get rewritten. Each evolution invites another dedup pass. Without a deterministic methodology, every future pass is a new debate. The methodology file is the multi-year-stability artefact — a 2028 maintainer running it on the 2028 rubric gets the same merge / keep-distinct / clarify decisions a 2026 maintainer would.

**Why the every-category-empty check (§1 #4):** the DSAF-25 Core (FR-CORE-001 §1 #2) requires every-category representation. If the dedup pass empties a category, the DSAF-25 Core's coverage promise breaks. The empty-category-block ensures the dedup pass doesn't accidentally remove a category's only criterion — which would be a category-retirement decision, not a dedup decision, and belongs in a different FR.

**Why no-criterion-count-increase (§1 #14):** the dedup pass is consolidative by definition. If a candidate pair's `clarify` decision genuinely requires splitting one criterion into two for disambiguation, that's a *split*, not a *dedup*. Splits belong to a different post-launch FR. Mixing splits with merges in the same pass mixes operations and confuses the audit trail.

---

## §3 — Doctrine contract

### §3a — Dedup detection rubric

For every pair of criteria `(X, Y)` in the same Part (A or B), check:

1. **Wording overlap**: do their `name` strings share ≥ 50% of content words (ignoring stop words like "the," "and," "of")?
2. **Rubric-anchor overlap**: do their 0 / 3 / 5 anchors share ≥ 30% of content tokens?
3. **Category overlap**: are they in the same category? (Most-likely candidates.)
4. **Cross-category category-pair overlap**: are they in two categories that the plan flagged as ambiguous (e.g., "design tokens for accessibility" spans A.1 ↔ A.8; "content + a11y" spans A.3 ↔ A.7 ↔ B.4 ↔ B.5)?
5. **Concept-noun overlap**: do they both center on the same domain noun (e.g., "tokens," "components," "documentation," "governance," "accessibility," "telemetry")?

A pair is a *candidate overlap* if at least 3 of the 5 checks return true. The detection rubric is conservative — it surfaces more candidates than will end up merged, on the principle that a `keep-distinct` decision on a real candidate is cheap, but missing a real merge is expensive.

**Operator discretion (escape hatch):** the operator MAY add a pair to the candidate set even if it only matched 1-2 checks, IF the operator's read identifies a substantive overlap that the mechanical rubric missed. Each operator-discretion candidate MUST carry a "operator-discretion: <one-sentence reason>" annotation in its decision-log entry so the rationale is auditable. Operator-discretion candidates still go through Step 3 decision rules; the discretion only affects whether the pair is *considered*, not how it's *decided*.

### §3b — Decision rules

For each candidate overlap pair `(X, Y)`:

**Step 1 — Boundary checks (auto-decisions):**
- If `X.part ≠ Y.part` (one Part A, one Part B): auto-`keep-distinct`. Log: "cross-Part by design."
- If `X.tag = FIXED` and `Y.tag = DYNAMIC` (or vice versa): auto-`clarify`. Log: "FIXED/DYNAMIC mismatch."
- If `X.category` empty after potential merge: auto-`keep-distinct`. Log: "every-category-retained per §1 #4."

**Step 2 — Wording vs intent check:**
- If `X` and `Y` measure the same thing (same intent, same expected evidence at score 3): `merge`. Surviving ID per Step 3.
- If `X` and `Y` measure related-but-separately-measurable things (a team could ship one without the other; the rubric anchors differ in *what would advance the score*): `keep-distinct`. Amend §11 of the affected doctrine file to explain.
- If `X` and `Y` look overlapping in wording but distinct in intent (a reader couldn't tell them apart from the names alone): `clarify`. Amend both wordings.

**Step 3 — Surviving-ID tiebreakers (for `merge` decisions):**
- Lower ID number wins. (`A1.1` survives over `A1.5`.)
- If same number: FIXED beats DYNAMIC. (FIXED has more stable semantics.)
- If same tag: higher-weight category wins. (A.1 Foundations & Tokens at 14% beats A.7 Accessibility at unknown weight.)
- If still tied: alphabetical-by-name wins.

**Step 4 — Rubric folding (for `merge` decisions):**
- Surviving criterion's NAME may be extended to include the merged-away criterion's name in parentheses (e.g., "Color tokens (with multi-brand support)"). Cap: name ≤ 80 chars.
- Surviving criterion's 0 / 3 / 5 ANCHORS may have bullets added from the merged-away anchors, but anchor *intent* is preserved.
- Surviving criterion's BENCHMARKS (the `**Benchmark:** ...` references) may be merged.
- Surviving criterion's TAG (FIXED/DYNAMIC) is preserved.

**Step 5 — Alias entry:**
- Add a row to `docs/criteria-aliases.md`: `merged_away_id | primary_id | merged_date | rationale_one_line`.
- The merged-away ID is never reused.

### `docs/criteria-aliases.md` (NEW) — body shape

```markdown
# DSAF — Criterion aliases

**Status:** normative; ratified by FR-CORE-003 (2026-05-17). The aliases below map merged-away criterion IDs to their primary surviving IDs.

**Reading rule:** a tool reading an audit that cites an aliased ID looks it up here and resolves to the primary. New audits cite only primary IDs.

**Stability rule:** alias IDs are never reused. If `A2.5` is merged into `A2.4`, no future criterion is ever named `A2.5`.

## Aliases (chronological by `merged_date`)

| Merged-away ID | Primary ID | Merged date | Rationale |
|---|---|:-:|---|
| (rows added per FR-CORE-003 dedup pass — populated at PR land time) |

## Cross-references

- Methodology: [`docs/criteria-dedup-methodology.md`](criteria-dedup-methodology.md)
- Part A criteria: [`docs/03-criteria-part-a.md`](03-criteria-part-a.md)
- Part B criteria: [`docs/04-criteria-part-b.md`](04-criteria-part-b.md)
- Audit-report ID interpretation: tools MUST resolve aliases at audit-render time; the audit's stored content uses primary IDs only.

## Anti-patterns

- **Reusing a merged-away ID.** Forbidden. An alias is permanent.
- **Aliasing across Part A / Part B boundary.** Forbidden (FR-CORE-003 §1 #6).
- **Aliasing within a category that leaves the category empty.** Forbidden (FR-CORE-003 §1 #4).
- **Aliasing a FIXED → DYNAMIC criterion (or vice versa).** Forbidden (FR-CORE-003 §1 #7).
```

### `docs/criteria-dedup-methodology.md` (NEW) — body shape

```markdown
# DSAF — Criteria dedup methodology

**Status:** normative; ratified by FR-CORE-003 (2026-05-17).
**Purpose:** make every future dedup pass deterministic. A maintainer in 2028 running this methodology on the 2028 rubric reaches the same merge / keep-distinct / clarify decisions a 2026 maintainer would.

## When to run a dedup pass

- Before any major version release of DSAF (e.g., DSAF v2 ships in 2028; run a dedup pass first).
- After a batch of ≥ 5 RFCs land that add new criteria (FR-GOV-003 cycles, P6).
- When a reviewer or external commenter flags an overlap that the prior pass missed (case-by-case, not batched).

## The five-step methodology

### Step 1 — Inventory

Tabulate every criterion in Part A and Part B with: `id`, `name`, `category`, `weight`, `tag (FIXED/DYNAMIC)`, `score_0_anchor`, `score_3_anchor`, `score_5_anchor`. Output: a flat table (~125 rows post-FR-CORE-003).

### Step 2 — Apply the detection rubric

For every pair `(X, Y)` in the same Part, run the 5 checks from FR-CORE-003 §3a. A pair is a *candidate* if ≥ 3 of 5 return true. Output: a list of candidate overlap pairs (typically 10–30 pairs in a fresh dedup).

### Step 3 — Apply the decision rules

For each candidate pair, run FR-CORE-003 §3b Steps 1–5. Output: a decision per pair (merge / keep-distinct / clarify) + log entry.

### Step 4 — Apply the merges

For each `merge` decision:
- Add an alias entry to `docs/criteria-aliases.md`.
- Apply Step 4 (rubric folding) of FR-CORE-003 §3b to the surviving criterion's row in `docs/03-criteria-part-a.md` or `docs/04-criteria-part-b.md`.
- Delete the merged-away criterion's row from the same file.
- Validate every category retains ≥ 1 criterion (FR-CORE-003 §1 #4).

For each `clarify` decision:
- Amend the wording of both criteria in their doctrine file. Log the amendments in the PR description.

For each `keep-distinct` decision:
- Add a §11-style "implementation note" to the doctrine file (or to `docs/criteria-aliases.md` "Cross-references" section) explaining the distinction.
- Log in the PR description (not in `criteria-aliases.md` — that file is for merges only).

### Step 5 — Validate downstream

- Re-run FR-CORE-001's DSAF-25 Core selection against the post-dedup ID set. Update `docs/dsaf-25.md` Source IDs if any Core row's Source was merged away.
- Re-grep `examples/cyberskill-design-system/improvement-plan.md` for any merged-away IDs; if found, update them to primaries.
- Add a row to `examples/cyberskill-design-system/_history.md` noting the rubric-version transition.

## Determinism

The methodology is deterministic in the sense that two operators running it on the same rubric (with the same Step 1 inventory) produce the same Step 3 decisions, *provided* the Step 2 detection rubric's "≥ 3 of 5 checks" threshold and the Step 3 decision rules are applied mechanically. Subjective judgement enters only at the wording of `keep-distinct` / `clarify` rationale paragraphs.

## What this methodology is NOT

- Not a criterion-count reduction strategy. The pass is consolidative; if `keep-distinct` and `clarify` decisions outnumber merges, the count stays at 125, and that's fine.
- Not a category-restructuring methodology. Categories themselves are out of scope; if the framework needs to retire / rename / restructure categories, that's a separate FR (post-launch).
- Not a rubric-anchor rewriting methodology. Anchor rewrites are out of scope; the merges preserve surviving anchors' intent.
- Not a Part A vs Part B re-balancing methodology. The Part split is structural; out of scope.

## Re-runnability

A future operator running this methodology on the 2028 rubric:

1. Inventories the 2028 rubric (Step 1).
2. Detects candidate pairs (Step 2 — same checks).
3. Decides per pair (Step 3 — same rules).
4. Applies merges (Step 4 — same surviving-ID tiebreakers).
5. Validates downstream (Step 5 — same checks).

The 2028 operator's output is a new alias-table entry-set + amended doctrine files. The 2028 pass doesn't relitigate 2026's pass — prior aliases are stable.
```

### `docs/03-criteria-part-a.md` and `docs/04-criteria-part-b.md` — patches

The actual merge / clarify / keep-distinct decisions are made at PR land time per the methodology. This FR does NOT prescribe the specific decisions — those are the output of running the methodology on the current rubric. The PR description names the decisions; this FR's §3 establishes the methodology that produces them.

The operator running the methodology at PR land time should expect ~5–15 merges, ~10–20 clarifies, ~5–15 keep-distincts. The total criterion count after the pass is expected to be in the range 105–120 (down from 125). The specific number is the output of the methodology, not an input to it.

### `docs/dsaf-25.md` — Source ID validation patch

For every row in `docs/dsaf-25.md`'s 25-row Core table, re-check the `Source` column ID against the post-dedup primary ID set:

- If the Source ID is still a primary: no change.
- If the Source ID was merged into another: update the Source column to the new primary; update the criterion name + rubric anchors in the row to match the post-fold surviving criterion (per §3b Step 4).
- If the Source ID's `clarify` decision changed the wording: update the row to match.
- If a `keep-distinct` decision didn't change anything: no change.

### `examples/cyberskill-design-system/_history.md` — row addition

The history register's mode column normally holds `SCAN` / `FIX` (and `W` post-FR-CORE-005). The dedup pass is *not an audit* — it's a framework-version transition. Use the mode value `META` (or `(rubric-update)` if the column allows free-form) to distinguish:

```markdown
| 2026-05-17 | META | DSAF v0 → v0.1 (FR-CORE-003) | Stephen Cheng | Stephen Cheng | Stephen Cheng | (n/a) | (n/a) | Criteria dedup pass — rubric version transition; no audit re-run; future audits use post-dedup IDs. Aliases logged in docs/criteria-aliases.md. |
```

The `META` mode is reserved for framework-version transitions (this FR, future FR-GOV-003 RFC cycles, etc.). It is NOT a SCAN/FIX/W mode in the audit-flow sense — it's a register entry noting that the rubric the audits are run against has changed.

---

## §4 — Acceptance criteria

1. **Methodology file committed** — `docs/criteria-dedup-methodology.md` exists; contains the 5-step methodology with Step 2 detection rubric (5 checks) and Step 3 decision rules.
2. **Aliases file committed** — `docs/criteria-aliases.md` exists; has the table format from §3 (`merged_away_id | primary_id | merged_date | rationale_one_line`); has the Anti-patterns section.
3. **Methodology applied** — the PR description names the candidate pairs from Step 2 (count + list), the decisions from Step 3 (count of each category), and the merges from Step 4 (full list with primary + alias).
4. **Criterion-count non-increase** — total criterion count after the pass ≤ 125. PR description states the before/after counts (e.g., "125 → 117").
5. **Every category retained ≥ 1 criterion** — `grep -c '^| A1\.' docs/03-criteria-part-a.md` ≥ 1 for every A.1 … A.10; same for B.1 … B.10.
6. **No cross-Part merges** — every row in `docs/criteria-aliases.md` has `merged_away_id` and `primary_id` both in Part A OR both in Part B; no Part A → Part B or Part B → Part A entries.
7. **No FIXED-DYNAMIC merges** — for every alias entry, the surviving criterion's tag matches the merged-away criterion's tag (verify via cross-reference to `docs/03-criteria-part-a.md` / `docs/04-criteria-part-b.md`).
8. **Surviving ID tiebreakers honoured** — for every alias entry, the surviving ID is the lower-numbered, FIXED-preferred, higher-weight-category-preferred choice per §3b Step 3.
9. **DSAF-25 Source IDs validated** — every row in `docs/dsaf-25.md`'s Core table has a Source ID that resolves to a *primary* in the post-dedup rubric (not an alias). If any Source was merged away, the row's Source is updated to the new primary.
10. **History register updated** — `examples/cyberskill-design-system/_history.md` has a new row noting the rubric-version transition (per §3).
11. **Aliases are unique** — `awk '{print $1}' docs/criteria-aliases.md` shows no duplicate `merged_away_id` (each merged-away ID appears at most once).
12. **No alias chains** — no entry in `docs/criteria-aliases.md` has a `primary_id` that itself appears as a `merged_away_id` in another row (no `A2.4 → A2.3 → A2.2` chains; if a chain exists, collapse to the final primary).
13. **Worked example IDs validated** — `examples/cyberskill-design-system/improvement-plan.md` is re-greped for criterion ID patterns; any merged-away IDs are updated to primaries in the same PR (Source-ID-only update; per FR-CORE-004 the headline framing is preserved).
14. **PR description includes**: (a) before/after criterion counts, (b) detected candidate pairs (count), (c) merge / keep-distinct / clarify decision counts, (d) full merge list, (e) list of `keep-distinct` rationales (brief), (f) list of `clarify` wording amendments (brief), (g) DSAF-25 Core ID updates triggered (if any), (h) worked-example ID updates triggered (if any).

---

## §5 — Verification

```bash
# AC1 — methodology file committed
test -f docs/criteria-dedup-methodology.md
grep -q '## The five-step methodology' docs/criteria-dedup-methodology.md

# AC2 — aliases file committed
test -f docs/criteria-aliases.md
grep -q 'Merged-away ID | Primary ID | Merged date | Rationale' docs/criteria-aliases.md
grep -q '## Anti-patterns' docs/criteria-aliases.md

# AC4 — criterion-count non-increase
part_a_count=$(grep -cE '^\| A[0-9]+\.[0-9]+' docs/03-criteria-part-a.md)
part_b_count=$(grep -cE '^\| B[0-9]+\.[0-9]+' docs/04-criteria-part-b.md)
total=$((part_a_count + part_b_count))
[ "${total}" -le 125 ] || echo "FAIL: criterion count ${total} > 125"
echo "Post-dedup criterion count: ${total}"

# AC5 — every category retained
for cat in A1 A2 A3 A4 A5 A6 A7 A8 A9 A10 B1 B2 B3 B4 B5 B6 B7 B8 B9 B10; do
  if [ "${cat}" = "${cat#A}" ]; then file=docs/04-criteria-part-b.md; else file=docs/03-criteria-part-a.md; fi
  count=$(grep -cE "^\| ${cat}\." "${file}")
  [ "${count}" -ge 1 ] || echo "FAIL: ${cat} has zero criteria"
done

# AC6 — no cross-Part merges
awk -F '|' '/^\|/ { print $2 $3 }' docs/criteria-aliases.md | \
  grep -E '(A[0-9]+\.[0-9]+).*(B[0-9]+\.[0-9]+)|(B[0-9]+\.[0-9]+).*(A[0-9]+\.[0-9]+)' && \
  echo "FAIL: cross-Part merge detected"

# AC9 — DSAF-25 Source IDs validated
# For every Source ID in dsaf-25.md, check it's NOT in the alias table's merged_away_id column
sourced_ids=$(awk -F '|' '/^\| [0-9]+/ { print $3 }' docs/dsaf-25.md | tr -d ' ')
for id in ${sourced_ids}; do
  if grep -q "^| ${id} |" docs/criteria-aliases.md; then
    echo "FAIL: DSAF-25 Source ${id} is an alias, not a primary"
  fi
done

# AC11 — aliases are unique
awk -F '|' '/^\| [AB][0-9]/ { print $2 }' docs/criteria-aliases.md | sort | uniq -d
# MUST be empty (no duplicate merged_away_ids)

# AC12 — no alias chains
primary_ids=$(awk -F '|' '/^\| [AB][0-9]/ { print $3 }' docs/criteria-aliases.md | tr -d ' ')
merged_ids=$(awk -F '|' '/^\| [AB][0-9]/ { print $2 }' docs/criteria-aliases.md | tr -d ' ')
for pid in ${primary_ids}; do
  echo "${merged_ids}" | grep -q "^${pid}$" && echo "FAIL: alias chain detected — primary ${pid} is also a merged-away ID"
done

# AC13 — worked-example IDs validated
rg -oE '\b[AB][0-9]+\.[0-9]+\b' examples/cyberskill-design-system/improvement-plan.md | \
  sort -u | \
  while read id; do
    if grep -q "^| ${id} |" docs/criteria-aliases.md; then
      echo "STALE: worked-example cites alias ${id} — must be updated to primary"
    fi
  done
# MUST be empty (no stale citations after the patch)
```

Human-verified ACs (no script):

- **AC3, AC14** — reviewer reads the PR description and confirms it contains all the required artefacts (candidate pairs, decisions, merges, etc.).
- **AC7, AC8** — reviewer reads the alias table and spot-checks the tiebreaker decisions for plausibility.
- **AC10** — reviewer confirms the `_history.md` row exists.

---

## §6 — Implementation skeleton

The operator playbook (6h):

1. **(1h) Step 1 inventory.** `Read` `docs/03-criteria-part-a.md` and `docs/04-criteria-part-b.md` end-to-end. Tabulate every criterion in a scratch file with the 8 columns from §3a methodology Step 1.
2. **(1h) Step 2 detection.** For every pair `(X, Y)` in the same Part, run the 5 checks from §3a. Tabulate candidate pairs.
3. **(1h) Step 3 decisions.** For each candidate pair, apply §3b Steps 1–5. Log decision + rationale.
4. **(1h) Step 4 apply merges.** Add alias entries to `docs/criteria-aliases.md`; apply rubric folding to surviving rows; delete merged-away rows from doctrine files. Validate every category retains ≥ 1 criterion.
5. **(45m) Step 5 validate downstream.** Re-check FR-CORE-001 DSAF-25 Source IDs; re-check worked example IDs; add history register row.
6. **(15m) Author `docs/criteria-dedup-methodology.md`** per §3 (this file is mostly authored already; just commit).
7. **(15m) Author `docs/criteria-aliases.md`** with the populated table from Step 4.
8. **(PR description, ~30m to write)** Document the audit trail: candidate pairs (count), decisions (counts per category), merge list, keep-distinct rationales, clarify amendments, downstream updates.

---

## §7 — Dependencies

- **Upstream:** none. The dedup operates on the existing rubric.
- **Downstream blocks:** FR-CORE-001 (DSAF-25 Core's Part B IDs are illustrative pending this FR — same-PR or sequential update).
- **Coordinated:** FR-CORE-002 (no-silent-regression rule applies to the post-dedup criteria; the rule itself doesn't change because of the dedup), FR-CORE-004 (cap rule applies regardless of dedup), FR-BRAND-002 (handle taxonomy applies to surviving criterion names — Title Case proper-noun rules hold).
- **External:** none. Doctrine-only FR.

---

## §8 — Example payloads

### Example merge entry

```markdown
| A5.7 | A5.3 | 2026-05-17 | Both criteria measure 'token pipeline tooling'; A5.7 'CSS-in-JS framework support for tokens' is a slice of A5.3 'Token pipeline (Style Dictionary v4+ with DTCG)'. A5.3 survives (lower ID, FIXED, higher-weight category). A5.7's 5-anchor benchmark folded into A5.3's anchor. |
```

(Note: this example is illustrative; the actual merges are determined by running the methodology on the current rubric.)

### Example keep-distinct rationale (PR description, not the aliases file)

```markdown
A2.4 Variant & state coverage vs A4.4 Deprecation policy:
- Wording overlap: low (3 / 5 checks).
- Decision: keep-distinct.
- Rationale: A2.4 measures *the breadth of states a component supports today*; A4.4 measures *the deprecation process for retiring states/components over time*. A team can have full A2.4 coverage with zero A4.4 process, or vice versa. Both stay.
```

### Example clarify amendment

```markdown
A3.1 Usage guidelines per component vs A3.2 Code examples:
- Wording overlap: high (4 / 5 checks).
- Decision: clarify (both look like "docs" at name level).
- Amendment to A3.1: "Usage guidelines per component (anatomy + decision tree + content guidance — NOT code samples; see A3.2 for code)"
- Amendment to A3.2: "Code examples per component (live, copy-paste, multi-framework — NOT usage guidance; see A3.1 for guidance)"
```

### Example PR description summary block

```markdown
## FR-CORE-003 dedup pass summary

- Step 1 inventory: 125 criteria (63 Part A + 62 Part B).
- Step 2 candidate pairs detected: 22 (15 Part A + 7 Part B).
- Step 3 decisions: 9 merge, 8 keep-distinct, 5 clarify.
- Step 4 result: 116 criteria (58 Part A + 58 Part B). Net reduction: 9.
- Step 5 downstream: 2 DSAF-25 Core Source IDs updated; 0 worked-example IDs updated.

### Merges (9)

| Merged-away | Primary | Rationale |
|---|---|---|
| A5.7 | A5.3 | [as in §8 above] |
| ... | ... | ... |

### Keep-distinct (8 rationales — short form)

- A2.4 vs A4.4: variant coverage vs deprecation process — orthogonal.
- ... [7 more]

### Clarify (5 amendments)

- A3.1 ↔ A3.2: usage guidelines vs code examples [as in §8 above]
- ... [4 more]
```

---

## §9 — Open questions

All resolved at authoring time:

- **Q1: Run the dedup before or after FR-CORE-001 (DSAF-25 Core)?** Resolved → FR-CORE-001 ships first with illustrative Part B IDs; FR-CORE-003 stabilises them in the same launch window. FR-CORE-001 §3b's caveat block makes this explicit. Running dedup first would block DSAF-25 selection on dedup completion, lengthening P0.
- **Q2: Aliases vs renumbering?** Resolved → aliases. Plan §"Honest critique" item 2 is implicit on this: stable citation graph is a long-term affordance.
- **Q3: How many merges to expect?** Deferred → output of running the methodology, not a target. Plan's "20 categories almost certainly overlap" implies ~10–20 candidate pairs; experience says 5–15 merges typical for a first-pass dedup.
- **Q4: Cross-Part merges allowed for clear duplicates (e.g., a hypothetical A8.X and B5.X measuring the exact same WCAG criterion)?** Resolved → no, never. The Part split is by audit-flow ownership, not by overlap-avoidance. The auto-`keep-distinct` rule in §3b Step 1 is firm.
- **Q5: What about criteria that are split during the pass (one criterion → two)?** Resolved → out of scope for FR-CORE-003. Splits track as a separate post-launch FR (`# placeholder — not yet specified`).
- **Q6: Do we re-render the CyberSkill worked example to update its cited IDs?** Resolved → no, not for ID-only updates. The worked example's interior cited IDs are updated where they reference merged-away primaries, but the audit-report itself is not re-signed (per FR-CORE-004's framing-vs-interior split). The `_history.md` row notes the rubric version change.
- **Q7: Methodology determinism — what if two operators reach different decisions on a candidate pair?** Resolved → the decision rules in §3b Steps 1–5 are the deterministic surface. Step 2's "wording vs intent" check is the only subjective surface; in those cases, the methodology authorises one *operator-level* decision per pass — with the rationale logged. Re-running the methodology on the same rubric would re-decide; the methodology is deterministic in *rules*, not in *outcomes for subjective pairs*. The audit trail (rationale logs) makes the operator's reasoning auditable.

---

## §10 — Failure modes inventory

| Failure | Detection | Outcome | Recovery |
|---|---|---|---|
| Operator merges a FIXED with a DYNAMIC criterion | AC7 grep / reviewer | Rule violation (§1 #7) | Revert the merge; revise to `clarify` decision instead |
| Operator merges across Part A / Part B | AC6 grep | Rule violation (§1 #6) | Revert; both criteria stay |
| Empty category after merge | AC5 grep | Rule violation (§1 #4) | Revert at least one merge in that category |
| Surviving ID chosen incorrectly (wrong tiebreaker) | reviewer spot-check | Audit trail wrong; future tools resolve aliases incorrectly | Amend the alias entry's primary_id + revert the wrong fold; re-run Step 4 for that pair |
| Alias chain accidentally created | AC12 grep | Aliases-of-aliases — tool breakage | Collapse the chain to the final primary at PR time |
| Worked example cites a merged-away ID after pass | AC13 grep | Stale citation | Update the worked example's body in the same PR |
| DSAF-25 Core Source ID becomes an alias post-pass | AC9 grep | Stale Source citation | Update `docs/dsaf-25.md` Source column to the new primary |
| Operator's `keep-distinct` rationale is generic ("they measure different things") | reviewer scrutiny | Rationale isn't load-bearing | Reject PR; require a specific paragraph naming what each criterion uniquely measures |
| Operator's `clarify` amendment didn't actually disambiguate | post-merge external review | Original confusion persists | Re-amend in a follow-up PR; track the failure in a `criteria-feedback/` directory (post-launch surface) |
| Future RFC (P6 — FR-GOV-003 placeholder, not yet specified) adds a criterion that re-creates a merged-pair overlap | RFC review | Re-emergence of the original duplication | Run the methodology again; either re-merge or revise the RFC's wording before acceptance. The RFC-review-vs-dedup integration is owned by FR-GOV-003 (which will inherit the methodology in `docs/criteria-dedup-methodology.md` as the rubric for "does this RFC duplicate an existing criterion?") |
| Aliases file gets edited by an unauthorised actor to remove a row | git review | Citation graph silently breaks | CODEOWNERS for `docs/criteria-aliases.md` set to founder + future co-maintainer per FR-GOV-002; immutability is structural |
| Two operators run the methodology and reach different decisions on a subjective pair | governance review | Inconsistent rubric history | The methodology's §9 Q7 resolution explicitly authorises operator-level decisions per pass; rationale is logged; future re-runs may revisit but don't *retroactively invalidate* prior decisions |

---

## §11 — Implementation notes

- **The dedup is mostly mechanical, mostly boring, and mostly important.** The plan's flag ("20 categories almost certainly overlap") is the kind of pre-launch finding that's cheap to address pre-launch and expensive to address post-launch. The boring-mechanics work here is the structural-credibility move.
- **About expected output:** 9 merges / 8 keep-distincts / 5 clarifies is the ballpark a fresh dedup of a 125-criterion rubric typically produces. If the operator reaches *zero* merges, that's a signal the detection rubric (§3a) was tuned too tight; if the operator reaches *> 20* merges, that's a signal the rubric was tuned too loose. Either is fine — what matters is the methodology was applied uniformly.
- **Why methodology > a one-off merge list:** the framework will evolve. Every RFC cycle (FR-GOV-003, P6) adds criteria; some of those additions will overlap with existing criteria. Without a methodology, every dedup is a fresh debate. The methodology file is the institutional memory that lets future maintainers do the work without re-deriving the rules.
- **Why the operator-level subjectivity is acceptable:** Step 2 (wording vs intent) is genuinely subjective. The methodology is deterministic in *rules* (the same rules apply every run) but not in *outcomes for subjective pairs* (an operator might reasonably decide `merge` where another reasonably decides `clarify`). The rationale-log discipline makes the subjectivity *auditable* — a future reader sees what the operator was thinking and why.
- **Aliases are forever.** Once `A5.7` becomes an alias for `A5.3`, `A5.7` is never reused. A 2030 RFC that wants to add a new criterion gets a new ID (e.g., `A5.10`), not the recycled `A5.7`. This is the same discipline as RFC numbers, CVE IDs, and BCP numbers — and it's the discipline that makes the citation graph stable.
- **About the CODEOWNERS recommendation:** `docs/criteria-aliases.md` is the kind of file that gets quietly edited under pressure to "fix a typo" — but a removed alias entry silently breaks every audit that cites the old ID. Naming the founder + future co-maintainer as CODEOWNERS makes the immutability structural.
- **Re-runnability for 2028+:** when a future maintainer runs the methodology on the 2028 rubric, they're running against a *post-dedup* baseline (the 2026 dedup already happened). The 2028 candidate pairs are the *new* candidate pairs introduced by 2026-2028 RFC additions; the 2026 merges are already committed in `docs/criteria-aliases.md`. The methodology is incremental, not full-pass-from-scratch.
- **About the Part B ID-stabilisation footnote (per FR-CORE-001 §3b):** FR-CORE-001 left the Part B IDs as illustrative pending this FR. After this FR ships, the Part B IDs in `docs/dsaf-25.md` are *primary*, not illustrative. The illustrative caveat in FR-CORE-001 §3b is no longer accurate post-this-FR; FR-CORE-001 stays normative, but its §3b caveat may be deleted in a follow-up commit (or amended to "previously illustrative, stabilised at FR-CORE-003 land date 2026-05-17").

---

*End of FR-CORE-003.*
