# DSAF Translation Guidelines

**Status:** repo-shipped translation program guide.
**FR:** FR-I18N-001.

These guidelines are for community translators and native-speaker reviewers contributing Japanese, Spanish, and German translations of DSAF-25 Core plus the first-read landing copy.

## Scope

In scope for FR-I18N-001:

- DSAF-25 Core criterion names and score-anchor copy.
- README first-read equivalent: what DSAF is, why it exists, how to start, and the self-audit cap.
- Language landing route and card route for `ja`, `es`, and `de`.
- Hreflang reciprocity once a translation is accepted.

Out of scope:

- Full 125 DSAF Criteria.
- Weekly deep dives.
- Audit report template.
- Commercial service pages.

## Quality Bar

A translation can merge only when:

1. A target-language translator opens the PR or confirms the translation.
2. A native-fluent reviewer signs off in the PR.
3. Criterion IDs remain unchanged.
4. DSAF remains `DSAF`.
5. The cap-rule disclosure is preserved.
6. No paid-funnel CTA is added.
7. Hreflang alternates are present only for translations that actually exist.

Machine translation may be used as a private first-draft aid, but machine-translation-only output must not be published as canonical DSAF content.

## File Paths

When a language is accepted, add:

| Language | Landing | Card |
|---|---|---|
| Japanese | `landing/ja/index.html` | `landing/ja/card/index.html` |
| Spanish | `landing/es/index.html` | `landing/es/card/index.html` |
| German | `landing/de/index.html` | `landing/de/card/index.html` |

Do not add these routes as public language links until the translation has native-speaker approval.

## Terminology Table

| English | Japanese | Spanish | German |
|---|---|---|---|
| DSAF | DSAF | DSAF | DSAF |
| Design System Audit Framework | デザインシステム監査フレームワーク | Marco de Auditoría de Sistemas de Diseño | Design-System-Audit-Framework |
| DSAF Criteria | DSAF基準 | Criterios DSAF | DSAF-Kriterien |
| DSAF Levels | DSAFレベル | Niveles DSAF | DSAF-Stufen |
| DSAF-25 Core | DSAF-25 Core | DSAF-25 Core | DSAF-25 Core |
| self-audit | 自己監査 | autoauditoría | Selbst-Audit |
| audit report | 監査報告書 | informe de auditoría | Audit-Bericht |
| maturity level | 成熟度レベル | nivel de madurez | Reifegrad |
| design system | デザインシステム | sistema de diseño | Design-System |

If a translator proposes a better phrase, record the change in the PR and update this table in the same merge.

## Hreflang Template

Add only the languages that have shipped.
Example after all three FR-I18N-001 translations are accepted:

```html
<link rel="alternate" hreflang="en" href="https://audit.cyberskill.world/card" />
<link rel="alternate" hreflang="ja" href="https://audit.cyberskill.world/ja/card/" />
<link rel="alternate" hreflang="es" href="https://audit.cyberskill.world/es/card/" />
<link rel="alternate" hreflang="de" href="https://audit.cyberskill.world/de/card/" />
<link rel="alternate" hreflang="x-default" href="https://audit.cyberskill.world/card" />
```

Each translated page must reciprocally link to English and every other accepted translation.

## Review Checklist

- [ ] Scope is limited to DSAF-25 Core plus landing first-read copy.
- [ ] Native-fluent reviewer is named.
- [ ] Reviewer comments `native-speaker review complete`.
- [ ] Terminology table followed or amended.
- [ ] Hreflang alternates are reciprocal.
- [ ] Cap-rule disclosure translated.
- [ ] No paid-funnel CTA.
- [ ] Layout checked for text expansion.
- [ ] Translator and reviewer consent to public recognition before announcement.

*End of translation guidelines.*
