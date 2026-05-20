# 06 — The FIX cycle in detail

The FIX cycle is the framework's stability guarantee. It is the only stage where the system is *modified*. Every safeguard the framework offers — no-silent-regression rule, override logging, optional rollback, atomic verification — lives in this cycle.

If you skip understanding this file, the worst case is that an agent applies a fix that breaks something the verification scripts didn't catch, and your `_history.md` register shows a regression in a future audit with no clear authorship trail. This file exists to prevent that.

---

## §1 The state machine, in detail

```
AWAITING_REVIEW  →  FIXING  →  VERIFYING  →  RE_AUDIT  →  SIGNED
       ↑                                         │
       └─── OVERRIDE or ROLLBACK on score drop ─┘
```

Five named states, each with a clear precondition and postcondition.

### `AWAITING_REVIEW`

**Precondition:** SCAN cycle has populated §1 (baseline), §2 (research), §3 (findings). Frontmatter `mode: SCAN`.

**Owner:** `@Human[approve]`. The agent is paused.

**Postcondition for transition to `FIXING`:** §4 contains a populated `approvals:` block, with each finding row marked `approve` / `reject` / `defer`. Frontmatter is updated to `mode: FIX`, `status: FIXING`.

If you transition without §4 being populated, the agent **refuses** and reverts the status back. This is a hard rule.

### `FIXING`

**Precondition:** `status: FIXING`, §4 has approvals.

**Owner:** `@Agent[fix]`.

**What happens:** the agent reads §4 approvals, plans the fix order in §5, and starts executing in §6. For each fix:

1. Files declared in the §5 plan row are modified.
2. The §6 row is updated with `status: DONE` (success), `BLOCKED` (failure), or `ROLLED_BACK` (failed verification).
3. After every fix, a partial verification runs (only the affected criterion's check scripts) — if it fails, the agent stops, marks the row `BLOCKED`, and routes to `@Human[decide]`.

The order matters: the agent applies `Rollback safe? = yes` rows first (low-risk batch), then the rest. This minimises blast radius if one fix triggers a cascade revert.

**Postcondition for transition to `VERIFYING`:** every approved §4 row has a corresponding §6 row with non-pending status. Frontmatter `status: VERIFYING`.

### `VERIFYING`

**Precondition:** `status: VERIFYING`. All fixes have been applied (or rolled back individually under partial verification).

**Owner:** `@Agent[fix]`.

**What happens:** the full verification suite runs:

1. Every `scripts/check-*.mjs` runs end-to-end.
2. Every criterion that any fix touched is **re-scored** from current evidence. (Not just the ones the fix targeted — every criterion that maps to any modified file.)
3. The re-scored values are compared against pre-audit scores in the frontmatter `pre_audit_score` block.
4. **No-silent-regression gate** — if any criterion sits below its pre-audit score, the agent writes a §7 `override_log` draft with criterion, pre-score, post-score, delta, suspected cause, and tag. The audit pauses at `RE_AUDIT (awaiting override)` until `@Human[approve]` signs the override or chooses `@Human[rollback]`.

**Postcondition for transition to `RE_AUDIT`:** all check scripts pass and every regression is either tagged `D-RT`, overridden with approver notes, or rolled back.

### `RE_AUDIT`

**Precondition:** `status: RE_AUDIT`. Verification passed.

**Owner:** `@Agent[research]`.

**What happens:** the agent re-scores every criterion (not just the affected ones) using the §1 procedure, refreshes §10 in full, recomputes category roll-ups + Part A% / Part B% / combined%, and updates the frontmatter `post_audit_score` block.

If `post_audit_score.combined < pre_audit_score.combined`, the agent records a batch-level regression in §7.
The human reviewer chooses whether to approve the trade-off with notes or roll back the batch.

This is the second backstop. Even if individual criterion scores look reasonable, a perverse interaction between fixes can lower the combined score. The whole-batch check catches this and makes the decision explicit.

**Postcondition for transition to `SIGNED`:** §8 final score block is populated; any combined-score decrease has a batch-level override in §7 or has been rolled back.

### `SIGNED`

**Precondition:** `status: SIGNED` — set only by `@Human[approve]` after filling §9.

**Owner:** `@Human[approve]`.

**What happens:** the human reviewer reads §6 (what was applied), §7 (verification), §8 (final delta) and fills the §9 sign-off block:

```yaml
signed_by: <name>
signed_at: YYYY-MM-DDTHH:MM
final_combined_score: <from §8>
register_row_added: true
notes: |
  <one paragraph: what landed, what didn't, calibration notes if any>
```

The reviewer also appends a row to `_history.md` with the same scores from §0 Snapshot. Without this row, trend analysis is broken in the next cycle.

---

## §2 No-silent-regression rule — full specification

The single most important guarantee the framework makes.

### What it means

After a FIX cycle signs (status: SIGNED), every score drop is visible in §7 and §10. There are no silent regressions.

### Why it's hard to enforce

Without explicit support, an LLM agent applying multiple fixes can produce silent regressions: criterion A lifts +2, criterion B drops -1 because of a side effect, and the combined score still rises. Six months later, in the next audit, you spot criterion B has dropped and have no way to attribute it to the fix that caused it.

The framework prevents this with three layers:

1. **Per-fix partial verification** — after each fix in §6, the affected criterion's check scripts run. If they fail, the row is `BLOCKED` immediately, before the cycle moves on.
2. **Whole-cycle regression gate** — at `VERIFYING`, affected criteria are rescored. Any drop creates an override-log row or a rollback decision.
3. **Whole-cycle combined gate** — at `RE_AUDIT`, even if individual scores held, the combined % is checked. A combined drop becomes a batch-level override or rollback.

### What's *not* gated

**DYNAMIC** criteria can regress without an approver only if the rubric tightened. The framework tags those rows `D-RT`, cites the external change, and keeps the audit trail intact.

**Calibration drift** — if a human Co-Auditor scores a criterion 1 point lower than the agent did in the prior audit, that's a calibration delta, not a regression. The framework expects you to log it in §9 and continue.

### What to do if the gate keeps failing

1. **Reverse the order of reverts (LIFO).** If three fixes were applied in sequence A → B → C and verification fails, revert C first; if verification still fails, revert B; etc.
2. **Inspect the §6 log.** Look for fixes that touched files unrelated to their target criterion. Those are the most likely culprits.
3. **Full rollback.** If individual reverts don't help, roll back the batch using the declared revert commands and re-enter `AWAITING_REVIEW` with a "FIX plan was wrong" finding in §3.
4. **Plan smaller next time.** If the failed batch had > 5 fixes, split future batches into 2–3 smaller cycles.

---

## §3 Rollback paths — what each fix declares

Every approved finding row in §5 must declare a revert command. Examples:

| Fix shape | Revert command |
|---|---|
| Single-file edit | `git checkout HEAD~1 -- <path>` |
| Multi-file rename | `git revert <commit-SHA>` |
| Token JSON change | `git checkout HEAD~1 -- tokens/<file>.tokens.json` |
| CI workflow tweak | `git checkout HEAD~1 -- .github/workflows/ci.yml` |
| Adding a new file | `rm <path>` |
| Doc patch | `git checkout HEAD~1 -- docs/<part>.md` |

If a fix can't be reverted with one command, **the fix is too big for one row**. Split it.

For more complex changes (e.g., schema migrations), the row should declare `Rollback safe? = no` and the agent must obtain explicit `@Human[approve]` for that specific row before executing. Conservative default: a row marked `Rollback safe? = no` cannot pass the §4 approval block automatically; it requires inline operator confirmation.

---

## §4 Stop-states the agent should reach

If any of the following occur, the agent **stops** and waits for human input:

| Trigger | What the agent does |
|---|---|
| §4 `approvals:` block is empty | Refuse with status `AWAITING_REVIEW` |
| A `BLOCKED` row in §6 | Pause; route to `@Human[decide]` |
| No-silent-regression gate finds an unresolved drop | Set `status: RE_AUDIT (awaiting override)`; surface the override-log draft |
| Combined score drops in §8 | Record batch-level regression; human approves override or rolls back |
| > 25% of re-scored criteria would be `Lo` confidence | Refuse to update §10; emit a calibration alert |

The framework prefers a paused audit to a silently broken system. Stops are not failures — they are the framework working as designed.

---

## §5 What the human owns

In FIX cycle the human owns three gates:

1. **§4 — approval gate.** Before any fix runs.
2. **`Rollback safe? = no` rows.** Per-row inline confirmation, even for `@Agent[fix]` rows that meet that condition.
3. **§9 — final sign-off.** After post-fix scores are computed.

The human does **not** own:

- Writing the §5 plan (agent's job).
- Executing fixes (agent's job).
- Running verification (agent's job).
- Re-scoring (agent's job).

If you find yourself manually re-scoring criteria, the framework is not being used correctly. Re-scoring is mechanical work the agent should do. You're there for calibration and judgment, not execution.

---

## §6 Resuming an interrupted FIX cycle

If the cycle stops mid-flight (network drops, context limit, manual halt):

1. Read the audit report's frontmatter `status` field.
2. Find the most recent §6 row with `status: PENDING` or `IN_PROGRESS`.
3. Resume the agent prompt and tell it to continue from that row.
4. If a `BLOCKED` row exists, resolve it (`@Human[decide]`) before continuing.

The audit report is its own state. Anyone — human or agent — can pick it up where it left off, by reading the frontmatter and §6.

---

## §7 What this cycle never does

Things outside the FIX cycle's authority — they require their own audit cycle (or a different framework):

- **Ship a new component.** That's a doctrine RFC + an implementation PR; not a FIX cycle.
- **Onboard a new locale.** That's a Phase plan item (per [`08-improvement-plan.md`](./08-improvement-plan.md)); not a FIX cycle.
- **Rewrite the brand voice.** That's an A2 RFC against the system's anchor immutables; not any kind of agent action.
- **Change a category weight.** That's a framework-level RFC against [`03-criteria-part-a.md`](./03-criteria-part-a.md) or [`04-criteria-part-b.md`](./04-criteria-part-b.md); proposed via the framework's own RFC flow, not via your local FIX cycle.

---

*Continue to [`07-maturity-tiers.md`](./07-maturity-tiers.md) for what each L0–L5 tier means and the enterprise-grade thresholds.*
