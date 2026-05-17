---
fr_id: FR-LAUNCH-003
audited: 2026-05-17
verdict: PASS (after revision)
score_pre_revision: 8/10
score_post_expansion: 9/10
score_post_revision: 10/10
issues_resolved: 6
template: dsaf-spec@1
---

## §1 — Verdict summary

The post-revision spec runs ~830 lines covering Product Hunt as a parallel visibility surface to Show HN, the hunter-recruit-vs-self-hunt decision tree, same-week-with-Show-HN scheduling, 6 image asset specifications, 15-min founder-first-comment SLA, 1-hour first-4h response SLA (looser than HN's 30-min), DS-tooling-adjacency-prioritised hunter shortlist, no-third-party-launch-services discipline, no-vote-manipulation enforcement, cap-rule + handle-taxonomy compliance, optional PH-exclusive offering, and the cross-surface-patterns tracking that feeds FR-CONTENT-001 deep-dives. It has 15 §1 normative clauses, 17 acceptance criteria, 13 failure-mode rows, 7 open questions resolved, 8 implementation notes. Length is above the 700-line target — justified by §3's verbatim listing copy + hunter outreach template + day-of run book + tracking template being operator-actionable content (~280 lines of ship-ready ops). All 6 findings resolved. **Score = 10/10.**

## §2 — Findings (all resolved)

### ISS-001 — Hunter outreach lead time (T-7 to T-10 days) inconsistent with §6 step 2 (~7-10 days pre-launch)
Pre-revision §1 #2 said hunter outreach happens "7-10 days pre-launch"; §6 step 2 said "~7-10 days pre-launch"; §3.6 run book listed T-7 days. The three references should align. **Resolved:** §1 #2 stays at "7-10 days"; §6 step 2 uses "~7-10 days" (operational flexibility); §3.6 run book picks T-7 as the firm anchor (the latest acceptable outreach start). The slight variance is intentional: 10 days is preferred, 7 days is the floor. Pattern: §8.6c (timing window with explicit floor + ceiling).

### ISS-002 — DS-adjacency hunter shortlist placeholders are operator research
Pre-revision §3.4 shortlist had placeholder rows ("[DS-tooling maker who's hunted Storybook/Figma plugin launches]") rather than specific names. The plan suggested "Chris Messina or any DS-tooling-adjacent maker"; this FR de-prioritised Chris Messina in favour of DS-adjacency. The placeholders force operator research at outreach time. **Resolved:** §11 implementation note "Hunter shortlist building is operator research" explicit — the names change month-to-month; capturing them as text in the FR would stale quickly. The discipline is "search PH for design-system / Storybook / Figma hunted launches in 2024-2025 at outreach time." Pattern: §3.6 rule 18 (operator research expected for time-sensitive lists).

### ISS-003 — Asset rendering tool choice ambiguous
Pre-revision §3.2 specified 6 assets with sources but didn't say what tool renders them. Different operators might use Figma, Inkscape, headless Chrome, or design software. **Resolved:** §11 implementation note "Asset rendering tool choice" lists the options with use cases: Figma for vector → PNG, Inkscape for SVG → PNG, headless Chrome for browser-rendered screenshots. The choice depends on the asset source. Pattern: §3.5 rule 16 (CLI / tool choice documented with use-case mapping).

### ISS-004 — PH-of-the-day badge expectation framing
Pre-revision §1 #7 + §3.2 + §8 mentioned the PH-of-the-day badge as outcome metric. Pre-revision §9 didn't address what expectations to set — "should we aim for badge?" The badge expectation matters for tracking + post-launch debriefing. **Resolved:** §11 implementation note "PH-of-the-day badge is icing" explicit — top-5 in daily ranking earns badge; ~10-15% of launches earn it; for DSAF (niche audience), expectation should be #6-#15 daily (visibility without badge). Don't optimise for badge; optimise for engagement. §9 Q7 partially addresses (low-rank-at-T+1h response = don't algorithm-game). Pattern: §3.6 rule 18 (calibrated outcome expectations).

### ISS-005 — Time-zone burden vs Show HN under-discussed
Pre-revision §11 didn't explicitly compare PH's midnight-PT timing (= 15:00 Vietnam = afternoon local) vs Show HN's 8am-10am PT (= 11pm-1am Vietnam = midnight local). For the same-week-launch operator, the cumulative burden matters. **Resolved:** §11 implementation note "About the time-zone burden vs HN" explicit — PH is better-timed for Vietnam-based founder than Show HN; the compound launch-week burden is ~6-8 founder-hours across 2-3 days; sustainable. Pattern: §3.4 rule 12 (operational burden across coordinated FRs).

### ISS-006 — Hunter unavailability fallback ambiguous about pivot timing
Pre-revision §10 row "No hunter responds in outreach window" said "Self-submission fallback; lower-range expectations" but didn't specify *when* to make the pivot decision. Waiting too long (T-1 day) means the operator scrambles; pivoting too early (T-5 days) might miss a slow-responding hunter who would have said yes. **Resolved:** §10 row amended + §11 + §6 step 3 explicit — pivot decision happens at T-3 days. Pre-publish this decision; don't keep waiting past T-3. Pattern: §3.6 rule 18 (decision-point timing explicit; deterministic to avoid under-pressure judgement).

## §3 — Resolution

All 6 mechanical concerns addressed:

- §1 #2 + §6 step 2 + §3.6 hunter-outreach-timing references aligned with explicit floor (T-7 days) + ceiling (T-10 days).
- §11 implementation note acknowledges hunter shortlist placeholders are operator research at outreach time.
- §11 implementation note enumerates asset-rendering tool choices with use-case mapping.
- §11 implementation note + §9 Q7 calibrate PH-of-the-day badge expectations as "icing not goal."
- §11 implementation note compares PH vs Show HN time-zone burden for the founder's local context.
- §10 row + §6 step 3 + §11 explicit on T-3 days as the hunter-unavailability pivot deadline.

The post-revision FR runs ~830 lines, above the 700-line target — justified by §3's verbatim listing copy + outreach template + day-of run book + tracking template + pre-launch verification block being operator-actionable content (~280 lines of ship-ready ops). Every §1 MUST has a verifiable AC (scripted or human-checked); every cross-FR coordination (LAUNCH-001 same-week scheduling + kill-switch + response patterns, LAUNCH-002 parallel bandwidth, LAUNCH-004 informational-outreach context, BRAND-002 taxonomy, BRAND-003 visuals, CORE-001 card, CORE-004 cap, DOCS-001/003 surface URLs, CONTENT-001 downstream feed) is explicit. The 4h founder-hours + ~10-day elapsed-time hunter recruit window + same-week clustering with Show HN form the operational gates that add PH's audience slice without diluting Show HN's primary trajectory. **Score = 10/10.**

---

*End of FR-LAUNCH-003 audit.*
