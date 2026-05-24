---
fr_id: FR-GOV-002
audited: 2026-05-17
verdict: PASS (after revision)
score_pre_revision: 8/10
score_post_expansion: 9/10
score_post_revision: 10/10
issues_resolved: 6
template: dsaf-spec@1
---

## §1 — Verdict summary

The post-revision spec runs ~990 lines covering co-maintainer recruitment from European OR US design-systems community (the geography-headwind countermove), the 3-artefact ship (charter + shortlist + announcement template), sequential outreach discipline (top-1 first), OSS-volunteer-equivalent role with rights (Maintain access, governance vote, blog authorship, speaking-slot revenue share, public recognition, co-author credit) + responsibilities (RFC review, PR review, deep-dive cadence-share, public representation), 12-month minimum commitment + 30-day exit clause, conflict-of-interest policy with 3+ specific scenarios, decision-making rules for 2-maintainer + future 3+ maintainer governance, public announcement post co-signed by both maintainers, README + CONTRIBUTING + decoupling-decision.md patches post-acceptance, MEMORY.md continuity per relationship state, and the no-public-pre-acceptance gate. It has 15 §1 normative clauses, 17 acceptance criteria, 12 failure-mode rows, 7 open questions resolved, 8 implementation notes. Length is above the 700-line target — justified by §3's verbatim charter + shortlist template + announcement template + 3 patches being operator-actionable governance ops (~400 lines of ship-ready content). All 6 findings resolved. **Score = 10/10.**

## §2 — Findings (all resolved)

### ISS-001 — Conflict-of-interest with day-job employer being a DSAF competitor
Pre-revision §1 #1 + §3 charter "Conflict of interest" mentioned cross-company collaborations but didn't explicitly address what happens if a candidate works for a direct DSAF competitor (zeroheight, Knapsack, Supernova). The charter's recusal model + the §11 implementation note address operationally, but the FR could be clearer on whether to *recruit* such candidates at all. **Resolved:** §11 implementation note "About co-maintainer's day-job conflict patterns" explicit — patterns (a) day-job at marquee-DS owner (Adobe/GitHub) is acceptable with disclosure; (b) day-job independent is minimal-conflict; (c) day-job at SaaS competitor is high conflict and *discouraged at recruitment time*. The shortlist filtering naturally avoids the third pattern. Pattern: §3.4 rule 14 (conflict-of-interest at recruitment-filter level, not just post-hoc).

### ISS-002 — 1-1 split decision-making with only 2 maintainers
Pre-revision §3 charter "Decision-making" section said ≥ 2/3 maintainer consensus for cross-cutting decisions. With 2 maintainers, 2/2 is the only consensus possible; a 1/1 split has no resolution mechanism. **Resolved:** §3 charter "Decision-making" amended explicit on 1/1 split — "if 1/1 split (only 2 maintainers), the framework defaults to status-quo + escalates to a 3rd-maintainer recruitment or operator-discretion override after 30-day deliberation period." The escalation mechanism prevents deadlock; the 30-day period gives time for substantive discussion. Pattern: §3.5 rule 17 (decision-making with 2-maintainer edge case + escalation path).

### ISS-003 — Speaking-slot revenue share calculation ambiguous for shared travel
Pre-revision §3 charter said "honoraria + travel reimbursement shared equitably." For one-attends scenarios, the attendee gets full honorarium + their own travel. For both-attend, "split per pre-conference agreement." The latter is operator-discretion but the FR could be clearer. **Resolved:** §11 implementation note "About speaking-slot revenue share" explicit — typical honorarium $500-$2,000; per-conference split negotiable (e.g., 60/40 if one travels, 50/50 if both attend). §3 charter retains the "per pre-conference agreement" framing; §11 provides operator guidance. Pattern: §3.6 rule 18 (financial reciprocity with operator-discretion + guidance).

### ISS-004 — Sequential outreach window if all candidates take long to respond
Pre-revision §1 #4 + §3 said sequential outreach + 2-6 weeks elapsed per candidate; ~3-5 candidates → potential 10-30 weeks total to land a co-maintainer. The P2 window is only 12-26 weeks; if outreach exhausts the shortlist, the FR might miss P2 close. **Resolved:** §9 Q7 + §10 failure-mode row + §11 implementation note explicit — pause + reflect + expand shortlist post-launch reader engagement; revisit P3 or FR-GOV-003 P6 RFC formal-recruitment if all P2 candidates decline. The FR's success criterion is "recruit if possible in P2" not "must recruit by P2 close." Pattern: §3.6 rule 18 (target with graceful degradation if unmet).

### ISS-005 — IRS/legal complications of cross-border OSS-volunteer relationships
Pre-revision §1 #5 + #6 + §11 mentioned IRS/legal complications. But specific guidance was thin. A founder facing this in practice may need more concrete handling. **Resolved:** §11 implementation note "The charter's 'OSS-volunteer-equivalent' framing is non-negotiable for IRS/legal reasons" explicit — formal employment requires registering as employer + withholding per jurisdictions; OSS-volunteer model is established precedent (Apache, Linux Foundation); the framework uses it for compliance + simplicity. The §3 charter "Role overview > does NOT include" disclaimer reinforces. For specific scenarios (co-maintainer in US/EU/etc.), the founder may consult cross-border tax advisor; that's outside the FR's scope. Pattern: §3.7 rule 21 (legal-adjacent framing with explicit limitation of FR scope).

### ISS-006 — Co-maintainer's public disagreement on contentious topics
Pre-revision §3 charter "Decision-making" said disagreements work via RFC + dialogue. But what if a co-maintainer publicly disagrees with the founder on Twitter/blog OUTSIDE the RFC cycle? **Resolved:** §10 failure-mode row "Co-maintainer publicly disagrees with the founder on a contentious topic" + charter Decision-making + Amendment processes provide the structure. Public disagreement is acceptable IF via the RFC cycle (FR-GOV-003) rather than ad-hoc Twitter wars. The disposition shifts based on whether the disagreement is substance (RFC-routed = OK) or process (ad-hoc = governance issue requiring discussion). Pattern: §8.5b (boundary case clarified with acceptability rubric).

## §3 — Resolution

All 6 mechanical concerns addressed:

- §11 + §3 conflict-of-interest section explicit on day-job competitor as recruitment-filter (not post-hoc).
- §3 Decision-making amended with 1/1 split → 30-day deliberation + 3rd-maintainer-recruit escalation.
- §11 explicit on speaking-slot revenue calculation per-conference negotiable.
- §9 Q7 + §10 + §11 acknowledge sequential outreach may exhaust shortlist; FR-GOV-003 P6 RFC formal-recruitment is the escalation path.
- §11 + §3 charter "Role overview > does NOT include" reinforce IRS/legal OSS-volunteer-equivalent framing.
- §10 + charter Decision-making clarify public-disagreement boundary (RFC-routed = OK; ad-hoc = governance issue).

The post-revision FR runs ~990 lines, above the 700-line target — justified by §3's verbatim charter (~200 lines of role definition) + shortlist template (~80 lines) + announcement template (~110 lines) + README/CONTRIBUTING/decoupling-decision.md patches (~50 lines) = ~440 lines of operator-actionable governance ops. Every §1 MUST has a verifiable AC (scripted or human-checked); every cross-FR coordination (GOV-001 shortlist + relationship continuity, LAUNCH-001 launch context, LAUNCH-004 heads-up history, DOCS-001 + BRAND-004 patches, CONTENT-001 cadence-share, AUDIT-001 + GOV-003 P3+P6 downstream, BRAND-002 taxonomy) is explicit. The 8h founder-time + ~6-week elapsed window + sequential outreach + OSS-volunteer charter + 12-month commitment + 30-day exit + co-signed announcement form the operational gates that recruit 1-2 European-or-US co-maintainers as the structural geography-headwind countermove + governance plurality. **Score = 10/10.**

---

*End of FR-GOV-002 audit.*
