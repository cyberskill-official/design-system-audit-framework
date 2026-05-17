# Tokens Studio validator

**Status:** local CLI shipped.
**FR:** FR-INTEG-002.

Validate a Tokens Studio JSON export against the A.1 Foundations & Tokens subset.

```bash
node scripts/tokens-studio-validator.mjs tokens.json
```

The validator reports token count, A.1 score percentage, and per-criterion scores for:

- A1.1 Color tokens
- A1.2 Typography tokens
- A1.3 Spacing scale
- A1.8 DTCG-style typed/described token format

It accepts both `$value`/`$type` and legacy `value`/`type` fields.

*End of Tokens Studio validator doc.*
