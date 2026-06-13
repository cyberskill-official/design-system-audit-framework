# Tokens Studio Validator

**Status:** package-ready local implementation.  
**FR:** FR-INTEG-002.  
**Package:** `@dsaf/tokens-validator`

Validate a Tokens Studio or DTCG token export against the DSAF A.1 Foundations & Tokens subset.

## CLI

```bash
node scripts/bin/tokens-studio-validator.mjs path/to/tokens.json
npm run integ:tokens -- path/to/tokens.json
```

## Local Package Tests

```bash
npm --prefix packages/tokens-validator test
npm --prefix packages/tokens-validator run smoke
```

## Scored Criteria

The validator reports token count, A.1 score percentage, per-criterion scores, and `audit_targets` for:

- A1.1 Color tokens with primitive to semantic to component layers
- A1.2 Typography scale and type tokens
- A1.3 Spacing scale
- A1.4 Elevation and shadow tokens
- A1.5 Motion tokens
- A1.6 Iconography system tokens
- A1.7 Grid and layout tokens
- A1.8 Token format and DTCG conformance
- A1.9 Modern color spaces

It accepts both `$value`/`$type` and legacy `value`/`type` fields.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Missing input | Pass a path: `npm run integ:tokens -- tokens.json`. |
| Low A1.1 score | Add semantic aliases and component-scoped tokens, not only primitive colors. |
| Low A1.8 score | Add `$type` to every token and descriptions to at least half. |
| Low A1.9 score | Add OKLCH, Lab, or Display-P3 values for color primitives. |
| JSON parse failure | Export plain JSON from Tokens Studio, not a compressed or multi-file package. |

*End of Tokens Studio validator doc.*
