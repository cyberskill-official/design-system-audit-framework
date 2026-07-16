# Cross-publishing discipline

**Status:** cadence-ready.
**task:** TASK-CONTENT-002.
**Canonical playbook:** [`cross-publishing-playbook.md`](./cross-publishing-playbook.md)
**Week 1 ready drafts:** [`deep-dives/cross-publishing/`](./deep-dives/cross-publishing)

## Rule

`audit.cyberskill.world` is canonical.
Every syndication copy links back to the canonical post and carries an explicit canonical URL line.

## Channels

| Channel | Timing | Notes |
|---|---|---|
| dev.to | T+24h | Use canonical URL field if available |
| Medium | T+48h | Add canonical link in footer |
| LinkedIn long-form | T+72h | Shorter intro, same canonical URL |

## Template footer

```text
Canonical version: https://audit.cyberskill.world/blog/<slug>
DSAF Criteria: https://github.com/cyberskill-official/design-system-audit-framework
```

## Tracking

| Canonical | dev.to | Medium | LinkedIn | Notes |
|---|---|---|---|---|
| https://audit.cyberskill.world/blog/deep-dives/week-01-a1-1-color-tokens | pending | pending | pending | ready drafts generated; manual posting starts 2026-06-17 |

## Anti-patterns

- No platform-exclusive rewrite.
- No paid CTA.
- No duplicate canonical.
- No changed criterion wording.
- No publishing syndication before the canonical post.

*End of cross-publishing discipline.*
