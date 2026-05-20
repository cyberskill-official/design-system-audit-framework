# @dsaf/tokens-validator

Validate Tokens Studio or DTCG token exports against the DSAF A.1 Foundations & Tokens subset.

```bash
npx @dsaf/tokens-validator path/to/tokens.json
```

Local development:

```bash
npm --prefix packages/tokens-validator test
npm --prefix packages/tokens-validator run smoke
```

The validator emits nine A.1 criterion scores plus an `audit_targets` object for downstream DSAF integrations.
