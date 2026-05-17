# Prompt: FIX-mode audit cycle

> Paste this prompt after a SCAN-mode audit has completed AND a human has approved findings in §4 of the report. The model will apply the approved fixes, surface any regressions, re-score, and submit for sign-off.

---

You are running a **FIX-mode design system audit cycle** using the Design System Audit Framework. A human has reviewed the SCAN output and approved a subset of findings for fixing. Your job: apply only the approved fixes, prove no regressions occurred, re-score affected criteria, and submit the report for human sign-off.

## What I'm giving you

- **The audit report from SCAN:** `<design-system-path>/_audit/audit-report-{date}.md` — already populated through §4 with `status: AWAITING_REVIEW` (or `FIXING` if you're resuming)
- **Framework rules:** `<framework-path>/docs/02-framework.md`
- **The design system being audited:** `<design-system-path>` — you may modify files here according to approved findings
- **Check scripts:** `<framework-path>/scripts/check-*.mjs` — used for the no-silent-regression verification gate

## What you produce

The same audit report file, with sections §5 through §9 populated. Frontmatter `mode: FIX`, `status` advancing through `FIXING → VERIFYING → RE_AUDIT → SIGNED`.

## Procedure

### Step 1 — Read approvals (§4)

Parse the `approvals:` block in §4. Only act on rows where the value is `approve`. Skip `defer`, `reject`, or `manual` rows. If §4 is empty or missing, **refuse**: this is a framework violation.

### Step 2 — Plan (§5)

For each approved finding:

1. Order: `Rollback safe? = yes` first (low-risk batch), then by criterion impact.
2. For each fix, declare:
   - Files touched (exact paths).
   - Revert command (`git checkout HEAD~1 -- <path>` or equivalent).
   - Estimated lift on the affected criterion (and on combined %).
3. Run a **dry-run** if the agent supports it: simulate the fix on a temporary branch, compute the affected criterion's neighbours, confirm none drop. Skip this step only if dry-run isn't feasible.

Populate §5 with the plan table.

### Step 3 — Execution (§6)

For each plan row:

1. Apply the fix as described.
2. Log the result in §6 with status `DONE` or `BLOCKED` (with reason).
3. A `BLOCKED` row pauses the cycle; route to `@Human[decide]` and stop.

Update the frontmatter: `status: VERIFYING` after the last successful row.

### Step 4 — Verification (§7)

Run all check scripts. Record pass/fail for each:

- `check-coverage.mjs` (token + component + story coverage)
- `check-bundle-size.mjs` (per-package budgets)
- `check-doc-freshness.mjs` (broken xrefs, stale parts)
- `check-apca.mjs` (color contrast)
- Any other check scripts the framework or system ships
- `build-design-md.mjs --check` (rules-file staleness)

Then re-score every criterion that any fix touched. Compare against pre-audit score (in frontmatter `pre_audit_score` block).

**No-silent-regression gate:** if any criterion sits below its pre-audit score:

1. Identify the likely cause from the §6 execution log.
2. Add a §7 `override_log` draft with criterion, pre-score, post-score, delta, cause, tag, and notes.
3. If the criterion is DYNAMIC and the cause is `rubric-tightened`, tag it `D-RT` and cite the external rubric change.
4. Otherwise set the tag to `UNRESOLVED`, set status to `RE_AUDIT (awaiting override)`, and pause for `@Human[approve]` or `@Human[rollback]`.

Do not auto-revert. Rollback is a human decision.

Populate §7 with the verification table.

### Step 5 — Re-audit (§8)

Refresh §10 with post-fix scores. Recompute category roll-ups, Part A %, Part B %, combined %, tier transition. Update frontmatter `post_audit_score` block.

If `combined` decreased vs `pre_audit_score.combined`, record a batch-level regression in §7. The human reviewer approves the trade-off or rolls back the batch.

If combined increased: populate §8 with the delta narrative ("biggest movers", "categories that changed", "tier transition if any").

### Step 6 — Sign-off block (§9)

Populate the `signed_by` block as a placeholder for the human signer:

```yaml
signed_by: <pending — human reviewer to fill>
signed_at: <pending>
final_combined_score: <auto-filled from §8>
register_row_added: false
notes: |
  FIX cycle complete. <N> findings applied; <M> regressions require override or rollback.
  Combined score: <pre>% → <post>% (Δ <delta> pp).
  Pending human review at §9.
```

Set `status: RE_AUDIT`. Stop. Print to the user:

> "FIX cycle complete. Combined `pre% → post% (Δ pp)`. Final review needed: read §6 (what was applied), §7 (verification), §8 (final score). Fill the `signed_by` block in §9 and append a row to `_history.md` to sign."

The human's sign-off advances `status: SIGNED`.

## Hard rules — never violate

1. Never act on findings that aren't `approve`d in §4.
2. Never bypass the no-silent-regression gate — it is the framework's stability guarantee.
3. Never modify a system's anchor immutables (slogan, primary brand colour, fonts).
4. Never fabricate verification results. If a check script fails, log it.
5. Never delete prior audit reports.
6. Never sign off on the audit yourself. §9 is human-only.
7. If a fix breaks something the verification gate doesn't catch, stop and route to `@Human[rollback]`. The framework prefers a paused audit to a silently broken system.

## What to do if something goes wrong

- **Revert command doesn't work** → halt, document the orphaned change in §3, route to `@Human[decide]`.
- **Check script doesn't exist** → run the others; flag the missing script as a finding for the next audit.
- **Verification gate keeps failing** → reverse the order of reverts (LIFO); if still failing, full rollback and re-enter `AWAITING_REVIEW`.
- **You're not sure whether a fix is safe** → don't apply it. Add a finding row noting the uncertainty.

Begin.
