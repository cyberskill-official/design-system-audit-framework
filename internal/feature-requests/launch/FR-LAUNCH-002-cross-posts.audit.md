---
fr_id: FR-LAUNCH-002
audited: 2026-05-17
verdict: PASS (after revision)
score_pre_revision: 8/10
score_post_expansion: 9/10
score_post_revision: 10/10
issues_resolved: 6
template: dsaf-spec@1
---

## §1 — Verdict summary

The post-revision spec runs ~880 lines covering the 6-platform cross-post discipline (r/web_design, r/UXDesign, r/programming, Lobste.rs, daily.dev, Designer News), the T+4h to T+12h sequencing relative to Show HN, customised platform-specific body texts (6 verbatim posts in §3.4), sized engagement ranges per platform (Low / Mid / High), per-platform response SLA looser than HN's 30-min, the FR-LAUNCH-001 §3 response-pattern templates as platform-portable, account-standing gating, no-vote-manipulation enforcement, no-moderation-removal-repost discipline, the tracking-file extension feeding FR-CONTENT-001 deep-dive candidates, and the HN-mention-at-bottom positioning. It has 15 §1 normative clauses, 15 acceptance criteria, 11 failure-mode rows, 7 open questions resolved, 8 implementation notes. Length is above the 700-line target — justified by §3's six verbatim platform-customised post bodies (~280 lines of operator-actionable content). All 6 findings resolved. **Score = 10/10.**

## §2 — Findings (all resolved)

### ISS-001 — daily.dev + Designer News combined or separate?
Pre-revision §3.1 sequencing table had 5 rows (combining daily.dev + Designer News at T+12h) but §3.4 body sections were 6 separate platforms (daily.dev and Designer News each authored). The mismatch could trip an AC2 check (≥ 6 sequencing rows) if interpreted strictly. **Resolved:** AC2 verification command accommodates `≥ 6 (or 5 if daily.dev + Designer News combined)`. §3.1 keeps the combined T+12h slot but §3.4 has separate bodies; the operator submits both at T+12h with separate posts but the timing slot is shared. Pattern: §8.1d (constant-vs-count alignment between sub-sections).

### ISS-002 — Account-standing thresholds (Reddit karma > 50/100) are approximations
Pre-revision §3.1 "Standing required" column specified "> 50 karma" for r/web_design and "> 100 karma" for r/programming. These are operator-calibrated thresholds; actual Reddit subreddit minimum karma rules vary and aren't always public. **Resolved:** §11 implementation note "Account-standing is the most-common skip reason" acknowledges — the thresholds are calibrated estimates; the discipline is "verify standing before posting, skip if absent." The §10 failure-mode row for "Reddit moderator removes for self-promotion" covers the case where standing is sufficient but framing isn't. Pattern: §3.4 rule 12 (operator-discretion documented with calibration).

### ISS-003 — Cross-post body referencing HN URL — what if HN flagged?
Pre-revision §1 #14 said "MUST schedule cross-posts to benefit from Show HN signal" + bodies reference HN URL at bottom. But FR-LAUNCH-001 §1 #15 + kill-switch condition #5 cover "HN flagged" — if HN removes the Show HN post mid-launch, the cross-post bodies' HN-reference URLs become broken or surface a removed thread. **Resolved:** §1 #15 (mirror of FR-LAUNCH-001 §1 #15 + kill-switch) explicit: "MUST NOT post the cross-posts if Show HN gets flagged or removed by HN moderators." Cross-posts pause if Show HN pauses. Pattern: §3.4 rule 14 (cross-FR coordination on kill-switch).

### ISS-004 — Engagement-range numbers' provenance unclear
Pre-revision §3.2 had Low/Mid/High numbers per platform (e.g., r/web_design 50/250/600 upvotes). The numbers seemed authoritative but the FR didn't document their source. **Resolved:** §9 Q6 explicitly addresses ("calibrated estimates based on similar-scope launches"); §11 implementation note "About engagement-range calibration" elaborates — calibrated from OSS frameworks, methodology repos, design-system tooling launches. The numbers are illustrative; actual outcomes feed back into the tracking file for future-launch recalibration. Pattern: §3.6 rule 18 (measurement criterion provenance explicit).

### ISS-005 — Platform-portable response patterns may not all fit every platform
Pre-revision §1 #9 said "FR-LAUNCH-001 §3 response-pattern templates are platform-portable." But the templates were written for HN conventions (e.g., "AMA" framing at the end of the founder's first comment); Lobste.rs doesn't use AMA framing; Designer News doesn't use it; etc. **Resolved:** §11 implementation note about per-platform body customisation extends to response-pattern adjustments — the templates' *structure* (acknowledge + substantive response + redirect to long-form) is portable; the *tonal markers* (AMA framing, etc.) adjust per platform. The discipline is "use the patterns' substance; adjust the surface to fit." Pattern: §8.5b (cross-platform pattern adaptation with substance-vs-surface separation).

### ISS-006 — Tracking file extension structure not explicit on date-stamping
Pre-revision §3.5 tracking file extension showed "Posted at: 2026-MM-DD HH:MM UTC" but didn't specify whether timestamps are launch-relative (T+4h) or absolute (date+time). Both are useful; for cross-launch analysis (P1 vs P3 retro), absolute is more useful; for in-launch monitoring (am I within SLA?), relative is more useful. **Resolved:** §3.5 template uses "Posted at: 2026-MM-DD HH:MM UTC (T+4h after Show HN)" — both formats together. The discipline is "both, for both audiences." Pattern: §8.6c (data-shape supporting multiple use cases).

## §3 — Resolution

All 6 mechanical concerns addressed:

- §3.1 + §3.4 + AC2 reconciled on daily.dev / Designer News combined-vs-separate ambiguity.
- §11 note acknowledges Reddit karma thresholds are calibrated estimates.
- §1 #15 mirrors FR-LAUNCH-001 §1 #15 + kill-switch cross-FR coordination.
- §9 Q6 + §11 note explain engagement-range provenance + recalibration loop.
- §11 note clarifies platform-portable substance-vs-surface for response patterns.
- §3.5 template uses both absolute + relative timestamps.

The post-revision FR runs ~880 lines, above the 700-line target — justified by §3's six verbatim platform-customised post bodies (~280 lines of operator-actionable content) being the FR's primary load-bearing artefact. Every §1 MUST has a verifiable AC (scripted or human-checked); every cross-FR coordination (LAUNCH-001 upstream gating + response patterns, BRAND-002 taxonomy, BRAND-003 visuals, CORE-001 dsaf.dev/card, DOCS-001/003 surface URLs, CONTENT-001 downstream feed) is explicit. The 4h elapsed-time budget + per-platform customisation + sized engagement ranges + per-platform SLA together form the operational gates that scale Show HN trajectory into multi-platform launch visibility without sacrificing platform-specific community norms. **Score = 10/10.**

---

*End of FR-LAUNCH-002 audit.*
