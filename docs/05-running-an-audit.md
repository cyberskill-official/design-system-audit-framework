# 05 — Running an audit

Step-by-step playbook for running a complete audit cycle on a design system. Both modes (`SCAN` and `FIX`) are covered. Read [`02-framework.md`](./02-framework.md) first if you haven't.

---

## Pre-flight

Before invoking the agent:

1. **Pick a mode + scope.** Self-audit (`Mode S`) reads the doctrine. Live-product audit (`Mode P`) reads a target product's repo.
2. **Pick the date.** Use ISO 8601 — the audit file will be `audit-report-{YYYY-MM-DD}.md`.
3. **Confirm prerequisites:**
   - The framework folder is accessible (you can read this file).
   - The target design system folder is accessible (the agent can read its docs / tokens / source).
   - The previous audit report (if any) is accessible (used for delta + no-downgrade gate).
   - The output folder exists and is writable.
4. **Pick a Co-Auditor.** A human who will independently re-score 5+ random criteria. Calibration may be waived for the very first audit; from the second onward it's not waivable.

## Step 1 — Initialise the audit folder

From any directory:

```bash
node /path/to/design-system-audit-framework/scripts/audit-init.mjs /path/to/your/design-system
```

This creates (idempotently — never overwrites existing files):

- `_audit/audit-report-{today}.md` — populated from the framework template, with `audit_id` set to today's date and `status: BASELINE`.
- `_audit/improvement-plan.md` — empty plan template, ready for the post-audit step.
- `_audit/_history.md` — empty history register (or kept as-is if it already exists).

**Convention note:** the scaffolder defaults to `_audit/` at the target's root. If your repo uses `docs/_audit/` instead, simply move the three files after init — the agent reads whichever location you point it at.

## Step 2 — Run SCAN mode

Open the SCAN-mode prompt (it's at [`prompts/scan-mode.md`](../prompts/scan-mode.md)) and paste it into your LLM. Provide these path variables:

```
<framework-path>      = /path/to/design-system-audit-framework
<design-system-path>  = /path/to/your/design-system
<previous-audit-path> = (path to the prior audit, or "(none — first audit)")
```

The agent will:

1. **Baseline** (§1) — read the doctrine + implementation, score each of the 125 criteria, cite evidence, set confidence per criterion.
2. **Industry research** (§2) — web-search for new / updated standards (WCAG 3.0, DTCG, APCA, MCP, …); decide adopt / note / defer per finding; populate §11.
3. **Findings** (§3) — enumerate every gap, route each to an actor, declare effort + rollback safety.

The agent **stops** at §4 with `status: AWAITING_REVIEW`. The draft audit report is on disk.

## Step 3 — Human review (the §4 pause)

You are now `@Human[approve]`. Read §1, §2, §3 of the draft report and:

1. **Spot-check 5+ criterion scores** (§9 calibration). Pick at random across Parts A and B. Score independently. If your score differs from the agent's by ≥ 2 points on any row, log a calibration note and resolve before continuing.
2. **For each finding in §3**, write one of these in the §4 `approvals:` block:
   - `approve` — agent will fix in the FIX cycle.
   - `defer` — out of scope this cycle (typically `@Human[manual]` items: deploys, vendor procurement, conferences).
   - `reject` — disagree; agent will not act and won't re-raise next cycle.
3. **Update the frontmatter:**
   ```yaml
   mode: FIX
   status: AWAITING_REVIEW  →  FIXING
   ```
4. **Commit.** This is the trigger: the agent picks up from §5 in the next invocation.

> **Don't skip the spot-check.** Calibration is the framework's only defense against an agent silently scoring everything 4 — a kind of failure that's hard to catch later.

## Step 4 — Run FIX mode

Open [`prompts/fix-mode.md`](../prompts/fix-mode.md) and paste it into your LLM. Same path variables.

The agent will:

1. **Plan** (§5) — sequence approved fixes, declare revert command per fix, run a dry-run if possible.
2. **Execute** (§6) — apply each fix; log per-step result.
3. **Verify** (§7) — run all `scripts/check-*.mjs`; re-score affected criteria; **enforce the no-downgrade gate** (any FIXED-criterion regression triggers automatic rollback of the offending fix).
4. **Re-audit** (§8) — refresh §10 with post-fix scores; recompute combined score; if combined decreased vs pre-audit, the entire FIX batch rolls back and `status` returns to `AWAITING_REVIEW`.

The agent **stops** at §9 with `status: RE_AUDIT`. The post-fix report is on disk.

## Step 5 — Sign-off (final human gate)

Read §6 (what was applied), §7 (verification results), §8 (final delta). If satisfied:

1. Fill the §9 `signed_by` block:
   ```yaml
   signed_by: <your name>
   signed_at: YYYY-MM-DDTHH:MM
   final_combined_score: <auto-filled from §8>
   register_row_added: true
   notes: |
     <one paragraph on what landed, what didn't, why>
   ```
2. **Append a row to `_history.md`** with the same scores from §0 Snapshot. The audit history is the trend register; it is append-only.
3. **Set frontmatter** `status: SIGNED`.
4. **Commit and tag.** Recommended: tag the commit with `audit/{YYYY-MM-DD}` so the audit run is recoverable from git history.

## Step 6 — Improvement plan (post-audit)

If you don't already have an `improvement-plan.md` for this audit cycle, run the planning prompt: [`prompts/improvement-plan.md`](../prompts/improvement-plan.md).

The plan converts §3 findings into a phased, step-by-step roadmap. No calendar dates — only "done when" conditions per step. See [`08-improvement-plan.md`](./08-improvement-plan.md) for plan structure.

## Step 7 — Operate the cadence

Between formal audits, the framework expects:

| Cadence | Activity | Reference |
|---|---|---|
| Quarterly (Q1, Q3) | DYNAMIC criterion re-score | [`02-framework.md`](./02-framework.md) §5 |
| Per release | Doc freshness check; DESIGN.md regen | `scripts/check-doc-freshness.mjs`, `scripts/build-design-md.mjs --check` |
| Annually | Full Mode S audit with human Co-Auditor calibration | This file, end-to-end |
| Ad-hoc | Industry research (between cycles) | [`prompts/research-mode.md`](../prompts/research-mode.md) |

Each appended audit row in `_history.md` is the single source of truth for "where the system is at". Plot deltas across rows to spot regressions.

---

## Common pitfalls

| Pitfall | What to do |
|---|---|
| Agent scores everything 4 | Calibration spot-check (§9) catches this. If you skip it, you'll find out in the next audit when the scores drop and you can't explain why. |
| `Lo` confidence on > 25% of criteria | Agent should refuse and emit `status: REFUSED`. If it doesn't, the inputs are wrong — the agent is hallucinating evidence. Stop and check the doctrine paths. |
| Verification keeps failing | Reverse the order of reverts (LIFO). If still failing, full rollback and re-enter `AWAITING_REVIEW` — the FIX plan was wrong. |
| You disagree with a score | Add a row to §3 with `@Human[decide]`, propose the corrected score with a citation, log the disagreement in calibration notes. Don't silently overwrite the agent's score. |
| Combined score went down | The framework rolled back the FIX batch. Read the regression note in §3, file a new finding, plan smaller fixes. |
| Audit takes too long | First audit is always slowest (4–8 hours for doctrine; 1–2 days with implementation). Subsequent audits are mostly DYNAMIC re-scores; budget 1–2 hours. If a cycle drags on, scope down: skip the FIX cycle and just SCAN this round. |

---

## Two minimum-viable workflows

### A. Fastest possible audit (1 hour, doctrine only)

1. `audit-init.mjs` against the doctrine folder.
2. Paste SCAN-mode prompt; agent reads docs only.
3. Skip industry research (`note: skipped` in §2).
4. Skip FIX cycle entirely (`mode: SCAN_COMPLETE`, defer all findings).
5. Sign off with calibration waived if first audit, otherwise log skip in §9 notes.
6. Append register row.

This is what to do for a first-time baseline; you can build on it next quarter.

### B. Full quarterly cycle (4–6 hours, end-to-end)

1. Spend 30 minutes on industry research first ([`prompts/research-mode.md`](../prompts/research-mode.md) standalone).
2. `audit-init.mjs`; paste SCAN-mode prompt; agent reads docs + implementation.
3. 30-minute human review at §4; spot-check 5 criteria; approve / defer findings.
4. Paste FIX-mode prompt; agent applies + verifies.
5. Sign off at §9; append register row.
6. Generate / update the improvement plan with the planning prompt.

This is what to do once per quarter. Annual full audits add a human Co-Auditor pairing per [`02-framework.md`](./02-framework.md) §9.

---

*Continue to [`06-fix-cycle.md`](./06-fix-cycle.md) for FIX-cycle internals, or [`07-maturity-tiers.md`](./07-maturity-tiers.md) for what each L0–L5 tier means.*
