# Cross-publishing discipline

**Status:** cadence-ready.
**FR:** FR-CONTENT-002.

## Rule

`dsaf.dev` is canonical.
Every syndication copy links back to the canonical post and carries an explicit canonical URL line.

## Channels

| Channel | Timing | Notes |
|---|---|---|
| dev.to | T+24h | Use canonical URL field if available |
| Medium | T+48h | Add canonical link in footer |
| LinkedIn long-form | T+72h | Shorter intro, same canonical URL |

## Template footer

```text
Canonical version: https://dsaf.dev/blog/<slug>
DSAF Criteria: https://github.com/CyberSkill/design-system-audit-framework
```

## Tracking

| Canonical | dev.to | Medium | LinkedIn | Notes |
|---|---|---|---|---|
| pending | pending | pending | pending | pending |

## Anti-patterns

- No platform-exclusive rewrite.
- No paid CTA.
- No duplicate canonical.
- No changed criterion wording.
- No publishing syndication before the canonical post.

*End of cross-publishing discipline.*
