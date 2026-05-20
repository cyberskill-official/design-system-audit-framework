---
id: FR-LAUNCH-004
title: "Personal heads-up outreach to 10 named individuals 1 week pre-launch — informational only, not vote-asking"
module: LAUNCH
priority: MUST
status: done
verify: I
phase: P1
milestone: P1 · slice 1 · Launch
slice: 1
owner: Stephen Cheng (Founder)
created: 2026-05-17
shipped: 2026-05-18
related_frs: [FR-GOV-001, FR-LAUNCH-001, FR-LAUNCH-002, FR-LAUNCH-003, FR-CONTENT-003, FR-AUDIT-001]
depends_on: [FR-LAUNCH-001, FR-DOCS-003, FR-GOV-001]
blocks: []
source_pages:
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Phase 1 — Launch action 4 — 'Personal outreach to 10 named individuals before launch with a heads-up + a question (not a request to upvote)')"
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Design systems community signal map — named individuals)"
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§What NOT to do item 9 — gracious engagement)"
source_decisions:
  - "DEC-046: T-7 day heads-up outreach is DISTINCT from FR-GOV-001's T-14 to T-28 day endorsement outreach (different ask, different timing)"
  - "DEC-047: heads-up is informational ('DSAF launches Tuesday on Show HN; FYI') + a question ('one thing you've recently thought about in DS audits?'), NOT a request to upvote / share / comment"
  - "DEC-048: same 10-person shortlist as FR-GOV-001, BUT outreach status is independent — some reviewers may have done endorsement-quote outreach and not heads-up, or vice versa"
language: markdown + ops
service: doctrine + outreach ops
new_files:
  - docs/launch/headsup-outreach.md   # playbook + email template + tracking
modified_files:
  - docs/branding/reviewer-shortlist.md   # add a 'heads-up status' column distinct from 'outreach status'
allowed_tools:
  - "file_read/write docs/launch/**, docs/branding/**"
  - "personal email composition (the outreach happens via founder's email; not in scope for the agent)"
  - "MEMORY.md updates per reviewer relationship state"
disallowed_tools:
  - "ask anyone to upvote on Show HN, Product Hunt, Reddit, Lobste.rs, daily.dev, Designer News, or any other platform — vote manipulation forbidden everywhere"
  - "ask anyone to post supportive comments — astroturfing forbidden everywhere"
  - "send heads-up before T-7 days (too early; recipient forgets) or after T-2 days (too late; recipient doesn't have time to engage if interested)"
  - "use a mass-blast email with <Name> placeholders — each heads-up is personalised"
  - "promise an in-person meeting / call / followup as part of the heads-up (out of scope; FR-GOV-002 P2 handles deeper relationship moves)"
effort_hours: 5
sub_tasks:
  - "1. (30m) Author docs/launch/headsup-outreach.md per §3 — email template + per-reviewer personalisation guidance + tracking format"
  - "2. (15m) Cross-reference docs/branding/reviewer-shortlist.md (FR-GOV-001's shortlist); identify the 10 individuals; note any whose endorsement outreach already happened (no double-ask needed)"
  - "3. (2h, ~T-7 to T-5 days) Send 10 personalised heads-up emails per §3 template; 5-min personalisation per email"
  - "4. (~elapsed 3-5 days, ~30m founder-time) Respond to replies; respect declines + non-responses; do NOT chase beyond one polite follow-up"
  - "5. (30m post-launch +24h) Update MEMORY.md per reviewer relationship state (heads-up sent; reply status; future-outreach guidance)"
  - "6. (15m post-launch +48h) Surface any substantive feedback from heads-up replies to FR-CONTENT-001 deep-dive candidates"
risk_if_skipped: "Plan §Phase 1 action 4 names this as a substantive launch-prep step: 'Personal outreach to 10 named individuals before launch with a heads-up + a question (not a request to upvote)'. The named individuals are the highest-leverage observers of the launch — they're the ones whose own writing / podcasting / conference talks will surface DSAF post-launch if it resonates with them. Skipping this FR means those individuals see DSAF for the first time on Show HN alongside thousands of other readers (low-attention surface); a personal heads-up at T-7 days gives them 7 days of context before the public surface, raising the odds they engage meaningfully when the launch goes live. The outreach is also the operational structure that prevents Astroturfing (each person's note explicitly says 'not asking you to upvote'); without the structured outreach, well-meaning supporters might independently coordinate in ways that look like manipulation. Plan §'What drives GitHub stars' item 4 ('a person attached to the work') compounds this — recipients of the heads-up frequently mention the launch to their own communities, which is the personal-network amplification the framework relies on for the 300-700-stars-in-launch-week target."
---

## §1 — Description (BCP-14 normative)

The framework's launch MUST include personal heads-up outreach to 10 named individuals at T-7 days (target window T-7 to T-5 days pre-launch). The outreach is **informational** — it tells the recipient that DSAF is launching on Show HN + Product Hunt + cross-posts on [DATE], links them the materials, and asks one substantive question. The outreach is explicitly NOT a request to upvote, share, comment, or amplify; vote-manipulation is forbidden across all FR-LAUNCH-* FRs uniformly.

**2026-05-18 implementation note:** the heads-up tracker is repo-shipped in `docs/launch/headsup-outreach.md`, with the ten named recipients, concrete May 2026 timing, response modes, and manual-send guardrails. Full per-recipient drafts are in `docs/social/personal-outreach.md`. The original T-7 window for a May 19 Show HN slot is already missed, so manual sending is blocked until the launch date rolls forward or Stephen accepts a late-send exception.

1. **MUST** send personal heads-up emails to 10 named individuals at T-7 days from FR-LAUNCH-001 Show HN posting date. The 10 are drawn from FR-GOV-001's shortlist (`docs/branding/reviewer-shortlist.md`) but the heads-up status is *independent* of endorsement-outreach status — a reviewer may have done endorsement outreach and now also gets heads-up (one personalised note covers both), OR a reviewer may have been skipped for endorsement outreach (e.g., not warm enough) but is still in scope for heads-up.
2. **MUST** frame each email per §3 template: (a) subject line names DSAF + "heads-up" framing; (b) opens with personalised context (one sentence tied to the recipient's recent work / interest / public commentary); (c) provides the launch date + canonical URLs (dsaf.dev/card + repo + blog post + planned Show HN URL); (d) asks one substantive question relevant to the recipient's expertise; (e) explicitly disclaims the upvote-ask ("not asking you to upvote / share / amplify — informational only").
3. **MUST NOT** ask the recipient to upvote, post supportive comments, share to their network, or amplify the launch in any way. The plan §Phase 1 action 4 is explicit: "a heads-up + a question (not a request to upvote)." Vote manipulation violates HN / PH / Reddit / Lobste.rs / daily.dev / Designer News terms uniformly; the framing keeps the operator clear of the violation surface AND respects the recipient's autonomy.
4. **MUST** ask one substantive question per email per §3 template. The question is tied to the recipient's expertise (e.g., for a token-systems expert: "one thing you've recently questioned about how teams architect token systems?"; for a research-methods expert: "what's the under-rated UX research signal that DSAF should be measuring but probably isn't?"). The question gives the recipient something to engage with that's not "amplify our launch."
5. **MUST** personalise each email per recipient — no mass-blast templates with `<Name>` placeholders. Per FR-GOV-001 §3 anti-patterns, mass-blast is a tell that the founder doesn't care about the individual. Personalisation is the signal that the relationship is being treated as relationship, not as a node in an audience.
6. **MUST** include the same canonical URLs as Show HN: dsaf.dev/card (5-min entry), github.com/cyberskill-official/design-system-audit-framework (repo), dsaf.dev/blog/launch-2026 (origin story). The Show HN URL is *planned* (placeholder until FR-LAUNCH-001 ships) — if the heads-up sends at T-7 days, the Show HN URL doesn't exist yet; the heads-up says "Show HN goes live Tue/Wed at 8-10am PT; URL TBD; I'll send a one-line note when it's up if useful."
7. **MUST** respect three response modes (mirrors FR-GOV-001 §3): (i) "no response" — no chase beyond one polite follow-up at T-3 days; (ii) "thanks, will look" — log + no further action expected; (iii) "substantive engagement" — engage per their substance + log per FR-CONTENT-001 deep-dive candidates if applicable.
8. **MUST** send the heads-up window at T-7 to T-5 days. Earlier than T-7 days: the recipient forgets by launch time. Later than T-5 days: the recipient doesn't have meaningful time to engage if interested. The window is the operational sweet spot.
9. **MUST NOT** send a "did you see this?" follow-up on launch day or after. The heads-up is the only ask in this FR; a follow-up reads as pressure. If the recipient saw the launch and engaged organically, great; if not, the relationship preserves.
10. **MUST** update MEMORY.md per recipient per the per-reviewer relationship continuity discipline established in FR-GOV-001 §1 #15. Entries: "<Name> heads-up sent for FR-LAUNCH-001 on <date>; reply status: [no response / will look / substantive engagement]; relationship: [warm / cordial / neutral]; revisit for [FR-GOV-002 co-maintainer / FR-CONTENT-003 co-author / FR-AUDIT-001 marquee-DS-audit / etc.] at <future date>."
11. **MUST NOT** mention competitors negatively in the heads-up. "DSAF is better than zeroheight" framing is forbidden — the launch surface uses transparent comparison; the personal heads-up uses respect for the field. The plan's competitive landscape is informational context for the framework's positioning; recipients (some of whom may work with / for the competitors) deserve neutral framing.
12. **MUST** include the founder's identifier (Stephen Cheng / CyberSkill) and a one-line disclosure (CyberSkill is a Vietnam-based consultancy; DSAF is open source MIT). The disclosure is transparent context, NOT a sales pitch.
13. **MUST** offer an optional 15-min call as a "if easier than email" alternative. Some recipients prefer voice over text; offering the option costs nothing and signals respect for their preference. The call is NOT a sales call — same informational + substantive-question scope.
14. **MUST NOT** include any paid-funnel CTA, "audit services available at audit.cyberskill.world" mention, or any conversion-funnel element. Plan §"What NOT to do" item 1 + FR-BRAND-004 decoupling apply to all launch-surface communications uniformly. The heads-up is canonical relationship-building, not lead-gen.
15. **MUST** apply the FR-BRAND-002 handle taxonomy in the email body. `DSAF` short handle; long name `Design System Audit Framework` exactly once at first mention; no `Framework` noun-handle.

---

## §2 — Why this design

**Why T-7 days, not earlier or later (§1 #8):** earlier than T-7 days, the recipient's mental note about the upcoming launch decays; by launch day they don't remember. Later than T-5 days, the recipient may be interested in engaging but doesn't have time to read the materials before the launch. T-7 to T-5 days is the window where the recipient has time to read + remember + decide whether to engage.

**Why informational + question, not vote-ask (§1 #2, #3):** plan §Phase 1 action 4 explicitly frames this. The reasons: (a) vote-asking violates platform ToS uniformly — even informal asks via personal email are detectable when recipients later vote in coordinated patterns; (b) the recipients are influential because they're trusted by their communities — vote-asking damages that trust and the recipient's willingness to engage in future; (c) the substantive question is the *real* value of the outreach — it routes the relationship toward intellectual engagement rather than transactional amplification.

**Why same shortlist as FR-GOV-001 but independent status (§1 #1):** the 10 individuals are the highest-leverage observers regardless of which outreach reaches them. FR-GOV-001 (endorsement quotes) reaches a subset (3-5 who consent to public quotes); FR-LAUNCH-004 (heads-up) reaches all 10. Some recipients see both outreaches (consolidated into one note); others see only one. The shortlist is shared; the status tracking is per-FR.

**Why personalised emails, not mass-blast (§1 #5):** the entire premise of the outreach is that the relationship is treated as relationship. A mass-blast email with `<Name>` placeholders signals the opposite — that the recipient is a node in an audience, not a person. The 5-min-per-email personalisation is a 50-min investment for 10 emails; the payoff is the recipients' willingness to engage seriously when DSAF surfaces in their context post-launch.

**Why a substantive question (§1 #4):** the question is the *reciprocal* element. The founder is giving the recipient information (DSAF is launching); the recipient is invited to give the founder a substantive thought (their question's answer). Reciprocity is what turns one-shot outreach into multi-touch relationship. The question must be tied to the recipient's expertise — not a generic "what do you think of DSAF?" — for the reciprocity to feel respectful.

**Why no "did you see this?" follow-up (§1 #9):** the heads-up is the only ask. A follow-up at launch ("did you see we're trending on HN?") reads as pressure and converts "respected relationship" to "annoying founder." The relationship preserves only if the heads-up is genuinely one-shot. The recipient who engages organically is the bonus; the recipient who doesn't has lost nothing.

**Why three response modes (§1 #7):** mirrors FR-GOV-001 §3 decline-handling discipline. Recipients respond in various ways; all three modes are valid; the playbook handles each. The most-common mode (no response) is acceptable — the recipient's silence is not a relationship break, it's a calendar reality.

**Why no negative framing of competitors (§1 #11):** the recipients are often connected to the competitors (zeroheight team includes Luke Murphy, named in the seed shortlist; Knapsack's Chris Strahl is also named). Negative framing in a personal email reads as bad-mouthing — even when the same claim is acceptable in launch-surface content (a Show HN post can compare DSAF favourably to zeroheight). Personal email surface = neutral; launch surface = transparent comparison.

**Why optional call offer (§1 #13):** some recipients prefer voice; offering the option costs nothing and signals respect. The call's scope is the same as the email (informational + substantive question); the call is NOT a pitch.

**Why no paid-funnel mention (§1 #14):** plan §"What NOT to do" item 1 + FR-BRAND-004 decoupling apply uniformly. The heads-up email reads as marketing the moment it mentions paid services; the decoupling is preserved by *not* mentioning them in the relationship-building surfaces.

**Why MEMORY.md update per recipient (§1 #10):** each recipient's heads-up state feeds into future outreaches. A recipient who said "thanks, will look" at heads-up may be the right candidate for FR-AUDIT-001 (marquee DS team consent for public audit) 6 months later; a recipient who substantively engaged at heads-up may be the right co-author for FR-CONTENT-003. The relationship-state continuity makes the framework's outreach feel like an ongoing dialogue rather than a sequence of cold approaches.

---

## §3 — Doctrine contract

### `docs/launch/headsup-outreach.md` — the canonical heads-up doc

```markdown
---
title: "T-7 days heads-up outreach for FR-LAUNCH-001"
ratified_by: FR-LAUNCH-004 (2026-05-17)
launch_date: PLACEHOLDER — same as FR-LAUNCH-001 Show HN date
---

# T-7 days heads-up outreach

This file is the operations doc for FR-LAUNCH-004. The 10 named individuals from `docs/branding/reviewer-shortlist.md` get personalised heads-up emails at T-7 days from the FR-LAUNCH-001 Show HN posting date.

## §3.1 — The 10 named individuals (cross-referenced from FR-GOV-001)

The same 10-person shortlist from FR-GOV-001. The "Heads-up status" column is independent of FR-GOV-001's "Outreach status" column.

| # | Name | Role / Affiliation | Endorsement status (FR-GOV-001) | Heads-up status |
|---|---|---|---|---|
| 1 | [name from shortlist] | [role] | [quote-published / replied-positive / replied-negative / no-response / not contacted] | not contacted |
| ... | [10 rows total] | | | |

## §3.2 — Per-recipient personalisation guidance

For each recipient, the 5-min personalisation involves:

1. **Recent work / public commentary scan** — read the recipient's most recent 1-2 blog posts, podcast appearances, conference talks, or LinkedIn/Twitter posts. Identify a specific topic they've engaged with in the last 6 months that's tied to DS audits / criteria / governance / agent-native methods / design tokens / etc.
2. **Tie-in sentence** — write a one-sentence opener that mentions the specific topic + your interest in their take.
3. **Substantive question** — formulate one question tied to the recipient's expertise. The question is NOT "what do you think of DSAF?" — it's "[specific question relevant to their expertise]."

Examples:

- **Brad Frost:** Recent work — Style Dictionary v4 + DTCG conformance discussions. Tie-in: "Your recent thread on DTCG 2025.10 multi-file support has been useful as we calibrated DSAF's A1.8 criterion." Question: "Where do you think the DTCG community will land on theming-vs-modes ambiguity — is the 2026 spec going to consolidate, or do we live with both?"
- **Nathan Curtis:** Recent work — articles on DS measurement. Tie-in: "Your 'measuring design systems' piece (Medium, [date]) shaped how we structured Part B's measurement category." Question: "What's the under-rated measurement signal that DS teams should be tracking but aren't?"
- **Sil Bormüller:** Recent work — Into Design Systems Conf programming. Tie-in: "The 2025 IDS Conf agenda's emphasis on agent-native design systems matched what we've been building in DSAF's A.9 category." Question: "What 1-2 sessions at the 2027 conf would you most want a DSAF-style framework speaker to deliver?"
- **Chris Strahl:** Recent work — The Design Systems Podcast guests in 2024-2025. Tie-in: "Your interview with Nathan Curtis on [date] was the moment I realized the gap DSAF could fill." Question: "What's the design-systems conversation that the podcast hasn't yet hosted but should?"
- **Ben Callahan:** Recent work — annual Design Systems Survey. Tie-in: "The 2025 Sparkbox survey's 'measurement is fractured' finding was the validation we needed for DSAF's audit-output discipline." Question: "What survey question for 2026 would best surface the maturity-rubric gap?"
- **Diana Mounter:** Recent work — Primer + GitHub blog posts on DS internals. Tie-in: "Primer's recent [specific] update (Primer blog, [date]) is the kind of audit-worthy artefact DSAF is built for." Question: "What would the most-valuable third-party audit of Primer surface that an internal audit wouldn't?"
- **Sarah Federman:** Recent work — Spectrum + designsystems.com pieces. Tie-in: "Your [recent piece] on the criteria-quality gap is the design-system-leadership view that DSAF tries to encode." Question: "What's the criterion you've recently realized was wrong in your own internal DSAF-equivalent rubric?"
- **Luke Murphy:** Recent work — zeroheight design-advocate writing. Tie-in: "Your recent piece on [specific zeroheight feature] shaped how we thought about DSAF's integration story." Question: "Where do open-source frameworks and SaaS platforms genuinely complement each other in the DS audit space?"
- **Dan Mall:** Recent work — recent DS engagements + writing. Tie-in: "[Specific recent piece] aligned with what DSAF's Part B is trying to capture." Question: "[Specific question]."
- **Jina Anne:** Recent work — Design Systems Slack ongoing + recent talks. Tie-in: "The Design Systems Slack you started has been a touchpoint for DSAF's design discussions over the last 6 months." Question: "What's the conversation in the Slack that DSAF should engage with at launch?"

(Placeholder examples; the operator at outreach time fills with actual recent work + actual tie-ins.)

## §3.3 — Email template

```
Subject: DSAF launching on Show HN next [Tue/Wed] — heads-up + a question

Hi [Name],

[1-sentence personalised tie-in based on §3.2 guidance — references their recent specific work and how it intersects DSAF]

A heads-up: DSAF — Design System Audit Framework — launches on Show HN + Product Hunt next [Tue/Wed] (2026-MM-DD, 8-10am PT). It's the open-source design-system maturity rubric I've been wanting for 3 years — 125 criteria across 20 categories, six tiers L0–L5, agent-native, MIT-licensed.

Materials in case you want a pre-launch look:

- 5-min entry: https://dsaf.dev/card (DSAF-25 Core, one-page subset)
- Repo: https://github.com/cyberskill-official/design-system-audit-framework
- Origin story + candid limitations: https://dsaf.dev/blog/launch-2026

[1 substantive question tied to their expertise per §3.2]

This is informational — I'm not asking you to upvote, share, or amplify. If you have a take on the question or a roast of the framework, I'd genuinely value the read; if not, no expectation. (If a 15-min call is easier than email, happy to do that — same scope.)

Quick disclosure: I'm Stephen Cheng, founder of CyberSkill (a Vietnam-based software consultancy). DSAF is open source; CyberSkill is one of several maintainers. The two are deliberately separated.

Show HN goes live next [Tue/Wed] 8-10am PT; URL TBD; I'll send a one-line note when it's up only if you've expressed interest.

Stephen
zintaen@gmail.com
github.com/cyberskill-official/design-system-audit-framework
```

(Character count: ~1,600 chars — fits comfortably in any email client; no images, no attachments.)

## §3.4 — Response handling

### Mode (i) — no response

- Do NOT chase beyond ONE polite follow-up at T-3 days: "Quick note in case the prior email got buried — DSAF launches Tuesday. No need to respond; just wanted to make sure the heads-up reached you."
- Do NOT follow up after T-3 days. No "did you see we're on HN?" notes.
- MEMORY.md: `<Name> heads-up sent FR-LAUNCH-004 on <date>; no response; relationship: neutral; revisit at P2 for FR-CONTENT-003 or FR-AUDIT-001 if applicable.`

### Mode (ii) — "thanks, will look" reply

- Reply briefly: "Appreciate it. Show HN URL will be in the next email if useful." No pressure.
- Log + no further action expected.
- MEMORY.md: `<Name> heads-up sent FR-LAUNCH-004 on <date>; replied 'will look'; relationship: cordial; revisit for [FR-GOV-002 / FR-CONTENT-003 / etc.] at <future date>.`
- If the recipient asks for the Show HN URL post-launch, send a one-line note: "DSAF live on Show HN: [URL]. Cheers, Stephen."

### Mode (iii) — substantive engagement

- The recipient engages with the substantive question OR has a critique of the materials.
- Respond per FR-GOV-001 §3 response templates (warm + substantive).
- Log the engagement; surface to FR-CONTENT-001 deep-dive candidates if the engagement names a specific topic.
- MEMORY.md: `<Name> heads-up sent FR-LAUNCH-004 on <date>; substantive engagement on [topic]; relationship: warm; potential candidate for [FR-CONTENT-003 co-author / FR-AUDIT-001 marquee-team-consent / FR-GOV-002 co-maintainer]; revisit at <future date>.`

## §3.5 — Anti-patterns

- **Mass-blast with `<Name>` placeholders.** Forbidden per §1 #5.
- **Upvote / share / amplify ask.** Forbidden per §1 #3; vote manipulation surface.
- **"You'd be perfect to retweet this."** Same ask, different surface.
- **"Could you forward this to [your community]?"** Same ask, different surface.
- **"We're a small team..."** underdog framing degrades credibility.
- **"DSAF is better than zeroheight."** Negative framing of competitors forbidden in personal email surface per §1 #11.
- **Follow-up beyond T-3 days.** Pressure surface; violates §1 #9.
- **Mention of paid services** (audit.cyberskill.world). Decoupling rule per §1 #14; FR-BRAND-004.
```

### `docs/branding/reviewer-shortlist.md` — column addition

Add a new column `Heads-up status (FR-LAUNCH-004)` to the existing shortlist table:

```markdown
| # | Name | Role / Affiliation | Why DSAF-relevant | Warmth (1–5) | Outreach status (FR-GOV-001) | Heads-up status (FR-LAUNCH-004) |
|---|---|---|---|---|---|---|
| ... | ... | ... | ... | ... | ... | not contacted / contacted (date) / replied-positive / replied-negative / no-response |
```

The status values for heads-up: `not contacted`, `contacted (YYYY-MM-DD)`, `replied-no-response`, `replied-positive`, `replied-substantive`, `declined`.

---

## §4 — Acceptance criteria

1. **Heads-up doc committed** — `docs/launch/headsup-outreach.md` exists with §3.1 shortlist + §3.2 personalisation guidance + §3.3 email template + §3.4 response handling + §3.5 anti-patterns.
2. **10 recipients in §3.1** — `docs/launch/headsup-outreach.md` §3.1 table has at least 10 rows referencing the FR-GOV-001 shortlist.
3. **Per-recipient personalisation guidance** — §3.2 has at least 10 example tie-ins + questions (one per shortlist member). Placeholder examples are OK pending operator research at outreach time.
4. **Email template ≤ 2,000 chars** — `awk` extracts the §3.3 template; character count is ≤ 2,000.
5. **Email template includes 4 required elements** — personalised tie-in placeholder, launch date, 3 canonical URLs, substantive question placeholder, no-upvote-ask disclaimer.
6. **No vote-asking phrases** — `grep -ciE 'upvote|please upvote|please share|please amplify|please retweet|forward this' docs/launch/headsup-outreach.md` returns 0.
7. **3 response modes documented** — §3.4 has subsections for (i) no response, (ii) thanks-will-look, (iii) substantive engagement.
8. **MEMORY.md update pattern per mode** — each of the 3 modes in §3.4 specifies a MEMORY.md update format.
9. **Anti-patterns enumerated** — §3.5 lists at least 6 anti-patterns including mass-blast, upvote-ask, share-ask, forward-ask, underdog-framing, paid-services-mention.
10. **15-min call offer present** — §3.3 email template mentions "15-min call" as an alternative.
11. **Decoupling disclosure present** — §3.3 email template includes the "DSAF is open source; CyberSkill is one of several maintainers" framing per FR-BRAND-004.
12. **Shortlist column added** — `docs/branding/reviewer-shortlist.md` has a `Heads-up status (FR-LAUNCH-004)` column.
13. **No paid CTA** — `grep -ciE 'audit\.cyberskill\.world|talk to a certified|book a call|schedule a demo' docs/launch/headsup-outreach.md` returns 0 (audit.cyberskill.world is acceptable only in the decoupling-disclosure context; the grep flags broader paid-funnel language).
14. **Handle taxonomy compliance** — `grep -ciE '\b(the )?DSAF Framework\b|\bDSAF framework\b' docs/launch/headsup-outreach.md` returns 0; `grep -c '\bDSAF\b' docs/launch/headsup-outreach.md` ≥ 8.
15. **PR description includes outreach timing** — PR description names the planned T-7 to T-5 day window relative to FR-LAUNCH-001 Show HN date.

---

## §5 — Verification

```bash
# AC1, AC2 — file + 10 recipients
test -f docs/launch/headsup-outreach.md
awk '/^## §3.1/,/^## §3.2/' docs/launch/headsup-outreach.md | grep -cE '^\| [0-9]+ \|'
# expected: >= 10

# AC4 — email template length
awk '/^### Email template/,/^## §3.4/' docs/launch/headsup-outreach.md | \
  awk '/^```$/{flag=!flag; next} flag' | tr -d '\n' | wc -c
# expected: <= 2000

# AC6 — no vote-asking
grep -ciE 'upvote|please upvote|please share|please amplify|please retweet|forward this' docs/launch/headsup-outreach.md
# expected: 0

# AC7 — 3 response modes
for mode in 'no response' 'thanks, will look' 'substantive engagement'; do
  grep -qiF "${mode}" docs/launch/headsup-outreach.md || echo "MISSING mode: ${mode}"
done

# AC9 — anti-patterns
awk '/## §3.5 — Anti-patterns/,EOF' docs/launch/headsup-outreach.md | grep -cE '^- \*\*'
# expected: >= 6

# AC10 — 15-min call offer
grep -qi '15-min call\|15 min call' docs/launch/headsup-outreach.md

# AC11 — decoupling disclosure
grep -q 'open source.*one of several maintainers\|deliberately separated' docs/launch/headsup-outreach.md

# AC12 — shortlist column added
grep -q 'Heads-up status (FR-LAUNCH-004)' docs/branding/reviewer-shortlist.md

# AC13 — no broad paid CTA
grep -ciE 'audit\.cyberskill\.world|talk to a certified|book a call|schedule a demo' docs/launch/headsup-outreach.md
# Note: audit.cyberskill.world will appear in the decoupling-disclosure context; the grep flags broader uses.
# Manual reviewer-check: each occurrence is in the disclosure context, not a CTA.

# AC14 — handle taxonomy
grep -ciE '\b(the )?DSAF Framework\b|\bDSAF framework\b' docs/launch/headsup-outreach.md  # 0
grep -c '\bDSAF\b' docs/launch/headsup-outreach.md  # >= 8
```

Human-verified ACs (no script):

- **AC3** — reviewer reads §3.2 for substantive personalisation examples.
- **AC5** — reviewer reads §3.3 template for 4 required elements.
- **AC8** — reviewer reads §3.4 for MEMORY.md update formats per mode.
- **AC15** — reviewer reads PR description for outreach timing.

---

## §6 — Implementation skeleton

The operator playbook (5h):

1. **(30m) Author `docs/launch/headsup-outreach.md`** per §3 — all 5 sub-sections.
2. **(15m) Cross-reference FR-GOV-001 shortlist.** Copy the 10 names from `docs/branding/reviewer-shortlist.md` into §3.1. Note any whose FR-GOV-001 endorsement outreach already happened (those get a consolidated note).
3. **(15m) Add shortlist column.** Patch `docs/branding/reviewer-shortlist.md` to add the `Heads-up status (FR-LAUNCH-004)` column.
4. **(~T-7 days, 2h founder-time, 5-min per email) Send personalised heads-up emails.** Per recipient: scan recent work (3-5 min) → write tie-in sentence + substantive question (~2-3 min) → adapt §3.3 template (~1-2 min). Send. Update shortlist `Heads-up status` to `contacted (date)`.
5. **(~T-4 days, 15m) Send single follow-up to no-responders** per §3.4 mode (i).
6. **(over T-7 to T+24h elapsed, ~1h founder-time) Respond to replies** per §3.4 modes (ii) + (iii). Log each in shortlist + MEMORY.md.
7. **(15m post-launch +24h) Final MEMORY.md updates** per recipient relationship state.
8. **(15m post-launch +48h) Surface substantive feedback** to FR-CONTENT-001 deep-dive candidates.

---

## §7 — Dependencies

- **Upstream (required):**
  - **FR-LAUNCH-001** — Show HN date confirmed (the T-7 anchor); URLs known.
  - **FR-DOCS-003** — blog post live (heads-up emails link to dsaf.dev/blog/launch-2026).
  - **FR-GOV-001** — shortlist exists; some recipients have endorsement-outreach history.
- **Coordinated:**
  - **FR-LAUNCH-002** — cross-posts scheduled; heads-up mentions Show HN (primary) but doesn't promise cross-post URLs (those vary by platform).
  - **FR-LAUNCH-003** — Product Hunt scheduled; heads-up mentions PH (per email template).
  - **FR-CONTENT-001** (P2) — substantive engagement from heads-up replies feeds future deep-dive candidates.
- **Downstream blocks:** none directly; relationship continuity feeds future FR-GOV-002 + FR-CONTENT-003 + FR-AUDIT-001 outreaches.
- **External:**
  - Founder's personal email (zintaen@gmail.com).
  - Possibly LinkedIn DMs for recipients who prefer that channel (operator-discretion).

---

## §8 — Example payloads

### Example: a successful Mode (iii) substantive engagement

```
T-7 days: Heads-up sent to Nathan Curtis with tie-in to his Medium piece on DS measurement.
T-5 days: Nathan replies: "Useful framing on the L0-L5 transition gates. The one I'd push on is your A.7 (system accessibility) cap-at-4-without-vendor-letter — I think the rubric should split self-assessed AAA from vendor-verified AA; conflating them as one criterion loses signal."
Response per FR-GOV-001 §3 Pattern 2: "Agreed; the conflation is a known weakness. I've logged it for the FR-CORE-005 v0.2 iteration. Could I cite your distinction in the blog ChangeLog post-launch?"
Nathan: "Cite ahead."
Logged in shortlist: heads-up replied-substantive.
Logged in MEMORY.md: substantive engagement on A.7 accessibility-criterion split; relationship: warm; candidate for FR-CONTENT-003 co-author piece on "the AAA-vendor-letter problem."
Surfaced to FR-CONTENT-001: deep-dive topic for week 4 — "Why DSAF's A.7 caps at 4/5 without third-party verification."
```

### Example: a Mode (i) no-response (most common)

```
T-7 days: Heads-up sent to [recipient].
T-3 days: Single follow-up sent ("Quick note in case the prior email got buried...").
T+0: No response.
Logged in shortlist: heads-up no-response.
Logged in MEMORY.md: heads-up sent, no response; relationship: neutral; revisit at P2 if a topical fit emerges; do not chase further.
```

### Example: a personalised tie-in (Nathan Curtis case)

```
Subject: DSAF launching on Show HN next Tue — heads-up + a question

Hi Nathan,

Your 'measuring design systems' piece on Medium (Oct 2024) was the clearest articulation I'd read of why measurement is so under-tooled in the DS space, and it shaped how we structured DSAF's Part B Measurement category.

A heads-up: DSAF — Design System Audit Framework — launches on Show HN + Product Hunt next Tue (2026-06-04, 8-10am PT). It's the open-source design-system maturity rubric I've been wanting for 3 years — 125 criteria across 20 categories, six tiers L0–L5, agent-native, MIT-licensed.

Materials in case you want a pre-launch look:

- 5-min entry: https://dsaf.dev/card (DSAF-25 Core, one-page subset)
- Repo: https://github.com/cyberskill-official/design-system-audit-framework
- Origin story + candid limitations: https://dsaf.dev/blog/launch-2026

The question that's been on my mind since I read your Medium piece: what's the under-rated measurement signal that DS teams should be tracking but mostly aren't? (DSAF's B.7 has the obvious ones — adoption telemetry, deprecation-warning hit rate — but I suspect we're missing 1-2 that someone with your engagement-count would notice.)

This is informational — I'm not asking you to upvote, share, or amplify. If you have a take or a roast, I'd value the read; if not, no expectation. (15-min call if easier than email — same scope.)

Quick disclosure: I'm Stephen Cheng, founder of CyberSkill (Vietnam-based software consultancy). DSAF is open source; CyberSkill is one of several maintainers; the two are deliberately separated.

Show HN URL goes live next Tue 8-10am PT; I'll send a one-line note when it's up only if you've expressed interest.

Stephen
zintaen@gmail.com
```

---

## §9 — Open questions

All resolved at authoring time:

- **Q1: 10 individuals or fewer?** Resolved → 10 (plan §Phase 1 action 4 specifies). Fewer cedes leverage; more dilutes per-email personalisation.
- **Q2: T-7 days or different window?** Resolved → T-7 to T-5 days. Earlier = recipient forgets; later = no time to engage.
- **Q3: Consolidate FR-GOV-001 + FR-LAUNCH-004 outreach for recipients touched by both?** Resolved → yes for recipients in `quote-published` status from FR-GOV-001 (one consolidated note saying "thanks again for the quote — launch goes live Tue; here are the links"). Recipients in other FR-GOV-001 statuses get the standard heads-up.
- **Q4: Email or LinkedIn DM?** Resolved → email is the canonical (operator's professional ID). LinkedIn DM is acceptable substitute if the recipient is known to prefer that channel (e.g., they've responded to past LinkedIn DMs more readily). Operator-discretion.
- **Q5: 15-min call offer — make it mandatory or optional?** Resolved → optional in §3.3 template, included as "if easier than email." Most recipients prefer email asynchrony; offering call respects the minority who prefer voice.
- **Q6: Heads-up to recipients who declined FR-GOV-001 endorsement?** Resolved → yes. A decline on endorsement doesn't mean the relationship is cold; a heads-up at launch reads as relationship-continuity. The §3.4 mode-(i) handling covers if they don't respond.
- **Q7: Post-launch "we're on HN" follow-up — completely banned, or just discouraged?** Resolved → banned (§1 #9). The discipline is firm; relationship preservation matters more than the extra signal.

---

## §10 — Failure modes inventory

| Failure | Detection | Outcome | Recovery |
|---|---|---|---|
| Recipient sees the heads-up as a vote-ask despite the explicit disclaimer | reply asking "are you trying to get me to upvote?" | Trust crisis | Respond transparently: "Genuinely not — re-read the email, the disclaimer is intentional. The substantive question is the only ask." Most recipients understand; if not, accept the misread and move on |
| Recipient interprets the substantive question as a "show your work" test | reply seems guarded | Stiff engagement | The question should be tied to the recipient's existing public work; if the framing accidentally reads as testing, soften ("no need to answer if it's the wrong question for you") in the follow-up |
| Mass-blast detected (similar wording across emails) | recipient compares notes with another recipient | Reputational damage | Personalisation per §3.2 is the discipline; if accidentally similar wording appears, apologise + send a fresh personalised note |
| Recipient interprets "Vietnam-based consultancy" disclosure negatively | implicit decline | Geography-headwind realised | Acceptable failure mode; the disclosure is transparency, not concealment; some recipients will discount, others won't. The framework's structural mitigation is FR-GOV-002 (named co-maintainer recruit) |
| Recipient asks for follow-up call but operator's bandwidth is maxed at launch | scheduling conflict | Awkward decline | Schedule the call post-launch (T+7 days); the 15-min ask still honours the recipient's request even with delay |
| Recipient publishes a critical piece referencing the heads-up | LinkedIn / blog post observed | Public framing of private outreach | Respect the recipient's right to write; respond in their public surface per FR-LAUNCH-001 §3 patterns; do NOT message them privately to complain |
| Single follow-up at T-3 days reads as pressure | recipient explicitly says "stop" | Relationship break | Single follow-up is in scope (§3.4 mode i); two follow-ups are not. If the recipient says stop, stop immediately + apologise + log relationship-state-cooled in MEMORY.md |
| Heads-up sends accidentally CC'd to wrong recipient (typo) | bounce or wrong-recipient reply | Privacy break | Apologise to the wrong recipient + the intended; if the cc'd recipient's identity could compromise the intended recipient, escalate appropriately |
| Recipient screenshot the email + posts publicly | Twitter / LinkedIn post | "Founder begging for endorsements" misread | Engage publicly per FR-LAUNCH-001 §3 Pattern 1: "I sent N personalised heads-ups; the explicit disclaimer was 'not asking for upvote'; the substantive question was the real ask. Happy to share what I asked [Name]." Transparency is the defence |
| Heads-up email lands in spam folder | no response from a normally-responsive recipient | Missed engagement | DSAF's launch outreach is small enough to spot-check; if a likely-warm recipient doesn't respond, the single follow-up at T-3 days catches the spam case |
| Recipient changes their mind post-launch about the substantive engagement | retraction request | Tracking-file update needed | Per FR-GOV-001 §3 retraction discipline; respect within 7 days; relationship preserved |
| Founder mis-personalises a recipient's recent work (cites wrong piece, attributes wrong topic) | reply with correction | Embarrassment | Apologise + fix; the recipient appreciates the correction more than the founder gets penalised for the slip; humility scales |

---

## §11 — Implementation notes

- **The 5-min-per-email personalisation is the discipline that scales.** Mass-blast is 10 minutes for 10 emails; personalised is ~50 minutes for 10. The 40-minute difference is the entire ROI of the FR. Cutting it = the heads-up becomes informational spam.
- **About the consolidated note for FR-GOV-001 quote-published recipients:** these recipients already have an active relationship from endorsement outreach. The heads-up note for them is shorter ("thanks again for the quote — launch goes live Tue") and skips the substantive question (which they answered implicitly via their endorsement). Personalisation discipline still applies; the structure is condensed.
- **About the substantive-question discipline:** the question is the most-skippable element under time pressure (most templates would drop it for brevity). It's the most-load-bearing element for relationship building. Don't skip; if a recipient's recent work doesn't immediately suggest a question, spend the extra 3-5 minutes finding one rather than sending without.
- **The 15-min call offer is rarely accepted (~10-20%) but always appreciated.** Recipients who prefer email decline politely; recipients who prefer voice accept enthusiastically. The 80%+ "no thanks, email is fine" responses cost nothing.
- **MEMORY.md updates compound over time.** A heads-up sent 6 months ago to a recipient who didn't respond + 12 months later they substantively engage with a different topic + 18 months later they're invited to FR-AUDIT-001 marquee-team-consent = a 2-year relationship arc. MEMORY.md is the audit trail that makes this arc visible across founders' / co-maintainers' rotations.
- **About the geography-headwind disclosure:** the §3.3 template's disclosure is matter-of-fact, not apologetic. Some recipients will discount the framework for it; others won't. The disclosure isn't aimed at converting the discounters; it's aimed at the non-discounters who appreciate transparency. The math works out.
- **Heads-up at T-7 days fits the founder's elapsed-time budget for launch week.** T-7 to T-5 days = ~3 days of email-and-respond elapsed time. T-3 single follow-up = 15 min. T+0 onwards = response handling overlaps with FR-LAUNCH-001 monitoring. The cumulative founder time is ~5 hours spread over 10 days; sustainable.
- **About FR-GOV-002 co-maintainer recruitment overlap (P2):** the 10-person shortlist is the same. Recipients who substantively engaged at FR-LAUNCH-004 are the strongest candidates for FR-GOV-002 outreach 3-6 months later. The MEMORY.md continuity makes the conversion path explicit.

---

*End of FR-LAUNCH-004.*
