---
fr_id: FR-LAUNCH-004
audited: 2026-05-17
verdict: PASS (after revision)
score_pre_revision: 8/10
score_post_expansion: 9/10
score_post_revision: 10/10
issues_resolved: 6
template: dsaf-spec@1
---

## §1 — Verdict summary

The post-revision spec runs ~870 lines covering the T-7-to-T-5-days personal heads-up outreach to 10 named individuals from FR-GOV-001's shortlist (informational + substantive question, NOT vote-asking), per-recipient personalisation guidance with 10 example tie-ins, the ~1,600-char email template, three response modes (no-response / will-look / substantive-engagement) with MEMORY.md update patterns per mode, the single-follow-up-at-T-3 discipline (no chase beyond), the 15-min call offer, the negative-competitor-framing ban, the decoupling disclosure consistent with FR-BRAND-004, and the shortlist-column extension distinguishing heads-up status from endorsement-outreach status. It has 15 §1 normative clauses, 15 acceptance criteria, 12 failure-mode rows, 7 open questions resolved, 8 implementation notes. Length is above the 700-line target — justified by §3's per-recipient personalisation examples (10 reviewers × ~3 lines each) + verbatim email template + response handling per mode (~300 lines of operator-actionable content). All 6 findings resolved. **Score = 10/10.**

## §2 — Findings (all resolved)

### ISS-001 — FR-GOV-001 + FR-LAUNCH-004 consolidated-note discipline ambiguous
Pre-revision §1 #1 said heads-up "status is independent" of endorsement-outreach status, but didn't explain how to handle recipients who are in FR-GOV-001 `quote-published` state — do they get a standard heads-up + the substantive question even though they've already engaged deeply? **Resolved:** §9 Q3 explicitly addresses — recipients in `quote-published` get a consolidated note ("thanks again for the quote — launch goes live Tue; here are the links"). The note structure is condensed; the substantive question is skipped (they answered implicitly via endorsement). §11 implementation note "About the consolidated note for FR-GOV-001 quote-published recipients" reinforces the discipline. Pattern: §3.3 rule 9 (cross-FR coordination explicit for shared-shortlist scenarios).

### ISS-002 — Vote-manipulation surface assertions sprawl across §1 + §3.5 anti-patterns
Pre-revision §1 #3 + §1 #6 + §3.5 anti-patterns all enumerate vote-manipulation ban with slight wording variations. The redundancy is fine for emphasis but a future operator could mis-read one statement as the canonical and miss the others. **Resolved:** §1 #3 + §3.5 anti-patterns are aligned with the same enumeration (upvote / share / amplify / retweet / forward). The discipline is unified; the redundancy reinforces the firm-ban posture. AC6 verification command covers all variants. Pattern: §3.8 rule 24 (rule consistency across statement surfaces).

### ISS-003 — Per-recipient research scan time (3-5 min) may be optimistic
Pre-revision §3.2 said "5-min personalisation" + §11 said "5-min-per-email"; §3.2 broke it down to "3-5 min" for scan + 2-3 min for tie-in + 1-2 min for template adaptation = 6-10 min. The discipline is consistent but the math implies the 5-min total is a stretch. **Resolved:** §11 implementation note "The 5-min-per-email personalisation is the discipline that scales" acknowledges — actual time may be 5-10 minutes per email; the 5-min target is a discipline gate (forces efficiency); the 50-min total for 10 emails is the right rough envelope. The variance is acceptable; the discipline is "don't skip personalisation under time pressure." Pattern: §3.4 rule 12 (effort estimate with realistic variance documented).

### ISS-004 — 10-recipient roster expectation for all-10-personalised
Pre-revision §1 #1 + §3.1 imply all 10 individuals get personalised heads-up. But realistically the operator may run out of time for some, or find that a recipient is genuinely unreachable, or have a recipient who's clearly conflicted. **Resolved:** §3.4 mode (i) handling explicit on "not contacted" status (acceptable if a recipient is genuinely out of scope at outreach time); §10 failure-mode row "Heads-up email lands in spam folder" addresses the unreachable case; §11 note implicitly acknowledges 10 is the target, not the floor. The operator MAY skip 1-2 of the 10 if blocked, with the skip logged in the shortlist. Pattern: §3.6 rule 18 (target-with-grace-degradation explicit).

### ISS-005 — Email template character count drift across iterations
Pre-revision AC4 capped at "≤ 2,000 chars"; §3.3 template character count noted "~1,600 chars" + the personalisation tie-in adds variable length. A personalised version with a longer tie-in could push past 2,000. **Resolved:** AC4 stays at ≤ 2,000 (gives 400-char buffer for tie-in); §3.3 base template at ~1,600; operator's tie-in budget is ~400 chars. If a particular recipient requires a longer tie-in, the operator may exceed but should track it (longer emails get skimmed; the 2,000-char ceiling is a discipline gate). Pattern: §3.10 rule 29 (numeric cap with documented headroom for variance).

### ISS-006 — Substantive question discipline lacks recovery for "no good question"
Pre-revision §1 #4 + §3.2 said substantive questions are tied to recipient's expertise. But sometimes a recipient's recent work isn't easily DSAF-tied (they've been writing about something else entirely). What's the operator's fallback? **Resolved:** §11 implementation note "About the substantive-question discipline" explicit — the question is the most-skippable element under time pressure but the most-load-bearing for relationship; don't skip; spend the extra 3-5 minutes finding one rather than sending without. If a recipient's recent work doesn't suggest a question, the fallback is a wider scan (their previous 12 months of work, not just last 1-2 pieces). Pattern: §8.5b (qualitative discipline with recovery path documented).

## §3 — Resolution

All 6 mechanical concerns addressed:

- §9 Q3 + §11 explicit on consolidated-note discipline for FR-GOV-001 quote-published recipients.
- §1 + §3.5 anti-patterns aligned on vote-manipulation ban enumeration.
- §11 acknowledges 5-10-min variance in personalisation time; 50-min total envelope is realistic.
- §3.4 + §10 + §11 handle 10-recipient-as-target-not-floor degradation.
- AC4 + §3.3 documented headroom for personalised tie-in within 2,000-char cap.
- §11 explicit on substantive-question recovery (wider scan as fallback; never skip).

The post-revision FR runs ~870 lines, above the 700-line target — justified by §3's verbatim email template + 10 per-recipient personalisation examples + 3 response-mode handling templates + 6 anti-patterns being operator-actionable content (~300 lines of ship-ready ops). Every §1 MUST has a verifiable AC (scripted or human-checked); every cross-FR coordination (LAUNCH-001 timing anchor, DOCS-003 + GOV-001 upstream, CONTENT-001 + GOV-002 + CONTENT-003 + AUDIT-001 downstream relationship continuity) is explicit. The T-7-day timing + 50-min founder budget + single-follow-up discipline + 3 response modes + MEMORY.md continuity form the operational gates that build the 10-person personal-network amplification surface without crossing into vote-manipulation territory. **Score = 10/10.**

---

*End of FR-LAUNCH-004 audit.*
