# dsaf Changelog

## Unreleased

- Parses `scan` arguments with a structured parser, so flags may appear before or after the scan path and unknown flags fail clearly.

## 0.1.0

- Adds `dsaf scan [path] [--json]` for fast DSAF-25 Core scoring.
- Caps public self-audit output at L3 unless third-party verification exists.
