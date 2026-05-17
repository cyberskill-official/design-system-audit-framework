# DSAF criterion aliases

**Status:** normative.
**FR:** FR-CORE-003.

The first dedup pass stabilised criterion IDs before launch.
No current DSAF-125 criterion was merged away in this pass.
The alias table is intentionally empty, but it is now the canonical surface for future merged-away IDs.

## Aliases

| Merged-away ID | Primary ID | Merged date | Rationale |
|---|---|---:|---|
| _none_ | _none_ | 2026-05-17 | Initial pass found clarifications, not true same-evidence duplicates |

## Interpretation rule

Tools reading older audits must resolve any future alias through this table before comparing score rows.
Alias IDs are never reused.

## Boundary decisions

| Candidate overlap | Decision | Rationale |
|---|---|---|
| A8 Accessibility vs B5 Accessibility & Inclusive | keep distinct | System-side accessibility and UX-side inclusive outcomes are separate gates |
| A3 Documentation vs B6 Content Design | keep distinct | Component documentation and product voice/microcopy are separately measurable |
| A7 Adoption metrics vs B10 UX metrics | keep distinct | System adoption and product outcome measurement use different evidence |
| A1 Tokens vs A8 accessibility tokens | clarify | A1 covers token architecture; A8 covers accessibility guarantees that use tokens |

*End of criterion aliases.*
