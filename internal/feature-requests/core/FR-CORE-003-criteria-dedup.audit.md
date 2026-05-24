---
fr_id: FR-CORE-003
audited: 2026-05-17
verdict: PASS (after revision)
score_pre_revision: 7/10
score_post_expansion: 8.5/10
score_post_revision: 10/10
issues_resolved: 6
template: dsaf-spec@1
---

## §1 — Verdict summary

The post-revision spec runs ~860 lines covering the dedup detection rubric (5 checks), the decision rules (merge / keep-distinct / clarify with surviving-ID tiebreakers and rubric-folding), the alias-table contract (`docs/criteria-aliases.md`), the deterministic methodology (`docs/criteria-dedup-methodology.md`), the every-category-retained guard, the no-cross-Part-merge boundary, the no-FIXED-DYNAMIC-merge boundary, the operator-discretion escape hatch, the downstream-validation steps (DSAF-25 Source IDs + worked example IDs), and the FR-CORE-001 §3b caveat update in-scope. It has 15 §1 normative clauses (added 2 in revision: clarify decisions amend wording only; FR-CORE-001 caveat update is in-scope), 14 acceptance criteria, 12 failure-mode rows, 7 open questions resolved, 8 implementation notes. Length is above the 700-line target — justified by the methodology body being verbatim ship-ready content + the alias file format being a long-term-stable artefact. All 6 findings are resolved. **Score = 10/10.**

## §2 — Findings (all resolved)

### ISS-001 — `clarify` decision ambiguity (could be read as authorising splits)
Pre-revision §1 #14 said "MUST NOT ship a dedup that increases the framework's total criterion count" and "the split is out of scope for this FR." But §3b Step 3 `clarify` decisions could be misread as authorising splits (one criterion → two clarifying wordings). **Resolved:** §1 #14 amended with explicit "Clarify decisions amend wording only; they do NOT split or duplicate criterion rows." The amendment makes the rule unambiguous; a split is a different operation requiring a separate FR. Pattern: §8.1c (invariant in §1 #14 not enforced against §3b Step 3 ambiguity).

### ISS-002 — Operator-discretion escape hatch was missing for sub-threshold pairs
Pre-revision §3a said "≥ 3 of 5 checks → candidate" with no provision for operator-noticed overlaps that the mechanical rubric missed. A real-world dedup typically catches 80% of overlaps mechanically and 20% by operator reading; the FR didn't authorise the 20%. **Resolved:** §3a amended with "Operator discretion (escape hatch)" — operator MAY add a pair to candidates if mechanical checks return 1-2 of 5, with an "operator-discretion" annotation in the decision log. The discretion only affects *consideration*, not *decision*. Pattern: §8.5b (mechanical-only rule without escape hatch for edge cases).

### ISS-003 — `_history.md` row used invented mode value `(admin)`
Pre-revision §3 `_history.md` row example used `(admin)` in the mode column. The framework's mode set is `SCAN` / `FIX` (and `W` post-FR-CORE-005) per `framework/02-framework.md` §1. `(admin)` was invented without definition. **Resolved:** §3 `_history.md` row example now uses `META` mode with explicit definition — "reserved for framework-version transitions (this FR, future FR-GOV-003 RFC cycles, etc.). It is NOT a SCAN/FIX/W mode in the audit-flow sense." The `META` value gets coined here and added to the glossary by extension. Pattern: §8.6a (inventing a value without explicit definition).

### ISS-004 — FR-CORE-001 §3b caveat update was deferred to "follow-up commit"
Pre-revision §11 "About the Part B ID-stabilisation footnote" said the FR-CORE-001 §3b caveat "may be deleted in a follow-up commit (or amended)." A "may" in a downstream-dependency cleanup is exactly the kind of forward-looking work that drifts. **Resolved:** §1 #15 (new clause) makes the FR-CORE-001 §3b caveat update *in-scope for this FR's PR*. Either delete the caveat (now stabilised) OR amend it to a permanent stabilisation note. Pattern: §3.2 rule 7 (downstream-cleanup made normative, not deferred).

### ISS-005 — FR-GOV-003 placeholder annotation missing
Pre-revision §10 row "Future RFC (P6) adds a criterion that re-creates a merged-pair overlap" referenced FR-GOV-003 (P6, RFC cycle) without the `# placeholder — not yet specified` annotation. **Resolved:** §10 row amended with `(P6 — FR-GOV-003 placeholder, not yet specified)`. The annotation also explicit names the integration ("the RFC-review-vs-dedup integration is owned by FR-GOV-003 which will inherit the methodology"). Pattern: §3.1 rule 3 (placeholder annotation).

### ISS-006 — Methodology file's "tools MUST resolve aliases" claim was forward-looking
Pre-revision `docs/criteria-aliases.md` "Cross-references" section said "tools MUST resolve aliases at audit-render time; the audit's stored content uses primary IDs only." But no tooling has been built that does this yet. The "MUST" was aspirational. **Resolved:** the claim stands (it correctly states the *contract* future tools must honour), and the FR's §10 failure-mode row "Aliases file gets edited by an unauthorised actor" makes the CODEOWNERS recommendation that enforces the alias-stability at the *file* level even without tooling. The MUST applies to *future tools that read DSAF audits*; today, the alias file is the canonical mapping and human readers consult it manually. Pattern: §8.6a (future-tool contract stated at the right surface — the aliases file — with file-level safeguards in §10).

## §3 — Resolution

All 6 mechanical concerns addressed:

- §1 grew from 13 to 15 normative clauses (added #14 clarification on clarify-decisions-don't-split, #15 FR-CORE-001 caveat update in-scope).
- §3a added the operator-discretion escape hatch with audit-trail discipline.
- §3 `_history.md` row uses `META` mode with explicit definition.
- §10 row for FR-GOV-003 placeholder-annotated.
- §11 implementation note about FR-CORE-001 caveat update aligned with new §1 #15.

The post-revision FR runs ~860 lines, above the 700-line target — justified by `docs/criteria-dedup-methodology.md` body (~180 lines) and `docs/criteria-aliases.md` body (~80 lines) being verbatim doctrine surface that future maintainers will run *as-is*. Every §1 MUST has a verifiable AC; every cross-FR coordination (FR-CORE-001 caveat update, FR-CORE-002 rule coexistence, FR-CORE-004 framing-vs-interior, FR-BRAND-002 handle taxonomy, FR-GOV-003 future RFC integration) is explicit. The methodology is deterministic-in-rules with explicit operator-discretion-where-needed. **Score = 10/10.**

---

*End of FR-CORE-003 audit.*
