---
fr_id: FR-GOV-001
audited: 2026-05-17
verdict: PASS (after revision)
score_pre_revision: 8/10
score_post_expansion: 9/10
score_post_revision: 10/10
issues_resolved: 6
template: dsaf-spec@1
---

## §1 — Verdict summary

The post-revision spec runs ~890 lines covering the 2–3 reviewer floor, the "would value your roast" outreach framing, the 10-person warmth-ranked shortlist with the seed-set from the plan, the outreach + consent-letter + decline-handling playbook, the 2-week elapsed-time window, the holding-file model (quotes land in `reviewer-quotes-pending.md` before FR-DOCS-002 commits them to README), the 3 decline modes, the geography-headwind transparency, the MEMORY.md relationship CRM discipline, and the FR-DOCS-002 / FR-LAUNCH-001 / FR-LAUNCH-004 downstream coordination. It has 15 §1 normative clauses, 14 acceptance criteria, 12 failure-mode rows, 7 open questions resolved, 8 implementation notes. Length is above the 700-line target — justified by the §3 outreach email template + consent letter + decline-handling templates being verbatim operator playbook (~250 lines of ship-ready content). All 6 findings resolved. **Score = 10/10.**

## §2 — Findings (all resolved)

### ISS-001 — AC validation window ambiguity
Pre-revision AC5 said "at least 2 reviewers in `replied-positive` or `quote-approved` status — within the FR's outreach window (2 weeks elapsed)." But PR land time and outreach-window close are different events; an operator landing the PR at Day 7 (mid-outreach) would fail AC5 even if the framework is on track. **Resolved:** §5 AC5 verification reframed as `WARN` (not `FAIL`) — the AC validates at the *outreach-window close*, not at PR land. The PR description's snapshot (AC14) handles the in-flight status reporting. §11 implementation note "About AC5's elapsed-window check" makes the distinction explicit. Pattern: §8.5b (AC timing matched to the right operational milestone).

### ISS-002 — FR-LAUNCH-004 (distinct outreach) coordination not enumerated
Pre-revision §7 listed FR-LAUNCH-004 as "coordinated" but didn't specify how this FR's outreach differs from FR-LAUNCH-004's. Plan §Phase 1 action 4 specifies "Personal outreach to 10 named individuals before launch with a heads-up" — that's FR-LAUNCH-004 at T-7 days. This FR is at T-14 to T-28 days asking for *endorsement quotes*. Two distinct asks; without clarity, an operator might collapse them. **Resolved:** §11 implementation note "Why outreach 1-2 weeks pre-launch, specifically" disambiguates: FR-GOV-001 = T-14 to T-28 days, asking for endorsement quotes; FR-LAUNCH-004 = T-7 days, asking for heads-up. The two outreaches are distinct in framing + timing; FR-LAUNCH-004 follows FR-GOV-001 by ~1 week. Pattern: §3.3 rule 9 (outreach FRs enumerate the distinct ask + framing).

### ISS-003 — Holding-file path + privacy not codified
Pre-revision AC6 + AC9 referenced `internal/branding/reviewer-quotes-pending.md` as the holding file but didn't say whether it's repo-public or repo-private (`.gitignore`'d). Quotes pending consent ARE sensitive — publishing them prematurely is the failure mode §10 names. **Resolved:** AC6 wording amended ("gitignored or repo-private until FR-DOCS-002 commits them to README"); §11 implementation note "About AC5's elapsed-window check" carries the implication. The operator decides per their repo's setup; the discipline is "don't publish names without consent in writing." Pattern: §8.5a (PII / consent boundary at file-storage level).

### ISS-004 — Shortlist "warmth" score (1–5) lacked anchor definitions
Pre-revision §3 shortlist had a "Warmth (1–5)" column but didn't define what each number means. Different operators would calibrate differently — a "5" for one operator is a "3" for another. **Resolved:** §3 "Re-ranking criteria (warmth-first)" section provides 5 ranking dimensions (existing rapport, mutual connections, topical alignment, geographic/cultural fit, response history). The 1–5 score is a *judgement-rolling-up-multiple-dimensions* number; the dimensions are the audit-trail. §11 implementation note "The warmth-first ranking is non-obvious" addresses the operator-intuition gap. Pattern: §8.5b (qualitative metric with explicit rolling-up criteria).

### ISS-005 — Decline-handling "(iii) Quote but private" anti-pattern handling
Pre-revision §3 decline-handling (iii) said "the quote is logged in a private file (NOT in the public repo)." But what private file? Where? How long is it kept? The mechanics weren't enumerated. **Resolved:** §3 decline-handling (iii) keeps the "private file" framing; §11 implementation note "The 'Quote but private' decline mode is underused but valuable" adds operational guidance — these quotes live in a separate file (operator's choice — could be their personal notes, a private repo, encrypted local file), and serve fundraising / partnership contexts. MEMORY.md tracks the boundary so future outreaches don't accidentally make a private quote public. Pattern: §3.6 rule 21 (PII / consent boundary at MEMORY.md level).

### ISS-006 — Plan name list (10 individuals) — not all DSAF-actionable for this FR
Pre-revision §3 "Seed set from the plan" listed all 10 named individuals from the plan §"Phase 1 action 4." But that list was specifically for FR-LAUNCH-004's heads-up outreach, not necessarily FR-GOV-001's endorsement outreach. Some of the 10 (e.g., Luke Murphy at zeroheight) might be conflicted from endorsing a framework that competes with zeroheight's audit-tab beta. **Resolved:** §3 seed set retains the 10 names but the table cell "Why DSAF-relevant" prompts the operator to consider conflict-of-interest per reviewer. §9 Q5 covers the "what if no one in the seed set responds" question; §10 failure-mode row "Reviewer demands paid compensation" covers the related conflict cases. The operator is empowered to remove conflicted names from the active outreach (e.g., NOT contacting Luke Murphy for endorsement; saving him for a different kind of relationship-building). Pattern: §3.3 rule 9 (operator agency in named-target lists; conflict-of-interest consideration explicit).

## §3 — Resolution

All 6 mechanical concerns addressed:

- §5 AC5 verification reframed as `WARN` to validate at outreach-window close, not PR land.
- §11 implementation note disambiguates FR-GOV-001 (T-14 to T-28) from FR-LAUNCH-004 (T-7).
- AC6 wording allows holding file to be gitignored / repo-private; §11 carries the implication.
- §3 shortlist provides 5 ranking dimensions for the warmth score; §11 addresses the warmth-first intuition.
- §3 "(iii) Quote but private" decline mode operationally framed; §11 + MEMORY.md tracks the boundary.
- §3 seed-set table prompts conflict-of-interest review per reviewer; §9 + §10 + §11 cover the related cases.

The post-revision FR runs ~890 lines, above the 700-line target — justified by the verbatim operator-playbook content in §3 (outreach email template, consent letter template, decline-handling, response timeline = ~250 lines of ship-ready ops). Every §1 MUST has a verifiable AC (some validated at PR land, some at outreach-window close, some at FR-DOCS-002 land — explicit timing per AC). Every cross-FR coordination (BRAND-002, CORE-001, CORE-004, DOCS-001, DOCS-002, LAUNCH-001, LAUNCH-004, GOV-002 placeholder) is explicit. The 2-week elapsed-time + ~6 founder-hour cost model is realistic. **Score = 10/10.**

---

*End of FR-GOV-001 audit.*
