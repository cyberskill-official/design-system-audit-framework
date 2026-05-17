# DSAF lite benchmark survey

**Status:** static survey spec.
**FR:** FR-BENCH-001.

## Purpose

The lite benchmark lets a team compare its DSAF-25 score to anonymous peers without collecting unnecessary personal data.

## Data contract

| Field | Type | Required | Notes |
|---|---|---|---|
| `dsaf_25_score` | number | yes | 0-100 |
| `team_size_band` | enum | yes | `1-5`, `6-20`, `21-100`, `100+` |
| `company_size_band` | enum | yes | `1-50`, `51-250`, `251-1000`, `1000+` |
| `industry` | enum | yes | broad, non-identifying |
| `region` | enum | yes | broad geography |
| `consent_to_anonymous_benchmark` | boolean | yes | must be true |
| `contact_email` | string | no | separate from benchmark dataset |

## Anonymisation contract

- Store benchmark rows without direct identifiers.
- Report only cohorts with at least five submissions.
- Keep contact emails in a separate table or file.
- Delete contact emails on request.
- Do not sell benchmark data.

## Static form outline

1. Score DSAF-25.
2. Pick company/team bands.
3. Pick industry and region.
4. Consent to anonymous aggregate use.
5. Optional email for results.

## Output

The response page shows:

- submitted DSAF-25 score
- cohort median if cohort size is five or more
- prompt to run the full DSAF Criteria

*End of lite benchmark survey spec.*
