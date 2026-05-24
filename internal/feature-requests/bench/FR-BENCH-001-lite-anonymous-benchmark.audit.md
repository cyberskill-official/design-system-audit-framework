---
fr_id: FR-BENCH-001
audited: 2026-05-17
verdict: PASS (after revision)
score_pre_revision: 8/10
score_post_expansion: 9/10
score_post_revision: 10/10
issues_resolved: 6
template: dsaf-spec@1
---

## §1 — Verdict summary

The post-revision spec runs ~890 lines covering the lite anonymous benchmark survey at dsaf.dev/benchmark (29 questions: 25 DSAF-25 Core self-scores + 4 demographic-bucket + 1 optional free-text), GDPR-compliant form vendor (Tally preferred), no-required-PII discipline, voluntary opt-in + aggregate-only display with low-N guard ≥ 30, anonymised peer comparison on results page, cap-rule disclosure per FR-CORE-004, full GDPR rights enumeration (access/erasure/rectification/portability/objection/complaint), submission_id pattern for actionable rights, no-paid-funnel-CTAs sacredness, dsaf.dev/index.html + README patches, future-FR coordination (FR-BENCH-002 P4 + FR-REPORT-001 P6). It has 15 §1 normative clauses, 17 acceptance criteria, 12 failure-mode rows, 7 open questions resolved, 8 implementation notes. Length is above the 700-line target — justified by §3's verbatim spec doc + privacy policy + results-page template + survey-page template (~340 lines of operator-actionable ops content). All 6 findings resolved. **Score = 10/10.**

## §2 — Findings (all resolved)

### ISS-001 — Form vendor URL stability + DPA-link freshness
Pre-revision §3.1 + §3.6 named Tally as preferred + linked to its DPA. The vendor's DPA URL may move; the freshness of the link matters for GDPR compliance. **Resolved:** §3.6 GDPR-compliant privacy policy explicit on the DPA reference (Tally's policy at the named URL); §10 failure-mode row "Form vendor changes GDPR compliance status" + §11 implementation note address — verify the DPA URL at deployment time; if vendor changes status, update privacy policy + transition to compliant vendor. Pattern: §3.5 rule 15 (external-dependency stability + GDPR compliance posture).

### ISS-002 — Low-N guard for cross-segment combinations
Pre-revision §3.4 said the results page shows segments "independently (NOT cross-segmented)." But the spec didn't address why — a respondent who matches multiple segments might wonder why no cross-segment view exists. **Resolved:** §3.4 + §10 failure-mode row + §11 implementation note explicit on the design choice — cross-segmentation lowers N per segment combination below the ≥ 30 guard for typical bucket combinations; the lite version's spec avoids this failure mode by displaying segments independently. Future-FR (FR-BENCH-002 P4 hosted-tier) may add cross-segments once N ≥ 1,000 makes them safe. Pattern: §8.5b (design-choice rationale + future-evolution path).

### ISS-003 — Submission_id discoverability for GDPR rights
Pre-revision §3.6 said access/erasure requires submission_id; §1 #15 implied the form's confirmation email provides it; §3 results page reminded the user to save it. But what if the user dismisses the confirmation email + later wants to exercise rights? Without the submission_id, the request is unactionable. **Resolved:** §11 implementation note "The 'submission_id required for GDPR rights' framing is unusual but legally accurate" explicit — the framework collects no PII linking responses to individuals; the submission_id is the only identifier. Users who don't save it cannot exercise rights for that specific submission. This is GDPR-compliant (the framework doesn't possess identifiable data); the trade-off is documented for users to make informed decisions. Pattern: §3.6 rule 21 (PII / consent boundary with explicit trade-off).

### ISS-004 — DSAF-25 Core question-text length vs form-vendor limits
Pre-revision §3.1 said each criterion question's wording ≤ 100 chars to fit form-vendor question-length limits. But criterion names + rubric anchors are longer than 100 chars. The spec needs to clarify the trade-off. **Resolved:** §3.1 explicit on "≤ 100 chars per criterion to fit form-vendor question length limits" + the example shows the format (criterion ID + brief description + the 6 anchor options as separate radio buttons rather than embedded in question text). The full rubric anchor wording lives in the radio button labels (≤ 50 chars each), keeping each within form-vendor limits. Pattern: §3.5 rule 16 (host-platform constraint + workable design).

### ISS-005 — Periodic dataset export for FR-REPORT-001 P6 timing
Pre-revision §3.3 + §1 mentioned periodic export for the P6 annual report. But the export timing wasn't defined — quarterly? Annual? **Resolved:** §3.3 explicit — "the operator may export the responses for annual-report writing; the export is internal; the public report (P6) shows aggregated insights only." §11 implementation note + §10 failure-mode row "Periodic dataset export for FR-REPORT-001 reveals sensitive patterns" address — annual export aligned with FR-REPORT-001 P6 annual report cadence; the editorial process adds another review layer. Pattern: §3.4 rule 14 (cross-FR coordination timing explicit).

### ISS-006 — Survey question outdating as DSAF-25 evolves (FR-CORE-003 dedup, future RFCs)
Pre-revision §10 failure-mode row "Survey questions become outdated as DSAF-25 evolves" acknowledged the issue + recovery. But the recovery's data-quality implication (respondents who answered old questions still in dataset) wasn't fully addressed. **Resolved:** §10 row + §11 implementation note explicit — update form questions to match new DSAF-25 Core; respondents who answered old questions stay in dataset with version annotation ("responded under v0.X criteria"); aggregate stats may need version-segmentation if criterion definitions changed substantively. Pattern: §3.10 rule 28 (versioning across data evolution).

## §3 — Resolution

All 6 mechanical concerns addressed:

- §3.6 + §10 + §11 explicit on form-vendor DPA verification at deployment + transition path.
- §3.4 + §10 + §11 explicit on low-N guard rationale + future cross-segmentation path.
- §11 explicit on submission_id GDPR-rights trade-off (legally accurate but unusual).
- §3.1 explicit on per-criterion question-text length constraint + rubric anchor as separate radio buttons.
- §3.3 + §11 explicit on periodic export timing aligned with FR-REPORT-001 P6.
- §10 + §11 explicit on versioning + data-quality for question-evolution.

The post-revision FR runs ~890 lines, above the 700-line target — justified by §3's verbatim spec doc + privacy policy + results-page template + survey-page template (~340 lines of operator-actionable ops + privacy-compliance content). Every §1 MUST has a verifiable AC (scripted or human-checked); every cross-FR coordination (BRAND-001 dsaf.dev hosting + CORE-001 DSAF-25 questions, CORE-004 cap rule, BRAND-002 + BRAND-004 + REPORT-001 + BENCH-002 P4 + P6 downstream) is explicit. The 8h founder-time + Tally vendor + GDPR-compliant from day one + no-PII voluntary opt-in + low-N guard + aggregate-only display + cap-rule disclosure form the operational gates that establish the highest-converting OSS→paid bridge (per plan) without crossing into surveillance / PII collection / lead-gen polluting the dsaf.dev sacred surface. **Score = 10/10.**

---

*End of FR-BENCH-001 audit.*
