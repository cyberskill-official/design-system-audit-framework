# 01 — Introduction to DSAF

## What DSAF is

A **125-criterion audit and improvement-plan toolkit** for design systems. It scores a system across 20 categories — 10 covering the system itself (tokens, components, governance, distribution, accessibility, performance, AI/MCP readiness) and 10 covering the UX it produces (research, IA, interaction, content, heuristics, measurement, ethics) — and produces a phased plan to raise the score on the next audit.

It is **vendor-neutral**. It works on a Material-derived system, a Carbon-derived system, a Polaris-derived system, an in-house system built from scratch, or any combination. It does not care what your tokens are named, what framework your components ship in, or what tier of customer you sell to. It cares about whether the right things are documented, measured, and demonstrable.

It is **agent-friendly**. Every section of the audit output is structured so an LLM agent can read, parse, and update it. Sections are stable in order, headings are stable in wording, the YAML frontmatter is machine-readable, and the criteria table is a fixed-column markdown table. DSAF treats the agent as a co-auditor, not as an oracle.

The canonical visuals live in `docs/framework/assets/dsaf-l0-l5-ladder.svg` ([link](../framework/assets/dsaf-l0-l5-ladder.svg)) and `docs/framework/assets/dsaf-radar.svg` ([link](../framework/assets/dsaf-radar.svg)). Use the ladder when explaining DSAF Levels; use the radar when explaining per-category audit shape and enterprise thresholds.

It is **honest about its limits**. WCAG self-claims cap at 4/5 until you have a vendor letter. Adoption metrics cap at 3/5 until you have production telemetry. SUS scores cap at 3 until you have real participants. These are not DSAF flaws — they are the gates the industry already accepts.

## Who this is for

- **Design systems leads** running an annual or quarterly audit.
- **Heads of design / engineering** who need a credible answer to "what tier are we at" for a board, customer, or hire.
- **Consultancies** doing third-party audits as a paid service.
- **Practitioners** sanity-checking their own work before a major release.

It is **not** for:

- Picking which design system framework to adopt. (For that, read the system's own docs.)
- Validating a single component. (For that, run a code review or a heuristic eval.)
- Replacing a third-party WCAG audit. (Self-audits cannot certify legal compliance.)

## What you'll produce

A single file: `audit-report-{YYYY-MM-DD}.md`, ~30–40 KB, structured to be both human-readable and machine-parseable. The same file holds your baseline scores, industry-research log, findings, fix plan, fix execution, verification, post-fix scores, and sign-off block. There is no second worksheet, no recommendations folder, no JSON sibling. One file per audit.

You'll also append a row to your audit history register (`_history.md`) — date, mode, agent, operator, signer, scores. Trend analysis happens automatically once you have ≥ 2 audits.

## What you will NOT produce

- Marketing copy.
- A "design maturity model" pitch deck.
- A "we are L5" tweet.

DSAF's job is to tell you what you actually have. What you do with that result is up to you.

## The self-audit publication cap

DSAF's worked example self-audit, in [`examples/cyberskill-design-system/`](../framework/examples/cyberskill-design-system), is published as an L3 (Managed) self-audit.
It is not a claim that CyberSkill's design system is externally verified.
The cap from interior score to published Level is set by the [self-audit publication policy](../internal/branding/self-audit-policy.md): without third-party verification, the publicly cited Level caps at L3.
CyberSkill's interior calculation remains useful calibration data; the cited tier stays L3 until third-party verification is in place.

If you publish a DSAF self-audit, the same cap applies to your published Level.
Internal scores can use the full 0-5 scale per criterion; public headlines cap at L3 unverified, L4 verified, and L5 verified plus the L5 entry-gate stack.

## How long an audit takes

| Audit shape | Realistic time |
|---|---|
| First-ever audit, doctrine + doctrine only | 4–8 hours |
| First-ever audit, doctrine + implementation | 1–2 days |
| Subsequent audit, mostly DYNAMIC re-score | 1–2 hours |
| Annual full audit with human Co-Auditor calibration | 1–2 days |

These assume you have an LLM agent helping. Without one: roughly 3× longer.

## Reading order if you're new

1. [`README.md`](../../README.md) — start here: what DSAF is, the visuals, Quick Start, local run, audit, fine-tuning, verification, and deploy strategy.
2. This file (you're here).
3. [`01-framework-overview.md`](../framework/01-framework-overview.md) — modes, actors, scoring, no-silent-regression rule.
4. [`dsaf-25.md`](../framework/dsaf-25.md) — skim the 25-row Core before reading the full rubric.
5. [`05-running-an-audit.md`](./05-running-an-audit.md) — step-by-step playbook.
6. [`04-maturity-tiers.md`](../framework/04-maturity-tiers.md) — what each tier means.
7. [`prompts/scan-mode.md`](./prompts/scan-mode.md) — paste this into your LLM and run your first SCAN.

For the criteria themselves: [`03-criteria-part-a.md`](../framework/03-criteria-part-a.md) (system) and [`04-criteria-part-b.md`](../framework/04-criteria-part-b.md) (UX).

For tailoring DSAF to your industry / brand: [`09-customising.md`](./09-customising.md).
