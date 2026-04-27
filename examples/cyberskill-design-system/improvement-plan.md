# CyberSkill Design System — Improvement Plan to push the audit score as high as possible

> Phase-based, **step-by-step actions** (no calendar timelines — execute at the team's natural pace).

**Current state:** Combined **84.6%** (Part A 87.2% / Part B 82.0%) → **L5 Optimised** (per [`audit-report-2026-04-27.md`](./audit-report-2026-04-27.md)).

**Realistic ceiling without external action:** ~88–90% (a few easy wins remain).
**Realistic ceiling with full execution of Phases 6–8:** **~95%**.
**Theoretical 100% gate:** bounded by external action (third-party audits, conference acceptance, multi-year trend data, Fortune-500 named adopters). Not pursuing 100% directly — pursuing the *outcomes* a high score signals.

---

## Reading guide

Each phase below has:
- **Goal** — what unlocks at the end.
- **Audit lift** — estimated combined-score impact when completed.
- **Step list** — actions in execution order. Each step has a clear "done when" condition.
- **Dependencies** — what must land before this phase starts.
- **Risk** — what to watch for.

Phases run mostly sequentially but **W1, W2, W3** within Phase 6 can overlap. Phase 7 needs Phase 6 W2 done first (public deploy unlocks adoption telemetry).

---

## Phase 6 — Doctrine consolidation + public release

**Goal:** doctrine is fully self-contained, audit flow is enforced single-file, the system ships publicly so adoption telemetry can flow.
**Audit lift:** +5 to +7 pp combined (84.6% → ~89–92%).

### Wave 1 — Doctrine consolidation (mostly done)

1. **Cleanup pass** ✅ DONE — `_legacy/`, passed audit folder, OS cruft removed.
2. **Single-file audit template** ✅ DONE — `Templates/audit/audit-report-template.md` _(in the design system repo)_; canonical version lives in this framework at [`templates/audit-report-template.md`](../../templates/audit-report-template.md).
3. **Consolidate 2026-04-27 audit** ✅ DONE — [`audit-report-2026-04-27.md`](./audit-report-2026-04-27.md).
4. **Standalone DESIGN.md generator** ✅ DONE — `scripts/build-design-md.mjs` reads only `docs/` + `tokens/`.
5. **Reference cleanup** ✅ DONE — 1,094 bare-Part refs linkified, 36 audit-history attribution lines stripped.
6. **Update audit framework** ✅ DONE — §10 reflects SCAN/FIX modes + `@Agent`/`@Human` actors + no-downgrade rule.
7. **Last-mile reference cleanup** — sweep the 42 remaining external-folder mentions in part files: keep illustrative file paths inside code blocks, move prose pointers to a "Cross-references" section at each part's tail.
   - Done when: `grep -rE '\b(packages/|scripts/|src/|Templates/|locales/|lints/|RFCs/|_audit/|public/)' docs/part-*.md` returns ≤ 30 hits, all inside fenced code blocks.

### Wave 2 — Public release

1. **Repo split — public layer** — extract the 20 doctrine parts + `tokens/` + the 11 npm packages into a public GitHub repo (`cyberskill/design-system`). Internal-only material (audits, RFCs in flight, customer plans) stays private.
   - Done when: `git remote -v` shows the public origin, `git push origin main` works, the README on github.com/cyberskill/design-system displays.
2. **npm publish — first releases** — publish `@cyberskill/{tokens, primitives, web-components, react, vue, svelte, react-native, theme-generator, mcp-server, codemods, spatial}` at v0.1.0 each.
   - Done when: `npm view @cyberskill/tokens version` returns 0.1.0; same for the other 10.
3. **CDN deploy** — push the loader bundle (`dist-cdn/loader.js` 51.5 KB) and `tokens.css` 4.7 KB to Cloudflare R2 via `scripts/build-cdn.mjs`. Wire `cdn.cyberskill.com` DNS.
   - Done when: `curl -I https://cdn.cyberskill.com/v0.1.0/loader.js` returns 200 with the SRI hash.
4. **Wiki SPA public deploy** — `vercel --prod` on the existing repo. This unlocks A.7 adoption + B.8 Core Web Vitals telemetry.
   - Done when: `https://design.cyberskill.com` (or chosen domain) serves the wiki SPA.
5. **Speed Insights wiring** — add Vercel Speed Insights script to the SPA. Set up a Plausible or Umami account (privacy-respecting, GDPR-friendly).
   - Done when: real LCP / INP / CLS p75 values appear in the dashboard within 48h of deploy.
6. **First public release announcement** — short blog post (or LinkedIn post) announcing v0.1.0. Link to GitHub + npm + docs.
   - Done when: announcement is live, has at least one public response.

**Audit lift after Wave 2:** A.7 adoption +3–4 pp, B.8 CWV +2–3 pp, B.10 measurement +1–2 pp ≈ **+5–7 pp combined**.

### Wave 3 — Adoption seed

1. **First marquee customer** — pick one of CyberSkill's 2 active long-term projects, migrate it onto the design system, document the migration as a public case study (with founder's permission for naming).
   - Done when: case study page is live; before/after metrics are quantified (token coverage, story coverage, bundle size, dev velocity).
2. **First external contribution** — invite at least 3 friends-of-the-firm to file a small PR (typo, doc fix, new microcopy). Walk them through the contribution flow.
   - Done when: 3 external PRs have been merged; CONTRIBUTING.md has been validated by an outsider.
3. **Practitioner survey — first run** — distribute `Templates/research-ops/practitioner-survey.md` to internal team + 10 friendly designers/developers. Compile results.
   - Done when: ≥10 responses logged; B.10.5 NPS/CSAT/CES has real data.
4. **Adoption leaderboard — first quarterly snapshot** — per the spec in `docs/_audit/adoption-leaderboard-spec.md` (regenerate from `00-audit-and-roadmap.md` if removed). Track per-product coverage.
   - Done when: snapshot exists; first dated entry committed.

**Risk:** open-source release before doctrine is stable — discoverability cuts both ways. Mitigation: v0.1.0 marks "stable structure, evolving content"; semver discipline holds.

---

## Phase 7 — External validation

**Goal:** convert internal evidence into external recognition. Score lift comes from independent audits + community signals + measured adoption.
**Audit lift:** +3 to +5 pp combined (~89–92% → ~92–95%).
**Dependencies:** Phase 6 Wave 2 done.

### Wave 1 — Independent audits

1. **WCAG 2.2 AA audit — vendor procurement** — using `_audit/2026-04-26/a11y-audit-rfp.md` (regenerate if removed) or write fresh. Send to 3 vendors (Deque, TPGi, Level Access). Pick the best fit by quote + timeline.
   - Done when: SOW signed; kickoff date scheduled.
2. **WCAG 2.2 AA audit — fix cycle** — vendor delivers report; team fixes findings; vendor re-tests; vendor signs final letter.
   - Done when: signed letter is on file; A.8.6 lifts 4 → 5 (+1.4 pp on its own).
3. **Privacy / consent UX review** — separate vendor pass on PDPL + GDPR + EU AI Act compliance for the consent flows. Smaller scope, ~1/3 the cost of the WCAG audit.
   - Done when: signed letter on file; B.9.5 holds at 5; A.8 sustains.
4. **Performance audit — webpagetest + Lighthouse CI** — wire `webpagetest.org` daily run + Lighthouse CI on every deploy. Publish the current p75 LCP / INP / CLS publicly on the docs site.
   - Done when: dashboard page is live + linked from README; B.8.1–B.8.4 lift to 4 each.

### Wave 2 — Community signals

1. **Conference talk submission — round 1** — submit talk abstracts (the 3 already in the archive: `agentic-design-systems`, `vietnam-first-localization`, `mcp-design-system`) to: Config 2027, SmashingConf, FrontEnd Foxes, ClarityConf, Web Directions. 5+ submissions per abstract.
   - Done when: each abstract has been submitted ≥ 5 times.
2. **Conference talk — first acceptance** — selection rate ~10–20%, so 15+ submissions should yield 1–3 accepts.
   - Done when: first accept letter; talk on the calendar.
3. **Open-source community building** — GitHub Discussions on; weekly office hours (1h, public Zoom); first 5 issues triaged within 24h to set the cadence.
   - Done when: ≥ 50 GitHub stars, ≥ 10 issues opened, ≥ 5 distinct external contributors.
4. **Plugin / addon ecosystem** — invite 1–3 third-parties to build a `@cyberskill/<plugin>` package (e.g., `@cyberskill/charts`, `@cyberskill/forms-extended`).
   - Done when: at least one third-party plugin in the org's npm scope.

### Wave 3 — Measured adoption

1. **Second product migration** — migrate the second active CyberSkill project onto the design system. Compute time-to-ship delta vs the first migration.
   - Done when: A.7.5 time-to-ship has 2 data points; can compute delta.
2. **Friend-of-the-firm migrations** — recruit 3 external teams (start-ups, agencies) to migrate to the system in exchange for free founder support + named case studies.
   - Done when: 3 named adopters with public case studies.
3. **Telemetry-driven A/B tests** — first pre-registered A/B test using `Templates/research-ops/pre-registration-template.md`. Topic suggestion: locale microcopy variants for the cohort-1 stub locales.
   - Done when: pre-registration filed; test executed; results published with effect size + CI.

**Audit lift after Phase 7:** A.7 +4–6 pp, A.8 +2 pp, B.8 +3–4 pp, B.10 +2 pp, A.4 contribution-rate +1–2 pp ≈ **+3–5 pp combined**.

**Risk:** vendor delays for the WCAG audit; conference rejections. Mitigation: keep submitting; pick the cheapest vendor with the best reputation, not the most expensive.

---

## Phase 8 — Sustained leadership

**Goal:** convert the system into a durable advantage — recurring revenue, talent flywheel, doctrine-as-product.
**Audit lift:** +1 to +3 pp combined (~92–95% → ~95%+).
**Dependencies:** Phase 7 Wave 1 done; ≥ 1 conference talk delivered.

### Wave 1 — Doctrine-as-product

1. **Paid tier — `cyberskill/design-system-pro`** — premium components + figma kit + priority Slack support, $X/seat/month. Free tier covers the public OSS layer.
   - Done when: first paid customer signed.
2. **Custom theme service** — productise `@cyberskill/theme-generator` as a service: brand color in → fully theme'd token set + component preview + APCA report out. $Y per theme.
   - Done when: first 3 themes shipped to paying customers.
3. **Vertical-pack productisation** — pick 1 of the 14 vertical packs (HR Tech, Fintech, Healthcare, Education) and turn it into a complete kit with components, microcopy, and example flows. $Z one-time license.
   - Done when: first vertical pack sold + delivered.

### Wave 2 — Talent flywheel

1. **Hiring page** — design-systems engineer JD + designer JD, public on the docs site. Lead with "we built [audit URL]".
   - Done when: first inbound application from someone outside Vietnam.
2. **Apprenticeship — internal** — use the design system as the curriculum for a Vietnamese designer / developer apprenticeship (2 hires/year).
   - Done when: first apprentice has shipped their first PR.
3. **University partnership** — pick one Vietnamese design / CS program (FPT University, RMIT Vietnam). Offer the design system as a teaching resource + student capstone projects.
   - Done when: first cohort using the doctrine in a course.

### Wave 3 — Trend data + governance

1. **First annual full audit** — calendar 2027-01-26 per `_history.md`. Run with a human Co-Auditor pairing (founder + senior designer / developer). Compare to baseline.
   - Done when: audit signed; first per-criterion delta line in `_trends.md`.
2. **Quarterly DYNAMIC re-score** — each Q1/Q3, rescore the DYNAMIC criteria as standards evolve. Update §6 / §7 rubric language.
   - Done when: 4 quarterly re-scores in `_history.md`.
3. **First doctrine RFC from outside** — solicit an external designer / engineer to file an A2 RFC. The outside perspective stress-tests the change pipeline.
   - Done when: external RFC merged.
4. **Sustainability review** — annual review of the part-6 (AI ethics, sustainability) goals against actual carbon / energy / inclusion metrics.
   - Done when: first dated review entry; results published.

**Audit lift after Phase 8:** A.4 +1 pp, A.7 +1 pp, B.10 trends +1 pp ≈ **+1–3 pp combined**.

---

## What this plan does NOT do

This plan deliberately does **not** chase the last few criteria that gate on:

1. **Year-over-year trend data** (B.10.6 triangulation, A.4.6 roadmap transparency at 5+) — needs ≥ 2 annual audits with measurable deltas. Pure calendar.
2. **A multi-year sustained-quality streak** — some industry-leading benchmarks require a track record, not a snapshot. Pure calendar.
3. **Fortune-500 marquee adoption** — sales cycle is 6–18 months minimum. Worth pursuing in parallel with Phase 7, but not the gating activity.

These criteria sit at scores 4 in the current audit. They lift to 5 *naturally* as Phases 6–8 execute and time passes. Pushing them artificially is theatre.

---

## Combined trajectory

| Phase | Combined score | Tier |
|---|---|---|
| Now (2026-04-27) | 84.6% | L5 Optimised |
| End of Phase 6 (doctrine + public release + first adoption) | ~89–92% | L5 deep |
| End of Phase 7 (independent audits + community + measured adoption) | ~92–95% | L5 industry-leading |
| End of Phase 8 (doctrine-as-product + talent flywheel + trend data) | ~95%+ | L5 sustained |

**The remaining ~5%** to 100% sits in: the WCAG vendor's signature, the conference acceptance, the first 10 external contributors, the second annual audit's trend line, and the first Fortune-500 named customer. Money + time + execution + a small dose of luck.

---

## How to use this plan

Each step in this plan has a "done when" condition. Track progress in the running list at `docs/_audit/_history.md` under "Phase milestones". Append a row when each phase wave completes.

When ambiguity arises about what to do next, use this priority order:

1. **Anything `@Human[manual]` blocking the next audit's score.** These typically need the most calendar time.
2. **Anything that unlocks measurement.** Public deploy unlocks 4 categories at once — outsized leverage.
3. **Anything that compounds.** First customer case study → second customer pitch leverages it → third becomes self-sustaining.
4. **Doctrine improvements.** Token additions, new patterns, vertical packs. These move the score 1–2 pp at a time.

The framework's own §14 operating cadence (quarterly DYNAMIC re-score, annual full audit) provides the pacing. This plan provides the content for those cycles.

---

*Improvement plan generated 2026-04-27. Review and revise after each completed phase wave.*
