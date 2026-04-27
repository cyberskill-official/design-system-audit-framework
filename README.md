# Design System Audit Framework

> An open-source framework for auditing a design system's maturity and producing a phased improvement plan. Vendor-neutral. Zero dependencies. Pairs with any LLM that can read markdown.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Maturity: L5](https://img.shields.io/badge/Self--audit-L5%20Optimised-green)](./examples/cyberskill-design-system/audit-report-2026-04-27.md)

Built and maintained by [CyberSkill](https://cyberskill.vn) — extracted from the audit framework that took the CyberSkill design system from L4 Managed (74.7%) to L5 Optimised (84.6%) in one development cycle.

---

## What this is

A 125-criterion framework for scoring a design system across **20 categories** spanning the system itself (tokens, components, governance, distribution, accessibility, performance, AI/MCP readiness) and the UX it produces (research, IA, interaction, content, heuristics, measurement, ethics).

Every audit produces **one file**: `audit-report-{date}.md` — human-readable and machine-parseable, with a fixed section structure that LLM agents key off.

The framework distinguishes:

- **FIXED criteria** (objective rubric — token format, contrast ratio, semver discipline) that cannot drift over time.
- **DYNAMIC criteria** (industry standards that evolve — WCAG 3.0, DTCG, MCP, APCA) that are rescored quarterly.
- **`@Agent` work** (autonomous: scoring, doc patches, lint runs) versus **`@Human` work** (manual: deploys, vendor procurement, user studies).

The audit flow has two modes (`SCAN` and `FIX`) connected by a human-pause review point, and a **no-downgrade rule** that hard-gates regressions: any FIXED criterion below its baseline score triggers an automatic rollback.

---

## Why audit a design system

Most design systems have one of three failure modes:

1. **Doctrine without telemetry** — beautiful documentation, no idea what's actually adopted.
2. **Telemetry without doctrine** — coverage dashboards on top of an under-specified system.
3. **Both, but stuck at L3 / L4** — measurable, governed, but never crosses into industry-leading.

This framework forces all three into the same scoring grid. You can't fake a score without leaving a citation trail. You can't drift on a FIXED criterion without it surfacing as an alarm. And the improvement plan is structured so each phase has measurable lift on the next audit.

---

## Quickstart (5 minutes)

```bash
# 1. Clone or fork this repo into a sibling of your design system
git clone https://github.com/cyberskill/design-system-audit-framework.git

# 2. Initialize an audit folder in your design system repo
node design-system-audit-framework/scripts/audit-init.mjs /path/to/your/design-system

# 3. Open the SCAN-mode prompt and paste it into Claude / Cursor / Copilot
cat design-system-audit-framework/prompts/scan-mode.md

# 4. Point the LLM at:
#    - design-system-audit-framework/docs/02-framework.md  (the rules)
#    - design-system-audit-framework/docs/03-criteria-part-a.md
#    - design-system-audit-framework/docs/04-criteria-part-b.md
#    - your design system's docs and source

# 5. The LLM produces audit-report-{today}.md following the template
#    Review §3 findings, sign off in §4, then run the FIX-mode prompt
```

For a complete worked example: see [`examples/cyberskill-design-system/`](./examples/cyberskill-design-system/).

---

## What this framework gives you

| You start with | You end with |
|---|---|
| A design system that "feels mature" but has no measurable score | A 125-criterion score, an L0–L5 tier, and a list of every gap with citation |
| A wishlist of improvements written by gut feel | A phased improvement plan where each step has a "done when" condition + estimated audit lift |
| LLM agents that hallucinate token names and contrast ratios | A rules file the agents key off, with hard constraints they refuse to violate |
| Annual quality drift you only notice when a customer complains | A trend register where every FIXED-criterion regression is an alarm |

---

## Maturity tiers

| Tier | Combined score | Meaning |
|---|---|---|
| L0 Initial | < 40% | Ad-hoc; everything is project-by-project |
| L1 Repeatable | 40–55% | Some patterns reused, no governance |
| L2 Defined | 55–65% | Documented, named owners, basic tokens |
| L3 Managed | 65–75% | Versioned, CI gates, telemetry exists |
| L4 Managed | 75–85% | Multi-platform, governance discipline, accessibility |
| L5 Optimised | 85%+ | Industry-leading, measured, AI-native, externally validated |

Enterprise-grade thresholds (every category) and the no-downgrade rule sit *inside* these tiers — see [`docs/07-maturity-tiers.md`](./docs/07-maturity-tiers.md).

---

## The 20 categories

### Part A — Design System (10 categories, 63 criteria)

`A.1` Foundations & Tokens · `A.2` Component Library · `A.3` Documentation · `A.4` Governance · `A.5` Tooling & Distribution · `A.6` Cross-platform & Theming · `A.7` Adoption & Metrics · `A.8` Accessibility · `A.9` Performance & DX · `A.10` AI / Emerging Tech

### Part B — UX (10 categories, 62 criteria)

`B.1` User Research · `B.2` IA & Navigation · `B.3` Interaction Design · `B.4` Visual Design · `B.5` Accessibility & Inclusive · `B.6` Content Design · `B.7` Heuristic Compliance · `B.8` Performance & CWV · `B.9` Trust, Privacy & Ethics · `B.10` Measurement

Per-criterion rubrics with 0 / 3 / 5 anchors are in [`docs/03-criteria-part-a.md`](./docs/03-criteria-part-a.md) and [`docs/04-criteria-part-b.md`](./docs/04-criteria-part-b.md).

---

## How agents and humans share the work

The audit flow is a state machine:

```
BASELINE  →  RESEARCH  →  FINDINGS  →  AWAITING_REVIEW  ⏸  →  FIXING  →  VERIFYING  →  RE_AUDIT  →  SIGNED
                                              ↑                                            │
                                              └─── ROLLBACK if any score regression ───────┘
```

| Stage | Mode | Owner | What happens |
|---|---|---|---|
| Baseline | SCAN | `@Agent` | Re-score 125 criteria from current state, cite evidence |
| Research | SCAN | `@Agent` | Web-search for new / updated standards (WCAG, DTCG, APCA, MCP, …) |
| Findings | SCAN | `@Agent` | Enumerate gaps, route each to `@Agent[fix]` or `@Human[manual]` |
| Sign-off ⏸ | SCAN | `@Human` | Approve / reject / defer each finding (the pause point) |
| Fix plan | FIX | `@Agent` | Sequence approved fixes, declare rollback paths |
| Execution | FIX | `@Agent` | Run each fix, log result |
| Verification | FIX | `@Agent` | Run check scripts, confirm no regression (hard gate) |
| Re-audit | FIX | `@Agent` | Refresh scores, recompute combined |
| Sign-off | FIX | `@Human` | Final approval, append to history register |

Detail in [`docs/02-framework.md`](./docs/02-framework.md) and [`docs/06-fix-cycle.md`](./docs/06-fix-cycle.md).

---

## What's in the box

- **Framework docs** — 10 markdown files defining the scoring, the runbook, and how to customise.
- **Templates** — single-file audit report, improvement plan, recommendation cards, history register.
- **Prompt pack** — 4 LLM prompts (SCAN, FIX, research, plan) you paste into Claude / Cursor / Copilot.
- **Scripts** — 5 zero-dependency check scripts (token coverage, bundle size, doc freshness, APCA contrast, AI rules-file generator) plus an audit-folder scaffolder.
- **Example** — the CyberSkill design system audit at L5 Optimised, reproducible with the framework.

---

## Customisation

The framework is opinionated but adaptable. See [`docs/09-customising.md`](./docs/09-customising.md) for:

- How to weight categories differently for your industry (HR Tech, Fintech, Healthcare, etc.).
- How to swap or extend criteria.
- How to encode your brand's anchor immutables.
- How to add vertical-specific check scripts.

Forks for specific industries are encouraged — open a PR and we'll list yours under "community forks".

---

## Limitations

The framework is honest about what it can't do:

1. **No third-party audit replacement.** A WCAG 2.2 AA *self-claim* ≠ an independent audit. The framework caps WCAG criteria at 4/5 until you have a vendor's signed letter.
2. **No telemetry without deployment.** Several criteria (Core Web Vitals, adoption metrics, retention) require real production traffic. They cap at 3/5 until you have it.
3. **No replacement for human research.** Tree tests, usability sessions, and SUS surveys still need real participants. The framework caps these criteria at 3 with templates only.

These are not framework flaws — they are the actual gates between "documented" and "validated".

---

## Who's using it

- **CyberSkill Design System** — the original; L5 Optimised at 84.6% combined score. [Case study](./examples/cyberskill-design-system/).
- _(your project here — open a PR to add it)_

---

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md). The framework is opinionated; the criteria are not sacred. PRs welcome to:

- Tighten or relax rubric anchors as industry standards shift.
- Add new criteria (especially for emerging areas: spatial computing, agentic UX, sustainability).
- Improve the LLM prompt pack.
- Translate docs into other languages.
- Submit your own audit as a case study.

The framework is governed by a public RFC process. See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the proposal flow.

---

## Licence

[MIT](./LICENSE). Use it commercially. Use it on competitors' systems. Use it as the basis for a paid audit service. The only ask is attribution.

---

*Built by [CyberSkill](https://cyberskill.vn). Hiện Thực Hoá Ý Chí — Turn Your Will Into Real.*
