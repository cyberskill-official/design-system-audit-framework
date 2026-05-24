# 02 — DSAF Operating Spec

DSAF defines how a design system is scored, who does the work, and how the output is structured. This document is the contract DSAF promises. Once you read it, you can run an audit.

---

## §1 Modes

Each audit session runs in one of two modes. A complete audit cycle uses both, in this order.

### `SCAN` mode

The audit measures the *current* state of the system. No fixes. The agent re-scores all 125 criteria, gathers industry research, and produces a list of findings. Output: a draft `audit-report-{date}.md` with sections §1 through §3 populated. The session pauses at §4 for human review.

### `FIX` mode

The audit *applies* the human-approved fixes from the SCAN cycle. The agent sequences the fixes, executes them with rollback paths declared up front, runs verification, re-scores affected criteria, and submits the final report for sign-off. Output: same file, sections §5 through §9 populated.

When the maximal enterprise overlay is enabled, FIX mode also regenerates every affected real artifact after doctrine or source changes. Examples: generated benchmark data, criteria aliases, visual assets, package metadata, Storybook/equivalent exports, token outputs, docs pages, and contract JSON. If no re-creation command exists, the finding remains open as `missing-generator` rather than being counted as complete. Manual-only proof is labeled `MANUAL` in the unified criterion table rather than hidden inside automated scoring.

**Never run FIX without SCAN.** The fix mode requires the findings table from SCAN to know what to do. DSAF refuses if §4 is empty.

**Always pause between SCAN and FIX.** This is the human's gate to approve, reject, or defer each finding. Skipping it is a DSAF Mode violation.

---

## §2 Actors

DSAF has exactly two actors. Every action is owned by one of them.

### `@Agent` — autonomous work

The agent is whatever LLM you have wired up: Claude, GPT, Cursor's agent, a custom MCP, etc. The agent owns:

- **Scoring** — re-rate the 125 criteria from current evidence, cite sources.
- **Research** — web-search for new / updated standards (WCAG, DTCG, APCA, MCP, CSS specs, …).
- **Doc patches** — edits to markdown files inside the design system's docs.
- **Token edits** — DTCG token JSON updates.
- **Lint runs / script execution** — running `check-*` scripts, parsing output.
- **Findings enumeration** — listing gaps, routing each to an actor.
- **Verification** — running all check scripts, comparing pre/post scores.

The agent does **not** own: deploys, contracts, conversations with vendors, user-research sessions, conference submissions, code that requires deep system knowledge it doesn't have.

### `@Human` — manual work and decisions

The human owns:

- **Decisions** — choosing among options, accepting / rejecting findings, calibrating against agent scores.
- **Manual work** — anything that requires hands the agent doesn't have: deploys (`@Human[manual]`), vendor procurement, user studies, contracts, conference talks, partnership conversations.
- **Sign-off** — final approval at §9, register row in `_history.md`.
- **Rollback** — when an agent fix breaks something the verification gate didn't catch.

### Action tags

Inline tags drive routing. Each finding row in §3 of the audit report is tagged exactly one of:

| Tag | Meaning |
|---|---|
| `@Agent[fix]` | Agent fixes autonomously in the FIX cycle |
| `@Agent[research]` | Agent gathers more evidence; no fix yet |
| `@Human[decide]` | Human chooses among options before agent proceeds |
| `@Human[approve]` | Human gates progression (the §4 sign-off is one of these) |
| `@Human[manual]` | Work the agent cannot do (deploy, vendor, user study, talk, contract) |
| `@Human[rollback]` | Human-driven revert if agent's fix breaks something |

---

## §3 Audit flow (state machine)

```
BASELINE  →  RESEARCH  →  FINDINGS  →  AWAITING_REVIEW  ⏸  →  FIXING  →  VERIFYING  →  RE_AUDIT  →  SIGNED
                                              ↑                                            │
                                              └─── OVERRIDE or ROLLBACK if any regression ─┘
```

### `BASELINE` — `@Agent[research]`, mode `SCAN`

The agent re-scores the 125 criteria from the current state of the design system. Every score has at least one citation; DSAF rejects scores without cites. Output: §1 of the audit report fully populated, including the per-criterion table at §10.

### `RESEARCH` — `@Agent[research]`, mode `SCAN`

The agent web-searches for new or updated standards since the last audit. Each finding is logged with source URL, summary, and decision (`adopt` / `note` / `defer`). Output: §2 of the audit report, plus §11 research-findings table.

### `FINDINGS` — `@Agent[fix|research]` `@Human[decide|manual]`, mode `SCAN`

The agent enumerates every gap that affects the score, with route, effort estimate, and rollback safety. Output: §3 of the audit report.

### `AWAITING_REVIEW` ⏸ — `@Human[approve]`, mode `SCAN`

**The pause point.** The agent stops. The human reads §1–§3, marks each finding `approve`, `reject`, or `defer`, and updates the report's frontmatter (`mode: FIX`, `status: AWAITING_REVIEW → FIXING`).

A finding's owner determines what happens next:
- `@Agent[fix]` → moves to `FIXING`.
- `@Human[manual]` → marked as `defer` automatically; tracked outside the audit cycle.
- `@Human[decide]` → human picks an option, then the row converts to `@Agent[fix]`.

### `FIXING` — `@Agent[fix]`, mode `FIX`

For each approved finding, the agent: writes the fix, declares the revert command, runs the change, and triggers artifact re-creation for every generated output affected by the change. Output: §5 plan + §6 execution log.

### `VERIFYING` — `@Agent[fix]`, mode `FIX`

The agent runs every check script and re-scores each affected criterion. The **no-silent-regression gate** is hard: if any criterion sits below its pre-audit score, the agent surfaces the regression in §7 with cause, tag, and a required override-or-rollback decision. The audit cannot transition to `SIGNED` while any regression is unresolved. Output: §7.

### `RE_AUDIT` — `@Agent[research]`, mode `FIX`

The agent refreshes §10 with post-fix scores, recomputes the combined number, updates the frontmatter `post_audit_score` block. If the combined score *decreased* vs pre-audit, the drop is treated as a batch-level regression: §7 must contain an override or the reviewer must choose rollback. Output: §8.

### `SIGNED` — `@Human[approve]`, mode `FIX`

The human reviewer fills the §9 sign-off block (name, date, final score) and appends a row to `_history.md`. Until signed, the audit is `AWAITING_REVIEW` or `RE_AUDIT`.

---

## §4 No-silent-regression rule

The audit's stability guarantee. Regressions are not forbidden; they are surfaced, attributed, and signed.

**Statement.** When a criterion's post-audit score is below its pre-audit score, the audit surfaces the regression in §7 Verification with the criterion ID, pre- and post-audit scores, regression magnitude, cause category, and an explicit `@Human[approve]` override comment or a rollback decision. The audit refuses to transition from `RE_AUDIT` to `SIGNED` until the override lands or the regressing fix is rolled back.

**Cause categories.** Every override uses one of: `rubric-tightened` (DYNAMIC only), `fix-side-effect`, `external-dependency-change`, or `deliberate-policy-tradeoff`. See [`regression-policy.md`](./regression-policy.md) for the long-form policy and examples.

**Why it's hard.** Without this rule, a `FIX` cycle that "improves five things and regresses two" can still net positive on combined score, masking the regressions. The no-silent-regression rule preserves the audit trail: every drop has a cause, a tag, and a human decision.

**Implementation.** §7 verification runs every check script and re-scores each affected criterion. If any criterion drops, the agent emits a draft `override_log` entry with the criterion ID, scores, suspected cause, and rationale; the audit pauses at `RE_AUDIT (awaiting override)`. The human reviewer either approves the override or chooses `@Human[rollback]`, after which the agent re-runs verification.

**DYNAMIC rubric tightening.** DYNAMIC criteria may regress without a named approver only when the cause is `rubric-tightened` and the new external rubric is cited. The §10 table tags these rows as `D-RT`. FIXED criteria always require override or rollback.

---

## §5 Scoring methodology

### The 0–5 scale

Every criterion scores on the same scale:

| Score | Anchor | Meaning |
|---|---|---|
| 0 | Absent | No evidence the system addresses this |
| 1 | Mentioned | Mentioned but not designed for |
| 2 | Defined | Designed but not built / not enforced |
| 3 | Built | Built and shipped, but not measured / not maintained |
| 4 | Measured | Built, shipped, measured, with telemetry / CI / tests |
| 5 | Industry-leading | Built, shipped, measured, externally validated, ahead of common practice |

### Maximal enterprise overlay

DSAF's 0-5 criteria remain the canonical audit score. For strict "push it as far as possible" audits, a reviewer may enable the maximal enterprise overlay in [`docs/bench/maximal-enterprise-benchmark.md`](bench/maximal-enterprise-benchmark.md).

The overlay adds one unified criterion table:

| Row type | Measures | Perfect means |
|---|---|---|
| `AUTO` | Requirements that can be proven by source doctrine, packages, docs, scripts, generated files, examples, tokens, reports, dashboards, public pages, and verification commands. | Real evidence exists, regenerates when needed, verifies, and matches the doctrine. |
| `MANUAL` | Requirements that need human proof: manual AT, counsel review, independent audit, production telemetry review, customer research, designer workflow review, or accountable sign-off. | Human-only evidence is attached before audited claims are made. |

The overlay does not create a new DSAF level. A target can be L5 and still have AUTO or MANUAL gaps because a required artifact is missing, stale, nonconforming, or not yet human-reviewed.

When enabled, Step 4 of the maximal loop is: implement approved improvements in both source doctrine and real artifacts, then trigger artifact re-creation. A missing generator is a blocker, not a pass.

### FIXED vs DYNAMIC

Every criterion is tagged one or the other:

- **FIXED** — the rubric is anchored against an objective state of the world (does the token file exist? does the SC pass? does the API have semver discipline?). FIXED regressions always require an override or rollback under the no-silent-regression rule.
- **DYNAMIC** — the rubric is anchored against an evolving industry standard (WCAG version, DTCG schema version, MCP spec). DYNAMIC criteria are rescored quarterly even when nothing in the system changes, because the world moves.

### Confidence

Every score has a confidence rating:

- **Hi** — 2+ direct citations, all verifiable.
- **Med** — 1 citation, or evidence inferred from doctrine without artefact backup.
- **Lo** — assumption with no citation. **Lo confidence triggers a pause for human review.**

If more than 25% of criteria would score `Lo`, the agent refuses to run the audit and reports what's missing.

### Roll-up math

Combined score is the weighted average of category scores. Category scores are the unweighted average of criterion scores within the category. Weights live in [`docs/03-criteria-part-a.md`](./03-criteria-part-a.md) and [`docs/04-criteria-part-b.md`](./04-criteria-part-b.md). Part A and Part B are weighted equally (0.5 each) when combining.

```
combined% = (part_a% + part_b%) / 2
part_X%   = Σ (category_weight × category%)
category% = (Σ criterion_score / (5 × n_criteria)) × 100
```

### Enterprise-grade thresholds

A system is **enterprise-grade** if it passes every threshold below. These are floors; above them you keep climbing.

| Requirement | Floor |
|---|---|
| Combined score | ≥ 65% |
| A.8 Accessibility | ≥ 75% |
| B.5 Accessibility & Inclusive | ≥ 75% |
| A.1 Foundations & Tokens | ≥ 70% |
| A.4 Governance | ≥ 60% |
| A.3 Documentation | ≥ 65% |
| Any single category | ≥ 40% |

A system can score 90% combined and still fail enterprise-grade if A.8 is at 73%. DSAF reports both numbers.

---

## §6 Output schema — single file

The audit produces one file: `audit-report-{YYYY-MM-DD}.md`. The full template is at [`templates/audit-report-template.md`](../templates/audit-report-template.md). Sections are stable in order:

| Section | Purpose | Owner |
|---|---|---|
| YAML frontmatter | machine-readable metadata: `audit_id`, `mode`, `status`, `pre_audit_score`, `post_audit_score`, `delta_pp`, `parent_audit`, `no_silent_regression` | `@Agent` |
| §0 Snapshot | one-glance summary | `@Agent` |
| §1 SCAN — Baseline | re-score 125 criteria | `@Agent[research]` |
| §2 SCAN — Industry research | new / updated standards | `@Agent[research]` |
| §3 SCAN — Findings | gaps + routing | `@Agent`/`@Human` |
| §4 SCAN — Sign-off ⏸ | approve / reject / defer | `@Human[approve]` |
| §5 FIX — Plan | sequence + revert paths | `@Agent[fix]` |
| §6 FIX — Execution | per-step result | `@Agent[fix]` |
| §7 FIX — Verification | check scripts + no-silent-regression gate | `@Agent[fix]` |
| §8 RE_AUDIT — Final score | post-fix scores + delta | `@Agent[research]` |
| §9 SIGN-OFF | human approval, register row | `@Human[approve]` |
| §10 Criteria scores | full 125-row table | `@Agent` |
| §11 Research findings | machine-readable industry log | `@Agent` |
| §12 Open questions | carry-over to next audit | `@Agent` |
| §13 Glossary | terms frozen for this audit | `@Agent` |

Sections 10 and 11 are machine-readable: agents parse them directly to compute deltas across audits.

---

## §7 Hard rules (the DSAF invariants)

These cannot be relaxed by an agent. DSAF refuses any audit that violates them.

1. **Never fabricate scores.** Every score is justified by a quote or line-ref, or it is `null + Lo confidence` and flagged for human review.
2. **Never average away missing data.** A criterion with no evidence is scored `0` with explicit "no evidence found", not "median of category".
3. **Never adjust scores upward to hit a threshold.** If a category scores 58%, the report says 58%. Not 65%.
4. **Never delete prior audits.** Audit history is append-only. Corrections become new dated rows.
5. **Always cite the doctrine, not training data.** External benchmarks ("Carbon ships 50+ components") need a verifiable URL or year, or they're marked `external benchmark — needs verification`.
6. **Always preserve calibration room.** A human Co-Auditor scores 5+ randomly-sampled criteria independently before signing. Differences ≥ 2 points trigger a discussion before the audit signs.
7. **Always pause between SCAN and FIX.** No exceptions.
8. **Always honour the no-silent-regression rule.** Surface regressions in §7 with cause and approver; the audit refuses to sign until each regression is overridden or rolled back.
9. **Never silently rewrite anchor immutables.** A system's brand anchors (slogan, primary colour, fonts, voice principles) are out-of-scope for any agent fix. They require an A2 RFC.

---

## §8 Refusal modes

The agent **must refuse to run** if any of the following hold:

1. The DSAF doctrine path cannot be confirmed.
2. The mapped doctrine parts are missing or empty.
3. The output file cannot be written.
4. The operator's instructions conflict with §7 (e.g., "score everything 4+").
5. Confidence on more than 25% of criteria would be `Lo`.

In a refusal, the agent emits the audit-report file with `status: REFUSED` and §3 populated with what's missing. No partial scores are written.

---

## §9 Calibration & validation

After the agent emits its `SCAN` output:

1. The operator runs a **spot-check sample**: 5+ criteria across Parts A and B, picked at random and re-scored independently. Findings appended to §4 of the audit report.
2. Differences ≥ 2 points between agent and human trigger a calibration discussion before any `FIX` cycle begins.
3. After `FIX` and `RE_AUDIT`, the audit signs when the human reviewer fills §9.
4. The signed audit appends a row to `_history.md` (date, mode, agent, operator, signer, scores).

Calibration may be *waived* for the very first audit baseline, when there is no prior data to compare against. Calibration is **not waivable** from the second audit onward.

---

## §10 Re-running on a refreshed system

When the design system ships a new release:

1. The audit is re-run in `SCAN` mode immediately after release.
2. DYNAMIC criteria where the rubric language has changed (per the DSAF annual review) are rescored against the new language.
3. Trend lines for FIXED criteria are produced (`_trends.md`, generated from `_history.md`).
4. The portable `DESIGN.md` rules-file (if used) is regenerated.

---

## §11 Customisation hooks

DSAF is opinionated; the criteria are not sacred. See [`09-customising.md`](./09-customising.md) for:

- Re-weighting categories for your industry.
- Adding criteria for vertical-specific concerns (HR Tech, Fintech, Healthcare, etc.).
- Encoding your brand's anchor immutables.
- Adding new check scripts.

The DSAF Criteria file is the source of truth. If your audit doesn't match the file, change the file and ship it as a fork.

---

*End of framework spec. Read [`05-running-an-audit.md`](./05-running-an-audit.md) next for the executable playbook.*
