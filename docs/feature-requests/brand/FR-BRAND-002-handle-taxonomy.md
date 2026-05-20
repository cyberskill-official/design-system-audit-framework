---
id: FR-BRAND-002
title: "DSAF handle taxonomy — `DSAF` / `DSAF Criteria` / `DSAF Levels`; ban 'Framework' creep"
module: BRAND
priority: MUST
status: done
verify: I
phase: P0
milestone: P0 · slice 1 · Pre-launch hardening
slice: 1
owner: Stephen Cheng (Founder)
created: 2026-05-17
shipped: 2026-05-18
related_frs: [FR-BRAND-001, FR-BRAND-003, FR-BRAND-004, FR-CORE-001, FR-DOCS-001]
depends_on: [FR-BRAND-001]
blocks: [FR-BRAND-003, FR-BRAND-004, FR-DOCS-001, FR-CORE-001, FR-GOV-001]
source_pages:
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Naming, branding, governance)"
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Honest critique items 1, 2)"
source_decisions:
  - "DEC-003: short abbreviation-friendly handle (DSAF) carries the brand; long descriptive name kept only for SEO and first-mention disambiguation"
  - "DEC-004: 'Framework' as a noun-handle is banned; the criteria are the DSAF Criteria, the maturity scale is the DSAF Levels"
language: markdown
service: doctrine
new_files:
  - docs/branding/handle-taxonomy.md
  - docs/branding/glossary.md
  - docs/branding/FR-BRAND-002-taxonomy-contract.json
  - scripts/brand-taxonomy-contract-lib.mjs
  - scripts/check-brand-taxonomy-contract.mjs
  - scripts/check-brand-taxonomy-contract.test.mjs
modified_files:
  - README.md
  - docs/01-introduction.md
  - docs/02-framework.md
  - docs/07-maturity-tiers.md
  - package.json
allowed_tools:
  - "file_read/write docs/**"
  - "file_read/write README.md"
  - "grep / ripgrep across the repo to enumerate current usages"
disallowed_tools:
  - "rename existing criterion IDs (A.1.1, B.5.6, etc.) — that is FR-CORE-003 scope, not this FR"
  - "modify the YAML frontmatter schema in templates/ — that is a CORE-module concern"
  - "edit cyberos/* or any sibling project; this FR is self-contained inside design-system-audit-framework"
effort_hours: 3
sub_tasks:
  - "1. (30m) ripgrep current usages of 'framework', 'the audit framework', 'Design System Audit Framework' across the repo; tabulate hits"
  - "2. (30m) author docs/branding/handle-taxonomy.md per §3 below"
  - "3. (30m) author docs/branding/glossary.md per §3 below"
  - "4. (45m) apply find/replace patches to README.md, docs/01-introduction.md, docs/02-framework.md, docs/07-maturity-tiers.md per §3 diff table"
  - "5. (30m) re-grep to verify no banned usages remain; commit"
  - "6. (15m) PR description includes the before/after grep counts as evidence"
risk_if_skipped: "Without a fixed handle taxonomy, the framework's brand drifts during launch — 'Design System Audit Framework,' 'the DSAF framework,' 'DSAF framework,' 'DSAF tool,' and 'DSAF methodology' all proliferate in blog posts, conference talks, and inbound mentions. Long-name proliferation is the slow death of methodology brands (see how '12-factor methodology' beat 'twelve-factor application methodology' in search dominance; see how 'atomic design' won over 'the atomic design system methodology'). The plan §Naming explicitly calls 'Framework' creep as a failure mode — 'call the criteria the DSAF Criteria and the maturity scale the DSAF Levels' is the operative line. Skipping this FR means every downstream FR that quotes the framework's name has to make the naming choice ad-hoc; the resulting inconsistency is mechanically hard to undo once content is published and search-indexed."
---

**2026-05-18 strict execution note:** stale status was reset and FR-BRAND-002 was re-processed with an executable taxonomy contract. `npm run contract:brand-taxonomy` scans external-facing surfaces, excludes intentional spec/source-plan examples, and writes `docs/_audit/brand-taxonomy-contract.json`. No external dependency mock was needed.

## §1 — Description (BCP-14 normative)

The framework's external surface MUST use a fixed three-handle taxonomy. Every external-facing surface (README, dsaf.dev, blog posts, conference titles, sponsored mentions, certification badges) MUST conform.

1. **MUST** establish `DSAF` (all-caps, no period) as the **short handle** — the brand. It is the form that goes into headlines, social-media bios, conference-talk titles, hashtags, certification badges, and any context where character economy matters.
2. **MUST** establish `Design System Audit Framework` (Title Case) as the **long name** — used exactly once per external surface, at first mention, for SEO and disambiguation. Subsequent mentions in the same document MUST use `DSAF`. The README's H1 reads `DSAF — Design System Audit Framework`; the dsaf.dev `<title>` reads the same. Every other use of the long name in the same doc is banned.
3. **MUST** establish `DSAF Criteria` (Title Case, no "the" preceding when used as a proper noun) as the term for **the 125 criteria** (and, post-FR-CORE-001, the 25 Core criteria as a subset called `DSAF-25 Core`). Banned alternatives: "the criteria," "DSAF criteria" (lowercase c), "the framework's criteria," "audit criteria."
4. **MUST** establish `DSAF Levels` (Title Case) as the term for **the L0–L5 maturity scale**. Individual levels are written `L0` … `L5` (capital L, digit, no space). The aggregate is the `DSAF Levels`. Banned alternatives: "the tiers," "DSAF tiers," "maturity tiers," "maturity model."
5. **MUST NOT** use the word `Framework` as a noun-handle in external copy. Acceptable uses of "framework" (lowercase, common-noun): in the long name (`Design System Audit Framework`), in prose where it's a generic descriptor ("DSAF is a vendor-neutral audit framework"), or in quoted material from other people. Banned uses: "the DSAF framework," "DSAF Framework" (capitalised noun-handle), "the Framework" (sentence subject), "the DSAF tool," "the DSAF methodology," "the DSAF spec," "the DSAF system."
6. **MUST** establish `DSAF-25 Core` (with the hyphen, capitalised) as the term for the one-page Core subset that FR-CORE-001 ships. Banned alternatives: "DSAF 25," "DSAF Lite," "DSAF Mini," "the Core 25," "DSAF Core" (without the digit).
7. **MUST** establish the audit-flow modes as `SCAN mode`, `FIX mode`, and (post-FR-CORE-005, P5) `W mode`. The mode handles themselves are `SCAN`, `FIX`, `W` (all-caps, no period); the canonical written forms are `SCAN mode` / `FIX mode` / `W mode` (lowercase "mode" after the all-caps handle). The aggregate is `the DSAF Modes` (Title Case as a proper noun). The existing `docs/02-framework.md` §1 already uses the `SCAN` / `FIX` handles; this FR ratifies them as normative and reserves `W` for FR-CORE-005. Banned alternatives: `mode SCAN`, `Mode-Scan`, `the Scan mode`, `the audit modes` (when referring to DSAF Modes specifically).
8. **MUST** establish a single canonical hashtag — `#DSAF` — for social posts. Banned alternatives: `#dsafFramework`, `#DesignSystemAuditFramework`, `#dsaf25`, `#dsafCore`. The `#DesignSystems` and `#DesignSystem` hashtags are existing community hashtags and SHOULD be used alongside `#DSAF` for reach; they are not DSAF-owned and not in this FR's scope.
9. **MUST** publish the taxonomy at `docs/branding/handle-taxonomy.md` as the single source of truth and `docs/branding/glossary.md` as the broader doctrine glossary (per §3 below). Every contributor (and every future co-maintainer per FR-GOV-002) MUST be pointed at these two files before authoring external content.
10. **MUST** find-and-replace existing repo usages to conform: README.md, docs/01-introduction.md, docs/02-framework.md, docs/07-maturity-tiers.md. The find/replace table in §3 is mechanical and exhaustive for the in-scope files. Out-of-scope (this FR): the criteria-table headings in `docs/03-criteria-part-a.md` and `docs/04-criteria-part-b.md` (FR-CORE-003 is the right place to retitle those without confusing criterion-ID stability).
11. **MUST** apply the taxonomy forward-only to new external surfaces created on or after the ratification date (2026-05-17). Already-published content — DMs already sent, conference CFPs already submitted, blog drafts in progress at ratification, third-party blog posts that cite the framework — MUST NOT be retroactively rewritten by this FR. Forward-only is a scoping choice: retroactive rewrites break inbound links and search-engine signals, and the consistency gain is outweighed by the cost. Obvious errors in *new* content (typos, accidental "the Framework") still get fixed at PR review; the forward-only rule scopes "rewriting *correct-at-the-time*" content, not "fixing fresh mistakes." Hyperlink URLs that contain banned strings (e.g., `docs/02-framework.md#section`) MUST NOT be rewritten by find/replace — only the human-visible *link text* gets normalised; the URL path stays intact to preserve cross-link integrity.
12. **MUST** publish a short rationale paragraph in `docs/branding/handle-taxonomy.md` so external reviewers (and future co-maintainers) understand the *why* and can defend the rule. Without the rationale, the next maintainer relaxes the rule the first time it's inconvenient.
13. **MUST** include the taxonomy in the project's CONTRIBUTING.md flow: PRs that introduce text on external-facing surfaces (README, docs/*, dsaf.dev/, blog posts) are reviewed against the taxonomy. The CONTRIBUTING.md patch is in §3.

---

## §2 — Why this design

**Why a short handle (§1 #1):** every methodology brand that broke through has a four-letter-or-fewer abbreviation that does the work — DORA, SAMM, SLSA, DTCG, DDoS (yes, even bad-news brands). Long names lose to short ones in citations, search, and word-of-mouth. The plan calls this out explicitly: "[the long name] can work (cf. 'Atomic Design,' 'Software Assurance Maturity Model') but only with a short, abbreviation-friendly handle."

**Why `DSAF` and not `DSA` (§1 #1):** `DSA` is "Digital Services Act" in EU regulatory contexts and "digital signature algorithm" in cryptography contexts. Both are higher-search-volume terms than any design-systems-audit handle would be in the next 24 months. `DSAF` is unclaimed in tech-namespace search, pronounceable ("dee-saff"), and the plan explicitly recommends it.

**Why ban `Framework` as a noun-handle (§1 #5):** "the Framework" as a sentence subject is a tell of jargon — readers parse it as a vague abstraction. "Atomic Design" doesn't talk about "the Methodology"; "12-factor" doesn't talk about "the Manifesto." Specific nouns win. The criteria are the *DSAF Criteria*; the scale is the *DSAF Levels*; the modes are the *DSAF Modes*. Each is a concrete handle that points at a concrete artefact.

**Why `DSAF-25 Core` with the hyphen and the digit (§1 #6):** the digit is the share-handle (people quote "DSAF-25" the way they quote "12-factor"). The hyphen prevents "DSAF 25" being misparsed as "DSAF, 25 criteria"; the `Core` qualifier prevents collision with a hypothetical future "DSAF-25 Lite" or "DSAF-25 Plus." Reserving the namespace now is cheap.

**Why a forward-only taxonomy (§1 #11):** rewriting already-published content to conform — old blog drafts, old emails, old conference CFP submissions — is operationally expensive and breaks inbound links / search results. The cost outweighs the consistency benefit. The right line is: *new* external surfaces conform; *old* ones don't get touched. The taxonomy works by attrition of the old usage as new content gets indexed.

**Why publish a rationale paragraph (§1 #12):** the rule "ban Framework as a noun-handle" reads as nitpicky without context. The next maintainer, faced with a CFP committee that wants "the DSAF Framework" in the talk title, will relax the rule unless they understand *why* it exists. The rationale paragraph in `docs/branding/handle-taxonomy.md` is the load-bearing artefact for taxonomy preservation across maintainer turnover.

**Why include the taxonomy in CONTRIBUTING.md (§1 #13):** documentation that doesn't appear in the review checklist gets ignored. CONTRIBUTING.md is the contributor's first stop; a one-line "see `docs/branding/handle-taxonomy.md` for the naming rules — applied at PR review on external-facing surfaces" turns the taxonomy from a doc into a process.

---

## §3 — Doctrine contract

### `docs/branding/handle-taxonomy.md` (NEW)

```markdown
# DSAF — Handle taxonomy

**Status:** normative; ratified by FR-BRAND-002 (2026-05-17).
**Scope:** every external-facing surface that mentions the framework's name.
**Source of truth:** this file. Conflicts with other docs are resolved by amending the other docs.

## The three handles

| Handle | Form | Used as | Used where |
|---|---|---|---|
| `DSAF` | short, all-caps, no period | the brand | headlines, hashtags, bios, badges, talk titles, dsaf.dev, code identifiers |
| `Design System Audit Framework` | Title Case, full name | first-mention disambiguation | once per external surface, at first mention; in `<title>` tags; in SEO-critical body copy |
| `DSAF Criteria` / `DSAF Levels` / `DSAF Modes` / `DSAF-25 Core` | Title Case proper nouns | the framework's component handles | every reference to the 125 criteria, the L0–L5 scale, the SCAN / FIX / W modes, the one-page Core 25 |

## The ban: `Framework` as a noun-handle

> Do not write "the DSAF Framework." Do not write "the Framework" as a sentence subject. Do not write "the DSAF tool," "the DSAF methodology," "the DSAF system," "the DSAF spec."

Acceptable uses of `framework` (lowercase, common noun):

- in the long name itself: `Design System Audit Framework`
- in prose as a generic descriptor: "DSAF is a vendor-neutral audit framework"
- inside quoted material from other people

Banned uses (capitalised noun-handle or referring back to DSAF as "the framework"):

- "the DSAF framework"
- "DSAF Framework"
- "the Framework"
- "DSAF (a maturity framework)" — write "DSAF (a maturity rubric)" instead
- "the DSAF tool"
- "the DSAF methodology"

## Why this taxonomy

Every methodology brand that broke through — DORA, SAMM, 12-factor, Atomic Design — has a short handle that does the work in headlines, hashtags, and conversation. The long names exist for SEO and first-mention disambiguation; they don't get repeated.

The `Framework` ban exists because "the Framework" as a sentence subject is a jargon tell. Readers parse it as a vague abstraction; they don't form a mental model. Specific nouns win. The 125 criteria are the *DSAF Criteria*. The L0–L5 scale is the *DSAF Levels*. The audit-flow modes are the *DSAF Modes*. Each handle points at a concrete artefact a reader can name and reach for.

## Application

This taxonomy is enforced at PR review on external-facing surfaces (README, `docs/`, `dsaf.dev/`, blog posts in `dsaf.dev/blog/`). PRs that introduce text on these surfaces are reviewed against this file. PRs that touch only internal artefacts (templates, scripts, audit reports) are NOT subject to the taxonomy.

## Forward-only

Existing published content (DMs already sent, conference CFPs already submitted, blog drafts in progress at the time this taxonomy ratifies) is not retroactively rewritten. The taxonomy applies to new external surfaces from the date of ratification (2026-05-17) onward.

## Hashtag

The single canonical hashtag is `#DSAF`. Adjacent community hashtags (`#DesignSystems`, `#DesignSystem`) are not DSAF-owned and SHOULD be used alongside `#DSAF` on social posts.
```

### `docs/branding/glossary.md` (NEW)

```markdown
# DSAF — Glossary

**Status:** normative; aligned with FR-BRAND-002 handle taxonomy.
**Scope:** the canonical terms used throughout DSAF doctrine. New terms get added here on coining; deprecated terms are kept with a `[deprecated]` tag and the replacement.

## Brand terms (see handle-taxonomy.md for usage rules)

- **DSAF** — the brand. All-caps, no period.
- **Design System Audit Framework** — the long name, used once per surface at first mention.
- **DSAF Criteria** — the 125 criteria (Part A + Part B), as a proper noun.
- **DSAF-25 Core** — the one-page Core subset of 25 criteria (post-FR-CORE-001).
- **DSAF Levels** — the L0 → L5 maturity scale, as a proper noun. Individual levels are `L0` … `L5`.
- **DSAF Modes** — the audit-flow modes: `SCAN` (baseline + research + findings), `FIX` (plan + execute + verify + re-audit), `W` (Mode W — website-without-DS reverse-engineering audit, post-FR-CORE-005).

## Methodology terms

- **Combined score** — the weighted average of Part A% and Part B% (each weighted 0.5). Reported as a percentage, 0–100.
- **Category** — a group of criteria within Part A or Part B. Twenty categories total in the current version (subject to consolidation per FR-CORE-003).
- **Criterion** — a single scored item in the DSAF Criteria. Each criterion has an ID (e.g., `A.1.1`), a scale anchor (0–5), and a FIXED/DYNAMIC tag.
- **FIXED** — a criterion whose rubric is anchored against an objective state of the world; subject to the no-silent-regression rule (FR-CORE-002).
- **DYNAMIC** — a criterion whose rubric is anchored against an evolving industry standard (WCAG version, DTCG schema, MCP spec); rescored quarterly even when the system doesn't change.
- **Confidence** — `Hi` / `Med` / `Lo` rating on every score. > 25% `Lo` confidence triggers a refusal to ship the audit.
- **No-silent-regression rule** — the integrity rule that replaces the v1 no-downgrade rule per FR-CORE-002. A FIXED criterion can regress, but only with an explicit override comment naming the cause; silent regression is detected and refused.
- **Enterprise-grade** — a system passing every floor in the enterprise-grade-threshold table (combined ≥ 65%, A.8 ≥ 75%, B.5 ≥ 75%, A.1 ≥ 70%, A.4 ≥ 60%, A.3 ≥ 65%, no category < 40%).

## Actor terms

- **`@Agent`** — the LLM agent doing autonomous work (scoring, research, doc patches, lint runs, verification).
- **`@Human`** — the human doing decisions, manual work, sign-off, and rollback.
- **Action tags** — inline tags on findings: `@Agent[fix]`, `@Agent[research]`, `@Human[decide]`, `@Human[approve]`, `@Human[manual]`, `@Human[rollback]`.

## Mode handles

- **`SCAN mode`** — measure current state; populate §1–§3 of the audit report; pause at §4 for human review. Written as `SCAN mode` (handle all-caps, "mode" lowercase) in body prose; written as `SCAN` (handle only) in code identifiers and tables.
- **`FIX mode`** — apply approved fixes; populate §5–§8 of the audit report; submit at §9. Written conventions match `SCAN mode`.
- **`W mode`** (post-FR-CORE-005, P5) — reverse-engineer a website without a DS; output a starter-spec (Figma file + tokens.json + governance template). Written conventions match `SCAN mode`.

## Deprecated terms

- **the DSAF framework** [deprecated] → use `DSAF` or `DSAF Criteria` / `DSAF Levels` depending on what you mean.
- **the framework's tiers** [deprecated] → use `DSAF Levels` (proper noun) or `the L0–L5 tiers` (common noun).
- **DSAF Lite** [deprecated, never shipped] → use `DSAF-25 Core`.
- **DSAF maturity model** [deprecated] → use `DSAF Levels` (the maturity scale) and `DSAF` (the brand). "Maturity model" is fine as a generic descriptor but never capitalised as a noun-handle.

## Adding a term

PRs that coin a new DSAF-specific term MUST add the term here in the same PR. Generic terms (WCAG, DTCG, MCP, CMM, ITIL, BCP-14) are not DSAF-owned and live in their respective sources; we don't re-define them.
```

### `README.md` — patches (find / replace)

This FR applies the following mechanical patches to `README.md`. Before-text is grep'd from the current file; the FR ships in the same PR as the find/replace.

| Before (existing text) | After |
|---|---|
| `# Design System Audit Framework` (H1, if present) | `# DSAF — Design System Audit Framework` |
| `the audit framework` (any occurrence in body copy) | `DSAF` |
| `the framework` (when referring to DSAF, not as common noun) | `DSAF` |
| `Design System Audit Framework` (every occurrence after the H1) | `DSAF` |
| `the DSAF framework` (any case) | `DSAF` |
| `DSAF Framework` | `DSAF` |
| `the tiers` (referring to L0–L5) | `the DSAF Levels` (proper noun) OR `the L0–L5 tiers` (common noun, in tables only) |
| `the criteria` (referring to the 125) | `the DSAF Criteria` |
| `the modes` (referring to SCAN / FIX) | `the DSAF Modes` |
| `#DesignSystemAuditFramework` (if present in any social-media block) | `#DSAF #DesignSystems` |

### `docs/01-introduction.md` — patches (find / replace)

| Before | After |
|---|---|
| `# 01 — Introduction` | `# 01 — Introduction to DSAF` |
| `## What this framework is` | `## What DSAF is` |
| `The framework's job is to tell you what you actually have.` | `DSAF's job is to tell you what you actually have.` |
| every other occurrence of `the framework` referring to DSAF | `DSAF` |

### `docs/02-framework.md` — patches (find / replace)

| Before | After |
|---|---|
| `# 02 — Framework` | `# 02 — DSAF framework spec` (lowercase `f`, the long name lives in the H1 only) |
| `The audit framework defines …` (opening line) | `DSAF defines …` |
| `the framework promises` | `DSAF promises` |
| `the framework's invariants` | `the DSAF invariants` |
| every other occurrence of `the framework` referring to DSAF | `DSAF` |

### `docs/07-maturity-tiers.md` — patches (find / replace)

The file has dozens of `tier` usages; only the **proper-noun** referents (the L0–L5 scale as a named concept) get patched. Common-noun usages inside the L0–L5 table itself ("Tier name," "Tier number") stay as common nouns. Patches:

| Before | After |
|---|---|
| `## §1 The six tiers` | `## §1 The DSAF Levels (six tiers)` |
| `the tier is a coarse summary` | `the DSAF Level is a coarse summary` |
| `Always read the per-category roll-up alongside the tier.` | `Always read the per-category roll-up alongside the DSAF Level.` |
| `Why L5 is hard` (§4 heading) | `Why L5 is hard` (no change — `L5` is already a proper-noun form) |
| `Tier transitions and the no-downgrade rule` (§5 heading) | `Tier transitions and the no-silent-regression rule` (the rule rename is owned by FR-CORE-002; this FR coordinates the rename in §5 heading text only, not in the §5 body) |
| `The framework's no-downgrade rule` | `DSAF's no-silent-regression rule` (FR-CORE-002 owns the rule-name change; this FR's patch is text-only) |
| `the tier might still change` | `the DSAF Level might still change` |
| `Tier-aware language` (§6 heading) | `DSAF-Level-aware language` |
| `"We're at L4."` (in the §6 table) | (no change — quoted user speech is exempt) |
| `The framework refuses to produce a "we're better than X" claim.` | `DSAF refuses to produce a "we're better than X" claim.` |
| `The framework reports both numbers.` | `DSAF reports both numbers.` |

The remainder of the file's `tier` usages (mainly inside the §1 table and §3 "what it takes to climb each tier" headings — `L0 → L1 (40%)` etc.) are common-noun tabular usages and stay untouched. Reviewer-check at AC5 confirms the split.

### `CONTRIBUTING.md` — patch (additive paragraph)

```markdown
## Naming and taxonomy

PRs that introduce text on external-facing surfaces (`README.md`, anything under `docs/`, anything under `dsaf.dev/`, anything destined for a blog or social post) are reviewed against the DSAF handle taxonomy at [`docs/branding/handle-taxonomy.md`](docs/branding/handle-taxonomy.md). The short version: use `DSAF` as the brand, use the long name `Design System Audit Framework` once per surface at first mention, use `DSAF Criteria` / `DSAF Levels` / `DSAF Modes` / `DSAF-25 Core` as the component handles, and never use `Framework` as a capitalised noun-handle.

The glossary at [`docs/branding/glossary.md`](docs/branding/glossary.md) is the source of truth for every DSAF-specific term. New coined terms are added there in the same PR that coins them.
```

---

## §4 — Acceptance criteria

1. **Two new doctrine files committed** — `docs/branding/handle-taxonomy.md` and `docs/branding/glossary.md` exist in the repo with the content shape in §3.
2. **README normalised** — `grep -ciE '\b(the )?(DSAF )?Framework\b' README.md` excluding the H1 line returns `0`; `grep -c '\bDSAF\b' README.md` returns ≥ 5; H1 reads exactly `# DSAF — Design System Audit Framework`.
3. **`docs/01-introduction.md` normalised** — `grep -ciE '\bthe framework\b' docs/01-introduction.md` returns `0`.
4. **`docs/02-framework.md` normalised** — `grep -ciE '\bthe framework\b' docs/02-framework.md` returns `0` except inside fenced code blocks or quoted external material.
5. **`docs/07-maturity-tiers.md` normalised** — `grep -ciE '\b(the )?tier\b' docs/07-maturity-tiers.md` reviewer-checks: every match either uses `DSAF Level` (proper noun) or `L0–L5 tier` (common noun in tables).
6. **CONTRIBUTING.md updated** — contains the "Naming and taxonomy" section per §3.
7. **No banned forms anywhere external-facing** — `rg -ti md '\b(the )?DSAF Framework\b|\bDSAF framework\b' README.md docs/` returns `0` matches.
8. **Glossary has all 20 canonical terms across 4 sections** — `docs/branding/glossary.md` contains entries for: (Brand, 6) DSAF, Design System Audit Framework, DSAF Criteria, DSAF-25 Core, DSAF Levels, DSAF Modes; (Methodology, 8) Combined score, Category, Criterion, FIXED, DYNAMIC, Confidence, No-silent-regression rule, Enterprise-grade; (Actor, 3) `@Agent`, `@Human`, Action tags; (Mode, 3) `SCAN mode`, `FIX mode`, `W mode`. The Deprecated section is also present but its entries are not counted toward the 20.
9. **Hashtag enumerated** — `docs/branding/handle-taxonomy.md` § Hashtag names `#DSAF` as canonical and `#DesignSystems` / `#DesignSystem` as community alongside.
10. **PR description includes before/after grep counts** — for each of README.md, docs/01-introduction.md, docs/02-framework.md, docs/07-maturity-tiers.md, the PR description shows the pre-patch and post-patch counts of banned phrases.
11. **Out-of-scope files explicitly listed** — PR description notes: criterion tables in `docs/03-criteria-part-a.md` and `docs/04-criteria-part-b.md` are NOT patched in this FR (deferred to FR-CORE-003 to avoid breaking criterion-ID stability).
12. **Forward-only stated** — `docs/branding/handle-taxonomy.md` "Forward-only" section is present per §3.

---

## §5 — Verification

```bash
# AC1 — new files exist
test -f docs/branding/handle-taxonomy.md && test -f docs/branding/glossary.md
echo $?  # 0

# AC2 — README normalised (excluding H1)
sed '1d' README.md | grep -ciE '\b(the )?(DSAF )?Framework\b'  # MUST be 0 (excluding H1)
grep -c '\bDSAF\b' README.md  # MUST be >= 5
head -1 README.md  # MUST be exactly: # DSAF — Design System Audit Framework

# AC3 / AC4 — intro + framework spec normalised
grep -ciE '\bthe framework\b' docs/01-introduction.md  # MUST be 0
grep -ciE '\bthe framework\b' docs/02-framework.md     # MUST be 0 (outside fenced blocks; spot-check)

# AC7 — no banned forms anywhere
rg -ti md '\b(the )?DSAF Framework\b|\bDSAF framework\b' README.md docs/  # MUST be empty

# AC8 — glossary has the 20 canonical terms
for term in 'DSAF' 'Design System Audit Framework' 'DSAF Criteria' 'DSAF-25 Core' \
            'DSAF Levels' 'DSAF Modes' 'Combined score' 'Category' 'Criterion' \
            'FIXED' 'DYNAMIC' 'Confidence' 'No-silent-regression rule' 'Enterprise-grade' \
            '@Agent' '@Human' 'Action tags' '`SCAN mode`' '`FIX mode`' '`W mode`'; do
  grep -q "^- \*\*${term}\*\*" docs/branding/glossary.md || echo "MISSING: ${term}"
done
# Expected: no MISSING lines

# AC9 — hashtag enumerated
grep -E '^- ?\*\*#DSAF\*\*|## Hashtag' docs/branding/handle-taxonomy.md  # MUST have at least 1 hit

# AC12 — forward-only section present
grep -q '## Forward-only' docs/branding/handle-taxonomy.md  # exit 0
```

Human-verified ACs (no script; checked at PR review):

- **AC5** — reviewer reads `docs/07-maturity-tiers.md` and confirms every `tier`-word usage is either a proper-noun `DSAF Level` or a common-noun tabular `L0–L5 tier`.
- **AC6** — reviewer confirms `CONTRIBUTING.md` contains the "Naming and taxonomy" section per §3.
- **AC10** — reviewer reads the PR description and finds before/after grep counts for each touched file.
- **AC11** — reviewer confirms the PR description names the deferred files (`docs/03-criteria-part-a.md`, `docs/04-criteria-part-b.md`) and the reason (FR-CORE-003 owns criterion-table normalisation).

---

## §6 — Implementation skeleton

The operator playbook runs in order:

1. **(30 min) Enumerate current usages.** Run `rg -ti md -c '\b(the )?framework\b' README.md docs/` and `rg -ti md -c '\bDSAF\b' README.md docs/` to get the pre-patch counts. Paste them in the PR description under "Pre-patch counts."
2. **(30 min) Author `docs/branding/handle-taxonomy.md`.** Copy the body from §3 verbatim; commit.
3. **(30 min) Author `docs/branding/glossary.md`.** Copy the body from §3 verbatim; commit.
4. **(45 min) Apply find/replace patches.** Use the four tables in §3 (README, 01-introduction, 02-framework, 07-maturity-tiers) as a literal patch list. Run each find/replace in a text editor with regex support; do NOT use `sed -i` blindly because some `the framework` occurrences are inside fenced code blocks or quoted external material — those are exempt. Hand-review every match.
5. **(15 min) Patch `CONTRIBUTING.md`.** Append the "Naming and taxonomy" paragraph from §3.
6. **(15 min) Re-grep + verify.** Run the §5 AC2 / AC3 / AC4 / AC7 commands; paste the post-patch counts in the PR description under "Post-patch counts."
7. **(15 min) PR description.** Include: pre-patch counts, post-patch counts, list of files touched, explicit "out of scope: `docs/03-criteria-part-a.md`, `docs/04-criteria-part-b.md` (deferred to FR-CORE-003)."

---

## §7 — Dependencies

- **Upstream:** FR-BRAND-001 (canonical URL `dsaf.dev` minted) — the handle taxonomy references `dsaf.dev` in `docs/branding/handle-taxonomy.md` as the canonical surface where the taxonomy is rendered.
- **Downstream blocks:** FR-BRAND-003 (visual identity SVGs MUST use the canonical handles in labels), FR-BRAND-004 (decoupled marketing copy MUST conform to the taxonomy), FR-DOCS-001 (README rewrite is the largest downstream taxonomy consumer), FR-CORE-001 (DSAF-25 Core uses `DSAF-25 Core` as its term-of-art handle), FR-GOV-001 (reviewer outreach emails use the canonical handles).
- **Sibling:** FR-CORE-003 (criteria dedup pass) owns the patches to `docs/03-criteria-part-a.md` and `docs/04-criteria-part-b.md` — those files are explicitly out of scope for this FR.
- **External:** none. This is doctrine-only and self-contained inside the repo.

---

## §8 — Example payloads

### Example: README H1 before/after

**Before:**

```markdown
# Design System Audit Framework

A 125-criterion audit and improvement-plan toolkit for design systems.
```

**After:**

```markdown
# DSAF — Design System Audit Framework

A 125-criterion, agent-native, CMM-style maturity rubric for design systems. Open source. Vendor-neutral. Six DSAF Levels from L0 to L5.

DSAF is a downloadable, criteria-graded, scriptable artefact — not a SaaS platform, not a blog post.
```

### Example: a blog-post draft passing taxonomy review

> **Draft title:** "Auditing Primer with DSAF: what we found, what we missed"
>
> **Draft body opening:** "We ran a complete audit of GitHub Primer using the DSAF Criteria. Primer scored 78% combined, putting it at L4 in the DSAF Levels — strong on tokens (A.1 at 92%), weaker on agent-readiness (A.10 at 41%). The full audit report follows the DSAF Modes (SCAN → FIX → RE_AUDIT) and is reproducible against the DSAF-25 Core subset alone if you want a faster pass."

This draft passes taxonomy review: `DSAF` is the short handle, `DSAF Criteria` / `DSAF Levels` / `DSAF Modes` / `DSAF-25 Core` are the component handles, `Framework` does not appear as a noun-handle.

### Example: a draft that FAILS taxonomy review

> **Draft title:** "Auditing Primer with the DSAF Framework"

Fails on three counts: `the DSAF Framework` is a banned noun-handle (use `DSAF` instead); `the DSAF Framework` (capitalised `Framework`) is doubly banned; the title should be `Auditing Primer with DSAF` to match the short-handle convention. Reviewer comment: "Per `docs/branding/handle-taxonomy.md` §The ban, replace 'the DSAF Framework' with `DSAF`. The title shrinks by 9 characters too."

### Example: a glossary entry being added in a PR

```markdown
- **MCP server** — Model Context Protocol server; the canonical way to expose DSAF-readable artefacts to LLM agents. First introduced as a scoring criterion under A.10 Agent Readiness. (Added 2026-09: PR #87.)
```

This entry conforms because (a) it's a DSAF-specific application of an external term, (b) it cites the criterion that introduced it, (c) it dates the addition.

---

## §9 — Open questions

All resolved at authoring time:

- **Q1: Should `the framework` (lowercase, common noun) ever be acceptable for DSAF?** Resolved → only in the long name `Design System Audit Framework` and in generic prose ("DSAF is a vendor-neutral audit framework"). Never as a referent for DSAF itself ("the framework refuses to ship if …" → "DSAF refuses to ship if …").
- **Q2: `DSAF Levels` or `DSAF Tiers`?** Resolved → `DSAF Levels`. "Tier" is overloaded in software pricing contexts (Tier 1 / Tier 2 customer) and in the framework's own services-pricing language. "Level" matches CMM heritage (Capability Maturity Model levels L1–L5) and reads naturally with `L0` … `L5`.
- **Q3: `DSAF-25 Core` or `DSAF-25` or `DSAF Core`?** Resolved → `DSAF-25 Core`. The digit anchors the share-handle; the `Core` qualifier reserves the namespace for hypothetical future variants without collision.
- **Q4: Should we also reserve `DSAF Lite`, `DSAF Mini`, `DSAF Plus`?** Deferred → no namespace reservations beyond `DSAF-25 Core`. Speculative variants confuse the rule. If a real variant is introduced, it gets coined and added to the glossary at coining time.
- **Q5: Apply the taxonomy retroactively to already-published blog drafts and CFP submissions?** Resolved → no. Forward-only per §1 #11. Retroactive rewriting is expensive and breaks inbound search; the cost outweighs consistency benefit.
- **Q6: Patch `docs/03-criteria-part-a.md` and `docs/04-criteria-part-b.md` in this FR?** Resolved → no. Those files have criterion-ID semantics (A.1.1 etc.) that need careful handling; FR-CORE-003 (criteria dedup pass) is the right place. Splitting reduces scope creep.
- **Q7: Hashtag — `#DSAF` or `#dsaf` or `#Dsaf`?** Resolved → `#DSAF` (all-caps). Twitter/X / LinkedIn / Mastodon treat hashtags case-insensitively for matching but case-sensitively for display; all-caps matches the brand handle convention.

---

## §10 — Failure modes inventory

| Failure | Detection | Outcome | Recovery |
|---|---|---|---|
| Contributor uses `the DSAF Framework` in a new doc PR | PR review against `docs/branding/handle-taxonomy.md` | Reviewer comments + requests change | Author rewrites; merge after second pass |
| Conference CFP committee insists on "the DSAF Framework" in the talk title | Pre-talk email exchange | Talk title doesn't match the taxonomy | Negotiate: prefer `DSAF` short handle; if committee insists, accept (the conference's surface, not DSAF's), but submit the talk's *abstract* per the taxonomy |
| Old blog post (pre-ratification) ranks for "the DSAF Framework" search query | Periodic SEO check | Search-result mismatch with new taxonomy | Forward-only rule: do not retroactively rewrite. The new content out-ranks the old over 6–12 months as fresh content gets indexed |
| Founder slips and uses "the framework" in a public talk | Recording review | Single-instance inconsistency | Accept; one slip doesn't break the rule. Repeat slips warrant a self-correction note in the next public talk |
| Co-maintainer (post-FR-GOV-002) prefers a different handle | Governance disagreement | Brand split risk | Resolved at governance level: `docs/branding/handle-taxonomy.md` is normative and can only be amended via RFC (FR-GOV-003, P6). Co-maintainer can propose; cannot unilaterally change |
| Trademark holder of "DSAF" (unrelated context) surfaces | Web search / cease-and-desist | Forced rename | §10 of FR-BRAND-001 covers trademark pre-clearance; if a later filing succeeds, the fallback name list applies. Existing taxonomy structure (short handle + long name + component handles) is portable to any new short handle |
| `framework` (lowercase) inside fenced code block gets mass-rewritten by overzealous sed | Post-patch diff review | Code-block content corrupted | Hand-review every find/replace; never `sed -i` blindly. The §6 step 4 explicitly warns against this |
| Hashtag `#DSAF` collides with an existing hashtag (DiSAdvantaged Families etc.) | Twitter/X search at launch | Social-reach signal mixes with unrelated content | Acceptable; the design-systems audience filters by `#DSAF + #DesignSystems` combinations. If collision becomes load-bearing, evaluate a longer hashtag (e.g., `#DSAFCriteria`) — costly but recoverable |
| Glossary entry conflicts with criteria-Part-A definition | Reviewer catches at PR | Inconsistency between glossary and criterion rubric | Glossary defers to the criterion rubric (criterion is the source of truth for what it measures); glossary's job is to *name* the term, not redefine it |
| Forward-only rule misread as "no retroactive fixes ever" | Reviewer pushback | Reader thinks the framework is allergic to corrections | `docs/branding/handle-taxonomy.md` "Forward-only" section explicitly scopes "old blog drafts and CFP submissions"; obvious errors in *new* content still get fixed |
| Taxonomy file moved or renamed silently | grep / CI check fails | Contributors can't find the rules | Add a `docs/README.md` index entry that points at `docs/branding/handle-taxonomy.md`; preserve the path or add a frontmatter `moved_to:` pointer |

---

## §11 — Implementation notes

- **Why two files and not one?** `handle-taxonomy.md` is the *external-naming policy*; `glossary.md` is the *internal-vocabulary policy*. They have different audiences. The taxonomy file is short and contains a ban; the glossary file is long and grows over time. Splitting prevents the ban from getting buried in the middle of a 200-term glossary.
- **Why ratify `Mode SCAN` / `Mode FIX` here instead of in a CORE FR?** The mode names already exist in `docs/02-framework.md` §1; this FR just locks them in as the canonical handles and adds the future `Mode W` to the glossary. A CORE FR that re-coined the mode names would be a noun-handle change; this is a noun-handle ratification.
- **Why no `DSAF Audit Report` as a handle?** The audit report's filename is `audit-report-{YYYY-MM-DD}.md` per `02-framework.md` §6; treating "the audit report" as a common noun is correct because the report is a generic artefact, not a brand component. Capitalising it would invite "the DSAF Audit Report" creep — the exact pattern we're banning for `Framework`.
- **Why hand-apply the patches in §3 rather than ship a `sed` script?** Roughly 30% of `the framework` occurrences across `docs/` are inside fenced code blocks or quoted material from external sources (WCAG language, MCP spec quotes, DTCG references). Those are exempt and `sed -i` will corrupt them. Hand-review is the right cost; ~30 minutes for ~50 matches.
- **Why is the "Naming and taxonomy" CONTRIBUTING.md section so short?** It's a pointer + the short version. Contributors who want detail follow the link; contributors who want the rule for a PR review get it in one paragraph. CONTRIBUTING.md gets re-read at every PR; long doctrine in it gets skimmed.
- **Why include `Action tags` in the glossary if they're already in `02-framework.md` §2?** Cross-doc consistency. The glossary is the single place a new contributor looks up "what does `@Human[manual]` mean?" Not having it there forces a search across all doctrine files.
- **About `Framework` in this FR's own title (`title: "...Framework..."` in YAML):** the long name is acceptable in YAML titles, frontmatter, and CHANGELOG entries — these are internal metadata, not external-facing copy. The ban is on noun-handle uses in body prose on external surfaces. The YAML title here passes the rule.
- **Why find/replace skips URL paths but rewrites link text:** `[the framework](docs/02-framework.md)` becomes `[DSAF](docs/02-framework.md)`, not `[DSAF](docs/02-DSAF.md)`. URL paths are stable identifiers; rewriting them breaks every cross-link, bookmark, and external citation. The visible *text* gets normalised; the URL stays. §1 #11 codifies this; the operator playbook in §6 step 4 reminds the patch author to hand-review for this case.
- **Why we don't ban `DSAF spec`:** several reviewers will reach for "the DSAF spec" intuitively (it's a noun phrase that *correctly* names something — the spec at `docs/02-framework.md`). The ban applies to noun-handles that swap in for `DSAF` itself; "the DSAF spec" is a phrase that *qualifies* DSAF, not a substitute for it. Acceptable. The pattern test: "could `DSAF` (the short handle) be used here instead?" If yes (e.g., "we built the DSAF Framework after 0 audits" → "we built DSAF after 0 audits"), the alternate handle is banned. If no (e.g., "the DSAF spec lives at `docs/02-framework.md`" — `DSAF` alone wouldn't disambiguate), the qualifier is fine.

---

*End of FR-BRAND-002.*
