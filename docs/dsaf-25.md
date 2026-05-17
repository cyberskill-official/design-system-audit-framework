---
title: "DSAF-25 Core"
status: normative
dsaf_125_version: "2026-05-17"
fr: FR-CORE-001
---

# DSAF-25 Core

DSAF-25 Core is the 25-row entry point to the full DSAF Criteria.
It is not DSAF Lite.
It is the share-handle: the one-page card you can read in five minutes, quote in a meeting, and use for a first-pass score before running the complete 125-criterion audit.

Every Core row maps to an existing DSAF criterion.
The 0-5 scale, confidence ratings, FIXED/DYNAMIC tags, and self-audit cap rule are the same as the full rubric.

## Scoring

```text
dsaf_25_score% = (sum of 25 criterion scores / 125) * 100
```

The score is reported beside the full DSAF combined score, never in place of it.
A team that has already scored the full 125 criteria can derive DSAF-25 by selecting these 25 rows.
A team that has only scored DSAF-25 has completed a first-pass audit, not a signed audit.

## Score anchors

| Score | Anchor | Meaning |
|---:|---|---|
| 0 | Absent | No evidence the system addresses this |
| 1 | Mentioned | Mentioned but not designed for |
| 2 | Defined | Designed but not built or enforced |
| 3 | Built | Built and shipped, not yet measured |
| 4 | Measured | Built, shipped, measured, with telemetry or CI |
| 5 | Industry-leading | Externally validated, ahead of common practice |

## The 25 criteria

| # | Source | Category | Criterion | Tag |
|---:|---|---|---|---|
| 1 | A1.1 | Foundations & Tokens | Color tokens with primitive to semantic to component layers | FIXED |
| 2 | A1.8 | Foundations & Tokens | Token format and DTCG conformance | DYNAMIC |
| 3 | A1.9 | Foundations & Tokens | Modern color spaces (OKLCH, P3) | DYNAMIC |
| 4 | A2.1 | Component Library | Coverage of Top 20 components | FIXED |
| 5 | A2.4 | Component Library | Variant and state coverage | FIXED |
| 6 | A3.1 | Documentation | Usage guidelines per component | FIXED |
| 7 | A4.2 | Governance & Versioning | RFC process | FIXED |
| 8 | A4.3 | Governance & Versioning | Semver discipline | FIXED |
| 9 | A5.4 | Tooling & Distribution | Storybook or equivalent | FIXED |
| 10 | A5.5 | Tooling & Distribution | CI/CD for the system itself | FIXED |
| 11 | A6.1 | Cross-platform & Theming | Light and dark mode parity | FIXED |
| 12 | A7.1 | Adoption & Metrics | Coverage percentage | FIXED |
| 13 | A8.1 | Accessibility Baked Into the System | Contrast guarantees | FIXED |
| 14 | A9.1 | Performance & Developer Experience | Bundle size budgets | FIXED |
| 15 | A10.3 | AI / Emerging Tech Integration | AI-rules file for agents | DYNAMIC |
| 16 | B1.1 | User Research & Discovery | Method diversity | FIXED |
| 17 | B2.1 | Information Architecture & Navigation | Match between system and real-world / user mental model | FIXED |
| 18 | B3.3 | Interaction Design | Error prevention and recovery | FIXED |
| 19 | B4.1 | Visual Design & Hierarchy | Visual hierarchy | FIXED |
| 20 | B5.2 | Accessibility & Inclusive Design | WCAG 2.2 Level AA conformance | FIXED |
| 21 | B6.1 | Content Design & UX Writing | Voice and tone documentation | FIXED |
| 22 | B7.1 | Usability & Heuristic Compliance | Heuristic evaluation cadence | FIXED |
| 23 | B8.1 | Performance & Core Web Vitals as UX | LCP at the 75th percentile | DYNAMIC |
| 24 | B9.1 | Trust, Privacy & Ethics | No-dark-pattern guarantee | FIXED |
| 25 | B10.1 | Measurement & UX Metrics | HEART framework adoption | FIXED |

## How to use

### 60-second self-score

Read each row and give it a fast 0, 3, or 5.
Use 1, 2, or 4 only when the evidence is clearly between anchors.
Sum the 25 scores and divide by 125.

### Five-minute read

Read the criterion names first.
Ignore rubric details until the second pass.
The card is meant to tell a DS lead where to look before the full audit begins.

### Meeting reference

Use [`assets/dsaf-25-card.svg`](../assets/dsaf-25-card.svg) or [`docs/dsaf-25-card.md`](dsaf-25-card.md) when you need a printable version.
The public copy lives at `https://audit.cyberskill.world/card`.

## Relationship to DSAF-125

| Aspect | DSAF-25 Core | Full DSAF Criteria |
|---|---|---|
| Criteria count | 25 | 125 |
| Reading time | about 5 minutes | about 60 minutes |
| Use case | first pass, public explanation, fast tooling | signed audit and certification-grade evidence |
| Score field | `dsaf_25_score` | `combined` |
| Cap rule | same self-audit cap | same self-audit cap |

## Publication cap

Self-audits that cite DSAF-25 publicly follow the same cap as full audits:

- L3 maximum without third-party verification
- L4 maximum with third-party verification
- L5 maximum with verification plus the L5 entry-gate stack

See [`docs/branding/self-audit-policy.md`](branding/self-audit-policy.md).

*End of DSAF-25 Core.*
