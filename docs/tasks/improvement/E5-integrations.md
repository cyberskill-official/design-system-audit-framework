# E5 — Integrations (R34, R35)

Goal: the packages that already exist (Storybook addon, Figma plugin) and the hosted surface (audit.cyberskill.world) consume the now-stable `dsaf-scores/1` schema instead of carrying their own ad-hoc score logic. All P3: valuable, not load-bearing for the loop.

---

## IMP-501 · Storybook addon consumes `scores.json`

- Priority P3 · Owner @Agent[fix] · Effort M · Depends on IMP-001
- Status: todo

**Why.** `@dsaf/storybook-addon` predates engine v2; wiring it to `scores.json` puts per-criterion maturity in the tool designers already live in, and gives the audit a daily-visible surface instead of a quarterly report.

**Scope.**
1. Addon reads a configurable `scores.json` path (static file served with the Storybook build; no network dependency).
2. Panel: category roll-up with floors verdict; per-story parameter `dsaf.criteria: ["A2.4", ...]` renders those rows (score, bands, level, missing signals) beside the story.
3. Keep the existing addon checks green (`npm --prefix packages/storybook-addon test`, `integ:storybook`); extend its fixture with a real engine-v2 scores.json (generated from a calibration fixture, committed as an addon test fixture).
4. Version the addon 0.2.0; README with a 10-line setup.

**Acceptance criteria.**
- [ ] Addon smoke + tests green with a v2 scores.json fixture.
- [ ] A story parameterised with two criterion ids renders both rows (screenshot or DOM assertion in Evidence).
- [ ] Schema mismatch (wrong `schema` field) fails soft with a visible "re-run audit" notice, not a crash (negative test).

**Evidence / Review.** _(fill at execution)_

---

## IMP-502 · Figma plugin score summary

- Priority P3 · Owner @Agent[fix] · Effort M · Depends on IMP-501
- Status: todo

**Why.** Designers approve tokens and components without seeing audit state. A read-only summary card (combined, tier, floors, weakest three categories) inside the Figma plugin closes that visibility gap cheaply — no write-back, no sync ambitions (the CDS Figma write-flow stays a separate, deferred CDS finding).

**Scope.**
1. Plugin panel section rendering a pasted/imported `scores.json` (file picker or paste-JSON; Figma plugins cannot read local disk directly).
2. Validation + graceful degradation identical to IMP-501's mismatch behaviour; shared tiny validator extracted to `packages/rubric` accessor if IMP-302 has landed, inline otherwise.
3. Build stays green (`npm --prefix packages/figma-plugin build`).

**Acceptance criteria.**
- [ ] Paste a CDS scores.json → summary card renders combined/tier/floors + weakest categories.
- [ ] Invalid JSON and wrong-schema inputs produce the notice, never a crash.

**Evidence / Review.** _(fill at execution)_

---

## IMP-503 · Hosted benchmark ingest spec (R35)

- Priority P3 · Owner @Agent draft → @Human[decide] · Effort M · Depends on IMP-301
- Status: todo

**Why.** audit.cyberskill.world currently presents the methodology; ingesting `dsaf-scores/1` uploads would let teams compare against an anonymised distribution — the framework's network effect. Spec first, human decision on hosting/privacy before any implementation.

**Scope (draft only).**
1. Spec document under `docs/framework/bench/`: upload contract (schema validation, engine/rubric version floors, input_hash as dedup key), anonymisation rules (no repo names without opt-in; category-level aggregates only in public views), retention, abuse limits, and the self-audit cap displayed on every public number.
2. Alignment note with the existing hosted/lite benchmark specs in that directory (extend, don't fork, their survey model).
3. Explicit open questions list for the human decision (hosting, auth, cost ceiling, moderation).

**Acceptance criteria.**
- [ ] Spec drafted with schema examples validating against a real scores.json.
- [ ] Privacy/anonymisation rules reviewed by human; decision on build/don't-build recorded.
- [ ] No implementation before that decision (hard stop).

**Evidence / Review.** _(fill at execution)_
