# DSAF Storybook Addon

**Status:** package-ready local implementation.  
**FR:** FR-INTEG-001.  
**Package:** `@dsaf/storybook-addon`

The addon package lives in [`../../../../packages/storybook-addon`](../../../packages/storybook-addon). It exposes a runner bridge, scoring model, panel renderer, Storybook preset hooks, tests, and a CI workflow.

## Install

```bash
npm install -D @dsaf/storybook-addon
```

## Configure Storybook

```js
// .storybook/main.js
export default {
  addons: ["@dsaf/storybook-addon"]
};
```

## What It Runs

The addon uses the CLI runner [`../../../../scripts/bin/storybook-addon-runner.mjs`](../../../scripts/bin/storybook-addon-runner.mjs) for standalone mode.

- `check-coverage.mjs`
- `check-apca.mjs`
- `check-bundle-size.mjs`
- `check-doc-freshness.mjs`

## Criterion Map

| Check | Criteria |
|---|---|
| coverage | A7.1, A2.4, A5.4 |
| APCA | A8.1, B5.2 |
| bundle size | A9.1, B8.5 |
| doc freshness | A3.7 |

## Local Verification

```bash
npm run integ:storybook
npm --prefix packages/storybook-addon test
npm --prefix packages/storybook-addon run smoke
```

## Panel Behavior

The panel model includes:

- criterion ID and name
- score out of 5
- source check
- one-line rationale
- link to the matching DSAF deep-dive surface
- footer reminding users that addon-generated self-assessment scores cap publicly at DSAF Level L3 unless independently verified

## Troubleshooting

| Symptom | Fix |
|---|---|
| Panel has no rows | Run `npm run integ:storybook` and confirm the JSON has `criterion_map`. |
| Coverage is `not-applicable` | Run inside a target design-system repository with a `src/` directory. |
| APCA is `not-applicable` | Add `tokens/colour.tokens.json` to the target repository. |
| Bundle-size is `not-applicable` | Add packages under `packages/` with package manifests. |
| Deep-dive links 404 locally | Run `node scripts/bin/render-blog.mjs` before serving `landing/`. |

*End of Storybook integration doc.*
