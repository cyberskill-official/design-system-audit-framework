# Services — professional audits + implementation by CyberSkill

> The framework is **free, open-source, MIT licensed**. Most teams use it self-serve and never need to talk to us.
>
> When you DO need professional help — for the audit itself, for the implementation that follows, or for ongoing maintenance — CyberSkill (the framework's maintainer) offers four service tiers. This page explains them and how to engage.

The framework's value proposition stands on its own: 125 criteria, vendor-neutral, agent-pairable, MIT licensed. You can audit your design system without hiring anyone. Many teams do, and that's the right call when you have time, in-house skill, and a stable system.

When those three aren't all true, the four services below exist.

---

## Tier 1 — Professional audit ($5K–$15K)

A signed audit cycle on your design system using this framework, run by the framework's authors.

**What you get:**

- A signed `audit-report-{date}.md` with full per-criterion scores, citations, and tier rating (L0–L5).
- A phased improvement plan with "done when" conditions per step (no calendar dates — actionable at your team's pace).
- A 1-hour walkthrough call to brief your team on findings.
- Optional public case study with your logo on the framework repo's `examples/` folder (your call, not ours).

**Best for:**

- You've been running your design system for 2+ years and want an honest external read.
- You're considering an enterprise customer who wants design-system maturity evidence.
- You're between audits and want a deeper, calibrated baseline.
- Your in-house team is too close to the system to score it honestly.

**What we need from you:** ~30 min scoping call + read access to your design-system docs/source. We deliver in 5–10 business days.

**Pricing:** $5K (small system, doctrine-only) to $15K (large system, doctrine + implementation + multi-platform). Quote on request after the scoping call.

---

## Tier 2 — Design system implementation ($30K–$150K)

We build the design system per the audit's improvement plan.

**What you get:**

- A working design system: tokens, components, documentation, governance, CI gates — all to the framework's L4-or-better standard.
- Multi-package npm distribution (`@your-org/{tokens, primitives, react/vue/svelte, …}`).
- Storybook documentation site, deployed.
- Hand-off to your in-house team, including 30 days of post-handover support.

**Best for:**

- You've identified the design-system gap (via audit or otherwise) but don't have the in-house bandwidth.
- You want the system built right the first time rather than refactored later.
- You'd benefit from leveraging an existing, audited L5 reference architecture (the CyberSkill design system is the template).

**Pricing:** $30K (light migration of an existing system to the framework's standards) to $150K (greenfield enterprise system with multi-platform output, vertical pack, and full governance setup). Roughly 3–6 months engagement.

---

## Tier 3 — Ongoing maintenance retainer ($3K–$15K/month)

Quarterly re-audits, ongoing system improvements, and on-call advisory for your team.

**What you get:**

- Quarterly DYNAMIC re-score of your system using the framework — the cadence the framework specifies, run by us.
- Annual full audit with human Co-Auditor calibration (per framework §9).
- 4–8 hours/month of on-call advisory (Slack / email / scheduled calls) for design-system questions your team has.
- First-look at new framework features and vertical packs as they ship.

**Best for:**

- You have a mature design system but don't have a dedicated DesignOps team.
- You want continuity — the same vendor running every audit, building institutional memory of your system.
- You've gone through Tier 2 (implementation) and want hand-holding while your team learns the system.

**Pricing:** $3K/month (small system, quarterly cadence only) to $15K/month (large system, embedded advisory, multiple products). 6-month minimum commitment; renews monthly thereafter.

---

## Tier 4 — Vertical packs and bespoke kits ($5K–$20K one-time)

Pre-built design-system kits for specific industries: HR Tech, Fintech, Healthcare, EdTech, Govtech.

**What you get:**

- Industry-specific component set (e.g., HR Tech's bias-disclosure UI, Fintech's compliance badges, Healthcare's trauma-informed clinical patterns).
- Industry-specific microcopy patterns (already-validated voice, banned phrases, locale support).
- Industry-specific compliance gates (OFCCP for HR, FINRA for Fintech, HIPAA for Healthcare).
- Drop-in license — install via npm, integrate into your existing system.

**Best for:**

- You're shipping in a regulated industry and want a head-start on the patterns regulators care about.
- You want compliance defaults baked into the design system rather than retrofitted later.

**Pricing:** $5K (one industry pack, single locale) to $20K (full vertical kit with all locales + on-call updates for 12 months).

**Currently available:** HR Tech (shipped). Fintech, Healthcare, EdTech, Govtech: in roadmap, by request.

---

## Why CyberSkill specifically

We built this framework because we needed it for ourselves. CyberSkill is a **10-person Vietnamese consultancy** that has spent the past year hardening our internal design system to the framework's L5 Optimised tier. The case study in [`examples/cyberskill-design-system/`](./examples/cyberskill-design-system/) is our own work — score, gaps, improvement plan, all public.

What this means for you:

| If you hire us | You get |
|---|---|
| The framework's authors, not someone implementing a checklist | Deep understanding of every criterion, the FIXED/DYNAMIC distinction, calibration discipline |
| A team that already passes its own audit at 84.6% | We've done the work; we know the trade-offs |
| Vietnamese-first commitment built in | Multi-locale, multi-region pricing; we're cheaper than Western consultancies for equivalent quality |
| Direct founder contact | The founder (Stephen Cheng) is the audit lead on every paid engagement |

This isn't a faceless agency. You'll know who's on your audit. You'll have direct contact with the team that wrote the framework you're being audited against.

---

## How to engage

Three paths, depending on where you are:

### Path A — Quick Q&A (no commitment)

Email **info@cyberskill.world** with subject line **"Audit framework question"**. Stephen replies personally within 48h. Use this for:

- "Would the framework apply to our system?"
- "Is our team the right fit for a paid audit?"
- "What's the typical timeline / scope for [our shape of system]?"

### Path B — Scoping call (free, 30 minutes)

Email **info@cyberskill.world** with subject line **"Audit scoping call"** and a 1-paragraph description of your system (size, age, what tools, what's working, what's broken). Stephen replies within 48h with a calendar link.

The call is free; no commitment. We'll either:

- Confirm a paid audit makes sense and quote it, OR
- Suggest you self-audit using the framework (if your shape doesn't justify a paid engagement), OR
- Refer you to another vendor we know if your needs don't match our specialty.

### Path C — Direct hire

If you've already decided you want to hire us, email **info@cyberskill.world** with **"[your-company-name] paid audit"** in the subject line. Include:

- Brief system description
- Team size
- Why you want an audit now
- Target timeline
- Budget range (if you have one)

We'll respond within 48h with a SOW draft.

---

## Frequently asked questions

**Q: Why pay you when the framework is free?**

The framework is the methodology. The audit is the time + judgment + calibration that goes into running it well. Most teams running their first audit produce something passable but uncalibrated — common failure modes: scoring too high, missing the FIXED/DYNAMIC distinction, skipping the §9 spot-check. A paid audit avoids those because it's our job to have done it 100 times.

**Q: How does this compare to a Big Medium or Brad Frost engagement?**

Different positioning. Big Medium and Brad Frost are world-class but Western-priced and US-time-zone. CyberSkill is Vietnamese, smaller, faster-to-engage, and brings the framework as the methodology (they don't). Pick whoever fits your context.

**Q: How does this compare to Knapsack / Supernova / Specify?**

Those are tooling — software products you license. CyberSkill is consulting — humans you hire. The two complement each other; many of our clients use Knapsack or Supernova alongside our audit work.

**Q: What if my team is in a different timezone from Vietnam?**

Stephen works async-first. Most of our communication happens via email + shared Notion / Slack. We schedule 1–2 calls per week as needed. We've engaged with US, EU, AU, and APAC clients — timezone has not been a blocker.

**Q: Can I pay in instalments?**

Tier 1 audits: 50% on signing, 50% on delivery. Tier 2 implementations: 30/40/30 across milestones. Tier 3 retainers: monthly. Tier 4 packs: 100% on delivery (small enough that instalments add overhead).

**Q: Do you offer discounts for non-profits or open-source projects?**

Yes — 30% discount on Tier 1 audits for registered non-profits. Free Tier 1 audits for the first 3 widely-used open-source design systems whose maintainers reach out (allocated 2026). Email to ask.

---

## Contact

**Stephen Cheng** — Founder, CyberSkill

- Email: **info@cyberskill.world**
- WhatsApp / Phone: **(+84) 906 878 091** (Mr. Stephen)
- Website: **https://cyberskill.world**
- Audit landing page: **https://audit.cyberskill.world**
- LinkedIn: search "Stephen Cheng CyberSkill"

### Office

CYBERSKILL SOFTWARE SOLUTIONS CONSULTANCY AND DEVELOPMENT JOINT STOCK COMPANY
1st Floor, 207A Nguyen Van Thu Street
Tan Dinh Ward
Ho Chi Minh City, Vietnam

DUNS: 673219568

The framework is yours to use freely. When the open-source layer doesn't go far enough, CyberSkill is here.

*Hiện Thực Hoá Ý Chí — Turn Your Will Into Real.*
