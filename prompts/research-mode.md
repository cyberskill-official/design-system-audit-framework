# Prompt: Industry research

> Standalone prompt for the research portion of an audit. Use this independently to refresh knowledge of evolving standards before a SCAN cycle, or as a quarterly DYNAMIC re-score input.

---

You are running an **industry research pass** for a design system audit using the Design System Audit Framework. Your job is to surface what's changed in the industry since the last audit, decide which changes warrant adoption, and produce a research log that will be inlined into the next audit's §11.

## Goal

Produce a markdown table:

| ID | Source | Summary | Decision | Rationale |
|---|---|---|---|---|

with one row per notable industry update. Decisions: **adopt** (move into next audit's §3 as a finding), **note** (logged but no action), **defer** (revisit next quarter).

## Scope — research at minimum

### Standards bodies

- **W3C** — WAI / WCAG 2.x and WCAG 3.0 working drafts; CSS Working Group; Web Components Working Group.
- **DTCG (Design Tokens Community Group)** — token format updates (currently 2025.10).
- **APCA-W3** — contrast algorithm versions (currently v0.1.9).
- **Anthropic / OpenAI / Google** — MCP (Model Context Protocol) updates and similar agent protocols.
- **TC39** — ECMAScript proposals affecting design tokens (Records, Tuples, etc.).

### Major design systems

- **Material 3** (Google) — releases, density model updates, Wear OS / spatial guidance.
- **Polaris** (Shopify) — unified Admin / Checkout / Customer Accounts cycle.
- **Carbon** (IBM) — version increments, Web Components vs React strategy.
- **Spectrum** (Adobe) — React Aria / Spectrum architecture, S2 evolution.
- **Atlassian Design System** — federated contribution model.
- **Salesforce Lightning** — accessibility commitments.
- **Apple HIG** + **Material on Wear OS** — platform conventions.

### Privacy / legal / compliance

- **GDPR / CCPA / CPRA / PDPL** — enforcement actions and case law.
- **EU AI Act** — applicable dates and guidance for in-scope products.
- **EAA (European Accessibility Act)** — current applicability and enforcement.
- **FTC** — dark-pattern enforcement (Amazon, Adobe, etc.).
- **Section 508 / EN 301 549** — refresh dates.

### Performance + Web Vitals

- **Google Core Web Vitals** — INP threshold updates, new metrics (e.g., interaction latency).
- **HTTP Archive** — annual Web Almanac findings on adoption.

### Emerging tech

- **visionOS / Quest / Wear OS** — spatial computing guidance.
- **CSS color-mix()**, **light-dark()**, **color-scheme**, **prefers-reduced-transparency** — feature support evolution.
- **AI agentic UX** — published patterns for human-on-the-loop vs human-in-the-loop.

## Procedure

For each item:

1. Use web search to find the most recent authoritative source (W3C, vendor blog, vendor docs, regulator's official site).
2. Note the date of the change.
3. Summarise in one sentence.
4. Compare to the design system's current handling of the area.
5. Decide:
   - **adopt** — concrete change to make in the next FIX cycle.
   - **note** — track but no action this cycle.
   - **defer** — revisit next quarterly research pass.
6. Justify the decision in one sentence.

## Output

```markdown
# Industry research — YYYY-MM-DD

| ID | Source | Summary | Decision | Rationale |
|---|---|---|---|---|
| R-001 | https://w3c.github.io/silver/ | WCAG 3.0 working draft adds APCA as a pass criterion | adopt | already conformant via `check-apca.mjs`; no change needed but worth noting |
| R-002 | https://design-tokens.github.io/community-group/ | DTCG schema 2025.10 stable | note | already conformant |
| R-003 | https://www.shopify.com/polaris/web-components | Polaris ships full web components 2025-Q3 | note | model for our cross-framework strategy; no immediate action |
| R-004 | <vendor blog> | <update> | adopt / note / defer | <one-sentence why> |

## Notes for the next SCAN

<bullet list of updates that should change scoring or rubric anchors in the next audit>

## Adopt list — items for the next FIX cycle

<bullet list, each with the affected criterion and a preliminary finding row>
```

## Hard rules

1. Cite verifiable sources only. Vendor blog posts, official spec text, regulator's site, peer-reviewed research. Random tweets and aggregator posts are not citations.
2. **No marketing language.** Don't say a system is "industry-leading" because the vendor says so. Compare to objective rubric anchors.
3. Distinguish between **proposal**, **draft**, **stable**, and **deprecated**. A WCAG 3.0 working draft is not a standard you have to comply with; APCA-W3 v0.1.9 is conditionally adoptable; ECMAScript Stage 4 is committed; Stage 1 is speculation.
4. Flag conflicts. If two competing standards exist (e.g., DTCG vs Style Dictionary's older format), surface the conflict — don't silently pick one.
5. Note deprecations. If a method, API, or framework is deprecated by its owner, flag for retirement in the design system.

Begin.
