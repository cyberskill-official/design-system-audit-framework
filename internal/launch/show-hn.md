# Show HN launch runbook

**FR:** FR-LAUNCH-001  
**Status:** repo-ready; externally blocked by FR-DOCS-002 until at least two named outside-reviewer quotes have written consent, or Stephen logs a launch exception.

## Canonical operator files

- [`show-hn-post.md`](./show-hn-post.md) — exact title, URL field, body, first comment, schedule, and T-15 minute URL checks.
- [`show-hn-response-playbook.md`](./show-hn-response-playbook.md) — response SLA, reply patterns, anti-patterns, kill switch, and post-launch handoff.
- [`post-hn-feedback.md`](./post-hn-feedback.md) — live tracking file after the HN item exists.

## Schedule

Earliest candidate if consent lands in time:

| Slot | Pacific Time | Asia/Ho_Chi_Minh |
|---|---|---|
| Preferred | Tuesday, 2026-05-19, 08:30 PDT | Tuesday, 2026-05-19, 22:30 ICT |
| Fallback | Wednesday, 2026-05-20, 08:30 PDT | Wednesday, 2026-05-20, 22:30 ICT |

If FR-DOCS-002 is still blocked at T-24h, roll forward to the next Tuesday or Wednesday 08:00-10:00 Pacific slot.

## Manual posting checklist

1. Confirm FR-DOCS-001 and FR-DOCS-003 remain verified.
2. Confirm FR-DOCS-002 is either shipped or explicitly waived for launch.
3. Run the T-15 minute URL checks in `show-hn-post.md`.
4. Submit the URL field, title, and body from `show-hn-post.md`.
5. Post the founder first comment within five minutes.
6. Run the response cadence from `show-hn-response-playbook.md`.
7. Record every substantive thread in `post-hn-feedback.md`.

*End of Show HN runbook.*
