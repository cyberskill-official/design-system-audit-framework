# DSAF translation good-first issues

**Status:** ready for community issues.
**FR:** FR-I18N-001.
**Guidelines:** [`translation-guidelines.md`](translation-guidelines.md).

## Scope

Translate:

1. [`docs/dsaf-25.md`](../dsaf-25.md)
2. [`docs/dsaf-25-card.md`](../dsaf-25-card.md)
3. the first 200 words of [`README.md`](../../README.md)

Accepted translations will land under:

- `landing/ja/index.html` and `landing/ja/card/index.html`
- `landing/es/index.html` and `landing/es/card/index.html`
- `landing/de/index.html` and `landing/de/card/index.html`

Target languages:

- Japanese
- Spanish
- German

## Issue templates

### Japanese

Title: `Translate DSAF-25 Core to Japanese`

Body:

```markdown
Translate docs/dsaf-25.md, docs/dsaf-25-card.md, and the first 200 words of README.md into Japanese.
Keep criterion IDs unchanged.
Use docs/i18n/translation-guidelines.md for terminology.
Do not translate `DSAF` or `DSAF-25 Core`.
Add files under landing/ja/index.html and landing/ja/card/index.html.
Include hreflang alternates for English and Japanese only until other translations ship.
Native-speaker review is required before merge.
Expected timeline: 2-4 weeks.
```

### Spanish

Title: `Translate DSAF-25 Core to Spanish`

Body:

```markdown
Translate docs/dsaf-25.md, docs/dsaf-25-card.md, and the first 200 words of README.md into Spanish.
Keep criterion IDs unchanged.
Use docs/i18n/translation-guidelines.md for terminology.
Do not translate `DSAF` or `DSAF-25 Core`.
Add files under landing/es/index.html and landing/es/card/index.html.
Include hreflang alternates for English and Spanish only until other translations ship.
Native-speaker review is required before merge.
Expected timeline: 2-4 weeks.
```

### German

Title: `Translate DSAF-25 Core to German`

Body:

```markdown
Translate docs/dsaf-25.md, docs/dsaf-25-card.md, and the first 200 words of README.md into German.
Keep criterion IDs unchanged.
Use docs/i18n/translation-guidelines.md for terminology.
Do not translate `DSAF` or `DSAF-25 Core`.
Add files under landing/de/index.html and landing/de/card/index.html.
Include hreflang alternates for English and German only until other translations ship.
Native-speaker review is required before merge.
Expected timeline: 2-4 weeks.
```

## Review checklist

- Criterion IDs unchanged.
- Links point to canonical English source.
- No machine-translation-only submission without human review.
- Layout handles German expansion.
- README excerpt preserves DSAF self-audit cap language.
- Hreflang attributes are present only for accepted translations.
- Translator and reviewer consent to public recognition before announcement.

## Labels

Use these labels for all three issues:

- `good first issue`
- `translation`
- `i18n`
- `needs native review`

## Blocked Until

The FR cannot be marked fully complete until all three language PRs have native-speaker review and merge.
This file provides the issue payloads and workflow; it does not pretend translations are already reviewed.

*End of translation issues.*
