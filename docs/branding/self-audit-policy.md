# DSAF self-audit publication policy

**Status:** normative.
**FR:** FR-CORE-004.
**Scope:** every published self-audit citing a DSAF Level on an external-facing surface.

## The cap rule

| Condition | Maximum publicly cited DSAF Level |
|---|---|
| No third-party verification | **L3 (Managed)** |
| Third-party verification by a DSAF-certified verifier | **L4 (Managed advanced, verified)** |
| Third-party verification plus the L5 entry-gate stack | **L5 (Optimised, verified)** |

The cap applies to published and marketing-cited Levels.
It does not change the interior scores in an audit report.
Teams can self-score honestly across the full 0-5 scale internally; the cap governs what they cite outward.

## Why the cap exists

DSAF's credibility rests on the rubric being independently re-runnable.
An author or consultancy self-scoring at the top tier is unverifiable by definition.
The cap prevents an unverified top-tier claim from becoming the first thing readers remember.

## Combined-percentage ban

Published surfaces must not lead with a standalone combined-percentage score.
Acceptable public headlines are:

1. The capped DSAF Level, with the verification status stated.
2. A radar chart or category roll-up table that shows the shape of the result.

Combined percentages may appear inside audit data tables where they are calibration data, not marketing copy.

## Dual-bookkeeping ban

The cap is publication framing, not a second audit.
A team may not publish a private "real" higher-tier audit and a public capped audit as separate truths.
The interior numbers are the same; only the public Level claim is capped.

## Cap-lift trigger

To lift from L3 to L4, publish:

- verifier identity
- verification date
- verification scope
- verifier signature or equivalent evidence in `_audit/verifications/`

To lift from L4 to L5, the team must also satisfy the L5 entry-gate stack: independent accessibility audit, named adoption evidence, external contributors or equivalent community validation, at least two prior audits, and agent integration such as MCP or a comparable rules surface.

## Worked example

The CyberSkill example in [`examples/cyberskill-design-system/`](../../examples/cyberskill-design-system/) is a complete worked example of a DSAF self-audit.
Its public cited tier is L3 because it is not third-party verified.
Its interior score remains useful as learning and calibration material.

## Amendment

Changes to this policy require a DSAF governance proposal.
Until then, all published self-audits follow the cap table above.

*End of self-audit policy.*
