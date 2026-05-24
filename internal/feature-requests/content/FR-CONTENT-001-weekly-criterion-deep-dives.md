---
id: FR-CONTENT-001
title: "Weekly criterion deep-dive cadence on dsaf.dev — one criterion, one example, one anti-pattern, per week"
module: CONTENT
priority: MUST
status: done
verify: I
phase: P2
milestone: P2 · slice 1 · Community velocity
slice: 1
owner: Stephen Cheng (Founder) + future co-maintainer (post-FR-GOV-002)
created: 2026-05-17
shipped: 2026-05-18
related_frs: [FR-BRAND-001, FR-CORE-001, FR-CORE-003, FR-DOCS-003, FR-LAUNCH-001, FR-LAUNCH-002, FR-LAUNCH-006, FR-CONTENT-002, FR-GOV-002]
depends_on: [FR-CORE-001, FR-DOCS-003]
blocks: [FR-CONTENT-002, FR-LAUNCH-006]
source_pages:
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Phase 2 — Community velocity action 1 — 'Publish weekly criterion deep-dives (one criterion, one example, one anti-pattern) on dsaf.dev')"
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§What NOT to do item 5 — quality of placement compounds; quantity on Medium does not)"
source_decisions:
  - "DEC-053: cadence is weekly (every Tue), 12-week initial commitment (post-launch Months 3-6); not lifetime"
  - "DEC-054: each post follows fixed structure — criterion + example + anti-pattern + how-to-self-score (the 'CEA' format)"
  - "DEC-055: topic prioritisation comes from the FR-LAUNCH-001/002/003 tracking-file patterns (the most-asked critic concerns become the first deep-dives)"
  - "DEC-056: each post is ~1,200-1,800 words — readable in 6-8 minutes; long enough for depth, short enough for weekly cadence"
language: markdown
service: doctrine
new_files:
  - dsaf.dev/blog/deep-dives/_template.md   # the CEA-format template
  - dsaf.dev/blog/deep-dives/index.md       # listing all weekly deep-dives
  - internal/content/deep-dive-schedule.md      # 12-week initial schedule + topic backlog
modified_files:
  - dsaf.dev/blog/index.md   # parent blog index now lists deep-dives section
allowed_tools:
  - "file_read/write dsaf.dev/**, internal/content/**"
  - "static-site-generator config (markdown-to-HTML rendering, frontmatter handling)"
disallowed_tools:
  - "ship a deep-dive without the CEA structure (criterion + example + anti-pattern) — the format is the discipline"
  - "skip a week without logging a 'no post this week' entry in the schedule (skipping silently degrades the cadence signal)"
  - "publish a deep-dive on a criterion that doesn't exist in DSAF-125 (per FR-CORE-001 verbatim-quote rule)"
  - "merge multiple criteria into a single deep-dive (1 criterion per post; multi-criterion posts dilute the discipline)"
  - "publish under a different author than the founder + future co-maintainer (per FR-GOV-002 — non-CyberSkill contributor posts route via PR, not direct publishing)"
effort_hours: 6
sub_tasks:
  - "1. (1h) Author dsaf.dev/blog/deep-dives/_template.md per §3 — the CEA-format template (criterion + example + anti-pattern + how-to-self-score)"
  - "2. (1h) Author internal/content/deep-dive-schedule.md per §3 — 12-week initial schedule with criterion + priority rationale per week"
  - "3. (30m) Author dsaf.dev/blog/deep-dives/index.md per §3 — listing all weekly deep-dives chronologically"
  - "4. (15m) Patch dsaf.dev/blog/index.md to list the deep-dives section"
  - "5. (per-week ~1.5-2h founder-time) Write each weekly deep-dive per the template; publish every Tuesday 08:00 PT (matching the Show HN cadence rhythm)"
  - "6. (per-week 15m) Update schedule + index with the new post; trigger FR-CONTENT-002 cross-publishing pipeline"
  - "7. (every 4 weeks) Review schedule against latest tracking-file patterns from FR-LAUNCH tracking + post-launch Q&A; re-prioritise upcoming deep-dives"
  - "8. (week 12 retrospective, 1h) Decide whether to renew the cadence for another 12 weeks OR transition to bi-weekly OR move to a different content model"
risk_if_skipped: "The plan §Phase 2 action 1 names this as the first P2 content action. Weekly criterion deep-dives are the operational mechanism that converts launch-week buzz into sustained community-velocity traction. Skipping this FR means dsaf.dev/blog/ has the FR-DOCS-003 launch post + nothing else; post-launch readers visiting dsaf.dev see a static surface. The plan §'What NOT to do' item 5 ('write 5 excellent ones, pitch to Smashing/CSS-Tricks/ALA') is the *external* publication strategy; FR-CONTENT-001 is the *internal* dsaf.dev cadence — they're complementary. Without the weekly cadence, dsaf.dev doesn't earn return visits and the framework's content trajectory plateaus at launch. The cost is operationally significant (~1.5-2h per week for 12 weeks = ~20-24h founder-time over 3 months); the value is the search-indexed citation surface + the conversion from one-time-launch-visitor to repeat-visitor that feeds the P2 'first cited mention in zeroheight or Sparkbox annual report' target."
---

## §1 — Description (BCP-14 normative)

The framework MUST publish weekly criterion deep-dives on dsaf.dev for a 12-week initial commitment (P2, Months 3-6). Each deep-dive follows the fixed **CEA format** (Criterion + Example + Anti-pattern) per §3 template + a "How to self-score" section. The cadence is weekly (every Tuesday 08:00 PT, matching the Show HN posting rhythm). Topic prioritisation comes from the launch tracking-file patterns (the most-asked critic concerns become the first deep-dives).

**2026-05-18 implementation note:** the cadence is repo-shipped for the canonical host `audit.cyberskill.world`: `internal/content/deep-dive-schedule.md` has a dated 12-week Tuesday schedule, `internal/content/deep-dives/_template.md` defines the CEA structure, `internal/content/deep-dives/week-01-a1-1-color-tokens.md` is a 1,391-word publishable Week 1 article, and `landing/blog/deep-dives/` now renders a public index plus the Week 1 post.

1. **MUST** publish one deep-dive per week for 12 weeks (Weeks 11-22 of the project — i.e., the first 12 weeks of P2 starting from launch week +4). Each deep-dive lives at `dsaf.dev/blog/deep-dives/<YYYY-MM-DD>-<criterion-id>-<slug>.md` (e.g., `dsaf.dev/blog/deep-dives/2026-09-08-a1-1-color-tokens-three-tier-architecture.md`).
2. **MUST** follow the **CEA format** per §3 template — each post has: (a) frontmatter (title, date, canonical, criterion ID, OG meta); (b) Criterion section — verbatim quote of the criterion from `framework/03-criteria-part-a.md` or `framework/04-criteria-part-b.md` per FR-CORE-001 verbatim-quote rule; (c) Example section — a real-world example of a system that scores high on this criterion, with screenshot + per-anchor (0/3/5) explanation; (d) Anti-pattern section — a real-world example (anonymised where needed) of a system that scores low + the gotchas to avoid; (e) How to self-score section — the 3-question self-assessment checklist tied to the criterion's 0-3-5 anchors; (f) Cross-references — links to adjacent criteria + dsaf.dev/card + the relevant docs/ section.
3. **MUST** select topics from the FR-LAUNCH tracking-file patterns. The 12-week schedule in `internal/content/deep-dive-schedule.md` (§3) lists the criterion ID per week + the rationale for prioritisation (which tracking-file pattern, how many critics raised it). Topics with cross-platform support (raised on HN AND cross-posts AND PH) get priority over single-platform topics. If launch tracking-file patterns don't surface 12 weeks of distinct topics, fall back to the highest-weight DSAF-125 criteria first (A.1.1 Color tokens, A.2.1 Top-20 components, A.8.6 Color contrast, B.5.1 WCAG 2.2 AA, etc.).
4. **MUST** publish each deep-dive every Tuesday at 08:00 PT (matching Show HN posting rhythm). Tuesday-morning publication catches the work-week reader; the timing is the operational anchor. If a week's publication slips by > 24 hours, the slip is logged in `internal/content/deep-dive-schedule.md` per the no-silent-cadence-degradation discipline (§1 #11).
5. **MUST** apply the FR-BRAND-002 handle taxonomy. `DSAF` short handle in 90%+ of body mentions; `Design System Audit Framework` long name exactly once at first mention; no `Framework` noun-handle; `DSAF Criteria` / `DSAF Levels` / `DSAF Modes` / `DSAF-25 Core` as component handles.
6. **MUST** apply the FR-CORE-004 self-audit cap rule. Deep-dive examples may reference CyberSkill's worked example only as "complete worked L3 self-audit example" — never as 84.6% / L5 / industry-leading claim.
7. **MUST NOT** include paid-funnel CTAs ("Talk to a certified auditor", "Contact CyberSkill", "Schedule a demo"). Per FR-BRAND-001 + FR-BRAND-004 + FR-DOCS-001 + plan §"What NOT to do" item 1, the dsaf.dev surface is canonical content; the funnel lives elsewhere.
8. **MUST** include OG meta + Twitter Card meta per FR-DOCS-003 §1 #9 conventions. OG image is auto-generated from the criterion (a hand-rendered radar with the specific criterion's axis highlighted, OR a stylised "Criterion X.Y" card). Twitter Card type is `summary_large_image`.
9. **MUST** set `<link rel="canonical">` to the dsaf.dev URL. FR-CONTENT-002 cross-publishing to dev.to / Medium / LinkedIn preserves the canonical at dsaf.dev (per the same rule in FR-DOCS-003 §1 #10).
10. **MUST** maintain `dsaf.dev/blog/deep-dives/index.md` as the chronological listing of all weekly deep-dives. Each new post adds a row; the index is updated in the same PR as the post.
11. **MUST** log skipped weeks in `internal/content/deep-dive-schedule.md` with reason. Silent skips degrade the cadence signal; explicit "no post this week (reason)" entries preserve transparency. Acceptable skip reasons: founder-illness, framework-crisis (launch-week fire), or rare scheduled events (conference-week). > 2 skips in any 12-week window triggers the §10 failure-mode "cadence breakdown" path.
12. **MUST** include a ChangeLog footer on each deep-dive matching FR-DOCS-003 §1 #8 pattern. Substantive post-publication updates (criterion ID changes per FR-CORE-003 dedup, anti-pattern correction per reader feedback) are logged; typo fixes are silent.
13. **MUST** include a "Discussion" cross-link to the FR-CONTENT-002 cross-posts' threads (dev.to thread + LinkedIn post + Medium response thread). The cross-link is added post-cross-publication (typically T+24-72 hours after dsaf.dev publication).
14. **MUST NOT** publish a deep-dive on a criterion that doesn't exist in DSAF-125 (the current rubric). Per FR-CORE-001's verbatim-quote rule: if a deep-dive's intended criterion is a *proposed* addition (RFC pending per FR-GOV-003 P6), the deep-dive ships only after the criterion lands in `framework/03-criteria-part-a.md` or `framework/04-criteria-part-b.md`. Pre-RFC deep-dives are RFC drafts, not weekly cadence posts.
15. **MUST** include CODEOWNERS gate (or equivalent governance) on `dsaf.dev/blog/deep-dives/`. Per FR-BRAND-004 + FR-GOV-002, the founder + future co-maintainer review each deep-dive PR before publication; external contributors submit via PR with editorial review.

---

## §2 — Why this design

**Why weekly + 12-week initial commitment (§1 #1, week 12 retrospective):** weekly is the cadence that earns return visits to dsaf.dev without exhausting the founder. 12 weeks is the initial commitment because (a) it gives ~3 months of data to evaluate whether the cadence converts community interest into measurable signal (PR contributions, podcast-appearance bookings, citation mentions), (b) it provides 12 distinct posts which is enough for a "deep-dive section" of meaningful depth, (c) it lets the founder transition to a different cadence (bi-weekly, monthly, or other) at the retrospective rather than locking in lifetime. Plan §"What NOT to do" item 5 ("quality of placement compounds; quantity on Medium does not") cuts both ways — quality requires effort per post, so a sustainable cadence is essential.

**Why CEA format (Criterion + Example + Anti-pattern) (§1 #2):** the format is the discipline that turns ad-hoc commentary into a repeatable artefact. Each deep-dive teaches the criterion (what it measures), shows the example (what it looks like in practice), and surfaces the anti-pattern (what to avoid). This three-element structure is what makes deep-dives useful to readers running their own audits — not just commentary, actionable rubric application. The plan §"Phase 2 — Community velocity" action 1 specifies the format verbatim ("one criterion, one example, one anti-pattern").

**Why "How to self-score" section beyond CEA (§1 #2):** the CEA gives understanding; the self-score checklist gives action. A reader who finishes the deep-dive and asks "OK, how do I score myself on this criterion?" should find the answer in the same post — not in a separate "tools" file. The 3-question self-assessment maps to the 0-3-5 rubric anchors; takes ~2 minutes to apply.

**Why topic prioritisation from launch tracking-file patterns (§1 #3):** the launch (FR-LAUNCH-001/002/003) produces a tracking-file of critic concerns. These concerns are the *exact* topics where DSAF's documentation didn't pre-emptively answer; the deep-dives close those gaps. Topics raised across multiple platforms (HN AND cross-posts AND PH) are highest-priority — they're the framework's most-asked questions, the topics where most reader-conversion gain is available. The fallback (highest-weight DSAF-125 criteria) ensures the schedule fills even if tracking-file patterns are sparse.

**Why Tuesday 08:00 PT publication (§1 #4):** matches the FR-LAUNCH-001 Show HN cadence rhythm. Readers who saw DSAF launch on Show HN at Tue 08:00 PT and bookmarked dsaf.dev get a consistent return-trigger (every Tue morning, new content). The timing also catches work-week traffic; weekend publications miss the audience.

**Why CODEOWNERS gate on deep-dives folder (§1 #15):** dsaf.dev is the framework's canonical content surface. Quality discipline matters; per FR-BRAND-001 + FR-BRAND-004, external contributors submit via PR with editorial review. The CODEOWNERS gate makes the editorial review explicit; without it, the surface drifts as contributors land posts without coordinated review.

**Why no paid-funnel CTAs (§1 #7):** dsaf.dev is sacred (FR-BRAND-001 §1 #11). Plan §"What NOT to do" item 1. The deep-dives have their value in substance; lead-gen surfaces (audit.cyberskill.world) are separate per FR-BRAND-004 decoupling.

**Why ChangeLog forward-only edits (§1 #12):** matches FR-DOCS-003 §1 #15 + §1 #15 (this FR's §1 #14 + #15). The post is a historical artefact at its publication date; substantive content shifts get a new post that cites this one. Silent rewriting damages reader trust (citations pointing at the URL now show different content).

**Why "Discussion" cross-link to FR-CONTENT-002 platforms (§1 #13):** readers who want to discuss the deep-dive should find the discussion threads easily. dev.to threads, LinkedIn posts, Medium response threads are the discussion surfaces; the cross-link from dsaf.dev surfaces them. Without the cross-link, the discussion happens but readers can't find it.

**Why log skipped weeks (§1 #11):** the cadence is the signal. Silent skips look like the project is dying; explicit "no post this week (founder at conference)" entries preserve the signal that the cadence is maintained intentionally. Plan §"What NOT to do" item 5 ("quality of placement compounds") applies — quality includes the *commitment to cadence*, not just per-post quality.

---

## §3 — Doctrine contract

### `dsaf.dev/blog/deep-dives/_template.md` — the CEA-format template

```markdown
---
title: "[Criterion ID]: [Brief criterion description] — DSAF deep-dive [N]"
slug: <YYYY-MM-DD>-<criterion-id>-<slug>
date: <YYYY-MM-DD>
author: Stephen Cheng (Founder, CyberSkill)
criterion_id: <e.g., A.1.1>
criterion_part: <A or B>
criterion_category: <e.g., A.1 Foundations & Tokens>
canonical: https://dsaf.dev/blog/deep-dives/<slug>
og_image: https://dsaf.dev/assets/og/deep-dive-<criterion-id>-1200x630.png
og_type: article
twitter_card: summary_large_image
tags: [design-systems, dsaf-deep-dive, <criterion-category-tag>]
---

## The criterion

> **[Criterion ID] — [Verbatim criterion name from framework/03-criteria-part-a.md or framework/04-criteria-part-b.md]**
>
> [Verbatim 0-3-5 rubric anchors:]
>
> - **0:** [Verbatim 0-anchor text]
> - **3:** [Verbatim 3-anchor text]
> - **5:** [Verbatim 5-anchor text]
>
> Tag: [FIXED / DYNAMIC]
> Weight in DSAF-125: [percentage from criterion category]

[1-2 paragraph framing: why this criterion matters; what reading-DSAF readers should care about.]

## Example: [Real-world system scoring high on this criterion]

[Image: screenshot of the system showing the criterion in practice. Annotated where helpful.]

[300-500 words walking the reader through how the example earns its score:]

- **Why this scores at 5 (or 4):** [the specific evidence — token files, component variants, audit logs — that supports the high score]
- **Why this isn't a 6 (the ceiling):** [what would have to change to be even better — usually not achievable in current state]

The example is [system name OR "anonymised real system from CyberSkill's internal audits"]. [Optional: cite the example's blog post / talk / public artefact.]

## Anti-pattern: [Common low-scoring pattern]

[300-400 words on what teams commonly get wrong on this criterion:]

- **The trap:** [the seductive-but-wrong approach — what teams *think* they're solving but aren't]
- **Why it scores at 1 or 2:** [the specific gap — what's missing that would lift the score]
- **The bridge to fix:** [the 1-2 concrete moves a team makes to get from anti-pattern to a 3-or-better score]

The anti-pattern is anonymised; [name if a public system is OK to cite; otherwise "from multiple CyberSkill internal audits"].

## How to self-score on [Criterion ID] in 2 minutes

Ask yourself three questions:

1. **[Question 1 tied to the 0-anchor: does the system have any evidence of addressing this?]** If no → score 0. If yes → continue.
2. **[Question 2 tied to the 3-anchor: is the criterion built and shipped, not just defined?]** If no → score 1 or 2. If yes → continue.
3. **[Question 3 tied to the 5-anchor: is the criterion measured/validated/industry-leading?]** If no → score 3 or 4. If yes → score 5.

Adjust ±1 based on per-anchor specifics. Map your score to the [DSAF-25 Core card](https://dsaf.dev/card) if you're tracking the Core subset.

## Cross-references

- **Adjacent criteria:** [list 2-3 related criteria with one-line context — e.g., "A.1.3 Spacing scale (related Foundations criterion)"]
- **DSAF-25 Core:** [if this criterion is in the DSAF-25 Core subset, note + link]
- **Audit-report template section:** [link to the relevant `templates/audit-report-template.md` section where this criterion lives]
- **Worked example:** [link to the CyberSkill `examples/cyberskill-design-system/improvement-plan.md` section that scored this criterion]

## Discussion

This deep-dive has discussion threads on:

- [dev.to thread](./LINK-added-post-FR-CONTENT-002)
- [Medium response thread](./LINK-added-post-FR-CONTENT-002)
- [LinkedIn long-form post](./LINK-added-post-FR-CONTENT-002)

Reach out via [hello@dsaf.dev](mailto:hello@dsaf.dev) or open an issue on [GitHub](https://github.com/cyberskill-official/design-system-audit-framework/issues).

## ChangeLog

| Date | Change |
|---|---|
| <YYYY-MM-DD> | Initial publication |
| (added rows for substantive post-publication edits per FR-CONTENT-001 §1 #12) |
```

### `internal/content/deep-dive-schedule.md` — 12-week initial schedule + topic backlog

```markdown
---
title: "DSAF deep-dive schedule (initial 12-week cadence — P2 commitment)"
ratified_by: FR-CONTENT-001 (2026-05-17)
cadence: weekly, every Tuesday 08:00 PT
review_at: Week 12 retrospective
---

# DSAF deep-dive schedule

## 12-week initial schedule

Topic prioritisation comes from FR-LAUNCH-001/002/003 tracking-file patterns. Topics raised on ≥ 3 of the 6 launch platforms are highest-priority. Where launch-tracking didn't surface a topic, fallback to highest-weight DSAF-125 criteria.

| Week | Date (Tue) | Criterion ID | Brief | Priority rationale | Status |
|---|---|---|---|---|---|
| W1 | <date> | [from tracking-file: most-asked critic concern] | [e.g., "Color tokens (A.1.1) — the three-tier architecture and why semantic-only isn't enough"] | Raised on HN + Reddit + Lobste.rs; ~10 separate critic mentions | planned |
| W2 | <date+7> | [from tracking-file: 2nd most-asked] | | | planned |
| W3 | <date+14> | [from tracking-file: 3rd] | | | planned |
| W4 | <date+21> | [from tracking-file: 4th] | | | planned |
| W5 | <date+28> | [fallback to high-weight DSAF-125 if tracking-file exhausted] | A.2.1 Top-20 components | high-weight A.2 category (13%); foundational to most audits | planned |
| W6 | <date+35> | [fallback] | A.4.3 Semver discipline | governance criterion that most teams underrate | planned |
| W7 | <date+42> | [fallback] | A.8.6 Color contrast (WCAG 2.x vs APCA Lc 60) | DYNAMIC criterion; the WCAG 3.0 transition is live news | planned |
| W8 | <date+49> | [fallback] | B.5.1 WCAG 2.2 AA in production | A.7 + B.5 are the enterprise-grade gates | planned |
| W9 | <date+56> | [fallback] | A.9.1 MCP server / agent integration | DSAF's headline differentiator | planned |
| W10 | <date+63> | [fallback] | A.5.1 Figma library + Code Connect | tooling criterion with low-self-score-but-high-value | planned |
| W11 | <date+70> | [fallback] | B.7.1 Adoption telemetry | measurement criterion teams skip | planned |
| W12 | <date+77> | [fallback OR review-derived topic] | [topic that emerged from W1-W11 reader feedback] | re-prioritised per reader engagement | planned |

## Topic backlog (post-W12 candidates)

These topics are queued for the next 12-week cadence (W13+) if the cadence is renewed at the Week 12 retrospective. Order is per current priority; re-evaluate every 4 weeks against latest tracking-file patterns.

| # | Criterion ID | Topic | Source |
|---|---|---|---|
| 1 | A.1.3 | Spacing scale (4/8 px geometric) | fallback high-weight |
| 2 | A.1.8 | DTCG conformance | DYNAMIC; standard evolving |
| 3 | A.2.4 | Variant & state coverage (loading state in particular) | tracking-file pattern |
| 4 | A.3.4 | Accessibility notes per component | tracking-file pattern |
| 5 | A.4.2 | RFC process | governance pattern |
| 6 | A.5.4 | Storybook + a11y/viewport/theme toggles | tracking-file pattern |
| 7 | A.6.1 | Light/dark + density variants | cross-platform criterion |
| 8 | A.10.1 | [tbd post-FR-CORE-003 dedup ID stabilisation] | foundational A.10 |
| 9 | B.1.1 | Research signals | UX-side criterion under-covered |
| 10 | B.2.1 | Information architecture | structural criterion |
| 11 | B.3.1 | Interaction patterns (focus order, escape, modal stacking) | tracking-file pattern |
| 12 | B.4.1 | Content & voice style guide | content-design criterion |

## Skipped-week log

| Week | Date | Reason for skip | Recovery plan |
|---|---|---|---|
| (populated as needed per FR-CONTENT-001 §1 #11; > 2 skips in 12-week window triggers §10 cadence-breakdown path) |

## Schedule review

Every 4 weeks, the operator re-evaluates the upcoming schedule against:

1. Latest tracking-file patterns from FR-LAUNCH + post-publication reader engagement
2. Topics that have emerged from reader Q&A on prior deep-dives (FR-CONTENT-002 cross-platform discussion threads)
3. Topics that are time-sensitive (e.g., a WCAG 3.0 ratification triggers an immediate A.8.6 deep-dive)

Adjustments are made by inserting/removing rows in the 12-week schedule above; the schedule MUST stay at 12 forward-looking weeks (consume from front; refill from backlog).

## Week 12 retrospective decision

At W12 (Week 22 of project; Month 6 of P2):

- Evaluate metrics: total reader engagement (page views, dev.to comments, LinkedIn engagement), PR contributions triggered, mentions in podcasts/blogs/conferences traceable to deep-dives.
- Decide: renew weekly for 12 more weeks (W13-W24) OR transition to bi-weekly OR transition to monthly OR move to a different content model (longer-form essays, video tutorials).
- Document decision in `internal/content/deep-dive-schedule.md` updated section + MEMORY.md per cadence-state continuity.
```

### `dsaf.dev/blog/deep-dives/index.md` — chronological listing

```markdown
---
title: "DSAF — Weekly criterion deep-dives"
slug: deep-dives
canonical: https://dsaf.dev/blog/deep-dives
---

# DSAF — Weekly criterion deep-dives

A weekly series exploring DSAF Criteria one at a time. Each deep-dive follows the **CEA format**: Criterion (verbatim from the rubric) + Example (real system scoring high) + Anti-pattern (common low-scoring pattern) + How-to-self-score (3-question checklist).

Cadence: every Tuesday 08:00 PT. Initial commitment: 12 weeks (P2, Months 3-6). Retrospective at Week 12.

| Week | Date | Criterion | Title |
|---|---|---|---|
| W1 | <date> | [A.1.1] | [Color tokens — three-tier architecture](./<slug>) |
| W2 | <date> | [next] | [title](./<slug>) |
| ... | | | |

Subscribe via [RSS](../rss.xml) for notifications when new deep-dives publish.

Topic suggestions / feedback: [hello@dsaf.dev](mailto:hello@dsaf.dev) or [GitHub issues](https://github.com/cyberskill-official/design-system-audit-framework/issues).
```

### `dsaf.dev/blog/index.md` — patch to add deep-dives section

Existing FR-DOCS-003 blog index lists the launch post. Add a deep-dives section:

```markdown
# Writing about DSAF

## Launch + occasional posts

| Date | Title |
|---|---|
| 2026-MM-DD | [We built a 125-criterion design system audit framework — here's what we got wrong](./launch-2026) |

## Weekly criterion deep-dives (P2 — Months 3-6)

Started <date>. Every Tuesday 08:00 PT. See [deep-dives index](./deep-dives) for the full list.

[Latest 3 deep-dives auto-listed here as posts publish]

## Subscribe

[RSS](./rss.xml) for cadence; [hello@dsaf.dev](mailto:hello@dsaf.dev) for topic suggestions.
```

---

## §4 — Acceptance criteria

1. **Template committed** — `dsaf.dev/blog/deep-dives/_template.md` exists with frontmatter + CEA sections + How-to-self-score + Cross-references + Discussion + ChangeLog per §3.
2. **Schedule committed** — `internal/content/deep-dive-schedule.md` exists with 12-week initial schedule + topic backlog + skipped-week log + 4-weekly review process + Week-12 retrospective decision section.
3. **Index committed** — `dsaf.dev/blog/deep-dives/index.md` exists; lists all published deep-dives chronologically; updated in the same PR as each new post.
4. **Blog index patched** — `dsaf.dev/blog/index.md` has a "Weekly criterion deep-dives" section linking to the deep-dives index.
5. **CEA format enforced in template** — `_template.md` has sections `## The criterion`, `## Example:`, `## Anti-pattern:`, `## How to self-score`, in that order.
6. **Verbatim-quote rule in template** — `_template.md` "## The criterion" section uses the `> **[Criterion ID] — [Verbatim criterion name]**` block-quote format with verbatim 0/3/5 anchors.
7. **OG meta + canonical in template** — `_template.md` frontmatter includes `canonical`, `og_image`, `og_type`, `twitter_card` fields.
8. **12 weeks scheduled** — `internal/content/deep-dive-schedule.md` 12-week schedule has 12 rows (W1-W12) with criterion ID + brief + priority rationale per row (placeholders OK pre-launch; filled at week-1 publication time).
9. **Topic backlog ≥ 12 entries** — `internal/content/deep-dive-schedule.md` topic backlog has ≥ 12 rows for post-W12 candidates.
10. **Skipped-week log structure present** — schedule has a "Skipped-week log" table with columns for Week, Date, Reason, Recovery plan.
11. **4-weekly review process documented** — schedule has a "Schedule review" section describing the 4-week re-prioritisation cadence.
12. **Week 12 retrospective documented** — schedule has a "Week 12 retrospective decision" section listing evaluation metrics + decision options.
13. **Handle taxonomy compliance** — `grep -ciE '\b(the )?DSAF Framework\b|\bDSAF framework\b' dsaf.dev/blog/deep-dives/_template.md internal/content/deep-dive-schedule.md` returns 0; `grep -c '\bDSAF\b' dsaf.dev/blog/deep-dives/_template.md` ≥ 4.
14. **No 84.6 / L5 marketing** — `grep -ciE '84\.6|industry[- ]?leading|top tier|L5 Optimised' dsaf.dev/blog/deep-dives/_template.md internal/content/deep-dive-schedule.md` returns 0.
15. **No paid CTAs** — `grep -ciE 'Talk to a certified|Contact (us|sales|CyberSkill)|Schedule (a|your) demo|Book (a|your) call' dsaf.dev/blog/deep-dives/_template.md` returns 0.
16. **PR description includes Week-1 publication date** — PR description names the planned W1 Tuesday-08:00-PT publication date.

---

## §5 — Verification

```bash
# AC1 — template committed
test -f dsaf.dev/blog/deep-dives/_template.md
for section in '## The criterion' '## Example:' '## Anti-pattern:' '## How to self-score' '## Cross-references' '## Discussion' '## ChangeLog'; do
  grep -qF "${section}" dsaf.dev/blog/deep-dives/_template.md || echo "MISSING: ${section}"
done

# AC2 — schedule committed
test -f internal/content/deep-dive-schedule.md
for section in '## 12-week initial schedule' '## Topic backlog' '## Skipped-week log' '## Schedule review' '## Week 12 retrospective decision'; do
  grep -qF "${section}" internal/content/deep-dive-schedule.md || echo "MISSING: ${section}"
done

# AC3 — index committed
test -f dsaf.dev/blog/deep-dives/index.md
grep -q '## Weekly criterion deep-dives\|deep-dive' dsaf.dev/blog/deep-dives/index.md

# AC4 — blog index patched
grep -q 'deep-dives' dsaf.dev/blog/index.md

# AC6 — verbatim-quote format
grep -E '^> \*\*\[Criterion ID\]' dsaf.dev/blog/deep-dives/_template.md
# (template uses placeholders; real posts replace with verbatim text)

# AC7 — OG meta in template
grep -q '^canonical:' dsaf.dev/blog/deep-dives/_template.md
grep -q '^og_image:' dsaf.dev/blog/deep-dives/_template.md
grep -q '^twitter_card:' dsaf.dev/blog/deep-dives/_template.md

# AC8 — 12 weeks scheduled
awk '/## 12-week initial schedule/,/## Topic backlog/' internal/content/deep-dive-schedule.md | \
  grep -cE '^\| W[0-9]+'
# expected: 12

# AC9 — topic backlog ≥ 12
awk '/## Topic backlog/,/## Skipped-week log/' internal/content/deep-dive-schedule.md | \
  grep -cE '^\| [0-9]+'
# expected: >= 12

# AC13 — handle taxonomy
grep -ciE '\b(the )?DSAF Framework\b|\bDSAF framework\b' dsaf.dev/blog/deep-dives/_template.md internal/content/deep-dive-schedule.md  # 0
grep -c '\bDSAF\b' dsaf.dev/blog/deep-dives/_template.md  # >= 4

# AC14 — no 84.6 / L5 marketing
grep -ciE '84\.6|industry[- ]?leading|top tier|L5 Optimised' dsaf.dev/blog/deep-dives/_template.md internal/content/deep-dive-schedule.md  # 0

# AC15 — no paid CTAs
grep -ciE 'Talk to a certified|Contact (us|sales|CyberSkill)|Schedule (a|your) demo|Book (a|your) call' dsaf.dev/blog/deep-dives/_template.md  # 0
```

Human-verified ACs (no script):

- **AC5** — reviewer reads `_template.md` section order to confirm CEA flow.
- **AC10, AC11, AC12** — reviewer confirms schedule's review-process + retrospective structures.
- **AC16** — reviewer reads PR description for W1 publication date.

---

## §6 — Implementation skeleton

The operator playbook (6h initial setup + ~1.5-2h per weekly publication):

1. **(1h) Author `dsaf.dev/blog/deep-dives/_template.md`** per §3.
2. **(1h) Author `internal/content/deep-dive-schedule.md`** per §3 — 12-week schedule + topic backlog + skipped-week log + review/retrospective process.
3. **(30m) Author `dsaf.dev/blog/deep-dives/index.md`** per §3.
4. **(15m) Patch `dsaf.dev/blog/index.md`** to add deep-dives section.
5. **(W1 publication, ~1.5-2h founder-time) Draft first deep-dive** per template. Pick topic from FR-LAUNCH tracking-file (most-asked critic concern). Render OG image (~15 min). Publish Tuesday 08:00 PT.
6. **(W1 +15m) Update schedule status to "published" + add to index. Trigger FR-CONTENT-002 cross-publishing pipeline.**
7. **(every Tuesday, repeat steps 5-6 for 12 weeks).**
8. **(every 4 weeks, ~30m) Schedule review per §3 process.**
9. **(W12, 1h) Retrospective decision per §3 — renew / bi-weekly / monthly / different content model.**

---

## §7 — Dependencies

- **Upstream (required):**
  - **FR-CORE-001** — DSAF-25 Core + verbatim-quote rule; deep-dives use the same rubric content.
  - **FR-DOCS-003** — dsaf.dev/blog/ infrastructure live; deep-dives go in `dsaf.dev/blog/deep-dives/` subdirectory.
- **Coordinated:**
  - **FR-LAUNCH-001/002/003** — tracking-file patterns feed topic prioritisation for the first ~6 weeks of deep-dives.
  - **FR-BRAND-002** — handle taxonomy applied throughout.
  - **FR-CORE-004** — cap rule applied (no L5 claims in examples).
  - **FR-BRAND-004** — decoupling rule applied (no audit.cyberskill.world CTAs).
  - **FR-CORE-003** — criteria dedup affects criterion IDs; if a deep-dive's criterion ID becomes an alias post-dedup, the deep-dive post's frontmatter `criterion_id` updates in the same PR.
- **Downstream blocks:**
  - **FR-CONTENT-002** — cross-publishing pipeline consumes each weekly deep-dive.
  - **FR-LAUNCH-006** — newsletter submissions reference recent deep-dives.
- **External:**
  - dsaf.dev SSG (Cloudflare Pages or equivalent) handling markdown-to-HTML rendering.
  - OG image rendering (Figma export, headless Chrome, or manual).

---

## §8 — Example payloads

### Example: a published deep-dive's first paragraph (A.1.1 Color tokens — W1)

```markdown
## The criterion

> **A.1.1 — Color tokens with primitive→semantic→component layers**
>
> - **0:** Hex codes hard-coded throughout
> - **3:** Semantic layer ("text-primary", "background-surface") references primitives
> - **5:** Three-tier architecture; aliases support multi-brand and modes; values are math/HSL-derived. Benchmark: IBM Carbon's `interactive-01`; Material 3 role-based color tokens
>
> Tag: FIXED
> Weight in DSAF-125: 14% (A.1 Foundations & Tokens category)

Color tokens are the foundation that everything else in a design system depends on. A system without semantic color tokens — just primitives — works at the component level but breaks the moment a team tries to multi-brand or add dark mode. A system without component-layer aliases breaks the moment a designer wants a button-specific shade that doesn't mean "primary text." The three-tier architecture is the DSAF's bet that future-proofing requires all three layers.

## Example: IBM Carbon's color-token architecture

[Image: screenshot of IBM Carbon's design tokens documentation showing the three layers]

[300-500 words walking through Carbon's primitive layer (`blue-50` through `blue-90`), semantic layer (`background`, `text-primary`, `interactive-01`), and component layer (`button-primary-background`)...]
```

### Example: an anti-pattern section

```markdown
## Anti-pattern: "we have semantic tokens" but no component aliases

The trap: a team builds the primitive + semantic layers, ships the system, and considers token architecture "done." 6 months later, a designer requests "make this button's hover state a slightly different blue from text-link's hover" — and there's no way to express that without either (a) duplicating the entire semantic layer, OR (b) hardcoding a one-off override.

Why it scores at 2 (not 3): the criterion requires the semantic layer references the primitives (which they have); the 3-anchor also implies the system has shipped *components* with *aliasable* tokens. Without component-layer aliases, the architecture breaks at the first non-trivial design request.

The bridge to fix: introduce a thin component-layer between semantic and consumed; even if only 3-5 components have it initially. Start with the highest-traffic component (button); add `button-primary-background` → `interactive-01` → `blue-60` as the chain. Once one component demonstrates the value, the others follow naturally.

[Anti-pattern is from multiple CyberSkill internal audits; system names anonymised.]
```

### Example: the How-to-self-score section

```markdown
## How to self-score on A.1.1 in 2 minutes

Ask yourself three questions:

1. **Are color values defined anywhere other than primitive tokens (e.g., hex codes in CSS files, magic colors in components)?** If yes → score 0 or 1.
2. **Does your system have a semantic layer that components consume (e.g., `var(--color-text-primary)` instead of `var(--color-blue-60)`)?** If no → score 1 or 2. If yes → continue.
3. **Does at least one component have a component-layer alias (e.g., `--button-primary-background` resolving via semantic to primitive)?** If no → score 3. If yes → score 4 or 5 (5 requires the math/HSL-derivation + multi-brand support per the rubric anchor).

Most teams self-score this at 2-3; some at 4. The 5 requires sustained architectural commitment (Carbon, Material 3 take); few systems achieve it organically.
```

---

## §9 — Open questions

All resolved at authoring time:

- **Q1: Weekly or bi-weekly initial cadence?** Resolved → weekly. Plan §Phase 2 action 1 specifies weekly. Bi-weekly is a fallback at the Week 12 retrospective if weekly is unsustainable.
- **Q2: 12-week or 6-month commitment?** Resolved → 12-week initial, retrospective-driven extension. 6 months is a big commitment; 12 weeks lets the operator evaluate the cadence's signal-to-effort ratio before committing further.
- **Q3: CEA format alternatives (e.g., narrative format, video, podcast)?** Resolved → CEA for written deep-dives. Video/podcast are different formats; if added later, they're separate FRs.
- **Q4: Topic ordering — chronological or thematic?** Resolved → chronological by publication week, but the schedule shows criterion ID + category so readers can find by category if they want.
- **Q5: Multi-author posts?** Resolved → solo-author initially. Future co-maintainer (post-FR-GOV-002) MAY author deep-dives via PR with editorial review. Multi-author single-post is acceptable but uncommon.
- **Q6: What if launch tracking-file patterns don't surface 12 distinct topics?** Resolved → fallback to highest-weight DSAF-125 criteria per the schedule's §3 fallback list.
- **Q7: RSS feed integration?** Resolved → yes; the schedule and index both reference RSS. The SSG handles RSS feed generation; this FR's scope is the post + schedule + index, NOT the RSS infrastructure (assumed live per dsaf.dev SSG capabilities).

---

## §10 — Failure modes inventory

| Failure | Detection | Outcome | Recovery |
|---|---|---|---|
| Operator misses a Tuesday publication | calendar slip | Cadence signal degrades | Log in skipped-week table; publish on Wednesday with explicit "Tuesday slipped due to [reason]"; re-anchor next week's Tuesday |
| > 2 skips in 12-week window | tracking | Cadence breakdown | Pause the cadence; convene retrospective early (Week N instead of Week 12); decide on revised cadence (bi-weekly?) or content-model pivot |
| Topic chosen doesn't match tracking-file patterns | post-publication low engagement | Reader interest mismatched | Re-prioritise next week's topic; surface the mismatch at the next 4-weekly review |
| Deep-dive references a criterion that becomes an alias post-FR-CORE-003 | tracking file update | Stale citation | Per §1 #14: update frontmatter `criterion_id` to new primary; ChangeLog entry. The post's body text may stay if the criterion's substance is unchanged (per FR-CORE-003 §3b verbatim-quote rule) |
| Founder unavailable for an extended period (illness, conference travel) | calendar | Multi-week skip cluster | If known in advance, queue 2-3 deep-dives + schedule via SSG; if unexpected, log skip + recover at return |
| Cross-publishing pipeline (FR-CONTENT-002) breaks; cross-links to discussion threads become stale | grep for placeholder URLs in old posts | Reader frustration | The "Discussion" section's links are added post-cross-publication (T+24-72h); if FR-CONTENT-002 breaks, remove the placeholder line + add when FR-CONTENT-002 recovers |
| Anti-pattern section accidentally identifies a real system | post-publication reader feedback | Reputation damage | Anti-patterns are anonymised per §3 template; if a public system is identifiable, request removal/anonymisation in the next post (ChangeLog entry); apologise to the system's team privately |
| Reader engagement drops after Week 8 | analytics | Cadence-fatigue signal | At Week 8 4-weekly review, consider bi-weekly transition for W9-W12 or end early at W10 with retrospective |
| External contributor wants to author a deep-dive | PR submission | Editorial review needed | CODEOWNERS gate per §1 #15; editorial review by founder + future co-maintainer; merge if quality meets template + voice; reject + feedback otherwise |
| Deep-dive criterion exists in DSAF-125 but is in `clarify` status from FR-CORE-003 dedup | tracking | Wording may shift mid-publication | Don't write deep-dives on `clarify`-status criteria until they stabilise; pick a different criterion for that week |
| Lighthouse perf score drops on deep-dives due to OG image weight | post-publication audit | Page load slower | Optimise OG image (PNG → WebP; compression); cap OG image at 100KB |
| Schedule re-prioritisation invalidates Week 12 retrospective date | calendar drift | Retrospective slips | The Week 12 anchor is the retrospective trigger, not the calendar week; if cadence skipped 2 weeks, retrospective at Week 14 actual (Week 12 publication count) |

---

## §11 — Implementation notes

- **The 1.5-2h per weekly publication budget is realistic.** ~30m drafting outline + ~45-60m writing the body + ~15m for OG image + ~15m for index/schedule update + ~15m FR-CONTENT-002 trigger = ~2 hours per week. Over 12 weeks: ~24h founder-time. Sustainable; doubling to 4h per week would not be.
- **The CEA format is the operational discipline.** Each section's word target (300-500 for Example, 300-400 for Anti-pattern, ~150 for How-to-self-score) prevents drift toward narrative essay style. The format also makes deep-dives skimmable — a reader can read just the CEA bullets + score themselves in 5 min, or read the full ~1,500 words in 7-8 min.
- **About the W12 retrospective decision:** the four options (renew weekly / transition to bi-weekly / monthly / different content model) are the realistic post-12-week paths. "Continue weekly forever" is a sub-option of renew; "stop entirely" is implicit in the different-content-model option. The retrospective doesn't have to pick one path immediately; it can pause-and-decide.
- **Tracking-file patterns drive topic prioritisation for ~weeks 1-6.** After that, the tracking-file's launch-week-specific patterns are exhausted; the schedule transitions to high-weight-criteria fallback (W5-W12). At Week 4 review, the operator assesses whether new post-launch reader engagement patterns are surfacing additional topics; if yes, those displace high-weight fallbacks.
- **About external contributor PRs:** per §1 #15 + §10 failure-mode, external contributors are welcome via PR with editorial review. The first 6-12 months likely won't see many; post-FR-GOV-002 co-maintainer recruit, contributors will increase. The CODEOWNERS gate ensures the deep-dive section's voice + quality stay consistent.
- **About OG image rendering:** each deep-dive needs an OG image. The simplest approach is a templated radar SVG with the specific criterion's axis highlighted, rendered to PNG at 1200×630. Templated rendering is automatable (post-FR-CORE-005 P5 or earlier if the operator builds the script); pre-automation, manual rendering takes ~10-15 min per post via Figma export.
- **Cadence-fatigue is the most-likely failure mode.** ~24h founder-time over 3 months is sustainable but not trivial. The Week 12 retrospective is the structural opportunity to decide whether to continue; the 4-weekly reviews are the in-flight checkpoints. If engagement metrics support continuation but founder bandwidth is strained, transitioning to bi-weekly at W12 preserves the surface without the burnout risk.
- **About FR-GOV-002 timing:** if co-maintainer is recruited mid-P2 (which is the FR-GOV-002 target), the deep-dive cadence can be shared 50/50 with co-maintainer for the second 6 weeks (~1h/week each). Sharing reduces founder burden + signals genuine co-maintenance to the community.

---

*End of FR-CONTENT-001.*
