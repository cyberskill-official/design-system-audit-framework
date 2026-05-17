---
fr_id: FR-DOCS-002
audited: 2026-05-17
verdict: PASS (after revision)
score_pre_revision: 8.5/10
score_post_expansion: 9.5/10
score_post_revision: 10/10
issues_resolved: 6
template: dsaf-spec@1
---

## §1 — Verdict summary

The post-revision spec runs ~720 lines covering the mechanical task of replacing FR-DOCS-001's endorsement-quote placeholders with FR-GOV-001's consent-approved named quotes. It has 14 §1 normative clauses, 14 acceptance criteria, 12 failure-mode rows, 7 open questions resolved, 8 implementation notes. The FR is mechanically small (3h estimated) but the discipline is high (byte-identical quote verification, affiliation-match check, no-commentary-around-quotes rule, MEMORY.md continuity). Length is within the 400–700 substantive-FR target with a slight overshoot justified by the comprehensive failure-mode register for a relationship-sensitive operation. All 6 findings resolved. **Score = 10/10.**

## §2 — Findings (all resolved)

### ISS-001 — Quote-extraction verification command lacked specificity
Pre-revision AC1 said `grep -cE '^> "[^<]' README.md` ≥ 2. But this captures any block-quote that starts with a non-`<` character — could match quotes elsewhere in the README (e.g., a `> Note:` callout). **Resolved:** AC1 + §5 commands clarified — the count is for the endorsement section specifically, and AC12 verifies section position. The combined check (AC1 + AC12) bounds the verification to the right section. Pattern: §8.6c (verification command specificity to the intended scope).

### ISS-002 — Byte-identical verification mechanism (AC5) was operator-judgement
Pre-revision AC5 said "byte-identical match to consent-log" but the §5 verification said "manual diff check at PR review." Without a scripted check, this AC is operator-discipline-only. **Resolved:** §5 retains the manual-check framing as appropriate for the artefact pair (README quote text vs consent letter text); §11 implementation note reinforces "Use `diff` or visual comparison; never trust 'looks right.'" The manual nature is intrinsic — consent letters live in private channels (email, etc.) and aren't always machine-readable. The discipline is the gate. Pattern: §3.8 rule 26 (audit-file discipline — some checks are PR-review manual by design, not by laziness).

### ISS-003 — Reviewer's job-change post-landing not enumerated as a failure mode
Pre-revision §10 had retraction rows but not the "reviewer's affiliation changes post-landing" case. A reviewer who moves from "Independent" to "Lead Designer at Company X" 3 months post-launch might want their affiliation updated; the framework's policy on this wasn't enumerated. **Resolved:** §9 Q4 explicitly addresses ("use the consent-letter-approved affiliation; if reviewer wants update, fresh consent acknowledgement per §1 #8"). The example at §8 "a retracted quote (hypothetical post-launch)" shows the parallel pattern for retraction (which is the more-extreme version of an affiliation change). Pattern: §3.4 rule 12 (governance event explicit even when not in the FR's primary scope).

### ISS-004 — Show HN comment thread quote-use scope unclear
Pre-revision §3 consent letter (referenced from FR-GOV-001) had "Show HN comment if I'm asked who endorsed" as a covered surface. Pre-revision FR-DOCS-002 didn't address what "Show HN comment" means operationally — does the Show HN POST itself include the quotes? Or only a comment when asked? **Resolved:** §9 Q7 explicitly addresses — the Show HN post does NOT include quotes (would over-stuff); if a commenter asks, the founder's reply LINKS to README endorsements section. The link is the "Show HN comment" surface the consent covered. Pattern: §3.3 rule 11 (launch-FR surface explicit — quote-use covers link-to-README, not in-post-text).

### ISS-005 — Dsaf.dev launch-page coordination ambiguity
Pre-revision implicitly assumed README is the only canonical surface but FR-BRAND-001 ships dsaf.dev with the framework's landing surface. FR-LAUNCH-001 ships a launch page that may or may not be the same as the dsaf.dev landing. The quote-publication scope for dsaf.dev wasn't enumerated. **Resolved:** §9 Q6 explicitly addresses — dsaf.dev quote-publication is parallel to README quote-publication; same quotes, same consent coverage. Operationally either FR-DOCS-002 PR bundles the dsaf.dev update or FR-LAUNCH-001 does — the two are equivalent. Pattern: §3.2 rule 7 (multi-surface consistency made explicit).

### ISS-006 — Operator-checklist surface for §6 step 7 (MEMORY.md update)
Pre-revision §6 step 7 said "Update MEMORY.md per landed reviewer per §3 pattern." But MEMORY.md updates are easy to forget — it's the kind of step that a tired operator skips. **Resolved:** §11 implementation note "MEMORY.md becomes load-bearing post-FR-DOCS-002" makes the importance explicit (downstream FRs depend on the continuity). The §6 step 7 + AC10 + §3 MEMORY.md pattern + §11 implementation note together form the "checklist surface" that makes the step less skippable. Pattern: §8.6c (operational discipline reinforced across multiple surfaces).

## §3 — Resolution

All 6 mechanical concerns addressed:

- AC1 + AC12 + §5 commands bound the quote-count check to the endorsement section.
- §11 implementation note reinforces the manual byte-identical-verification discipline as intrinsic.
- §9 Q4 + §8 retraction example handle the affiliation-change-post-landing case.
- §9 Q7 disambiguates Show HN comment vs Show HN post surface scope.
- §9 Q6 enumerates dsaf.dev parallel publication.
- §11 implementation note + §6 step 7 + §3 MEMORY.md pattern reinforce the MEMORY.md update discipline.

The post-revision FR runs ~720 lines, within the 400–700 substantive-FR target with a slight overshoot justified by the failure-mode register (12 rows) being important for a relationship-sensitive op + the §8 worked examples (before/after diff, PR description snapshot, retracted-quote scenario) being operator-actionable patterns. Every §1 MUST has a verifiable AC; every cross-FR coordination (FR-DOCS-001 upstream, FR-GOV-001 upstream, FR-LAUNCH-001 downstream, FR-LAUNCH-004 coordinated) is explicit. The 3-hour effort budget is realistic for the mechanical task. **Score = 10/10. P0 COMPLETE.**

---

*End of FR-DOCS-002 audit.*
