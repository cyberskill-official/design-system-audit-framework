---
id: FR-LAUNCH-005
title: "Smashing / CSS-Tricks / A List Apart guest-post pitch — 6-week lead time, lands within 2 weeks of launch"
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
related_frs: [FR-DOCS-003, FR-LAUNCH-001, FR-CONTENT-001, FR-CONTENT-002, FR-CONTENT-003]
depends_on: [FR-DOCS-003]
blocks: []
source_pages:
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Phase 1 — Launch action 5 — 'Submit a Smashing Magazine / CSS-Tricks / A List Apart guest post pitched at 6 weeks lead time so it lands within 2 weeks of launch')"
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§What NOT to do item 5 — 'Don't write 20 medium-quality blog posts. Write 5 excellent ones and pitch them to Smashing/CSS-Tricks/A List Apart. Quality of placement compounds; quantity on Medium does not.')"
source_decisions:
  - "DEC-049: 3 publications pitched (Smashing, CSS-Tricks, A List Apart) — the plan's tier-1 design-systems-relevant venues"
  - "DEC-050: pitch is for ONE article per publication (not the same article cross-published) — each publication's editorial standard differs"
  - "DEC-051: 6-week lead time from pitch to publication is the publication-side editorial cadence; aim for publication within 2 weeks of launch for maximum compound visibility"
  - "DEC-052: pitch articles are different topics from the FR-DOCS-003 launch blog post — guest posts are about a specific deep-dive (a criterion, methodology, or insight), not the launch announcement itself"
language: markdown + ops
service: doctrine + outreach ops
new_files:
  - internal/launch/guest-post-pitches.md
modified_files: []
allowed_tools:
  - "file_read/write internal/launch/**"
  - "personal email composition (pitch happens via founder's email to each publication's editorial contact)"
  - "publication-research scan (read recent design-systems-related content per publication to calibrate tone and angle)"
disallowed_tools:
  - "use a single mass-blast pitch across all 3 publications (each publication's editorial standards differ)"
  - "pitch a topic that's identical to FR-DOCS-003's launch blog post (the publications want fresh content, not re-publishing)"
  - "promise an exclusive article without confirming feasibility (some publications require first-publication rights — committing without verification creates conflict)"
  - "use third-party SEO / content-promotion services that promise guaranteed publication"
  - "pitch outside the 6-week-lead-time guidance (later = won't land within 2 weeks of launch; earlier = publications often reject pitches without near-term ship dates)"
effort_hours: 4
sub_tasks:
  - "1. (30m) Author internal/launch/guest-post-pitches.md per §3 — pitch templates per publication + topic shortlist + editorial-contact research"
  - "2. (1h) Per-publication research — read 5-10 recent articles per pub to calibrate tone, angle, length expectations"
  - "3. (1.5h, ~6 weeks pre-launch) Draft 3 distinct pitch emails (one per publication) per §3 template; topics MUST differ"
  - "4. (~elapsed 1-3 weeks, ~30m founder-time) Send pitches; respond to editor replies (acceptance / revision-request / rejection)"
  - "5. (post-acceptance, ~6-8h per accepted article elapsed time over 2-3 weeks) Draft the article; iterate per editor feedback; deliver final"
  - "6. (post-publication) Update MEMORY.md per publication relationship + link the published article from dsaf.dev/blog/index"
risk_if_skipped: "Plan §Phase 1 action 5 names this as a substantive launch-prep step. Plan §'What NOT to do' item 5 explicitly says: 'Write 5 excellent ones and pitch them to Smashing/CSS-Tricks/A List Apart. Quality of placement compounds; quantity on Medium does not.' Smashing Magazine reaches ~1.5M monthly readers; CSS-Tricks ~2M; A List Apart ~500K (with higher prestige weight). A single published article in any of these venues drives ~2,000-10,000 dsaf.dev / repo referrals over its first 30 days + permanent search-indexed citation. The cost is small (4h pitch + 6-8h per article post-acceptance); the value is the compounding citation graph these publications produce. Skipping this FR doesn't fail the launch (Show HN + cross-posts + PH can carry the launch alone), but it ceges the highest-quality external-citation surface in the design/web-development space. Pre-launch acceptance gives the article a publication window during the post-launch 2-week visibility tail — compound effect with Show HN traction."
---

## §1 — Description (BCP-14 normative)

The framework's launch SHOULD include guest-post pitches to three tier-1 design-systems / web-development publications: **Smashing Magazine**, **CSS-Tricks**, **A List Apart**. The pitches are submitted at T-6 weeks from FR-LAUNCH-001 Show HN posting date with the goal that at least one article lands within 2 weeks of launch. Each pitch is a distinct topic (NOT re-pitching the same article across all 3); each pitch's article is *different from* the FR-DOCS-003 launch blog post (publications want fresh content).

**2026-05-18 implementation note:** the canonical runbook is repo-shipped at `internal/launch/guest-post-pitches.md`; full copy-paste pitch drafts live in `internal/social/guest-post-pitches.md`. Current submission surfaces were checked for Smashing Magazine, CSS-Tricks, and A List Apart. For the May 19, 2026 Show HN slot, the T-8/T-6/T-4 guest-post windows are already missed, so the original "lands within 2 weeks of launch" outcome is blocked by editorial lead time unless the launch date rolls forward.

1. **MUST** publish pitch playbook at `internal/launch/guest-post-pitches.md` per §3 with: per-publication editorial contact research, per-publication tone calibration, topic shortlist (3-6 candidate topics), 3 distinct pitch email templates (one per publication), and a tracking format.
2. **MUST** pitch 3 distinct articles, one per publication. The same article pitched across all 3 violates publication norms (each publication wants first-publication rights). Each article is calibrated to the publication's typical content style + length expectations + audience.
3. **MUST** pitch at T-6 weeks from FR-LAUNCH-001 Show HN posting date. Earlier than T-8 weeks: publications often reject pitches without near-term ship dates ("we don't plan that far ahead"). Later than T-4 weeks: the 6-8-week editorial cycle won't land the article within 2 weeks of launch. T-6 weeks is the operational sweet spot.
4. **MUST** select pitch topics from the §3 topic shortlist: (a) "Auditing a 125-criterion design system maturity framework — what 12 months of internal use taught us about the criteria themselves" (Smashing-style methodology piece), (b) "The case for criteria-graded design-system maturity scales — and the L0–L5 framing you can copy" (CSS-Tricks-style framework-explainer piece), (c) "How to run an LLM-agent-assisted design system audit in 4 hours (instead of 4 days)" (A List Apart-style craft-deep-dive piece). Topics are illustrative; operator MAY substitute pending publication editorial preferences.
5. **MUST NOT** pitch topics that duplicate FR-DOCS-003's launch blog post ("We built a 125-criterion design system audit framework — here's what we got wrong"). The launch blog post is the candid origin story; guest posts are deeper-dive on specific topics. Duplication wastes both surfaces.
6. **MUST** customise each pitch per publication. Pitch email structure (per §3 template): (a) subject line names the topic + publication's typical framing (e.g., "Article pitch for Smashing — Auditing a 125-criterion design system maturity framework"); (b) opens with the angle, not the framework ("Here's the article I'd like to write for Smashing: ..."); (c) provides credentials (the founder + DSAF context); (d) provides the article outline (5-7 section headings + 1-2 sentence summary each); (e) provides the proposed length (~2,000-3,000 words typical for Smashing/CSS-Tricks; A List Apart skews longer); (f) provides timing ("ready to deliver within 2 weeks of acceptance; flexible on publication date").
7. **MUST** disclose the dsaf.dev launch context in each pitch but NOT as the article's reason-to-exist. The pitch frames the article as standalone value to the publication's readers; the launch is mentioned as "DSAF launches in 6 weeks on Show HN — this article would land within the post-launch visibility window, but the article's value to your readers is the topic deep-dive, independent of the launch."
8. **MUST NOT** promise exclusivity to multiple publications simultaneously. If Pub A asks "is this exclusive to us?", the founder confirms the article is for Pub A's first-publication rights but DSAF will reference the article on dsaf.dev. The other 2 pitches are for *different* articles.
9. **MUST** handle three response modes per §3: (i) acceptance — the founder drafts the article per the publication's editorial guidelines (6-8 founder-hours of writing + iteration); (ii) revision request — the founder either revises the pitch OR accepts the publication's redirected topic; (iii) rejection — the founder logs the decline + considers Pub B/C as alternate venues for the same topic (with adjusted angle).
10. **MUST** apply the FR-BRAND-002 handle taxonomy throughout pitches AND draft articles. `DSAF` short handle; long name `Design System Audit Framework` exactly once at first mention; no `Framework` noun-handle.
11. **MUST** apply the FR-CORE-004 self-audit cap rule. Guest articles do NOT reference CyberSkill's self-audit at L5; the worked example is mentioned (where relevant) only as "complete worked L3 self-audit example."
12. **MUST NOT** include paid-funnel CTAs or "Talk to a certified auditor" links in any guest article. The articles are about substance; the dsaf.dev URL is the canonical link (NOT audit.cyberskill.world). Plan §"What NOT to do" item 1 generalises to all launch-surface communications.
13. **MUST** include in each pitch the canonical dsaf.dev links as proof-of-existence: dsaf.dev/card (DSAF-25 Core, 5-min entry), github.com/cyberskill-official/design-system-audit-framework (repo). The launch URL (Show HN) is "planned for [DATE]" pre-launch; post-launch it's the actual URL.
14. **MUST** track each pitch + response in `internal/launch/guest-post-pitches.md` per §3 tracking format. Patterns across publications (which angles get acceptance, which get rejection) feed FR-CONTENT-001 deep-dive prioritisation.
15. **MUST NOT** use third-party SEO / content-promotion services that promise guaranteed publication. These services typically work via paid relationships with publication editors; using them violates editorial-integrity norms + risks being publicly exposed.

---

## §2 — Why this design

**Why 3 publications (Smashing / CSS-Tricks / A List Apart) (§1 #1, #2):** plan §Phase 1 action 5 + §"What NOT to do" item 5 name these three as the highest-leverage external publications for design-systems content. Each reaches a distinct audience slice: Smashing skews practitioner-broad (front-end + UX + DS); CSS-Tricks skews CSS/front-end-engineer; A List Apart skews craft-prestige + slightly more thoughtful. The trio covers the design-systems reader landscape without overlap-collisions.

**Why distinct topics per publication (§1 #2, #5):** each publication wants first-publication rights for the topic. Pitching the same article across all 3 is editorial malpractice (and at least two would reject for that reason alone). Distinct topics also lets the founder cover 3 different angles of DSAF, multiplying the framework's external-citation surface.

**Why T-6 weeks lead time (§1 #3):** publications' editorial cycles run 4-8 weeks from acceptance to publication. T-6 weeks pitch → ~4 weeks to acceptance + revisions → ~2 weeks to publication = lands within 2 weeks of launch. T-8 weeks pitch typically gets "we don't plan that far ahead"; T-4 weeks pitch typically gets "we can't fit it in the editorial calendar in time."

**Why guest articles are DIFFERENT topics from FR-DOCS-003 launch blog post (§1 #5):** the launch blog post is the candid origin story — it lives at dsaf.dev/blog/launch-2026. Guest articles are *deep-dives* on specific topics (a criterion, a methodology choice, a tactical insight). Publications wouldn't accept re-publishing the launch post (it's already published elsewhere); deep-dives are publication-fresh content the editors want.

**Why no exclusivity-conflict (§1 #8):** publications expect first-publication rights for their specific article. Cross-publishing the same article violates this; the framework's reputation in the editorial ecosystem matters for future content (FR-CONTENT-002 P2 cross-publishing on dev.to / Medium with canonical dsaf.dev, FR-CONTENT-003 P3 co-author piece on Knapsack/EightShapes). Maintaining clean exclusivity for guest articles preserves credibility.

**Why launch-mention secondary in pitch (§1 #7):** publications evaluate pitches on the article's value to their readers, NOT on the launching-product context. Leading with the launch reads as marketing pitch; leading with the article's reader value reads as editorial pitch. The launch mention is contextual disclosure ("this would land within the post-launch visibility window") rather than the article's reason-to-exist.

**Why 3 response modes (§1 #9):** publications respond in 3 categories: acceptance, revision request (often the publication has its own editorial idea about the topic that the founder agrees to), rejection. All 3 are valid outcomes; the playbook handles each. Revision requests are common (~30-50% of accepted pitches start as revisions); accepting a publication's redirected topic is often *better* than the original pitch because the editor knows the publication's audience better.

**Why no paid-funnel CTAs in guest articles (§1 #12):** the publications enforce editorial integrity by their own standards — guest articles with paid-promotion CTAs are typically rejected or modified to remove them. The discipline matches FR-BRAND-001 + FR-BRAND-004 + plan §"What NOT to do" item 1 uniformly.

**Why no third-party SEO services (§1 #15):** publication editors detect paid-promotion arrangements + downrank or ban relationships built that way. The cost of "guaranteed publication" services exceeds the benefit by an order of magnitude when the publications find out. The framework's editorial relationships are organic; the cost of organic outreach is the 4-hour pitch + 6-8 hours per accepted article.

**Why MEMORY.md continuity per publication (§1 #14 + §11):** each publication relationship feeds into FR-CONTENT-002 (P2 cross-publishing) + FR-CONTENT-003 (P3 co-author piece). A founder who's published once in CSS-Tricks has standing for future pitches; a founder who's never pitched has to start fresh. The relationship continuity makes the framework's content trajectory feel like an ongoing dialogue across publications.

---

## §3 — Doctrine contract

### `internal/launch/guest-post-pitches.md` — the canonical pitch doc

```markdown
---
title: "Guest-post pitches for Smashing / CSS-Tricks / A List Apart"
ratified_by: FR-LAUNCH-005 (2026-05-17)
target_dates:
  - Smashing pitch: T-6 weeks from FR-LAUNCH-001 Show HN date
  - CSS-Tricks pitch: T-6 weeks
  - A List Apart pitch: T-6 weeks
---

# Guest-post pitches

This file is the operations doc for FR-LAUNCH-005. Three distinct article pitches to three publications; all submitted ~6 weeks pre-launch with the goal that ≥ 1 article publishes within 2 weeks of the Show HN launch.

## §3.1 — Publication editorial-contact research

| Publication | Editorial submission URL | Typical response time | Typical article length |
|---|---|---|---|
| Smashing Magazine | https://www.smashingmagazine.com/write-for-us/ | 2-4 weeks | 2,000-3,500 words |
| CSS-Tricks | https://css-tricks.com/guest-writing/ (or current submission form) | 2-4 weeks | 1,500-2,500 words |
| A List Apart | https://alistapart.com/about/contribute/ | 3-6 weeks (more selective) | 2,500-4,000 words |

Operator at outreach time: verify current submission URLs (these can change); identify current editorial contacts if individual emails are needed.

## §3.2 — Per-publication tone calibration

The operator MUST read 5-10 recent articles per publication before drafting the pitch to calibrate:

- **Smashing Magazine:** practitioner-broad; long-form (often 3,000-5,000 words); deep tutorials + methodology pieces; tone is "thoughtful expert"; visuals embedded liberally.
- **CSS-Tricks:** front-end-engineer-focused; medium-form (1,500-2,500 words); code-heavy; tone is "friendly expert with code samples"; visuals as code snippets + small diagrams.
- **A List Apart:** craft + thoughtful-practitioner; longer-form (2,500-4,000 words); essay-style with arguments; tone is "considered intellectual"; minimal code, more conceptual writing; high editorial standard.

## §3.3 — Topic shortlist (3 distinct articles)

### Topic A — Smashing Magazine (methodology deep-dive)

**Working title:** "Auditing a 125-criterion design system maturity framework — what 12 months of internal use taught us about the criteria themselves"

**Angle:** practitioner-focused methodology piece. What we got wrong about which criteria mattered when we tested DSAF internally. Includes 4-5 specific criteria examples (e.g., A.1.1 Color tokens, A.2.4 Variant coverage, A.9 MCP-readiness) with before/after refinements.

**Length:** 2,500-3,500 words.

**Why Smashing:** Smashing's audience runs design system audits + values methodology over framework-evangelism. The article is "here's what we learned from running our own framework" — Smashing's reader gets actionable take-aways for their own systems.

### Topic B — CSS-Tricks (framework-explainer + code-heavy)

**Working title:** "The case for criteria-graded design-system maturity scales — and the L0–L5 framing you can copy"

**Angle:** explainer + actionable. Why criteria-graded maturity scales (vs blog-post narratives or SaaS-platform rubrics) are the right artefact for DS teams. Includes the L0-L5 framing with concrete examples from DSAF. Shows the radar visualization. Includes a copy-paste DSAF-25 Core checklist for the reader.

**Length:** 1,800-2,200 words.

**Why CSS-Tricks:** CSS-Tricks's audience is front-end engineers building / consuming design systems. The article gives them a portable framework (DSAF-25 Core) they can apply tomorrow without committing to all 125 criteria.

### Topic C — A List Apart (craft + considered)

**Working title:** "Auditing design systems with LLM agents: what 4-hour audits taught us about what humans actually do"

**Angle:** considered essay on LLM-agent-assisted design system audits. The 10x time savings of agent-assisted audits is the surface; the deeper insight is what the agents struggled with (judgement calls, taste decisions, organisational context) that revealed what humans actually do in audits. Essay structure; conceptual, not tutorial.

**Length:** 3,000-3,500 words.

**Why A List Apart:** ALA's audience wants conceptual + considered writing on craft. The article is "we tried to automate this and learned what couldn't be automated" — a craft-prestige framing that matches ALA's editorial voice.

## §3.4 — Pitch email template (adapted per publication)

```
Subject: Article pitch for [Publication] — [Working title]

Hi [Editor name OR "Smashing/CSS-Tricks/ALA team"],

[1 sentence personalised: reference a recent article in the publication that's adjacent to the pitch topic]

I'd like to pitch an article for [Publication]:

**Working title:** "[Title from §3.3]"

**Angle:** [2-3 sentences from §3.3 angle]

**Length:** [target length from §3.3]

**Outline (5-7 sections):**

1. [Section 1 title — 1-2 sentence summary]
2. [Section 2 title — summary]
3. [Section 3 title — summary]
4. [Section 4 title — summary]
5. [Section 5 title — summary]
6. [Section 6 title — summary]
7. [Section 7 title — summary]

**Why this for [Publication]:** [1-2 sentences tied to §3.3 "Why" rationale]

**Author background:** I'm Stephen Cheng, founder of CyberSkill (a Vietnam-based software consultancy). I've been building DSAF — Design System Audit Framework — over the last 12 months and we've used it internally across ~10 audits. DSAF launches on Show HN in 6 weeks (week of [DATE]); this article would land within the post-launch visibility window, but its value to [Publication]'s readers is the topic deep-dive, independent of the launch.

**Materials for context:**
- 5-min entry to DSAF: https://dsaf.dev/card (the one-page DSAF-25 Core subset)
- Repo: https://github.com/cyberskill-official/design-system-audit-framework
- The candid limitations blog post (separate from this pitch): https://dsaf.dev/blog/launch-2026

**Delivery:** I can deliver the first draft within 2 weeks of acceptance; flexible on publication date.

**Exclusivity:** The article is exclusively for [Publication] (first-publication rights to you). DSAF would reference the article from dsaf.dev/blog/index post-publication.

Happy to revise the pitch if a different angle or topic fits [Publication]'s editorial calendar better. No expectations either way.

Stephen
zintaen@gmail.com
github.com/cyberskill-official/design-system-audit-framework
```

(Character count: ~1,800 chars before per-publication customisation; ~2,200-2,500 chars with outline filled in.)

## §3.5 — Response handling

### Mode (i) — acceptance

- Editor approves the pitch as-is. Confirm timeline; begin drafting.
- Drafting takes 6-8 founder-hours over 2-3 weeks elapsed.
- Iterate on editor feedback (typically 1-2 rounds, ~2-4 hours per round).
- Deliver final; await publication date.
- MEMORY.md: `<Publication> accepted [Topic] for FR-LAUNCH-005; published <date>; URL: <URL>; relationship: warm; revisit for FR-CONTENT-002 P2 cross-publishing or FR-CONTENT-003 P3 co-author at <future date>.`

### Mode (ii) — revision request

- Editor asks for a different angle / topic / depth. Two sub-modes:
  - (ii.a) **Operator accepts redirect:** rewrite the pitch per editor's redirected scope; respond within 48h.
  - (ii.b) **Operator declines redirect (rare):** politely decline ("the redirected angle doesn't match what I'm best positioned to write; would love to revisit a future pitch on a different topic"); preserves relationship.
- MEMORY.md: `<Publication> redirected [original topic] → [accepted topic]; published <date>; relationship: warm; redirect pattern: <editor's preferred angle> for future reference.`

### Mode (iii) — rejection

- Editor declines the pitch (timing, fit, competing-with-recent-article, etc.).
- Politely thank for the consideration; ask if the editor would be open to a different topic in 3-6 months.
- Consider pitching the same topic to a different publication (with adjusted angle).
- MEMORY.md: `<Publication> declined [Topic] for FR-LAUNCH-005; reason: <if given>; relationship: cordial; revisit in 3-6 months with different topic.`

## §3.6 — Tracking format

```markdown
## Guest-post pitch tracking (FR-LAUNCH-005)

| Publication | Topic | Pitch date | Editor contact | Response date | Response mode | Article URL (if published) | MEMORY.md entry |
|---|---|---|---|---|---|---|---|
| Smashing Magazine | [Topic A] | 2026-MM-DD | [contact] | [date] | accepted / revised / declined | [URL] | [link] |
| CSS-Tricks | [Topic B] | 2026-MM-DD | [contact] | [date] | accepted / revised / declined | [URL] | [link] |
| A List Apart | [Topic C] | 2026-MM-DD | [contact] | [date] | accepted / revised / declined | [URL] | [link] |
```

## §3.7 — Article-drafting discipline (post-acceptance)

For each accepted article:

1. **Read the publication's contributor guidelines** — Smashing has a detailed style guide; CSS-Tricks has a more informal one; ALA has the strictest editorial review. Read before drafting.
2. **Draft the article per the publication's tone calibration** (§3.2). Resist the temptation to use DSAF's internal voice; match the publication's voice.
3. **Apply FR-BRAND-002 handle taxonomy + FR-CORE-004 cap rule + FR-BRAND-004 decoupling** consistently. No `Framework` noun-handle; no 84.6% / L5 claims; no paid-funnel CTAs.
4. **Cite dsaf.dev URLs (not audit.cyberskill.world)** as the canonical reference. The article's "About the author" footer may mention CyberSkill briefly.
5. **Iterate on editor feedback** without defensiveness. Editor knows the publication's audience better than the founder; trust the editorial judgement on tone + framing.
6. **Submit final draft** with all changes incorporated; await publication.

## §3.8 — Anti-patterns

- **Mass-blast the same pitch to all 3 publications.** Forbidden per §1 #2.
- **Re-pitch FR-DOCS-003 launch blog post topic.** Forbidden per §1 #5.
- **Promise exclusivity to multiple publications simultaneously.** Forbidden per §1 #8.
- **Include paid-funnel CTAs in the article.** Forbidden per §1 #12.
- **Use third-party SEO services.** Forbidden per §1 #15.
- **Pitch with no proof-of-existence URLs.** Forbidden — publications won't review pitches without verifying the framework exists.
- **Disregard editor feedback as "I know better."** Forbidden — preserves relationship by trusting editorial expertise.
- **Push for publication date before/at launch.** Forbidden — publications set publication dates; the founder accepts what's offered.
- **Mention the launch as the article's reason-to-exist.** Forbidden per §1 #7.
```

---

## §4 — Acceptance criteria

1. **Pitch doc committed** — `internal/launch/guest-post-pitches.md` exists with §3.1 editorial research + §3.2 tone calibration + §3.3 topic shortlist + §3.4 pitch template + §3.5 response handling + §3.6 tracking format + §3.7 drafting discipline + §3.8 anti-patterns.
2. **3 publications enumerated** — `internal/launch/guest-post-pitches.md` §3.1 table has rows for Smashing Magazine, CSS-Tricks, A List Apart.
3. **3 distinct topics in shortlist** — §3.3 has 3 sections (Topic A, Topic B, Topic C), each with a different working title and angle.
4. **None of the 3 topics duplicate FR-DOCS-003** — verified by reviewer: the 3 working titles in §3.3 are all distinct from "We built a 125-criterion design system audit framework — here's what we got wrong."
5. **Pitch template ≤ 2,500 chars (with outline filled)** — §3.4 template character count is in the 2,200-2,500 range when fully populated.
6. **Per-publication tone calibration documented** — §3.2 has 3 sections, one per publication, with tone + length notes.
7. **3 response modes documented** — §3.5 has subsections for acceptance, revision request, rejection.
8. **Each response mode has MEMORY.md update** — §3.5 modes each specify a MEMORY.md update format.
9. **Drafting discipline lists FR-BRAND-002 / FR-CORE-004 / FR-BRAND-004 compliance** — §3.7 step 3 explicitly references these FRs.
10. **No third-party SEO mention** — `grep -ciE 'paid placement|guaranteed publication|seo service' internal/launch/guest-post-pitches.md` returns 0 (except in the anti-patterns).
11. **Decoupling-disclosure framing** — `grep -q 'audit.cyberskill.world' internal/launch/guest-post-pitches.md` returns 0 OR the references are explicitly in disclosure / "About the author" context, not as CTAs.
12. **Handle taxonomy compliance** — `grep -ciE '\b(the )?DSAF Framework\b|\bDSAF framework\b' internal/launch/guest-post-pitches.md` returns 0; `grep -c '\bDSAF\b' internal/launch/guest-post-pitches.md` ≥ 8.
13. **Tracking format provides per-pitch row** — §3.6 has a markdown table with columns for Publication, Topic, Pitch date, Response, Article URL, MEMORY.md entry.
14. **8 anti-patterns enumerated** — §3.8 lists at least 8 anti-patterns covering mass-blast, re-pitch, exclusivity-conflict, paid-funnel, SEO services, no-proof, disregard-editor, push-for-pre-launch-date, launch-as-reason.
15. **PR description includes pitch timing** — PR description names the T-6-weeks-pre-launch date for the pitch submission.

---

## §5 — Verification

```bash
# AC1 — file committed with all sections
test -f internal/launch/guest-post-pitches.md
for section in '## §3.1 — Publication' '## §3.2 — Per-publication tone' '## §3.3 — Topic shortlist' '## §3.4 — Pitch email template' '## §3.5 — Response handling' '## §3.6 — Tracking format' '## §3.7 — Article-drafting discipline' '## §3.8 — Anti-patterns'; do
  grep -qF "${section}" internal/launch/guest-post-pitches.md || echo "MISSING: ${section}"
done

# AC2 — 3 publications
for pub in 'Smashing' 'CSS-Tricks' 'A List Apart'; do
  grep -qF "${pub}" internal/launch/guest-post-pitches.md || echo "MISSING: ${pub}"
done

# AC3 — 3 topic sections
grep -cE '^### Topic [ABC]' internal/launch/guest-post-pitches.md
# expected: 3

# AC4 — topics differ from launch blog post (manual check; the working titles are all different)
grep -i 'here.s what we got wrong\|origin story' internal/launch/guest-post-pitches.md | grep -v 'launch blog post'
# expected: empty (no §3.3 topic uses the launch-blog phrasing as a title)

# AC5 — pitch template character count
awk '/^### Pitch email template/,/^## §3.5/' internal/launch/guest-post-pitches.md | \
  awk '/^```$/{flag=!flag; next} flag' | tr -d '\n' | wc -c
# expected: 1500-2800 (template + outline placeholders)

# AC7 — 3 response modes
for mode in 'acceptance' 'revision request' 'rejection'; do
  grep -qiF "${mode}" internal/launch/guest-post-pitches.md || echo "MISSING mode: ${mode}"
done

# AC10 — no SEO-service mention (outside anti-patterns)
grep -niE 'paid placement|guaranteed publication|seo service' internal/launch/guest-post-pitches.md | grep -v 'Anti-patterns\|forbidden'
# expected: empty

# AC11 — no audit.cyberskill.world CTA (manual check; reviewer confirms any occurrences are disclosure not CTA)
grep -n 'audit.cyberskill.world' internal/launch/guest-post-pitches.md
# expected: empty OR each occurrence in disclosure context

# AC12 — handle taxonomy
grep -ciE '\b(the )?DSAF Framework\b|\bDSAF framework\b' internal/launch/guest-post-pitches.md  # 0
grep -c '\bDSAF\b' internal/launch/guest-post-pitches.md  # >= 8

# AC14 — 8 anti-patterns
awk '/## §3.8 — Anti-patterns/,EOF' internal/launch/guest-post-pitches.md | grep -cE '^- \*\*'
# expected: >= 8
```

Human-verified ACs (no script):

- **AC4** — reviewer reads §3.3 working titles vs FR-DOCS-003 launch blog post title; confirms no duplication.
- **AC6** — reviewer reads §3.2 for per-publication tone calibration.
- **AC8** — reviewer reads §3.5 for MEMORY.md update format per mode.
- **AC9** — reviewer reads §3.7 for FR cross-reference.
- **AC13** — reviewer reads §3.6 for tracking-table structure.
- **AC15** — reviewer reads PR description for pitch timing.

---

## §6 — Implementation skeleton

The operator playbook (4h pitching + ~6-8h per accepted article over weeks):

1. **(30m) Author `internal/launch/guest-post-pitches.md`** per §3 — all 8 sub-sections.
2. **(1h) Per-publication research.** Read 5-10 recent articles per publication. Identify tone, length, common framings. Calibrate the topic-fit per §3.2 + §3.3.
3. **(1.5h, ~T-6 weeks) Draft 3 distinct pitch emails.** Per-publication customisation per §3.4 template. Send.
4. **(15-30m per response, over 2-4 weeks elapsed) Respond to editor replies.** Per §3.5 mode handling. Log status in §3.6 tracking.
5. **(6-8h per accepted article, over 2-3 weeks elapsed) Draft + iterate + deliver.** Per §3.7 drafting discipline.
6. **(15m post-publication) Update MEMORY.md + dsaf.dev/blog/index** with published-article link.

---

## §7 — Dependencies

- **Upstream (required):**
  - **FR-DOCS-003** — launch blog post live (pitches reference it as separate-from-pitch context).
- **Coordinated:**
  - **FR-LAUNCH-001** (Show HN) — pitch timing T-6 weeks anchored to Show HN date; launch reference in pitches.
  - **FR-CORE-001** (DSAF-25 Core) — articles reference dsaf.dev/card.
  - **FR-BRAND-002** — handle taxonomy applied in articles.
  - **FR-CORE-004** — cap rule applied (no L5 claims in articles).
  - **FR-BRAND-004** — decoupling rule applied (no audit.cyberskill.world CTAs).
- **Downstream / future:**
  - **FR-CONTENT-001** (P2 weekly deep-dives) — published guest articles' topics inform deep-dive cadence.
  - **FR-CONTENT-002** (P2 cross-publishing on dev.to / Medium) — published articles get cross-posted with canonical link to publication.
  - **FR-CONTENT-003** (P3 co-author piece with Nathan Curtis or Chris Strahl) — established publication relationships open doors.
- **External:**
  - Publications' editorial contact emails (operator research).
  - Founder's writing time (6-8 hours per accepted article).

---

## §8 — Example payloads

### Example: a successful Smashing Magazine acceptance

```
T-6 weeks: Pitch sent for Topic A (methodology deep-dive on what 12 months of internal DSAF use taught us about criteria).
T-4 weeks: Editor replies: "Interesting pitch. We'd love the angle but can you focus on 3-4 specific criteria rather than 4-5? Smashing readers prefer narrow-deep over broad-medium. 2,500 words target. Publication date target: 4 weeks post-Show HN."
T-4 weeks (operator): Accept the revision; rewrite pitch outline with focus on 3 criteria.
T-3 weeks: Editor confirms; founder begins drafting.
T+0 (Show HN): launch happens.
T+2 weeks: founder delivers final draft.
T+4 weeks: Smashing publishes the article. URL: https://www.smashingmagazine.com/2026/[slug]
Outcome: ~5,000 dsaf.dev / repo referrals over first 30 days; permanent search-indexed citation; MEMORY.md updated; FR-CONTENT-002 P2 cross-publishes condensed version on dev.to with canonical link to Smashing.
```

### Example: a CSS-Tricks rejection

```
T-6 weeks: Pitch sent for Topic B (framework-explainer + DSAF-25 Core copy-paste).
T-3 weeks: Editor replies: "Thanks for the pitch. We've published 2 design-system-maturity pieces in the last 6 months and don't want to over-saturate. Would consider a pitch on a different angle in 6-9 months."
Operator: Log decline; consider pitching the topic to a backup publication (e.g., LogRocket Blog or Frontend Focus newsletter) with adjusted angle.
MEMORY.md: CSS-Tricks declined Topic B; reason: editorial calendar saturation; revisit Q3 with different topic; relationship: cordial.
```

### Example: an A List Apart redirect

```
T-6 weeks: Pitch sent for Topic C (LLM-agent-assisted audits + what humans actually do).
T-4 weeks: Editor replies: "Love the angle but the title undersells the insight. Could you reframe to focus on the *taste decisions* that LLM agents can't make — those are the most interesting bits for our audience. 3,000 words instead of 3,500."
Operator: Accept the redirect; reframe title to "What LLM agents can't audit — the taste decisions that define a design system." Draft per redirected scope.
T+1 week (post-launch): Founder delivers draft.
T+5 weeks: ALA publishes. URL: https://alistapart.com/article/[slug]
Outcome: ALA's craft-prestige audience drives high-quality referrals; relationship deepened; FR-CONTENT-003 P3 ALA co-author piece becomes plausible.
```

---

## §9 — Open questions

All resolved at authoring time:

- **Q1: 3 publications or fewer / more?** Resolved → 3 (plan §Phase 1 action 5 specifies). Fewer cedes channels; more exceeds founder writing bandwidth.
- **Q2: Pitch all 3 at the same time or sequence?** Resolved → all 3 at T-6 weeks simultaneously. Sequencing wastes elapsed time; simultaneous pitches let each publication consider independently.
- **Q3: Same article cross-published?** Resolved → no per §1 #2, #5. Different articles, distinct topics, exclusive to each publication.
- **Q4: What if all 3 reject?** Resolved → acceptable failure mode; the launch can survive without guest articles. Operator MAY pitch backup publications (LogRocket, Frontend Focus, Smashing's "Smashing Newsletter"); MAY revisit each publication 3-6 months later with different topics.
- **Q5: What if a publication's editorial contact has changed since the operator's last touch?** Resolved → §3.1 acknowledges submission URLs change; operator verifies at pitch time. Editors rotate; the discipline is "verify before pitching."
- **Q6: Compensation for guest articles?** Resolved → most publications don't pay for design-systems guest articles (Smashing occasionally does for invited longer-form; ALA pays modest rates; CSS-Tricks varies). The pitches don't request compensation; if offered, accept; if not, the byline + audience access is the value.
- **Q7: Should the operator pitch a "DSAF launch announcement" angle to amplify Show HN?** Resolved → no. Publications don't accept launch-announcement pitches; the launch blog post on dsaf.dev is the launch surface. Guest articles are deep-dives, distinct from the launch.

---

## §10 — Failure modes inventory

| Failure | Detection | Outcome | Recovery |
|---|---|---|---|
| All 3 publications reject pitches | tracking | No guest articles in launch window | Acceptable; launch survives. Pitch backup publications OR revisit each at 3-6 months with different topics. Document patterns in MEMORY.md |
| Editor rejects pitch for "low original value" | reply | Pitch framing was wrong | Read 5+ more recent articles from the publication; reframe pitch to fit the publication's editorial voice more precisely |
| Publication accepts but publication date is > 4 weeks post-launch | calendar mismatch | Article publishes outside the 2-week post-launch visibility tail | Acceptable; the article still generates referrals over its first 30 days. The "within 2 weeks of launch" target is best-effort, not absolute |
| Editor requests substantial rewrite (Mode ii.a) | reply | Operator's 6-8h budget per article exceeds | Acceptable scope expansion; the editor's redirect typically reflects publication-side knowledge of audience |
| Founder's draft fails editor's voice calibration | revision request after draft | Iteration | Trust editor; revise per their notes; preserve relationship for future pitches |
| Article published with a typo or factual error | post-publication | Embarrassment | Most publications support post-publication corrections; engage editor politely + provide correction; thank for accommodation |
| Founder forgets to apply FR-BRAND-002 handle taxonomy in draft | editor feedback or reviewer post-publication | Inconsistency with dsaf.dev surfaces | Editor's edit-pass typically catches inconsistencies; if not, post-publication request a small fix (typically supported) |
| Guest article includes a paid-funnel CTA accidentally | editor catches at review | Editor declines OR removes the CTA | The §3.7 drafting discipline prevents at draft-time; editor's review is a second gate; if it lands, accept the editor's removal |
| Article cited dsaf.dev/blog/launch-2026 verbatim (re-publishing the launch post) | similarity detector | Editor would reject | The §3.7 discipline + §1 #5 prevents; the operator's brain double-checks at draft submission |
| Founder over-promises delivery date | scheduling slippage | Editor frustrated | Set realistic delivery dates ("within 2 weeks of acceptance, flexible"); if slipping, communicate proactively 1 week before deadline |
| Publication's "Contributor guidelines" change between pitch and draft | tracking | Mismatch | Re-read guidelines before final draft submission; if guidelines materially changed, ask editor for clarification |
| Publication changes ownership / editorial mid-cycle | external event | Acceptance might lapse | Stay in touch with new editorial contact; preserve the relationship across transitions |

---

## §11 — Implementation notes

- **The 4-hour budget is mostly research + pitch drafting.** Per-publication research (~20-30 min per publication for tone calibration); per-pitch drafting (~30 min per pitch with customisation). Editor response handling is mostly elapsed time, not founder time. The 6-8 hours per article is post-acceptance writing, separate from the 4h pitch budget.
- **About the post-acceptance writing budget:** 6-8 hours per article is realistic for a 2,500-3,500 word article. ~1h for outline expansion → ~3h for first draft → ~1-2h for editor revisions → ~1h for final polish. The operator who's already written FR-DOCS-003 launch blog post has the muscle for this.
- **About the "1 article landed within 2 weeks of launch" target:** the target is best-effort. Publications' editorial calendars are their own; some accept pitches for "publication date TBD within 60 days" without firm commitments. The launch survives without the guest article landing in the 2-week window; the article still drives referrals over its first 90 days.
- **The §3.3 working titles are operator-discretion.** The titles are illustrative; the operator may adjust per publication-fit + editor feedback. The discipline is "3 distinct topics covering different angles of DSAF" rather than specific title fidelity.
- **About per-publication audience research:** the 20-30 min per publication of recent-article reading is the differentiator between a generic pitch and a publication-tuned pitch. The publications publish ~1-3 articles per week; reading 5-10 recent ones is ~3-5 weeks of recent content. Worth the investment.
- **About the §3.4 pitch template's launch-mention positioning:** the launch context is in the "Author background" paragraph, NOT in the "Why this for [Publication]" paragraph. The discipline is "value-to-readers first; launch as contextual disclosure." If a publication's editor pushes back on the launch mention, the operator can remove it from the pitch (the article is still valuable post-launch).
- **Compensation expectations:** most design-systems guest articles are unpaid (the publication's audience reach is the compensation). Smashing's longer-form invited pieces sometimes pay $500-$1,500; ALA's pieces pay $200-$500; CSS-Tricks varies. The pitches don't ask; if offered, accept and disclose per FTC guidelines if material to launch.
- **The relationship is the compounding asset.** Each published article opens doors for future pitches (FR-CONTENT-002 cross-publishing requires established author-publication relationships; FR-CONTENT-003 P3 co-author piece often emerges from existing publication contacts). The 4-hour pitch + 6-8h per article is the initial investment in a multi-year relationship surface.

---

*End of FR-LAUNCH-005.*
