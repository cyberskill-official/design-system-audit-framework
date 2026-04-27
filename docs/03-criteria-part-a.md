# 03 — Criteria Part A: Design System (10 categories, 63 criteria)

> Scoring summary: 10 categories, weights total 100%, 63 criteria, max raw score 315.

Every criterion has three rubric anchors:
- **0** — absent or "no evidence the system addresses this"
- **3** — built and shipped
- **5** — industry-leading; measured; externally validated

A criterion may be tagged **FIXED** (objective rubric, cannot drift over time per the no-downgrade rule) or **DYNAMIC** (rescored quarterly as standards evolve).

For genericisation: replace `@your-org/*` with your own npm scope, replace folder paths with whatever your repo uses, and replace doctrine "Part N" references with whatever your doctrine pages are called. The criteria themselves are framework-neutral.

---

## A.1 — Foundations & Design Tokens (Weight: 14%)

**Maps to doctrine:** Foundations · Design Language · Layout & Responsive · the token sources directory.

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| A1.1 | **Color tokens** with primitive→semantic→component layers | FIXED | Hex codes hard-coded throughout | Semantic layer ("text-primary", "background-surface") references primitives | Three-tier architecture; aliases support multi-brand and modes; values are math/HSL-derived. **Benchmark:** IBM Carbon's `interactive-01`; Material 3 role-based color tokens |
| A1.2 | **Typography scale** and type tokens | FIXED | Ad-hoc font sizes | Modular scale, line-height & weight tokenised | Variable-font axes tokenised; fluid + fixed scales; font-feature settings for OpenType. **Benchmark:** Carbon's "fixed" vs "fluid" type sets |
| A1.3 | **Spacing scale** (4 / 8 px geometric) | FIXED | Pixel-pushing | 4-or-8-base scale; named tokens (`space-100` etc.) | Two-tier scale (component vs layout) with documented purpose |
| A1.4 | **Elevation / shadow tokens** | FIXED | Inline shadows | Named elevation tokens (e.g., 0–24) | Light- and dark-mode-aware elevation; surface-blur for glass-style materials |
| A1.5 | **Motion tokens** (duration, easing, springs) | FIXED | None | Productive vs expressive curves tokenised | Spring-physics-based motion supported; reduced-motion alternatives. **Benchmark:** Material 3 Expressive's spring-based motion |
| A1.6 | **Iconography system** | FIXED | Mixed sources | One library, consistent grid, multiple sizes | Variable / multi-color icon system w/ SVG sprite + per-platform export |
| A1.7 | **Grid & layout system** | FIXED | Ad-hoc | Documented columns/gutters/breakpoints | Container queries supported; breakpoint tokens consumable from CSS, iOS, Android |
| A1.8 | **Token format & DTCG conformance** | DYNAMIC | Bespoke JSON or only CSS vars | Tokens exported in a documented JSON | DTCG 2025.10 compliant `.tokens.json` files using `$value`/`$type`/`$description`; multi-file & theming support |
| A1.9 | **Modern color spaces** (OKLCH, P3) | DYNAMIC | sRGB hex only | sRGB + hand-tuned dark mode | OKLCH/P3 tokens; perceptually uniform palettes; algorithmic contrast checks |

---

## A.2 — Component Library (Weight: 13%)

**Maps to doctrine:** Tier-1 primitives, Tier-2 advanced, lifecycle. For implementation audits, also the components directory in `src/`.

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| A2.1 | **Coverage of "Top 20" components** (button, input, select, modal, table, nav, tabs, toast, tooltip, etc.) | FIXED | < 5 components | 15+ components shipped in code | All 50+ enterprise patterns; data viz; AI/chat surfaces. **Benchmark:** Carbon ships 50+; Polaris 2025 unified across surfaces |
| A2.2 | **API consistency** across components | FIXED | Each component invents its props | Shared prop names (`size`, `variant`, `tone`, `disabled`) | Documented prop taxonomy enforced by lint |
| A2.3 | **Composition / slotting** | FIXED | Monolithic black-box components | Compound components with slots | Headless primitives + styled wrappers; Radix-style composition |
| A2.4 | **Variant & state coverage** | FIXED | Default + hover only | Default, hover, focus, active, disabled, error, loading | Plus selected, indeterminate, busy, read-only, success, async; each visualised in Storybook |
| A2.5 | **Headless-primitive option** | DYNAMIC | None | Some accessibility primitives wrapped from Radix/React Aria | First-class headless layer + styled layer (Adobe-style: React Aria + React Spectrum) |
| A2.6 | **Visual regression testing** | DYNAMIC | None | Chromatic / Percy on PRs | Cross-browser, cross-theme, cross-density VRT; baseline approval workflow |

---

## A.3 — Documentation (Weight: 10%)

**Maps to doctrine:** the docs site, content design, every component page.

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| A3.1 | **Usage guidelines per component** | FIXED | Code only | Usage + anatomy + examples | Anatomy diagrams, decision tree for variant choice, content guidance, real product screenshots |
| A3.2 | **Code examples** (live, copy-paste) | FIXED | Static screenshots | Live code blocks | Interactive sandbox + framework-specific examples (React, Vue, Web Components) |
| A3.3 | **Do's / Don'ts** | FIXED | None | Present for top components | For every component, with a11y-specific Do/Don't and content-specific Do/Don't. **Benchmark:** Polaris's 5-section structure |
| A3.4 | **Accessibility notes** per component | FIXED | None | ARIA roles + keyboard table | Plus screen-reader test results, success-criterion mapping, cognitive notes |
| A3.5 | **Contribution guide** | FIXED | None | A `CONTRIBUTING.md` exists | Step-by-step process: RFC template, design crit cadence, PR template, review SLA |
| A3.6 | **Search & navigation** | FIXED | Static sidebar | Full-text search | AI-search / RAG over docs; fast (< 200ms) |
| A3.7 | **Doc freshness signals** | DYNAMIC | None | "Updated on" date | Auto-generated from code; CI fails if a component changes without a doc update; staleness dashboard |

---

## A.4 — Governance & Versioning (Weight: 10%)

**Maps to doctrine:** governance, component lifecycle, change-pipeline / RFC process.

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| A4.1 | **Decision-making model** | FIXED | Ad-hoc | DRI per area | Documented decision framework (e.g., DACI: Driver, Approver, Contributor, Informed) |
| A4.2 | **RFC process** | FIXED | None | Informal proposals | Templated RFCs with publish/discuss/resolve dates; public archive |
| A4.3 | **Semver discipline** | FIXED | Untagged releases | semver MAJOR.MINOR.PATCH used | Semver enforced in CI; breaking-change RFCs required for MAJOR; changesets per package |
| A4.4 | **Deprecation policy** | FIXED | None | "Don't use this" notes | Lifecycle stages (alpha → beta → stable → deprecated → removed); minimum N-version overlap; codemods provided |
| A4.5 | **Contribution model** (closed / federated / open) | FIXED | Closed black box | Internal contribution accepted | Federated model with clear gatekeeping for major contributions, lightweight for minor ones |
| A4.6 | **Roadmap transparency** | DYNAMIC | None | Internal roadmap | Public roadmap with quarter-over-quarter progress |

---

## A.5 — Tooling & Distribution (Weight: 10%)

**Maps to doctrine:** engineering & ops, tooling, AI prompt library.

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| A5.1 | **Figma library** with components, variables, modes | FIXED | None | Figma library with components + auto-layout | Variables w/ light/dark/density modes; library analytics monitored; Code Connect mappings to repo |
| A5.2 | **Code package(s)** distributed via npm | FIXED | Copied source per project | Single npm package | Multiple platform-specific packages (e.g., `@your-org/react`, `@your-org/web-components`, `@your-org/tokens`) |
| A5.3 | **Token pipeline** | DYNAMIC | Hand-edited CSS | Style Dictionary build | Style Dictionary v4+ with first-class DTCG support; multi-platform outputs (CSS, Swift, XML, JS/TS) |
| A5.4 | **Storybook (or equivalent)** | FIXED | None | Storybook hosted | Storybook with a11y, viewport, theme, RTL toggles; play-functions for interaction tests |
| A5.5 | **CI/CD for the system itself** | FIXED | Manual | Automated tests + publish | Conventional commits, automated changelogs, automated visual & a11y regression, canary releases |
| A5.6 | **CDN or unified runtime distribution** | DYNAMIC | None | Versioned npm only | CDN delivery with auto-updates (Polaris-style "load from Shopify CDN" model) |

---

## A.6 — Cross-platform & Theming (Weight: 8%)

**Maps to doctrine:** surfaces, theming/white-label/embedding, layout & responsive.

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| A6.1 | **Light / dark mode parity** | FIXED | Light only | Both modes shipped | Plus high-contrast mode; auto-follows OS via `prefers-color-scheme` |
| A6.2 | **Brand theming / multi-tenant** | FIXED | None | Override via CSS vars | Token-based brand layer; documented theme contract; visual demo of N brands |
| A6.3 | **Web / iOS / Android / RN parity** | FIXED | Web only | Web + one native | Tokens exported to all targets; component parity matrix tracked. **Benchmark:** Material 3 Expressive on Wear OS |
| A6.4 | **Density variants** (compact / default / spacious) | FIXED | None | One density | Token-driven density modes (Carbon-style) |
| A6.5 | **RTL & i18n** | FIXED | LTR only, English only | RTL support, ICU strings | Pseudolocalisation in CI; RTL screenshots in Storybook; tested in Arabic + Hebrew |
| A6.6 | **Spatial / immersive surface support** | DYNAMIC | None | N/A | Guidance for visionOS-like glass materials, depth tokens, and 3D safe-zones |

---

## A.7 — Adoption & Metrics (Weight: 9%)

**Maps to doctrine:** adoption / DesignOps, measurement/research, component lifecycle.

> Adoption is "the existential challenge" of a mature design system. zeroheight's Design Systems Report 2026 found buy-in satisfaction dropped from 42% to 32% YoY. Figma's data team measured a 34% efficiency boost for designers with access to a system.

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| A7.1 | **Coverage %** (production UI built from system components) | FIXED | Unknown | Measured manually | Tracked via tooling (e.g., Omlet, Supernova) per repo; trend reported quarterly |
| A7.2 | **Detachment rate** in Figma | FIXED | Unknown | Sampled | Continuously monitored; thresholds trigger investigation |
| A7.3 | **Consumer NPS / satisfaction** | FIXED | Never measured | Annual survey | Quarterly NPS, segmented by team |
| A7.4 | **Contribution rate** (PRs / issues / RFCs from outside DS team) | FIXED | None | Some contributions | Monthly contribution KPI; ≥ 30% of changes from consumers |
| A7.5 | **Time-to-ship deltas** | FIXED | Not measured | Anecdotal | A/B measured: feature time before/after DS adoption |
| A7.6 | **Business KPI correlation** | DYNAMIC | None | Light correlation | Adoption % correlated with Core Web Vitals scores and conversion lift |

---

## A.8 — Accessibility Baked Into the System (Weight: 12%)

**Maps to doctrine:** accessibility/inclusion/localization, theming (HC mode), content design.

> EU's European Accessibility Act became legally applicable on 28 June 2025; the EU's next EN 301 549 update is expected to reference WCAG 2.2.

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| A8.1 | **Contrast guarantees** (WCAG 2.2 AA: 4.5:1 text / 3:1 UI; APCA-W3 readiness) | FIXED | Untested | Documented; tested at the foundation level | Guaranteed by token math; CI fails on regression. **Benchmark:** Carbon's "if difference ≥ 50, colors are accessible" rule |
| A8.2 | **Keyboard navigation** | FIXED | Inconsistent | Standard tab order, escape closes modals | Full keyboard parity, focus management documented per component, focus-not-obscured (WCAG 2.2 SC 2.4.11) verified |
| A8.3 | **Screen-reader testing** | FIXED | Never | Internal screen-reader tests | Recurring NVDA/VoiceOver/JAWS testing; results published per component |
| A8.4 | **Reduced-motion support** | FIXED | None | `prefers-reduced-motion` honoured | All motion tokens have an explicit reduced-motion alternative |
| A8.5 | **A11y tokens** (focus rings, error semantics, target sizes) | FIXED | None | Some named tokens | Touch-target tokens (WCAG 2.2 SC 2.5.8 minimum 24×24 CSS px) baked into all interactive components |
| A8.6 | **WCAG 2.2 / EAA conformance** | DYNAMIC | Unstated | Self-claimed AA | Independently audited AA + select AAA criteria; conformance report public; tracked toward WCAG 3.0 readiness |
| A8.7 | **Cognitive accessibility** | DYNAMIC | Not addressed | Plain-language docs, content guidelines | Findable help (SC 3.2.6), accessible authentication (SC 3.3.8), redundant entry (SC 3.3.7) — all WCAG 2.2 — surfaced as patterns |

---

## A.9 — Performance & Developer Experience (Weight: 8%)

**Maps to doctrine:** engineering & ops, tooling, sustainability (SWDM v4).

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| A9.1 | **Bundle size budgets** | FIXED | Unmonitored | Per-component KB budget | Hard CI failure on regression; size-limit reports posted to PRs |
| A9.2 | **Tree-shaking / sub-path imports** | FIXED | Monolithic | ESM + side-effect-free | Per-component package exports; zero overhead for unused components |
| A9.3 | **TypeScript support** | FIXED | None | First-party `.d.ts` | Strict types, generics, exhaustive prop unions, JSDoc rendered in IDEs |
| A9.4 | **Framework-agnosticism** | DYNAMIC | React only | React + one other | Web Components core + React/Vue/Svelte wrappers (Polaris 2025 model) or React Aria–style hooks/primitives split (Adobe) |
| A9.5 | **SSR / streaming compatibility** | DYNAMIC | Broken on SSR | Works under Next.js / Nuxt | Tested under React Server Components, Astro Islands, Remix; hydration-safe |
| A9.6 | **Zero-config dev experience** | DYNAMIC | Manual setup | npm install + import | Single CLI install; auto-config for popular frameworks; AI-assisted scaffolding |

---

## A.10 — AI / Emerging Tech Integration (Weight: 6%) — entirely DYNAMIC

**Maps to doctrine:** AI ethics & sustainability, AI prompt library, tooling (MCP / Code Connect). Also: a portable rules-file (commonly named `DESIGN.md`) that codifies hard / soft constraints for AI agents.

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| A10.1 | **MCP server for the design system** | DYNAMIC | None | Read-only token/component MCP server | Full read+write MCP server (Figma-style "write to canvas") with documented prompts and skills |
| A10.2 | **Code Connect / design-to-code mapping** | DYNAMIC | None | Manual mapping | Code Connect or equivalent: Figma component ↔ code component bound; works in MCP context |
| A10.3 | **AI-rules file for agents** | DYNAMIC | None | A `DESIGN.md` exists | Auto-generated rules file that scans the docs + tokens + manifest on every release; CI fails if stale |
| A10.4 | **AI-assisted contribution review** | DYNAMIC | None | AI-suggested code review | AI checks for token usage, a11y, naming conventions before human review |
| A10.5 | **Generative theming / palette tools** | DYNAMIC | None | Manual brand theming | One-prompt brand themes that respect contrast, density, motion, and a11y constraints |
| A10.6 | **Documentation conformance to MCP** | DYNAMIC | None | Docs site exposes API docs | Docs site exposes structured MCP-compatible endpoints |

---

*Continue to [`04-criteria-part-b.md`](./04-criteria-part-b.md) for the UX criteria.*
