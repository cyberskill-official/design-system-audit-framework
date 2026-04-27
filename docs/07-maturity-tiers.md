# 07 — Maturity tiers

The framework reports a single **combined score** (Part A and Part B averaged) and maps it to a **tier** from L0 to L5. Tier names borrow from CMM and ITIL, with criteria specific to design systems.

---

## §1 The six tiers

| Tier | Combined score | Name | Meaning |
|---|---|---|---|
| L0 | < 40% | **Initial** | Ad-hoc; everything is project-by-project. Tokens may exist but live as hex codes in stylesheets. No shared component library. No documentation beyond a README. |
| L1 | 40–55% | **Repeatable** | Some patterns are reused. A button component exists somewhere. Tokens are named but not enforced. Documentation is sparse, often out of date. No governance. |
| L2 | 55–65% | **Defined** | The system is documented and named. There's an owner. Basic tokens (colour + spacing + typography) ship in code. Light/dark modes exist for at least one UI surface. Versioning is informal. |
| L3 | 65–75% | **Managed** | The system is versioned in CI. There's a Storybook (or equivalent). Token coverage is measured. Components have variant matrices. WCAG 2.x AA self-claimed. Adoption tracked manually. |
| L4 | 75–85% | **Managed (advanced)** | Multi-platform tokens (CSS + Swift + Android). RFC process for changes. CI gates on bundle size, contrast, and a11y. Federated contribution model. Roadmap public. Adoption telemetry exists. |
| L5 | 85%+ | **Optimised** | Industry-leading on multiple categories. Independently audited a11y. Open source. Multi-framework distribution. AI-native (MCP server, DESIGN.md, Code Connect). Telemetry-driven improvement loop. Trend data across ≥ 2 audits. |

The tier is a coarse summary. Two systems at "L4" can look very different — one weak on a11y but strong on tooling, the other the reverse. Always read the per-category roll-up alongside the tier.

---

## §2 Enterprise-grade thresholds

A system is **enterprise-grade** if it passes **every** threshold below. These are floors; above them you keep climbing.

| Requirement | Floor |
|---|---|
| Combined score | ≥ 65% |
| `A.8` Accessibility (system) | ≥ 75% |
| `B.5` Accessibility & Inclusive (UX) | ≥ 75% |
| `A.1` Foundations & Tokens | ≥ 70% |
| `A.4` Governance | ≥ 60% |
| `A.3` Documentation | ≥ 65% |
| Any single category | ≥ 40% |

A system can score **90% combined** and still fail enterprise-grade if `A.8` Accessibility is at 73%. The framework reports both numbers — do not mistake the combined score for compliance.

### Why these specific floors

- **`A.8` and `B.5` at 75%.** Two of the only legally-actionable categories (EAA, ADA, EN 301 549). Below 75%, you have not "documented enough to ship to enterprises".
- **`A.1` at 70%.** Without a real token foundation, every other category compounds inconsistency. Tokens must be solid before anything else can be.
- **`A.4` at 60%.** Without governance, the system drifts. A 60% floor catches systems with no ownership, no RFC process, no semver discipline.
- **`A.3` at 65%.** Documentation is the single biggest predictor of adoption. Below 65%, consumers abandon the system.
- **No category < 40%.** A category at 0% suggests the system either pretends it doesn't need that pillar, or has never measured it. Either way: not enterprise-ready.

### What "enterprise-grade" does NOT mean

- It does **not** mean the system is "the best" — only that it crosses the floors.
- It does **not** replace a third-party audit. A WCAG-AA self-claim caps at 4/5; a vendor letter is still required for legal compliance.
- It does **not** guarantee customer adoption. A system can pass enterprise-grade and have zero internal teams using it. Adoption is a separate journey.
- It does **not** mean "L5". Many systems pass enterprise-grade at L4.

---

## §3 What it takes to climb each tier

### L0 → L1 (40%)

You need: a single token file (any format, even CSS variables), one component that's actually shared between two projects, and one written description of how to use it. That's it. Most ad-hoc design teams already meet L1 without realising.

### L1 → L2 (55%)

You need: an owner (named person or team), basic tokens for colour + spacing + typography, documented usage for the top 5 components, and at least one repeatable thing that proves the system isn't just one person's preferences (e.g., a Figma library shared with > 3 designers).

### L2 → L3 (65%)

You need: tokens in DTCG-compliant JSON format, ≥ 15 components shipped, Storybook hosted (or similar), CI that doesn't let main break, a11y self-claim per component, semver discipline, an `_audit/` folder with at least one prior audit. This is the threshold for "we have a design system, we're not making it up as we go".

### L3 → L4 (75%)

You need: multi-platform output (at minimum: CSS + JS/TS for the same tokens), bundle-size budgets enforced in CI, automated visual regression testing, an RFC process with a public archive, a deprecation policy, documented density variants, and a roadmap visible to consumers. This is the threshold for "we can support multiple product teams".

### L4 → L5 (85%)

You need: an independent third-party WCAG audit on file, a public OSS release with > 50 GitHub stars and ≥ 5 external contributors, multi-framework distribution (web components + at least one wrapper), an MCP server or equivalent agent integration, generative theming or similar advanced tooling, ≥ 2 prior audits with trend data, and at least one named customer using the system in production with measurable adoption metrics. This is the threshold for "industry-leading, not just self-described".

---

## §4 Why L5 is hard

The biggest L4-to-L5 gates are **time** and **external action**, not engineering effort:

- **Independent vendor audit** — 4–6 weeks vendor delivery + remediation cycle. ~$3–15K.
- **Conference talk accepted** — selection rate ~10–20% at major venues. Requires submission cycles + multiple drafts.
- **External contributors** — community building takes months minimum.
- **Trend data across ≥ 2 audits** — calendar-bound.
- **Named customer adoption** — sales cycle 6–18 months minimum.

A system can have *everything else* at L5 and still cap at ~88% because it lacks one of these gates. That's not a flaw — it's the framework being honest about what "industry-leading" actually means.

---

## §5 Tier transitions and the no-downgrade rule

The framework's no-downgrade rule (per [`02-framework.md`](./02-framework.md) §4) means a signed audit's combined score cannot be lower than the prior audit's. **But the tier might still change** if you cross a threshold downward via a DYNAMIC rubric tightening.

Example: at audit N, your `A.8` was at 76% (above the enterprise floor of 75%). At audit N+1, the WCAG 3.0 floor moved up and `A.8.6` re-scored from 5 to 4 — your `A.8` category drops to 74%. **Combined score didn't regress** (other categories rose), so the audit signs. **But** you are no longer enterprise-grade because of the threshold breach.

The framework reports this clearly: `enterprise_grade: false` in the frontmatter, with §3 calling out the specific threshold that broke. You don't get auto-downgraded on tier — you stay at whatever your combined score says — but you lose the enterprise-grade flag until you climb back above the floor.

---

## §6 Tier-aware language

When communicating internally or externally, prefer:

| Instead of | Say |
|---|---|
| "We're at L4." | "We crossed L4 in audit `<date>` with `<combined %>` combined; A.8 at `<x>` is the gate to L5." |
| "We're enterprise-grade." | "We pass all 7 enterprise-grade thresholds as of audit `<date>`." |
| "We're industry-leading." | "We're at L5 Optimised on `<combined %>`. The remaining gap to a perfect score is `<external action>` — not framework theatre." |
| "We're better than `<competitor>`." | The framework doesn't compare systems. Score yourself; let consumers compare. |

The framework refuses to produce a "we're better than X" claim. There is no leaderboard. Two systems at the same combined score can have entirely different shapes and trade-offs.

---

*Continue to [`08-improvement-plan.md`](./08-improvement-plan.md) for how to turn the audit into a phased plan.*
