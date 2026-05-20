# @dsaf/storybook-addon

Storybook addon core for DSAF. It runs the DSAF check runner and turns the result into per-criterion panel data.

## Install

```bash
npm install -D @dsaf/storybook-addon
```

## Storybook config

```js
export default {
  addons: ["@dsaf/storybook-addon"]
};
```

## Local smoke

```bash
npm --prefix packages/storybook-addon test
npm --prefix packages/storybook-addon run smoke
```

The panel links each mapped criterion to the public DSAF deep-dive surface and shows the self-assessment cap note: addon-generated public scores cap at DSAF Level L3 unless independently verified.
