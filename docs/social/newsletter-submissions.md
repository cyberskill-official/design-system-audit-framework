# Newsletter submissions — per-deep-dive templates

**Use for:** EXECUTION_PLAN.md task O11. Submit each newly-published deep-dive to all four newsletters at T+24h after the canonical post goes live.

Newsletters in scope (per FR-LAUNCH-006):

| Newsletter | URL | Submission form |
|---|---|---|
| Into Design Systems Weekly | intodesignsystems.com/newsletter | Editor submission (in-newsletter contact) |
| Pattern Pulse | patternpulse.io | Form on site footer |
| Sidebar.io | sidebar.io | sidebar.io/submit |
| Smashing Newsletter | smashingmagazine.com/the-smashing-newsletter | Editor submission via Smashing pitch flow |

Submit only when the post is actually live at `https://audit.cyberskill.world/blog/<slug>`. Submitting before the post resolves is a sure-fire way to lose editorial trust.

---

## 1. Into Design Systems Weekly

**Submission text (paste into the form / editor email):**

```
New DSAF criterion deep-dive: "<post title>" — practical example, anti-pattern, and a 5-row checklist for DS teams.

Canonical URL: https://audit.cyberskill.world/blog/<slug>
Tags: <relevant DSAF criterion ID — e.g. A1.1, B5.2>
Author: Stephen Cheng

DSAF is the open Design System Audit Framework (MIT licensed). Repo: github.com/CyberSkill/design-system-audit-framework
```

## 2. Pattern Pulse

**Submission text:**

```
Criterion deep-dive for DS teams: "<post title>". Anchored 0–5 rubric, one concrete example, one anti-pattern, one practical checklist.

Canonical URL: https://audit.cyberskill.world/blog/<slug>

Part of DSAF — open methodology for design-system audits. github.com/CyberSkill/design-system-audit-framework
```

## 3. Sidebar.io

**Submission text:**

```
Title: <post title>

URL: https://audit.cyberskill.world/blog/<slug>

Description (max 240 chars): A practical look at <criterion ID + name> — what good looks like, the anti-pattern, and a checklist you can paste into your DS audit today. Part of DSAF, an open MIT-licensed maturity framework.

Author: Stephen Cheng
```

## 4. Smashing Newsletter

**Submission text:**

```
Subject: Pitch for inclusion — DSAF criterion deep-dive

Hi <editor name>,

I'd like to submit "<post title>" for consideration in The Smashing Newsletter. It's a practical criterion deep-dive from DSAF (an open design-system audit framework) — anchored example, anti-pattern, and a 5-row checklist DS leads can apply this week.

Canonical: https://audit.cyberskill.world/blog/<slug>
DSAF repo: https://github.com/CyberSkill/design-system-audit-framework

The post is non-promotional — no paid CTA, no SaaS pitch — and fits the practical-frontend tone of the newsletter.

Stephen Cheng
CyberSkill
```

---

## Rules

1. **No paid promotion.** Per FR-LAUNCH-006 §rules; never offer payment for inclusion.
2. **No duplicate submission to the same newsletter for the same post.** One submission per newsletter per post; if not picked up, that's the editorial signal.
3. **No follow-up** unless the editor explicitly asks for clarification or amendment.
4. **No old-post resubmission.** Each submission is for a freshly-published deep-dive (≤ 7 days old).
5. **No service CTA** in the submission text. The newsletter readers are getting the rubric, not the paid audit.
6. **No URL parameters.** Canonical URL only — no `?utm=newsletter` tracking params.
7. **No request to modify the post text** after a newsletter includes it. The byte-identical canonical is the canonical.

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

Update `docs/launch/newsletter-submissions.md` "Tracking" table per post:

| Deep-dive | Canonical URL | IDS submitted | Pattern Pulse submitted | Sidebar.io submitted | Smashing submitted | Total inclusions at T+14d |
|---|---|---|---|---|---|---:|

*End of newsletter submission templates.*
