# DSAF Cross-Publishing Playbook

**FR:** FR-CONTENT-002  
**Status:** repo-ready; manual posting pending platform account access.  
**Scope:** dev.to, Medium, and LinkedIn long-form only.

Each weekly deep-dive is published first on `audit.cyberskill.world`, then manually cross-posted to dev.to, Medium, and LinkedIn with the canonical URL preserved. Do not auto-publish and do not rewrite the article into a platform-exclusive version.

## Week 1 Manual Posting Schedule

Canonical Week 1 article: `https://audit.cyberskill.world/blog/deep-dives/week-01-a1-1-color-tokens`

| Surface | Time | Asia/Ho_Chi_Minh | Ready draft |
|---|---|---|---|
| Canonical article | Tuesday, 2026-06-16, 08:00 PT | Tuesday, 2026-06-16, 22:00 ICT | `internal/content/deep-dives/week-01-a1-1-color-tokens.md` |
| dev.to | Wednesday, 2026-06-17, 08:00 PT | Wednesday, 2026-06-17, 22:00 ICT | `internal/content/deep-dives/cross-publishing/week-01-a1-1-color-tokens.devto.md` |
| Medium | Thursday, 2026-06-18, 08:00 PT | Thursday, 2026-06-18, 22:00 ICT | `internal/content/deep-dives/cross-publishing/week-01-a1-1-color-tokens.medium.md` |
| LinkedIn long-form | Friday, 2026-06-19, 08:00 PT | Friday, 2026-06-19, 22:00 ICT | `internal/content/deep-dives/cross-publishing/week-01-a1-1-color-tokens.linkedin.md` |

Run `node scripts/render-cross-publishing-drafts.mjs` after each new canonical deep-dive to create the next set of ready manual-post drafts.

## Platform Procedures

### dev.to

1. Log in to dev.to with Stephen's account.
2. Open `internal/content/deep-dives/cross-publishing/<slug>.devto.md`.
3. Create a new post and paste the whole file, including frontmatter.
4. Confirm `published: false` while previewing.
5. Confirm `canonical_url` equals the `audit.cyberskill.world` canonical URL.
6. Confirm tags fit dev.to's four-tag limit.
7. Preview the full post and verify the "Originally published at" note appears before the body.
8. Change `published: true` only when ready to post.
9. Publish manually.
10. Copy the final dev.to URL into the tracker below and into the canonical post's Discussion section.

### Medium

1. Log in to Medium with Stephen's account.
2. Open `internal/content/deep-dives/cross-publishing/<slug>.medium.md`.
3. Create a new story and paste the full body.
4. Set the story title to the first heading.
5. Keep the first paragraph that states the original canonical URL.
6. Open story settings before publishing.
7. Set the canonical link to the `audit.cyberskill.world` canonical URL.
8. Confirm the story is not paywalled.
9. Publish manually.
10. Copy the final Medium URL into the tracker below and into the canonical post's Discussion section.

### LinkedIn

1. Log in to LinkedIn with Stephen's account.
2. Use the long-form article surface, not a regular status post.
3. Open `internal/content/deep-dives/cross-publishing/<slug>.linkedin.md`.
4. Paste the full article body.
5. Keep the first paragraph that states the original canonical URL.
6. Upload the same OG image used by the canonical article.
7. Keep hashtags at the end only.
8. Preview and verify the article is not truncated into a regular post.
9. Publish manually.
10. Copy the final LinkedIn URL into the tracker below and into the canonical post's Discussion section.

## Discussion Section Update

After all three posts are live, update the canonical article's Discussion section:

```markdown
## Discussion

This deep-dive has discussion threads on:

- [dev.to thread](https://dev.to/thread)
- [Medium response thread](https://medium.com/thread)
- [LinkedIn long-form post](https://linkedin.com/thread)
```

If a platform post is skipped or delayed, leave a dated note in the tracker and do not fabricate a URL.

## Tracking

| Deep-dive | Canonical URL | dev.to | Medium | LinkedIn | T+7d engagement | Notes |
|---|---|---|---|---|---|---|
| W1 A1.1 color tokens | https://audit.cyberskill.world/blog/deep-dives/week-01-a1-1-color-tokens | pending | pending | pending | pending | Ready drafts generated; manual posting starts 2026-06-17. |

## Engagement Feedback Loop

Every four posts, review:

- which platform produced the highest substantive-comment count
- which criterion category produced the most saves/bookmarks/claps/reactions
- which comment questions should become future FR-CONTENT-001 topics
- whether any platform is underperforming enough to drop after Week 12

Record any schedule changes in `internal/content/deep-dive-schedule.md`.

## Substantive-Edit Sync

If the canonical post receives a ChangeLog entry, update every cross-posted copy within seven days:

| Surface | Update action |
|---|---|
| dev.to | Edit post; keep `canonical_url` unchanged. |
| Medium | Edit story; confirm canonical link persisted. |
| LinkedIn | Edit article; keep canonical note at top and footer. |

Typo fixes can remain canonical-only unless they change meaning. Any criterion wording, example, anti-pattern, checklist, or score-anchor change is substantive and must sync.

## Guardrails

- No auto-cross-publishing tools, RSS imports, or Medium imports unless canonical URL preservation is manually verified.
- No condensed platform variant. The full article ships on each platform with canonical attribution.
- No platform-exclusive sections.
- No paid CTA, sales CTA, booking link, or CyberSkill audit-services pitch.
- No old public self-audit claims: avoid historical score headlines, elite-tier self-labels, or superiority language.
- No change to criterion wording across platforms.
- No posting before the canonical article is live.

*End of cross-publishing playbook.*
