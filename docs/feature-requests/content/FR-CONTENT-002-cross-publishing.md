---
id: FR-CONTENT-002
title: "Cross-post each weekly deep-dive to dev.to + Medium + LinkedIn — canonical-URL preservation discipline"
module: CONTENT
priority: SHOULD
status: accepted
verify: I
phase: P2
milestone: P2 · slice 1 · Community velocity
slice: 1
owner: Stephen Cheng (Founder) + future co-maintainer (post-FR-GOV-002)
created: 2026-05-17
shipped: null
related_frs: [FR-CONTENT-001, FR-LAUNCH-005, FR-BRAND-001, FR-BRAND-002, FR-CORE-004, FR-BRAND-004]
depends_on: [FR-CONTENT-001]
blocks: []
source_pages:
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Phase 2 — Community velocity action 1 — 'Cross-post to dev.to and Medium')"
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§What NOT to do item 5 — quality of placement compounds)"
source_decisions:
  - "DEC-057: cross-publishing happens T+24-72 hours after dsaf.dev publication — gives the canonical URL time to be indexed first"
  - "DEC-058: canonical URL stays at dsaf.dev across all platforms — dev.to / Medium / LinkedIn show the dsaf.dev URL as canonical via their respective canonical-URL fields"
  - "DEC-059: cross-published version is the *same content* (verbatim or near-verbatim per platform formatting constraints), NOT a condensed / different / SEO-optimised variant"
  - "DEC-060: 3 platforms — dev.to + Medium + LinkedIn — matches the plan's recommendation; each has a different audience + canonical-URL handling"
language: markdown + ops
service: doctrine + outreach ops
new_files:
  - docs/content/cross-publishing-playbook.md
modified_files:
  - dsaf.dev/blog/deep-dives/_template.md   # add post-cross-publication "Discussion" section update guidance
allowed_tools:
  - "file_read/write docs/content/**, dsaf.dev/blog/deep-dives/**"
  - "manual posting to dev.to / Medium / LinkedIn (no MCP for these platforms)"
  - "canonical-URL field configuration per platform"
disallowed_tools:
  - "cross-publish without setting the canonical URL to dsaf.dev (the canonical preservation is the discipline)"
  - "modify content substantially between dsaf.dev + cross-published versions (the same-content rule; only platform-required formatting differs)"
  - "cross-publish before dsaf.dev publication (timing rule — canonical first)"
  - "cross-publish to platforms beyond the 3 named (more platforms = more maintenance burden + diminishing returns)"
  - "use auto-cross-publishing tools that hijack canonical URLs (e.g., some Medium-import tools strip canonical)"
effort_hours: 3
sub_tasks:
  - "1. (30m) Author docs/content/cross-publishing-playbook.md per §3 — per-platform cross-publishing procedure + canonical-URL discipline + tracking format"
  - "2. (15m) Patch dsaf.dev/blog/deep-dives/_template.md to add post-cross-publication 'Discussion' section update guidance"
  - "3. (per-deep-dive ~45m founder-time) T+24-72h after dsaf.dev publication: cross-post to dev.to + Medium + LinkedIn with canonical URL set to dsaf.dev"
  - "4. (per-deep-dive ~15m) Update the dsaf.dev post's 'Discussion' section with the 3 cross-published URLs"
  - "5. (per-deep-dive monitoring, ~30m elapsed) Engage with discussion threads on each platform per FR-LAUNCH-001 §3 response patterns (platform-portable)"
  - "6. (every 4 weeks, ~15m) Update tracking spreadsheet of cross-published posts; identify platform-specific engagement patterns; feed back to FR-CONTENT-001 topic prioritisation"
risk_if_skipped: "Plan §Phase 2 action 1 names cross-publishing alongside the weekly deep-dive cadence. Each platform reaches a distinct audience slice: dev.to (~150k developer-feed-reading audience; tags-driven discovery), Medium (~broad knowledge-worker readership; algorithmic distribution), LinkedIn (~design-systems-professional cluster; thought-leadership signal). Skipping cross-publishing means deep-dive readership is limited to direct dsaf.dev visitors (low for new posts; high for evergreen). Cross-publishing typically 3-5x the deep-dive's reader engagement over the first 30 days. The cost is small (~45m per deep-dive); the value is the additive audience + canonical-URL preserving search-index signal that compounds across the 12-week cadence. Skipping also costs the post-cross-publication 'Discussion' surface on dsaf.dev — readers searching for discussion of a deep-dive find none, which signals 'no community' even if the engagement existed off-platform."
---

## §1 — Specification (BCP-14 normative)

Each weekly deep-dive from FR-CONTENT-001 MUST be cross-published to three platforms: **dev.to**, **Medium**, **LinkedIn**. Cross-publishing happens T+24-72 hours after dsaf.dev publication (allowing canonical-URL indexing). The cross-published version is the same content as the dsaf.dev original, with canonical URL pointing back to dsaf.dev. The "Discussion" section on the dsaf.dev post updates within 24h of cross-publication to link the 3 cross-platform discussion threads.

1. **MUST** cross-publish each weekly deep-dive (from FR-CONTENT-001) to dev.to + Medium + LinkedIn. The cross-publishing happens at T+24-72 hours after the dsaf.dev publication time (Tuesday 08:00 PT publication → cross-publish window Wednesday 08:00 PT through Friday 08:00 PT).
2. **MUST** set the canonical URL to the dsaf.dev URL on each cross-published version. Per-platform canonical-URL fields: dev.to uses `canonical_url` in the frontmatter (or the "Canonical URL" field in the post editor); Medium uses the "Set canonical link" option in the post settings (added the publisher-stories canonical-link feature in ~2021); LinkedIn long-form articles use a less-formal canonical (the article links back to dsaf.dev at the top + bottom, plus search-engine signal via header noted in §3).
3. **MUST** preserve the same content across platforms. Same title, same intro, same CEA sections, same How-to-self-score, same Cross-references. Platform-required formatting differences are acceptable (Medium's title-vs-subtitle convention; LinkedIn's hashtag-at-end convention; dev.to's tag-based discovery requires tag selection). Content rewrites are NOT acceptable — the SEO-bait condensed version reads as marketing not content.
4. **MUST** add the post's 3 cross-published URLs to the dsaf.dev post's "Discussion" section within 24 hours of cross-publication. Format per §3 template — the section reads "This deep-dive has discussion threads on: [dev.to URL] / [Medium URL] / [LinkedIn URL]."
5. **MUST NOT** cross-publish before the dsaf.dev publication. The discipline is canonical-first: dsaf.dev publishes Tuesday 08:00 PT; cross-publishing waits T+24-72h. Cross-publishing first means search engines initially index the cross-platform versions as canonical, polluting the dsaf.dev signal.
6. **MUST NOT** modify the content substantially between dsaf.dev + cross-published versions. Acceptable modifications: platform-required formatting (Medium's title shorter; LinkedIn's hashtags at end; dev.to's tag list). Unacceptable modifications: changing the framing, adding/removing CEA sections, altering the example or anti-pattern, modifying the How-to-self-score. The same-content rule is what makes the canonical signal credible.
7. **MUST NOT** cross-publish to platforms beyond the 3 named (dev.to + Medium + LinkedIn). The plan recommends these 3. Adding HackerNoon, Hashnode, etc. dilutes the canonical signal across more platforms and increases maintenance burden per deep-dive. If a platform-specific opportunity arises (e.g., a podcast wants to discuss a deep-dive), that's a separate engagement, not cross-publishing.
8. **MUST** use the FR-BRAND-002 handle taxonomy + FR-CORE-004 cap rule + FR-BRAND-004 decoupling rules consistently across platforms. `DSAF` short handle; no `Framework` noun-handle; no L5 marketing; no audit.cyberskill.world CTAs in body.
9. **MUST** engage with discussion threads on each platform per the FR-LAUNCH-001 §3 response patterns (platform-portable). Response SLA looser than launch-week (24-72h per substantive comment vs launch-week's 30-min); patterns same.
10. **MUST** include a "Originally published at dsaf.dev/blog/deep-dives/..." link as the first or last sentence in the cross-published version. This is the human-readable canonical signal that complements the machine-readable canonical_url field; readers see it; search engines parse it.
11. **MUST NOT** auto-cross-publish via tools that strip canonical URLs. Some Medium-import tools fail to preserve canonical settings; some dev.to RSS-import doesn't honour canonical fields. The operator manually publishes each platform's version to ensure canonical is set correctly.
12. **MUST** track each cross-published post in a tracking spreadsheet (or extension to FR-CONTENT-001's schedule). Per-post tracking: dsaf.dev URL + dev.to URL + Medium URL + LinkedIn URL + per-platform upvotes/engagement at T+7d. Per-platform engagement patterns feed back to FR-CONTENT-001 topic prioritisation.
13. **MUST** apply the FR-DOCS-003 §1 #15 forward-only edit discipline. If the dsaf.dev post's ChangeLog gets an entry (substantive content update), the cross-published versions update to match (manual sync; the operator's responsibility). Silent drift between dsaf.dev + cross-published versions breaks the canonical promise.
14. **SHOULD** cross-publish in the order: dev.to first (T+24h), Medium second (T+48h), LinkedIn third (T+72h). The staggered schedule (a) gives the dsaf.dev canonical time to index between each cross-publication, (b) lets the operator handle each platform's specific format/quirks without simultaneous load, (c) catches dev.to (most-developer-focused), then Medium (broader), then LinkedIn (most-professional) audiences in sequence.
15. **MUST** include in the cross-publishing playbook the per-platform anti-patterns (e.g., dev.to allows series; Medium has paywall implications; LinkedIn has character limits + image upload differences). The §3 playbook documents these explicitly.

---

## §2 — Why this design

**Why dev.to + Medium + LinkedIn (§1 #1, #7):** plan §Phase 2 action 1 names these three explicitly. Each reaches a distinct audience: dev.to is developer-feed-driven (~150k monthly readers; tag-based discovery; algorithm prefers engagement); Medium is broad-knowledge-worker (~broad; algorithmic distribution based on read-time); LinkedIn long-form is design-systems-professional cluster (where DS leads + heads-of-design + consultants live). The trio covers the deep-dives' target reader landscape; adding more platforms hits diminishing returns.

**Why T+24-72h delay (§1 #1, #5):** canonical-URL indexing matters. Search engines (Google primary) index the dsaf.dev URL first; the canonical signal then propagates to the cross-published versions. Cross-publishing simultaneously means search engines see the cross-platform versions first, may treat them as canonical, and the dsaf.dev URL loses its search-index authority. T+24h gives dsaf.dev a first-indexing head start; T+72h ceiling prevents the cross-publishing from being too disconnected from the dsaf.dev publication news cycle.

**Why same content, not condensed (§1 #3, #6):** condensed cross-published versions read as SEO-bait. The full content on dsaf.dev + condensed on Medium implies "the real value is on dsaf.dev; this is the teaser." Readers feel manipulated. Same content + canonical URL signal "this is the same content, hosted in multiple places; the canonical is dsaf.dev." The latter is honest + readers respect it.

**Why staggered dev.to → Medium → LinkedIn order (§1 #14):** dev.to first because the audience overlaps most with HN/launch-week readers (developer/practitioner core); they're most likely to engage early. Medium second because Medium's algorithm rewards consistent post cadence; entering on T+48h fits the algorithmic preference for "fresh" posts. LinkedIn last because LinkedIn's audience is the design-systems-professional cluster — they engage with content but at slower cadence (LinkedIn long-form articles get long-tail engagement over weeks).

**Why discussion-section update on dsaf.dev (§1 #4):** readers who arrive on dsaf.dev (the canonical) should find the conversation. If discussion happens on dev.to + Medium + LinkedIn but dsaf.dev shows no links, the canonical surface looks abandoned. The discussion-section update is the connective tissue.

**Why manual not automated cross-publishing (§1 #11):** auto-cross-publishing tools have inconsistent canonical-URL handling. Some strip canonical settings; some auto-import without canonical fields populated; some override with their own canonical (often the originating site, but not always). Manual publishing is ~15 min per platform per deep-dive = ~45 min per deep-dive total. Over 12 weeks = ~9 hours additional founder time. Worth it for canonical preservation.

**Why per-platform anti-patterns in playbook (§1 #15):** each platform has gotchas. dev.to: long posts get auto-truncated unless explicit `<!-- more -->` markers; tags are limited to 4 per post. Medium: paywall-vs-free distinction (the operator's account setting); titles + subtitles are different fields; image sizing differs from dsaf.dev's render. LinkedIn: long-form articles cap at ~150,000 chars but readers skim more aggressively; hashtags go at the end; images require separate upload. The §3 playbook documents these.

**Why same FR-BRAND-002 + FR-CORE-004 + FR-BRAND-004 compliance across platforms (§1 #8):** consistency is the brand discipline. A deep-dive that's "L3 worked example" on dsaf.dev + "L5 industry-leading" on LinkedIn breaks the framework's credibility. The cap rules apply uniformly.

**Why no auto-cross-publishing tools (§1 #11):** beyond canonical-URL handling, auto-publishing tools often misformat (Markdown → platform-specific HTML differences). The operator-curated manual publishing is the quality gate. The tooling-cost (~9 founder-hours over 12 weeks) is acceptable; the discipline cost of bad auto-publish is higher.

---

## §3 — Doctrine contract

### `docs/content/cross-publishing-playbook.md` — the canonical playbook

```markdown
---
title: "DSAF cross-publishing playbook (FR-CONTENT-002)"
ratified_by: FR-CONTENT-002 (2026-05-17)
cadence: per weekly deep-dive — cross-publish T+24-72h after dsaf.dev publication
platforms: dev.to + Medium + LinkedIn
---

# DSAF cross-publishing playbook

This file is the operations doc for FR-CONTENT-002. Each weekly deep-dive from FR-CONTENT-001 gets cross-published to 3 platforms with canonical URL preserved.

## §3.1 — Per-platform cross-publishing procedure

### dev.to (T+24h, ~15 min per post)

1. Log in to dev.to with the founder's account.
2. Click "Create Post."
3. Frontmatter:
   ```yaml
   ---
   title: "[Same as dsaf.dev title]"
   published: true
   description: "[Same as dsaf.dev summary]"
   tags: designsystems, dsaf, [criterion-category-tag], [topic-tag]
   canonical_url: https://dsaf.dev/blog/deep-dives/<slug>
   cover_image: [Same as dsaf.dev OG image — upload separately if needed]
   ---
   ```
4. Paste the deep-dive body content (CEA + How-to-self-score + Cross-references).
5. First sentence (above the body): "*Originally published at [dsaf.dev/blog/deep-dives/<slug>](https://dsaf.dev/blog/deep-dives/<slug>).*"
6. Verify `canonical_url` is set correctly; preview before publishing.
7. Click "Publish."
8. Copy the published dev.to URL.

### Medium (T+48h, ~15 min per post)

1. Log in to Medium with the founder's account.
2. Click "Write."
3. Paste the deep-dive body (Medium uses a WYSIWYG editor — paste from markdown may need formatting fixes).
4. Title: same as dsaf.dev. Subtitle: 1-sentence description (extract from dsaf.dev summary).
5. Cover image: same as dsaf.dev OG image (uploaded separately).
6. First sentence: "*Originally published at [dsaf.dev/blog/deep-dives/<slug>](https://dsaf.dev/blog/deep-dives/<slug>).*"
7. Tags: 5 tags max — `designsystems`, `dsaf`, `[criterion-category]`, `[topic]`, `[methodology/audit/etc.]`.
8. Click "..." → "Edit story details" → set canonical URL to dsaf.dev URL.
9. Click "Publish."
10. Copy the published Medium URL.

### LinkedIn long-form (T+72h, ~15 min per post)

1. Log in to LinkedIn with the founder's account.
2. Click "Write article" (the long-form article publishing surface; NOT the regular post / status).
3. Paste the deep-dive body (LinkedIn's editor supports Markdown-flavoured paste).
4. Title: same as dsaf.dev.
5. Cover image: same as dsaf.dev OG image.
6. First paragraph: "*Originally published at [dsaf.dev/blog/deep-dives/<slug>](https://dsaf.dev/blog/deep-dives/<slug>). Cross-publishing here for the LinkedIn audience.*"
7. Body: paste full deep-dive content (CEA + How-to-self-score + Cross-references).
8. End-of-post hashtags: `#DSAF #DesignSystems #[CriterionCategory] #[Topic]`
9. LinkedIn doesn't have an explicit canonical-URL field for long-form articles. The signal is the "Originally published at" link at the top + the bottom-of-post hashtag/URL combination + a structured-data hint (LinkedIn parses some Open Graph; the linked dsaf.dev page's `<link rel="canonical">` is the primary signal).
10. Click "Publish."
11. Copy the published LinkedIn URL.

## §3.2 — Update dsaf.dev "Discussion" section (T+72h, ~5 min per post)

After all 3 cross-publishing's complete, update the dsaf.dev post's "Discussion" section per FR-CONTENT-001 §3 template:

```markdown
## Discussion

This deep-dive has discussion threads on:

- [dev.to thread](dev.to URL)
- [Medium response thread](Medium URL)
- [LinkedIn long-form post](LinkedIn URL)

Reach out via [hello@dsaf.dev](mailto:hello@dsaf.dev) or open an issue on [GitHub](https://github.com/CyberSkill/design-system-audit-framework/issues).
```

## §3.3 — Per-platform anti-patterns

### dev.to anti-patterns

- **Forgetting `canonical_url` in frontmatter.** dev.to allows posts without canonical; without it, dev.to is treated as canonical by search engines.
- **Using > 4 tags.** dev.to limits to 4; extras get silently dropped at publish.
- **Long posts without `<!-- more -->` markers.** Posts > ~2000 words get truncated in the feed without explicit markers.
- **Cover image not uploaded.** dev.to allows external image URLs but they may break; upload to dev.to's CDN.

### Medium anti-patterns

- **Forgetting "Edit story details" → canonical URL.** Medium's canonical setting is under the publish-time settings menu, not the main editor. Easy to skip.
- **Paywall toggle accidentally on.** If the founder's Medium account has the partner-program, the publish toggle defaults to paywall. The deep-dives are free; toggle off before publishing.
- **Subtitle in title field.** Medium's title-vs-subtitle convention: title is ~1 short sentence; subtitle is ~1 sentence explanation. Mis-using one for the other looks amateur.
- **Images sized wrong.** Medium auto-scales but quality drops; use 1200px-wide images for inline; Medium's cover image is 1600×875 ideally.

### LinkedIn anti-patterns

- **Posting as status update instead of article.** Status updates cap at ~3,000 chars; deep-dives need the long-form article surface.
- **Hashtags scattered through body.** LinkedIn convention is hashtags at the END; mid-body hashtags read as spam.
- **Direct link to GitHub repo in the article body.** LinkedIn's algorithm down-weights articles with external GitHub links (treats as off-platform redirect). Link via the "Originally published at" sentence + the dsaf.dev URL.
- **Article without cover image.** LinkedIn long-form without cover image gets ~50% less impression share in feed.

## §3.4 — Tracking format

```markdown
## Per-deep-dive cross-publishing tracking

| Deep-dive | dsaf.dev URL | dev.to URL | Medium URL | LinkedIn URL | T+7d engagement (per platform) |
|---|---|---|---|---|---|
| W1 — A.1.1 Color tokens | dsaf.dev/blog/deep-dives/... | dev.to/... | medium.com/... | linkedin.com/pulse/... | dev.to: 40 reactions, 8 comments; Medium: 200 reads, 6 claps; LinkedIn: 1.2k impressions, 25 reactions |
| W2 — ... | ... | ... | ... | ... | ... |
```

Update every Tuesday (when new deep-dive publishes) — T+7d data from previous week's deep-dive becomes available.

## §3.5 — Engagement-pattern feedback to FR-CONTENT-001

Every 4 weeks, identify per-platform engagement patterns:

- Which platform drives most reader engagement (reactions + comments)?
- Which topics did best on which platform?
- Are there topics raised in comments that should become future deep-dives?

Feed back to `docs/content/deep-dive-schedule.md` (FR-CONTENT-001) for upcoming-cadence re-prioritisation.

## §3.6 — Substantive-edit sync discipline

Per FR-DOCS-003 §1 #15 + FR-CONTENT-001 §1 #12 ChangeLog discipline: if the dsaf.dev deep-dive gets a substantive content update (ChangeLog entry), the cross-published versions update to match.

- dev.to: edit the post via dev.to's editor; canonical_url stays the same; updated_at field auto-updates.
- Medium: edit via Medium's editor; canonical setting persists.
- LinkedIn: edit via "Manage article" interface; LinkedIn shows "edited" indicator.

Timeline: cross-platform updates within 7 days of the dsaf.dev ChangeLog entry. Silent drift > 7 days breaks the canonical promise.
```

### `dsaf.dev/blog/deep-dives/_template.md` — patch (post-cross-publication discussion section)

The FR-CONTENT-001 template already has the Discussion section structure. This FR's patch is operational guidance — the section's URLs get filled at T+72h per §3.2. No template-content change beyond confirming the section exists in the FR-CONTENT-001 template (already verified).

---

## §4 — Acceptance criteria

1. **Playbook committed** — `docs/content/cross-publishing-playbook.md` exists with §3.1 per-platform procedures (dev.to + Medium + LinkedIn) + §3.2 dsaf.dev Discussion update + §3.3 per-platform anti-patterns + §3.4 tracking format + §3.5 engagement-pattern feedback + §3.6 substantive-edit sync.
2. **3 platforms enumerated** — `docs/content/cross-publishing-playbook.md` §3.1 has subsections for dev.to, Medium, LinkedIn.
3. **Each platform's procedure has ≥ 7 numbered steps** — each §3.1 platform subsection has 7+ procedure steps including the canonical-URL handling step.
4. **Canonical-URL handling explicit per platform** — dev.to subsection mentions `canonical_url` frontmatter; Medium subsection mentions "Edit story details" → canonical URL; LinkedIn subsection mentions the "Originally published at" sentence + structured-data hint.
5. **"Originally published at" sentence required for each platform** — §3.1 each platform subsection specifies this sentence.
6. **T+24h / T+48h / T+72h staggered timing** — §3.1 subsections specify dev.to at T+24h, Medium at T+48h, LinkedIn at T+72h.
7. **Anti-patterns documented per platform** — §3.3 has ≥ 4 anti-patterns per platform (dev.to, Medium, LinkedIn each).
8. **Tracking format provided** — §3.4 has a markdown table with columns for Deep-dive / dsaf.dev URL / dev.to URL / Medium URL / LinkedIn URL / T+7d engagement.
9. **Substantive-edit sync discipline documented** — §3.6 specifies the per-platform edit procedure + 7-day timeline.
10. **Engagement-pattern feedback to FR-CONTENT-001 documented** — §3.5 describes the 4-weekly review feeding back to deep-dive-schedule.md.
11. **No auto-cross-publishing tools mentioned as approved** — `grep -ciE 'auto.cross.publish|RSS.import|auto.import' docs/content/cross-publishing-playbook.md` returns 0 (or returns only the anti-pattern mentions).
12. **Handle taxonomy compliance** — `grep -ciE '\b(the )?DSAF Framework\b|\bDSAF framework\b' docs/content/cross-publishing-playbook.md` returns 0; `grep -c '\bDSAF\b' docs/content/cross-publishing-playbook.md` ≥ 3.
13. **No 84.6 / L5 marketing** — `grep -ciE '84\.6|industry[- ]?leading|top tier|L5 Optimised' docs/content/cross-publishing-playbook.md` returns 0.
14. **No paid CTAs** — `grep -ciE 'Talk to a certified|Contact (us|sales|CyberSkill)|Schedule (a|your) demo|Book (a|your) call' docs/content/cross-publishing-playbook.md` returns 0.
15. **PR description includes per-deep-dive elapsed-time estimate** — PR description states the ~45m per deep-dive estimate (15m × 3 platforms + 5m Discussion-update).

---

## §5 — Verification

```bash
# AC1, AC2 — file + 3 platform sections
test -f docs/content/cross-publishing-playbook.md
for platform in 'dev.to' 'Medium' 'LinkedIn'; do
  grep -qF "### ${platform}" docs/content/cross-publishing-playbook.md || echo "MISSING: ${platform}"
done

# AC3 — ≥ 7 steps per platform
for platform in 'dev.to' 'Medium' 'LinkedIn'; do
  awk -v p="### ${platform}" '$0 ~ p {flag=1; next} /^### / {flag=0} flag' docs/content/cross-publishing-playbook.md | \
    grep -cE '^[0-9]+\.'
  # expected: >= 7 per platform
done

# AC4 — canonical handling per platform
grep -q 'canonical_url' docs/content/cross-publishing-playbook.md   # dev.to
grep -q 'Edit story details' docs/content/cross-publishing-playbook.md   # Medium
grep -q 'Originally published at' docs/content/cross-publishing-playbook.md   # LinkedIn + others

# AC6 — staggered timing
grep -E 'T\+24h|T\+48h|T\+72h' docs/content/cross-publishing-playbook.md | wc -l
# expected: >= 3 (one per platform)

# AC7 — anti-patterns per platform
for platform in 'dev.to' 'Medium' 'LinkedIn'; do
  awk -v p="### ${platform} anti-patterns" '$0 ~ p {flag=1; next} /^### / {flag=0} flag' docs/content/cross-publishing-playbook.md | \
    grep -cE '^- \*\*'
  # expected: >= 4 per platform
done

# AC8 — tracking format
grep -q 'Deep-dive | dsaf.dev URL | dev.to URL | Medium URL | LinkedIn URL' docs/content/cross-publishing-playbook.md

# AC11 — no auto-tools approved
awk '/^### .* anti-patterns/{flag=0} /^## §3.6/{flag=0} /## /{flag=1} flag' docs/content/cross-publishing-playbook.md | \
  grep -ciE 'auto.cross.publish|RSS.import|auto.import'
# expected: 0 (auto-tools only mentioned in anti-patterns context)

# AC12 — handle taxonomy
grep -ciE '\b(the )?DSAF Framework\b|\bDSAF framework\b' docs/content/cross-publishing-playbook.md  # 0
grep -c '\bDSAF\b' docs/content/cross-publishing-playbook.md  # >= 3

# AC13 — no marketing claims
grep -ciE '84\.6|industry[- ]?leading|top tier|L5 Optimised' docs/content/cross-publishing-playbook.md  # 0

# AC14 — no paid CTAs
grep -ciE 'Talk to a certified|Contact (us|sales|CyberSkill)|Schedule (a|your) demo|Book (a|your) call' docs/content/cross-publishing-playbook.md  # 0
```

Human-verified ACs (no script):

- **AC5** — reviewer reads §3.1 each platform's "Originally published at" sentence specification.
- **AC9, AC10** — reviewer reads §3.5 + §3.6 for engagement-feedback + sync discipline.
- **AC15** — reviewer reads PR description for elapsed-time estimate.

---

## §6 — Implementation skeleton

The operator playbook (3h setup + ~45m per weekly deep-dive):

1. **(30m) Author `docs/content/cross-publishing-playbook.md`** per §3 — all 6 sub-sections.
2. **(15m) Verify FR-CONTENT-001 `_template.md`** "Discussion" section structure is consistent with §3.2 update procedure.
3. **(per-weekly-deep-dive, T+24h, ~15m) Publish to dev.to** per §3.1 dev.to procedure.
4. **(per-weekly-deep-dive, T+48h, ~15m) Publish to Medium** per §3.1 Medium procedure.
5. **(per-weekly-deep-dive, T+72h, ~15m) Publish to LinkedIn** per §3.1 LinkedIn procedure.
6. **(per-weekly-deep-dive, T+72h, ~5m) Update dsaf.dev post's Discussion section** per §3.2.
7. **(per-weekly-deep-dive monitoring, ~30m elapsed over T+24h to T+14d) Respond to discussion comments** per FR-LAUNCH-001 §3 response patterns (platform-portable).
8. **(every 4 weeks, ~15m) Per-platform engagement-pattern review** per §3.5; feed back to FR-CONTENT-001 schedule.

---

## §7 — Dependencies

- **Upstream (required):**
  - **FR-CONTENT-001** — weekly deep-dive cadence + template + schedule live; cross-publishing consumes the deep-dives.
- **Coordinated:**
  - **FR-BRAND-001** — dsaf.dev canonical URLs preserved in cross-published versions.
  - **FR-BRAND-002** — handle taxonomy applied uniformly across platforms.
  - **FR-CORE-004** — cap rule applied (no L5 marketing) uniformly across platforms.
  - **FR-BRAND-004** — decoupling rule applied (no audit.cyberskill.world CTAs in body) uniformly.
  - **FR-DOCS-003** — ChangeLog forward-only edit discipline applies to cross-published versions.
  - **FR-LAUNCH-005** — guest articles on Smashing/CSS-Tricks/ALA are separate; FR-CONTENT-002's cross-publishing of deep-dives is *additional*, not replacing.
- **Downstream blocks:** none directly.
- **External:**
  - dev.to account (founder's personal).
  - Medium account (founder's personal; partner-program status configurable per §3.3 Medium anti-pattern).
  - LinkedIn account (founder's personal; long-form article publishing surface).

---

## §8 — Example payloads

### Example: a dev.to post's frontmatter (W1 deep-dive)

```yaml
---
title: "A.1.1: Color tokens with primitive→semantic→component layers — DSAF deep-dive 1"
published: true
description: "Why the three-tier architecture matters: a deep-dive on DSAF Criterion A.1.1, with IBM Carbon as the example."
tags: designsystems, dsaf, foundations, colortokens
canonical_url: https://dsaf.dev/blog/deep-dives/2026-09-08-a1-1-color-tokens-three-tier-architecture
cover_image: https://dsaf.dev/assets/og/deep-dive-a1-1-1200x630.png
---

*Originally published at [dsaf.dev/blog/deep-dives/2026-09-08-a1-1-color-tokens-three-tier-architecture](https://dsaf.dev/blog/deep-dives/2026-09-08-a1-1-color-tokens-three-tier-architecture).*

[Body content follows — same as dsaf.dev post]
```

### Example: a successful cross-publishing T+7d engagement snapshot

```markdown
W1 — A.1.1 Color tokens (cross-published 2026-09-09 through 2026-09-11)

- dsaf.dev URL: https://dsaf.dev/blog/deep-dives/2026-09-08-a1-1-color-tokens-three-tier-architecture
- dev.to URL: https://dev.to/stephencheng/a-1-1-color-tokens-with-primitive-semantic-component-layers-dsaf-deep-dive-1
  - T+7d: 142 reactions, 23 comments, 1.8k views
- Medium URL: https://medium.com/@stephencheng/a-1-1-color-tokens
  - T+7d: 380 reads, 24 claps, 5 highlights
- LinkedIn URL: https://www.linkedin.com/pulse/a-1-1-color-tokens-...
  - T+7d: 4.2k impressions, 87 reactions, 11 comments, 6 reposts

Pattern observation: dev.to drove the most substantive engagement (23 comments); LinkedIn drove the most impressions (passive readership). Medium's algorithm hasn't surfaced this post much (likely due to no member-paywall — partner-program disabled).
```

### Example: a substantive-edit sync (post-ChangeLog)

```markdown
[dsaf.dev W3 deep-dive on A.8.6 Color contrast got a ChangeLog entry on 2026-10-15: "Updated APCA Lc 60 reference to APCA Lc 75 per WCAG 3.0 working draft 2026.10 ratification."]

Sync actions completed 2026-10-17 (within 7 days):
- dev.to: edited the post; canonical_url unchanged; updated_at timestamp shows 2026-10-17.
- Medium: edited via Medium editor; canonical setting persisted; edited indicator visible.
- LinkedIn: edited via "Manage article"; LinkedIn shows "edited" indicator at top of article.

Tracking file updated to reflect sync timestamp.
```

---

## §9 — Open questions

All resolved at authoring time:

- **Q1: 3 platforms or more / fewer?** Resolved → 3 (plan §Phase 2 action 1 + practical maintenance budget). dev.to + Medium + LinkedIn cover the deep-dive target audiences without diminishing returns.
- **Q2: T+24-72h staggered or T+0 simultaneous?** Resolved → staggered (§1 #1, #14). Simultaneous publishing pollutes canonical-URL signal.
- **Q3: Same content or condensed per platform?** Resolved → same content (§1 #3, #6). Condensed reads as SEO-bait + breaks the canonical promise.
- **Q4: Auto-cross-publishing tools?** Resolved → no (§1 #11). Manual publishing preserves canonical handling.
- **Q5: What if a cross-published version drifts from dsaf.dev (e.g., a platform's editor auto-corrects markdown)?** Resolved → sync discipline per §3.6; the operator manually corrects within 7 days. If auto-corrects are pervasive, future-FR might add a CI lint comparing dsaf.dev vs cross-published versions.
- **Q6: Republish older deep-dives if cross-publishing was skipped initially?** Resolved → no automatic backfill. Cross-publishing happens contemporaneously with dsaf.dev publication. Operator MAY backfill manually for high-value historical deep-dives (e.g., a 6-month-old post that's getting renewed citation), but it's discretionary.
- **Q7: What about HackerNoon, Hashnode, other developer-content platforms?** Resolved → not in scope (§1 #7). Adding more platforms increases maintenance burden disproportionately to engagement gain. The 3 named platforms have proven audiences for the deep-dive target.

---

## §10 — Failure modes inventory

| Failure | Detection | Outcome | Recovery |
|---|---|---|---|
| Canonical URL not set on a cross-published version | search-engine result shows cross-platform version as canonical | dsaf.dev loses search-index authority | Edit the cross-published version to set canonical; wait for search engine re-crawl (~1-4 weeks); silent re-canonical fix is acceptable |
| Cross-published version differs substantially from dsaf.dev (auto-correct, missed sync) | reader spots discrepancy | Trust degradation | Sync the cross-published version to match dsaf.dev within 24h; log the auto-correct pattern for future awareness |
| Operator skips cross-publishing one week | tracking file gap | One week's deep-dive misses 3 audiences | Cross-publish at T+7d-from-dsaf.dev with explicit "Originally published last Tuesday at dsaf.dev/..." framing; future weeks resume normal cadence |
| dev.to tag limit exceeded (5+ tags) | publish flag | Tags silently dropped | Pre-publish review: max 4 tags |
| Medium paywall accidentally on | post not freely accessible | Reader frustration | Edit story; toggle paywall off; ~1 hour delay for cache invalidation |
| LinkedIn auto-truncates long-form article | reader sees "see more" cut | Content not fully read | Use LinkedIn long-form article surface, NOT status update; verify full content visible after publish |
| Cross-published post gets more engagement than dsaf.dev original | analytics | Canonical signal weakening | The "Originally published at" + canonical_url should preserve the signal; verify search engines treat dsaf.dev as canonical via Google Search Console; if not, escalate canonical visibility |
| ChangeLog drift > 7 days | comparison check | Canonical promise broken | Sync within 7 days per §3.6; if missed, log explicitly + sync immediately + don't repeat |
| Platform-specific reader asks about content not in the cross-published version | comment | Sync gap | Reply pointing at dsaf.dev for current canonical; sync the cross-published version immediately |
| dev.to / Medium / LinkedIn account-level issue (suspension, ToS violation) | platform notification | Cross-publishing channel blocked | Engage platform support; if blocked permanently, cross-publish to remaining 2 platforms; consider replacement platform per §1 #7 reasoning |
| Auto-import tool used despite §1 #11 ban | post lacks canonical | Search-index pollution | Manual re-publish with canonical set; delete auto-imported version |
| Discussion section's URLs become stale (platform URLs change) | tracking discrepancy | Reader frustrated | Update dsaf.dev Discussion section per ChangeLog discipline |

---

## §11 — Implementation notes

- **The ~45m per deep-dive overhead is real.** Over 12 weeks: ~9 founder-hours additional time beyond FR-CONTENT-001's ~24h. Total P2 content time: ~33 founder-hours over 3 months. Sustainable but not trivial; consider co-maintainer cadence-share post-FR-GOV-002.
- **About the staggered T+24h/T+48h/T+72h schedule:** the staggering serves two purposes — canonical-URL indexing time + operator load distribution. Doing all 3 platforms in one sitting (~45m) is acceptable IF the operator schedules a Wednesday block; staggering across 3 days fits better for some workflows.
- **Why dev.to first:** dev.to's audience overlaps most with HN/Reddit launch-week readers (developer/practitioner core). They're most likely to engage substantively early; the engagement signal feeds the dev.to algorithm + boosts later-platform visibility.
- **About Medium paywall:** the founder's Medium account may have partner-program enabled (which defaults to paywall). The deep-dives are free content; the paywall toggle MUST be off. If the founder benefits from partner-program revenue elsewhere, this account decision may need separate consideration.
- **LinkedIn's canonical-URL handling is the weakest of the 3.** No explicit canonical-URL field for long-form articles. The "Originally published at" sentence + the bottom URL + the linked dsaf.dev page's `<link rel="canonical">` together signal canonical; Google generally honours this. Verify periodically via Google Search Console.
- **About the engagement-pattern feedback to FR-CONTENT-001:** the 4-weekly review reveals which platforms reward which topics. dev.to may reward tactical engineering topics (token tools, Storybook integrations); Medium may reward methodology topics (criteria-graded scoring philosophy); LinkedIn may reward governance/leadership topics. These patterns shape future deep-dive topic prioritisation.
- **Co-maintainer cadence-share post-FR-GOV-002:** if a co-maintainer joins mid-P2, they can author every-other-week's cross-publishing (alternating with founder); reduces founder burden + signals genuine co-maintenance.
- **About auto-cross-publishing tools (Buffer, Hootsuite, Zapier):** these tools' canonical-URL handling is inconsistent. The FR's manual-publishing discipline is explicit. If a future tool reliably preserves canonical URLs across all 3 platforms, the FR can be revised; today's tools don't.

---

*End of FR-CONTENT-002.*
