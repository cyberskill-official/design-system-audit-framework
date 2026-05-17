---
fr_id: FR-INTEG-002
audited: 2026-05-17
verdict: PASS (after revision)
score_pre_revision: 8/10
score_post_expansion: 9/10
score_post_revision: 10/10
issues_resolved: 6
template: dsaf-spec@1
---

## §1 — Verdict summary

The post-revision spec runs ~1,180 lines covering `@dsaf/tokens-validator` standalone CLI + library package; dual-format parser (Tokens Studio JSON + DTCG-conformant tokens.json with auto-detection); 9 validators (one per A.1.1-A.1.9); CriterionScore[] output matching FR-INTEG-001 contract; audit_targets convention matching existing DSAF scripts; CLI with per-criterion table + cap-rule disclosure; Vitest ≥80% coverage with 3 fixtures (DTCG, Tokens Studio, hex-only); GitHub Actions CI matrix; MIT license; user-facing dsaf.dev docs; FR-INTEG-001 coverage runner integration (opt-in). It has 15 §1 normative clauses, 15 acceptance criteria, 10 failure-mode rows, 3 open questions resolved, 4 implementation notes. Length is well above the 700-line target — justified by §3's verbatim TypeScript types (~130 lines) + parser (~110 lines) + 1 detailed validator + 8 implied via shared pattern + CLI (~70 lines) + scoring engine + test cases + DTCG fixture (~80 lines combined production code). All 6 findings resolved. **Score = 10/10.**

## §2 — Findings (all resolved)

### ISS-001 — Token-layer inference heuristic fragility
Pre-revision §3 `inferColorLayer()` uses regex heuristics on token names. Teams with non-standard naming (e.g., `c.btn.bg` instead of `color.button.background`) get `layer='unknown'`. **Resolved:** §10 failure-mode row + §11 implementation note acknowledge heuristic limitations; future-FR would add explicit metadata support (e.g., DTCG `$extensions.dsaf.layer`). Current approach is best-effort. Pattern: §3.6 rule 18 (heuristic + future-improvement path documented).

### ISS-002 — DTCG vs Tokens Studio reference resolution
Pre-revision §3 parser tracks references (`{color.primary.900}`) but doesn't resolve them to actual values. Multi-mode/multi-brand tokens require reference resolution to compute final colors. **Resolved:** Reference tracking is captured (`ColorToken.references` field); resolution deferred to future-FR. The validators that need resolved values (e.g., color-space validator) note this limitation. Pattern: §3.6 rule 18 (scope limitation + future-FR pointer).

### ISS-003 — Peer dependency on FR-INTEG-001
Pre-revision §3 `package.json` has FR-INTEG-001 as peerDependency. But if user installs tokens-validator standalone (without Storybook), the peerDep warning is noisy. **Resolved:** `peerDependenciesMeta.optional: true` makes the peer optional; standalone CLI usage doesn't trigger warning. Library users get the warning only if they need the type re-exports. Pattern: §3.5 rule 15 (npm dependency design with standalone + integrated modes).

### ISS-004 — Validator strictness defaults
Pre-revision validators use moderate thresholds (e.g., 80% unknown-ratio for downgrade). Teams might want stricter (e.g., 50%) or laxer (90%). **Resolved:** §9 Q2 explicit — default moderate; CLI flag `--strict` deferred to future iteration. Strictness customisation increases CLI complexity disproportionately for v0.1. Pattern: §3.6 rule 18 (calibration + future-customisation deferred).

### ISS-005 — Tokens Studio version evolution
Pre-revision relies on current Tokens Studio export format. Future Tokens Studio releases may change format. **Resolved:** §10 failure-mode row + §11 explicit — pin to known-good version; ship validator updates when fixtures update. The format-detection at parse time + warnings array enable graceful degradation. Pattern: §3.5 rule 15 (external dependency version drift mitigation).

### ISS-006 — CLI exit-code semantics
Pre-revision CLI exits 0 on success regardless of scores. Some users may want CI-fail-on-low-score. **Resolved:** §11 implementation note explicit — current behavior: 0=success/1=error; score-threshold exit is a future flag (e.g., `--fail-below 60`). Keeps v0.1 simple; opens path for CI integration in future. Pattern: §3.6 rule 18 (CLI semantics + future-flag explicit).

## §3 — Resolution

All 6 mechanical concerns addressed:

- §10 + §11 explicit on layer-inference heuristic + future explicit-metadata path.
- §3 + §11 explicit on reference tracking captured + resolution deferred.
- §3 package.json `peerDependenciesMeta.optional: true` solves standalone-vs-integrated warning.
- §9 Q2 + §11 explicit on default strictness + future `--strict` flag.
- §10 + §11 explicit on Tokens Studio format drift mitigation.
- §11 explicit on CLI exit-code semantics + future score-threshold flag.

The post-revision FR runs ~1,180 lines, well above the 700-line target — justified by §3's verbatim TypeScript types + parser + validator skeleton + scoring engine + CLI + test cases + DTCG fixture (~580 lines of production code). The §1 normative + §3 contract + §4 ACs cover all 9 validators despite §3 detailing only the first (the pattern is consistent + the AC count verifies all 9). All cross-FR coordination (FR-CORE-001 metadata, FR-INTEG-001 shared CriterionScore, FR-INTEG-003 inherits pattern, FR-CLI-001 P5 consumes audit_targets, FR-CORE-004 cap-rule, FR-BRAND-001/002/004 sacredness/taxonomy/decoupling) is explicit. The 10h founder-time + Vitest ≥80% + CI matrix + MIT + cap-rule disclosure + audit_targets contract form the operational gates for shipping the A.1 Foundations & Tokens validator as a tokens-focused integration without duplicating FR-INTEG-001's scoring infrastructure or breaking the framework's sacredness rules. **Score = 10/10.**

---

*End of FR-INTEG-002 audit.*
