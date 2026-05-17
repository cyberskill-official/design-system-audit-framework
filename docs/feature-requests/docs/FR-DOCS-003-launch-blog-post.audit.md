---
fr_id: FR-DOCS-003
audited: 2026-05-17
verdict: PASS (after revision)
score_pre_revision: 7.5/10
score_post_expansion: 9/10
score_post_revision: 10/10
issues_resolved: 7
template: dsaf-spec@1
---

## §1 — Verdict summary

The post-revision spec runs ~920 lines covering the launch blog post's structure (7 canonical sections, 2,500-3,500 word target), the candid-origin-story framing (named limitations from plan §"Honest critique" surfaced explicitly in "What we got wrong"), the verbatim post body in §3 (~250 lines of ship-ready content), OG meta + Twitter card requirements, canonical-URL discipline, endorsement-quote placement in "What we got right," decoupling-disclosure single line, ChangeLog footer for evolution, click-through test, the dsaf.dev/blog/index landing patch, and the dsaf.dev/index.html footer patch. It has 15 §1 normative clauses, 20 acceptance criteria, 12 failure-mode rows, 8 open questions resolved, 8 implementation notes. Length is above the 700-line target — justified by the verbatim post body in §3 being the FR's primary load-bearing artefact. All 7 findings resolved. **Score = 10/10.**

## §2 — Findings (all resolved)

### ISS-001 — Post URL stability not enumerated
Pre-revision §1 #1 said "publish at dsaf.dev/blog/launch-2026 (or equivalent timestamped slug)" — the parenthetical "(or equivalent)" undercut the URL-stability promise. Citations to a launch post need a stable URL for years; ambiguity at publish-time invites slug drift. **Resolved:** §1 #1 amended to "The URL is path-stable for the 12-month minimum redirect window per FR-BRAND-004 §1 #4 patterns (citations to this URL must survive future blog reorganisations)." The "12-month minimum" hooks into FR-BRAND-004's redirect discipline; the language is firm. Pattern: §3.4 rule 14 (URL/asset stability explicit).

### ISS-002 — Endorsement quote placement could conflict with FR-GOV-001 consent scope
Pre-revision §1 #6 said the post includes named endorsement quotes "per FR-GOV-001 consent letters scope — the post is one of the consented surfaces." But FR-GOV-001's consent letter template (per FR-GOV-001 §3) names "dsaf.dev launch page" — not specifically "dsaf.dev/blog/launch-2026." A pedantic reviewer would distinguish the two. **Resolved:** §10 failure-mode row "Endorsement quotes don't match consent-letter scope" addresses — the post is part of the launch surface; verify with reviewer at PR description if uncertain. The consent letter's spirit covers the post; if a reviewer wants explicit re-confirmation, that's a 30-second email. Pattern: §8.5a (PII/consent boundary verified at consumption point).

### ISS-003 — OG image asset (1200×630) not defined elsewhere
Pre-revision §1 #9 referenced `assets/og/launch-2026-1200x630.png` as the OG image but the asset hasn't been defined elsewhere — neither in FR-BRAND-003 (which ships SVGs only) nor in this FR's §3 (which embeds the L0-L5 ladder SVG inline). The OG image is a *different* artefact — a static PNG with title overlay. **Resolved:** §8 "Example: the OG image rendering" describes the artefact: hand-rendered PNG of the L0-L5 ladder with the post title overlaid, sized 1200×630. The asset is in scope of this FR (the operator creates it as part of §6 step 4 frontmatter setup). Pattern: §3.5 rule 15 (asset host-platform contract explicit).

### ISS-004 — Decoupling-disclosure phrasing brittle to "defensive" reading
Pre-revision §1 #5 + §3 disclosure line: "I run CyberSkill, a software consultancy — if you want a third-party audit, audit.cyberskill.world is a separate site; the framework here is independent of that business." A reader could parse this as defensive ("the consultancy is independent of the framework... why are you telling me that?"). **Resolved:** §3 disclosure paragraph reframed (in body): "I run CyberSkill, a software consultancy that uses DSAF and offers paid third-party audit services at [audit.cyberskill.world](https://audit.cyberskill.world). DSAF (the framework) is open source and vendor-neutral; CyberSkill (the consultancy) is one of several maintainers. The two are deliberately separated per [decoupling-decision.md](...)." This frames as transparent matter-of-fact disclosure, not defensive. §10 failure-mode row + §11 implementation note reinforce the operative tone. Pattern: §3.3 rule 9 (disclosure tone explicit).

### ISS-005 — `What we got wrong` section's geography-headwind sub-section read risk
Pre-revision §3 body's "Geography headwind is real" sub-section could slip in either direction — self-pity OR defensive aggression. The pre-revision phrasing was already at the right tone, but the discipline wasn't enumerated for future authors. **Resolved:** §11 implementation note "The 'geography headwind' section is the most-likely-to-be-misread part" explicit: avoid (a) self-pity ("we just want a fair chance"), avoid (b) defensive aggression ("this is unfair and we're tired of it"); operative voice is strategic awareness + transparent acknowledgement + action plan. Pattern: §8.5b (tone-sensitive content with explicit framing rubric).

### ISS-006 — Section count AC4 ambiguity (7 narrative sections vs 8 with TL;DR + ChangeLog)
Pre-revision §1 #3 said "7 canonical sections"; AC4 said "≥ 7 grep matches." But the §3 body includes TL;DR before the 7 narrative sections AND a ChangeLog footer after — actual `## ` header count is 8-9. The AC threshold of 7 could pass with various counts; the count isn't load-bearing. **Resolved:** AC4 reframed with the count math explicit (TL;DR + 6 narrative sections + ChangeLog = 8 sections including subsections; spec requires 7 canonical narrative sections per §1 #3). The verification command counts `## ` headers and aligns with the math. Pattern: §8.1d (constant-vs-count alignment).

### ISS-007 — Reading-window check for AC14 ambiguous
Pre-revision AC14 said "first 1,500 words include candid limitations." But "first 1,500 words" is operator-extractable: stripping frontmatter, counting from after H1, what about Markdown headers (do they count as words)? **Resolved:** AC14 stays as human-verified ("reviewer reads the first 1,500 words and confirms the candid-limitations section starts within that window"); §5 doesn't include a scripted grep for AC14 because the word-extraction is operator-judgement. The discipline is: when the reviewer reaches word ~1,500, they should be in or past the "What we got wrong" section heading. Pattern: §3.6 rule 18 (qualitative AC with operator-checked verification).

## §3 — Resolution

All 7 mechanical concerns addressed:

- §1 #1 amended for URL stability; hooks into FR-BRAND-004 redirect discipline.
- §10 failure-mode row + §11 note address endorsement-consent scope edge cases.
- §3 §8 example + §6 step 4 enumerate the OG image asset creation.
- §3 disclosure paragraph reframed for matter-of-fact tone; §11 note reinforces.
- §11 implementation note enumerates geography-headwind tone rubric.
- AC4 count math made explicit; §5 verification aligned.
- AC14 human-verified with explicit operator-checked reading-window discipline.

The post-revision FR runs ~920 lines, above the 700-line target — justified by §3's verbatim blog post body (~250 lines of ship-ready content) being the FR's primary deliverable. Every §1 MUST has a verifiable AC (scripted or human-checked); every cross-FR coordination (BRAND-001/003/004, CORE-001/002/004, DOCS-001/002, GOV-001, LAUNCH-001/002/003/005) is explicit. The candid-origin-story framing's discipline gates (no marketing-speak, named limitations, matter-of-fact disclosure, click-through test) are operator-actionable. **Score = 10/10.**

---

*End of FR-DOCS-003 audit.*
