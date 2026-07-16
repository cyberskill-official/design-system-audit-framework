# Guest-Post Pitch Runbook

**task:** TASK-LAUNCH-005  
**Status:** repo-ready; manual pitch submission pending founder email access and a viable launch/editorial window.  
**Canonical pitch drafts:** [`../social/guest-post-pitches.md`](../social/guest-post-pitches.md)

This runbook prepares three distinct editorial pitches for Smashing Magazine, CSS-Tricks, and A List Apart. It does not auto-submit, promise publication, buy placement, or ask editors for launch coverage. Each article must stand on its own as useful editorial work.

## Calendar Reality

If Show HN launches on Tuesday, 2026-05-19 at 08:30 PDT / 22:30 ICT:

| Milestone | Pacific Time | Asia/Ho_Chi_Minh | State |
|---|---|---|---|
| T-8 editorial-safe window opened | Tuesday, 2026-03-24, 08:30 PDT | Tuesday, 2026-03-24, 22:30 ICT | missed |
| T-7 slower-publication window | Tuesday, 2026-03-31, 08:30 PDT | Tuesday, 2026-03-31, 22:30 ICT | missed |
| T-6 target pitch date | Tuesday, 2026-04-07, 08:30 PDT | Tuesday, 2026-04-07, 22:30 ICT | missed |
| T-4 last plausible window | Tuesday, 2026-04-21, 08:30 PDT | Tuesday, 2026-04-21, 22:30 ICT | missed |
| Show HN target | Tuesday, 2026-05-19, 08:30 PDT | Tuesday, 2026-05-19, 22:30 ICT | pending |
| "Within two weeks of launch" latest publication goal | Tuesday, 2026-06-02, 08:30 PDT | Tuesday, 2026-06-02, 22:30 ICT | not realistically reachable from 2026-05-18 |

The May 19 guest-post timing goal is therefore blocked by missed editorial lead time. If the Show HN date rolls forward, recompute from the new date and send at T-8 to T-6. If the launch does not roll forward, use these pitches as post-launch long-tail editorial outreach and do not claim the TASK-LAUNCH-005 timing goal was met.

## Publication Research

Checked on 2026-05-18.

| Publication | Current submission surface | Editorial fit | Pitch format | Length / process signals |
|---|---|---|---|---|
| Smashing Magazine | <https://www.smashingmagazine.com/write-for-us/> | Professional web designers, developers, UX, design systems, methods, case studies | Submit via Smashing contact form with target audience, reader takeaway, author expertise, and a 200-300 word outline | Smashing asks for an outline first, original work, practical experience, and rejects obvious content marketing. |
| CSS-Tricks | <https://css-tricks.com/guest-writing/> | Front-end engineers and web designers who want practical, self-contained implementation knowledge | Guest-writing application form; rough draft or outline accepted | Current page says 600-1,500 words is the sweet spot and applications are reviewed weekly. |
| A List Apart | <https://alistapart.com/about/contribute/> and <https://alistapart.com/contact/> | Web craft, standards, design, development, content strategy, thoughtful arguments | Email a short pitch plus outline, partial draft, rough draft, plaintext/Markdown/Google Doc, or HTML link | ALA publishes 600-2,500 words, asks for a thesis and clear argument, reviews weekly, and cannot promise publication dates until the article is close to final. |

## Distinct Pitch Map

| Publication | Article | Why this venue | Full draft |
|---|---|---|---|
| Smashing Magazine | "Design-system audits need criteria, not taste" | Broad practitioner audience; strongest fit for a methodology article with examples and visuals. | [`../social/guest-post-pitches.md#1-smashing-magazine`](../social/guest-post-pitches.md#1-smashing-magazine) |
| CSS-Tricks | "Check scripts that catch design-system regressions before they ship" | Practical front-end/tooling audience; strongest fit for zero-dependency Node scripts and CI checks. | [`../social/guest-post-pitches.md#2-css-tricks-now-under-digitalocean`](../social/guest-post-pitches.md#2-css-tricks-now-under-digitalocean) |
| A List Apart | "The honest design-system maturity model" | Craft/prestige audience; strongest fit for a considered argument about evidence, self-audit limits, and maturity claims. | [`../social/guest-post-pitches.md#3-a-list-apart`](../social/guest-post-pitches.md#3-a-list-apart) |

Do not pitch the launch blog post itself. The launch post is already published at `https://audit.cyberskill.world/blog/launch-2026`; the guest articles must be publication-fresh deep dives.

## Manual Send Plan

1. Verify `https://audit.cyberskill.world/`, `/card`, `/blog/launch-2026`, and the public repo URL immediately before sending.
2. Read at least three recent articles from the target publication before sending that publication's pitch.
3. Personalize the first sentence in each pitch to a recent article or guideline from that publication.
4. Submit Smashing through the Smashing contact form.
5. Submit CSS-Tricks through the CSS-Tricks guest-writing application.
6. Submit A List Apart by email/contact flow after reading the contribution guidelines.
7. Log the send date, response mode, and next action in the tracking table below.
8. Do not send any second follow-up. One follow-up after seven business days is the maximum.

## Guardrails

- No paid placement, SEO service, link-buying, or "guaranteed publication" service.
- No sales CTA, booking link, pricing link, or paid CyberSkill audit pitch.
- No vote, upvote, Product Hunt, HN, Reddit, or social amplification ask.
- No promise of exclusivity across multiple publications. Each pitch is exclusive only for its own article.
- No simultaneous duplicate article pitch. If an editor asks for a topic already under review elsewhere, pause and clarify before proceeding.
- No old public self-audit claims: do not cite CyberSkill as L5, independently verified, or with a standalone percentage; use the public L3 worked example framing.
- Use `DSAF` as the short handle and `Design System Audit Framework` exactly once on first mention.
- Use `https://audit.cyberskill.world/card` and `https://github.com/cyberskill-official/design-system-audit-framework` as proof-of-existence links.

## Response Handling

| Response mode | Action | Follow-up artifact |
|---|---|---|
| Accepted | Confirm timeline, draft against the publication's guidelines, and preserve first-publication rights for that article. | Add article draft status and eventual URL to this file. |
| Revision requested | Respond within 48 hours with the revised angle or politely decline if outside Stephen's expertise. | Capture the editor's preferred angle for future TASK-CONTENT-001 topic prioritisation. |
| Rejected with feedback | Thank the editor, log the reason, and revisit in 3-6 months with a different topic. | Add rejection reason below. |
| No reply | Send one polite follow-up after seven business days, then stop. | Mark `no-reply` and do not chase. |

If one publication accepts, do not automatically withdraw the other two pitches because the topics are distinct. Withdraw only if an editor asks for broader exclusivity or if two editors redirect toward the same article angle.

## Tracking

| Publication | Topic | Target send window | Actual send date | Submission channel | Response date | Response mode | Article URL | Next action |
|---|---|---|---|---|---|---|---|---|
| Smashing Magazine | Design-system audits need criteria, not taste | Missed for 2026-05-19 launch; use next T-8 to T-6 window | pending | Smashing contact form | pending | pending | pending | Verify latest guidelines, personalize, send manually. |
| CSS-Tricks | Check scripts that catch design-system regressions before they ship | Missed for 2026-05-19 launch; use next T-8 to T-6 window | pending | CSS-Tricks guest-writing form | pending | pending | pending | Verify form, attach outline or rough draft, send manually. |
| A List Apart | The honest design-system maturity model | Missed for 2026-05-19 launch; use next T-8 to T-6 window | pending | ALA email/contact flow | pending | pending | pending | Verify contribution/contact flow, send manually. |

## Follow-Up Template

Subject: `Re: [original pitch subject]`

```text
Hi <editor name>,

Quick follow-up on the article pitch below in case it got buried. No pressure if it is not a fit for your calendar.

I am happy to revise the angle if a narrower version would be more useful to your readers.

Stephen
```

## Manual Blocker Payload

To unblock the original task timing goal, Stephen must choose one of these:

1. Roll the Show HN launch date forward by at least six weeks and send these pitches at T-8 to T-6.
2. Keep the May 19 launch and treat these as post-launch long-tail pitches, accepting that they cannot land within two weeks of launch.
3. Skip this launch-cycle guest-post goal and recycle the topics into TASK-CONTENT-001 weekly deep dives.

*End of guest-post pitch runbook.*
