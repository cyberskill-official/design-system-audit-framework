---
fr_id: FR-DOCS-001
audited: 2026-05-17
verdict: PASS (after revision)
score_pre_revision: 7.5/10
score_post_expansion: 9/10
score_post_revision: 10/10
issues_resolved: 7
template: dsaf-spec@1
---

## §1 — Verdict summary

The post-revision spec runs ~860 lines covering the README rewrite contract (HN-launch idiom, first-200-words = what / why now / how it differs from X), the canonical 10-section structure (H1 → pitch → visuals → DSAF-25 cross-link → Quick Start → endorsement slots → worked example → Reading Order → Maintainer + paid-services breadcrumb → License + Contributing), the banned elements (email capture, paid CTAs, single-percentage headline, `Framework` noun-handle), the canonical README body in §3 (~250 lines of ship-ready content), the colleague-skim test, the docs/01-introduction.md Reading Order patch, and the 12-failure-mode register. It has 15 §1 normative clauses, 17 acceptance criteria, 12 failure-mode rows, 7 open questions resolved, 8 implementation notes. Length is above the 700-line target — justified by the verbatim README body in §3 being the load-bearing artefact. All 7 findings resolved. **Score = 10/10.**

## §2 — Findings (all resolved)

### ISS-001 — First-200-words extraction method ambiguous
Pre-revision AC1 said "extract the README body (excluding the H1 line and the visual `<picture>` blocks), take the first 200 words via `awk` / `wc`." But "excluding the H1" is operator-judgement; some operators extract everything, some skip blockquotes too. **Resolved:** §5 AC1 verification command spelled out: `awk 'NR > 1 && !/^<picture>/ && !/^</' README.md | tr '\n' ' '` — strips the H1 (NR == 1), skips `<picture>` and HTML-tag lines, joins into one stream. The extraction is reproducible. Pattern: §8.6b (verification command reproducibility).

### ISS-002 — Endorsement slots' empty state pre-FR-DOCS-002 unclear
Pre-revision §1 #9 said "the slots' presence is in scope of this FR; the quotes themselves land via FR-DOCS-002" but didn't say what the slots look like at PR land time before quotes arrive. **Resolved:** §3 README body shows the slots as `> "<endorsement quote, ≤ 280 chars>" — <Reviewer Name>, <Affiliation>` with the explicit FR-DOCS-002 + FR-GOV-001 placeholder annotation underneath. AC10 verifies the slots are present. The §10 failure-mode row addresses what happens if FR-DOCS-002 slips ("replace placeholders with 'Endorsements landing in [date]' sentence"). Pattern: §3.1 rule 3 (placeholder annotation for not-yet-specified FRs).

### ISS-003 — Word-count range (800–1600) lacked rationale
Pre-revision AC17 capped the README at 800–1600 words without explanation. **Resolved:** AC17 comment added in §11 implementation notes: "Below 800 = under-pitched; above 1600 = stops being a landing page and becomes documentation." The range derives from the README's role as landing page — short enough to read in one sitting (~5 minutes), long enough to convey value-prop + visuals + Quick Start + endorsements. Pattern: §3.11 rule 32 (rationale for non-obvious constants).

### ISS-004 — Quick Start `npx dsaf scan` line + framing inconsistency
Pre-revision §3 README body Quick Start showed `npx dsaf scan` with the comment `# Coming in v0.2 (P5):` — but FR-CLI-001 is P5 and the README is P0. A reader scrolling Quick Start sees a command that's not runnable; the comment is the disclaimer. **Resolved:** §9 Q3 explicitly addresses ("honest direction-signaling is different from false promises"); §8 example payload shows the Quick Start with the comment + disclaimer; §10 failure-mode row "Quick Start `npx dsaf scan` line confuses reader" identifies the failure path + recovery (the actual command would return "command not found," which is honest). The framing is explicit. Pattern: §8.5b (roadmap-mention with calibrated reader expectation).

### ISS-005 — Repo URL `github.com/CyberSkill/...` will change at FR-GOV-002
Pre-revision §3 README body had `github.com/cyberskill-official/design-system-audit-framework` as the canonical URL. FR-GOV-002 (P2) migrates the repo to a neutral org. The README's URL will need an update at FR-GOV-002 land. **Resolved:** §11 implementation note "About the Quick Start's `git clone` URL" makes this explicit — "Post-FR-GOV-002, this FR's URL patch will need an update in a follow-up FR." The URL stays current pre-FR-GOV-002; the future migration is documented. Pattern: §3.4 rule 14 (future-migration cleanup explicit).

### ISS-006 — `<details>` rule scope (first 600 words) wasn't enumerated explicitly
Pre-revision §1 #14 said "no `<details>` collapsing on the first 600 words" but the wording mixed two ideas: (a) no collapsing of substantive value-prop content, (b) `<details>` welcome for sub-sections after value-prop. **Resolved:** §1 #14 amended in body to explicitly distinguish "first 600 words" (no `<details>`) from "after first 600 words" (allowed); §11 implementation note "About no `<details>` collapsing" explains why (GitHub default-collapses, scroller sees heading-without-content). Pattern: §8.6c (rule scope made unambiguous).

### ISS-007 — Maintainer section's paid-services framing risk
Pre-revision §3 README body had the Maintainer section + paid-services breadcrumb at the bottom. A reader reaching the Maintainer section sees "CyberSkill is a software solutions consultancy founded in 2020, based in Ho Chi Minh City, Vietnam." This is a geography-headwind moment (per plan §"Honest critique" item 4). The framing matters: presenting CyberSkill as "the maintainer who's transparent about being a consultancy" is different from "the consultancy that built the framework as marketing." **Resolved:** §3 README body Maintainer section opens with "Maintained by [CyberSkill](https://cyberskill.world) and named contributors" — leading with the *plural* (named contributors) keeps the framing as a community-style project with CyberSkill as one maintainer. The "We use DSAF internally and offer paid third-party audit services" sentence is honest without being a sales pitch. The "non-Western co-maintainer is being recruited" sentence (FR-GOV-002 placeholder) signals that the geography problem is being addressed structurally. §11 implementation note "Why a Maintainer section at the bottom" articulates the placement rationale. Pattern: §3.3 rule 9 (named structure for governance/geography sensitivity).

## §3 — Resolution

All 7 mechanical concerns addressed:

- §5 AC1 verification command made fully reproducible.
- §3 README endorsement slots show the placeholder + FR-DOCS-002 + FR-GOV-001 cross-reference; §10 failure-mode handles the slip-case.
- §11 implementation note explains the 800–1600 word range rationale.
- §3 Quick Start framing is explicit about `npx dsaf scan` as roadmap-not-implementation; §10 covers the confusion mode.
- §11 explicit forward-pointer to FR-GOV-002 URL migration; the URL is current pre-FR-GOV-002.
- §1 #14 + §11 distinguish "first 600 words no `<details>`" from "after, `<details>` welcome."
- §3 Maintainer section framed as community-with-CyberSkill-as-one-maintainer; geography handled via the "non-Western co-maintainer being recruited" signal.

The post-revision FR runs ~860 lines, above the 700-line target — justified by the verbatim README body in §3 (~250 lines of ship-ready content) being the FR's primary load-bearing artefact. Every §1 MUST has a verifiable AC; every cross-FR coordination (BRAND-001/002/003/004, CORE-001/002/004, GOV-001/002 placeholder, DOCS-002 + LAUNCH-001 downstream) is explicit. The first-200-words triad (what / why now / how it differs from X) lands all three beats in the draft. **Score = 10/10.**

---

*End of FR-DOCS-001 audit.*
