---
id: FR-LAUNCH-002
title: "Cross-posts to r/web_design · r/UXDesign · r/programming · Lobste.rs · daily.dev · Designer News — sized engagement ranges + T+4h-to-T+12h sequencing"
module: LAUNCH
priority: MUST
status: accepted
verify: I
phase: P1
milestone: P1 · slice 1 · Launch
slice: 1
owner: Stephen Cheng (Founder)
created: 2026-05-17
shipped: null
related_frs: [FR-DOCS-001, FR-DOCS-003, FR-LAUNCH-001, FR-LAUNCH-003, FR-LAUNCH-005, FR-CONTENT-001]
depends_on: [FR-LAUNCH-001]
blocks: []
source_pages:
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Phase 1 — Launch action 2)"
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§What drives GitHub stars items 1, 3)"
source_decisions:
  - "DEC-039: cross-posts are sequenced (Show HN first, others T+4h to T+12h after) to avoid attention dilution and gather Show HN traction signal first"
  - "DEC-040: each platform gets a customised post text matching its norms — no copy-paste cross-posting"
  - "DEC-041: each platform has a sized engagement range (realistic upvote ceiling) so trajectory isn't measured against unrealistic benchmarks"
  - "DEC-042: cross-posts use the same canonical URLs as Show HN (dsaf.dev/card + GitHub repo + dsaf.dev/blog/launch-2026) — single canonical, multi-surface"
language: markdown + ops
service: doctrine + outreach ops
new_files:
  - docs/launch/cross-posts.md
modified_files:
  - docs/launch/post-hn-feedback.md  # post-launch: cross-platform feedback patterns logged here alongside HN
allowed_tools:
  - "file_read/write docs/launch/**"
  - "manual posting to Reddit / Lobste.rs / daily.dev / Designer News"
  - "browser monitoring of cross-post threads during their response windows"
disallowed_tools:
  - "copy-paste the Show HN body verbatim to other platforms (different communities, different norms)"
  - "ask anyone to upvote on Reddit / Lobste.rs / etc. (each platform has its own vote-manipulation rules; violations same as HN)"
  - "post to all platforms simultaneously (attention dilution + each platform's algorithm wants organic-looking signal)"
  - "post on platforms without account standing (e.g., creating a brand-new Lobste.rs account just to launch — community norms require existing account)"
effort_hours: 4
sub_tasks:
  - "1. (30m) Author docs/launch/cross-posts.md per §3 — 6 platform-specific posts with timing, customised body, engagement ranges"
  - "2. (15m) Verify account standing on each platform: existing accounts with non-zero karma/standing where possible; flag any platform requiring new-account creation"
  - "3. (T+4h after Show HN) Post Reddit r/web_design"
  - "4. (T+6h after Show HN) Post Reddit r/UXDesign"
  - "5. (T+8h after Show HN) Post Reddit r/programming (high-stakes; broad audience)"
  - "6. (T+10h after Show HN) Post Lobste.rs (invite-only; requires account)"
  - "7. (T+12h after Show HN) Post daily.dev + Designer News (lighter touch; secondary visibility)"
  - "8. (over ~24-48h elapsed) Monitor each thread per the per-platform SLA in §3"
  - "9. (T+72h) Update docs/launch/post-hn-feedback.md with cross-platform feedback patterns; surface candidates for FR-CONTENT-001"
risk_if_skipped: "Plan §Phase 1 — Launch action 2 specifies the cross-post list verbatim. Skipping the cross-posts caps the launch's visibility at Show HN trajectory alone — a top-quartile Show HN draws ~5,000 unique GitHub visitors; well-executed cross-posts add another 3,000-8,000 over the same week. The plan's 300-700-stars-in-launch-week target depends on the cross-posts pulling their share. Skipping also costs the secondary-platform signal: r/web_design + r/UXDesign + Designer News audiences are the practitioner core; Lobste.rs is a quality-signal venue (mention in Lobste.rs frequently leads to citations in seasoned-engineer blogs); daily.dev surfaces to ~150k developers in their reading feed. Each platform adds a different audience slice. The cost of this FR is small (4h spread across the cross-post window); the value is the launch-week star ceiling difference between 300 and 700."
---

## §1 — Specification (BCP-14 normative)

The framework's launch MUST cross-post to six platforms following Show HN, with each platform's post customised to its community norms, sequenced to gather Show HN traction signal first, and monitored per a per-platform engagement SLA. Each cross-post links to the same canonical URLs (dsaf.dev/card + GitHub repo + dsaf.dev/blog/launch-2026); only the body copy + timing + per-platform conventions vary.

1. **MUST** post to all six platforms in the launch window: (a) **r/web_design** on Reddit, (b) **r/UXDesign** on Reddit, (c) **r/programming** on Reddit, (d) **Lobste.rs**, (e) **daily.dev**, (f) **Designer News**. The platform list is from plan §Phase 1 action 2 verbatim; deviating means giving up a piece of the launch surface.
2. **MUST** sequence the cross-posts at T+4h to T+12h after Show HN per §3.1 timing table. T+0 is the Show HN submission; the cross-posts come AFTER Show HN trajectory is visible (typically the front-page positioning has settled by T+4h). Posting cross-posts simultaneously with Show HN dilutes attention; posting later than T+12h means the day-of-launch buzz has faded.
3. **MUST** customise each platform's post body per §3 — no copy-paste cross-posting. Each community has different norms: r/web_design wants visuals + actionable practical framing; r/UXDesign wants UX-narrative framing; r/programming wants technical-spec framing; Lobste.rs wants depth + considered framing; daily.dev wants headline-driven framing; Designer News wants design-conversation framing. The body MUST match the community.
4. **MUST** declare a sized engagement range per platform per §3.2. The ranges set realistic expectations: r/web_design typical 200-600 upvotes for a launch like DSAF; r/UXDesign typical 100-300; r/programming typical 50-200 (broader audience, harder to convert); Lobste.rs typical 20-80 (smaller community but higher-quality signal); daily.dev typical 50-150; Designer News typical 30-100. The PR description records the ranges; the post-launch tracking captures actual numbers.
5. **MUST** use the same canonical URLs across all platforms: dsaf.dev/card (DSAF-25 Core, 5-min entry), github.com/CyberSkill/design-system-audit-framework (repo), dsaf.dev/blog/launch-2026 (origin story). Single canonical, multi-surface — different bodies, same destinations. URL fragments are OK per platform (e.g., a r/UXDesign post may link directly to a Part B criterion); the *primary* canonicals stay.
6. **MUST NOT** ask anyone (followers, employees, FR-LAUNCH-004 heads-up recipients, FR-GOV-001 reviewers) to upvote on any platform. Each platform has its own vote-manipulation detection; consequences range from post removal (Reddit) to account ban (Lobste.rs). The launch trajectory is whatever organic engagement the post generates.
7. **MUST NOT** create a brand-new account on any platform just to post the launch. Lobste.rs is invite-only; daily.dev allows new accounts but new-account submissions are flagged. The founder posts from an existing account with non-zero standing (per AC2 verification). If account standing doesn't exist on a platform, that platform is SKIPPED in this FR's submission — the operator MAY revisit post-P1 once standing is built.
8. **MUST** monitor each cross-post thread per the per-platform SLA in §3.3. The SLAs are looser than Show HN's 30-minute SLA (the cross-posts are secondary surfaces, not primary), but engagement still matters. Reddit thread response SLA is 2 hours for the first 4 hours, then 4 hours through hour 24; Lobste.rs SLA is 4 hours for the first 12 hours (smaller community, slower cadence); daily.dev + Designer News SLA is "as available" (lighter engagement expectations).
9. **MUST** respond graciously per the FR-LAUNCH-001 §3 response-pattern templates. The patterns are platform-portable; "Pattern 1: critic surfaces a real limitation" works on Reddit + Lobste.rs + Designer News identically. The same anti-patterns also apply: no "well actually," no defensive aggression.
10. **MUST NOT** posting in a community after a moderation removal. If a moderator removes the post (e.g., r/programming sometimes removes "Show HN-style" submissions for self-promotion), the operator MUST NOT repost; instead, log the removal in the tracking file and skip the platform for this launch. Post-launch (P2+), the operator MAY revisit with adjusted framing.
11. **MUST** track each cross-post in `docs/launch/post-hn-feedback.md` (extended from FR-LAUNCH-001's tracking file) with: post URL, post timestamp, current upvote count at T+24h, top-3 substantive comments, founder responses, outcome (active / declining / removed). Patterns surfacing across platforms feed FR-CONTENT-001 deep-dive candidates.
12. **MUST** apply the FR-BRAND-002 handle taxonomy throughout all cross-post bodies + responses. `DSAF` short handle in 90%+ of mentions; `Design System Audit Framework` long name exactly once at first mention; no `Framework` noun-handle.
13. **MUST** include the founder's identifier in each cross-post body. Reddit accepts the founder's username inline; Lobste.rs / daily.dev / Designer News show the submitter's account by default. The founder's name + CyberSkill mention happen in the body or in the first follow-up comment per platform convention.
14. **MUST** schedule cross-posts to gather (and benefit from) the Show HN signal but NOT to mention it as primary social proof. The cross-post body MAY mention "we're also on Show HN: [URL]" near the bottom (post-T+4h, the HN URL is stable), but the *primary* framing is per-platform. Leading with "we're trending on HN" reads as cross-platform manipulation; mentioning it as one of several touchpoints is acceptable.
15. **MUST NOT** post the cross-posts if Show HN gets flagged or removed by HN moderators (per FR-LAUNCH-001 §1 #9 kill-switch condition #5). The HN removal is a signal that something is wrong; cross-posting amplifies the wrong thing. Pause + investigate + revise before continuing.

---

## §2 — Why this design

**Why six platforms, plan-recommended list (§1 #1):** plan §Phase 1 action 2 researched the platforms and the list is the contract. Each platform reaches a distinct audience slice: r/web_design (practitioner core, ~500k subscribers), r/UXDesign (UX-focused, ~150k), r/programming (broad developer, ~5M but harder to convert), Lobste.rs (quality-signal, ~20k high-trust readers), daily.dev (~150k developer feed-reading audience), Designer News (~50k designer-niche). Skipping any of them loses that slice.

**Why T+4h to T+12h sequencing (§1 #2):** Show HN's first 4 hours are the front-page-positioning critical window; cross-posts in those first 4 hours dilute the founder's response bandwidth (founder can't be at 30-min SLA on Show HN AND responding to Reddit + Lobste.rs simultaneously). After T+4h, Show HN trajectory is visible and the founder can shift attention to cross-posts without dropping HN SLA. T+12h is the upper bound — post launches feel "of the day" only when posted in roughly the same news cycle; T+24h cross-posts read as "yesterday's news."

**Why customised bodies per platform (§1 #3):** community norms vary dramatically. r/web_design rewards visual-heavy + practitioner-focused framing; r/programming rewards technical-spec framing with skepticism-inviting questions; Lobste.rs rewards depth + considered framing without marketing-speak; daily.dev rewards punchy headlines. A single body that "works everywhere" works less well than each platform's customised body. The customisation cost is ~30-60 min total across the six platforms; the value is per-platform engagement velocity.

**Why sized engagement ranges (§1 #4):** without explicit ranges, the operator measures success against an implicit "the more the better" standard that makes any outcome feel inadequate. With ranges, the operator can say "r/web_design hit 450 upvotes (mid-range); r/programming hit 90 (low-range, expected); Lobste.rs hit 60 (high-range, strong signal)." Calibration prevents launch-trajectory misreading.

**Why same canonical URLs across platforms (§1 #5):** single canonical = consolidated link equity, citation graph, and search-index signal. If r/web_design links to a Reddit-customised URL and r/programming links to a different one, search engines see fragmented authority. Same canonicals + customised bodies = best of both.

**Why no vote-manipulation across platforms (§1 #6):** each platform has its own enforcement mechanism. Reddit removes posts + can shadowban accounts. Lobste.rs is invite-only with active community moderation; vote rings get the inviter punished. daily.dev's algorithm downranks suspicious patterns. The risk surface is N platforms × moderation policies; the safe answer is no manipulation anywhere.

**Why no new-account creation (§1 #7):** new accounts on Reddit are throttled, on Lobste.rs require an invite, on daily.dev are flagged. A founder's "first ever post" being a launch reads as suspicious; the platform's algorithm correctly classifies it as low-quality even if the content is high-quality. Existing account standing is the gate; if it doesn't exist, the platform is skipped for THIS launch.

**Why per-platform SLAs are looser than HN's 30-min (§1 #8):** Show HN is the primary surface — Reddit + Lobste.rs are secondary. Reddit threads have longer engagement curves (24-72 hour visibility on hot threads vs HN's 12-hour curve); Lobste.rs is slower-paced (thoughtful comments over 24-48 hours). Matching SLAs to platform cadence preserves founder attention budget; over-investing in cross-posts at expense of HN engagement is the failure mode.

**Why FR-LAUNCH-001 response patterns are platform-portable (§1 #9):** the patterns engage critique with substance + gracious framing — they work across communities. The anti-patterns (defensive aggression, condescension) fail everywhere. Cross-platform consistency in response style = consistent brand experience for readers who see the founder on multiple platforms.

**Why no reposting after moderation removal (§1 #10):** mod removal is a signal that something specific is wrong (framing, fit, self-promotion threshold, etc.). Reposting without addressing the issue reads as defying mods; the platform's community loses trust. P2+ revisits (with adjusted framing AND mod consultation if appropriate) are the recovery path.

**Why HN-mention near the bottom, not the top (§1 #14):** leading with "we're trending on HN" reads as cross-platform manipulation (especially on Reddit, where HN-referrals are often suspected of being orchestrated). Mentioning it as one touchpoint among several at the bottom of the body reads as transparent context. The signal is in the post's substance, not in the HN-reference.

---

## §3 — Doctrine contract

### `docs/launch/cross-posts.md` — the canonical cross-posts doc

```markdown
---
title: "Cross-posts for DSAF launch"
ratified_by: FR-LAUNCH-002 (2026-05-17)
launch_window: [Tuesday/Wednesday 8-10am PT date — same as FR-LAUNCH-001]
---

# DSAF cross-posts

This file is the operations doc for FR-LAUNCH-002. Each section is a per-platform post; the timing column is relative to Show HN submission (T+0).

## §3.1 — Sequencing

| T+offset | Platform | URL | Standing required |
|---|---|---|---|
| T+4h | Reddit r/web_design | https://www.reddit.com/r/web_design/ | non-throttled account; > 50 karma |
| T+6h | Reddit r/UXDesign | https://www.reddit.com/r/UXDesign/ | non-throttled account; > 50 karma |
| T+8h | Reddit r/programming | https://www.reddit.com/r/programming/ | non-throttled account; > 100 karma (stricter mod) |
| T+10h | Lobste.rs | https://lobste.rs/ | active account (invite-only; existing standing) |
| T+12h | daily.dev + Designer News | https://daily.dev/ + https://www.designernews.co/ | existing accounts |

## §3.2 — Sized engagement ranges

| Platform | Low | Mid | High | Notes |
|---|---|---|---|---|
| r/web_design | 50 upvotes | 250 upvotes | 600 upvotes | Visual-friendly community; embedded images help |
| r/UXDesign | 30 upvotes | 120 upvotes | 300 upvotes | UX-niche; smaller but engaged |
| r/programming | 20 upvotes | 70 upvotes | 200 upvotes | Broad audience; harder to convert; high-mod |
| Lobste.rs | 10 upvotes | 35 upvotes | 80 upvotes | Small community; high signal-to-noise; weight per upvote is high |
| daily.dev | 20 upvotes | 70 upvotes | 150 upvotes | Algorithm-driven feed; engagement depends on day-of trending topics |
| Designer News | 10 upvotes | 40 upvotes | 100 upvotes | Designer-niche; thoughtful comments often |

Mid-range across all six = ~530 upvotes total + ~5,000-8,000 unique referrals. High-range across all six = ~1,250 upvotes + ~12,000-15,000 referrals. Low-range = ~140 upvotes + ~2,000 referrals.

## §3.3 — Per-platform SLA

| Platform | First-4h SLA | 4-24h SLA | 24h+ SLA |
|---|---|---|---|
| r/web_design / r/UXDesign / r/programming | 2 hours per critical comment | 4 hours per | "as available" |
| Lobste.rs | 4 hours per critical comment | 8 hours per | "as available" |
| daily.dev | "as available" | "as available" | "as available" |
| Designer News | 2 hours per | 4 hours per | "as available" |

Apply the FR-LAUNCH-001 §3 response-pattern templates verbatim — they're platform-portable.

## §3.4 — Customised post bodies

### r/web_design (T+4h)

**Title:** I built an open-source design system maturity rubric (125 criteria, L0–L5, agent-native) — would value your roast

**Body:**

> Most design systems audit content is either blog posts (Big Medium, Sparkbox, Brad Frost) or SaaS-gated (zeroheight, Knapsack). I've been wanting an open-source criteria-graded rubric for 3 years. Today I'm releasing one.
>
> DSAF — Design System Audit Framework — is 125 criteria across 20 categories (system + UX), mapped to L0 → L5 maturity tiers. It ships with shipping scripts and LLM-agent integration.
>
> 5-min entry: https://dsaf.dev/card (one-page DSAF-25 Core)
> Repo: https://github.com/CyberSkill/design-system-audit-framework
> What I think is broken about it: https://dsaf.dev/blog/launch-2026
>
> Sample visual: [DSAF radar — 20-axis spider chart per category, https://dsaf.dev/assets/dsaf-radar.svg]
>
> I'm founder of CyberSkill (a Vietnam-based consultancy that uses + maintains DSAF; the framework's home is dsaf.dev, separate from our paid audit services at audit.cyberskill.world). Currently on Show HN too: [Show HN URL — added once stable].
>
> Would value real-world reads. What's missing? What's wrong? Where does the rubric not match your reality?

### r/UXDesign (T+6h)

**Title:** Open-source rubric for measuring design system maturity (with a Part B for UX-specific criteria — content, IA, heuristics)

**Body:**

> DS audits usually focus on the system side (tokens, components, governance). But the UX produced by the system is also auditable — research signals, IA, interaction patterns, content/voice, heuristics, accessibility & inclusive design, measurement, ethics, density, i18n.
>
> DSAF (Design System Audit Framework) splits the rubric: Part A is 63 criteria on the system; Part B is 62 criteria on the UX it produces. Each gets a per-category roll-up; the combined score maps to L0–L5 tiers.
>
> 5-min entry: https://dsaf.dev/card (one-page subset)
> Full rubric: https://github.com/CyberSkill/design-system-audit-framework/blob/main/docs/04-criteria-part-b.md (Part B — UX)
> Origin story + candid limitations: https://dsaf.dev/blog/launch-2026
>
> I'm Stephen Cheng — currently on Show HN too: [Show HN URL].
>
> Honest question: is splitting "DS audit" and "UX audit" actually useful, or am I creating two parallel audits when one would do? Pushback welcome.

### r/programming (T+8h)

**Title:** DSAF: open-source CMM-style maturity framework for design systems (125 criteria, agent-native, shipping scripts in repo)

**Body:**

> DSAF is what happens when you treat design system maturity as a measurable property, not a narrative.
>
> - 125 criteria across 20 categories, each scored 0-5 against a rubric anchor
> - 6 tiers (L0 Initial → L5 Optimised) with explicit transition gates
> - SCAN + FIX audit modes, single-file audit-report.md output
> - No-silent-regression rule with explicit override categories (rubric-tightened, fix-side-effect, external-dependency-change, deliberate-policy-tradeoff)
> - Shipping scripts: bundle-size, contrast (APCA + WCAG), coverage, doc-freshness, link-check
> - LLM-agent integration via structured prompts; MCP-server-ready
>
> Code: https://github.com/CyberSkill/design-system-audit-framework
> 5-min entry: https://dsaf.dev/card
> What we got wrong (the candid origin story): https://dsaf.dev/blog/launch-2026
>
> Founder here. Currently on Show HN: [Show HN URL]. Want technical critique especially — the no-silent-regression rule's design and the agent-prompt structure are the bits I'm most uncertain about.

### Lobste.rs (T+10h)

**Title:** DSAF — open-source design system maturity rubric (125 criteria, agent-native; from the author of [previous Lobste.rs submissions if applicable])

**Body:**

> After 12 months of internal use across ~10 design system audits, I'm releasing DSAF as open source.
>
> DSAF is a criteria-graded maturity rubric — 125 criteria across 20 categories, mapped to L0 → L5 tiers (CMM-style). It's the artifact I wanted when customers asked "how mature is our design system" and the only available answers were blog posts (Atomic Design, Big Medium) or SaaS-gated platforms (zeroheight, Knapsack).
>
> Repo + docs: https://github.com/CyberSkill/design-system-audit-framework
> One-page summary: https://dsaf.dev/card
> Origin story including candid limitations (what we got wrong): https://dsaf.dev/blog/launch-2026
>
> Disclosure: I run CyberSkill, a software consultancy. DSAF is open source (MIT); CyberSkill offers paid audit services at audit.cyberskill.world (separate site). The decoupling is deliberate and documented at https://github.com/CyberSkill/design-system-audit-framework/blob/main/docs/branding/decoupling-decision.md
>
> Would value the Lobste.rs community's reads, particularly on the no-silent-regression rule design and the criteria-overlap dedup methodology.
>
> Tags suggested: design, programming, plt (for the criteria-graded rubric design)

### daily.dev (T+12h, headline-driven)

**Title:** DSAF: Open-Source Design System Audit Framework (125 criteria, L0–L5 tiers, agent-native)

**Body:**

> A 125-criterion maturity rubric for design systems. Open source. Tier scale from L0 (ad-hoc) to L5 (industry-leading). Ships with LLM-agent prompts. Free alternative to SaaS audit platforms.
>
> Repo: https://github.com/CyberSkill/design-system-audit-framework
> 5-min entry: https://dsaf.dev/card
> Currently trending on HN: [Show HN URL]

### Designer News (T+12h)

**Title:** A 125-criterion open-source rubric for measuring design system maturity (with named limitations the authors already know are broken)

**Body:**

> Hi DN — I'm Stephen, founder of CyberSkill. We've open-sourced DSAF (Design System Audit Framework) after 12 months of internal use.
>
> The pitch isn't "we built the perfect rubric." The pitch is "we built a rubric that's substantively useful, ships with limitations we've named, and we'd value the community's roast before we make our next call."
>
> The candid limitations post: https://dsaf.dev/blog/launch-2026
> 5-min entry: https://dsaf.dev/card
> Repo: https://github.com/CyberSkill/design-system-audit-framework
>
> What would the DN community most want to push back on? Geography-headwind, no-silent-regression rule, the 125-criterion barrier, or something I haven't named?

---

## §3.5 — Cross-post tracking (post-launch addition to docs/launch/post-hn-feedback.md)

Extend the FR-LAUNCH-001 tracking file with per-platform tabs:

```markdown
## Cross-post tracking (FR-LAUNCH-002)

### r/web_design

- Posted at: 2026-MM-DD HH:MM UTC (T+4h after Show HN)
- URL: https://www.reddit.com/r/web_design/comments/XXX
- Upvotes at T+24h: [filled at T+24h]
- Engagement range: [low / mid / high]
- Top substantive comments + founder responses: [list]
- Outcome: [active / declining / removed]

### r/UXDesign

[same template]

### r/programming

[same template]

### Lobste.rs

[same template]

### daily.dev + Designer News

[same template, combined]

## Cross-platform patterns

- Concerns appearing on ≥ 3 of 6 platforms: [list — these become FR-CONTENT-001 deep-dive candidates]
- Top-3 most-engaged concerns overall (across HN + cross-posts): [list]
- Platforms with disproportionate engagement: [list — these inform FR-LAUNCH-005 guest-post prioritisation]
```
```

---

## §4 — Acceptance criteria

1. **Cross-posts doc committed** — `docs/launch/cross-posts.md` exists with the 6 per-platform sections per §3.4 + sequencing table + engagement ranges + per-platform SLA.
2. **Six platforms enumerated** — `docs/launch/cross-posts.md` §3.1 sequencing table has 6 rows (r/web_design, r/UXDesign, r/programming, Lobste.rs, daily.dev, Designer News).
3. **Sequencing offsets per §3.1** — each platform's T+offset is in the 4-12h post-Show-HN window.
4. **Engagement ranges per platform** — each platform in §3.2 has Low / Mid / High columns populated with realistic numbers per the plan.
5. **Customised body per platform** — `grep -cE '^### (r/|Lobste|daily|Designer)' docs/launch/cross-posts.md` ≥ 6. Each body is platform-customised (different titles, different framings, NOT byte-identical copies).
6. **Canonical URLs in every body** — every platform's body links to dsaf.dev/card, github.com/CyberSkill/design-system-audit-framework, and (where appropriate) dsaf.dev/blog/launch-2026.
7. **No vote-manipulation language** — `grep -ciE 'upvote|please upvote|ask.*upvote' docs/launch/cross-posts.md` returns 0.
8. **No copy-paste cross-posting** — verified by reviewer at PR: each post body's first 200 chars are demonstrably different from others (different opening hook, different community framing).
9. **Per-platform SLAs documented** — §3.3 SLA table covers all 6 platforms (or 5 if daily.dev + Designer News combined as "lighter touch").
10. **FR-LAUNCH-001 SLA reference** — `docs/launch/cross-posts.md` references FR-LAUNCH-001 §3 response-pattern templates as platform-portable.
11. **Account-standing verification gate** — §3.1 sequencing table specifies "Standing required" column per platform; PR description records that the founder has standing on each (or flags any platform skipped due to missing standing).
12. **HN-mention positioned at bottom of bodies** — each cross-post body that mentions HN does so as a "currently on Show HN" line near the end, NOT in the opening.
13. **Tracking file template extension** — §3.5 extends the FR-LAUNCH-001 tracking file with per-platform tabs + cross-platform patterns section.
14. **No moderation-removal repost discipline** — §1 #10 + §10 failure-mode row + post-launch tracking discipline documented.
15. **PR description includes** — sequencing timing relative to Show HN, account-standing confirmation per platform, engagement-range expectations per platform.

---

## §5 — Verification

```bash
# AC1, AC2 — file exists + 6 platforms
test -f docs/launch/cross-posts.md
awk '/^## §3.1/,/^## §3.2/' docs/launch/cross-posts.md | grep -cE '^\| T\+[0-9]+h \|'
# expected: 6 (or 5 if daily.dev + Designer News combined)

# AC3 — sequencing offsets in window
awk '/^## §3.1/,/^## §3.2/' docs/launch/cross-posts.md | grep -oE 'T\+[0-9]+h' | sort -u
# expected: T+4h, T+6h, T+8h, T+10h, T+12h (all within 4-12h window)

# AC4 — engagement ranges
awk '/^## §3.2/,/^## §3.3/' docs/launch/cross-posts.md | grep -cE '^\| [a-zA-Z/]'
# expected: ≥ 6 platforms with Low/Mid/High values

# AC5 — 6 customised bodies
grep -cE '^### (r/|Lobste|daily|Designer)' docs/launch/cross-posts.md
# expected: ≥ 6 (or ≥ 5 if combined)

# AC6 — canonical URLs in bodies
grep -c 'dsaf.dev/card' docs/launch/cross-posts.md
# expected: ≥ 6 (one per platform body)
grep -c 'github.com/CyberSkill/design-system-audit-framework' docs/launch/cross-posts.md
# expected: ≥ 6

# AC7 — no vote-manipulation language
grep -ciE 'upvote|please upvote|ask.*upvote' docs/launch/cross-posts.md
# expected: 0

# AC9 — per-platform SLAs
awk '/^## §3.3/,/^## §3.4/' docs/launch/cross-posts.md | grep -cE '^\| [a-zA-Z/]'
# expected: ≥ 4 platform SLA rows

# AC11 — account-standing column
awk '/^## §3.1/,/^## §3.2/' docs/launch/cross-posts.md | grep -i 'standing required'

# AC12 — HN mention at bottom (manual check; the §3.4 bodies each have HN reference)
grep -B 1 -A 1 'Show HN' docs/launch/cross-posts.md | grep -i 'currently\|trending\|also\|near the end'
```

Human-verified ACs (no script):

- **AC8** — reviewer reads each platform's body opening; confirms first 200 chars vary substantively across platforms.
- **AC10** — reviewer confirms FR-LAUNCH-001 §3 templates cited.
- **AC13** — reviewer confirms §3.5 tracking template structure.
- **AC14** — verified at post-launch tracking (no reposts after moderation).
- **AC15** — reviewer reads PR description for confirmations.

---

## §6 — Implementation skeleton

The operator playbook (4h spread across the launch window):

1. **(30m) Author `docs/launch/cross-posts.md`** per §3 — sequencing, engagement ranges, SLA, 6 customised bodies.
2. **(15m) Account-standing audit.** Verify the founder has non-zero account standing on each platform: Reddit karma > 50/100 per subreddit, Lobste.rs active account, daily.dev existing account, Designer News existing account. Document standing in PR description. Skip any platform where standing is missing.
3. **(T+4h after Show HN, ~5m posting) Post r/web_design.** Paste the customised body from §3.4 verbatim. Add image (DSAF radar SVG rendered as PNG) if Reddit auto-image-attaches.
4. **(T+6h, ~5m) Post r/UXDesign.**
5. **(T+8h, ~5m) Post r/programming.**
6. **(T+10h, ~5m) Post Lobste.rs.**
7. **(T+12h, ~5m) Post daily.dev + Designer News.**
8. **(over the next 24-48h, ~3h founder-time) Monitor + respond per per-platform SLA.** Use FR-LAUNCH-001 §3 response-pattern templates verbatim. Log substantive comments in `docs/launch/post-hn-feedback.md` per §3.5 extension.
9. **(T+72h, 15m) Update tracking file with cross-platform patterns.** Identify concerns appearing on ≥ 3 of 6 platforms. Surface these to FR-CONTENT-001 (P2 deep-dive candidates).

---

## §7 — Dependencies

- **Upstream (required at `accepted (10/10)` before posting):**
  - **FR-LAUNCH-001** (Show HN) — cross-posts come AFTER Show HN; the T+0 anchor is the Show HN submission time.
- **Coordinated:**
  - **FR-DOCS-001** — README must be live (cross-posts link there).
  - **FR-DOCS-003** — blog post must be live (cross-posts link to dsaf.dev/blog/launch-2026).
  - **FR-BRAND-003** — DSAF radar visual at dsaf.dev/assets/dsaf-radar.svg used in r/web_design body.
  - **FR-CORE-001** — DSAF-25 Core at dsaf.dev/card.
- **Downstream blocks:** none directly; FR-LAUNCH-003 (Product Hunt) is parallel; FR-CONTENT-001 (P2 deep-dives) consumes the tracking-file patterns.
- **External:**
  - Reddit account with karma standing (the founder's personal account).
  - Lobste.rs account (invite-only; the founder must have existing standing).
  - daily.dev account.
  - Designer News account.

---

## §8 — Example payloads

### Example: a successful r/web_design post outcome

```
T+4h:00:00 — posted to r/web_design with title + body per §3.4
T+4h:05 — first comment from user @[name] asks "what about Storybook compatibility?"
T+5h:30 — founder responds per FR-LAUNCH-001 §3 Pattern 4: substantive answer + roadmap reference to FR-INTEG-001
T+12h:00 — post at 320 upvotes (mid-range per §3.2)
T+24h:00 — post at 480 upvotes (mid-to-high range)
T+48h:00 — declining engagement; thread settled
Outcome logged: mid-to-high range; one substantive criterion question that becomes an FR-CONTENT-001 deep-dive candidate ("DSAF + Storybook integration patterns")
```

### Example: a Lobste.rs post that gets thoughtful engagement

```
T+10h — Lobste.rs post submitted
T+10h:45 — first comment from a regular user: "The no-silent-regression rule design seems well thought out, but how does it handle the case where a vendor library deprecates a feature mid-quarter?"
T+13h:00 — founder responds per FR-LAUNCH-001 §3 Pattern 1: addresses external-dependency-change cause category in FR-CORE-002
T+24h — post at 42 upvotes (mid-to-high range; Lobste.rs upvotes are weighted higher than Reddit)
T+48h — engagement settles
Outcome: high-signal community engagement; one Lobste.rs reader becomes an FR-GOV-002 co-maintainer candidate
```

### Example: a moderation removal (handled per §1 #10)

```
T+8h — r/programming post submitted
T+8h:23 — moderator removes post: "We don't allow Show HN-style self-promotion; consider posting in r/coding instead"
Response (in tracking file, not on the thread): log removal; respect the mod; do NOT repost; skip r/programming for this launch
Post-launch (P2): the operator MAY revisit with framing that fits r/programming norms (e.g., "we open-sourced this rubric; here's the technical design choices we made")
```

---

## §9 — Open questions

All resolved at authoring time:

- **Q1: 6 platforms or fewer?** Resolved → 6 (plan §Phase 1 action 2 list). Pruning to fewer cedes audience slices.
- **Q2: Customise bodies (4h cost) or copy-paste (0.5h cost)?** Resolved → customise. The 4h investment pays back in per-platform engagement velocity; copy-paste reads as spam to the platform algorithms.
- **Q3: Cross-posts before, with, or after Show HN?** Resolved → after, T+4h to T+12h. Plan §Phase 1 action 2 + the Show-HN-attention-window analysis support this.
- **Q4: Should the cross-posts link to HN?** Resolved → yes but near the bottom of the body, framed as transparent context not as social-proof crutch. Reddit specifically dislikes "trending on HN" leading bullets; bottom positioning reads as honest disclosure.
- **Q5: What if the founder lacks account standing on a platform?** Resolved → skip that platform for this launch. New-account creation just-for-launch is flagged by platform algorithms.
- **Q6: Engagement-range numbers — where do they come from?** Resolved → calibrated estimates based on similar-scope launches (open-source frameworks for design systems, methodology repos, OSS announcements). The numbers are illustrative; actual outcomes feed back into the tracking file.
- **Q7: Should the post bodies include the founder photo or just text?** Resolved → text-only for v1 (per FR-DOCS-003 §9 Q7). Photo-attachment isn't standard on these platforms; text-only is the default.

---

## §10 — Failure modes inventory

| Failure | Detection | Outcome | Recovery |
|---|---|---|---|
| Cross-post posted before Show HN (timing inversion) | timing audit | Attention diluted; HN trajectory weaker | Block cross-post submission until Show HN is at T+4h |
| Copy-paste body across platforms | post-launch reviewer notices | Platform algorithms flag as spam | The §3.4 bodies are customised; if a future operator copy-pastes, it's a discipline failure — log it in tracking and re-prepare for the next launch |
| Reddit post removed for self-promotion | mod-message in inbox | Lost that platform's slice | Per §1 #10: don't repost; log removal; revisit P2+ with framing fit |
| Lobste.rs flagged for low-content | community downvotes | Visibility low | The Lobste.rs body is depth-focused per §3.4; if it fails, the failure is a community-fit signal — accept the outcome |
| Multiple platforms moderate/remove simultaneously | tracking-file pattern | Indicates a systemic framing issue | Pause remaining cross-posts; investigate the common framing issue (likely the "Show HN cross-reference" or a self-promotion threshold); revise + retry only after issue is diagnosed |
| Founder is at Show HN 30-min SLA and Reddit 2h SLA simultaneously | overlap window at T+4h to T+8h | Founder bandwidth exceeded | The sequencing (T+4h, T+6h, T+8h staggering) is designed to spread load; if still overwhelmed, prioritise Show HN (primary surface) over individual cross-post SLAs |
| Vote-manipulation accusation | mod-message or community comment | Trust crisis | Engage transparently: "I posted; I haven't asked anyone to upvote; the timing is per FR-LAUNCH-002 sequencing; happy to provide context." If specific user is identified as orchestrated, distance publicly |
| daily.dev or Designer News post gets near-zero engagement | T+12h check shows few upvotes | Wasted post slot | Acceptable failure mode; these are secondary platforms with lighter expectations; log the outcome and don't over-engineer |
| Cross-platform pattern: same concern raised on all 6 platforms | tracking-file analysis | Real load-bearing issue | This is a signal, not a failure: the concern goes to FR-CONTENT-001 as a TOP-priority deep-dive; address it in a fast-follow post or ChangeLog update |
| Founder's response on one platform contradicts response on another | community spot | Trust degradation | The FR-LAUNCH-001 §3 patterns are platform-portable; using them consistently avoids contradictions. If a contradiction is spotted, post a follow-up clarification |
| Cross-post URL link in body broken (typo) | community comment | Lost trust | Pre-post curl-verification per FR-LAUNCH-001 pattern catches; if posted with broken link, edit/delete + repost ONLY if platform allows (Reddit allows edits; some platforms don't) |
| Founder underestimates time-zone for cross-post timing | wrong-hour posting | Suboptimal trajectory | The §3.1 T+offsets are relative to Show HN T+0; the founder converts to local time at scheduling |

---

## §11 — Implementation notes

- **The 4-hour total budget is mostly response engagement, not posting.** Each post takes ~5 minutes to submit; the bulk of the 4h is monitoring + responding across 6 threads over 24-48h elapsed time.
- **Account-standing is the most-common skip reason.** New founders without prior Lobste.rs or established Reddit accounts skip those platforms for the first launch and build standing via post-launch P2 contributions. The FR-LAUNCH-002 v1 launch may only hit 4-5 of 6 platforms depending on standing.
- **About per-platform customisation:** the §3.4 bodies are ship-ready templates. The founder MAY adjust within the platform norms (e.g., switching the r/web_design opening from "Most design systems audit content is..." to "Hey r/web_design, I built..." if that fits the founder's voice better). The discipline is *don't ship byte-identical*, not *use my exact words*.
- **About engagement-range calibration:** the §3.2 numbers are calibrated from similar-scope launches (OSS frameworks, methodology repos, design-system tooling launches). Mid-range is the realistic target; high-range means the launch caught a viral moment (HN front-page top-3 typically correlates). Low-range outcomes are still positive signal; "low" doesn't mean failure.
- **The Reddit r/programming post is the highest-risk-of-removal.** That subreddit aggressively moderates "Show HN-style self-promotion." Approaches that work: framing as technical-design discussion (the §3.4 body emphasises rubric design + agent integration over "we built this thing"); approaches that fail: framing as launch announcement. If the post is removed despite the customisation, the lesson is that r/programming's standards require a different framing; revisit P2+.
- **About Lobste.rs's tag suggestions:** Lobste.rs uses tags (`design`, `programming`, `plt`, etc.); the operator picks 2-4 tags at submission time. The §3.4 Lobste.rs body suggests `design`, `programming`, `plt` — actual tags depend on what's available at submission. Lobste.rs tags drive discovery within the community.
- **About daily.dev's algorithmic placement:** daily.dev curates a developer-feed; submitted posts are ranked by an opaque algorithm. The §3.4 daily.dev body is headline-driven because the algorithm rewards headlines that drive click-through. Lower-engagement-expectation outcome is normal here; the platform is a wide-reach low-conversion surface.
- **The cross-platform patterns analysis (T+72h) is the key institutional-memory step.** Concerns appearing on ≥ 3 of 6 platforms are high-signal; they're the topics where the community's mental model differs from DSAF's documentation. FR-CONTENT-001's first 12 weeks of deep-dives can be planned from this analysis.
- **About FR-LAUNCH-003 (Product Hunt) coordination:** Product Hunt has its own timing rhythm (typically scheduled for the same day as Show HN OR the next day, with a hunter recruit). FR-LAUNCH-003 is parallel to FR-LAUNCH-002; they don't block each other. The operator's bandwidth in the T+4h to T+24h window is the constraint.

---

*End of FR-LAUNCH-002.*
