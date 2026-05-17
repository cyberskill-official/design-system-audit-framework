---
id: FR-CORE-004
title: "Cap CyberSkill self-audit at L3 publicly; remove '84.6% combined' headline from all external surfaces"
module: CORE
priority: MUST
status: accepted
verify: I
phase: P0
milestone: P0 · slice 1 · Pre-launch hardening
slice: 1
owner: Stephen Cheng (Founder)
created: 2026-05-17
shipped: null
related_frs: [FR-BRAND-002, FR-BRAND-004, FR-DOCS-001, FR-CORE-001, FR-CORE-003, FR-CERT-001]
depends_on: []
blocks: [FR-DOCS-001, FR-BRAND-004, FR-CERT-001]
source_pages:
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Honest critique items 3, 8)"
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§What NOT to do items 2, 3, 4)"
  - "examples/cyberskill-design-system/improvement-plan.md (existing self-audit artefact)"
source_decisions:
  - "DEC-005: self-audits cap at L3 in marketing; full audit reports remain published as example artefacts"
  - "DEC-006: single-number combined score is banned from external-facing marketing copy; lead with the DSAF Level and a radar chart"
  - "DEC-007: third-party verification is the only path past L4 (deferred to FR-CERT-001, P6)"
language: markdown
service: doctrine
new_files:
  - docs/branding/self-audit-policy.md
modified_files:
  - README.md
  - docs/01-introduction.md
  - docs/07-maturity-tiers.md
  - examples/cyberskill-design-system/improvement-plan.md
  - examples/cyberskill-design-system/_history.md
allowed_tools:
  - "file_read/write docs/**, README.md, examples/cyberskill-design-system/**"
  - "grep / ripgrep for '84.6', 'L5', 'industry-leading', 'top tier' across the repo"
disallowed_tools:
  - "rewrite the example audit report's per-criterion scores in examples/cyberskill-design-system/ — that is calibration territory; this FR is about external-facing surfaces"
  - "publish a separate 'real' CyberSkill audit at L5 in a private channel and a fake one at L3 publicly — capping means the public number is the one CyberSkill operates against"
  - "delete the example artefact — it stays as a worked example; only its headline framing changes"
effort_hours: 3
sub_tasks:
  - "1. (30m) ripgrep 'CyberSkill', '84.6', 'L5', 'industry-leading', 'top tier' across the repo; tabulate hits in PR description"
  - "2. (30m) author docs/branding/self-audit-policy.md per §3"
  - "3. (45m) apply find/replace patches per §3 to README.md, docs/01-introduction.md, docs/07-maturity-tiers.md, examples/cyberskill-design-system/improvement-plan.md, examples/cyberskill-design-system/_history.md"
  - "4. (15m) sanity-check that the example audit report's interior scores stay intact — only headline framing changes"
  - "5. (15m) re-grep; verify zero banned-headline hits"
  - "6. (15m) PR description includes the before/after grep counts and a one-paragraph rationale"
risk_if_skipped: "A consultancy publishing a 125-criterion audit framework that scores its own design system at L5 (top tier) with an 84.6% headline is the single most predictable Show HN / Twitter / LinkedIn takedown. The plan explicitly names this as the highest-credibility-risk issue: 'Auditors audit themselves at L5, news at 11.' Skipping this FR is a P0 launch-blocker — the framework's first cited mention will be the takedown, not the methodology. The mitigation is mechanically cheap (rewrite a few headlines, publish a one-page self-audit policy) and structurally cheap (the worked example remains valuable as an artefact; only the framing changes). Skipping also blocks FR-DOCS-001 (README rewrite) because the README inherits this FR's framing rule, and blocks FR-CERT-001 (P6 certification scheme) because the cap-at-L4-without-third-party rule is the rule the certification scheme codifies."
---

## §1 — Description (BCP-14 normative)

CyberSkill's self-audit MUST be framed as an *example artefact* — not as a marketing claim of industry leadership. The framework's external surfaces MUST NOT lead with the combined-percentage score, MUST cap the publicly cited self-audit at L3 (Managed), and MUST disclaim self-audits at L4+ as requiring third-party verification.

1. **MUST** remove every external-facing reference to the "84.6% combined" headline number for CyberSkill's design system. External surfaces in scope: `README.md`, `docs/01-introduction.md`, `docs/07-maturity-tiers.md` (text references, not the rubric itself), `examples/cyberskill-design-system/improvement-plan.md` (its summary/intro framing), `examples/cyberskill-design-system/_history.md` (its summary column), and any future `dsaf.dev/` landing copy. The interior per-criterion scores in the example audit report remain intact — only headline framing changes.
2. **MUST** cap publicly cited CyberSkill self-audit results at L3 (Managed) in marketing copy, ratings cards, certification badges, and any "DSAF Level reached" claim. The interior scores in the example audit report MAY exceed L3 (they reflect honest self-assessment per the rubric), but the framing — the headline, the summary, the README mention — caps at L3. Specifically: if the interior calculation lands at L4 or L5, the public framing MUST read "CyberSkill self-audit (capped at L3 — uncertified)" with a footnote explaining the cap.
3. **MUST** publish `docs/branding/self-audit-policy.md` (see §3) as the single source of truth for the self-audit cap rule. The policy is normative and applies to every self-audit any consultancy runs against DSAF for publication purposes. It is NOT a constraint on private internal audits — teams may self-score against the full 0-5 scale internally — only on what is published outward as a DSAF claim.
4. **MUST** establish the *honesty rule* that connects the cap to the certification path: self-audits cap at L4 (Managed-advanced) WHEN third-party verification is present; cap at L3 (Managed) WHEN it is absent. CyberSkill does not have third-party verification yet (FR-CERT-001 is P6); therefore CyberSkill's public self-audit caps at L3. The cap moves to L4 only if and when FR-CERT-001's verified-tier verifier audits CyberSkill.
5. **MUST** rewrite the example audit report's headline section in `examples/cyberskill-design-system/improvement-plan.md` to: (a) lead with the DSAF Level reached (capped at L3), not a combined percentage; (b) include a radar chart (or a placeholder citing FR-BRAND-003 if the SVG isn't ready) showing per-category breakdown; (c) include a footnote about the L3-cap rule; (d) preserve the per-criterion interior scores unchanged.
6. **MUST** add a section to `docs/07-maturity-tiers.md` titled "Self-audit cap rule" that codifies the cap-at-L3-without-verification rule. The section MUST cite `docs/branding/self-audit-policy.md` as the source of truth.
7. **MUST** add a self-audit-cap row to the example's `_history.md`: the audit was *signed* at the interior score (whatever it is), but the publicly cited tier is L3.
8. **MUST NOT** publish a separate "private real" audit at L5 alongside a "public capped" audit at L3 — the capping is a publication-framing rule, not a dual-bookkeeping rule. The interior score is the same number in both contexts; only the *headline frame* differs.
9. **MUST NOT** quote a combined-percentage number as a standalone marketing claim anywhere external. Combined percentages MAY appear inside per-audit data tables (the audit report's interior, the `_history.md` register) where they are calibration data, not marketing.
10. **MUST NOT** delete the example audit from `examples/cyberskill-design-system/` — the worked example is a load-bearing artefact for new auditors learning the framework. Only its headline framing and external citations change.
11. **MUST** add a one-paragraph rationale to the public README (or to `docs/01-introduction.md`) explaining the cap rule so external readers see it before they see CyberSkill's self-audit. The rationale exists to pre-empt the "auditor self-grades at L5" critique.
12. **MUST** preserve the example as a *worked artefact for learners* — the README citation reads "see `examples/cyberskill-design-system/` for a complete worked example of an L3-tier self-audit produced under DSAF SCAN + FIX modes" rather than "see how CyberSkill scored 84.6% combined."
13. **MUST** document the cap-lift trigger: if and when CyberSkill (or any signatory of the self-audit policy) obtains third-party verification per FR-CERT-001 (P6 — placeholder, not yet specified), the policy authorises lifting the public cap from L3 to L4 (or, if the verifier signs off AND the L5-entry-gate stack is satisfied, to L5). The cap-lift trigger and procedure live in `docs/branding/self-audit-policy.md`.
14. **MUST** preserve the headline framing across future SCAN/FIX cycles: when an audit re-runs on `examples/cyberskill-design-system/`, the §10 Criteria scores table re-computes per the rubric (interior numbers may move with FIX results), but the headline framing (`Worked Example Audit`, `Cited Level: L3`, cap-rule footnote) MUST NOT regress to a single-percentage or L5 headline. The headline is policy-level state; the interior is per-audit state. Any future FR that supersedes this one MUST explicitly amend `docs/branding/self-audit-policy.md` before the framing changes.
15. **MUST** scope changes to two clearly distinct surfaces — *framing* and *interior*. Framing surfaces (in scope for this FR): H1, first-paragraph summary, executive summary banner, README citation, `_history.md` cited-tier column, dsaf.dev / press-kit headline copy. Interior surfaces (out of scope — MUST NOT change in this FR): §10 Criteria scores per-row values, §1 SCAN Baseline interior, §2 Research findings, §3 Findings, §6 Execution log, §8 RE_AUDIT post-fix scores. The git diff at AC9 enumerates this split.

---

## §2 — Why this design

**Why cap publicly at L3 and not L4 (§1 #2, #4):** L4 (Managed-advanced) per `docs/07-maturity-tiers.md` requires "multi-platform tokens, RFC process, CI gates, federated contribution, public roadmap, adoption telemetry" — most of which CyberSkill plausibly has. L5 (Optimised) requires "independent third-party WCAG audit, public OSS release with > 50 stars, ≥ 5 external contributors, named customer adoption, ≥ 2 prior audits" — most of which CyberSkill *doesn't* have. Capping at L3 is the conservative-but-honest framing. The plan's rule is "self-audits cap at L3 publicly OR explicitly disclaim the self-audit as an example artefact" — we do both: cap at L3 *and* reframe as example artefact.

**Why a combined-percentage ban (§1 #1, #9):** combined percentages are reductive marketing numbers. They contradict the rest of the framework's nuance (per-category roll-ups, FIXED vs DYNAMIC tags, confidence ratings, the enterprise-grade threshold table). The plan explicitly calls "'Combined 84.6%' is a reductive headline number that contradicts the rest of the framework's nuance." The cure is to lead with the DSAF Level (a tier name) and a radar chart (a per-category visual) — both of which carry more information than a single percentage and resist the "we're better than competitor X" comparison the framework refuses to enable.

**Why preserve the example artefact (§1 #10, #12):** the worked example is the single most valuable onboarding artefact for new auditors. Deleting it would lose pedagogical value to avoid a headline that we can fix with framing. Reframing as "complete worked example of an L3 self-audit" preserves the value, removes the marketing exposure, and matches the plan's stated mitigation ("keep the full audit report as an example artefact").

**Why a separate `self-audit-policy.md` (§1 #3):** the cap rule has to be findable by every future consultancy that wants to publish a DSAF self-audit. Embedding it in README, or in `07-maturity-tiers.md` only, makes it harder to point at in CONTRIBUTING and harder to amend (an amendment to README would mix with marketing copy). The dedicated policy file is the long-term-stable surface.

**Why the cap moves to L4 — not L5 — after third-party verification (§1 #4, #13):** L5 in the rubric requires more than a one-off third-party audit (it requires sustained adoption telemetry, external contributors, ≥ 2 prior audits — the *plural* of audits matters). One third-party verification authorises L4 ("Managed-advanced — verified"); L5 still requires the full stack. This matches the plan's posture: "Don't promise enterprise certification you can't deliver. Self-audits capping at L4 is honest and good."

**Why the cap is a publication-framing rule and not dual-bookkeeping (§1 #8):** the interior scores in the example audit report are honest calibration data — they're what they are, computed against the rubric. Dual-bookkeeping (one "private real" at L5, one "public capped" at L3) would (a) be dishonest, (b) be auditable as such, (c) collapse the moment a journalist gets the private audit. The right move is single-bookkeeping with framed publication: the interior score stands, the headline frames it as "uncertified, capped at L3."

**Why pre-empt the critique in §1 #11:** the highest-leverage rhetorical move is to acknowledge the constraint *before* a critic raises it. Plan §"What NOT to do" item 9 cites Brad Frost's HN-roast survival pattern: gracious acknowledgement. The README's one-paragraph rationale is the gracious-acknowledgement surface.

---

## §3 — Doctrine contract

### `docs/branding/self-audit-policy.md` (NEW)

```markdown
# DSAF — Self-audit publication policy

**Status:** normative; ratified by FR-CORE-004 (2026-05-17).
**Scope:** every published self-audit citing a DSAF Level on an external-facing surface.
**Applies to:** CyberSkill (the framework's home consultancy), every other consultancy or in-house team that publishes a DSAF-graded self-audit, and DSAF certification badges (FR-CERT-001).

## The cap rule

| Condition | Maximum publicly cited DSAF Level |
|---|---|
| No third-party verification | **L3 (Managed)** |
| Third-party verification by a DSAF-certified verifier (FR-CERT-001) | **L4 (Managed-advanced — verified)** |
| Third-party verification PLUS the §L5 entry-gate stack (independent WCAG audit, OSS release with ≥ 5 external contributors, named customer adoption, ≥ 2 prior audits, MCP server or equivalent agent integration) | **L5 (Optimised — verified)** |

The cap applies to **published / marketing-cited** Levels. It does NOT apply to internal calibration scores: a team can score itself across the full 0-5 scale per criterion internally for honest planning. It does NOT change how the rubric calculates the interior numbers. It changes only what is *cited* outward as a DSAF claim.

## Why the cap

DSAF's credibility rests on the rubric being independently re-runnable. An untrusted-by-default consultancy (or in-house team) self-scoring itself at L5 is unverifiable by definition. The cap is the publish-time hygiene rule that prevents an unverified-L5 claim from polluting the citation graph.

Plan rationale (paraphrased from the source plan):
- A 125-criterion methodology framework that scores its author at the top tier is the single most predictable takedown angle.
- Capping at L4 *with verification* is honest; capping at L3 *without verification* is conservative-honest.
- L5 requires sustained adoption telemetry and ≥ 2 prior audits — a single third-party verification doesn't unlock it.

## The combined-percentage ban

Published surfaces MUST NOT lead with a combined-percentage score (e.g., "84.6% combined"). The two acceptable headlines are:

1. **The DSAF Level reached** (capped per the table above), with the L3-cap-rule footnote when applicable.
2. **A radar chart or category-roll-up table**, showing per-category percentages.

Combined percentages MAY appear inside per-audit data tables (the audit report's interior `§10 Criteria scores` section, the `_history.md` register's score column) where they are calibration data, not marketing.

## The dual-bookkeeping ban

The cap rule is publication-framing, not dual-bookkeeping. A team MAY NOT publish a "real" L5 audit privately and a "capped" L3 audit publicly. The interior scores are the same in both contexts; only the *headline frame* differs. Dual-bookkeeping is auditable as dishonest and collapses when a journalist asks for the private audit.

## The cap-lift trigger

When a team obtains third-party verification per FR-CERT-001 (P6), the cap moves from L3 to L4 with a verifier signature. The verifier's identity, the verification date, and the verification scope MUST be published alongside the cited Level (e.g., "L4 Managed-advanced — verified by Vendor X, 2027-06-15, scope: Part A + Part B"). The verification's `verifier-signature.json` ships in `_audit/verifications/` per FR-CERT-001's schema.

The cap moves from L4 to L5 only when both (a) verification per FR-CERT-001 AND (b) the §L5 entry-gate stack are satisfied. Reaching L5 is procedurally distinct from reaching L4.

## Worked example: CyberSkill's self-audit

`examples/cyberskill-design-system/improvement-plan.md` is a complete worked example of an L3-tier self-audit produced under DSAF SCAN + FIX modes. Its interior scores reflect the rubric honestly; its headline frames the publication-cited Level at L3 per this policy. The example is a learning artefact, not a marketing claim.

## Amendment

This policy is normative. Changes go through the FR-GOV-003 RFC cycle (P6, post-launch). Pre-launch operator approval may amend the policy via an explicit decision recorded in `MEMORY.md` (BRAIN store) with the rationale.
```

### `README.md` — patch (conditional on existing phrasing)

This FR's README patch is **conditional**: it applies only if the listed phrasings are present at the time of patch authorship. The operator MUST first `rg -n '84\.6|industry[- ]?leading|top tier|\bL5\b' README.md` and tabulate matches; the find/replace below applies only to matches found.

| Before (if present in current README) | After |
|---|---|
| `CyberSkill's design system scores 84.6% combined.` | `CyberSkill maintains a worked example self-audit at L3 (Managed) — capped per the [self-audit publication policy](docs/branding/self-audit-policy.md) until third-party verification (FR-CERT-001, planned P6) is in place. See [examples/cyberskill-design-system/](examples/cyberskill-design-system/) for the complete worked example.` |
| `industry-leading` (in CyberSkill self-description) | `worked example at L3 (Managed); see [self-audit publication policy](docs/branding/self-audit-policy.md)` |
| `top tier` (in CyberSkill self-description) | (delete; framing belongs in the example, not the README headline) |
| `our design system at L5` | `our design system as a worked L3 example` |

If none of the above phrasings are present in the current README (the H1 / first paragraph may be kept neutral pending FR-DOCS-001 — README rewrite — landing), this patch is a no-op for README and only applies to the `examples/cyberskill-design-system/` framing. The pre-emptive cap rationale paragraph (§1 #11) lands either in this FR's `docs/01-introduction.md` patch or in FR-DOCS-001's README rewrite, whichever ships first; AC11 verifies that at least one of those two surfaces contains the rationale.

The dsaf.dev landing page minted by FR-BRAND-001 already conforms (it has no CyberSkill-tier claim and no combined-percentage claim) and is therefore not patched by this FR. If a future iteration of dsaf.dev adds CyberSkill self-audit citations, those citations MUST conform to this policy.

### `docs/01-introduction.md` — additive section

Append a new section (after the existing "What you will NOT produce" section):

```markdown
## The self-audit publication cap

DSAF's worked example self-audit (CyberSkill's design system, at `examples/cyberskill-design-system/`) is published at L3 (Managed). It is *not* a claim that CyberSkill's design system is industry-leading — it is a complete worked example of how a self-audit looks when produced under DSAF SCAN + FIX modes. The cap from interior score to published Level is set by the [self-audit publication policy](branding/self-audit-policy.md): without third-party verification, the publicly cited Level caps at L3. CyberSkill's interior calculation may exceed L3 (the rubric is honest); the *cited* tier remains L3 until third-party verification (FR-CERT-001, P6) is in place.

If you are running a DSAF self-audit, the same cap applies to your published Level. Internal scores can use the full 0-5 scale per criterion; the published headline caps at L3 unverified, L4 verified, L5 verified + L5-entry-gate stack.
```

### `docs/07-maturity-tiers.md` — additive section (between existing §2 and §3)

```markdown
## §2.5 Self-audit cap rule

Every published self-audit cites a DSAF Level *capped* per the [self-audit publication policy](../branding/self-audit-policy.md). The cap is:

- L3 (Managed) maximum without third-party verification.
- L4 (Managed-advanced — verified) maximum with third-party verification by a DSAF-certified verifier (FR-CERT-001, P6).
- L5 (Optimised — verified) maximum with third-party verification PLUS the §L5 entry-gate stack (independent WCAG audit, OSS release with ≥ 5 external contributors, named customer adoption, ≥ 2 prior audits, MCP server or equivalent).

The cap applies to **publication framing**, not to interior calibration scores. Internally, a team may score itself across the full 0-5 scale per criterion for honest planning. The cap kicks in when the team *publishes* a DSAF Level outward.

CyberSkill's `examples/cyberskill-design-system/` self-audit cites L3 per this rule, with its interior scores intact. The L3 cap is not a quality claim — it is a verification-status claim. The interior scores may be higher; the cited Level remains capped until verification (FR-CERT-001, P6) lifts it.
```

### `examples/cyberskill-design-system/improvement-plan.md` — headline rewrite

The operator MUST first `Read` the current file to enumerate the actual headline phrasings present (the table below uses illustrative phrasings); only the *framing* sections get rewritten. The §10 Criteria scores table and any interior calculation sections MUST stay byte-identical per §1 #15.

Specifically, the FR touches: (a) the H1 line, (b) the first paragraph / executive summary block, (c) any "Combined score: X%" line in the headline section, (d) any "L5" / "L4" / "industry-leading" / "top tier" claim in the executive summary, (e) any radar-chart caption that asserts a tier. It does NOT touch: §10 Criteria scores per-row values, §2 Industry research findings, §3 Findings table, §6 Execution log, §8 RE_AUDIT post-fix scores, §9 Sign-off block.

| Before (illustrative — match against current file at patch time) | After |
|---|---|
| `# CyberSkill Design System — Audit Improvement Plan` (or similar H1) | `# CyberSkill Design System — Worked Example Audit (L3 self-audit, uncertified)` |
| `Combined score: 84.6% (L5 Optimised)` (if present in headline section) | `Cited Level: **L3 (Managed) — self-audit, uncertified**. Interior calculation per rubric: see §10 Criteria scores below. Cap rationale: [self-audit publication policy](../../docs/branding/self-audit-policy.md). Verification status: not yet third-party-verified (FR-CERT-001 ships in P6).` |
| `This document is CyberSkill's industry-leading design system audit.` (if present) | `This document is a complete worked example of a DSAF self-audit. The cited Level (L3) is capped per the publication policy; the interior scores are honest per the rubric. New auditors should treat this file as a template for SCAN + FIX mode outputs.` |
| Any radar-chart caption referencing L5 in the executive summary | Replace with L3 framing; per-category radar values remain unchanged |
| YAML frontmatter `cited_tier: L5` or similar (if present) | `cited_tier: L3` (and add a sibling field `cited_tier_cap_rationale: "FR-CORE-004 + docs/branding/self-audit-policy.md"`) |

### `examples/cyberskill-design-system/_history.md` — row addition + schema amendment

The current register schema is at `templates/audit-history-register.md`. This FR amends the register to add a `Cited tier` column distinct from the (existing or to-be-added) `Interior combined %` column. If the current `_history.md` has only one score column, the operator MUST split it into two before adding the FR-CORE-004 row.

Schema after this FR:

```markdown
| Date | Mode | Framework version | Agent | Operator | Signer | Interior combined % | Cited tier | Notes |
|---|---|---|---|---|---|---:|:-:|---|
```

Row added by this FR (illustrative — fill `<interior%>` with the actual computed number from the existing audit):

```markdown
| 2026-05-17 | FIX | DSAF v0 + FR-CORE-004 | Claude | Stephen Cheng | Stephen Cheng | <interior%> | **L3 (capped)** | Re-framed as worked example; interior scores intact; cap rationale: docs/branding/self-audit-policy.md |
```

Out of scope for this FR: amending `templates/audit-history-register.md` to teach the new two-column schema to future audits. That template change lands separately as part of FR-CORE-003 (criteria + template normalisation) or as an immediate-follow-up. The amendment is mechanical (one column rename + one new column) and not load-bearing for P0 launch.

---

## §4 — Acceptance criteria

1. **Self-audit policy committed** — `docs/branding/self-audit-policy.md` exists with the content shape in §3 (cap table, why-the-cap rationale, combined-percentage ban, dual-bookkeeping ban, cap-lift trigger, worked-example pointer, amendment clause).
2. **README normalised** — `grep -i '84\.6' README.md` returns 0; `grep -iE '\b(industry[- ]?leading|top tier)\b' README.md` returns 0 (excluding citations to other people's claims). If any CyberSkill self-description references the design system, the cited Level reads "L3" or "worked example."
3. **Introduction has cap section** — `docs/01-introduction.md` contains a section titled exactly `## The self-audit publication cap` with the body in §3.
4. **Maturity-tiers doc has cap section** — `docs/07-maturity-tiers.md` contains a section titled `## §2.5 Self-audit cap rule` (or equivalent numbering) with the body in §3.
5. **Example artefact reframed** — `examples/cyberskill-design-system/improvement-plan.md` H1 includes "Worked Example" or "L3 self-audit, uncertified"; the headline section cites L3 as the published tier; interior per-criterion scores in §10 are unchanged from pre-patch.
6. **History register updated** — `examples/cyberskill-design-system/_history.md` has a row reflecting the FR-CORE-004 re-framing, with cited tier = L3.
7. **No 84.6 anywhere external** — `rg -ti md '84\.6' README.md docs/` returns 0 matches.
8. **No L5 marketing claim for CyberSkill** — `rg -ti md '\bL5\b' README.md docs/ examples/cyberskill-design-system/improvement-plan.md` returns matches only inside (a) rubric definitions in `docs/07-maturity-tiers.md`, (b) the cap-table in `docs/branding/self-audit-policy.md` (where L5 is the third row, fully qualified), or (c) generic prose discussing the rubric. No standalone "CyberSkill at L5" claim.
9. **Interior scores preserved** — `git diff` for `examples/cyberskill-design-system/improvement-plan.md` shows changes only in the headline + framing sections; the §10 Criteria scores table (per-row values) is identical pre/post.
10. **Cap-lift trigger documented** — `docs/branding/self-audit-policy.md` "Cap-lift trigger" section names the verifier-signature requirement and the cap-lift evidence file path (`_audit/verifications/`).
11. **README pre-emptive rationale present** — README first 200 words (after FR-DOCS-001 lands) OR `docs/01-introduction.md` first section contains the one-paragraph cap rationale pointing readers at the policy file before they encounter the worked example.
12. **PR description includes before/after grep counts** — for each of `84.6`, `\bL5\b`, `\b(industry[- ]?leading|top tier)\b`, the PR shows pre-patch and post-patch counts across `README.md`, `docs/`, `examples/cyberskill-design-system/`.

---

## §5 — Verification

```bash
# AC1 — self-audit policy committed
test -f docs/branding/self-audit-policy.md && grep -q '^## The cap rule' docs/branding/self-audit-policy.md
echo $?  # 0

# AC2 — README normalised
grep -ci '84\.6' README.md                                # 0
grep -ciE '\b(industry[- ]?leading|top tier)\b' README.md # 0

# AC3 — intro has cap section
grep -q '^## The self-audit publication cap' docs/01-introduction.md

# AC4 — maturity-tiers doc has cap section
grep -qE '^## §2\.5 Self-audit cap rule' docs/07-maturity-tiers.md

# AC5 — example reframed
head -1 examples/cyberskill-design-system/improvement-plan.md | grep -qE 'Worked Example|L3 self-audit'

# AC6 — history register has FR-CORE-004 row
grep -E '2026-05-17.*FR-CORE-004|L3 per cap rule' examples/cyberskill-design-system/_history.md

# AC7 — no 84.6 anywhere external
rg -ti md '84\.6' README.md docs/  # MUST be empty

# AC8 — no L5 marketing claim for CyberSkill
rg -ti md '\bCyberSkill\b.{0,80}\bL5\b|\bL5\b.{0,80}\bCyberSkill\b' \
   README.md docs/ examples/cyberskill-design-system/improvement-plan.md
# Expected: empty OR matches that explicitly state "capped at L3" / "not yet L5"

# AC9 — interior scores preserved
git diff examples/cyberskill-design-system/improvement-plan.md \
  | grep -E '^[+-]\| ' \
  | grep -vE 'L3|Worked Example|cap rule|capped|self-audit publication'
# Expected: empty (no per-criterion-score diff lines outside the framing changes)

# AC10 — cap-lift trigger documented
grep -q '^## The cap-lift trigger' docs/branding/self-audit-policy.md

# AC11 — pre-emptive rationale (depends on whether FR-DOCS-001 has shipped)
# If FR-DOCS-001 NOT yet shipped: check docs/01-introduction.md
grep -q 'cap rule\|capped at L3\|self-audit publication policy' docs/01-introduction.md
# If FR-DOCS-001 HAS shipped: also check README.md first 200 words
head -c 1200 README.md | grep -q 'cap\|L3'
```

Human-verified ACs (no script):

- **AC12** — reviewer reads the PR description and confirms before/after grep counts are present for all three patterns.

---

## §6 — Implementation skeleton

1. **(30 min) Enumerate current usages.** `rg -ti md -c '84\.6' README.md docs/ examples/` and `rg -ti md -c '\b(industry[- ]?leading|top tier|L5)\b' README.md docs/ examples/`. Tabulate in PR description as "Pre-patch counts."
2. **(30 min) Author `docs/branding/self-audit-policy.md`.** Copy the body from §3 verbatim; commit.
3. **(30 min) Append cap section to `docs/01-introduction.md`** per §3.
4. **(15 min) Append cap section to `docs/07-maturity-tiers.md`** as §2.5 per §3.
5. **(30 min) Rewrite headline of `examples/cyberskill-design-system/improvement-plan.md`.** Match the H1, first paragraph, any "Combined score" / "industry-leading" / "L5" framing. Hand-review every match — interior `§10 Criteria scores` table MUST remain byte-identical except for header-level framing.
6. **(15 min) Patch `examples/cyberskill-design-system/_history.md`.** Add the FR-CORE-004 row per §3.
7. **(15 min) Patch `README.md`** if any banned phrasing is present. If FR-DOCS-001 hasn't yet rewritten the README, this patch is mostly a no-op; the cap rationale lands via FR-DOCS-001 (and this FR records the requirement in §1 #11 + AC11).
8. **(15 min) Re-grep + verify.** Run §5 AC2 / AC7 / AC8 / AC9 commands. Paste post-patch counts in PR description.
9. **(15 min) PR description.** Include: before/after grep counts; one-paragraph rationale ("this FR caps CyberSkill's publicly cited self-audit at L3 per the new policy at `docs/branding/self-audit-policy.md`; interior scores in the worked example are preserved; the cap lifts to L4 once FR-CERT-001 ships and CyberSkill obtains third-party verification"); list of files touched.

---

## §7 — Dependencies

- **Upstream:** none. This FR has `depends_on: []` because the policy file is self-contained and the patches operate on existing files.
- **Downstream blocks:** FR-DOCS-001 (README rewrite must respect the cap rule and include the pre-emptive rationale per §1 #11), FR-BRAND-004 (decoupled marketing copy on dsaf.dev must conform to the policy), FR-CERT-001 (P6 certification scheme codifies the cap-lift trigger; this FR is the precondition).
- **Sibling:** FR-BRAND-002 (handle taxonomy — references to CyberSkill's self-audit use `DSAF` and `DSAF Levels` per the canonical handles), FR-CORE-001 (DSAF-25 Core — the cap rule applies to DSAF-25 Core scores published outward, same as DSAF-125).
- **External:** none.

---

## §8 — Example payloads

### Example: README before/after (illustrative for the patch)

**Before** (if present in current README):

```markdown
## Our design system

CyberSkill's design system scores 84.6% combined on DSAF, putting it at L5 Optimised. We use this framework internally to keep ourselves honest. The full audit report is at examples/cyberskill-design-system/improvement-plan.md.
```

**After:**

```markdown
## Worked example: CyberSkill's design system

CyberSkill maintains a worked example self-audit at L3 (Managed) — capped per the [self-audit publication policy](docs/branding/self-audit-policy.md) until third-party verification (FR-CERT-001, planned P6) is in place. The audit at [examples/cyberskill-design-system/improvement-plan.md](examples/cyberskill-design-system/improvement-plan.md) is a complete worked example of SCAN + FIX modes — useful for new auditors learning the framework, not a marketing claim about CyberSkill's tier.
```

### Example: example-artefact header before/after

**Before:**

```markdown
# CyberSkill Design System — Audit Improvement Plan
**Combined score:** 84.6% (L5 Optimised)
**Audit date:** 2026-04-01
```

**After:**

```markdown
# CyberSkill Design System — Worked Example Audit (L3 self-audit, uncertified)

**Cited Level:** **L3 (Managed) — self-audit, uncertified**.
**Interior calculation per rubric:** see §10 Criteria scores below.
**Cap rationale:** [self-audit publication policy](../../docs/branding/self-audit-policy.md).
**Verification status:** not yet third-party-verified (FR-CERT-001 ships in P6).
**Audit date:** 2026-04-01 (interior scoring); 2026-05-17 (re-framing per FR-CORE-004).

This file is a complete worked example of a DSAF self-audit produced under SCAN + FIX modes. The cited Level (L3) is capped per the publication policy. The interior scores in §10 are honest per the rubric. New auditors: use this file as a template for what SCAN + FIX outputs look like.
```

### Example: `_history.md` row format

```markdown
| Date | Mode | Framework version | Agent | Operator | Signer | Cited tier | Notes |
|---|---|---|---|---|---|---|---|
| 2026-05-17 | FIX | DSAF v0 + FR-CORE-004 | Claude | Stephen Cheng | Stephen Cheng | **L3 (Managed) per cap rule** | Re-framed as worked example; interior scores intact; cap rationale: docs/branding/self-audit-policy.md |
```

### Example: a critic's HN comment, pre-empted

> *Critic comment (hypothetical):* "This is a consultancy publishing a framework that scores its own design system at L5. Auditors audit themselves at L5, news at 11."
>
> *Response (because the cap policy exists):* "The published Level is L3 per [self-audit publication policy](https://dsaf.dev/branding/self-audit-policy) — the cap rule explicitly forbids L5 without third-party verification, and CyberSkill doesn't have that yet. The worked example is published with L3 framing so the citation graph stays clean. The interior scores in the audit report are honest per the rubric; the *framing* caps them. We agree with the concern and the policy is the structural answer."

This pre-emption matters: with the policy in place, the critic's comment becomes a *confirming citation* ("see, the framework already has this rule") rather than a *takedown* ("the framework is dishonest").

---

## §9 — Open questions

All resolved at authoring time:

- **Q1: Cap at L3 or L4?** Resolved → L3 without verification, L4 with verification. The plan's options were "cap at L3" or "disclaim as example artefact" — we do both. L4 needs verification (per the rubric — L4 already implies adoption telemetry + CI gates which a single internal audit can claim, but L5 needs sustained-state evidence verification can't substitute for).
- **Q2: Delete the example artefact entirely?** Resolved → no. The worked example is pedagogically valuable; only its framing changes. Plan §"What NOT to do" item 4 ("the half-measure 'DSAF by CyberSkill' is the worst of both worlds") is *not* about the example artefact — it's about brand naming. The example artefact at L3 framing is not a half-measure; it's the policy.
- **Q3: Where does the cap rule live — README, framework spec, separate policy file?** Resolved → separate policy file (`docs/branding/self-audit-policy.md`). The README references it; the framework spec (`docs/02-framework.md`) and maturity-tiers doc (`docs/07-maturity-tiers.md`) point at it; the policy file is the source of truth.
- **Q4: Does the cap apply to internal calibration scores?** Resolved → no. Cap is publication-framing only. Internal scores use the full 0-5 scale per criterion. The §10 Criteria scores table in audit reports retains its raw scores; only the headline / executive summary frames the cap.
- **Q5: How does the cap interact with the no-silent-regression rule (FR-CORE-002)?** Resolved → orthogonal. Cap applies to *publication framing*; no-silent-regression applies to *score movement*. A team's interior scores can move (with explicit overrides per FR-CORE-002); its published Level is capped per this FR. The two rules don't conflict.
- **Q6: What happens if CyberSkill's self-audit somehow legitimately reaches L5 — say, in 2028 with verification?** Resolved → cap-lift trigger per §1 #13: third-party verification + L5-entry-gate stack lifts the cited tier from L3 → L5 with a verifier-signature in `_audit/verifications/`. The policy doesn't prevent legitimate L5; it prevents unverified L5 claims.

---

## §10 — Failure modes inventory

| Failure | Detection | Outcome | Recovery |
|---|---|---|---|
| Critic finds 84.6% in an old commit and screenshots it | git history search at launch | Embarrassment | Acceptable: git history is a calibration record, not a marketing claim. The current head is the canonical surface. Don't `git filter-branch`; that's a worse signal |
| Capping at L3 is read as "the framework's authors don't believe their own framework" | HN/Twitter critique | Backlash | Pre-empted by §1 #11 rationale paragraph in README + `self-audit-policy.md` "Why the cap" section. The frame is verification-status, not quality |
| CyberSkill privately discusses L5 in client conversations | leaked email / private LinkedIn message | Dual-bookkeeping accusation | §1 #8 forbids dual-bookkeeping. The internal calibration scores are honest; the *cited* tier is capped. Internal conversation about interior scores ≠ dual-bookkeeping. Sales-pitch language MUST conform to the cap (no "we're at L5 internally" pitches) |
| New contributor adds an "industry-leading" claim back to the README | PR review | Phrasing regression | CONTRIBUTING.md (via FR-BRAND-002) reviewed at PR; this FR's policy is one of the rules. Add a CI grep for banned phrases as a P2 follow-up |
| FR-CERT-001 (P6) ships and CyberSkill obtains verification, but the cap-lift procedure is unclear | confused operator | Lift not applied or applied incorrectly | `docs/branding/self-audit-policy.md` "Cap-lift trigger" section is the procedure. Lift requires verifier-signature in `_audit/verifications/`; the lift is a one-line edit to the example's headline + a new `_history.md` row |
| Other consultancies publish DSAF audits without conforming to the cap | external monitoring | Citation graph pollution | The policy is normative for *DSAF-cited* audits. If another consultancy publishes "we're at L5 via DSAF," we add a public correction citing the policy. Repeat offenders get named in `_audit/violations/` |
| Cap rule misread as "DSAF can't certify L5 ever" | reviewer feedback | Framework reads as defeatist | Rationale paragraph in `docs/01-introduction.md` "self-audit publication cap" section makes the cap-lift trigger explicit. The framework CAN certify L5; the path is FR-CERT-001 + L5-entry-gate stack |
| Audit reports inside `examples/` re-import the L5 framing accidentally on a future re-score | post-FIX-cycle drift | Headline drifts back to L5 | The framing is in headline + first paragraph only (per §1 #5). Future SCAN cycles re-compute interior scores but MUST NOT re-frame the headline; that's controlled by the FR-CORE-004 patch and any FR that supersedes it |
| Verification vendor (P6) signs off on L5 prematurely | governance failure | Cap lifted incorrectly | FR-CERT-001 (P6) owns vendor accreditation. The lift procedure in this FR requires the verifier-signature file + the L5-entry-gate-stack evidence; missing either rejects the lift |
| Cap policy file gets edited to remove the L3 rule by an unauthorised actor | git review at PR | Policy weakened silently | The policy file is normative (it says so in its header); changes require FR-GOV-003 (P6) RFC OR explicit operator approval recorded in `MEMORY.md`. CODEOWNERS for `docs/branding/` set to founder + future co-maintainer (post-FR-GOV-002) |
| The combined-percentage ban is read as "we can't report percentages at all" | reviewer pushback | Confusion | §1 #9 and the policy explicitly permit percentages *inside data tables* (interior of audit reports, `_history.md` register). The ban is on *standalone headline percentages* as marketing claims |

---

## §11 — Implementation notes

- **The cap-at-L3 number is not arbitrary.** It's the highest Level that genuinely doesn't require external evidence ("Managed" = "versioned, Storybook-equivalent, CI green, semver, an `_audit/` folder with ≥ 1 prior audit"). Every L4+ criterion ("multi-platform tokens enforced," "RFC archive public," "adoption telemetry") would benefit from third-party confirmation. L3 is honest because anything below it is below "we have a real design system."
- **Why we name FR-CERT-001 ahead of authoring it:** the placeholder reference is acceptable per AUTHORING §3.1 rule 3 (the `risk_if_skipped` and §1 #13 inline the P6 ship target). When FR-CERT-001 ships, this FR's `depends_on`/`blocks` won't need updating — the dependency is one-way (FR-CERT-001 depends on this FR for the cap policy, not vice versa).
- **The "worked example" framing is the load-bearing rhetorical move.** Most readers will assume a framework's worked example reflects the framework's *intended use*, not the framework's *marketing*. Framing it as worked example also positions CyberSkill in the role of "honest first-user" rather than "self-promoting consultancy."
- **About the `examples/cyberskill-design-system/improvement-plan.md` H1 change:** parenthetical disclaimers in H1s are unusual and may attract style nits. Acceptable cost — the alternative (no disclaimer, banner below the H1) is more easily missed by readers skimming. The H1's job here is to set the framing fast; the parenthetical wins.
- **Read-before-patch discipline.** Operators landing this FR's patches MUST `Read` each touched file (README.md, docs/01-introduction.md, docs/07-maturity-tiers.md, examples/cyberskill-design-system/improvement-plan.md, examples/cyberskill-design-system/_history.md) at the time of patch authorship to enumerate the actual existing phrasings. The "Before" columns in §3 tables are illustrative — they describe the *kinds* of phrasings to match, not necessarily the literal strings present in the current files. Read-before-patch prevents the find/replace from being applied against guessed text.
- **Service surface extension.** The frontmatter `service: doctrine` is shorthand for "this FR ships markdown changes, not code." The actual files touched span `docs/`, `README.md`, `examples/cyberskill-design-system/`, and (via §1 #14 forward-binding) any future SCAN/FIX runs that re-audit the worked example. CODEOWNERS for `docs/branding/` and `examples/cyberskill-design-system/` should both be set to the founder + future co-maintainer (post-FR-GOV-002) to prevent silent relaxation.
- **Why the `_history.md` schema amendment is in-scope despite the template-file out-of-scope split.** This FR amends `_history.md` (one file) without touching `templates/audit-history-register.md` (the template). The split is intentional: the worked example needs the new column today (P0); the template's broader normalisation is part of FR-CORE-003 (criteria + template review) where every template change can be coordinated.
- **Combined-percentage ban applies in marketing copy, not in interior data.** A reader who clicks through to `§10 Criteria scores` in the example sees a `combined_percent: <X>` field — that's calibration data, not a headline. The ban targets the README, the dsaf.dev hero, the press kit — not the audit report's interior.
- **Why CODEOWNERS for `docs/branding/`:** the cap policy file is the kind of thing that gets quietly relaxed under sales pressure. Naming the founder (and future co-maintainer per FR-GOV-002) as the CODEOWNER for `docs/branding/` makes "lift the cap" a deliberate two-person decision rather than a single-author oversight.
- **About `examples/cyberskill-design-system/improvement-plan.md` being preserved at L3 framing even if interior scores are L5:** this is the policy's whole point. The interior says what the rubric says; the framing says what verification supports. The two coexist.

---

*End of FR-CORE-004.*
