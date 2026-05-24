# DSAF criteria dedup methodology

**Status:** normative.
**FR:** FR-CORE-003.

## Purpose

The DSAF Criteria must stay citeable.
Dedup passes consolidate true duplicates without renumbering surviving IDs.
When an ID is merged away, it becomes an alias in [`criteria-aliases.md`](./criteria-aliases.md).

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

The initial implementation pass reduced the live rubric from 138 rows to 125 criteria.
It merged two Part A AI/MCP overlaps and eleven Part B heuristic-overlap rows into primary criteria.
The pass also identified recurring ambiguity zones and documented them in [`criteria-aliases.md`](./criteria-aliases.md) as boundary decisions.

This is the stable DSAF-125 baseline.
The framework now has a populated alias table and deterministic method for future passes.

*End of dedup methodology.*
