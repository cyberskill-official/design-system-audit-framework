---
id: FR-LAUNCH-001
title: "Show HN — title formula, Tue–Wed 8–10am PT post, 30-min response SLA, kill-switch condition"
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
related_frs: [FR-DOCS-001, FR-DOCS-002, FR-DOCS-003, FR-BRAND-003, FR-CORE-001, FR-CORE-004, FR-GOV-001, FR-LAUNCH-002, FR-LAUNCH-003, FR-LAUNCH-004, FR-LAUNCH-005]
depends_on: [FR-DOCS-001, FR-DOCS-002, FR-DOCS-003]
blocks: [FR-LAUNCH-002, FR-LAUNCH-003]
source_pages:
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Phase 1 — Launch action 1)"
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§What drives GitHub stars items 1, 2, 3)"
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§What NOT to do item 9 — gracious engagement)"
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Phase 1 — Risks/mitigations)"
source_decisions:
  - "DEC-035: Show HN title uses the plan-recommended formula verbatim: 'Show HN: DSAF – open-source maturity framework for design systems (L0–L5, 125 criteria, agent-native)'"
  - "DEC-036: post window is Tuesday-Wednesday 8-10am PT (HN front-page traffic peak; weekend has different demographics; Mon is bottom-quartile)"
  - "DEC-037: founder responds to every critical/substantive comment within 30 minutes for the first 4 hours, within 90 minutes for the next 8 hours, within 4 hours thereafter — graciously per plan §What NOT to do item 9"
  - "DEC-038: kill-switch is a published condition before posting; if it fires the founder pauses the launch and consults the playbook before responding"
language: markdown + ops
service: doctrine + outreach ops
new_files:
  - docs/launch/show-hn-post.md       # the exact post text + title + URL
  - docs/launch/show-hn-response-playbook.md   # 30/90/240-minute response SLA + comment templates + kill-switch
modified_files:
  - dsaf.dev/blog/launch-2026.md       # post-launch: update ChangeLog with HN discussion URL + add HN link to "Try it" section
  - README.md                          # post-launch: add Show HN discussion link to relevant sections (if applicable)
allowed_tools:
  - "file_read/write docs/launch/**, dsaf.dev/**, README.md"
  - "manual posting to news.ycombinator.com (no MCP for HN)"
  - "browser monitoring of the HN thread during the response window"
disallowed_tools:
  - "post the Show HN before FR-DOCS-001 / FR-DOCS-002 / FR-DOCS-003 are all at accepted (10/10)"
  - "ask friends/colleagues to upvote the post (vote manipulation = HN ban)"
  - "ask friends/colleagues to post supportive comments (Astroturfing = HN ban + reputation damage)"
  - "post in a window outside Tuesday-Wednesday 8-10am PT without a logged exception"
  - "respond to a critical comment defensively or with 'well actually' framing"
effort_hours: 6
sub_tasks:
  - "1. (30m) Author docs/launch/show-hn-post.md per §3 — the exact title + post text + URL"
  - "2. (1h) Author docs/launch/show-hn-response-playbook.md per §3 — 30/90/240-minute SLA + comment-pattern templates + kill-switch condition"
  - "3. (15m) Pre-launch verification: confirm FR-DOCS-001/002/003 all shipped + dsaf.dev URLs resolve + visuals render + endorsement quotes in place"
  - "4. (5m) Post Show HN at the scheduled Tuesday-Wednesday 8-10am PT window"
  - "5. (over ~12-24 hours elapsed, ~4h founder-time) Monitor thread; respond per the playbook SLA; route critical feedback into a docs/launch/post-hn-feedback.md tracking file"
  - "6. (15m post-launch +24h) Update dsaf.dev/blog/launch-2026.md ChangeLog with HN discussion URL"
  - "7. (15m post-launch +48h) Update FR-CONTENT-001 (P2 placeholder) — surface lessons learned for the weekly criterion deep-dives"
risk_if_skipped: "The Show HN post is the framework's single highest-leverage visibility moment. Plan §Phase 1 — Launch action 1 specifies the title formula + timing window verbatim; deviating costs trajectory. Plan §'Phase 1 — Risks/mitigations' explicitly names the 'consultancy publishing self-graded L5' takedown angle and the 30-minute-response gracious-engagement mitigation — both are operationalised in this FR's playbook. Skipping this FR means either (a) no Show HN at all (the framework launches without HN traction, which the plan estimates as 200-500 stars vs 300-700 with well-executed Show HN), or (b) Show HN posted ad-hoc without the response playbook (which means the first critical comment goes unanswered for hours and the takedown trajectory begins). The cost of this FR is small (6h, mostly elapsed-time monitoring); the value is the launch-week star trajectory ceiling — the difference between a top-quartile Show HN (300-700 stars) and a middle-of-pack one."
---

## §1 — Description (BCP-14 normative)

The framework's launch on Hacker News MUST follow the plan-recommended title formula, posting window, and response playbook. The founder MUST publish the Show HN at the scheduled window AND monitor the thread per the 30/90/240-minute SLA AND have a kill-switch condition published before posting. Compliance with this FR's playbook is what converts a Show HN submission into a top-quartile launch.

1. **MUST** publish the Show HN at `news.ycombinator.com` using the plan-recommended title verbatim: **"Show HN: DSAF – open-source maturity framework for design systems (L0–L5, 125 criteria, agent-native)"** (note: en-dash between "DSAF" and "open-source"; en-dash between "L0" and "L5"). The title MUST NOT be customised, abbreviated, or expanded. The plan researched the title formula and the verbatim is the contract.
2. **MUST** post in the window **Tuesday OR Wednesday, 8-10am Pacific Time** (per plan §Phase 1 action 1). Pacific Time at the scheduled posting date is the canonical time zone (regardless of the founder's actual location in Vietnam — UTC+7 → 11pm-1am local for an 8-10am PT post). The founder MUST be available for the next 4 hours after posting for the 30-minute-SLA response window.
3. **MUST** include the exact Show HN body per §3 (≤ 1,000 characters per HN's typical body cap). The body links to: (a) `dsaf.dev/card` (DSAF-25 Core, the 5-min entry), (b) `github.com/CyberSkill/design-system-audit-framework` (the repo), (c) `dsaf.dev/blog/launch-2026` (the candid origin-story). No other primary links in the body; ancillary references go in the founder's first comment.
4. **MUST** post a "founder first comment" within 5 minutes of the submission. The comment opens the thread for engagement, links to additional context that didn't fit the body cap (the L0-L5 ladder image, the worked-example URL, the FR-GOV-001 endorsement quotes), and invites specific feedback. The first comment also names the founder ("I'm Stephen Cheng, founder of CyberSkill — happy to answer questions, take roasts, etc.").
5. **MUST** monitor the thread for the first 12 hours post-submission and respond per the SLA in §3.2: (a) 30-minute SLA for critical/substantive comments in the first 4 hours; (b) 90-minute SLA for the next 8 hours; (c) 4-hour SLA thereafter through hour 24. After 24 hours, the response cadence is "as available" per normal community-engagement patterns.
6. **MUST** respond graciously per plan §"What NOT to do" item 9 + Brad-Frost-HN-roast pattern. Critical comments are engaged WITH ("That's fair — here's how we got there: ..." or "Yep, that's a real limitation; we've flagged it in [post URL]"); they are NOT engaged AGAINST ("Well actually..." or "You're wrong because..."). Disagreement is acceptable but framed as substantive ("I think the data points the other way; here's the source: ..."); never as dismissive.
7. **MUST NOT** ask anyone (friends, colleagues, CyberSkill employees, FR-GOV-001 reviewers, FR-LAUNCH-004 heads-up recipients) to upvote the post. HN's vote-manipulation detection is sophisticated; getting flagged for it means the launch is dead-on-arrival + the founder's HN account is banned. The launch trajectory is whatever organic engagement the post generates.
8. **MUST NOT** ask anyone to post supportive comments. Astroturfing is detectable (identical-comment patterns, suspicious account ages, voting clusters) and getting flagged means same outcome as vote manipulation — launch dies + reputation damaged. FR-LAUNCH-004 heads-up outreach is *informational* (people are aware DSAF is launching); it is NOT a coordinated-comment ask.
9. **MUST** publish a **kill-switch condition** in `docs/launch/show-hn-response-playbook.md` BEFORE posting Show HN. The kill-switch is a published condition under which the founder pauses the launch and consults the playbook before continuing. Conditions: (a) a critical comment surfaces a factual error in DSAF that the founder didn't know about; (b) a critical comment surfaces a TOS/legal concern; (c) a comment from one of the FR-GOV-001 reviewers retracts their endorsement; (d) > 5 separate critics name the same load-bearing concern that the playbook doesn't have a prepared response for. If any condition fires, the founder pauses 1 hour, consults the playbook + this FR's §10 failure modes, and either continues with a revised approach OR delays follow-on launch actions (FR-LAUNCH-002 cross-posts + FR-LAUNCH-003 Product Hunt).
10. **MUST** track every critical/substantive comment + the founder's response + the outcome in `docs/launch/post-hn-feedback.md` (created post-launch). The tracking file is the audit trail for what the community said and how it was engaged. Patterns surfacing in the tracking file feed FR-CONTENT-001 (P2 weekly deep-dives) — the most-asked criticisms become the most-valuable deep-dive topics.
11. **MUST** update `dsaf.dev/blog/launch-2026.md` ChangeLog with the HN discussion URL within 24 hours of posting (per FR-DOCS-003 §1 #15 forward-only edit discipline). The "Try it" section's `[Show HN discussion](https://news.ycombinator.com/item?id=PLACEHOLDER)` placeholder gets the real URL.
12. **MUST** verify all upstream URLs resolve before posting. At T-15 minutes from posting: `curl -sI` against `dsaf.dev/`, `dsaf.dev/card`, `dsaf.dev/blog/launch-2026`, `github.com/CyberSkill/design-system-audit-framework` — all MUST return HTTP 200. A broken link in the Show HN body or first comment is catastrophic (readers click, get 404, lose trust instantly).
13. **MUST** apply the FR-BRAND-002 handle taxonomy throughout the post + first comment + all responses. `DSAF` short handle (90%+ of mentions); `Design System Audit Framework` long name once in the body at first mention; no `Framework` noun-handle.
14. **MUST NOT** use phrases the plan §"What NOT to do" item 9 implicitly forbids: "Well actually...", "You don't understand...", "That's not what we meant...", "If you read the docs you'd see...". These are the patterns that triggered the Brad Frost / DHH / other founder-roast cycles on HN. The playbook in §3 has approved alternatives.
15. **MUST NOT** post Show HN until all of FR-DOCS-001 (README rewrite), FR-DOCS-002 (endorsement quotes), and FR-DOCS-003 (launch blog post) are at `status: accepted (10/10)`. The dependency chain is the gate; deviating means launching with placeholder text visible in the surfaces the HN reader will visit.

---

## §2 — Why this design

**Why the verbatim title formula (§1 #1):** the plan §Phase 1 action 1 researched the title and the verbatim is the contract. Customising the title (adding "for engineering teams" or removing "agent-native") loses signal. The four token clusters — "Show HN: DSAF," "open-source maturity framework for design systems," "L0–L5," "125 criteria, agent-native" — each carry specific reader-attention value: HN ritual (Show HN), category claim (maturity framework), differentiator-from-checklists (L0-L5), depth + uniqueness (125 + agent-native). Reordering or substituting weakens all four.

**Why Tue-Wed 8-10am PT (§1 #2):** HN front-page traffic peaks Tuesday-Wednesday morning Pacific (when US/EU developers are starting their day). Mon is bottom-quartile (post-weekend pile of submissions; less HN attention). Thu-Fri is acceptable but slightly worse. Weekends have different demographics (more hobbyist, less enterprise-budget readers). The 8-10am PT window catches both EU late-morning (5-7pm CET) and US west-coast early-morning developers in one wave.

**Why 30-minute SLA for the first 4 hours (§1 #5):** HN front page is volatile in the first 4 hours. A submission with no founder responses to comments slides off the front page; a submission with active founder engagement holds position. Plan §Phase 1 mitigation specifies "engage every critical comment within 30 minutes of posting" — that's the operational target. The 90-minute SLA for next 8 hours + 4-hour SLA through hour 24 is the calibrated decay matching HN's attention curve.

**Why a published kill-switch (§1 #9):** the launch surface is high-stakes and the founder may not be in a great state-of-mind under pressure (it's 11pm-1am local time, the thread is moving fast, critical comments arrive). Pre-publishing the kill-switch conditions means the response to "should I pause and think" is not a judgement-under-pressure call — it's a checklist match. Published kill-switches are how seasoned founders avoid panic-responding their way into worse outcomes.

**Why no vote/comment coordination (§1 #7, #8):** HN's anti-manipulation detection is extensive and active. Caught manipulators don't just have their launch flagged — they get HN-banned (account + IP), which for a founder building a public-facing brand is multi-year damage. The plan's "Personal outreach to 10 named individuals before launch with a heads-up + a question (not a request to upvote)" (§Phase 1 action 4) is the *informational* outreach that's allowed; FR-LAUNCH-004 codifies it. Asking for upvotes is a different category.

**Why gracious engagement (§1 #6, #14):** plan §"What NOT to do" item 9 cites Brad Frost as the model — "has been roasted on HN for atomic design and the equity survived precisely because he engaged graciously." The opposite case is also instructive: founders who responded defensively to critique on launch threads (numerous examples) typically saw their launches die in the first 12 hours. Gracious + substantive engagement *converts* critics into curious-readers; defensive engagement *amplifies* critique into dogpile.

**Why pre-launch URL verification (§1 #12):** a 404 in the Show HN body is the catastrophic failure that's also the most-predictable. Cloudflare Pages occasionally has propagation delays; DNS-cache misses happen at edge POPs; a CMS publishing error leaves a slug 404 silently. T-15 minutes verification catches all three classes. The 15 minutes is short enough that the launch window doesn't slip but long enough to fix a discovered issue.

**Why the dependency-chain gate (§1 #15):** the upstream FRs ship the surfaces that HN readers visit (README per FR-DOCS-001, endorsement quotes per FR-DOCS-002, blog post per FR-DOCS-003). Launching before any of them is at `accepted (10/10)` means HN readers see placeholder text — exactly the brand failure that the entire P0 hardening was designed to avoid. The dependency chain is the structural gate.

**Why the tracking file feeds FR-CONTENT-001 (§1 #10):** the most-asked criticisms in the Show HN thread become the most-valuable P2 deep-dive topics. A critic asking "how does DSAF handle accessibility under WCAG 3.0?" identifies the weekly deep-dive that will draw search traffic post-launch. The HN thread is a free market-research signal; capturing it systematically pays back for months.

---

## §3 — Doctrine contract

### `docs/launch/show-hn-post.md` — the canonical post

```markdown
---
title: "Show HN: DSAF – open-source maturity framework for design systems (L0–L5, 125 criteria, agent-native)"
url: https://github.com/CyberSkill/design-system-audit-framework
scheduled_window: Tuesday or Wednesday 8-10am PT (week of [DATE])
posted_at: PLACEHOLDER  # filled at submission time
hn_thread_url: PLACEHOLDER  # filled at submission time
---

## Show HN title (verbatim)

```
Show HN: DSAF – open-source maturity framework for design systems (L0–L5, 125 criteria, agent-native)
```

## Show HN body (≤ 1,000 chars)

```
DSAF is the open-source design system maturity framework I've been wanting for 3 years.

Most maturity content in design systems is blog posts (Big Medium, Sparkbox, Brad Frost). The few that aren't are SaaS-gated (zeroheight, Knapsack, Supernova). Brad Frost's frontend-guidelines-questionnaire is the closest GitHub-native, but it's a one-page checklist.

DSAF is 125 criteria across 20 categories, mapped to a six-tier scale (L0 Initial → L5 Optimised), with SCAN + FIX audit modes, shipping scripts, and LLM-agent integration.

5-minute entry: https://dsaf.dev/card (DSAF-25 Core, one page)
Repo: https://github.com/CyberSkill/design-system-audit-framework
Origin story + candid limitations: https://dsaf.dev/blog/launch-2026

I'm Stephen Cheng (CyberSkill). Would value your roast — I've documented what I think is broken about it; happy to take more.
```

(Character count: ~830 chars — within HN's typical 1,000-char body cap.)

## Show HN URL field

```
https://github.com/CyberSkill/design-system-audit-framework
```

(NOT the dsaf.dev URL — HN convention is to point the URL field at the canonical project/repo, not the marketing landing. The dsaf.dev links go in the body.)

## Founder's first comment (posted ≤ 5 min after submission)

```
Founder here. A few things that didn't fit in the body:

- The L0-L5 ladder visual: https://dsaf.dev/assets/dsaf-l0-l5-ladder.svg (this is the ~one screenshot that summarises the framework)
- Named endorsements: https://github.com/CyberSkill/design-system-audit-framework#endorsements (Nathan Curtis + Sil Bormüller)
- Worked example (CyberSkill's own design system, capped at L3 publicly): https://github.com/CyberSkill/design-system-audit-framework/tree/main/examples/cyberskill-design-system

The candid limitations section in the blog post (https://dsaf.dev/blog/launch-2026) is the place I'd most want feedback. The "geography headwind" item in particular is something I've thought about a lot but I'm sure I'm missing angles.

Roasts welcome. AMA.
```

## Pre-launch verification checklist (T-15 min)

```bash
# All upstream URLs MUST return HTTP 200 before posting:
for url in \
    https://dsaf.dev/ \
    https://dsaf.dev/card \
    https://dsaf.dev/blog/launch-2026 \
    https://github.com/CyberSkill/design-system-audit-framework \
    https://github.com/CyberSkill/design-system-audit-framework#endorsements; do
  status=$(curl -sI "${url}" | head -1 | awk '{print $2}')
  echo "${url}: ${status}"
  [ "${status}" = "200" ] || echo "FAIL: ${url} returned ${status}"
done

# OG image renders cleanly on the canonical post URL:
curl -s https://dsaf.dev/blog/launch-2026 | grep -o 'og:image[^>]*' | head -1
# Visit https://cards-dev.twitter.com/validator and paste dsaf.dev/blog/launch-2026
# Verify Twitter card renders with title + image + description
```

## Post-launch updates (T+24h)

- Update `dsaf.dev/blog/launch-2026.md` ChangeLog with HN discussion URL.
- Replace `[Show HN discussion](https://news.ycombinator.com/item?id=PLACEHOLDER)` in the "Try it" section with the real URL.
- Create `docs/launch/post-hn-feedback.md` tracking file (per FR-LAUNCH-001 §1 #10).
- If FR-LAUNCH-002 cross-posts haven't started yet, schedule them for T+4h to T+12h after Show HN (per FR-LAUNCH-002 sequencing).
```

### `docs/launch/show-hn-response-playbook.md` — the response operations doc

```markdown
---
title: "Show HN response playbook"
ratified_by: FR-LAUNCH-001 (2026-05-17)
---

# Show HN response playbook

This file is the operations manual for the first 24 hours after the Show HN submission. The founder runs against it during the launch window.

## Response SLA

| Time window | SLA | Notes |
|---|---|---|
| 0-4 hours post-submission | 30 minutes per critical/substantive comment | Most volatile; HN front-page positioning depends on engagement velocity |
| 4-12 hours post-submission | 90 minutes per critical/substantive comment | Front-page positioning stable; engagement matters but less time-sensitive |
| 12-24 hours post-submission | 4 hours per critical/substantive comment | Thread settles into long-tail engagement |
| 24+ hours post-submission | "as available" per normal community-engagement | Thread is historical; respond as time permits |

**What counts as "critical/substantive":**

- Any comment with a load-bearing question about DSAF's substance (a criterion, a methodology choice, a comparison to another framework)
- Any comment naming a real or perceived limitation
- Any comment with a code-review-style critique of the rubric or the worked example
- Any comment from a recognised design-systems community member
- Any top-level comment (HN's tree-structure means top-level visibility is highest)

**What does NOT need a 30-minute response:**

- Comments adjacent to but not about DSAF (general design-systems banter, off-topic philosophy)
- Comments asking for clarifications that are answered in the linked materials (politely redirect)
- Comments that are clearly trolling or in bad faith (do NOT engage; HN community usually handles)
- Existing-comment-replies that don't tag the founder

## Response templates (the patterns to USE)

### Pattern 1: critic surfaces a real limitation that's already in "What we got wrong"

> Yep — that's #N in the candid limitations post (https://dsaf.dev/blog/launch-2026#what-we-got-wrong). The countermove is [briefly]. Your point about [specific] is a sharper version of how I've been thinking about it; if you have time to elaborate either here or via email (hello@dsaf.dev), I'd genuinely value the further read.

### Pattern 2: critic surfaces a real limitation that's NOT in "What we got wrong"

> That's fair, and it's not in the candid-limitations section — which is itself a tell. I'll add it. Quick first read: [substantive response, 2-3 sentences]. Longer thought needed; will follow up in the thread once I've thought about it properly.

### Pattern 3: critic disagrees with a methodology choice

> I think there's a reasonable case both ways. Here's how we got to the current call: [the actual reasoning, 2-3 sentences]. Your alternative is genuinely valid — the criterion isn't load-bearing on the choice. If you wanted to push for the other direction in a future RFC (we're starting an RFC cycle at P6), we'd take it seriously.

### Pattern 4: someone asks "how is this different from [SaaS competitor]?"

> The README + blog post both cover this, but the short version: [SaaS competitor] is closed-source SaaS at $X/year; DSAF is OSS markdown you can fork. [SaaS competitor]'s rubric isn't publicly inspectable; DSAF's is at `docs/03-criteria-part-a.md`. The use cases overlap maybe 60% — if you need workflow + governance + SSO, [SaaS competitor] is right; if you need a rubric you can run quarterly without a vendor in the loop, DSAF is right. Genuine respect for [SaaS competitor].

### Pattern 5: someone asks "why should I care about this if I'm not a design-systems person?"

> Honest answer: probably you shouldn't. DSAF is for teams that have a design system AND want to assess its maturity — a small slice of the dev world. If you're not in that slice, the framework's interesting only as a methodology artefact (how you build criteria-graded maturity frameworks). The methodology bits are in `docs/02-framework.md` if you're curious; otherwise skip.

### Pattern 6: someone identifies as "from [Vietnam / Asia / non-Western context]" and engages

> Hey — thanks for the read. Anything in the framework that doesn't land for [your context]? The geography-headwind discussion in the blog post is mostly framed from the Western-buyer perspective; if there are angles I'm missing from the other side, would genuinely value the input. (Email's hello@dsaf.dev if easier than the thread.)

### Pattern 7: someone tags @brad-frost or another design-systems-community member

> [Don't tag in response to a tag-in. If Brad Frost or another community member shows up in the thread organically, engage substantively per their comment's content — but don't escalate the tag.]

### Pattern 8: hostile comment with no substance

> [Do NOT engage. HN community usually downvotes these; engaging gives them visibility. Exception: if a hostile comment has enough upvotes to dominate the thread, address the *substantive* concern underneath (every hostile comment has a substantive concern; surface it and respond to the concern, not the tone).]

## Response anti-patterns (the patterns to AVOID)

| Anti-pattern | Why it fails | Use instead |
|---|---|---|
| "Well actually..." | Reads as condescending; HN community downvotes | "That's fair — here's how we got there..." |
| "You're wrong because..." | Defensive; escalates | "I think there's a reasonable case both ways..." |
| "If you read the docs..." | Tells the reader they didn't do their homework; alienating | "The README covers this but the short version is..." |
| "We're a small team..." | Begging; reduces credibility | (drop the sentence entirely; engage with the substance) |
| "Thanks for the feedback!" + no substance | Dismissive; reader feels not-heard | Always include a substantive response, even if 1-sentence |
| Long defensive paragraph | Reads as cope | 2-3 sentence response with a link to long-form |
| Responding to every reply in a thread | Looks needy; saturates the thread | Respond to the most-substantive comments per the SLA; let community engage with secondary points |
| Responding past 24h with high volume | The thread's settled; high-volume re-engagement looks weird | "As available" cadence after 24h |

## Kill-switch conditions

If ANY of the following fires, PAUSE the launch and consult this playbook before continuing:

1. **A critical comment surfaces a factual error in DSAF that you didn't know about.**
   Pause action: don't respond immediately. Take 15 minutes to verify the claim. If verified, acknowledge gracefully + add to ChangeLog. If not verified, respond with the substantive counter.

2. **A critical comment surfaces a TOS, legal, or compliance concern (WCAG misrepresentation, license issue, trademark issue).**
   Pause action: don't respond. Take 1 hour to consult with the relevant legal mental-model (or external counsel if available). Respond with calibrated acknowledgement, not defensive denial.

3. **A comment from one of the FR-GOV-001 reviewers retracts their endorsement** (signal: explicit "I want my quote removed" OR significant tone-shift suggesting they regret the endorsement).
   Pause action: contact the reviewer directly (per FR-GOV-001 §3 consent letter terms). Remove the quote from the README within 7 days per consent letter. Do NOT respond to the public thread about the retraction without the reviewer's input.

4. **> 5 separate critics name the same load-bearing concern that the playbook doesn't have a prepared response for.**
   Pause action: take 1 hour. Read the cluster of comments carefully. Draft a substantive response that engages the concern directly. Post the response as a single top-level reply rather than 5 individual responses.

5. **The Show HN submission gets flagged or moderated by HN admins.**
   Pause action: don't argue with mods. Read the flag reason; comply. If unclear, email hn@ycombinator.com politely. The HN community's norms are the gate; the framework doesn't get an exception.

6. **The founder's mental state degrades** (signal: typing draft responses that violate the anti-patterns above; feeling defensive; wanting to "win" the thread).
   Pause action: step away for 30-60 minutes. The thread will be there when you return. A bad response damages more than no response.

## Tracking file

Create `docs/launch/post-hn-feedback.md` post-launch with the following template, and fill it as the thread progresses:

```markdown
# Post-HN feedback tracking

**Show HN URL:** [filled at posting]
**Submitted at:** [filled at posting]

## Critical/substantive comments

| # | Comment summary | Founder's response | Outcome | Feeds into |
|---|---|---|---|---|
| 1 | [summary] | [link to founder's HN reply] | [resolved / pending / kill-switch fired] | [FR-CONTENT-001 deep-dive candidate / ChangeLog entry / known-limitation / etc.] |
| ... |

## Patterns

- Top concerns (by mention count):
  1. [concern X mentioned by N people] — feeds [FR-CONTENT-001 deep-dive in week M]
  2. ...

## Endorsement / community reactions

- Notable positive engagement: [list]
- Notable critical engagement: [list]

## ChangeLog entries triggered

- [list of changelog updates to dsaf.dev/blog/launch-2026.md or other surfaces]
```
```

### `dsaf.dev/blog/launch-2026.md` — ChangeLog update (post-launch)

Per FR-DOCS-003 §1 #15 forward-only edit discipline, the ChangeLog gets a new entry within 24 hours of Show HN submission:

```markdown
| Date | Change |
|---|---|
| 2026-MM-DD | Initial publication |
| 2026-MM-DD | Show HN submitted: [discussion thread](https://news.ycombinator.com/item?id=NNNNNN). |
```

The "Try it" section's placeholder also updates:

**Before:**

```markdown
- **[Show HN discussion](https://news.ycombinator.com/item?id=PLACEHOLDER)** — link added post-launch
```

**After (post-launch):**

```markdown
- **[Show HN discussion](https://news.ycombinator.com/item?id=NNNNNN)** — engaged thread; 30/90/240 SLA per playbook
```

---

## §4 — Acceptance criteria

1. **show-hn-post.md committed** — `docs/launch/show-hn-post.md` exists with the title + body + URL field + founder's first comment + pre-launch checklist per §3.
2. **show-hn-response-playbook.md committed** — `docs/launch/show-hn-response-playbook.md` exists with: SLA table, ≥ 6 response patterns, ≥ 6 anti-patterns, ≥ 6 kill-switch conditions, tracking file template.
3. **Title verbatim** — `docs/launch/show-hn-post.md` contains the title `Show HN: DSAF – open-source maturity framework for design systems (L0–L5, 125 criteria, agent-native)` byte-identical (verified via `grep -F`).
4. **Body ≤ 1,000 chars** — `awk` extracts the "Show HN body" code block from `show-hn-post.md`; character count is ≤ 1,000.
5. **Three primary links in body** — body contains exactly these 3 URLs: `dsaf.dev/card`, `github.com/CyberSkill/design-system-audit-framework`, `dsaf.dev/blog/launch-2026`. No other primary links.
6. **URL field is GitHub repo, not dsaf.dev** — `show-hn-post.md` "Show HN URL field" section is `https://github.com/CyberSkill/design-system-audit-framework`, NOT a dsaf.dev URL.
7. **Founder's first comment ≤ 5-min post-submission scheduled** — playbook documents the founder posts the first comment within 5 minutes of HN submission. PR description includes the comment text and timing-commitment.
8. **Pre-launch URL verification documented** — `docs/launch/show-hn-post.md` has the T-15-min curl verification block per §3.
9. **SLA matrix has 4 windows** — `docs/launch/show-hn-response-playbook.md` SLA table has rows for 0-4h, 4-12h, 12-24h, 24+h.
10. **6 response patterns documented** — `grep -cE '^### Pattern [0-9]:' docs/launch/show-hn-response-playbook.md` ≥ 6.
11. **6 anti-patterns documented** — `docs/launch/show-hn-response-playbook.md` "Response anti-patterns" table has ≥ 6 rows.
12. **6 kill-switch conditions** — `grep -cE '^[0-9]+\. \*\*' docs/launch/show-hn-response-playbook.md` (in the kill-switch section) ≥ 6.
13. **No vote-manipulation language** — `grep -ciE 'upvote|please upvote|ask.*upvote' docs/launch/show-hn-post.md docs/launch/show-hn-response-playbook.md` returns 0.
14. **Founder name + handle** — first comment contains the founder's name ("Stephen Cheng") and "CyberSkill" mention.
15. **Posting window documented** — `docs/launch/show-hn-post.md` frontmatter `scheduled_window` field is in Tuesday-Wednesday 8-10am PT window.
16. **Tracking file template present** — `docs/launch/show-hn-response-playbook.md` "Tracking file" section provides the template for `post-hn-feedback.md`.
17. **Dependency chain enforced** — `docs/launch/show-hn-post.md` pre-launch checklist includes verifying that FR-DOCS-001 + FR-DOCS-002 + FR-DOCS-003 are all at `accepted (10/10)` before posting.
18. **All upstream URLs documented in verification block** — pre-launch verification includes `dsaf.dev/`, `dsaf.dev/card`, `dsaf.dev/blog/launch-2026`, GitHub repo URL.
19. **PR description includes scheduled posting date/time** — the PR description names the specific Tuesday or Wednesday 8-10am PT slot for the post.

---

## §5 — Verification

```bash
# AC1, AC2 — files committed
test -f docs/launch/show-hn-post.md
test -f docs/launch/show-hn-response-playbook.md

# AC3 — title verbatim
grep -qF 'Show HN: DSAF – open-source maturity framework for design systems (L0–L5, 125 criteria, agent-native)' docs/launch/show-hn-post.md

# AC4 — body ≤ 1,000 chars
awk '/^## Show HN body/{flag=1; next} /^## /{flag=0} flag' docs/launch/show-hn-post.md | \
  tr -d '\n' | wc -c
# expected: ≤ 1000

# AC5 — 3 primary links in body
awk '/^## Show HN body/{flag=1; next} /^## /{flag=0} flag' docs/launch/show-hn-post.md | \
  grep -oE 'https?://[^ )"]+' | sort -u | wc -l
# expected: exactly 3

# AC6 — URL field is GitHub
grep -A 2 '^## Show HN URL field' docs/launch/show-hn-post.md | grep 'github.com/CyberSkill/design-system-audit-framework'

# AC8 — pre-launch verification block
grep -q 'curl -sI' docs/launch/show-hn-post.md
grep -q 'dsaf.dev/card' docs/launch/show-hn-post.md

# AC9 — SLA matrix 4 windows
awk '/## Response SLA/,/## Response templates/' docs/launch/show-hn-response-playbook.md | \
  grep -cE '^\| [0-9]'
# expected: ≥ 4

# AC10 — 6 response patterns
grep -cE '^### Pattern [0-9]+:' docs/launch/show-hn-response-playbook.md
# expected: ≥ 6

# AC11 — 6 anti-patterns
awk '/## Response anti-patterns/,/## Kill-switch/' docs/launch/show-hn-response-playbook.md | \
  grep -cE '^\| "'
# expected: ≥ 6

# AC12 — 6 kill-switch conditions
awk '/## Kill-switch conditions/,/## Tracking file/' docs/launch/show-hn-response-playbook.md | \
  grep -cE '^[0-9]+\. \*\*'
# expected: ≥ 6

# AC13 — no vote-manipulation language
grep -ciE 'upvote|please upvote|ask.*upvote' docs/launch/show-hn-post.md docs/launch/show-hn-response-playbook.md
# expected: 0

# AC14 — founder name + handle
grep -q 'Stephen Cheng' docs/launch/show-hn-post.md
grep -q 'CyberSkill' docs/launch/show-hn-post.md

# AC15 — posting window
grep -E 'Tuesday|Wednesday' docs/launch/show-hn-post.md | grep -E '8|9|10' | grep -i 'pt\|pacific'

# AC16 — tracking file template
grep -q '## Tracking file' docs/launch/show-hn-response-playbook.md
grep -q 'docs/launch/post-hn-feedback.md' docs/launch/show-hn-response-playbook.md

# AC17 — dependency chain in pre-launch checklist
grep -E 'FR-DOCS-001|FR-DOCS-002|FR-DOCS-003' docs/launch/show-hn-post.md
```

Human-verified ACs (no script):

- **AC7** — reviewer reads PR description for the founder's first-comment text + 5-min commitment.
- **AC18** — reviewer reads the verification block per §3 for all four upstream URLs.
- **AC19** — reviewer reads PR description for the scheduled posting date.

---

## §6 — Implementation skeleton

The operator playbook (6h, mostly elapsed-time):

1. **(30m) Author `docs/launch/show-hn-post.md`** per §3 — title, body, URL field, founder's first comment, pre-launch checklist.
2. **(1h) Author `docs/launch/show-hn-response-playbook.md`** per §3 — SLA, response patterns, anti-patterns, kill-switch conditions, tracking template.
3. **(15m at T-15min from posting) Pre-launch verification.** Run the curl block from `show-hn-post.md`. Verify all URLs return HTTP 200. Verify Twitter card validator shows correct unfurl on dsaf.dev/blog/launch-2026.
4. **(5m at posting time) Post Show HN.** Submit at news.ycombinator.com with the title + URL field + body verbatim from `show-hn-post.md`. Record the HN thread URL.
5. **(5m post-submission) Post founder's first comment.** Within 5 minutes of submission, paste the first comment from `show-hn-post.md`.
6. **(monitoring window — over 12 hours elapsed, ~3h founder-time)** Monitor thread. Respond per the SLA. Track each substantive comment in `docs/launch/post-hn-feedback.md`. If kill-switch fires, pause and consult the playbook.
7. **(15m at T+24h) Update ChangeLog + blog post.** Per FR-DOCS-003 §1 #15: add HN URL to `dsaf.dev/blog/launch-2026.md` ChangeLog; replace placeholder in "Try it" section.
8. **(15m at T+48h) Feed lessons learned.** Update FR-CONTENT-001 (P2 — placeholder, not yet specified) with the top concerns from `post-hn-feedback.md` as deep-dive candidates.

---

## §7 — Dependencies

- **Upstream (all required at `accepted (10/10)` before posting):**
  - **FR-DOCS-001** — README HN-rewrite must be live; HN reader's first click goes here.
  - **FR-DOCS-002** — endorsement quotes landed in README; HN reader sees named human attachment.
  - **FR-DOCS-003** — launch blog post live at dsaf.dev/blog/launch-2026; Show HN body links here.
- **Coordinated:**
  - **FR-CORE-001** (DSAF-25 Core) — body links to dsaf.dev/card.
  - **FR-CORE-004** (self-audit cap) — first comment frames worked example as L3.
  - **FR-BRAND-003** (visuals) — first comment links to L0-L5 ladder SVG.
  - **FR-LAUNCH-004** (T-7 days personal heads-up) — recipients are aware Show HN is coming; they're NOT asked to upvote.
- **Downstream blocks:**
  - **FR-LAUNCH-002** (cross-posts) — sequenced T+4h to T+12h after Show HN (Reddit / Lobste.rs / daily.dev / Designer News).
  - **FR-LAUNCH-003** (Product Hunt) — same launch week as Show HN but separately scheduled.
- **External:**
  - HN account (the founder's personal `@stephencheng` or `@zintaen` per `user_preferences` — `zintaen@gmail.com`).
  - Twitter card validator at `cards-dev.twitter.com/validator` for T-15 verification.

---

## §8 — Example payloads

### Example: a successful first-4-hour thread (illustrative)

```
T+0:  Show HN submitted
T+5:  Founder's first comment posted
T+18: Critic comment: "How is this different from zeroheight?" (substantive)
T+34: Founder response per Pattern 4 (4-min within SLA)
T+45: Critic comment: "125 criteria is a lot — too much?" (substantive)
T+60: Founder response per Pattern 1 (addresses #1 in candid limitations)
T+78: Critic comment: "Why publish this at L3 when your README says you score higher?" (kills-switch consideration: re item 1 or 2 below)
T+85: Founder pauses, verifies the framing is right (per FR-CORE-004 cap rule), responds per Pattern 1 (24min — slightly over 30-min SLA; flagged in tracking file)
T+102: Designer-community-recognised commenter @-mentions @nathan_curtis (FR-GOV-001 endorser)
T+105: Founder responds per Pattern 7 (does NOT escalate the tag; engages with the comment's substance)
T+180: Hostile comment: "Yet another OSS framework that'll be abandoned in 6 months" (no substance — Pattern 8)
T+182: Founder DOES NOT engage; community downvotes; thread moves on
T+240: 4-hour SLA window closes; founder transitions to 90-minute SLA
```

### Example: a kill-switch fire (illustrative)

```
T+95: Critic comment: "Your A8.6 rubric language for color contrast is wrong — APCA Lc 60 isn't the WCAG 3.0 requirement; the WCAG 3.0 Visual Contrast guidelines specify Lc 75 for body text under 24pt."

Founder's mental state at T+95: confused; this is an A.8.6 detail the founder isn't 100% on.

Action per kill-switch condition #1 (factual error surfaced):
- T+95 to T+110: 15-minute pause; verify the claim against WCAG 3.0 working draft.
- T+110: Verification — the critic is right; the framework's A.8.6 rubric is using outdated WCAG 3.0 language from 2024.
- T+115: Response per Pattern 2: "Verified — you're right; A.8.6's rubric is using 2024-era WCAG 3.0 language. Updating the criterion now. Will land via a P0-emergency follow-up FR + ChangeLog entry on the blog post. Thanks for the catch."
- T+120: Update tracking file: kill-switch fired; verified factual error; FR-CORE-005-emergency-a86-update created.
- Thread continues; the gracious-engagement turns a potential takedown into a confirming citation.
```

### Example: pre-launch curl verification output

```
$ for url in https://dsaf.dev/ https://dsaf.dev/card https://dsaf.dev/blog/launch-2026 https://github.com/CyberSkill/design-system-audit-framework; do
>   status=$(curl -sI "${url}" | head -1 | awk '{print $2}')
>   echo "${url}: ${status}"
> done

https://dsaf.dev/: 200
https://dsaf.dev/card: 200
https://dsaf.dev/blog/launch-2026: 200
https://github.com/CyberSkill/design-system-audit-framework: 200
```

All four 200s → launch proceeds. Any non-200 → block + investigate before posting.

---

## §9 — Open questions

All resolved at authoring time:

- **Q1: Show HN account — personal or organisational?** Resolved → personal. HN doesn't allow organisational accounts; even if it did, the plan §"What drives GitHub stars" item 4 ("a person attached to the work") implies founder-name attribution. The founder's account (`zintaen` per email) is the canonical.
- **Q2: Schedule via HN's "schedule" feature or post manually?** Resolved → manual. HN's submission flow is simple; the value of human-posting is being immediately available for the founder's first comment within 5 minutes.
- **Q3: What if Show HN gets few upvotes in the first hour?** Resolved → no recovery action mid-flight. HN's algorithm rewards organic velocity; trying to manipulate it (asking for upvotes, multi-posting) makes things worse. If the thread doesn't gain traction by T+4 hours, the launch is what it is; cross-posts (FR-LAUNCH-002) and Product Hunt (FR-LAUNCH-003) become more important.
- **Q4: Post on a holiday week?** Resolved → no. The Tuesday-Wednesday 8-10am PT window assumes a normal working week; holiday weeks (Thanksgiving US, between-Christmas-and-NewYear, etc.) shift HN demographics unpredictably. The scheduling PR description names a specific week.
- **Q5: What if HN flags the post for "consultancy promoting their product"?** Resolved → the framework is OSS + the dsaf.dev surface is decoupled from audit.cyberskill.world; HN's policy is fine with OSS-with-consultancy-backing as long as the OSS is real. If flagged, engage HN mods politely + reference the decoupling. The decoupling itself is the structural answer.
- **Q6: Should we coordinate with FR-LAUNCH-002 cross-posts to fire simultaneously?** Resolved → no. Sequenced. Show HN first; cross-posts at T+4h to T+12h once Show HN trajectory is visible. FR-LAUNCH-002 §3 sequencing handles this.
- **Q7: Founder's first comment — separate or merged with body?** Resolved → separate. HN body has a ~1,000 char cap; the first comment provides extended context (the visual link, the endorsement link, the worked-example link). Splitting body + first-comment is the HN convention.

---

## §10 — Failure modes inventory

| Failure | Detection | Outcome | Recovery |
|---|---|---|---|
| Show HN posted before FR-DOCS-001/002/003 at 10/10 | dependency chain audit fails | HN readers see placeholder text on linked pages | DELAY the post; ship the missing FRs first |
| URL in body returns 404 | pre-launch verification missed | HN reader clicks link, gets 404, loses trust | Catastrophic — fix the broken link before next launch attempt; do NOT remove and re-submit |
| OG image / Twitter card doesn't unfurl | T-15 Twitter validator missed | Social shares look bare | Pre-validate at T-24h via Twitter card validator; if fails, fix og:image URL before posting |
| Vote manipulation detected by HN | flag email | Account banned + launch dead | Vote-manipulation is forbidden in this FR; if accidentally violated (e.g., a heads-up recipient went too far), apologise to HN mods immediately + document for future operations |
| Critical comment in first hour with no founder response | 30-min SLA exceeded | Thread engagement velocity drops | Always have the playbook open; respond per templates within SLA; if the founder is unavailable, the post was scheduled wrong (per §1 #2) |
| Founder responds defensively ("Well actually...") | reviewer post-launch | Reputational damage | Anti-patterns table prevents at draft-time; if it happens live, edit the comment + apologise in a follow-up |
| Astroturf comments from well-meaning supporter | HN flag-detection | Could associate launch with manipulation | FR-LAUNCH-004 informational outreach explicitly says "not a request to upvote/comment"; if a supporter posts and it looks coordinated, the founder publicly distances ("I appreciate the support but please vote/comment based on the substance only") |
| Kill-switch fires but founder doesn't notice or doesn't pause | tracking-file gap | Bad response damages launch | Pre-publish the kill-switch (§1 #9); founder reads the playbook before posting; reviewer who's not the founder also monitors the first 4 hours and pings the founder if a kill-switch trigger appears |
| Thread succeeds wildly but founder underprepared for the volume | exhaustion at T+8h | Quality of responses degrades | Engage with critical/substantive (per SLA); let community engage secondary; do NOT try to respond to every comment |
| Time-zone confusion (founder in Vietnam, PT scheduled) | scheduling error | Post lands at wrong time | The §3 frontmatter `scheduled_window` field is explicit (Tuesday/Wednesday 8-10am PT); the founder converts to local at scheduling time and sets phone alarms |
| HN downranks for unspecified reason | post slides off front page | Trajectory dies | No recovery action; HN's algorithm is what it is. Move attention to FR-LAUNCH-002 / FR-LAUNCH-003 for visibility recovery |
| Endorsement-quote reviewer retracts publicly during thread | tracking-file event | Trust crisis | Kill-switch condition #3 applies; engage reviewer privately per FR-GOV-001 consent letter terms; remove quote within 7 days; do NOT respond publicly on HN about the retraction beyond minimal acknowledgment |
| Thread becomes a venue for unrelated grievance ("Why are you in Vietnam?" / "Why does CyberSkill X?") | comment pattern shift | Off-topic drift dilutes the framework's signal | Engage briefly + redirect ("Thanks; the framework's at github.com/... — happy to discuss DSAF specifics") |

---

## §11 — Implementation notes

- **The 30-minute SLA is the single most-important operational discipline.** A founder who's at 30-minute response cadence in the first 4 hours has *visible engagement* on the thread; HN's algorithm rewards engagement velocity. A founder who responds at 2-hour cadence has comments piling up unanswered; the thread loses momentum and slides off the front page. The cost (4 hours of focused founder time) is trivial; the value is the launch trajectory ceiling.
- **About the founder's local time (Vietnam UTC+7):** 8-10am PT = 11pm-1am local. This is a deliberate inconvenience the founder takes on for the launch. The alternative — posting at a window convenient to the founder's local time — costs trajectory. Plan for the 11pm-1am-into-next-morning window: clear the calendar for 8 hours, have caffeine, have the playbook open, monitor on phone if needed.
- **The kill-switch is the operational safety net, not a panic button.** Most launches don't fire any kill-switch condition. Pre-publishing them is the discipline that prevents under-pressure judgement calls; if conditions fire, the response is *consult-the-playbook*, not *figure-it-out-now*.
- **About FR-LAUNCH-004 coordination (informational outreach):** the FR-LAUNCH-004 heads-up email lands at T-7 days saying "DSAF is launching on Show HN next Tuesday; here's the link; not asking for anything." Recipients who care will be subscribed to relevant feeds; the heads-up is *courtesy*, not orchestration. Asking for upvotes via that channel violates HN ToS and is forbidden by this FR.
- **About FR-LAUNCH-002 timing (T+4h to T+12h):** the cross-posts come AFTER the Show HN trajectory is visible. Posting them simultaneously dilutes attention; posting them too late means the framework's day-of-launch buzz has faded. The 4-12-hour window is the sweet spot.
- **About the founder's first comment:** the comment serves three roles: (a) opens the thread for engagement, (b) provides extended context the body can't fit, (c) makes the founder identifiable + reachable. The "AMA" framing at the end is HN-cultural; readers expect the founder to be present.
- **About response patterns 7 + 8 (don't tag back; don't engage no-substance hostility):** these are the two patterns where new founders go wrong. Tagging back at Brad Frost looks needy; engaging hostile comments amplifies them. The discipline is community-norm; HN's downvote culture handles low-substance hostility without founder intervention.
- **The tracking file (`post-hn-feedback.md`) is the launch's institutional memory.** Every critic comment + founder response + outcome gets logged; the patterns surfacing in the file become the next 12 weeks of FR-CONTENT-001 deep-dive topics. A founder who skips the tracking loses the market-research signal.
- **About the "12-hour active monitoring window":** after 12 hours, the thread is mostly settled. Front-page positioning has stabilised; the comment stream is long-tail. The founder MAY transition to 4-hour-SLA cadence and step away for breaks. 24-hour-old threads are historical; the engagement curve has effectively closed.

---

*End of FR-LAUNCH-001.*
