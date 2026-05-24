---
id: FR-LAUNCH-003
title: "Product Hunt launch — hunter recruit, day-of run book, realistic 200–800 upvote target"
module: LAUNCH
priority: SHOULD
status: done
verify: I
phase: P1
milestone: P1 · slice 1 · Launch
slice: 1
owner: Stephen Cheng (Founder)
created: 2026-05-17
shipped: 2026-05-18
related_frs: [FR-DOCS-001, FR-DOCS-003, FR-LAUNCH-001, FR-LAUNCH-002, FR-LAUNCH-004, FR-BRAND-003]
depends_on: [FR-DOCS-001, FR-DOCS-003]
blocks: []
source_pages:
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Phase 1 — Launch action 3)"
source_decisions:
  - "DEC-043: Product Hunt is parallel to Show HN — same launch week, separately scheduled, hunter recruit is the difference-maker"
  - "DEC-044: hunter shortlist prioritises DS-tooling-adjacent makers over generic top-PH-hunters (relevant audience > broad audience)"
  - "DEC-045: 200-800 upvote range is the realistic PH ceiling for an OSS framework launch; over-investing for higher numbers diverts founder bandwidth from Show HN engagement"
language: markdown + ops
service: doctrine + outreach ops
new_files:
  - internal/launch/product-hunt-launch.md
modified_files:
  - internal/launch/post-hn-feedback.md   # extended post-launch with PH metrics + comment patterns
allowed_tools:
  - "file_read/write internal/launch/**"
  - "manual posting via Product Hunt's submission flow"
  - "email outreach to hunter candidates"
disallowed_tools:
  - "submit Product Hunt without a confirmed hunter (self-hunting is allowed but de-prioritised; the hunter recruit is the difference-maker)"
  - "ask anyone to upvote Product Hunt (PH's vote-manipulation detection same penalty class as HN)"
  - "schedule PH launch >48h apart from Show HN (the visibility-push surfaces benefit from clustering)"
  - "use third-party 'launch services' that promise upvotes (PH bans accounts that engage with paid-upvote services)"
effort_hours: 4
sub_tasks:
  - "1. (30m) Author internal/launch/product-hunt-launch.md per §3 — PH listing copy + hunter recruit shortlist + day-of run book"
  - "2. (1h, ~1 week pre-launch) Hunter outreach — contact 2-3 shortlist candidates with 'would you hunt this' ask"
  - "3. (15m, at hunter confirmation) Confirm launch date with hunter; sync with FR-LAUNCH-001 Show HN schedule (target: same week, ideally same day or day-after Show HN)"
  - "4. (1h, day-of) PH submission via hunter (or self-submission as fallback); 6 image assets uploaded; tagline, description, links populated"
  - "5. (~3h elapsed, ~1h founder-time over PH launch day) Monitor PH thread; respond to comments; engage maker community; do NOT solicit votes"
  - "6. (T+24h post-PH) Update internal/launch/post-hn-feedback.md with PH outcome (upvotes, comments, makers-of-the-day rank if any)"
risk_if_skipped: "Product Hunt is a parallel visibility channel to Show HN. Realistic upvote ceiling for an OSS framework is 200-800 (the plan's expectation); even mid-range outcomes translate to ~3,000-8,000 unique referrals from PH's daily-digest email + on-platform browsing. Skipping PH cedes that audience slice; not all of those referrals also see Show HN (PH skews more product-oriented and less developer-narrowly than HN). The risk surface is small (4h, mostly elapsed-time hunter coordination + day-of monitoring); the value is the additive visibility plus a different community's signal. Skipping is acceptable if (a) no hunter responds and self-hunting feels weird, OR (b) the operator's bandwidth at launch week is genuinely maxed by Show HN + cross-posts. Otherwise the FR is the cheap-add to the visibility stack."
---

## §1 — Description (BCP-14 normative)

The framework's launch SHOULD include a Product Hunt submission as a parallel visibility surface to Show HN. PH submission MUST be hunter-recruited (a maker with PH standing posts the launch on the founder's behalf) where possible; self-submission is acceptable fallback but cedes the hunter's audience slice. Scheduling is in the same week as Show HN (ideally same day or day-after); coordination with FR-LAUNCH-001 + FR-LAUNCH-002 prevents bandwidth conflicts.

**2026-05-18 implementation note:** the Product Hunt launch pack is repo-shipped in `internal/launch/product-hunt-launch.md`, with listing copy, concrete May 20/21 2026 schedule, hunter outreach, maker first comment, and six generated gallery assets under `assets/ph/`. Manual posting remains blocked until a hunter confirms (or Stephen chooses self-submit), Show HN is live or explicitly waived, and the production site serves the launch blog/OG assets.

1. **MUST** publish PH listing copy at `internal/launch/product-hunt-launch.md` per §3 with: PH title (≤ 60 chars per PH format), tagline (≤ 60 chars), description (≤ 260 chars), product URL, 6 image asset specifications, hunter-recruit shortlist (3-5 candidates), day-of run book.
2. **MUST** recruit a hunter from the §3 shortlist before submission where possible. Hunter requirements: PH standing ≥ 100 hunts (or comparable, OR known DS-tooling-adjacent maker who has hunted in the design/dev space). Hunter outreach happens 7-10 days pre-launch via personal email; the ask is "would you hunt DSAF on Product Hunt the day of our Show HN launch? Hunter credit is yours; we provide the listing copy + assets."
3. **SHOULD** target same-day or day-after-Show HN for PH submission. PH launches at midnight Pacific Time (day-of) — so PH submission on Tuesday goes live at Tue 00:00 PT, while Show HN posts at Tue 08:00 PT later that day. The 8-hour offset is acceptable; Show HN gets the early morning, PH gets the rest of the day. If hunter availability doesn't align with Show HN, day-after PH is acceptable.
4. **MUST** populate the PH listing with the same canonical URLs as Show HN + cross-posts: dsaf.dev/card (DSAF-25 Core, 5-min entry), github.com/cyberskill-official/design-system-audit-framework (repo), dsaf.dev/blog/launch-2026 (origin story). The "Product URL" field MUST point at github.com/cyberskill-official/design-system-audit-framework (repo, not landing) per PH convention for OSS projects.
5. **MUST** upload 6 image assets per §3 spec: (a) main thumbnail — the DSAF L0-L5 ladder rendered at 1200×630 px, (b) screenshot 1 — DSAF radar rendered at 1200×750 px, (c) screenshot 2 — DSAF-25 Core card rendered at 1200×750 px, (d) screenshot 3 — README hero section screenshot at 1200×750 px, (e) screenshot 4 — sample audit report headline section at 1200×750 px, (f) logo — DSAF wordmark at 240×240 px (square). All assets are derived from FR-BRAND-003 visuals OR existing repo screenshots.
6. **MUST** include the founder's first comment within 15 minutes of PH listing going live. PH culture expects the maker (founder) to engage from comment #1. The comment text is per §3 — names the founder, opens the thread for engagement, links to extended context.
7. **MUST** monitor the PH thread for the first 12 hours per the SLA in §3.2: (a) 1-hour SLA per substantive comment in the first 4 hours; (b) 2-hour SLA next 8 hours; (c) "as available" thereafter. PH's engagement curve is longer than HN's (PH posts get visibility for ~24 hours, sometimes extended via "Product of the Day" badge), so the SLA is looser than FR-LAUNCH-001's 30-min HN SLA.
8. **MUST** respond per FR-LAUNCH-001 §3 response-pattern templates (platform-portable). PH-specific patterns: emoji-friendlier than HN (PH culture supports judicious emoji use); slightly more upbeat tone (PH skews maker-positive); same anti-patterns as HN (no defensive aggression, no "well actually").
9. **MUST NOT** ask anyone to upvote PH. PH's vote-manipulation detection (paid-upvote services, vote rings, brand-new-account vote clusters) is sophisticated; flagged accounts get banned + the launch is killed. FR-LAUNCH-004 heads-up outreach is informational only; vote-asking is forbidden everywhere.
10. **MUST NOT** use third-party "launch services" that promise upvotes, hunter coordination, or guaranteed PH-of-the-day placement. These services violate PH's terms; using them gets the account banned. Plan §"What NOT to do" item 1 ("repo is sacred") generalises to "PH listing is sacred — no paid amplification."
11. **MUST** apply the FR-BRAND-002 handle taxonomy. PH tagline + description use `DSAF` short handle; long name `Design System Audit Framework` exactly once (at first mention or in subtitle).
12. **MUST** apply the FR-CORE-004 self-audit cap rule. PH listing doesn't reference the CyberSkill self-audit as a marketing claim ("our system at L5"); the worked example is mentioned only as a link in the description, framed as "complete worked example" not as a quality claim.
13. **MUST** track PH outcome in `internal/launch/post-hn-feedback.md` (extended from FR-LAUNCH-001/002 tracking) with: PH listing URL, hunter name (if applicable), upvotes at T+24h, makers-of-the-day rank if any, top-3 substantive comments + founder responses. PH-specific patterns: which features draw the most PH-audience engagement (PH leans product-utility-focused vs HN's technical-design-focus).
14. **MUST NOT** post PH listing if Show HN gets flagged or removed (per FR-LAUNCH-001 §1 #15 kill-switch). Same dependency-chain logic: cross-platform launches pause together if the primary surface fails.
15. **SHOULD** include a "PH-exclusive" element — e.g., a free DSAF-25 self-scoring spreadsheet at dsaf.dev/spreadsheet, OR an invite to the future P2 community Discord/Slack. PH culture rewards launches that offer something specific to the PH audience; the exclusive element is the difference between a 200-upvote launch and a 500-upvote launch. If no exclusive is available, omit (don't fabricate one).

---

## §2 — Why this design

**Why Product Hunt as parallel surface (§1 #1, #3):** PH is a separate audience — more product-oriented makers + early-adopter tech professionals, less developer-narrowly than HN. The audience overlap with HN is maybe 30-40%; the other 60-70% are PH-native readers who wouldn't see Show HN. Skipping PH cedes that slice. Plan §Phase 1 action 3 names PH with the "realistic 200-800 upvote target" calibration.

**Why hunter recruit > self-hunt (§1 #2):** PH's algorithm rewards hunter-recruited launches more than self-hunted ones (the hunter's existing follower base notifies on submission). A hunter with 500 followers means ~50-100 of those followers see the launch in their PH feed at submission time; that early-engagement signal drives placement on the daily ranking. Self-submission means zero early-engagement signal; the launch starts cold. Hunter recruit is the operational difference-maker.

**Why DS-tooling-adjacent makers over generic top-hunters (§1 #2):** generic top-hunters (Chris Messina, Robleh Jama, etc.) have huge followings but their audiences are noise relative to DSAF — most PH followers don't care about design system audit rubrics. A maker who's hunted DS-adjacent tools (Storybook plugins, Figma integrations, token tools) brings a smaller-but-relevant audience that's higher-conversion. The plan's "Chris Messina or any DS-tooling-adjacent maker" range captures both options; the FR prefers the adjacency where possible.

**Why same-week scheduling with Show HN (§1 #3):** clustering visibility pushes amplifies signal (cross-platform readers see DSAF in multiple feeds within 24-48 hours, reinforcing memorability). Spacing them weeks apart loses the cumulative effect; each push reads as a separate event rather than a coordinated launch.

**Why 6 image assets specifically (§1 #5):** PH listing space allows up to 6 images; using fewer cedes the visual real estate. The 6 assets cover (a) the iconic visual (L0-L5 ladder), (b) the diagnostic visual (radar), (c) the share-handle (DSAF-25 Core card), (d) the entry-point (README hero), (e) the proof-of-concept (sample audit report), (f) the brand mark (logo). Each asset answers a different visitor question.

**Why 15-minute founder-first-comment (§1 #6):** PH's culture expects the maker to be present from comment #1. A listing with no maker comment at T+1h reads as "submitted and abandoned"; community engagement drops. 15-min SLA is the operational floor.

**Why looser SLA than HN (§1 #7):** PH's engagement curve is longer (~24h of visibility vs HN's ~12h on front page). The PH audience expects engagement but not at HN's velocity. 1-hour SLA in the first 4h is sufficient; pushing to HN's 30-min SLA would conflict with simultaneous Show HN response load.

**Why no third-party launch services (§1 #10):** these services (offering "we'll get you 500 upvotes for $X") explicitly violate PH ToS. They're detectable (vote pattern analysis); accounts that engage with them get banned. The founder's launch can't risk this — banned account = launch dead. The discipline is "no paid amplification of any kind."

**Why optional "PH-exclusive" element (§1 #15):** PH audiences reward listings that offer something specific to the PH audience — a discount, an early-access invite, a free download. For DSAF, plausible exclusives are (a) the DSAF-25 self-scoring spreadsheet (post-launch download), (b) an invite to a P2 community space (if one exists by launch time). The exclusive isn't required (SHOULD not MUST) because fabricating an exclusive when there isn't one to offer reads as fake. If a genuine exclusive exists, include; if not, omit.

**Why PH-listing cap rule discipline (§1 #12):** PH's "feature your product's wow-factor" format pushes founders toward marketing-speak. FR-CORE-004 cap rule prevents the worst form ("our framework scores 84.6% on itself"); the worked example reference frames as "complete worked example" instead. The discipline preserves credibility across the launch-surface stack.

**Why same kill-switch as Show HN (§1 #14):** the visibility surfaces are coordinated; if the primary surface (Show HN) is in trouble, secondary surfaces (PH, cross-posts) should pause. Continuing PH while Show HN is flagged broadcasts a confusing signal to the audience overlap.

---

## §3 — Doctrine contract

### `internal/launch/product-hunt-launch.md` — the canonical PH launch doc

```markdown
---
title: "Product Hunt launch — DSAF"
ratified_by: FR-LAUNCH-003 (2026-05-17)
target_date: same week as Show HN (per FR-LAUNCH-001); ideally same day or day-after
hunter: PLACEHOLDER — filled at hunter confirmation
ph_listing_url: PLACEHOLDER — filled at submission
---

# Product Hunt launch — DSAF

## §3.1 — Listing copy

### Title (≤ 60 chars)

```
DSAF — Open-source design system maturity framework
```

(Character count: 50 chars)

### Tagline (≤ 60 chars)

```
125 criteria, L0–L5 tiers, agent-native. Free + OSS.
```

(Character count: 53 chars)

### Description (≤ 260 chars)

```
The open-source design system audit framework. 125 criteria across 20 categories, six maturity tiers (L0 → L5), LLM-agent integration, shipping scripts. Free alternative to closed-source SaaS audit platforms. Read the 5-min entry at dsaf.dev/card.
```

(Character count: 254 chars)

### Product URL

```
https://github.com/cyberskill-official/design-system-audit-framework
```

(NOT dsaf.dev — PH convention for OSS projects is to point at the repo. The dsaf.dev URLs go in the description + the founder's first comment.)

### Topics / Tags (PH limits to 3)

```
- Developer Tools
- Design Tools
- Open Source
```

### Maker / Hunter

- **Maker:** Stephen Cheng (founder; required field)
- **Hunter:** [PLACEHOLDER — filled from §3.4 shortlist]

## §3.2 — Image assets (6 total)

| # | Asset | Dimensions | Source | Notes |
|---|---|---|---|---|
| 1 | Main thumbnail | 1200×630 | FR-BRAND-003 L0-L5 ladder rendered as PNG | Iconic visual; first impression |
| 2 | Screenshot 1 | 1200×750 | FR-BRAND-003 DSAF radar rendered as PNG | Diagnostic visual; per-category coverage |
| 3 | Screenshot 2 | 1200×750 | FR-CORE-001 DSAF-25 Core card rendered as PNG | Share-handle; "5-minute read" framing |
| 4 | Screenshot 3 | 1200×750 | Browser screenshot of README hero section (post-FR-DOCS-001) | Entry-point; what a visitor sees first |
| 5 | Screenshot 4 | 1200×750 | Browser screenshot of CyberSkill worked-example audit report headline | Proof-of-concept; "this is what an audit looks like" |
| 6 | Logo | 240×240 | DSAF wordmark on white square (per FR-BRAND-002 handle taxonomy) | Brand mark |

All assets MUST conform to FR-BRAND-002 handle taxonomy (DSAF short handle, no `Framework` noun-handle) and FR-CORE-004 cap rule (no 84.6%, no L5 marketing claim).

## §3.3 — Founder's first comment (≤ 15 min after listing goes live)

```
Hi PH 👋 Maker here (Stephen Cheng, CyberSkill).

DSAF is the open-source design system audit framework I've been wanting for 3 years. Most maturity content in DS is blog posts (Big Medium, Sparkbox, Brad Frost) or SaaS-gated (zeroheight, Knapsack, Supernova). DSAF is the missing fourth thing — a downloadable criteria-graded rubric you can run quarterly.

A few links that didn't fit the description:

- 5-min entry: https://dsaf.dev/card (DSAF-25 Core — the one-page subset)
- Origin story + candid limitations: https://dsaf.dev/blog/launch-2026
- Currently on Show HN: [Show HN URL — added post-Show HN submission]

Disclosure: I run CyberSkill (a Vietnam-based software consultancy); DSAF is open-source MIT; CyberSkill offers paid audit services at audit.cyberskill.world (separate site). The decoupling is deliberate and documented at https://github.com/cyberskill-official/design-system-audit-framework/blob/main/internal/branding/brand-decoupling-domain-decision.md

Roast welcome — what's missing? What's wrong? AMA.
```

## §3.4 — Hunter recruit shortlist (ranked by DS-tooling-adjacency)

| # | Name | PH standing | DS-adjacency signal | Outreach status |
|---|---|---|---|---|
| 1 | [DS-tooling maker who's hunted Storybook/Figma plugin launches] | ≥ 50 hunts | Hunted Storybook addon, Figma plugin in 2024-2025 | not contacted |
| 2 | [Front-end-framework maker who's hunted utility CSS/Tailwind launches] | ≥ 30 hunts | Hunted Tailwind/Mantine launches | not contacted |
| 3 | Chris Messina | 1000+ hunts | Generic top-hunter; broad PH audience but low DS-adjacency | not contacted (fallback) |
| 4 | Robleh Jama | 500+ hunts | Generic; fallback | not contacted (fallback) |
| 5 | [Self-submission] | — | Self-hunt; cedes hunter's audience boost; acceptable fallback | option-of-last-resort |

The operator at PR land time fills the first two rows from PH-search: search PH for "design system" / "design tokens" / "Storybook" / "Figma" hunted launches in 2024-2025; the hunters whose names appear repeatedly are the DS-adjacency candidates. The shortlist tracking file is `internal/launch/product-hunt-launch.md` itself.

## §3.5 — Hunter outreach template

```
Subject: Would you hunt DSAF on Product Hunt? (open-source design system audit framework)

Hi [name],

I'm Stephen Cheng, founder of CyberSkill. I'm launching DSAF — an open-source design system maturity framework — on Show HN next week, and I'd value your help getting it on Product Hunt the same day.

DSAF is 125 criteria across 20 categories, mapped to a six-tier L0–L5 scale, with LLM-agent integration. It's the open-source alternative to zeroheight / Knapsack / Supernova. The repo's at https://github.com/cyberskill-official/design-system-audit-framework; the 5-min entry is at dsaf.dev/card; the candid origin-story blog post is at dsaf.dev/blog/launch-2026.

I noticed you've hunted [specific DS-adjacent launch in 2024-2025] on PH — that audience seems like the right fit for DSAF. Would you be open to hunting this launch? Hunter credit is yours; I provide the listing copy + 6 image assets + the founder-first-comment within 15 minutes of submission.

Timing: target submission [DATE — Tue or Wed], coordinated with my Show HN post the same day.

No expectation either way — happy to self-hunt as fallback if it's not a fit for you.

Stephen
zintaen@gmail.com
```

## §3.6 — Day-of run book

| Time | Action |
|---|---|
| T-7 days | Hunter recruit outreach (§3.5 template) |
| T-3 days | Confirm hunter or pivot to self-submission; finalise listing copy |
| T-1 day | Render + verify 6 image assets; pre-validate URL resolution (curl block from FR-LAUNCH-001 §3) |
| T-1h | Hunter (or operator) prepares submission flow in PH browser tab |
| T+0 (midnight PT) | PH listing goes live |
| T+15 min | Founder's first comment posted (per §3.3) |
| T+1h | Check PH ranking — first hour of PH-of-the-day positioning is most volatile |
| T+1h to T+4h | 1-hour SLA per substantive comment (per FR-LAUNCH-001 §3 patterns, platform-portable) |
| T+4h to T+12h | 2-hour SLA per substantive comment |
| T+12h to T+24h | "as available" cadence; monitor for PH-of-the-day badge announcement |
| T+24h | Update internal/launch/post-hn-feedback.md with PH outcome (upvotes, comments, badge if any) |
| T+72h | Surface PH cross-platform patterns to FR-CONTENT-001 deep-dive candidates |

## §3.7 — Pre-launch verification (T-1 day)

```bash
# Same URL verification as FR-LAUNCH-001 §3:
for url in \
    https://dsaf.dev/ \
    https://dsaf.dev/card \
    https://dsaf.dev/blog/launch-2026 \
    https://github.com/cyberskill-official/design-system-audit-framework; do
  status=$(curl -sI "${url}" | head -1 | awk '{print $2}')
  echo "${url}: ${status}"
  [ "${status}" = "200" ] || echo "FAIL: ${url} returned ${status}"
done

# Verify all 6 image assets render (file size between 50KB and 2MB, PNG format):
for asset in \
    assets/ph/dsaf-thumbnail-1200x630.png \
    assets/ph/dsaf-radar-screenshot-1200x750.png \
    assets/ph/dsaf-25-card-screenshot-1200x750.png \
    assets/ph/dsaf-readme-screenshot-1200x750.png \
    assets/ph/dsaf-audit-screenshot-1200x750.png \
    assets/ph/dsaf-logo-240x240.png; do
  test -f "${asset}" || echo "MISSING: ${asset}"
  size=$(wc -c < "${asset}")
  [ "${size}" -ge 50000 ] && [ "${size}" -le 2097152 ] || echo "SIZE OUT OF RANGE: ${asset} (${size} bytes)"
done
```

## §3.8 — Tracking file extension (post-launch)

Extend the FR-LAUNCH-001/002 tracking file with a PH section:

```markdown
## Product Hunt launch tracking (FR-LAUNCH-003)

- Listing URL: https://www.producthunt.com/posts/PLACEHOLDER
- Hunter: [name OR "self-hunted"]
- Launch date: 2026-MM-DD
- Upvotes at T+24h: [filled at T+24h]
- Engagement range: [low 200-300 / mid 300-500 / high 500-800]
- PH-of-the-day rank (if any): [filled if applicable; PH posts top-5 in the daily-digest email]
- Top substantive comments + founder responses: [list]
- Outcome: [active / declining / flagged]

## Cross-surface patterns (HN + cross-posts + PH)

[Patterns appearing on PH that also appeared on HN or cross-posts → strongest FR-CONTENT-001 deep-dive candidates]
```
```

---

## §4 — Acceptance criteria

1. **PH launch doc committed** — `internal/launch/product-hunt-launch.md` exists with §3.1 listing copy + §3.2 image assets + §3.3 founder first comment + §3.4 hunter shortlist + §3.5 outreach template + §3.6 day-of run book + §3.7 pre-launch verification + §3.8 tracking extension.
2. **Title ≤ 60 chars** — `internal/launch/product-hunt-launch.md` §3.1 Title section text is ≤ 60 chars.
3. **Tagline ≤ 60 chars** — §3.1 Tagline section text is ≤ 60 chars.
4. **Description ≤ 260 chars** — §3.1 Description section text is ≤ 260 chars.
5. **Product URL is repo** — §3.1 Product URL section is `https://github.com/cyberskill-official/design-system-audit-framework`.
6. **6 image assets specified** — §3.2 has 6 rows with dimensions + source per asset.
7. **Founder first comment ≤ 1,500 chars (PH cap is longer than HN's 1,000)** — §3.3 first comment text is ≤ 1,500 chars.
8. **Hunter shortlist has ≥ 3 rows** — §3.4 has at least 3 named candidates (or placeholders for the operator to fill); a self-submission fallback row is also present.
9. **Hunter outreach template present** — §3.5 contains the verbatim template ≤ 1,500 chars.
10. **Day-of run book has ≥ 8 timing entries** — §3.6 timing table has at least 8 rows from T-7 days through T+72h.
11. **Pre-launch verification has URL + asset checks** — §3.7 has both `curl` URL checks + `wc -c` asset-size checks.
12. **Tracking file extension provided** — §3.8 has PH-section template + cross-surface-patterns section.
13. **Handle taxonomy compliance** — `grep -ciE 'DSAF Framework|DSAF framework' internal/launch/product-hunt-launch.md` returns 0; `grep -c '\bDSAF\b' internal/launch/product-hunt-launch.md` ≥ 5.
14. **No 84.6% or L5 marketing** — `grep -ciE '84\.6|industry[- ]?leading|top tier|L5 Optimised' internal/launch/product-hunt-launch.md` returns 0.
15. **No vote-manipulation language** — `grep -ciE 'upvote|please upvote' internal/launch/product-hunt-launch.md` returns 0.
16. **Decoupling-disclosure line in first comment** — §3.3 first comment text mentions audit.cyberskill.world as a "separate site" per FR-BRAND-004 disclosure pattern.
17. **PR description includes hunter-recruit status** — at PR land time, the description names the top-3 hunter candidates contacted + their response status.

---

## §5 — Verification

```bash
# AC1 — file committed with all sections
test -f internal/launch/product-hunt-launch.md
for section in '## §3.1 — Listing copy' '## §3.2 — Image assets' '## §3.3 — Founder' '## §3.4 — Hunter recruit' '## §3.5 — Hunter outreach' '## §3.6 — Day-of run book' '## §3.7 — Pre-launch verification' '## §3.8 — Tracking file extension'; do
  grep -qF "${section}" internal/launch/product-hunt-launch.md || echo "MISSING: ${section}"
done

# AC2, AC3, AC4 — character-count caps
title_chars=$(awk '/^### Title/{flag=1;next}/^###/{flag=0}flag' internal/launch/product-hunt-launch.md | grep -v '^```' | grep -v '^$' | tr -d '\n' | wc -c)
[ "${title_chars}" -le 60 ] || echo "FAIL AC2: title ${title_chars} chars"

tagline_chars=$(awk '/^### Tagline/{flag=1;next}/^###/{flag=0}flag' internal/launch/product-hunt-launch.md | grep -v '^```' | grep -v '^$' | tr -d '\n' | wc -c)
[ "${tagline_chars}" -le 60 ] || echo "FAIL AC3: tagline ${tagline_chars} chars"

desc_chars=$(awk '/^### Description/{flag=1;next}/^###/{flag=0}flag' internal/launch/product-hunt-launch.md | grep -v '^```' | grep -v '^$' | tr -d '\n' | wc -c)
[ "${desc_chars}" -le 260 ] || echo "FAIL AC4: description ${desc_chars} chars"

# AC5 — product URL is repo
grep -A 2 '### Product URL' internal/launch/product-hunt-launch.md | grep -q 'github.com/cyberskill-official/design-system-audit-framework'

# AC6 — 6 image assets
awk '/^## §3.2 — Image assets/,/^## §3.3/' internal/launch/product-hunt-launch.md | grep -cE '^\| [0-9]'
# expected: 6

# AC8 — hunter shortlist ≥ 3 rows
awk '/^## §3.4 — Hunter recruit/,/^## §3.5/' internal/launch/product-hunt-launch.md | grep -cE '^\| [0-9]'
# expected: ≥ 3

# AC10 — run book ≥ 8 timing entries
awk '/^## §3.6 — Day-of run book/,/^## §3.7/' internal/launch/product-hunt-launch.md | grep -cE '^\| T'
# expected: ≥ 8

# AC11 — pre-launch verification has URL + asset checks
grep -q 'curl -sI' internal/launch/product-hunt-launch.md
grep -q 'wc -c' internal/launch/product-hunt-launch.md

# AC13 — handle taxonomy
grep -ciE '\b(the )?DSAF Framework\b|\bDSAF framework\b' internal/launch/product-hunt-launch.md  # 0
grep -c '\bDSAF\b' internal/launch/product-hunt-launch.md  # >= 5

# AC14 — no 84.6 / L5 marketing
grep -ciE '84\.6|industry[- ]?leading|top tier|L5 Optimised' internal/launch/product-hunt-launch.md  # 0

# AC15 — no vote-manipulation
grep -ciE 'upvote|please upvote' internal/launch/product-hunt-launch.md  # 0

# AC16 — decoupling disclosure in first comment
awk '/^## §3.3/,/^## §3.4/' internal/launch/product-hunt-launch.md | grep -q 'audit.cyberskill.world.*separate site'
```

Human-verified ACs (no script):

- **AC7** — reviewer counts first-comment characters at PR review.
- **AC9** — reviewer reads §3.5 template for content + tone.
- **AC12** — reviewer confirms §3.8 PH-section + cross-surface-patterns structure.
- **AC17** — reviewer reads PR description for hunter-status snapshot.

---

## §6 — Implementation skeleton

The operator playbook (4h):

1. **(30m) Author `internal/launch/product-hunt-launch.md`** per §3 — all 8 sub-sections.
2. **(1h, ~7-10 days pre-launch) Hunter outreach.** Identify 2-3 DS-adjacency candidates via PH search (search "design system" / "Storybook" / "Figma" / "design tokens" hunted launches in 2024-2025). Send §3.5 template; track response status in §3.4 shortlist.
3. **(15m at hunter confirmation OR T-3 days for self-submission fallback) Lock launch date.** Sync with FR-LAUNCH-001 Show HN date; target same day or day-after.
4. **(1h, T-1 day) Render image assets.** Use FR-BRAND-003 visuals as source; render to PNG at the specified dimensions; commit to `assets/ph/` (or equivalent).
5. **(5m, T+0) Hunter (or operator) submits PH listing** with the §3.1 copy + 6 assets + URL.
6. **(5m, T+15min) Founder posts first comment** per §3.3 verbatim.
7. **(over ~12h elapsed, ~1h founder-time) Monitor + respond per §3.6 timing.** Apply FR-LAUNCH-001 §3 response patterns (platform-portable to PH).
8. **(15m, T+24h) Update tracking file** per §3.8.
9. **(15m, T+72h) Surface PH cross-platform patterns** to FR-CONTENT-001 deep-dive candidates.

---

## §7 — Dependencies

- **Upstream (required):**
  - **FR-DOCS-001** — README live; PH listing's "Product URL" goes here.
  - **FR-DOCS-003** — blog post live; founder's first comment links to it.
- **Coordinated:**
  - **FR-LAUNCH-001** (Show HN) — PH scheduled in same week, ideally same day or day-after; shares dependency-chain kill-switch.
  - **FR-LAUNCH-002** (cross-posts) — parallel visibility surfaces; same operator bandwidth across same launch week.
  - **FR-LAUNCH-004** (T-7 heads-up outreach) — recipients are informed about both Show HN and PH; no separate ask.
  - **FR-BRAND-003** — visuals are source assets for PH thumbnails + screenshots.
  - **FR-CORE-001** — DSAF-25 Core card screenshot is one of the 6 PH assets.
- **Downstream blocks:** none directly; FR-CONTENT-001 (P2) consumes PH cross-platform patterns.
- **External:**
  - PH account (the founder's personal account + hunter's account).
  - Email outreach to hunter candidates.
  - PNG-rendering tool (Figma export, Inkscape, headless Chrome) for asset generation.

---

## §8 — Example payloads

### Example: a successful hunter recruit + launch outcome

```
T-9 days: Hunter outreach to 3 DS-adjacency candidates
T-7 days: Candidate #1 replies "Yes, happy to hunt — looks aligned with [their previous Storybook launch]; tell me the date"
T-3 days: Launch date confirmed (Tue 2026-MM-DD); listing copy + assets finalised
T-1 day: Pre-launch verification all green
T+0 (Tue 00:00 PT): Hunter submits PH listing
T+0:15: Founder's first comment posted per §3.3
T+1h: PH rank #14 (Top 50 of the day); upvotes 38
T+4h: PH rank #6 (Top 10); upvotes 142
T+12h: PH rank #4; upvotes 285
T+24h: PH "Product of the Day" badge AWARDED; final upvotes 412 (mid-range per §3.2 expectations)
T+24h tracking: 8 substantive comments, 2 from existing PH community members, 1 from a Carbon designer (potential FR-CONTENT-001 deep-dive candidate)
```

### Example: a self-submission fallback (hunter unavailable)

```
T-7 days: 3 hunter candidates contacted
T-5 days: 1 declines (timing); 2 don't respond
T-3 days: No hunter confirmed; pivot to self-submission
T-3 days: Operator self-hunts; lower expected upvotes (~150-300 range, low-mid of §3.2)
T+0: Self-submission goes live
T+0:15: Founder's first comment per §3.3
T+24h: 168 upvotes (low-range); no PH-of-the-day badge
Tracking outcome: low-range; signal that hunter recruit matters for OSS frameworks; future-launch lesson is "start hunter outreach earlier (T-14 days), widen the candidate list"
```

### Example: a PH-specific comment pattern

```
PH commenter: "Love the L0-L5 framing — is there a way to import existing audit reports into the next iteration?"
Founder response per FR-LAUNCH-001 §3 Pattern 4 + PH-emoji-friendlier tone: "Thanks! 🙏 Not in v0.1; the audit-report-template.md is the input format today. In P5 (months 12-18) we ship `npx dsaf scan` which auto-imports repo state; that's the closer thing. Would love your thoughts on what 'import' should look like for your context — feel free to drop a thread issue on GitHub."
```

The emoji + slightly upbeat tone are PH-cultural; same substance as the HN equivalent.

---

## §9 — Open questions

All resolved at authoring time:

- **Q1: Hunter recruit or self-submit?** Resolved → hunter recruit preferred; self-submit fallback. Hunter's audience boost is significant; if no hunter available, ship anyway with calibrated lower-range expectations.
- **Q2: Same day or day-after Show HN?** Resolved → same day preferred (clustering amplifies signal); day-after acceptable if hunter availability requires it. > 48h apart loses the cluster effect.
- **Q3: Topics/tags — 3 max per PH?** Resolved → Developer Tools / Design Tools / Open Source. Other options (Productivity, SaaS) don't fit DSAF; the 3 chosen are highest-signal for the target audience.
- **Q4: PH-exclusive offer — what?** Resolved → optional per §1 #15. If a genuine exclusive exists (free spreadsheet, community invite), include; if not, omit. Fabricating an exclusive reads as fake.
- **Q5: Hunter compensation?** Resolved → none. PH culture doesn't compensate hunters; reciprocity is "hunter credit on the listing" + future engagement. Paid hunting is against PH ToS.
- **Q6: PH submission window — midnight PT or any time?** Resolved → midnight PT (PH's "day starts at midnight" model means the listing has full 24h visibility). Submission later in the day cuts the visibility window.
- **Q7: What if PH algorithm doesn't pick up the listing (low T+1h rank)?** Resolved → no algorithm-gaming. The launch trajectory is what it is. If rank is low at T+1h, focus operator bandwidth on Show HN + cross-posts; PH-of-the-day badge is icing, not the goal.

---

## §10 — Failure modes inventory

| Failure | Detection | Outcome | Recovery |
|---|---|---|---|
| No hunter responds in outreach window | T-3 days no confirmation | Self-submission fallback; lower-range expectations | Pre-publish self-submission decision at T-3 days; don't keep waiting past T-3 |
| Hunter agrees then no-shows at T+0 | midnight PT no submission | Launch slot missed | Self-submit immediately; hunter relationship preserved by silent forbearance (don't publicly blame; revisit privately post-launch) |
| Image assets fail to render at PH-required dimensions | T-1 day verification fails | Listing has missing/cropped images | Re-render via Figma export or alternate tool; fall back to fewer assets (5 instead of 6) rather than wrong-sized assets |
| PH listing flagged for self-promotion / vote manipulation | mod-message | Account suspended | Engage PH community team politely; do NOT use third-party launch services to recover (worse) |
| Hunter community of followers is irrelevant to DSAF (audience mismatch) | T+4h low engagement | Launch trajectory weak | Acceptable failure mode; future launches use DS-adjacency more strictly in hunter selection |
| Founder's first comment delayed past 15-min SLA | maker absent at midnight PT | Community parses as "submitted and abandoned" | Founder MUST be available T+0 to T+1h; the time-zone burden is the same as FR-LAUNCH-001 (midnight PT = 3pm Vietnam — actually better than Show HN's 11pm-1am) |
| PH-of-the-day badge contested between similar OSS launches | competitor at top of daily ranking | DSAF gets #2 or #3 | Acceptable; #2/#3 still get badge + visibility; founder's response focuses on engagement, not ranking |
| Comments on PH ask questions DSAF doesn't have good answers to yet (e.g., specific integrations) | tracking | Signal of next-iteration priorities | FR-CONTENT-001 deep-dive candidates; not a launch failure |
| Show HN gets flagged → cascading PH kill-switch | dependency-chain alert | PH submission paused | Per §1 #14: if Show HN is flagged, don't post PH; align kill-switch responses |
| PH listing URL has typo → 404 destination | T-1h verification missed | Visitors land on broken page | Pre-launch URL verification (§3.7) is the gate; if posted with typo, edit listing within PH's edit window (~1-2 hours) |
| Hunter inserts a typo or wrong URL during submission | manual review T+0 | Listing has wrong content | The operator has the canonical §3.1 copy; if hunter's submission deviates, request edit immediately (PH allows maker edits) |
| Operator over-invests in PH at expense of Show HN engagement | tracking SLA gaps on HN | HN trajectory weakens | The §3.6 day-of run book lists HN as parallel; operator bandwidth is partitioned (HN 30-min SLA primary; PH 1-hour SLA secondary) |
| Vote-manipulation accusation surfaces in PH comments | "this is fake / paid" comments | Trust damage | Engage transparently per FR-LAUNCH-001 §3 Pattern 1 / Pattern 8 (if hostile no-substance, don't engage; if substantive concern, address with the FR-LAUNCH-004 informational-only outreach context) |

---

## §11 — Implementation notes

- **The 4-hour budget is mostly hunter coordination + day-of monitoring.** ~30 min to author the listing doc; ~1h hunter outreach + tracking; ~1h asset rendering + verification; ~1h founder bandwidth during PH launch day (lighter than HN's 4h). Total elapsed time including the 7-10-day hunter recruit window is ~10 days.
- **Hunter recruit is the difference-maker.** A confirmed DS-adjacency hunter adds ~50-100 upvotes to the launch's early-hours velocity vs self-submission. The hunter outreach is 1 hour of work for ~100-upvote return; high-ROI. Skip only if no hunter responds by T-3 days.
- **About the time-zone burden vs HN:** PH launches at midnight PT (00:00 PT = 15:00 Vietnam UTC+7) — much better than Show HN's 11pm-1am Vietnam (which is 8am-10am PT). For PH, the founder is awake during normal local hours, which makes the 15-min first-comment SLA easier to hit. The compound launch-week burden (Show HN at 11pm-1am + PH at midnight PT same week) is ~6-8 hours of focused founder time across 2-3 days; sustainable.
- **PH-of-the-day badge is icing.** Top-5 in the daily ranking earns "Product of the Day" badge in the daily-digest email + PH homepage. ~10-15% of launches earn the badge; for DSAF (niche audience), expectations should be #6-#15 daily — which gets visibility without badge. Don't optimise for the badge; optimise for the engagement.
- **Asset rendering tool choice:** Figma is easiest (export-to-PNG at custom dimensions); Inkscape works for SVG→PNG; headless Chrome (`chromium --screenshot=... --window-size=1200,630`) works for browser-rendered screenshots (README hero, sample audit). The choice depends on what the asset source is.
- **About the PH-cultural emoji use:** judicious. One emoji in the first comment opener (👋) is fine; emoji-heavy throughout reads as trying-too-hard. The substance discipline (FR-LAUNCH-001 §3 patterns) is the same; the tonal surface is slightly warmer.
- **Hunter shortlist building is operator research.** The §3.4 placeholders ("DS-tooling maker who's hunted Storybook/Figma plugin launches") require the operator to actually search PH for these names at outreach time. The names change month-to-month; capturing them as text in the FR would stale quickly.
- **About the post-launch "Cross-surface patterns" analysis:** if a concern surfaces on Show HN AND PH AND ≥ 1 cross-post, it's a high-priority FR-CONTENT-001 deep-dive candidate. The cross-surface validation is the signal that the concern matters to the broad design-systems audience, not just one community.

---

*End of FR-LAUNCH-003.*
