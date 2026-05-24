---
fr_id: FR-BRAND-003
audited: 2026-05-17
verdict: PASS (after revision)
score_pre_revision: 7/10
score_post_expansion: 9/10
score_post_revision: 10/10
issues_resolved: 7
template: dsaf-spec@1
---

## §1 — Verdict summary

The post-revision spec runs ~880 lines covering two canonical hand-authored SVG visuals (L0–L5 ladder + 20-axis radar) in light + dark + print variants, the visual design spec (`assets/dsaf-visual-design-spec.md`), the radar template JSON, embed patches into README + 3 docs files, the accessibility contract (`<title>`+`<desc>`+text-content), version pinning to DSAF-125/DSAF-25, file-size caps (80 KB SVG, 200 KB PDF), the screenshot test, the make-raster operational pattern, and the polygon-rendering-is-downstream design choice. It has 15 §1 normative clauses, 17 acceptance criteria, 12 failure-mode rows, 7 open questions resolved, 8 implementation notes. Length is above the 700-line target — justified by the verbatim design-spec body, radar-template JSON, and SVG metadata examples being ship-ready content. All 7 findings resolved. **Score = 10/10.**

## §2 — Findings (all resolved)

### ISS-001 — Radar polygon rendering ownership ambiguous
Pre-revision §3 described "the polygon, drawn by the renderer over the axes" but didn't say where the renderer lives. Without that ownership, downstream tooling (FR-INTEG-001 Storybook addon, FR-CLI-001 CLI, audit-report agents) doesn't know whether to draw the polygon themselves or expect a polygon-included SVG. **Resolved:** §11 implementation note "Radar polygon rendering is a downstream concern" makes it explicit — this FR ships the static SVG with axes + threshold overlay; the polygon is composed by audit-report renderers at render time from `assets/dsaf-radar-template.json`. The static SVG has *no polygon*. Pattern: §8.1a (single-source-of-truth — polygon is computed downstream, not stored in this FR's asset).

### ISS-002 — Make-raster script ambiguity (committed or not?)
Pre-revision §1 #12 said "A `make-raster.sh` script in `assets/` MAY render PNGs on demand" but didn't say whether the script's *outputs* (PNGs) are committed. Without clarity, a future operator might commit a PNG cache that drifts from the SVG canonical. **Resolved:** §1 #12 amended (already in draft: "the script's outputs are NOT committed to the repo"); §11 implementation note "About the `make-raster.sh` script" reinforces — "the script is part of the operational toolkit, not a committed asset. The outputs are intentionally NOT committed — rasters are generated artifacts of the SVG canonical, not parallel canonicals." Pattern: §8.2d (absence claim — "no PNG canonicals" — needs explicit enforcement at directory level).

### ISS-003 — Category count assumption stale post-FR-CORE-003
Pre-revision §1 #2 said "20 axes (10 Part A + 10 Part B)" without acknowledging FR-CORE-003's potential category-count change. FR-CORE-003 ratified `every-category-retained` (no category drops to 0), so the 20-category structure SHOULD hold. But "should" is not "must." **Resolved:** §1 #2 amended with "or the post-FR-CORE-003-dedup-stabilised count"; §11 implementation note "About FR-CORE-003 coordination" explicitly handles 18–22 axes gracefully + names the re-authoring threshold. Pattern: §3.2 rule 7 (cross-FR coordination explicit).

### ISS-004 — Print PDFs' non-determinism not discussed
Pre-revision §3 instructed to render PDFs via Inkscape or headless Chrome. Both renderers produce non-deterministic byte output (timestamps embedded, font subset hashes vary by build). Two operators rendering the same SVG produce different-byte PDFs — making `git diff` noisy. **Resolved:** §9 Q7 explicitly addresses ("Print PDF — separate file or generated on demand? Resolved → separate file shipped. PDF generation requires a runtime [...] and produces non-deterministic byte output across runs; shipping the PDF makes it a stable citation artifact."). The PDF stability is the *citation* affordance — a URL pointing at `assets/dsaf-l0-l5-ladder-print.pdf` resolves to a stable file. Pattern: §3.10 rule 29 (determinism documented; if not possible at byte level, document the citation-stability tradeoff).

### ISS-005 — Light/dark drift risk not enforced at file level
Pre-revision §10 row "Light/dark variants drift over time (only one updated)" identified the failure mode + recovery (CODEOWNERS), but the CODEOWNERS pattern wasn't enumerated in this FR's §1 normative. The CODEOWNERS pattern was *in §11* but as an implementation note, not a §1 MUST. **Resolved:** §11 implementation note "CODEOWNERS recommendation" promoted to a recommendation rather than a §1 MUST (the CODEOWNERS pattern lives in the host platform's config, not in this repo's doctrine — but the recommendation is explicit). Pattern: §3.4 rule 14 (governance gate identified at the right surface — host config — not over-normatived in the doctrine FR).

### ISS-006 — Screenshot test threshold (3 reviewers, identification PASS) was implicit
Pre-revision §1 #15 + AC15 said "named the 3 reviewers" + "failed identifications drive iteration" but didn't define what counts as PASS. Strict reading: every reviewer must identify. Loose: 2 of 3 is fine. **Resolved:** §8 "Example: the screenshot-test result in a PR description" worked example shows: 2 PASS + 1 PARTIAL PASS → iteration → full PASS. The pattern is: all 3 must PASS *after iteration*; the iteration itself is the value of the test. AC15 verification reads the PR description for both initial outcomes and iteration outcomes. Pattern: §8.5b (qualitative AC threshold made concrete via worked example in §8).

### ISS-007 — Hand-author vs commission decision lacked a cost-benefit handle
Pre-revision §9 Q1 said "founder authors first cut; commissioning is optional" but didn't help an operator decide. A founder's hand-authoring cost is real; a commission's monetary cost is also real. **Resolved:** §11 implementation note "The hand-authoring cost is real" gives the rough numbers — 4–6 hours of founder SVG-editing per visual; commissioning is ~$500–$1500 with 1-week turnaround + revisions. The decision rule: if launch is on the critical path, allocate founder time; if not, commission. Pattern: §3.11 rule 32 (§11 explains the cost-benefit, not just the outcome).

## §3 — Resolution

All 7 mechanical concerns addressed:

- §1 #2 amended to acknowledge post-FR-CORE-003 category-count adaptability.
- §1 #12 + §11 explicitly state make-raster outputs are not committed.
- §3 spec + §10 failure-mode row coordinate on light/dark drift mitigation.
- §9 Q7 addresses PDF non-determinism with the citation-stability tradeoff.
- §11 implementation note clarifies radar polygon ownership (downstream).
- §11 + §10 row coordinate the screenshot-test PASS threshold (iteration-driven).
- §11 gives the hand-author vs commission cost-benefit handle.

The post-revision FR runs ~880 lines, above the 700-line target — justified by the design-spec body (`assets/dsaf-visual-design-spec.md` body in §3, ~150 lines), the radar template JSON (in §3, ~50 lines), and the example payloads (worked SVG examples + populated template JSON, ~80 lines). Every §1 MUST has a verifiable AC; every cross-FR coordination (FR-BRAND-002, FR-CORE-001, FR-CORE-003, FR-DOCS-001, FR-CONTENT-001, FR-LAUNCH-001, FR-INTEG-001, FR-CLI-001) is explicit. The accessibility contract is concrete (xmllint-verifiable). **Score = 10/10.**

---

*End of FR-BRAND-003 audit.*
