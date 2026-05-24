---
fr_id: FR-BRAND-002
audited: 2026-05-17
verdict: PASS (after revision)
score_pre_revision: 7.5/10
score_post_expansion: 9/10
score_post_revision: 10/10
issues_resolved: 8
template: dsaf-spec@1
---

## §1 — Verdict summary

The post-revision spec runs ~640 lines covering the three-handle taxonomy (`DSAF` / long name / component handles), the `Framework`-as-noun-handle ban, find/replace patches across four doctrine files, glossary creation, CONTRIBUTING.md amendment, forward-only application, and the URL-path-vs-link-text rule. It has 13 §1 normative clauses, 12 acceptance criteria, 11 failure-mode rows, 7 open questions resolved, 8 implementation notes. Length is within the 400–700 substantive-FR target with a slight overshoot justified by the 4 separate find/replace tables in §3 (each is verbatim doctrine surface, not prose padding). All 8 findings below are mechanically resolvable inside the FR. **Score = 10/10.**

## §2 — Findings (all resolved)

### ISS-001 — §1 #11 forward-only wording was MUST NOT verbed-around-a-fuzzy-verb
Pre-revision §1 #11 read "MUST NOT silently retire alternate handles … from in-flight conversations." The verb "retire" is ambiguous (does it mean delete? rewrite? leave alone?) and the rule's intent (forward-only) was implicit. **Resolved:** §1 #11 rewritten as `MUST apply the taxonomy forward-only to new external surfaces created on or after the ratification date (2026-05-17)`. Explicit ratification date, explicit forward-only scoping ("rewriting *correct-at-the-time*" content vs "fixing fresh mistakes"), and the hyperlink-URL-vs-link-text rule (only visible text gets normalised; URL paths stay). Pattern: §8.6c (§1 MUST clarity).

### ISS-002 — Mode-handle written form inconsistent across §1 and the glossary
Pre-revision §1 #7 said `Mode SCAN` / `Mode FIX` / `Mode W`; pre-revision glossary §3 (Mode handles) said ``SCAN` mode`` / ``FIX` mode`` / ``W` mode``. Two different written conventions for the same handles. **Resolved:** both surfaces now canonically use `SCAN mode` / `FIX mode` / `W mode` (handle all-caps, "mode" lowercase, no backticks around the handle in prose); §1 #7 and glossary both state the convention and ban the alternatives (`mode SCAN`, `Mode-Scan`, `the Scan mode`). Pattern: §8.1a (single-source-of-truth violation between §1 and §3).

### ISS-003 — AC8 term count mismatch (17 claimed, 20 actually listed)
Pre-revision AC8 said "17 canonical terms" but the §3 glossary template listed 17 terms in 3 sections plus 3 Mode handles in a 4th section — 20 total. The grep-loop in §5 only iterated 17. **Resolved:** AC8 rewritten to "20 canonical terms across 4 sections" with the section-count breakdown (Brand 6, Methodology 8, Actor 3, Mode 3). §5 grep-loop extended to iterate all 20 terms including the three mode handles. Pattern: §8.1d (constant defined but not enforced across surfaces — the term-count constant was 17 in AC8 but 20 in the glossary template).

### ISS-004 — Hyperlink URLs in find/replace not explicitly scoped
Pre-revision §3 find/replace tables didn't distinguish between visible link text and URL paths. A naive `sed -i` running across markdown files would rewrite `[the framework](./framework/02-framework.md)` to `[DSAF](./docs/02-DSAF.md)` — breaking every cross-link. **Resolved:** §1 #11 explicitly states "Hyperlink URLs … MUST NOT be rewritten … only the human-visible link text gets normalised." §11 implementation note added explaining the find/replace rule and the operator-review requirement in §6 step 4. Pattern: §8.6b (data-shape fragility — Debug-format / mass-rewrite breaking semantically meaningful boundaries).

### ISS-005 — `framework/07-maturity-tiers.md` patch table was incomplete vs the file's actual content
Pre-revision §3 listed only 4 patches for `framework/07-maturity-tiers.md`, but the file has many more `tier` usages (§4 heading, §5 prose, §6 table). AC5 was passable as written only because most remaining `tier` usages are common-noun tabular references inside the L0–L5 table. **Resolved:** §3 patch table for `framework/07-maturity-tiers.md` expanded to 11 explicit before/after rows; an introductory paragraph clarifies that only proper-noun referents to "the L0–L5 scale as a named concept" get patched, common-noun tabular usages inside the L0–L5 table stay untouched. The expanded table also coordinates with FR-CORE-002 (no-silent-regression rule rename) — text-only update in this FR; rule-body rewrite in FR-CORE-002. Pattern: §8.1c (invariant declared in §1 but not enforced in §3 — the AC5 promise required more patches than the table delivered).

### ISS-006 — `DSAF spec` and other qualified phrases not explicitly addressed
Pre-revision §1 #5 banned `the DSAF tool` / `the DSAF methodology` / `the DSAF system` / `the DSAF spec`, but the underlying pattern (`DSAF [noun-qualifier]`) wasn't theorised. Reviewers would reach for `DSAF spec` reasonably (the spec at `framework/02-framework.md`) and bounce off the rule. **Resolved:** §11 implementation note added with the substitution test ("could `DSAF` alone be used here? If yes, the alternate handle is banned; if no, the qualifier is fine"). The §1 #5 ban remains; the rationale in §11 lets future reviewers make edge-case judgements without amending the rule. Pattern: §3.11 rule 32 (§2/§11 must give the rationale, not just restate §1).

### ISS-007 — Forward-only rule contradicted itself on retroactive search-engine displacement
Pre-revision §10 row "Old blog post (pre-ratification) ranks for 'the DSAF Framework' search query" had outcome "Forward-only rule: do not retroactively rewrite. The new content out-ranks the old over 6–12 months as fresh content gets indexed." The "out-ranks" promise plus "do not rewrite" rule together implied that natural displacement is the strategy — but didn't say so explicitly. A reviewer could read it as "forward-only AND we expect displacement" (correct) or as "forward-only BUT we won't see displacement" (incorrect). **Resolved:** §1 #11 amended to explicitly distinguish "rewriting correct-at-the-time content" (forbidden) from "fixing fresh mistakes" (still allowed) and to cite the displacement-by-attrition expectation in §2 (Why this design → forward-only paragraph). The §10 row is internally consistent now because the §1 #11 expansion gives the right frame.

### ISS-008 — `risk_if_skipped` focused on search-indexing rather than contributor confusion
Pre-revision `risk_if_skipped` mentioned search-indexing as the largest risk, but the higher-cost risk is *contributor confusion* — every PR that touches external-facing surfaces makes the naming choice ad-hoc without this FR. **Resolved:** `risk_if_skipped` rewritten to lead with "every downstream FR that quotes the framework's name has to make the naming choice ad-hoc; the resulting inconsistency is mechanically hard to undo once content is published and search-indexed." The search-indexing risk is downstream of the contributor-confusion risk; the new wording captures both with the right ordering.

## §3 — Resolution

All 8 mechanical concerns addressed:

- §1 grew from 13 to 13 normative clauses (no new clauses; #7 and #11 rewritten with explicit conventions and forward-only scoping).
- §3 find/replace table for `framework/07-maturity-tiers.md` expanded from 4 rows to 11 rows + scoping paragraph.
- §3 glossary Mode-handles section synced to the §1 #7 written convention (`SCAN mode` / `FIX mode` / `W mode`).
- §4 AC8 grew from "17 canonical terms" to "20 canonical terms across 4 sections" with section-count breakdown.
- §5 verification loop extended to iterate all 20 terms.
- §11 implementation notes gained: URL-path-vs-link-text rule, `DSAF spec` substitution-test rationale.
- `risk_if_skipped` reordered to lead with contributor-confusion failure mode.
- Audit-trail consistency: status set to `accepted` only after this audit-loop pass; the FR was authored with self-pressure-testing during writing, then revised in this loop.

The post-revision FR runs ~640 lines, within the 400–700 substantive-FR target. Every §1 MUST has a verifiable AC; every find/replace patch table is exhaustive for its file's proper-noun referents; every cross-FR coordination (FR-CORE-002 rule rename, FR-CORE-003 criteria-table patches) is explicit. **Score = 10/10.**

---

*End of FR-BRAND-002 audit.*
