# 08 — How to write an improvement plan

After every audit, the team needs to know: "what's next?". The improvement plan answers that. It is **not a roadmap** — there are no calendar dates. It is a **sequenced plan of action** where each step has a clear "done when" condition.

The plan template is at [`templates/improvement-plan-template.md`](../templates/improvement-plan-template.md). The LLM prompt that drafts one for you is at [`prompts/improvement-plan.md`](../prompts/improvement-plan.md). This file explains *why* the plan looks the way it does.

---

## §1 Why phases, not timelines

Most design system "roadmaps" fail one of two ways:

1. **Calendar-driven.** "Q1: ship dark mode. Q2: ship density variants." Then Q1 ends, dark mode is half-shipped, and the roadmap drifts. Six months later, no one remembers what Q2 was for.
2. **Wishlist-driven.** A list of 20 things in priority order, no acceptance criteria, no estimated lift. The team picks whichever item is least intimidating that week.

The framework's plan format avoids both:

- **Phases**, not quarters. A phase is a coherent batch of work that unlocks something specific. It runs at the team's natural pace.
- **Steps**, not tasks. Each step has a "done when" condition. You can prove a step is complete without arguing about it.
- **Estimated lift**, not just priority. Each phase declares how many percentage points it should move the next audit's combined score.

If a step takes two weeks instead of two days, the plan still works. If a phase ships in three months instead of one, the plan still works. The plan is a sequence, not a schedule.

---

## §2 Plan structure

Every plan follows the same shape:

```
## Phase N — <name>

**Goal:** <one sentence>
**Audit lift:** <+x to +y pp combined (current% → ~target%)>
**Dependencies:** <previous phase or "none">

### Wave 1 — <wave name>

1. **<step name>** — <one-paragraph description>
   - Done when: <observable condition>
2. **<step name>** — ...

**Audit lift after Wave 1:** <category-level estimate>

### Wave 2 — <wave name>

(...)

**Risk:** <what to watch for, with mitigation>
```

A **phase** is a coherent batch of work (e.g., "public release"). A **wave** is a sub-batch within a phase that can run in parallel with other waves (e.g., "repo split", "npm publish", "CDN deploy").

Phases run sequentially. Waves within a phase can overlap.

---

## §3 What each section is for

### Goal

One sentence that names the *outcome*, not the *activity*. Wrong: "Set up monorepo." Right: "Doctrine and implementation can ship as separate npm packages."

If the goal sentence has the word "do" in it, rewrite it. Phases unlock outcomes; they don't "do" things.

### Audit lift

Estimated combined-score impact in percentage points. The format `+x to +y pp combined (start% → ~target%)` is the standard.

Two reasons this matters:
1. It forces honesty about whether a phase is worth doing. If a phase lifts the score < 1 pp, you're probably overscoping it.
2. It compounds: phase N's target becomes phase N+1's start. The plan is a trajectory, not a wishlist.

### Dependencies

What must complete before this phase starts. Common dependencies:
- "Phase X done" — sequential phases.
- "Public deploy live" — a `@Human[manual]` gate.
- "Vendor signed" — calendar-bound.
- "First customer migrated" — sales-cycle-bound.

If a phase has no dependencies, it can start now. If it has a dependency that's calendar-bound (e.g., vendor delivery), name it explicitly so it's clear the team isn't waiting for permission — they're waiting for a calendar event.

### Step list

Numbered, in execution order. Each step has:

- **Bold action verb + object.** "Public deploy of one product on the design system." Not "Deploy stuff."
- **One paragraph description.** Concrete enough that a senior IC can execute without further context. Reference specific files, scripts, vendors, or acceptance criteria.
- **"Done when:" line.** Observable. Verifiable. Not "We feel good about it."

Examples of good "Done when" conditions:

- `curl -I https://design.example.com/v0.1.0/loader.js` returns 200 with the SRI hash.
- `npm view @your-org/tokens version` returns 0.1.0.
- A signed letter from the vendor is on file.
- The dashboard at `<URL>` shows real LCP / INP / CLS data within 48h of deploy.

Examples of bad "Done when" conditions:

- "Customer is happy."
- "Documentation is good."
- "The team understands it."

### Audit lift after wave

Category-level estimate. e.g., "A.7 adoption +3–4 pp, B.8 CWV +2–3 pp ≈ +5–7 pp combined". Naming the affected categories makes it auditable in the next cycle: did A.7 actually lift by 3 pp?

### Risk

One paragraph: what to watch for, with a mitigation. Not "many things could go wrong" — specific risks with specific mitigations.

Examples:

- **Risk:** vendor delays for the WCAG audit. **Mitigation:** start vendor procurement in Wave 1 (not Wave 3), even if you don't need their report for 6 weeks. The procurement is the long-pole.
- **Risk:** open-sourcing before doctrine is stable — discoverability cuts both ways. **Mitigation:** v0.1.0 marks "stable structure, evolving content"; semver discipline holds.

---

## §4 The "what this plan does NOT do" section

Every improvement plan should explicitly call out what it isn't chasing. Common items:

- **Year-over-year trend data** (calendar-bound).
- **Independent vendor signatures** (procurement-bound).
- **Conference acceptance** (selection-rate-bound).
- **Sustained Fortune-500 customers** (sales-cycle-bound).

These criteria typically sit at score 4 already. They lift to 5 *naturally* as phases execute and time passes. Pushing them artificially is theatre.

Naming them explicitly avoids two failure modes:
- Team lead asking "why isn't conference acceptance in the plan?" six months in.
- A new IC trying to "fix" something that's structurally bounded by external action.

---

## §5 Combined trajectory table

End every plan with:

| Phase | Combined score | Tier |
|---|---|---|
| Now | xx.x% | Lx |
| End of Phase N | ~yy% | Lx+1 |
| End of Phase N+1 | ~zz% | Lx+1 |
| End of Phase N+2 | ~ww% | Lx+1 sustained |

The table is the plan's promise: *if you execute these phases as described, this is the score trajectory.* When the next audit signs, compare actual scores to this table. The deltas tell you whether the plan was well-calibrated or whether the team needs to recalibrate.

---

## §6 Plan-to-phase decomposition heuristics

When converting an audit's §3 findings into a plan, group findings by **what unlocks them**. Common groupings:

### Bottleneck-based grouping

If multiple findings gate on the same prerequisite, batch them into one phase.

Example:

- A.7.1 (coverage tracked) caps at 3 because no production deploy.
- A.7.5 (time-to-ship) caps at 3 because no production deploy.
- B.8.1–B.8.4 (CWV) caps at 3 because no production traffic.
- B.10.3 (task success) caps at 3 because no telemetry.

→ Single phase: "Public release". One step (`vercel --prod`) lifts 4 categories at once.

### Sequencing-based grouping

If finding A's "done when" is a prerequisite for finding B, sequence them across phases.

Example:

- Finding: "Open-source release on GitHub" — Phase 6 W2.
- Finding: "First external contributor PR merged" — depends on the previous; Phase 7 W2.
- Finding: "≥ 5 distinct external contributors" — depends on the previous; Phase 8 W1.

### Cost-based grouping

Findings with similar effort batch well.

Example: 6 findings each requiring a one-day token-edit + lint-check. Bundle them into a single phase wave; ship a single PR.

### Risk-based grouping

Findings that are `Rollback safe? = no` should *not* batch with safe ones. They get their own phase wave with extra `@Human[approve]` gates.

---

## §7 Anti-patterns

### "Let's just keep going"

Phase-less plans. The team finishes one batch, immediately starts another, no checkpoint, no decision moment. Six months later, the audit shows things drifted.

**Fix:** every phase ends with an explicit "audit-on-completion" step. The team runs a SCAN audit, compares to the plan's predicted trajectory, decides whether the next phase still makes sense.

### Big phase, no waves

Phase 6 has 30 steps and no internal structure. Halfway through, no one remembers which steps are done.

**Fix:** any phase with > 10 steps must have ≥ 2 waves. Each wave has its own "done when" and audit-lift estimate.

### Wishlist phases

"Phase 6: Improve the design system." No specific outcome. No specific acceptance criteria.

**Fix:** if you can't write the goal sentence in one specific outcome-shaped sentence, you don't have a phase yet — you have a feeling.

### Estimated lift inflation

Every phase claims +5 pp. None of them deliver.

**Fix:** when calibrating, use prior audit deltas as ground truth. If the team historically lands ~3 pp per phase, don't promise 5 pp this time without naming what's different.

### "Quick wins" sections

A separate "quick wins" track parallel to the phase plan. The quick wins consume the team's bandwidth; the real phases never start.

**Fix:** anything worth doing is a phase. If something is < 1 pp lift, fold it into an existing phase or accept that it won't ship.

---

## §8 The plan is a living document

The plan does **not** sign with the audit. The audit is signed and frozen; the plan keeps evolving. Update the plan when:

- A phase wave completes — append the actual delta vs predicted.
- New industry research lands (per [`prompts/research-mode.md`](../prompts/research-mode.md)) — incorporate into the next phase.
- A `@Human[manual]` finding moves from "deferred" to "in flight" — promote it to a step.
- A finding from a prior audit is closed — strike it through, don't delete.

Keep the plan in version control alongside the doctrine. Tag commits like `plan/2026-Q3` if you re-baseline at quarter boundaries.

---

*Continue to [`09-customising.md`](./09-customising.md) for how to adapt the framework to your industry / brand.*
