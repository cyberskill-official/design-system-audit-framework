# Cross-publishing template

**Use for:** EXECUTION_PLAN.md task O10. Per deep-dive published on `audit.cyberskill.world/blog/`, syndicate at T+24h to dev.to, T+48h to Medium, T+72h to LinkedIn long-form.
**Discipline:** the canonical URL stays `https://audit.cyberskill.world/blog/<slug>`. Every syndication copy carries the canonical link visibly and uses platform-native canonical tags where supported.

## Why the stagger

| Channel | Lag | Why this lag |
|---|---|---|
| Canonical (`audit.cyberskill.world/blog/<slug>`) | T+0 | Source of truth |
| dev.to | T+24h | dev.to supports `canonical_url` natively; allow 24h for search engines to index the canonical first |
| Medium | T+48h | Medium's canonical handling is weaker; the 48h lag prevents accidental ranking-cannibalisation |
| LinkedIn long-form | T+72h | LinkedIn doesn't honour canonical tags at all — treat it as a teaser with a link back, not as a syndication |

## dev.to template (T+24h)

**Frontmatter (canonical_url is the critical field):**

```yaml
---
title: "<Same as canonical post>"
published: true
description: "<Same as canonical post meta description>"
tags: designsystems, accessibility, opensource, frontend
canonical_url: https://audit.cyberskill.world/blog/<slug>
cover_image: https://audit.cyberskill.world/og-image.png
---
```

**Body footer (paste at the END of every dev.to post):**

```markdown
---

*Originally published at [audit.cyberskill.world/blog/<slug>](https://audit.cyberskill.world/blog/<slug>).*
*DSAF Criteria source: [github.com/CyberSkill/design-system-audit-framework](https://github.com/CyberSkill/design-system-audit-framework).*
```

## Medium template (T+48h)

**Title:** same as canonical.
**Subtitle:** same as canonical meta description.
**First line (must be the very first paragraph):**

```
This piece was originally published at audit.cyberskill.world/blog/<slug>. The canonical version is there; this is a syndication copy.
```

**Body footer (paste at the END of every Medium post):**

```markdown
---

**Read the canonical version at [audit.cyberskill.world/blog/<slug>](https://audit.cyberskill.world/blog/<slug>).**

DSAF is an open-source design-system audit framework. Source: [github.com/CyberSkill/design-system-audit-framework](https://github.com/CyberSkill/design-system-audit-framework).
```

Medium SEO note: also add `<link rel="canonical">` via Medium's "Settings" → "More options" → "Tell us more about your story" → "Canonical URL." Paste `https://audit.cyberskill.world/blog/<slug>`.

## LinkedIn long-form template (T+72h)

**Title:** same as canonical.
**Body opening (first 2 paragraphs — these are what shows in the feed-preview):**

```
This is a syndication of a piece I published this week at audit.cyberskill.world/blog/<slug>. Sharing the LinkedIn version because the conversation here is different from the dev/design crowd that reads the canonical.

The full piece is ~1,800 words. The short version follows.
```

**Body:** condensed version of the canonical post — 600–900 words, not the full 1,800. Keep:

- Why-it-matters paragraph (one paragraph max)
- The "what good looks like" example (one paragraph)
- The anti-pattern paragraph
- A 5-row excerpt of the checklist (not all of it)
- A closing CTA: "Full piece + checklist at audit.cyberskill.world/blog/<slug>"

**Footer:**

```
Canonical version: https://audit.cyberskill.world/blog/<slug>
Full DSAF Criteria: https://github.com/CyberSkill/design-system-audit-framework
```

## Anti-patterns (these get the post de-canonicalised by search)

- **Don't change the criterion's wording** in syndication copies. The whole point of FIXED criteria is that they're byte-identical across surfaces.
- **Don't add platform-exclusive sections** ("dev.to-only deep dive," "LinkedIn-only behind-the-scenes"). Pick one canonical version; syndications are slimmer subsets, not richer variants.
- **Don't publish the syndication BEFORE the canonical.** dev.to at T+24h means *24 hours after the canonical is live*, not 24 hours after authoring the draft.
- **Don't add paid-CTA or sales-form to the syndication copies.** The framework surface stays clean across all hosts.
- **Don't omit the "Originally published at" line.** That line is what tells search engines which copy to rank.

## Tracking

Update `docs/content/cross-publishing.md` per post:

| Canonical | dev.to | Medium | LinkedIn | Inclusions |
|---|---|---|---|---:|
| `<slug>` | `<dev.to URL>` | `<Medium URL>` | `<LinkedIn URL>` | 0 |

The "Inclusions" column counts newsletter pickups (see `docs/social/newsletter-submissions.md`). Update at T+14d per post.

*End of cross-publishing template.*
