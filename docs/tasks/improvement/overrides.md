# No-silent-regression override register (TASK-CORE-002)

Signed override rows for score regressions accepted under the [regression policy](../../framework/05-regression-policy.md). A regression may only land when a row exists here (framework runs) or in the target's own register (CDS: `docs/audit-overrides.md`, created on first use). `audit-diff --allow-regressions` without a corresponding row is a process violation, not an override.

Cause enum: `rubric-tightened` (`D-RT`, DYNAMIC rows only, no approver needed) · `fix-side-effect` (`OVRD-FSE`) · `external-dependency-change` (`OVRD-EDC`) · `deliberate-policy-tradeoff` (`OVRD-DPT`). Everything else stays `UNRESOLVED` and blocks sign-off. The approver writes the Notes paragraph personally.

| Criterion | Pre | Post | Delta | Cause | Approver | Date | Tag | Notes |
|---|---:|---:|---:|---|---|---|---|---|
| EXAMPLE `A9.1` | 52 | 44 | 8 | `deliberate-policy-tradeoff` | `<name>` | 2026-07-06 | `OVRD-DPT` | EXAMPLE ROW — budget floor consciously raised while a new measurement script lands; follow-up filed as IMP-xxx. Replace with real rows; never delete history. |
