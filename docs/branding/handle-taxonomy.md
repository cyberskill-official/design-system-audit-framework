# DSAF — Handle taxonomy

**Status:** normative; ratified by FR-BRAND-002 (2026-05-17).
**Scope:** every external-facing surface that mentions the framework's name.
**Source of truth:** this file. Conflicts with other docs are resolved by amending the other docs.

## The three handles

| Handle | Form | Used as | Used where |
|---|---|---|---|
| `DSAF` | short, all-caps, no period | the brand | headlines, hashtags, bios, badges, talk titles, audit.cyberskill.world, code identifiers |
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

This taxonomy is enforced at PR review on external-facing surfaces (README, `docs/`, `audit.cyberskill.world/`, blog posts in `audit.cyberskill.world/blog/`). PRs that introduce text on these surfaces are reviewed against this file. PRs that touch only internal artefacts (templates, scripts, audit reports) are NOT subject to the taxonomy.

## Forward-only

Existing published content (DMs already sent, conference CFPs already submitted, blog drafts in progress at the time this taxonomy ratifies) is not retroactively rewritten. The taxonomy applies to new external surfaces from the date of ratification (2026-05-17) onward.

Hyperlink URLs that contain banned strings (e.g., `docs/02-framework.md#section`) are NOT rewritten — only human-visible link text gets normalised; URL paths stay intact to preserve cross-link integrity.

## Hashtag

The single canonical hashtag is `#DSAF`. Adjacent community hashtags (`#DesignSystems`, `#DesignSystem`) are not DSAF-owned and SHOULD be used alongside `#DSAF` on social posts.

Banned: `#dsafFramework`, `#DesignSystemAuditFramework`, `#dsaf25`, `#dsafCore`.

## DSAF Modes — canonical written forms

The audit-flow modes are written as `SCAN mode`, `FIX mode`, and (post-FR-CORE-005, P5) `W mode` in body prose. The handles themselves are `SCAN`, `FIX`, `W` (all-caps, no period). In code identifiers and tables, the handle alone is acceptable.

The aggregate is `the DSAF Modes` (Title Case as a proper noun).

Banned: `mode SCAN`, `Mode-Scan`, `the Scan mode`, `the audit modes` (when referring to DSAF Modes specifically).

*End of handle taxonomy.*
