# DSAF — Design System Audit Framework

> Open-source criteria for auditing design-system maturity, producing scored evidence, and turning gaps into a phased improvement plan.
> Vendor-neutral, markdown-native, and designed for human reviewers working with LLM agents.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Canonical: audit.cyberskill.world](https://img.shields.io/badge/Canonical-audit.cyberskill.world-1f2a44)](https://audit.cyberskill.world)

DSAF is a 125-criterion, agent-native, CMM-style maturity rubric for design systems. It helps teams inspect tokens, components, documentation, governance, accessibility, performance, AI readiness, and the UX quality their system produces.

Why now: design systems have become operational infrastructure. They carry accessibility risk, release policy, performance budgets, contribution paths, adoption telemetry, and AI-agent rules. The commercial platforms zeroheight, Knapsack, and Supernova help teams operate systems, but there is still room for an open-source, criteria-graded maturity rubric that can live in a repository. How it differs: Compared with SaaS platforms, DSAF is plain markdown plus scripts; compared with Brad Frost's frontend-guidelines-questionnaire, it produces scored evidence, DSAF Levels, SCAN/FIX modes, a no-silent-regression record, and a maximal enterprise loop for direct files or public URLs.

Read [`framework/dsaf-25.md`](./framework/dsaf-25.md) first if you only have 5 minutes. The full DSAF Criteria live in [`framework/03-criteria-part-a.md`](./framework/03-criteria-part-a.md) and [`framework/04-criteria-part-b.md`](./framework/04-criteria-part-b.md).

<picture>
  <source srcset="./framework/assets/dsaf-l0-l5-ladder-dark.svg" media="(prefers-color-scheme: dark)">
  <img src="./framework/assets/dsaf-l0-l5-ladder.svg" alt="DSAF Levels ladder from L0 Initial to L5 Optimised" width="100%">
</picture>

<picture>
  <source srcset="./framework/assets/dsaf-radar-dark.svg" media="(prefers-color-scheme: dark)">
  <img src="./framework/assets/dsaf-radar.svg" alt="DSAF radar chart showing Part A design-system categories and Part B UX categories" width="100%">
</picture>

## Quick Start

```bash
git clone https://github.com/cyberskill-official/design-system-audit-framework.git
cd design-system-audit-framework
npm install
npm run verify
node framework/scripts/bin/audit-init.mjs /path/to/your/design-system
```

Then open [`prompts/scan-mode.md`](./guidelines/prompts/scan-mode.md), paste it into your LLM agent, and point the agent at the target system plus the framework docs.

## What DSAF Produces

| Output | Where | Purpose |
|---|---|---|
| DSAF-25 Core | [`framework/dsaf-25.md`](./framework/dsaf-25.md) | Five-minute first pass for leaders, PMs, and system owners. |
| DSAF Criteria | [`framework/03-criteria-part-a.md`](./framework/03-criteria-part-a.md), [`framework/04-criteria-part-b.md`](./framework/04-criteria-part-b.md) | Canonical 125-row rubric across system quality and produced UX quality. |
| DSAF Modes | [`framework/02-framework.md`](./framework/02-framework.md), [`prompts/`](./guidelines/prompts) | SCAN/FIX modes, human pause, action routing, and no-silent-regression rules. |
| DSAF Levels | [`framework/07-maturity-tiers.md`](./framework/07-maturity-tiers.md) | L0-L5 maturity interpretation, enterprise-grade floors, and self-audit cap policy. |
| Audit template | [`templates/audit-report-template.md`](./framework/templates/audit-report-template.md) | Single-file report shape for ordinary DSAF audits. |
| Maximal enterprise benchmark | [`framework/bench/maximal-enterprise-benchmark.md`](./framework/bench/maximal-enterprise-benchmark.md) | 371-row AUTO/MANUAL table for strict file and URL audits. |
| File/URL runner | [`scripts/bin/maximal-audit.mjs`](./framework/scripts/bin/maximal-audit.mjs) | Creates `ANALYZED_DESIGN_REPORT.md` and `IMPROVED_DESIGN.md`. |
| Verification scripts | [`scripts/`](./framework/scripts) | Link, coverage, bundle, freshness, APCA, regression, visual, and contract checks. |
| Complete L3 self-audit example | [`examples/cyberskill-design-system/`](./framework/examples/cyberskill-design-system) | Worked example with audit history preserved. |
| Public site | [`landing/`](./internal/landing) | Static site for [`audit.cyberskill.world`](https://audit.cyberskill.world). |

## Core Audit Workflow

1. Prepare the target repo or docs folder with doctrine, tokens, component docs, Storybook or equivalent, accessibility reports, release notes, adoption data, and prior audits if available.
2. Run `node framework/scripts/bin/audit-init.mjs /path/to/your/design-system`.
3. Paste [`prompts/scan-mode.md`](./guidelines/prompts/scan-mode.md) into your LLM agent.
4. Review the generated `audit-report-{YYYY-MM-DD}.md`.
5. A human reviewer approves, rejects, or defers findings in section 4.
6. Paste [`prompts/fix-mode.md`](./guidelines/prompts/fix-mode.md) only after the human pause is complete.
7. Re-run checks, update scores, and sign the report.

The pause between SCAN and FIX is not ceremony. It is how DSAF prevents an agent from silently changing a system before the owner accepts the finding.

## Maximal Enterprise File And URL Audits

For stricter audits, use the maximal enterprise runner. It supports both direct file input and public URL input:

```bash
npm run audit:maximal -- --input /path/to/DESIGN.md --out outputs/generated/my-file-case
npm run audit:maximal -- --input https://design-system.service.gov.uk/ --out outputs/generated/govuk-url-case --max-pages 8
npm run audit:maximal:cases
npm run check:maximal:cases
```

Each case directory contains exactly:

| File | Contents |
|---|---|
| `ANALYZED_DESIGN_REPORT.md` | Scores, scan metadata, full enterprise criterion table, evidence, citations, suggestions, crawler caveats, and source reference appendix. |
| `IMPROVED_DESIGN.md` | Standalone improved doctrine. For file inputs, the full source doctrine is preserved after the applied AUTO requirements. For URL inputs, the crawled public corpus is preserved after the suggested doctrine. |

The maximal table currently covers 371 criteria: the 125 canonical rows, 30 strict proof-loop rows, and 216 large-enterprise expansion rows. Every row has `Type = AUTO` or `Type = MANUAL`, so users can distinguish what a script or source edit can improve from what needs human evidence.

Generated outputs do not contain commercial strategy. The public methodology surface stays neutral; commercial service planning belongs in [`internal/strategy/framework-monetization-plan.md`](./internal/strategy/framework-monetization-plan.md).

## Verification

Run the repo gate before pushing:

```bash
npm run verify
```

Useful focused checks:

```bash
npm run check:links
npm run check:doc-freshness
npm run check:apca
npm run test:criteria-dedup-contract
npm run contract:criteria-dedup
npm run test:dsaf-25-contract
npm run contract:dsaf-25
npm run test:regression-contract
npm run contract:regression
npm run test:visual-assets-contract
npm run contract:visual-assets
npm run contract:readme
npm run check:maximal:cases
```

The maximal case checker requires 20 real cases and 40 outputs: 10 direct `DESIGN.md` cases and 10 public URL cases.

## Local Site

The public site is static:

```bash
python3 -m http.server 4173 -d landing
```

Open `http://localhost:4173/` and check `/`, `/card`, `/blog/launch-2026`, `robots.txt`, `sitemap.xml`, and `/.well-known/security.txt`.

## Reading Order

| # | File | Purpose |
|---|---|---|
| 1 | [`guidelines/01-introduction.md`](./guidelines/01-introduction.md) | Extended introduction, audience, and output shape. |
| 2 | [`framework/02-framework.md`](./framework/02-framework.md) | Modes, actors, scoring, and no-silent-regression. |
| 3 | [`framework/dsaf-25.md`](./framework/dsaf-25.md) | DSAF-25 Core, the one-page entry point. |
| 4 | [`guidelines/05-running-an-audit.md`](./guidelines/05-running-an-audit.md) | Step-by-step audit workflow. |
| 5 | [`framework/07-maturity-tiers.md`](./framework/07-maturity-tiers.md) | DSAF Levels and enterprise-grade floors. |
| 6 | [`prompts/scan-mode.md`](./guidelines/prompts/scan-mode.md) | Paste this into your LLM for SCAN mode. |
| 7 | [`guidelines/08-improvement-plan.md`](./guidelines/08-improvement-plan.md) | Turn findings into a phased improvement plan. |

## Maturity Levels

| Level | Combined score | Meaning |
|---|---:|---|
| L0 Initial | < 40% | Ad-hoc, project-by-project. |
| L1 Repeatable | 40-55% | Some reusable patterns. |
| L2 Defined | 55-65% | Documented, named owners, basic tokens. |
| L3 Managed | 65-75% | Versioned, CI-aware, telemetry starting. |
| L4 Managed advanced | 75-85% | Multi-platform, governed, measured. |
| L5 Optimised | 85%+ | Externally validated, community-proven, AI-native. |

Published self-audits cap at L3 without third-party verification. See the [self-audit publication policy](./internal/branding/self-audit-policy.md).

## Integrations

| Integration | Command | Notes |
|---|---|---|
| Storybook | `npm run integ:storybook -- --input path/to/storybook-static` | Reads static Storybook output when available. |
| Tokens Studio | `npm run integ:tokens -- --input path/to/tokens.json` | Validates token exports and reports structural issues. |
| Zeroheight | `npm run integ:zeroheight -- --input path/to/zeroheight-export.html` | Reads exported docs surfaces for audit evidence. |
| CLI package | `npm run test:cli` and `npm run integ:cli` | Exercises the repo-local CLI package. |

## Governance

DSAF is maintained in the open.

| Maintainer | Role | Bio |
|---|---|---|
| Stephen Cheng | Founder and original maintainer | Vietnam-based founder of CyberSkill; accountable for the original rubric, examples, launch materials, and repository stewardship. |
| Co-maintainer seat | Open, FR-GOV-002 | The role charter is published in [`internal/governance/co-maintainer-charter.md`](./internal/governance/co-maintainer-charter.md). Candidates are not publicly attributed until written acceptance and co-signed announcement. |

Substantive criteria changes should open an issue first. Architecture changes use the governance/RFC path. Translation work starts with [`guidelines/i18n/good-first-issues.md`](./guidelines/i18n/good-first-issues.md).

## External Review Status

Named outside-reviewer quotes are not published until explicit written consent is logged. The outreach materials are in [`internal/social/reviewer-outreach-playbook-and-templates.md`](./internal/social/reviewer-outreach-playbook-and-templates.md), the shortlist is in [`internal/branding/reviewer-shortlist.md`](./internal/branding/reviewer-shortlist.md), and the consent log is in [`internal/branding/reviewer-consent-log.md`](./internal/branding/reviewer-consent-log.md).

> "<endorsement quote, <= 280 chars>" — <Reviewer Name>, <Affiliation>

> "<endorsement quote, <= 280 chars>" — <Reviewer Name>, <Affiliation>

These slots are placeholders for FR-DOCS-002. Do not replace them with invented praise.

## Commercial Work

The repo is free and self-serve. CyberSkill's commercial audit and implementation services are documented separately in [`framework-monetization-plan.md`](./internal/strategy/framework-monetization-plan.md) so the methodology surface stays neutral.

## Contributing

Read [`CONTRIBUTING.md`](./guidelines/CONTRIBUTING.md). Small edits can open a PR directly; larger changes should include rationale, affected criteria, expected verification, and migration notes for existing audits.

## License

[MIT](./LICENSE). Use it commercially, adapt it, and run it against competitors' systems. Attribution is appreciated.

*Built by CyberSkill. Public methodology, stable URL, reusable rubric.*
