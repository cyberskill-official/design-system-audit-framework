---
fr_id: FR-INTEG-003
audited: 2026-05-17
verdict: PASS (after revision)
score_pre_revision: 8/10
score_post_expansion: 9/10
score_post_revision: 10/10
issues_resolved: 7
template: dsaf-spec@1
---

## §1 — Verdict summary

The post-revision spec runs ~716 lines covering `@dsaf/zeroheight-reader` standalone CLI + library package; cheerio-based HTML parser handling directory + single-file modes; 10 validators (A.3.1-A.3.7 Documentation + A.5.1/A.5.2/A.5.4 Tooling); CriterionScore[] output matching FR-INTEG-001 contract; audit_targets convention; synthetic fixture (no real customer data); Vitest ≥80% coverage; GitHub Actions CI; MIT license; user-facing dsaf.dev/docs/integrations docs; cap-rule disclosure footer; FR-INTEG-001 type re-export; explicit anti-scraping clause (HTML-export only). It has 15 §1 normative clauses, 15 acceptance criteria, 10 failure-mode rows, 3 open questions resolved, 5 implementation notes. Length is appropriate (~716 lines vs ~700-line target) — focused on cheerio parser + 1 detailed validator + 9 implied via shared Validator type + scoring engine + CLI + synthetic fixture (~370 lines of production code). All 7 findings resolved. **Score = 10/10.**

## §2 — Findings (all resolved)

### ISS-001 — Component-page detection heuristic fragility
Pre-revision §3 `parser.ts` detects component pages via URL pattern `/\/components\//` + title regex. Custom zeroheight site structures (e.g., `/patterns/`, `/library/button/`, multi-language URLs like `/en/components/`) may miss component pages entirely → `components.length === 0` → all A.3.1/A.3.3/A.3.4 score 0. **Resolved:** §10 failure-mode row + §11 implementation note explicit on heuristic limits + future `--component-pattern` CLI flag; cap-rule disclosure mitigates impact of false-zero scores. Pattern: §3.6 rule 18 (heuristic + future-customisation deferred). Score recovery path is documented.

### ISS-002 — Widget detection brittleness vs zeroheight format evolution
Pre-revision §3 widget detection uses CSS selectors like `[data-figma], iframe[src*="figma.com"]`. zeroheight controls export format + may change widget embedding (new attribute names, new iframe sources, server-side rendering). Validators silently underscore A.5.1/A.5.2/A.5.4 on format drift. **Resolved:** §10 failure-mode row + §11 explicit on widget-selector maintenance + format-pin strategy + fixture-update cadence as zeroheight evolves. Pattern: §3.5 rule 15 (external dependency version drift mitigation with explicit owner + maintenance commitment).

### ISS-003 — Synthetic fixture realism gap
Pre-revision §3 synthetic fixture is ~50 lines of HTML — captures structural shape but not zeroheight-specific markup quirks (e.g., CSS class naming conventions like `.zh-component-anatomy`, JSON-LD metadata, internal script structure). Validators tuned to synthetic fixture may underperform on real exports. **Resolved:** §11 implementation note explicit — synthetic fixture intentionally minimal but format-faithful; real zeroheight exports forbidden in repo (customer confidentiality); validation discipline relies on community PR fixtures + maintainer access to real export samples (off-repo). Pattern: §3.5 rule 15 (test-fidelity tradeoff documented + remediation path clear).

### ISS-004 — Component-pages-zero edge case scoring semantics
Pre-revision §3 `usageGuidelinesValidator` returns score 0 with rationale "No component pages detected" when `components.length === 0`. But this collapses two distinct failures: (a) the export legitimately has no components yet (early-stage DS), (b) parser failed to detect components in a populated DS. Both look identical in the output. **Resolved:** §3 parser tracks `warnings: string[]` field; CLI surfaces warning "Detected 0 component pages — verify URL pattern with --component-pattern flag" when `pages.length > 5 && components.length === 0`. §10 + §11 explicit on disambiguation path. Pattern: §3.6 rule 18 (false-negative detection + user-facing diagnostic).

### ISS-005 — A.3.7 freshness without last-updated metadata edge case
Pre-revision §3 `freshness.pagesWithLastUpdated = 0` collapses two states: (a) zeroheight team doesn't expose last-updated metadata (zeroheight tier limitation), (b) team exposes but pages are truly stale-unmaintained. **Resolved:** §10 failure-mode row + §11 explicit — validator scores 1 (not 0) when `pagesWithLastUpdated === 0` to signal "metadata-not-exposed" vs "no doc activity"; rationale distinguishes. Future-FR: hook into zeroheight API for explicit freshness metadata when feasible (Q3 + Q2 deferred resolution path). Pattern: §3.6 rule 18 (scoring nuance + future-improvement explicit).

### ISS-006 — Scoring engine vs FR-INTEG-001 contract drift risk
Pre-revision §3 imports `CriterionScore` type from `@dsaf/storybook-addon`. If FR-INTEG-001 ships its scoring engine at v0.2 with breaking type changes (e.g., adds required `severity` field), all 3 INTEG packages break simultaneously. **Resolved:** §3 package.json `peerDependenciesMeta.optional: true` mirrors FR-INTEG-002 pattern; §11 implementation note explicit on cross-package consistency commitment + coordinated semver releases across FR-INTEG-001/002/003 trio. Pattern: §3.5 rule 15 (cross-package contract stability via shared semver + optional peerDep design).

### ISS-007 — CLI exit-code semantics + CI integration
Pre-revision §3 CLI exits 0 on success regardless of computed scores. Some users want CI-fail-on-low-score behavior (e.g., "fail PR if A.3 average < 3"). **Resolved:** §11 implementation note explicit — current behavior: 0=success/1=error; score-threshold exit is a future flag (e.g., `--fail-below 60`) matching FR-INTEG-002 stance. v0.1 keeps semantics simple to encourage broad adoption; future iteration consumes feedback before adding strictness controls. Pattern: §3.6 rule 18 (CLI semantics + future-flag explicit + adoption-first sequencing).

## §3 — Resolution

All 7 mechanical concerns addressed:

- §10 + §11 explicit on component-page detection heuristic + future `--component-pattern` flag.
- §10 + §11 explicit on widget-selector maintenance + format-pin strategy.
- §11 explicit on synthetic-fixture realism tradeoff + community-PR fixture remediation path.
- §3 parser warnings field + CLI diagnostic for 0-components-on-populated-export.
- §10 + §11 explicit on freshness-metadata absence disambiguation + score-1 not score-0 for missing metadata.
- §3 package.json peerDependenciesMeta.optional + §11 cross-package semver commitment for FR-INTEG-001/002/003 trio.
- §11 explicit on CLI exit-code semantics + future score-threshold flag matching INTEG-002 pattern.

The post-revision FR runs ~716 lines, on target — justified by §3's verbatim TypeScript types + cheerio parser + 1 detailed validator + scoring engine + CLI + synthetic fixture HTML (~370 lines of production code). The §1 normative + §3 contract + §4 ACs cover all 10 validators despite §3 detailing only the first (the pattern is consistent across A.3 + A.5 + the AC count verifies all 10). All cross-FR coordination (FR-CORE-001 metadata, FR-INTEG-001 shared CriterionScore, FR-INTEG-002 sibling validator pattern, FR-CLI-001 P5 consumes audit_targets, FR-CORE-004 cap-rule, FR-BRAND-001/002/004 sacredness/taxonomy/decoupling) is explicit. The 12h founder-time + Vitest ≥80% + CI + MIT + cap-rule disclosure + audit_targets contract + anti-scraping clause + synthetic-fixture privacy discipline form the operational gates for shipping the A.3 Documentation + A.5 Tooling subset validator as a zeroheight-focused integration completing the FR-INTEG-001/002/003 trio. **Score = 10/10.**

---

*End of FR-INTEG-003 audit.*
