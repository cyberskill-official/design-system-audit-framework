---
id: FR-GOV-001
title: "Pre-recruit 2–3 named outside reviewers from Into Design Systems orbit for the launch thread (unpaid blurb-level endorsements)"
module: GOV
priority: MUST
status: accepted
verify: I
phase: P0
milestone: P0 · slice 1 · Pre-launch hardening
slice: 1
owner: Stephen Cheng (Founder)
created: 2026-05-17
shipped: null
related_frs: [FR-BRAND-002, FR-CORE-001, FR-CORE-004, FR-DOCS-001, FR-DOCS-002, FR-LAUNCH-001, FR-LAUNCH-004, FR-GOV-002]
depends_on: [FR-BRAND-002, FR-CORE-001, FR-CORE-004]
blocks: [FR-DOCS-002, FR-LAUNCH-001]
source_pages:
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Phase 0 — Pre-launch hardening, action 7)"
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Design systems community signal map — named individuals)"
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§What drives GitHub stars item 4 — 'a person attached to the work')"
source_decisions:
  - "DEC-026: 2-3 reviewers is the floor; more is welcome but not required for P0"
  - "DEC-027: outreach is 'would value your roast' framing per plan §Phase 1 — not 'please endorse us'"
  - "DEC-028: reviewers receive the full DSAF-25 Core card + the README draft (post-FR-DOCS-001) + the source plan summary; NOT the full 125 criteria"
  - "DEC-029: endorsement quotes are ≤ 280 chars (Twitter-card-sized) so they double as social-share assets"
language: markdown
service: doctrine + outreach ops
new_files:
  - docs/branding/reviewer-outreach.md
  - docs/branding/reviewer-shortlist.md
modified_files:
  - README.md  # FR-DOCS-001 leaves endorsement slots empty; this FR + FR-DOCS-002 fill them
allowed_tools:
  - "file_read/write docs/**, README.md"
  - "email composition (the outreach happens via personal email; not in scope for the agent)"
  - "calendar invites for 30-min reviewer calls if needed"
disallowed_tools:
  - "promise paid compensation in the outreach — the plan explicitly says 'unpaid blurb-level endorsements'"
  - "offer co-maintainer status in the initial reviewer outreach — co-maintainer recruit is FR-GOV-002 (P2) and is a different ask"
  - "publish a reviewer's name without their explicit written approval of the quote that bears their name"
  - "use the reviewer's quote in any context other than README + dsaf.dev launch thread + Show HN comment (per the consent letter in §3)"
effort_hours: 6
sub_tasks:
  - "1. (30m) Author docs/branding/reviewer-shortlist.md per §3 — the named 10-person shortlist from the plan, ranked by warmth + outreach order"
  - "2. (30m) Author docs/branding/reviewer-outreach.md per §3 — the outreach playbook + consent letter template"
  - "3. (1h) Draft the outreach email per §3 template — one personalised version per shortlist member, ranked"
  - "4. (over ~2 weeks elapsed time, ~3h founder-time) Send outreach, follow up, schedule calls if requested, collect quotes — outside-of-this-FR's-PR-window but tracked here"
  - "5. (1h) Receive quotes; obtain explicit written approval per consent letter; commit quotes to a holding file pending FR-DOCS-002 (which inserts them into README)"
  - "6. (15m) PR description for this FR documents: shortlist + outreach status (sent to N, responded Y, committed quotes Z); the actual quote-installation is FR-DOCS-002"
risk_if_skipped: "Plan §'What drives GitHub stars' item 4 names this as the #4 lever that moves methodology-repo stars: 'a person attached to the work — every framework with breakout stars has a named human face (Brad Frost, Pravir Chandra for SAMM, Adam Wiggins for 12factor). Repos maintained by a faceless org name underperform.' For a Vietnamese-consultancy-maintained framework, the geography-headwind discussion (plan §'Honest critique' item 4) compounds this: a Western enterprise buyer reading 'maintained by CyberSkill, Ho Chi Minh City' applies a discount they wouldn't apply to a repo with Brad Frost's name in the endorsements. Pre-recruited named endorsements from the Into Design Systems orbit are the cheapest structural countermove. Skipping this FR ships a launch with no external credibility signal in the README; the launch then depends on the framework's intrinsic merit alone, which is brutally hard for an unknown consultancy. The cost (6 founder-hours over 2 weeks) is trivial; the value (2-3 named human faces in the launch surface) is the difference between top-quartile Show HN traction and middle-of-the-pack."
---

## §1 — Description (BCP-14 normative)

The framework MUST pre-recruit 2–3 named outside reviewers from the Into Design Systems orbit (or equivalent design-systems community of standing) to land blurb-level endorsements in the README + dsaf.dev launch thread + Show HN comment. The reviewers are unpaid; the ask is "would value your roast" framing (per plan §Phase 1), not "please endorse us." Reviewers approve their named quote in writing before publication.

1. **MUST** publish a 10-person shortlist at `docs/branding/reviewer-shortlist.md` per §3, ranked by *outreach warmth* (existing rapport, prior interactions, mutual connections) — not by social influence alone. The shortlist is the operator's working surface; the named individuals named in the plan are the seed set: Brad Frost, Nathan Curtis, Sil Bormüller, Chris Strahl, Ben Callahan, Diana Mounter, Sarah Federman, Luke Murphy (zeroheight's lead design advocate), Dan Mall, Jina Anne. Operator MAY substitute or add names with reasoning logged.
2. **MUST** publish the outreach playbook + consent letter template at `docs/branding/reviewer-outreach.md` per §3. The playbook covers: the "would value your roast" outreach script, what materials the reviewer receives (DSAF-25 Core card + README draft + plan summary, NOT the full 125 criteria — that would be a 30-minute ask, not a 5-minute one), the response timeline, the consent letter for quote use.
3. **MUST** target 2–3 confirmed reviewers with committed-and-approved quotes before launch (FR-LAUNCH-001). The floor is 2; the ceiling is "as many as respond positively." Each quote MUST be ≤ 280 characters (Twitter-card-sized so it doubles as social-share asset).
4. **MUST** frame the outreach as "we built this; would value your roast before we launch publicly" (verbatim from plan §Phase 1, action 4). The outreach MUST NOT ask "please endorse" or "please retweet" or "please upvote on HN" — the ask is *review* (which may produce an endorsement quote organically). Reviewers who don't endorse are still valuable as critics whose feedback strengthens the framework.
5. **MUST NOT** promise paid compensation in the outreach. Plan §"Phase 0 action 7" explicitly says "unpaid blurb-level endorsements." Paid endorsements are a different category (with disclosure obligations) and would damage the framework's credibility if revealed.
6. **MUST NOT** offer co-maintainer status in this FR's outreach. Co-maintainer recruit is FR-GOV-002 (P2 — placeholder, not yet specified) and is a structurally larger ask requiring different framing. Mixing the two asks in one email would confuse the reviewer and dilute both.
7. **MUST** obtain explicit written approval from each reviewer for the specific quote that bears their name. The consent letter in §3 specifies: (a) the exact quote text, (b) the surfaces the quote will appear on (README, dsaf.dev launch thread, Show HN comment — NOT other surfaces without further consent), (c) the duration (12 months minimum; reviewer may request removal at any time), (d) the reviewer's name + affiliation as they want it to appear.
8. **MUST** allow reviewers to decline gracefully. Decline outcomes are: (i) "no time / no fit" — no quote, no public mention, framework's relationship with the reviewer is unchanged; (ii) "feedback but no quote" — the reviewer's critique is incorporated where applicable, no public attribution; (iii) "quote but private" — used in fundraising / partnership context, not in launch surfaces. All three decline modes are valid and the outreach playbook MUST surface them.
9. **MUST** track outreach status in `docs/branding/reviewer-shortlist.md` per the table format in §3: name / role / affiliation / outreach date / response date / response category (not contacted, contacted, replied-positive, replied-negative, no-response, quote-approved). The tracking file is the audit trail.
10. **MUST** time the outreach 1-2 weeks before FR-LAUNCH-001 ship. Earlier risks the reviewer forgetting; later risks not enough time for back-and-forth on quote wording. Plan §Phase 1 action 4 says "before launch" — this FR specifies "1-2 weeks before launch" as the operating window.
11. **MUST** include FR-DOCS-001 README draft + DSAF-25 Core card + plan summary as the materials shared with reviewers. The materials MUST be at the dsaf.dev URLs (per FR-BRAND-001) — NOT raw markdown links to GitHub — so the reviewers see the launch-state surface, not the engineering-doctrine surface.
12. **MUST NOT** publish any reviewer's name (in README or elsewhere) before their quote-approval comes back in writing. Pre-publishing names without consent is reputational damage to both the reviewer and the framework.
13. **MUST** document the geography-headwind context as part of the outreach materials, NOT as a hidden agenda. The outreach mentions "we're a Vietnam-based consultancy; one structural countermove to the geography discount is to launch with named endorsements from the design-systems community of standing — we'd be honoured by your roast." Transparency is more durable than tactical framing.
14. **MUST** preserve the option to ship with the floor (2 reviewers) if more don't respond in the outreach window. The launch is NOT gated on 3+ reviewers; 2 is acceptable per plan §Phase 0 action 7 ("2–3 named outside reviewers" — the range is 2-3, not 3 strict).
15. **MUST** update `MEMORY.md` (BRAIN store, per the project's CLAUDE.md) with each reviewer's relationship status as it evolves. Memories of "Brad Frost responded warmly to outreach 2026-05-22" or "Diana Mounter declined gracefully, prefers to revisit at P2" are durable assets for future FR-GOV-002 + FR-LAUNCH-004 outreach. (The MEMORY.md update is per-session by the agent; this FR codifies the policy.)

---

## §2 — Why this design

**Why 2–3 reviewers (§1 #3):** more reviewers is better but the floor is 2 because Show HN readers parse "endorsed by 2 named people" as legitimacy; below 2, the endorsement reads as "the founder's friend." Plan §Phase 0 action 7 specifies 2-3; ranges over 5 invite the question "why so many" and the answer ("we asked 10 and got 5") is brand-suboptimal.

**Why "would value your roast" framing (§1 #4):** the framing inverts the standard endorsement-request power dynamic. A reviewer asked "please endorse us" is being asked to do work for the founder's benefit; a reviewer asked "would value your roast" is being invited to engage critically with the framework. Critique is intellectually engaging in a way that endorsement isn't — and reviewers who engage critically often produce *better* quotes because they've genuinely read the material. Plan §Phase 1 action 4 verbatim recommends this framing.

**Why unpaid (§1 #5):** paid endorsements have FTC disclosure obligations (US) and EASA disclosure obligations (EU) and similar elsewhere. The framework's credibility depends on the endorsements reading as authentic; paying for them would either (a) require visible disclosure that frames them as marketing, OR (b) be undisclosed and constitute fraud. Either outcome is worse than the alternative (fewer endorsements but credible ones).

**Why no co-maintainer ask in this outreach (§1 #6):** co-maintainer is a year-long commitment with public name + governance authority; an endorsement is a one-paragraph review. Asking both at once is a category error — the reviewer's mental model is doing one thing or the other. Plan §Phase 2 separates the two timelines for this reason.

**Why explicit written consent (§1 #7, #12):** publishing a quoted endorsement without the reviewer's approval of the exact wording is a way to lose the relationship permanently. Consent letters are 5-minute artefacts that prevent multi-year damage. The consent letter also defines the *scope* — what surfaces, what duration — so the reviewer's name doesn't end up on a SaaS pitch deck three years later without their permission.

**Why three decline modes (§1 #8):** binary endorse/decline misses real outcomes. A reviewer who declines the public quote may still be a valuable critic; a reviewer who would do private endorsements may be reachable for fundraising even if not for launch. The playbook's three modes preserve the relationship across all of them.

**Why outreach 1-2 weeks before launch (§1 #10):** earlier than 2 weeks, the reviewer may forget; later than 1 week, there isn't enough room for back-and-forth on quote wording. The operating window matches typical review-cycle latency for design-systems professionals.

**Why dsaf.dev URLs (not GitHub raw markdown) in outreach materials (§1 #11):** the reviewer sees the *launch surface* — what the public will see — not the engineering-doctrine surface. The README on dsaf.dev (or even a pre-launch staging URL) is the reviewer's accurate mental model; a GitHub markdown link forces them to imagine the rendered output.

**Why document the geography-headwind context transparently (§1 #13):** hiding the framing is a tactical weakness — sophisticated reviewers will infer it anyway, and they read the inference as the founder being naive. Transparency reframes the same content as the founder being strategic. Plan §"What NOT to do" item 9 (gracious engagement) applies here.

**Why MEMORY.md updates (§1 #15):** the framework will run multiple outreach cycles (FR-GOV-002 co-maintainer, FR-LAUNCH-004 launch personal outreach, FR-CONTENT-003 co-author piece, FR-AUDIT-001 marquee-DS-team consent). Each touches some subset of the same 10-person shortlist. Memories of "Brad Frost responded warmly to FR-GOV-001 outreach 2026-05-22" are durable assets for the next outreach. Without MEMORY.md updates, each FR re-derives the relationship state from scratch.

---

## §3 — Doctrine contract

### `docs/branding/reviewer-shortlist.md` (NEW) — body shape

```markdown
# DSAF — Reviewer shortlist (FR-GOV-001)

**Status:** working surface; updated as outreach progresses. Ratified by FR-GOV-001 (2026-05-17).
**Goal:** 2–3 confirmed reviewers with approved blurb-level endorsement quotes for the launch thread.

## Shortlist (ranked by outreach warmth, not influence)

The plan's named individuals are the seed set. The operator (founder) re-ranks based on existing rapport, mutual connections, and likely response openness.

| # | Name | Role / Affiliation | Why DSAF-relevant | Warmth (1–5) | Outreach status |
|---|---|---|---|---|---|
| 1 | <re-ranked-name-1> | <role> | <one-line> | <1–5> | not contacted |
| 2 | <re-ranked-name-2> | <role> | <one-line> | <1–5> | not contacted |
| 3 | <re-ranked-name-3> | <role> | <one-line> | <1–5> | not contacted |
| 4 | <re-ranked-name-4> | <role> | <one-line> | <1–5> | not contacted |
| 5 | <re-ranked-name-5> | <role> | <one-line> | <1–5> | not contacted |
| 6 | <re-ranked-name-6> | <role> | <one-line> | <1–5> | not contacted |
| 7 | <re-ranked-name-7> | <role> | <one-line> | <1–5> | not contacted |
| 8 | <re-ranked-name-8> | <role> | <one-line> | <1–5> | not contacted |
| 9 | <re-ranked-name-9> | <role> | <one-line> | <1–5> | not contacted |
| 10 | <re-ranked-name-10> | <role> | <one-line> | <1–5> | not contacted |

## Seed set from the plan

The plan §"Design systems community signal map" + §Phase 1 action 4 names these individuals as the highest-leverage outreach surface for the framework. The operator MAY use this list as the seed for the shortlist re-ranking, or substitute / add names with logged reasoning.

- **Brad Frost** — Author of *Atomic Design*; the closest cultural analog to DSAF. High influence; warmth depends on prior outreach.
- **Nathan Curtis** — EightShapes / Directed Edges; ~15-25 DS engagements per year; long-form Medium writer. The plan named him as a co-maintainer candidate for FR-GOV-002.
- **Sil Bormüller** — Into Design Systems (Munich); winner of zeroheight's Design Systems Awards 2025 for Best Event/Community Champion. ~29k LinkedIn followers; highest-leverage single endorsement.
- **Chris Strahl** — Knapsack; host of *The Design Systems Podcast*. Already interviews DS practitioners; pitching as a podcast guest is parallel value.
- **Ben Callahan** — Sparkbox; host of *The Question* podcast; runs the annual Design Systems Survey.
- **Diana Mounter** — GitHub Primer lead; the "warmest" target for FR-AUDIT-001 (public marquee-DS audit) per the plan.
- **Sarah Federman** — Adobe Spectrum + designsystems.com.
- **Luke Murphy** — zeroheight's lead design advocate.
- **Dan Mall** — Independent DS consultant.
- **Jina Anne** — Origin of the Design Systems Slack.

## Outreach status legend

- `not contacted` — initial state
- `contacted` — outreach email sent; awaiting response
- `replied-positive` — reviewer responded with interest; quote pending
- `replied-negative` — reviewer declined (gracefully); no public mention
- `no-response` — 14 days elapsed since outreach; no follow-up planned without warm-intro
- `quote-approved` — written quote + consent letter signed; quote committed to README via FR-DOCS-002

## Re-ranking criteria (warmth-first)

1. **Existing rapport** — prior email exchange, in-person meeting, mutual project, shared Slack channel.
2. **Mutual connections** — a third party who has worked with both reviewer and founder, willing to make a warm intro.
3. **Topical alignment** — reviewer has publicly commented on DSAF-adjacent topics (audits, maturity, criteria-based frameworks) in the last 12 months.
4. **Geographic / cultural fit** — Europe or Asia-Pacific reviewers may be more willing to consider a Vietnam-based maintainer than US-only reviewers (per plan §"Honest critique" item 4 mitigation).
5. **Response history** — if a reviewer has historically declined unrelated requests, lower warmth; if they've historically responded warmly, higher warmth.

## Privacy

This file MAY be public in the repo. Reviewer names without explicit consent (i.e., before `quote-approved`) are listed only as candidates, not as endorsers. Reviewers in `replied-negative` or `no-response` status are listed for the founder's tracking; their *status* doesn't imply public attribution. The file is intentionally not anonymised — transparency about which reviewers were contacted is a credibility signal.
```

### `docs/branding/reviewer-outreach.md` (NEW) — body shape

```markdown
# DSAF — Reviewer outreach playbook (FR-GOV-001)

**Status:** normative; ratified by FR-GOV-001 (2026-05-17).
**Purpose:** the outreach script + consent letter template + decline-handling for FR-GOV-001's pre-launch reviewer recruit.

## The ask

We're not asking for an endorsement. We're asking for a roast.

A roast is a 10-minute review of the DSAF-25 Core card + the README draft + a one-paragraph "why now" framing. The reviewer responds with their honest take — what works, what doesn't, what's missing. If the take happens to be positive and quotable, we'd be honoured to use the quote on the README + launch surface (with their explicit approval of the wording). If the take is critical, we incorporate the feedback where applicable and the relationship is unchanged.

The framing matters: power dynamics in endorsement asks are inverted. A request for endorsement is the founder asking the reviewer for work; a request for roast is the founder inviting the reviewer to engage. Engagement is the goal; endorsement is a byproduct.

## Outreach email template

```
Subject: Would value your roast — DSAF (open-source design system audit framework)

Hi <Name>,

I'm Stephen Cheng, founder of CyberSkill (a Vietnam-based software consultancy). We've been building DSAF — Design System Audit Framework — for the last 12 months and we're 1-2 weeks from a public launch (Show HN + dsaf.dev). Before we ship, I'd value your roast.

The premise: most maturity narratives in design systems live as blog posts (Big Medium, Sparkbox, your own work [if applicable]). The few that aren't are SaaS-gated platforms (zeroheight / Knapsack / Supernova). Brad Frost's frontend-guidelines-questionnaire is the closest GitHub-native artefact, but it's a checklist. DSAF is the bet that a 125-criterion, criteria-graded, scriptable, agent-native rubric is the missing piece — and the space is open enough on GitHub that an open-source artefact can occupy it.

I know you're busy. The ask:

1. Read the DSAF-25 Core card (5 minutes): https://dsaf.dev/card
2. Skim the README draft (5 minutes): https://dsaf.dev/readme-preview
3. Tell me what's wrong, what's missing, what's confused — or what works if anything does.

That's it. If the take is critical, I incorporate the feedback and our relationship is unchanged. If the take is positive and you're up for it, I'd be honoured to use a short blurb (≤ 280 chars) on the README + launch thread (with your explicit approval of the wording).

One transparent note: we're a Vietnam-based consultancy. A structural countermove to the geography-headwind that frameworks like this face is to launch with named endorsements from the design-systems community of standing. Your roast — positive, critical, or both — is the most valuable input we could get before shipping.

Materials:
- DSAF-25 Core card: https://dsaf.dev/card
- README draft: https://dsaf.dev/readme-preview
- One-page why-now framing: https://dsaf.dev/why-now

Happy to jump on a 15-min call if easier than written feedback. No pressure either way.

Stephen
zintaen@gmail.com
github.com/CyberSkill/design-system-audit-framework
```

## Consent letter template

After a reviewer has provided a positive response with a quotable blurb, the founder sends this consent letter to confirm before publishing:

```
Subject: DSAF endorsement consent — your quote for the launch

Hi <Name>,

Thank you for the feedback. Before I add your quote to the README + launch thread, I want to confirm with you in writing the exact wording and the surfaces it'll appear on.

Quote (as I'd publish):
> "<exact quote text — ≤ 280 chars>"
> — <Name as you want it to appear>, <Affiliation as you want it to appear>

Surfaces:
- README.md on github.com/CyberSkill/design-system-audit-framework (and any future neutral-org migration of the same repo)
- dsaf.dev launch page (the framework's landing site)
- Show HN comment (if I'm asked who endorsed)
- LinkedIn / Twitter launch posts that link to the above

Duration:
- 12 months minimum (until 2027-05-22 or equivalent). You may request removal at any time after the first 12 months by emailing me; I'll have the quote removed from the named surfaces within 7 days.

What we will NOT do without further consent:
- Use the quote on paid services pages (audit.cyberskill.world)
- Use the quote in fundraising materials, pitch decks, or sales collateral
- Use the quote on any third-party platform that we don't operate
- Modify the quote text (other than typo fixes you approve)

If the quote text or any of the above is wrong, just let me know what to change. If everything is correct, a one-line "approved as written" is enough.

Stephen
```

## Decline-handling

Reviewers may decline in three ways. All are valid; the playbook handles each.

### (i) "No time / no fit"

The reviewer says they're not available or it's not a good match. Response template:

```
Totally understood. Thanks for considering. I'll keep you on the shortlist for the next iteration — if there's ever a moment where you'd like to weigh in (even just to push back on a specific criterion), the door is open.

— Stephen
```

Status update in `docs/branding/reviewer-shortlist.md`: `replied-negative`. No public mention. Memory update: `<Name> declined gracefully 2026-MM-DD; revisit at P2 if FR-GOV-002 outreach reaches them.`

### (ii) "Feedback but no quote"

The reviewer provides substantive critique but isn't comfortable being publicly quoted. Response template:

```
This is exactly the feedback I was hoping for. Thank you. I'll incorporate <specific items> into the framework where applicable. No public attribution from this thread — your critique stands as private input to the work. If something shifts in your comfort with public attribution down the road, let me know; otherwise I'll respect this.

— Stephen
```

Status: `replied-negative` (no public quote) but with a sub-status note "feedback received, not for quote." Memory update logs the feedback content for future iteration.

### (iii) "Quote but private"

The reviewer is comfortable being quoted in fundraising / partnership contexts but not in public launch surfaces. Response:

```
Got it. I'll keep this for warm-intros to investors / partners — not for the public launch. If your comfort shifts to public surfaces in the future, the consent letter is one email away. Thank you for the flexibility.

— Stephen
```

Status: `replied-positive (private only)`. The quote is logged in a private file (NOT in the public repo); MEMORY.md tracks the boundary.

## Response timeline

| Day | Action |
|---|---|
| 0 | Send outreach email |
| 3 | If no response: nothing (don't double-tap at 3 days) |
| 7 | If no response: send a brief follow-up — "Did this land in spam? Happy to wait if you're busy." |
| 14 | If no response: mark as `no-response`; do NOT chase further without a warm-intro from a mutual connection |
| Quote received | Send consent letter within 24 hours |
| Consent approved | Commit quote to a holding file; FR-DOCS-002 inserts into README |

## Privacy + relationship preservation

- Never publish a reviewer's name before consent is in writing.
- Never share a reviewer's response with another reviewer (e.g., don't say "Brad Frost endorsed; would you?").
- Treat declines as relationship-preserving outcomes; the framework's long-term success depends on these reviewers' goodwill across many iterations (FR-GOV-002, FR-LAUNCH-004, FR-CONTENT-003, FR-AUDIT-001, etc.).
- If a reviewer requests removal post-launch, comply within 7 days.

## Anti-patterns

- **Mass-blast email with `<Name>` placeholders.** Each outreach is personalised; the personalisation IS the signal.
- **"Please retweet our launch."** Out of scope. This FR's ask is review; launch amplification is a different ask (FR-LAUNCH-004) with different framing.
- **"We're a small team trying to make it."** Avoid the underdog framing; reviewers respond better to confidence-with-transparency than to pity.
- **Following up more than once.** A second follow-up at 14 days is acceptable IF there's a specific new thing to share (e.g., "we just landed the DSAF-25 Core, would love your take on it"). Generic "did you see this?" follow-ups damage the relationship.
- **Naming declined reviewers in launch thread.** Even neutral mentions ("we asked X but they were busy") read as gossip. Declined reviewers don't appear in public surfaces.
```

### `README.md` — endorsement slots (already structured per FR-DOCS-001 §3)

FR-DOCS-001 ships the README with placeholder endorsement slots. This FR's outreach produces the actual quotes, which FR-DOCS-002 inserts into the slots. No README patch in this FR's direct scope; the README structure is already correct.

---

## §4 — Acceptance criteria

1. **Shortlist committed** — `docs/branding/reviewer-shortlist.md` exists with the 10-row table format from §3 (ranked + status-tracked).
2. **Outreach playbook committed** — `docs/branding/reviewer-outreach.md` exists with: outreach email template, consent letter template, decline-handling for the three categories, response timeline, privacy section, anti-patterns.
3. **Shortlist populated** — at least 5 of the 10 rows in `docs/branding/reviewer-shortlist.md` have a name + role + warmth-score + outreach-status filled in (the other 5 may stay as placeholders if the operator hasn't ranked them yet).
4. **Outreach started for top-3 warmest** — `docs/branding/reviewer-shortlist.md` shows `contacted` status for the top-3-by-warmth rows. PR description includes the dates each was contacted.
5. **At least 2 reviewers in `replied-positive` or `quote-approved` status** — within the FR's outreach window (2 weeks elapsed), at least 2 reviewers responded positively. If the floor isn't met within 2 weeks, the operator MAY extend the outreach window OR proceed with 2 reviewers and a "more endorsements landing post-launch" framing in the launch thread.
6. **2+ quotes committed to a holding file** — quotes are stored in a holding file (NOT yet in README — that's FR-DOCS-002's job). Holding file path: `docs/branding/reviewer-quotes-pending.md` (gitignored or repo-private until FR-DOCS-002 commits them to README).
7. **Consent letters logged** — for every quote in the holding file, a corresponding consent letter (in `docs/branding/reviewer-consent-log.md` or in the founder's personal email folder) confirms the reviewer's explicit written approval. PR description references the consent-log file (which may be repo-private).
8. **Quotes within 280-char limit** — every quote committed for publication is ≤ 280 chars. `awk '/^> "/' docs/branding/reviewer-quotes-pending.md | awk '{ if (length > 280) print "TOO LONG"; }'` returns no output.
9. **No reviewer published without consent** — `grep -c '<endorsement quote' README.md` ≥ 2 only AFTER FR-DOCS-002 ships AND `docs/branding/reviewer-consent-log.md` documents each quote's approval. AC9 is verified at FR-DOCS-002 land time, not at this FR's land time.
10. **MEMORY.md updated** — the BRAIN store reflects per-reviewer status as outreach progresses. Memory entries follow the FR-GOV-001 §1 #15 policy.
11. **No paid compensation in outreach** — `grep -ciE 'pay\|compensation\|honorarium\|fee' docs/branding/reviewer-outreach.md` returns 0 outside the "anti-patterns" or "decline-handling" sections.
12. **Geography-headwind context transparent** — `docs/branding/reviewer-outreach.md` outreach email template mentions "Vietnam-based" or "geography-headwind" framing explicitly.
13. **3 decline modes documented** — `docs/branding/reviewer-outreach.md` "Decline-handling" section has subsections for `(i) "No time / no fit"`, `(ii) "Feedback but no quote"`, `(iii) "Quote but private"` per §3.
14. **PR description includes outreach status snapshot** — at PR land time, the description has: shortlist top-3 names + warmth scores, top-3 outreach dates, response status counts (X contacted, Y positive, Z negative, W no-response).

---

## §5 — Verification

```bash
# AC1 — shortlist committed
test -f docs/branding/reviewer-shortlist.md
grep -q '## Shortlist' docs/branding/reviewer-shortlist.md

# AC2 — outreach playbook committed
test -f docs/branding/reviewer-outreach.md
for section in '## The ask' '## Outreach email template' '## Consent letter template' '## Decline-handling' '## Response timeline'; do
  grep -qF "${section}" docs/branding/reviewer-outreach.md || echo "MISSING: ${section}"
done

# AC3 — shortlist populated (5+ rows)
populated_rows=$(awk -F '|' '/^\| [0-9]+ \|/ { if ($3 !~ /<re-ranked-name/) print }' docs/branding/reviewer-shortlist.md | wc -l)
[ "${populated_rows}" -ge 5 ] || echo "FAIL AC3: only ${populated_rows} rows populated"

# AC4 — top-3 contacted
contacted=$(grep -c 'contacted\|replied-positive\|replied-negative\|quote-approved\|no-response' docs/branding/reviewer-shortlist.md)
[ "${contacted}" -ge 3 ] || echo "FAIL AC4: only ${contacted} reviewers contacted"

# AC5 — 2+ in positive status (validated at FR's elapsed-window close, not PR land)
positive=$(grep -cE 'replied-positive|quote-approved' docs/branding/reviewer-shortlist.md)
[ "${positive}" -ge 2 ] || echo "WARN AC5: ${positive} reviewers in positive status; consider extending outreach window"

# AC8 — quote length cap (when quotes exist)
if [ -f docs/branding/reviewer-quotes-pending.md ]; then
  awk '/^> "/ { if (length > 280) print "TOO LONG: " $0 }' docs/branding/reviewer-quotes-pending.md
fi

# AC11 — no paid compensation mention (outside anti-patterns / decline-handling)
grep -niE 'pay|compensation|honorarium|fee' docs/branding/reviewer-outreach.md | \
  grep -v 'Anti-patterns\|Decline-handling' | \
  grep -v '^[0-9]*:Subject:'
# expected: empty

# AC12 — geography context
grep -qi 'vietnam\|geography' docs/branding/reviewer-outreach.md

# AC13 — three decline modes documented
for mode in 'No time' 'Feedback but no quote' 'Quote but private'; do
  grep -qF "${mode}" docs/branding/reviewer-outreach.md || echo "MISSING decline mode: ${mode}"
done
```

Human-verified ACs (no script):

- **AC6, AC7** — reviewer reads PR description; verifies the holding-file + consent-log references.
- **AC9** — verified at FR-DOCS-002 land time, not this FR.
- **AC10** — verified by inspecting MEMORY.md after outreach progress.
- **AC14** — PR description has the snapshot.

---

## §6 — Implementation skeleton

The operator playbook (6h spread over ~2 weeks):

1. **(30m) Author `docs/branding/reviewer-shortlist.md`.** Use the §3 seed-set as starting candidates. Re-rank 5+ rows by warmth using the §3 criteria. Commit.
2. **(30m) Author `docs/branding/reviewer-outreach.md`.** Copy the §3 body verbatim. Commit.
3. **(1h) Draft personalised outreach emails for top-3-by-warmth.** Use the §3 template. Personalise the "why DSAF-relevant" sentence per reviewer (their prior work, their publications, their podcast hosting, etc.). Send.
4. **(3 day pause, then ~30m to check responses)** Day 3: no follow-ups. Day 7: brief follow-up to non-responders ("Did this land in spam?"). Day 14: mark `no-response` for non-responders; consider warm-intro paths.
5. **(over the 2-week window, ~1.5h founder-time)** Respond to each reviewer's reply: thank them, incorporate feedback, request consent letter signature if they offered a quote. Use the §3 consent-letter template.
6. **(15m per approved quote)** When a reviewer's consent comes back, commit the quote to `docs/branding/reviewer-quotes-pending.md` (the holding file). Update MEMORY.md.
7. **(15m PR land)** PR description summarises: shortlist top-3 names + warmth scores, top-3 outreach dates, response status counts, holding-file path. FR-DOCS-002 (post-PR) inserts quotes into README.

---

## §7 — Dependencies

- **Upstream (required before outreach):**
  - **FR-BRAND-002** (handle taxonomy) — outreach materials use canonical DSAF / DSAF Levels / DSAF Criteria handles.
  - **FR-CORE-001** (DSAF-25 Core) — outreach materials reference the one-page card.
  - **FR-CORE-004** (self-audit cap) — outreach materials frame the CyberSkill self-audit as L3 worked example, not L5.
- **Downstream blocks:**
  - **FR-DOCS-002** — endorsement quotes from this FR are inserted into the README's endorsement slots.
  - **FR-LAUNCH-001** — Show HN happens only after at least 2 named endorsements are confirmed (per AC5).
- **Coordinated:**
  - **FR-GOV-002** (P2 co-maintainer recruit — placeholder, not yet specified) — uses some of the same shortlist with a different ask.
  - **FR-LAUNCH-004** (P1 personal outreach to 10 named individuals 1 week pre-launch) — uses the FR-GOV-001 shortlist's relationship state as input.
- **External:**
  - Personal email + scheduling tool for back-and-forth with reviewers.
  - Optional: warm-intro requests via mutual connections (LinkedIn DMs, Slack channels).

---

## §8 — Example payloads

### Example: a populated shortlist row

```markdown
| 1 | Nathan Curtis | Independent (EightShapes → Directed Edges) | Written 15+ Medium pieces on DS adoption + measurement; the plan names him as a co-maintainer candidate; he's the closest match for what DSAF measures | 4 | contacted (2026-05-22) |
```

### Example: an approved endorsement quote (post-consent)

```markdown
> "DSAF is the criteria-graded artefact the design-systems space has been missing. The L0-L5 framing is honest about what 'mature' means, and the agent-native posture is genuinely useful — not just buzzword-decoration."
> — Nathan Curtis, Independent design-systems consultant
```

### Example: a declined response handled per §3

```markdown
Email exchange (paraphrased):
- Day 0 outreach to <Reviewer>
- Day 4 reply: "Thanks for thinking of me. I'm slammed with [project] for the next 6 weeks. Not a good time for me. The framework looks substantive — keep at it."
- Day 4 founder response: per §3 "(i) No time / no fit" template.
- Shortlist status updated: `replied-negative (timing-not-fit)`.
- MEMORY.md: `<Reviewer> declined FR-GOV-001 outreach 2026-05-26 due to bandwidth on [project]; revisit at P2 if their schedule clears.`
```

### Example: PR description snapshot

```markdown
## FR-GOV-001 outreach snapshot (PR land 2026-06-05)

Top-3 by warmth, contacted:
1. Nathan Curtis — warmth 4 — contacted 2026-05-22 — status: replied-positive (quote pending consent)
2. Sil Bormüller — warmth 5 — contacted 2026-05-22 — status: replied-positive (quote pending consent)
3. Ben Callahan — warmth 3 — contacted 2026-05-24 — status: no-response (day 12)

Status counts: 3 contacted / 2 replied-positive / 0 replied-negative / 1 no-response.

Quotes in holding: 2 (`docs/branding/reviewer-quotes-pending.md`). Consent letters: 2 (sent; awaiting one approval; one approved + logged).

Holding for FR-DOCS-002:
- Nathan Curtis quote: approved + logged.
- Sil Bormüller quote: consent letter sent 2026-06-04; awaiting approval.

Floor met: 1 of 2 quotes consented; 1 pending. FR-LAUNCH-001 dependency: waiting on Sil Bormüller's consent before opening Show HN window.
```

---

## §9 — Open questions

All resolved at authoring time:

- **Q1: 2 or 3 reviewers floor?** Resolved → 2 (plan §Phase 0 action 7 says "2–3"; floor is 2). Launch is NOT gated on 3+; the "more endorsements landing post-launch" framing is the fallback (per AC5).
- **Q2: Paid endorsements?** Resolved → no. Plan §Phase 0 action 7 says "unpaid blurb-level endorsements." Disclosure obligations + credibility costs outweigh the recruitment benefit.
- **Q3: Co-maintainer ask bundled with this outreach?** Resolved → no. Co-maintainer is FR-GOV-002 (P2 — placeholder). Mixing the two asks confuses the reviewer.
- **Q4: How long is the outreach window?** Resolved → 2 weeks (10–14 days operating window per §1 #10). Earlier risks reviewer forgetting; later risks not enough back-and-forth time.
- **Q5: What if no one in the seed set responds?** Resolved → the shortlist's 10 names is the starting point; if all 10 fail, the operator widens the shortlist via §3 "Re-ranking criteria" (warmer-but-lower-influence candidates). Launch can ship with 2 reviewers even if neither is from the seed-set top-10, as long as they're recognised in the design-systems community.
- **Q6: Quote length cap — 280 chars too short?** Resolved → 280 chars matches Twitter card optimal length. Quotes longer than 280 chars are harder to share on social and harder for the reader to consume. The cap is a discipline gate, not an arbitrary limit.
- **Q7: What if a reviewer wants to retract post-launch?** Resolved → §3 consent letter "Duration: 12 months minimum; you may request removal at any time" + "remove within 7 days." The framework honours retraction; the relationship is preserved.

---

## §10 — Failure modes inventory

| Failure | Detection | Outcome | Recovery |
|---|---|---|---|
| No one in the top-3 responds within 14 days | shortlist status check | No endorsements at launch window close | Extend outreach to next 3 candidates; OR ship launch with 1 endorsement + "more endorsements landing post-launch" framing |
| A reviewer's quote drifts from their actual feedback | reviewer reads the published quote and objects | Reputation damage both sides | §3 consent letter requires explicit approval of the exact text — drift can't happen if consent process is followed; if it does happen post-publication, remove + apologise + replace with a re-approved quote |
| Multiple reviewers in same affiliation cluster (e.g., all from EightShapes) | reviewer shortlist concentration | Endorsement set looks single-source | Diversify the shortlist — reach across affiliations, geographies, role-types (designer / engineer / PM / consultant) |
| A reviewer demands paid compensation after expressing interest | follow-up email | Either pay (breaks the rule) OR lose the endorsement | Politely decline + thank for the consideration; no payment, no endorsement; preserve the relationship |
| Reviewer's response includes a critique that's load-bearing (a real problem in DSAF) | post-response review | Critique reveals a P0 gap | Decide: incorporate the critique BEFORE launch (reschedule launch) OR launch with the critique noted in `docs/known-limitations.md` (a new doc) and address in a fast-follow FR |
| Consent letter exchange takes longer than the outreach window | timeline tracker | Quote not committed in time | Extend launch window; do NOT publish without consent under deadline pressure |
| Reviewer's affiliation changes between approval and launch | LinkedIn check | Quote shows stale affiliation | Send a quick follow-up: "Your bio at the time of approval said X; happy to update to your current affiliation Y?" — most reviewers appreciate the courtesy |
| A reviewer who declined later sees themselves NOT in the launch and asks why | post-launch email | Awkward conversation | Honest reply: "Per your earlier note about timing, I respected your decline. Door's open for future iterations." |
| Public mention of who DECLINED via gossip-channel leaks | social media | Trust break with declined reviewer | Plan §"What NOT to do" item 9 (gracious engagement) applies; immediate private apology + correction; the framework's privacy discipline (§3 anti-patterns) is the prevention |
| Bulk-blast email with `<Name>` placeholder accidentally sent | reviewer reply | Embarrassment | Send a corrected personalised follow-up immediately; rebuild trust over time |
| A reviewer's quote is used outside the consented surfaces (e.g., shared in a fundraising deck) | reviewer notices | Trust break | The consent letter scopes are firm; using outside scope is a violation. If discovered, apologise + remove + commit to a more rigorous consent-tracking system |
| Bulk no-responses (silent decline) | shortlist tracker | Hard to read the room | Treat as soft-decline; preserve relationships; don't chase past day-14 without warm-intro |

---

## §11 — Implementation notes

- **The outreach is a 2-week-elapsed-time process, but only ~6 founder-hours of actual work.** Most of the elapsed time is reviewers' response latency. Set the calendar: outreach Day 0, follow-up Day 7, status close Day 14. PR can land at Day 14 with 2+ confirmed quotes (or with the "extending window" fallback).
- **Why outreach 1-2 weeks pre-launch, specifically:** the plan §Phase 1 action 4 says "Personal outreach to 10 named individuals before launch with a heads-up." That's FR-LAUNCH-004, a *different* outreach (T-7 days, asking for "would value your heads-up roast"). This FR-GOV-001 outreach is *earlier* (T-14 to T-28 days) and asks for endorsement quotes, not heads-up. The two outreaches are distinct in framing + timing; FR-LAUNCH-004 follows FR-GOV-001 by ~1 week.
- **The warmth-first ranking is non-obvious.** Most operators would rank by social influence (Brad Frost at #1 because of *Atomic Design*); the playbook ranks by *warmth* because cold-outreach to high-influence reviewers has near-zero hit rate vs warm-outreach to medium-influence reviewers' high hit rate. The hit-rate math favours warmth.
- **About the "geography-headwind" transparency in the outreach (§1 #13):** this is the founder's most-tested move. Reviewers who would otherwise apply an unconscious geography discount engage *more* warmly when the founder names it. Naming the problem signals strategic awareness; hiding it signals naïveté. Plan §"What NOT to do" item 9 (gracious engagement, not defensive) applies.
- **Why the consent letter is in `docs/branding/reviewer-outreach.md`, not a separate template file:** the outreach playbook is a unified surface — operators reading it follow the flow from outreach → response → consent. Splitting consent into a separate file creates a navigation hop without value. The §3 body is one file.
- **About MEMORY.md updates (§1 #15):** each reviewer's relationship state is a long-term asset. The same 10 names will be approached for FR-GOV-002, FR-LAUNCH-004, FR-CONTENT-003, FR-AUDIT-001. Without memory continuity, each FR re-derives the relationship state from scratch and the framework looks scattered to reviewers ("you contacted me 6 months ago about something different, didn't you?"). MEMORY.md is the founder's relationship CRM.
- **The "Quote but private" decline mode is underused but valuable.** Some reviewers won't endorse publicly but will provide private endorsements for fundraising / partnership contexts. These are valuable assets — they just live in a different surface. The playbook surfaces this mode so operators don't lose the private value when a reviewer declines public.
- **About AC5's elapsed-window check:** the AC is "validated at FR's elapsed-window close, not PR land." This means the PR CAN land with `replied-positive` status for top-3 but without `quote-approved` status — the quote approvals come in the next 1-2 weeks. FR-DOCS-002 + FR-LAUNCH-001 are the downstream gates that wait on the actual approved quotes.

---

*End of FR-GOV-001.*
