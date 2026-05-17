---
fr_id: FR-I18N-001
audited: 2026-05-17
verdict: PASS (after revision)
score_pre_revision: 8/10
score_post_expansion: 9/10
score_post_revision: 10/10
issues_resolved: 6
template: dsaf-spec@1
---

## §1 — Verdict summary

The post-revision spec runs ~870 lines covering translations of DSAF-25 Core + landing page to Japanese, Spanish, German via 3 'good first issue' PRs with community-translator + native-speaker-reviewer workflow, terminology consistency table for DSAF-specific terms across 3 languages, hreflang reciprocity discipline for international SEO, file-naming convention with subdirectory routing (`dsaf.dev/<lang>/card.md`), cap-rule disclosure translated in each language per FR-CORE-004, DSAF preserved as proper noun while long name + component handles translated, no-machine-translation-only discipline, language-switcher UI on dsaf.dev landing, README cross-link, translator + reviewer recognition + MEMORY.md continuity per FR-GOV-001 patterns, future-FR coordination (FR-I18N-002 P5 expansion). It has 15 §1 normative clauses, 17 acceptance criteria, 12 failure-mode rows, 7 open questions resolved, 8 implementation notes. Length is above the 700-line target — justified by §3's verbatim translation guidelines + issue template + per-language translated card + landing templates + terminology consistency table (~340 lines of operator-actionable + translator-facing content). All 6 findings resolved. **Score = 10/10.**

## §2 — Findings (all resolved)

### ISS-001 — Translator dropout mid-translation handling
Pre-revision §10 failure-mode row "Translation fails native-speaker reviewer's quality bar" addressed iteration; pre-revision §9 Q7 addressed dropout. But the operational handoff if a translator commits + then disengages wasn't fully enumerated. **Resolved:** §9 Q7 + §10 row "No translator volunteers for a language within 6 weeks" + §11 implementation note explicit — reassign via the 'good first issue' issue thread; relationship preserved per FR-GOV-001 §3 decline-handling patterns; if recruit insufficient, revisit at FR-I18N-002 P5. The dropout case is acceptable; the framework's response is graceful. Pattern: §3.4 rule 12 (operational handoff for community-driven contributions).

### ISS-002 — Terminology table extension when new criterion is added (FR-CORE-003 dedup + future RFCs)
Pre-revision §3 terminology consistency table listed ~13 terms. Future criteria additions (FR-CORE-003 dedup, future RFCs per FR-GOV-003 P6) introduce new terms. How does the table extend? **Resolved:** §10 failure-mode row "Future-FR (FR-I18N-002 P5) requires terminology re-table" + §3 translation-guidelines.md explicit — the terminology table is versioned; if a term is missing, the translator proposes via PR; the native-speaker reviewer signs off; the table is updated in the merge commit. Future-FR + FR-CORE-003 coordinate version updates. Pattern: §3.10 rule 28 (versioning for evolving doctrine).

### ISS-003 — Subdirectory vs subdomain routing implementation
Pre-revision §9 Q6 said subdirectory chosen (simpler routing); §3 file paths use `dsaf.dev/<lang>/`. But Cloudflare Pages's specific routing for subdirectories isn't enumerated; an operator new to Pages may need clarification. **Resolved:** §11 implementation note + §3 file-naming convention explicit — Cloudflare Pages supports subdirectory routing via folder structure (place files at `dsaf.dev/ja/card.md` etc.); the SSG handles markdown-to-HTML rendering + URL routing. The simpler approach is acceptable for P2; complex routing (locale-detection middleware) is FR-I18N-002 P5 scope. Pattern: §3.5 rule 15 (host-platform routing implementation explicit).

### ISS-004 — Native-speaker reviewer recruitment difficulty
Pre-revision §11 mentioned native-speaker reviewer recruitment as a key step. But for some languages (e.g., Japanese), finding a native-speaker reviewer with DS-terminology fluency may be harder than the translator recruitment. **Resolved:** §11 implementation note "Native-speaker reviewer recruitment is the second key step" explicit — translators can suggest reviewers; maintainers may have own contacts; for specific languages, mentions notable figures (Naoki Sasaki for Japanese DS community; Latin American DS community for Spanish; IDS + Sil Bormüller's network for German). The recruitment is operator-discretion + relationship-driven. Pattern: §3.3 rule 9 (named-target shortlist for recruitment continuity).

### ISS-005 — Cap-rule disclosure idiomatic translation challenges
Pre-revision §1 #11 + §3 terminology table addressed translation of "L3 cap rule" + "no-silent-regression" + "self-audit." But these are conceptually complex policy phrases; some languages may not have idiomatic equivalents. **Resolved:** §11 implementation note "About the cap-rule disclosure translation" explicit — the FR-CORE-004 cap rule is conceptually complex; if a language doesn't have idiomatic equivalents, the reviewer + maintainer decide on the closest natural phrasing + update the terminology consistency table. The policy substance is preserved; the surface phrasing is operator-discretion within the consistency table. Pattern: §3.6 rule 18 (cap-rule translation policy with operator-discretion).

### ISS-006 — Future FR-I18N-002 P5 scope clarity
Pre-revision §1 #7 + §9 Q2 + §11 mentioned FR-I18N-002 P5 as scope for full 125 + deep-dives + FR/PT. But the boundary between FR-I18N-001's "lite" scope vs FR-I18N-002's "expansion" scope wasn't enumerated clearly. **Resolved:** §1 #7 + §3 translation-guidelines.md §"Scope" section + §11 implementation note "About future-FR FR-I18N-002 (P5)" all explicit — FR-I18N-001 = DSAF-25 Core (25 criteria) + landing in JP/ES/DE; FR-I18N-002 = expansion to FR/PT + full 125 criteria + weekly deep-dive translation cadence + audit-report template + (future) per-language full README. The boundary is clear; the infrastructure (subdirectory, hreflang, language-switcher, terminology consistency table) carries forward. Pattern: §3.2 rule 7 (scope-boundary explicit across coordinated FRs).

## §3 — Resolution

All 6 mechanical concerns addressed:

- §9 Q7 + §10 + §11 explicit on translator dropout handling.
- §10 + §3 explicit on terminology table extension + versioning for evolving criteria.
- §11 + §3 explicit on Cloudflare Pages subdirectory routing implementation.
- §11 + §3 explicit on native-speaker reviewer recruitment paths (named DS-community contacts per language).
- §11 + §3 explicit on cap-rule disclosure idiomatic-translation operator-discretion.
- §1 #7 + §3 + §11 explicit on FR-I18N-001 lite vs FR-I18N-002 P5 expansion scope boundary.

The post-revision FR runs ~870 lines, above the 700-line target — justified by §3's verbatim translation guidelines + issue template + per-language translated card + landing templates + terminology consistency table (~340 lines of operator-actionable + translator-facing content). Every §1 MUST has a verifiable AC (scripted or human-checked); every cross-FR coordination (CORE-001 + DOCS-001 upstream content, BRAND-001 dsaf.dev hosting, BRAND-002 handle taxonomy with proper-noun-preservation, CORE-004 cap rule, GOV-001/GOV-002 relationship continuity, CONTENT-002 announcement cross-publishing, I18N-002 P5 expansion downstream) is explicit. The 6h founder-time + 3-5h per community-translator + 2-4 weeks per language elapsed + 'good first issue' recruitment + native-speaker review + hreflang reciprocity + terminology consistency table form the operational gates that establish multi-language audience expansion as the first community-contribution surface + the international SEO signal. **Score = 10/10.**

---

*End of FR-I18N-001 audit.*
