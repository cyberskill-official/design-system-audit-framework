---
fr_id: FR-CORE-002
audited: 2026-05-17
verdict: PASS (after revision)
score_pre_revision: 7/10
score_post_expansion: 8.5/10
score_post_revision: 10/10
issues_resolved: 8
template: dsaf-spec@1
---

## §1 — Verdict summary

The post-revision spec runs ~880 lines covering the rule rename (`no-downgrade` → `no-silent-regression`), the mechanic rewrite (surface + override, not auto-rollback), the four cause categories (`rubric-tightened`, `fix-side-effect`, `external-dependency-change`, `deliberate-policy-tradeoff`), the six allowed `regression_tag` values (`null`, `D-RT`, `OVRD-FSE`, `OVRD-EDC`, `OVRD-DPT`, `UNRESOLVED`), the patch tables for 5 doctrine surfaces (`docs/02-framework.md` §4 + §7, `docs/06-fix-cycle.md`, `docs/07-maturity-tiers.md` §5, `templates/audit-report-template.md`, `prompts/fix-mode.md`), and the `docs/regression-policy.md` long-form rationale with worked example. It has 14 §1 normative clauses (added 1 in revision: backward-compatibility for §10 column), 13 acceptance criteria, 12 failure-mode rows, 7 open questions resolved, 8 implementation notes. Length is just above 700-line target — justified by the policy file body in §3 being verbatim ship-ready content. All 8 findings below are resolvable inside the FR. **Score = 10/10.**

## §2 — Findings (all resolved)

### ISS-001 — `OVRD-RT` tag self-contradiction (§1 #5 vs §1 #3)
Pre-revision §1 #5 listed `OVRD-RT` ("override approved, cause: rubric-tightened — applies to FIXED only, when the team interprets the criterion's intent shift") as one of the seven allowed tag values. Pre-revision §1 #3, however, said "`rubric-tightened` — a DYNAMIC criterion's rubric anchor moved; FIXED criteria CANNOT use this cause." The two clauses contradicted: §1 #3 forbids FIXED + rubric-tightened; §1 #5 allowed `OVRD-RT` for FIXED. **Resolved:** §1 #5 rewritten — `OVRD-RT` removed from the allowed tag list. Six tag values total (`null`, `D-RT`, `OVRD-FSE`, `OVRD-EDC`, `OVRD-DPT`, `UNRESOLVED`). DYNAMIC-rubric-tightened regressions get `D-RT` directly (no approver needed); FIXED criteria that would have wanted a "rubric-tightened" override now must use one of the other three causes (`fix-side-effect`, `external-dependency-change`, or `deliberate-policy-tradeoff`) — the genuine case is "a vendor changed something that affects this FIXED criterion's measurement" = `OVRD-EDC`. AC10 verification updated. Pattern: §8.1a (single-source-of-truth violation between §1 #3 and §1 #5).

### ISS-002 — §1 #2 listed (a)–(f) as six fields but called them "five things"
Pre-revision §1 #2 read "surface in §7 Verification with: (a) the criterion ID, (b) the pre-audit score, (c) the post-audit score, (d) the regression magnitude (pre − post), (e) the suspected cause, and (f) an explicit override comment." Six items, but the surrounding prose described them as five fields ("six fields including the approver-vs-D-RT branch" is what the FR actually meant). **Resolved:** §1 #2 explicitly states "six fields" and reframes (f) as "the approver-vs-D-RT branch (either an explicit override comment from `@Human[approve]` with the approver's name, OR `null` approver iff the row is `D-RT` per §1 #4)." Pattern: §8.1d (constant defined but not enforced — the field-count was inconsistent with the bullet count).

### ISS-003 — Approver-not-fix-author rule lived only in `regression-policy.md`, not §1
Pre-revision §1 #6 said "override-approver name" but didn't enforce that the approver MUST differ from the offending fix's author. The constraint lived only in `docs/regression-policy.md` "Anti-patterns" — which is normative but easy for an implementer to miss. **Resolved:** §1 #2 amended with explicit "The approver MUST NOT be the same `@Human` actor who wrote the offending fix in §6 Execution; for solo-maintained projects, the founder MAY approve their own fix's regression with a minimum 24-hour delay between the agent's draft override and the founder's approval." Pattern: §8.5b (security-relevant constraint in policy but not enforced at the framework's normative surface).

### ISS-004 — Three compliance states (no-regression / D-RT / OVRD-*) not enumerated in §1
Pre-revision §1 #7 said "an audit that signs WITH an override entry is *still compliant* — the rule is about surfacing, not preventing" — but only one compliance state was enumerated. The D-RT no-approver compliance state was implicit. **Resolved:** §1 #7 rewritten with three explicit compliance states: (i) no regressions, (ii) D-RT rows with rubric citations, (iii) OVRD-* rows with valid approver. One non-compliant state: any `UNRESOLVED` row. Pattern: §8.1c (invariant not enumerated in §1 — three legitimate states collapsed to one).

### ISS-005 — Backward-compatibility for §10 column addition not specified
Pre-revision §1 #5 added a `regression_tag` column to §10 Criteria scores in `templates/audit-report-template.md`. Legacy audits (CyberSkill's worked example + any partner audits already published) have an 8-column §10; the new template emits 9 columns. The migration plan was implicit (would tooling break? would legacy audits need re-rendering?). **Resolved:** §1 #14 (new clause) explicitly states the column is additive; legacy audits remain valid in the 8-column format; tooling MUST tolerate both formats; no migration FR is required. Pattern: §3.10 rule 29 (architectural change without an enumerated migration path).

### ISS-006 — `prompts/fix-mode.md` patch lacked Read-before-patch discipline
Pre-revision §3 `prompts/fix-mode.md` section showed an after-pattern but no before-pattern. The implementation playbook in §6 step 7 said "Read the file at land time" but the §3 section itself didn't call this out. **Resolved:** §3 `prompts/fix-mode.md` section retains the after-pattern shape; §6 step 7 explicit Read-before-patch retained; this finding's resolution is procedural (the Read-before-patch discipline established in FR-CORE-004 §11 applies here uniformly; no additional FR-CORE-002 change beyond verifying the §6 step 7 language is explicit). Pattern: §3.2 rule 7 (Read-before-patch discipline carried forward consistently across FRs).

### ISS-007 — Override approver authority for `@Human[rollback]` not enumerated
Pre-revision §1 #9 said "the rollback becomes a *human decision*" but didn't say who has authority to trigger it. The `@Human[rollback]` action tag in `docs/02-framework.md` §2 is the existing actor; pre-revision FR-CORE-002 didn't tie the override-approver-authority to the rollback-trigger-authority. **Resolved:** §1 #2 amended (in the same revision as ISS-003) clarifies that the override approver MUST NOT be the offending fix's author; by extension, the `@Human[rollback]` trigger authority is the same — the offending fix's author cannot unilaterally revert their own fix without a second human acknowledging (or, in solo-project mode, the 24-hour delay). The action-tag semantics inherit from `docs/02-framework.md` §2. Pattern: §8.5b (authority not transitively enumerated across linked action tags).

### ISS-008 — Anti-pattern about `OVRD-DPT` neglect lacked CI lint plan
Pre-revision `docs/regression-policy.md` "Anti-patterns" listed "OVRD-DPT used to hide neglect" as a rule but deferred enforcement to "reviewer scrutiny." A CI lint that fails the audit if any `OVRD-DPT` override lacks a roadmap-or-RFC URL in `notes` is the deterministic alternative. Pre-revision §9 Q6 deferred this to a post-launch FR; the rationale was logged but the future-FR pointer wasn't placeholder-annotated. **Resolved:** §9 Q6 explicitly tags the future CI-lint as "post-launch FR" with `# placeholder — not yet specified` annotation. Pattern: §3.1 rule 3 (placeholder annotation for not-yet-specified FRs).

## §3 — Resolution

All 8 mechanical concerns addressed:

- §1 grew from 13 to 14 normative clauses (added #14 backward-compat for §10 column).
- §1 #2 rewritten to enumerate 6 fields explicitly + add approver-not-fix-author rule + solo-project 24-hour-delay proxy.
- §1 #5 rewritten — `OVRD-RT` removed; 6 allowed tag values; explicit "no `OVRD-RT`" note for FIXED.
- §1 #7 rewritten with three legitimate compliance states.
- §3 `Override log` body header line updated to enumerate the 6 (not 7) tag values.
- §5 AC10 verification updated — no `OVRD-RT` check, explicit `null` tag check.
- §9 Q6 placeholder annotation for the future CI-lint FR.

The post-revision FR runs ~880 lines, slightly above the 700-line target — justified by the verbatim doctrine surface in §3 (`docs/regression-policy.md` body is ~180 lines of policy-ready content with the worked example). Every §1 MUST has a verifiable AC; every cross-FR coordination (FR-BRAND-002, FR-DOCS-001, FR-CORE-001/003/004) is explicit; the four cause categories + six tag values are internally consistent. **Score = 10/10.**

---

*End of FR-CORE-002 audit.*
