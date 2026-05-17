# We built DSAF because design-system audits kept becoming taste arguments

**Status:** launch-ready draft.
**FR:** FR-DOCS-003.
**Canonical URL:** `https://dsaf.dev/blog/launch-2026`.

Most design-system audits start with reasonable intent and end in taste.
Someone senior reads the docs, notices gaps, compares the system to whatever mature system they last admired, and writes a plan.
That can be useful, but it is hard to rerun.
It is also hard to tell whether the plan improved the system or merely reflected the auditor's preferences.

DSAF is our attempt to make the work inspectable.
It has a 25-row Core that fits on one page and a full 125-criterion rubric for signed audits.
It asks for evidence, separates FIXED criteria from DYNAMIC standards, and routes every action to either `@Agent` or `@Human`.

## What we got wrong first

The first version was too large to explain quickly.
One hundred twenty-five criteria is useful in an audit, but it is not the thing someone screenshots.
That is why DSAF-25 Core exists.

The category boundaries also needed pressure.
Accessibility, content, metrics, and tokens all overlap if the rubric is lazy.
The dedup pass now documents the boundary decisions rather than pretending overlap does not exist.

The CyberSkill worked example was also too easy to misread as a top-tier marketing claim.
We fixed that with a self-audit publication cap: unverified self-audits cite L3 publicly, even when the interior score is higher.

The original hard rollback rule was satisfying to engineers and wrong for real teams.
Legitimate regressions happen when standards move, vendors change, or a team accepts a trade-off.
The current rule is no-silent-regression: record the drop, name the cause, approve it or roll it back.

## Why open-source it

We could have turned the rubric into a private service checklist.
That would have made it less useful.
Design-system maturity is a community problem: teams need a shared language for tokens, contribution, accessibility, documentation, performance, trust, research, and AI-agent readiness.

DSAF is MIT licensed because the rubric gets better when teams disagree with it in public.

## Where to start

Read [`DSAF-25 Core`](../../docs/dsaf-25.md) first.
Then run the SCAN prompt against your own design-system docs.
If the result annoys you, that is probably the useful part.

*End of launch post draft.*
