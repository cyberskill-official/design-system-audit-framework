# DSAF no-silent-regression policy

**Status:** normative. **task:** TASK-CORE-002.

## Rule

Regressions are allowed only when they are visible, attributed, and signed. When a criterion's post-audit score is lower than its pre-audit score, the audit records the drop in §7 Verification and tags the §10 Criteria row. The audit cannot be signed while any regression is unresolved.

## Cause categories

| Cause | Tag | Applies to | Meaning |
|---|---|---|---|
| `rubric-tightened` | `D-RT` | DYNAMIC only | The external standard moved |
| `fix-side-effect` | `OVRD-FSE` | FIXED or DYNAMIC | A separate fix caused the drop |
| `external-dependency-change` | `OVRD-EDC` | FIXED or DYNAMIC | A vendor, browser, or platform changed |
| `deliberate-policy-tradeoff` | `OVRD-DPT` | FIXED or DYNAMIC | The team consciously accepted the regression |
| unresolved | `UNRESOLVED` | any | Regression surfaced, no valid approval yet |

`rubric-tightened` is the only no-approver path and only for DYNAMIC criteria. FIXED criteria always require an explicit override or rollback.

## Override log shape

| Criterion | Pre | Post | Delta | Cause | Approver | Date | Tag | Notes |
|---|---:|---:|---:|---|---|---|---|---|
| `A8.6` | 5 | 4 | 1 | `rubric-tightened` | `null` | 2026-05-17 | `D-RT` | WCAG reference changed; cited in §11 |
| `A9.1` | 4 | 3 | 1 | `deliberate-policy-tradeoff` | `<name>` | 2026-05-17 | `OVRD-DPT` | Bundle floor accepted for new measurement script |

## Human gate

The approver must write the notes paragraph. The notes explain why the team accepted the drop and whether a follow-up is planned. The agent may draft a suspected cause, but the human override is the signed record.

## Rollback remains available

Rollback is no longer automatic. The human reviewer may still choose `@Human[rollback]`, in which case the agent reverts the offending fix and re-runs verification.

## Backward compatibility

Older audits with `no_downgrade: true` remain valid under the rule they were signed with. New audits emit `no_silent_regression: true`, `regression_count`, and `override_count`.

*End of regression policy.*
