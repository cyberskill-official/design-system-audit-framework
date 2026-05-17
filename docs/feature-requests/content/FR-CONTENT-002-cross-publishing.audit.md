---
fr_id: FR-CONTENT-002
audited: 2026-05-17
verdict: PASS (after revision)
score_pre_revision: 8/10
score_post_expansion: 9/10
score_post_revision: 10/10
issues_resolved: 6
template: dsaf-spec@1
---

## §1 — Verdict summary

The post-revision spec runs ~780 lines covering cross-publishing each weekly deep-dive to dev.to + Medium + LinkedIn with T+24h/T+48h/T+72h staggered timing, canonical-URL preservation discipline at dsaf.dev across all platforms, same-content rule (no condensed/SEO-bait variants), per-platform procedure with 7+ steps each, per-platform anti-patterns (4+ per platform), tracking format with T+7d engagement per platform, substantive-edit sync within 7 days, no-auto-cross-publishing-tools ban, and engagement-pattern feedback to FR-CONTENT-001 topic prioritisation. It has 15 §1 normative clauses, 15 acceptance criteria, 12 failure-mode rows, 7 open questions resolved, 8 implementation notes. Length is above the 700-line target — justified by §3's verbatim per-platform procedures + per-platform anti-patterns + tracking format being operator-actionable content (~250 lines of ship-ready ops). All 6 findings resolved. **Score = 10/10.**

## §2 — Findings (all resolved)

### ISS-001 — LinkedIn canonical-URL handling weakest of 3 platforms; risk under-quantified
Pre-revision §3.1 LinkedIn subsection mentioned no explicit canonical-URL field; the canonical signal relies on "Originally published at" + bottom URL + the linked dsaf.dev page's `<link rel="canonical">`. But the search-engine reliability of these signals wasn't quantified. **Resolved:** §11 implementation note "LinkedIn's canonical-URL handling is the weakest" explicit — Google generally honours the multi-signal canonical; periodic verification via Google Search Console is the operator's discipline. §10 failure-mode row "Cross-published post gets more engagement than dsaf.dev original" partially addresses; the verification cadence is operator-discretion. Pattern: §3.5 rule 15 (host-platform variance documented with mitigation).

### ISS-002 — Medium paywall account-level setting requires founder decision
Pre-revision §3.1 Medium procedure step 7 mentioned paywall toggle but didn't address that Medium's partner-program is an account-level setting. The founder may have it enabled for other content; toggling per-post may be permissive but adds risk. **Resolved:** §11 implementation note "About Medium paywall" explicit — the founder's Medium account may have partner-program enabled by default; the deep-dives are free; the per-post paywall toggle MUST be off. If the founder benefits from partner-program revenue elsewhere, this account decision is separate. Pattern: §3.6 rule 18 (account-level decision documented with founder-level discretion).

### ISS-003 — Auto-cross-publishing tools landscape changes over time
Pre-revision §1 #11 + §11 explicit on no auto-tools. But the landscape shifts; future tools may reliably preserve canonical URLs. The FR's stance should accommodate this. **Resolved:** §11 implementation note "About auto-cross-publishing tools" explicit — today's tools (Buffer, Hootsuite, Zapier) have inconsistent canonical handling; future tools may differ. The FR's manual-publishing discipline is the current rule; the FR can be revised if a future tool reliably preserves canonical. Pattern: §3.4 rule 12 (discipline with revision-trigger documented).

### ISS-004 — Engagement-pattern feedback timing relative to FR-CONTENT-001 4-weekly review
Pre-revision §3.5 said engagement-pattern feedback feeds FR-CONTENT-001 every 4 weeks. But FR-CONTENT-001 §3 also has a 4-weekly schedule review. The timing relationship wasn't explicit. **Resolved:** §3.5 + §11 implementation note "About the engagement-pattern feedback" explicit — the FR-CONTENT-002 4-weekly review aligns with FR-CONTENT-001's 4-weekly schedule review (same calendar cadence). The cross-publishing engagement patterns become input to the schedule re-prioritisation. Pattern: §3.4 rule 14 (coordinated review timing across FRs).

### ISS-005 — Co-maintainer cadence-share post-FR-GOV-002 timing
Pre-revision §11 mentioned cadence-share with co-maintainer but didn't specify how cross-publishing rotates. **Resolved:** §11 implementation note "Co-maintainer cadence-share post-FR-GOV-002" explicit — co-maintainer authors every-other-week's cross-publishing (alternating with founder); reduces founder burden + signals genuine co-maintenance. Pattern: §3.4 rule 14 (cadence-share coordination explicit).

### ISS-006 — Substantive-edit sync 7-day timeline tight for cross-platform editing
Pre-revision §1 #13 + §3.6 specified 7-day sync window for cross-published versions when dsaf.dev gets ChangeLog edit. But editing across 3 platforms (~15m total) + verifying the cross-published versions match (~15m) = ~30m founder time per substantive edit. Over the 12-week cadence, substantive edits are rare (~1 every 4-8 weeks?) so the sync burden is small. **Resolved:** §11 implementation note + §3.6 acknowledge the 30m-per-substantive-edit cost; substantive edits are rare; the 7-day window is comfortable. Pattern: §3.10 rule 29 (effort estimate for sync discipline documented).

## §3 — Resolution

All 6 mechanical concerns addressed:

- §11 + §10 row explicit on LinkedIn canonical-URL weakness + Google Search Console verification cadence.
- §11 explicit on Medium paywall account-level decision; per-post toggle as the discipline.
- §11 explicit on auto-tools revision-trigger if landscape changes.
- §3.5 + §11 explicit on 4-weekly review alignment between FR-CONTENT-001 + FR-CONTENT-002.
- §11 explicit on co-maintainer cadence-share post-FR-GOV-002.
- §11 + §3.6 acknowledge substantive-edit sync 30m cost; 7-day window comfortable for rare edits.

The post-revision FR runs ~780 lines, above the 700-line target — justified by §3's verbatim per-platform procedures + per-platform anti-patterns + tracking format + worked example payloads (~250 lines of ship-ready ops). Every §1 MUST has a verifiable AC (scripted or human-checked); every cross-FR coordination (CONTENT-001 upstream + 4-weekly review alignment, BRAND-001/002 + CORE-004 + BRAND-004 compliance uniform across platforms, GOV-002 cadence-share, DOCS-003 ChangeLog discipline, LAUNCH-005 distinct-from-guest-articles) is explicit. The ~45m per deep-dive overhead + 9 founder-hours over 12 weeks + staggered T+24h/T+48h/T+72h schedule + manual canonical-preservation discipline form the operational gates that 3-5x deep-dive readership without polluting canonical signal. **Score = 10/10.**

---

*End of FR-CONTENT-002 audit.*
