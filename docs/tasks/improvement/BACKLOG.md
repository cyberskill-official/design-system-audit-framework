# Backlog — master index

Derived from the [2026-07-06 strengthening review](../../internal/audits/2026-07-06-csaf-strengthening.md) §E (open recommendations R23, R31–R37), the first `evolve:mine` run (2026-07-06: 8 dead criteria, 118 vocabulary-gap rows, keyword-extraction flaw, zero repo-mode calibration cases), and loop go-live actions. Detail lives in the epic files; this table is the queue.

Update rules: change `Status` here AND in the task's own file in the same commit. A task is `done` only when its acceptance criteria are checked off with evidence and a human has signed the Review block.

## P0 — unblock the live loop

| ID | Task | Epic | Owner | Effort | Depends on | Status |
|---|---|---|---|---|---|---|
| IMP-001 | Merge + push both branches (`auto/csaf-evolution`, `auto/audit-loop`) | [E6](E6-loop-operations.md) | @Human[manual] | S | — | todo |
| IMP-002 | First CI proof: Actions run green on both repos, CDS audit job gates | [E6](E6-loop-operations.md) | @Human[manual] | S | IMP-001 | todo |
| IMP-003 | Arm the override register (`overrides.md` + wrapper reminder text) | [E6](E6-loop-operations.md) | @Agent[fix] | S | — | todo |
| IMP-004 | Local hygiene: remove dangling `workflows` symlink in CDS; delete stale `docs/outputs/generated/maximal-cases/` | [E6](E6-loop-operations.md) | @Human[manual] | S | — | todo |

## P1 — this cycle (rubric integrity + calibration substrate)

| ID | Task | Epic | Owner | Effort | Depends on | Status |
|---|---|---|---|---|---|---|
| IMP-101 | Disposition the 8 dead criteria from the first mine run | [E1](E1-rubric-integrity.md) | @Agent analysis → @Human[decide] | M | IMP-001 | todo |
| IMP-102 | Stop deriving keywords from category headings (extraction flaw) | [E1](E1-rubric-integrity.md) | @Agent[fix] | M | — | todo |
| IMP-103 | Rubric-version contract: criteria edits require `dsaf_125_version` bump (R37) | [E1](E1-rubric-integrity.md) | @Agent[fix] | M | — | todo |
| IMP-105 | Synonym batch 1 from miner vocabulary gaps (~top 20, reviewed) | [E1](E1-rubric-integrity.md) | @Agent proposal → @Human[decide] | M | IMP-102 | todo |
| IMP-106 | Repo-mode calibration fixtures + ordering invariant | [E4](E4-calibration.md) | @Agent[fix] | M | — | todo |
| IMP-107 | Score-trend register + `audit-trend.mjs` | [E4](E4-calibration.md) | @Agent[fix] | M | — | todo |
| IMP-601 | CDS quarterly LLM SCAN reconciled with engine floor (one published number) | [E6](E6-loop-operations.md) | hybrid | L | IMP-001 | todo |
| IMP-602 | CDS MANUAL-evidence register scaffold (B1 research, counsel, AT sessions) | [E6](E6-loop-operations.md) | @Agent scaffold → @Human[manual] | M | — | todo |

## P2 — next cycle

| ID | Task | Epic | Owner | Effort | Depends on | Status |
|---|---|---|---|---|---|---|
| IMP-201 | Evidence-bundle emitter (`--emit-bundles`) for hybrid scoring (R31) | [E2](E2-hybrid-scoring.md) | @Agent[fix] | M | — | todo |
| IMP-202 | LLM anchor-assignment protocol + hybrid merge tool (R31) | [E2](E2-hybrid-scoring.md) | @Agent[fix] → @Human[decide] | L | IMP-201 | todo |
| IMP-203 | Engine-vs-LLM disagreement report feeding `evolve:mine` (R31) | [E2](E2-hybrid-scoring.md) | @Agent[fix] | M | IMP-202 | todo |
| IMP-301 | Publish `@cyberskill/dsaf` CLI to npm (R32) | [E3](E3-distribution.md) | @Agent prep → @Human[manual] publish | M | IMP-001 | todo |
| IMP-302 | Rubric-as-data package (criteria compiled to versioned JSON) (R32) | [E3](E3-distribution.md) | @Agent[fix] | M | IMP-103 | todo |
| IMP-401 | External calibration study on 2+ public systems (R33) | [E4](E4-calibration.md) | hybrid | L | IMP-106 | todo |
| IMP-402 | Band-weight tuning proposal from study data (R33) | [E4](E4-calibration.md) | @Agent analysis → @Human[decide] | M | IMP-401 | todo |

## P3 — opportunistic

| ID | Task | Epic | Owner | Effort | Depends on | Status |
|---|---|---|---|---|---|---|
| IMP-104 | Category heading dedup RFC (B.4–B.8 duplicated by ENT overlay) (R23) | [E1](E1-rubric-integrity.md) | @Agent draft → @Human[decide] | M | — | todo |
| IMP-108 | Weight rebalance RFC (weights exceed 100%/part with overlay) (R36) | [E1](E1-rubric-integrity.md) | @Agent draft → @Human[decide] | M | IMP-104 | todo |
| IMP-303 | GitHub Action v1: `scores.json` + `audit-diff` as a PR gate (R32/R34 adjacency) | [E3](E3-distribution.md) | @Agent[fix] | L | IMP-301 | todo |
| IMP-501 | Storybook addon consumes `scores.json` (R34) | [E5](E5-integrations.md) | @Agent[fix] | M | IMP-001 | todo |
| IMP-502 | Figma plugin score summary (R34) | [E5](E5-integrations.md) | @Agent[fix] | M | IMP-501 | todo |
| IMP-503 | Hosted benchmark ingest spec for `dsaf-scores/1` (R35) | [E5](E5-integrations.md) | @Agent draft → @Human[decide] | M | IMP-301 | todo |
| IMP-603 | Third-party verification path to lift the L3 publication cap | [E6](E6-loop-operations.md) | @Human[manual] | L | IMP-601 | todo |

## Working agreements (Definition of Done)

1. All acceptance criteria in the task file are checked, each with evidence (command + output snippet or file path) recorded in the task's Evidence section.
2. `npm run verify` green in this repo (18/18) and, for cross-repo tasks, `npm run verify:all` + `npm run audit` green in CDS.
3. No contract check weakened to pass; contract changes ship in the same commit as the behaviour they pin, with rationale.
4. Score regressions carry a signed row in [overrides.md](overrides.md) — otherwise the task cannot be `done`.
5. Rubric/keyword/probe changes bump `dsaf_125_version` (in `docs/framework/dsaf-25.md` frontmatter) and regenerate the calibration corpus in the same commit.
6. Backlog row + task file status updated together; `done` rows carry date + approver initials.
