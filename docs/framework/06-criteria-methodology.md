# DSAF criterion aliases

**Status:** normative; ratified by TASK-CORE-003. **task:** TASK-CORE-003.

The first dedup pass stabilised criterion IDs before launch. The live rubric now contains exactly 125 criteria. Merged-away IDs remain permanent aliases and are never reused.

## Aliases

| Merged-away ID | Primary ID | Merged date | Rationale |
|---|---|---:|---|
| A10.4 | A10.3 | 2026-05-18 | AI-assisted contribution review is the enforceable use of the agent rules file |
| A10.6 | A10.1 | 2026-05-18 | Structured docs endpoints are part of the MCP server contract |
| B3.5 | B3.1 | 2026-05-18 | Loading and skeleton states are the main visibility-of-status evidence |
| B7.2 | B3.1 | 2026-05-18 | Nielsen H1 duplicates the visibility-of-status interaction criterion |
| B7.3 | B2.1 | 2026-05-18 | Nielsen H2 duplicates the real-world mental-model IA criterion |
| B7.4 | B3.6 | 2026-05-18 | Nielsen H3 duplicates the user-control interaction criterion |
| B7.5 | B2.2 | 2026-05-18 | Nielsen H4 duplicates navigation consistency and platform standards |
| B7.6 | B3.3 | 2026-05-18 | Nielsen H5 duplicates error prevention and recovery |
| B7.7 | B2.3 | 2026-05-18 | Nielsen H6 duplicates findability and recognition-over-recall evidence |
| B7.8 | B3.6 | 2026-05-18 | Nielsen H7 is measured with user control, shortcuts, and efficiency affordances |
| B7.9 | B4.2 | 2026-05-18 | Nielsen H8 duplicates aesthetic and minimalist visual design |
| B7.10 | B3.3 | 2026-05-18 | Nielsen H9 duplicates error diagnosis and recovery evidence |
| B7.12 | B7.1 | 2026-05-18 | Shneiderman coverage is tracked by the heuristic evaluation cadence criterion |

## Interpretation rule

Tools reading older audits must resolve any future alias through this table before comparing score rows. Alias IDs are never reused.

## Boundary decisions

| Candidate overlap | Decision | Rationale |
|---|---|---|
| A10 AI-rules, AI review, and MCP docs endpoints | merge | Agent-review checks belong in the rules-file criterion; docs endpoints belong in the MCP server criterion |
| B3 loading states and B7/B3 visibility rows | merge | Same evidence: timely status feedback, skeletons, and async progress |
| B7 individual Nielsen rows vs IA/interaction/visual rows | merge | The individual heuristic evidence had become duplicate scoring; B7 now audits the review cadence and coverage map |
| A8 Accessibility vs B5 Accessibility & Inclusive | keep distinct | System-side accessibility and UX-side inclusive outcomes are separate gates |
| A3 Documentation vs B6 Content Design | keep distinct | Component documentation and product voice/microcopy are separately measurable |
| A7 Adoption metrics vs B10 UX metrics | keep distinct | System adoption and product outcome measurement use different evidence |
| A1 Tokens vs A8 accessibility tokens | clarify | A1 covers token architecture; A8 covers accessibility guarantees that use tokens |

*End of criterion aliases.*


# DSAF criteria dedup methodology

**Status:** normative. **task:** TASK-CORE-003.

## Purpose

The DSAF Criteria must stay citeable. Dedup passes consolidate true duplicates without renumbering surviving IDs. When an ID is merged away, it becomes an alias in [`criteria-aliases.md`](./criteria-aliases.md).

## When to run

- Before any major version release.
- After five or more criterion-changing RFCs land.
- When an external reviewer flags a substantive overlap.

## Method

1. Inventory every criterion with ID, category, tag, and 0/3/5 anchors.
2. Compare pairs within the same Part only.
3. Mark a pair as candidate overlap when at least three signals match: wording overlap, anchor overlap, same category, known ambiguous category pair, same concept noun.
4. Decide one of `merge`, `keep-distinct`, or `clarify`.
5. Preserve the lower surviving ID on merges.
6. Do not merge FIXED with DYNAMIC.
7. Do not merge across Part A and Part B.
8. Do not leave any category empty.
9. Update DSAF-25 if any Core source ID becomes an alias.
10. Record all decisions in the PR description.

## Initial 2026-05-18 pass

The initial implementation pass reduced the live rubric from 138 rows to 125 criteria. It merged two Part A AI/MCP overlaps and eleven Part B heuristic-overlap rows into primary criteria. The pass also identified recurring ambiguity zones and documented them in [`criteria-aliases.md`](./criteria-aliases.md) as boundary decisions.

This is the stable DSAF-125 baseline. The framework now has a populated alias table and deterministic method for future passes.

*End of dedup methodology.*
