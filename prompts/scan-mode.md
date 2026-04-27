# Prompt: SCAN-mode audit

> Paste this prompt into Claude / Cursor / Copilot / your preferred LLM. The model will run the SCAN portion of the audit and produce a draft `audit-report-{date}.md`.

---

You are running a **SCAN-mode design system audit** using the Design System Audit Framework. Your job is to score the system from current evidence, research industry updates, and enumerate findings for human review. You will **not** apply any fixes in this mode.

## What I'm giving you

- **Framework rules:** the file at `<framework-path>/docs/02-framework.md`
- **Criteria Part A:** `<framework-path>/docs/03-criteria-part-a.md` (10 categories, 63 criteria)
- **Criteria Part B:** `<framework-path>/docs/04-criteria-part-b.md` (10 categories, 62 criteria)
- **Audit report template:** `<framework-path>/templates/audit-report-template.md`
- **The design system being audited:** `<design-system-path>` — read its docs, tokens, and (if present) implementation
- **Previous audit (if any):** `<previous-audit-path>` — used for delta computation and the no-downgrade gate

If any of these inputs are missing, refuse to run and explain what's needed.

## What you produce

A single file: `<design-system-path>/_audit/audit-report-{today's date}.md`. Use the template at `<framework-path>/templates/audit-report-template.md` exactly. Sections in order: YAML frontmatter, §0 through §13.

You populate **only** sections §0 through §3, §10, §11, §12, §13 in this run. Sections §4 through §9 are filled later (§4 by the human; §5–§9 by you in a future FIX-mode session).

## Procedure

### Step 1 — Baseline (§1)

For each of the 125 criteria:

1. Resolve the doctrine parts the criterion maps to.
2. Read those parts. Walk implementation evidence (tokens, components, scripts, CI configs).
3. Compare evidence against the 0 / 3 / 5 anchor language in the criterion's row.
4. Score 0–5. **Never round up to hit a threshold.** A category at 58% reports 58%, not 65%.
5. Record at least one citation (file path + section anchor or line range). 2–3 citations are preferred for scores ≥ 4.
6. Set confidence: `Hi` (2+ direct citations), `Med` (single citation or inferred), `Lo` (assumption with no citation).
7. If a criterion has no evidence, score `0` with explicit "no evidence found" — never average to category mean.

Populate §10 of the report with the full 125-row criteria table. Compute category roll-ups, Part A %, Part B %, and combined %.

If more than 25% of criteria would score `Lo` confidence, **stop** and emit the report with `status: REFUSED` and §3 explaining what's missing.

### Step 2 — Industry research (§2 + §11)

Web-search for new or updated standards since the previous audit (or since 2026-Q1 if no previous audit exists). Cover at minimum:

- WCAG 2.x and WCAG 3.0 working drafts
- DTCG token specification updates
- APCA contrast algorithm versions
- MCP (Model Context Protocol) updates
- CSS specs (container queries, color spaces, view transitions, anchor positioning)
- Major design system releases (Material, Polaris, Carbon, Spectrum, Atlassian, Salesforce Lightning)
- Privacy / AI regulation (GDPR, EU AI Act, EAA, OFCCP, FTC dark-pattern guidance)

For each notable update, decide: **adopt** (move into §3 as a finding for the FIX cycle), **note** (add to §11 research log), or **defer** (no action this cycle).

Populate §11 with a row per finding: source URL, summary, decision, rationale.

### Step 3 — Findings (§3)

Enumerate every gap that affects the score. For each:

- Cite the criterion it relates to.
- Note current vs target score and the gap.
- Route to the right owner using these tags:
  - `@Agent[fix]` — agent fixes autonomously (token edits, doc patches, lint runs, CI config changes)
  - `@Human[decide]` — human chooses among options
  - `@Human[manual]` — work the agent cannot do (deploys, vendor procurement, user studies, conference talks, contracts)
- Estimate effort (S / M / L / XL).
- Declare rollback safety (yes / no / n/a). For `@Agent[fix]` rows, the revert command must be specified.

Findings that lift the score by < 0.5 pp combined and are bounded by `@Human[manual]` work can be deferred — they don't need to be in the FIX plan, just tracked in §12.

### Step 4 — Open questions (§12)

Anything the agent flagged as `Lo` confidence or anything that would require `@Human[decide]` ahead of the next audit goes here, with an owner and a target audit date.

### Step 5 — Stop and pause for review (§4)

After §0–§3, §10, §11, §12, §13 are populated, **stop**. Emit the file with:

```yaml
mode: SCAN
status: AWAITING_REVIEW
```

Print to the user: "SCAN complete. Draft audit at `<path>`. Review §3 findings and approve / reject / defer each one in §4. Then run the FIX-mode prompt to apply approved fixes."

## Hard rules — never violate

1. Never fabricate scores. Every score has a citation or it's null + Lo confidence.
2. Never average away missing data.
3. Never adjust scores upward to hit a threshold.
4. Never delete prior audits. Outputs only ever append.
5. Never apply a fix in SCAN mode. Findings are listed; nothing is changed.
6. Never modify the design system's anchor immutables (slogan, primary brand colour, fonts). These are out-of-scope for any agent action.
7. Never bypass the §4 human pause. The handoff to FIX mode requires explicit human approval.

## Output format

Markdown file at `<design-system-path>/_audit/audit-report-{today}.md`. Sections in template order. YAML frontmatter populated. Tables exactly match the column order specified in §10 / §11 of the template.

Begin.
