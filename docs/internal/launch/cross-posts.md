# Cross-posts for DSAF launch

**Status:** launch-ready runbook.
**task:** TASK-LAUNCH-002.

## Sequencing

If Show HN uses the preferred slot from `show-hn-post.md` (Tuesday, 2026-05-19, 08:30 PDT / 22:30 ICT), use this concrete schedule:

| Platform | Pacific Time | Asia/Ho_Chi_Minh |
|---|---|---|
| r/web_design | Tuesday, 2026-05-19, 12:30 PDT | Wednesday, 2026-05-20, 02:30 ICT |
| r/UXDesign | Tuesday, 2026-05-19, 14:30 PDT | Wednesday, 2026-05-20, 04:30 ICT |
| r/programming | Tuesday, 2026-05-19, 16:30 PDT | Wednesday, 2026-05-20, 06:30 ICT |
| Lobste.rs | Tuesday, 2026-05-19, 18:30 PDT | Wednesday, 2026-05-20, 08:30 ICT |
| daily.dev | Tuesday, 2026-05-19, 20:30 PDT | Wednesday, 2026-05-20, 10:30 ICT |
| Designer News | Tuesday, 2026-05-19, 20:30 PDT | Wednesday, 2026-05-20, 10:30 ICT |

If Show HN slips to the Wednesday fallback, keep the same offsets and move each row exactly one day later.

| Platform | Offset from Show HN | Standing required | Primary framing |
|---|---:|---|---|
| r/web_design | T+4h | established Reddit account | practical visual audit artifact |
| r/UXDesign | T+6h | established Reddit account | UX maturity and research/metrics angle |
| r/programming | T+8h | established Reddit account | markdown rubric, scripts, agent workflow |
| Lobste.rs | T+10h | existing account | implementation and methodology trade-offs |
| daily.dev | T+12h | existing account | developer-tooling headline |
| Designer News | T+12h | existing account | design-systems conversation |

## Engagement ranges

| Platform | Low | Mid | High |
|---|---:|---:|---:|
| r/web_design | 50 | 200 | 600 |
| r/UXDesign | 30 | 120 | 300 |
| r/programming | 20 | 80 | 200 |
| Lobste.rs | 10 | 35 | 80 |
| daily.dev | 20 | 70 | 150 |
| Designer News | 10 | 40 | 100 |

## SLA

Reddit: respond within 2 hours for the first 4 hours, then 4 hours through hour 24.
Lobste.rs: respond within 4 hours for the first 12 hours.
daily.dev and Designer News: respond as available.
Use the response patterns in [`show-hn.md`](./show-hn.md).

## Platform bodies

### r/web_design

Title: `DSAF-25: a one-page scorecard for design-system audits`

Body: `I built DSAF as an open-source rubric for auditing design-system maturity. The practical starting point is the one-page DSAF-25 Core card: https://audit.cyberskill.world/card. Full repo: https://github.com/cyberskill-official/design-system-audit-framework. Launch note: https://audit.cyberskill.world/blog/launch-2026. I would value critique on whether the card captures the right daily-practice signals.`

### r/UXDesign

Title: `A design-system maturity rubric that includes the UX the system produces`

Body: `DSAF scores both the system and the UX outcomes it supports: research, IA, interaction, content, accessibility, trust, and metrics. Core card: https://audit.cyberskill.world/card. Repo: https://github.com/cyberskill-official/design-system-audit-framework. Origin note: https://audit.cyberskill.world/blog/launch-2026. I am especially interested in critique from teams that already run design crits or maturity reviews.`

### r/programming

Title: `DSAF: markdown-native design-system audits with scripts and LLM prompts`

Body: `DSAF is a zero-dependency, markdown-first audit method for design systems. It ships prompts, templates, and check scripts rather than a hosted app. Core card: https://audit.cyberskill.world/card. Repo: https://github.com/cyberskill-official/design-system-audit-framework. Launch note: https://audit.cyberskill.world/blog/launch-2026.`

### Lobste.rs

Title: `DSAF: an open rubric for design-system audits`

Body: `The technical bit: stable markdown output, machine-readable criteria rows, no-silent-regression policy, and zero-dependency scripts for link, contrast, bundle, and doc checks. Core card: https://audit.cyberskill.world/card. Repo: https://github.com/cyberskill-official/design-system-audit-framework. Launch note: https://audit.cyberskill.world/blog/launch-2026.`

### daily.dev

Title: `Open-source design-system audits with DSAF`

Body: `DSAF gives teams a criteria-based audit path for tokens, components, docs, governance, accessibility, performance, and AI-agent readiness. Core card: https://audit.cyberskill.world/card. Repo: https://github.com/cyberskill-official/design-system-audit-framework. Launch note: https://audit.cyberskill.world/blog/launch-2026.`

### Designer News

Title: `DSAF-25: one-page maturity scorecard for design systems`

Body: `I made DSAF-25 as the fast entry point to a larger audit rubric. It is meant to be printable, arguable, and useful in a design-system review. Card: https://audit.cyberskill.world/card. Repo: https://github.com/cyberskill-official/design-system-audit-framework. Launch note: https://audit.cyberskill.world/blog/launch-2026.`

## Rules

- No vote manipulation language.
- No reposting after moderator removal.
- No paid CTA.
- Canonical URLs stay `audit.cyberskill.world/card`, the GitHub repo, and the launch note.
- Mention Show HN only near the end of a body after the HN URL exists.
- Track every posted URL and top critique pattern in `internal/launch/post-hn-feedback.md`.

*End of cross-post runbook.*
