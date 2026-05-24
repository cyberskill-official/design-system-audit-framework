---
title: "We built DSAF because design-system audits kept becoming taste arguments"
slug: launch-2026
date: 2026-05-18
author: Stephen Cheng
summary: "The candid launch note for DSAF: what it is, why we built it, what we got wrong, and what feedback would help."
canonical: https://audit.cyberskill.world/blog/launch-2026
og_image: https://audit.cyberskill.world/assets/og/launch-2026-1200x630.png
---

# We built DSAF because design-system audits kept becoming taste arguments

Most design-system audits start with reasonable intent and end in taste. Someone senior reads the docs, compares the system to whatever mature system they last admired, and writes a plan. That can be useful, but it is hard to rerun. It is also hard to tell whether the plan improved the system or merely reflected the auditor's preferences.

DSAF is my attempt to make the work inspectable. It has a 25-row Core that fits on one page and a full 125-criterion rubric for signed audits. It asks for evidence, separates FIXED criteria from DYNAMIC standards, and routes every action to either `@Agent` or `@Human`.

This is not a victory-lap post. It is the launch note I wish more methodology projects wrote: what DSAF is, why we built it, what was wrong with the first versions, what still worries me, and what I would like the design-systems community to roast.

## What DSAF is

DSAF - Design System Audit Framework - is a criteria-graded, agent-native maturity rubric for design systems. The full rubric scores 125 criteria across 20 categories: ten categories for the design system itself, and ten categories for the UX that system produces.

Part A covers the system surface: foundations and tokens, component library, documentation, governance, tooling, cross-platform theming, adoption metrics, accessibility, performance and developer experience, and AI or MCP readiness. Part B covers the produced UX: research, information architecture, interaction design, visual hierarchy, accessibility and inclusion, content design, heuristic compliance, Core Web Vitals as UX, trust and privacy, and measurement.

That sounds large because it is. The full audit is for signed work: an auditor reads evidence, scores criteria, records citations, proposes fixes, verifies changes, and signs the report. For the first five minutes, DSAF-25 Core is the better entry point. It keeps one or more criteria from every major area, fits on a printable card, and gives a design-system lead something they can quote in a meeting.

![DSAF L0-L5 maturity ladder](/assets/dsaf-l0-l5-ladder.svg)

The ladder is the narrative surface. It maps a combined score to DSAF Levels from L0 Initial to L5 Optimised. Self-audits cap at L3 publicly until third-party verification exists. The radar is the diagnostic surface. It shows the shape of a system across all categories and makes enterprise thresholds visible instead of leaving them buried in a table.

## Why we built it

CyberSkill is a software consultancy, and design-system work kept forcing the same question: how mature is this system, really? Not "does the button look good" or "does the Storybook exist," but whether the organization can govern the system, measure adoption, handle accessibility, publish changes safely, and keep the produced UX from drifting into local invention.

The available answers were useful but incomplete. The design-systems community has excellent essays, surveys, maturity narratives, books, conference talks, and SaaS platforms. What I could not find was a repo-native rubric that a team could run this quarter, rerun next quarter, and compare without rebuilding the whole judgment from scratch.

So we started from the boring shape: criteria, evidence, citations, scores, audit state, and a signed report. Then we made it agent-readable because modern audit work already happens with agents open. DSAF is not an oracle prompt. It is a structured surface where an agent can gather evidence, a human can approve or reject findings, and future reviewers can see why a score changed.

## What we got wrong first

The first version was too large to explain quickly. One hundred twenty-five criteria is useful in an audit, but it is not the thing someone screenshots. That is why DSAF-25 Core exists. The Core is not "lite" in the sense of being a different methodology; it is the front door into the same methodology.

The category boundaries also needed pressure. Accessibility, content, metrics, and tokens all overlap if the rubric is lazy. We now keep the overlap visible through `docs/criteria-aliases.md` and `docs/criteria-dedup-methodology.md`. The dedup pass reduced the live rubric to exactly 125 criteria and preserved merged-away IDs as aliases instead of silently deleting them.

The CyberSkill worked example was too easy to misread as an unsupported verification claim. That was the most predictable takedown angle: a consultancy publishes a framework and then grades itself as elite. We fixed the public surface with a self-audit cap. CyberSkill's worked example is cited as L3 until independent verification exists. Interior scores remain useful calibration data, but the headline claim is intentionally capped.

The original regression rule was also wrong. It said a FIXED criterion could never drop, and if it did, the fix should roll back. That was satisfying to engineers and brittle for real teams. Legitimate regressions happen when standards move, vendors change, or a team accepts an explicit trade-off. The current rule is no-silent-regression: record the drop, name the cause, approve it or roll it back. The point is visibility, not pretending real systems never move backward.

The geography headwind is real. CyberSkill is Vietnam-based, and Western enterprise buyers do not always evaluate non-Western open-source work neutrally. I do not think whining about that helps. Naming it does. The countermeasure is to make DSAF more than a consultancy artifact: named reviewers, a co-maintainer path, public governance, and a rubric that is usable even if you never talk to CyberSkill.

## What we got right, I think

The strongest part of DSAF is that it treats audit work as a repeatable process, not a deck. A DSAF audit has a state machine: SCAN, human review, FIX, VERIFY, RE_AUDIT, SIGNED. A score without citations is rejected. A fix without verification is not done. A regression without an explicit tag and approval cannot disappear inside the final number.

The agent-native posture is also load-bearing. The prompts are not marketing examples. `prompts/scan-mode.md` and `prompts/fix-mode.md` are working surfaces for an agent to run through docs, code, tokens, and evidence. The script checks are small now, but the operating model is what matters: the rubric can be inspected by machines and still signed by humans.

![DSAF radar chart](/assets/dsaf-radar.svg)

The visual surfaces help too. The ladder explains the maturity story in one glance. The radar shows that DSAF is not just "component library quality" wearing a bigger hat. Mature systems fail in strange places: accessibility governance, documentation freshness, research cadence, consent UX, AI rules, or the measurement loop. A radar makes those gaps harder to hide.

There is one thing this launch intentionally does not have yet: named endorsement quotes in the post. The outreach package is ready. No quote appears until the exact wording and attribution are approved in writing. That is slower than inventing launch praise and much less embarrassing.

## Who this is for

DSAF is for design-systems leads running an annual or quarterly audit, heads of design or engineering who need a credible answer to "what tier are we at," consultancies doing third-party audits, and practitioners who want to sanity-check a system before a major release.

It is not for choosing whether you should adopt Material, Carbon, Polaris, Spectrum, Radix, or something internal. It is not a replacement for a third-party WCAG audit. It is not a single-component checklist. It is a maturity rubric for systems that already matter enough to govern.

## What feedback would help

Run DSAF-25 Core on your own design system and tell me which row feels wrong. Roast the 25-row selection. Find overlaps in the full rubric. Tell me which criteria cap too low, which ones reward theatre, and which ones would be impossible to evaluate in your organization.

If you work on a mature public design system, I would especially value a public audit collaboration later this year. Primer, Carbon, Polaris, Spectrum, Material, and similar systems are the kinds of benchmarks that would make the rubric better, even if the result is uncomfortable for DSAF.

## What's next

The launch plan is deliberately practical. First: Show HN, cross-posts, and reviewer outreach. Next: weekly criterion deep-dives, translations, and the first integrations: Storybook runner, Tokens Studio validator, and zeroheight export reader. After that: a public audit of a marquee open-source design system and a co-maintainer path so DSAF does not stay a single-founder rubric.

The repository is the source of truth: [github.com/cyberskill-official/design-system-audit-framework](https://github.com/cyberskill-official/design-system-audit-framework). The five-minute entry point is [DSAF-25 Core](/card). The full criteria live in the repo. If the rubric annoys you in a precise way, that is the feedback I most want.

Disclosure: I run CyberSkill, a software consultancy that uses DSAF and offers paid third-party audits separately. DSAF is open source and vendor-neutral; CyberSkill is the original authoring practice, not a shortcut around the evidence requirements.

## ChangeLog

- 2026-05-18: Initial launch-ready draft rendered from Markdown to static HTML.
- Show HN discussion link: pending operator submission.
