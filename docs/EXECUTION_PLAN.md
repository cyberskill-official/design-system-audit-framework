# DSAF — Execution Plan

**Owner:** Stephen Cheng · **Status:** v2.0, 2026-05-18
**Canonical host:** `https://audit.cyberskill.world/` (Vercel, deployed from `landing/`)

This document is the single source of truth for every remaining task from today through the end of P2 (Months 3–6). Each row has an **ID** (other agents can pick up work by reference), an **owner** (`agent` = automatable by another AI, `operator` = Stephen only), a **deliverable** (file path or external evidence), **dependencies**, and an **acceptance criterion**.

Agent-pickup convention: a task whose owner is `agent` and whose dependencies are all `done` is ready to execute. Each agent that completes a task MUST update the task row's status here in the same PR that lands the deliverable.

---

## §0 — Status legend

`todo` → `in-progress` → `done` (or `blocked` / `deferred`).

External tasks (sending emails, posting on platforms) reach `done` when their evidence is logged in the deliverable path (PR description, log file, screenshot in repo, or status update in this document).

---

## §A — Repo-side tasks (agent-automatable)

These tasks can be picked up and executed by any AI agent with repo access. No external accounts required.

| ID | Task | Owner | Deliverable | Depends on | Status | Acceptance |
|---|---|---|---|---|---|---|
| A1 | **Smoke-test the live deploy.** Run every `curl` command in `docs/ops/deploy-runbook.md` §3 against `https://audit.cyberskill.world/`. Capture output. | agent | `docs/ops/deploy-smoke-2026-05-18.md` (log file with all command output) | — | done | Every command returns expected status; no broken routes |
| A2 | **CI workflow.** GitHub Actions YAML that runs on PR: link-check (`scripts/check-links.mjs`), markdown lint, Lighthouse against the Vercel preview URL, fail PR if Lighthouse < 95 on any pillar. | agent | `.github/workflows/landing-ci.yml` | — | todo | Workflow file present, syntactically valid, runs on PR + push to main |
| A3 | **OG image.** Hand-render a 1200×630 px PNG with the DSAF wordmark, tagline ("Audit a design system with criteria, not vibes"), and one accent block. No CyberSkill marks. Export from SVG via headless Chrome or hand-author the SVG and bake. | agent | `landing/og-image.png` + `<meta property="og:image">` wired in `landing/index.html` and `landing/card/index.html` | — | todo | Image present, ≤ 250 KB, referenced from both HTML files |
| A4 | **Favicon.** Single-file SVG favicon using `currentColor` for dark/light adaptation. Just "D" in the brand typography, or a tiny 25-criterion stripe motif. | agent | `landing/favicon.svg` + `<link rel="icon">` in both HTMLs | — | todo | File ≤ 4 KB, renders at 16/32/180/512 px without artefacts |
| A5 | **Markdown → HTML for blog posts.** A tiny `scripts/render-blog.mjs` that turns `landing/blog/*.md` into `landing/blog/*.html` at build time so Vercel serves real HTML (Vercel doesn't render markdown by default). Wire into the Vercel build command. | agent | `scripts/render-blog.mjs` + the two generated `.html` files + updated `landing/vercel.json` build command | — | todo | Both blog URLs return `text/html`; rendered content matches the markdown source |
| A6 | **Analytics decision.** Either install Plausible self-hosted on a Cloudflare Worker (no third-party cookies) OR document an explicit "no analytics in P0" decision until FR-BENCH-001 P4. | agent | `docs/ops/analytics-decision.md` | — | todo | Decision logged with reasoning; if "yes," script tag is in HTML; if "no," explicit P4 deferral noted |
| A7 | **Re-run BRAND-002 ACs** against the live deploy. Per FR-BRAND-002 §5 verification commands. | agent | `docs/branding/brand-audit-2026-05-18.md` | A1 | done | All grep checks return 0 banned phrases; report committed |
| A8 | **Audit history register row.** Append the post-implementation row to `examples/cyberskill-design-system/_history.md` capturing what shipped in batches 0.10.2 → 0.10.4. | agent | `examples/cyberskill-design-system/_history.md` (appended row) | — | todo | New row present with date, mode `SCAN`, scores recomputed |
| A9 | **Per-FR ACs re-verification.** Re-run every scripted AC across all 26 P0–P2 FRs. Produce a single PASS/FAIL matrix. | agent | `docs/feature-requests/AC_VERIFICATION_2026-05-18.md` | A1, A7 | todo | Matrix shows 26/26 PASS or documented FAIL with fix path |
| A10 | **Submit HSTS preload.** Submit `audit.cyberskill.world` at `hstspreload.org`. Log the submission date in `docs/ops/deploy-runbook.md` §5. | agent | Activation-log row in deploy runbook | A1 | todo | Submission accepted (24–48h turnaround at hstspreload.org) |
| A11 | **Generate a Twitter/X card screenshot.** A render of `landing/index.html` at 1200×675 px, exported as PNG for use in cross-posts and conference decks. | agent | `landing/social-card-1200x675.png` | A3 | todo | File present, ≤ 400 KB, hero + section-1 visible without scroll |
| A12 | **Lighthouse audit + report.** Run Lighthouse against `https://audit.cyberskill.world/`. Capture the JSON; commit a summary. | agent | `docs/ops/lighthouse-2026-05-18.json` + `docs/ops/lighthouse-2026-05-18.md` (summary) | A1 | todo | Performance, Accessibility, Best Practices, SEO all ≥ 95 |

## §B — Operator tasks (Stephen only)

Tasks that require accounts, identity, judgement, or external decision-making.

| ID | Task | Owner | Deliverable | Depends on | Status | Acceptance |
|---|---|---|---|---|---|---|
| O1 | **Send reviewer outreach emails** to top 3 from `docs/branding/reviewer-shortlist.md`. Use drafts at `docs/social/reviewer-outreach.md`. | operator | Update `docs/branding/reviewer-shortlist.md` status column from `not-contacted` → `contacted` for the 3 contacted; PR records send-date per reviewer | A1, B1 | todo | All 3 sent; outbox screenshots in PR description |
| O2 | **Send T-7 personal heads-up emails** to 10 named people. Use drafts at `docs/social/personal-outreach.md`. | operator | `docs/launch/personal-outreach.md` "Tracking" table populated with send dates | A1, B2 | todo | All 10 sent; one follow-up after 5 business days only if no reply |
| O3 | **Land approved reviewer quotes in README** (FR-DOCS-002). Only when ≥ 2 reviewers approve quote text in writing. Quote bytes MUST equal `docs/branding/reviewer-consent-log.md` entries. | operator | `README.md` "External review status" section gains a quotes block; `docs/branding/reviewer-consent-log.md` rows filled | O1 produces ≥ 2 approved quotes | blocked | README shows ≥ 2 named quotes; consent log has matching rows |
| O4 | **Submit Show HN.** Tuesday or Wednesday 8–10 am PT. Use body at `docs/social/show-hn.md`. | operator | URL of the live HN post pasted into `docs/launch/post-hn-feedback.md` | A1, B3, (O3 helpful but not required) | todo | Post submitted; first 30-min reply SLA met; tracker started |
| O5 | **Post 6 cross-posts** at T+4h / +6h / +8h / +10h / +12h / +12h. Use bodies at `docs/social/cross-posts.md`. | operator | `docs/launch/cross-posts.md` "Tracking" table populated | O4 done, B4 | blocked | All 6 platforms posted; engagement counts captured at T+24h |
| O6 | **Submit Product Hunt** within 24h of Show HN. Use assets + first comment at `docs/social/product-hunt.md`. | operator | URL of PH page; vote count at T+24h | O4 done, B5 | blocked | PH page live; first comment posted; vote count > 0 |
| O7 | **Pitch guest posts** to Smashing / CSS-Tricks / A List Apart. Use drafts at `docs/social/guest-post-pitches.md`. | operator | `docs/launch/guest-post-pitches.md` tracking table | A1, B6 | todo | All 3 pitches sent; one follow-up after 7 business days only if no reply |
| O8 | **Co-maintainer outreach** (FR-GOV-002). Sequential — Nathan Curtis first. Use draft at `docs/social/co-maintainer-outreach.md`. | operator | `docs/governance/co-maintainer-shortlist.md` status column updated | B7, P2 phase begins (or earlier) | deferred | First candidate contacted; sequential — only move to next if declined |
| O9 | **Publish weekly criterion deep-dives.** Cadence per `docs/content/weekly-deep-dives.md`. Drafts at `docs/content/deep-dives/`. | operator | One published URL on `audit.cyberskill.world` per week, for 12 weeks | A5 done (markdown → HTML) | deferred | Each Monday a new post live; tracking table per `docs/content/cross-publishing.md` |
| O10 | **Cross-publish each deep-dive** at T+24h to dev.to, T+48h to Medium, T+72h to LinkedIn long-form. Templates at `docs/social/cross-publishing-template.md`. | operator | Tracking row per post in `docs/content/cross-publishing.md` | O9 ongoing, B8 | deferred | Per-post: 3 syndication links logged with canonical URL preservation |
| O11 | **Newsletter submissions** per deep-dive — IDS Weekly, Pattern Pulse, Sidebar.io, Smashing Newsletter. Templates at `docs/social/newsletter-submissions.md`. | operator | Tracking row per post in `docs/launch/newsletter-submissions.md` | O9 ongoing, B9 | deferred | Per-post: 4 submissions logged; inclusions tracked at +14d |

## §C — Content artefact bundle (ready-to-post)

These are the content drafts the operator copy/pastes when running §B tasks. Each is post-ready — no fill-in-the-blanks.

| ID | Artefact | Path | Used by |
|---|---|---|---|
| B1 | Reviewer outreach emails (3 personalised) | `docs/social/reviewer-outreach.md` | O1 |
| B2 | Personal heads-up emails (10 personalised) | `docs/social/personal-outreach.md` | O2 |
| B3 | Show HN title + body + first comment | `docs/social/show-hn.md` | O4 |
| B4 | Cross-post titles + bodies (6 platforms) | `docs/social/cross-posts.md` | O5 |
| B5 | Product Hunt name + tagline + description + first comment | `docs/social/product-hunt.md` | O6 |
| B6 | Guest-post pitches (3 publications) | `docs/social/guest-post-pitches.md` | O7 |
| B7 | Co-maintainer outreach script | `docs/social/co-maintainer-outreach.md` | O8 |
| B8 | Cross-publishing template + canonical-URL footer pattern | `docs/social/cross-publishing-template.md` | O10 |
| B9 | Newsletter submission templates × 4 | `docs/social/newsletter-submissions.md` | O11 |
| B10 | First weekly deep-dive (Week 1: A1.1 Color tokens) in full | `docs/content/deep-dives/week-01-a1-1-color-tokens.md` | O9 (week 1) |
| B11 | Deep-dive template + 12-week roadmap | `docs/content/deep-dives/_template.md`, `docs/content/deep-dives/README.md` | O9 (weeks 2–12) |

## §D — Dependency graph

```
A1 ──┐
     ├── A7 ── A9 (verify pass)
A8 ──┘

B1..B7 (content drafts) ──┬── O1 ──┬── O3 ──┐
                          │        │        │
                          ├── O2   │        ├── O4 (Show HN) ─┬── O5 (cross-posts)
                          ├── O7   │        │                  ├── O6 (Product Hunt)
                          └── O8 ──┘        │                  └── (kill-switch if needed)

B8..B11 (deep-dive content) ── A5 (md → html) ── O9 (weekly cadence) ──┬── O10 (cross-publish)
                                                                       └── O11 (newsletters)

OPS gates (deploy runbook §4): A10 (HSTS preload), A12 (Lighthouse) run independently of content.
```

## §E — Order of operations (recommended)

1. **Now (any agent, no blockers):** A1, A2, A3, A4, A5, A6, A8, A10, A11, A12. All §C content artefacts (B1–B11) are already shipped — review them.
2. **After A1 done:** A7 → A9 (re-verify the 26 FRs against the live deploy).
3. **Pre-launch operator window (~2 weeks before O4):** O1 → wait for replies → O3 (land quotes). In parallel: O2, O7. Allow 6–8 weeks lead time for O7 if you want a guest post to publish within 2 weeks of O4.
4. **Launch day (operator):** O4 → O5 → O6. Watch the kill-switch conditions in `docs/launch/show-hn.md`.
5. **Post-launch ongoing (operator + agent):** O8 (co-maintainer) starts when comfortable; O9 + O10 + O11 begin the weekly cadence the Monday after launch.

## §F — Re-batching trigger

Per BACKLOG §0, P3 frontier re-batches when **all four** P2 exit-gate conditions fire:

- ≥ 1 PR merged from a non-CyberSkill engineer at a recognised DS team
- ≥ 1 podcast booking confirmed
- ≥ 1 of the 3 integrations (Storybook addon, Tokens Studio validator, zeroheight reader) shipped as a real npm package (currently CLI-only — phase-shifted MVP)
- Co-maintainer announcement post live + 3 translation PRs open

When all four are green, run a re-batching session against the deferred P3–P6 roadmap rows and convert them to authored FRs.

## §G — How an AI agent picks up work

1. Read this file top to bottom.
2. Find a row in §A where `Owner = agent`, `Status = todo`, and all `Depends on` rows are `Status = done`.
3. Execute the task. The `Deliverable` column tells you the exact file path to write.
4. In the same PR that lands the deliverable, update this file: flip the row's `Status` from `todo` to `done` (or `in-progress` if multi-PR).
5. If you discover a sub-task that needs its own row, add it as `A13`, `A14`, … with the same fields.
6. If you discover a blocker (missing file, ambiguous spec, broken script), surface it as a new row in §H below, mark the original row `blocked`, and stop.

## §H — Blockers (open)

_None at execution-plan ship time. Append rows here as they surface._

| ID | Blocker | Discovered by | Date | Affects | Resolution path |
|---|---|---|---|---|---|

---

*End of execution plan v2.0. Increment to v2.1 on the next material change; full rewrite on phase-transition.*
