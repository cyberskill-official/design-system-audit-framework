---
id: FR-DOCS-001
title: "Rewrite README in HN-launch idiom — first 200 words = what / why now / how it differs from X"
module: DOCS
priority: MUST
status: done
verify: I
phase: P0
milestone: P0 · slice 1 · Pre-launch hardening
slice: 1
owner: Stephen Cheng (Founder)
created: 2026-05-17
shipped: 2026-05-18
related_frs: [FR-BRAND-001, FR-BRAND-002, FR-BRAND-003, FR-BRAND-004, FR-CORE-001, FR-CORE-002, FR-CORE-004, FR-GOV-001, FR-DOCS-002, FR-LAUNCH-001]
depends_on: [FR-BRAND-001, FR-BRAND-002, FR-BRAND-003, FR-BRAND-004, FR-CORE-001, FR-CORE-002, FR-CORE-004]
blocks: [FR-DOCS-002, FR-LAUNCH-001]
source_pages:
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§What drives GitHub stars item 1 — 'README that reads like a finished product')"
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Phase 0 — Pre-launch hardening, action 5)"
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§What NOT to do items 1, 2)"
source_decisions:
  - "DEC-023: README is the landing page for HN — it's marketing copy, not documentation"
  - "DEC-024: 'open-source alternative to X' framing in title and pitch — the plan's stars-mover #3"
  - "DEC-025: no email gate, no paid CTA, no 'talk to sales' anywhere in README — the repo is sacred per plan §What NOT to do item 1"
language: markdown
service: doctrine
new_files:
  - README.md  # rewritten from scratch — the prior README is preserved in git history
  - docs/docs/FR-DOCS-001-readme-contract.json
  - scripts/readme-contract-lib.mjs
  - scripts/check-readme-contract.mjs
  - scripts/check-readme-contract.test.mjs
modified_files:
  - docs/01-introduction.md  # cross-link adjustments after README becomes the canonical entry point
  - package.json
  - scripts/dsaf-verify.mjs
allowed_tools:
  - "file_read/write README.md, docs/01-introduction.md"
  - "wc / awk for word-count verification"
  - "grep / ripgrep for handle-taxonomy compliance, banned-phrase detection"
disallowed_tools:
  - "add an email-capture form, paid-funnel CTA, or 'Contact CyberSkill' button to README — repo is sacred per FR-BRAND-001 §1 #11 and plan §What NOT to do item 1"
  - "use a single-percentage headline number (e.g., '84.6% combined') — banned by FR-CORE-004 §1 #9"
  - "use 'Framework' as a noun-handle — banned by FR-BRAND-002 §1 #5"
  - "reference cyberos/* or sibling-project paths — the repo is self-contained per the project-isolation rule"
effort_hours: 6
sub_tasks:
  - "1. (1h) Read every upstream FR's README-related patch (BRAND-001, BRAND-002, BRAND-003, BRAND-004, CORE-001, CORE-002, CORE-004); tabulate the patch obligations they jointly impose"
  - "2. (2h) Draft README v1 per §3 structure — H1, first-200-words pitch, both visuals embedded, table of contents, sections in canonical order"
  - "3. (1h) Word-count audit — first 200 words MUST contain 'what / why now / how it differs from X'; remove anything else"
  - "4. (1h) Iteration — read aloud the first 200 words; cut filler; ensure the colleague-skim test passes (per §4 AC11)"
  - "5. (45m) Cross-link patches — docs/01-introduction.md Reading Order updated; ensure README references all canonical surfaces (dsaf-25.md, regression-policy.md, self-audit-policy.md, decoupling-decision.md)"
  - "6. (15m) Banned-phrase grep — confirm no 84.6%, no 'Framework' noun-handle, no email form, no 'talk to sales' button"
risk_if_skipped: "The plan §'What drives GitHub stars' item 1 names this as the #1 lever that moves methodology-repo stars: 'A README that reads like a finished product, not documentation — repo IS the landing page for HN.' Without this FR, the README ships as documentation (which it currently is — a reasonable introduction file). Documentation doesn't pull HN front-page traffic; finished-product copy does. Skipping this FR means FR-LAUNCH-001 (Show HN) ships with a README that reads as 'one of many DS-tooling repos' rather than 'the open-source alternative to the SaaS audit platforms (zeroheight / Knapsack / Supernova)' — exactly the framing the plan §'What drives GitHub stars' item 3 names as stars-mover #3. The cost of this FR is one founder-session of polished prose; the value is the launch-week star trajectory."
implementation_kind: mocked
---

2026-05-18 strict execution note: stale status reset; `npm run contract:readme` verifies the README launch-copy contract: first-200-word what/why-now/comparison pitch, above-the-fold ladder/radar embeds, DSAF-25 cross-link, Quick Start, Reading Order, endorsement placeholder consent guard, handle taxonomy, banned funnel-copy patterns, and the mocked colleague-skim request/response shape. It writes `docs/_audit/readme-contract.json`. The original `dsaf.dev` canonical requirement is superseded by the FR-BRAND-004 canonical-host override.

## §1 — Description (BCP-14 normative)

The repository's `README.md` MUST be rewritten as **the landing page for the HN-launch crowd** — finished-product marketing copy, not introductory documentation. The README's job is to convert a skeptical scroller into a stargazer in 60 seconds; the docs/ files do the explaining.

1. **MUST** structure the README per §3 with these canonical sections in order: (a) H1 + tagline, (b) first-200-words pitch (the "what / why now / how it differs from X" block), (c) both canonical visuals embedded (L0–L5 ladder + radar from FR-BRAND-003), (d) DSAF-25 Core cross-link (per FR-CORE-001), (e) a Quick Start block (3–5 commands), (f) Reading Order (5–7 doc links), (g) Worked example link (the L3-capped CyberSkill self-audit per FR-CORE-004), (h) Maintainer block (CyberSkill + future named contributors per FR-GOV-002 placeholder), (i) Paid-services breadcrumb (the audit.cyberskill.world separation per FR-BRAND-004), (j) License + Contributing cross-links.
2. **MUST** make the first 200 words of body copy (excluding the H1 itself) cover three beats verbatim: (i) **what** DSAF is — a 125-criterion, agent-native, CMM-style maturity rubric for design systems; (ii) **why now** — the moment is right because there's no dominant open-source criteria-based maturity framework on GitHub, the SaaS leaders (zeroheight, Knapsack, Supernova) are commercial-closed-source-only, and the industry's maturity narratives (Big Medium, Sparkbox, Brad Frost) are blog posts not shipping artefacts; (iii) **how it differs from X** — explicitly name the SaaS commercial alternatives + Brad Frost's `frontend-guidelines-questionnaire` (the closest GitHub-native artefact) and state the gap DSAF fills (criteria-graded + scriptable + agent-native, where the others are not). Word-count verification at AC1.
3. **MUST** embed both FR-BRAND-003 visuals (L0–L5 ladder + radar) above the fold using `<picture>` element with `prefers-color-scheme` dark-mode swap. The visuals MUST appear before the Quick Start block — a scroller reaching Quick Start has already seen the iconic visuals.
4. **MUST** include the "Read DSAF-25 Core first" cross-link block per FR-CORE-001 §3 — the one that says "If you only have 5 minutes, [`docs/dsaf-25.md`](docs/dsaf-25.md) is the 25-criterion subset that fits on one page." This block MUST appear within the first 600 words of README body copy.
5. **MUST** include the paid-services breadcrumb per FR-BRAND-004 §3 — "Maintained by [CyberSkill](https://cyberskill.world) and named contributors. Paid audit services are offered by CyberSkill via [audit.cyberskill.world](https://audit.cyberskill.world) — a separate site from this framework's home at [dsaf.dev](https://dsaf.dev)." This block lives in the Maintainer section (canonical-order item h–i), NOT in the first-200-words pitch.
6. **MUST NOT** include any email-capture form, paid-funnel CTA, "Talk to a certified auditor" button, "Contact CyberSkill" link in the body copy, "Schedule a demo" prompt, or any conversion-funnel element in the README body. The repo is sacred (per FR-BRAND-001 §1 #11 and plan §"What NOT to do" item 1). The paid-services breadcrumb in §1 #5 is the *only* mention of paid services in the README and is positioned at the bottom.
7. **MUST NOT** lead with a single-percentage headline number (e.g., "84.6% combined") — banned by FR-CORE-004 §1 #9. The worked-example link MUST frame as "complete worked L3 self-audit," NOT as a percentage claim.
8. **MUST NOT** use `Framework` as a noun-handle in body copy — banned by FR-BRAND-002 §1 #5. Use `DSAF` (short handle) or `Design System Audit Framework` (long name, used exactly once at first mention per FR-BRAND-002 §1 #2).
9. **MUST** include 2+ named outside-reviewer endorsement quote slots (per FR-GOV-001 / FR-DOCS-002 — placeholder, not yet specified). The slots are present in the README structure at PR land time as `> "<quote>" — <Reviewer Name>, <Affiliation>` with placeholder text; FR-DOCS-002 fills the actual quotes. The slots' presence is in scope of this FR; the quotes themselves land via FR-DOCS-002.
10. **MUST** include a Quick Start block (3–5 commands) per §3. The Quick Start shows: (a) `npx dsaf scan` (post-FR-CLI-001 — placeholder; the line may read "coming in P5" pre-FR-CLI-001), (b) `git clone` + `Read docs/dsaf-25.md`, (c) the link to a full audit walk-through. Quick Start is the "show, don't tell" surface — a scroller who reads this block sees DSAF is *runnable*.
11. **MUST** apply the FR-BRAND-002 handle taxonomy throughout. `DSAF` short handle in 90%+ of body mentions; `Design System Audit Framework` long name exactly once at first mention; `DSAF Criteria` / `DSAF Levels` / `DSAF Modes` / `DSAF-25 Core` as the component handles.
12. **MUST** apply the FR-CORE-004 self-audit cap rule. The CyberSkill worked example is referenced as "L3 (Managed) — complete worked example of a SCAN + FIX cycle" — never as "L5" or "industry-leading" or "top tier" or "84.6%."
13. **MUST** include the `dsaf.dev` canonical URL in the H1 area and again in the Maintainer block per FR-BRAND-001. Citations of older `audit.cyberskill.world/framework/*` URLs are forbidden (per FR-BRAND-004 decoupling).
14. **MUST** ship as a single `README.md` file with no `<details>` collapsing on the first 600 words. A scroller reading the README on GitHub or `cat README.md` MUST see the pitch + visuals + quick start without expanding sections. `<details>` is allowed for sub-sections AFTER first 600 words (e.g., "Full criteria list" can be `<details>`-collapsed since the full list lives in `docs/03-criteria-part-a.md`).
15. **MUST** pass the "colleague-skim test" per FR-BRAND-001 §1 #5 spirit — a colleague unfamiliar with the project can read the README and summarise it back in two sentences after a 60-second skim. PR description records the colleague's name + their two-sentence summary.

---

## §2 — Why this design

**Why README-as-landing-page (§1 #1, #14):** the plan §"What drives GitHub stars" item 1 is explicit — "A README that reads like a finished product, not documentation — repo IS the landing page for HN." Show HN traffic arrives at the README; they don't click through. A README that opens with "Welcome to the project. To get started, see docs/01-introduction.md..." loses the HN reader in 5 seconds. A README that opens with the pitch + visuals + Quick Start in the first 600 words converts.

**Why the "what / why now / how it differs from X" structure (§1 #2):** the plan §"What drives GitHub stars" item 3 names "explicit 'open-source alternative to X' framing" as the #3 lever. Naming the competitive set (zeroheight / Knapsack / Supernova / Brad Frost's questionnaire) is what tells the reader "this isn't just another DS-tooling repo — this is the missing artefact." Without the comparison, the reader has to construct the framing themselves; with it, the framing is the reader's first thought.

**Why both visuals above the fold (§1 #3):** the plan §"What drives GitHub stars" item 2 names "one killer visual that gets screenshotted on social media" as the #2 lever. The L0–L5 ladder is the narrative visual; the radar is the diagnostic visual. Above the fold, both are visible in the GitHub-renderered README (~700–800 px). A scroller seeing both at first glance has a 5-second understanding of what DSAF measures and how.

**Why no email capture / paid CTAs (§1 #6):** the plan §"What NOT to do" item 1 is explicit: "Don't gate anything on email capture in the GitHub repo. Move all lead-capture to dsaf.dev. The repo is sacred." The paid-services breadcrumb (§1 #5) is positioned at the *bottom* of the README, NOT in the pitch — it acknowledges CyberSkill's services exist without making them the README's primary surface. The OSS community has high signal-detection for "this is a funnel for a consultancy"; positioning matters.

**Why no single-percentage headline (§1 #7, #12):** FR-CORE-004 §1 #9 explicitly forbids; the "Auditors audit themselves at L5" critique (plan §"Honest critique" item 3) is the failure mode this rule pre-empts. The framing "complete worked L3 self-audit" presents the worked example as a learning artefact, not a marketing claim.

**Why named endorsement slots in scope of this FR (§1 #9):** the slots' *existence* is part of the README structure; the *quotes* are filled by FR-DOCS-002 after FR-GOV-001 lands the reviewers. By scoping the slot-presence here, this FR delivers a README that's *structurally complete* even before quotes arrive. If the launch ships before FR-GOV-001/DOCS-002 close, the slots can be hidden or marked "endorsements landing in [date]."

**Why Quick Start with `npx dsaf scan` even before FR-CLI-001 ships (§1 #10):** showing the *intent* of the tooling roadmap is part of the pitch. A scroller reading "`npx dsaf scan` — coming in v0.2" sees that DSAF is on a runnable trajectory, not just a markdown collection. The honest framing — "coming in P5" — preserves credibility (no false promises of working tooling) while signaling the direction.

**Why the colleague-skim test (§1 #15):** the test is the operational gate on whether the rewrite worked. A self-assessment by the founder is unreliable (too close to the material); an external colleague's 60-second-skim + two-sentence summary is the proxy for how an HN scroller will react. The test is qualitative but auditable (the PR description records it).

**Why the canonical-section order (§1 #1):** the order maps to the reader's scrolling journey. Pitch → visuals → DSAF-25 cross-link (escape hatch for the 5-minute reader) → Quick Start (escape hatch for the 60-second runner) → Reading Order (escape hatch for the comprehensive reader) → Worked example (proof-of-runnability) → Maintainer (credibility) → Paid services (acknowledged but de-emphasised). Reordering breaks the conversion flow.

---

## §3 — Doctrine contract

### `README.md` — the canonical rewrite

```markdown
# DSAF — Design System Audit Framework

**Canonical URL:** [dsaf.dev](https://dsaf.dev) · **Maintained by:** [CyberSkill](https://cyberskill.world) + named contributors · **License:** [MIT](LICENSE)

> A 125-criterion, agent-native, CMM-style maturity rubric for design systems. Open source. Vendor-neutral. Six tiers from L0 to L5.

<picture>
  <source srcset="./assets/dsaf-l0-l5-ladder-dark.svg" media="(prefers-color-scheme: dark)">
  <img src="./assets/dsaf-l0-l5-ladder.svg" alt="DSAF L0–L5 Maturity Ladder — six tiers from Initial (L0, < 40%) to Optimised (L5, 85%+) with transition-gate requirements per tier" width="100%">
</picture>

<picture>
  <source srcset="./assets/dsaf-radar-dark.svg" media="(prefers-color-scheme: dark)">
  <img src="./assets/dsaf-radar.svg" alt="DSAF Radar — 20-axis spider chart (10 Part A system categories + 10 Part B UX categories) with enterprise-grade-threshold overlay" width="100%">
</picture>

---

## What this is

DSAF is the missing artefact in the design-systems audit space: a downloadable, criteria-graded, scriptable maturity rubric. Most maturity narratives in the field are blog posts (Big Medium, Sparkbox, Brad Frost's *Atomic Design*). The few that aren't are SaaS-gated commercial platforms (zeroheight, Knapsack, Supernova). Brad Frost's `frontend-guidelines-questionnaire` is the closest GitHub-native artefact in spirit, but it's a one-page checklist, not a framework.

DSAF gives you the rubric (125 criteria across 20 categories, mapped to a six-tier maturity scale), the audit-flow (`SCAN mode` measures the current state; `FIX mode` applies approved fixes; both produce a single `audit-report-{date}.md`), the scripts (coverage, contrast, bundle-size, doc-freshness, link-check), and the agent integration (every section is structured so an LLM agent can read, parse, and update it).

## Why now

Three things changed in the design-systems space recently. (1) The SaaS consolidation around zeroheight / Knapsack / Supernova made the *category* visible to enterprise buyers — there's now a budget line for "design system platform." (2) The agent-native moment means LLM-readable doctrine is durable; an MCP-compatible framework today is leveraged for every audit run via Claude / Cursor / etc. (3) No-one published a 125-criterion, criteria-graded, agent-native, CMM-style framework on GitHub — the space is open. DSAF is the bet that this gap is real and will get filled by one project; we'd rather it be open-source than the next SaaS.

## How DSAF differs

- **vs. SaaS platforms (zeroheight, Knapsack, Supernova):** DSAF is open-source, vendor-neutral, and free. Their audits live behind login walls; DSAF audits live in your repo as markdown.
- **vs. methodology blog posts (Brad Frost, Nathan Curtis, Big Medium, Sparkbox):** DSAF is shippable — clone the repo, run `prompts/scan-mode.md` through your LLM, score the criteria. Methodology posts are reading; DSAF is doing.
- **vs. Brad Frost's `frontend-guidelines-questionnaire`:** DSAF is a 125-criterion graded framework with a six-tier scale and scripted verification — the questionnaire is a one-page open-ended prompt list. Different scope, different output.

---

**Read DSAF-25 Core first.** If you only have 5 minutes, [`docs/dsaf-25.md`](docs/dsaf-25.md) is the 25-criterion subset that fits on one page. The full 125-criterion rubric is at [`docs/03-criteria-part-a.md`](docs/03-criteria-part-a.md) (Part A — System) and [`docs/04-criteria-part-b.md`](docs/04-criteria-part-b.md) (Part B — UX). The one-page printable card is at [`assets/dsaf-25-card.svg`](assets/dsaf-25-card.svg) or [dsaf.dev/card](https://dsaf.dev/card).

---

## Quick start

```bash
# Clone the repo
git clone https://github.com/cyberskill-official/design-system-audit-framework
cd design-system-audit-framework

# Read the DSAF-25 Core in 5 minutes
open docs/dsaf-25.md

# Run a SCAN against your design system (using your LLM agent)
# 1. Paste prompts/scan-mode.md into your agent (Claude / Cursor / GPT)
# 2. Point the agent at your design system's repo + docs
# 3. The agent produces audit-report-{YYYY-MM-DD}.md scored against the 125 criteria

# Coming in v0.2 (P5):
npx dsaf scan   # 60-second DSAF-25 Core scan from your repo's command line
```

Full audit walkthrough: [`docs/05-running-an-audit.md`](docs/05-running-an-audit.md).

---

## Endorsements

> "<endorsement quote, ≤ 280 chars>" — <Reviewer Name>, <Affiliation>

> "<endorsement quote, ≤ 280 chars>" — <Reviewer Name>, <Affiliation>

*(Endorsements landing via [FR-DOCS-002](docs/feature-requests/docs/FR-DOCS-002-endorsement-quotes.md) — placeholder, not yet specified. Outreach owned by [FR-GOV-001](docs/feature-requests/gov/FR-GOV-001-recruit-reviewers.md) — placeholder, not yet specified.)*

---

## Worked example

[`examples/cyberskill-design-system/`](examples/cyberskill-design-system/) is a complete worked example of a DSAF self-audit produced under SCAN + FIX modes. The cited Level (L3 Managed — capped per the [self-audit publication policy](docs/branding/self-audit-policy.md)) is a verification-status framing, not a quality claim. The interior scores in the audit report's §10 are honest per the rubric; the framing caps until third-party verification (P6) is in place.

Use this folder as the template for what your own audit report should look like.

---

## Reading order

| # | File | Purpose |
|---|---|---|
| 1 | [`docs/01-introduction.md`](docs/01-introduction.md) | What DSAF is, who it's for, what you'll produce |
| 2 | [`docs/02-framework.md`](docs/02-framework.md) | Modes, actors, scoring, no-silent-regression rule |
| 3 | [`docs/dsaf-25.md`](docs/dsaf-25.md) | **DSAF-25 Core — the 25-criterion subset on one page (recommended entry point)** |
| 4 | [`docs/05-running-an-audit.md`](docs/05-running-an-audit.md) | Step-by-step playbook |
| 5 | [`docs/07-maturity-tiers.md`](docs/07-maturity-tiers.md) | What each DSAF Level means |
| 6 | [`prompts/scan-mode.md`](prompts/scan-mode.md) | Paste this into your LLM and run your first SCAN |
| 7 | [`docs/08-improvement-plan.md`](docs/08-improvement-plan.md) | Turn an audit into a phased improvement plan |

For the criteria themselves: [`docs/03-criteria-part-a.md`](docs/03-criteria-part-a.md) (Part A — System) and [`docs/04-criteria-part-b.md`](docs/04-criteria-part-b.md) (Part B — UX).

For tailoring DSAF to your industry / brand: [`docs/09-customising.md`](docs/09-customising.md).

For the LLM prompt pack: [`docs/10-prompt-pack.md`](docs/10-prompt-pack.md).

---

## Maintainer

Maintained by [CyberSkill](https://cyberskill.world) and named contributors. CyberSkill is a software solutions consultancy founded in 2020, based in Ho Chi Minh City, Vietnam. We use DSAF internally and offer paid third-party audit services.

A non-Western co-maintainer is being recruited (governance: [FR-GOV-002](docs/feature-requests/gov/FR-GOV-002-co-maintainer.md) — placeholder, not yet specified).

Paid audit services are offered by CyberSkill via [audit.cyberskill.world](https://audit.cyberskill.world) — a **separate site** from this framework's home at [dsaf.dev](https://dsaf.dev). DSAF (the framework) is open source; CyberSkill (the consultancy) is a commercial entity that maintains the framework and uses it.

---

## License + Contributing

License: [MIT](LICENSE) — use, fork, modify, sell. Citation appreciated.

Contributing: [`CONTRIBUTING.md`](CONTRIBUTING.md) — DSAF welcomes contributions to criteria, scripts, translations (JP / ES / DE first; FR / PT next), and worked-example audits of marquee design systems.

Branding: [`docs/branding/`](docs/branding/) — handle taxonomy, decoupling decision, self-audit publication policy.

---

*Framework version: DSAF v1 (2026-05-17). Rubric version: 125 criteria + DSAF-25 Core. License: MIT. Repo: github.com/cyberskill-official/design-system-audit-framework. Site: dsaf.dev.*
```

### `docs/01-introduction.md` — Reading Order patch (post-README rewrite)

After this FR ships, the `01-introduction.md` Reading Order is consistent with the README's. Patch:

```markdown
## Reading order if you're new

1. **[README.md](../README.md)** — start here: what DSAF is, the visuals, Quick Start. The README is the canonical entry point.
2. This file (you're here) — extended introduction with audience + use-case details.
3. [`02-framework.md`](./02-framework.md) — modes, actors, scoring, no-silent-regression rule.
4. **[`dsaf-25.md`](./dsaf-25.md) — DSAF-25 Core (the 25-criterion subset on one page; recommended entry point before reading the full 125).**
5. [`05-running-an-audit.md`](./05-running-an-audit.md) — step-by-step playbook.
6. [`07-maturity-tiers.md`](./07-maturity-tiers.md) — what each DSAF Level means.
7. [`prompts/scan-mode.md`](../prompts/scan-mode.md) — paste this into your LLM and run your first SCAN.
```

(The change from the FR-CORE-001-installed version: item #1 is now the README, and the existing items are renumbered.)

---

## §4 — Acceptance criteria

1. **First 200 words contain "what / why now / how it differs from X"** — extract the README body (excluding the H1 line and the visual `<picture>` blocks), take the first 200 words via `awk` / `wc`, verify all three beats are present. Specifically: "125-criterion" + "agent-native" appears (what); "zeroheight" + "Knapsack" + "Supernova" + ("open" OR "no...framework") appears (why now); "differs from" or "vs." + named comparison ≥ 1 appears (how it differs from X).
2. **Both visuals embedded above the fold** — `grep -B 2 -A 2 'dsaf-l0-l5-ladder' README.md` shows the visual is in the first 50 lines; same for `dsaf-radar`.
3. **DSAF-25 Core cross-link present** — `head -c 3000 README.md | grep -q 'dsaf-25\.md.*5 minutes\|5 minutes.*dsaf-25\.md'`. The cross-link block per FR-CORE-001 §3 is within the first 600 words.
4. **Paid-services breadcrumb present + at bottom** — `tail -c 2000 README.md | grep -q 'audit\.cyberskill\.world.*separate site'`. The breadcrumb appears in the last 1/3 of the README, not in the first 600 words.
5. **No email-capture form** — `grep -ciE '<form|<input type="email"|email-capture|subscribe' README.md` returns 0.
6. **No paid-funnel CTA in body** — `grep -ciE 'Talk to a certified|Contact (us|sales|CyberSkill)|Schedule (a|your) demo|Book (a|your) call' README.md` returns 0. The paid-services breadcrumb (which mentions `audit.cyberskill.world`) is exempt because it's positioned at the bottom and frames as a *separate site*, not a CTA.
7. **No 84.6% or L5 marketing claim** — `grep -ciE '84\.6|industry[- ]?leading|top tier|L5 Optimised' README.md` returns 0 (excluding citations inside the L0-L5 ladder visual's alt-text, which describes the rubric).
8. **No `Framework` as noun-handle** — `grep -ciE '\b(the )?DSAF Framework\b|\bDSAF framework\b' README.md` returns 0. Long name `Design System Audit Framework` appears at most twice (once in H1, once in maintainer block context).
9. **Handle taxonomy compliance** — `DSAF` short handle appears ≥ 10 times in README body; `DSAF Levels` / `DSAF Criteria` / `DSAF-25 Core` appear ≥ 1 each.
10. **Endorsement quote slots present** — `grep -cE '^> "<endorsement quote' README.md` returns ≥ 2; the slots are placeholders with the FR-DOCS-002 + FR-GOV-001 cross-reference.
11. **Colleague-skim test recorded** — PR description names the colleague + their two-sentence summary of DSAF after a 60-second skim of README.
12. **Quick Start present** — `grep -q '## Quick start\|## Quick Start' README.md && grep -q 'git clone\|npx dsaf' README.md`.
13. **No reference to other CyberSkill projects** — `grep -ciE 'cyberos|sale-noti|landing-page' README.md` returns 0. The repo is self-contained per the project-isolation rule.
14. **dsaf.dev canonical URL present** — `grep -c 'dsaf\.dev' README.md` ≥ 3 (H1 area, Maintainer block, footer).
15. **Reading Order has 7 items + criteria-table cross-links** — `awk '/^## Reading order/,/^## /' README.md | grep -cE '^\| [0-9]' ` returns 7.
16. **Worked example link present + frames as L3** — `grep -q 'examples/cyberskill-design-system' README.md && grep -ciE 'worked example.*L3\|L3.*worked example' README.md`.
17. **Word count of README is reasonable** — `wc -w README.md` between 800 and 1600 words. Below 800 = under-pitched; above 1600 = stops being a landing page and becomes documentation.

---

## §5 — Verification

```bash
# AC1 — first 200 words contain what / why now / how it differs from X
body=$(awk 'NR > 1 && !/^<picture>/ && !/^</' README.md | tr '\n' ' ')
first_200=$(echo "${body}" | awk '{ for (i = 1; i <= 200; i++) printf "%s ", $i; }')
echo "${first_200}" | grep -qi '125-criterion\|125 criteria' && \
echo "${first_200}" | grep -qi 'agent-native' || echo "FAIL AC1: 'what' beat missing"
echo "${first_200}" | grep -qi 'zeroheight' && \
echo "${first_200}" | grep -qi 'Knapsack\|Supernova' || echo "FAIL AC1: 'why now' competitor mentions missing"
echo "${first_200}" | grep -qiE 'differs|vs\.|alternative|open-source' || echo "FAIL AC1: 'how it differs from X' framing missing"

# AC2 — visuals above the fold
head -50 README.md | grep -q 'dsaf-l0-l5-ladder' || echo "FAIL AC2: ladder not above fold"
head -50 README.md | grep -q 'dsaf-radar' || echo "FAIL AC2: radar not above fold"

# AC3 — DSAF-25 cross-link in first 600 words
head -c 4500 README.md | grep -q 'dsaf-25\.md' && \
head -c 4500 README.md | grep -qi '5 minutes\|5-minute' || echo "FAIL AC3"

# AC4 — paid-services breadcrumb at bottom
tail -c 2500 README.md | grep -q 'audit\.cyberskill\.world.*separate site' || echo "FAIL AC4"

# AC5 — no email capture
grep -ciE '<form|<input type="email"|email-capture|subscribe' README.md  # 0

# AC6 — no paid-funnel CTA
grep -ciE 'Talk to a certified|Contact (us|sales|CyberSkill)|Schedule (a|your) demo|Book (a|your) call' README.md  # 0

# AC7 — no headline metric / L5 marketing
grep -ciE '84\.6|industry[- ]?leading|top tier|L5 Optimised' README.md  # 0

# AC8 — no Framework noun-handle
grep -ciE '\b(the )?DSAF Framework\b|\bDSAF framework\b' README.md  # 0

# AC9 — handle taxonomy
grep -c '\bDSAF\b' README.md         # >= 10
grep -c 'DSAF Levels' README.md      # >= 1
grep -c 'DSAF Criteria' README.md    # >= 1
grep -c 'DSAF-25 Core' README.md     # >= 1

# AC10 — endorsement slots
grep -cE '^> "<endorsement quote' README.md  # >= 2

# AC12 — quick start
grep -q '## Quick start\|## Quick Start' README.md && grep -q 'git clone\|npx dsaf' README.md

# AC13 — no cross-project references
grep -ciE 'cyberos|sale-noti|landing-page' README.md  # 0

# AC14 — dsaf.dev present
grep -c 'dsaf\.dev' README.md  # >= 3

# AC15 — Reading Order
awk '/^## Reading order/,/^## /' README.md | grep -cE '^\| [0-9]'  # 7

# AC16 — worked example + L3 framing
grep -q 'examples/cyberskill-design-system' README.md && grep -ciE 'worked example.*L3|L3.*worked example' README.md

# AC17 — word count
wc -w README.md | awk '{ if ($1 < 800 || $1 > 1600) print "OUT OF RANGE: " $1 " words"; else print "OK: " $1 " words"; }'
```

Human-verified ACs (no script):

- **AC11** — reviewer reads the PR description's colleague-skim test (colleague name + two-sentence summary).

---

## §6 — Implementation skeleton

The operator playbook (6h):

1. **(1h) Read upstream patches.** Open each blocking-upstream FR (BRAND-001 README patch, BRAND-002 taxonomy, BRAND-003 visual embedding, BRAND-004 paid-services breadcrumb, CORE-001 DSAF-25 cross-link, CORE-002 no-silent-regression-rule wording, CORE-004 self-audit cap). Tabulate the README-affecting requirements in a scratch file.
2. **(2h) Draft README v1** per §3 structure verbatim — H1 + tagline; first-200-words pitch; visuals (`<picture>` blocks); DSAF-25 cross-link; Quick Start; endorsement slots; worked example; Reading Order; Maintainer + paid-services breadcrumb; License + Contributing.
3. **(1h) Word-count audit + iteration.** Extract the first 200 words; verify all three beats are present and complete. If beats are weak, rewrite. Cut filler ("DSAF is a comprehensive…" → "DSAF is").
4. **(1h) Iteration: read aloud.** Read the first 200 words aloud. Each sentence should feel natural — if it doesn't, rewrite. The aloud-read test catches tortured prose that survives silent editing.
5. **(45m) Cross-link patches.** Apply the `docs/01-introduction.md` Reading Order patch from §3. Verify that all README cross-links resolve (relative paths to existing files).
6. **(15m) Verification + colleague-skim test.** Run the §5 grep commands. Ask one colleague (not the founder, ≥ 1 year DS exposure helpful but not required) to read the README for 60 seconds and summarise it back. Record the summary in PR description.

---

## §7 — Dependencies

- **Upstream (all required before this FR can land):**
  - **FR-BRAND-001** — dsaf.dev URL is canonical; README cites it.
  - **FR-BRAND-002** — handle taxonomy applied throughout README body.
  - **FR-BRAND-003** — visuals exist at `assets/dsaf-l0-l5-ladder.svg` + `assets/dsaf-radar.svg`; README embeds them.
  - **FR-BRAND-004** — paid-services breadcrumb wording defined; decoupling rule applies.
  - **FR-CORE-001** — DSAF-25 Core cross-link block has canonical wording.
  - **FR-CORE-002** — README's "Reading order" item #2 references `02-framework.md` "no-silent-regression rule" (the rule name post-CORE-002).
  - **FR-CORE-004** — worked example framed as L3, not L5; no 84.6% mention.
- **Downstream blocks:**
  - **FR-DOCS-002** — endorsement-quote slots are present in README; FR-DOCS-002 fills the quotes.
  - **FR-LAUNCH-001** — Show HN post quotes the README's first-200-words pitch verbatim (or close-to-verbatim); the launch is downstream of the README being launch-ready.
- **External:** none. README is in-repo doctrine.

---

## §8 — Example payloads

### Example: a successful colleague-skim test result

```markdown
## Colleague-skim test (FR-DOCS-001 AC11)

Colleague: @[name], frontend engineer at [company], no prior exposure to DSAF or design-systems audits beyond hearing about Carbon and Polaris.

Reading time: 47 seconds (timed).

Two-sentence summary: "DSAF is an open-source rubric for grading a design system's maturity — it has 125 criteria across 20 categories and produces a tier from L0 to L5. It's positioned as the open-source alternative to closed SaaS platforms like zeroheight and Knapsack, with shipping scripts and LLM-agent integration."

Outcome: PASS. The summary captures (a) what DSAF is, (b) the rubric scope, (c) the L0-L5 framing, (d) the comparison set. The "shipping scripts and LLM-agent integration" detail came from the Quick Start block, which means the README's structure routed the colleague through the right read.
```

### Example: a failed first 200 words + iteration

**First draft (FAIL AC1):**

> DSAF is a comprehensive open-source maturity framework for design systems. It provides a structured approach to evaluating where your design system stands across multiple dimensions. The framework includes 125 criteria organized into categories. Teams can use it to plan improvements and track progress over time.

This fails because: "why now" beat absent (no competitive context); "how it differs from X" absent (no comparison); generic marketing language ("comprehensive," "structured approach"); 50+ wasted words before the value prop.

**Second draft (PASS AC1):**

> DSAF is the missing artefact in the design-systems audit space: a downloadable, criteria-graded, scriptable maturity rubric. Most maturity narratives in the field are blog posts (Big Medium, Sparkbox, Brad Frost's *Atomic Design*). The few that aren't are SaaS-gated commercial platforms (zeroheight, Knapsack, Supernova). Brad Frost's `frontend-guidelines-questionnaire` is the closest GitHub-native artefact in spirit, but it's a one-page checklist, not a framework.

This passes because: "what" beat (in the next paragraph: "125 criteria across 20 categories, mapped to a six-tier maturity scale"); "why now" beat (the SaaS context); "how it differs from X" beat (named comparisons throughout, with the gap stated).

### Example: a Quick Start that signals direction without overpromising

```markdown
## Quick start

\`\`\`bash
# Clone the repo
git clone https://github.com/cyberskill-official/design-system-audit-framework
cd design-system-audit-framework

# Read the DSAF-25 Core in 5 minutes
open docs/dsaf-25.md

# Run a SCAN against your design system (using your LLM agent)
# 1. Paste prompts/scan-mode.md into your agent (Claude / Cursor / GPT)
# 2. Point the agent at your design system's repo + docs
# 3. The agent produces audit-report-{YYYY-MM-DD}.md scored against the 125 criteria

# Coming in v0.2 (P5):
npx dsaf scan   # 60-second DSAF-25 Core scan from your repo's command line
\`\`\`
```

The "coming in v0.2 (P5)" framing is honest — the CLI isn't shipped yet, the README says so, and the reader's expectation is calibrated. A reader scrolling the Quick Start sees a runnable today-path (manual SCAN via LLM agent) AND a roadmap (the npx command).

---

## §9 — Open questions

All resolved at authoring time:

- **Q1: Single README or split into README + LANDING.md?** Resolved → single README. GitHub renders README on the repo root page; a separate LANDING.md would be a second surface to maintain and a redundant click for HN readers. The dsaf.dev landing page (per FR-BRAND-001) is the off-GitHub landing; the README is the on-GitHub landing.
- **Q2: Endorsement slots before FR-DOCS-002 ships — show placeholder or hide section entirely?** Resolved → show placeholders with explicit "endorsements landing via FR-DOCS-002" framing. Hiding would lose the structural shape; showing-with-honesty signals the section is incoming.
- **Q3: Quick Start lists `npx dsaf scan` before FR-CLI-001 ships — false promise?** Resolved → no, framed as "Coming in v0.2 (P5)." Honest direction-signaling is different from false promises. A roadmap mention is acceptable; a working-feature claim would not be.
- **Q4: Should the README link to all FRs, the source plan, or stay agnostic?** Resolved → link to FRs sparingly (only where a placeholder is acknowledged — FR-DOCS-002, FR-GOV-001/002, FR-CLI-001 future CLI). The source plan stays in `docs/` and is not surfaced in README — it's an internal artefact.
- **Q5: How prescriptive about the visual placement (above the fold = first 50 lines)?** Resolved → visuals MUST be in the first 50 lines (AC2). Below 50 lines, GitHub's rendered README scrolls them off-screen on standard viewports. The plan §"What drives GitHub stars" item 2 ("one killer visual that gets screenshotted") implies above-the-fold placement.
- **Q6: Worked example link — direct to `improvement-plan.md` or to the folder?** Resolved → to the folder (`examples/cyberskill-design-system/`). The folder has `_history.md` + the audit report; pointing at the folder lets the reader pick which file to open. Pointing at one file forces a navigation hop.
- **Q7: License callout — MIT only or full text?** Resolved → MIT mention + link to `LICENSE` file. Full text in README is over-long; the LICENSE file is the canonical surface.

---

## §10 — Failure modes inventory

| Failure | Detection | Outcome | Recovery |
|---|---|---|---|
| First 200 words feels generic (fails reader-engagement) | colleague-skim test | Low star-to-view conversion on Show HN | Iterate per §6 step 4 (read aloud, cut filler, name comparisons concretely) |
| Visuals don't render on GitHub (SVG embed issue) | visual check on github.com/repo page | Reader sees broken images | GitHub supports SVG `<img>` and `<picture>`; verify FR-BRAND-003 SVGs are well-formed (xmllint); fall back to `<img>` if `<picture>` fails |
| Endorsement slots empty at launch time | reviewer sees `<endorsement quote>` placeholder | Looks unprofessional | Either ship FR-DOCS-002 first OR replace placeholders with "Endorsements landing in [date]" sentence |
| Quick Start `npx dsaf scan` line confuses reader (looks like working command) | post-launch reader feedback | Reader runs the command + gets error | "Coming in v0.2 (P5)" comment in the code block is the disclaimer; if the comment is missed, the actual `npx` execution returns "command not found" which is honest |
| Word count drifts over 1600 as docs accrete in README | AC17 check | README stops being landing page | Move accreted content to `docs/`; README MUST stay landing-page-sized |
| Show HN crowd reads the L3 framing as "the authors don't believe in their own framework" | HN comments | Backlash | FR-CORE-004's cap-rule policy is the pre-empted answer; engage critics with the policy URL (per plan §"What NOT to do" item 9 — "gracious engagement") |
| Reviewer finds the SaaS comparisons (zeroheight, Knapsack) framed too aggressively | HN comments | "punching down" perception | Tone the comparisons: lead with "DSAF gives you X, which the SaaS platforms charge for" rather than "DSAF replaces zeroheight" |
| README references a doc file that doesn't exist | broken link | Bad first impression | All Reading Order links MUST be verified at PR land; CI link-checker (post-launch) catches future drift |
| Maintainer block reads as CyberSkill marketing | reader feedback | OSS-trust degradation | FR-BRAND-004 decoupling rule is enforced — the maintainer block is one paragraph; paid-services breadcrumb is one sentence at the bottom |
| README ships before FR-BRAND-003 visuals → broken `<picture>` blocks | AC2 grep returns 0 | Reader sees `<img>` broken | Block this FR on FR-BRAND-003 ship (depends_on declares this); if FR-BRAND-003 slips, ship README with text placeholder for visuals and a "visuals landing in [date]" note |
| Quick Start command sequence is wrong (e.g., wrong repo URL) | reader follows + fails | Bad first run | The repo URL `github.com/cyberskill-official/design-system-audit-framework` is verified at PR; CODEOWNERS for README catches future drift |
| HN post lands before README rewrite is at 10/10 | accidental early launch | Reader sees draft README | FR-LAUNCH-001 explicitly depends on FR-DOCS-001 + FR-DOCS-002; the dependency chain is the gate |

---

## §11 — Implementation notes

- **The first 200 words are the single most important text in the entire project.** They convert a Show HN scroller in 3-5 seconds. Allocate 2 of the 6 FR hours to this section alone. Read aloud; cut every filler word; verify all three beats land.
- **Why a Maintainer section at the bottom, not the top:** the plan §"What drives GitHub stars" item 4 names "a person attached to the work" as the #4 stars-mover. The Maintainer section is that person; it's at the bottom because the FIRST glance should be the pitch + visuals + Quick Start, not credit. Credit belongs after value-prop established.
- **About the L3-framed worked example link:** the link is the conversion path from "interested" to "running." A reader who scrolls to the worked example sees a *real* audit report — not a marketing summary. The L3 framing per FR-CORE-004 is preserved so the reader gets the honest example, not a manicured one.
- **About the endorsement slots:** they're load-bearing pre-launch. A README with 2 named endorsement quotes from the design-systems community reads 5× more credible than one without. FR-GOV-001 + FR-DOCS-002 are the upstream gates; if they slip, the launch slips with them (FR-LAUNCH-001 dependency).
- **About the Quick Start's `git clone` URL:** the actual URL `github.com/cyberskill-official/design-system-audit-framework` becomes `github.com/dsaf/spec` (or similar neutral org) when FR-GOV-002 (P2) migrates the repo. Until then, the CyberSkill org URL is the canonical. Post-FR-GOV-002, this FR's URL patch will need an update in a follow-up FR.
- **About no `<details>` collapsing in first 600 words:** GitHub's default rendering shows `<details>` as collapsed; a scroller sees a heading without content. The first 600 words are the value-prop surface — they MUST be fully visible without click. `<details>` is welcome for sub-sections after the value-prop is established (e.g., a "Full criteria list" `<details>` later in the README would be reasonable).
- **About the colleague-skim test cadence:** running the test once is the minimum. The optimal is to run it 2-3 times with different colleagues, iterate between, and ship when 2 of 3 PASS spontaneously. The PR description records the final pass.
- **The README is going to be read by HN, Twitter, Reddit, LinkedIn, conference Q&A audiences — all different.** The first 200 words have to land for *each* of those audiences. HN cares about technical specificity; Twitter cares about screenshot value; Reddit cares about explanatory clarity; LinkedIn cares about positioning. The §3 first-200-words draft attempts to hit all four: technical (125-criterion, agent-native), screenshot-able (visual diff DSAF vs SaaS), explanatory (the "missing artefact" framing), positioning (the named SaaS competitors).

---

*End of FR-DOCS-001.*
