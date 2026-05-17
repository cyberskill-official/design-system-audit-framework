# DSAF — Glossary

**Status:** normative; aligned with FR-BRAND-002 handle taxonomy.
**FR:** FR-BRAND-002.
**Scope:** the canonical terms used throughout DSAF doctrine. New terms get added here on coining; deprecated terms are kept with a `[deprecated]` tag and the replacement.

## Brand terms (see [`handle-taxonomy.md`](handle-taxonomy.md) for usage rules)

- **DSAF** — the brand. All-caps, no period. Default handle after first mention.
- **Design System Audit Framework** — the long name, used once per surface at first mention. Disambiguation only; never repeated in the same document.
- **DSAF Criteria** — the 125 criteria (Part A + Part B), as a proper noun. The full rubric.
- **DSAF-25 Core** — the one-page Core subset of 25 criteria (post-FR-CORE-001). The shareable first-pass card.
- **DSAF Levels** — the L0 → L5 maturity scale, as a proper noun. Individual levels are written `L0` … `L5` (capital L, digit, no space).
- **DSAF Modes** — the audit-flow modes: `SCAN mode` (baseline + research + findings), `FIX mode` (plan + execute + verify + re-audit), `W mode` (Mode W — website-without-DS reverse-engineering audit, post-FR-CORE-005).

## Methodology terms

- **Combined score** — the weighted average of Part A% and Part B% (each weighted 0.5). Reported as a percentage, 0–100. Never the lead public claim per the self-audit policy.
- **Category** — a group of criteria within Part A or Part B. Twenty categories total in the current version (subject to consolidation per FR-CORE-003).
- **Criterion** — a single scored item in the DSAF Criteria. Each criterion has an ID (e.g., `A.1.1`), a scale anchor (0–5), and a FIXED/DYNAMIC tag.
- **FIXED** — a criterion whose rubric is anchored against an objective state of the world; subject to the no-silent-regression rule (FR-CORE-002). FIXED regressions always require an override or rollback.
- **DYNAMIC** — a criterion whose rubric is anchored against an evolving industry standard (WCAG version, DTCG schema, MCP spec); rescored quarterly even when the system doesn't change.
- **Confidence** — `Hi` / `Med` / `Lo` rating on every score. More than 25% `Lo` confidence triggers a refusal to ship the audit.
- **No-silent-regression rule** — the integrity rule that replaces the v1 no-downgrade rule per FR-CORE-002. A FIXED criterion can regress, but only with an explicit override comment naming the cause; silent regression is detected and refused. Long-form: [`docs/regression-policy.md`](../regression-policy.md).
- **Enterprise-grade** — a system passing every floor in the enterprise-grade-threshold table (combined ≥ 65%, A.8 ≥ 75%, B.5 ≥ 75%, A.1 ≥ 70%, A.4 ≥ 60%, A.3 ≥ 65%, no category < 40%).

## Actor terms

- **`@Agent`** — the LLM agent doing autonomous work (scoring, research, doc patches, lint runs, verification).
- **`@Human`** — the human doing decisions, manual work, sign-off, and rollback.
- **Action tags** — inline tags on findings: `@Agent[fix]`, `@Agent[research]`, `@Human[decide]`, `@Human[approve]`, `@Human[manual]`, `@Human[rollback]`.

## Mode handles

- **`SCAN mode`** — measure current state; populate §1–§3 of the audit report; pause at §4 for human review. Written as `SCAN mode` (handle all-caps, "mode" lowercase) in body prose; written as `SCAN` (handle only) in code identifiers and tables.
- **`FIX mode`** — apply approved fixes; populate §5–§8 of the audit report; submit at §9. Written conventions match `SCAN mode`.
- **`W mode`** (post-FR-CORE-005, P5) — reverse-engineer a website without a DS; output a starter-spec (Figma file + tokens.json + governance template). Written conventions match `SCAN mode`.

## Approved-vs-banned quick reference

| Approved | Banned | Why |
|---|---|---|
| `DSAF` | `the DSAF Framework` | Repeats "framework" |
| `DSAF` | `DSAF framework` | Lets "framework" creep into the handle |
| `DSAF` | `the framework` (when referring to DSAF) | Vague abstraction |
| `DSAF` | `CyberSkill framework` / `CyberSkill audit framework` | Tangled brand ownership |
| `DSAF Levels` plus per-category roll-up | standalone combined % as a public headline | Single-score marketing is banned |
| `L3 self-audit, uncertified` | `L5 self-audit` (unverified) | Self-audits cap publicly without verification |
| `CyberSkill worked example` | "CyberSkill proves DSAF reaches L5" | Worked example is not a proof claim |
| `DSAF Criteria` | `the criteria` (referring to the 125) | Use the proper noun |
| `DSAF Modes` | `the modes` (referring to SCAN / FIX) | Use the proper noun |
| `DSAF-25 Core` | `DSAF 25`, `DSAF Lite`, `DSAF Mini`, `DSAF Core` (no digit) | Hyphen + digit are the share-handle |

## Copy rules

1. Use the long name `Design System Audit Framework` once per surface, then `DSAF`.
2. Use `DSAF Criteria` for the 125-row rubric.
3. Use `DSAF Levels` for the L0–L5 maturity scale.
4. Use `DSAF-25 Core` for the one-page card.
5. Do not use CyberSkill as the grammatical owner of DSAF (e.g., never "CyberSkill's framework").
6. Do not use a combined percentage as the primary public claim.
7. Do not capitalise `Framework` as a noun-handle.

## Examples

| Good | Bad |
|---|---|
| `DSAF scores design-system maturity across 125 criteria.` | `The DSAF Framework scores design-system maturity.` |
| `Run DSAF-25 Core first, then the full DSAF Criteria.` | `Run the lightweight version of the framework.` |
| `CyberSkill maintains the worked example.` | `CyberSkill proves DSAF reaches L5.` |
| `Self-audits cap publicly at L3 until third-party verification.` | `We're at L5 on the framework.` |

## Deprecated terms

- **the DSAF framework** [deprecated] → use `DSAF` or `DSAF Criteria` / `DSAF Levels` depending on what you mean.
- **the framework's tiers** [deprecated] → use `DSAF Levels` (proper noun) or `the L0–L5 tiers` (common noun, in tables only).
- **DSAF Lite** [deprecated, never shipped] → use `DSAF-25 Core`.
- **DSAF maturity model** [deprecated] → use `DSAF Levels` (the maturity scale) and `DSAF` (the brand). "Maturity model" is fine as a generic descriptor but never capitalised as a noun-handle.
- **standalone combined percentage as a headline** [deprecated] → use `DSAF Level` plus radar/category roll-up.

## Adding a term

PRs that coin a new DSAF-specific term MUST add the term here in the same PR. Generic terms (WCAG, DTCG, MCP, CMM, ITIL, BCP-14) are not DSAF-owned and live in their respective sources; we don't re-define them.

*End of glossary.*
