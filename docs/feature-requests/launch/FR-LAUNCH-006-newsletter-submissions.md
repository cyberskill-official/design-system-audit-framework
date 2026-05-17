---
id: FR-LAUNCH-006
title: "Submissions to Into Design Systems Weekly + Pattern Pulse + Sidebar.io + Smashing Newsletter — per-deep-dive cadence"
module: LAUNCH
priority: SHOULD
status: accepted
verify: I
phase: P2
milestone: P2 · slice 1 · Community velocity
slice: 1
owner: Stephen Cheng (Founder) + future co-maintainer (post-FR-GOV-002)
created: 2026-05-17
shipped: null
related_frs: [FR-CONTENT-001, FR-CONTENT-002, FR-LAUNCH-001, FR-LAUNCH-005]
depends_on: [FR-CONTENT-001]
blocks: []
source_pages:
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Phase 2 — Community velocity action 4 — 'Submit to Into Design Systems Weekly, Pattern Pulse, Sidebar.io, Smashing Newsletter')"
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Design systems community signal map — Into Design Systems is the design-systems-community center of gravity)"
source_decisions:
  - "DEC-066: 4 newsletters submitted per the plan's explicit list — newsletter audiences are typically design-systems-niche (high signal-to-noise)"
  - "DEC-067: submit each weekly deep-dive (not just batch + select); newsletters editorially curate from submissions"
  - "DEC-068: submission cadence is per-deep-dive (i.e., weekly during FR-CONTENT-001 active cadence) — ~15min total per week across all 4 newsletters"
  - "DEC-069: NO follow-up if a submission isn't picked up — newsletters have their own editorial standards; chasing degrades the relationship"
language: markdown + ops
service: doctrine + outreach ops
new_files:
  - docs/launch/newsletter-submissions.md   # per-newsletter submission procedure + tracking
modified_files: []
allowed_tools:
  - "file_read/write docs/launch/**"
  - "manual newsletter submission via each platform's submission form / email"
disallowed_tools:
  - "submit the same deep-dive to all 4 newsletters in different framings (the same content goes to each; cosmetic per-newsletter format differences only)"
  - "follow up if a submission isn't picked up (newsletters' editorial decisions are theirs; chasing is bad form)"
  - "submit content other than weekly deep-dives (the FR's scope is FR-CONTENT-001 deep-dives; the launch blog post FR-DOCS-003 was submitted at FR-LAUNCH-001's window, not here)"
  - "use paid promotion services to get into newsletters (some newsletters offer paid placement; the discipline is organic submission only)"
  - "spam-submit (same deep-dive multiple times per newsletter; multiple deep-dives per week per newsletter beyond the cadence)"
effort_hours: 3
sub_tasks:
  - "1. (30m) Author docs/launch/newsletter-submissions.md per §3 — 4 per-newsletter procedures + submission timing + tracking format"
  - "2. (per-deep-dive, ~15m total) Submit each weekly deep-dive to all 4 newsletters within 24h of dsaf.dev publication"
  - "3. (per-deep-dive monitoring) Track which deep-dives get picked up in which newsletters (per-newsletter publication schedules vary)"
  - "4. (every 4 weeks, ~15m) Review newsletter inclusion-pattern; feed back to FR-CONTENT-001 topic prioritisation (topics that get picked up are signals of community resonance)"
risk_if_skipped: "Plan §Phase 2 action 4 names these 4 newsletters explicitly. Newsletter audiences are typically design-systems-niche subscribers — high signal-to-noise. Into Design Systems Weekly reaches ~29k LinkedIn-followers via the IDS newsletter + community emails (the plan §'Design systems community signal map' names IDS as the field's center of gravity). Pattern Pulse + Sidebar.io + Smashing Newsletter each reach ~10-50k engaged readers. Skipping this FR cedes 4 curated channels to the framework's target audience. The cost is small (~15min/week during FR-CONTENT-001 active cadence; ~3h cumulative over 12 weeks); the value is the multiplicative reach when newsletters pick up deep-dives (typically 1-2 of 4 newsletters pick up a given deep-dive based on relevance fit; cumulative inclusion rate over 12 weeks: ~20-40% of deep-dives get into at least 1 newsletter)."
---

## §1 — Specification (BCP-14 normative)

The framework MUST submit each weekly deep-dive from FR-CONTENT-001 to 4 design-systems-relevant newsletters within 24h of dsaf.dev publication: Into Design Systems Weekly, Pattern Pulse, Sidebar.io, Smashing Newsletter. The cadence is per-deep-dive (weekly during FR-CONTENT-001 active cadence). Each submission uses the §3 per-newsletter procedure. No follow-up if a submission isn't picked up.

1. **MUST** submit each weekly deep-dive (from FR-CONTENT-001) to all 4 newsletters within 24h of dsaf.dev publication. Submission timing — Tuesday 08:00 PT dsaf.dev publication → Wednesday 08:00 PT submission window opens; submission close ideally Tuesday +24h. Each newsletter's submission form / email is per §3.
2. **MUST** use the §3 per-newsletter submission procedure. Each newsletter has a different submission mechanism: Into Design Systems Weekly (submission form on intoidesignsystems.com OR personal email to Sil Bormüller); Pattern Pulse (submission form on patternpulse.io); Sidebar.io (submission form on sidebar.io); Smashing Newsletter (submission form on smashingmagazine.com/newsletter OR email to editorial).
3. **MUST NOT** submit content other than weekly deep-dives via this FR. The FR's scope is FR-CONTENT-001 outputs. The launch blog post (FR-DOCS-003) was submitted alongside FR-LAUNCH-001 window; guest articles (FR-LAUNCH-005) are not newsletter content; this FR doesn't cover other content categories.
4. **MUST** use the same canonical dsaf.dev URL across all 4 newsletter submissions per FR-BRAND-001 + FR-CONTENT-002 canonical-URL preservation discipline. Newsletters typically link to whatever URL is in the submission; the canonical-URL preservation is the cross-platform consistency.
5. **MUST NOT** follow up if a submission isn't picked up. Newsletters editorially curate; their decisions are theirs. Following up reads as pressure + degrades the relationship for future weeks. The framework's discipline is "submit + move on."
6. **MUST NOT** use paid promotion services to get into newsletters. Some newsletters offer paid sponsorship slots (e.g., Pattern Pulse has occasional paid placement); the discipline is *organic submission only*. Paid promotion conflicts with the framework's OSS authenticity signal.
7. **MUST** apply the FR-BRAND-002 handle taxonomy in submission text (the brief summary newsletters typically request alongside the link). `DSAF` short handle; no `Framework` noun-handle.
8. **MUST** apply the FR-CORE-004 cap rule in submission text. No L5 / 84.6% / industry-leading claims; deep-dive framing is "criterion deep-dive."
9. **MUST NOT** include paid-funnel CTAs in submission text. Submission text is canonical content, not lead-gen.
10. **MUST** track each submission in `docs/launch/newsletter-submissions.md` per §3 tracking format: deep-dive title + dsaf.dev URL + per-newsletter submission date + per-newsletter inclusion status (picked up Y/N + which issue date).
11. **MUST** include in the §3 tracking-file format the per-newsletter inclusion pattern over time. Topics picked up by ≥ 2 of 4 newsletters are highest community-resonance signals; topics picked up by 0 of 4 across multiple deep-dives may indicate framework-audience-mismatch.
12. **MUST** review the inclusion patterns every 4 weeks. Feed the patterns back to FR-CONTENT-001 topic prioritisation: high-inclusion topics → similar future deep-dives; zero-inclusion topics → consider whether the criterion-area genuinely lacks community resonance OR if the framing was wrong.
13. **MUST** preserve newsletter relationships by NOT spam-submitting. Submitting the same deep-dive multiple times per newsletter; submitting multiple deep-dives per week per newsletter (beyond the natural cadence); resubmitting older deep-dives that weren't picked up — all forbidden.
14. **MUST NOT** request newsletters edit the submission text after publication. Newsletters' published versions are theirs; if the framing is wrong, the dsaf.dev original is the canonical (per FR-CONTENT-002 canonical-URL discipline). Requesting newsletter edits damages relationships.
15. **MUST** include co-maintainer in submission cadence post-FR-GOV-002 acceptance. Per FR-GOV-002 charter cadence-share: co-maintainer's authored deep-dives go through the same 4-newsletter submission process (either the co-maintainer submits OR the founder submits on the co-maintainer's behalf with explicit "Authored by [co-maintainer name]" in the submission text).

---

## §2 — Why this design

**Why these 4 newsletters specifically (§1 #1):** plan §Phase 2 action 4 names them verbatim. Each has design-systems-niche audience: Into Design Systems Weekly is the field's center of gravity (Sil Bormüller's IDS Conf + community; ~29k LinkedIn-followers via IDS newsletter); Pattern Pulse curates pattern-and-design-system content (~10-30k engaged readers); Sidebar.io is broader designer-curation (~30k); Smashing Newsletter is broad design + dev (~150k+ subscribers but lower per-subscriber engagement than the others). The combination covers DS-specific to broader design audiences without overlap-collisions.

**Why per-deep-dive cadence (§1 #1):** weekly newsletter submissions match the FR-CONTENT-001 weekly cadence. Batching submissions (e.g., submit 4 deep-dives at end of month) loses the time-sensitive newsletter inclusion opportunity (most newsletters pick from recent content, not month-old archives).

**Why no follow-up (§1 #5):** newsletters receive 50-200+ submissions per week. Editorial curation is their value; chasing for inclusion is the most-common submitter anti-pattern that degrades relationships. The discipline is "submit + move on"; if a deep-dive is right for the newsletter's audience, the editor picks it up; if not, the next week's submission is the next opportunity.

**Why no paid promotion (§1 #6):** the framework's OSS authenticity signal compounds. Paid newsletter placement reads as marketing-disguised-as-content; even if the deep-dive's content is substantive, the paid framing makes the framework look less authentic. The plan's "quality of placement compounds; quantity on Medium does not" applies — paid placement is quantity-tactic, organic inclusion is quality-signal.

**Why same canonical URL across all 4 (§1 #4):** matches FR-CONTENT-002 cross-publishing discipline. Search engines index the dsaf.dev URL as canonical; newsletter inclusions link to the canonical; cumulative authority on dsaf.dev increases.

**Why tracking + 4-weekly inclusion-pattern review (§1 #10, #11, #12):** newsletters are an editorially-curated signal of community resonance. Topics picked up by ≥ 2 of 4 newsletters = high resonance; zero pickup across multiple deep-dives = audience-mismatch signal. The feedback loop to FR-CONTENT-001 makes the cadence's topic prioritisation more accurate over time.

**Why no spam-submission discipline (§1 #13):** newsletters' submission inboxes are noisy; multiple submissions of the same content per week reads as spam to the editor + may flag the submitter for de-prioritisation. The framework's discipline preserves the founder's submission queue value.

**Why no post-publication edit requests (§1 #14):** newsletters publish to schedule + their published versions are part of their editorial archive. Edit requests are expensive for the newsletter editor (typically requires re-issue or correction note) and reads as the framework not respecting the newsletter's editorial decisions. The dsaf.dev canonical is where edits land; newsletters' versions are point-in-time citations.

**Why co-maintainer inclusion post-FR-GOV-002 (§1 #15):** newsletters' editorial curation may favour content from named maintainers (or the named-author dynamic). Co-maintainer's authored deep-dives going through the same submission process maintains the framework's content presence across all 4 newsletters consistently.

---

## §3 — Doctrine contract

### `docs/launch/newsletter-submissions.md` — the canonical newsletter-submission doc

```markdown
---
title: "DSAF newsletter submissions (FR-LAUNCH-006)"
ratified_by: FR-LAUNCH-006 (2026-05-17)
cadence: per-deep-dive (within 24h of dsaf.dev publication) during FR-CONTENT-001 active 12-week window
newsletters: Into Design Systems Weekly · Pattern Pulse · Sidebar.io · Smashing Newsletter
---

# DSAF newsletter submissions

This file is the operations doc for FR-LAUNCH-006. Each weekly deep-dive from FR-CONTENT-001 gets submitted to 4 design-systems-relevant newsletters within 24h of dsaf.dev publication.

## §3.1 — Per-newsletter procedure

### Into Design Systems Weekly (~5 min per submission)

1. Submission method: Submission form at intodesignsystems.com/submit (verify URL at submission time — newsletter operations may move) OR personal email to Sil Bormüller (per FR-GOV-001 shortlist warmth — Sil is a known relationship from heads-up outreach).
2. Submission text:
   ```
   Subject: DSAF deep-dive submission — [Criterion ID]: [brief title]
   
   Hi IDS team,
   
   This week's DSAF deep-dive on [Criterion ID]: [brief title] — [1-sentence summary].
   
   URL: [dsaf.dev URL]
   
   Tags: design-systems, [criterion-category], [topic-tag]
   
   Author: Stephen Cheng (DSAF founder) [OR "Authored by [co-maintainer name]" post-FR-GOV-002]
   
   No follow-up needed; thanks for considering.
   ```
3. Submission timing: within 24h of dsaf.dev publication. IDS Weekly publishes Fridays; submissions by Wednesday for Friday inclusion are typical.

### Pattern Pulse (~5 min per submission)

1. Submission method: Submission form at patternpulse.io/submit (verify URL).
2. Submission text per the platform's form fields:
   - Title: same as dsaf.dev deep-dive title.
   - URL: dsaf.dev URL.
   - Brief summary: 1-2 sentence summary.
   - Category tags: design-systems, [criterion-area].
3. Submission timing: same as IDS — within 24h. Pattern Pulse publishes weekly (cadence varies).

### Sidebar.io (~3 min per submission)

1. Submission method: Submission form at sidebar.io/submit.
2. Submission text per the platform's form fields:
   - URL: dsaf.dev URL.
   - Title: same as dsaf.dev deep-dive title.
   - Description: 1 sentence summary.
3. Submission timing: within 24h. Sidebar.io publishes daily; faster turnaround = better visibility.

### Smashing Newsletter (~5 min per submission)

1. Submission method: Submission form at smashingmagazine.com/newsletter/submissions OR editorial email contact (find via Smashing's contact page).
2. Submission text:
   ```
   Subject: DSAF deep-dive submission for Smashing Newsletter consideration
   
   Hi Smashing editorial,
   
   This week's DSAF deep-dive on [Criterion ID]: [brief title].
   
   URL: [dsaf.dev URL]
   
   1-2 sentence summary: [summary]
   
   Category: design-systems, [criterion-category]
   
   No follow-up needed.
   ```
3. Submission timing: within 24h. Smashing Newsletter publishes weekly (Thursday cadence typical); submissions by Tuesday for Thursday inclusion.

## §3.2 — Submission text template (the universal version)

Each newsletter's specific submission text per §3.1 above; the universal template if a newsletter's form is similar across all 4:

```
Title: [Criterion ID]: [Criterion brief] — DSAF deep-dive [N]
URL: [dsaf.dev URL]
Author: Stephen Cheng (DSAF founder) [OR co-maintainer per FR-GOV-002]
Summary: 1-2 sentences from the deep-dive's TL;DR / first paragraph.
Category tags: design-systems + [criterion-category-tag] + [topic-tag]
```

Apply FR-BRAND-002 handle taxonomy (DSAF short handle; no Framework noun-handle); FR-CORE-004 cap rule (no L5 marketing); FR-BRAND-004 decoupling (no audit.cyberskill.world CTAs in submission text).

## §3.3 — Per-deep-dive submission tracking

```markdown
| Deep-dive | dsaf.dev URL | IDS Weekly | Pattern Pulse | Sidebar.io | Smashing | Cumulative inclusions |
|---|---|---|---|---|---|---|
| W1 — A.1.1 Color tokens | dsaf.dev/.../a1-1 | submitted 2026-09-09; included 2026-09-12 issue | submitted 2026-09-09; included 2026-09-15 issue | submitted 2026-09-09; not included | submitted 2026-09-09; not included | 2 of 4 |
| W2 — ... | ... | ... | ... | ... | ... | ... |
```

Per-deep-dive update at submission time (status: submitted) + at T+7d (status: included / not included). Maintain in `docs/launch/newsletter-submissions.md`.

## §3.4 — 4-weekly inclusion-pattern review

Every 4 weeks (aligned with FR-CONTENT-001 4-weekly schedule review):

1. **Per-newsletter inclusion rate:** what % of submissions did each newsletter pick up over the 4-week window? Patterns: IDS Weekly may pick up 50% (high-affinity audience); Pattern Pulse may pick up 25%; Sidebar.io may pick up 15-30%; Smashing Newsletter may pick up 10-20%.
2. **Per-topic resonance:** which topics got picked up by ≥ 2 of 4 newsletters? These are high-resonance for the community; lessons feed FR-CONTENT-001 topic prioritisation.
3. **Zero-inclusion topics:** topics picked up by 0 of 4 newsletters across multiple deep-dives — consider whether the criterion-area lacks community resonance OR the framing was wrong.
4. **Newsletter relationships:** if a newsletter consistently includes DSAF content, the relationship deepens; if a newsletter never includes, consider whether the audience truly mismatches (skip in future) OR if the submission text needs adjustment.

Output: brief retrospective notes in `docs/launch/newsletter-submissions.md` 4-weekly-retrospective section; feed back to `docs/content/deep-dive-schedule.md` topic prioritisation.

## §3.5 — Anti-patterns

- **Follow-up emails ("did you see my submission?").** Forbidden per §1 #5. Newsletters' editorial decisions are theirs.
- **Same submission to multiple newsletters in different framings.** Forbidden per §1 #4. Same content, same canonical URL.
- **Paid promotion slots.** Forbidden per §1 #6. Organic submissions only.
- **Submitting non-deep-dive content via this FR.** Forbidden per §1 #3. Scope is FR-CONTENT-001 outputs.
- **Resubmitting an older deep-dive that wasn't picked up.** Forbidden per §1 #13. Move on.
- **Multiple deep-dives per week per newsletter.** Forbidden per §1 #13. The cadence is one deep-dive per week per newsletter.
- **Requesting newsletter edits post-publication.** Forbidden per §1 #14. The newsletter's version is point-in-time.
- **Spam-submitting (same deep-dive 2+ times per newsletter).** Forbidden per §1 #13. Damages submission queue priority.
```

---

## §4 — Acceptance criteria

1. **Newsletter doc committed** — `docs/launch/newsletter-submissions.md` exists per §3 with: per-newsletter procedure (4 newsletters), universal submission text template, per-deep-dive tracking, 4-weekly inclusion-pattern review process, anti-patterns.
2. **4 newsletters enumerated** — `docs/launch/newsletter-submissions.md` §3.1 has subsections for Into Design Systems Weekly, Pattern Pulse, Sidebar.io, Smashing Newsletter.
3. **Per-newsletter procedure has submission method + text + timing** — each §3.1 subsection includes URL/email + submission text template + timing guidance.
4. **No follow-up rule explicit** — `grep -q 'No follow-up\|forbidden per §1 #5' docs/launch/newsletter-submissions.md`.
5. **No paid-promotion rule explicit** — `grep -q 'paid promotion\|paid placement' docs/launch/newsletter-submissions.md` shows the rule is documented (in either main body or anti-patterns).
6. **Tracking format includes per-newsletter inclusion status** — §3.3 tracking has columns for each of the 4 newsletters + cumulative inclusions count.
7. **4-weekly inclusion-pattern review described** — §3.4 has the per-newsletter inclusion rate + per-topic resonance + zero-inclusion topics + newsletter relationships analysis.
8. **Anti-patterns enumerated (≥ 8)** — §3.5 lists at least 8 anti-patterns.
9. **FR-LAUNCH-001 launch context NOT in this FR's scope** — `docs/launch/newsletter-submissions.md` doesn't conflate FR-LAUNCH-001 launch submissions (the launch had its own newsletter outreach per FR-LAUNCH-001 + FR-LAUNCH-004 patterns); this FR's scope is FR-CONTENT-001 weekly deep-dive submissions.
10. **Handle taxonomy compliance** — `grep -ciE '\b(the )?DSAF Framework\b|\bDSAF framework\b' docs/launch/newsletter-submissions.md` returns 0; `grep -c '\bDSAF\b' docs/launch/newsletter-submissions.md` ≥ 4.
11. **No 84.6 / L5 marketing in submission text** — `grep -ciE '84\.6|industry[- ]?leading|top tier|L5 Optimised' docs/launch/newsletter-submissions.md` returns 0.
12. **No paid CTAs in submission text** — `grep -ciE 'Talk to a certified|Contact (us|sales|CyberSkill)|Schedule (a|your) demo|Book (a|your) call' docs/launch/newsletter-submissions.md` returns 0.
13. **Universal submission text template aligned with FR-CONTENT-002 cross-publishing canonical-URL discipline** — `grep -q 'canonical\|dsaf.dev URL' docs/launch/newsletter-submissions.md`.
14. **Co-maintainer inclusion (post-FR-GOV-002) addressed** — §3 + §1 #15 explicit on co-maintainer submission flow.
15. **PR description includes per-week elapsed-time estimate** — PR description names the ~15min/week budget (5min × 4 newsletters minus optimisations like reusing the universal template).

---

## §5 — Verification

```bash
# AC1, AC2 — file + 4 newsletters
test -f docs/launch/newsletter-submissions.md
for nl in 'Into Design Systems Weekly' 'Pattern Pulse' 'Sidebar.io' 'Smashing Newsletter'; do
  grep -qF "${nl}" docs/launch/newsletter-submissions.md || echo "MISSING: ${nl}"
done

# AC3 — per-newsletter procedure
for nl in 'Into Design Systems Weekly' 'Pattern Pulse' 'Sidebar.io' 'Smashing Newsletter'; do
  awk -v nl="### ${nl}" '$0 ~ nl {flag=1; next} /^### / {flag=0} flag' docs/launch/newsletter-submissions.md | \
    grep -E 'Submission method:|URL|submission text' || echo "INSUFFICIENT for ${nl}"
done

# AC4 — no follow-up rule
grep -q 'No follow-up\|no follow-up' docs/launch/newsletter-submissions.md

# AC5 — no paid-promotion rule
grep -qi 'paid promotion\|paid placement' docs/launch/newsletter-submissions.md

# AC6 — tracking format
grep -q '| Into Design Systems Weekly\|IDS Weekly' docs/launch/newsletter-submissions.md

# AC8 — ≥ 8 anti-patterns
awk '/## §3.5 — Anti-patterns/,EOF' docs/launch/newsletter-submissions.md | grep -cE '^- \*\*'
# expected: >= 8

# AC10 — handle taxonomy
grep -ciE '\b(the )?DSAF Framework\b|\bDSAF framework\b' docs/launch/newsletter-submissions.md  # 0
grep -c '\bDSAF\b' docs/launch/newsletter-submissions.md  # >= 4

# AC11 — no marketing claims in submission text
grep -ciE '84\.6|industry[- ]?leading|top tier|L5 Optimised' docs/launch/newsletter-submissions.md  # 0

# AC12 — no paid CTAs
grep -ciE 'Talk to a certified|Contact (us|sales|CyberSkill)|Schedule (a|your) demo|Book (a|your) call' docs/launch/newsletter-submissions.md  # 0

# AC13 — canonical URL discipline
grep -q 'canonical\|dsaf.dev URL' docs/launch/newsletter-submissions.md

# AC14 — co-maintainer inclusion
grep -q 'co-maintainer\|FR-GOV-002' docs/launch/newsletter-submissions.md
```

Human-verified ACs (no script):

- **AC7** — reviewer reads §3.4 4-weekly inclusion-pattern review section for completeness.
- **AC9** — reviewer confirms FR scope doesn't conflate launch-window newsletter outreach (handled in FR-LAUNCH-001/004).
- **AC15** — reviewer reads PR description for per-week elapsed-time estimate.

---

## §6 — Implementation skeleton

The operator playbook (3h setup + ~15min/week per active FR-CONTENT-001 cadence):

1. **(30m) Author `docs/launch/newsletter-submissions.md`** per §3 — all 5 sub-sections.
2. **(per-weekly-deep-dive, ~15m) Submit to all 4 newsletters within 24h of dsaf.dev publication.** Use the §3.1 per-newsletter procedure + universal template from §3.2.
3. **(per-deep-dive at T+7d, ~5m) Update tracking with inclusion status** per §3.3.
4. **(every 4 weeks, ~15m) Review inclusion patterns** per §3.4; feed back to FR-CONTENT-001 topic prioritisation.

---

## §7 — Dependencies

- **Upstream (required):**
  - **FR-CONTENT-001** — weekly deep-dive cadence + content live; submissions consume the deep-dives.
- **Coordinated:**
  - **FR-CONTENT-002** — cross-publishing happens T+24-72h; newsletter submission happens within T+24h (parallel to cross-publishing, NOT after).
  - **FR-BRAND-001** — canonical dsaf.dev URL preserved in submissions.
  - **FR-BRAND-002** — handle taxonomy.
  - **FR-CORE-004** — cap rule.
  - **FR-BRAND-004** — decoupling rule.
  - **FR-GOV-002** — co-maintainer inclusion in submission flow post-acceptance.
- **Downstream blocks:** none directly.
- **External:**
  - Newsletter submission forms / email contacts (operator verifies at submission time).
  - Founder's email + queue management.

---

## §8 — Example payloads

### Example: a successful submission flow

```
Tuesday 2026-09-08 08:00 PT: dsaf.dev/blog/deep-dives/2026-09-08-a1-1-color-tokens-three-tier-architecture publishes.
Tuesday 2026-09-08 08:30 PT (within 24h of dsaf.dev publication): operator submits to 4 newsletters per §3.1.
  - IDS Weekly: submitted via form; Sil Bormüller acknowledges within 24h ("got it, will consider")
  - Pattern Pulse: submitted via form; no acknowledgment expected
  - Sidebar.io: submitted via form; included 2026-09-09 daily issue (high turnaround)
  - Smashing Newsletter: submitted via form; no acknowledgment expected
Tracking updated 2026-09-09: Sidebar.io picked up.
2026-09-12 IDS Weekly issue: DSAF deep-dive included (curated by Sil)
2026-09-15 Pattern Pulse issue: DSAF deep-dive NOT included this week
2026-09-18 Smashing Newsletter issue: DSAF deep-dive NOT included this week
Tracking updated 2026-09-18 (T+10d): cumulative inclusions = 2 of 4 (IDS + Sidebar). Mid-range; good outcome.
```

### Example: a zero-inclusion week

```
W4 deep-dive submitted to 4 newsletters.
T+7d: 0 of 4 picked up.
Tracking updated; no action (per §1 #5 no-follow-up rule).
4-weekly review notes: "W4 topic on A.4.6 Roadmap transparency — niche governance topic; lower newsletter audience interest than tactical token/component criteria."
Lesson: future deep-dives on governance topics framed more practically (e.g., "the RFC template that 50+ DS teams use") may improve newsletter relevance.
```

### Example: a 4-weekly inclusion-pattern review

```
4-week window: 2026-09-08 to 2026-10-06 (W1-W4 deep-dives).
- W1 A.1.1 Color tokens: 3 of 4 included (IDS, Sidebar, Smashing) — high resonance; tactical Foundations topic
- W2 A.2.4 Variant & state coverage: 2 of 4 (IDS, Pattern Pulse) — mid resonance
- W3 A.8.1 Bundle-size budgets in CI: 1 of 4 (Smashing) — lower mid (Smashing's dev-engineer audience)
- W4 A.4.6 Roadmap transparency: 0 of 4 — low (niche governance topic)

Patterns:
- IDS Weekly inclusion rate: 50% (W1, W2 of 4) — Sil's audience consistent
- Pattern Pulse: 25% (W2)
- Sidebar.io: 25% (W1)
- Smashing: 50% (W1, W3) — broader tactical preference

Topics with ≥ 2 newsletter inclusion: W1 Color tokens, W2 Variant coverage. Tactical Foundations + Component criteria resonate.
Zero-inclusion topics: W4 Governance — consider re-framing or de-prioritising governance deep-dives.

Feedback to FR-CONTENT-001:
- W6 Smashing-friendly tactical topic candidate (already scheduled: A.4.3 Semver discipline — moderate fit)
- W12 retrospective: governance topics get authored less frequently in next cadence cycle if zero-inclusion pattern persists
```

---

## §9 — Open questions

All resolved at authoring time:

- **Q1: 4 newsletters or more / fewer?** Resolved → 4 per plan §Phase 2 action 4. More dilutes submission attention; fewer cedes audience slices.
- **Q2: Newsletters not in the original plan list (e.g., Frontend Focus, JavaScript Weekly)?** Resolved → out of scope. The 4 are the plan-vetted design-systems-relevant set; expanding requires explicit decision.
- **Q3: What if a newsletter's submission form/URL changes?** Resolved → operator verifies at submission time. The §3.1 procedure includes "verify URL at submission time" framing.
- **Q4: Should submissions include the OG image / visual asset?** Resolved → form-driven; if the form requests an image, include the dsaf.dev OG image; if not, the URL link is sufficient (newsletters typically fetch the OG image from the linked page).
- **Q5: What if a newsletter offers paid sponsorship and reaches out?** Resolved → decline politely; the discipline is organic-only.
- **Q6: Should the founder request to be added to a newsletter's "regular contributors" list if inclusion rate is high?** Resolved → no; organic submission preserves the discipline. The newsletter editor may extend an invitation independently; that's acceptable as long as no paid arrangement.
- **Q7: How long is the FR active?** Resolved → during the FR-CONTENT-001 active 12-week cadence + future cycles. The submission discipline is per-deep-dive; the FR remains operationally active as long as FR-CONTENT-001 is active.

---

## §10 — Failure modes inventory

| Failure | Detection | Outcome | Recovery |
|---|---|---|---|
| Newsletter submission form/URL broken | submission fails | Submission missed for that week | Email the newsletter editorial direct as fallback OR skip for the week + log |
| Founder forgets to submit a week | calendar slip | Missed submission window | Submit late (within T+72h still acceptable but lower inclusion-rate); log slip in tracking; no further action |
| Newsletter editor rejects submission | rejection reply (rare) | Specific newsletter excludes that deep-dive | Per §1 #5 + anti-patterns: no follow-up; accept the rejection; consider whether the framing or topic fit was off for that newsletter |
| Zero-inclusion across all 4 newsletters for multiple deep-dives | tracking pattern | Indicates audience-mismatch or framing issue | 4-weekly review per §3.4; consider re-framing topics OR accepting that some criterion-areas don't have newsletter resonance |
| Spam-filter flags submission as spam | newsletter editor doesn't see | Missed visibility | Verify submission sent successfully; if pattern repeats with a newsletter, reach out to editor with subject-line clarification |
| Newsletter editor's relationship with founder degrades from follow-up attempts | passive-aggressive replies | Future submissions ignored | Apologise privately; restart submission discipline strictly; ~3 months of clean submissions to rebuild relationship |
| Paid-promotion opportunity declined publicly + newsletter editor takes offense | unlikely social-media event | Brand damage | Stand by the discipline; engage transparently if asked publicly; the discipline is sound; relationships that punish OSS-discipline are not ones to maintain |
| Submission text breaks FR-BRAND-002 taxonomy (e.g., uses "DSAF Framework") | review at submission | Inconsistent brand | Catch at draft-time; if landed, accept the inconsistency for that submission; tighten discipline next time |
| Co-maintainer's deep-dives don't get submitted to newsletters (oversight) | tracking gap | Inconsistent submission pattern | Per §1 #15 + §3 ensure co-maintainer is in the submission flow; if oversight, submit retroactively (within T+72h) OR skip + log |
| Newsletter changes editorial direction (becomes paywalled or shifts audience) | submission ignored consistently | Newsletter no longer fits DSAF audience | Drop that newsletter from the 4 + replace with a different design-systems-relevant newsletter; update §3.1 accordingly |
| Operator double-submits to same newsletter accidentally | submission queue chaos | Editor flag | Apologise + clarify; one-time mistake forgivable; pattern damages relationship |
| Newsletter's published version misrepresents deep-dive content | post-publication review | Reader confusion | Per §1 #14: no edit request to newsletter; the dsaf.dev canonical is the source of truth; if substantive misrepresentation, respond on dsaf.dev's discussion section pointing to canonical |

---

## §11 — Implementation notes

- **The ~15min/week budget is realistic only with the universal template.** Without the template, each newsletter's specific framing takes 5-10 min; with the template, the per-week budget is ~3-5 min per newsletter = ~15 min total. The §3.2 template enables the budget.
- **Newsletter inclusion rates vary widely.** Plan estimates: IDS Weekly 30-50% (Sil's editorial preference aligns with DS-niche); Pattern Pulse 20-30%; Sidebar.io 15-25%; Smashing Newsletter 10-20% (broader audience, more competition). Cumulative: ~20-40% of submissions get into ≥ 1 newsletter. Over 12 weeks: ~3-5 newsletter inclusions total = substantial cumulative reach.
- **About the 24h submission window:** newsletters' editorial calendars typically run 2-5 days ahead of publication. Submissions arriving within 24h of dsaf.dev publication have the best chance of being considered for the upcoming issue (which publishes ~3-5 days later).
- **The no-follow-up discipline is the relationship-preservation move.** Newsletter editors typically value submitters who respect the editorial autonomy; those who follow up get de-prioritised. The discipline costs nothing (the framework's tracking is internal); the payoff is sustained submission queue priority.
- **About paid-promotion declination:** when a newsletter offers paid placement, the framework's response is "we appreciate the option but our discipline is organic-submission-only; we'll keep submitting deep-dives and accept your editorial decisions." The framing preserves the relationship while declining the financial arrangement.
- **The 4-weekly inclusion-pattern review is the key institutional-memory step.** Without it, the submissions are blind; with it, the founder learns which topics resonate AND which newsletters are best-fit audiences. Topics that get picked up by multiple newsletters cluster around (a) tactical / immediately-applicable, (b) novel framing of familiar problems, (c) visual-friendly (radar, ladder, tables that newsletter-image-previews can showcase).
- **Co-maintainer cadence-share post-FR-GOV-002:** co-maintainer's authored deep-dives go through the same submission process; either co-maintainer submits OR founder submits with explicit "Authored by [co-maintainer name]." Newsletters' editorial decisions are agnostic to author within the framework's name; what matters is the deep-dive's quality.
- **About newsletter relationship deepening:** if IDS Weekly consistently includes DSAF deep-dives, the relationship deepens beyond submission — Sil may reach out for interviews, conference invites (FR-LAUNCH-007 P3), co-authored pieces (FR-CONTENT-003 P3). These are emergent opportunities; the discipline of organic submission is what enables them.

---

*End of FR-LAUNCH-006.*
