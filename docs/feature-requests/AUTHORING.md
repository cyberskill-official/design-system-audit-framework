# FR Authoring Discipline — Design System Audit Framework (DSAF)

**Source of truth.** This file is normative for every Feature Request in `docs/feature-requests/`. It supersedes any prior ad-hoc patterns.

**Created:** 2026-05-17 alongside the inaugural backlog derived from `docs/Design System Audit Framework — Multi-Phase Improvement Plan.md`. Adapted from the equivalent CyberOS playbook so this project is self-contained — no cross-project paths required.

The key words **MUST**, **MUST NOT**, **REQUIRED**, **SHALL**, **SHALL NOT**, **SHOULD**, **SHOULD NOT**, **RECOMMENDED**, **NOT RECOMMENDED**, **MAY**, and **OPTIONAL** in this document are to be interpreted as described in BCP 14 (RFC 2119, RFC 8174) when, and only when, they appear in all capitals.

---

## §0 — The Master Rule

> **After creating one FR, loop audit rounds on it until it reaches *perfect* — before starting the next FR.**

This is the single load-bearing discipline. Everything else in this document is subordinate to it.

### What "perfect" means

Perfect = **highly detailed** AND **perfectly matched to core requirements** AND **complete** AND **no truncation**.

- **Highly detailed**: every doctrine change is named, every contract surface is enumerated, every failure/regret mode is listed.
- **Perfectly matched to core requirements**: the spec covers what the FR is *for* — no scope creep, no scope under-coverage. The §1 normative clauses fully express the contract that downstream FRs depend on.
- **Complete**: all 11 sections present and substantive. No `(elided)`, no `(see other FR)` cross-references that hide the contract.
- **No truncation**: no "summary form," no "compact form due to context budget," no "abridged for brevity." If the author runs into a budget limit, the right action is to **stop, save state, and resume later** — never to ship a truncated FR.

### The Loop

1. **First-pass author** the FR per the 11-section template (§1 below).
2. **Author the audit file** at `<spec-stem>.audit.md` — find at least 6 ISS-xxx findings; score the spec honestly.
3. **If `score_post_revision < 10/10`**: revise the FR addressing every finding.
4. **Re-audit** the revised spec.
5. **Repeat** steps 3–4 until `score_post_revision: 10/10`.
6. **Only then** start the next FR.

### Why this rule first

- **Drift compounds.** A spec with one ambiguity invites a second; downstream FRs that depend on it inherit the ambiguity.
- **Re-entry cost.** Returning to a half-spec'd FR weeks later costs 3× the time of finishing it now — the author has lost the mental model.
- **Audit-trail integrity.** Every accepted FR claims `score_post_revision: 10/10`. If some accepted FRs are quietly 8/10 (truncated, summary-form), the score loses its meaning.
- **Reviewer confidence.** The reciprocal-spec promise is "10/10 means it shipped to spec." Sliding the bar breaks that promise.

### How to apply

When tempted to ship a compact FR:

| Temptation | What to do instead |
|---|---|
| "Context budget is tight" | Pause; save state; resume in a fresh session. Don't truncate. |
| "This is a small FR" | If small, then ≤ 300 lines spec is fine AS LONG AS it's complete (all 11 sections present, each meaningful). The size cap isn't the issue — truncation is. |
| "I've established the pattern already; this FR can lean on it" | Use cross-FR primitives via §7 dependencies, but the FR's own §1–§11 must still be self-contained. A reader should not need to open the dependency FR to understand THIS FR's contract. |
| "I'm running many FRs in this session; I'll come back and polish" | The rework is 3× more expensive later. Loop to 10/10 NOW. |

### Exceptions

There are **two** sanctioned exceptions to the size/depth target. Both must be explicit in the FR title AND the audit file:

1. **Stub FRs.** An FR whose explicit purpose is to reserve a module slot / criterion ID / API namespace for a later phase. The stub MUST fully spec the stub contract (the no-op behaviour, the "DeferredToP<n>" outcome). Acceptable ≤ 300 lines.
2. **Pure-doctrine / single-file FRs.** Where the contract surface is small (e.g. renaming one variable, adding one criterion to `03-criteria-part-a.md`, adopting one new outreach channel). Acceptable ≤ 400 lines.

Neither exception authorises *truncation* — both still require all 11 sections, just at a smaller-but-complete scale.

---

## §1 — Mandatory FR template (11 sections)

Every FR file MUST contain these 11 sections, in order, with the canonical headings:

### §0 — Frontmatter

```yaml
---
id: FR-<MODULE>-<NUMBER>
title: "<one-line subject, ≤ 120 chars>"
module: <CORE | BRAND | DOCS | GOV | LAUNCH | INTEG | CLI | BENCH | AUDIT | FUNNEL | SAAS | VERT | CERT | REPORT>
priority: <MUST | SHOULD | COULD | MAY>
status: <draft | accepted | building | shipped | deferred | rejected | superseded>
verify: <T | I | A | D>
phase: <P0 | P1 | P2 | P3 | P4 | P5 | P6>
milestone: <P<n> · slice <m>>
slice: <integer>
owner: <person name or role>
created: <YYYY-MM-DD>
shipped: null
related_frs: [FR-..., FR-...]
depends_on: [FR-..., FR-...]
blocks: [FR-..., FR-...]
source_pages:
  - <URL or repo-relative path>
source_decisions:
  - <DEC-NNN (one-line description)>
language: <none | markdown | typescript | nodejs | bash | ...>
service: <repo path or "doctrine">
new_files:
  - <path>
modified_files:
  - <path>
allowed_tools:
  - <description>
disallowed_tools:
  - <description>
effort_hours: <integer>
sub_tasks:
  - "<time-grained task>"
risk_if_skipped: "<one paragraph>"
---
```

**Frontmatter rules:**
- The `verify` legend is `T=test, I=inspection (visual/manual), A=analysis, D=demonstration`. For doctrine-only FRs, `I` is usually correct.
- Comments MUST be on their own line (never `priority: MUST   # comment`). Trailing comments break YAML parsers.
- `effort_hours` MUST be populated. If unknown, use the closest 2h-grain estimate.
- `depends_on` and `blocks` MUST be reciprocal — see §3 sub-rule 2.
- Any `depends_on:` / `blocks:` entry pointing at a non-existent FR MUST carry `# placeholder — not yet specified` inline.

### §1 — Description (BCP-14 normative)

Numbered list of `MUST` / `SHOULD` / `MAY` clauses. Each clause SHOULD be 2–4 sentences. Together they MUST fully express the contract.

### §2 — Why this design (rationale for humans)

One paragraph per non-obvious design decision, named after the §1 clause it justifies. Format: `**Why <design choice> (§1 #N)?** <rationale>`.

### §3 — API contract / file shape / doctrine contract

For software FRs: code blocks (types, traits, schemas, REST endpoints) — concrete, not pseudo-code.

For doctrine FRs (most CORE/BRAND/DOCS/GOV work in this repo): the exact markdown / YAML / JSON shape that lands in the repo, copy-pastable. Show the before/after diff if the change touches an existing file.

### §4 — Acceptance criteria

Numbered list of testable conditions. Each AC MUST be a single sentence beginning with a bold descriptor: `**README first 200 words readable** — a colleague unfamiliar with the project can summarise the repo's purpose in two sentences after a 60-second skim.`

### §5 — Verification

For software FRs: code blocks showing how each AC is verified (test bodies, CLI commands).

For doctrine/marketing FRs: the exact validation steps — e.g., grep commands, link-checker invocation, third-party reviewer questions, the heuristic a human reviewer uses, the screenshot that proves the change landed.

### §6 — Implementation skeleton

For software FRs: orchestrator code or file contents.

For doctrine/marketing FRs: the operator playbook — e.g., "step 1: edit `docs/02-framework.md` §4 per §3 above; step 2: open PR; step 3: tag two reviewers; step 4: announce on release notes."

If §3 already contains the full landing artefact (common for single-file doctrine FRs), §6 MAY simply read `(API contract above is the skeleton.)`.

### §7 — Dependencies

Bulleted list of upstream + downstream + cross-module FRs the spec depends on. External vendor dependencies (Vercel, Storybook, Cal.com, GitHub Actions) also live here.

### §8 — Example payloads

For software FRs: JSON request/response bodies, log lines, event shapes.

For doctrine/marketing FRs: the rendered output — example weekly newsletter, example PR review template, example sign-off block. The reader should be able to grade the FR by comparing the example to the result.

### §9 — Open questions

`All resolved.` if none. Otherwise `Deferred:` prefix + each item with slice/phase reference.

### §10 — Failure modes inventory

Table with columns `Failure | Detection | Outcome | Recovery`. **At least 10 rows** for a substantive FR. Cover every architectural/strategic decision's failure path. For marketing/launch FRs this is the *risk register*: HN backlash, deplatforming, key-person illness, vendor change.

### §11 — Implementation notes

Bulleted notes: "the why behind the how" — tradeoffs that future maintainers might second-guess. Often the place to log the *interpretation* you chose between two valid readings of the source plan.

### Section terminator

End with `*End of FR-<MODULE>-<NUMBER>.*` on its own line.

---

## §2 — Mandatory audit-file template

Every spec MUST have a matching audit at `<spec-stem>.audit.md`. Structure:

```markdown
---
fr_id: FR-<MODULE>-<NUMBER>
audited: <YYYY-MM-DD>
verdict: PASS (after revision)
score_pre_revision: <X/10>
score_post_expansion: <Y/10>
score_post_revision: 10/10
issues_resolved: 6
template: dsaf-spec@1
---

## §1 — Verdict summary

<one paragraph: lines, §1 clause count, AC count, failure-mode count, dependency count>

## §2 — Findings (all resolved)

### ISS-001 — <one-line concern>
<explanation>. Resolved: <fix reference>; AC #N.

### ISS-002 — <one-line concern>
<explanation>. Resolved: <fix reference>; AC #N.

[... at least 6 ISS entries ...]

## §3 — Resolution

All 6+ mechanical concerns addressed. **Score = 10/10.**

---

*End of FR-<MODULE>-<NUMBER> audit.*
```

**Audit rules:**
- `score_post_revision: 10/10` is the only acceptable shipping score.
- Below-6-ISS audits are a red flag — author didn't pressure-test the spec.
- Every ISS finding MUST cite the resolution location (`§1 #N`, `§3`, `AC #N`).
- The audit lives + dies with the spec; never delete an audit when superseding a spec.

---

## §3 — Sub-rules (mechanical checks)

These are rules the master rule (§0) tends to surface naturally if followed. They are listed here as a checklist so they don't have to be rediscovered each session.

### §3.1 — Frontmatter (MUST)

1. **`status` field MUST be one of** `draft | accepted | building | shipped | deferred | rejected | superseded`. No other values.
2. **`depends_on` and `blocks` MUST be reciprocal.** If FR-X has `depends_on: [FR-Y]`, FR-Y MUST have `FR-X` in `blocks` (and vice-versa). Validate via a post-authoring sweep against every other FR.
3. **Mark placeholder FRs explicitly.** Any `depends_on:` or `blocks:` entry pointing to an FR that doesn't yet exist MUST carry an inline comment `# placeholder — not yet specified`.
4. **`effort_hours` MUST be populated.** If unknown, use the closest 2h-grain estimate; never leave blank.
5. **`module` MUST be one of the canonical 13** (see frontmatter enum). Adding a new module requires an entry in `MANIFEST.json` first.

### §3.2 — Doctrine-change discipline (MUST)

6. **Doctrine changes MUST quote the before-text verbatim** in §3 before showing the after-text. Never paraphrase the existing wording — readers cannot tell what changed.
7. **One doctrine file per FR.** If a change touches multiple normative markdown files (e.g. `02-framework.md` AND `07-maturity-tiers.md`), split into two FRs OR justify the multi-file scope in §11.
8. **Criterion-ID changes MUST update `_history.md`.** Renumbering, renaming, retiring, or adding a criterion are versioned events; an audit-history register row is mandatory.

### §3.3 — Marketing-FR discipline (MUST)

9. **Outreach FRs MUST enumerate named targets.** "Reach out to influencers" is not a contract; "send heads-up email to Brad Frost, Nathan Curtis, Sil Bormüller, Chris Strahl, Ben Callahan, Diana Mounter, Sarah Federman, Luke Murphy, Dan Mall, Jina Anne by date X" is.
10. **Launch FRs MUST declare a no-go condition.** Every visibility push has a circuit-breaker: a critic, a regression, a vendor issue. Name the condition and the rollback (delete post, pause campaign, owner who calls it) in §10.
11. **"Show HN" / Product Hunt / cross-post FRs MUST include the post text itself.** Don't author an FR that says "we'll write the post when ready" — write the post in §8 and audit it against the headline-and-first-paragraph criteria in the plan.

### §3.4 — Governance-FR discipline (MUST)

12. **Co-maintainer / contributor FRs MUST name a target list of candidates** and the asking script. Avoid "we'll find someone" — concrete shortlist or the FR is incomplete.
13. **Naming / branding FRs MUST cite the URL availability check date.** A `audit.cyberskill.world` claim needs a registrar check (whois/Namecheap/etc.) within the FR-creation week.
14. **Neutral-org / repo-migration FRs MUST list every redirect surface** — old README link, old blog posts, old slides, vendor profiles. Migration without redirects loses inbound links.

### §3.5 — Integration-FR discipline (MUST)

15. **Storybook addon / Tokens Studio validator / zeroheight reader / CLI FRs MUST declare the host platform's API contract version** they target. "Storybook addon" without a Storybook version is a moving target.
16. **CLI FRs MUST commit a fixture corpus** for the test harness (a tokens.json, a Figma export, a sample audit). Lazy fixtures (generate on first run) make CI flaky.
17. **Public-audit FRs (e.g. auditing Primer/Carbon/Polaris) MUST include the consent letter to the target system's team.** Public audit without consent is opportunistic and damages credibility.

### §3.6 — Measurement / metric discipline (MUST)

18. **Every phase has an explicit "done-when" set.** FR drafts that say "do these activities" without a quantitative or qualitative gate are not FRs — they are tasks. Gates MUST cite the phase exit metrics from the source plan (star count, lead count, CFP acceptances, etc.).
19. **Benchmark / certification FRs MUST declare the anonymisation contract.** Anonymous benchmark data has GDPR implications even if voluntary; the FR enumerates fields stored, fields hashed, fields dropped.
20. **Pricing FRs MUST publish the price floor and the rationale.** Tier 1 at $4.9K is a position taken in the source plan; the FR records the position so revisions are explicit.

### §3.7 — Documentation discipline (SHOULD)

21. **§2 (Why) MUST give the rationale for non-obvious design choices, not just restate §1.** Future readers need the WHY to make edge-case judgement calls.
22. **§9 (Open questions) SHOULD list deferred work explicitly** rather than implying it via `slice 4+`. Use `Deferred:` prefix + slice/phase reference.
23. **§11 (Implementation notes) is the home for "the why behind the how"** — tradeoffs that future maintainers might second-guess.

### §3.8 — Audit-file discipline (MUST)

24. **Every spec MUST have a matching audit file** at `<spec-stem>.audit.md`. The backlog renderer / coherence sweeper depends on the pair.
25. **Every audit file MUST list at least 6 ISS-xxx findings.** Below 6 = author didn't pressure-test the spec enough.
26. **`score_post_revision: 10/10` is the only acceptable shipping score.** Lower scores require explicit operator approval before `status` transitions to `accepted`.

### §3.9 — Spec-depth calibration (NICE-TO-FIX)

27. **Target 400–700 lines per substantive FR.** Below 250 (excluding sanctioned stubs/single-file doctrine per §0 exceptions) suggests under-specification; above 1,000 suggests prose padding that obscures the spec.
28. **Stub FRs (status: draft, P5/P6 reservation) MAY be ≤ 300 lines BUT MUST clearly say** "this is a scaffold; full impl in P<n> via FR-<x>" in the title + §1 #1.

---

## §4 — Coherence-sweep checklist

Run **before every bulk-accept**, ideally as a CI gate (`scripts/check-backlog.mjs`, future):

- [ ] `depends_on`/`blocks` reciprocity (every edge in both directions)
- [ ] All audit files have `score_post_revision: 10/10`
- [ ] All `effort_hours` populated
- [ ] No FR < 250 lines unless explicitly stub/single-file per §0 exceptions
- [ ] No FR > 1,000 lines that isn't justified by genuine surface complexity
- [ ] No trailing `#` comments on frontmatter value lines
- [ ] Every dangling FR reference has `# placeholder` annotation
- [ ] Every doctrine-change FR cites the before-text verbatim in §3
- [ ] Every launch / outreach FR has a no-go condition in §10
- [ ] Every public-audit FR includes the consent-letter draft in §8
- [ ] Every benchmark / certification FR declares the anonymisation contract

---

## §5 — How to use this document

- **Before writing a new FR:** read §0 (Master Rule) and §1 (template). The rest is a checklist for self-audit.
- **When auditing an FR:** the §3 sub-rules are the categories of findings to look for.
- **When reviewing a PR that adds an FR:** confirm §0 was followed — was there an audit-loop until 10/10?
- **When discovering a new anti-pattern:** add it to §3 with a one-line origin reference (which FR's mistake taught it).

---

## §6 — Versioning + amendment

This document follows the same precedence rule as the framework's `AGENTS.md`/`CLAUDE.md` §0: explicit user instructions in chat take priority. Changes to this document MUST be made via PR with explicit operator approval, since downstream tooling (backlog renderer, future coherence sweep) depends on the conventions.

---

## §7 — Session continuation policy (autonomous march)

When the operator says "continue", "march", or any equivalent open-ended go-ahead, the FR-authoring agent **MUST** keep draining the topological-order frontier autonomously and **MUST NOT** stop between FRs to ask "should I keep going?" The agent stops only when one of these conditions fires:

1. **Decision required.** A genuine design choice surfaces that the operator alone can resolve — e.g., the next FR's scope is ambiguous in the BACKLOG, a normative DEC entry would commit the project to a course not previously chosen, or a coherence error implies a backlog-level priority swap. In that case stop, summarise the decision, and present 2–4 options via `AskUserQuestion`.
2. **Session-limit warning.** The harness signals approaching context exhaustion. Stop after the current FR's audit-loop + coherence patch reach a clean state, emit a "resume point" pointer naming the next-ready FR.
3. **Coherence sweep fails post-patch.** If the coherence check reports errors that mechanical reciprocity edits can't resolve (e.g., a true cycle in the dependency graph), stop and surface the dependency conflict.
4. **Audit cannot reach 10/10 in three loops.** If three iterations of audit→revise→re-audit on a single FR fail to land 10/10 (rare — usually means the FR's scope is genuinely under-specified at the backlog level), stop and ask the operator to clarify scope before continuing.

Routine surprises (a single missing dependency on an upstream FR, a one-off reciprocity gap, a small clarification needed in implementation details) are **NOT** stop conditions — the agent fills the gap inline and continues.

**Per-FR loop the agent runs without prompting:** pick next-ready from frontier → write spec → write audit → loop to 10/10 → run coherence check → patch upstream reciprocity → emit single-line FR-shipped marker → loop back to pick next-ready.

**End-of-march report (when stop condition fires):** a single response covering every FR drained in the session, with §14 block listing every non-doctrine file change in one consolidated `📁 Files changed:` block.

---

## §8 — Audit-finding pattern library (DSAF-specific)

When auditing an FR, run this checklist before declaring 10/10. Each pattern below is a known category of mechanical concern relevant to *this* repo's mix of doctrine, marketing, governance, and integration FRs.

### §8.1 — Doctrine FRs

- **§8.1a Before-text not quoted verbatim.** A doctrine FR that paraphrases the existing wording in §3 is unreviewable — the reviewer can't see what's changing. Always paste the existing paragraph in a fenced block, then the replacement.
- **§8.1b Multi-file scope unjustified.** Doctrine FRs SHOULD touch one normative file. Multi-file changes need a §11 justification or should be split.
- **§8.1c Criterion-ID semantics broken.** Renumbering A.8.6 → A.8.7 silently breaks every audit report that cites the old number. Either keep the ID stable (rename text only) or add an alias in `_history.md`.

### §8.2 — Marketing / launch FRs

- **§8.2a Named targets missing.** "Influencer outreach" without a list of names is a wish, not a contract.
- **§8.2b No no-go condition.** Every launch push needs a kill switch: who watches, what they're watching for, what they do. Without this, a bad reception silently snowballs.
- **§8.2c Post text not in §8.** Don't author "we'll write the post when ready" — write it now, audit it against the headline rule from the plan, ship it as the FR's example payload.
- **§8.2d Channels listed but not sized.** "Cross-post to r/web_design, Lobste.rs, daily.dev" without realistic ranges (200–600 upvotes on the first; 50–150 on Lobste.rs; 200–800 on daily.dev) means the team can't calibrate post-launch.

### §8.3 — Governance / partnership FRs

- **§8.3a Candidate list absent.** Co-maintainer FR without a 3–5-person shortlist + the asking script is not actionable.
- **§8.3b URL/asset availability not verified.** Mint a domain → check whois → log the date in §11. Same for handles, sub-handles, repo names.
- **§8.3c Redirect map missing.** Migration FRs without a list of every outbound link that breaks → 404 storm.

### §8.4 — Integration / CLI FRs

- **§8.4a Host-platform version unpinned.** A Storybook addon FR that doesn't pin Storybook major version is a moving target.
- **§8.4b Fixture corpus missing.** "We'll generate test data later" → flaky CI on first PR.
- **§8.4c Public audit without consent.** Auditing Primer or Polaris without a draft letter to the team is opportunistic.

### §8.5 — Measurement / benchmark / certification FRs

- **§8.5a Anonymisation contract missing.** Voluntary anonymous benchmark still has GDPR implications.
- **§8.5b "Done when" qualitative without measurement.** "Done when we feel ready" is not a gate.
- **§8.5c Pricing FR without price floor + rationale.** Future revisions can silently slide if the original position isn't logged.

### §8.6 — Cross-cutting

- **§8.6a §10 < 10 rows.** Under-engineered failure-mode inventory; the spec hasn't been pressure-tested.
- **§8.6b Single-source-of-truth violations.** When two surfaces can answer the same question (README first-paragraph + audit.cyberskill.world landing first-paragraph), pick the canonical one in the FR and explicitly mirror.
- **§8.6c §1 SHOULD vs §4 MUST mismatch.** Either upgrade §1 to MUST or scope §4 to MUST-when-applicable.

### How to use §8

When writing a `*.audit.md`, walk this checklist. Many findings will not apply to a given FR — that's fine. The categories themselves are the audit's pressure-test rubric. New patterns surfaced in future audits SHOULD be appended here with origin reference.

---

*End of AUTHORING.md — version 1.0 — 2026-05-17.*
