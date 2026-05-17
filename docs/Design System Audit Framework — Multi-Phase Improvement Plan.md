# Design System Audit Framework — Multi-Phase Improvement Plan

## Executive summary

The framework is launching into a structurally favorable but tactically brutal market. **Structurally favorable** because the design systems audit space has high search demand, an active conference circuit, three commercial SaaS leaders generating awareness, and — critically — no dominant open-source criteria-based maturity framework on GitHub. The consultancy "audit guides" (Netguru, DOOR3, Ramotion, Sparkbox), the Figma plugin "Design System Auditor," Big Medium/Sparkbox maturity narratives, and Brad Frost's frontend-guidelines-questionnaire all occupy adjacent niches but none is a 125-criterion, agent-native, CMM-style framework with shipping scripts. That is a real moat.

**Tactically brutal** because (a) maturity-model repos on GitHub have low star ceilings — OWASP SAMM, the most successful comparable, sits around 396 stars and is archived — (b) the design systems community gives attention to people, not repos (Brad Frost, Nathan Curtis, Dan Mall, Diana Mounter, Sil Bormüller of Into Design Systems), and (c) Western audiences applying meaningful discount to non-Western OSS work is a real (if uncomfortable) headwind for inbound enterprise leads.

A realistic 12-month ceiling for the repo is **600–1,500 stars** if the launch is well-executed and 200–500 if it is not. Aspirations of "most-starred" should be calibrated against this: the most-starred *design-system-audit-specific* repo today is a near-empty space, so #1 is achievable, but the absolute number will be modest by SaaS-OSS standards. The serious goal is **becoming the cited reference** in industry reports, conference talks, and competing vendors' content — that, more than stars, is what converts to paid audit leads.

---

## Competitive and adjacent landscape

**Direct platform competitors (SaaS, not OSS).** zeroheight publishes the canonical annual *Design Systems Report* (4th edition in 2025, ~300 respondents, the de-facto industry survey) and is moving toward an end-to-end DSM platform; their adoption-tab beta competes squarely with audit functionality. Knapsack positions as a "digital production platform" with a published buying guide and a soft maturity narrative, but no public criteria framework. Supernova is the third leg of this triad. All three have closed-source platforms, sales-led pricing, and rely on case studies and webinars rather than community frameworks for awareness.

**Methodology/thought-leadership competitors (non-SaaS).** Brad Frost's *Atomic Design* (the book and its companion repo) is the closest cultural analog — book content lives on GitHub, the methodology is the brand. Nathan Curtis (EightShapes, now Directed Edges) sells "~15–25 engagements per year" through long-form Medium writing, not through a framework artifact. Big Medium publishes a maturity narrative; Sparkbox runs an annual Design Systems Survey and a four-stage maturity model. None of these is a downloadable, criteria-graded, scriptable artifact. Brad Frost's `frontend-guidelines-questionnaire` is the closest GitHub-native artifact in spirit, but it's a one-page checklist, not a framework.

**Tooling repos that pull design-systems stars.** Style Dictionary (~4.2k stars) and Storybook are the giants but solve different problems. Tokens Studio, the DTCG community-group repo, and the major open-source design systems (Carbon, Polaris, Material Web, React Spectrum, Fluent UI, Atlassian, Pinterest Gestalt, GitHub Primer) are reference implementations, not audit tools. They are potential validators ("audited Carbon at 91% combined") rather than competitors.

**Maturity-model benchmarks.** OWASP SAMM is the most useful analog: a community-led, vendor-neutral maturity framework that became a de-facto standard in software security. Its GitHub stars are modest (~396 on the now-archived primary repo) but its influence — citations in Dell's, PwC's, and Fortify's secure-SDLC practices — is large. DORA is the cautionary tale on the opposite end: the framework name became ubiquitous but the *brand was acquired by Google in 2019*, the GitHub footprint is small, and most of the equity lives in the annual report and the dora.dev domain. SLSA and 12factor are the other reference points: 12factor.net has near-zero GitHub presence yet is universally cited; its equity is in the URL and the *form* (twelve pithy points). The pattern is clear: **for methodology repos, stars are a vanity metric and citation/URL-mention is the real currency.**

## What drives GitHub stars for methodology repos

Based on Show HN/Launch HN postmortems and the SAMM/12factor/keepachangelog trajectory, four things actually move methodology-repo stars: (1) a **README that reads like a finished product**, not documentation — repo *is* the landing page for HN; (2) **one killer visual** that gets screenshotted on social media (DORA's elite-vs-low cluster chart; 12factor's twelve-line manifesto); (3) **explicit "open-source alternative to X" framing** in titles and pitches; and (4) a **person attached to the work** — every framework with breakout stars has a named human face (Brad Frost, Pravir Chandra for SAMM, Adam Wiggins for 12factor). Repos maintained by a faceless org name underperform.

## Design systems community signal map (2026)

The center of gravity is **Into Design Systems** (Sil Bormüller, Munich) — winner of zeroheight's Design Systems Awards 2025 for Best Event/Community Champion, ~1,000+ attendees at the March 2026 AI conference, speakers from WhatsApp, GitHub, Figma, Adobe, Miro, Atlassian, plus Brad Frost. Their weekly newsletter and LinkedIn (~29k followers) are the single highest-leverage outreach surfaces in the field. Adjacent: zeroheight's Slack community, Friends of Figma, the Design Systems Slack (Jina Anne origin). Podcasts: *Into Design Systems*, *The Design Systems Podcast* (Knapsack-produced, Chris Strahl host — note Knapsack already interviewed Nathan Curtis), *On Theme*, *The Question* (Ben Callahan/Sparkbox). Industry reports: zeroheight's annual *Design Systems Report* and Sparkbox's *Design Systems Survey* are the two that get cited everywhere. Conferences: Config (Figma), Into Design Systems Conf, SmashingConf, ClarityConf, Beyond Tellerrand. Influential individuals to court: Brad Frost, Nathan Curtis, Dan Mall, Jina Anne, Diana Mounter (GitHub Primer), Sarah Federman (Adobe Spectrum/designsystems.com), Sil Bormüller, Chris Strahl, Ben Callahan, Luke Murphy (zeroheight's lead design advocate).

## Honest critique — what's structurally wrong with the framework today

1. **125 criteria is a barrier, not a feature.** OWASP SAMM has 90 (15 practices × ~6); DORA famously has four. Frameworks that hit critical mass collapse to a memorable surface form. 125 is *credible but un-shareable* — no one will ever screenshot it. **There must be a Core 25 ("DSAF-25") that fits on one page and is what 90% of people quote.** The full 125 becomes the deep-dive.

2. **20 categories almost certainly overlap.** Without seeing the repo, the listed categories (tokens, components, governance, distribution, accessibility, performance, AI/MCP readiness, plus Part B's research, IA, interaction, content, heuristics, measurement, ethics) likely have ambiguous boundaries — e.g., where do "design tokens for accessibility" or "content + a11y" sit? Expect criticism. A pre-launch consolidation pass is warranted.

3. **The CyberSkill self-audit at 84.6% L5 is a credibility liability, not an asset.** A consultancy publishing a framework that scores its own design system at the top tier is the single most predictable HN/Twitter takedown angle. ("Auditors audit themselves at L5, news at 11.") The framework should either (a) cap self-audits at L3 publicly, or (b) explicitly disclaim the self-audit as an example/template and remove the headline percentage from marketing surfaces.

4. **Maintained by a Vietnamese consultancy is a real, if unfair, headwind for global stars and Western enterprise leads.** This is the most uncomfortable item but pretending otherwise is malpractice. Western enterprise buyers do not, on average, send $60K Tier 2 design-system build engagements offshore to a name they have never heard. The framework's authority and CyberSkill's commercial pipeline are in tension. The right answer is *separating the brand*.

5. **The no-downgrade rule + state machine is engineering-bait.** It's intellectually satisfying and demoable, but the failure mode of fast-moving design systems is that real teams *do* regress in real ways (WCAG version bump, deprecated token bucket) and a hard rollback rule will get switched off, not respected. Reframe as "no silent regression" — surface the regression, require an explicit override comment, but don't block.

6. **Agent-first is the strongest unique differentiator and is currently under-marketed.** No other framework ships LLM prompts, a `DESIGN.md` generator, and MCP-readiness criteria. This is the single feature that makes 2026 conference talks possible. It should be the lede, not a footnote.

7. **Vertical packs (HR Tech, Fintech, Healthcare, Govtech) are premature.** Build the core first; vertical packs are a Phase 5 move and arguably a distraction. Govtech is the only one with a defensible buyer (GDS-style audits) and even that is a stretch from Vietnam.

8. **"Combined 84.6%" is a reductive headline number** that contradicts the rest of the framework's nuance. Drop the single number from external-facing copy; lead with the tier (L5) and a small radar chart.

## Naming, branding, governance

**The name "Design System Audit Framework" is generic and descriptive — which can work (cf. "Atomic Design," "Software Assurance Maturity Model") but only with a short, abbreviation-friendly handle.** "DSAF" works phonetically. Establish `dsaf.dev` or `designsystemaudit.org` as the canonical URL early; URLs outlive repos in citation patterns (see 12factor.net, dora.dev). Avoid "framework" creep — call the criteria the **DSAF Criteria** and the maturity scale the **DSAF Levels**.

**Governance: fork off into a neutral org within 6 months.** Move the canonical repo to a `dsaf` GitHub org with CyberSkill as one of three to five named maintainers and a published contributor governance doc (RFC + voting modeled on DTCG). CyberSkill keeps SERVICES.md and the audit business at `audit.cyberskill.world`, but the *framework* lives at `github.com/dsaf/spec`. This is the DORA-after-Google playbook in reverse: launching neutral from day one is cheaper than re-neutralising later. Recruit a non-Western co-maintainer publicly — a respected European or US design-systems voice (Nathan Curtis, Sarah Federman, or any Into Design Systems regular) — as the *single most leveraged credibility move available.* Offer them maintainer rights + speaking slot revenue share in exchange for governance participation, not endorsement.

**Visual identity: invest in this in Phase 0.** Frameworks that broke through have one iconic visual (atomic-design's chemistry diagram; 12factor's twelve numbered cards). Commission a single radar/spider chart variant + an L0–L5 ladder graphic that becomes the framework's screenshot.

## Multi-phase plan

### Phase 0 — Pre-launch hardening (Weeks 0–6)

**Goal.** Make the repo defensible against the first wave of HN/Twitter critique before any visibility push.

**Audit lift.** Stars: 0–50 (organic). Inbound leads: 0–2. Positioning: setting baseline.

**Prerequisites.** Repo public; SERVICES.md gated to its own subpath.

**Actions (done-when conditions).**
- **Build DSAF-25 Core subset** on one printable page (done when a designer can read it in 5 minutes and a PM can quote one criterion in a meeting).
- **Decouple framework brand from CyberSkill.** Mint `dsaf.dev`, move marketing copy off `audit.cyberskill.world`, keep services there (done when `dsaf.dev` resolves and is referenced from the README).
- **Remove the CyberSkill 84.6% headline from all external surfaces;** keep the full audit report as an example artifact (done when README has no self-score above the fold).
- **Commission one canonical L0–L5 visual** + one radar chart template (done when SVGs are in `/assets/` and used in README).
- **Rewrite README in HN-launch idiom**: clear "what / why now / how it differs from X" in the first 200 words, no marketing-speak, repo-as-landing-page (done when a colleague unfamiliar with the project can summarize it back in two sentences).
- **Soften no-downgrade rule** to "no silent regression — explicit override required" (done when the SCAN/FIX mode docs reflect this).
- **Pre-recruit 2–3 named outside reviewers** for the launch thread — even unpaid blurb-level endorsements from anyone in the Into Design Systems orbit moves the credibility needle (done when 2+ named quotes are in README).

**Risks/mitigations.** Risk: rebrand confuses early adopters. Mitigation: maintain a redirect from the CyberSkill path for 12 months and dual-list in CONTRIBUTING.

### Phase 1 — Launch (Weeks 6–10)

**Goal.** Reach the front page of Hacker News (Show HN) and Product Hunt; seed Into Design Systems weekly + zeroheight Slack + Design Systems Slack.

**Audit lift.** Stars: target 300–700 in launch week (top-quartile Show HN trajectory). Inbound leads: 5–15 qualified. Positioning: first cited mention by a known DS voice.

**Prerequisites.** Phase 0 complete. A blog post titled approximately "We built a 125-criterion audit framework after auditing 0 design systems for clients — here's what we got wrong" (or genuinely candid equivalent) ready on dsaf.dev.

**Actions.**
- **Show HN title formula**: "Show HN: DSAF – open-source maturity framework for design systems (L0–L5, 125 criteria, agent-native)." Post Tuesday–Wednesday 8–10am PT.
- **Cross-post to**: r/web_design, r/UXDesign, r/programming, Lobste.rs, daily.dev, Designer News.
- **Product Hunt**: same week, recruit a hunter (Chris Messina or any DS-tooling-adjacent maker). Realistic expectation: 200–800 upvotes.
- **Personal outreach** to 10 named individuals before launch with a heads-up + a question (not a request to upvote): Brad Frost, Nathan Curtis, Sil Bormüller, Chris Strahl, Ben Callahan, Diana Mounter, Sarah Federman, Luke Murphy at zeroheight, Dan Mall, Jina Anne. Frame: "We built this; would value your roast before we launch publicly."
- **Submit a Smashing Magazine / CSS-Tricks / A List Apart guest post** pitched at 6 weeks lead time so it lands within 2 weeks of launch.

**Done when.** ≥300 stars, ≥2 named-person endorsements (any platform), ≥1 conference CFP submitted.

**Risks/mitigations.** Risk: HN critique focuses on the "consultancy publishing self-graded L5" angle. Mitigation: Phase 0 already removed the headline number; engage every critical comment within 30 minutes of posting.

### Phase 2 — Community velocity (Months 3–6)

**Goal.** First 500–1,000 stars; first 5 external contributors; first cited mention in a zeroheight or Sparkbox annual report.

**Audit lift.** Stars: 500–1,000. Inbound leads: 15–40. Positioning: appears in 1 of the 2 industry reports' citation lists.

**Actions.**
- **Publish weekly criterion deep-dives** (one criterion, one example, one anti-pattern) on dsaf.dev. Cross-post to dev.to and Medium.
- **Ship integrations**: a Storybook addon that runs the relevant DSAF scripts; a Tokens Studio export validator; a zeroheight-export reader. These are the artifacts that turn lurkers into stargazers.
- **Recruit a non-Western co-maintainer publicly** (see Governance). Announcement post.
- **Submit to**: Into Design Systems Weekly, Pattern Pulse, Sidebar.io, Smashing Newsletter.
- **Open three "good first issue" PRs** for translation (Japanese, Spanish, German move the needle most for DS audiences).
- **Launch a free public benchmark**: "Compare your DSAF score to anonymized peers" — a tiny static survey form. This is the single highest-converting OSS→paid bridge (Plausible, PostHog, and Cal.com all use free tools/benchmarks as the lead-gen funnel).

**Done when.** ≥1 PR from a non-CyberSkill engineer at a recognized DS team; ≥1 podcast appearance booked.

### Phase 3 — Industry positioning (Months 6–12)

**Goal.** Cited by name in zeroheight's 2026 *Design Systems Report* and/or Sparkbox's survey; talk accepted at Into Design Systems Conf 2027.

**Audit lift.** Stars: 1,000–1,800. Inbound leads: 40–100. Positioning: framework becomes the *default reference* in audit-related blog posts.

**Actions.**
- **Submit a CFP to Into Design Systems Conf 2027** (open early in the year). Topic angle: "Agent-native design system audits — what 50 audits taught us about MCP-readiness." This is the framework's most defensible conference pitch.
- **Co-author a piece with Nathan Curtis or Chris Strahl** on the Knapsack/EightShapes blog. Note Knapsack already interviews DS practitioners — pitch yourselves.
- **Run a public audit of one marquee open-source design system** (Carbon, Polaris, or Primer) with their team's blessing and publish the full report. This is the most efficient path to credibility — Brad Frost did this implicitly by analyzing real systems; DSAF can do it explicitly. Pick a system where the team is friendly (Primer/Diana Mounter is the warmest target).
- **Pitch zeroheight directly** for inclusion in their 2026 report's "tooling" or "measurement" section — they explicitly noted in the 2025 report that "tooling for measurement is incredibly fractured" — DSAF is the answer.

### Phase 4 — Paid funnel optimization (Months 9–15, overlaps Phase 3)

**Goal.** Convert the OSS audience into paid Tier 1 ($2.5K–$8K) audits at a 0.5–1.5% star-to-lead rate.

**Audit lift.** Stars: marginal. Inbound leads: 60–150 cumulative. **Revenue target**: $80K–$250K in audit fees in Year 1.

**Actions.**
- **Add a "Talk to a certified auditor" CTA on dsaf.dev**, not on the GitHub README (preserves OSS purity). Use a Cal.com booking, not a sales form.
- **Tier the case studies**: short CyberSkill self-audit summary (not the headline), one anonymized client audit per quarter.
- **Refine pricing**: Tier 1 entry at $2.5K is too low for serious enterprise inbound — it signals "individual practitioner" not "consulting." Consider raising the floor to $4.9K and adding a free "DSAF-25 self-scoring spreadsheet" as the lead magnet. Tier 3 retainers at $1.5K/mo are healthy. Tier 4 vertical packs should be deprioritized until Phase 5.
- **Build a hosted free benchmark** — anonymous, opt-in — at `benchmark.dsaf.dev`. This is the Plausible/PostHog free-tier equivalent: gives away value, captures intent, generates report material for the following year. Highest-leverage single investment in this phase.
- **Critical**: Western enterprise buyers will continue to discount Vietnam-origin Tier 2 ($15K–$60K) build engagements. Counter-tactic: hire or partner with one EU/US-based "audit lead" who fronts client calls. The framework's neutrality is the bridge; the consultancy stays Vietnamese-staffed and price-competitive on delivery.

**Risks/mitigations.** Risk: paid funnel cannibalizes OSS credibility ("they're just doing this to sell audits"). Mitigation: keep all paid CTAs off the GitHub repo entirely; the repo is sacred; the funnel lives on dsaf.dev and the SERVICES.md file in a side directory, not the README.

### Phase 5 — Framework v0.2+ (Months 12–18)

**Goal.** Ship Mode W (website-without-DS reverse-engineering audit) — this is genuinely the right next move because it dramatically expands the addressable audience (every marketing site can be audited, not just teams with a DS). Defer Mode E (auditing AI-generated systems) until 2027 — the input class is unstable.

**Audit lift.** Stars: 1,800–3,000. Inbound leads: ongoing. Positioning: the *only* framework that audits both mature DS and pre-DS websites.

**Actions.**
- **Ship Mode W as a v0.2 release** with a starter-spec generator (output: a Figma file + tokens JSON + governance template).
- **Build a lite/Core 25 CLI**: `npx dsaf scan` returns a score in 60 seconds. This is the single most viral artifact possible — every DS lead will run it on their own system and share the screenshot.
- **Reconsider SaaS layer**: a hosted version of the benchmark + scoring engine. Open-core trap is real (cf. Knapsack's positioning challenges) — start with a hosted free tier and a Pro tier at $39/mo for teams, not a $500/mo enterprise pitch. Cal.com / Plausible playbook.
- **Vertical packs**: Govtech only, in partnership with a named EU public-sector buyer. Skip Fintech/Healthcare/HR Tech for now.
- **Translations**: Japanese (large DS practitioner community), Spanish, German first. French and Portuguese second.

### Phase 6 — Sustained leadership (Year 2+)

**Goal.** Become the cited reference framework — the "what version of DSAF are you on?" question becomes routine in DS team interviews.

**Audit lift.** Stars: 3,000–6,000 ceiling realistically. Brand equity is the real prize.

**Actions.**
- **Annual DSAF State of Design System Audits report** (modeled on DORA's annual report). Anonymous benchmark data feeds it. This is the single asset that compounds — DORA's report is what cemented DORA, not the GitHub repo.
- **DSAF certification** (free tier: self-attestation badge; paid tier: third-party-verified). Modeled on OWASP SAMM's benchmark initiative.
- **Quarterly RFC cycle** for criteria evolution. Public governance.
- **Sponsor or co-host one Into Design Systems track** as DSAF brand exposure to the right ~1,000 people annually.

## What NOT to do — common consultancy OSS-play failures

1. **Don't gate anything on email capture in the GitHub repo.** Move all lead-capture to dsaf.dev. The repo is sacred.
2. **Don't lead with the price sheet.** SERVICES.md should be at the bottom of the README hierarchy or a separate doc. Knapsack and Supernova lead with "talk to sales" and pay for it in OSS perception.
3. **Don't promise enterprise certification you can't deliver.** Self-audits capping at L4 is honest and good — overselling is the Tier-3-CMMI death spiral.
4. **Don't repaint the CyberSkill brand onto the framework after launching neutral.** Pick a side at launch and commit. The half-measure ("DSAF by CyberSkill") is the worst of both worlds.
5. **Don't write 20 medium-quality blog posts.** Write 5 excellent ones and pitch them to Smashing/CSS-Tricks/A List Apart. Quality of placement compounds; quantity on Medium does not.
6. **Don't optimize for stars over citations.** A single citation in zeroheight's annual report is worth ~500 stars in inbound-lead terms.
7. **Don't ignore the geography problem.** It's real, it's unfair, it's solvable with a named Western co-maintainer — not solvable by pretending.
8. **Don't ship vertical packs before the core is loved.** Premature productization is the most common consultancy OSS failure mode.
9. **Don't argue with HN critics defensively.** Brad Frost has been roasted on HN for atomic design and the equity survived precisely because he engaged graciously. Costa's and other HN-launch postmortems converge on this.
10. **Don't underprice Tier 1 audits** to $2.5K. It signals freelance, not consulting. $4.9K–$9K is the right floor for the inbound lead profile this framework will generate.

## Uncertainty and limits of this analysis

The repo itself was not publicly accessible at research time (link returned a permissions error), so all framework-internal claims are taken on the task brief's word. Exact star counts for Brad Frost's atomic-design repo, Storybook, and Tokens Studio could not be verified to the digit within the research budget; orders of magnitude are correct (Storybook is the >80k tier; Style Dictionary is ~4.2k; SAMM is ~400; methodology repos generally are <2k). The 600–1,500 first-year star projection is based on the SAMM/12factor/keepachangelog pattern plus the Show HN postmortem data; an outlier viral moment (an unexpected Brad Frost retweet, a Figma keynote mention) could push it 3–5x higher, but plans should not depend on outliers. The geography-discount claim about Vietnamese consultancy positioning is a judgment call based on general SaaS/consulting market patterns rather than a specific study of the design-systems segment; the recommended mitigation (named Western co-maintainer + EU/US-fronted client lead) is robust either way.