# Newsletter submissions

**Status:** repo-ready with mocked dependency contract; manual submission pending.
**FR:** FR-LAUNCH-006.
**Source check:** 2026-05-18.

This runbook submits each DSAF weekly deep-dive to four curated design/front-end newsletters.
Do not auto-submit.
Do not pay for placement.
Do not follow up unless an editor explicitly asks for clarification.

## Edge-case matrix

| Case | Failure vector | Expected handling | Evidence surface |
|---|---|---|---|
| Canonical URL is null or not live | malformed input / deploy lag | Do not submit; keep tracking row at `ready` until the URL returns 200 | Tracking row + `submission_blocked` event |
| Newsletter destination is unverified | external service discovery | Mark the newsletter blocked, preserve exact copy, and retry only after operator verifies the route | Pattern Pulse row + payload artifact |
| Account login, 2FA, or CAPTCHA appears | physical blocker | Do not bypass; use the mock contract and manual handoff | `internal/social/FR-LAUNCH-006-social-payload.json` |
| Duplicate send attempt | concurrent operator action | One canonical submission per newsletter per post; second attempt is blocked | Tracking row is the compare-and-set record |
| Editor asks for clarification | manual reply path | Reply once with clarification; do not follow up unprompted | Tracking note |
| Newsletter publishes modified wording | external editorial control | Accept the newsletter wording; canonical corrections stay on the DSAF URL | Four-week review |
| Paid placement is offered | policy conflict | Decline; organic inclusion only | Anti-patterns + payload `no_paid_cta` |
| Four straight zero-inclusion submissions | resonance signal | Pause that newsletter for four weeks and adjust topic framing | Four-week review |

## Contract + mock service

The missing-service contract lives in [`../social/FR-LAUNCH-006-social-payload.json`](../social/FR-LAUNCH-006-social-payload.json). It defines the exact request body, expected `202` mock response, blocker, copy, and schedule for each newsletter.

Run the contract test:

```bash
npm run contract:newsletter
```

The contract is also part of `npm run verify`.

## Source-Checked Submission Surfaces

| Newsletter | Current public surface | Submission path | Source note |
|---|---|---|---|
| Into Design Systems Weekly | <https://www.intodesignsystems.com/about> | Manual relationship/email or community contact; no stable public submit form verified | IDS is the design-systems community target; verify preferred channel before first send. |
| Pattern Pulse | `<verify current URL before sending>` | Manual verification required | Public search did not confirm a stable design-systems Pattern Pulse submission page on 2026-05-18. Treat as external/manual until verified. |
| Sidebar.io | <https://sidebar.io/submit> | Login/sign-up required before submission | Sidebar has a public submit route and guidelines; submit new, high-effort content only. |
| Smashing Newsletter | <https://www.smashingmagazine.com/the-smashing-newsletter/> and <https://www.smashingmagazine.com/contact/> | Contact form category `Link suggestion` or editorial contact; avoid sponsored placement | Smashing Newsletter is weekly; paid placements are separate and forbidden for this FR. |

## Week 1 Submission Schedule

Canonical post: `https://audit.cyberskill.world/blog/deep-dives/week-01-a1-1-color-tokens/`

| Step | Date / time | Action |
|---|---|---|
| Publish | Tuesday, 2026-06-16, 08:00 PT / 22:00 ICT | Confirm the Week 1 deep-dive URL returns 200. |
| Submit | Wednesday, 2026-06-17, 08:00 PT / 22:00 ICT | Submit the same canonical URL to all verified newsletter channels. |
| Check | Wednesday, 2026-06-24 | Mark included / not included. No follow-up. |
| Review | Tuesday, 2026-07-14 | Four-week inclusion-pattern review after four posts. |

## Newsletters

### Into Design Systems Weekly

Manual submission copy lives in [`../social/newsletter-submissions.md`](../social/newsletter-submissions.md#1-into-design-systems-weekly).
Use the relationship/email path only after verifying the current preferred channel.

### Pattern Pulse

Manual submission copy lives in [`../social/newsletter-submissions.md`](../social/newsletter-submissions.md#2-pattern-pulse).
Do not submit until the current Pattern Pulse destination is verified.

### Sidebar.io

Submit through <https://sidebar.io/submit> after logging in or signing up.
Manual submission copy lives in [`../social/newsletter-submissions.md`](../social/newsletter-submissions.md#3-sidebario).

### Smashing Newsletter

Submit through Smashing's contact flow as a link suggestion, not a sponsored placement.
Manual submission copy lives in [`../social/newsletter-submissions.md`](../social/newsletter-submissions.md#4-smashing-newsletter).

## Tracking

| Deep-dive | Canonical URL | IDS Weekly | Pattern Pulse | Sidebar.io | Smashing | Inclusions |
|---|---|---|---|---|---|---:|
| Week 1 — A1.1 Color tokens are governance, not naming decoration | `https://audit.cyberskill.world/blog/deep-dives/week-01-a1-1-color-tokens/` | ready; submit 2026-06-17 | blocked until destination verified | ready; submit 2026-06-17 | ready; submit 2026-06-17 | 0 |
| Week 2 | pending | pending | pending | pending | pending | 0 |
| Week 3 | pending | pending | pending | pending | pending | 0 |
| Week 4 | pending | pending | pending | pending | pending | 0 |

## Four-week review

Every four weeks, review:

- per-newsletter inclusion rate
- per-topic resonance
- zero-inclusion topics
- relationship quality with editors

Feed high-resonance topics back to the weekly deep-dive plan.

## Anti-patterns

1. No paid promotion.
2. No paid placement.
3. No duplicate submission to the same newsletter.
4. No follow-up unless a newsletter explicitly asks for clarification.
5. No old-post resubmissions.
6. No service CTA.
7. No non-canonical URLs.
8. No request that editors change published wording after inclusion.

Post-FR-GOV-002, co-maintainer-authored posts use the same submission flow and attribution.

*End of newsletter submissions runbook.*
