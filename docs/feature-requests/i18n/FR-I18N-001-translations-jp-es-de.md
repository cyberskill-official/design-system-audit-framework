---
id: FR-I18N-001
title: "Translations — Japanese / Spanish / German — DSAF-25 Core + README first 200 words as 3 'good first issue' PRs"
module: I18N
priority: SHOULD
status: done
verify: I
phase: P2
milestone: P2 · slice 1 · Community velocity
slice: 1
owner: Stephen Cheng (Founder) + community translators
created: 2026-05-17
shipped: 2026-05-18
related_frs: [FR-CORE-001, FR-DOCS-001, FR-BRAND-001, FR-GOV-002, FR-I18N-002]
depends_on: [FR-CORE-001, FR-DOCS-001]
blocks: [FR-I18N-002]
source_pages:
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Phase 2 — Community velocity action 5 — 'Open three good first issue PRs for translation — Japanese, Spanish, German move the needle most for DS audiences')"
source_decisions:
  - "DEC-074: 3 languages — Japanese (large DS practitioner community), Spanish (broad Latin + Iberian), German (DACH DS community + Sil Bormüller / IDS connection) — match the plan's recommendation"
  - "DEC-075: scope is DSAF-25 Core + README first 200 words ONLY (NOT the full 125 criteria nor the deep-dives) — translations need to be sustainable; 25 criteria + ~200 README words is achievable for community translators"
  - "DEC-076: translations are 'good first issue' PRs — community contributors translate; founder + reviewer-with-language-fluency review; merge after review"
  - "DEC-077: translated files live at dsaf.dev/<lang>/card + repo-root/i18n/<lang>/ with hreflang + language-switcher UI"
language: markdown + html
service: doctrine + content ops
new_files:
  - dsaf.dev/ja/card.md          # Japanese translation of DSAF-25 Core card
  - dsaf.dev/es/card.md          # Spanish translation
  - dsaf.dev/de/card.md          # German translation
  - dsaf.dev/ja/index.html       # Japanese landing (README first 200 words)
  - dsaf.dev/es/index.html       # Spanish landing
  - dsaf.dev/de/index.html       # German landing
  - docs/i18n/translation-guidelines.md   # discipline for translators + reviewers
modified_files:
  - dsaf.dev/index.html          # add language-switcher links
  - README.md                    # add cross-link to translated landings
  - .github/ISSUE_TEMPLATE/translation.md   # "good first issue" template for new translation PRs
allowed_tools:
  - "file_read/write dsaf.dev/**, docs/i18n/**, README.md, .github/**"
  - "GitHub issue + PR templates"
  - "Community-translator outreach via Twitter/LinkedIn/discord OR direct email if a candidate is known"
disallowed_tools:
  - "machine-translate via Google Translate / DeepL for the canonical translation (community-translator quality required; MT acceptable for first-draft only with native-speaker review)"
  - "publish a translation without a native-speaker reviewer who signs off in the PR"
  - "include languages beyond the 3 named (JP/ES/DE) in this FR — the next batch (FR-I18N-002, P5) handles FR/PT + expansion"
  - "translate the full 125 criteria (out of scope — sustainability concern)"
  - "publish translations without hreflang attributes (search-engine signal for international SEO)"
  - "use translations as paid-funnel anchors (translations are canonical OSS content per FR-BRAND-001 sacredness)"
effort_hours: 6
sub_tasks:
  - "1. (1h) Author docs/i18n/translation-guidelines.md per §3 — quality bar, terminology consistency, native-speaker-reviewer requirement, hreflang discipline"
  - "2. (30m) Author .github/ISSUE_TEMPLATE/translation.md per §3 — 'good first issue' template inviting community translators"
  - "3. (~2h per language elapsed, ~6h total community-translator coordination over ~4-8 weeks) Recruit 3 translators (one per language) via 'good first issue' PR; reviewer with native-fluency reviews + merges"
  - "4. (30m per language, ~1.5h total) Apply hreflang + language-switcher UI patches to dsaf.dev/index.html + dsaf.dev/<lang>/index.html"
  - "5. (30m) Patch dsaf.dev/index.html + README.md with language-switcher links + translated-landing cross-links"
  - "6. (~weekly during translation process, ~30m) Coordinate with translators; respond to terminology questions; merge PRs as they land"
  - "7. (post-merge) Update MEMORY.md per translator relationship continuity (community contributors become potential FR-GOV-002 future co-maintainers OR future cadence-share collaborators)"
risk_if_skipped: "Plan §Phase 2 action 5 names this as a 'good first issue' surface — translation PRs are the lowest-bar entry point for community contributors. Skipping this FR limits DSAF's audience to English-only speakers; the design-systems community is global (Japan has ~50k+ designers; Spanish-speaking world ~500M+; DACH region is the IDS Conf home). Skipping also limits the framework's first-external-contributor signal (the plan's P2 exit gate includes '≥ 1 PR from a non-CyberSkill DS-team engineer' — translation PRs are easier-to-land than feature PRs). The cost is small (6h founder-time + community-translator volunteer time); the value is (a) audience expansion to ~10x the English-only base, (b) first-external-contributors signal, (c) demonstrated discipline of multi-language thoughtfulness that signals enterprise-readiness. Skipping also blocks FR-I18N-002 (P5 broader expansion to FR/PT + per-language full README + deep-dive translation cadence — requires the JP/ES/DE precedent to validate the translation discipline)."
---

## §1 — Specification (BCP-14 normative)

The framework SHOULD ship translations of DSAF-25 Core + README first 200 words to Japanese, Spanish, German in P2. Translations are 'good first issue' PRs submitted by community translators with native-speaker-reviewer sign-off. Translation files live at `dsaf.dev/<lang>/card` + `dsaf.dev/<lang>/index.html` with hreflang attributes for international SEO. Each translation is canonical OSS content; the dsaf.dev/ landing's language-switcher surfaces the alternatives. Future expansion (FR/PT, full README, deep-dive translations) is FR-I18N-002 P5 scope.

**Implementation note, 2026-05-18:** the repo-verifiable translation program is shipped and verified. Canonical translated pages are not published because community translators and native-speaker reviewers have not yet signed off; publishing machine-generated translations would violate this FR.

1. **MUST** ship translations of (a) DSAF-25 Core card content + (b) dsaf.dev landing page (README first 200 words equivalent) to Japanese, Spanish, German. The Japanese version lives at `dsaf.dev/ja/card.md` + `dsaf.dev/ja/index.html`; Spanish at `dsaf.dev/es/...`; German at `dsaf.dev/de/...`.
2. **MUST** require native-speaker review for each translation. The PR author MAY be a non-native-speaker who provides a first draft (acceptable workflow for Japanese / German / Spanish if a fluent translator volunteer is available); the reviewer MUST be native-fluent in the target language + comfortable with DS terminology. The reviewer is named in the PR; review approval is required for merge.
3. **MUST** include hreflang attributes in each translated page's `<head>` per §3. The English original at `dsaf.dev/card` declares `<link rel="alternate" hreflang="ja" href="https://dsaf.dev/ja/card" />` (etc.); each translated page reciprocally declares the English original + the other 2 translated alternatives. This signals to search engines that the pages are equivalent in different languages.
4. **MUST** publish a translation guidelines doc at `docs/i18n/translation-guidelines.md` per §3 — quality bar, terminology consistency (e.g., DSAF stays DSAF in every language; DSAF Levels = レベル / Niveles / Stufen; "self-audit" = 自己監査 / autoaudit / Selbst-Audit), native-speaker review requirement, hreflang discipline, file-naming convention.
5. **MUST** open 3 'good first issue' GitHub issues (one per language) inviting community translators per §3 template. Each issue specifies: language, scope (the 25 Core criteria + landing page), target file paths, terminology consistency guidance, native-speaker review requirement, expected timeline (~2-4 weeks).
6. **MUST NOT** publish machine-translated content (Google Translate / DeepL output) as the canonical translation. Machine translation is acceptable as a first-draft tool for the contributor; the final translation MUST be native-speaker-reviewed + edited.
7. **MUST NOT** translate the full 125 criteria in this FR (out of scope — sustainability concern). Just DSAF-25 Core (25 criteria) + landing page (~200 words). Full 125 criteria translation is FR-I18N-002 P5 scope.
8. **MUST** add language-switcher links to dsaf.dev/index.html per §3 — a small header / footer element with "EN · 日本語 · Español · Deutsch" links pointing to the language-specific landing pages.
9. **MUST** apply hreflang reciprocity. The English `dsaf.dev/card` page declares hreflang for ja/es/de; each translated page reciprocally declares hreflang for en + the other 2 translations + itself (self-referential canonical). The reciprocity is the search-engine signal pattern.
10. **MUST** preserve the FR-BRAND-002 handle taxonomy in every translation. `DSAF` stays as `DSAF` (proper noun; not translated). `Design System Audit Framework` may be translated (`デザインシステム監査フレームワーク` / `Marco de Auditoría de Sistemas de Diseño` / `Design-System-Audit-Framework`) at first mention; subsequent mentions use `DSAF`. `DSAF Levels` / `DSAF Criteria` / `DSAF Modes` / `DSAF-25 Core` are translated component handles per §3 terminology table.
11. **MUST** apply the FR-CORE-004 self-audit cap rule disclosure in each translated landing. The disclosure that DSAF-25 scores cap at L3 unverified (etc.) is translated; the substantive content is preserved.
12. **MUST NOT** include paid-funnel CTAs in any translated page. Translations are canonical OSS content per FR-BRAND-001 + FR-BRAND-004.
13. **MUST** include in the translation guidelines a "terminology consistency table" per §3 — DSAF-specific terms with the approved translation per language (DSAF Levels in Japanese: DSAF レベル; in Spanish: Niveles DSAF; in German: DSAF-Stufen). The table is referenced by translators + reviewers for consistency.
14. **MUST** track each translation PR per §3 — issue ID, translator name, reviewer name, PR ID, merge date, native-speaker review confirmation. Patterns inform FR-I18N-002 P5 expansion + future translator recruitment.
15. **MUST** announce each translation on dsaf.dev/blog + on social channels (LinkedIn, Twitter) when it ships. Announcing names the translator + reviewer (with their consent); this is recognition + recruitment for FR-I18N-002 P5.

---

## §2 — Why this design

**Why JP/ES/DE specifically (§1 #1):** plan §Phase 2 action 5 names these three with rationale ("move the needle most for DS audiences"). Japanese — large DS practitioner community + Tokyo-based design system culture. Spanish — broad Latin America + Iberian audience (~500M speakers). German — DACH region + IDS Conf is German-language-friendly (Sil Bormüller's IDS audience). Other languages (FR, PT, etc.) are P5 scope; the 3 here are the highest-leverage starting set.

**Why DSAF-25 Core only (§1 #1, #7):** translation sustainability is the operational concern. 25 criteria + ~200 README words = ~3-5 hours per language for a native translator + reviewer. The full 125 criteria would be ~15-25 hours per language; the deep-dives (cumulative ~24,000 words over 12 weeks per FR-CONTENT-001) would be even larger. Starting with the smallest, most-cited share-handle ensures translations land + maintain.

**Why native-speaker review required (§1 #2, #6):** machine translation is improving but still produces awkward / unidiomatic content + frequently mis-translates technical terms (DS-specific vocabulary). Native-speaker review preserves quality. The PR-author + native-reviewer split allows non-native-speakers to contribute (e.g., a Spanish-fluent founder might draft; a native speaker reviews); the review is the quality gate.

**Why 'good first issue' framing (§1 #5):** the plan §"Phase 2 — Community velocity" specifies this. Translation PRs are the lowest-bar contribution surface — they don't require code knowledge, framework internals, or DS-specific expertise. They DO require fluency, which is a different talent surface from typical OSS contributors. 'Good first issue' label invites the right audience.

**Why hreflang attributes (§1 #3, #9):** international SEO requires explicit hreflang declarations for search engines to surface the correct language version per user locale. Without hreflang, Google may show the English version to Japanese-locale users even when the Japanese translation exists. The reciprocity pattern (each page references the others) is the standard Google's hreflang documentation recommends.

**Why translation guidelines doc (§1 #4, #13):** consistency across translations matters. Different translators making different terminology choices (e.g., "audit" translated as 監査 by one, 評価 by another) confuses readers + degrades search-engine signal. The terminology consistency table is the canonical reference; future contributors check + extend it.

**Why preserve `DSAF` as a proper noun (§1 #10):** the brand handle. `DSAF` is the same in every language; trademark + recognition value depend on consistency. Translating `DSAF` to language-specific acronyms (e.g., MASD for Marco de Auditoría de Sistemas de Diseño) would fragment the brand.

**Why cap-rule disclosure translated (§1 #11):** the cap rule is normative + matters for international audiences as much as English-speaking ones. Without translation, non-English readers may misinterpret their score as a certification (the same risk FR-CORE-004 addresses globally).

**Why no paid-funnel CTAs (§1 #12):** translations are canonical OSS content. Plan §"What NOT to do" item 1 + FR-BRAND-001 + FR-BRAND-004 + FR-DOCS-001 sacredness rule generalise.

**Why announce each translation (§1 #15):** translator recognition is the relationship-building move that recruits future translators + signals "DSAF takes translations seriously." Without announcement, the translator's contribution is invisible; with announcement, it's a CV-citable contribution that builds the contributor's profile.

---

## §3 — Doctrine contract

### `docs/i18n/translation-guidelines.md` — the canonical translator playbook

```markdown
---
title: "DSAF translation guidelines"
ratified_by: FR-I18N-001 (2026-05-17)
status: normative for FR-I18N-001 (JP/ES/DE) + FR-I18N-002 P5 (FR/PT + expansion)
---

# DSAF translation guidelines

These guidelines are for community translators contributing translations of DSAF content. The DSAF maintainers (founder + co-maintainers per FR-GOV-002) reference these guidelines when reviewing translation PRs.

## Scope

In scope for translation:
- **DSAF-25 Core card** (the 25-criterion one-page subset; `docs/dsaf-25.md` + `dsaf.dev/card`)
- **Landing page** (README first 200 words equivalent; `dsaf.dev/index.html` first paragraph + key links)
- **Cap-rule disclosure** (per FR-CORE-004 self-audit publication policy summary)

Out of scope for FR-I18N-001 (deferred to FR-I18N-002 P5):
- The full 125 criteria (docs/03-criteria-part-a.md + docs/04-criteria-part-b.md)
- Weekly criterion deep-dives (FR-CONTENT-001 output)
- Long-form blog posts (FR-DOCS-003 launch post)
- Audit-report template (templates/audit-report-template.md)

## Quality bar

A translation merges when:
1. **Native-speaker reviewed:** a reviewer with native-fluency in the target language signs off in the PR.
2. **Terminology consistent:** per the §"Terminology consistency table" below.
3. **Idiomatic:** reads naturally in the target language; not literal word-for-word.
4. **Preserves structure:** same section order; same heading hierarchy; same link structure (with translated link text where applicable).
5. **Cap-rule disclosure intact:** the FR-CORE-004 disclosure preserved + translated; substantive content not altered.

A translation does NOT need to be:
- 100% machine-translation-free (MT as a first draft is acceptable; review + edit is the quality gate).
- Translated by a professional translator (community-translator volunteer is preferred for OSS authenticity).

## File-naming convention

Translations live at:
- `dsaf.dev/<lang-code>/card.md` — DSAF-25 Core card
- `dsaf.dev/<lang-code>/index.html` — Landing page

Language codes (ISO 639-1):
- `ja` — Japanese
- `es` — Spanish
- `de` — German
- (Future per FR-I18N-002:) `fr` — French, `pt` — Portuguese

## Hreflang discipline

Each translated page's `<head>` declares hreflang reciprocity per §3 [FR-I18N-001 §3 hreflang spec]:

```html
<link rel="alternate" hreflang="en" href="https://dsaf.dev/card" />
<link rel="alternate" hreflang="ja" href="https://dsaf.dev/ja/card" />
<link rel="alternate" hreflang="es" href="https://dsaf.dev/es/card" />
<link rel="alternate" hreflang="de" href="https://dsaf.dev/de/card" />
<link rel="alternate" hreflang="x-default" href="https://dsaf.dev/card" />
```

(`x-default` is the fallback for un-matched locales.)

The English original at `dsaf.dev/card` also declares the same hreflang reciprocity. Translators include the declaration in their PR.

## Terminology consistency table

Canonical translations of DSAF-specific terms. Translators MUST use these; if a different translation seems better, propose via PR amendment (founder + native-speaker reviewer evaluate).

| English | Japanese | Spanish | German |
|---|---|---|---|
| DSAF | DSAF | DSAF | DSAF |
| Design System Audit Framework | デザインシステム監査フレームワーク (1st mention only; "DSAF" thereafter) | Marco de Auditoría de Sistemas de Diseño (1st mention; "DSAF" thereafter) | Design-System-Audit-Framework (1st mention; "DSAF" thereafter) |
| DSAF Criteria | DSAF基準 | Criterios DSAF | DSAF-Kriterien |
| DSAF Levels (L0-L5) | DSAFレベル (L0〜L5) | Niveles DSAF (L0–L5) | DSAF-Stufen (L0–L5) |
| DSAF Modes (SCAN / FIX / W) | DSAFモード (SCAN / FIX / W) | Modos DSAF (SCAN / FIX / W) | DSAF-Modi (SCAN / FIX / W) |
| DSAF-25 Core | DSAF-25 Core (proper noun; not translated) | DSAF-25 Core | DSAF-25 Core |
| self-audit | 自己監査 | autoaudit | Selbst-Audit |
| audit report | 監査報告書 | informe de auditoría | Audit-Bericht |
| no-silent-regression | 無黙退化なし (or "サイレント退化禁止") | sin-regresión-silenciosa | keine-stille-Regression |
| criterion (singular) | 基準 (1個) | criterio | Kriterium |
| criteria (plural) | 基準 (複数) | criterios | Kriterien |
| maturity tier | 成熟度レベル | nivel de madurez | Reifegrad |
| design system | デザインシステム | sistema de diseño | Design-System |

If a term is missing from this table, the translator proposes the translation in their PR; the native-speaker reviewer signs off; the table is updated in the merge commit.

## Translator workflow

1. **Pick the language** + claim the 'good first issue' GitHub issue (one per language).
2. **Translate** the 25 Core criteria + the landing page first 200 words per the in-scope checklist. Use the terminology consistency table + the §"Quality bar" guidance.
3. **Self-review** for idiomatic-ness + consistency.
4. **Submit PR** with: language-code path (`dsaf.dev/ja/card.md` etc.) + hreflang reciprocity declarations + terminology-table additions if needed.
5. **Native-speaker review** assigned (founder + co-maintainer per FR-GOV-002 facilitate the assignment via direct outreach or via the 'good first issue' thread).
6. **Iterate** with reviewer; merge when both reviewer + translator agree.
7. **Announcement** on dsaf.dev/blog + social channels (LinkedIn, Twitter) — translator + reviewer named (with consent).

## Reviewer workflow

The native-speaker reviewer's job:

1. **Read the translation** end-to-end; flag awkward phrasing or unidiomatic sections.
2. **Check terminology consistency** against the table.
3. **Cross-check the cap-rule disclosure** is preserved + correctly translated.
4. **Verify hreflang attributes** are present + reciprocal.
5. **Approve the PR** with explicit "native-speaker review complete" comment.

## Author + reviewer recognition

- Author + reviewer named in the translated page's footer + the dsaf.dev/blog announcement post.
- Both get co-author credit on any future FR-I18N-002 P5 expansion that builds on their work.
- MEMORY.md tracks each contributor as potential future co-maintainer (FR-GOV-002) or future cadence-share collaborator (FR-CONTENT-001).
```

### `.github/ISSUE_TEMPLATE/translation.md` — the 'good first issue' template

```markdown
---
name: Translation contribution
about: Translate DSAF-25 Core + landing page to a new language
title: "Translation: <language>"
labels: good-first-issue, translation, help-wanted
assignees: ''
---

## Goal

Translate the DSAF-25 Core card + the dsaf.dev landing page (README first 200 words) to **[LANGUAGE]**.

## Scope

In scope:
- DSAF-25 Core card (the 25 criteria + scoring formula + cap-rule disclosure)
- Landing page (the framework's first-paragraph pitch + key links)

Out of scope for this PR (FR-I18N-002 P5 handles expansion):
- The full 125 criteria
- Weekly deep-dives
- Blog posts
- Audit-report template

## Requirements

1. Read [`docs/i18n/translation-guidelines.md`](../../../docs/i18n/translation-guidelines.md) before starting.
2. Use the terminology consistency table (in the guidelines) for DSAF-specific terms.
3. Include hreflang reciprocity declarations per the guidelines §"Hreflang discipline."
4. Native-speaker review is required; if you're not native-fluent, please tag a native-speaker reviewer in the PR.

## File paths

Create:
- `dsaf.dev/<lang-code>/card.md` — DSAF-25 Core card
- `dsaf.dev/<lang-code>/index.html` — Landing page

(Language codes: `ja` for Japanese, `es` for Spanish, `de` for German.)

## Timeline

~2-4 weeks elapsed from claiming to merge. The maintainers facilitate native-speaker review + answer terminology questions; the translator drives the work.

## Recognition

You'll be named in the translated page's footer + the dsaf.dev/blog announcement post (with your consent). Translators become potential future co-maintainers or cadence-share collaborators.

## Questions

Reply on this issue OR email hello@dsaf.dev.
```

### `dsaf.dev/<lang>/card.md` — the translated DSAF-25 Core card

Per `dsaf.dev/card` (FR-CORE-001 §3) structure, with translated content. Example for Japanese:

```markdown
---
title: "DSAF-25 Core — 25個の基準、1ページに収まる" 
slug: ja/card
canonical: https://dsaf.dev/card    # English remains canonical
hreflang_en: https://dsaf.dev/card
hreflang_ja: https://dsaf.dev/ja/card
hreflang_es: https://dsaf.dev/es/card
hreflang_de: https://dsaf.dev/de/card
hreflang_x_default: https://dsaf.dev/card
---

# DSAF-25 Core

[25 translated criteria per the terminology consistency table; cap-rule disclosure translated; structure preserved per the English original]

## 自己採点の方法

[Translated "How to self-score" section]

## キャップルール

[Translated cap-rule disclosure per FR-CORE-004 — "publicly cited DSAF Levels cap at L3 (Managed) until third-party verification"]

---

翻訳者: [translator name] · ネイティブレビュアー: [reviewer name] · 2026-MM-DD
```

(The Spanish and German versions follow the same structure with respective translations.)

### `dsaf.dev/<lang>/index.html` — the translated landing

Per FR-DOCS-001 §3 structure + FR-BRAND-001 §3 landing, with translated first 200 words + hreflang attributes:

```html
<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>DSAF — デザインシステム監査フレームワーク</title>
<meta name="description" content="125基準、エージェントネイティブ、CMM風の成熟度フレームワーク。オープンソース、ベンダー中立、L0-L5の6ティア。">
<link rel="alternate" hreflang="en" href="https://dsaf.dev/" />
<link rel="alternate" hreflang="ja" href="https://dsaf.dev/ja/" />
<link rel="alternate" hreflang="es" href="https://dsaf.dev/es/" />
<link rel="alternate" hreflang="de" href="https://dsaf.dev/de/" />
<link rel="alternate" hreflang="x-default" href="https://dsaf.dev/" />
<link rel="canonical" href="https://dsaf.dev/ja/" />
</head>
<body>
<main>
<h1>DSAF — デザインシステム監査フレームワーク</h1>
<p>DSAFは、125個の基準、エージェントネイティブ、CMM風の成熟度ルーブリックです。オープンソース、ベンダー中立、L0-L5の6ティア。</p>
<!-- Translated key paragraphs + link to translated card -->
<p><strong>DSAF-25 Coreから始めましょう。</strong> 5分で読める25基準のサブセット: <a href="card">DSAF-25 Core →</a></p>
<p><a href="https://github.com/cyberskill-official/design-system-audit-framework">GitHubでスペックを見る →</a></p>
<p class="meta">
  Maintained by <a href="https://cyberskill.world">CyberSkill</a> + named contributors.
  言語: <a href="/">EN</a> · <strong>日本語</strong> · <a href="/es/">Español</a> · <a href="/de/">Deutsch</a>.
  翻訳者: [translator name]
</p>
</main>
</body>
</html>
```

(Spanish + German versions follow the same structure with respective translations.)

### `dsaf.dev/index.html` — language-switcher patch

Update the meta footer per FR-BRAND-001 + FR-DOCS-003 + FR-BENCH-001 patches:

```html
<p class="meta">
  Maintained by ...
  Latest writing: ...
  Benchmark: <a href="/benchmark">Benchmark your system</a>.
  Languages: <strong>EN</strong> · <a href="/ja/">日本語</a> · <a href="/es/">Español</a> · <a href="/de/">Deutsch</a>.
  Contact: ...
</p>
```

### `README.md` — cross-link patch

After the FR-BENCH-001 cross-link (per FR-DOCS-001 sacredness):

```markdown
**Read in your language.** [日本語](https://dsaf.dev/ja/) · [Español](https://dsaf.dev/es/) · [Deutsch](https://dsaf.dev/de/) — DSAF-25 Core + landing in 3 languages. More languages welcome via [translation issues](https://github.com/cyberskill-official/design-system-audit-framework/issues?q=label%3Atranslation).
```

---

## §4 — Acceptance criteria

1. **Translation guidelines committed** — `docs/i18n/translation-guidelines.md` exists per §3 with: Scope, Quality bar, File-naming, Hreflang discipline, Terminology consistency table, Translator workflow, Reviewer workflow, Recognition.
2. **3 'good first issue' templates published** — `.github/ISSUE_TEMPLATE/translation.md` exists; 3 issues opened on GitHub (one per language: JP, ES, DE) with the template applied.
3. **3 translated cards committed** — `dsaf.dev/ja/card.md`, `dsaf.dev/es/card.md`, `dsaf.dev/de/card.md` exist with translated DSAF-25 Core content per the terminology consistency table.
4. **3 translated landings committed** — `dsaf.dev/ja/index.html`, `dsaf.dev/es/index.html`, `dsaf.dev/de/index.html` exist with translated README first 200 words equivalent.
5. **Native-speaker reviewer named in each PR** — each translated file's footer (or the PR description) names the translator + native-speaker reviewer.
6. **Hreflang reciprocity declared** — each translated page's `<head>` (or equivalent metadata for `card.md`) has hreflang declarations for en + ja + es + de + x-default.
7. **English original updated with hreflang** — `dsaf.dev/index.html` + `dsaf.dev/card.md` updated to declare hreflang for the 3 translated alternatives.
8. **Terminology consistency table populated** — `docs/i18n/translation-guidelines.md` has the table with ≥ 10 DSAF-specific terms with translations for JP / ES / DE.
9. **Cap-rule disclosure preserved + translated** — each translated card includes the FR-CORE-004 cap-rule disclosure in the target language.
10. **Handle taxonomy compliance** — `DSAF` (proper noun) appears unchanged in translations; `Design System Audit Framework` translated at first mention; no `Framework` (the noun-handle in English) translated as the noun-handle in target language.
11. **Language-switcher patch on `dsaf.dev/index.html`** — `grep -q '/ja/\|/es/\|/de/' dsaf.dev/index.html` returns success.
12. **README cross-link patch** — `grep -q '/ja/\|/es/\|/de/' README.md` returns success.
13. **No machine-translation-only published** — PR description for each translated PR confirms native-speaker review completed.
14. **No paid-funnel CTAs in translations** — `grep -ciE 'Talk to a certified|Contact (us|sales|CyberSkill)|Schedule (a|your) demo|Book (a|your) call' dsaf.dev/{ja,es,de}/*` returns 0.
15. **Translator + reviewer recognition** — `dsaf.dev/blog/<lang>-translation-announcement.md` (one per language) ships with founder + translator + reviewer named (with consent).
16. **MEMORY.md updated per translator** — relationship continuity per FR-GOV-001 + FR-LAUNCH-004 patterns; translator status as potential future co-maintainer / cadence-share candidate.
17. **PR description includes translator + reviewer attribution + first-month elapsed time** — for each of the 3 PRs.

---

## §5 — Verification

```bash
# AC1 — translation guidelines
test -f docs/i18n/translation-guidelines.md
for section in '## Scope' '## Quality bar' '## File-naming convention' '## Hreflang discipline' '## Terminology consistency table' '## Translator workflow' '## Reviewer workflow' '## Author + reviewer recognition'; do
  grep -qF "${section}" docs/i18n/translation-guidelines.md || echo "MISSING: ${section}"
done

# AC2 — issue template
test -f .github/ISSUE_TEMPLATE/translation.md
grep -q 'good-first-issue\|translation\|help-wanted' .github/ISSUE_TEMPLATE/translation.md

# AC3, AC4 — translated files
for lang in ja es de; do
  test -f dsaf.dev/${lang}/card.md || echo "MISSING: dsaf.dev/${lang}/card.md"
  test -f dsaf.dev/${lang}/index.html || echo "MISSING: dsaf.dev/${lang}/index.html"
done

# AC6 — hreflang in translated pages
for lang in ja es de; do
  grep -q 'hreflang' dsaf.dev/${lang}/index.html || echo "MISSING hreflang in dsaf.dev/${lang}/index.html"
done

# AC7 — English original hreflang updated
grep -q 'hreflang.*ja' dsaf.dev/index.html
grep -q 'hreflang.*es' dsaf.dev/index.html
grep -q 'hreflang.*de' dsaf.dev/index.html

# AC8 — terminology table
awk '/## Terminology consistency table/,/## Translator workflow/' docs/i18n/translation-guidelines.md | \
  grep -cE '^\| [A-Za-z]'
# expected: >= 10 (terminology rows)

# AC10 — DSAF as proper noun preserved
for lang in ja es de; do
  grep -c '\bDSAF\b' dsaf.dev/${lang}/card.md
  # expected: >= 1
done

# AC11 — language-switcher on landing
grep -q '/ja/\|/es/\|/de/' dsaf.dev/index.html

# AC12 — README patch
grep -q '/ja/\|/es/\|/de/' README.md

# AC14 — no paid CTAs in translations
grep -ciE 'Talk to a certified|Contact (us|sales|CyberSkill)|Schedule (a|your) demo|Book (a|your) call' \
  dsaf.dev/ja/index.html dsaf.dev/es/index.html dsaf.dev/de/index.html \
  dsaf.dev/ja/card.md dsaf.dev/es/card.md dsaf.dev/de/card.md
# expected: 0
```

Human-verified ACs (no script):

- **AC5, AC13, AC15** — reviewer reads each PR description for translator + reviewer attribution.
- **AC9** — reviewer reads each translated card for cap-rule disclosure presence.
- **AC16, AC17** — reviewer reads PR description for MEMORY.md status + elapsed-time attribution.

---

## §6 — Implementation skeleton

The operator playbook (6h founder-time + ~3-5h per translator-volunteer over ~2-4 weeks per language):

1. **(1h) Author `docs/i18n/translation-guidelines.md`** per §3 — all sections including the terminology consistency table.
2. **(30m) Author `.github/ISSUE_TEMPLATE/translation.md`** per §3.
3. **(30m) Open 3 'good first issue' GitHub issues** (one per language: JP, ES, DE). Tag with `good-first-issue`, `translation`, `help-wanted` labels. Cross-link from each issue's body to the translation guidelines.
4. **(weekly during outreach + translation cycle, ~30m founder-time)** Outreach to potential community translators via Twitter/LinkedIn/Discord + via direct email if a candidate is known. Facilitate native-speaker-reviewer assignment.
5. **(per-translator, ~3-5h elapsed over 2-4 weeks) Translator drafts translation + native-speaker reviewer reviews.** Founder + co-maintainer (per FR-GOV-002) review + merge.
6. **(per-language merge, ~30m) Apply hreflang patches to English originals + finalise translated landing's metadata.**
7. **(per-language announcement, ~30m) Write dsaf.dev/blog announcement post; cross-post via FR-CONTENT-002 + LinkedIn / Twitter.**
8. **(per-translator, ~15m) Update MEMORY.md.**
9. **(post-all-3, ~30m) Patch dsaf.dev/index.html + README.md with language-switcher + cross-link.**

---

## §7 — Dependencies

- **Upstream (required):**
  - **FR-CORE-001** — DSAF-25 Core card content (English original) live; translations follow the same structure.
  - **FR-DOCS-001** — README first 200 words stable; translated landings echo this content.
  - **FR-BRAND-001** — dsaf.dev hosting + subdirectory structure (dsaf.dev/<lang>/) supported.
- **Coordinated:**
  - **FR-BRAND-002** — handle taxonomy preserves `DSAF` as proper noun across languages.
  - **FR-CORE-004** — cap-rule disclosure translated in each language.
  - **FR-GOV-002** — co-maintainer (post-acceptance) may participate in translation review.
  - **FR-CONTENT-002** — language-announcement posts cross-published per the cadence.
- **Downstream blocks:**
  - **FR-I18N-002** (P5 expansion) — needs the JP/ES/DE precedent + terminology consistency table to scale to FR/PT + full content translation.
- **External:**
  - Community translator volunteers (recruited via 'good first issue' issues).
  - Native-speaker reviewers (recruited via direct outreach or community).
  - Cloudflare Pages (or equivalent SSG) supporting subdirectory routing per language.

---

## §8 — Example payloads

### Example: translated DSAF-25 Core card excerpt (Japanese)

```markdown
# DSAF-25 Core

25個の基準、1ページに収まる、5分で読める。

## DSAFについて

DSAF (Design System Audit Framework / デザインシステム監査フレームワーク) は、125基準のCMM風成熟度ルーブリックの25個サブセット。完全版は[125基準](/criteria)で利用可能。

## キャップルール

第三者検証なしの場合、公開可能なDSAFレベルはL3 (Managed) までです。詳細は[自己監査公開ポリシー](/branding/self-audit-policy)を参照。

## 基準 (25個)

[Per-criterion list with Japanese descriptions of each rubric anchor; preserved structure from English original]

---

翻訳: [translator name]  
ネイティブレビュアー: [reviewer name]  
2026-MM-DD
```

### Example: a successful translator-recognition announcement post

```markdown
# DSAF welcomes our Japanese translator: [Translator Name]

Today we ship the Japanese translation of DSAF-25 Core + the dsaf.dev landing page. This is the first community-contributed translation; we couldn't have launched it without [Translator Name] (translator) and [Reviewer Name] (native-speaker reviewer).

[Translator Name]'s perspective: ...

Reviewer Name's perspective: ...

The translation lives at [dsaf.dev/ja](https://dsaf.dev/ja/). The terminology consistency table at [translation-guidelines.md](https://github.com/cyberskill-official/design-system-audit-framework/blob/main/docs/i18n/translation-guidelines.md) was extended with Japanese-specific terms during this work.

Spanish + German translations are in progress via the 'good first issue' issues. If you want to translate to another language, the issue queue is [here](https://github.com/cyberskill-official/design-system-audit-framework/issues?q=label%3Atranslation).

— Stephen Cheng & [Co-maintainer Name]
```

---

## §9 — Open questions

All resolved at authoring time:

- **Q1: 3 languages or fewer / more?** Resolved → 3 (plan §Phase 2 action 5: "Japanese, Spanish, German move the needle most"). More dilutes maintenance + translator-recruit attention; fewer cedes audience.
- **Q2: Translate full 125 criteria or DSAF-25 Core only?** Resolved → DSAF-25 Core only for P2 (sustainability). Full 125 is FR-I18N-002 P5 scope.
- **Q3: Professional translators or community volunteers?** Resolved → community-translator preferred (OSS authenticity + relationship-building). Professional translators acceptable for the future P5 expansion if community recruitment is insufficient.
- **Q4: Machine translation acceptable?** Resolved → as first-draft only; final translation requires native-speaker review.
- **Q5: Translator + reviewer should be the same person?** Resolved → separate where possible (peer-review quality gate); same-person acceptable if the translator is highly fluent + the maintainer trusts the work, but explicitly logged in PR as "translator + reviewer = same person."
- **Q6: Hreflang on subdirectory or subdomain?** Resolved → subdirectory (`dsaf.dev/ja/card`). Subdomain (`ja.dsaf.dev/card`) would require separate DNS / SSL + complicates Cloudflare Pages routing; subdirectory simpler.
- **Q7: What if a language's translator drops out mid-translation?** Resolved → reassign via the 'good first issue' issue thread; relationship preserved per FR-GOV-001 §3 decline-handling patterns; revisit at FR-I18N-002 P5 if necessary.

---

## §10 — Failure modes inventory

| Failure | Detection | Outcome | Recovery |
|---|---|---|---|
| No translator volunteers for a language within 6 weeks | issue silence | Translation slips to P5 (FR-I18N-002) | Acceptable; the language remains a future-FR target; close the issue with explanation + reopen in P5 |
| Translation fails native-speaker reviewer's quality bar | reviewer rejects PR | Iteration required | Translator iterates per reviewer feedback; founder + reviewer facilitate; if irreconcilable, reassign |
| Terminology drift across translators (different choices for same English term) | reviewer + maintainer cross-check | Inconsistent translations | The terminology consistency table is the gate; if translators propose different terms, the maintainer decides + updates the table |
| Machine-translation-only PR submitted | PR review | Doesn't meet quality bar | Politely decline; explain the native-speaker review requirement; offer to re-evaluate post-review |
| Hreflang attributes missing or incorrect | post-merge SEO audit | Search engines mis-surface pages | Patch in subsequent PR; verify via Google Search Console hreflang report |
| Translator's affiliation / day-job creates conflict of interest | unusual contribution pattern | Brand-risk | Same disclosure as FR-GOV-002 charter §"Conflict of interest"; transparent acknowledgement in announcement |
| Cap-rule disclosure mis-translated (loses intent) | reviewer + native-speaker maintainer cross-check | Misuse risk | Reviewer's job to catch; if missed, patch in subsequent PR |
| Announcement post identifies translator without consent | translator complaint | Privacy violation | The consent letter (per FR-GOV-001 §3 pattern) confirms translator's identity-publicly framing before announcement; if accidentally violated, immediate removal + apology |
| GitHub Issue template's "good first issue" attracts spam PRs | PR queue noise | Maintainer time degraded | Maintainer triage; preserve genuine contributors; close spam PRs with reason |
| Reciprocal hreflang reference broken (e.g., English original references nonexistent /es/ before Spanish translation ships) | post-merge SEO audit | hreflang signal weakened | Patch English's hreflang only after each translation ships; don't reference future-ship translations |
| Translation merge breaks dsaf.dev rendering | CI / Lighthouse check | Page errors | Test renders before merge; rollback if issue surfaces; investigate per-language rendering quirks (e.g., Japanese vertical-text issues if applicable) |
| Future-FR (FR-I18N-002 P5) requires terminology re-table | post-FR-CORE-003 dedup or new criteria | Translation drift | The terminology table is versioned; FR-I18N-002 P5 + FR-CORE-003 coordinate version updates |

---

## §11 — Implementation notes

- **The 6h founder-time is mostly setup + coordination; the per-translator effort (3-5h per language) is community-contributed.** The total cumulative time across founder + 3 translators + 3 reviewers is ~12-20h; the framework's contribution is ~6h.
- **Community-translator recruitment is the key operational step.** Outreach happens via: 'good first issue' GitHub issues (passive); Twitter/LinkedIn announcements about the issues (active); direct outreach to known fluent contributors via FR-LAUNCH-004 heads-up channels (most likely productive). The cumulative ~2-4 week elapsed-time window per language assumes active recruitment.
- **Native-speaker reviewer recruitment is the second key step.** Often the translator can suggest a reviewer (a colleague or friend); the maintainers may have their own native-speaker contacts. For Japanese, the design-systems community in Japan has notable figures (Naoki Sasaki, etc.); for Spanish, the Latin American DS community is growing rapidly; for German, IDS regulars + Sil Bormüller's network are warm-leads.
- **About the cap-rule disclosure translation:** the FR-CORE-004 cap rule is conceptually complex (L3 max unverified, L4 verified, L5 verified+entry-gate-stack). Translating preserves the policy substance; if a language doesn't have idiomatic equivalents for "Managed-advanced — verified", the reviewer + maintainer decide on the closest natural phrasing + update the terminology consistency table.
- **About the language-switcher UI:** simple text links in the footer ("EN · 日本語 · Español · Deutsch") are sufficient for FR-I18N-001. Future FR-I18N-002 P5 may add a dropdown UI or browser-language-auto-detection (with respect to user override); the lite version preserves discipline.
- **Translator + reviewer recognition is the recruitment loop.** Named contributions on dsaf.dev/blog announcements + a portfolio-citable artefact (the published translation) are the rewards. Some translators become repeat contributors (next language or P5 expansion); some become candidates for FR-GOV-002 co-maintainer or FR-CONTENT-001 cadence-share.
- **MEMORY.md continuity:** each translator + reviewer is tracked per the FR-GOV-001 §3 relationship pattern. Future outreaches (FR-I18N-002 P5, FR-CONTENT-003 P3, FR-GOV-002 future expansion) reference the continuity.
- **About future-FR FR-I18N-002 (P5):** the precedent established here — translation guidelines + terminology consistency table + community-translator workflow + hreflang discipline — directly informs the P5 expansion. P5 adds FR + PT + full 125 criteria + deep-dive translation cadence. The infrastructure (subdirectory routing, hreflang reciprocity, language-switcher) carries forward.

---

*End of FR-I18N-001.*
