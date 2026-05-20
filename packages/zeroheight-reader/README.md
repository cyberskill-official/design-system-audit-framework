# @dsaf/zeroheight-reader

`@dsaf/zeroheight-reader` scores local zeroheight static HTML exports against the DSAF documentation and tooling subset.

It does not log in to zeroheight, scrape zeroheight.com, or send customer documentation to any service. Export your zeroheight site as static HTML, then run the reader on the local directory or on a single `index.html` file.

## Install

```bash
npm install -D @dsaf/zeroheight-reader
```

From this repository:

```bash
npm --prefix packages/zeroheight-reader test
npm --prefix packages/zeroheight-reader run smoke
npm run integ:zeroheight -- packages/zeroheight-reader/tests/fixtures/zeroheight-export-sample
```

## CLI

```bash
npx @dsaf/zeroheight-reader path/to/zeroheight-export/
npx @dsaf/zeroheight-reader path/to/zeroheight-export/index.html
```

The CLI emits JSON with:

- `checks`: keyed criteria with score and evidence.
- `criterion_scores`: an array contract suitable for integration with the Storybook addon.
- `audit_targets`: the compact score map used by DSAF automation.
- `footer`: the public self-assessment cap disclosure.

## Scope

The reader only scores ten criteria that are observable from zeroheight export HTML:

- `A3.1` Usage guidelines
- `A3.2` Code examples
- `A3.3` Do's and Don'ts
- `A3.4` Accessibility notes
- `A3.5` Contribution guide
- `A3.6` Search and navigation
- `A3.7` Documentation freshness
- `A5.1` Figma library integration
- `A5.2` Code package integration
- `A5.4` Storybook integration

Scores are evidence for a DSAF audit. They do not replace human review, and public DSAF Level claims still cap at L3 without third-party verification.
