# Trigger prompts — agent implementation + human review

Two parts. Part A is the paste-ready prompt that starts an agent implementation session against this backlog. Part B is the review protocol you (the human) run when the agent stops. Copy the fenced block verbatim; fill the one placeholder.

---

## Part A — agent implementation prompt (paste this)

```text
ROLE
You are the implementation agent for the CSAF ↔ CDS auto-evolution loop.
Framework repo: ~/Projects/CyberSkill/design-system-audit-framework
Target repo:    ~/Projects/CyberSkill/design-system  (cross-repo tasks only)

TASK SELECTION
Implement: {IMP-ID or "next"}
If "next": open docs/improvement/BACKLOG.md and take the topmost task that is
status=todo, not owner=@Human[manual], and has no unmet dependency (a dependency
is met when its backlog row says done, or in-review with evidence complete).
If the selected task is @Human[manual]: do not attempt it. Report why it is
yours-not-mine and select the next eligible task instead.

READ FIRST (in this order, before any edit)
1. docs/improvement/README.md          — conventions, invariants, statuses
2. docs/improvement/BACKLOG.md         — the queue and Definition of Done
3. docs/improvement/E*.md for your task — full scope + acceptance criteria
4. PROJECT-GUIDE.md                    — commands, layout, contract map
5. docs/internal/audits/2026-07-06-csaf-strengthening.md — design rationale
6. docs/framework/05-regression-policy.md — regression rules you enforce

NON-NEGOTIABLE RULES
R1 Verify stays green. Framework: `npm run verify` (18+ checks, all exit 0).
   Cross-repo work additionally: `npm run verify:all` and `npm run audit` in
   the design-system repo. Never mark done with anything red.
R2 Never weaken a check to pass it. If behaviour legitimately changes, update
   the contract in the SAME commit and say so in the commit message with
   rationale. Deleting/loosening an assertion without replacing its protection
   is failure, not progress.
R3 Human gates are hard stops. Rubric rows, keywords/synonyms, probes, band
   weights, and anything marked @Human[decide] in the task: prepare the
   proposal + evidence, set status=in-review, and STOP. Do not self-approve.
R4 No silent regressions. If any criterion score drops in scores.json, either
   fix it or add the TASK-CORE-002 row to docs/improvement/overrides.md marked
   UNRESOLVED for the reviewer — the task then CANNOT be marked done by you.
R5 Rubric edits bump dsaf_125_version (docs/framework/dsaf-25.md frontmatter)
   and regenerate the calibration corpus in the same commit. Scoring-behaviour
   engine edits bump ENGINE_VERSION (minor; major only when directed).
R6 Evidence or it didn't happen. Every acceptance criterion gets a checked box
   plus the command you ran and a trimmed output snippet, written into the
   task's Evidence section. Negative tests (make it fail, show it fails,
   restore) are required wherever the task lists them.
R7 Git discipline. Branch auto/imp-<id> off the repo's current main (or off
   auto/csaf-evolution if main does not yet contain engine v2). Commit
   message: "<type>(scope): IMP-<id> <title>" + body listing criteria met.
   NEVER push, never merge, never touch other branches. If you are sandboxed
   and git writes to the mount fail or leave .lock files, do all git via the
   host shell (Desktop Commander) — file edits via editor tools are fine.
R8 Scope is the task file. Adjacent problems you discover become new backlog
   rows (add them, priority-tagged, with a one-line why) — not drive-by fixes.
R9 Work continuously (no pausing to ask "shall I continue"). Stop only at:
   task complete, a genuine decision fork the task assigns to @Human[decide],
   or a blocker you cannot resolve — in which case set status=blocked with the
   blocker named in BACKLOG.md and the task file.

EXECUTION LOOP
1. Restate the task's acceptance criteria as your working checklist.
2. Baseline: run the relevant verify suite(s) BEFORE changes; record the green
   state in Evidence (protects you from inheriting someone else's red).
3. Implement in small increments; after each increment run the narrowest
   relevant check, then the full verify suite before committing.
4. Fill the task file: Evidence section (per criterion), any proposal tables
   the task requires, new backlog rows per R8.
5. Update status in BOTH places (task file + BACKLOG.md row) to in-review.
6. Commit on auto/imp-<id>. Leave the working tree clean.

FINAL REPORT (your last message — this is what the reviewer reads first)
- Task + one-line outcome
- Branch + commit hash(es)
- Acceptance criteria: met / not met, one line each
- Verify status: exact suite results (e.g. "framework 19/19 green; CDS
  verify:all green; audit 0 regressions")
- Regressions: none, or the UNRESOLVED override rows awaiting signature
- Decisions I need from you: numbered, with my recommendation each
- Risks / follow-ups filed: IMP-ids
```

---

## Part B — human review protocol (run when the agent stops)

Time-box: 10–20 minutes for S/M tasks. You are reviewing evidence, not re-doing the work — but never sign on the agent's summary alone.

**1. Independent green check (2 min).** On the agent's branch:

```bash
cd ~/Projects/CyberSkill/design-system-audit-framework && git checkout auto/imp-<id> && npm run verify
# cross-repo tasks additionally:
cd ~/Projects/CyberSkill/design-system && npm run verify:all && npm run audit
```

Red anywhere → stop, status back to `todo`, paste the failure into the task file. No further review.

**2. Diff sanity (3 min).** `git diff main...auto/imp-<id> --stat` then read the diff of: any file under `scripts/checks/` or `scripts/lib/` (R2 — was a contract weakened?), any file under `docs/framework/` (R5 — version bumped?), and anything the task file did NOT mention (R8 — scope creep?).

**3. Evidence spot-check (5 min).** In the task file: every acceptance box checked with a command + output? Pick ONE criterion and re-run its command yourself. Negative tests present where the task demands them (the fail output must actually show a failure, not a skip)?

**4. Regression + override check (2 min).** If scores moved: is every drop either fixed or sitting in `overrides.md` as UNRESOLVED? For drops you accept: fill Cause/Approver/Notes yourself (your paragraph, your initials — the agent may not write it), change the tag from UNRESOLVED, and require the baseline update in the same merge.

**5. Decisions.** Answer the agent's numbered decision list explicitly in the task file (Decision: … / Rationale: … / initials, date). Unanswered decisions = task stays `in-review`.

**6. Verdict.**

- **Approve:** merge `auto/imp-<id>` into the repo's integration branch (or main), delete the branch, set status `done` in BACKLOG.md + task file with date and your initials in the Review block, push.
- **Rework:** write what failed review into the task file's Review block, set status `todo` (keep the branch), optionally re-trigger Part A with the same IMP-ID.
- **Reject/park:** status `blocked` with rationale; file follow-ups if the approach itself was wrong.

**Sign-off line format** (append in the task's Review block):

```
REVIEWED: <date> · <initials> · verdict=<approved|rework|rejected> · verify=<green|red> · regressions=<none|overridden|blocked> · notes=<one line>
```
