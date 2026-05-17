# DSAF Storybook addon

**Status:** local runner shipped.
**FR:** FR-INTEG-001.

The Storybook integration surface is [`scripts/storybook-addon-runner.mjs`](../../scripts/storybook-addon-runner.mjs).
It runs the relevant DSAF checks and emits JSON a Storybook panel can render.

## Command

```bash
node scripts/storybook-addon-runner.mjs
```

## Checks

- `check-coverage.mjs`
- `check-apca.mjs`
- `check-bundle-size.mjs`
- `check-doc-freshness.mjs`

## Criterion map

| Check | Criteria |
|---|---|
| coverage | A7.1, A2.4, A5.4 |
| APCA | A8.1, B5.2 |
| bundle size | A9.1, B8.5 |
| doc freshness | A3.7 |

*End of Storybook integration doc.*
