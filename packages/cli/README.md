# dsaf

`dsaf` is the Core 25 command line scanner.

```bash
npx dsaf scan
npx dsaf scan path/to/repo --json
npx dsaf scan --json path/to/repo
```

The scanner is deliberately fast and conservative. It walks text-like files, looks for observable evidence for the 25 DSAF Core criteria, returns a score, and repeats the self-audit public cap in the output.

It is not a signed third-party audit. Treat the result as a first-pass screenshot artifact and use the full DSAF Criteria when you need citations, human review, and a signed report.

## Local verification

```bash
npm --prefix packages/cli test
npm --prefix packages/cli run smoke
node packages/cli/src/cli.js scan . --json
```
