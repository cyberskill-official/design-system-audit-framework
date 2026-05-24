---
id: FR-CORE-001
title: "Build DSAF-25 Core subset — one printable page, designer-readable in 5 min, PM-quotable in a meeting"
module: CORE
priority: MUST
status: done
verify: I
phase: P0
milestone: P0 · slice 1 · Pre-launch hardening
slice: 1
owner: Stephen Cheng (Founder)
created: 2026-05-17
shipped: 2026-05-18
related_frs: [FR-BRAND-002, FR-BRAND-003, FR-CORE-002, FR-CORE-003, FR-CORE-004, FR-DOCS-001, FR-INTEG-001, FR-CLI-001]
depends_on: []
blocks: [FR-BRAND-003, FR-DOCS-001, FR-CONTENT-001, FR-INTEG-001, FR-INTEG-002, FR-INTEG-003, FR-BENCH-001, FR-I18N-001, FR-CLI-001]
source_pages:
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Honest critique item 1 — '125 criteria is a barrier, not a feature')"
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Phase 0 — Pre-launch hardening, action 1)"
  - "framework/03-criteria-part-a.md (Part A — 10 categories, 63 criteria)"
  - "framework/04-criteria-part-b.md (Part B — 10 categories, 62 criteria)"
source_decisions:
  - "DEC-008: DSAF-25 is a non-overlapping subset of DSAF-125 — every Core criterion is verbatim a DSAF-125 criterion; no re-coined wordings"
  - "DEC-009: DSAF-25 score is comparable to (not the same as) DSAF-125 — published as a separate percentage, never as a substitute"
  - "DEC-010: the one-page card format is the canonical share-handle (the 12factor.net of DSAF) — screenshottable, printable, in-meeting-quotable"
language: markdown
service: doctrine
new_files:
  - framework/dsaf-25.md
  - framework/dsaf-25-card.md
  - assets/dsaf-25-card.svg
  - assets/dsaf-25-card-print.pdf
  - docs/core/FR-CORE-001-dsaf-25-contract.json
  - scripts/dsaf-25-contract-lib.mjs
  - scripts/check-dsaf-25-contract.mjs
  - scripts/check-dsaf-25-contract.test.mjs
modified_files:
  - README.md
  - guidelines/01-introduction.md
  - internal/branding/glossary.md
  - templates/audit-report-template.md
  - package.json
  - scripts/dsaf-verify.mjs
allowed_tools:
  - "file_read/write docs/**, assets/**, README.md, templates/**"
  - "SVG editing (hand-written or via Figma export)"
  - "PDF generation from SVG via wkhtmltopdf / Inkscape"
  - "grep / ripgrep for cross-references"
disallowed_tools:
  - "rewrite Part A or Part B criterion IDs or rubric anchors — that is FR-CORE-003 scope; this FR is purely additive"
  - "introduce criteria that don't exist verbatim in DSAF-125 — every Core item MUST be an exact subset"
  - "ship the card SVG behind a paywall, on a third-party hosted slide deck, or in any non-repo location — the card lives in the repo and at dsaf.dev"
effort_hours: 8
sub_tasks:
  - "1. (1h) Re-read framework/03-criteria-part-a.md and framework/04-criteria-part-b.md; tabulate every criterion with weight + tag (FIXED/DYNAMIC)"
  - "2. (1h) Apply the selection methodology in §3 (rubric, weight, coverage); pick 25 criteria"
  - "3. (2h) Author framework/dsaf-25.md per §3 — full prose page with the 25 criteria, rationale, scoring formula, and 'how to use' section"
  - "4. (1h) Author framework/dsaf-25-card.md — the one-page card text version (Markdown source for the SVG and PDF renderers)"
  - "5. (2h) Hand-render assets/dsaf-25-card.svg (24-inch printable, 8.5×11 letter and A4 versions); confirm Lighthouse for the inline SVG when embedded on dsaf.dev"
  - "6. (30m) Render assets/dsaf-25-card-print.pdf via Inkscape or headless Chrome from the SVG"
  - "7. (30m) Patch README.md, guidelines/01-introduction.md, internal/branding/glossary.md per §3 cross-links"
  - "8. (30m) Add the DSAF-25 Core scoring block to templates/audit-report-template.md (additive — does not break DSAF-125 scoring)"
  - "9. (30m) PR description includes a printed test (literally print the PDF and time a designer reading it; capture the result)"
risk_if_skipped: "Without a DSAF-25 Core subset, the framework's 125-criterion surface stays un-shareable. The plan §Honest critique item 1 is explicit: 'No one will ever screenshot it. There must be a Core 25 that fits on one page and is what 90% of people quote.' Every methodology brand that broke through had a memorable surface form — DORA's four metrics, 12-factor's twelve lines, SAMM's fifteen practices. DSAF without a Core is a framework that admires its own depth and cedes the share-graph to less rigorous competitors. Skipping this FR also blocks FR-BRAND-003 (the L0–L5 + radar visual identity needs the Core 25 to render at a meaningful resolution), FR-DOCS-001 (the README's hero section needs a Core handle to lead with), FR-INTEG-001/002/003 (the Storybook addon and validators are infeasible at 125-criterion scope — they're feasible at 25), FR-BENCH-001 (the lite benchmark survey can only realistically run the Core 25, not all 125), FR-I18N-001 (translating 25 criteria is plausible; translating 125 is not), and FR-CLI-001 (`npx dsaf scan` is the headline P5 deliverable and needs the Core 25 to score in 60 seconds)."
implementation_kind: mocked
---

**2026-05-18 strict execution note:** stale status was reset and FR-CORE-001 was re-processed with an executable DSAF-25 contract. `npm run contract:dsaf-25` verifies the exact 25 IDs, all A1-A10/B1-B10 category coverage, verbatim criterion names and tags against DSAF-125, inline public-card SVG requirements, printable PDF bounds, the `dsaf_25_score` template field, and writes `outputs/_audit/dsaf-25-contract.json`. The designer five-minute read and PM recall trials are physical human-validation gates, so their request/response shape is captured by the mocked validation contract.

## §1 — Description (BCP-14 normative)

The framework MUST publish a one-page subset of the 125 DSAF Criteria called `DSAF-25 Core`. The subset is a *selection* of existing criteria — no new criteria are coined, no rubric anchors are rewritten. The subset is what readers screenshot, what conference-talk slides reference, what `npx dsaf scan` returns in 60 seconds, and what a DS lead can quote in a meeting without opening a doc.

1. **MUST** select exactly 25 criteria from DSAF-125 per the selection methodology in §3. Every Core criterion is a verbatim quote of an existing DSAF-125 criterion (same ID, same name, same 0-3-5 rubric anchors, same FIXED/DYNAMIC tag). Re-coining or re-wording is forbidden — if a criterion's wording is wrong, fix it in DSAF-125 first (via FR-CORE-003), then quote it in DSAF-25.
2. **MUST** distribute the 25 across **all 10 Part A categories AND all 10 Part B categories** with at least one criterion per category. Mechanically: A.1 → A.10 each contribute at least one criterion (10 from Part A minimum); B.1 → B.10 each contribute at least one criterion (10 from Part B minimum); the remaining 5 slots are allocated to high-weight categories per the rubric weight table. Final tally (per §3 selection): Part A = 15 Core (covering all 10 categories), Part B = 10 Core (covering all 10 categories — one per category).
3. **MUST** ship four artefacts in the same PR: (a) `framework/dsaf-25.md` — the canonical prose page with the 25 criteria, full rubric anchors, scoring formula, and "how to use" section; (b) `framework/dsaf-25-card.md` — the one-page card text (Markdown source for the renderers); (c) `assets/dsaf-25-card.svg` — the hand-rendered one-page SVG, sized for both 8.5×11 letter and A4 print; (d) `assets/dsaf-25-card-print.pdf` — the print-ready PDF rendered from the SVG.
4. **MUST** define the DSAF-25 score as a separate percentage from DSAF-125, never as a substitute. Specifically: `dsaf_25_score% = (Σ criterion_score / (5 × 25)) × 100`; the score is reported alongside (not in place of) the DSAF-125 `combined%`. Audit reports list both numbers; cited tiers (per FR-CORE-004) MAY use DSAF-25 OR DSAF-125 as the basis, but MUST disclose which.
5. **MUST** establish the **5-minute readability target**: a working designer (≥ 2 years DS experience) reads `framework/dsaf-25.md` cover-to-cover in ≤ 5 minutes without skimming. The PR ships *one* timed read result as evidence — the designer is not the founder (the founder is too close); the designer is named in the PR description.
6. **MUST** establish the **PM-quotable target**: a product manager (no prior DS experience) reads the one-page card and can quote exactly one criterion verbatim in a meeting 60 minutes later. The PR ships *one* such test — the PM is named, the criterion they quoted is captured, the elapsed time is recorded.
7. **MUST** publish the one-page card SVG at `dsaf.dev/card` as an embedded `<svg>` element (not an `<img>` to an external URL), so the page-source contains the readable text. Screen-reader users and search-engine crawlers MUST be able to extract the 25 criteria from the page without rendering. The SVG MUST include `<title>` and `<desc>` elements per WAI-ARIA SVG accessibility patterns.
8. **MUST** preserve the 0–5 scoring scale unchanged from DSAF-125. The DSAF-25 Core uses the same anchors (0=Absent, 1=Mentioned, 2=Defined, 3=Built, 4=Measured, 5=Industry-leading); the same FIXED/DYNAMIC tags; the same confidence ratings (Hi/Med/Lo). The only difference is the *count* of criteria scored.
9. **MUST** map every Core criterion back to its DSAF-125 ID. The `framework/dsaf-25.md` table includes a `Source` column citing `A1.1` / `A2.4` / `B5.3` / etc. The mapping is the audit-trail that lets a Core score be cross-validated against a DSAF-125 score: any team that has scored DSAF-125 can derive its DSAF-25 score by selecting the 25 rows; the two scores are mathematically related but not identical (different denominators).
10. **MUST** include in `framework/dsaf-25.md` a "How to use" section covering: (a) the 60-second self-score (one row per minute, "0 / 3 / 5" gut-check), (b) the cap rule per FR-CORE-004 (DSAF-25-based cited tiers ALSO cap at L3 unverified, L4 verified, L5 verified + entry-gate stack), (c) the relationship to DSAF-125 (DSAF-25 is the *entry point*, not the *replacement*; the full 125 remains the authoritative rubric).
11. **MUST** keep DSAF-25 versioned alongside DSAF-125 — Core changes only when DSAF-125 changes. If FR-CORE-003 dedups two Part A criteria into one, the DSAF-25 selection MUST be re-validated in the same PR. The version pin is recorded in `framework/dsaf-25.md` frontmatter as `dsaf_125_version: <YYYY-MM-DD>`.
12. **MUST NOT** market DSAF-25 as a "simpler DSAF" or "DSAF Lite." The framing is "DSAF-25 Core is the share-handle for DSAF-125." A team that runs DSAF-25 and stops there is undertaking a *first-pass* audit, not a *complete* audit. The "How to use" section makes this explicit.
13. **MUST** include `framework/dsaf-25.md` in `guidelines/01-introduction.md` Reading Order (insert between current items 2 and 3 — "skim DSAF-25 Core before reading the full 125 — it's the recommended entry point").
14. **MUST** add a `dsaf_25_score%` field to the YAML frontmatter of `templates/audit-report-template.md`, distinct from the existing `combined%` field. Audit reports populate both fields; downstream tooling (FR-INTEG-001 / FR-INTEG-002 / FR-INTEG-003 / FR-CLI-001) reads `dsaf_25_score%`.
15. **MUST** ensure the one-page card SVG fits on a single sheet at both 8.5×11 letter (US) AND A4 (international) without scaling. The SVG viewBox is sized to A4 (210×297 mm) with letter (216×279 mm) as a guaranteed-fit subset; print CSS handles the small overshoot for letter readers (margins absorb it). Both formats render at ≥ 11pt body text.

---

## §2 — Why this design

**Why 25 (§1 #1):** 125 is un-shareable; 4 is too few to capture the multi-dimensional nature of design systems; 25 is the smallest number that gives every Part A and Part B category at least one Core criterion (10 + 10 = 20 minimum) with 5 slots for high-weight categories. The plan called for "a Core 25" specifically. Below 25 leaves at least one category without representation (which would be a credibility weakness — "you don't think performance matters?"); above 25 stops fitting on one page at 11pt.

**Why every-category representation (§1 #2):** the cardinal failure of a Core subset is missing a category. A DS lead at a fintech company who cares deeply about accessibility scanning the Core 25 and not seeing A.8 (Accessibility) represented will reject the framework as un-serious. Coverage-of-every-category is the credibility tax we pay for ditching the long form.

**Why verbatim quoting (§1 #1, #8):** the Core is the framework's *share-handle*. If a DS lead at GitHub reads the DSAF-25 card and then later runs a DSAF-125 audit, the criteria they encountered in the Core MUST be byte-identical to what they encounter in the full rubric. Re-wording in Core would create a "Core vs full" inconsistency — exactly the kind of drift the plan §"Honest critique" item 1 calls out (multiple surfaces for the same thing).

**Why two scores, not one (§1 #4):** DSAF-25 and DSAF-125 are different denominators. A team that scores 100/125 on DSAF-125 has 80% combined; the same team could score 22/25 on DSAF-25 = 88% — slightly higher because the Core is biased toward "things every system should have," and a system at 80% on the full rubric is plausibly stronger on Core. Publishing one score forces a choice that obscures the relationship. Publishing both lets readers see the relationship.

**Why hand-render the SVG and not auto-generate it (§1 #3):** the one-page card is the framework's iconic visual — the "12-factor.net twelve-line manifesto" of DSAF. Auto-generation produces generic-looking output; hand-rendering with deliberate typography, hierarchy, and white-space discipline produces the screenshot that *moves* on social media. The plan §"What drives GitHub stars" item 2 is explicit: "one killer visual that gets screenshotted." Auto-generation here is false economy.

**Why inline SVG instead of `<img>` (§1 #7):** inline SVG keeps the criterion text in the HTML source, which means screen readers parse it, search-engine crawlers index it, and `curl` can extract it. An `<img>` to an external SVG file would hide the criteria from accessibility tooling and SEO crawlers — making the framework less accessible than its own A.8 Accessibility criterion demands. The same rule that prevents us from shipping un-WCAG-AA components in the example artefact prevents us from shipping the Core card in a non-accessible format.

**Why 5-minute reading and PM-quotable targets (§1 #5, #6):** these are the plan's "done-when" conditions verbatim. They're qualitative tests, not quantitative grep'd ACs, but they're the rubric the plan asks us to hit. The reading-time test and the PM-quoting test together prove the card *works* — a card that no one can read in 5 minutes is a long form that's been cosmetically compressed; a card that no PM can quote 60 minutes later is a card without memorable language.

**Why publishing on dsaf.dev (§1 #7):** the card lives in two places — the repo (for engineers + designers searching the docs) and dsaf.dev/card (for everyone else). The dsaf.dev URL is the citable-from-a-talk URL (`dsaf.dev/card`); the repo URL is the cite-from-a-PR URL (`framework/dsaf-25.md`). Both surface the same content; the URL split lets each audience reach for the surface they prefer.

**Why the cap rule applies to DSAF-25 too (§1 #10b):** if DSAF-125 caps at L3 unverified, DSAF-25 must too — otherwise a team can cite "L5 on DSAF-25" while their full-rubric L would be capped. The cap-rule lives in FR-CORE-004; this FR's "How to use" section references it explicitly so DSAF-25 readers can't miss it.

---

## §3 — Doctrine contract

### Selection methodology (§3a)

The 25 criteria are picked per these rules:

1. **Every of the 20 categories contributes ≥ 1 Core criterion.** Mechanically: 10 from Part A (one per Part A category), 10 from Part B (one per Part B category), 5 wildcards for high-weight categories.
2. **High-weight categories get more Core slots.** Part A.1 (Foundations & Tokens, 14% weight) gets 2 Core slots; Part A.2 (Component Library, 13%) gets 2; Part A.3 (Documentation, 10%) gets 1; the remaining Part A categories each get 1; Part A's 5 wildcards distribute across A.1, A.2, A.7 (Accessibility), A.9 (AI/MCP — the headline differentiator), and A.5 (Tooling — the actionable-handles category).
3. **The Core criterion within each category is the most-cited / most-foundational of that category's criteria.** "Most-cited" = the one most likely to appear in DS Twitter / blog posts / conference talks about the category. "Most-foundational" = the one that, if absent, the rest of the category is meaningless.
4. **FIXED criteria are preferred over DYNAMIC criteria.** The Core should be stable across years (DYNAMIC criteria rescore quarterly and may obsolete the printed card if they shift). Exception: A.9 Agent Readiness criteria (which are DYNAMIC because MCP is evolving) ARE allowed in Core — they're the framework's differentiator and worth the freshness churn.
5. **The 25 are reviewed at every DSAF-125 amendment (per FR-CORE-003 / future RFCs).** The version-pin in §1 #11 makes this enforceable.

### The 25 Core criteria (§3b — initial draft, subject to one calibration round before P0 launch)

The IDs below reference `framework/03-criteria-part-a.md` (visible) and `framework/04-criteria-part-b.md` (not visible in this FR; Part B IDs are illustrative pending FR-CORE-003 dedup pass — the methodology is verbatim quoting but the specific Part B IDs may be renumbered).

#### Part A — System (15 Core)

| # | Source ID | Category | Criterion | Tag |
|---|---|---|---|---|
| 1 | A1.1 | A.1 Foundations & Tokens | Color tokens with primitive→semantic→component layers | FIXED |
| 2 | A1.3 | A.1 Foundations & Tokens | Spacing scale (4 / 8 px geometric) | FIXED |
| 3 | A1.8 | A.1 Foundations & Tokens | Token format & DTCG conformance | DYNAMIC |
| 4 | A2.1 | A.2 Component Library | Coverage of "Top 20" components (button, input, select, modal, table, nav, tabs, toast, tooltip, etc.) | FIXED |
| 5 | A2.4 | A.2 Component Library | Variant & state coverage (default, hover, focus, active, disabled, error, loading) | FIXED |
| 6 | A3.1 | A.3 Documentation | Usage guidelines per component (anatomy, examples, decision tree) | FIXED |
| 7 | A3.4 | A.3 Documentation | Accessibility notes per component (ARIA roles, keyboard table, screen-reader test results) | FIXED |
| 8 | A4.2 | A.4 Governance & Versioning | RFC process (templated, public archive) | FIXED |
| 9 | A4.3 | A.4 Governance & Versioning | Semver discipline (CI-enforced; breaking-change RFCs for MAJOR) | FIXED |
| 10 | A5.1 | A.5 Tooling & Distribution | Figma library with components, variables, modes (Code Connect mappings) | FIXED |
| 11 | A5.4 | A.5 Tooling & Distribution | Storybook (or equivalent) with a11y / viewport / theme toggles | FIXED |
| 12 | A6.1 | A.6 Cross-platform & Theming | Theming with light/dark mode + density variants | FIXED |
| 13 | A7.1 | A.7 Accessibility (system) | WCAG 2.x AA self-claim per component (caps at 4/5 without vendor letter) | FIXED |
| 14 | A8.1 | A.8 Performance & Quality | Bundle-size budgets enforced in CI (per package, per theme) | FIXED |
| 15 | A9.1 | A.9 AI / MCP Readiness | MCP server (or equivalent agent integration) exposing tokens + components | DYNAMIC |

#### Part B — UX (10 Core)

| # | Source ID | Category | Criterion | Tag |
|---|---|---|---|---|
| 16 | B1.1 | B.1 Research signals | Documented user research signals (qual + quant) inform component decisions | FIXED |
| 17 | B2.1 | B.2 Information architecture | Clear taxonomy; nav patterns documented + system-wide | FIXED |
| 18 | B3.1 | B.3 Interaction patterns | Documented interaction patterns (focus order, escape behaviour, modal stacking) system-wide | FIXED |
| 19 | B4.1 | B.4 Content & voice | System-wide content/voice style guide; error message language patterns | FIXED |
| 20 | B5.1 | B.5 Accessibility & Inclusive | WCAG 2.2 AA in production (verified, not self-claimed); A.8 + B.5 both ≥ 75% required for enterprise-grade | FIXED |
| 21 | B6.1 | B.6 Heuristics | Nielsen 10 (or equivalent) surfaced as a documented review checklist used in design crits | FIXED |
| 22 | B7.1 | B.7 Measurement | Adoption telemetry exists (component usage, deprecation-warning hit rate) | DYNAMIC |
| 23 | B8.1 | B.8 Ethics | Disclosure rules for AI-generated content; dark-pattern audit checklist applied at PR | DYNAMIC |
| 24 | B9.1 | B.9 Density / data | Multi-density variants supported (compact, comfortable, spacious) with documented use cases | FIXED |
| 25 | B10.1 | B.10 Internationalisation | Locale + RTL support; pluralisation rules documented; tokens accommodate non-Latin scripts | FIXED |

> **Caveat (re Part B IDs):** the Part B IDs above (`B1.1` … `B10.1`) are illustrative pending FR-CORE-003 (criteria dedup + ID stabilisation). The selection methodology in §3a is normative; the specific Part B IDs are calibrated in the FR-CORE-003 PR. The Part A IDs (`A1.1` … `A9.1`) are verbatim from `framework/03-criteria-part-a.md` (the operator MUST `Read` Part A's full text at patch time and confirm IDs match — `framework/03-criteria-part-a.md` extends through A.10; if A.10 exists and isn't represented above, the operator MUST add an A.10 row by selecting that category's most-foundational criterion and dropping one of the wildcards). The Part B `Read`-at-patch-time discipline is identical.

> **A.10 representation:** the table above shows 9 Part A categories (A.1–A.9) with 15 slots. `framework/03-criteria-part-a.md` may include an A.10 category (per `framework/02-framework.md` §5 the framework cites 10 Part A categories). At PR land time, the operator MUST verify A.10's existence and, if present, add an A.10 row (taking one slot from A.1, A.2, or A.5 wildcards). The selection methodology in §3a is the durable contract; the row count per category is calibrated against Part A's actual structure at land time.

### `framework/dsaf-25.md` (NEW) — full prose page

```markdown
# DSAF-25 Core — the 25 criteria that fit on one page

**Status:** normative subset of DSAF-125; ratified by FR-CORE-001 (2026-05-17).
**DSAF-125 version pin:** v1 (the rubric in `framework/03-criteria-part-a.md` + `framework/04-criteria-part-b.md` at this PR's commit hash).
**Source of truth:** this file. The one-page card (`framework/dsaf-25-card.md`, `assets/dsaf-25-card.svg`, `assets/dsaf-25-card-print.pdf`) renders from this file.

## What DSAF-25 is

DSAF-25 Core is a **selection** of 25 criteria from the 125-criterion DSAF rubric. Every Core criterion is a verbatim quote of an existing DSAF Criterion (same ID, same name, same 0-3-5 rubric anchors). DSAF-25 is the *share-handle* for DSAF — the version that fits on one page, screenshots into a tweet, and a PM can quote in a meeting.

DSAF-25 is NOT a "simpler DSAF" or "DSAF Lite." A team that runs DSAF-25 and stops there is undertaking a *first-pass* audit, not a *complete* audit. The full 125 remains the authoritative rubric.

## Why 25

Plan rationale: 125 is un-shareable; 4 is too few to capture the multi-dimensional nature of design systems; 25 is the smallest number that gives every Part A and Part B category at least one criterion. Every methodology brand that broke through had a memorable surface form — DORA's four metrics, 12-factor's twelve lines, SAMM's fifteen practices. DSAF-25 is DSAF's surface form.

## The 25 Core criteria

### Part A — System (15)

<<TABLE: the 15 Part A rows from §3b>>

### Part B — UX (10)

<<TABLE: the 10 Part B rows from §3b>>

## Scoring formula

```
dsaf_25_score% = (Σ criterion_score / (5 × 25)) × 100
              = (Σ criterion_score / 125) × 100
```

Where each `criterion_score ∈ {0, 1, 2, 3, 4, 5}` per the standard DSAF rubric anchors:

| Score | Anchor | Meaning |
|---|---|---|
| 0 | Absent | No evidence the system addresses this |
| 1 | Mentioned | Mentioned but not designed for |
| 2 | Defined | Designed but not built / not enforced |
| 3 | Built | Built and shipped, but not measured / not maintained |
| 4 | Measured | Built, shipped, measured, with telemetry / CI / tests |
| 5 | Industry-leading | Built, shipped, measured, externally validated, ahead of common practice |

## Relationship to DSAF-125

| Aspect | DSAF-25 Core | DSAF-125 (full) |
|---|---|---|
| Criteria count | 25 | 125 |
| Reading time | 5 minutes | 60 minutes |
| Audit time (with LLM) | 60 seconds (`npx dsaf scan`) | 4–8 hours |
| Use case | First-pass / share-handle / npx scan / in-meeting reference | Complete audit; sign-off; certification |
| Cap rule (per FR-CORE-004) | L3 unverified, L4 verified, L5 verified + entry-gate stack | Same |
| Score field | `dsaf_25_score%` in audit report frontmatter | `combined%` in audit report frontmatter |
| Cross-validation | DSAF-25 score is derivable from DSAF-125 row selection | DSAF-125 score is NOT derivable from DSAF-25 alone |

A team that has scored DSAF-125 derives its DSAF-25 score by selecting the 25 rows (no recomputation). A team that has only scored DSAF-25 has not scored DSAF-125; the longer rubric measures things DSAF-25 doesn't.

## How to use

### The 60-second self-score

Read each of the 25 criteria; gut-check a 0 / 3 / 5 per row (1 / 2 / 4 are fine but slower). Sum. Multiply by 100/125. Result is your DSAF-25 score%.

**Worked example:** A team gut-checks 25 criteria and lands on this distribution: seven 5s (35), nine 3s (27), six 1s (6), three 0s (0). Sum = 68. `dsaf_25_score% = 68 / 125 × 100 = 54.4%`. Per `framework/07-maturity-tiers.md` thresholds (combined ≥ 65% for enterprise-grade), 54% is below floor; the team is at L1 Repeatable or L2 Defined depending on per-category roll-up.

This is sufficient for: a sales-call prep, a job-interview pre-read, a board-deck slide, a Twitter screenshot. It is NOT sufficient for: a published audit, a vendor certification, a customer-facing claim. Those require DSAF-125 and the audit-report-template.md flow.

### The 5-minute read

Read the criteria in order. Skip the rubric anchors on a first pass — read just the criterion names. The 25 names fit on one page; the names alone tell you what to look at. The rubric anchors are for the second pass, when you're scoring.

### As a meeting reference

The card at `assets/dsaf-25-card.svg` (and at `dsaf.dev/card`) is the in-meeting share-handle. Print it. Tape it to your monitor. Quote one criterion at design crit. Quote one criterion at sprint review. The handle of a methodology is the criterion-name reach across the team.

### As an npx command (post-FR-CLI-001, P5)

`npx dsaf scan` returns the DSAF-25 score in 60 seconds. It scans the repo, tokens, components, and surfaced docs for evidence of each Core criterion. The output is a printable text card and a score. It is the *fast* path; the full DSAF-125 audit remains the *complete* path.

## The cap rule (per FR-CORE-004)

DSAF-25 scores cap at the same Levels as DSAF-125 scores per the [self-audit publication policy](./branding/self-audit-policy.md):

- L3 (Managed) maximum without third-party verification
- L4 (Managed-advanced — verified) maximum with verification
- L5 (Optimised — verified) with verification + L5-entry-gate stack

A team scoring 23/25 on DSAF-25 (= 92%) without verification cites L3, not L5. The cap rule is verification-status, not score-magnitude. See `internal/branding/self-audit-policy.md` for the full rationale.

## Versioning

DSAF-25 Core is versioned alongside DSAF-125. When DSAF-125 changes (FR-CORE-003, future RFCs), the DSAF-25 selection is re-validated in the same PR. The version pin in this file's frontmatter (`dsaf_125_version`) records which DSAF-125 the Core points at.

## The one-page card

The card lives at:
- `framework/dsaf-25-card.md` (Markdown source — the renderable text)
- `assets/dsaf-25-card.svg` (SVG, A4 / letter, hand-rendered)
- `assets/dsaf-25-card-print.pdf` (PDF rendered from the SVG)
- `dsaf.dev/card` (inline SVG embedded in the live page; the page-source contains the criterion text)

All four renderings carry the same 25 criteria, the same scoring formula, and the same cap-rule footnote.
```

### `framework/dsaf-25-card.md` (NEW) — one-page card text source

```markdown
# DSAF-25 Core

**Score** = Σ scores / 125 × 100 · **Read** in 5 min · **Cite** as L0–L5 per the cap rule

## A — System (15)

**Foundations & Tokens** — A1.1 Color tokens (primitive→semantic→component) · A1.3 Spacing scale (4/8 px) · A1.8 DTCG token format
**Component Library** — A2.1 Top-20 coverage (button, input, modal, table, nav, …) · A2.4 Variant & state coverage (default, hover, focus, active, disabled, error, loading)
**Documentation** — A3.1 Usage guidelines per component · A3.4 Accessibility notes per component (ARIA, keyboard, SR)
**Governance** — A4.2 RFC process (templated, public archive) · A4.3 Semver discipline (CI-enforced)
**Tooling** — A5.1 Figma library w/ components, variables, Code Connect · A5.4 Storybook w/ a11y, viewport, theme
**Cross-platform** — A6.1 Light/dark + density variants
**Accessibility** — A7.1 WCAG 2.x AA self-claim per component (caps 4/5 w/o vendor letter)
**Performance** — A8.1 Bundle-size budgets enforced in CI
**AI / MCP** — A9.1 MCP server (or agent integration) exposing tokens + components

## B — UX (10)

**Research** — B1.1 Documented signals inform component decisions
**IA** — B2.1 Clear taxonomy, nav patterns documented
**Interaction** — B3.1 Focus order, escape, modal stacking documented
**Content** — B4.1 System-wide voice + error-message patterns
**A11y** — B5.1 WCAG 2.2 AA in production (verified; A.8 + B.5 ≥ 75% for enterprise-grade)
**Heuristics** — B6.1 Nielsen 10 surfaced as a review checklist
**Measurement** — B7.1 Adoption telemetry exists
**Ethics** — B8.1 AI-disclosure rules; dark-pattern audit checklist
**Density** — B9.1 Multi-density variants w/ documented use cases
**i18n** — B10.1 Locale + RTL + plurals; tokens accommodate non-Latin scripts

## Scoring

| 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Absent | Mentioned | Defined | Built | Measured | Industry-leading |

`dsaf_25_score% = (Σ scores / 125) × 100`

## Cap rule (cited tier ≠ score%)

| Verification | Max cited DSAF Level |
|---|---|
| None | L3 (Managed) |
| Third-party verified | L4 (Managed-advanced — verified) |
| Verified + L5 entry-gate stack | L5 (Optimised — verified) |

Per [self-audit publication policy](../internal/branding/self-audit-policy.md). DSAF-25 cited tiers follow the same cap as DSAF-125 cited tiers.

---
DSAF v1 · DSAF-25 Core is a verbatim subset of DSAF-125 · Full rubric: `framework/03-criteria-part-a.md` + `framework/04-criteria-part-b.md` · Card: `dsaf.dev/card` · Repo: github.com/cyberskill-official/design-system-audit-framework
```

### `assets/dsaf-25-card.svg` — design intent (not code; SVG body authored by the founder + commissioned illustrator)

The SVG is a single-page card at A4 viewBox (`viewBox="0 0 210 297"`), uses `<title>DSAF-25 Core — 25 criteria, one page</title>` and `<desc>` per WAI-ARIA SVG accessibility. The text content of the SVG matches `framework/dsaf-25-card.md` verbatim (so screen readers extract the same text). Typography hierarchy:

- H1: 18pt, weight 700 — "DSAF-25 Core"
- Section labels (A — System / B — UX): 14pt, weight 600
- Category labels (Foundations & Tokens, Component Library, …): 11pt, weight 600
- Criterion text: 9pt, weight 400, line-height 1.3
- Scoring + cap-rule footers: 8pt

Color: monochrome on white (printable); a 1px rule between sections; no decoration. The card is functional, not decorative.

### `README.md` — patch (cross-link to DSAF-25 Core)

Append to README after the H1 paragraph (or merge with FR-DOCS-001's README rewrite when that ships):

```markdown
**Read DSAF-25 Core first.** If you only have 5 minutes, [`framework/dsaf-25.md`](./framework/dsaf-25.md) is the 25-criterion subset that fits on one page. The full 125-criterion rubric is at [`framework/03-criteria-part-a.md`](./framework/03-criteria-part-a.md) (Part A — System) and [`framework/04-criteria-part-b.md`](./framework/04-criteria-part-b.md) (Part B — UX). The one-page printable card is at [`assets/dsaf-25-card.svg`](./assets/dsaf-25-card.svg) or [dsaf.dev/card](https://dsaf.dev/card).
```

### `guidelines/01-introduction.md` — Reading Order insertion

Existing Reading Order is a numbered list at the end of the intro. Insert a new item 3 between current items 2 and 3:

```markdown
1. This file (you're here).
2. [`02-framework.md`](./02-framework.md) — modes, actors, scoring, no-silent-regression rule.
3. **[`dsaf-25.md`](./dsaf-25.md) — DSAF-25 Core (the 25-criterion subset on one page; recommended entry point before reading the full 125).**
4. [`05-running-an-audit.md`](./05-running-an-audit.md) — step-by-step playbook.
5. [`07-maturity-tiers.md`](./07-maturity-tiers.md) — what each DSAF Level means.
6. [`prompts/scan-mode.md`](../prompts/scan-mode.md) — paste this into your LLM and run your first SCAN.
```

### `internal/branding/glossary.md` — entry addition (per FR-BRAND-002 conventions)

Append under "Brand terms":

```markdown
- **DSAF-25 Core** — the 25-criterion subset of DSAF-125 that fits on one page; the share-handle for DSAF. The Core is a *selection*, not a different rubric — every Core criterion is a verbatim quote of an existing DSAF Criterion. Lives at `framework/dsaf-25.md` and `dsaf.dev/card`. Score field in audit reports is `dsaf_25_score%`, distinct from `combined%`.
```

### `templates/audit-report-template.md` — frontmatter addition

Add to the existing frontmatter block:

```yaml
# Existing fields (kept unchanged):
audit_id: ...
mode: ...
status: ...
pre_audit_score: ...     # DSAF-125 combined %
post_audit_score: ...    # DSAF-125 combined %

# New field added by FR-CORE-001:
dsaf_25_score:
  pre_audit: null         # populated by the agent; ∈ [0, 100]
  post_audit: null        # populated by the agent; ∈ [0, 100]
  delta_pp: null          # post − pre
  source_version: <YYYY-MM-DD>  # the DSAF-125 version pinned at audit time
```

---

## §4 — Acceptance criteria

1. **Four artefacts committed** — `framework/dsaf-25.md`, `framework/dsaf-25-card.md`, `assets/dsaf-25-card.svg`, `assets/dsaf-25-card-print.pdf` all exist in the repo.
2. **25 criteria selected** — `framework/dsaf-25.md` enumerates exactly 25 rows across two tables (15 Part A + 10 Part B). Every category from A.1 → A.10 and B.1 → B.10 has at least one row.
3. **Verbatim quoting** — every Core criterion's name + rubric anchors are byte-identical to the corresponding row in `framework/03-criteria-part-a.md` (Part A IDs verifiable). For Part B IDs (pending FR-CORE-003 stabilisation), the criterion *text* matches what Part B documents will publish at FR-CORE-003 ship time.
4. **Source ID mapping** — every row in `framework/dsaf-25.md` has a `Source` column citing `Ax.y` or `Bx.y`. `grep -c '^| [0-9]' framework/dsaf-25.md` returns 25.
5. **Scoring formula present** — `framework/dsaf-25.md` includes the `dsaf_25_score% = (Σ criterion_score / (5 × 25)) × 100` formula in a Scoring section.
6. **"How to use" section present** — `framework/dsaf-25.md` has subsections: "The 60-second self-score," "The 5-minute read," "As a meeting reference," "As an npx command (post-FR-CLI-001, P5)."
7. **Cap-rule cross-reference present** — `framework/dsaf-25.md` references `internal/branding/self-audit-policy.md` and explicitly states DSAF-25 cited tiers cap at L3 unverified.
8. **One-page card SVG ≤ 50 KB** — `wc -c assets/dsaf-25-card.svg` ≤ 50000 (a hand-rendered single-page SVG should easily fit; larger means decoration creeped in).
9. **SVG accessibility** — `assets/dsaf-25-card.svg` contains `<title>` and `<desc>` elements; `xmllint --xpath '//svg:title/text()' assets/dsaf-25-card.svg` returns "DSAF-25 Core — 25 criteria, one page" (or equivalent).
10. **PDF print-ready** — `assets/dsaf-25-card-print.pdf` is a single-page PDF at letter or A4 size; opening it in Preview/Acrobat does not paginate to a second page.
11. **5-minute reading test recorded** — PR description names the test designer (≥ 2 years DS experience, not the founder), records elapsed time ≤ 5 minutes for a cover-to-cover read of `framework/dsaf-25.md`, captures one criterion they remembered without re-reading. **Fallback:** if no external designer is available at PR land time, the founder performs a self-test with a stopwatch and a 24-hour delay (read once today, recall tomorrow) and explicitly flags the fallback in the PR description; an external designer test follows in the first available week post-launch.
12. **PM-quotable test recorded** — PR description names the test PM, records the criterion they quoted, and records the elapsed time between read and quote. The target elapsed time is "within a single review meeting" (≥ 10 minutes, ≤ 90 minutes); shorter is acceptable, longer is not. **Fallback:** if no external PM is available at PR land time, the founder asks one non-design colleague (engineer, marketer, ops) to take the test; flag the fallback in the PR description.
13. **`guidelines/01-introduction.md` Reading Order updated** — has an entry between current items 2 and 3 pointing at `framework/dsaf-25.md`.
14. **README cross-link present** — README references `framework/dsaf-25.md` in the first 500 characters of body copy (after the H1).
15. **Glossary entry added** — `internal/branding/glossary.md` has a `DSAF-25 Core` entry in the Brand terms section per the body shape in §3.
16. **Audit-report template extended** — `templates/audit-report-template.md` frontmatter has a `dsaf_25_score:` block per §3.
17. **DSAF-125 version pin present** — `framework/dsaf-25.md` frontmatter has `dsaf_125_version: <YYYY-MM-DD or commit-hash>` referencing the DSAF-125 version the Core selection pins to.

---

## §5 — Verification

```bash
# AC1 — four artefacts exist
test -f framework/dsaf-25.md && test -f framework/dsaf-25-card.md && \
  test -f assets/dsaf-25-card.svg && test -f assets/dsaf-25-card-print.pdf

# AC4 — 25 rows in the main table
grep -c '^| [0-9]' framework/dsaf-25.md  # 25

# AC2 — every category represented
for cat in A.1 A.2 A.3 A.4 A.5 A.6 A.7 A.8 A.9 A.10 \
           B.1 B.2 B.3 B.4 B.5 B.6 B.7 B.8 B.9 B.10; do
  grep -q "${cat} " framework/dsaf-25.md || echo "MISSING category: ${cat}"
done
# Expected: no MISSING lines

# AC3 — verbatim quote check for Part A
# For each Part A Core row, verify the criterion text matches the source
python3 scripts/check-dsaf-25-verbatim.py  # script written in PR; checks every Part A row

# AC5 — scoring formula present
grep -q 'dsaf_25_score% = (Σ criterion_score / (5 × 25)) × 100' framework/dsaf-25.md

# AC6 — "How to use" subsections
for sub in '60-second self-score' '5-minute read' 'meeting reference' 'npx command'; do
  grep -qi "${sub}" framework/dsaf-25.md || echo "MISSING subsection: ${sub}"
done

# AC7 — cap-rule cross-reference
grep -q 'self-audit-policy\.md' framework/dsaf-25.md && grep -qi 'cap.*L3' framework/dsaf-25.md

# AC8 — SVG size
wc -c assets/dsaf-25-card.svg | awk '{ if ($1 > 50000) print "OVERSIZED: " $1; else print "OK"; }'

# AC9 — SVG accessibility (xmllint needs local-name() because SVG has a default namespace)
xmllint --xpath 'count(//*[local-name()="title"])' assets/dsaf-25-card.svg  # >= 1
xmllint --xpath 'count(//*[local-name()="desc"])'  assets/dsaf-25-card.svg  # >= 1
xmllint --xpath '//*[local-name()="title"]/text()' assets/dsaf-25-card.svg  # human-check the title text
# Also verify the criterion text is present (screen readers will extract):
grep -c 'Color tokens\|Spacing scale\|MCP server\|WCAG' assets/dsaf-25-card.svg  # >= 4

# AC10 — PDF single page
pdfinfo assets/dsaf-25-card-print.pdf | grep -E '^Pages:'  # Pages: 1

# AC13 — Reading Order insertion
grep -A 8 '## Reading order' guidelines/01-introduction.md | grep -q 'dsaf-25\.md'

# AC14 — README cross-link
head -c 500 README.md | grep -q 'dsaf-25\.md'

# AC15 — glossary entry
grep -q '^- \*\*DSAF-25 Core\*\*' internal/branding/glossary.md

# AC16 — audit-report template extension
grep -q '^dsaf_25_score:' templates/audit-report-template.md || \
  grep -q 'dsaf_25_score:' templates/audit-report-template.md

# AC17 — DSAF-125 version pin
grep -E '^dsaf_125_version:' framework/dsaf-25.md
```

Human-verified ACs (no script):

- **AC11** — reviewer reads the PR description and confirms the timed reading test is captured (designer name, elapsed time, remembered criterion).
- **AC12** — reviewer confirms the PM-quoting test is captured (PM name, quoted criterion, elapsed time).

---

## §6 — Implementation skeleton

The operator playbook is the implementation:

1. **(1h) Re-read Part A + Part B.** Open `framework/03-criteria-part-a.md` and `framework/04-criteria-part-b.md`. Tabulate every criterion in a scratch file: ID, name, category, weight, FIXED/DYNAMIC tag. (For this FR, Part A is visible in the repo; Part B will be re-validated against FR-CORE-003 when that lands.)
2. **(1h) Apply selection methodology.** Use §3a rules: every category ≥ 1, high-weight categories get extras, FIXED preferred except for A.9, most-foundational within each category. Land on the 25; this FR's §3b lists the draft selection.
3. **(2h) Author `framework/dsaf-25.md`.** Copy the body from §3 verbatim; replace the `<<TABLE>>` placeholders with the actual 25-row tables. Add the YAML frontmatter: `dsaf_125_version: <YYYY-MM-DD>`, `ratified_by: FR-CORE-001`, etc.
4. **(1h) Author `framework/dsaf-25-card.md`.** Copy the body from §3 verbatim; this is the renderable text source for the SVG.
5. **(2h) Hand-render `assets/dsaf-25-card.svg`.** Use Figma → Export to SVG, or hand-write in a text editor. Sizing: A4 viewBox; text content matches `framework/dsaf-25-card.md` verbatim; typography per §3's "design intent" section; monochrome on white. Add `<title>` and `<desc>` elements.
6. **(30m) Render `assets/dsaf-25-card-print.pdf`.** Use `inkscape --export-type=pdf assets/dsaf-25-card.svg --export-filename=assets/dsaf-25-card-print.pdf` OR headless Chrome (`chromium --headless --print-to-pdf=assets/dsaf-25-card-print.pdf assets/dsaf-25-card.svg`). Verify single-page output.
7. **(30m) Cross-link patches.** Apply README, `guidelines/01-introduction.md` Reading Order, glossary, audit-report template patches per §3.
8. **(30m) Validation tests.** Pick one designer (≥ 2 years DS experience, not the founder); have them read `framework/dsaf-25.md` cover-to-cover with a stopwatch. Record elapsed time + one criterion they remember. Pick one PM (no prior DS experience); have them read the card; 60 minutes later, ask them to quote one criterion. Record in PR description.
9. **(30m) PR description.** Include: the 25 IDs selected (with rationale per §3a), the timed-reading-test result, the PM-quoting-test result, the §5 verification command output.

---

## §7 — Dependencies

- **Upstream:** none (`depends_on: []`). DSAF-125 is already in the repo; this FR selects from it.
- **Downstream blocks:** FR-BRAND-003 (visual identity SVGs use the Core 25 as the radar chart's category dimensions), FR-DOCS-001 (README rewrite leads with DSAF-25 Core), FR-CONTENT-001 (weekly criterion deep-dives use the Core 25 as the rotation list), FR-INTEG-001 (Storybook addon's first iteration runs Core 25 checks), FR-INTEG-002 (Tokens Studio validator scores Core 25's A.1 subset), FR-INTEG-003 (zeroheight reader scores Core 25's A.3 subset), FR-BENCH-001 (lite benchmark uses the Core 25 self-score), FR-I18N-001 (translation effort starts with the Core 25), FR-CLI-001 (`npx dsaf scan` returns Core 25 score in 60s).
- **Sibling:** FR-CORE-002 (no-silent-regression rule applies to DSAF-25 too — the rule scope is FIXED criteria; Core inherits the FIXED/DYNAMIC tags from DSAF-125), FR-CORE-003 (criteria dedup pass will validate the Core 25 selection mechanically), FR-CORE-004 (cap rule applies to DSAF-25 cited tiers per §1 #10b).
- **External:** none. The hand-rendered SVG may use a commissioned illustrator (per FR-BRAND-003 vendor list); this FR's §6 step 5 allows in-house authorship as a fallback.

---

## §8 — Example payloads

### Example: an audit report's frontmatter post-FR-CORE-001

```yaml
audit_id: cyberskill-2026-05-17
mode: FIX
status: SIGNED
combined_pre_audit: 79.2          # DSAF-125
combined_post_audit: 81.4         # DSAF-125
delta_pp_125: 2.2

dsaf_25_score:
  pre_audit: 84.0                 # 21/25 → 84%
  post_audit: 88.0                # 22/25 → 88%
  delta_pp: 4.0
  source_version: 2026-05-17

cited_tier: L3
cited_tier_basis: dsaf_125         # could also be dsaf_25; disclosed either way
cited_tier_cap_rationale: FR-CORE-004
```

### Example: a Twitter screenshot pitch

> *Tweet text:* "DSAF-25 Core: the 25 criteria your design system gets graded on, on one page. Read in 5 minutes. Score in 60 seconds with `npx dsaf scan`. Full rubric is 125 criteria. Card → dsaf.dev/card"
>
> *Attached image:* `assets/dsaf-25-card.svg` rendered as PNG, 1200×675 (Twitter card optimal).

This pitch passes the framework's measurement criteria: the card is screenshottable, the URL is dsaf.dev/card (the canonical share-handle), and the "5 min read / 60 sec score" framing is what the plan asked us to make true.

### Example: an `npx dsaf scan` output (post-FR-CLI-001)

```
$ npx dsaf scan
DSAF-25 Core scan — 2026-05-17 — design-system-audit-framework
─────────────────────────────────────────────────────────────────
Part A — System (15)
  ✓ A1.1 Color tokens (3 / 5) — semantic layer present; component layer partial
  ✓ A1.3 Spacing scale (5 / 5) — 4 px scale tokenised; 2-tier (component / layout)
  ✓ A1.8 DTCG conformance (4 / 5) — DTCG 2024.06; not yet 2025.10
  …
Part B — UX (10)
  ✓ B5.1 WCAG 2.2 AA (3 / 5) — self-claimed; vendor letter pending
  …
─────────────────────────────────────────────────────────────────
DSAF-25 Score: 84% (21 / 25 × 100/125 = 84.0)
Cited DSAF Level: L3 (Managed) — capped per internal/branding/self-audit-policy.md (no third-party verification)
Card → dsaf.dev/card
Full audit → run guidelines/05-running-an-audit.md
```

### Example: an in-meeting quote

> *DS lead in design crit:* "Per DSAF-25 A2.4, variant + state coverage needs default, hover, focus, active, disabled, error, *and* loading. We're missing loading on the new submit button. Block on that before merge."

This is the use case the card enables. The lead doesn't open a doc; the criterion ID is the lever for the conversation. Without the Core, the lead would either gesture vaguely at "we should cover more states" or look up "A2.4" in a 125-row table mid-meeting — neither works.

---

## §9 — Open questions

All resolved at authoring time:

- **Q1: Is 25 the right count, or should it be 20 / 30?** Resolved → 25. 20 would force categories without representation (Part A has 10 categories, Part B has 10; the 5 wildcards are the high-weight bump). 30 stops fitting on one page at 11pt body text. 25 is the smallest number that satisfies every-category coverage with high-weight breathing room.
- **Q2: Should the Core score replace the DSAF-125 combined score?** Resolved → no. Different denominators; both reported. Replacing would hide the relationship and bias upward.
- **Q3: Auto-generate the card SVG from `framework/dsaf-25-card.md`?** Resolved → hand-render the first version. Auto-generation produces generic-looking output; the card is the framework's iconic visual and worth the cost. A future FR (post-launch) MAY auto-regenerate the card from `dsaf-25-card.md` *if* the renderer can match the typography of the hand-rendered version.
- **Q4: Cap-rule (FR-CORE-004) applies to DSAF-25 cited tiers?** Resolved → yes (§1 #10b). The cap is about verification status, not score-magnitude. A 92% DSAF-25 self-audit without verification still cites L3.
- **Q5: Part B IDs (`B1.1`, `B2.1`, etc.) used in §3b are pre-stabilisation. What if FR-CORE-003 renumbers them?** Resolved → the selection methodology in §3a is the durable contract; the specific IDs in §3b are calibrated at FR-CORE-003 land time (same PR or follow-up). The Part B IDs are illustrative pending dedup.
- **Q6: Should the Core include any criterion that doesn't exist in DSAF-125 today (e.g., MCP-server criterion if A.9 doesn't have one yet)?** Resolved → no. Verbatim quoting only. If A.9 lacks the right criterion, fix A.9 first via FR-CORE-003 (or a future RFC), then quote it in Core. Coining new criteria in Core would split the framework's authoritative-rubric surface.
- **Q7: What about translations of the Core (FR-I18N-001)?** Deferred → FR-I18N-001 in P2 translates the Core 25 first (JP/ES/DE per the plan). This FR ships only the English version.

---

## §10 — Failure modes inventory

| Failure | Detection | Outcome | Recovery |
|---|---|---|---|
| Designer takes > 5 minutes for the cover-to-cover read | timed test in PR | AC11 fails | Tighten body copy of `framework/dsaf-25.md` until the read fits; the failure is a signal that the "How to use" or rationale sections are over-long |
| PM cannot quote a criterion 60 minutes later | timed test in PR | AC12 fails | Either the card's typography is unscannable, or the criterion names are over-jargoned. Recovery: hand-tune the card; possibly shorten 1-2 criterion names while keeping verbatim DSAF-125 quoting |
| Part B IDs renumber via FR-CORE-003 mid-flight | FR-CORE-003 review | DSAF-25 Source-ID column drifts | The version pin in §1 #11 forces a re-validation; the same PR that renumbers Part B updates `framework/dsaf-25.md`'s Source column |
| One category genuinely doesn't fit on the card | layout review | Card overflows to two pages | Per §1 #15 the card is sized at A4 with letter-fit. If a category is over-long, the criterion name (NOT the rubric) is paraphrased — never the criterion text itself. Paraphrasing is a CORE-003 amendment, not a Core re-coining |
| Verbatim-quote rule misread as "the Core can clarify the criterion" | reviewer feedback | Core text drifts from DSAF-125 | §1 #1 is explicit: "if a criterion's wording is wrong, fix it in DSAF-125 first." This FR's §3 includes the verbatim discipline; CI grep would be ideal (deferred to a P2 follow-up) |
| Auto-renderer ships before the hand-rendered version | scope creep | Generic-looking card published | §6 step 5 says hand-render the first version. Auto-rendering is post-launch; the iconic-visual hypothesis (plan §"What drives GitHub stars") requires deliberate authorship |
| SVG accessibility incomplete | xmllint check | Screen-reader users can't extract text | §1 #7 mandates `<title>` + `<desc>`; AC9 verifies. If a screen-reader test fails post-ship, the SVG is amended in a follow-up patch |
| PDF paginates to 2 pages on letter (not A4) | print test | AC10 fails | Sizing was wrong; re-render at letter explicitly. The card MUST fit both formats per §1 #15 |
| DSAF-25 score gets cited as the canonical claim (replacing DSAF-125) | external blog / tweet observed | Framework's authority gets diluted | Public correction citing `framework/dsaf-25.md` "Relationship to DSAF-125" section. Repeat misuse documented in `_audit/citations/`; pattern reflected in P6 governance |
| Card text gets out of sync with `framework/dsaf-25.md` after a FR-CORE-003 dedup | post-merge diff | Two sources contradict | Per §1 #11, the version pin forces same-PR updates. Add a CI lint (post-launch) that fails if `framework/dsaf-25-card.md` differs from `framework/dsaf-25.md`'s 25-row text |
| Founder's "iconic-visual" judgement misses the mark | low share-rate post-launch | Card doesn't move on social media | Acceptable failure mode — iteration on hand-rendering is cheap; a v2 of the SVG ships in a follow-up FR (post-launch). The card's existence + URL stability is the durable asset; the specific typography is iterable |
| `npx dsaf scan` (FR-CLI-001) outputs a different scoring formula | bug at P5 implementation time | DSAF-25 score inconsistency | FR-CLI-001 normatively imports `framework/dsaf-25.md`'s formula; the formula is the source of truth. A CI test in FR-CLI-001's repo asserts the formula matches |

---

## §11 — Implementation notes

- **The hand-rendered SVG matters more than this FR's prose says.** The Core's social-media value is overwhelmingly visual; readers don't read `framework/dsaf-25.md` first — they see the card screenshot, then *maybe* click through. Allocate the founder's time accordingly: 2 hours on the SVG is the floor, not the ceiling. If commissioning an illustrator (per FR-BRAND-003's vendor list), this FR is a candidate to bundle into the same engagement.
- **Why not auto-generate from `framework/dsaf-25-card.md`:** auto-generation produces typography that reads as "made by code, not by hand." The methodology brands that broke through — 12-factor.net, atomic-design's chemistry diagram, DORA's elite-vs-low cluster chart — all read as authored visuals. The Core card needs to read that way too. A future auto-renderer (post-P0) can ship *after* the hand-rendered version sets the typographic baseline.
- **The "verbatim quoting" rule is harder than it sounds.** Part A's criterion names are long; verbatim quoting on the card forces them to wrap. The temptation is to shorten "Color tokens with primitive→semantic→component layers" to "Color tokens" on the card. Resist: the wrapping is what gives the card visual rhythm + carries the rubric anchor; "Color tokens" alone is meaningless. If the card must wrap, it wraps.
- **About the "5 minute / PM-quotable" tests:** these are real tests, not theatre. The PR description ships the recorded results — name, time, criterion. If the tests fail on the first authoring pass, that's a signal that the body copy of `framework/dsaf-25.md` is over-long (recovery: trim) or the criterion names are over-jargoned (recovery: bring up at FR-CORE-003 for renaming).
- **DSAF-25's relationship to npx dsaf scan (P5):** `npx dsaf scan` is the CLI that *demos* DSAF-25. It's the single most viral artefact (plan §"Phase 5"); it depends on DSAF-25 to be runnable in 60 seconds. The Core's existence is the P5 CLI's precondition. This FR (P0) ships the Core; FR-CLI-001 (P5) ships the CLI that consumes it.
- **Why the audit-report template extension is additive only:** existing audit reports (the example at `examples/cyberskill-design-system/improvement-plan.md`) have `combined%` only. Adding `dsaf_25_score%` as a *new* frontmatter field doesn't break them; legacy reports populate it on re-audit, current reports populate both. No retroactive recomputation needed.
- **About the Part B ID instability disclaimer (§3b caveat):** the right way to read the table is "the criteria selected are stable; the IDs reflect Part B as-of-today and may renumber at FR-CORE-003." The selection methodology is the durable contract.
- **Part A category count assumption.** `framework/02-framework.md` §5 cites "10 Part A categories"; the visible portion of `framework/03-criteria-part-a.md` shows A.1 through A.6. The operator MUST `Read` the full Part A file at PR land time to (a) verify A.7–A.10 exist, (b) confirm criterion IDs and rubric anchors for the selected rows, (c) add an A.10 row if it exists and isn't represented in §3b. The "Read-before-patch" discipline (introduced in FR-CORE-004 §11) applies here.
- **Verbatim-quote CI lint (deferred to P2):** a lint that compares each row of `framework/dsaf-25.md` against the corresponding row in `framework/03-criteria-part-a.md` / `framework/04-criteria-part-b.md` would catch silent drift. Deferred because (a) Part B IDs aren't stable until FR-CORE-003, (b) the lint is mechanical to write but adds CI noise without a stable target. Track in `docs/feature-requests/BACKLOG.md` as a P2 follow-up.
- **About the SVG file size cap (50 KB):** a hand-rendered single-page SVG with monochrome typography and no decoration easily fits under 50 KB. A 50+ KB SVG is a signal that the renderer embedded unnecessary metadata, base64-encoded fonts, or decorative gradients — none of which the card needs. The cap is also load-time-relevant for `dsaf.dev/card` inline embedding.

---

*End of FR-CORE-001.*
