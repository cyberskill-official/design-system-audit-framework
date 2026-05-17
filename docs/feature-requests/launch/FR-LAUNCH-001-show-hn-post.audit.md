---
fr_id: FR-LAUNCH-001
audited: 2026-05-17
verdict: PASS (after revision)
score_pre_revision: 7.5/10
score_post_expansion: 9/10
score_post_revision: 10/10
issues_resolved: 7
template: dsaf-spec@1
---

## §1 — Verdict summary

The post-revision spec runs ~960 lines covering the Show HN submission (verbatim plan-recommended title formula, Tue-Wed 8-10am PT window), the founder's first-comment discipline (≤5 min post-submission with extended context links), the 30/90/240-minute response SLA across 4 windows, 8 response-pattern templates + 8 anti-patterns, 6 kill-switch conditions with explicit pause-actions, the pre-launch URL verification at T-15 min, the `post-hn-feedback.md` tracking file template feeding FR-CONTENT-001 deep-dives, vote-manipulation + astroturfing bans, the dependency-chain gate (FR-DOCS-001/002/003 all at 10/10 before posting), and the ChangeLog update post-launch. It has 15 §1 normative clauses, 19 acceptance criteria, 13 failure-mode rows, 7 open questions resolved, 8 implementation notes. Length is above the 700-line target — justified by the verbatim post text + response-playbook bodies in §3 (~380 lines of operator-actionable content). All 7 findings resolved. **Score = 10/10.**

## §2 — Findings (all resolved)

### ISS-001 — Body character count limit verification command brittle
Pre-revision §5 AC4 used `awk` to extract the "Show HN body" section + `tr -d '\n' | wc -c`. But `wc -c` counts bytes including any leading/trailing whitespace from `awk` extraction. A reviewer might get a count ~830 (correct) or ~850 (with awk's added newlines counted) depending on the awk implementation. **Resolved:** the verification command in §5 stays; §11 implementation notes acknowledges the ~5-10 char tolerance; the discipline is "stay well under 1,000 chars," not "hit exactly 830." Pattern: §8.6b (verification command tolerance for shell-implementation differences).

### ISS-002 — Tuesday-vs-Wednesday window choice rationale missing
Pre-revision §1 #2 said "Tuesday OR Wednesday 8-10am PT" but didn't say how the operator chooses between them. Both are good days; which one is better? **Resolved:** §9 Q4 partially addresses (holiday weeks); §11 implementation note "About the founder's local time" addresses scheduling logistics. The actual Tue-vs-Wed choice is operator-discretion based on (a) availability of the founder for the 8-hour response window post-submission, (b) competing Show HN submissions in the same week's pipeline (Wednesday may be quieter if a major launch lands Tuesday). The discretion is logged in the PR description per AC19. Pattern: §3.6 rule 18 (operator-discretion documented; deterministic-where-possible, judgement-where-needed).

### ISS-003 — Response-pattern templates may not cover all comment categories
Pre-revision §3 provided 8 response patterns. But a Show HN thread can produce dozens of comment types — what if a critic surfaces a category not in the 8 patterns? **Resolved:** §3 Pattern 2 ("limitation NOT in 'What we got wrong'") is the catch-all for novel critique — surface acknowledgement + "longer thought needed; will follow up." §11 implementation note "About response patterns 7 + 8" addresses the specific edge cases (tag-back, no-substance hostility). The 8 patterns cover the load-bearing categories; novel critique routes through Pattern 2. Pattern: §8.5b (escape-hatch pattern for novel-comment categories).

### ISS-004 — Kill-switch condition #6 (founder mental state) is self-reported
Pre-revision §3 kill-switch condition #6 was "the founder's mental state degrades" with the signal "typing draft responses that violate the anti-patterns above." But self-detection of degradation is exactly what doesn't work when degraded. **Resolved:** §10 failure-mode row "Kill-switch fires but founder doesn't notice" adds the recommendation: "reviewer who's not the founder also monitors the first 4 hours and pings the founder if a kill-switch trigger appears." A second observer (a co-founder, a friend, an FR-GOV-002 future co-maintainer) is the structural mitigation for self-monitoring failure. Pattern: §8.3a (state-transition with self-CAS-check insufficient; external observer needed).

### ISS-005 — Founder's local time (Vietnam UTC+7) operational burden under-discussed
Pre-revision §1 #2 said "8-10am PT (regardless of the founder's actual location)" but didn't address the operational burden. 8-10am PT = 11pm-1am Vietnam — the founder is launching at midnight local time. **Resolved:** §11 implementation note "About the founder's local time" makes this explicit — deliberate inconvenience the founder takes on for trajectory; clear the calendar 8 hours; have caffeine + playbook + phone-monitoring; alternative (local-time-convenient window) costs trajectory. Pattern: §3.4 rule 12 (operational burden documented; not glossed over).

### ISS-006 — AC10 "≥ 6 response patterns" count off-by-one risk
Pre-revision AC10 said `≥ 6` response patterns; §3 body provides 8. The "≥ 6" threshold is conservative but a future operator might prune to exactly 6 and still pass the AC, losing the catch-all Pattern 2 and the community-norm Patterns 7-8. **Resolved:** §5 AC10 verification stays at `≥ 6` (the threshold is right for the discipline); §11 implementation note "About response patterns 7 + 8" makes them explicitly load-bearing (don't prune below 8 in practice). The discipline is "have all 8; verify at least 6 present at AC time" — adequate. Pattern: §3.10 rule 29 (numeric threshold + load-bearing items both documented).

### ISS-007 — Post-launch FR-CONTENT-001 coordination ambiguous timing
Pre-revision §1 #10 + §6 step 8 said the tracking file "feeds FR-CONTENT-001 (P2 weekly deep-dives)." But P2 is months 3-6; the Show HN thread is at hour 12 of P1. The "feed into FR-CONTENT-001" timing isn't immediate. **Resolved:** §6 step 8 explicit T+48h timing; §11 implementation note "The tracking file is the launch's institutional memory" — patterns surfacing in the file become the next 12 weeks of FR-CONTENT-001 deep-dive topics. The connection is asynchronous but the discipline of capturing patterns is immediate. Pattern: §8.5b (downstream FR coordination explicit despite asynchronous timing).

## §3 — Resolution

All 7 mechanical concerns addressed:

- §5 AC4 verification command tolerance documented in §11.
- §11 + §9 Q4 + AC19 cover Tue-vs-Wed operator-discretion.
- §3 Pattern 2 + §11 patterns 7-8 cover novel-comment + edge cases.
- §10 failure-mode row + §11 second-observer pattern address kill-switch self-detection.
- §11 explicit on Vietnam UTC+7 operational burden.
- §3 + §11 reinforce 8-pattern load-bearing despite AC10 ≥ 6.
- §6 step 8 + §11 explicit on FR-CONTENT-001 asynchronous feed.

The post-revision FR runs ~960 lines, above the 700-line target — justified by §3's verbatim post text + 8 response templates + 8 anti-patterns + 6 kill-switch conditions + tracking file template being operator-actionable content (~380 lines of ship-ready ops). Every §1 MUST has a verifiable AC (scripted or human-checked); every cross-FR coordination (DOCS-001/002/003 upstream, LAUNCH-002/003/004 downstream, GOV-001 + CONTENT-001 lateral) is explicit. The 30-minute response SLA + gracious-engagement discipline + kill-switch safety net + dependency-chain gate together form the operational gates that convert a Show HN submission into top-quartile trajectory. **Score = 10/10.**

---

*End of FR-LAUNCH-001 audit.*
