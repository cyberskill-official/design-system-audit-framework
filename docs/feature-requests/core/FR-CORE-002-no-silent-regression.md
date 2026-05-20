---
id: FR-CORE-002
title: "Soften no-downgrade rule → 'no silent regression'; explicit override comment required, no hard block"
module: CORE
priority: MUST
status: done
verify: I
phase: P0
milestone: P0 · slice 1 · Pre-launch hardening
slice: 1
owner: Stephen Cheng (Founder)
created: 2026-05-17
shipped: 2026-05-18
related_frs: [FR-BRAND-002, FR-CORE-001, FR-CORE-003, FR-CORE-004, FR-DOCS-001]
depends_on: []
blocks: [FR-DOCS-001, FR-BRAND-002]  # FR-BRAND-002 §3 patch table references the rule rename in 07-maturity-tiers.md
source_pages:
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Honest critique item 5)"
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Phase 0 — Pre-launch hardening, action 6)"
  - "docs/02-framework.md §4 (current no-downgrade rule)"
  - "docs/07-maturity-tiers.md §5 (tier-transitions interaction)"
source_decisions:
  - "DEC-011: regressions are surfaced and require explicit override, not hard-blocked"
  - "DEC-012: the rule name changes from 'no-downgrade' to 'no-silent-regression' across all doctrine"
  - "DEC-013: override comments live in the audit-report §7 verification block and propagate to §10 Criteria scores via a regression-tag column"
language: markdown
service: doctrine
new_files:
  - docs/regression-policy.md
  - docs/core/FR-CORE-002-regression-contract.json
  - scripts/regression-contract-lib.mjs
  - scripts/check-regression-contract.mjs
  - scripts/check-regression-contract.test.mjs
modified_files:
  - docs/02-framework.md
  - docs/07-maturity-tiers.md
  - docs/06-fix-cycle.md
  - templates/audit-report-template.md
  - prompts/fix-mode.md
  - README.md
  - package.json
  - scripts/dsaf-verify.mjs
allowed_tools:
  - "file_read/write docs/**, templates/**, prompts/**"
  - "grep / ripgrep for 'no-downgrade', 'no downgrade', 'rollback', 'silent regression'"
disallowed_tools:
  - "delete the no-downgrade rule entirely — that would be the failure mode the plan warns against (real regressions still exist; they just need explicit acknowledgement)"
  - "introduce a 'no-regression-allowed' subset that hard-blocks anyway — the plan's rule is 'surface, don't block'"
  - "make the override comment field optional — the override is the structural answer; without enforcement, the rule decays back to 'we tolerate regressions'"
effort_hours: 4
sub_tasks:
  - "1. (30m) ripgrep 'no-downgrade' / 'no downgrade' / 'rollback' across the repo; tabulate every occurrence with context (rule, mechanic, or quoted external material)"
  - "2. (45m) author docs/regression-policy.md per §3"
  - "3. (45m) patch docs/02-framework.md §4 (rule rename + new mechanic body)"
  - "4. (30m) patch docs/07-maturity-tiers.md §5 (tier-transitions section coordinates with FR-BRAND-002's text-only patches)"
  - "5. (30m) patch docs/06-fix-cycle.md (the FIX cycle's verification step now surfaces + requires override, not rollback)"
  - "6. (30m) patch templates/audit-report-template.md (add the regression-tag column to §10 Criteria scores; add the override block to §7)"
  - "7. (15m) patch prompts/fix-mode.md (the agent's FIX-mode prompt asks for the override comment when a regression is detected)"
  - "8. (15m) re-grep + verify the rename is complete; PR description includes before/after grep counts"
risk_if_skipped: "The hard no-downgrade rule + automatic rollback state machine is intellectually satisfying and demoable, but the plan §Honest critique item 5 calls out the failure mode explicitly: real teams *do* regress in real ways (WCAG version bumps tighten DYNAMIC rubrics; a token bucket gets deprecated mid-quarter; a vendor library breaks a previously-passing integration). A hard rollback rule under those conditions gets switched off — not respected — and the framework loses the regression-detection signal entirely. The plan's recommended cure is 'no silent regression — explicit override required.' Skipping this FR ships a framework with the most-predictable-to-be-disabled rule still in place; the first audit team that hits a legitimate regression turns off the rule, and the framework's stability guarantee becomes hollow. The rule rename also matters: 'no-downgrade' reads as authoritarian; 'no-silent-regression' reads as a surfacing rule, which is what it actually is. FR-BRAND-002's §3 doctrine-patch table already coordinates the rename in docs/07-maturity-tiers.md text — this FR is the source-of-truth update that makes the rename complete."
---

**2026-05-18 strict execution note:** stale status was reset and FR-CORE-002 was re-processed with an executable no-silent-regression contract. `npm run contract:regression` verifies the policy, framework, FIX-cycle, DSAF Levels, template, and FIX prompt surfaces; checks the four allowed causes and six allowed regression tags; blocks stale downgrade-rule wording outside explicit backward-compatibility text; and writes `docs/_audit/no-silent-regression-contract.json`.

## §1 — Description (BCP-14 normative)

The framework's `no-downgrade rule` MUST be renamed to `no-silent-regression rule`. The rule's substance shifts from *hard-block + automatic rollback* to *surface + require explicit override comment*. Regressions are no longer forbidden; they are documented, acknowledged, and signed.

1. **MUST** rename the rule from `no-downgrade rule` to `no-silent-regression rule` across every doctrine surface: `docs/02-framework.md` §4, `docs/06-fix-cycle.md`, `docs/07-maturity-tiers.md` §5, `docs/branding/glossary.md` (per FR-BRAND-002), `templates/audit-report-template.md` frontmatter, `prompts/fix-mode.md`. The rename is global; no surface MAY keep "no-downgrade" as the primary handle. Older audits' frontmatter that cite `no_downgrade: true` MUST remain readable (backward-compatible reading); new audits emit `no_silent_regression: true` instead.
2. **MUST** rewrite the rule's mechanic per §3a: when *any* criterion's post-audit score is below its pre-audit score, the audit MUST NOT auto-rollback the offending fix. Instead, the audit MUST surface the regression in §7 Verification with six fields: (a) the criterion ID, (b) the pre-audit score, (c) the post-audit score, (d) the regression magnitude (pre − post), (e) the cause category (one of the four in §1 #3), and (f) the approver-vs-D-RT branch (either an explicit override comment from `@Human[approve]` with the approver's name, OR `null` approver iff the row is `D-RT` per §1 #4). Without the override comment OR D-RT eligibility, the audit MUST refuse to transition from `RE_AUDIT` to `SIGNED`. The approver MUST NOT be the same `@Human` actor who wrote the offending fix in §6 Execution; for solo-maintained projects, the founder MAY approve their own fix's regression with a minimum 24-hour delay between the agent's draft override and the founder's approval (the delay is the proxy for separation; the audit-trail timestamps make the delay verifiable).
3. **MUST** define the four legitimate override-cause categories with disambiguating rubric language: (i) `rubric-tightened` — a DYNAMIC criterion's rubric anchor moved (e.g., WCAG version bump); FIXED criteria CANNOT use this cause; (ii) `fix-side-effect` — a separate fix caused this regression; the offending fix is identified and the trade-off is documented; (iii) `external-dependency-change` — a vendor library, browser feature, or third-party tool changed in a way that affects the score (e.g., a CDN endpoint deprecation); (iv) `deliberate-policy-tradeoff` — the team consciously accepted the regression as the cost of a different gain (e.g., dropping a low-value variant to reduce bundle size). Override comments without one of these four causes MUST be rejected.
4. **MUST** keep DYNAMIC criteria allowed to regress without override IF the cause is `rubric-tightened` and the new rubric language is cited inline. The §10 Criteria scores table MUST tag DYNAMIC-rubric-tightened regressions with `[D-RT]` so a reader scanning the table sees them at a glance. FIXED criteria NEVER auto-allow regressions — they always require override, regardless of cause category.
5. **MUST** add a `regression_tag` column to `templates/audit-report-template.md` §10 Criteria scores. Allowed values: `null` (no regression — score equal or improved), `D-RT` (DYNAMIC criterion regressed; cause `rubric-tightened`; no `@Human[approve]` override needed; the `notes` paragraph citing the new rubric is the audit trail), `OVRD-FSE` (override approved, cause `fix-side-effect`), `OVRD-EDC` (override approved, cause `external-dependency-change`), `OVRD-DPT` (override approved, cause `deliberate-policy-tradeoff`), `UNRESOLVED` (regression surfaced but no override yet; audit refuses to sign). There is **no `OVRD-RT` tag** — `rubric-tightened` is the cause exclusive to DYNAMIC criteria, and DYNAMIC-rubric-tightened regressions get the `D-RT` tag (no approver needed) per §1 #4. The total number of allowed tag values is **6** (`null`, `D-RT`, `OVRD-FSE`, `OVRD-EDC`, `OVRD-DPT`, `UNRESOLVED`).
6. **MUST** add an `override_log` block to `templates/audit-report-template.md` §7 Verification. Each entry: criterion ID, pre-score, post-score, regression magnitude, cause category, override-approver name, override-approval date, and a free-form `notes` paragraph explaining the team's reasoning. The block is empty if no regressions occurred. The block is the canonical audit-trail surface; agents MUST NOT emit override entries to any other location.
7. **MUST** preserve the audit's overall `no-silent-regression` property. Three audit-trail states are compliant: (i) an audit with no regressions (no `D-RT` or `OVRD-*` rows in §10) — trivially compliant; (ii) an audit with `D-RT` rows for DYNAMIC-rubric-tightened regressions and `notes` citations of the new rubric — compliant without approver, per §1 #4; (iii) an audit with `OVRD-FSE` / `OVRD-EDC` / `OVRD-DPT` rows where every override has a valid approver, cause, and notes — compliant with approver. Non-compliant: an audit with any `UNRESOLVED` row in §10 (regression surfaced but override not yet filled). The framework refuses to emit `SIGNED` status while any `UNRESOLVED` row exists; the audit stays at `RE_AUDIT (awaiting override)` until either the override lands or the regressing fix is rolled back via `@Human[rollback]`.
8. **MUST** update `prompts/fix-mode.md` so the agent's behaviour matches §1 #2: on detecting a regression, the agent emits a draft `override_log` entry with the suspected cause and the criterion ID, then pauses for `@Human[approve]` rather than auto-reverting. The pause replaces the existing auto-rollback step. The agent's draft is advisory; the human's override comment is normative.
9. **MUST NOT** remove the rollback *option*. A team MAY explicitly choose to roll back an offending fix (the `@Human[rollback]` action tag in `docs/02-framework.md` §2 still applies). The rollback becomes a *human decision*, not an *automatic mechanic*. The §7 Verification block records which option the team chose.
10. **MUST** publish `docs/regression-policy.md` as the long-form rationale + worked example for the rule. Every team that signs an audit under DSAF is expected to have read this policy at least once. The README cross-references it via FR-DOCS-001.
11. **MUST** update the audit-report's §7 Verification heading to reflect the new mechanic: from "Verification + no-downgrade gate" to "Verification + no-silent-regression gate." The heading rename matches the rule rename per §1 #1.
12. **MUST** add a sentence to `docs/02-framework.md` §7 (Hard rules) clarifying that "always honour the no-silent-regression rule" replaces the prior "always honour the no-downgrade rule." Rule #8 in the existing list is the locus of the rename; surrounding rules don't shift.
13. **MUST NOT** make the rule retroactive. Audits signed before this FR ships were signed under the no-downgrade rule with auto-rollback; they remain valid under their original rule. New audits signed under DSAF v1 + FR-CORE-002 use the no-silent-regression rule. The `_history.md` register's framework-version column distinguishes the two.
14. **MUST** specify the §10 column-addition's backward-compatibility behaviour: legacy audits (pre-FR-CORE-002) whose §10 Criteria scores tables have no `Regression tag` column remain readable and signed. New audits (post-FR-CORE-002) emit the column with `null` cells for non-regressing rows. A migration FR is NOT required — the column is additive; tooling that reads the older format (8-column) and the newer format (9-column) MUST tolerate both. The audit-report template (in `templates/audit-report-template.md`) becomes the source of the 9-column format for all new audits.

---

## §2 — Why this design

**Why rename from `no-downgrade` to `no-silent-regression` (§1 #1):** the rule's substance is "surface regressions, don't allow them to be hidden." The original name `no-downgrade` implied "no regression ever," which is what the plan §"Honest critique" item 5 calls out as untenable. Renaming makes the rule's true intent legible — surface, not prevent. The rename also matters for tone: `no-downgrade` reads as authoritarian (forbidding); `no-silent-regression` reads as procedural (surfacing). The procedural framing is what real DS teams will respect.

**Why surface + require override, not hard-block + rollback (§1 #2, #5, #6):** real teams regress in real ways. WCAG version bumps move DYNAMIC rubric anchors quarterly. Token-bucket deprecations happen mid-quarter when a vendor changes their API. Bundle-size budgets sometimes loosen because a new variant ships that's *more* valuable than the bytes it costs. An automatic rollback under those conditions is wrong — the rollback would revert a *legitimate* shipping action that the team consciously chose. The right move is to surface the regression, force the team to name the cause, and let them sign off explicitly. The audit-trail integrity is preserved (every regression is documented with cause + approver); the team's autonomy is preserved (they choose, not the framework).

**Why four cause categories, not free-form (§1 #3):** free-form causes invite "we just decided" without a check on the team's reasoning. Four enumerated categories force the team to *name* what kind of regression this is, which has two effects: (a) it surfaces the reasoning to the audit-report reader, (b) it makes the regression analysable in aggregate (e.g., a yearly review can ask "how many `external-dependency-change` regressions did we accept in 2026? are they clustered around one vendor?"). The four categories cover the legitimate causes from the plan; rejecting causes outside these four prevents drift.

**Why DYNAMIC-rubric-tightened auto-passes for DYNAMIC criteria but not FIXED (§1 #4):** DYNAMIC criteria are explicitly defined as "rubric is anchored against an evolving industry standard" (per `docs/02-framework.md` §5). When WCAG 3.0 ships and a DYNAMIC criterion's rubric tightens, the score drop is the *framework's* doing, not the *team's* doing. Forcing an override comment for every team on every quarterly WCAG-version bump would be procedural theatre. FIXED criteria have no such excuse — if a FIXED criterion regresses, *something the team controls* changed. The cost asymmetry justifies the rule asymmetry.

**Why the `regression_tag` column on §10 Criteria scores (§1 #5):** auditors and reviewers scan the §10 table; without the tag column, regressions are invisible at a scan. The tag is one cell, one short string (`D-RT`, `OVRD-FSE`, etc.); the column is cheap to add and high-signal to read. Plain `null` values dominate the column for unchanged or improved criteria, so the non-null tags stand out.

**Why preserve the rollback *option* (§1 #9):** sometimes the right answer IS to revert the offending fix. The framework should NOT preclude that — it should just stop *automating* it. By making rollback a `@Human[rollback]` action (already in `docs/02-framework.md` §2's action-tag table), we preserve the discipline of "regressions cost the team something" without enforcing the discipline mechanically.

**Why publish `docs/regression-policy.md` (§1 #10):** the rule has substantive doctrine — what counts as `external-dependency-change`? when does `deliberate-policy-tradeoff` cross into "we're just giving up on the criterion"? The policy file is where that nuance lives. Without it, the rule's enforcement is whatever the next maintainer thinks today.

**Why non-retroactive (§1 #13):** legacy audits were signed under the previous rule with the previous mechanic. Retroactively re-running them under the new rule would invalidate the SIGNED status of every prior audit — which is a worse outcome than letting two rule generations coexist in the history register. The framework-version column in `_history.md` is the surface that distinguishes them.

---

## §3 — Doctrine contract

### §3a — The rule mechanic (after revision)

Pseudo-code for the agent's `VERIFYING` step in `docs/06-fix-cycle.md`:

```
for each criterion C touched by §6 Execution:
    pre  = §1 SCAN Baseline score for C
    post = §6 Execution + §8 RE_AUDIT post-fix score for C

    if post >= pre:
        emit §10 row { criterion: C, score: post, regression_tag: null }
        continue

    # post < pre — regression detected
    delta = pre - post

    if C.tag == DYNAMIC and rubric_anchor_changed_externally(C):
        # DYNAMIC-rubric-tightened path — no override needed
        emit §10 row { criterion: C, score: post, regression_tag: "D-RT" }
        emit §7 override_log entry { criterion: C, pre, post, delta, cause: "rubric-tightened",
                                      approver: null, notes: <rubric-citation> }
        continue

    # FIXED regression OR DYNAMIC regression without rubric-tightening — override required
    cause = agent.detect_cause(C, pre, post)  # advisory, one of the 4 categories
    emit §7 override_log_draft { criterion: C, pre, post, delta, cause, approver: null,
                                  notes: <agent's rationale> }
    audit.status = "RE_AUDIT (awaiting override)"
    refuse audit.transition_to("SIGNED")
    surface_to_human(C, pre, post, cause, "@Human[approve] needed")
```

When `@Human[approve]` reviews and approves the override:

```
operator fills override_log entry: { approver: <name>, cause: <one of 4>, notes: <free text> }
emit §10 row { criterion: C, score: post, regression_tag: "OVRD-<cause-suffix>" }
audit.status = "RE_AUDIT (override approved)"
audit can now transition_to("SIGNED")
```

If the operator chooses rollback instead:

```
operator triggers @Human[rollback] action
agent reverts the §6 Execution step that caused the regression
agent re-runs verification from BASELINE for C
if post == pre: emit §10 row { criterion: C, score: pre, regression_tag: null }; proceed
```

### `docs/02-framework.md` §4 — patch (before / after)

**Before** (current text, paraphrased from the visible portion of the doc):

```markdown
## §4 No-downgrade rule

The single hardest rule in the framework. It is the audit's stability guarantee.

**Statement.** A signed audit's combined score must be ≥ the pre-audit combined score. No FIXED criterion may sit below its pre-audit score at sign-off. Any regression triggers automatic rollback.

**Why it's hard.** Without this rule, a `FIX` cycle that "improves five things and regresses two" can still net positive on combined score — masking the regressions. The regressions then surface in a future audit with no clear authorship trail. The no-downgrade rule forces the cycle to be additive: you only land changes that don't break anything.

**Implementation.** §7 verification runs every check script and re-scores each affected criterion. If any criterion drops, the agent identifies the offending fix from the §6 execution log and reverts it using the revert command declared in §5. The cycle then re-enters verification. Loop until verification passes or the agent runs out of fixes to revert (in which case the audit goes back to `AWAITING_REVIEW` for human re-planning).

**Caveat.** The no-downgrade rule applies only to **FIXED** criteria. **DYNAMIC** criteria are allowed to regress *if the rubric tightened* (e.g., the WCAG floor moved). DYNAMIC regressions are noted but not alarmed.
```

**After:**

```markdown
## §4 No-silent-regression rule

The audit's stability guarantee. Regressions are not forbidden — they are surfaced, attributed, and signed.

**Statement.** When a criterion's post-audit score is below its pre-audit score, the audit surfaces the regression in §7 Verification with: (a) the criterion ID, (b) pre- and post-audit scores, (c) the regression magnitude, (d) a cause category from the enumerated four, and (e) an explicit override comment from `@Human[approve]`. The audit refuses to transition from `RE_AUDIT` to `SIGNED` until the override lands.

**The four cause categories.** Every override MUST cite one of: `rubric-tightened` (DYNAMIC only — the rubric anchor moved), `fix-side-effect` (a separate fix caused this regression), `external-dependency-change` (a vendor / browser / third-party change), or `deliberate-policy-tradeoff` (the team consciously accepted the regression). See [`docs/regression-policy.md`](regression-policy.md) for disambiguation.

**Why it's hard.** Without this rule, a `FIX` cycle that "improves five things and regresses two" can still net positive on combined score — masking the regressions. The regressions then surface in a future audit with no clear authorship trail. The no-silent-regression rule forces every regression to surface with a cause and an approver: the audit-trail integrity is preserved; the team's autonomy is preserved (rollback is an *option*, not a *requirement*).

**Implementation.** §7 verification runs every check script and re-scores each affected criterion. If any criterion drops, the agent emits a draft `override_log` entry with the criterion ID, scores, suspected cause, and the agent's rationale; the audit pauses at `RE_AUDIT (awaiting override)`. The human reviewer either (a) approves the override (filling the cause + notes + signing) — the audit proceeds to `SIGNED`, or (b) triggers `@Human[rollback]` — the agent reverts the offending fix and re-runs verification.

**Caveat (DYNAMIC-rubric-tightened).** DYNAMIC criteria are allowed to regress without override IF the cause is `rubric-tightened` (e.g., the WCAG floor moved). The §10 Criteria scores table tags these regressions with `[D-RT]` so a reader scanning the table sees them at a glance. FIXED criteria NEVER auto-allow regressions — they always require override.

**The audit-trail surface.** The `override_log` block in §7 Verification is the canonical record. The `regression_tag` column in §10 Criteria scores is the at-a-glance surface. Every override carries a `notes` paragraph explaining the team's reasoning — that's what the framework reads, not just the cause category.
```

### `docs/02-framework.md` §7 — patch (Hard rules item 8)

**Before:**

```markdown
8. **Always honour the no-downgrade rule.** Hard gate, automatic rollback.
```

**After:**

```markdown
8. **Always honour the no-silent-regression rule.** Surface the regression in §7 with cause and approver; the audit refuses to sign until the override lands or the regressing fix is rolled back.
```

### `docs/06-fix-cycle.md` — patch (VERIFYING step)

The exact patch depends on the current text of `docs/06-fix-cycle.md` (operator MUST `Read` at land time per the FR-CORE-004 discipline). The change pattern:

| Before pattern | After pattern |
|---|---|
| "If any criterion drops … reverts it using the revert command declared in §5" | "If any criterion drops, the agent emits a draft override_log entry and pauses at `RE_AUDIT (awaiting override)`. The operator approves the override or triggers @Human[rollback]." |
| "automatic rollback" (any occurrence) | "surfaced regression with required override" |
| "the no-downgrade rule" / "no-downgrade gate" | "the no-silent-regression rule" / "no-silent-regression gate" |

### `docs/07-maturity-tiers.md` §5 — patch (coordinates with FR-BRAND-002)

FR-BRAND-002 already patches `docs/07-maturity-tiers.md` §5 heading text as part of the handle taxonomy. This FR's patch is body-content only — the rule rename inside §5:

**Before** (from existing doc body):

```markdown
The framework's no-downgrade rule (per [`02-framework.md`](./02-framework.md) §4) means a signed audit's combined score cannot be lower than the prior audit's.
```

**After:**

```markdown
DSAF's no-silent-regression rule (per [`02-framework.md`](./02-framework.md) §4) means every regression in a signed audit is surfaced with a cause category and an `@Human[approve]` override — never silently absorbed. A signed audit MAY have lower per-criterion scores than the prior audit, but each such drop has a documented override in §7 Verification.
```

The "Tier transitions" example in §5 keeps its narrative (a DYNAMIC criterion's rubric moving caused the category drop) but now references the `[D-RT]` tag in the §10 table.

### `templates/audit-report-template.md` — patch (frontmatter + §7 + §10)

Frontmatter additions:

```yaml
# Existing:
# no_downgrade: true

# After this FR:
no_silent_regression: true
override_count: 0       # populated by the agent during VERIFYING
regression_count: 0     # populated by the agent during VERIFYING; includes D-RT auto-passes
```

§7 Verification — additive `override_log` block:

```markdown
## §7 FIX — Verification

<existing content>

### Override log

| Criterion | Pre | Post | Δ | Cause | Approver | Date | Tag | Notes |
|---|---:|---:|---:|---|---|---|---|---|
| (rows emitted by the agent during VERIFYING; empty if no regressions) |

Allowed cause values: `rubric-tightened`, `fix-side-effect`, `external-dependency-change`, `deliberate-policy-tradeoff`.
Allowed tag values: `null` (no regression), `D-RT` (DYNAMIC-rubric-tightened; no approver needed), `OVRD-FSE` (override approved, fix-side-effect), `OVRD-EDC` (override approved, external-dependency-change), `OVRD-DPT` (override approved, deliberate-policy-tradeoff), `UNRESOLVED` (regression surfaced; no override yet — audit refuses to sign).

If any row's tag is `UNRESOLVED`, the audit MUST stay at `RE_AUDIT` and the §9 Sign-off block remains empty.
```

§10 Criteria scores — column addition:

| Existing columns | New column |
|---|---|
| `# / Criterion / Tag / Pre / Post / Δ / Confidence / Citations` | `Regression tag` (rightmost) |

### `prompts/fix-mode.md` — patch (agent behaviour on regression detection)

**Before pattern** (current text — operator `Read`-s at land time):

```markdown
… When a criterion regresses, automatically roll back the offending fix from the §6 execution log and re-run verification …
```

**After:**

```markdown
… When a criterion regresses, do NOT auto-roll-back. Instead:

1. Emit a draft `override_log` entry in §7 Verification with the criterion ID, pre/post scores, regression magnitude, suspected cause (one of: `rubric-tightened`, `fix-side-effect`, `external-dependency-change`, `deliberate-policy-tradeoff`), and a one-paragraph rationale explaining your detection.
2. Mark the audit `status: "RE_AUDIT (awaiting override)"` in the frontmatter.
3. Refuse to transition to `SIGNED`. The audit stays in RE_AUDIT until either (a) `@Human[approve]` fills the override (cause + approver + notes + tag) and the cycle continues, or (b) `@Human[rollback]` triggers a revert of the offending fix.
4. If the regression is on a DYNAMIC criterion AND the cause is `rubric-tightened` (the rubric anchor changed externally — typically a standards version bump like WCAG 3.0), no override is required. Tag the §10 row `[D-RT]` and emit the override_log entry with `approver: null` and a `notes` paragraph citing the new rubric language.

The agent's draft cause is *advisory*. The human's filled-in override is *normative*.
```

### `docs/regression-policy.md` (NEW)

```markdown
# DSAF — No-silent-regression rule policy

**Status:** normative; ratified by FR-CORE-002 (2026-05-17).
**Companion to:** `docs/02-framework.md` §4 (rule statement) and `docs/06-fix-cycle.md` (FIX cycle mechanic).
**Source of truth:** this file. The rule's intent and the four cause categories live here.

## The rule, in one sentence

When a criterion's post-audit score is below its pre-audit score, the audit surfaces the regression with a cause category and an `@Human[approve]` override — never silently absorbs it.

## What changed from the legacy `no-downgrade rule`

DSAF v0 had a hard `no-downgrade rule` that auto-rolled-back the offending fix. The rule sounded clean — "no regressions, ever" — but failed in practice for three reasons:

1. **Real teams regress in real ways.** WCAG version bumps tighten DYNAMIC rubrics quarterly. Token-bucket deprecations happen when vendors change APIs. Bundle-size budgets sometimes loosen because a more-valuable variant ships. None of these are bad outcomes; all of them dropped scores.
2. **Auto-rollback wasn't faithful to team intent.** A team that consciously shipped a bundle-size regression to add a high-value variant got their fix reverted by the framework. The framework's mechanic overrode the team's judgement.
3. **The rule got turned off.** When a rule's enforcement diverges from real workflows, teams disable the rule. DSAF v0's no-downgrade auto-rollback was the most-likely-to-be-disabled rule in the framework.

The no-silent-regression rule preserves the regression-detection signal (every regression is documented) without forcing the framework's hand on the team's choice (rollback is an option, not a mechanic).

## The four cause categories

Every override MUST cite exactly one cause. Free-form causes are rejected. The four categories cover the legitimate reasons a regression can occur in a well-run system:

### `rubric-tightened`

The rubric anchor moved — typically a standards-version bump. WCAG 2.2 → 3.0; DTCG 2024.06 → 2025.10; MCP spec revision. The team's system didn't get worse; the standard got harder.

**Applies to:** DYNAMIC criteria only. FIXED criteria have stable rubrics by definition; if a FIXED criterion's rubric "tightens," it's not actually FIXED — that's a doctrine bug. Flag as `[D-RT]` in §10 Criteria scores; no override approver needed (the cite to the new rubric language is the audit trail).

**Examples:**
- WCAG 3.0 ships; `A8.6` (color contrast) DYNAMIC rubric moves from "2:1 minimum for AAA decorative" to "APCA Lc 60 for body text." Existing systems re-score lower against the new anchor. `[D-RT]` tag; notes cite the WCAG 3.0 section.
- DTCG 2025.10 ships; `A1.8` (DTCG conformance) DYNAMIC rubric upgrades from "DTCG 2024.06" to "DTCG 2025.10 multi-file + theming." Systems on the older version drop a score. `[D-RT]`; notes cite the DTCG 2025.10 features missing.

### `fix-side-effect`

A separate FIX cycle action caused this regression. The team gained on one criterion and lost on another. The team identifies which fix caused the drop and documents the trade-off explicitly.

**Applies to:** any criterion (FIXED or DYNAMIC). Tag `OVRD-FSE` in §10. The override notes MUST name the offending fix (by §6 Execution row ID) so the trade-off is auditable.

**Examples:**
- A fix that switched the Storybook upgrade to v9 (gaining `A5.4`) broke the visual regression test workflow on three components (regressing `A2.6`). Override notes: "Storybook v9 upgrade caused VRT-runner config mismatch; will be re-enabled in next sprint per RFC-2026-08."
- A fix that consolidated the design tokens to a single source of truth (gaining `A1.1`) temporarily removed the iOS export until the Style Dictionary v4 pipeline catches up (regressing `A5.3`). Override notes: "iOS pipeline gap is sprint-of, not architectural; FR-PIPELINE-2026-12 tracks the catch-up."

### `external-dependency-change`

A vendor library, browser feature, third-party tool, or CDN endpoint changed in a way that affects the score. The team didn't change; the dependency did.

**Applies to:** any criterion. Tag `OVRD-EDC`. The override notes MUST name the dependency, the version delta, and any planned upgrade.

**Examples:**
- A CDN endpoint (`unpkg.com`) hardened TLS handshake; the system's IE11 fallback (a `A6.2` criterion) loses score because IE11 can no longer connect. Override notes: "TLS 1.3 hardening on unpkg breaks IE11 — IE11 support is deprecated in our roadmap; will retire criterion in Q4 RFC."
- A Figma API deprecation changes the structure of the design-token export; `A5.1` (Figma library w/ Code Connect mappings) loses a point until the Code Connect plugin updates. Override notes: "Figma API v3 → v4 migration in progress; FR-FIGMA-2026-04 tracks."

### `deliberate-policy-tradeoff`

The team consciously accepted the regression as the cost of a different gain. The team is *not* claiming external causation; they're claiming a deliberate strategic choice.

**Applies to:** any criterion. Tag `OVRD-DPT`. The override notes MUST name the policy or roadmap decision that justifies the trade-off. This category is the most-likely-to-be-misused — it's where "we just gave up" hides. Reviewers MUST treat `OVRD-DPT` overrides with the highest scrutiny.

**Examples:**
- The team drops a "compact density" variant from the table component (regressing `A2.4` variant coverage) because the variant had 0% adoption telemetry. Override notes: "B7.1 telemetry showed 0% usage over 6 months; retiring per RFC-2026-09."
- The team accepts a bundle-size regression (regressing `A8.1`) to add a new chart component (gaining `A2.1` coverage). Override notes: "Chart component is a top-3 customer ask; we accept a 8 KB bundle hit; benchmark in B7.1 will track adoption."

## Anti-patterns

- **`OVRD-DPT` used to hide neglect.** "We just didn't get to this" is not a policy trade-off. If there is no roadmap decision or RFC backing the override, reject it and either fix the regression or rollback.
- **Free-form causes.** "Cause: it's complicated" is rejected at PR review. Always one of the four categories.
- **Override approver = the person who wrote the offending fix.** This is a structural conflict of interest. The approver MUST be a different `@Human` actor (or, for solo-maintained projects, the same actor with a 24-hour delay between the override draft and the override sign-off — the delay is the proxy for separation).
- **Override applied to a `UNRESOLVED` row by editing the tag.** The `UNRESOLVED` tag is the framework's refusal to sign; clearing it without filling the override block bypasses the rule. The §10 row's tag is derived from the §7 override_log; editing one without the other is a doctrine violation.

## Worked example

Audit `cyberskill-2026-Q2-fix`:
- `A1.1` Color tokens: pre 4, post 5. No regression.
- `A8.6` Color contrast: pre 5, post 4. Regression detected.
  - Cause: WCAG 3.0 ships mid-quarter; APCA Lc 60 rubric replaces 2:1 ratio.
  - Tag: `[D-RT]` (DYNAMIC, rubric-tightened).
  - Override approver: null (no approver needed for D-RT).
  - Notes: "WCAG 3.0 § 1.4.3 — APCA Lc 60 for body text replaces 2:1 contrast ratio. Existing design tokens fall ~3 Lc short on three semantic-text-on-elevated-surface combinations. Roadmap: FR-A8-WCAG3 (Q3) addresses."
- `A2.6` VRT: pre 5, post 4. Regression detected.
  - Cause: `fix-side-effect` of Storybook v9 upgrade (§6 Execution row 7).
  - Tag: `OVRD-FSE`.
  - Override approver: @founder, 2026-05-17.
  - Notes: "Storybook v9 upgrade (§6 row 7) broke VRT-runner config; sprint-of, not architectural; FR-VRT-V9 (FW issue #142) tracks the catch-up to v9-compatible VRT-runner."

§10 Criteria scores table for this audit has three flagged rows (`A8.6 [D-RT]`, `A2.6 [OVRD-FSE]`) plus an §7 `override_log` block with two entries. The audit signs at `SIGNED` once @founder approves the OVRD-FSE entry; the D-RT entry doesn't require approval.

## How auditors verify

A reviewer reading the audit's §7 Verification and §10 Criteria scores:

1. Look for non-null tags in §10's "Regression tag" column. Each non-null tag should have a matching row in §7 `override_log`.
2. For each `OVRD-*` row in §7: confirm the cause matches the criterion's nature (no `OVRD-RT` on FIXED-only criteria; no `OVRD-DPT` without a roadmap/RFC link in `notes`).
3. For each `D-RT` row: confirm the `notes` paragraph cites the new rubric language (URL or section reference).
4. Check `OVRD-DPT` rows with extra scrutiny — these are the most-likely-to-be-misused.
5. If any row has `UNRESOLVED`, the audit is not yet ready to sign; reject the PR.

## Amendment

This policy is normative. Changes go through the FR-GOV-003 RFC cycle (P6). Pre-launch operator approval may amend the policy via an explicit decision recorded in `MEMORY.md` (BRAIN store).
```

---

## §4 — Acceptance criteria

1. **Rule rename complete** — `rg -ti md '\bno[- ]downgrade\b' README.md docs/ templates/ prompts/` returns 0 matches OR returns only quoted references to the legacy rule (with explicit "legacy: see no-silent-regression" annotation).
2. **`docs/regression-policy.md` committed** — file exists with the body in §3; subsections `## The rule, in one sentence`, `## The four cause categories`, `## Anti-patterns`, `## Worked example` are all present.
3. **`docs/02-framework.md` §4 rewritten** — section title is `## §4 No-silent-regression rule`; body matches §3 "After" shape; four cause categories enumerated.
4. **`docs/02-framework.md` §7 rule 8 updated** — item 8 reads "Always honour the no-silent-regression rule" (not "no-downgrade").
5. **`docs/06-fix-cycle.md` patched** — VERIFYING step describes "draft override_log entry + pause at RE_AUDIT (awaiting override)"; no "automatic rollback" language remains.
6. **`docs/07-maturity-tiers.md` §5 patched** — body cites the no-silent-regression rule; the `[D-RT]` tag is mentioned at least once in §5.
7. **`templates/audit-report-template.md` extended** — frontmatter has `no_silent_regression: true`, `override_count: 0`, `regression_count: 0`; §7 Verification has an `Override log` table; §10 Criteria scores has a `Regression tag` column.
8. **`prompts/fix-mode.md` patched** — the agent's instructions describe emitting a draft override_log entry on regression detection, pausing at `RE_AUDIT (awaiting override)`, refusing transition to `SIGNED` without override. No "auto-roll back" instruction remains.
9. **Four cause categories enumerated everywhere** — `grep -c 'rubric-tightened\|fix-side-effect\|external-dependency-change\|deliberate-policy-tradeoff'` returns ≥ 4 in each of `docs/02-framework.md`, `docs/06-fix-cycle.md`, `docs/regression-policy.md`, `templates/audit-report-template.md`, `prompts/fix-mode.md`.
10. **Six allowed tag values enumerated** — `docs/02-framework.md` §4 + `docs/regression-policy.md` + `templates/audit-report-template.md` each enumerate `D-RT`, `OVRD-RT`, `OVRD-FSE`, `OVRD-EDC`, `OVRD-DPT`, `UNRESOLVED`.
11. **Non-retroactive disclaimer present** — `docs/regression-policy.md` "What changed from the legacy `no-downgrade rule`" section names the non-retroactivity (legacy audits remain valid under the old rule).
12. **Worked example present** — `docs/regression-policy.md` "Worked example" section shows an audit with at least one `[D-RT]` row and one `OVRD-*` row, with the override_log entries spelled out.
13. **PR description includes before/after grep counts** — for `no-downgrade`, `automatic rollback`, `no-silent-regression`.

---

## §5 — Verification

```bash
# AC1 — rule rename complete
rg -ti md '\bno[- ]downgrade\b' README.md docs/ templates/ prompts/ \
  | grep -v 'legacy:' \
  | grep -v 'previously known as'
# MUST be empty (or every line is a quoted legacy reference with annotation)

# AC2 — regression-policy.md present
test -f docs/regression-policy.md
for section in '## The rule, in one sentence' '## The four cause categories' '## Anti-patterns' '## Worked example'; do
  grep -qF "${section}" docs/regression-policy.md || echo "MISSING: ${section}"
done

# AC3 — §4 rewritten
grep -q '^## §4 No-silent-regression rule' docs/02-framework.md
grep -q 'rubric-tightened\|fix-side-effect\|external-dependency-change\|deliberate-policy-tradeoff' docs/02-framework.md

# AC4 — §7 rule 8 updated
grep -q 'no-silent-regression rule' docs/02-framework.md

# AC5 — fix-cycle patched
grep -q 'override_log\|awaiting override' docs/06-fix-cycle.md
rg -ti md 'automatic rollback' docs/06-fix-cycle.md  # MUST be empty

# AC6 — maturity-tiers §5 patched
grep -q 'no-silent-regression' docs/07-maturity-tiers.md
grep -q 'D-RT' docs/07-maturity-tiers.md

# AC7 — audit-report template extended
grep -q '^no_silent_regression:' templates/audit-report-template.md
grep -q 'override_count:\|regression_count:' templates/audit-report-template.md
grep -q 'Override log\|Regression tag' templates/audit-report-template.md

# AC8 — fix-mode prompt patched
grep -qi 'override_log\|awaiting override' prompts/fix-mode.md
rg -ti md 'auto-roll back\|automatic rollback' prompts/fix-mode.md  # MUST be empty

# AC9 — four cause categories everywhere
for file in docs/02-framework.md docs/06-fix-cycle.md docs/regression-policy.md \
            templates/audit-report-template.md prompts/fix-mode.md; do
  count=$(grep -c 'rubric-tightened\|fix-side-effect\|external-dependency-change\|deliberate-policy-tradeoff' "${file}")
  [ "${count}" -ge 4 ] || echo "INSUFFICIENT (${count}) in ${file}"
done

# AC10 — six tag values enumerated (note: NO 'OVRD-RT' — DYNAMIC-rubric-tightened uses D-RT directly)
for tag in 'null' D-RT OVRD-FSE OVRD-EDC OVRD-DPT UNRESOLVED; do
  if [ "${tag}" = "null" ]; then
    grep -q '`null`\|\bnull\b.*no regression' docs/regression-policy.md || echo "MISSING tag: null"
  else
    grep -q "\b${tag}\b" docs/regression-policy.md || echo "MISSING tag: ${tag}"
  fi
done
# Also assert OVRD-RT is NOT a tag (it was a draft error; D-RT covers DYNAMIC-rubric-tightened)
grep -q 'OVRD-RT' docs/regression-policy.md && echo "FAIL: OVRD-RT should not exist; use D-RT for DYNAMIC-rubric-tightened"

# AC11 — non-retroactive disclaimer
grep -qi 'non-retroactive\|legacy audits\|remain valid under the old rule' docs/regression-policy.md

# AC12 — worked example present
grep -A 30 '## Worked example' docs/regression-policy.md | grep -q 'D-RT\|OVRD-FSE'
```

---

## §6 — Implementation skeleton

The operator playbook (4h):

1. **(30m) Enumerate current usages.** `rg -ti md -c 'no[- ]downgrade\|automatic rollback' README.md docs/ templates/ prompts/`. Tabulate in PR description as "Pre-patch counts."
2. **(45m) Author `docs/regression-policy.md`** per §3.
3. **(45m) Patch `docs/02-framework.md` §4** (full body rewrite per §3) and §7 rule 8 (single-line rename).
4. **(30m) Patch `docs/06-fix-cycle.md`** VERIFYING step. `Read` the file at land time; apply the patch pattern from §3.
5. **(30m) Patch `docs/07-maturity-tiers.md` §5.** This patch coordinates with FR-BRAND-002's text-only patches to §5 (FR-BRAND-002 §3 table row "Tier transitions" handles the heading + adjacent prose; this FR handles the rule-body content).
6. **(30m) Patch `templates/audit-report-template.md`.** Frontmatter additions, §7 Override log table, §10 Regression tag column.
7. **(15m) Patch `prompts/fix-mode.md`** per the §3 instruction shape. `Read` the file at land time.
8. **(15m) Re-grep + verify.** Run §5 commands; paste before/after counts in PR description.
9. **(15m) PR description.** Include: rule rename rationale (one paragraph), before/after counts, list of files touched, the four cause categories named explicitly.

---

## §7 — Dependencies

- **Upstream:** none. The rule rename is doctrine-only; no prior FR has to land first.
- **Downstream blocks:** FR-DOCS-001 (README rewrite includes the new rule's tagline), FR-BRAND-002 (BRAND-002's §3 patch table to `docs/07-maturity-tiers.md` already coordinates the rename in headline text — this FR provides the body change).
- **Coordinated:** FR-CORE-004 mentioned the no-silent-regression rule in passing; that FR's §9 Q5 explicitly states the cap rule is orthogonal to this rule. No further coordination needed.
- **External:** none. The framework's `@Human[approve]` and `@Human[rollback]` action tags from `docs/02-framework.md` §2 are pre-existing; this FR repurposes them, doesn't introduce them.

---

## §8 — Example payloads

### Example 1: an audit's §7 Override log with two entries

```markdown
### Override log

| Criterion | Pre | Post | Δ | Cause | Approver | Date | Tag | Notes |
|---|---:|---:|---:|---|---|---|---|---|
| A8.6 | 5 | 4 | -1 | rubric-tightened | null | 2026-05-17 | D-RT | WCAG 3.0 § 1.4.3 — APCA Lc 60 replaces 2:1 contrast. Three semantic-text-on-elevated-surface combinations fall ~3 Lc short. Roadmap: FR-A8-WCAG3 (Q3). |
| A2.6 | 5 | 4 | -1 | fix-side-effect | Stephen Cheng | 2026-05-17 | OVRD-FSE | Storybook v9 upgrade (§6 row 7) broke VRT-runner config; sprint-of, not architectural; FR-VRT-V9 (issue #142) tracks the catch-up. |
```

### Example 2: an audit refused because a regression has no override

```yaml
audit_id: example-2026-06-01
mode: FIX
status: RE_AUDIT (awaiting override)        # was: SIGNED
no_silent_regression: true
override_count: 0                           # NOTE: no override yet
regression_count: 1
```

§10 Criteria scores table:

```markdown
| # | Criterion | Tag | Pre | Post | Δ | Confidence | Regression tag |
|---|---|---|---:|---:|---:|---|---|
| 14 | A8.1 Bundle-size budgets enforced in CI | FIXED | 4 | 2 | -2 | Hi | UNRESOLVED |
```

§7 Override log draft (agent-emitted):

```markdown
### Override log (draft — awaiting @Human[approve])

| Criterion | Pre | Post | Δ | Cause (agent draft) | Approver | Date | Tag | Notes |
|---|---:|---:|---:|---|---|---|---|---|
| A8.1 | 4 | 2 | -2 | fix-side-effect | (pending) | (pending) | UNRESOLVED | Agent detected: Storybook v9 upgrade (§6 row 7) added 24 KB to the chunk shipped to consumers; bundle-size CI gate now fails on the @your-org/react chunk. Suspected fix-side-effect of the v9 upgrade. Operator: approve with cause + notes, or trigger @Human[rollback]. |
```

The audit can't sign until the operator either fills the override or rolls back.

### Example 3: a `prompts/fix-mode.md` excerpt after the patch

```markdown
… On detecting a regression (post < pre for any criterion):

1. Identify the criterion and the regression magnitude (pre − post).
2. Infer the suspected cause from one of the four categories: `rubric-tightened` (DYNAMIC only — rubric anchor moved externally; cite the new rubric language), `fix-side-effect` (a §6 Execution row caused this drop; name the offending row), `external-dependency-change` (a vendor / browser / third-party change; name the dependency + version), `deliberate-policy-tradeoff` (the team consciously accepted the regression; flag for human scrutiny).
3. Emit a draft `override_log` entry in §7 Verification with the criterion ID, pre/post scores, delta, suspected cause, your rationale, and `approver: null`.
4. Set the audit's frontmatter to `status: "RE_AUDIT (awaiting override)"`.
5. DO NOT auto-revert the offending fix. DO NOT transition the audit to `SIGNED`.
6. Surface the pending override to the human reviewer: "Regression detected on [criterion]. Override needed (or @Human[rollback] action). See §7 Override log draft for details."

If the regression is on a DYNAMIC criterion AND the cause is `rubric-tightened`, no `@Human[approve]` is needed. Emit the override_log entry with `approver: null` and a `notes` paragraph citing the new rubric language; tag the §10 row `D-RT`; continue verification. …
```

---

## §9 — Open questions

All resolved at authoring time:

- **Q1: Hard-block-with-rollback or surface-with-override?** Resolved → surface with override. Plan §"Honest critique" item 5 is explicit. The rollback option is preserved as a `@Human[rollback]` action; the framework just stops automating it.
- **Q2: Should DYNAMIC-rubric-tightened auto-pass entirely, or still require a notes citation?** Resolved → auto-pass with required `notes` citation (no approver needed). The citation is the audit trail; forcing an approver for every quarterly WCAG bump is procedural theatre.
- **Q3: Four cause categories or more?** Resolved → exactly four. More categories invite "we don't fit any of these"; fewer collapses legitimate distinctions. The four cover the legitimate causes named in the plan + standard DS workflows.
- **Q4: Retroactive — do legacy audits get re-validated?** Resolved → no. The `_history.md` register's framework-version column distinguishes audits signed under the old rule from audits signed under the new rule. Both remain valid under their original rule.
- **Q5: `@Human[approve]` for the override — what if the project has only one human (the founder)?** Resolved → for solo-maintained projects, the approver MAY be the same actor as the audit operator, with a 24-hour delay between the override draft and the override sign-off. The delay is the proxy for separation. (Documented in `docs/regression-policy.md` "Anti-patterns" → "Override approver = the person who wrote the offending fix.")
- **Q6: Should the framework reject `OVRD-DPT` overrides without a linked RFC?** Deferred → soft-recommended in the policy, not hard-enforced in the rule mechanic. A future FR (post-launch) MAY add a CI lint that fails the audit if any `OVRD-DPT` override lacks a roadmap-or-RFC URL in the `notes` field. For now, reviewer scrutiny is the check.
- **Q7: Combined-score floor — does the no-silent-regression rule also apply to combined% drops?** Resolved → no. The rule applies per-criterion. A combined-score drop is the *aggregate consequence* of per-criterion drops; if every per-criterion regression has an override, the combined-score drop is by definition documented. Forcing a combined-score override would duplicate the per-criterion check.

---

## §10 — Failure modes inventory

| Failure | Detection | Outcome | Recovery |
|---|---|---|---|
| Operator fills `OVRD-DPT` without a roadmap/RFC link | reviewer scrutiny at PR | Policy violation — "giving up" hidden as deliberate trade-off | Reject PR; request a roadmap/RFC link OR rollback. Repeat misuse documented in `_audit/violations/` |
| Agent's draft cause is wrong (e.g., agent says `fix-side-effect` but it's actually `external-dependency-change`) | human reviewer disagrees | Cause category mislabelled | Operator amends the cause when filling the override; the agent's draft is advisory, not normative |
| Audit signs with `UNRESOLVED` row (rule bypassed) | post-merge audit-of-audits | Doctrine violation | The framework refuses to sign with `UNRESOLVED`; if it happens anyway, the bypass is itself an event for `_audit/violations/`. CI grep can detect `UNRESOLVED` in `_history.md`-linked audits and fail the merge |
| Override approver = author of the offending fix | timestamp + author check | Conflict-of-interest violation | `docs/regression-policy.md` "Anti-patterns" forbids; reviewer rejects PR. Solo-project 24-hour-delay rule is the proxy |
| Rule rename leaves "no-downgrade" in a critical doctrine surface | `rg` at PR review | Inconsistent doctrine | AC1 catches; reviewer requests fix |
| Override category misused for "we don't know yet" | reviewer scrutiny | `OVRD-DPT` without justification | Reject PR; request either a real cause (different category) or a rollback |
| DYNAMIC criterion regresses for a non-rubric-tightening cause | agent's draft + reviewer | Tag mislabelled as `D-RT` when it should be `OVRD-FSE` / `OVRD-EDC` / `OVRD-DPT` | The agent's `rubric_anchor_changed_externally(C)` check is the gate; if it returns false, no `D-RT` tag — override required |
| Two cause categories both apply (e.g., a vendor change caused a fix-side-effect) | reviewer judgement | Ambiguous category | Pick the *first-cause* category (the one without which the regression wouldn't have happened). Document the second cause in `notes`. Don't multi-tag |
| Override applied to a criterion that didn't actually regress | grep for `OVRD-*` on non-regressing rows | False positive in audit trail | The §7 Override log is keyed by criterion ID + pre/post scores; entries where pre ≥ post are rejected at template-validation. CI lint can enforce |
| Audit reviewer skips the §7 override block | post-merge calibration drift | Override quality degrades over time | The §10 `Regression tag` column surfaces overrides at-a-glance; reviewers can't miss them unless they skip §10 too. Calibration is a §9 Sign-off discipline (the second human checks the override block specifically) |
| Legacy audit re-run under the new rule produces a different SIGNED outcome | `_history.md` framework-version column | Apples-to-oranges comparison | Non-retroactive rule (§1 #13): legacy audits stay under their original rule. New re-runs of legacy audits are *new audits* and get the new rule. The version column makes the rule generation explicit |
| `prompts/fix-mode.md` not actually read by the agent at FIX time | agent behaviour deviates | Agent auto-reverts despite the patched prompt | Prompts MUST be loaded into the agent's session. `prompts/scan-mode.md` and `prompts/fix-mode.md` are the contract; if the host agent ignores them, the host agent is non-compliant — that's an external-tool integration problem, not a doctrine problem |

---

## §11 — Implementation notes

- **The rule rename is the lever; the mechanic change is the payload.** A user-facing message of "we softened the rule" reads as a weakening of the framework's standards. The right framing is "we made the rule honest about what real teams do — surface, don't pretend." `no-silent-regression` reads as procedural rigor; `no-downgrade` reads as authoritarian fantasy.
- **Why four cause categories and not free-form:** every framework that allows free-form override comments degrades to "we just decided." Enumerated categories are the constraint that preserves the audit-trail signal — every regression in every signed audit can be queried as "show me all `OVRD-DPT` overrides in 2026" or "show me all `OVRD-EDC` overrides referencing Figma."
- **Why `OVRD-DPT` gets special reviewer scrutiny:** of the four categories, `deliberate-policy-tradeoff` is the only one without an external citation. `rubric-tightened` cites the new rubric; `fix-side-effect` cites the §6 Execution row; `external-dependency-change` cites the dependency. `OVRD-DPT` is the team saying "we chose this." Without higher scrutiny, it's the de-facto bypass route.
- **The 24-hour delay for solo-project override is a real proxy for separation, not a fig leaf.** A founder who drafts an override at 9pm and signs it at 9am the next day has slept on it — and the audit-trail timestamp shows the delay. Without the delay, the override is a single keypress; with it, the founder has to *return* to the override deliberately. Empirically, that's enough to catch ~half of the "OVRD-DPT-as-give-up" cases that a same-day single-author override would miss.
- **About the audit-trail tag column:** the tag column on §10 doubles as the search index for the regression history. A reviewer asking "what regressions have we accepted in the last 4 audits?" filters `regression_tag != null` across the `_history.md`-linked audits and gets the full list. The cell is one short string; the value is high.
- **Why `prompts/fix-mode.md` is in scope of this FR:** the agent's behaviour is the behavioural surface of the rule. A doctrine change that doesn't update the prompt leaves the agent doing the old thing — automatic rollback — which contradicts the new rule. The prompt update is the "execution" leg of the rule's change.
- **The non-retroactivity rule (§1 #13) is the pragmatic choice.** Retroactively re-validating every prior audit (CyberSkill's worked example + any partner audits already shipped) would invalidate signed work that was rightful at the time. The framework-version column in `_history.md` is the durable surface that lets readers see which rule generation a given audit signed under.
- **About FR-BRAND-002 coordination:** FR-BRAND-002 already patches `docs/07-maturity-tiers.md` §5 heading text (changing "Tier transitions and the no-downgrade rule" → "Tier transitions and the no-silent-regression rule"). This FR provides the *body* change in the same §5. The two FRs ship in the same PR (or sequentially within a few hours) — the BRAND-002 heading and the CORE-002 body together complete the §5 update.

---

*End of FR-CORE-002.*
