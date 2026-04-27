# Services — professional audits + implementation by CyberSkill

> The framework is **free, open-source, MIT licensed**. Most teams use it self-serve and never need to engage us.
>
> When professional engagement is the right call — for the audit itself, for the implementation that follows, or for ongoing maintenance — CyberSkill (the framework's authoring practice) offers four service tiers. This page explains them and how to engage.

The framework's value proposition stands on its own: 125 criteria, vendor-neutral, agent-pairable, MIT licensed. You can audit your design system without engaging any vendor. Many teams do, and that is the right call when you have time, in-house skill, and a stable system.

When those three conditions aren't all true, the four services below exist.

---

## Tier 1 — Professional audit ($2.5K–$8K)

A signed audit cycle on your design system using this framework, run by the framework's authoring practice.

**What you get:**

- A signed `audit-report-{date}.md` with full per-criterion scores, citations, and tier rating (L0–L5).
- A phased improvement plan with "done when" conditions per step (no calendar dates — actionable at your team's pace).
- A 1-hour walkthrough call to brief your team on findings.
- Optional public case study with your logo on the framework repo's `examples/` folder (entirely opt-in).

**Best for:**

- You've been running your design system for 2+ years and want a calibrated external read.
- You're pursuing an enterprise customer who requires design-system maturity evidence.
- You're between audit cycles and want a deeper, calibrated baseline.
- Your in-house team is too close to the system to score it independently.

**What we need from you:** ~30 minutes for a scoping call + read access to your design-system documentation and source. We deliver in 5–10 business days.

**Pricing:** $2.5K (small system, doctrine-only) to $8K (large system, doctrine + implementation + multi-platform). Quote on request after the scoping call.

---

## Tier 2 — Design system implementation ($15K–$60K)

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

**Pricing:** $15K (light migration of an existing system to the framework's standards) to $60K (greenfield enterprise system with multi-platform output, vertical pack, and full governance setup). Roughly 3–6 months of engagement.

---

## Tier 3 — Ongoing maintenance retainer ($1.5K–$6K/month)

Quarterly re-audits, ongoing system improvements, and on-call advisory for your team.

**What you get:**

- Quarterly DYNAMIC re-score of your system using the framework — at the cadence the framework specifies, run by us.
- Annual full audit with human Co-Auditor calibration (per framework §9).
- 4–8 hours/month of on-call advisory (Slack / email / scheduled calls) for your team's design-system questions.
- First-look at new framework features and vertical packs as they ship.

**Best for:**

- You have a mature design system but don't have a dedicated DesignOps team.
- You want continuity — the same vendor running every audit, building institutional memory of your system.
- You've gone through Tier 2 (implementation) and want hand-holding while your team learns the system.

**Pricing:** $1.5K/month (small system, quarterly cadence only) to $6K/month (large system, embedded advisory, multiple products). 6-month minimum commitment; renews monthly thereafter.

---

## Tier 4 — Vertical packs and bespoke kits ($2.5K–$10K one-time)

Pre-built design-system kits for specific industries: HR Tech, Fintech, Healthcare, EdTech, Govtech.

**What you get:**

- Industry-specific component set (e.g., HR Tech's bias-disclosure UI, Fintech's compliance badges, Healthcare's trauma-informed clinical patterns).
- Industry-specific microcopy patterns (already-validated voice, banned phrases, locale support).
- Industry-specific compliance gates (OFCCP for HR, FINRA for Fintech, HIPAA for Healthcare).
- Drop-in license — install via npm, integrate into your existing system.

**Best for:**

- You're shipping in a regulated industry and want a head-start on the patterns regulators care about.
- You want compliance defaults baked into the design system rather than retrofitted later.

**Pricing:** $2.5K (one industry pack, single locale) to $10K (full vertical kit with all locales + on-call updates for 12 months).

**Currently available:** HR Tech (shipped). Fintech, Healthcare, EdTech, Govtech: in roadmap, by request.

---

## Why CyberSkill specifically

We built this framework because we needed it for our own design system. CyberSkill is an **enterprise software solutions consultancy headquartered in Ho Chi Minh City** that has spent the past year hardening our internal design system to the framework's L5 Optimised tier. The case study in [`examples/cyberskill-design-system/`](./examples/cyberskill-design-system/) is our own work — score, gaps, improvement plan, all public.

What this means for you:

| If you engage us | You get |
|---|---|
| The framework's authoring practice, not a vendor implementing a checklist | Deep understanding of every criterion, the FIXED/DYNAMIC distinction, and calibration discipline |
| A practice that already passes its own audit at 84.6% (L5 Optimised) | We've done the work; we know the trade-offs |
| Vietnamese-headquartered with global delivery experience | Async-first across US, EU, APAC, and AU timezones; Vietnamese cost basis without compromise on calibration |
| Senior consultants on every paid engagement | Audits are led by practitioners with direct authorship of the framework, never handed off mid-engagement |

You will know who is on your audit. You will have direct contact with the practice that authored the framework you are being audited against.

---

## How to engage

Three paths, depending on where you are:

### Path A — Quick Q&A (no commitment)

Email **info@cyberskill.world** with subject line **"Audit framework question"**. Our engagement team responds within 48 hours. Use this for:

- "Would the framework apply to our system?"
- "Is our team the right fit for a paid audit?"
- "What's the typical timeline / scope for [our shape of system]?"

### Path B — Scoping call (free, 30 minutes)

Email **info@cyberskill.world** with subject line **"Audit scoping call"** and a 1-paragraph description of your system (size, age, what tools, what's working, what's broken). We respond within 48 hours with a calendar link.

The call is free; no commitment. We will either:

- Confirm a paid audit makes sense and quote it, OR
- Suggest you self-audit using the framework (if your shape doesn't justify a paid engagement), OR
- Refer you to another vendor we know if your needs don't match our specialty.

### Path C — Direct hire

If you've already decided you want to engage us, email **info@cyberskill.world** with **"[your-company-name] paid audit"** in the subject line. Include:

- Brief system description
- Team size
- Why you want an audit now
- Target timeline
- Budget range (if you have one)

We respond within 48 hours with a draft SOW.

---

## Frequently asked questions

**Q: Why pay you when the framework is free?**

The framework is the methodology. The audit is the time + judgment + calibration that goes into running it well. Most teams running their first audit produce something passable but uncalibrated — common failure modes: scoring too high, missing the FIXED/DYNAMIC distinction, skipping the §9 spot-check. A paid audit avoids those because it's our practice's job to have done it many times over.

**Q: How does this compare to a Big Medium or Brad Frost engagement?**

Different positioning. Big Medium and Brad Frost are world-class but Western-priced and US-time-zone. CyberSkill is Vietnamese-headquartered with global delivery, faster to engage, and brings the framework as the methodology (they don't). Pick whoever fits your context.

**Q: How does this compare to Knapsack / Supernova / Specify?**

Those are tooling — software products you license. CyberSkill is consulting — practitioners you engage. The two complement each other; many of our clients use Knapsack or Supernova alongside our audit work.

**Q: What if my team is in a different timezone from Vietnam?**

We work async-first. Most communication happens via email + a shared Notion / Slack / Teams channel. We schedule 1–2 calls per week as needed. We've engaged with US, EU, AU, and APAC clients — timezone has not been a blocker.

**Q: Can I pay in instalments?**

Tier 1 audits: 50% on signing, 50% on delivery. Tier 2 implementations: 30/40/30 across milestones. Tier 3 retainers: monthly. Tier 4 packs: 100% on delivery (small enough that instalments add overhead).

**Q: Do you offer discounts for non-profits or open-source projects?**

Yes — 30% discount on Tier 1 audits for registered non-profits. Pro-bono Tier 1 audits for the first 3 widely-used open-source design systems whose maintainers reach out (allocated 2026). Email to ask.

---

## Contact

**CyberSkill Engagement Team — Design Systems & Audit Practice**

- Email: **info@cyberskill.world**
- WhatsApp / Phone: **(+84) 906 878 091**
- Website: **https://cyberskill.world**
- Audit landing page: **https://audit.cyberskill.world**

### Headquarters

CYBERSKILL SOFTWARE SOLUTIONS CONSULTANCY AND DEVELOPMENT JOINT STOCK COMPANY
1st Floor, 207A Nguyen Van Thu Street
Tan Dinh Ward
Ho Chi Minh City, Vietnam

DUNS: 673219568

The framework is yours to use freely. When the open-source layer doesn't go far enough, CyberSkill is here.

*Hiện Thực Hoá Ý Chí — Turn Your Will Into Real.*
