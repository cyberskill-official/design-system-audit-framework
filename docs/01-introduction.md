# 01 — Introduction

## What this framework is

A **125-criterion audit and improvement-plan toolkit** for design systems. It scores a system across 20 categories — 10 covering the system itself (tokens, components, governance, distribution, accessibility, performance, AI/MCP readiness) and 10 covering the UX it produces (research, IA, interaction, content, heuristics, measurement, ethics) — and produces a phased plan to raise the score on the next audit.

It is **vendor-neutral**. It works on a Material-derived system, a Carbon-derived system, a Polaris-derived system, an in-house system built from scratch, or any combination. It does not care what your tokens are named, what framework your components ship in, or what tier of customer you sell to. It cares about whether the right things are documented, measured, and demonstrable.

It is **agent-friendly**. Every section of the audit output is structured so an LLM agent can read, parse, and update it. Sections are stable in order, headings are stable in wording, the YAML frontmatter is machine-readable, and the criteria table is a fixed-column markdown table. The framework treats the agent as a co-auditor, not as an oracle.

It is **honest about its limits**. WCAG self-claims cap at 4/5 until you have a vendor letter. Adoption metrics cap at 3/5 until you have production telemetry. SUS scores cap at 3 until you have real participants. These are not framework flaws — they are the gates the industry already accepts.

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
- A "we are L5 industry-leading" tweet.

The framework's job is to tell you what you actually have. What you do with that result is up to you.

## How long an audit takes

| Audit shape | Realistic time |
|---|---|
| First-ever audit, doctrine + doctrine only | 4–8 hours |
| First-ever audit, doctrine + implementation | 1–2 days |
| Subsequent audit, mostly DYNAMIC re-score | 1–2 hours |
| Annual full audit with human Co-Auditor calibration | 1–2 days |

These assume you have an LLM agent helping. Without one: roughly 3× longer.

## Reading order if you're new

1. This file (you're here).
2. [`02-framework.md`](./02-framework.md) — modes, actors, scoring, no-downgrade rule.
3. [`05-running-an-audit.md`](./05-running-an-audit.md) — step-by-step playbook.
4. [`07-maturity-tiers.md`](./07-maturity-tiers.md) — what each tier means.
5. [`prompts/scan-mode.md`](../prompts/scan-mode.md) — paste this into your LLM and run your first SCAN.

For the criteria themselves: [`03-criteria-part-a.md`](./03-criteria-part-a.md) (system) and [`04-criteria-part-b.md`](./04-criteria-part-b.md) (UX).

For tailoring the framework to your industry / brand: [`09-customising.md`](./09-customising.md).
