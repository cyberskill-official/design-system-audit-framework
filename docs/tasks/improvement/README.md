# Improvement backlog — CSAF ↔ CDS evolution loop

This directory is the executable follow-up to the [2026-07-06 strengthening review](../internal/audits/2026-07-06-csaf-strengthening.md) (37 recommendations; R1–R22, R24–R30 landed on branches `auto/csaf-evolution` + `auto/audit-loop`). Everything still open lives here as detailed, agent-executable tasks with human review gates.

## Files

| File | Purpose |
|---|---|
| [BACKLOG.md](BACKLOG.md) | Master index: every task, priority, owner, dependencies, status |
| [E1-rubric-integrity.md](E1-rubric-integrity.md) | Rubric & engine truth: dead criteria, keyword extraction, version contract, heading dedup |
| [E2-hybrid-scoring.md](E2-hybrid-scoring.md) | LLM-assisted 0–5 anchor scoring on top of the deterministic floor |
| [E3-distribution.md](E3-distribution.md) | npm CLI, rubric-as-data package, GitHub Action |
| [E4-calibration.md](E4-calibration.md) | External calibration studies and band-weight tuning |
| [E5-integrations.md](E5-integrations.md) | Storybook addon, Figma plugin, hosted benchmark ingest |
| [E6-loop-operations.md](E6-loop-operations.md) | Loop go-live, override register, CDS-side human evidence |
| [PROMPT.md](PROMPT.md) | The trigger: paste-ready agent implementation prompt + human review protocol |
| [overrides.md](overrides.md) | Signed no-silent-regression override register (TASK-CORE-002) |

## How the backlog works

1. Pick the topmost unblocked task in [BACKLOG.md](BACKLOG.md) (or name one explicitly), paste [PROMPT.md](PROMPT.md) Part A into an agent session.
2. The agent implements on a dedicated branch (`auto/imp-<id>`), keeps every gate green, records evidence in the task's Evidence section, sets the task to `in-review`, commits, and stops. It never pushes, never merges, never self-approves.
3. A human runs [PROMPT.md](PROMPT.md) Part B: check the evidence, run the spot-checks, then either merge + mark `done` (with date and approver) or send it back to `todo` with a note.

## Conventions

- Owner tags reuse the framework actor model ([framework overview §2](../framework/01-framework-overview.md)): `@Agent[fix]` — agent implements end-to-end; `@Human[manual]` — only a person can do it (push, procurement, research, counsel); `@Human[decide]` — agent prepares options, human chooses; hybrid tasks name both.
- Priorities: `P0` unblocks the live loop · `P1` this cycle · `P2` next cycle · `P3` opportunistic.
- Effort: `S` ≤ half a day · `M` 1–2 days · `L` needs slicing before execution.
- Statuses: `todo → in-progress → in-review → done` (plus `blocked`, with the blocker named).
- Two invariants no task may violate: **no silent regressions** ([policy](../framework/05-regression-policy.md) — score drops require a signed row in [overrides.md](overrides.md)) and **the loop proposes, a human disposes** (rubric/keyword/probe changes land only through reviewed PRs with a `dsaf_125_version` bump when criteria rows change).
- Cross-repo tasks (E6) execute in the sibling `design-system` checkout but are tracked here, in one backlog, so the loop has one queue.

## Status snapshot

Maintained by hand inside [BACKLOG.md](BACKLOG.md) — this README stays stable.
