---
title: "DSAF-25 Core"
status: normative
dsaf_125_version: "2026-05-17"
task: TASK-CORE-001
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
| 1 | A1.1 | Foundations & Tokens | Color tokens with primitive→semantic→component layers | FIXED |
| 2 | A1.8 | Foundations & Tokens | Token format & DTCG conformance | DYNAMIC |
| 3 | A1.9 | Foundations & Tokens | Modern color spaces (OKLCH, P3) | DYNAMIC |
| 4 | A2.1 | Component Library | Coverage of "Top 20" components (button, input, select, modal, table, nav, tabs, toast, tooltip, etc.) | FIXED |
| 5 | A2.4 | Component Library | Variant & state coverage | FIXED |
| 6 | A3.1 | Documentation | Usage guidelines per component | FIXED |
| 7 | A4.2 | Governance & Versioning | RFC process | FIXED |
| 8 | A4.3 | Governance & Versioning | Semver discipline | FIXED |
| 9 | A5.4 | Tooling & Distribution | Storybook (or equivalent) | FIXED |
| 10 | A5.5 | Tooling & Distribution | CI/CD for the system itself | FIXED |
| 11 | A6.1 | Cross-platform & Theming | Light / dark mode parity | FIXED |
| 12 | A7.1 | Adoption & Metrics | Coverage % (production UI built from system components) | FIXED |
| 13 | A8.1 | Accessibility Baked Into the System | Contrast guarantees (WCAG 2.2 AA: 4.5:1 text / 3:1 UI; APCA-W3 readiness) | FIXED |
| 14 | A9.1 | Performance & Developer Experience | Bundle size budgets | FIXED |
| 15 | A10.3 | AI / Emerging Tech Integration | AI-rules file for agents and contribution review | DYNAMIC |
| 16 | B1.1 | User Research & Discovery | Method diversity | FIXED |
| 17 | B2.1 | Information Architecture & Navigation | Match between system and real-world / user mental model (Nielsen H2) | FIXED |
| 18 | B3.3 | Interaction Design | Error prevention & recovery (Nielsen H5 + H9) | FIXED |
| 19 | B4.1 | Visual Design & Hierarchy | Visual hierarchy | FIXED |
| 20 | B5.2 | Accessibility & Inclusive Design | WCAG 2.2 Level AA conformance | FIXED |
| 21 | B6.1 | Content Design & UX Writing | Voice & tone documentation | FIXED |
| 22 | B7.1 | Usability & Heuristic Compliance | Heuristic evaluation cadence and coverage | FIXED |
| 23 | B8.1 | Performance & Core Web Vitals as UX | LCP at 75th percentile | DYNAMIC |
| 24 | B9.1 | Trust, Privacy & Ethics | No-dark-pattern guarantee (FTC's 4 categories: false belief, concealed info, unauthorised charges, manipulated privacy choices) | FIXED |
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

Use [`assets/dsaf-25-card.svg`](../framework/assets/dsaf-25-card.svg) or the [card representation](#dsaf-25-core-card-representation) below when you need a printable version.
The public copy lives at `https://audit.cyberskill.world/card`.

For per-category visualisation, feed category percentages into `docs/framework/assets/dsaf-radar-template.json` ([link](./assets/dsaf-radar-template.json)) and render them over `docs/framework/assets/dsaf-radar.svg` ([link](./assets/dsaf-radar.svg)). The radar keeps the 20 DSAF category axes visible and includes the enterprise-floor threshold overlay from the maturity model.

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

See [`internal/branding/self-audit-policy.md`](../internal/branding/self-audit-policy.md).

## DSAF-25 Core Card Representation

DSAF-25 Core is the shareable entry point for the full DSAF Criteria.

### Part A: System
- A1.1 Color tokens with primitive→semantic→component layers
- A1.8 Token format & DTCG conformance
- A1.9 Modern color spaces (OKLCH, P3)
- A2.1 Coverage of "Top 20" components (button, input, select, modal, table, nav, tabs, toast, tooltip, etc.)
- A2.4 Variant & state coverage
- A3.1 Usage guidelines per component
- A4.2 RFC process
- A4.3 Semver discipline
- A5.4 Storybook (or equivalent)
- A5.5 CI/CD for the system itself
- A6.1 Light / dark mode parity
- A7.1 Coverage % (production UI built from system components)
- A8.1 Contrast guarantees (WCAG 2.2 AA: 4.5:1 text / 3:1 UI; APCA-W3 readiness)
- A9.1 Bundle size budgets
- A10.3 AI-rules file for agents and contribution review

### Part B: UX
- B1.1 Method diversity
- B2.1 Match between system and real-world / user mental model (Nielsen H2)
- B3.3 Error prevention & recovery (Nielsen H5 + H9)
- B4.1 Visual hierarchy
- B5.2 WCAG 2.2 Level AA conformance
- B6.1 Voice & tone documentation
- B7.1 Heuristic evaluation cadence and coverage
- B8.1 LCP at 75th percentile
- B9.1 No-dark-pattern guarantee (FTC's 4 categories: false belief, concealed info, unauthorised charges, manipulated privacy choices)
- B10.1 HEART framework adoption

Use the full DSAF Criteria for signed audits.

*End of DSAF-25 Core.*


## §4 No-silent-regression rule
no_silent_regression, RE_AUDIT (awaiting override), @Human[rollback], Always honour the no-silent-regression rule.
