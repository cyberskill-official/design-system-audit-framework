# Maximal Enterprise Benchmark Loop

**Status:** normative overlay for strict file and URL audits.  
**Applies to:** direct `DESIGN.md` audits, public design-system URL scans, DSAF self-audits, and enterprise reviews that need evidence beyond a normal 0-5 rubric score.  
**Does not replace:** DSAF-25, the canonical 125 DSAF criteria, L0-L5 levels, SCAN/FIX modes, or the no-silent-regression rule.

---

## 1. Purpose

The normal DSAF score answers: "How mature is this design system across the canonical criteria?"

The maximal enterprise loop answers: "Across all meaningful large-enterprise design-system concerns, which requirements are already evidenced, which can be fixed automatically, and which require human proof?"

Earlier versions exposed separate doctrine, artifact, and manual scorecards. The current model absorbs those ideas into one comprehensive criterion table. Every row declares:

- `AUTO` when the requirement can be satisfied by source doctrine, real artifacts, generated outputs, scripts, examples, tests, or crawler-visible documentation;
- `MANUAL` when the requirement requires human evidence such as counsel review, manual assistive-technology testing, independent audit, customer research, designer workflow review, production telemetry review, or accountable sign-off.

This prevents three common scoring mistakes:

- prose earning artifact credit;
- human-only proof blocking automatable work forever;
- manual obligations disappearing inside a single optimistic score.

---

## 2. Criterion Universe

The maximal runner scores one unified table:

| Criterion source | Count | Purpose |
|---|---:|---|
| Canonical DSAF criteria | 125 | The stable public DSAF rubric across system quality and produced UX quality. |
| Absorbed proof-loop criteria | 30 | Strict requirements formerly represented as separate doctrine, artifact, and manual scorecards. |
| Enterprise expansion criteria | 216 | Additional large-enterprise coverage across governance, tokens, Figma parity, components, accessibility, localization, privacy, AI, security, sustainability, support, procurement, vertical packs, migration, docs, and URL audits. |
| Total | 371 | Full maximal enterprise table produced in every `ANALYZED_DESIGN_REPORT.md`. |

The exact expansion lives in `scripts/maximal-audit.mjs` so generated cases are reproducible.

---

## 3. Required Report Columns

`ANALYZED_DESIGN_REPORT.md` MUST include the section `Full Enterprise DSAF Criterion Scores And Suggestions` with this table shape:

| Column | Meaning |
|---|---|
| `ID` | Stable criterion id from canonical DSAF, absorbed proof-loop criteria, or enterprise expansion. |
| `Type` | `AUTO` or `MANUAL`. |
| `Category` | Criterion family or enterprise coverage area. |
| `Criterion` | Requirement being evaluated. |
| `Score` | Heuristic evidence score out of 100. |
| `Level` | L0-L5 estimate derived from the row score. |
| `Confidence` | Evidence confidence for the current scan. |
| `Evidence found` | Signals found in scanned files or crawled pages. |
| `Missing signals` | Signals not found and therefore suggested for improvement. |
| `Citation refs` | Source reference IDs resolved in the report appendix. |
| `Required proof` | What evidence closes the row. |
| `Suggested improvement` | What to add or strengthen. |
| `Acceptance gate` | How the row becomes claimable. |
| `Output action` | Preserve, apply to improved doctrine, or retain as manual evidence backlog. |

The report MUST also include a `Source Reference Appendix` with source id, source name, source type, URL or path, fetched date, and confidence.

---

## 4. Output Contract

Each maximal audit produces exactly two files:

| Output | Contents |
|---|---|
| `ANALYZED_DESIGN_REPORT.md` | Scores, scan metadata, evidence, citations, criterion suggestions, crawler limitations, and output contract. |
| `IMPROVED_DESIGN.md` | A standalone improved doctrine. For direct file inputs, the full source doctrine is preserved after the applied requirements. For URL inputs, the crawled public corpus is preserved as reference material after the suggested doctrine. |

Generated outputs MUST NOT include commercial packaging, pricing, lead magnets, service plans, or monetization strategy. Those belong in source documentation such as `docs/strategy/framework-monetization-plan.md`.

---

## 5. Loop Protocol

1. Re-analyze the input `DESIGN.md` or public URL.
2. Score the unified enterprise criterion table.
3. Research current official sources for weak or uncertain rows.
4. Implement approved improvements in the doctrine and real artifacts where possible.
5. Re-create generated artifacts affected by the change.
6. Re-run the audit and checker.
7. Repeat until all `AUTO` rows score perfect, no automatable hard blockers remain, all generated artifacts are fresh, and all `MANUAL` rows are explicitly routed to human proof.

Manual evidence rows do not block the automated loop when they are correctly labeled, owned, and prevented from audited claims until evidence exists.

---

## 6. File And URL Modes

Direct file mode:

```bash
npm run audit:maximal -- --input /path/to/DESIGN.md --out docs/generated/my-file-case
```

URL mode:

```bash
npm run audit:maximal -- --input https://design-system.service.gov.uk/ --out docs/generated/govuk-url-case --max-pages 8
```

Regression case loop:

```bash
npm run audit:maximal:cases
npm run check:maximal:cases
```

The built-in case loop clears and regenerates:

- `docs/generated/design-md-fixtures/`
- `docs/generated/maximal-cases/`

It must produce 10 direct file cases, 10 URL cases, and 40 output files.

---

## 7. Source Watch

Maximal audits cite official sources first. The current watch list includes:

- DTCG design token reports.
- WCAG, WAI, and ARIA APG.
- Carbon accessibility and AI label guidance.
- GOV.UK accessibility guidance.
- React Aria.
- Fluent, Polaris, Primer, Atlassian, SAP Fiori, Salesforce Lightning, Material, Apple Liquid Glass, and Ant Design guidance.
- C2PA provenance specifications.
- Web Sustainability Guidelines.

Use source IDs in generated reports rather than naked external claims.

*End of maximal enterprise benchmark loop.*
