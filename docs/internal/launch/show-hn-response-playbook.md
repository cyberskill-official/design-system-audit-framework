---
title: "Show HN response playbook"
fr: FR-LAUNCH-001
status: repo-ready
external_blocker: "Do not start while FR-DOCS-002 is blocked unless Stephen logs an explicit launch exception."
---

# Show HN response playbook

This is the operating manual for the first 24 hours after posting `internal/launch/show-hn-post.md`.

## Response SLA

| Window | Response target | Operating note |
|---|---:|---|
| 0-4 hours | 30 minutes | Stay present. This is the volatile front-page window. |
| 4-12 hours | 90 minutes | Keep answering substantive threads, but stop chasing every reply. |
| 12-24 hours | 4 hours | Capture long-tail concerns and answer the highest-signal comments. |
| 24+ hours | As available | Treat the thread as a historical record. |

## Response patterns

### Pattern 1: real limitation already named in the launch note

Use:

> Yep, that is one of the limitations I am worried about too. The current countermove is [short explanation], but I do not think the answer is final. If you have a sharper example from a real system, I would value it.

### Pattern 2: real limitation not yet named

Use:

> Fair. That is not in the candid limitations section, which probably means I missed it. First read: [2-3 sentence substantive answer]. I am logging this in the post-HN tracker so it can become either a fix or a deep-dive.

### Pattern 3: 125 criteria is too many

Use:

> Agreed for first contact. That is why DSAF-25 Core exists: one page, one or more criteria from every major area. The 125 are for signed audits where the team needs evidence, citations, and repeatability.

### Pattern 4: self-audit cap critique

Use:

> The L3 public cap is meant to make the self-audit less convenient for us, not more. CyberSkill can publish the worked example, but it cannot cite itself as L4 or L5 without independent verification. That rule exists because the consultancy-authored-framework failure mode is predictable.

### Pattern 5: comparison with a SaaS product or maturity model

Use:

> I think the overlap is real, but the operating model differs. DSAF is a repo-native rubric with public criteria and evidence trails. A SaaS platform is better if you need workflow, permissions, SSO, and dashboards. DSAF is better if you want the rubric inspectable and forkable.

### Pattern 6: "AI slop" or agent overreach critique

Use:

> The agent is not the authority. It gathers evidence, runs checks, proposes scores, and flags low-confidence rows. A human signs or rejects. The useful part is the structured handoff, not pretending the model is an auditor.

### Pattern 7: geography or credibility critique

Use:

> Fair to ask how geography affects trust. My answer is to make the rubric public enough that the critique can attach to the artifact instead of the author. If the criteria are wrong, I would rather fix them in public than ask for trust.

### Pattern 8: hostile comment with no substance

Use no reply. If the thread gives it visibility, answer the substantive concern underneath in one calm comment and ignore the tone.

## Anti-patterns

| Avoid | Why it fails | Better move |
|---|---|---|
| "Well actually..." | Reads as condescending | "That's fair. Here is how we got there..." |
| "You did not read the docs" | Blames the reader | "The short version is..." |
| Long defensive replies | Looks like panic | Answer in 2-3 sentences and link to the longer source |
| Thanking without substance | Feels dismissive | Pair thanks with a concrete response |
| Trying to win the thread | Converts critique into a fight | Treat the thread as market research |
| Replying to every nested reply | Drowns the thread | Prioritize top-level and high-signal comments |
| Asking for coordinated support | Violates community norms | Share information only; let readers decide independently |
| Deleting or rewriting live comments quietly | Breaks trust | Add a correction reply if needed |

## Kill switch

Pause cross-posts and Product Hunt scheduling if any condition below fires.

1. A confirmed factual error appears in the rubric, score math, criteria, or launch copy.
2. A legal, licensing, privacy, or accessibility-compliance concern appears and cannot be answered from source docs.
3. A consent issue appears around any reviewer quote or named attribution.
4. More than five independent commenters identify the same load-bearing concern and no prepared response fits.
5. HN moderators flag, remove, or materially change the submission.
6. The site, repo, card, blog post, or OG asset is unavailable during the first four hours.
7. Stephen starts drafting replies that match the anti-patterns table.

Pause action:

1. Stop follow-on posts.
2. Log the trigger in `internal/launch/post-hn-feedback.md`.
3. Verify the claim from source material.
4. Post one calm acknowledgement if the issue is confirmed.
5. Resume only after the recovery action is clear.

## Tracking

Use `internal/launch/post-hn-feedback.md` as the live tracker.

For every substantive thread, capture:

- Comment URL
- Comment summary
- Response URL
- Outcome
- Whether it feeds a fix, a blog ChangeLog entry, or a future weekly deep-dive

## Post-launch handoff

At T+24h:

- Update `landing/blog/launch-2026.md` with the HN discussion URL.
- Summarize the top three critique patterns in `internal/launch/post-hn-feedback.md`.
- Decide whether FR-LAUNCH-002 cross-posting should continue, pause, or change copy based on the thread.

*End of Show HN response playbook.*
