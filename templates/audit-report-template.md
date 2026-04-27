---
audit_id: YYYY-MM-DD
mode: SCAN
status: BASELINE
agent: <model-id>
operator: <name>
signer: <name>
parent_audit: YYYY-MM-DD | null
framework: 00-audit-and-roadmap.md
no_downgrade: true
pre_audit_score:
  part_a: 0.0
  part_b: 0.0
  combined: 0.0
  tier: L?
post_audit_score:
  part_a: 0.0
  part_b: 0.0
  combined: 0.0
  tier: L?
delta_pp: 0.0
---

# Audit YYYY-MM-DD

> **Single-file audit output.** This is the only artefact a session needs to produce. Both human readers and AI agents consume the same document. Sections are stable in order and headings — agents key off them.

---

## How to use this file

This document follows the audit flow defined in **`docs/00-audit-and-roadmap.md`**. The flow has two **modes** and two **actors**:

| Mode | Actor | Sections owned |
|---|---|---|
| `SCAN` | `@Agent` | §1 baseline · §2 industry research · §3 findings |
| `SCAN` | `@Human` | §4 sign-off (PAUSE point) |
| `FIX` | `@Agent` | §5 plan · §6 execution · §7 verification |
| `FIX` | `@Human` | §9 final sign-off |

### Status state machine

```
BASELINE  →  RESEARCH  →  FINDINGS  →  AWAITING_REVIEW  ⏸  →  FIXING  →  VERIFYING  →  RE_AUDIT  →  SIGNED
                                              ↑                                            │
                                              └─── ROLLBACK if any score regression ───────┘
```

The **no-downgrade rule** is hard: if §7 verification finds any FIXED-criterion regression, the agent rolls back the offending change automatically and re-runs §7 before advancing to §8. The audit cannot be `SIGNED` while any criterion sits below its pre-audit score.

### Action tags

Inline tags drive routing:

- `@Agent[fix]` — agent can fix autonomously (token edits, doc patches, script runs, reference cleanup).
- `@Agent[research]` — agent gathers evidence (web search, file reads, telemetry pulls).
- `@Human[decide]` — human chooses between options before agent proceeds.
- `@Human[approve]` — human sign-off gate; agent waits.
- `@Human[manual]` — work the agent cannot do (deploy, sign contracts, conduct user interviews, attend conferences).
- `@Human[rollback]` — human-driven revert path if agent's fix breaks something.

---

## §0 Snapshot

| Field | Value |
|---|---|
| Audit ID | `YYYY-MM-DD` |
| Mode | `SCAN` → `FIX` → `RE_AUDIT` |
| Pre-audit combined score | `x%` |
| Post-audit combined score | `y%` (filled by §8) |
| Delta | `+z pp` |
| Tier transition | `L? → L?` |
| FIXED regressions | `0` (must remain 0 to sign) |
| Findings | `N total` (`A` agent-fixable, `B` human-required) |
| Industry updates flagged | `M` (filled by §2) |

---

## §1 SCAN — Baseline `@Agent[research]`

**Goal**: re-score all 125 criteria from current repo state, no fixes yet.

**Inputs**:

- Doctrine: `docs/part-1` … `docs/part-20` (20 main DS files)
- Implementation: `packages/`, `src/`, `tokens/`
- CI evidence: `docs/_audit/coverage.json`, `bundle-size.json`, `doc-freshness.json`, `apca-contrast.json`
- Previous audit: `docs/_audit/audit-report-{parent_audit}.md` (if any)

**Procedure** — for each criterion `C` in §10:
1. Walk the mapped doctrine part(s).
2. Walk the implementation evidence.
3. Score 0–4 against the rubric in `00-audit-and-roadmap.md` §6 / §7.
4. Cite sources (file path + line/section anchor).
5. Set confidence: `Hi` (multiple direct citations), `Med` (single citation or inferred), `Lo` (assumption with no citation).

**Output**: §10 criteria table fully populated.

**Pre-audit score**: filled into the frontmatter `pre_audit_score` block.

---

## §2 SCAN — Industry research `@Agent[research]`

**Goal**: detect *new or updated* criteria the doctrine should adopt before the next audit cycle. The framework is DYNAMIC — standards evolve faster than the doctrine refresh cadence.

**Procedure**:

1. Web-search for updates to the standards listed in **`docs/00-audit-and-roadmap.md`** §2 References, including:
   - WCAG 2.x and 3.0 working drafts
   - DTCG token spec
   - APCA contrast algorithm
   - Web Components / Custom Elements
   - MCP (Model Context Protocol)
   - Tailwind / OKLCH / CSS spec advances
   - Major design system releases (Material, Polaris, Carbon, Spectrum, etc.)
   - Privacy/AI regulation (PDPL, GDPR, EU AI Act, EAA, OFCCP)
2. For each notable update, decide: **adopt** (move into §3 as a finding) / **note** (add to §11 research log) / **defer** (no action this cycle).
3. Keep a clean log — every entry has: source URL, summary, decision, rationale.

**Output**: §11 research findings table.

---

## §3 SCAN — Findings `@Agent[fix|research]` `@Human[decide|manual]`

**Goal**: enumerate every gap where the system can score higher, and route each to an actor.

| ID | Criterion | Current | Target | Gap | Owner | Effort | Rollback safe? |
|---|---|---|---|---|---|---|---|
| F-001 | A.7.4 Adoption telemetry | 1 | 3 | needs prod telemetry | `@Human[manual]` (deploy + analytics) | high | n/a |
| F-002 | B.2.5 Tree-test evidence | 2 | 3 | run study with ≥12 users | `@Human[manual]` | medium | n/a |
| F-003 | A.5.6 Bundle-size CI gate | 3 | 4 | tighten budget by 10% | `@Agent[fix]` | low | yes (revert .github/workflows/ci.yml) |
| ... | | | | | | | |

**Routing rules**:
- Token edits, doc patches, lint fixes, CI config tweaks, script runs → `@Agent[fix]`
- New evidence requiring user studies, enterprise sign-off, public deploys, conference talks, contracts → `@Human[manual]`
- Choice between competing approaches → `@Human[decide]`

---

## §4 SCAN — Human sign-off `@Human[approve]` ⏸

**This is the pause point.** The agent stops here and waits for human review.

The human reviewing this section should:

1. Read §1 score deltas and §3 findings.
2. For each `@Agent[fix]` row: approve / reject / defer.
3. For each `@Human[decide]` row: choose an option.
4. Mark `@Human[manual]` rows as in-flight (work scheduled outside this audit cycle).
5. Set frontmatter `mode: FIX` and `status: AWAITING_REVIEW` → `FIXING`.
6. Commit. Agent picks up from §5.

**Sign-off block** (fill in by hand):

```yaml
reviewed_by: <name>
reviewed_at: YYYY-MM-DDTHH:MM
approvals:
  - F-001: defer  # human-manual, scheduled separately
  - F-003: approve
  - F-XXX: reject  # reason: not aligned with current direction
```

---

## §5 FIX — Plan `@Agent[fix]`

**Goal**: sequence the approved fixes, declare rollback paths, prove no-downgrade safety pre-flight.

**Procedure**:

1. Order fixes by `Rollback safe? = yes` first (low-risk batch), then by criterion impact.
2. For each fix: declare exact files touched + revert command.
3. Run a *dry-run* against the no-downgrade check: simulate the fix on a branch, re-score the affected criterion's neighbours, confirm none drop.

**Plan block**:

| Order | ID | Files | Revert command | Estimated lift |
|---|---|---|---|---|
| 1 | F-003 | `.github/workflows/ci.yml` (1 line) | `git checkout HEAD~1 -- .github/workflows/ci.yml` | +0.5 pp |
| 2 | F-XXX | … | … | … |

---

## §6 FIX — Execution `@Agent[fix]`

For each plan row, log the result:

| Order | ID | Status | Files modified | Output |
|---|---|---|---|---|
| 1 | F-003 | `DONE` | `.github/workflows/ci.yml` | budget tightened from 50KB → 45KB |
| 2 | F-XXX | `BLOCKED` | — | reason: dependency missing |

A `BLOCKED` row pauses the cycle and routes to `@Human[decide]`.

---

## §7 FIX — Verification `@Agent[fix]`

**Goal**: prove no FIXED-criterion regressed; prove the lift the plan promised actually landed.

**Procedure**:

1. Run all `scripts/check-*.mjs` — record pass/fail for each.
2. Re-score each affected criterion using the §1 procedure.
3. Compare against pre-audit score.
4. **No-downgrade gate**: any criterion below its pre-audit score → automatic rollback of the offending fix → re-run §7 from step 1.

**Verification block**:

| Check | Pass | Notes |
|---|---|---|
| `check-coverage.mjs` | ✓ | token coverage 84.8% → 86.1% |
| `check-bundle-size.mjs` | ✓ | all packages within budget |
| `check-doc-freshness.mjs` | ✓ | 0 broken xrefs |
| `check-apca.mjs` | ✓ | 8/8 pass |
| `pre-review.mjs` | ✓ | 0 banned phrases |
| `build-design-md.mjs --check` | ✓ | DESIGN.md in sync |
| FIXED-criterion regressions | `0` | required = 0 |

---

## §8 RE_AUDIT — Final score `@Agent[research]`

**Goal**: refresh §10 criteria table with post-fix scores; compute new combined score.

Update frontmatter `post_audit_score` block. Update §0 Snapshot.

If `combined` decreased vs pre-audit → ROLLBACK the entire FIX batch (`git revert`), set status back to `AWAITING_REVIEW`, document the regression in §11.

---

## §9 SIGN-OFF `@Human[approve]`

The signer reviews §0 (deltas), §7 (verification), and §11 (research log). If satisfied:

```yaml
signed_by: <name>
signed_at: YYYY-MM-DDTHH:MM
final_combined_score: x%
register_row_added: true  # appended to docs/_audit/_history.md
```

Then append the row to your audit history register (typically `_audit/_history.md` or `docs/_audit/_history.md`, depending on where you scaffolded the audit folder) per the framework's sign-off rule.

---

## §10 Criteria scores (machine-readable)

> 125 rows. Stable column order: `id | category | criterion | weight | pre_score | post_score | confidence | citations | notes`. Agents parse this directly. Fill from `00-audit-and-roadmap.md` §6 (Part A, 63 criteria) and §7 (Part B, 62 criteria).

### Part A — Design System (63 criteria)

| ID | Category | Criterion | Weight | Pre | Post | Conf | Citations | Notes |
|---|---|---|---|---|---|---|---|---|
| A.1.1 | Foundations & Tokens | DTCG-conformant token sources | 2 | 4 | 4 | Hi | `tokens/*.tokens.json` | — |
| A.1.2 | Foundations & Tokens | Multi-platform token output | 2 | 4 | 4 | Hi | `scripts/build-tokens.mjs` | 5 platforms |
| ... | ... | ... | ... | ... | ... | ... | ... | ... |

### Part B — UX (62 criteria)

| ID | Category | Criterion | Weight | Pre | Post | Conf | Citations | Notes |
|---|---|---|---|---|---|---|---|---|
| B.1.1 | User Research | ResearchOps 8 pillars documented | 2 | 4 | 4 | Hi | **part-10 §3** | — |
| ... | ... | ... | ... | ... | ... | ... | ... | ... |

### Category roll-ups

| Category | Pre % | Post % | Δ |
|---|---|---|---|
| A.1 Foundations & Tokens | 0.0 | 0.0 | 0.0 |
| A.2 Component Library | 0.0 | 0.0 | 0.0 |
| ... | ... | ... | ... |
| **Combined** | **0.0** | **0.0** | **0.0** |

---

## §11 Research findings (machine-readable)

| ID | Source URL | Summary | Decision | Rationale |
|---|---|---|---|---|
| R-001 | https://w3c.github.io/silver/ | WCAG 3.0 working draft updates target levels | adopt | move APCA floor up |
| R-002 | … | … | … | … |

---

## §12 Open questions (carry-over)

Questions deferred from this cycle. Each carries a target audit:

| ID | Question | Target audit | Owner |
|---|---|---|---|
| Q-001 | … | YYYY-MM-DD | `@Human` |

---

## §13 Glossary (frozen for this audit)

| Term | Meaning in this audit |
|---|---|
| FIXED criterion | scored against an objective rubric; cannot drift |
| DYNAMIC criterion | rescored quarterly as standards evolve |
| Anchor immutable | invariant the agent must refuse to change |
| No-downgrade rule | post-audit combined score must be ≥ pre-audit |

---

*End of audit-report-YYYY-MM-DD.*
