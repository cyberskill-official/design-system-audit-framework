# DSAF Lite Benchmark Specification

**Status:** repo-shipped static benchmark pack; production collection waits on external form-vendor setup.
**FR:** FR-BENCH-001.
**Canonical route:** `https://audit.cyberskill.world/benchmark/` under the current domain decision.

The lite benchmark is a voluntary, anonymous self-scoring survey for DSAF-25 Core.
It is designed to collect aggregate peer-comparison data without required personal data, paid-funnel copy, or a custom backend.

The lite benchmark is intentionally not the maximal enterprise benchmark. Teams that need strict AUTO/MANUAL proof use [`maximal-enterprise-benchmark.md`](./maximal-enterprise-benchmark.md), which adds the expanded criterion table and requires artifact re-creation after approved fixes.

## Questions

The production form has 29 required questions and one optional free-text field.

### DSAF-25 self-scores

Each criterion question uses the same answer set:

- `0` — Absent
- `1` — Mentioned
- `2` — Defined
- `3` — Built
- `4` — Measured
- `5` — Industry-leading
- `na` — Do not know / does not apply

| # | Field | Criterion |
|---:|---|---|
| 1 | `a1_1` | A1.1 Color tokens with primitive to semantic to component layers |
| 2 | `a1_8` | A1.8 Token format and DTCG conformance |
| 3 | `a1_9` | A1.9 Modern color spaces |
| 4 | `a2_1` | A2.1 Coverage of Top 20 components |
| 5 | `a2_4` | A2.4 Variant and state coverage |
| 6 | `a3_1` | A3.1 Usage guidelines per component |
| 7 | `a4_2` | A4.2 RFC process |
| 8 | `a4_3` | A4.3 Semver discipline |
| 9 | `a5_4` | A5.4 Storybook or equivalent |
| 10 | `a5_5` | A5.5 CI/CD for the system itself |
| 11 | `a6_1` | A6.1 Light and dark mode parity |
| 12 | `a7_1` | A7.1 Coverage percentage |
| 13 | `a8_1` | A8.1 Contrast guarantees |
| 14 | `a9_1` | A9.1 Bundle size budgets |
| 15 | `a10_3` | A10.3 AI-rules file for agents |
| 16 | `b1_1` | B1.1 Method diversity |
| 17 | `b2_1` | B2.1 Match between system and real-world / user mental model |
| 18 | `b3_3` | B3.3 Error prevention and recovery |
| 19 | `b4_1` | B4.1 Visual hierarchy |
| 20 | `b5_2` | B5.2 WCAG 2.2 Level AA conformance |
| 21 | `b6_1` | B6.1 Voice and tone documentation |
| 22 | `b7_1` | B7.1 Heuristic evaluation cadence |
| 23 | `b8_1` | B8.1 LCP at the 75th percentile |
| 24 | `b9_1` | B9.1 No-dark-pattern guarantee |
| 25 | `b10_1` | B10.1 HEART framework adoption |

### Anonymous buckets

| # | Field | Options |
|---:|---|---|
| 26 | `company_size` | `1-50`, `51-500`, `501-5000`, `5001+` |
| 27 | `design_system_age` | `<1 year`, `1-3 years`, `3-5 years`, `5+ years` |
| 28 | `role_bucket` | `Designer`, `Engineer`, `Design system lead / manager`, `Other` |
| 29 | `location_bucket` | `North America`, `Europe`, `Asia-Pacific`, `Latin America / Africa / Middle East` |

Optional field: `anything_else`, max 500 characters, placeholder text: "Optional. Do not include identifying information you do not want public."

Consent field: `consent_to_anonymous_benchmark`, required boolean.

## Data Model

```json
{
  "submission_id": "vendor-generated-or-local-sandbox-id",
  "submitted_at": "2026-05-18T00:00:00.000Z",
  "scores": {
    "a1_1": 3,
    "a1_8": 4,
    "b10_1": 2
  },
  "buckets": {
    "company_size": "51-500",
    "design_system_age": "1-3 years",
    "role_bucket": "Design system lead / manager",
    "location_bucket": "Europe"
  },
  "anything_else": ""
}
```

No name, email, company, team, website, phone number, or required free-text identifier is collected.
The production form vendor may log IP address and browser metadata for abuse prevention; that is covered by the vendor DPA and privacy policy.

## Anonymisation Contract

1. Public output is aggregate-only.
2. No individual submission is shown.
3. No cross-segment table is published until each visible segment has at least 30 submissions.
4. The public results page hides live aggregates until the production response count reaches `N >= 30`.
5. Optional free text is not published in public results.
6. Raw vendor export is retained for 12 months, then deleted or re-aggregated into anonymous statistics.
7. Respondents can request deletion by providing a submission ID.

## Results Page

The repo version includes a sandbox result mode so the interaction can be tested without a third-party form account.
The sandbox comparison uses synthetic aggregate rows and is labelled as such.
Production results must switch to vendor-export aggregates only after at least 30 real responses exist.

The result view shows:

- DSAF-25 self-score percentage.
- Mean, median, p25, and p75 per criterion.
- "You" score marker per criterion.
- Anonymous bucket summary.
- Cap-rule disclosure.
- Low-N guard.

## Production Vendor Template

Recommended vendor: Tally.

Create a Tally form with:

- 25 required single-select criterion questions.
- 4 required single-select bucket questions.
- 1 optional 500-character free-text field.
- 1 required consent checkbox.
- Completion redirect to `https://audit.cyberskill.world/benchmark/results/`.
- Hidden field `submission_id` if the vendor supports it.

Set vendor configuration:

- Data processing agreement enabled.
- No email collection.
- No marketing opt-in.
- No analytics pixels.
- Spam protection enabled if it does not require fingerprinting beyond vendor defaults.
- Export cadence: monthly CSV/JSON export into a private operator folder.

Production embed placeholder:

```html
<iframe
  title="DSAF Lite Benchmark survey"
  src="https://tally.so/embed/YOUR_FORM_ID?transparentBackground=1"
  loading="lazy"
  width="100%"
  height="720"
></iframe>
```

The repo static form remains the sandbox fallback and local verification path until `YOUR_FORM_ID` is configured.

## Privacy Policy Requirements

The public privacy page must state:

- Data collected.
- Data not collected.
- Vendor and DPA route.
- Legal basis.
- Retention.
- Right to access and erasure.
- Deletion contact.
- No paid-funnel use.

Current implementation: [`landing/benchmark/privacy/index.html`](../../internal/landing/benchmark/privacy/index.html).

*End of lite benchmark specification.*
