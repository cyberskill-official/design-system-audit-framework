# TASK-BENCH-002 - Hosted Benchmark

**Canonical URL:** `https://benchmark.audit.cyberskill.world`
**Repo-verifiable state:** hosted benchmark specification ready; production subdomain and storage require operator deployment.

## Product Surface

The hosted benchmark extends the lite static benchmark with:

- Addressable result URLs.
- Organization-private history.
- Low-N-safe peer comparisons.
- Annual-report export pipeline for TASK-REPORT-001.
- Optional Pro workspace for teams that want repeat scoring.

## Privacy Contract

- No public segment appears with fewer than 30 responses.
- Organization names are private unless explicitly opted in.
- Free-text responses are excluded from public aggregate exports by default.
- Erasure and access requests use the submission ID from the lite benchmark flow.

## Deployment Checklist

1. Point `benchmark.audit.cyberskill.world` to the hosted benchmark project.
2. Provision database with row-level access controls.
3. Set a quarterly export job for low-N-safe aggregate data.
4. Add report-material review before any annual public chart ships.

