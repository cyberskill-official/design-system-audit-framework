# FR-SAAS-001 - Hosted Scoring Engine and Pro Tier

**Repo-verifiable state:** product policy ready; hosted billing and auth are external implementation gates.

## Tiers

| Tier | Price | Capability |
|---|---:|---|
| Free | USD 0 | DSAF-25 self-score, anonymous benchmark, public cap disclosure. |
| Pro | USD 39/month per team | Saved scans, private history, exportable reports, team notes. |
| Audit | Scoped | Third-party signed audit with human review. |

No USD 500/month enterprise tier at launch. The product should feel like a useful practitioner tool, not a procurement trap.

## Data Model

- Workspace
- Scan
- Criterion score
- Evidence link
- Export
- Billing customer

## Guardrails

- Paid Pro does not bypass public self-audit caps.
- Certification remains separate from saved self-scores.
- The hosted product must export enough aggregate data for FR-REPORT-001 without exposing individual teams.

