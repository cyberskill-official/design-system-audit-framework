# 03 — Criteria Part A: Design System (10 categories, 63 criteria)

> Scoring summary: 10 categories, weights total 100%, 63 criteria, max raw score 315.

Every criterion has three rubric anchors:
- **0** — absent or "no evidence the system addresses this"
- **3** — built and shipped
- **5** — industry-leading; measured; externally validated

A criterion may be tagged **FIXED** (objective rubric, regressions require an explicit no-silent-regression override) or **DYNAMIC** (rescored quarterly as standards evolve).

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
| A10.1 | **MCP server for the design system** | DYNAMIC | None | Read-only token/component MCP server | Full read+write MCP server (Figma-style "write to canvas") with structured docs endpoints, documented prompts, and skills |
| A10.2 | **Code Connect / design-to-code mapping** | DYNAMIC | None | Manual mapping | Code Connect or equivalent: Figma component ↔ code component bound; works in MCP context |
| A10.3 | **AI-rules file for agents and contribution review** | DYNAMIC | None | A `DESIGN.md` exists | Auto-generated rules file that scans the docs + tokens + manifest on every release; AI checks token usage, accessibility, naming conventions, and CI freshness before human review |
| A10.5 | **Generative theming / palette tools** | DYNAMIC | None | Manual brand theming | One-prompt brand themes that respect contrast, density, motion, and a11y constraints |

---

*Continue to [`04-criteria-part-b.md`](./04-criteria-part-b.md) for the UX criteria.*

# 04 — Criteria Part B: UX (10 categories, 62 criteria)

> Scoring summary: 10 categories, weights total 100%, 62 criteria, max raw score 310.

For a doctrine self-audit, Part B asks *"Does the doctrine adequately specify and support good UX practice?"* For a live-product audit, Part B asks *"Does the product live up to that practice?"* Both readings use the same criteria.

Same scoring scale as Part A (0–5; 0 absent, 3 built and shipped, 5 industry-leading). Same FIXED/DYNAMIC tagging.

---

## B.1 — User Research & Discovery (Weight: 12%)

**Maps to doctrine:** measurement/research, content design (for content research).

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| B1.1 | **Method diversity** | FIXED | One method | Mix of qualitative + quantitative | Generative (interviews, ethnography, diary), evaluative (usability, A/B), and behavioural (analytics) blended on every project |
| B1.2 | **Research cadence** | FIXED | Project-only | Per release | Continuous "rolling" / rapid research with weekly or bi-weekly cadence |
| B1.3 | **ResearchOps practice** | DYNAMIC | None | Shared participant list | Centralised recruitment, repository, governance, ethics review (per ResearchOps 8-pillar framework) |
| B1.4 | **Participant ethics & consent** | FIXED | None | Consent forms, recordings deleted | GDPR/PDPL-compliant participant DB, withdrawal flow, privileged-data handling |
| B1.5 | **Evidence-based decision logging** | FIXED | None | Research reports filed | Decisions cite specific research artefacts; "what we already know?" is asked before a study is run |
| B1.6 | **Insight repository** | DYNAMIC | None | Shared drive | Searchable, tagged, AI-queryable repo (Dovetail / Condens / Notion) accessible to PM, Eng, Marketing |
| B1.7 | **AI-assisted synthesis** | DYNAMIC | None | Manual coding | LLM-assisted transcript coding with human-in-the-loop validation; bias controls documented |

---

## B.2 — Information Architecture & Navigation (Weight: 9%)

**Maps to doctrine:** surfaces, enterprise patterns, docs site IA.

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| B2.1 | **Match between system and real-world / user mental model** (Nielsen H2) | FIXED | Mismatch | Familiar terminology | Validated by tree-test / card-sort with the actual audience; interviews and glossary evidence show product language matches user language |
| B2.2 | **Navigation consistency and platform standards** (Nielsen H4) | FIXED | Each section reinvents nav | Shared nav component | Cross-surface nav unification with platform conventions (Apple HIG / Material); Polaris 2025 unified Admin / Checkout / Customer Accounts is the benchmark |
| B2.3 | **Findability and recognition over recall** (Nielsen H6) | FIXED | No search; users must memorise commands | Search box with persistent labels | Faceted search, recent/saved items, autocomplete, smart defaults, and AI search; analytics close the loop on zero-results |
| B2.4 | **Wayfinding** (breadcrumbs, page titles, focus visible) | FIXED | Missing | Present | Plus visited-state, progress indicators, "you are here" pattern in deep flows |
| B2.5 | **Card sorting / tree testing** done at IA design time | FIXED | None | Once at launch | Re-validated at every major IA change |

---

## B.3 — Interaction Design (Weight: 11%)

**Maps to doctrine:** Tier-1 components (feedback states), enterprise patterns, agentic UX.

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| B3.1 | **Visibility of system status** (Nielsen H1) — feedback within 100ms / 1s / 10s | FIXED | None | Loading states present | Variable-length skeleton screens matching real content, optimistic UI, real-time progress, async-safe UI patterns, and perceived-performance instrumentation |
| B3.2 | **Affordances & signifiers** | FIXED | Ambiguous | Standard buttons, links, fields | Strong visual affordances per platform; verified via 5-second testing |
| B3.3 | **Error prevention & recovery** (Nielsen H5 + H9) | FIXED | Errors crash flow | Validation + clear messages | Inline validation, constraint-based inputs, confirm-destructive patterns, undo (Gmail-style), and structured "what happened, what to do next" recovery copy |
| B3.4 | **Empty states** | FIXED | Blank | Generic "no data" | Educational, action-oriented empty states with primary action and link to docs |
| B3.6 | **User control, freedom & efficiency** (Nielsen H3 + H7) — undo, redo, cancel, escape, shortcuts | FIXED | None | Cancel buttons and some shortcuts | Undo on destructive actions, pending-state cancellation, persistent drafts, keyboard shortcuts, command palette, and user customisation |
| B3.7 | **Spatial / 3D interaction** (visionOS-class) | DYNAMIC | N/A | Touch + keyboard only | Spatial guidance for eye tracking, hand gestures, depth, spatial audio |
| B3.8 | **Agentic-UX patterns** | DYNAMIC | None | Static AI features | Documented patterns for human-on-the-loop, human-in-the-loop, mixed initiative, confidence visualisation, source attribution, recovery |

---

## B.4 — Visual Design & Hierarchy (Weight: 8%)

**Maps to doctrine:** foundations (voice / anchors), design language.

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| B4.1 | **Visual hierarchy** | FIXED | Flat or chaotic | Scale + weight + color hierarchy | Scientifically validated via eye-tracking / 5-second test; primary action obvious |
| B4.2 | **Aesthetic & minimalist design** (Nielsen H8) | FIXED | Cluttered | Clean | Every visual element justifies its presence; intentional negative space; visual reduction is verified during heuristic review |
| B4.3 | **Brand expression** | FIXED | Generic | On-brand | Distinctive within constraints |
| B4.4 | **Emotional resonance** | DYNAMIC | Sterile | Considered tone | Intentionally evokes the desired emotion (Material 3 Expressive's research found expressive designs rated higher on "energetic", "playful", "friendly") |
| B4.5 | **Density & ergonomics** | FIXED | One density | Comfortable + compact | Density choice exposed to users; respects platform conventions |

---

## B.5 — Accessibility & Inclusive Design (Weight: 12%)

**Maps to doctrine:** accessibility/inclusion/localization, theming (HC mode), vertical packs (Govtech).

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| B5.1 | **WCAG 2.2 Level A conformance** | FIXED | Untested | Self-tested | Independently audited; report public; remediation tracked |
| B5.2 | **WCAG 2.2 Level AA conformance** | FIXED | Untested | Most criteria pass | Full AA + 9 new SCs (Focus Not Obscured Min/Enh, Focus Appearance, Dragging Movements, Target Size, Findable Help, Accessible Auth, Redundant Entry) |
| B5.3 | **Selected AAA criteria** | FIXED | None | A few | Documented AAA criteria for high-stakes flows (e.g., Focus Not Obscured Enhanced for legal/medical) |
| B5.4 | **Keyboard-only support** | FIXED | Broken | Tab order works | Full keyboard parity; documented shortcuts; no traps |
| B5.5 | **Screen-reader testing** | FIXED | Never | Pre-launch test | NVDA + VoiceOver + JAWS regression with each release; rotor / landmarks audited |
| B5.6 | **Cognitive accessibility** | DYNAMIC | Not addressed | Plain language | Plain-language certified; explicit help discoverability; reading-level metric; preview of WCAG 3.0 cognitive guidance |
| B5.7 | **Inclusive design** (gender, locale, low-bandwidth, low-vision) | FIXED | None | Some considerations | Inclusive design principles applied; audited by lived-experience consultants |
| B5.8 | **EAA / regulatory readiness** | DYNAMIC | Not addressed | Self-claimed | EAA-ready conformance statement; ISO/IEC 40500:2025 referenced |

---

## B.6 — Content Design & UX Writing (Weight: 8%)

**Maps to doctrine:** content design / UX writing, foundations (voice).

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| B6.1 | **Voice & tone documentation** | FIXED | None | Voice doc exists | Voice + per-context tone matrix |
| B6.2 | **Microcopy patterns** | FIXED | Ad-hoc | Standard error/empty/confirmation copy | Pattern library w/ examples per emotional state; tested with users |
| B6.3 | **Action-oriented language** | FIXED | "Click here" | Action verbs | Concise, button-first style validated through A/B tests |
| B6.4 | **Localization & i18n** | FIXED | English only | One additional locale | Pseudolocalisation in CI; gender-neutral pronouns where languages allow; expansion-aware layouts (German +30%) |
| B6.5 | **Plain language / reading level** | FIXED | Unmeasured | Spot-checked | Flesch–Kincaid or similar tracked; jargon-detection lint |
| B6.6 | **Translation memory & glossary** | DYNAMIC | None | Spreadsheet | TM + glossary integrated with design tool (Figma plugins) and CI |

---

## B.7 — Usability & Heuristic Compliance (Weight: 10%)

**Maps to doctrine:** enterprise patterns, component states, surfaces.

> Anchored on Nielsen's 10 Usability Heuristics (1990, refined 1994, language updated 2024) and Shneiderman's 8 Golden Rules.
> Individual heuristic evidence lives in the IA, interaction, and visual categories above; this category audits the review cadence, coverage discipline, and help surface.

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| B7.1 | **Heuristic evaluation cadence and coverage** | FIXED | Never | Pre-launch review covers common heuristics | Quarterly heuristic eval per surface; Nielsen and Shneiderman coverage is mapped to the owning criteria above and documented findings are tracked to closure |
| B7.11 | **Help & documentation** (H10) | FIXED | None | FAQ | Contextual help, in-product tours, AI-assisted help |

---

## B.8 — Performance & Core Web Vitals as UX (Weight: 10%)

**Maps to doctrine:** engineering & ops, sustainability (SWDM v4).

> Google's Core Web Vitals are LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1, measured at the 75th percentile from real user data. INP replaced FID in March 2024.

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| B8.1 | **LCP** at 75th percentile | DYNAMIC | > 4s | ≤ 2.5s | ≤ 1.8s; verified by RUM/CrUX |
| B8.2 | **INP** at 75th percentile | DYNAMIC | > 500ms | ≤ 200ms | ≤ 100ms |
| B8.3 | **CLS** at 75th percentile | DYNAMIC | > 0.25 | ≤ 0.1 | ≤ 0.05 |
| B8.4 | **TTFB** | FIXED | Unmeasured | Tracked | < 200ms p75 |
| B8.5 | **Performance budgets** in CI | FIXED | None | Local checks | CI fails on regression; budget per template |
| B8.6 | **Perceived performance patterns** | FIXED | Spinner only | Skeletons | Optimistic UI, prefetching, streaming SSR |
| B8.7 | **Mobile parity** | FIXED | Desktop-first | Responsive | Mobile-first; mobile p75 hits same thresholds |

---

## B.9 — Trust, Privacy & Ethics (Weight: 10%)

**Maps to doctrine:** AI ethics & sustainability, governance/legal/commerce (privacy jurisdictions), enterprise patterns (consent / paywall).

> Cautionary case study: the FTC's $2.5B settlement with Amazon (Sept 2025) for Prime sign-up and "Iliad" cancellation flows. The EU's DSA bans dark patterns on online platforms; a Digital Fairness Act draft is expected in 2026.

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| B9.1 | **No-dark-pattern guarantee** (FTC's 4 categories: false belief, concealed info, unauthorised charges, manipulated privacy choices) | FIXED | Multiple violations | None of the 4 | Documented anti-dark-pattern policy; design reviews include "deceptive design" check |
| B9.2 | **Symmetric subscribe/cancel** | FIXED | "Iliad"-style maze | One-click cancel | Cancellation explicitly easier than sign-up; verified via session recording |
| B9.3 | **Consent UX** (GDPR / CCPA / CPRA / PDPL) | FIXED | Bundled / pre-ticked | Explicit opt-in | "Reject All" equally prominent as "Accept All"; granular controls; consent reaffirmed annually |
| B9.4 | **Transparency** (data use, AI use, fees) | FIXED | Hidden | Disclosed | Layered notice + just-in-time disclosure; AI use labelled per WAI / AI Act guidance |
| B9.5 | **Privacy-by-default** | FIXED | All-public defaults | Sensible defaults | Most-private defaults; documented threat model |
| B9.6 | **Algorithmic accountability** | DYNAMIC | None | Algorithm disclosed | Personalisation explained, opt-out provided, no AI-driven hyper-nudging on vulnerable groups |
| B9.7 | **Inclusive risk review** for vulnerable users (children, elderly, low literacy, distressed states) | FIXED | None | Considered | Documented inclusive risk review per major release |

---

## B.10 — Measurement & UX Metrics (Weight: 10%)

**Maps to doctrine:** measurement/research, adoption KPIs, AI metrics.

> The HEART framework (Happiness, Engagement, Adoption, Retention, Task success), paired with Goals-Signals-Metrics, is the dominant macro-measurement approach. The System Usability Scale (SUS), with industry mean of 68, is the dominant micro-measurement instrument.

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| B10.1 | **HEART framework adoption** | FIXED | None | Some HEART metrics | Goals→Signals→Metrics formally mapped per product/feature |
| B10.2 | **SUS administered** | FIXED | Never | Once | Quarterly; trends tracked vs the 68 industry baseline; ≥ 20–30 responses per round |
| B10.3 | **Task success / completion rate** | FIXED | Untracked | Measured in usability tests | Continuous behavioural analytics + intent inference; segmented by user type |
| B10.4 | **Behavioural analytics depth** | FIXED | Pageviews | Funnels + cohorts | Event-level instrumentation, cohort retention, drop-off causes triangulated with qual |
| B10.5 | **NPS / CSAT / CES** | FIXED | None | One score | Triangulated CSAT + NPS + CES; segmented by journey stage |
| B10.6 | **Qualitative ↔ quantitative triangulation** | FIXED | Disconnected | Reports cross-reference | Single dashboard fuses behavioural + survey + research insights |
| B10.7 | **AI-era metrics** (trust, calibration, override rate, hallucination rate, dual evaluation of human + agent) | DYNAMIC | None | Some AI feature metrics | Dual-evaluation framework: measures both user experience *and* agent effectiveness; trust calibration and override rate tracked |
| B10.8 | **A/B testing rigor** | FIXED | Eyeball | T-tests | Pre-registered hypotheses, sequential testing controls, guardrail metrics (incl. accessibility & performance) |

---

*End of criteria. Read [`05-running-an-audit.md`](../guidelines/05-running-an-audit.md) for the playbook that uses these.*


## B.4 — Absorbed Proof Criteria (Weight: 10%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| MAX-001 | **Standalone doctrine**: The audited system has a single authoritative doctrine or clearly declared doctrine map with reader paths for design, engineering, PM, accessibility, legal, and AI agents. | DYNAMIC | Unmet | Partial | Fully compliant. Refs: DSAF-A |
| MAX-002 | **Standalone doctrine**: Every rule that claims normative force identifies whether it is doctrine, implementation requirement, shipped artifact, audited artifact, planned artifact, or deprecated guidance. | DYNAMIC | Unmet | Partial | Fully compliant. Refs: DSAF-A |
| MAX-003 | **Evidence discipline**: Every external factual claim has a source, fetched date, confidence level, owner, and affected section. | DYNAMIC | Unmet | Partial | Fully compliant. Refs: DSAF-A, WCAG-2.2 |
| MAX-004 | **Evidence discipline**: Unsupported superlatives and market claims are either removed or converted into testable benchmark hypotheses. | DYNAMIC | Unmet | Partial | Fully compliant. Refs: DSAF-A |
| MAX-005 | **Consistency and versioning**: Version history, changelog, maturity labels, anchors, examples, and status badges agree across the document. | DYNAMIC | Unmet | Partial | Fully compliant. Refs: DSAF-A |
| MAX-006 | **Consistency and versioning**: Known gaps, missing artifacts, planned artifacts, and shipped artifacts are listed in one reality table. | DYNAMIC | Unmet | Partial | Fully compliant. Refs: DSAF-A |
| MAX-007 | **Implementation precision**: Components or patterns define anatomy, API, states, keyboard model, tokens, accessibility obligations, localization obligations, examples, and tests. | DYNAMIC | Unmet | Partial | Fully compliant. Refs: ARIA-APG, REACT-ARIA |
| MAX-008 | **Implementation precision**: Each implementation requirement has an owner, acceptance gate, verification command, and artifact recreation rule. | DYNAMIC | Unmet | Partial | Fully compliant. Refs: DSAF-A |
| MAX-009 | **Benchmark rigor**: Leader benchmarks use official sources first, dated evidence, confidence labels, and explicit deltas rather than yes/no assertions. | DYNAMIC | Unmet | Partial | Fully compliant. Refs: CARBON-A11Y, GOVUK-A11Y, FLUENT-TOKENS |
| MAX-010 | **Benchmark rigor**: Benchmark findings distinguish doctrine differentiation, implemented differentiation, and audited differentiation. | DYNAMIC | Unmet | Partial | Fully compliant. Refs: DSAF-A |
| MAX-011 | **Accessibility proof**: Accessibility claims distinguish component support from product compliance and include automated evidence fields. | DYNAMIC | Unmet | Partial | Fully compliant. Refs: WCAG-2.2, CARBON-A11Y, GOVUK-A11Y |
| MAX-012 | **Accessibility proof**: Manual assistive-technology testing is scheduled and evidenced for NVDA, JAWS, VoiceOver, TalkBack, switch control, voice control, and localized TTS where relevant. | FIXED | Unmet | Partial | Fully compliant. Refs: WCAG-2.2, GOVUK-A11Y |
| MAX-013 | **AI and provenance**: AI-generated, AI-assisted, and agentic surfaces include disclosure, sources, confidence policy, human review gates, tool-call visibility, provenance, and audit logs. | DYNAMIC | Unmet | Partial | Fully compliant. Refs: CARBON-AI, C2PA |
| MAX-014 | **AI and provenance**: High-stakes AI confidence, calibration, and reviewer thresholds have human evaluation evidence before numeric confidence is shown. | FIXED | Unmet | Partial | Fully compliant. Refs: CARBON-AI |
| MAX-015 | **Legal and privacy**: Consent, revocation, data classification, retention, cross-border transfer, biometric, employment, finance, health, and AI-risk patterns have exact UI requirements. | DYNAMIC | Unmet | Partial | Fully compliant. Refs: DSAF-B |
| MAX-016 | **Legal and privacy**: Volatile legal claims are marked counsel-review-required with jurisdiction, reviewer role, review cadence, confidence, and affected patterns. | FIXED | Unmet | Partial | Fully compliant. Refs: DSAF-B |
| MAX-017 | **Artifact reality**: Packages, docs, Storybook/equivalent examples, tokens, Figma assets, CLIs, MCP servers, dashboards, and generated files are scored only when present and reproducible. | DYNAMIC | Unmet | Partial | Fully compliant. Refs: DSAF-A |
| MAX-018 | **Artifact reality**: No artifact receives full credit unless it implements the doctrine exactly and passes its verification gate. | DYNAMIC | Unmet | Partial | Fully compliant. Refs: DSAF-A |
| MAX-019 | **Lifecycle and release**: MVP, enterprise core, advanced/labs, vertical packs, beta, GA, audited, deprecated, and sunset states have promotion and rollback rules. | DYNAMIC | Unmet | Partial | Fully compliant. Refs: DSAF-A |
| MAX-020 | **Lifecycle and release**: Release support, incident response, SLA, adoption review, risk acceptance, and executive sign-off are evidenced by accountable humans. | FIXED | Unmet | Partial | Fully compliant. Refs: DSAF-A |
| MAX-021 | **Tokens and theming**: Token pipelines validate DTCG structure, alias resolution, circular references, platform outputs, contrast pairs, component-token usage, and orphan tokens. | DYNAMIC | Unmet | Partial | Fully compliant. Refs: DTCG-2025.10, FLUENT-TOKENS, POLARIS-TOKENS |
| MAX-022 | **Tokens and theming**: Theme, density, locale, high-contrast, forced-colors, reduced-motion, reduced-transparency, and print/PDF modes have explicit generated outputs. | DYNAMIC | Unmet | Partial | Fully compliant. Refs: DTCG-2025.10, WCAG-2.2 |
| MAX-023 | **Research and telemetry**: Adoption, imports, installs, docs usage, lint findings, migration completion, accessibility defects, performance, and sustainability metrics are defined before production telemetry exists. | DYNAMIC | Unmet | Partial | Fully compliant. Refs: DSAF-A, WSG |
| MAX-024 | **Research and telemetry**: Customer research, external pilot feedback, community issue triage, and production telemetry review are separately recorded as manual evidence. | FIXED | Unmet | Partial | Fully compliant. Refs: DSAF-B |
| MAX-025 | **Documentation usability**: Reports and doctrine separate descriptive analysis from improved doctrine, preserve source context, and avoid hiding commercial strategy inside generated outputs. | DYNAMIC | Unmet | Partial | Fully compliant. Refs: DSAF-A |
| MAX-026 | **Documentation usability**: Every major part has decision tables, quick paths, glossary definitions, non-goals, implementation checklist, and example status flags. | DYNAMIC | Unmet | Partial | Fully compliant. Refs: DSAF-A |
| MAX-027 | **Cross-platform reach**: Web, native, React Native, Flutter, iOS, Android, responsive web, PDF, email, and embedded surfaces are explicitly in or out of scope. | DYNAMIC | Unmet | Partial | Fully compliant. Refs: MATERIAL-EXPRESSIVE, APPLE-GLASS |
| MAX-028 | **Cross-platform reach**: Design-tool parity and designer workflow checks are manually validated before claiming Figma/code parity. | FIXED | Unmet | Partial | Fully compliant. Refs: FLUENT-TOKENS |
| MAX-029 | **Security and agent safety**: Prompt injection, untrusted content, permissions, audit logging, undo/recover, preview, confirmation, and scoped tool access are specified for agentic actions. | DYNAMIC | Unmet | Partial | Fully compliant. Refs: DSAF-B |
| MAX-030 | **Independent assurance**: Independent accessibility, security, legal, procurement, or standards audit evidence exists before audited or certified public claims are made. | FIXED | Unmet | Partial | Fully compliant. Refs: WCAG-2.2, GOVUK-A11Y |


## B.5 — Doctrine navigation and usability (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-01.1 | Role-based reader paths for designers, engineers, PMs, legal, accessibility, security, data, support, procurement, and AI agents. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-01.2 | Compact master table of contents with anchors, status, maturity, audience, owner, and search keywords. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-01.3 | Decision tables before long rationale so teams can act without reading the whole doctrine first. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-01.4 | Non-goals and boundaries that prevent the system from becoming a catch-all product strategy document. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-01.5 | Glossary entries for standards, abbreviations, maturity labels, evidence labels, and legal terms on first use. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-01.6 | Normative, illustrative, placeholder, and experimental outputs/examples clearly marked at the example level. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-01.7 | Change-control legend that explains proposal, review, approval, deprecation, sunset, and emergency-patch states. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-01.8 | Standalone export mode where a reviewer can use the doctrine without access to private companion documents. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.6 — Governance and operating model (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-02.1 | Named accountable owners for each criterion family, token family, component family, pattern, package, and generated artifact. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-02.2 | Contribution workflow with intake, design review, engineering review, accessibility review, release review, and post-release monitoring. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-02.3 | RFC or ADR archive for significant design, token, accessibility, AI, legal, and platform changes. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-02.4 | Monthly lifecycle review for component health, adoption, defects, support burden, roadmap, and deprecation candidates. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-02.5 | Quarterly benchmark review against current public leaders and regulatory or standards movement. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-02.6 | Public self-audit cap policy that prevents unverified claims from exceeding available evidence. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-02.7 | Incident and rollback process for design-system releases that regress accessibility, performance, security, or product behavior. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-02.8 | Cross-functional governance map covering design systems, product teams, brand, legal, security, data, platform, and localization. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.7 — Token architecture and validation (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-03.1 | Primitive, semantic, component, mode, density, locale, platform, and vertical-pack token layers are separately defined. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-03.2 | DTCG-compatible token files require $type, $value, descriptions, alias resolution, and circular-reference rejection. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-03.3 | No hard-coded component values when a semantic or component token exists. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-03.4 | No orphan component tokens without consuming components, examples, and tests. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-03.5 | Contrast pairs generated and tested for light, dark, high-contrast, glass, print, disabled, selected, danger, warning, and success states. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-03.6 | Typography tokens validate Vietnamese diacritics, font fallback, all-caps tracking, line-height, clipping, PDF, and print rendering. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-03.7 | Platform outputs exist or are explicitly planned for CSS variables, TypeScript, Swift, Kotlin/Compose, Flutter, React Native, and Figma Variables. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-03.8 | Token migration rules identify aliases, deprecations, replacement timelines, codemods, lint rules, and visual-diff risk. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.8 — Figma and design-tool parity (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-04.1 | Figma libraries or equivalent design outputs/assets map every released component to code version, token version, and documentation page. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-04.2 | Design-tool variables use the same naming, modes, density, and semantic layers as code tokens. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-04.3 | Designer handoff annotations capture responsive behavior, content constraints, keyboard model, accessibility notes, and localization edge cases. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-04.4 | Design-tool change logs publish breaking changes, migrations, and deprecations with code-release alignment. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-04.5 | Parity review catches visual, token, spacing, typography, state, and interaction drift before GA. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-04.6 | Prototype components distinguish production-ready behavior from exploratory or illustrative mockups. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-04.7 | Design plugin or export workflow has owner, version, install instructions, known limitations, and verification evidence. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-04.8 | Manual designer workflow validation proves the outputs/assets work for real product tasks, not only static screenshots. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.9 — Component API and behavior (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-05.1 | Every component defines anatomy, API, slots, variants, sizes, density, states, composition rules, and forbidden combinations. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-05.2 | Keyboard interaction follows platform conventions and ARIA APG where applicable. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-05.3 | Focus management, escape behavior, selection model, roving tabindex, typeahead, and restoration are specified for composite widgets. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-05.4 | Component APIs expose accessible names, descriptions, error messages, helper text, localization hooks, and analytics hooks without requiring DOM hacks. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-05.5 | Complex components define loading, empty, error, partial, offline, disabled, read-only, skeleton, and permission-denied states. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-05.6 | Components document token consumption, CSS variables, theming constraints, contrast obligations, and visual-diff outputs/examples. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-05.7 | Component test matrices cover unit, integration, visual, accessibility, keyboard, localization, performance, and hydration behavior. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-05.8 | Labs components are isolated from GA components with maturity labels, migration promises, and explicit non-production warnings. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.10 — Pattern library and product workflows (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-06.1 | Reusable patterns exist for authentication, onboarding, search, filtering, sorting, bulk actions, import/export, approvals, settings, and audit trails. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-06.2 | Enterprise workflows cover long-running operations, autosave, resumability, optimistic updates, conflict resolution, and undo/recover. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-06.3 | Permission and role-based UI patterns avoid leaking unavailable actions while preserving explainability. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-06.4 | Product patterns define progressive disclosure for novice, regular, expert, administrator, auditor, and support-user workflows. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-06.5 | Error handling patterns distinguish validation, authorization, availability, conflict, quota, fraud, abuse, and regulatory blocks. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-06.6 | Escalation patterns define when to route a user to human support, human review, legal disclosure, or incident response. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-06.7 | Workflow outputs/examples include dense desktop, tablet, mobile, offline, and high-contrast variants. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-06.8 | Pattern adoption is measured through imports, docs views, support tickets, design review findings, and product-quality outcomes. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.11 — Accessibility and inclusion proof (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-07.1 | WCAG 2.2 AA is the production floor and APCA or equivalent contrast quality signals are treated as supplemental, not replacements. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-07.2 | The doctrine states that using the system does not automatically make a product accessible. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-07.3 | Every accessibility mapping includes example URL, automated test, manual test, owner, date, confidence, and known limitation fields. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-07.4 | Manual AT matrix covers NVDA/Firefox, NVDA/Chrome, JAWS/Chrome or Edge, VoiceOver/Safari, TalkBack/Chrome, switch control, voice control, zoom, and localized TTS. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-07.5 | Cognitive accessibility covers plain language, predictable structure, memory load, error recovery, interruption handling, and tier-one copy coverage. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-07.6 | Motor accessibility covers target size, spacing, drag alternatives, keyboard-only completion, timeout extension, and pointer cancellation. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-07.7 | Trauma-informed and inclusive patterns avoid unnecessary urgency, shaming copy, manipulative disclosure, and surprise automation. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-07.8 | Accessibility defects have severity, affected users, workaround, owner, fix version, regression test, and public-status policy. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.12 — Localization, content, and language (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-08.1 | Localization architecture covers locale tokens, plural rules, date/time/number formats, currency, name order, address formats, and bidi text. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-08.2 | Vietnamese-first or locale-first systems test diacritics, tone marks, line height, search, sorting, autocomplete, TTS, PDF, and print. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-08.3 | Content standards define voice, tone, reading level, terminology, glossary, forbidden words, translation memory, and review ownership. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-08.4 | UI copy patterns cover labels, helper text, errors, confirmations, empty states, AI disclosures, privacy notices, and regulatory copy. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-08.5 | Translation workflows define source-of-truth, freeze windows, pseudolocalization, screenshot review, legal copy review, and fallback behavior. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-08.6 | Icons, metaphors, colors, gestures, examples, names, and imagery are reviewed for market and cultural fit. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-08.7 | Content design evidence includes user comprehension, support-ticket reduction, search-success rate, and task-completion impact. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-08.8 | Multilingual outputs/examples are shipped for core components and high-risk flows, not only marketing pages. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.13 — Visual foundations and brand system (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-09.1 | Color system defines primitives, semantic roles, component roles, chart roles, confidence tiers, AI states, vertical accents, and accessibility-safe alternatives. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-09.2 | Typography system defines hierarchy, density, line length, text wrap, truncation, fallback, numeric alignment, code typography, and locale-specific adjustments. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-09.3 | Layout system defines grid, spacing, container, breakpoints, shell, sidebar, toolbar, detail pane, split view, modal, popover, and responsive behavior. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-09.4 | Iconography defines source library, stroke, fill, size, mirroring, labels, status use, brand use, and fallback text. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-09.5 | Elevation, shadow, border, blur, glass, matte, and solid surfaces have hierarchy rules and performance budgets. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-09.6 | Brand misuse outputs/examples show what not to do, including unsafe contrast, busy surfaces, marketing-heavy enterprise screens, and over-decorated dashboards. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-09.7 | Dense enterprise outputs/examples cover app shell, data grid, form flow, AI chat, docs page, regulatory disclosure, mobile layout, and print/PDF. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-09.8 | Visual QA requires screenshots, visual diffs, forced-colors checks, reduced-motion checks, and no-overlap review across breakpoints. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.14 — Motion and spatial design (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-10.1 | Motion categories distinguish functional, spatial, feedback, expressive, loading, and forbidden motion. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-10.2 | Animation tokens define duration, easing, distance, opacity, spring, stagger, and reduced-motion substitutions. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-10.3 | Motion never blocks task completion, hides state changes, or creates vestibular risk without an alternative. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-10.4 | Spatial transitions preserve object continuity for navigation, side panels, modals, command palettes, drawers, and AI overlays. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-10.5 | Loading and streaming motion patterns define skeletons, progress, partial results, cancellation, retry, and time expectations. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-10.6 | Motion performance budgets include frame budget, low-end device checks, layout-shift thresholds, and reduced-power behavior. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-10.7 | Motion outputs/examples specify keyboard, screen-reader, reduced-motion, and high-contrast behavior. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-10.8 | Expressive motion is limited to brand moments, empty states, onboarding, and delight surfaces with enterprise restraint. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.15 — Data visualization and analytics UX (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-11.1 | Chart tokens cover categorical, sequential, diverging, status, confidence, uncertainty, risk, and color-blind-safe palettes. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-11.2 | Charts include title, description, source, timestamp, units, axes, legends, table alternative, export, and empty/error states. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-11.3 | Analytics surfaces distinguish observed data, estimated data, sampled data, modeled data, AI-generated data, stale data, and unavailable data. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-11.4 | Drilldown, filtering, comparison, annotation, threshold, and alert patterns are standardized. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-11.5 | Data ethics patterns prevent misleading scales, cherry-picked ranges, hidden denominators, dark patterns, and false precision. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-11.6 | Dashboards define scan hierarchy, density, freshness, permissions, audit trail, and decision-support disclaimers. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-11.7 | Visualization accessibility covers keyboard navigation, screen-reader summary, text alternatives, focus order, and high-contrast palettes. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-11.8 | Metrics ownership, data lineage, retention, privacy, and incident response are documented for enterprise dashboards. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.16 — Forms, validation, and high-risk workflows (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-12.1 | Forms define labels, helper text, constraints, validation timing, error placement, summaries, recovery, save state, and review state. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-12.2 | Validation patterns distinguish client hints, server truth, async checks, business rules, policy rules, fraud checks, and legal blocks. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-12.3 | High-risk actions require preview, scope, confirmation, fresh authentication, undo or recovery, audit log, and notification rules. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-12.4 | Consent forms require no pre-checking, no bundling, equal decline affordance, purpose-specific copy, revocation path, and audit event. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-12.5 | Multi-step flows define progress, branching, back behavior, autosave, abandon warning, resumability, and support escalation. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-12.6 | Admin settings define safe defaults, permission boundaries, inherited policy, conflict display, and blast-radius preview. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-12.7 | Bulk actions define selection model, filters-applied warning, count confirmation, preview, batch progress, partial failure, and rollback. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-12.8 | Regulated workflows identify counsel-review-required copy, data retention, evidence export, and human-review gates. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.17 — AI transparency and agentic UX (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-13.1 | AI content uses disclosure indicators plus a path to explainability rather than decorative badges alone. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-13.2 | AI confidence is shown only when calibrated for the task class and backed by evidence. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-13.3 | AI risk tiers define disclosure-only, sources, confidence, human review, approval/audit, and fresh re-auth requirements. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-13.4 | Citations distinguish retrieved source, generated answer, transformation, summarization, extraction, classification, and recommendation. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-13.5 | Tool calls expose requested permission, data scope, execution preview, result, failure, undo/recover, and audit record. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-13.6 | Prompt-injection defenses mark untrusted documents, retrieved content, tool descriptions, web pages, and user-uploaded files. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-13.7 | Human review gates define reviewer role, queue states, SLA, override policy, escalation, and disagreement handling. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-13.8 | Provenance, C2PA, watermarking, fingerprinting, and synthetic-media claims are labeled shipped, planned, or experimental. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.18 — Privacy, legal, compliance, and trust (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-14.1 | Regulatory evidence register captures jurisdiction, source URL, fetched date, reviewer role, confidence, affected patterns, and review cadence. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-14.2 | Binding legal requirements are separated from ethical defaults and product-policy choices. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-14.3 | Privacy patterns cover notice, consent, legitimate interest, data minimization, access, export, correction, deletion, retention, and portability. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-14.4 | Cross-border transfer, employment, biometric, health, finance, child-safety, security, and AI-law sections are marked counsel-review-required when volatile. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-14.5 | Trust surfaces define audit logs, user-visible history, explanations, data-use summaries, disclosure receipts, and revocation confirmation. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-14.6 | Dark-pattern safeguards cover false belief, concealed information, unauthorized charges, privacy manipulation, confirm-shaming, and friction imbalance. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-14.7 | Procurement evidence packs include accessibility conformance reports, security posture, privacy summary, data-flow map, support policy, and roadmap limitations. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-14.8 | Legal-copy components define plain-language fallback, localized legal text, versioning, owner, approval status, and archival path. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.19 — Security, abuse resistance, and resilience (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-15.1 | Design patterns cover phishing-resistant authentication, session timeout, device trust, step-up auth, secrets display, and credential recovery. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-15.2 | Permission UX distinguishes requested scope, granted scope, inherited scope, denied scope, expired scope, and delegated scope. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-15.3 | Abuse and fraud workflows cover reporting, moderation, rate limits, challenges, lockouts, appeals, and transparency notices. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-15.4 | Security-sensitive surfaces define copy, iconography, warnings, irreversible-action safeguards, and support escalation. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-15.5 | Incident UX covers degraded mode, status page links, banner hierarchy, support scripts, customer notifications, and retrospective updates. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-15.6 | Secure-by-default component guidance covers external links, file uploads, rich text, markdown, iframes, embeds, and copy-to-clipboard. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-15.7 | Audit logs are human-readable, exportable, filterable, permissioned, immutable where required, and privacy-aware. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-15.8 | Threat-model-driven UX review is required for admin, AI-agent, payment, legal, identity, and data-export workflows. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.20 — Engineering distribution and architecture (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-16.1 | Package strategy defines public/private packages, versioning, peer dependencies, tree-shaking, ESM/CJS policy, side effects, and license. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-16.2 | Release artifacts include install commands, API docs, changelog, migration guide, examples, tests, provenance, and SBOM when applicable. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-16.3 | Framework support matrix names React, Web Components, vanilla CSS, mobile/native targets, server-rendering, hydration, and browser support. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-16.4 | Component build outputs are tested for bundle size, type declarations, source maps, CSS variables, themes, and dead-code elimination. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-16.5 | Repo architecture documents ownership boundaries, package dependencies, generated files, codegen, lint rules, and release automation. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-16.6 | CLI and codemods are documented with dry-run, diff, rollback, logging, and CI usage. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-16.7 | Adapters for Storybook, Zeroheight, Tokens Studio, Figma, MCP, docs sites, and CI are versioned and tested. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-16.8 | Engineering acceptance gates cover lint, typecheck, unit, component, visual, axe, Playwright, bundle, token validation, and provenance. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.21 — Quality automation and evidence (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-17.1 | Every criterion has required evidence fields: artifact path or URL, automated check, manual check if needed, owner, date, confidence, and limitation. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-17.2 | Automated tests map to criteria IDs and fail when claimed requirements lose coverage. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-17.3 | Visual regression covers density, themes, forced colors, reduced motion, localization, print/PDF, low-end device, and content-overlap canaries. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-17.4 | Accessibility automation includes axe or equivalent, contrast, keyboard smoke, focus-visible, ARIA roles, labels, and landmark checks. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-17.5 | Performance tests cover Core Web Vitals, interaction latency, bundle size, render cost, memory, long tasks, and low-end device budgets. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-17.6 | Regression policy distinguishes intentional tradeoff, dependency breakage, partial fix, unresolved blocker, and unexpected backslide. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-17.7 | Generated artifacts record source inputs, recreation command, output paths, verification command, owner, freshness, and status. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-17.8 | Audit reports are reproducible, diffable, deterministic where possible, and safe to re-run by another reviewer. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.22 — Performance, reliability, and scale (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-18.1 | Design-system components define performance budgets for render time, hydration, input latency, virtualization, and memory usage. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-18.2 | Data-heavy components define pagination, virtualization, server-side sorting/filtering, column pinning, resize, density, and export performance. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-18.3 | Reliability patterns define offline, retry, rate limit, partial outage, stale data, conflict, queued operation, and eventual consistency states. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-18.4 | Responsive performance budgets cover mobile, low-end Android, enterprise laptops, slow networks, reduced data, and remote desktop conditions. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-18.5 | Asset strategy defines image formats, icon delivery, font loading, CSS delivery, caching, preloading, and critical path constraints. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-18.6 | Monitoring maps component or pattern failures to product incidents, support tickets, accessibility defects, and adoption friction. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-18.7 | Reliability documentation includes SLOs, runbooks, release health, deprecation windows, and incident communication framework/templates. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-18.8 | Performance claims require measured evidence rather than aspirational design language. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.23 — Sustainability and responsible resource use (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-19.1 | Sustainability model defines measurement method, boundaries, assumptions, data sources, owner, and review cadence. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-19.2 | Design tokens and components avoid unnecessary heavy effects, excessive animation, oversized assets, and expensive render patterns. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-19.3 | Documentation includes low-bandwidth, low-power, print-friendly, and reduced-data modes where product context requires them. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-19.4 | Sustainability metrics are separated from unsupported environmental claims and include confidence and limitations. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-19.5 | Asset and build pipelines track bundle size, image weight, unused CSS, font payload, third-party script cost, and cache behavior. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-19.6 | Design patterns encourage efficient workflows that reduce repeated user work, unnecessary pages, and avoidable support contacts. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-19.7 | Cloud and analytics instrumentation use privacy-first and data-minimizing defaults. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-19.8 | Sustainability improvements are prioritized alongside accessibility, performance, and business impact rather than treated as decoration. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.24 — Measurement, adoption, and DesignOps (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-20.1 | Minimum viable operating model includes quarterly benchmark, quarterly accessibility review, monthly lifecycle review, roadmap, contribution workflow, evidence register, and adoption dashboard when implemented. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-20.2 | Adoption metrics exist before telemetry through package installs, component imports, docs usage, lint findings, migration completions, issue labels, and design reviews. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-20.3 | Product-impact metrics connect system changes to task success, speed, errors, support tickets, conversion, retention, accessibility defects, and operational cost. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-20.4 | Research-unavailable protocol documents hypothesis, risk, measurement plan, owner, trigger, rollback path, and expiry date. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-20.5 | DesignOps dashboards distinguish shipped, planned, experimental, deprecated, blocked, and audited work. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-20.6 | Team enablement covers office hours, release notes, migration workshops, contribution guides, onboarding, and support triage. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-20.7 | Feedback loops include product teams, accessibility reviewers, legal, security, support, customers, community, and external reviewers. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-20.8 | Design-system ROI claims require evidence, not anecdote or vanity metrics. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.25 — Enterprise support and procurement (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-21.1 | Support policy defines channels, severity, response expectations, escalation, maintenance window, deprecation support, and out-of-policy requests. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-21.2 | Procurement-ready evidence includes license, security posture, privacy posture, accessibility posture, compliance posture, support model, roadmap, and known limitations. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-21.3 | Enterprise admin UX covers organization settings, audit logs, roles, billing, data export, SSO, SCIM, and policy inheritance when relevant. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-21.4 | Customer communication framework/templates cover breaking changes, accessibility issues, incidents, deprecations, migrations, and legal updates. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-21.5 | Backwards compatibility policy defines semver, experimental APIs, private APIs, feature flags, migrations, and sunset timelines. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-21.6 | Risk register tracks high-severity open issues, legal volatility, accessibility limitations, security constraints, and operational dependencies. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-21.7 | Accountability model names who can accept residual risk and how that acceptance is recorded. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-21.8 | External claims are conservative until customer pilots, third-party audits, or production evidence support stronger language. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.26 — Vertical packs and domain specialization (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-22.1 | Vertical packs define domain-specific tokens, components, patterns, terminology, compliance needs, evidence, and maturity boundaries. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-22.2 | Fintech pack covers money movement, balances, audit, fraud, identity, KYC, disclosures, and high-risk confirmations. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-22.3 | Health pack covers PHI, consent, clinical risk, emergency language, accessibility, caregiver access, and audit trail. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-22.4 | HR and employment pack covers bias risk, candidate privacy, explainability, approvals, record retention, and worker-sensitive flows. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-22.5 | Education pack covers learner privacy, guardian access, accessibility, assessment integrity, age-appropriate language, and localization. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-22.6 | Government pack covers service standards, public accessibility, plain language, identity, records, appeals, and low-digital-literacy access. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-22.7 | Vertical overrides cannot silently weaken core accessibility, privacy, security, or evidence requirements. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-22.8 | Each vertical pack has owner, legal-review status, pilot status, supported markets, exclusions, and sunset policy. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.27 — Migration and change management (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-23.1 | Migration plans define inventory, impact analysis, codemods, design-file updates, docs updates, training, support, and rollback. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-23.2 | Breaking changes include rationale, alternatives, timeline, affected components, affected tokens, risk, and migration outputs/examples. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-23.3 | Deprecation policy defines warning period, replacement, lint rule, migration script, support window, and removal version. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-23.4 | Legacy compatibility mode identifies what is supported, what is frozen, what is unsafe, and what requires exception approval. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-23.5 | Change adoption is measured through import changes, token usage, docs traffic, migration PRs, support tickets, and defects. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-23.6 | High-risk migrations require pilot teams, staged rollout, feature flags, visual diff review, and executive risk acceptance. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-23.7 | Design-file migrations are handled with the same seriousness as code migrations. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-23.8 | Post-migration review verifies accessibility, localization, performance, brand, analytics, and product workflow outcomes. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.28 — Documentation, education, and community (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-24.1 | Documentation IA supports getting started, foundations, components, patterns, tokens, accessibility, content, governance, contributing, and changelog. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-24.2 | Each component doc includes overview, anatomy, API, usage, states, accessibility, localization, tokens, examples, anti-patterns, and test guidance. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-24.3 | Docs outputs/examples run against current framework/packages or are clearly marked illustrative until framework/packages exist. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-24.4 | Search, navigation, related links, version switcher, status badges, and source links help readers find trustworthy guidance quickly. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-24.5 | Contribution docs explain issue templates, proposal path, review criteria, acceptance gates, and code of conduct. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-24.6 | Community and customer feedback is triaged into bugs, gaps, tasks, research needs, legal questions, and roadmap candidates. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-24.7 | Education material includes onboarding, workshops, migration guides, office hours, examples, and release briefings. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-24.8 | Docs quality is measured through task success, time to first contribution, search success, support tickets, and reader feedback. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.29 — Native, mobile, embedded, and multi-surface UX (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-25.1 | Mobile guidance covers touch targets, safe areas, gestures, keyboard, orientation, offline, permissions, and platform conventions. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-25.2 | Native guidance defines parity and divergence between web, iOS, Android, React Native, Flutter, and platform-specific controls. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-25.3 | Embedded surfaces define iframe, app shell, host navigation, permissions, error states, theming, and degraded mode. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-25.4 | Email, PDF, print, docs, admin, dashboard, and notification surfaces have explicit component and token compatibility rules. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-25.5 | Responsive outputs/examples show dense enterprise use cases, not only marketing layouts. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-25.6 | Device support matrix includes browser, OS, assistive tech, viewport, input modality, and performance constraints. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-25.7 | Cross-surface analytics distinguish where a pattern succeeds or fails by device, locale, role, and workflow. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-25.8 | Platform-specific visual effects such as glass, blur, haptics, and native motion have fallback and accessibility rules. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.30 — Content provenance and evidence supply chain (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-26.1 | Evidence registers record source, source type, fetched date, reviewer, confidence, affected sections, and expiry for volatile claims. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-26.2 | Generated reports identify input files, crawled URLs, failed pages, model/context label, criteria version, and generator version. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-26.3 | Crawler limitations, blocked pages, JavaScript-rendered gaps, and low-confidence scans are explicit in reports. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-26.4 | Source material is preserved for file inputs and quoted or summarized safely for URL inputs. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-26.5 | Claims derived from competitors, standards, laws, accessibility requirements, or product behavior carry citation IDs rather than naked assertions. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-26.6 | Evidence changes are diffable and can be revalidated without re-running the entire target implementation. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-26.7 | Report outputs separate analysis from improved doctrine so downstream users do not confuse scores with normative rules. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-26.8 | Sensitive evidence handling defines redaction, retention, access, and export policy. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.31 — Public website and URL audit coverage (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-27.1 | URL audits crawl same-origin pages, record status codes, titles, content limits, blocked pages, and crawl depth. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-27.2 | Website scans distinguish public documentation evidence from private package, Storybook, Figma, telemetry, and legal evidence that cannot be inferred from HTML. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-27.3 | Suggested doctrine for URL inputs identifies what is observed, inferred, missing, and requiring owner confirmation. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-27.4 | Crawl policy respects robots, rate limits, user agent transparency, and safe fetch timeouts. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-27.5 | URL reports include screenshots or visual verification hooks when a browser-based runner is available. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-27.6 | Public-site audits check navigation, search, component docs, accessibility statement, contribution path, changelog, tokens, examples, and governance surfaces. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-27.7 | URL scans avoid awarding artifact credit for claims that require private repo proof. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-27.8 | Deep-surfing findings include specific pages or lack-of-page evidence, not only homepage impressions. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.32 — Cybersecurity, risk, and critical operations UX (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-28.1 | Cybersecurity threat level indicators and system status alerts use standardized severity colors, icons, and persistent visibility rules. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-28.2 | Risk representation patterns distinguish assessed risk, residual risk, compliance status, and active vulnerabilities with confidence tiers. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-28.3 | Security audit logs and telemetry visualizers support human-readable summaries, filtering, exporting, and actor verification. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-28.4 | Phishing simulation and training components include clear disclosures, educational explanations, and safe reporting inputs. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-28.5 | Multi-factor authentication (MFA) and step-up authentication flows define recovery code UI, hardware key support, and timeout boundaries. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-28.6 | Threat modeling workspace components support data flow diagramming, trust boundary lines, and vulnerability card layouts. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-28.7 | Access control and permission assignment interfaces present explicit scope inheritance, role boundaries, and blast-radius warnings. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-28.8 | Security incident response templates define banner hierarchies, status-page widgets, and emergency action buttons. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.33 — Developer tools, CLI, and terminal UX (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-29.1 | Monospace typography and terminal-like UI panels are reserved for code, inputs, data tables, and CLI output streams. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-29.2 | Subtle background grain and noise textures are calibrated for contrast safety and performance across light and dark modes. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-29.3 | Command execution feeds expose execution logs, progress indicators, abort triggers, and copyable script commands. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-29.4 | Keyboard-only navigation supports quick palettes, command shortcuts, and focus indicators designed for power users. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-29.5 | Telemetry opt-in/opt-out forms require explicit user choice, privacy disclosures, and data-sharing granularity. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-29.6 | Monospace data tables support tabular numbers, custom sorting, dense grids, and scroll indicators on mobile viewports. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-29.7 | CLI configuration and installer documentation provides copyable scripts, manual verify checks, and OS-specific tabs. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-29.8 | AI command generation UI exposes prompt adjustments, preview diffs, risk warnings, and dry-run execution actions. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.34 — Editorial, high-variance, and creative UX design (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-30.1 | Inline media typography punctuation embeds small, rounded images inside headlines to serve as visual rhythm markers. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-30.2 | Asymmetric layout systems define left-aligned headlines, split screens, and unequal grid grids to avoid symmetric patterns. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-30.3 | Variance dial settings control layouts, asymmetry offsets, and element spacing to scale design expression from Swiss to Artsy. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-30.4 | Density and creativity controls dynamically adjust margin, padding, typography sizes, and color saturation boundaries. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-30.5 | Motion intent settings regulate spring physics, mounting animations, cascade stagger delays, and low-power performance budgets. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-30.6 | Modern serif web typography is limited to premium editorial headers and is banned from dashboard table views. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-30.7 | Visual contrast standards for luxury brand surfaces require HSL-tailored grays and forbid oversaturated gradients. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-30.8 | Anti-template guidelines prohibit generic filler text, scroll indicators, and common three-column feature cards. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.35 — Travel, hospitality, and map-centric UX (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-31.1 | Interactive geographic maps support keyboard panning, screen-reader marker summaries, zoom limits, and high-contrast boundaries. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-31.2 | Date-range pickers for reservations display localized calendars, holiday indicators, checkout policies, and clear duration math. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-31.3 | Multi-currency and price display components support localized formatting, fee breakdowns, tax exclusions, and instant conversion. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-31.4 | Map marker components use color-safe status indicators, screen-reader accessible badges, and readable text sizes. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-31.5 | Travel guidelines and safety disclosures are placed contextually in booking flows with translation options. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-31.6 | Review and feedback forms support star ratings with screen-reader labels, text descriptions, and photos uploads. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-31.7 | Booking status timelines show checkout countdowns, check-in instructions, host contact triggers, and cancellation rules. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-31.8 | Local address and name formats adjust dynamically to the user locale, postcode validation, and country-specific rules. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.36 — Hardware-integrated and platform-native UX (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-32.1 | Native accessibility API mappings translate web ARIA roles to iOS accessibility elements and Android accessibility nodes. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-32.2 | Haptic feedback guidelines specify spring-based tactile vibration patterns for buttons, alerts, and navigation gestures. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-32.3 | Dynamic screen constraints (such as notches, bezels, and dynamic islands) have safe area paddings defined in tokens. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-32.4 | Multi-device handoff state indicators show connection strength, active companion device, and synchronization progress. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-32.5 | System-level dark mode sync matches operating system appearance preferences and handles forced brightness levels. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-32.6 | Offline and low-power rendering modes disable expensive GPU effects, shadows, background blur, and animation loops. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-32.7 | Platform-specific controls (like Apple Liquid Glass or Android Material ripple) have CSS web equivalents mapped in components. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-32.8 | Print-friendly CSS and PDF export stylesheets render clean black-and-white layouts, hiding navigation menus and banners. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.37 — Figma libraries and handoff tools design (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-33.1 | Figma plugin UI constraints limit iframe sizes, match the Host theme, and enforce single-page scroll rules. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-33.2 | Figma variables structure aligns naming, modes, and density layers directly with repository token JSON files. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-33.3 | Handoff annotations capture responsive layouts, content constraints, keyboard models, and localization margins. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-33.4 | Token-sync plugin workflows provide change logs, diff previews, branch selection, and manual resolution rules. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-33.5 | Parity check scripts verify that figma component visual properties match live React code component variables. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-33.6 | Figma library updates publish change logs, breaking migrations, and deprecated components with version alignment. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-33.7 | Design plugins have owner names, installation steps, limits, and validation reports posted in documentation. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-33.8 | Designer workflow checklists require manual handoff walkthroughs before declaring components production-ready. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.38 — Agile productivity and issue-tracking UX (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-34.1 | Keyboard command menu (command palette) supports fuzzy searching, shortcut hints, recent actions, and custom triggers. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-34.2 | Issue lists support dense rows, status icon indicators, priority labels, assignee avatar tags, and multi-select actions. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-34.3 | Drag-and-drop board columns support keyboard-only reordering, focus states, drag handle indicators, and scroll-to-drag. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-34.4 | Keyboard shortcuts are documented in a contextual modal with custom remap options and master toggle. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-34.5 | Sub-task and dependency lists support nesting levels, status inheritance, blocker warnings, and creation flows. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-34.6 | Activity history timelines display creation event, status change logs, description diffs, and comments. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-34.7 | Issue creation dialogs support markdown editor fields, drag-and-drop image uploads, and quick-add templates. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-34.8 | Filter bar components support multi-value criteria, saved views, query sharing, and clear-all triggers. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.39 — Collaboration and concurrent editing UX (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-35.1 | Real-time concurrent editor cursors display user names, colored tracks, focus elements, and hover details. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-35.2 | User presence indicators show active status, last-seen timestamp, current workspace location, and avatar stack. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-35.3 | Activity feed panels show recent modifications, comment mentions, unread badges, and quick-jump links. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-35.4 | Notification preference grids allow per-channel tuning for emails, mobile pushes, desktop alerts, and weekly digests. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-35.5 | Rich-text block editing layouts support drag handles, typeahead menus (/ commands), block type conversion, and inline styling. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-35.6 | Workspace sharing and permissions dialogs list group access, guest invites, link sharing levels, and access expiry. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-35.7 | Document version history displays timeline logs, author names, restore page triggers, and inline deletion diffs. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-35.8 | Collaborative comment blocks support rich text, emoji reactions, resolution status, and email notification settings. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.40 — AI code editor and agentic interface UX (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-36.1 | AI chat sidebars display agent status, model info, token cost warnings, and citation link summaries. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-36.2 | Inline AI code generation supports split-view diffs, reject actions, apply triggers, and line-by-line comments. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-36.3 | AI context management lets users include file references, folder paths, workspace docs, and URL links. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-36.4 | Agent execution dashboards show active tool call steps, file access logs, terminal run outputs, and pause buttons. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-36.5 | AI response feedback controls include upvote/downvote buttons, copy options, and rate limit indicators. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-36.6 | Prompt template managers support customized prompts, system context overrides, and variable insertions. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-36.7 | AI-generated code warnings disclose non-production quality, license compliance, and safety review triggers. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-36.8 | Agent permission policies control terminal command execution, file writing, web requests, and code generation limits. | DYNAMIC | Unmet | Partial | Fully compliant |


## B.41 — Mainframe, cloud, and hybrid enterprise UX (Weight: 5%)

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| ENT-37.1 | High-density mainframe data tables support virtualization, server sorting, column locking, resize, and custom exports. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-37.2 | Data lineage flow diagrams visualize data sources, ETL transformation nodes, system endpoints, and owner details. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-37.3 | Export audit logs record file format, row counts, user identity, data classification, and retrieval reason. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-37.4 | Carbon-neutral computing dashboards alert users to data-center energy efficiency, green hours, and server usage. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-37.5 | Multi-system integration adapters display connection health, synchronization logs, API endpoints, and fallback plans. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-37.6 | Legacy application migration panels overlay older screens to guide users through modernized design equivalents. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-37.7 | Enterprise admin consoles manage tenant configuration, billing tiers, SCIM sync settings, and security policy rules. | DYNAMIC | Unmet | Partial | Fully compliant |
| ENT-37.8 | Cloud instance provisioning flows display cost estimation, resource capacity logs, region selection, and deployment progress. | DYNAMIC | Unmet | Partial | Fully compliant |


| PEND-4588 | **Agentic Theming Architecture**: Provide explicit instructions and semantic markers to enable autonomous agent modification. | DYNAMIC | Unmet | Partial | Fully compliant. Refs: [DSAF-B] |
| PEND-4631 | **Infrastructure-as-Code Bindings**: Design tokens must map to infrastructure terraform/CDK configurations if applicable. | DYNAMIC | Unmet | Partial | Fully compliant. Refs: [DSAF-B] |
| PEND-4633 | **DX-Focused Documentation**: Component examples must provide instant copy-paste sandboxes with zero-config. | DYNAMIC | Unmet | Partial | Fully compliant. Refs: [DSAF-B] |
| PEND-4635 | **Cross-Platform Token Translation**: Centralized token pipeline that strictly outputs to Swift, Kotlin, and CSS simultaneously. | DYNAMIC | Unmet | Partial | Fully compliant. Refs: [DSAF-B] |
| PEND-4636 | **Human Interface Constraints**: Strict enforcement of tap targets (44pt) and dynamic type scaling per OS specs. | DYNAMIC | Unmet | Partial | Fully compliant. Refs: [DSAF-B] |
| PEND-4637 | **Plugin Extension Architecture**: UI components must support constrained sandboxed execution (e.g., iframe or web worker UI). | DYNAMIC | Unmet | Partial | Fully compliant. Refs: [DSAF-B] |
| PEND-4638 | **High-Performance Micro-animations**: Components use composite layers (opacity, transform) to ensure 60fps animations. | DYNAMIC | Unmet | Partial | Fully compliant. Refs: [DSAF-B] |
| PEND-4639 | **User-Generated Layout Adapters**: Grid layouts support arbitrary nesting without layout shifting or broken flex constraints. | DYNAMIC | Unmet | Partial | Fully compliant. Refs: [DSAF-B] |
| PEND-4640 | **AI-Driven IDE Tooling**: Include VS Code / IDE snippets and AST-based validators for component implementation. | DYNAMIC | Unmet | Partial | Fully compliant. Refs: [DSAF-B] |
| PEND-4641 | **Enterprise Multi-Product Theming**: Base variables can be completely overridden at runtime by tenant or sub-brand tokens. | DYNAMIC | Unmet | Partial | Fully compliant. Refs: [DSAF-B] |
