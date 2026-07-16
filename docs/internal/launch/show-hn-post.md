---
title: "Show HN: DSAF – open-source maturity rubric for design systems"
canonical_title: "Show HN: DSAF – open-source maturity framework for design systems (L0–L5, 125 criteria, agent-native)"
url: https://github.com/cyberskill-official/design-system-audit-framework
scheduled_window: "Tuesday or Wednesday, 08:00-10:00 Pacific Time"
earliest_candidate_slot: "2026-05-19 08:30 PDT / 2026-05-19 22:30 ICT"
fallback_candidate_slot: "2026-05-20 08:30 PDT / 2026-05-20 22:30 ICT"
status: repo-ready
external_blocker: "TASK-DOCS-002 must land at least two consented named quotes before posting, or the operator must explicitly waive that dependency in a launch exception."
---

# Show HN post payload

Use this file as the manual posting source for TASK-LAUNCH-001. Do not post while the external blocker above is still open.

## Operator schedule

Preferred slot: Tuesday, 2026-05-19, 08:30 Pacific Time / Tuesday, 2026-05-19, 22:30 Asia/Ho_Chi_Minh.

Fallback slot: Wednesday, 2026-05-20, 08:30 Pacific Time / Wednesday, 2026-05-20, 22:30 Asia/Ho_Chi_Minh.

If TASK-DOCS-002 is still blocked at T-24h, roll to the next normal Tuesday or Wednesday slot and keep the same local-time conversion rule. In May 2026, Pacific Time is PDT (UTC-7), so Vietnam time is Pacific Time + 14 hours.

## HN title

Use this title unless Stephen intentionally chooses the shorter title after the final T-24h read:

```text
Show HN: DSAF – open-source maturity framework for design systems (L0–L5, 125 criteria, agent-native)
```

Shorter fallback if the title feels too dense in the HN form:

```text
Show HN: DSAF – an open-source rubric for design-system audits
```

## Show HN URL field

```text
https://github.com/cyberskill-official/design-system-audit-framework
```

## Show HN body

```text
DSAF is an open-source rubric for auditing design-system maturity.

It has a 25-row Core for a five-minute read, then a full 125-criterion audit across two halves: Part A scores the system itself (tokens, components, docs, governance, accessibility, performance, AI readiness); Part B scores the UX that system produces (research, IA, interaction, content, heuristics, Core Web Vitals, trust, measurement).

5-minute entry: https://audit.cyberskill.world/card
Repo: https://github.com/cyberskill-official/design-system-audit-framework
Candid launch note: https://audit.cyberskill.world/blog/launch-2026

I am Stephen Cheng, founder of CyberSkill. I would value critique on the category boundaries, the self-audit L3 cap, the no-silent-regression rule, the scoring math, and whether the agent/human handoff is useful or overbuilt.
```

Character count, including line breaks: 842.

## Founder first comment

Post within five minutes after submission.

```text
Author here. Three quick context notes:

- DSAF-25 Core is the share-handle: https://audit.cyberskill.world/card. Read that before the full 125 if you want the five-minute version.
- The CyberSkill worked example is capped at L3 publicly until independent verification exists, even when interior audit scores are higher. That cap is deliberate.
- Named outside-reviewer quotes are consent-gated. The outreach package is ready, but no quote appears until the exact wording and attribution are approved in writing.

Roasts welcome, especially on overlap between criteria. If a row feels impossible to evaluate in a real organization, I would rather learn that now than defend it later.
```

## T-15 minute verification

Run these checks immediately before posting.

```bash
curl -sI https://audit.cyberskill.world/
curl -sI https://audit.cyberskill.world/card
curl -sI https://audit.cyberskill.world/blog/launch-2026
curl -sI https://github.com/cyberskill-official/design-system-audit-framework
curl -sI https://audit.cyberskill.world/assets/og/launch-2026-1200x630.png
```

Required result: HTTP 200 for all five URLs. If any URL fails, do not post.

Open the blog URL in a browser and confirm:

- The page renders without horizontal clipping.
- The L0-L5 ladder and radar image load.
- The social preview image is referenced in `og:image`.
- The post still contains no fabricated endorsement quotes.

## Post-launch updates

After the HN item is live:

- Paste the HN URL into `internal/launch/post-hn-feedback.md`.
- Add the HN URL to the ChangeLog in `landing/blog/launch-2026.md`.
- Replace the pending Show HN line in any cross-post copy with the real HN discussion URL.
- Start the response cadence in `internal/launch/show-hn-response-playbook.md`.

*End of Show HN post payload.*
