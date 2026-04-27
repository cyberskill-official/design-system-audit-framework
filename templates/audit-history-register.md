# Audit History Register

> Running log of every audit run against this design system. Append a row whenever an audit is signed (per the framework's `02-framework.md` §9). Do not delete rows; corrections are added as new dated rows.

| Date | Mode | Agent | Operator | Signer | Part A % | Part B % | Combined % | Tier | Enterprise-grade | Report |
|---|---|---|---|---|---|---|---|---|---|---|
| YYYY-MM-DD | S \| P | <model-id> | <name> | <name> | xx.x% | xx.x% | **xx.x%** | Lx | ✅ \| ❌ | [audit-report-YYYY-MM-DD.md](./audit-report-YYYY-MM-DD.md) |

---

## Phase milestones (between audits)

Doctrine-evolution checkpoints between formal audit cycles. Logged here so trend analysis can attribute score moves to the work that landed.

| Date | Phase | Milestone | Key deliverables | Expected lift on next audit |
|---|---|---|---|---|
| YYYY-MM-DD | <phase-name> | <one-line> | <comma-separated list> | <+x pp combined> |

---

## Cadence reminders (pre-fill ahead)

| Reminder | When | What to do |
|---|---|---|
| Quarterly DYNAMIC re-score | Q1 / Q3 of each year | Re-rate all DYNAMIC criteria + ¼ of FIXED. Update §6 / §7 rubric language if anything shifted. |
| Annual full audit | Each anniversary of the framework's adoption | Run Mode S audit end-to-end. Compare to baseline. Append a row above. Pair with a human Co-Auditor (calibration discipline). |
| Annual practitioner survey | Q1 of each year | Distribute the practitioner survey template; compile results; feed into B.10. |

---

## Trend signals to watch

When ≥ 2 audits exist, the columns below are computed from this register and surfaced in `_trends.md`:

- **FIXED-criterion regression** — any FIXED criterion whose score dropped between audits is an alarm per the framework's no-downgrade rule.
- **DYNAMIC-criterion drift** — DYNAMIC criteria whose score dropped because the rubric tightened (not the system regressed) are noted but not alarmed.
- **Enterprise-grade transitions** — first audit to pass / fail any threshold is flagged.
- **Open-question lifespan** — open questions still unresolved across two audits trigger founder escalation.

---

## How to append a row

1. The Lead Auditor signs the audit report's §9 sign-off block.
2. They add a single row to the table above, using the same metric values from the report's §0 Snapshot.
3. Roadmap follow-ups go to the relevant audit folder, not into this file.
4. Commit the change in the same PR that closes the audit cycle.
