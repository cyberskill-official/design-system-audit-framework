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
| B2.1 | **Match between system and real-world / user mental model** (Nielsen H2) | FIXED | Mismatch | Familiar terminology | Validated by tree-test / card-sort with the actual audience |
| B2.2 | **Navigation consistency** across product surfaces (Nielsen H4) | FIXED | Each section reinvents nav | Shared nav component | Cross-surface nav unification (Polaris 2025 unified Admin / Checkout / Customer Accounts is the benchmark) |
| B2.3 | **Findability** | FIXED | No search | Search box | Faceted search, recent/saved, AI search; analytics close the loop on zero-results |
| B2.4 | **Wayfinding** (breadcrumbs, page titles, focus visible) | FIXED | Missing | Present | Plus visited-state, progress indicators, "you are here" pattern in deep flows |
| B2.5 | **Card sorting / tree testing** done at IA design time | FIXED | None | Once at launch | Re-validated at every major IA change |

---

## B.3 — Interaction Design (Weight: 11%)

**Maps to doctrine:** Tier-1 components (feedback states), enterprise patterns, agentic UX.

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| B3.1 | **Visibility of system status** (Nielsen H1) — feedback within 100ms / 1s / 10s | FIXED | None | Loading states present | Skeleton screens, optimistic UI, real-time progress, async-safe UI patterns |
| B3.2 | **Affordances & signifiers** | FIXED | Ambiguous | Standard buttons, links, fields | Strong visual affordances per platform; verified via 5-second testing |
| B3.3 | **Error prevention & recovery** (Nielsen H5 + H9) | FIXED | Errors crash flow | Validation + clear messages | Inline validation, undo (Gmail-style), structured "what happened, what to do next" error copy |
| B3.4 | **Empty states** | FIXED | Blank | Generic "no data" | Educational, action-oriented empty states with primary action and link to docs |
| B3.5 | **Loading & skeleton states** | FIXED | Spinner only | Skeletons | Variable-length skeletons matching real content; perceived performance optimised |
| B3.6 | **User control & freedom** (Nielsen H3) — undo, redo, cancel, escape | FIXED | None | Cancel buttons | Undo on destructive actions; pending-state cancellation; persistent drafts |
| B3.7 | **Spatial / 3D interaction** (visionOS-class) | DYNAMIC | N/A | Touch + keyboard only | Spatial guidance for eye tracking, hand gestures, depth, spatial audio |
| B3.8 | **Agentic-UX patterns** | DYNAMIC | None | Static AI features | Documented patterns for human-on-the-loop, human-in-the-loop, mixed initiative, confidence visualisation, source attribution, recovery |

---

## B.4 — Visual Design & Hierarchy (Weight: 8%)

**Maps to doctrine:** foundations (voice / anchors), design language.

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| B4.1 | **Visual hierarchy** | FIXED | Flat or chaotic | Scale + weight + color hierarchy | Scientifically validated via eye-tracking / 5-second test; primary action obvious |
| B4.2 | **Aesthetic & minimalist design** (Nielsen H8) | FIXED | Cluttered | Clean | Every visual element justifies its presence; intentional negative space |
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

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| B7.1 | **Heuristic evaluation cadence** | FIXED | Never | Pre-launch | Quarterly heuristic eval per surface; documented findings tracked to closure |
| B7.2 | **Visibility of system status** (H1) | FIXED | Poor | Adequate | Excellent — feedback at 100ms, 1s, 10s thresholds |
| B7.3 | **Match real-world** (H2) | FIXED | System jargon | User language | Validated via interviews + glossary |
| B7.4 | **User control & freedom** (H3) | FIXED | None | Cancel/back | Undo, redo, draft persistence, escape |
| B7.5 | **Consistency & standards** (H4) | FIXED | Inconsistent | Consistent within product | Consistent within product *and* with platform conventions (Apple HIG / Material) |
| B7.6 | **Error prevention** (H5) | FIXED | None | Validation | Constraint-based input (date pickers, masks); confirm-destructive |
| B7.7 | **Recognition over recall** (H6) | FIXED | Memorise cmds | Persistent labels | Recently-used, autocomplete, smart defaults |
| B7.8 | **Flexibility & efficiency** (H7) | FIXED | None | Some shortcuts | Keyboard shortcuts, command palette, customisation (Linear-class) |
| B7.9 | **Aesthetic & minimalist** (H8) | FIXED | Cluttered | Reasonable | Intentional |
| B7.10 | **Help users recognize / diagnose / recover from errors** (H9) | FIXED | "Error 500" | Plain English | Plain English + suggested action + recovery link + reduce blame language |
| B7.11 | **Help & documentation** (H10) | FIXED | None | FAQ | Contextual help, in-product tours, AI-assisted help |
| B7.12 | **Shneiderman additions** (informative feedback, dialog closure, easy reversal of actions) | FIXED | Not assessed | Most present | All 8 golden rules verified |

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

*End of criteria. Read [`05-running-an-audit.md`](./05-running-an-audit.md) for the playbook that uses these.*
