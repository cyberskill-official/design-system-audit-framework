---
id: FR-DOCS-002
title: "Land ≥ 2 named outside-reviewer endorsement quotes in README (fill the FR-DOCS-001 slots)"
module: DOCS
priority: MUST
status: accepted
verify: I
phase: P0
milestone: P0 · slice 1 · Pre-launch hardening
slice: 1
owner: Stephen Cheng (Founder)
created: 2026-05-17
shipped: null
related_frs: [FR-DOCS-001, FR-GOV-001, FR-BRAND-002, FR-LAUNCH-001, FR-LAUNCH-004]
depends_on: [FR-GOV-001, FR-DOCS-001]
blocks: [FR-LAUNCH-001]
source_pages:
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Phase 0 — Pre-launch hardening, action 7 completion)"
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§What drives GitHub stars item 4)"
source_decisions:
  - "DEC-030: endorsement quotes land in README + dsaf.dev launch surface ONLY per FR-GOV-001 consent letters — no scope creep"
  - "DEC-031: the README's endorsement section reads as the *final* form pre-launch; FR-DOCS-002 closes P0 by replacing placeholders with named quotes"
language: markdown
service: doctrine
new_files: []
modified_files:
  - README.md
allowed_tools:
  - "file_read/write README.md"
  - "diff for the before/after of the endorsement section"
  - "grep for verifying consent-log alignment"
disallowed_tools:
  - "publish a quote without the corresponding consent-log entry from FR-GOV-001 — the consent letter is the gate"
  - "modify a quote's wording from what the reviewer approved (even to fix a typo) without a new consent acknowledgement"
  - "publish a reviewer's affiliation as different from what their consent letter specified"
  - "add a third quote without consent — 2 is the floor; 3 requires the third consent letter signed"
effort_hours: 3
sub_tasks:
  - "1. (15m) Confirm at least 2 entries in docs/branding/reviewer-quotes-pending.md have matching consent-log entries from FR-GOV-001"
  - "2. (1h) Replace the placeholder endorsement slots in README.md with the approved quotes per §3"
  - "3. (15m) Verify quote text is byte-identical to the consent-letter-approved version (no silent edits)"
  - "4. (15m) Verify reviewer affiliation strings match consent-letter version"
  - "5. (15m) Update docs/branding/reviewer-shortlist.md: status moves from 'quote-approved' to 'quote-published' for each landed quote"
  - "6. (30m) Run §5 verification: ≥ 2 named quotes in README; no remaining placeholder text; consent-log cross-references intact"
  - "7. (15m) PR description includes the diff of the README endorsement section + cross-references to the FR-GOV-001 consent-log entries"
  - "8. (15m) Update MEMORY.md: reviewer states move from quote-approved to quote-published; relationship continuity preserved for future outreach (FR-GOV-002, FR-LAUNCH-004)"
risk_if_skipped: "Without this FR, the README ships with placeholder text (`<endorsement quote>`) where the named-endorsement quotes belong. A scroller seeing `<endorsement quote>` placeholders reads the project as unfinished — the exact opposite of the README-as-finished-product framing FR-DOCS-001 is built around. The cost of this FR is small (3h, mostly mechanical), but the dependency chain matters: FR-LAUNCH-001 (Show HN) depends on FR-DOCS-002 because the launch surface needs landed quotes, not placeholders. Skipping this FR effectively delays launch. The plan §'What drives GitHub stars' item 4 ('a person attached to the work') is the structural reason: launches with named-human endorsements out-perform launches without. This FR is the mechanical step that turns FR-GOV-001's outreach into the actual surface."
---

## §1 — Description (BCP-14 normative)

The README's endorsement-quote placeholder slots (from FR-DOCS-001 §3) MUST be replaced with named, approved, consent-logged endorsement quotes from the FR-GOV-001 outreach. The floor is 2 quotes; the ceiling is "as many as have approved consent letters." This FR is the final P0 step — its completion closes Phase 0 pre-launch hardening.

1. **MUST** replace the README's endorsement placeholder slots with named quotes from `docs/branding/reviewer-quotes-pending.md`. Each placeholder `> "<endorsement quote, ≤ 280 chars>" — <Reviewer Name>, <Affiliation>` becomes `> "<actual approved quote>" — <Reviewer Name>, <Reviewer Affiliation>`. The replacement is mechanical; the content is from FR-GOV-001.
2. **MUST** land at least 2 named quotes in the README before this FR is considered shipped. The floor matches FR-GOV-001 AC5. If FR-GOV-001 closes with only 1 confirmed quote, this FR is BLOCKED — the launch waits OR FR-GOV-001's outreach window extends OR an additional warm-intro outreach lands the second quote.
3. **MUST** verify byte-identical match between the quote text in `docs/branding/reviewer-quotes-pending.md` and the quote text published in README. No silent edits (typo fixes, punctuation tweaks, word substitutions). A reviewer who finds their published quote different from their consent-approved version is a relationship break. The verification is mechanical: `diff <(extract README quote) <(extract pending-quotes file quote)` returns empty.
4. **MUST** verify the reviewer's name + affiliation strings match exactly what they approved in the consent letter (per FR-GOV-001 §3 consent letter template). Affiliation strings have multiple correct forms (e.g., "Independent" vs "Independent design-systems consultant" vs "Directed Edges (formerly EightShapes)"); the consent-letter-approved version is the canonical.
5. **MUST** preserve quote ordering by warmth/order-of-confirmation (operator's choice — typically order-of-confirmation, matching the chronological audit trail). The README's endorsement section reads in that order; there is no "headline quote" hierarchy that demotes one reviewer below another.
6. **MUST** remove the placeholder annotation block from FR-DOCS-001 §3 (`*(Endorsements landing via [FR-DOCS-002] — placeholder, not yet specified. Outreach owned by [FR-GOV-001] — placeholder, not yet specified.)*`). With both FRs now shipped (FR-GOV-001 + FR-DOCS-002), the placeholder annotation is stale.
7. **MUST NOT** publish a third (or fourth, fifth, …) quote without a consent letter for that specific reviewer. Each quote is gated on its own consent letter; bulk-publishing without per-quote consent is forbidden.
8. **MUST NOT** modify a published quote post-merge without a fresh consent acknowledgement from the reviewer. A typo fix requires the reviewer's "yes, that fix is fine" in writing.
9. **MUST** update `docs/branding/reviewer-shortlist.md` per landed quote: the row's status moves from `quote-approved` to `quote-published` with the publication date appended.
10. **MUST** update MEMORY.md (BRAIN store) with each reviewer's new state. Memory entries: `<Reviewer> quote published in README + dsaf.dev launch surface on <date>; relationship status: warm; revisit for FR-GOV-002 co-maintainer outreach at P2 if applicable.`
11. **MUST** support quote retraction within 7 days per FR-GOV-001 §3 consent letter terms. If a reviewer requests removal, the next PR removes the quote from README and updates the shortlist status to `quote-retracted (<date>, reason)`. The decision to ship a launch with one-fewer quote vs delay the launch is a §1 #2 floor check.
12. **MUST** ensure the README's endorsement section is positioned per FR-DOCS-001 §3 (between "DSAF-25 Core cross-link" / "Quick Start" and "Worked example") — NOT in the first 200 words pitch, NOT below the License section. The section's location is FR-DOCS-001's decision; this FR preserves it.
13. **MUST** allow a quote to span 1–2 short paragraphs IF the reviewer's approved quote is over a single sentence. The 280-char cap from FR-GOV-001 §1 #3 is per-quote (the full quoted text); the rendering may be one block-quote with internal line breaks.
14. **MUST NOT** add any commentary, framing, or annotation to a quote in the README. The quote is presented verbatim with attribution; no "we love this insight from X" preamble. The reviewer's words speak for themselves.

---

## §2 — Why this design

**Why a separate FR (not just an FR-DOCS-001 amendment) (§1 #1):** the README rewrite (FR-DOCS-001) is structurally distinct from the endorsement quotes (FR-GOV-001 + FR-DOCS-002). The rewrite is doctrine; the quotes are operations (outreach + consent + publication). Splitting the two FRs lets the structural changes ship independently — FR-DOCS-001 lands first with placeholders, the outreach runs, FR-DOCS-002 lands later with the real quotes. If both were one FR, the operator couldn't ship the structural part until the outreach completes — adding 2 weeks of dependency latency to FR-LAUNCH-001's critical path.

**Why byte-identical quote verification (§1 #3):** silent edits to quoted text are the most predictable relationship break. A reviewer who finds their published quote different from what they approved reads "they don't respect what I said" — the substantive misrepresentation is secondary to the procedural disrespect. Byte-identical verification is mechanical; the discipline costs 5 minutes and prevents the multi-year damage of a Brad-Frost-style "I'm withdrawing my endorsement" tweet.

**Why no commentary or framing (§1 #14):** "We love this insight from X" preambles dilute the quote's authority. The quote stands; the framing is implicit (the founder selected it for the README). Adding founder voice around the quote shifts attention to the founder; the framework's job at this surface is to let the reviewer speak.

**Why 7-day retraction window honoured (§1 #11):** the FR-GOV-001 consent letter promises "remove within 7 days." Honouring that promise is the structural credibility move — reviewers who see the framework keep its consent commitments are willing to engage in future outreaches. Violating the 7-day window would damage the seed set permanently.

**Why update MEMORY.md per landed quote (§1 #10):** the reviewer's state is now `quote-published` rather than `quote-approved`. Future outreaches (FR-GOV-002 co-maintainer, FR-LAUNCH-004 launch heads-up, FR-CONTENT-003 co-author piece, FR-AUDIT-001 marquee-DS team consent) need to know each reviewer is currently in `quote-published` status. Without the memory update, a future outreach asks for endorsement again without realizing the relationship already produced one — a slightly awkward repeat that signals lack of continuity.

**Why no third-quote-without-consent (§1 #7):** the principle from FR-GOV-001 (consent before publication) is firm. Adding a third quote because "well, we got 4 reviewers eventually" requires the third reviewer's signed consent. Even if their feedback was positive in an earlier exchange, posting the quote without the consent letter is a violation.

**Why preserve FR-DOCS-001's section placement (§1 #12):** the README structure is the founder's careful read-flow design — pitch / visuals / DSAF-25 cross-link / Quick Start / endorsements / worked example / Reading Order. Moving the endorsements section breaks the read-flow. FR-DOCS-002 is the *filling* step, not the *re-architecting* step.

**Why allow 1–2 short paragraphs (§1 #13):** some reviewers produce two short sentences that together capture the right framing. Forcing them into one block quote with no line breaks reads poorly; allowing one block quote with internal line breaks preserves readability without losing the verbatim-quote discipline.

---

## §3 — Doctrine contract

### `README.md` — the endorsement section transformation

**Before** (post-FR-DOCS-001 state):

```markdown
## Endorsements

> "<endorsement quote, ≤ 280 chars>" — <Reviewer Name>, <Affiliation>

> "<endorsement quote, ≤ 280 chars>" — <Reviewer Name>, <Affiliation>

*(Endorsements landing via [FR-DOCS-002](docs/feature-requests/docs/FR-DOCS-002-endorsement-quotes.md) — placeholder, not yet specified. Outreach owned by [FR-GOV-001](docs/feature-requests/gov/FR-GOV-001-recruit-reviewers.md) — placeholder, not yet specified.)*
```

**After** (post-FR-DOCS-002 — with illustrative quotes; actual quotes per FR-GOV-001 consent log):

```markdown
## Endorsements

> "DSAF is the criteria-graded artefact the design-systems space has been missing. The L0-L5 framing is honest about what 'mature' means, and the agent-native posture is genuinely useful — not just buzzword-decoration."
> — Nathan Curtis, Independent design-systems consultant (formerly EightShapes / Directed Edges)

> "A 125-criterion rubric that ships with shipping scripts — the gap between blog-post methodology and SaaS audit platform. Worth running on your own design system before your next leadership review."
> — Sil Bormüller, Founder, Into Design Systems
```

*Note: the actual quote text + attribution comes from `docs/branding/reviewer-quotes-pending.md` per FR-GOV-001 consent letters — the operator at PR land time replaces the illustrative quotes above with the real ones. The illustrative quotes are NOT to be published as-is; they're authoring scaffolding.*

### `docs/branding/reviewer-shortlist.md` — status transitions

For each landed quote, the row's `Outreach status` column updates from `quote-approved` to `quote-published (<YYYY-MM-DD>)`. Example:

**Before:**

```markdown
| 1 | Nathan Curtis | Independent (EightShapes → Directed Edges) | <one-line> | 4 | quote-approved |
```

**After:**

```markdown
| 1 | Nathan Curtis | Independent (EightShapes → Directed Edges) | <one-line> | 4 | quote-published (2026-06-08) |
```

### MEMORY.md update pattern

Per landed quote, append to the project's MEMORY.md:

```markdown
- [Reviewer endorsement landed](feedback_reviewer_<name>.md) — <Reviewer Name>'s quote published in README + dsaf.dev launch surface on <date>; relationship: warm; revisit for FR-GOV-002 co-maintainer outreach at P2 if scope matches.
```

(The `MEMORY.md` lives at the project root or in the BRAIN store per the project's CLAUDE.md.)

### Cross-reference cleanup

The FR-DOCS-001 §3 README body had the placeholder annotation block `*(Endorsements landing via FR-DOCS-002 ...)*`. With this FR shipped, the annotation is stale and removed. The cross-references to FR-DOCS-002 + FR-GOV-001 elsewhere (if any) are updated from `# placeholder — not yet specified` to clean references.

---

## §4 — Acceptance criteria

1. **≥ 2 named quotes in README** — `grep -cE '^> "[^<]' README.md` ≥ 2 (the `[^<]` excludes the placeholder `> "<endorsement quote>` form). Each quote is a real reviewer's words, not placeholder text.
2. **No placeholder text remaining** — `grep -ciE '<endorsement quote>|<reviewer name>|<affiliation>' README.md` returns 0.
3. **Each quote ≤ 280 chars** — for each `> "..."` block-quote line, the quoted text is ≤ 280 characters (excluding the `> ` prefix, attribution line, and surrounding markdown).
4. **Each quote has an attribution line** — every `> "..."` line is immediately followed (or on the same line after an em-dash) by `— <Name>, <Affiliation>`.
5. **Byte-identical match to consent-log** — for each published quote, `docs/branding/reviewer-quotes-pending.md` (or `docs/branding/reviewer-consent-log.md`) contains a record with the same byte-identical quote text. `diff <(extract README quotes) <(extract consent-log quotes)` returns empty for matched pairs.
6. **Affiliation strings match consent-letter version** — for each reviewer, the affiliation string in README matches the consent-letter-approved version (manual reviewer-check; PR description records the verification).
7. **Placeholder annotation block removed** — `grep -cE 'Endorsements landing via.*placeholder, not yet specified' README.md` returns 0.
8. **Shortlist status updated** — for each landed quote, `docs/branding/reviewer-shortlist.md` shows the row's status as `quote-published (<YYYY-MM-DD>)` per §3.
9. **No third quote without consent** — number of quotes in README equals the number of `quote-approved` or `quote-published` entries in `docs/branding/reviewer-shortlist.md`.
10. **MEMORY.md updated** — for each landed quote, a memory entry exists per §3 pattern.
11. **No founder commentary around quotes** — `awk '/^> "/,/^$/' README.md` returns ONLY block-quote lines + attribution lines + blank line; no preamble or follow-up commentary inside the endorsement section.
12. **Endorsement section in correct position** — between FR-DOCS-001's "Quick Start" section and "Worked example" section. `awk '/^## Quick start/,/^## Worked example/' README.md | grep -q '## Endorsements'` returns success.
13. **PR description includes**: (a) which reviewers' quotes are landing in this PR, (b) the consent-log entry path for each, (c) the diff of the README endorsement section before/after, (d) any reviewers whose consent is pending (not landing in this PR) and the expected timeline.
14. **No retraction-window violation** — if any reviewer has signaled retraction in the 7 days before this PR lands, that reviewer's quote is NOT published. PR description names any retracted-quote reviewers and confirms the 7-day window.

---

## §5 — Verification

```bash
# AC1 — at least 2 named quotes
grep -cE '^> "[^<]' README.md   # >= 2

# AC2 — no placeholder text
grep -ciE '<endorsement quote>|<reviewer name>|<affiliation>' README.md   # 0

# AC3 — quote length cap
awk '/^> "[^<]/' README.md | awk -F '"' '{ if (length($2) > 280) print "TOO LONG: " $2 }'
# expected: empty

# AC4 — attribution lines
quote_count=$(grep -cE '^> "[^<]' README.md)
attr_count=$(grep -cE '^>? *— ' README.md)
[ "${attr_count}" -ge "${quote_count}" ] || echo "FAIL AC4: attribution count < quote count"

# AC5 — byte-identical (assuming pending-file exists; operator checks at PR land)
# This is a manual diff check at PR review; commit a copy of relevant quotes alongside in PR description.

# AC7 — placeholder annotation removed
grep -cE 'Endorsements landing via.*placeholder' README.md   # 0

# AC8 — shortlist status
quote_published_rows=$(grep -c 'quote-published' docs/branding/reviewer-shortlist.md)
quotes_in_readme=$(grep -cE '^> "[^<]' README.md)
[ "${quote_published_rows}" -eq "${quotes_in_readme}" ] || echo "FAIL AC8: shortlist count ${quote_published_rows} != README quotes ${quotes_in_readme}"

# AC9 — no extra-quotes-without-consent
quote_approved_or_published=$(grep -cE 'quote-(approved|published)' docs/branding/reviewer-shortlist.md)
[ "${quotes_in_readme}" -le "${quote_approved_or_published}" ] || echo "FAIL AC9: extra quote without consent"

# AC11 — no founder commentary inside section (manual check; this approximation):
awk '/^## Endorsements/,/^## /' README.md | grep -vE '^(##|>|—| *$)' | grep -v 'Endorsements'
# expected: empty (no narrative paragraphs in the endorsement section)

# AC12 — section position
awk '/^## Quick start/,/^## Worked example/' README.md | grep -q '## Endorsements'
```

Human-verified ACs (no script):

- **AC5, AC6** — reviewer reads the PR description's quote+attribution citation and diffs against the consent-log file.
- **AC10** — reviewer verifies MEMORY.md updates after PR merge.
- **AC13, AC14** — reviewer reads PR description for the snapshot + retraction-window check.

---

## §6 — Implementation skeleton

The operator playbook (3h):

1. **(15m) Verify consent.** Open `docs/branding/reviewer-quotes-pending.md` (or wherever FR-GOV-001 stored approved quotes). Confirm at least 2 entries have matching consent-log entries (per FR-GOV-001 §3 consent letter signed-and-archived discipline).
2. **(1h) Patch README.md.** Replace each placeholder `> "<endorsement quote ...>"` block with the approved quote + reviewer name + affiliation per §3. Be precise: byte-identical quote text, consent-letter-approved attribution string.
3. **(15m) Byte-identical verification.** For each quote, run `diff` between the README extract and the pending-file extract. Fix any mismatch by reverting to consent-letter version (NEVER by editing the consent-letter version to match a README typo).
4. **(15m) Remove placeholder annotation block.** Delete the `*(Endorsements landing via FR-DOCS-002 ...)*` line from the README.
5. **(15m) Update `docs/branding/reviewer-shortlist.md`** — for each landed quote, change row status from `quote-approved` to `quote-published (<YYYY-MM-DD>)`.
6. **(30m) Run §5 verification.** Paste output in PR description.
7. **(15m) Update MEMORY.md** per landed reviewer per §3 pattern.
8. **(15m) PR description.** Include: which reviewers' quotes are landing, consent-log paths, before/after diff of the endorsement section, any pending quotes + expected timeline, retraction-window check.

---

## §7 — Dependencies

- **Upstream (required before this FR can land):**
  - **FR-GOV-001** — the outreach + consent letters; at least 2 quote-approved entries exist.
  - **FR-DOCS-001** — the README has placeholder endorsement slots in the right position.
- **Downstream blocks:**
  - **FR-LAUNCH-001** (Show HN) — launch surface needs landed quotes, not placeholders. The Show HN post can quote one of the README endorsements as social proof.
- **Coordinated:**
  - **FR-LAUNCH-004** (T-7 days heads-up outreach) — landed endorsement quotes feed into the heads-up email ("you'll see Nathan Curtis + Sil Bormüller's quotes on the README; here's the URL").
- **External:** none. This FR is doctrine + repo-mechanical.

---

## §8 — Example payloads

### Example: a successful before/after diff

**Before:**

```markdown
## Endorsements

> "<endorsement quote, ≤ 280 chars>" — <Reviewer Name>, <Affiliation>

> "<endorsement quote, ≤ 280 chars>" — <Reviewer Name>, <Affiliation>

*(Endorsements landing via [FR-DOCS-002](docs/feature-requests/docs/FR-DOCS-002-endorsement-quotes.md) — placeholder, not yet specified. Outreach owned by [FR-GOV-001](docs/feature-requests/gov/FR-GOV-001-recruit-reviewers.md) — placeholder, not yet specified.)*
```

**After:**

```markdown
## Endorsements

> "DSAF is the criteria-graded artefact the design-systems space has been missing. The L0–L5 framing is honest about what 'mature' means, and the agent-native posture is genuinely useful."
> — Nathan Curtis, Independent design-systems consultant

> "A 125-criterion rubric that ships with shipping scripts — the gap between blog-post methodology and SaaS audit platform. Worth running on your own design system before your next leadership review."
> — Sil Bormüller, Founder, Into Design Systems
```

### Example: PR description snapshot

```markdown
## FR-DOCS-002 landing summary

Quotes landing in this PR:
1. Nathan Curtis — consent-log entry: docs/branding/reviewer-consent-log.md row 2026-06-04 — approved as written.
2. Sil Bormüller — consent-log entry: docs/branding/reviewer-consent-log.md row 2026-06-05 — approved with affiliation correction ("Founder, Into Design Systems" — added 'Founder' per her request).

Pending (not landing in this PR):
- Ben Callahan — no-response (Day 14); will revisit at P2 with a warm-intro path.

Retraction-window check: no retractions signaled in the 7 days before this PR.

Diff: README §Endorsements (placeholder block removed; 2 named quotes added).
Shortlist status: rows for Nathan Curtis + Sil Bormüller moved from `quote-approved` to `quote-published (2026-06-08)`.
MEMORY.md: 2 entries appended per FR-DOCS-002 §3 pattern.
```

### Example: a retracted quote (hypothetical post-launch)

A reviewer requests removal 30 days post-launch. This isn't FR-DOCS-002's PR (FR-DOCS-002 is the *initial* landing); the retraction is a follow-up PR. The follow-up PR:

- Removes the quote from README within 7 days of the request.
- Updates shortlist row to `quote-retracted (2026-07-15, reason: reviewer's job change)`.
- Updates MEMORY.md: `<Reviewer> retracted quote 2026-07-15 due to <reason>; relationship: cordial; no public mention; revisit only if reviewer initiates.`
- Does NOT publicly comment on the retraction; the framework's consent-respecting behaviour is the only signal.

---

## §9 — Open questions

All resolved at authoring time:

- **Q1: Can a quote be edited post-landing if the reviewer approves the edit?** Resolved → yes, via a follow-up PR with a fresh consent acknowledgement (per §1 #8). The consent letter from the original approval covers the original wording; an edit needs a fresh "yes, that change is fine" in writing.
- **Q2: How many quotes is too many?** Resolved → no hard ceiling. The floor is 2 (§1 #2). 3-4 is a natural ceiling because README space and reader attention are finite; 5+ becomes a list rather than endorsements. Practical guidance: ship with what's approved; FR-DOCS-002 amendments can add more later.
- **Q3: Quote ordering — alphabetical, by warmth, by influence, by order-of-confirmation?** Resolved → order-of-confirmation (§1 #5). Matches the chronological audit trail; avoids implicit hierarchy.
- **Q4: Should the framework cite the reviewer's role at the time of quote (e.g., "Nathan Curtis, while at EightShapes") if their affiliation changes?** Resolved → use the consent-letter-approved affiliation. If the reviewer changes affiliation post-landing and wants the README updated, that's a fresh consent acknowledgement (§1 #8 applies).
- **Q5: What if a reviewer's consent letter is verbal/recorded-call instead of email?** Deferred → FR-GOV-001 §3 consent letter template assumes email; verbal consent is harder to verify. If a reviewer prefers recorded-call consent, log the recording + transcript in the consent log; the verification gate is the same (byte-identical quote, approved affiliation, scope agreement).
- **Q6: Is FR-DOCS-002 also responsible for adding quotes to dsaf.dev launch surface?** Resolved → README is in-scope of this FR; dsaf.dev surface is parallel — same quotes, different location. The dsaf.dev/launch page (per FR-BRAND-001 + FR-LAUNCH-001) embeds the same quotes via the same consent letters. FR-DOCS-002's PR may bundle the dsaf.dev update if the operator wants; otherwise it ships in the same window as FR-LAUNCH-001.
- **Q7: What about the Show HN comment thread? The consent letter covered "Show HN comment if I'm asked who endorsed" — what does that mean operationally?** Resolved → the Show HN post itself does NOT include the endorsement quotes (that would over-stuff the post). If a commenter asks "who endorsed this?" the founder's reply links to the README endorsements section. The link is the "Show HN comment" surface the consent covered.

---

## §10 — Failure modes inventory

| Failure | Detection | Outcome | Recovery |
|---|---|---|---|
| Operator publishes quote with typo from their copy-paste | byte-identical check fails | Reviewer trust break | Revert to consent-letter version; apologise privately; ship a follow-up PR if needed |
| Operator publishes quote with different affiliation than approved | AC6 manual check | Reviewer trust break | Revert to consent-letter version; apologise; future PRs include the verification screenshot |
| Reviewer requests retraction within 7-day window | reviewer email | Quote must be removed pre-launch | Remove from README in next PR; if launch is imminent, decide: ship with 1-fewer quote (if floor still met) vs delay launch (if floor would break) |
| Operator drafts a third quote from a reviewer who responded but didn't sign consent letter | shortlist audit | Consent violation | Remove the third quote; the floor (2) is still met; consent-only-with-letter discipline preserved |
| README placeholder block accidentally retained | AC7 grep returns > 0 | Reader sees `<endorsement quote>` placeholder | Fix immediately; AC7 catches at PR review |
| Shortlist status not updated post-landing | AC8 mismatch | Audit trail stale | Update at PR time; same PR has README + shortlist updates as paired changes |
| MEMORY.md update forgotten | manual check | Future outreach lacks relationship continuity | Operator's checklist + §6 step 7 + §3 MEMORY.md pattern; the discipline is auditable |
| Quote ordering implies hierarchy (e.g., placing a famous reviewer first) | reviewer pushback | Awkwardness | §1 #5 order-of-confirmation rule defaults to chronological; deviations require operator note |
| Quote exceeds 280 chars (consent letter approved the longer text) | AC3 fails | Format inconsistency | The 280-char cap is from FR-GOV-001 §1 #3; if a reviewer's approved quote exceeds, FR-GOV-001's discipline failed at consent-letter time. Recovery: request a new shorter quote from the reviewer (with new consent letter) OR ship the longer quote with the cap exception noted in §11 implementation notes |
| Two reviewers' quotes are nearly identical (boilerplate-sounding) | reviewer/founder spot-check | Endorsements look fake | Diversify the quotes — request a different angle from one reviewer (with new consent) OR accept the similarity (both genuinely felt the same way) |
| Reviewer's quote-published date is wrong (typo in shortlist) | shortlist audit | Audit trail wrong | Fix in a follow-up commit; the publication date is the canonical |
| FR-DOCS-002 PR lands before FR-LAUNCH-001's preflight (launch window not open yet) | timing | Quote published but no launch surface to support it | Acceptable — README is the canonical surface; dsaf.dev launch page can be drafted post-FR-DOCS-002. The launch can be scheduled with the README endorsement section ready |

---

## §11 — Implementation notes

- **The 3-hour budget is mostly mechanical.** The hard work (outreach, consent-letter exchange, quote approval) is done by FR-GOV-001. FR-DOCS-002 is the act of carefully replacing 2-3 placeholders with verified-approved text. The risk surface is small but the verification discipline matters.
- **Byte-identical verification is non-negotiable.** A reviewer reading their published quote, even years later, can compare it to their email-trail copy. Any deviation — even punctuation fixes — is detectable and damages the relationship. Use `diff` or visual comparison; never trust "looks right."
- **About the §1 #14 "no commentary around quotes" rule:** the temptation to add "We're thrilled by this from Nathan Curtis!" is real but counter-productive. The quote already conveys what the founder wants the reader to see; adding framing dilutes it and shifts attention to the founder. Compare: DORA's website doesn't preamble Pravir Chandra's endorsement; the endorsement stands.
- **Quote ordering by confirmation matters more than it sounds.** A reviewer who consented first sees their quote first; their effort + speed is honoured. A reviewer who consented second sees their quote second; same honour, in proper proportion. Alphabetical or by-influence orderings invite "why is X first?" critiques that order-of-confirmation simply avoids.
- **About the 7-day retraction window:** the window starts when the reviewer signals retraction (email, DM, etc.), not when the founder decides to act. A retraction request on Day 1 of launch week means the quote is removed by Day 8. If launch happens Day 5, the quote IS in the launch surface on Day 5 but removed on Day 8 — that's acceptable. The window honours the commitment without artificially delaying launch.
- **MEMORY.md becomes load-bearing post-FR-DOCS-002.** Future FRs (FR-GOV-002, FR-LAUNCH-004, FR-CONTENT-003, FR-AUDIT-001) consult MEMORY.md to know each reviewer's current state. A reviewer in `quote-published` status who's asked for a co-maintainer commitment 6 months later experiences continuity: "Thanks for the README quote — we've been thinking about a deeper relationship; co-maintainer role at the dsaf neutral org would mean...". Without memory, the founder asks cold; with memory, the founder builds.
- **About the dsaf.dev launch page parallel (§9 Q6):** the same quotes appear on both surfaces (README + dsaf.dev/launch). The consent letters cover both. Operationally, either ship the dsaf.dev update in the same PR as FR-DOCS-002 OR in FR-LAUNCH-001's PR. The two are equivalent — pick by what's mechanically easier.
- **This FR closes Phase 0.** With FR-DOCS-002 shipped, all 10 P0 FRs are at `accepted (10/10)`. The framework is pre-launch defensible — DSAF-25 on one page, dsaf.dev minted + decoupled, 84.6% headline removed, L0–L5 + radar SVGs in `/assets/`, README HN-ready, no-silent-regression rule, ≥ 2 named endorsements landed. FR-LAUNCH-001 is the next-ready FR.

---

*End of FR-DOCS-002.*
