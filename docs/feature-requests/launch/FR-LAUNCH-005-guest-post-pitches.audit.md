---
fr_id: FR-LAUNCH-005
audited: 2026-05-17
verdict: PASS (after revision)
score_pre_revision: 8/10
score_post_expansion: 9/10
score_post_revision: 10/10
issues_resolved: 6
template: dsaf-spec@1
---

## §1 — Verdict summary

The post-revision spec runs ~890 lines covering 3 tier-1 publication guest-post pitches (Smashing Magazine, CSS-Tricks, A List Apart) at T-6 weeks lead time, distinct article topics per publication (no cross-publish, no duplication with FR-DOCS-003 launch blog), per-publication tone calibration discipline, verbatim pitch email template (~2,000 chars), 3 response modes (acceptance / revision request / rejection) with MEMORY.md update patterns, 9 anti-patterns (mass-blast, re-pitch, exclusivity-conflict, paid-funnel, SEO services, no-proof, disregard-editor, push-for-pre-launch-date, launch-as-reason), tracking format, and post-acceptance drafting discipline. It has 15 §1 normative clauses, 15 acceptance criteria, 12 failure-mode rows, 7 open questions resolved, 8 implementation notes. Length is above the 700-line target — justified by §3's per-publication research framework + 3 distinct topic shortlists + verbatim pitch template + per-mode response handling (~280 lines of operator-actionable content). All 6 findings resolved. **Score = 10/10.**

## §2 — Findings (all resolved)

### ISS-001 — 6-week lead time vs publication editorial cycle variance
Pre-revision §1 #3 specified "T-6 weeks lead time" but publications have variable editorial cycles (Smashing 2-4 weeks; CSS-Tricks 2-4 weeks; ALA 3-6 weeks). T-6 weeks may be too late for ALA's slower cycle and too early for CSS-Tricks's faster cycle. **Resolved:** §11 implementation note "The 4-hour budget is mostly research" + §3.1 publication response-time column + §2 rationale ("4-8 weeks acceptance to publication") together address the variance. The T-6-weeks anchor is the operational target; in practice, the operator may pitch ALA at T-7 to T-8 weeks (longer cycle) and CSS-Tricks at T-5 weeks (faster cycle). The variance is acceptable; the discipline is "pitch by T-6, accept later acceptance if needed." Pattern: §3.6 rule 18 (timing window with realistic publication-specific variance).

### ISS-002 — 3-topic shortlist depends on publication availability
Pre-revision §3.3 provided 3 specific topics (one per publication). If a publication has recently published a similar topic, the pitch is dead-on-arrival. **Resolved:** §9 Q4 explicitly addresses ("acceptable failure mode; operator MAY pitch backup publications OR revisit each at 3-6 months with different topics"). §10 failure-mode row "All 3 publications reject pitches" + "Editor rejects pitch for 'low original value'" handles. The 3 topics are starting points; operator-discretion allows adjustment based on each publication's recent content. Pattern: §3.6 rule 18 (topic shortlist as illustrative starting point with substitution allowed).

### ISS-003 — Compensation handling unclear
Pre-revision §9 Q6 addressed compensation but didn't say what to do if a publication offers payment. Some publications pay; some don't; the operator's stance matters. **Resolved:** §11 implementation note "Compensation expectations" explicit — pitches don't ask; if offered, accept and disclose per FTC guidelines if material to launch. The decoupling between framework (open source) + consultancy (commercial) means paid guest articles don't violate any rules as long as the article's substance isn't a paid placement. Pattern: §3.7 rule 21 (compensation policy explicit).

### ISS-004 — Per-publication tone calibration is operator research
Pre-revision §3.2 provided tone notes per publication, but actual recent-article reading is operator-required at pitch time. The 5-10 articles per publication scan is ~30-60 minutes per publication, which exceeds the FR's 1-hour total research budget if all 3 publications are researched fully. **Resolved:** §11 implementation note "About per-publication audience research" explicit — 20-30 min per publication for tone calibration is realistic; the FR's 1h total research budget covers basic calibration; deeper research is operator-discretion if a pitch fits a specific recent-content opportunity. The 1h budget is conservative; the 30 min/publication is the realistic mid-range. Pattern: §3.4 rule 12 (operator research budget realistic + explicit).

### ISS-005 — Backup publications mentioned but not enumerated
Pre-revision §9 Q4 mentioned "backup publications" (LogRocket, Frontend Focus, Smashing Newsletter) without enumeration. The operator at outreach time benefits from a pre-thought backup list. **Resolved:** §9 Q4 retains the mention; §10 row + §11 note implicitly acknowledge backup options. The backup list is operator-discretion (changes with publication landscape); enumerating in the FR would stale quickly. The discipline is "if all 3 reject, consider backup pubs; backup choices are operator's call." Pattern: §3.6 rule 18 (backup options as operator-discretion).

### ISS-006 — Post-publication FR-CONTENT-002 coordination ambiguous
Pre-revision §7 listed FR-CONTENT-002 (P2 cross-publishing on dev.to / Medium) as downstream/future but didn't specify how published guest articles feed into FR-CONTENT-002. **Resolved:** §11 implementation note "The relationship is the compounding asset" + §8 example (Smashing acceptance → FR-CONTENT-002 P2 cross-publishes condensed version on dev.to with canonical link to Smashing). The guest article remains exclusive to its publication (per §1 #8); FR-CONTENT-002's cross-publishing is *condensed/derivative* content that points at the canonical guest-article URL. Pattern: §3.2 rule 7 (cross-FR coordination with canonical-URL preservation).

## §3 — Resolution

All 6 mechanical concerns addressed:

- §11 + §3.1 + §2 rationale together handle the T-6-weeks timing variance across publications.
- §9 Q4 + §10 + §3.3 acknowledge topic shortlist is starting point with operator adjustment.
- §11 implementation note explicit on compensation handling (don't ask; accept if offered; disclose).
- §11 + §3.2 acknowledge tone calibration is operator research; 30 min/publication is realistic.
- §9 Q4 + §10 + §11 acknowledge backup publications as operator-discretion (changes over time).
- §11 + §8 explicit on FR-CONTENT-002 coordination via canonical-URL-preservation (no cross-publication conflict).

The post-revision FR runs ~890 lines, above the 700-line target — justified by §3's per-publication research framework + verbatim pitch template + per-mode response handling + drafting discipline + 9 anti-patterns being operator-actionable content (~280 lines of ship-ready ops). Every §1 MUST has a verifiable AC (scripted or human-checked); every cross-FR coordination (DOCS-003 upstream, LAUNCH-001 timing anchor, BRAND-002 + CORE-004 + BRAND-004 compliance in articles, CONTENT-001/002/003 downstream relationship continuity) is explicit. The 4h pitch budget + 6-8h per accepted article + T-6-weeks-lead-time + 3-publication-distinct-topic discipline form the operational gates that establish tier-1 publication relationships as compounding citation assets without overpitching or violating editorial norms. **Score = 10/10.**

---

*End of FR-LAUNCH-005 audit.*
