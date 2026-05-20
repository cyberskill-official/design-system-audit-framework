---
id: FR-DOCS-003
title: "Publish launch blog post on audit.cyberskill.world — candid origin-story framing for the HN-launch window"
module: DOCS
priority: MUST
status: done
verify: I
phase: P1
milestone: P1 · slice 1 · Launch
slice: 1
owner: Stephen Cheng (Founder)
created: 2026-05-17
shipped: 2026-05-18
related_frs: [FR-BRAND-001, FR-CORE-001, FR-CORE-004, FR-DOCS-001, FR-LAUNCH-001, FR-LAUNCH-002, FR-LAUNCH-003, FR-LAUNCH-005]
depends_on: [FR-BRAND-001, FR-DOCS-001]
blocks: [FR-LAUNCH-001, FR-LAUNCH-002, FR-LAUNCH-003]
source_pages:
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Phase 1 — Launch prerequisite — 'A blog post titled approximately We built a 125-criterion audit framework after auditing 0 design systems for clients — here's what we got wrong')"
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§What drives GitHub stars item 1 — finished-product feel)"
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§What NOT to do item 9 — gracious engagement)"
source_decisions:
  - "DEC-032: blog post is candid origin-story framing, not announcement framing — admits limitations + invites roast, doesn't claim authority"
  - "DEC-033: superseded 2026-05-18 by the ratified canonical-host decision; blog post lives at audit.cyberskill.world/blog/launch-2026 while paid-service copy stays out of the content surface"
  - "DEC-034: post is referenced (not duplicated) in Show HN body — the HN post links to it; the post is the long-form context, the HN body is the elevator pitch"
language: markdown + html
service: doctrine
new_files:
  - landing/blog/launch-2026.md
  - landing/blog/index.md
  - landing/blog/launch-2026/index.html
  - landing/blog/index.html
  - assets/og/launch-2026-1200x630.svg
  - assets/og/launch-2026-1200x630.png
modified_files:
  - scripts/render-blog.mjs
  - landing/index.html
allowed_tools:
  - "file_read/write dsaf.dev/**"
  - "static-site-generator config (Cloudflare Pages MD-to-HTML, or whichever SSG dsaf.dev uses)"
  - "Lighthouse for embedded perf check"
disallowed_tools:
  - "publish the post with paid-service or lead-capture copy on the DSAF content surface"
  - "publish the post behind a Medium/Substack paywall — the post is canonical at dsaf.dev"
  - "use an authority-claiming title like 'The Definitive Guide to...' — the plan explicitly calls for candid framing"
  - "include any paid-funnel CTA in the post body — repo + dsaf.dev are sacred per FR-BRAND-001 §1 #11"
effort_hours: 8
sub_tasks:
  - "1. (1h) Outline the post per §3 structure — 7 sections, candid origin-story arc"
  - "2. (3h) Draft the post body — ~2,500-3,500 words, founder voice, no marketing-speak"
  - "3. (1h) Iteration: read aloud, cut filler, ensure each section earns its place"
  - "4. (30m) Add the post's frontmatter (title, date, summary, OG meta, canonical URL)"
  - "5. (30m) Author dsaf.dev/blog/index.md — blog landing with the one post listed"
  - "6. (15m) Patch dsaf.dev/index.html to add a 'Latest writing' link in the footer or 'About' section"
  - "7. (30m) Verify Lighthouse perf score ≥ 90 on the blog post (inline content, no third-party trackers, no JS)"
  - "8. (45m) Run §5 verification — word count, no banned phrases, OG meta correct, canonical URL set"
  - "9. (15m) PR description: link to live blog post URL, a sampled paragraph showing voice, Lighthouse screenshot"
risk_if_skipped: "The plan §'Phase 1 — Launch prerequisite' is explicit: 'A blog post titled approximately We built a 125-criterion audit framework after auditing 0 design systems for clients — here's what we got wrong ready on dsaf.dev.' Without this post, the Show HN body has nowhere to link for the long-form context; the HN reader who clicks past the README gets only the doctrine files. Doctrine reads as engineering; the candid origin-story blog post reads as a person. Plan §'What drives GitHub stars' item 4 names 'a person attached to the work' as the #4 stars-mover; the blog post is the surface where the founder's voice lives. Skipping this FR also breaks FR-LAUNCH-001 (Show HN body cites the blog post as 'context'), FR-LAUNCH-002 (cross-posts link to the blog as the primary external surface), and FR-LAUNCH-003 (Product Hunt description references the post). The candid framing — 'here's what we got wrong' — is also the structural countermove to the 'consultancy publishes self-graded framework' takedown angle (plan §'Honest critique' item 3); admitting limitations BEFORE the critics surface them turns a likely takedown into a confirming citation."
---

## §1 — Description (BCP-14 normative)

The launch blog post MUST be published at `audit.cyberskill.world/blog/launch-2026` (or equivalent slug under `audit.cyberskill.world/blog/`) before the Show HN window opens (per FR-LAUNCH-001 dependency). The post's framing is **candid origin-story** — what the framework is, why it exists, what's wrong with it, what's right with it, who would benefit, and what kind of feedback would help. The post is NOT a product announcement; it's a person attached to the work.

**2026-05-18 implementation note:** repo-verifiable publication assets are shipped and locally verified. Acceptance criterion §1 #6 remains externally blocked by FR-DOCS-002 because zero named outside-reviewer quotes have written consent. The live post MUST keep the no-fabricated-quotes note until the consent log has at least two approved rows.

1. **MUST** publish the post at `audit.cyberskill.world/blog/launch-2026` (or equivalent timestamped slug) before FR-LAUNCH-001 ships. The URL is path-stable for the 12-month minimum redirect window per FR-BRAND-004 §1 #4 patterns (citations to this URL must survive future blog reorganisations).
2. **MUST** title the post with explicit candid framing. Recommended title: "We built a 125-criterion design system audit framework — here's what we got wrong." Acceptable variants include: "DSAF: an open-source design system maturity rubric — and the things we already know are broken about it." The title MUST NOT use authority-claiming framing ("Definitive Guide," "Industry-Leading," "Comprehensive"). The title MUST be ≤ 80 characters.
3. **MUST** structure the post per §3 with these canonical sections in order: (a) Lede + thesis (≤ 150 words); (b) "What DSAF is" (concrete description, ≤ 300 words); (c) "Why we built it" (founder origin-story, ≤ 400 words); (d) "What we got wrong, and what's still wrong" (candid limitations + 4-6 named issues, ≤ 600 words); (e) "What we got right (we think)" (substantive value-prop, ≤ 400 words); (f) "Who this is for / what feedback would help" (audience + ask, ≤ 300 words); (g) "What's next" (P1-P6 roadmap framing, ≤ 250 words). Total target: 2,500–3,500 words.
4. **MUST** lead with the candid-limitations section visible in the post's first 1,500 words. The "Honest critique" issues from the plan §"Honest critique" — 125 criteria is a barrier, 20 categories overlap, self-audit-at-L5 looks bad, geography headwind, no-downgrade rule will get switched off — MUST appear by name in the post (rephrased in the founder's voice, not copy-pasted). Naming the failure modes BEFORE critics surface them is the structural countermove (plan §"What NOT to do" item 9).
5. **MUST NOT** include paid-funnel CTAs, "Talk to a certified auditor" links, email-capture forms, or any conversion-funnel element. The post is canonical content, not lead-gen. The single exception: a one-line "I run CyberSkill, a software consultancy — if you want a third-party audit, audit.cyberskill.world is a separate site; the framework here is independent of that business" near the end, framed as decoupling-disclosure per FR-BRAND-004.
6. **MUST** include 2+ named endorsement quotes from FR-DOCS-002 inline in the post (per FR-GOV-001 consent letters scope — the post is one of the consented surfaces). The quotes appear in the "What we got right (we think)" section as social proof that the framework has resonated with named outside reviewers; placement matters (NOT in the lede, NOT in "what we got wrong").
7. **MUST** embed both FR-BRAND-003 visuals (L0-L5 ladder + radar) inline. Ladder appears in the "What DSAF is" section; radar appears in the "What we got right" section (showing per-category coverage as the visual proof of the framework's depth).
8. **MUST** include a "ChangeLog" footer block at the bottom showing the post's publication date (`2026-MM-DD`), any subsequent edits, and a "Discuss this" link to the Show HN URL (added post-launch, per FR-LAUNCH-001). The footer is the canonical surface for post evolution.
9. **MUST** include OG (Open Graph) + Twitter Card meta tags so the post shares cleanly on social. OG image is the FR-BRAND-003 L0-L5 ladder rendered at 1200×630 px. OG title + description match the post's title + first-200-words pitch. Twitter Card type is `summary_large_image`.
10. **MUST** set `<link rel="canonical">` to the audit.cyberskill.world URL. If the post is republished anywhere (Medium, dev.to, LinkedIn) per FR-CONTENT-002 P2 patterns, the canonical URL stays at audit.cyberskill.world. Cross-platform republication is allowed; canonical-URL pollution is forbidden.
11. **MUST** apply the FR-BRAND-002 handle taxonomy throughout. `DSAF` short handle in 90%+ of mentions; `Design System Audit Framework` long name exactly once at first mention; no `Framework` noun-handle; `DSAF Criteria` / `DSAF Levels` / `DSAF Modes` / `DSAF-25 Core` as component handles.
12. **MUST** apply the FR-CORE-004 self-audit cap rule. The CyberSkill self-audit reference (in "What we got wrong" + "What we got right") frames as "L3 worked example, uncertified" — never as 84.6% / L5 / industry-leading.
13. **MUST** match the founder's voice — first-person plural where appropriate ("we"), first-person singular where personal accountability matters ("I built the first version of the rubric over 3 months and it was wrong twice; here's the second wrong"). No marketing-speak ("revolutionary," "best-in-class," "industry-leading"). No false-modesty ("we're just a small team"). Direct. Specific. Honest.
14. **MUST** pass the "would a Show HN reader click through from this post to the GitHub repo?" test. The post's job is to convert the HN-curious reader into a repo-visitor; if the post stands alone as a piece of writing without driving repo traffic, it's failed. Test: PR description includes the founder's read-through with a marker for where the "click through to repo" impulse would naturally arise (typically: end of "What we got right" section, end of "What's next" section, footer).
15. **MUST** be re-readable post-launch with the ChangeLog footer documenting updates. The post becomes a historical artefact (the dsaf.dev/blog/launch-2026 URL stays stable forever); future edits are *appended* via ChangeLog entries, NOT silent edits. Substantive content changes get a new dated post; this post is an immutable record of the launch-window position.

---

## §2 — Why this design

**Why candid origin-story, not announcement framing (§1 #2, #4):** product announcement framing ("Introducing DSAF: The Definitive Maturity Framework") triggers HN's BS-detector instantly. Candid framing ("here's what we got wrong") triggers the opposite — HN readers reward authenticity with engagement. Plan §"What drives GitHub stars" item 1 explicitly names "A README that reads like a finished product, not documentation" as the #1 stars-mover, and this blog post is the long-form companion to the README's pitch. The candid framing also pre-empts the most-likely-to-surface critique (plan §"Honest critique" items 1-8) by naming the issues *first*.

**Why publish at dsaf.dev, not Medium/Substack (§1 #1, #10):** Medium and Substack have audiences but the canonical URL is theirs. A blog post that gets cited from dora.dev outlives the platform that hosts it; a post on Medium that gets cited stops being citable when Medium's algorithm shifts. The plan §"Naming, branding, governance" is explicit on URLs outliving repos. dsaf.dev/blog/launch-2026 is the durable surface.

**Why the 2,500-3,500 word target (§1 #3):** below 2,000 words, the post can't substantively cover the candid-limitations section (which is the load-bearing rhetorical move); above 4,000 words, it loses the HN reader. 2,500-3,500 is the sweet spot for HN-curious readers who want depth but not a book. Each section's word cap (§1 #3) enforces section discipline; total is the rhetorical envelope.

**Why named endorsements in the post, not just the README (§1 #6):** an HN reader who clicks the dsaf.dev URL from the README sees the README endorsements; an HN reader who clicks the blog post URL from the Show HN body sees the blog post. Both surfaces need to land the named-human-attached signal. FR-GOV-001 consent letters cover both surfaces; this FR's §1 #6 ensures the post uses the consent.

**Why both visuals embedded (§1 #7):** the post's two structural beats are "what DSAF measures" (ladder visualises the tier hierarchy) and "the depth is real" (radar visualises the 20-category coverage). Visual proof costs ~1 paragraph of word budget and pays back ~5 paragraphs of reader trust. Plan §"What drives GitHub stars" item 2 (killer visual) applies here.

**Why no paid-funnel CTAs (§1 #5):** the moment the post includes a "Talk to a certified auditor" CTA, the HN reader's BS-detector classifies the post as marketing. The single decoupling-disclosure line ("audit.cyberskill.world is a separate site") is acceptable because it's transparent about the relationship rather than hiding it; a full CTA would not be. FR-FUNNEL-001 (P4) handles paid surfaces on dsaf.dev; the launch blog post is canonical content, not a funnel.

**Why founder-voice (§1 #13):** the plan §"What drives GitHub stars" item 4 names "a person attached to the work" as the #4 stars-mover, citing Brad Frost (Atomic Design), Pravir Chandra (SAMM), Adam Wiggins (12factor). All three are first-person-attached projects. A blog post written in corporate-third-person ("DSAF was developed by CyberSkill...") loses the personal attachment signal; a blog post in first-person ("we built it; here's what went wrong; I made these calls") preserves it.

**Why ChangeLog footer for evolution (§1 #8, #15):** the post is a historical artefact — the launch-window position the framework held. Future edits to fix typos or update broken links are fine; substantive content rewrites would distort the historical record. The ChangeLog forces edit-discipline: if a substantive change is needed, the right answer is a new post that cites this one, not a silent rewrite of this one.

**Why the "click-through test" (§1 #14):** the post's job in the launch surface is to *convert* HN-curious readers into repo-visitors. A post that's intellectually satisfying but doesn't drive repo traffic has failed its operational role. The PR-time founder read-through with the click-through-impulse marker is the proxy for "does this post route readers to the right next step."

---

## §3 — Doctrine contract

### `dsaf.dev/blog/launch-2026.md` — the canonical blog post body

```markdown
---
title: "We built a 125-criterion design system audit framework — here's what we got wrong"
slug: launch-2026
date: 2026-MM-DD
author: Stephen Cheng (Founder, CyberSkill)
summary: "Open-sourcing DSAF — a CMM-style maturity rubric for design systems. The candid origin-story: what we built, what's already broken about it, and the feedback we'd most value."
canonical: https://dsaf.dev/blog/launch-2026
og_image: https://dsaf.dev/assets/og/launch-2026-1200x630.png
og_type: article
twitter_card: summary_large_image
tags: [design-systems, audits, maturity-models, open-source, launch]
---

## TL;DR

DSAF is a 125-criterion, agent-native, CMM-style maturity rubric for design systems — open-source, vendor-neutral, with six tiers (L0–L5). We're launching it today on Show HN. This post is the candid origin-story, including the things we already know are wrong with it. The framework lives at [github.com/cyberskill-official/design-system-audit-framework](https://github.com/cyberskill-official/design-system-audit-framework); the one-page DSAF-25 Core card is at [dsaf.dev/card](https://dsaf.dev/card).

If you'd rather see the rubric than read this post: [DSAF-25 Core (5 min)](https://dsaf.dev/card) or [the full 125 criteria](https://github.com/cyberskill-official/design-system-audit-framework/blob/main/docs/03-criteria-part-a.md).

---

## What DSAF is

DSAF — Design System Audit Framework — is a downloadable, criteria-graded, scriptable maturity rubric for design systems. Most "design system maturity" content in the field today is one of three things: (1) blog posts (Big Medium, Sparkbox, Brad Frost's *Atomic Design*), (2) SaaS-gated commercial platforms (zeroheight, Knapsack, Supernova), (3) GitHub-native artefacts that aren't full frameworks (Brad Frost's `frontend-guidelines-questionnaire` — a one-page checklist).

DSAF is the missing fourth thing: a 125-criterion rubric across 20 categories, mapped to a six-tier maturity scale (L0 Initial → L5 Optimised), with audit-flow modes (`SCAN mode` measures current state; `FIX mode` applies approved fixes), shipping scripts (coverage, contrast, bundle-size, doc-freshness, link-check), and agent integration (every section is structured for LLM agents to read, parse, update).

[*L0–L5 ladder visual embedded here — assets/dsaf-l0-l5-ladder.svg*]

The L0–L5 ladder tells the *narrative* — what climbing each tier requires. The radar (below) tells the *diagnosis* — what shape a given system has across all 20 categories. Both ship in the repo at `assets/`.

## Why we built it

I'm Stephen Cheng, founder of CyberSkill — a Vietnam-based software consultancy. We started DSAF in 2023 because we kept running into the same problem on client engagements: customers asked "how mature is our design system?" and there was no rubric to answer. Sparkbox's annual survey gave one kind of answer; zeroheight's annual report gave another; Brad Frost's *Atomic Design* gave a third; nothing gave the answer in a form the customer could *re-run* themselves next quarter.

So we built the rubric internally over ~12 months. After ~10 internal audits (CyberSkill's design system + half a dozen client systems under NDA, which is why none of those are in the worked-example), we hit two observations: (1) the rubric was substantively useful — it changed how teams prioritised; (2) the rubric was also wrong in interesting ways — overlapping criteria, ambiguous boundaries, a too-aggressive "no downgrade" rule that real teams turned off because legitimate regressions DO happen. Two-year-old internal tools have these problems; that's normal. We had a choice: clean it up and sell it as a SaaS, or open-source the rubric and let the design-systems community pressure-test it.

We picked open-source. The plan §"Honest critique" item 3 — "a consultancy publishing a framework that scores its own design system at the top tier is the single most predictable HN/Twitter takedown angle" — is exactly the failure mode we wanted to avoid; capping our self-audit at L3 publicly + publishing the rubric for community review is the structural countermove.

## What we got wrong, and what's still wrong

Here's the candid list — every item below is something we know is broken about DSAF v1 today, and we'd value feedback on each:

### 1. 125 criteria is a barrier, not a feature

Frameworks that hit critical mass collapse to a memorable surface form. DORA has four metrics. 12-factor has twelve points. OWASP SAMM has 15 practices. 125 is credible (we cover what matters) but un-shareable (no-one will screenshot it). Our countermove is DSAF-25 Core ([dsaf.dev/card](https://dsaf.dev/card)) — a 25-criterion subset on one page that's the share-handle; the full 125 is the deep-dive. But: is 25 the right number? Should the share-form be a different format entirely (a manifesto, a flowchart, a flowchart-with-criteria)? We don't know.

### 2. 20 categories almost certainly overlap

We've done a dedup pass (per `docs/criteria-aliases.md`), but reviewers will find more overlaps. Where do "design tokens for accessibility" sit — A.1 (Foundations & Tokens) or A.8 (Accessibility)? Where does "content + a11y" sit — A.3 (Documentation) or B.4 (Content) or B.5 (Accessibility & Inclusive)? Our dedup methodology is open-source (`docs/criteria-dedup-methodology.md`); we welcome PRs that surface more overlap candidates.

### 3. The CyberSkill self-audit at L3 is a credibility tightrope

CyberSkill's design system worked-example ([examples/cyberskill-design-system/](https://github.com/cyberskill-official/design-system-audit-framework/tree/main/examples/cyberskill-design-system)) is published with a L3 cap (per [self-audit publication policy](https://dsaf.dev/branding/self-audit-policy)). The interior scores in §10 of that audit are honest; the cited tier is L3 because we haven't been independently verified. We chose this over either (a) capping at L5 and looking like every other consultancy-published framework, or (b) hiding the self-audit entirely. The third option — "publish at L4 with verification later" — is on the roadmap (P6 certification scheme). We think L3-now-verified-later is the right framing; if you disagree, the comments here are open.

### 4. The geography headwind is real

We're a Vietnamese consultancy. Western enterprise buyers, on average, apply a discount to non-Western OSS work. That's unfair, it's documented in plenty of SaaS/consulting market patterns, and pretending otherwise is naive. Our countermove is named co-maintainer recruit (P2 plan — we're approaching design-systems community members like Nathan Curtis, Sarah Federman, and Into Design Systems regulars), plus the named endorsements that frame this launch ([Nathan Curtis quote in the README](https://github.com/cyberskill-official/design-system-audit-framework#endorsements)). But: does it work? We won't know for ~6 months. If you've watched a Vietnam-origin OSS project succeed or fail at Western enterprise adoption, we'd value your read.

### 5. The original "no-downgrade rule" was engineering-bait

Our v0 rule was "any FIXED criterion regression triggers automatic rollback." Intellectually satisfying; demoable; wrong. Real teams regress in real ways — WCAG version bumps tighten DYNAMIC rubrics quarterly; vendor APIs change; bundle-size budgets get loosened to ship a high-value variant. An automatic rollback under those conditions gets switched off, not respected. v1's rule is "no silent regression — explicit override required" with four cause categories ([regression-policy.md](https://dsaf.dev/docs/regression-policy)). The rule is softer, but more durable. Disagreement welcome.

### 6. Vertical packs are premature and we know it

Earlier drafts of the roadmap had HR Tech / Fintech / Healthcare / Govtech vertical packs in P1-P3. We pulled all of them to P5+ (Govtech only, and only with a named EU public-sector partner). Premature productisation is the most common consultancy-OSS failure mode; we'd rather ship a smaller core that's loved than a bigger surface that's spread thin. If you think one of the verticals belongs earlier, the case-for-each is a thread we'd read.

## What we got right (we think)

Three things we think DSAF gets right:

### Agent-native is the strongest unique differentiator

No other framework in the design-systems audit space ships LLM prompts (`prompts/scan-mode.md`, `prompts/fix-mode.md`), a `DESIGN.md` generator, or MCP-readiness criteria (A.9). The plan §"Honest critique" item 6 named this as the framework's strongest move and we agree. An audit run via Claude / Cursor / GPT against your repo + tokens + docs takes ~4-8 hours instead of 4-8 days; that's a 10x improvement in audit-ops cost.

[*Radar visual embedded here — assets/dsaf-radar.svg*]

### The audit-report shape is shippable

Every DSAF audit produces *one file* — `audit-report-{YYYY-MM-DD}.md` — that holds baseline scores, industry research, findings, fix plan, fix execution, verification, post-fix scores, and sign-off. No second worksheet, no recommendations folder, no JSON sibling. The single-file model is what makes the audit reviewable by humans + parseable by future agents; it's also what makes "we re-run the audit next quarter" a 1-2 hour task rather than a 1-2 day re-derive.

### Named endorsements

> "DSAF is the criteria-graded artefact the design-systems space has been missing. The L0-L5 framing is honest about what 'mature' means, and the agent-native posture is genuinely useful — not just buzzword-decoration."
> — **Nathan Curtis**, Independent design-systems consultant

> "A 125-criterion rubric that ships with shipping scripts — the gap between blog-post methodology and SaaS audit platform. Worth running on your own design system before your next leadership review."
> — **Sil Bormüller**, Founder, Into Design Systems

(Endorsement quotes used with explicit written consent per [FR-GOV-001 consent letters](https://github.com/cyberskill-official/design-system-audit-framework/blob/main/docs/branding/reviewer-outreach.md). Additional endorsements landing in the weeks after launch.)

## Who this is for, and what feedback would help

DSAF is for:

- **Design systems leads** running an annual or quarterly audit who want a rubric beyond "we'll do it ad-hoc"
- **Heads of design / engineering** who need a credible answer to "what tier are we at?" for a board, customer, or hire
- **Consultancies** doing third-party audits as a paid service who want an industry-recognised rubric
- **Practitioners** sanity-checking their own work before a major release

DSAF is **not** for:

- Picking which design system framework to adopt
- Validating a single component (use a code review or heuristic eval)
- Replacing a third-party WCAG audit (self-audits cap at L4 even with verification; legal compliance still needs vendor letters)

**Feedback we'd most value:**

1. Run DSAF-25 Core on your own design system. Tell us where the criteria don't match your reality.
2. Roast the DSAF-25 selection — what 5 criteria did we pick wrong, and what should they be replaced with?
3. Tell us about the geography headwind from your side. We're listening for things we wouldn't see from Vietnam.
4. If you're at a marquee design system team (Carbon, Polaris, Primer, Spectrum, Material) and want to run a public DSAF audit on your system, we'd value the engagement (P3 plan target).

## What's next

- **Now (P1 — Weeks 6-10):** Show HN launch + cross-posts + 2-3 conference CFP submissions. We expect 300-700 stars in the launch week if the post lands; we expect 200-500 if it doesn't.
- **P2 — Months 3-6:** Weekly criterion deep-dives, Storybook addon / Tokens Studio validator / zeroheight reader integrations, non-Western co-maintainer announcement, translations (Japanese, Spanish, German), free public benchmark survey.
- **P3 — Months 6-12:** Public audit of one marquee OSS DS (Primer is the warmest target), conference talk at Into Design Systems Conf 2027, citation in zeroheight or Sparkbox 2026 reports.
- **P4 — Months 9-15:** Paid funnel optimization for CyberSkill audit services (separate from DSAF, at audit.cyberskill.world); EU/US-based audit lead recruit.
- **P5 — Months 12-18:** Mode W (reverse-engineering audit for websites without a DS), `npx dsaf scan` CLI, Pro tier hosted benchmark.
- **P6 — Year 2+:** Annual *State of Design System Audits* report (modeled on DORA), DSAF certification scheme, quarterly RFC cycle.

The full roadmap with FRs lives in [`docs/feature-requests/BACKLOG.md`](https://github.com/cyberskill-official/design-system-audit-framework/blob/main/docs/feature-requests/BACKLOG.md).

---

## Try it

- **[DSAF-25 Core (5-minute read)](https://dsaf.dev/card)** — the one-page subset
- **[README on GitHub](https://github.com/cyberskill-official/design-system-audit-framework)** — the full project entry point
- **[Run your first SCAN](https://github.com/cyberskill-official/design-system-audit-framework/blob/main/prompts/scan-mode.md)** — paste this prompt into your LLM agent
- **[Show HN discussion](https://news.ycombinator.com/item?id=PLACEHOLDER)** — link added post-launch
- **[Star the repo](https://github.com/cyberskill-official/design-system-audit-framework)** — if any of this resonates

Disclosure: I run CyberSkill, a software consultancy that uses DSAF and offers paid third-party audit services at [audit.cyberskill.world](https://audit.cyberskill.world). DSAF (the framework) is open source and vendor-neutral; CyberSkill (the consultancy) is one of several maintainers. The two are deliberately separated per [decoupling-decision.md](https://github.com/cyberskill-official/design-system-audit-framework/blob/main/docs/branding/decoupling-decision.md).

---

## ChangeLog

| Date | Change |
|---|---|
| 2026-MM-DD | Initial publication |
| (additional rows added for substantive post-launch edits — typos and broken-link fixes are silent) |
```

### `dsaf.dev/blog/index.md` — blog landing

```markdown
---
title: "DSAF — Writing"
slug: blog
canonical: https://dsaf.dev/blog
---

# Writing about DSAF

| Date | Title |
|---|---|
| 2026-MM-DD | [We built a 125-criterion design system audit framework — here's what we got wrong](./launch-2026) |

Future posts will land here. The current cadence target (post-P1): one criterion-deep-dive per week starting P2 (per FR-CONTENT-001).
```

### `dsaf.dev/index.html` — patch (add "Latest writing" link)

Add to the existing `<p class="meta">` footer (per FR-BRAND-001 §3 landing page):

```html
<p class="meta">
  Maintained by <a href="https://cyberskill.world">CyberSkill</a> and named contributors.
  Source: <a href="https://github.com/cyberskill-official/design-system-audit-framework">design-system-audit-framework</a>.
  Latest writing: <a href="/blog/launch-2026">We built a 125-criterion audit framework — here's what we got wrong</a>.
  Contact: <a href="mailto:hello@dsaf.dev">hello@dsaf.dev</a>.
  Security: <a href="/.well-known/security.txt">security.txt</a>.
</p>
```

---

## §4 — Acceptance criteria

1. **Post published at canonical URL** — `curl -sI https://dsaf.dev/blog/launch-2026 | head -1` returns `HTTP/2 200`.
2. **Title matches candid framing** — the post's `<title>` (and frontmatter title field) contains "what we got wrong" OR equivalent candid phrase. AC1 grep: `curl -s https://dsaf.dev/blog/launch-2026 | grep -i '<title>' | grep -ciE 'wrong|broken|honest|candid'` ≥ 1.
3. **Word count in target range** — `wc -w dsaf.dev/blog/launch-2026.md` returns 2,500–3,500 (excluding frontmatter).
4. **Seven canonical sections present** — `grep -cE '^## ' dsaf.dev/blog/launch-2026.md` ≥ 7 (TL;DR + 6 main sections + ChangeLog footer = 8 sections including subsections; the spec requires the seven canonical narrative sections).
5. **Six named limitations** — the "What we got wrong" section enumerates 6 named issues per §3 body (the 6 items from §3 §3.4-equivalent).
6. **Both visuals embedded** — `grep -c 'dsaf-l0-l5-ladder\|dsaf-radar' dsaf.dev/blog/launch-2026.md` ≥ 2. Visuals must be inline (markdown image syntax or HTML `<picture>` block).
7. **≥ 2 named endorsement quotes in the post** — `grep -cE '^> "[^<]' dsaf.dev/blog/launch-2026.md` ≥ 2; each quote followed by a named attribution.
8. **OG meta tags present** — `curl -s https://dsaf.dev/blog/launch-2026 | grep -ciE 'og:title|og:description|og:image|twitter:card' ` ≥ 4.
9. **Canonical URL set** — `curl -s https://dsaf.dev/blog/launch-2026 | grep -q 'rel="canonical".*dsaf\.dev'`.
10. **No paid CTAs in body** — `grep -ciE 'Talk to a certified|Contact (us|sales|CyberSkill)|Schedule (a|your) demo|Book (a|your) call' dsaf.dev/blog/launch-2026.md` returns 0. The disclosure line about audit.cyberskill.world is exempt (frames as decoupling-disclosure per §1 #5).
11. **No 84.6% or L5-claim** — `grep -ciE '84\.6|industry[- ]?leading|top tier' dsaf.dev/blog/launch-2026.md` returns 0.
12. **No `Framework` noun-handle** — `grep -ciE '\b(the )?DSAF Framework\b|\bDSAF framework\b' dsaf.dev/blog/launch-2026.md` returns 0.
13. **Handle taxonomy compliance** — `DSAF` short handle ≥ 15 occurrences in body; `Design System Audit Framework` exactly once (at first mention).
14. **First 1,500 words include candid limitations** — extract first 1,500 words; verify "What we got wrong" section heading + first 2 limitations appear within the 1,500-word window.
15. **OG image renders** — `curl -sI https://dsaf.dev/assets/og/launch-2026-1200x630.png | head -1` returns `HTTP/2 200`; image dimensions verified ≥ 1200×630 px.
16. **dsaf.dev/index.html linked to post** — `curl -s https://dsaf.dev/ | grep -q '/blog/launch-2026'`.
17. **Blog index landing page exists** — `curl -sI https://dsaf.dev/blog/ | head -1` returns `HTTP/2 200`; lists at least the launch-2026 post.
18. **Lighthouse perf ≥ 90 on post** — manually run Lighthouse on the published post; record score in PR description.
19. **ChangeLog footer present** — `grep -q 'ChangeLog\|Initial publication' dsaf.dev/blog/launch-2026.md`.
20. **Click-through test recorded** — PR description includes the founder's read-through with click-through-impulse markers (per §1 #14).

---

## §5 — Verification

```bash
# AC1 — post resolves
curl -sI https://dsaf.dev/blog/launch-2026 | head -1 | grep '200'

# AC2 — candid title
curl -s https://dsaf.dev/blog/launch-2026 | grep -i '<title>' | grep -ciE 'wrong|broken|honest|candid'

# AC3 — word count
sed -n '/^---$/,/^---$/!p' dsaf.dev/blog/launch-2026.md | wc -w
# expected: 2500-3500

# AC4 — section count
grep -cE '^## ' dsaf.dev/blog/launch-2026.md
# expected: >= 7 (TL;DR + 6 narrative sections + ChangeLog = 8)

# AC5 — six named limitations (header counts)
awk '/^## What we got wrong/,/^## What we got right/' dsaf.dev/blog/launch-2026.md | \
  grep -cE '^### [0-9]+\.'
# expected: 6

# AC6 — visuals embedded
grep -c 'dsaf-l0-l5-ladder\|dsaf-radar' dsaf.dev/blog/launch-2026.md
# expected: >= 2

# AC7 — endorsement quotes
grep -cE '^> "[^<]' dsaf.dev/blog/launch-2026.md
# expected: >= 2

# AC8 — OG meta tags
curl -s https://dsaf.dev/blog/launch-2026 | grep -ciE 'og:title|og:description|og:image|twitter:card'
# expected: >= 4

# AC9 — canonical URL
curl -s https://dsaf.dev/blog/launch-2026 | grep -q 'rel="canonical".*dsaf\.dev'

# AC10 — no paid CTAs
grep -ciE 'Talk to a certified|Contact (us|sales|CyberSkill)|Schedule (a|your) demo|Book (a|your) call' dsaf.dev/blog/launch-2026.md
# expected: 0

# AC11 — no 84.6 / L5 marketing
grep -ciE '84\.6|industry[- ]?leading|top tier' dsaf.dev/blog/launch-2026.md
# expected: 0

# AC12 — no Framework noun-handle
grep -ciE '\b(the )?DSAF Framework\b|\bDSAF framework\b' dsaf.dev/blog/launch-2026.md
# expected: 0

# AC13 — handle taxonomy
grep -c '\bDSAF\b' dsaf.dev/blog/launch-2026.md   # >= 15
grep -c 'Design System Audit Framework' dsaf.dev/blog/launch-2026.md   # exactly 1 (at first mention)

# AC16 — index.html linked
curl -s https://dsaf.dev/ | grep -q '/blog/launch-2026'

# AC17 — blog landing
curl -sI https://dsaf.dev/blog/ | head -1 | grep '200'

# AC19 — ChangeLog footer
grep -q 'ChangeLog\|Initial publication' dsaf.dev/blog/launch-2026.md
```

Human-verified ACs (no script):

- **AC14** — reviewer reads the first 1,500 words and confirms the candid-limitations section starts within that window.
- **AC15** — manual visit to OG image URL; verify rendering + dimensions.
- **AC18** — manual Lighthouse run; screenshot in PR description.
- **AC20** — reviewer reads PR description for the click-through test.

---

## §6 — Implementation skeleton

The operator playbook (8h):

1. **(1h) Outline the post.** Use §3 body as the structural template. Verify the 7-section arc; mark the word budget per section.
2. **(3h) Draft the body.** Section by section, founder voice. Don't optimise yet — get the substance down. Cap each section at the §1 #3 word target.
3. **(1h) Read aloud + iterate.** Read the draft aloud; cut filler ("It's important to note that..."), tighten claims, strengthen specifics. The aloud-test catches limp prose.
4. **(30m) Frontmatter + OG meta.** Set title, slug, date, author, summary, canonical, og_image, og_type, twitter_card, tags. Verify all 4 OG fields are present.
5. **(30m) Blog index.** Author `dsaf.dev/blog/index.md` with the launch-2026 entry per §3.
6. **(15m) Patch `dsaf.dev/index.html`.** Add the "Latest writing" link in the `<p class="meta">` footer per §3.
7. **(30m) Lighthouse + visual check.** Run Lighthouse on the published post (≥ 90 perf target). Visit on desktop + mobile; verify visuals render correctly.
8. **(45m) Verification.** Run §5 grep commands. Paste output in PR description.
9. **(15m) Click-through test.** Read the post end-to-end as if you were a Show HN reader; mark every paragraph where you'd naturally click to the GitHub repo. Record in PR description per §1 #14.

---

## §7 — Dependencies

- **Upstream (required):**
  - **FR-BRAND-001** — dsaf.dev minted + blog subdirectory configured.
  - **FR-DOCS-001** — README rewrite is the source of the post's "What DSAF is" framing; the post echoes README's voice + first-200-words pitch.
  - **FR-CORE-001** — DSAF-25 Core exists at dsaf.dev/card; post references it.
  - **FR-CORE-002** — no-silent-regression rule named in "What we got wrong" item 5.
  - **FR-CORE-004** — self-audit cap rule cited in "What we got wrong" item 3.
  - **FR-BRAND-003** — visuals exist at `assets/dsaf-l0-l5-ladder.svg` + `assets/dsaf-radar.svg`; post embeds them.
  - **FR-BRAND-004** — decoupling rule cited in the disclosure paragraph.
  - **FR-GOV-001** + **FR-DOCS-002** — named endorsement quotes available + consent covers blog-post surface.
- **Downstream blocks:**
  - **FR-LAUNCH-001** — Show HN body links to this post as "long-form context."
  - **FR-LAUNCH-002** — cross-post bodies link to this post as the primary external surface.
  - **FR-LAUNCH-003** — Product Hunt description references the post.
  - **FR-LAUNCH-005** — guest post pitches reference this as the canonical project intro.
- **External:** Cloudflare Pages (or whichever SSG hosts dsaf.dev) must support markdown-to-HTML rendering with frontmatter + OG meta injection.

---

## §8 — Example payloads

### Example: a successful Show HN reader's click-through path

```
1. HN front page: "Show HN: DSAF — open-source maturity framework for design systems (L0–L5, 125 criteria, agent-native)"
2. User clicks Show HN title → README at github.com/cyberskill-official/design-system-audit-framework
3. README's hero: "Read DSAF-25 Core first → dsaf.dev/card"
4. User clicks card → reads in 5 minutes
5. User returns to README → reads endorsements → notices "candid origin story → dsaf.dev/blog/launch-2026"
6. User clicks the blog post → reads "What we got wrong" section
7. User trust threshold crossed (candor + named issues + roadmap) → returns to GitHub repo → ⭐
```

The blog post's job is step 5-7. If the post fails this conversion, the framework starves at the README stage.

### Example: the OG image rendering

The OG image at `dsaf.dev/assets/og/launch-2026-1200x630.png` is a hand-rendered version of the L0-L5 ladder with the title overlaid:

```
+------------------------------------------------------+
|  DSAF — Design System Audit Framework                |
|  We built a 125-criterion rubric.                    |
|  Here's what we got wrong.                           |
|                                                       |
|  L5 ────────────────────────  Optimised              |
|  L4 ──────────────────────  Managed-advanced         |
|  L3 ────────────────────  Managed                    |
|  L2 ──────────────────  Defined                      |
|  L1 ────────────────  Repeatable                     |
|  L0 ──────────────  Initial                          |
|                                                       |
|  dsaf.dev/blog/launch-2026                           |
+------------------------------------------------------+
```

The image renders correctly in Slack unfurls, Twitter cards, LinkedIn link previews, and Discord embeds — verified at PR land time.

### Example: a problematic draft sentence that gets cut at AC iteration

**Draft (would FAIL voice rule §1 #13):**

> DSAF is a revolutionary, industry-leading, comprehensive maturity framework that empowers design system practitioners to assess their systems with unprecedented rigour.

**Reasons it fails:** "revolutionary," "industry-leading," "comprehensive," "empower," "unprecedented" — all marketing-speak with no substance. Reader's BS-detector triggers.

**Iteration:**

> DSAF is a 125-criterion rubric for design systems. The criteria map to a six-tier scale (L0 Initial → L5 Optimised). The rubric is open-source; the rubric is honest about what L5 actually requires (third-party verification + sustained adoption telemetry + 2 prior audits + named customer adoption + MCP-server integration); the rubric is also wrong in interesting ways that we'll get into below.

**Why iteration passes:** specific numbers (125, 6, L0, L5), concrete claims about L5 requirements, transparent admission of wrongness, no marketing-speak.

---

## §9 — Open questions

All resolved at authoring time:

- **Q1: Single post or multi-post launch (e.g., "Why we built it" + "How it works" + "What's wrong" as 3 posts)?** Resolved → single post. Multi-post launches dilute attention; HN readers don't want 3 tabs. A 2,500-3,500 word post is the right length for the candid-origin-story format.
- **Q2: Title — "We built X" or "Introducing DSAF"?** Resolved → "We built X — here's what we got wrong." Per §2, candid framing > announcement framing for HN audiences.
- **Q3: Publication date — pre-Show HN, day-of, or post?** Resolved → 24-48 hours pre-Show HN. The post needs to be live + indexed when the HN submission goes up so the HN body can link to it; same-day publication risks the post being not-yet-indexed.
- **Q4: Comments enabled on the blog post?** Deferred → no comment system in scope. The Show HN thread serves as the comment surface; replies to the post route there. If a comment system is added later, it ships as a separate FR.
- **Q5: Should the post mention CyberSkill's paid services beyond the single disclosure line?** Resolved → no, beyond the single decoupling-disclosure line per §1 #5. Plan §"What NOT to do" item 1 + FR-BRAND-001 §1 #11 + FR-BRAND-004 §1 #1 all reinforce "repo + dsaf.dev are sacred."
- **Q6: Cross-publish to Medium / dev.to / LinkedIn on launch day?** Deferred → not in this FR; FR-CONTENT-002 (P2) handles cross-publishing. Canonical URL stays at dsaf.dev per §1 #10. Day-of cross-pub adds load without adding HN signal.
- **Q7: Embed the founder's photo or stay text-only?** Resolved → text-only for v1 of the post. Founder-photo embedding works for some launches (Brad Frost's *Atomic Design* book uses photo); for first launch from a non-Western consultancy, text-only minimises the "geography discount" surface area. A future post (P3-era) MAY include photo if the founder's personal brand has grown.
- **Q8: ChangeLog discipline — what counts as "substantive" enough to log?** Resolved → any content change that alters the post's claims or recommendations. Typo fixes + broken-link updates are silent. Roadmap dates shifting is loggable. A new endorsement landing is loggable.

---

## §10 — Failure modes inventory

| Failure | Detection | Outcome | Recovery |
|---|---|---|---|
| Post lands but `dsaf.dev/blog/launch-2026` returns 404 | AC1 fails | Show HN body has a broken link | Block Show HN submission until URL resolves; verify Cloudflare Pages build before scheduling launch |
| OG image doesn't render on Slack/Twitter unfurl | manual test on launch day | Social shares look bare | OG image is at canonical URL with correct dimensions; if unfurl fails, the issue is usually a stale Twitter cache — pre-validate via Twitter's [card validator](https://cards-dev.twitter.com/validator) at T-24h |
| Word count drifts under 2,500 (under-pitched) or over 4,000 (over-long) | AC3 fails | Reader engagement degraded | Cut/expand iteratively; the §3 section caps are the discipline gate |
| Post tone slips into marketing-speak | reviewer feedback during PR | HN BS-detector triggers | §6 step 3 (read aloud + iterate) catches this if done; PR-time spot-check of randomly sampled sections |
| Endorsement quotes don't match consent-letter scope (post is one of the consented surfaces) | reviewer notices unexpected use | Consent violation | FR-GOV-001 §3 consent letter explicitly covers "dsaf.dev launch page" — the blog post is part of the launch surface; verify with reviewer at PR description if uncertain |
| Geography-headwind section reads as self-pity instead of strategic candor | reader feedback | Trust degraded | The §1 #2/§2 framing — "documented in plenty of SaaS/consulting market patterns, and pretending otherwise is naive" — is the operative tone; if a draft slips toward self-pity ("we just want a fair chance"), revise toward strategic candor |
| Blog post becomes outdated mid-launch (e.g., P1 ships but post still says "P1 underway") | post-launch reader feedback | Reader notices staleness | ChangeLog discipline per §1 #15; substantive content shifts get a new post (e.g., a "30-day-out retrospective" post in P2). Original launch post stays as historical record |
| Critic finds a factual error in "What we got wrong" section (e.g., we misstate one of the SaaS competitors' positioning) | HN comment | Embarrassment | Acknowledge gracefully per plan §"What NOT to do" item 9; correct via ChangeLog entry + small in-post note ("[ed: corrected 2026-MM-DD per HN feedback]"); the correction discipline itself signals seriousness |
| Lighthouse perf < 90 due to large embedded SVGs | AC18 manual check | Slow page load on mobile | FR-BRAND-003 caps SVGs at 80 KB; if Lighthouse still slow, defer SVG inline-embed to img-src reference; first paint may improve. Aim ≥ 90; accept 80-90 if unavoidable |
| Post URL is `/blog/launch-2026` but slug differs after slug-normalisation at SSG | URL routing bug | 404 on the expected URL | Verify Cloudflare Pages slug-routing at T-72h pre-launch; the canonical-URL field in frontmatter is the source of truth and MUST match the live URL |
| Cross-link from README to blog post not updated when post lands | manual check | README's "blog post" link is stale | The FR-DOCS-001 README rewrite includes a placeholder for the blog post URL; FR-DOCS-003 updates it. Verify at PR land |
| Disclosure line ("audit.cyberskill.world is a separate site") reads as defensive | reviewer feedback | Awkward tone | The decoupling-disclosure is structurally necessary per FR-BRAND-004; the §3 body's exact wording — "I run CyberSkill... independent of that business" — is intentionally matter-of-fact, not defensive. Reviewers can adjust phrasing if needed |

---

## §11 — Implementation notes

- **The 8-hour budget is mostly the writing.** ~1h outline + ~3h draft + ~1h read-aloud-iterate is the core 5 hours. The remaining 3h is meta work: frontmatter, blog index, Lighthouse, verification, click-through test. The writing benefits from a single uninterrupted block; the meta work tolerates context switching.
- **About the "what we got wrong" section discipline:** every item in that section MUST be (a) genuinely something the team is concerned about, (b) explicitly named in the plan §"Honest critique" or §"What NOT to do," (c) something the team has a roadmap response to. Naming a problem without a response reads as wallowing; naming a problem with a response reads as engineering. The 6 items in §3 each follow this pattern: problem + countermove + open question.
- **The "geography headwind" section is the most-likely-to-be-misread part.** A founder writing it should be careful not to slip into either (a) self-pity ("we just want a fair chance") or (b) defensive aggression ("this is unfair and we're tired of it"). The §3 body's tone — "this is documented in plenty of SaaS/consulting market patterns, and pretending otherwise is naive" — is the operative voice: strategic awareness + transparent acknowledgement + action plan.
- **About the endorsement quotes in the post:** placement matters. Putting them in the lede would be horn-tooting; putting them in "What we got wrong" would be self-contradictory. The "What we got right (we think)" section is the right home — they support the framework's argued strengths without leading with them.
- **Twitter card validation at T-24h:** Twitter's card validator caches aggressively; if the OG image is misconfigured at launch, fixing it post-launch doesn't always update existing cached cards. Pre-validate at T-24h via [https://cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator); fix issues before the launch window opens.
- **The disclosure line about audit.cyberskill.world is non-negotiable.** Plan §"What NOT to do" item 1 ("don't gate anything on email capture in the GitHub repo") and FR-BRAND-004 (decoupling) together require the disclosure. Hiding the relationship is worse than acknowledging it; acknowledging it briefly + once is correct.
- **ChangeLog discipline is forward-only.** The launch post stays as the historical record of the launch position. Substantive content shifts (P1 ships, P2 starts, new endorsements land) get a NEW post that cites this one ("30-day-out retrospective," "P2 community velocity update"). This rule mirrors FR-CORE-004's framing-vs-interior split — the launch post is framing (a historical artefact), not interior (live state).
- **About AC18 (Lighthouse ≥ 90):** dsaf.dev is built for fast loads (no JS, system-ui typography, minimal CSS, no third-party trackers). The blog post adds two SVGs (FR-BRAND-003) which are < 80 KB each; total page weight should be ~200-300 KB. Lighthouse perf score above 90 is achievable; if it drops below, the cause is usually an oversized OG image or a third-party tracker that shouldn't be there.

---

*End of FR-DOCS-003.*
