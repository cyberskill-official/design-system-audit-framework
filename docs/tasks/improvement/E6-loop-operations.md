# E6 — Loop operations & target-side evidence

Goal: take the loop from "built and verified locally" to "running in production, with the human-evidence frontier moving". Cross-repo tasks execute in the sibling `design-system` checkout but are tracked here — one loop, one queue.

---

## IMP-001 · Merge + push both branches

- Priority P0 · Owner @Human[manual] · Effort S · Depends on —
- Status: todo

**Why.** Everything downstream (CI proof, npm, weekly crons) waits on the two branches reaching GitHub. The sandbox cannot push; this is Stephen's keyboard.

**Steps.**
```bash
cd ~/Projects/CyberSkill/design-system-audit-framework
git checkout main && git merge --no-ff auto/csaf-evolution && git push origin main

cd ~/Projects/CyberSkill/design-system
git checkout main && git merge --no-ff auto/audit-loop && git push origin main
# plus the older unpushed v1.5.x commits + tag noted in HANDOFF.md:
git push origin v1.5.0 || true
```

**Acceptance criteria.**
- [ ] Both `main` branches on GitHub contain the evolution commits (`8b482be`, `e4d4da1` or their merge commits).
- [ ] Branch cleanup done (`git branch -d auto/...` after merge).

**Evidence / Review.** _(fill at execution)_

---

## IMP-002 · First CI proof on GitHub

- Priority P0 · Owner @Human[manual] (agent can pre-verify locally) · Effort S · Depends on IMP-001
- Status: todo

**Why.** The conformance workflow never ran before (wrong path filters); the CDS audit job and both weekly crons have never executed on GitHub infrastructure. One witnessed green run each turns "should work" into "works".

**Steps.**
1. Framework: Actions → "DSAF Conformance Agent" should have fired on the push; confirm 18/18 verify green. Trigger "DSAF Self-Evolution" via workflow_dispatch once; confirm proposals artifact uploads.
2. CDS: confirm `verify` + `audit` jobs green on the push (audit clones framework main — now current). Download the `csaf-audit-report` artifact and skim the floors table.
3. Record run URLs below.

**Acceptance criteria.**
- [ ] 4 green runs recorded (conformance, self-evolution, CDS verify, CDS audit).
- [ ] CDS audit artifact shows floors PASS and 0 regressions against the committed baseline.

**Evidence / Review.** _(fill at execution)_

---

## IMP-003 · Arm the override register

- Priority P0 · Owner @Agent[fix] · Effort S · Depends on —
- Status: todo

**Why.** `audit-diff --allow-regressions` is the designed escape hatch, but the signed override rows (TASK-CORE-002) currently have no canonical home in either repo. Without a register, the flag is a bypass; with one, it is a signature.

**Scope.**
1. Seed [overrides.md](overrides.md) in this directory (done at backlog creation — verify its table shape matches the policy's override-log columns).
2. `audit-diff.mjs`: when `--allow-regressions` is passed, print the exact row template to paste into the register (criterion, pre, post, delta, cause enum, approver, date, tag) and the register path; add a `--register <path>` informational flag that prints where the row belongs per repo (framework: docs/improvement/overrides.md; targets: their own docs/audit-overrides.md).
3. CDS wrapper `scripts/audit.mjs`: same reminder on the failure path ("fix the target, or record a signed override row and update the baseline in the same PR").
4. Add one worked example row (marked EXAMPLE) to the register.

**Acceptance criteria.**
- [ ] `--allow-regressions` output contains a copy-pasteable register row.
- [ ] Framework verify green; CDS wrapper prints the reminder on a simulated regression (negative test reusing the /tmp doctored-scores technique).

**Evidence / Review.** _(fill at execution)_

---

## IMP-004 · Local hygiene (2 nits)

- Priority P0 · Owner @Human[manual] · Effort S · Depends on —
- Status: todo

**Why.** Two leftovers the sandbox cannot delete (mount blocks unlink): the dangling `workflows` symlink at the CDS root, and the stale pre-v2 outputs under the framework's gitignored `docs/outputs/generated/maximal-cases/`.

**Steps.**
```bash
rm ~/Projects/CyberSkill/design-system/workflows
rm -rf ~/Projects/CyberSkill/design-system-audit-framework/docs/outputs/generated/maximal-cases
```

**Acceptance criteria.**
- [ ] Both paths gone; `git status` clean in both repos afterwards.

**Evidence / Review.** _(fill at execution)_

---

## IMP-601 · CDS quarterly LLM SCAN reconciled with the engine floor

- Priority P1 · Owner hybrid (@Agent runs SCAN + drafts reconciliation, @Human[decide] signs) · Effort L · Depends on IMP-001
- Status: todo

**Why.** CDS currently carries two numbers: the manual SCAN's 80.3% (L3, published) and the engine baseline's 91/100 (L5 internal, publication-capped at L3). Two truths invite misquotation. The quarterly cycle should produce ONE published statement with a documented derivation.

**Scope.**
1. Run the full LLM SCAN (framework prompts) against CDS, feeding the engine's `meta/audits/<date>/` evidence (report + scores.json + evidence-index) in as the SCAN's evidence floor — the SCAN may lower a claim below the engine only by citing evidence the probes over-credited, and must attach human evidence to raise any MANUAL row.
2. Produce the reconciliation table: per category — engine level, SCAN anchor, published claim, derivation note.
3. Draft the publication statement (README §1 state table + CHANGELOG entry) using the self-audit cap correctly: internal scores may be quoted with the cap sentence attached; the headline stays ≤ L3 until IMP-603.
4. Human signs §9 of the SCAN report; register row in `meta/audits/_history.md`; baseline updated via `npm run audit:baseline` in the same PR if scores moved.

**Acceptance criteria.**
- [ ] SCAN report complete with the reconciliation table; every divergence ≥ 1 level carries a derivation note.
- [ ] One published statement lands in README/CHANGELOG; no second competing number anywhere in the three canonical files.
- [ ] Human signature recorded; baseline and trend register updated together.

**Evidence / Review.** _(fill at execution)_

---

## IMP-602 · CDS MANUAL-evidence register scaffold

- Priority P1 · Owner @Agent scaffold → @Human[manual] evidence · Effort M · Depends on —
- Status: todo

**Why.** The engine caps 9 MANUAL criteria at ≤ 60 until dated human evidence exists (B1 user research ×7, A7.1 production coverage review, B10.7). This is now CDS's true score frontier — and it needs a place where evidence accumulates in the auditable shape the framework demands (named person/role, method, scope, sample, limitations, confidence, follow-up owner, date).

**Scope (agent).**
1. Scaffold `docs/manual-evidence.md` in the CDS repo: one section per MANUAL criterion id with the required-proof field template, empty rows, and instructions.
2. Extend the CDS audit wrapper: after each run, list MANUAL rows still lacking register entries (simple cross-check by id against the register file) — informational output, never a gate.
3. Draft the first three evidence-collection briefs for the human (e.g. B1.1 method-diversity: what a compliant 1-page study record looks like for a Vietnamese-first SMB user base; A7.1: how to snapshot production coverage % from one downstream project).

**Scope (human).** Actually run/record the research sessions, coverage reviews, and sign the rows. This part has no shortcut and no agent path.

**Acceptance criteria.**
- [ ] Register scaffold committed with all 9 MANUAL ids and field templates.
- [ ] Wrapper prints missing-evidence summary (demo in Evidence).
- [ ] Three collection briefs drafted; first human evidence row targeted for the IMP-601 cycle.

**Evidence / Review.** _(fill at execution)_

---

## IMP-603 · Third-party verification path (lift the L3 cap)

- Priority P3 · Owner @Human[manual] · Effort L · Depends on IMP-601
- Status: todo

**Why.** The self-audit policy caps every publicly cited level at L3 regardless of internal scores. Only an external review lifts it — and per the maturity-tier doc, accessibility claims specifically need a vendor letter for legal weight (EAA/EN 301 549 exposure for enterprise sales).

**Scope.** Scope and procure an external review: minimum viable = independent WCAG 2.2 AA audit of the 6 core components + gallery (lifts A8/B5 claims); fuller = a third party runs the DSAF SCAN end-to-end and signs it. Agent support limited to preparing the evidence package (reports, scores, baselines, screenshots) once a vendor is chosen.

**Acceptance criteria.**
- [ ] Vendor shortlist + budget decision recorded.
- [ ] After delivery: signed external report on file; published claims updated with the citation; cap note replaced by the verifier reference.

**Evidence / Review.** _(fill at execution)_
