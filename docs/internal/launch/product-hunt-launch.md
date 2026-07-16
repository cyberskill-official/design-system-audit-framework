---
title: "Product Hunt launch - DSAF"
task: TASK-LAUNCH-003
status: repo-ready
external_blocker: "Requires hunter confirmation or explicit self-submit decision, plus production blog/OG deploy."
preferred_launch: "2026-05-20 00:01 PDT / 2026-05-20 14:01 ICT if Show HN posts 2026-05-19"
---

# Product Hunt Launch

Product Hunt is secondary to Show HN. Run it only after the Show HN surface is stable and the production blog/gallery assets resolve.

## Listing Copy

| Field | Value |
|---|---|
| Product name | `DSAF` |
| Title | `DSAF - Open-source design system maturity rubric` |
| Tagline | `Audit a design system with criteria, not vibes` |
| Description | `Open-source rubric for design-system maturity. 25-row Core fits on one page; full 125 criteria support signed audits. Markdown-native, agent-ready, MIT licensed. No SaaS lock-in.` |
| Product URL | `https://github.com/cyberskill-official/design-system-audit-framework` |
| Website URL | `https://audit.cyberskill.world/` |
| Topics | `Design Tools`, `Open Source`, `Developer Tools` |

## Schedule

Preferred launch if Show HN posts Tuesday, 2026-05-19:

| Moment | Pacific Time | Asia/Ho_Chi_Minh | Action |
|---|---|---|---|
| T-7d | Already due | Already due | Hunter outreach should already be sent; if not, send immediately. |
| T-3d | Already due | Already due | Decide hunter vs self-submit. |
| T-1d | Tuesday, 2026-05-19, 18:00 PDT | Wednesday, 2026-05-20, 08:00 ICT | Final URL and gallery preflight. |
| Launch | Wednesday, 2026-05-20, 00:01 PDT | Wednesday, 2026-05-20, 14:01 ICT | Hunter or Stephen submits. |
| T+15m | Wednesday, 2026-05-20, 00:16 PDT | Wednesday, 2026-05-20, 14:16 ICT | Maker first comment. |
| T+1h | Wednesday, 2026-05-20, 01:01 PDT | Wednesday, 2026-05-20, 15:01 ICT | Ranking and comment check. |
| T+24h | Thursday, 2026-05-21, 00:01 PDT | Thursday, 2026-05-21, 14:01 ICT | Record metrics. |

If Show HN slips to Wednesday, move the PH launch to Thursday, 2026-05-21, 00:01 PDT / 14:01 ICT.

## Gallery Assets

| Slot | File | Dimensions | Verification |
|---|---|---:|---|
| Main thumbnail | `assets/ph/dsaf-thumbnail-1200x630.png` | 1200x630 | rendered from launch OG ladder card |
| Screenshot 1 | `assets/ph/dsaf-radar-screenshot-1200x750.png` | 1200x750 | rendered from canonical radar |
| Screenshot 2 | `assets/ph/dsaf-25-card-screenshot-1200x750.png` | 1200x750 | rendered from DSAF-25 Core card preview |
| Screenshot 3 | `assets/ph/dsaf-readme-screenshot-1200x750.png` | 1200x750 | rendered from README first-screen preview |
| Screenshot 4 | `assets/ph/dsaf-audit-screenshot-1200x750.png` | 1200x750 | rendered from case-study snapshot with L3 public cap |
| Logo | `assets/ph/dsaf-logo-240.png` | 240x240 | rendered from DSAF square logo source |

Source wrappers for the generated gallery images live beside the PNGs in `assets/ph/`.

## Hunter Shortlist

| Priority | Candidate | Evidence | Ask |
|---:|---|---|---|
| 1 | Chris Messina | Product Hunt profile lists him as `#1 Hunter` with a large follower base and many hunts: <https://www.producthunt.com/@Chrismessina> | Ask whether he would hunt a niche OSS methodology launch. |
| 2 | story.to.design launch team | DS-adjacent PH launch in Figma/Storybook space, 250 points, #4 day rank: <https://www.producthunt.com/products/story-to-design> | Ask for hunter referral or launch advice; not a guaranteed hunter. |
| 3 | Self-submit by Stephen | Fallback if no warm hunter confirms by T-3d | Use the same listing copy and maker comment. |

Do not wait past T-3d for a hunter. If no one confirms, self-submit and lower the target range.

## Hunter Outreach

```text
Subject: Would you hunt DSAF on Product Hunt?

Hi [name],

I'm Stephen Cheng, founder of CyberSkill. I'm launching DSAF, an open-source design-system maturity rubric, on Show HN and Product Hunt this week.

DSAF has a 25-row Core for a five-minute read, a full 125-criterion audit rubric for signed audits, and agent-ready prompts/scripts. It is MIT licensed and intentionally separate from CyberSkill's paid audit services.

Preview: https://audit.cyberskill.world/
Repo: https://github.com/cyberskill-official/design-system-audit-framework
Launch note: https://audit.cyberskill.world/blog/launch-2026

Would you be open to hunting it on Product Hunt on [DATE]? I can send the listing copy, gallery assets, and maker comment in advance. No expectation either way; if it is not a fit, self-submit is the fallback.

Stephen
```

## Maker First Comment

Post within 15 minutes.

```text
Hi PH, Stephen here.

I built DSAF because design-system audits kept becoming taste arguments. DSAF turns that into a public rubric: a 25-row Core for the first read, then 125 criteria across system quality and produced UX for signed audits.

Three things that matter:

1. There is no SaaS lock-in. The method is markdown, scripts, prompts, and evidence.
2. Self-audits cap publicly at L3 until independent verification exists.
3. Critique is the point. If a criterion feels impossible to evaluate in your organization, I want to know.

Five-minute Core: https://audit.cyberskill.world/card
Launch note: https://audit.cyberskill.world/blog/launch-2026
Show HN thread: https://news.ycombinator.com/item?id=<HN_ID_HERE>

Happy to answer questions here.
```

## Day-Of Runbook

| Time | Action |
|---|---|
| T-1h | Confirm Product URL, website URL, all six gallery images, and first comment are ready. |
| T | Hunter or Stephen submits. |
| T+15m | Stephen posts maker first comment. |
| T+1h to T+4h | Reply to substantive comments within 1 hour. |
| T+4h to T+12h | Reply to substantive comments within 2 hours. |
| T+24h | Record Product Hunt URL, votes, comments, rank, and strongest critique in `internal/launch/post-hn-feedback.md`. |

## Blockers

- Do not submit before the production site serves `/blog/launch-2026` and the gallery/OG assets.
- Do not submit if Show HN has been flagged or paused by kill-switch.
- Do not use paid launch services or coordinated voting.
- Do not mention any named endorsement quote until TASK-DOCS-002 is unblocked.

*End of Product Hunt launch pack.*
