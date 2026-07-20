# Newsletter submissions — per-deep-dive templates

**Use for:** EXECUTION_PLAN.md task O11. Submit each newly-published deep-dive to all four newsletters at T+24h after the canonical post goes live.

Newsletters in scope (per TASK-LAUNCH-006). Do not auto-submit; copy/paste manually after verifying the live URL.

| Newsletter | URL | Submission form |
|---|---|---|
| Into Design Systems Weekly | <https://www.intodesignsystems.com/about> | Manual relationship/email or current community contact |
| Pattern Pulse | `<verify current URL before sending>` | Destination not verified on 2026-05-18 |
| Sidebar.io | <https://sidebar.io/submit> | Public submit route; login/sign-up required |
| Smashing Newsletter | <https://www.smashingmagazine.com/the-smashing-newsletter/> and <https://www.smashingmagazine.com/contact/> | Contact form `Link suggestion`; no paid placement |

Submit only when the post is actually live at `https://audit.cyberskill.world/blog/<slug>`. Submitting before the post resolves is a sure-fire way to lose editorial trust.

---

## Week 1 Source Content

Use this exact content for the first submission cycle.

| Field | Value |
|---|---|
| Post title | A1.1: Color tokens are governance, not naming decoration |
| Canonical URL | `https://audit.cyberskill.world/blog/deep-dives/week-01-a1-1-color-tokens/` |
| Criterion | `A1.1` |
| Publish time | Tuesday, 2026-06-16, 08:00 PT / 22:00 ICT |
| Submission window | Wednesday, 2026-06-17, 08:00 PT / 22:00 ICT |

## 1. Into Design Systems Weekly

**Submission text (paste into the form / editor email):**

```
New DSAF criterion deep-dive: "A1.1: Color tokens are governance, not naming decoration" — practical example, anti-pattern, and checklist for DS teams.

Canonical URL: https://audit.cyberskill.world/blog/deep-dives/week-01-a1-1-color-tokens/
Tags: A1.1, design tokens, design systems governance
Author: Stephen Cheng

DSAF is the open Design System Audit Framework (MIT licensed). Repo: github.com/cyberskill-official/design-system-audit-framework

No follow-up needed; thanks for considering.
```

## 2. Pattern Pulse

**Submission text:**

```
Criterion deep-dive for DS teams: "A1.1: Color tokens are governance, not naming decoration." Anchored 0–5 rubric, one concrete example, one anti-pattern, one practical checklist.

Canonical URL: https://audit.cyberskill.world/blog/deep-dives/week-01-a1-1-color-tokens/

Part of DSAF — open methodology for design-system audits. github.com/cyberskill-official/design-system-audit-framework

Note: Pattern Pulse destination was not verified on 2026-05-18. Do not send until the operator confirms the current submission path.
```

## 3. Sidebar.io

**Submission text:**

```
Title: A1.1: Color tokens are governance, not naming decoration

URL: https://audit.cyberskill.world/blog/deep-dives/week-01-a1-1-color-tokens/

Description (max 240 chars): A practical look at A1.1 color tokens: what good token governance looks like, the anti-pattern, and a checklist teams can paste into a design-system audit.

Author: Stephen Cheng
```

## 4. Smashing Newsletter

**Submission text:**

```
Subject: Pitch for inclusion — DSAF criterion deep-dive

Hi <editor name>,

I'd like to submit "A1.1: Color tokens are governance, not naming decoration" for consideration in The Smashing Newsletter. It's a practical criterion deep-dive from DSAF (an open design-system audit framework) with an anchored example, anti-pattern, and checklist design-system leads can apply this week.

Canonical: https://audit.cyberskill.world/blog/deep-dives/week-01-a1-1-color-tokens/
DSAF repo: https://github.com/cyberskill-official/design-system-audit-framework

The post is non-promotional — no paid CTA, no SaaS pitch — and fits the practical-frontend tone of the newsletter.

Stephen Cheng
CyberSkill
```

---

## Rules

1. **No paid promotion.** Per TASK-LAUNCH-006 §rules; never offer payment for inclusion.
2. **No duplicate submission to the same newsletter for the same post.** One submission per newsletter per post; if not picked up, that's the editorial signal.
3. **No follow-up** unless the editor explicitly asks for clarification or amendment.
4. **No old-post resubmission.** Each submission is for a freshly-published deep-dive (≤ 7 days old).
5. **No service CTA** in the submission text. The newsletter readers are getting the rubric, not the paid audit.
6. **No URL parameters.** Canonical URL only — no `?utm=newsletter` tracking params.
7. **No request to modify the post text** after a newsletter includes it. The byte-identical canonical is the canonical.
8. **No Pattern Pulse send until destination is verified.** Update `internal/launch/newsletter-submissions.md` when the current destination is known.

## Four-week inclusion review

Every 4 weeks (i.e. after 4 deep-dives), review:

| Newsletter | Posts submitted | Posts included | Inclusion rate |
|---|---:|---:|---:|
| IDS Weekly | | | |
| Pattern Pulse | | | |
| Sidebar.io | | | |
| Smashing Newsletter | | | |

If a newsletter is 0/4 (no inclusions across 4 submissions): pause further submissions to that newsletter for the next 4 weeks. Editorial signal is editorial signal.

If a newsletter is 4/4 or 3/4: confirm the editor's preferred submission format and adjust the template above to match (some editors prefer one-line summaries; others want a 3-sentence elevator).

## Tracking

Update `internal/launch/newsletter-submissions.md` "Tracking" table per post:

| Deep-dive | Canonical URL | IDS submitted | Pattern Pulse submitted | Sidebar.io submitted | Smashing submitted | Total inclusions at T+14d |
|---|---|---|---|---|---|---:|

*End of newsletter submission templates.*
