# Case study: CyberSkill Design System

> The original system this audit framework was built against. The framework is here because of the audit; the audit is here because of the framework — they shipped together.

## Snapshot

| Metric | Value |
|---|---|
| Initial audit | 2026-04-26 (baseline) |
| Latest audit | 2026-04-27 (rigorous Mode S) |
| Pre-audit combined | **74.7%** → L4 Managed |
| Post-audit combined | **84.6%** → L5 Optimised |
| Delta | **+9.9 pp** in one development cycle |
| Enterprise-grade thresholds | **7 / 7 pass** |
| FIXED-criterion regressions | **0** |
| Recommendation cards from baseline | **8 / 8 closed** |

## What's in this folder

| File | Description |
|---|---|
| [`audit-report-2026-04-27.md`](./audit-report-2026-04-27.md) | The full Mode S audit. 138 criterion-rows, citations per criterion, machine-readable §10 / §11 tables, full SCAN flow signed off. |
| [`improvement-plan.md`](./improvement-plan.md) | Phase 6 → Phase 8 step-by-step plan to push the score from 84.6% to ~95%. No calendar dates; each step has a "done when" condition. |
| [`_history.md`](./_history.md) | Audit history register — two rows so far, plus phase-milestone log of the work that landed between them. |

## What changed between 2026-04-26 and 2026-04-27

In one calendar day, ~30 person-weeks of compressed work landed (paired with an LLM agent under tight founder supervision):

- **Phase 1 — doctrine patches** (audit-driven): Shneiderman additions, HEART formalisation, ResearchOps 8-pillar, mode-aware elevation tokens, variable-font axes, cognitive-accessibility expansion, RFC template tree-test row.
- **Phase 2 — multi-package monorepo + tooling**: 11 npm packages (`@cyberskill/{tokens, primitives, web-components, react, vue, svelte, react-native, theme-generator, mcp-server, codemods, spatial}`) + 8 zero-dep check scripts + GitHub Actions CI gates.
- **Phase 3 — industry-leadership signals**: MCP server v2 (read+write, 9 tools), Code Connect bindings, codemods (Material/Polaris/Carbon → CyberSkill), open-source quartet (LICENSE + CONTRIBUTING + CODE_OF_CONDUCT + SECURITY), HR Tech vertical pack, conference talk abstracts.
- **Phase 4 — first-product migration + readiness**: wiki SPA token migration (24% → 85% coverage), spatial primitives (6 components with 2D fallback), WCAG 3.0 readiness assessment, 15-locale expansion plan.
- **Phase 5 — locale stubs + APCA + audit infra**: 4 cohort-1 locale microcopy stubs, APCA contrast helper script (8/8 canonical pairings pass WCAG 3.0 floor), annual audit runbook.

Biggest movers in the resulting audit:
- A.10 AI / Emerging Tech: **+27.0 pp** (MCP, Code Connect, codemods, theme-generator, AI-assisted PR review, spatial)
- A.9 Performance & DX: **+23.7 pp** (bundle-size CI gate, CDN build, doc-freshness gate, framework agnosticism)
- A.5 Tooling & Distribution: **+19.7 pp** (CI workflows, multi-platform tokens, R2 CDN spec)
- B.5 Accessibility & Inclusive: **+12.5 pp** (APCA helper, locale stubs, WCAG 3.0 readiness, trauma-informed patterns)

## How to use this case study

If you're auditing a system that's currently at L3 / L4, the [`audit-report`](./audit-report-2026-04-27.md) is a worked example of:

- How to structure the single-file output.
- How to cite evidence per criterion.
- How to compute the delta vs a parent audit.
- How to declare the no-downgrade gate cleanly.
- How to surface industry research alongside the score.

If you're at L4 trying to break into L5, the [`improvement-plan`](./improvement-plan.md) shows what kind of phase plan unlocks L5 — and what doesn't.

## Honest caveats

This case study is the system that the framework was built *against*. The audit and the framework co-evolved. A truly external test of the framework happens when a different design system is audited against this rubric and produces an honest score. The framework's `examples/` directory will grow to hold those external case studies as community forks land — see the framework's [`CONTRIBUTING.md`](../../CONTRIBUTING.md).

The 84.6% combined score also reflects intentional ceilings:

- A.7 Adoption (63.3%) caps until the wiki SPA is publicly deployed.
- B.8 Core Web Vitals caps at 3 until production traffic measures real LCP/INP/CLS.
- A.8.6 WCAG audit caps at 4 until vendor signature lands.

These aren't framework flaws — they're the framework being honest about the difference between "documented" and "validated".

---

## Want this kind of audit on your design system?

CyberSkill offers paid audits using this framework — same methodology, same calibration discipline, run by the framework's authors. We deliver in 5–10 business days; the deliverable is a signed audit report + phased improvement plan + optional public case study with your logo.

See [`SERVICES.md`](../../SERVICES.md) for the four service tiers (audit / implementation / maintenance / vertical packs), or email **info@cyberskill.world** with subject **"Audit scoping call"** for a free 30-minute conversation.

The framework alone is free. Most teams won't need us — and that's exactly the point. When self-serve isn't enough, we're here.

---

*The CyberSkill Design System and this audit framework are both maintained by [CyberSkill](https://cyberskill.world). Hiện Thực Hoá Ý Chí — Turn Your Will Into Real.*
