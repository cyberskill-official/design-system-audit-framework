# Prompt: Improvement plan generation

> Use after a SCAN-mode audit completes. The model takes the audit's §3 findings + §10 scores and turns them into a phase-by-phase improvement plan.

---

You are drafting a **phased improvement plan** for a design system, using the Design System Audit Framework. The plan does NOT use calendar dates — only step-by-step actions organised into phases. Each step has a "done when" condition.

## What I'm giving you

- **The signed audit:** `<design-system-path>/_audit/audit-report-{date}.md` — read §0 (snapshot), §3 (findings), §10 (per-criterion scores), §12 (open questions).
- **Improvement plan template:** `<framework-path>/templates/improvement-plan-template.md`
- **The design system's current state:** any context the operator provides about deployment, customers, team size, commercial constraints.

## What you produce

A markdown file at `<design-system-path>/_audit/improvement-plan.md`. Use the template structure. Phases are numbered sequentially from where the system already stands; the first phase you propose is *the next phase the team should execute*, not a recap of what they've already done.

## Procedure

### Step 1 — Identify the structurally bounded floors

Categories scoring < 75% almost always have a structural floor: a single missing prerequisite that caps multiple criteria. Common patterns:

- **No public deployment** → caps A.7 adoption, B.8 Core Web Vitals, B.10 measurement, parts of A.5 distribution.
- **No independent A11y audit** → caps A.8.6, B.5.1, B.5.2.
- **No open-source release** → caps A.4 contribution rate.
- **No customer telemetry** → caps B.10 task success, retention.
- **No first-product migration** → caps A.7 time-to-ship, adoption.
- **No conference / community signal** → caps A.4.6 roadmap transparency, A.7.4 contribution rate.

Identify these structural floors first. The improvement plan typically reads as "unlock floor 1 (one phase), then floor 2 (next phase)".

### Step 2 — Group findings into phases

A phase = a coherent batch of actions that share a goal and unlock the same set of criteria. Typical phase structures:

- **Phase N: Public release** → repo split, npm publish, CDN deploy, public deploy, Speed Insights wiring, announcement post.
- **Phase N+1: External validation** → vendor procurement (WCAG audit, privacy review), conference talk submissions, community building.
- **Phase N+2: Sustained leadership** → paid tier, talent flywheel, trend data, ≥ 2nd annual audit.

Within each phase, group steps into 2–3 **waves** that can overlap in execution.

### Step 3 — Write each phase

For each phase, write:

1. **Goal** — one sentence: what this phase unlocks.
2. **Audit lift** — estimated combined-score impact in pp (e.g., `+5 to +7 pp combined (84.6% → ~89–92%)`).
3. **Dependencies** — what must complete before this phase starts.
4. **Wave 1, 2, …** — each with a numbered step list. Each step:
   - **Bold action** — what to do.
   - **One-paragraph description** — concrete enough that a senior IC can execute without further context.
   - **"Done when:"** line — the observable condition (URL serving, command returns 200, dashboard shows data, etc.).
5. **Audit lift after wave** — category-level estimate.
6. **Risk** — one paragraph: what to watch for, with a mitigation.

### Step 4 — Add the "what this plan does NOT do" section

Every plan should explicitly call out what isn't being chased. Common items:

- Year-over-year trend data (calendar-bound).
- Independent vendor signatures (procurement-bound).
- Conference acceptance (selection-rate-bound).
- Sustained Fortune-500 customers (sales-cycle-bound).

These criteria sit at score 4 typically. They lift to 5 *naturally* as phases execute and time passes. Pushing them artificially is theatre.

### Step 5 — Combined trajectory table

End the plan with a table:

| Phase | Combined score | Tier |
|---|---|---|
| Now | xx.x% | Lx |
| End of Phase N | ~yy% | Lx+1 |
| End of Phase N+1 | ~zz% | Lx+1 |
| End of Phase N+2 | ~ww% | Lx+1 sustained |

The table reads as the plan's promise: *if you execute these phases as described, this is the score trajectory.*

### Step 6 — How-to-use section

End with a short section explaining:

1. Each step has a "done when" — track these in `_history.md` under "Phase milestones".
2. Priority order when deciding what's next:
   - `@Human[manual]` items blocking the next audit
   - Anything that unlocks measurement
   - Anything that compounds (case study leads to next case study)
   - Doctrine improvements (1–2 pp moves)

## Hard rules

1. **No calendar dates.** Phases are step lists, not Gantt charts.
2. **Each step has a "done when".** No ambiguous "execute" or "improve" language.
3. **Estimate lift in pp.** "+5 to +7 pp combined" is the right shape; "significantly improves the system" is wrong.
4. **Prefer compound moves over single-criterion fixes.** A public deploy lifts 4 categories at once; a single rubric tweak lifts one.
5. **Be honest about ceilings.** If a category structurally caps at 4 because of an external dependency, say so.
6. **Don't repeat the audit.** The plan is *what to do next*, not a re-listing of findings.

Begin.
