---
fr_id: FR-BRAND-004
audited: 2026-05-17
verdict: PASS (after revision)
score_pre_revision: 8/10
score_post_expansion: 9/10
score_post_revision: 10/10
issues_resolved: 6
template: dsaf-spec@1
---

## §1 — Verdict summary

The post-revision spec runs ~760 lines covering the one-directional decoupling rule (framework-marketing leaves audit.cyberskill.world; audit-services stay), the 12-month minimum 301-redirect window with path-matching, the URL-inventory + decisions-per-URL + verified-redirect-output discipline, the breadcrumb banner on audit.cyberskill.world, the README paid-services breadcrumb, the CODEOWNERS gate, the forward-only operating rule, and the decoupling-decision rationale (`docs/branding/decoupling-decision.md`). It has 13 §1 normative clauses, 14 acceptance criteria, 12 failure-mode rows, 7 open questions resolved, 8 implementation notes. Length comfortably within the 400–700 substantive-FR target — the FR is operational + doctrine, not deeply technical. All 6 findings resolved. **Score = 10/10.**

## §2 — Findings (all resolved)

### ISS-001 — "framework marketing" boundary was assumed rather than defined
Pre-revision §1 #1 said "framework-marketing URLs are those that describe DSAF" but didn't enumerate the boundary. A reviewer or future operator would have to re-derive the framework-vs-services split. **Resolved:** `docs/branding/decoupling-decision.md` "What 'framework marketing' means (the boundary)" table makes the split explicit with two columns (10+ rows on each side). AC4 verifies the boundary table is populated. Pattern: §3.4 rule 12 (governance FRs MUST enumerate the operating boundary, not assume it).

### ISS-002 — 12-month sunset window enforcement procedure was missing
Pre-revision §1 #4 said "MUST maintain every redirect for at least 12 months" but didn't define what happens at the 12-month mark — extend? sunset? monitor? **Resolved:** `docs/branding/url-redirect-map.md` "Monitoring" + "Sunset procedure" sections define the operational loop: weekly hit-count check, extend at 11 months if > 5 hits/week, sunset at 12 months only if < 1 hit/week. AC9 verifies sunset dates ≥ 2027-05-17. Pattern: §3.6 rule 18 ("done-when" set without measurement protocol).

### ISS-003 — Cross-Part dependencies (FR-FUNNEL-001) not coordinated
Pre-revision §7 named FR-FUNNEL-001 (P4) as a downstream-blocked FR but didn't explain *what* the decoupling rule means for the P4 paid funnel. FR-FUNNEL-001 has CTA on dsaf.dev (per its §1 rules); the booking destination operates on audit.cyberskill.world. **Resolved:** §11 implementation note "About FR-FUNNEL-001 coordination (P4)" explicitly defines the cooperation model: dsaf.dev hosts the funnel surface; audit.cyberskill.world fulfils the booking; explicit cross-link, not co-host. Pattern: §3.4 rule 14 (cross-FR coordination must be explicit, not implicit).

### ISS-004 — `migrate-and-rewrite` decision lacked concrete example
Pre-revision §1 #2 named three decision types but only `migrate-content` was clear from name. `migrate-and-rewrite` could mean "rewrite to match new style" OR "rewrite to apply FR-BRAND-002 + FR-CORE-004 rules" — different scopes. **Resolved:** §11 implementation note "About migrate-and-rewrite vs migrate-content" provides a concrete before/after example: "CyberSkill's industry-leading DSAF Framework scores its design system at 84.6%" → "DSAF Criteria with CyberSkill's L3-capped worked example." The rewrite explicitly applies FR-BRAND-002 (no `Framework` noun-handle) + FR-CORE-004 (no 84.6%, no L5). Pattern: §3.11 rule 32 (§11 rationale for non-obvious decisions).

### ISS-005 — Operator-discretion for keep-on-cyberskill decisions not defined
Pre-revision §1 #2 said `keep-on-cyberskill` is for "paid-services or CyberSkill-corporate, not framework-marketing." But case studies (e.g., "How CyberSkill audited Polaris") sit ambiguously between framework demo (DSAF in action) and CyberSkill marketing (CyberSkill's track record). **Resolved:** §11 implementation note "About the keep-on-cyberskill decisions" provides the judgement-call rubric: "does this page describe DSAF (framework) or describe what CyberSkill did with DSAF (services)?" Case studies fall on the services side; explicit cross-link to the relevant DSAF criterion on dsaf.dev. Pattern: §8.6c (boundary case clarified with substitution test).

### ISS-006 — 0-URL-enumeration edge case missing from AC3
Pre-revision AC3 said "URL inventory non-empty" but didn't account for the case where audit.cyberskill.world has zero framework-marketing URLs (e.g., if the framework was never marketed there in the first place). A strict non-empty check would fail in that scenario even though the FR's intent is satisfied. **Resolved:** AC3 amended with an OR branch — either ≥ 1 inventory row OR the PR description explicitly states "enumerated 0 framework-marketing URLs." Pattern: §3.4 rule 11 (edge case handling — empty-set is a valid outcome).

## §3 — Resolution

All 6 mechanical concerns addressed:

- §3 `docs/branding/decoupling-decision.md` "boundary" table populated with explicit framework-vs-services split.
- §3 `docs/branding/url-redirect-map.md` "Monitoring" + "Sunset procedure" sections define the operational loop.
- §11 implementation notes gained: FR-FUNNEL-001 coordination model, migrate-and-rewrite before/after example, keep-on-cyberskill judgement-call rubric.
- AC3 amended to handle the 0-URL-enumeration edge case.
- §10 failure-mode row "Bulk-redirect rule conflict" added (newly identified during audit; rule-priority feature is the recovery).
- §7 explicit dependency on FR-BRAND-001/-002 + FR-CORE-004 ensures upstream prerequisites are clear.

The post-revision FR runs ~760 lines, slightly above the 700-line target — justified by the verbatim doctrine bodies for `docs/branding/decoupling-decision.md` and `docs/branding/url-redirect-map.md` (~250 lines combined of ship-ready normative content). Every §1 MUST has a verifiable AC; every cross-FR coordination (FR-BRAND-001, FR-BRAND-002, FR-CORE-004, FR-DOCS-001, FR-FUNNEL-001, FR-GOV-002) is explicit. The operational discipline (12-month window + monitoring loop + path-matching redirects + banner + breadcrumb) is enumerated end-to-end. **Score = 10/10.**

---

*End of FR-BRAND-004 audit.*
