# DSAF lite benchmark survey

**Status:** superseded summary; canonical spec is [`docs/bench/lite-benchmark-spec.md`](../bench/lite-benchmark-spec.md).
**FR:** FR-BENCH-001.

## Purpose

The lite benchmark lets a team compare its DSAF-25 score to anonymous peers without collecting unnecessary personal data.
The shipped implementation lives at [`landing/benchmark/index.html`](../../landing/benchmark/index.html).

## Data contract

| Field | Type | Required | Notes |
|---|---|---|---|
| `a1_1` ... `b10_1` | enum | yes | 25 DSAF-25 criterion scores, each 0-5 or `na` |
| `company_size` | enum | yes | `1-50`, `51-500`, `501-5000`, `5001+` |
| `design_system_age` | enum | yes | `<1 year`, `1-3 years`, `3-5 years`, `5+ years` |
| `role_bucket` | enum | yes | broad, non-identifying role bucket |
| `location_bucket` | enum | yes | broad geography |
| `consent_to_anonymous_benchmark` | boolean | yes | must be true |
| `anything_else` | string | no | optional; warning says not to include identifying information |

## Anonymisation contract

- Store benchmark rows without direct identifiers.
- Report only cohorts with at least 30 submissions.
- Do not collect contact emails in the benchmark dataset.
- Delete a production submission on request when the respondent provides the submission ID.
- Do not sell benchmark data.

## Static form outline

1. Score DSAF-25.
2. Pick anonymous company-size, design-system-age, role, and location buckets.
3. Confirm anonymous aggregate-use consent.
4. Optional free text with an identifying-info warning.

## Output

The response page shows:

- submitted DSAF-25 score
- sandbox peer comparison for local verification
- production low-N guard until at least 30 real responses exist

*End of lite benchmark survey spec.*
