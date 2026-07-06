# E3 — Distribution (R32)

Goal: targets consume the audit without cloning the framework — `npx @cyberskill/dsaf audit`, a pinnable rubric-as-data package, and a reusable GitHub Action. Distribution also freezes public schemas (`dsaf-scores/1`), so it lands after the P1 integrity work.

---

## IMP-301 · Publish `@cyberskill/dsaf` CLI to npm

- Priority P2 · Owner @Agent prep → @Human[manual] publish · Effort M · Depends on IMP-001
- Status: todo

**Why.** The CDS CI job clones this repo at head — workable for one target, wrong for many: no version pinning, no provenance, and engine majors can break consumers overnight. npm distribution gives targets `npx @cyberskill/dsaf@2 audit` with semver guarantees (audit-diff already refuses cross-major comparisons).

**Scope (agent).**
1. Rework `packages/cli` to wrap the current engine: subcommands `audit` (runMaximalAudit), `diff` (audit-diff), `init` (audit-init), `mine` (evolution-mine); the rubric ships inside the package (see IMP-302) so the CLI is self-contained.
2. Remove/flag the legacy Gemini "auto-fixer" surface in `packages/cli` (predates engine v2; keep behind `--experimental` or delete — propose, human decides).
3. Package hygiene: `files` whitelist, `bin`, `engines.node >= 20`, README with the three-command quickstart, version `2.0.0` aligned to `ENGINE_VERSION`, provenance-ready (`publishConfig.provenance: true`).
4. Dry-run gate: `npm pack` + install into a temp dir + `npx dsaf audit` against a vendored fixture inside CI (extend a workflow).
5. Prepare the release checklist for the human: npm org/2FA, `npm publish --access public`, tag `cli-v2.0.0`.

**Scope (human).** Create/confirm the npm scope, review the pack contents, run the publish, store credentials per company policy.

**Acceptance criteria.**
- [ ] `npm pack` artifact installs standalone and audits a fixture offline (demo in Evidence).
- [ ] CLI version locked to `ENGINE_VERSION` by a check (mismatch fails verify).
- [ ] Legacy auto-fixer disposition decided and recorded.
- [ ] Human publish completed; `npx @cyberskill/dsaf --help` output pasted into Evidence.

**Evidence / Review.** _(fill at execution)_

---

## IMP-302 · Rubric-as-data package

- Priority P2 · Owner @Agent[fix] · Effort M · Depends on IMP-103
- Status: todo

**Why.** The rubric today is a Markdown table parsed at runtime. Consumers (CLI, Action, Storybook addon, hosted benchmark) need the same rows as versioned data with a stable schema — and IMP-103's version contract gives the compilation step its integrity guarantee.

**Scope.**
1. Build step `scripts/bin/compile-rubric.mjs`: parses `03-full-criteria.md` (+ `dsaf-25.md` core ids, + `criteria-aliases.md`) into `packages/rubric/rubric.json` — `{ schema: "dsaf-rubric/1", dsaf_125_version, categories: [...], criteria: [{id, text, tag, type, anchors, category, weight, dsaf25: bool}], aliases: [...] }`.
2. The engine loads the compiled JSON when present (single parse path), falling back to Markdown parsing for in-repo dev; a contract asserts compiled JSON ↔ Markdown equivalence so the two can never drift.
3. Package `@cyberskill/dsaf-rubric` (private until IMP-301 publishes) exporting the JSON + a tiny typed accessor.

**Acceptance criteria.**
- [ ] `rubric.json` regenerates deterministically (byte-identical across two runs).
- [ ] Equivalence contract fails when Markdown and JSON diverge (negative test in Evidence).
- [ ] Engine behaviour unchanged (calibration corpus scores identical pre/post; audit-diff shows 0 delta).

**Evidence / Review.** _(fill at execution)_

---

## IMP-303 · GitHub Action v1

- Priority P3 · Owner @Agent[fix] · Effort L · Depends on IMP-301
- Status: todo

**Why.** CDS hand-rolled its CI audit job; every other target shouldn't have to. An action encapsulates: run audit → compare to committed baseline → PR comment with the category roll-up → fail on unapproved regressions.

**Scope.**
1. Rebuild `packages/github-action` around the npm CLI (drop the `@google/genai` dependency path from the legacy action — propose disposition, human decides).
2. Inputs: `baseline-path` (default `docs/audit-baseline.json`), `profile`, `fail-on-regression` (default true), `comment` (default true on PRs). Outputs: `combined`, `tier`, `enterprise_grade`.
3. PR comment renders the floors table + top regressions/improvements from `AUDIT_DIFF.md`.
4. Dogfood: replace the hand-rolled job in the CDS `ci.yml` with the action (separate PR in the sibling repo, referenced from Evidence).

**Acceptance criteria.**
- [ ] Action runs green on a fixture repo (workflow run link in Evidence).
- [ ] Regression path verified: doctored baseline → action fails + comments (negative test).
- [ ] CDS migration PR prepared (not merged by the agent).

**Evidence / Review.** _(fill at execution)_
