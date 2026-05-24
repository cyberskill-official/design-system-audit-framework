---
fr_id: FR-CORE-004
audited: 2026-05-17
verdict: PASS (after revision)
score_pre_revision: 7.5/10
score_post_expansion: 9/10
score_post_revision: 10/10
issues_resolved: 8
template: dsaf-spec@1
---

## §1 — Verdict summary

The post-revision spec runs ~720 lines covering the self-audit cap rule (L3 unverified / L4 verified / L5 verified + entry-gate stack), the combined-percentage ban, the worked-example re-framing for `examples/cyberskill-design-system/`, the dedicated `self-audit-policy.md` doctrine file, the cap-lift trigger, the framing-vs-interior split, the `_history.md` schema amendment, and the read-before-patch discipline. It has 15 §1 normative clauses (added 2 in revision: framing-preservation across SCAN cycles, framing-vs-interior split), 12 acceptance criteria, 11 failure-mode rows, 6 open questions resolved, 8 implementation notes (added 3 in revision). Length is within the 400–700 substantive-FR target; the slight overshoot is justified by the policy file's verbatim doctrine surface in §3. All 8 findings below are mechanically resolvable inside the FR. **Score = 10/10.**

## §2 — Findings (all resolved)

### ISS-001 — Chicken-and-egg with FR-DOCS-001 README rewrite
Pre-revision AC11 required the cap rationale in "README first 200 words" but FR-DOCS-001 (README rewrite) hasn't shipped yet — at this FR's land time, the README first paragraph may not have stabilised. **Resolved:** §3 README patch section made explicitly *conditional* on existing phrasing, with a no-op clause when none of the banned phrasings are present. AC11 amended to verify the rationale in *either* `guidelines/01-introduction.md` (which this FR amends directly) *or* the README (when FR-DOCS-001 ships). The dependency ordering between FR-CORE-004 and FR-DOCS-001 now makes either-first-shippable feasible. Pattern: §8.6c (§1 MUST clarity — was implicit, now explicit).

### ISS-002 — dsaf.dev landing page coordination unclear
Pre-revision §1 #1 named "future `dsaf.dev/` landing copy" as in-scope, but FR-BRAND-001 has already shipped the landing page (per the build order). The landing page minted in FR-BRAND-001 conforms (no 84.6%, no L5 claim) but this FR didn't acknowledge that. **Resolved:** §3 README-patch section adds a paragraph stating "the dsaf.dev landing page minted by FR-BRAND-001 already conforms (it has no CyberSkill-tier claim and no combined-percentage claim) and is therefore not patched by this FR. If a future iteration of dsaf.dev adds CyberSkill self-audit citations, those citations MUST conform to this policy." Pattern: §8.1a (cross-FR single-source-of-truth — the policy is the source; FR-BRAND-001 conforms to it without being re-patched).

### ISS-003 — Find/replace patches assumed phrasings not verified in source
Pre-revision §3 README and `improvement-plan.md` patch tables listed before-text strings ("CyberSkill's design system scores 84.6% combined" etc.) that may not match the literal text in current files. A naive `sed -i` against guessed strings would no-op silently. **Resolved:** §3 README-patch section reframed as "conditional on existing phrasing" with the explicit "rg first, then patch only matched phrasings" procedure. `improvement-plan.md` patch table prefaced with "Read current file to enumerate the actual headline phrasings present; the table below uses illustrative phrasings." Implementation note added in §11: "Read-before-patch discipline" mandates `Read`-ing each touched file before authoring the patch. Pattern: §8.1a (before-text not quoted verbatim — generalised to "before-text must be matched at patch time").

### ISS-004 — FR-CERT-001 referenced without placeholder annotation
Pre-revision §1 #13 referenced FR-CERT-001 (P6 — verifier program) without the `# placeholder — not yet specified` annotation required by AUTHORING §3.1 rule 3. Without annotation, a reciprocity-sweep tool would flag dangling references. **Resolved:** §1 #13 now reads "FR-CERT-001 (P6 — placeholder, not yet specified)." Similar annotation already present in `risk_if_skipped`. Pattern: §3.1 rule 3 (placeholder annotation).

### ISS-005 — Framing preservation across SCAN/FIX cycles not normative
Pre-revision §10 row "Audit reports inside `examples/` re-import the L5 framing accidentally" cited "future SCAN cycles re-compute interior scores but MUST NOT re-frame the headline" — but this was only in a failure-mode-recovery cell, not a §1 normative clause. The risk is high (every future SCAN cycle is an opportunity for the headline to regress). **Resolved:** §1 #14 (new clause) makes framing preservation across SCAN/FIX cycles normative: "the §10 Criteria scores table re-computes per the rubric (interior numbers may move with FIX results), but the headline framing MUST NOT regress to a single-percentage or L5 headline." Pattern: §8.6a (single-source-of-truth — was only in §10, now in §1 too).

### ISS-006 — Framing-vs-interior split not enumerated
Pre-revision §1 #5 said "preserve the per-criterion interior scores unchanged" but didn't enumerate *which* sections are framing vs interior. AC9 (interior scores preserved) referenced "§10 Criteria scores table" without spelling out the rest. **Resolved:** §1 #15 (new clause) enumerates framing surfaces (H1, first-paragraph summary, executive summary banner, README citation, `_history.md` cited-tier column, dsaf.dev / press-kit copy) and interior surfaces (§10 Criteria scores per-row values, §1 SCAN Baseline interior, §2 Research findings, §3 Findings, §6 Execution log, §8 RE_AUDIT post-fix scores). AC9 still passes mechanically. Pattern: §8.6a (failure-mode-row in §10 promoted to §1 normative scope).

### ISS-007 — `_history.md` schema amendment without explicit column split
Pre-revision §3 `_history.md` row used a column header `Cited tier` distinct from `Combined score`, but the current `_history.md` schema may have only one score column. The row format presumed a column split that wasn't enforced. **Resolved:** §3 `_history.md` section reframed as "schema amendment" — explicitly splits "Interior combined %" from "Cited tier" — and notes that updating `templates/audit-history-register.md` (the template file) is *out of scope* for this FR (deferred to FR-CORE-003). The example `_history.md` row uses the new schema. Pattern: §8.6c (schema evolution made explicit).

### ISS-008 — `service: doctrine` frontmatter understates the surface
Pre-revision frontmatter said `service: doctrine` but the FR patches files in `examples/cyberskill-design-system/` (worked-example artefacts, not strictly doctrine) and binds future SCAN/FIX runs via §1 #14. **Resolved:** §11 implementation note "Service surface extension" clarifies — `service: doctrine` is shorthand for "this FR ships markdown changes, not code"; the actual files touched span `docs/`, `README.md`, `examples/cyberskill-design-system/`, and forward-bind future audit runs. Also recommends CODEOWNERS for `internal/branding/` and `examples/cyberskill-design-system/` set to founder + future co-maintainer. Pattern: §3.1 / §11 (notes give the rationale for non-obvious frontmatter values).

## §3 — Resolution

All 8 mechanical concerns addressed:

- §1 grew from 13 to 15 normative clauses (added #14 framing preservation across SCAN cycles, #15 framing-vs-interior split enumeration).
- §1 #13 placeholder annotation added for FR-CERT-001.
- §3 README-patch section reframed as conditional with the rg-first-then-patch procedure; dsaf.dev coordination explicit.
- §3 `improvement-plan.md` patch table prefaced with "Read current file at patch time" + explicit framing-vs-interior split.
- §3 `_history.md` section restructured as schema amendment with the column split made explicit.
- §11 implementation notes gained: Read-before-patch discipline, Service surface extension, _history.md schema-amendment rationale.
- Cross-FR coordination clarified: FR-DOCS-001 (README rewrite) can ship before or after this FR; FR-CERT-001 (P6) is a downstream consumer; FR-CORE-003 (template normalisation) gets the template change.

The post-revision FR runs ~720 lines, slightly above the 400–700 target due to the policy file body in §3 (~150 lines of verbatim doctrine). The overshoot is justified — `internal/branding/self-audit-policy.md` is the load-bearing artefact and shipping it inline in §3 means the FR is self-contained. Every §1 MUST has a verifiable AC; every framing-vs-interior boundary is enumerated; every cross-FR reference is annotated. **Score = 10/10.**

---

*End of FR-CORE-004 audit.*
