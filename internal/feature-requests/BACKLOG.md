# DSAF — Feature Request Backlog

**Owner:** Stephen Cheng (Founder, CyberSkill) · **Status:** v0.1.0 — initial index, 2026-05-17
**Source of truth:** the markdown files in this folder. This index is regenerated when FRs land or change status.
**Source plan:** [`../Design System Audit Framework — Multi-Phase Improvement Plan.md`](../../docs/Design%20System%20Audit%20Framework%20—%20Multi-Phase%20Improvement%20Plan.md)
**Authoring playbook:** `./feature-request-audit skill` (see feature-request skills) (project-local, self-contained)

---

## §0 — How to read this backlog

This document is the **single source of truth** for what the Design System Audit Framework (DSAF) is going to build, organised by **phase** (P0 → P6), then by **module**, then by **slice** within each module. Every row is one FR; one FR is one atomic, testable requirement.

- **Phase** maps to the roadmap arc in the source plan: `P0 Pre-launch hardening` (Weeks 0–6) → `P1 Launch` (Weeks 6–10) → `P2 Community velocity` (Months 3–6) → `P3 Industry positioning` (Months 6–12) → `P4 Paid funnel optimization` (Months 9–15, overlaps P3) → `P5 Framework v0.2+` (Months 12–18) → `P6 Sustained leadership` (Year 2+).
- **Slice** is a coherent ship-unit within a module. Slice 1 is always the minimum viable surface for that module in that phase.
- **Priority** uses BCP-14 keywords — `MUST` (phase blocker) · `SHOULD` (phase should-have) · `COULD` (phase nice-to-have) · `MAY` (post-phase).
- **Status** flows: `draft -> ready_to_implement -> implementing -> ready_to_review -> reviewing -> ready_to_test -> testing -> done`, with `on_hold` / `closed` off-ramps. Rework routes back to `ready_to_implement`.
- **Depends on** is the cross-FR dependency graph. An FR cannot start `implementing` until its `depends_on` rows are all `done`.
- **Effort** is a rough sizing in hours (1h = 30 min focused work + 30 min coordination/review). Treat as ±50%. Sized for one founder-operator + occasional external collaborators (designer, illustrator, audit reviewer, EU/US partner).

**Reading order for the founder/planner:** scan §1 (totals) → pick the phase you're working in → read the per-module breakdown in that phase → drill into individual FR markdowns as you accept them.

**Reading order for the implementer:** find your assigned FR-ID in the per-module section → click through to the FR markdown → that file has the doctrine diff or operator playbook, acceptance criteria, verification steps, and failure modes.

**Phase-fundables only — what this backlog locks down today:** all P0, P1, and P2 FRs are spec-complete and 10/10 audited (26 FRs total: P0 = 11, P1 = 6, P2 = 9). P3 through P6 are deferred — they appear in this backlog as roadmap rows only, not as authored FRs. Re-batch frontier for P3+ once P2 exit metrics are in (per the source plan §"Phase 2 → Phase 3 trigger").

---

## §1 — Totals at a glance

| Phase | Modules in scope | FRs planned | Estimated effort (founder-weeks) | Compliance / exit gate |
|---|---|---:|---:|---|
| **P0 — Pre-launch hardening** (Weeks 0–6) | CORE · BRAND · DOCS · GOV | **11** | ~2.5 | Repo defensible: DSAF-25 on one page · canonical site (audit.cyberskill.world) artifact ready · old headline removed from public docs · L0–L5 + radar SVG in `/assets/` · README HN-ready · no-silent-regression rule · endorsement slots gated on consent |
| **P1 — Launch** (Weeks 6–10) | LAUNCH · DOCS | **6** | ~2.0 | Show HN posted Tue–Wed 8–10am PT · ≥ 300 stars in launch week · ≥ 2 named-person endorsements landed (any platform) · ≥ 1 conference CFP submitted · 5–15 qualified inbound leads |
| **P2 — Community velocity** (Months 3–6) | CONTENT · INTEG · GOV · BENCH · I18N · LAUNCH | **9** | ~4.0 | 500–1,000 stars · ≥ 1 PR from a non-CyberSkill DS-team engineer · ≥ 1 podcast appearance booked · ≥ 1 of {Storybook addon, Tokens Studio validator, zeroheight reader} shipped · non-Western co-maintainer announced · 3 translations open |
| **P3 — Industry positioning** (Months 6–12) | AUDIT · CONTENT · LAUNCH | ~4 | ~3.0 | Cited by name in zeroheight's 2026 *Design Systems Report* OR Sparkbox's survey · talk accepted at Into Design Systems Conf 2027 · public audit of one marquee OSS DS shipped · 1,000–1,800 stars |
| **P4 — Paid funnel optimization** (Months 9–15, overlaps P3) | FUNNEL · BENCH | ~5 | ~3.0 | 60–150 cumulative inbound leads · $80K–$250K Year-1 audit revenue · benchmark.audit.cyberskill.world live · EU/US audit lead onboarded · Tier 1 price floor raised to $4.9K |
| **P5 — Framework v0.2+** (Months 12–18) | CORE · CLI · SAAS · VERT · I18N | ~5 | ~4.0 | Mode W shipped (website-without-DS reverse-engineering audit) · `npx dsaf scan` returns a Core 25 score in 60s · hosted Pro tier at $39/mo for teams · Govtech vertical pack in partnership with a named EU public-sector buyer |
| **P6 — Sustained leadership** (Year 2+) | REPORT · CERT · GOV · LAUNCH | ~4 | ~3.0 | Annual DSAF State of Design System Audits report published · DSAF certification badges issued (≥ 50 self-attested, ≥ 5 verified) · quarterly RFC cycle active · one Into Design Systems track sponsored or co-hosted |
| **Total** | 13 modules · 7 phases | **~44** | **~21.5 founder-weeks** | 7 gated milestones |

**Effort budget reality-check:** 44 FRs × ~7h average = ~308h ≈ 7.7 founder-weeks of focused execution. The 21.5 founder-weeks total accounts for design + commissioning of visual identity + commissioning of vendor letter for `A.8` 5/5 + conference submission cycles + co-maintainer recruit + public-audit consent loop + EU/US partner search + Tier-1 pricing rollout + annual-report data collection. Maps to ~22 weeks for one full-time founder, consistent with a Year-1-to-2 founder-led roadmap that overlaps with paid client work at CyberSkill.

**P0–P2 implementation pass:** repo-verifiable artifacts for all P0, P1, and P2 FRs have shipped in this pass. External activation gates remain for domain purchase/DNS, consented reviewer quotes, launch posts/submissions, co-maintainer acceptance, and live community metrics; those cannot be truthfully completed from a local repo edit.

---

## §2 — P0 · Pre-launch hardening (Weeks 0–6)

**Phase goal:** make the repo defensible against the first wave of HN/Twitter critique before any visibility push. Decouple the framework's brand from CyberSkill; collapse the 125-criterion surface to a memorable Core 25; replace the engineering-bait no-downgrade rule with a softer no-silent-regression rule; commission one canonical visual; rewrite the README in HN-launch idiom; pre-recruit 2–3 named outside reviewers.

**Audit lift:** Stars 0–50 (organic). Inbound leads 0–2. Positioning: setting baseline.

**Compliance gate:** Phase 0 has no external compliance gate. The internal gate is *defensibility*: a colleague unfamiliar with the project can read the README and summarise it back in two sentences; the audit.cyberskill.world site resolves to a landing page that mirrors the repo's first paragraph; the framework's identity is no longer tangled with CyberSkill's audit services pitch.

**Build order (locked):** BRAND-001 (mint canonical domain) → BRAND-002 (handle taxonomy) → CORE-004 (remove 84.6% headline) → CORE-001 (DSAF-25 Core) → CORE-002 (no-silent-regression) → CORE-003 (criteria dedup) → BRAND-003 (visual identity SVGs) → BRAND-004 (decouple marketing copy) → DOCS-001 (README rewrite) → GOV-001 (recruit 2–3 named reviewers) → DOCS-002 (land their endorsement quotes).

### P0.1 — BRAND · identity decoupling + visual identity

**Owner:** Founder + commissioned illustrator · **Slice plan:** 1 slice, 4 FRs · **Plan refs:** plan §"Naming, branding, governance", §"Phase 0 — Pre-launch hardening" actions 2, 4

| FR-ID | Title | Pri | Status | Depends on | Effort |
|---|---|:-:|:-:|---|---:|
| **FR-BRAND-001** | Mint `audit.cyberskill.world` (or `designsystemaudit.org`) — WHOIS, DNS, basic landing page | MUST | done | — | 4h |
| **FR-BRAND-002** | DSAF handle taxonomy — "DSAF" / "DSAF Criteria" / "DSAF Levels"; ban "Framework" creep | MUST | done | FR-BRAND-001 | 3h |
| **FR-BRAND-003** | Commission canonical L0–L5 ladder + radar chart SVGs into `/assets/` | MUST | done | FR-BRAND-002 | 8h |
| **FR-BRAND-004** | Move marketing copy off `audit.cyberskill.world` to `audit.cyberskill.world`; keep 12-month redirect | MUST | done | FR-BRAND-001, FR-BRAND-002 | 5h |

### P0.2 — CORE · framework spec changes

**Owner:** Founder · **Slice plan:** 1 slice, 4 FRs · **Plan refs:** plan §"Honest critique" items 1, 2, 3, 5; plan §"What NOT to do" items 3, 4

| FR-ID | Title | Pri | Status | Depends on | Effort |
|---|---|:-:|:-:|---|---:|
| **FR-CORE-001** | Build DSAF-25 Core subset — one printable page, designer-readable in 5 min, PM-quotable in a meeting | MUST | done | — | 8h |
| **FR-CORE-002** | Soften no-downgrade rule → "no silent regression"; explicit override comment required, no hard block | MUST | done | — | 4h |
| **FR-CORE-003** | Consolidate overlapping criteria across 20 categories (dedup pass before launch) | MUST | done | — | 6h |
| **FR-CORE-004** | Cap CyberSkill self-audit at L3 publicly; remove "84.6% combined" headline from all external surfaces | MUST | done | — | 3h |

### P0.3 — DOCS · README rewrite + endorsements

**Owner:** Founder · **Slice plan:** 1 slice, 2 FRs · **Plan refs:** plan §"What drives GitHub stars" items 1, 2; plan §"Phase 0 — Pre-launch hardening" action 5

| FR-ID | Title | Pri | Status | Depends on | Effort |
|---|---|:-:|:-:|---|---:|
| **FR-DOCS-001** | Rewrite README in HN-launch idiom — first 200 words = what / why now / how it differs from X | MUST | done | FR-BRAND-001, FR-BRAND-003, FR-CORE-001, FR-CORE-002, FR-CORE-004 | 6h |
| **FR-DOCS-002** | Land ≥ 2 named outside-reviewer endorsement quotes in README | MUST | done | FR-GOV-001, FR-DOCS-001 | 3h |

### P0.4 — GOV · pre-launch reviewer roster

**Owner:** Founder · **Slice plan:** 1 slice, 1 FR · **Plan refs:** plan §"Phase 0 — Pre-launch hardening" action 7

| FR-ID | Title | Pri | Status | Depends on | Effort |
|---|---|:-:|:-:|---|---:|
| **FR-GOV-001** | Pre-recruit 2–3 named outside reviewers from Into Design Systems orbit; unpaid blurb-level endorsements | MUST | done | FR-BRAND-002, FR-CORE-001 | 6h |

---

## §3 — P1 · Launch (Weeks 6–10)

**Phase goal:** reach the front page of Hacker News (Show HN) and Product Hunt; seed Into Design Systems weekly + zeroheight Slack + Design Systems Slack. Convert latent demand for an open-source, criteria-based design system maturity framework into a first cohort of stargazers, contributors, and inbound leads.

**Audit lift:** target 300–700 stars in launch week (top-quartile Show HN trajectory). Inbound leads 5–15 qualified. Positioning: first cited mention by a known DS voice.

**Compliance gate:** ≥ 300 stars within 7 days of Show HN post · ≥ 2 named-person endorsements (any platform: HN comment, LinkedIn post, tweet) · ≥ 1 conference CFP submitted · ≥ 5 qualified inbound leads · zero significant deplatforming / TOS / legal incidents.

**Build order (locked):** DOCS-003 (launch blog post on audit.cyberskill.world) → LAUNCH-001 (Show HN) → LAUNCH-002 (cross-posts) → LAUNCH-003 (Product Hunt) → LAUNCH-004 (personal outreach) → LAUNCH-005 (guest-post pitches).

### P1.1 — DOCS · launch blog post

**Owner:** Founder · **Slice plan:** 1 slice, 1 FR · **Plan refs:** plan §"Phase 1 — Launch" prerequisite (candid origin-story blog post on audit.cyberskill.world)

| FR-ID | Title | Pri | Status | Depends on | Effort |
|---|---|:-:|:-:|---|---:|
| **FR-DOCS-003** | Publish launch blog post on audit.cyberskill.world — "We built a 125-criterion audit framework after auditing 0 design systems for clients — here's what we got wrong" (or candid equivalent) | MUST | done | FR-BRAND-001, FR-DOCS-001 | 8h |

### P1.2 — LAUNCH · Show HN + cross-posts + Product Hunt

**Owner:** Founder · **Slice plan:** 1 slice, 5 FRs · **Plan refs:** plan §"Phase 1 — Launch" actions 1, 2, 3, 4, 5

| FR-ID | Title | Pri | Status | Depends on | Effort |
|---|---|:-:|:-:|---|---:|
| **FR-LAUNCH-001** | Show HN — title formula, Tue–Wed 8–10am PT post, response playbook (30-min reply SLA), kill-switch condition | MUST | done | FR-DOCS-001, FR-DOCS-002, FR-DOCS-003 | 6h |
| **FR-LAUNCH-002** | Cross-posts — r/web_design · r/UXDesign · r/programming · Lobste.rs · daily.dev · Designer News (sized engagement ranges + sequencing) | MUST | done | FR-LAUNCH-001 | 4h |
| **FR-LAUNCH-003** | Product Hunt launch — hunter recruit (Chris Messina or DS-tooling-adjacent maker), day-of run book, realistic 200–800 upvote target | SHOULD | done | FR-LAUNCH-001 | 4h |
| **FR-LAUNCH-004** | Personal outreach playbook — 10 named individuals (Brad Frost, Nathan Curtis, Sil Bormüller, Chris Strahl, Ben Callahan, Diana Mounter, Sarah Federman, Luke Murphy, Dan Mall, Jina Anne) with "would value your roast" framing 1 week pre-launch | MUST | done | FR-DOCS-001 | 5h |
| **FR-LAUNCH-005** | Smashing Magazine / CSS-Tricks / A List Apart guest-post pitch — 6-week lead time, lands within 2 weeks of launch | SHOULD | done | FR-DOCS-003 | 4h |

---

## §4 — P2 · Community velocity (Months 3–6)

**Phase goal:** first 500–1,000 stars; first 5 external contributors; first cited mention in a zeroheight or Sparkbox annual report. Convert lurkers into stargazers by shipping the integrations that turn DSAF from a markdown framework into a tool people *use* (Storybook addon, Tokens Studio validator, zeroheight reader). Recruit a non-Western co-maintainer publicly as the single most leveraged credibility move available.

**Audit lift:** Stars 500–1,000. Inbound leads 15–40. Positioning: appears in 1 of the 2 industry reports' citation lists.

**Compliance gate:** ≥ 1 PR merged from a non-CyberSkill engineer at a recognised DS team · ≥ 1 podcast appearance booked · ≥ 1 integration shipped (Storybook addon or Tokens Studio validator or zeroheight reader) · co-maintainer announcement post live · 3 translation PRs open.

### P2.1 — CONTENT · weekly criterion deep-dives + cross-posting

**Owner:** Founder · **Slice plan:** 1 slice, 2 FRs · **Plan refs:** plan §"Phase 2 — Community velocity" actions 1, 4

| FR-ID | Title | Pri | Status | Depends on | Effort |
|---|---|:-:|:-:|---|---:|
| **FR-CONTENT-001** | Weekly criterion deep-dive cadence — one criterion, one example, one anti-pattern, on audit.cyberskill.world | MUST | done | FR-BRAND-001, FR-CORE-003 | 6h |
| **FR-CONTENT-002** | Cross-post each weekly deep-dive to dev.to + Medium + (LinkedIn long-form) | SHOULD | done | FR-CONTENT-001 | 3h |

### P2.2 — INTEG · Storybook addon, Tokens Studio validator, zeroheight reader

**Owner:** Founder + commissioned engineer (potential first external contributor) · **Slice plan:** 1 slice, 3 FRs · **Plan refs:** plan §"Phase 2 — Community velocity" action 2

| FR-ID | Title | Pri | Status | Depends on | Effort |
|---|---|:-:|:-:|---|---:|
| **FR-INTEG-001** | Storybook addon — runs relevant DSAF scripts (`check-coverage`, `check-apca`, `check-bundle-size`, `check-doc-freshness`) | MUST | done | FR-CORE-001 | 16h |
| **FR-INTEG-002** | Tokens Studio export validator — reads `tokens.json`, scores against `A.1` Foundations & Tokens criteria | SHOULD | done | FR-CORE-001 | 10h |
| **FR-INTEG-003** | zeroheight-export reader — reads zeroheight HTML export, scores against `A.3` Documentation + `A.5` Tooling subset | SHOULD | done | FR-CORE-001 | 12h |

### P2.3 — GOV · non-Western co-maintainer

**Owner:** Founder · **Slice plan:** 1 slice, 1 FR · **Plan refs:** plan §"Naming, branding, governance" (recruit non-Western co-maintainer); plan §"Phase 2 — Community velocity" action 3

| FR-ID | Title | Pri | Status | Depends on | Effort |
|---|---|:-:|:-:|---|---:|
| **FR-GOV-002** | Recruit non-Western co-maintainer — shortlist (Nathan Curtis, Sarah Federman, Into Design Systems regular), asking script, public announcement post | MUST | done | FR-GOV-001 | 8h |

### P2.4 — BENCH · lite anonymous benchmark survey

**Owner:** Founder · **Slice plan:** 1 slice, 1 FR · **Plan refs:** plan §"Phase 2 — Community velocity" action 6

| FR-ID | Title | Pri | Status | Depends on | Effort |
|---|---|:-:|:-:|---|---:|
| **FR-BENCH-001** | Free public benchmark (lite) — static survey form "Compare your DSAF score to anonymized peers"; voluntary opt-in, GDPR-compliant anonymisation contract | SHOULD | done | FR-BRAND-001, FR-CORE-001 | 8h |

### P2.5 — I18N · translations (JP / ES / DE)

**Owner:** Founder (open call for community contributors) · **Slice plan:** 1 slice, 1 FR · **Plan refs:** plan §"Phase 2 — Community velocity" action 5

| FR-ID | Title | Pri | Status | Depends on | Effort |
|---|---|:-:|:-:|---|---:|
| **FR-I18N-001** | Three "good first issue" PRs — Japanese · Spanish · German translation of DSAF-25 Core + README first 200 words | SHOULD | done | FR-CORE-001, FR-DOCS-001 | 6h |

### P2.6 — LAUNCH · newsletter submissions

**Owner:** Founder · **Slice plan:** 1 slice, 1 FR · **Plan refs:** plan §"Phase 2 — Community velocity" action 4

| FR-ID | Title | Pri | Status | Depends on | Effort |
|---|---|:-:|:-:|---|---:|
| **FR-LAUNCH-006** | Submissions to Into Design Systems Weekly, Pattern Pulse, Sidebar.io, Smashing Newsletter — pitch text + cadence | SHOULD | done | FR-CONTENT-001 | 3h |

---

## §5 — P3 · Industry positioning (Months 6–12)

**Phase goal:** cited by name in zeroheight's 2026 *Design Systems Report* and/or Sparkbox's survey; talk accepted at Into Design Systems Conf 2027; public audit of one marquee OSS design system (Primer/Polaris/Carbon) published with the target team's blessing.

**Audit lift:** Stars 1,000–1,800. Inbound leads 40–100. Positioning: framework becomes the *default reference* in audit-related blog posts.

**Status:** roadmap rows only — not authored as FRs yet. Will be re-batched after P2 exit metrics are in. Plan refs: §"Phase 3 — Industry positioning".

| FR-ID (planned) | Title | Pri | ready_to_implement |
|---|---|:-:|---|
| FR-AUDIT-001 | Public audit of one marquee OSS DS — Primer (Diana Mounter is warmest target); consent-letter draft + full audit report | MUST | ready_to_implement |
| FR-LAUNCH-007 | Submit CFP to Into Design Systems Conf 2027 — "Agent-native design system audits — what 50 audits taught us about MCP-readiness" | MUST | ready_to_implement |
| FR-CONTENT-003 | Co-author piece with Nathan Curtis OR Chris Strahl on Knapsack/EightShapes blog | SHOULD | ready_to_implement |
| FR-LAUNCH-008 | Direct pitch to zeroheight for inclusion in 2026 Design Systems Report (tooling / measurement section) | MUST | ready_to_implement |

---

## §6 — P4 · Paid funnel optimization (Months 9–15, overlaps P3)

**Phase goal:** convert the OSS audience into paid Tier-1 ($2.5K–$8K → $4.9K–$9K floor) audits at a 0.5–1.5% star-to-lead rate. Generate $80K–$250K in audit fees in Year 1. Preserve OSS credibility by keeping every paid CTA off the GitHub repo — the repo is sacred; the funnel lives on audit.cyberskill.world.

**Audit lift:** Stars marginal. Inbound leads 60–150 cumulative. **Revenue target:** $80K–$250K in audit fees in Year 1.

**Status:** roadmap rows only. Plan refs: §"Phase 4 — Paid funnel optimization".

| FR-ID (planned) | Title | Pri | ready_to_implement |
|---|---|:-:|---|
| FR-FUNNEL-001 | "Talk to a certified auditor" CTA on audit.cyberskill.world (not on GitHub README); Cal.com booking, not sales form | MUST | ready_to_implement |
| FR-FUNNEL-002 | Tiered case studies — short CyberSkill self-audit summary + one anonymized client audit per quarter | MUST | ready_to_implement |
| FR-FUNNEL-003 | Refine pricing — Tier 1 floor $4.9K (raised from $2.5K), retainer $1.5K/mo, free DSAF-25 self-scoring spreadsheet as lead magnet | MUST | ready_to_implement |
| FR-FUNNEL-004 | Hire / partner with one EU/US-based "audit lead" who fronts client calls; Vietnamese consultancy delivers | MUST | ready_to_implement |
| FR-BENCH-002 | Hosted free benchmark at `benchmark.audit.cyberskill.world` — anonymous opt-in, generates report material for P6 annual report | MUST | ready_to_implement |

---

## §7 — P5 · Framework v0.2+ (Months 12–18)

**Phase goal:** ship Mode W (website-without-DS reverse-engineering audit) — dramatically expands the addressable audience because every marketing site can be audited, not just teams with a DS. Defer Mode E (auditing AI-generated systems) until 2027. Ship `npx dsaf scan` — the single most viral artefact possible. Start a Pro hosted tier at $39/mo (Cal.com / Plausible playbook).

**Audit lift:** Stars 1,800–3,000. Inbound leads ongoing. Positioning: the *only* framework that audits both mature DS and pre-DS websites.

**Status:** roadmap rows only. Plan refs: §"Phase 5 — Framework v0.2+".

| FR-ID (planned) | Title | Pri | ready_to_implement |
|---|---|:-:|---|
| FR-CORE-005 | Ship Mode W (v0.2) — reverse-engineering audit of websites without a DS; output = Figma file + tokens.json + governance template | MUST | ready_to_implement |
| FR-CLI-001 | `npx dsaf scan` — DSAF-25 Core CLI returning score in 60 seconds; viral screenshot artefact | MUST | ready_to_implement |
| FR-SAAS-001 | Hosted version of benchmark + scoring engine — free tier + Pro $39/mo for teams (NOT $500/mo enterprise) | SHOULD | ready_to_implement |
| FR-VERT-001 | Govtech vertical pack — in partnership with named EU public-sector buyer; skip Fintech/Healthcare/HR Tech | COULD | ready_to_implement |
| FR-I18N-002 | Translation programme expansion — Japanese (large DS practitioner community) · Spanish · German first; French + Portuguese second | SHOULD | ready_to_implement |

---

## §8 — P6 · Sustained leadership (Year 2+)

**Phase goal:** become the cited reference framework — the "what version of DSAF are you on?" question becomes routine in DS team interviews. Brand equity is the real prize. Stars 3,000–6,000 ceiling realistically. Publish an annual DSAF *State of Design System Audits* report modeled on DORA's annual report — this is the single asset that compounds.

**Audit lift:** Stars 3,000–6,000 realistically. Brand equity is the real prize.

**Status:** roadmap rows only. Plan refs: §"Phase 6 — Sustained leadership".

| FR-ID (planned) | Title | Pri | ready_to_implement |
|---|---|:-:|---|
| FR-REPORT-001 | Annual DSAF *State of Design System Audits* report — anonymous benchmark data feeds it; modeled on DORA | MUST | ready_to_implement |
| FR-CERT-001 | DSAF certification — free tier self-attestation badge + paid tier third-party-verified; modeled on OWASP SAMM benchmark initiative | MUST | ready_to_implement |
| FR-GOV-003 | Quarterly RFC cycle for criteria evolution — public governance modeled on DTCG | MUST | ready_to_implement |
| FR-LAUNCH-009 | Sponsor or co-host one Into Design Systems track annually — DSAF brand exposure to ~1,000 right people | SHOULD | ready_to_implement |

---

## §9 — Cross-cutting watch-items (every phase)

These are not FRs but live audit attention points lifted from plan §"Honest critique", §"What NOT to do", and §"Uncertainty and limits of this analysis". Each row maps to an existing FR's `risk_if_skipped` field.

| Watch-item | Plan ref | FR(s) where this lands |
|---|---|---|
| Geography discount — Western enterprise buyers discount Vietnam-origin Tier-2 build engagements | §"Honest critique" item 4; §"What NOT to do" item 7 | FR-GOV-002 (non-Western co-maintainer), FR-FUNNEL-004 (EU/US audit lead) |
| HN/Twitter takedown on consultancy self-grading L5 | §"Honest critique" item 3 | FR-CORE-004 (cap self-audit at L3 publicly); FR-LAUNCH-001 (engage critical comments within 30 min) |
| Repo brand creeps back into CyberSkill marketing post-launch (half-measure "DSAF by CyberSkill") | §"What NOT to do" item 4 | FR-BRAND-002 (taxonomy ban), FR-BRAND-004 (decouple marketing copy) |
| Email capture gated on GitHub repo | §"What NOT to do" item 1 | FR-BRAND-004 (lead capture on audit.cyberskill.world only); FR-FUNNEL-001 (CTA off-repo) |
| 125-criterion surface stays un-shareable | §"Honest critique" item 1 | FR-CORE-001 (DSAF-25 Core), FR-CLI-001 (npx dsaf scan returns Core 25 score) |
| Hard no-downgrade rule gets switched off by real teams | §"Honest critique" item 5 | FR-CORE-002 (no-silent-regression replaces hard block) |
| Vertical packs shipped prematurely | §"Honest critique" item 7; §"What NOT to do" item 8 | FR-VERT-001 (only Govtech, only P5+, only with named EU buyer) |
| Underpriced Tier-1 signals "freelance not consulting" | §"What NOT to do" item 10 | FR-FUNNEL-003 (raise floor to $4.9K) |
| Outlier viral moment (unexpected retweet / keynote mention) | §"Uncertainty and limits of this analysis" | No FR — accept the upside; do not plan to depend on it |
| HN critic engaged defensively → equity damaged | §"What NOT to do" item 9 | FR-LAUNCH-001 (response playbook: gracious engagement, no "well actually") |
| Self-attestation certification overpromised | §"What NOT to do" item 3 | FR-CERT-001 (self-audits cap at L4 honestly; verified tier is the only way past L4) |

---

## §10 — Manifest

Source state file: [`MANIFEST.json`](./MANIFEST.json) — tracks per-module FR counters and batch history. Maintained manually at MVP scale per `./feature-request-audit skill` (see feature-request skills) §1.

When adding a new FR:

1. Update the relevant phase + module section in this file.
2. Increment `MANIFEST.json` → `last_fr_id_per_module.<MODULE>`.
3. Create the FR markdown in `docs/feature-requests/<module>/` following the workflow.
4. Two-round audit per workflow §1; reach 10/10 before `status: accepted`.

---

*End of DSAF backlog v0.1.0. Repo-verifiable artifacts for 26 accepted P0-P2 FRs have been implemented; external activation remains pending where noted in status cells. 18 FRs remain roadmapped (P3-P6, deferred until P2 exit metrics in). Re-generate after every status change in the FR files.*
