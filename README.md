# DSAF — Design System Audit Framework

> Open-source criteria for auditing design-system maturity, producing a score, and turning the gaps into a phased improvement plan.
> Vendor-neutral, markdown-native, and designed for human reviewers working with LLM agents.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Canonical: dsaf.dev](https://img.shields.io/badge/Canonical-dsaf.dev-1f2a44)](https://dsaf.dev)

Most design-system audits collapse into taste: a senior person reads the docs, spots a few gaps, and writes a deck.
DSAF gives that conversation a shared rubric.
It scores 125 criteria across the system itself and the UX it produces, separates FIXED evidence from DYNAMIC industry standards, and leaves an audit trail a second reviewer can rerun.

Start with [DSAF-25 Core](./docs/dsaf-25.md): the 25 criteria that fit on one page.
Use it for a five-minute first pass, then run the full DSAF Criteria when you need a signed audit.

## Why now

Design systems are becoming operational infrastructure.
They carry accessibility risk, performance budgets, AI-agent rules, contribution policy, and adoption telemetry.
The old "component library plus documentation site" maturity model is too small for that job.

DSAF is intentionally sharper:

- It asks for citations, not vibes.
- It distinguishes system quality from product UX quality.
- It treats agent work as auditable, not magical.
- It allows regressions only when they are visible, explained, and approved.
- It caps public self-audit claims until third-party verification exists.

## How it differs

| Common approach | DSAF |
|---|---|
| Slide-deck maturity model | Markdown audit report with stable sections and score rows |
| One combined score as a marketing claim | Per-category shape, DSAF Levels, and a self-audit cap policy |
| "AI can review it" handwave | Explicit `@Agent` / `@Human` routing and prompt pack |
| Hard rollback rule teams disable | [No-silent-regression](./docs/regression-policy.md): override or rollback, never hide it |
| Full rubric only | [DSAF-25 Core](./docs/dsaf-25.md) for first-pass sharing |

## Quick start

```bash
git clone https://github.com/cyberskill/design-system-audit-framework.git
node design-system-audit-framework/scripts/audit-init.mjs /path/to/your/design-system
cat design-system-audit-framework/prompts/scan-mode.md
```

Point your LLM at:

- [`docs/02-framework.md`](./docs/02-framework.md)
- [`docs/03-criteria-part-a.md`](./docs/03-criteria-part-a.md)
- [`docs/04-criteria-part-b.md`](./docs/04-criteria-part-b.md)
- your design system docs, tokens, source, and prior audit if one exists

The agent produces `audit-report-{date}.md`.
You review §1 to §3, sign §4, then run [`prompts/fix-mode.md`](./prompts/fix-mode.md) if you want the agent to apply approved fixes.

## DSAF-25 Core

The full rubric has 125 criteria.
The public handle is [DSAF-25 Core](./docs/dsaf-25.md), a stable subset that covers every major category:

- Foundations, tokens, components, docs, governance, tooling, theming, adoption, accessibility, performance, AI-readiness
- Research, IA, interaction, visual hierarchy, inclusive design, content, heuristics, Core Web Vitals, trust, UX metrics

Assets:

- [One-page markdown card](./docs/dsaf-25-card.md)
- [Printable SVG](./assets/dsaf-25-card.svg)
- [Level ladder SVG](./assets/dsaf-level-ladder.svg)
- [Radar chart SVG](./assets/dsaf-radar-chart.svg)

## The full DSAF Criteria

### Part A: Design system

`A.1` Foundations & Tokens · `A.2` Component Library · `A.3` Documentation · `A.4` Governance · `A.5` Tooling & Distribution · `A.6` Cross-platform & Theming · `A.7` Adoption & Metrics · `A.8` Accessibility · `A.9` Performance & DX · `A.10` AI / Emerging Tech

### Part B: UX

`B.1` Research · `B.2` IA & Navigation · `B.3` Interaction · `B.4` Visual Design · `B.5` Accessibility & Inclusive · `B.6` Content Design · `B.7` Heuristics · `B.8` Core Web Vitals · `B.9` Trust & Privacy · `B.10` Measurement

The criteria live in [`docs/03-criteria-part-a.md`](./docs/03-criteria-part-a.md) and [`docs/04-criteria-part-b.md`](./docs/04-criteria-part-b.md).

## Maturity levels

| Level | Combined score | Meaning |
|---|---:|---|
| L0 Initial | < 40% | Ad-hoc, project-by-project |
| L1 Repeatable | 40-55% | Some reusable patterns |
| L2 Defined | 55-65% | Documented, named owners, basic tokens |
| L3 Managed | 65-75% | Versioned, CI-aware, telemetry starting |
| L4 Managed advanced | 75-85% | Multi-platform, governed, measured |
| L5 Optimised | 85%+ | Externally validated, community-proven, AI-native |

Published self-audits cap at L3 without third-party verification.
See the [self-audit publication policy](./docs/branding/self-audit-policy.md).

## What is in the repo

- `docs/` — methodology, criteria, maturity levels, customization, feature-request specs
- `templates/` — audit report, improvement plan, recommendation cards, history register
- `prompts/` — SCAN, FIX, research, and planning prompts
- `scripts/` — zero-dependency checks for links, coverage, contrast, bundle size, doc freshness, and integration readers
- `assets/` — DSAF-25 card, Level ladder, and radar SVGs
- `examples/cyberskill-design-system/` — a worked L3 self-audit example with interior scores preserved for learning

## External review status

DSAF will publish named outside-reviewer quotes only after explicit written consent is logged.
The reviewer outreach materials are in [`docs/branding/reviewer-outreach.md`](./docs/branding/reviewer-outreach.md), and the shortlist/status tracker is in [`docs/branding/reviewer-shortlist.md`](./docs/branding/reviewer-shortlist.md).
No quote is fabricated or implied before consent.

## Maintained by

DSAF is maintained by Stephen Cheng and CyberSkill as the original authoring practice.
The co-maintainer role charter is published in [`docs/governance/co-maintainer-charter.md`](./docs/governance/co-maintainer-charter.md); candidates are not publicly attributed until written acceptance.

## Contributing

Read [`CONTRIBUTING.md`](./CONTRIBUTING.md).
Small edits can open a PR directly.
Substantive criterion changes need an issue first.
Architecture changes use the governance/RFC path.

Translations are welcome; see [`docs/i18n/good-first-issues.md`](./docs/i18n/good-first-issues.md).

## Commercial work

The DSAF repo is free and self-serve.
CyberSkill's commercial audit and implementation services are documented separately in [`SERVICES.md`](./SERVICES.md) so the methodology surface stays neutral.

## License

[MIT](./LICENSE).
Use it commercially, adapt it, and run it against competitors' systems.
Attribution is appreciated.

*Built by CyberSkill. Public methodology, neutral URL, reusable rubric.*
