# zeroheight Export Reader

**Status:** repo-shipped package. **task:** TASK-INTEG-003. **Package:** `@dsaf/zeroheight-reader`.

The zeroheight reader scores local zeroheight static HTML exports against the DSAF criteria that can be observed from documentation output. It never scrapes `zeroheight.com`, never logs in to a customer account, and never uploads customer documentation.

## What It Scores

The reader emits scores for ten criteria only:

| Criterion | Signal |
|---|---|
| `A3.1` | Component usage guidelines, anatomy, and decision guidance |
| `A3.2` | Code examples with install/import evidence |
| `A3.3` | Do's and Don'ts guidance |
| `A3.4` | Accessibility notes covering ARIA, keyboard, and screen-reader/focus guidance |
| `A3.5` | Contribution guide with RFC/proposal/review/decision language |
| `A3.6` | Search, sidebar navigation, and breadcrumbs |
| `A3.7` | Last-updated or reviewed dates |
| `A5.1` | Figma library/embed evidence |
| `A5.2` | Code package/snippet evidence |
| `A5.4` | Storybook embed plus viewport/theme evidence |

The reader must not score criteria outside A.3 and A.5.

## Local Use

Run against a zeroheight export directory:

```bash
npm run integ:zeroheight -- path/to/zeroheight-export/
```

Run against a single HTML export:

```bash
npm run integ:zeroheight -- path/to/zeroheight-export/index.html
```

Run the package checks from this repository:

```bash
npm --prefix packages/zeroheight-reader test
npm --prefix packages/zeroheight-reader run smoke
npm run integ:zeroheight -- packages/zeroheight-reader/tests/fixtures/zeroheight-export-sample
```

## Output Contract

The CLI prints JSON containing:

- `checks`: keyed criterion results with rationale/evidence.
- `criterion_scores`: array output matching the Storybook integration scoring contract.
- `audit_targets`: compact criterion-to-score map.
- `footer`: the DSAF public self-assessment cap disclosure.

These scores are audit evidence. Human review is still required before publishing maturity claims, and public DSAF Level claims cap at L3 without third-party verification.
