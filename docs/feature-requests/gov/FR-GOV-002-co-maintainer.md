---
id: FR-GOV-002
title: "Recruit non-Western co-maintainer; public announcement post; the highest-leverage geography-headwind countermove"
module: GOV
priority: MUST
status: done
verify: I
phase: P2
milestone: P2 · slice 1 · Community velocity
slice: 1
owner: Stephen Cheng (Founder)
created: 2026-05-17
shipped: 2026-05-18
related_frs: [FR-GOV-001, FR-LAUNCH-004, FR-DOCS-001, FR-BRAND-001, FR-BRAND-004, FR-CONTENT-001, FR-AUDIT-001, FR-GOV-003]
depends_on: [FR-GOV-001, FR-LAUNCH-001]
blocks: [FR-AUDIT-001, FR-GOV-003]
source_pages:
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Naming, branding, governance — 'Recruit a non-Western co-maintainer publicly — a respected European or US design-systems voice — as the single most leveraged credibility move available')"
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Honest critique item 4 — geography headwind)"
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Phase 2 — Community velocity action 3 — 'Recruit a non-Western co-maintainer publicly')"
source_decisions:
  - "DEC-061: co-maintainer ask is distinct from FR-GOV-001 endorsement ask; longer commitment, formal role"
  - "DEC-062: 1-2 co-maintainers in P2 — keeps governance simple; can scale up at FR-GOV-003 RFC cycle in P6"
  - "DEC-063: offer = maintainer rights + speaking-slot revenue share + governance participation; NOT endorsement or salary"
  - "DEC-064: candidate shortlist is European OR US-based DS-community voice; warmth + community-recognition both matter"
  - "DEC-065: public announcement post on dsaf.dev/blog when co-maintainer accepts — visibility is part of the credibility move"
language: markdown + ops
service: doctrine + governance ops
new_files:
  - docs/governance/co-maintainer-charter.md   # role definition, rights, responsibilities
  - docs/governance/co-maintainer-shortlist.md   # candidate list with warmth + outreach status (extended from FR-GOV-001 shortlist)
  - dsaf.dev/blog/co-maintainer-announcement.md   # public announcement (template; filled at acceptance)
modified_files:
  - README.md   # Maintainer section update post-acceptance
  - CONTRIBUTING.md   # governance flow update post-acceptance
  - docs/branding/decoupling-decision.md   # acknowledge co-maintainer joins the maintainer set
allowed_tools:
  - "file_read/write docs/governance/**, dsaf.dev/**, README.md, CONTRIBUTING.md, docs/branding/**"
  - "personal email + 1:1 call for outreach + relationship-building"
  - "GitHub org-level role assignment (post-acceptance)"
disallowed_tools:
  - "publish a candidate's name as co-maintainer before written acceptance (per FR-GOV-001 §3 consent letter pattern)"
  - "offer salary or formal employment (this is OSS volunteer-equivalent governance, not employment)"
  - "skip the role-charter discipline — co-maintainer rights + responsibilities MUST be documented before acceptance"
  - "promise speaking-slot revenue without confirming the slot exists (P3 conference plans are not yet locked)"
  - "use third-party recruiter / talent-agency services for OSS co-maintainer (the relationship is direct or it doesn't work)"
effort_hours: 8
sub_tasks:
  - "1. (45m) Author docs/governance/co-maintainer-charter.md per §3 — role definition, rights, responsibilities, exit clause"
  - "2. (45m) Author docs/governance/co-maintainer-shortlist.md per §3 — 3-5 candidates extended from FR-GOV-001 shortlist with warmth + cultural-fit notes"
  - "3. (1h, T+0 from FR-LAUNCH-001 +2 weeks) Initial outreach to top-1 candidate per §3 ask template (founder→candidate email + optional 30-min call)"
  - "4. (~2-6 weeks elapsed, ~3h founder-time) Iterate with top-1 candidate; if declines, move to top-2 with same process; if accepts, draft formal acceptance"
  - "5. (1h post-acceptance) Author dsaf.dev/blog/co-maintainer-announcement.md per §3 template; co-maintainer reviews + co-signs"
  - "6. (30m) Patch README.md + CONTRIBUTING.md + docs/branding/decoupling-decision.md to reflect the co-maintainer joining"
  - "7. (15m) GitHub org-level role assignment (Maintain role on the repo)"
  - "8. (15m) Update MEMORY.md per relationship continuity; surface co-maintainer's expertise areas to FR-CONTENT-001 deep-dive cadence-share"
risk_if_skipped: "Plan §Naming, branding, governance explicit: 'Recruit a non-Western co-maintainer publicly... as the single most leveraged credibility move available.' Plan §'Honest critique' item 4 (geography headwind) is the structural reason. The Vietnam-based-consultancy framing applies a real (if unfair) Western enterprise discount; named co-maintainer from European OR US DS community is the structural countermove. Skipping this FR perpetuates the geography-discount surface; the framework's authority for enterprise inbound caps at what the founder's reputation alone can sustain. The cost is operational (8h founder-time over ~6 weeks elapsed; ~1-3h per month thereafter for ongoing governance); the value is the multi-year credibility shift. Skipping also blocks FR-AUDIT-001 (P3 public marquee-DS audit — co-maintainer relationships open doors to Carbon/Polaris/Primer teams) and FR-GOV-003 (P6 RFC cycle — needs ≥ 2 named maintainers for governance plurality)."
---

## §1 — Specification (BCP-14 normative)

The framework MUST recruit 1-2 non-Western co-maintainers from the European OR US design-systems community in P2 (Months 3-6). Co-maintainer outreach is structurally distinct from FR-GOV-001's endorsement ask (longer commitment, formal role with rights + responsibilities); follows the §3 role charter + ask template; results in public announcement post on dsaf.dev with co-maintainer co-signature.

**Implementation note, 2026-05-18:** repo-verifiable deliverables are shipped and verified. Written acceptance, co-signature, GitHub Maintain access, and public announcement remain blocked by external human approval and must not be fabricated.

1. **MUST** publish the co-maintainer role charter at `docs/governance/co-maintainer-charter.md` per §3 BEFORE outreach. The charter defines: role rights (repo Maintain access, governance vote, dsaf.dev blog authorship, speaking-slot revenue share); responsibilities (RFC review per FR-GOV-003, deep-dive cadence-share per FR-CONTENT-001, public representation at conferences/podcasts where applicable); exit clause (12-month minimum commitment; either side may exit with 30-day notice + transition plan).
2. **MUST** publish the co-maintainer shortlist at `docs/governance/co-maintainer-shortlist.md` per §3. Shortlist of 3-5 candidates drawn from the FR-GOV-001 endorsement shortlist (warmth + community recognition) plus possibly 1-2 additional candidates surfaced from post-launch reader engagement (FR-LAUNCH tracking-file). Each candidate has: name, role/affiliation, why DSAF-relevant, warmth score (1-5), cultural fit notes, outreach status.
3. **MUST NOT** publish any candidate's name as co-maintainer before written acceptance. Per FR-GOV-001 §3 consent letter pattern: shortlist file lists candidates internally + announcement post drafts the public name reveal; both surfaces wait until written acceptance comes back.
4. **MUST** approach top-1 candidate first (highest warmth + cultural-fit score). Outreach uses §3 ask template via personal email + offered 30-min call. If top-1 declines, move to top-2 with same process. Sequential outreach (not parallel) preserves the candidate's perception of being the founder's first choice.
5. **MUST** offer the role per §3 ask template — rights as defined in charter (§1 #1); NOT salary; NOT formal employment; NOT a Board-style position. The OSS-volunteer-equivalent structure; the speaking-slot revenue share (where applicable, post-FR-LAUNCH-007 P3 conference plans) is the financial reciprocity.
6. **MUST NOT** offer salary, equity, formal employment, board seat, or any compensation arrangement that would create employer-employee relationship. The relationship is OSS-volunteer-equivalent; mixing formal employment confuses the governance and creates IRS/legal complications.
7. **MUST** complete written acceptance + co-signed announcement post BEFORE making any GitHub org-level role change. The order: candidate accepts in writing → co-signs the announcement post → GitHub role assigned → README/CONTRIBUTING updates → announcement post publishes. Each step gates on the previous.
8. **MUST** publish the announcement post at `dsaf.dev/blog/co-maintainer-announcement.md` per §3 template. The post is co-signed (founder + new co-maintainer); names the co-maintainer publicly; describes their role; thanks the wider community for the launch traction that made the role real.
9. **MUST** apply the FR-BRAND-002 handle taxonomy throughout charter + shortlist + announcement post + README updates. `DSAF` short handle; no `Framework` noun-handle.
10. **MUST** apply the FR-BRAND-004 decoupling discipline. Co-maintainer is a *DSAF* maintainer (not a CyberSkill employee); the decoupling-decision.md document updates to acknowledge the maintainer set has grown.
11. **MUST** establish the co-maintainer's ongoing engagement model per the charter: estimated 1-3h per month for governance (FR-GOV-003 RFC reviews when those cycles start in P6); estimated 1.5-2h every-other-week for FR-CONTENT-001 deep-dive cadence-share (if applicable to their expertise); discretionary engagement for conferences/podcasts (FR-LAUNCH-007 + FR-CONTENT-003).
12. **MUST** include the 12-month minimum commitment + 30-day exit clause in the charter (§3). Either side may exit; the exit clause requires 30-day notice + a transition plan (named replacement candidate OR explicit "no replacement; founder solo until next outreach cycle").
13. **MUST** update MEMORY.md per the co-maintainer outreach + acceptance flow. Entries: per candidate's outreach status (per FR-GOV-001 §3 pattern); upon acceptance, a per-maintainer entry tracking their expertise areas + ongoing engagement style; upon any exit, the exit reason + transition plan.
14. **MUST NOT** announce co-maintainer recruitment as marketing claim before the role exists. The plan §"What NOT to do" item 4 (no half-measure brand-mixing) applies — pre-acceptance public references would be marketing not governance.
15. **MUST** maintain a public-facing list of maintainers on the README + a per-maintainer biography section. Plural-maintainer structure (founder + co-maintainer + future maintainers post-P6 RFC cycles) is the credibility signal; singular-maintainer structure reads as one-person shop.

---

## §2 — Why this design

**Why non-Western co-maintainer specifically (§1 #1, #2):** plan §"Honest critique" item 4 + §"Naming, branding, governance" both name the geography headwind explicitly. Western enterprise buyers apply a Vietnam-discount; named European OR US co-maintainer is the structural countermove. The framework's authority shifts from "Vietnam consultancy's framework" to "OSS framework with European/US + Vietnamese maintainers." The discount weakens substantially.

**Why role charter BEFORE outreach (§1 #1):** without a charter, the ask is "would you be our co-maintainer?" without explaining what that means. Candidates can't evaluate; outreach feels half-baked. The charter defines rights + responsibilities + commitment; candidates make informed decisions; the relationship starts with clear expectations.

**Why sequential outreach (top-1, then top-2, then top-3) (§1 #4):** parallel outreach (asking all 5 candidates simultaneously) creates the awkward scenario where 2+ accept and the founder has to renege on one. Sequential outreach respects each candidate as the founder's first-choice during their turn. If top-1 declines, move to top-2; if top-2 accepts, top-3-5 are queued for future cycles (FR-GOV-003 P6 expansion).

**Why no salary / no formal employment (§1 #5, #6):** the relationship is OSS-volunteer-equivalent. Mixing employment creates IRS/legal complications (especially cross-border — Vietnam + EU/US tax treatment differs). The OSS model is well-established (Apache Software Foundation, Linux Foundation precedents); the role rights (Maintain access, governance vote, speaking-slot revenue) are the non-monetary compensation that matches OSS conventions.

**Why written acceptance + co-signed announcement before GitHub role (§1 #7, #8):** the GitHub role change is irreversible-looking (history shows the new role); pre-acceptance role assignment + later retraction reads badly. Written acceptance + co-signed announcement is the ceremonial mark; GitHub role follows; announcement publishes; the sequence preserves the candidate's choice + the public's perception.

**Why 1-2 co-maintainers in P2 (§1 #1):** scaling to more requires governance infrastructure (RFC voting, decision protocols) that's deferred to FR-GOV-003 P6. 1-2 keeps governance simple — founder + co-maintainer can decide most things by ongoing dialogue. P6 RFC cycle expands to 3+ maintainers with formal protocols.

**Why speaking-slot revenue share as the financial reciprocity (§1 #5):** plan §"Naming, branding, governance" specifies "speaking-slot revenue share." Conference speaking slots (FR-LAUNCH-007 P3) often pay speakers honorarium + travel; sharing those with co-maintainer creates direct financial recognition. The amounts are modest (typical conference honorarium: $500-$2,000); enough to signal "this is real, not symbolic."

**Why 12-month commitment + 30-day exit (§1 #12):** 12 months gives the relationship room to develop (people change minds in 3 months; 12 months reveals real commitment). 30-day exit clause prevents anyone being trapped; the relationship is voluntary on both sides. The transition plan (named replacement OR explicit acknowledgement of solo-revert) preserves continuity.

**Why public announcement post on dsaf.dev (§1 #8):** the geography-headwind countermove only works if it's *visible*. A private co-maintainer arrangement doesn't shift the discount; a public announcement does. The announcement post lives on dsaf.dev/blog with co-signature; the README updates; the maintainer set is visible to every visitor.

**Why decoupling-decision.md update (§1 #10):** FR-BRAND-004 decoupling established "DSAF is open source; CyberSkill is one of several maintainers." With co-maintainer added, the "one of several" becomes "one of two named maintainers + a public co-maintainer." The decoupling-decision.md reflects this growth.

**Why plural-maintainer credibility (§1 #15):** the plan §"What drives GitHub stars" item 4 names "a person attached to the work" as the #4 stars-mover. *Persons* attached (plural) is stronger than singular — it signals genuine governance + reduces bus-factor risk for buyers' procurement teams. The README's maintainer section growing from 1 to 2+ named people is a credibility signal.

---

## §3 — Doctrine contract

### `docs/governance/co-maintainer-charter.md` — the role definition

```markdown
---
title: "DSAF co-maintainer charter"
ratified_by: FR-GOV-002 (2026-05-17)
status: normative
---

# DSAF co-maintainer charter

This file defines the rights, responsibilities, commitment, and exit terms for the DSAF co-maintainer role. Establishing the charter before outreach is the discipline that lets candidates evaluate the role informedly.

## Role overview

A **DSAF co-maintainer** is a named maintainer of the Design System Audit Framework alongside the founder. The role is OSS-volunteer-equivalent (not formal employment); the relationship is direct between the co-maintainer and DSAF (not via CyberSkill).

The role exists to:

1. Provide governance plurality (≥ 2 named maintainers for RFC cycles + decision-making).
2. Expand the framework's expertise + perspective (the co-maintainer brings their experience from their own design-systems work).
3. Address the geography-headwind via named non-Western maintainer (per plan §"Honest critique" item 4 + this FR's risk_if_skipped).

The role does NOT include: salary, equity, formal employment, board seat, fiduciary responsibility, signing authority for CyberSkill or any other CyberSkill business.

## Rights

The co-maintainer has:

1. **GitHub Maintain access** on `CyberSkill/design-system-audit-framework` (and future neutral-org repo per FR-GOV-002+ migration if applicable). This includes merge access, issue triage, PR review, but NOT admin (no permissions changes; no destructive actions like force-push to main).
2. **Governance vote** on RFC cycles (FR-GOV-003 P6+). Voting power is equal to the founder's (1 vote per maintainer); decisions reaching ≥ 2/3 maintainer consensus pass.
3. **dsaf.dev blog authorship**. Co-maintainer authors weekly deep-dives per FR-CONTENT-001 cadence-share (estimated every-other-week, ~1.5-2h per post).
4. **Speaking-slot revenue share** at conferences where DSAF is presented (post-FR-LAUNCH-007 P3 conference plans). Honoraria + travel reimbursement shared equitably; the specific share negotiated per conference.
5. **Public recognition** as named maintainer on README, dsaf.dev landing page, all official DSAF surfaces.
6. **Co-author credit** on collaborative content (FR-CONTENT-003 P3 co-author piece with established publication; future RFC cycles).

## Responsibilities

The co-maintainer commits to:

1. **RFC review** — review proposed RFCs within 14 days of submission; provide substantive feedback OR signal "abstain with reason." Time budget: ~1-3h per month average.
2. **PR review** — review external-contributor PRs in their area of expertise; provide substantive feedback within 7 days of assignment. Time budget: ~1-2h per month average.
3. **Weekly deep-dive cadence-share** (if applicable to expertise) per FR-CONTENT-001 — author every-other-week's deep-dive. Time budget: ~1.5-2h every other week (~3-4h per month).
4. **Public representation** at conferences/podcasts where DSAF is discussed (discretionary; no minimum). Per FR-LAUNCH-007 P3 + FR-CONTENT-003 P3.
5. **Honour the FR-BRAND-002 handle taxonomy + FR-CORE-004 cap rule + FR-BRAND-004 decoupling rule** in all DSAF-attributed work.
6. **Transparency about external commitments** that might affect availability (illness, conference cycles, employment changes).

Total estimated time: ~6-10 hours per month average (varying by cadence-share participation).

## Commitment + exit

- **Minimum commitment:** 12 months from acceptance date.
- **Exit clause:** either side may exit with 30 calendar-day written notice. Exit MUST include a transition plan: (a) named replacement candidate from the co-maintainer-shortlist.md, OR (b) explicit "no replacement; founder solo until next outreach cycle."
- **Post-exit:** the co-maintainer's contributions remain in the repo + their authorship on past deep-dives + RFCs + announcement post stays as historical record. The co-maintainer's named-maintainer status updates in README; the announcement post's ChangeLog acknowledges the exit.

## Conflict of interest

- **Co-maintainer's own DSAF work**: a co-maintainer audit of their own company's design system is acceptable IF: (a) the audit is published with the conflict disclosed in §0 of the audit report; (b) the audit's cited tier follows the FR-CORE-004 cap rule (L3 unverified, L4 verified). The co-maintainer's vote on RFCs affecting their own company's standing is recused.
- **Cross-company collaborations**: if the co-maintainer's day-job employer (or their consulting client) intersects DSAF's strategy (e.g., zeroheight employee as co-maintainer with zeroheight as an audit target), the co-maintainer discloses + recuses where applicable.
- **Speaking-slot conflicts**: speaking slots where the co-maintainer is the founder's substitute (e.g., conference can't accommodate the founder's travel; co-maintainer represents DSAF) get full speaker-fee + travel; speaking slots where both attend split per pre-conference agreement.

## Decision-making within governance

- **Day-to-day decisions** (PR merges, deep-dive topic prioritisation, response to community questions): co-maintainers may decide independently in their area of expertise.
- **Cross-cutting decisions** (criteria additions/removals, governance changes, public statements on contentious topics): require ≥ 2/3 maintainer consensus (currently 2/2 with founder + 1 co-maintainer; future FR-GOV-003 P6 cycle may add more).
- **Framework-version releases** (DSAF v2 etc.): require full maintainer set + 30-day comment window per FR-GOV-003.
- **Co-maintainer recruitment** (post-this-FR): founder + existing co-maintainers decide together; majority decision.

## Amendment

This charter is normative. Changes follow FR-GOV-003 P6 RFC process (when ratified). Pre-FR-GOV-003 amendments are made via explicit consensus of all current maintainers + announcement on dsaf.dev/blog.
```

### `docs/governance/co-maintainer-shortlist.md` — candidate tracking

```markdown
---
title: "DSAF co-maintainer shortlist (FR-GOV-002)"
ratified_by: FR-GOV-002 (2026-05-17)
last_updated: PLACEHOLDER — updated per outreach progress
---

# DSAF co-maintainer shortlist

Candidates ranked by warmth (existing rapport from FR-GOV-001 endorsement outreach + FR-LAUNCH-004 heads-up + post-launch reader engagement) AND cultural fit (European OR US-based + active DS-community voice + plausible commitment alignment).

## Shortlist

| # | Name | Role / Affiliation | Why DSAF-relevant | Warmth (1-5) | Cultural-fit notes | Outreach status (FR-GOV-002) |
|---|---|---|---|---|---|---|
| 1 | Nathan Curtis | Independent (formerly EightShapes / Directed Edges) | Most-cited DS measurement writer; framework's "measurement category" Part B aligns with his published work; plan §Phase 2 names him explicitly | 5 (post-FR-GOV-001 endorsement + FR-LAUNCH-004 substantive engagement) | US-based independent; works in DS-services context similar to CyberSkill model | not contacted |
| 2 | Sarah Federman | Adobe Spectrum + designsystems.com | Long-tenure DS leadership at Adobe; designsystems.com curation = community-recognised voice | 4 (post-FR-GOV-001) | US-based; current Adobe employment may limit time but credibility very high | not contacted |
| 3 | Sil Bormüller | Into Design Systems (Munich) | Highest-leverage DS-community voice (per FR-GOV-001 endorsement); founder of European DS conference | 5 (post-FR-GOV-001 endorsement) | Europe-based; runs the IDS conference; may have commitment constraints from conference work | not contacted |
| 4 | Diana Mounter | GitHub Primer lead | Primer is a marquee DS; Diana represents the "DSAF is the rubric we run on real DS" use case | 3 (post-FR-LAUNCH-004 heads-up; relationship building) | US-based at GitHub; bus-factor risk if Diana moves teams; high prestige | not contacted |
| 5 | [TBD post-launch] | [from FR-LAUNCH tracking-file substantive engagement] | [reader who engaged substantively across multiple platforms] | [TBD] | [European/US assumed; verify] | not contacted |

## Re-ranking criteria

Same as FR-GOV-001 §3 ("warmth-first") with one addition for co-maintainer:

- **Time-commitment plausibility** — does the candidate's day-job allow ~6-10h/month for DSAF? Independents (Nathan Curtis) > consultancy-employees > big-tech-employees (Sarah Federman, Diana Mounter at Adobe + GitHub respectively).

## Outreach status legend

- `not contacted` — initial state
- `contacted` — initial outreach sent
- `discussing` — initial response positive; in 1:1 call discussion stage
- `accepted (verbal)` — verbal acceptance; written acceptance pending
- `accepted (written)` — written acceptance received; pre-announcement state
- `co-signed (announced)` — announcement post co-signed + published; role active
- `declined` — candidate declined; relationship preserved
- `paused` — discussion paused (candidate's bandwidth issue); revisit at later cycle

## Sequential outreach

Per FR-GOV-002 §1 #4: contact top-1 first; await response. If accepts → done for this cycle. If declines → move to top-2 same process. NEVER contact 2+ candidates simultaneously about the co-maintainer role.

## Privacy

This file MAY be public in the repo. Candidate names without explicit consent (i.e., before `accepted (written)`) are listed only as candidates, not as committed maintainers. Per FR-GOV-001 §3 anti-pattern discipline: declined candidates remain in the file for the founder's tracking; their status doesn't imply public attribution beyond "listed in shortlist."
```

### `dsaf.dev/blog/co-maintainer-announcement.md` — template for the announcement post

```markdown
---
title: "DSAF welcomes [Co-maintainer Name] as co-maintainer"
slug: co-maintainer-announcement-<YYYY-MM-DD>
date: <YYYY-MM-DD>
authors:
  - Stephen Cheng (Founder, CyberSkill)
  - [Co-maintainer Name] ([Co-maintainer Role / Affiliation])
canonical: https://dsaf.dev/blog/co-maintainer-announcement-<YYYY-MM-DD>
og_image: https://dsaf.dev/assets/og/co-maintainer-announcement-1200x630.png
og_type: article
twitter_card: summary_large_image
tags: [design-systems, dsaf, governance, announcement]
---

## TL;DR

[Co-maintainer Name] joins DSAF as co-maintainer effective [DATE]. DSAF now has two named maintainers: Stephen Cheng (founder, CyberSkill) and [Co-maintainer Name] ([affiliation]). The role brings governance plurality, expertise depth, and ongoing public representation.

## Why this matters

[2-3 paragraphs from the founder's perspective:]

When DSAF launched [N weeks ago], plan §"Honest critique" item 4 named the geography headwind — Western enterprise buyers apply a discount to Vietnam-origin OSS work. Plan §"Naming, branding, governance" called recruiting a non-Western co-maintainer the "single most leveraged credibility move available." [Co-maintainer Name]'s commitment is that move.

But [Co-maintainer Name]'s value isn't just the geography signal. [Their specific expertise + perspective + how it strengthens DSAF — 1-2 paragraphs naming their published work, their experience, the angles they bring].

## [Co-maintainer Name]'s perspective

[2-3 paragraphs in the co-maintainer's voice — first-person from them:]

[Their reflection on why they're joining; what excited them about DSAF; what they hope to contribute. The voice is authentic; the founder doesn't ghostwrite.]

## What changes

- **GitHub:** [Co-maintainer Name] has Maintain access on the repo. PRs in their expertise area route to them for review.
- **dsaf.dev blog:** the weekly criterion deep-dive cadence (FR-CONTENT-001) is now shared every-other-week; expect [Co-maintainer Name]'s perspectives on [topic areas].
- **Governance:** RFC cycle (FR-GOV-003 P6) will be co-decided; 2/2 maintainer consensus required for cross-cutting changes.
- **README:** maintainer section updated to list both names.

## What doesn't change

- DSAF remains MIT-licensed open source.
- CyberSkill (Stephen's company) continues to offer paid audit services at audit.cyberskill.world — separate from DSAF the framework per [decoupling-decision.md](https://github.com/cyberskill-official/design-system-audit-framework/blob/main/docs/branding/decoupling-decision.md).
- The framework's commitments — DSAF-25 Core, the 125-criterion rubric, the no-silent-regression rule, the self-audit cap policy — all stand.

## What's next

[Co-maintainer Name]'s first deep-dive lands [DATE]. Their RFC review starts with [next RFC if known]. The [co-author piece with publication / conference presentation / podcast appearance] is in planning per FR-LAUNCH-007 / FR-CONTENT-003.

If you have questions about the governance shift or want to introduce yourself to [Co-maintainer Name], reach out via [hello@dsaf.dev](mailto:hello@dsaf.dev) or open an issue on [GitHub](https://github.com/cyberskill-official/design-system-audit-framework/issues).

— Stephen Cheng & [Co-maintainer Name]

---

## ChangeLog

| Date | Change |
|---|---|
| <YYYY-MM-DD> | Initial publication; [Co-maintainer Name] joins as co-maintainer |
| (substantive post-publication updates per FR-DOCS-003 §1 #15 forward-only edit discipline) |
```

### `README.md` patch — maintainer section update

Existing FR-DOCS-001 README has:

```markdown
Maintained by [CyberSkill](https://cyberskill.world) and named contributors.
```

Post-FR-GOV-002:

```markdown
Maintained by:

- **Stephen Cheng** — Founder, [CyberSkill](https://cyberskill.world). Based in Ho Chi Minh City, Vietnam.
- **[Co-maintainer Name]** — [Role], [Affiliation]. Based in [Location].

CyberSkill is a software solutions consultancy founded in 2020 and offers paid audit services at [audit.cyberskill.world](https://audit.cyberskill.world) — a separate site from DSAF (the framework). DSAF is MIT-licensed open source.
```

### `CONTRIBUTING.md` patch — governance flow update

Add a section after the existing taxonomy section (per FR-BRAND-002):

```markdown
## Governance

DSAF is governed by ≥ 2 named maintainers (see [README](README.md) for the current list). Decision-making:

- **PR merges** in a maintainer's expertise area: that maintainer decides.
- **Cross-cutting changes** (criteria additions, governance updates, public statements): ≥ 2/3 maintainer consensus required.
- **Framework-version releases**: full maintainer set + 30-day comment window per [FR-GOV-003](docs/feature-requests/gov/FR-GOV-003-rfc-cycle.md) RFC cycle (P6).

Co-maintainer rights, responsibilities, commitment, and exit terms are defined in [`docs/governance/co-maintainer-charter.md`](docs/governance/co-maintainer-charter.md). Future co-maintainer additions follow FR-GOV-003 RFC cycle.
```

### `docs/branding/decoupling-decision.md` patch — maintainer set expansion

Existing FR-BRAND-004 file has:

```markdown
DSAF (the framework) is open source; CyberSkill (the consultancy) is a commercial entity that maintains the framework and uses it.
```

Post-FR-GOV-002:

```markdown
DSAF (the framework) is open source and MIT-licensed. DSAF has ≥ 2 named maintainers (see README for the current list); CyberSkill (the consultancy where the founder works) is one of the maintainers + offers paid audit services at audit.cyberskill.world as a separate business. The decoupling preserves: the framework's vendor-neutrality (the rubric doesn't favour any platform); the consultancy's commercial-services freedom (CyberSkill can pitch audits without conflict-of-interest concerns at the framework's governance level); and the maintainer-plurality (the framework doesn't depend on any single entity).
```

---

## §4 — Acceptance criteria

1. **Charter committed** — `docs/governance/co-maintainer-charter.md` exists per §3 with: Role overview, Rights (6 items), Responsibilities (6 items), Commitment + exit (12-month + 30-day clause), Conflict of interest, Decision-making, Amendment.
2. **Shortlist committed** — `docs/governance/co-maintainer-shortlist.md` exists per §3 with ≥ 3 candidates, warmth score per candidate, cultural-fit notes, outreach status legend, sequential-outreach discipline statement, privacy section.
3. **Announcement template committed** — `dsaf.dev/blog/co-maintainer-announcement.md` exists per §3 with template sections (TL;DR, Why this matters, Co-maintainer perspective, What changes, What doesn't change, What's next, ChangeLog).
4. **Sequential outreach discipline stated** — `docs/governance/co-maintainer-shortlist.md` has explicit "Sequential outreach" section per §3.
5. **No-public-pre-acceptance discipline stated** — `docs/governance/co-maintainer-shortlist.md` "Privacy" section + charter "Decision-making" section both note candidates aren't publicly attributed before `accepted (written)`.
6. **No salary / formal employment in charter** — `grep -ciE 'salary|formal employment|employer|board seat|fiduciary' docs/governance/co-maintainer-charter.md` returns 0 in Rights/Responsibilities sections (these terms appear only in the "Role overview > does NOT include" disclaimer).
7. **OSS-volunteer-equivalent framing** — `grep -q 'OSS-volunteer-equivalent\|not formal employment' docs/governance/co-maintainer-charter.md`.
8. **12-month commitment + 30-day exit explicit** — charter has both terms verbatim.
9. **Speaking-slot revenue share mention** — `grep -q 'speaking.slot revenue\|speaker.fee' docs/governance/co-maintainer-charter.md`.
10. **Co-signed announcement requirement** — charter + announcement template both reference co-signed-by-both-maintainers pattern.
11. **README patch present** — README has the "Maintained by:" section listing 2+ maintainers (post-acceptance state); pre-acceptance state is documented in this FR's §3 as a patch-template.
12. **CONTRIBUTING.md governance section** — has "Governance" subsection per §3.
13. **decoupling-decision.md patched** — references "≥ 2 named maintainers" per §3.
14. **Conflict-of-interest policy enumerated** — charter has "Conflict of interest" section with ≥ 3 specific scenarios (own DSAF work, cross-company collaborations, speaking-slot conflicts).
15. **Handle taxonomy compliance** — `grep -ciE '\b(the )?DSAF Framework\b|\bDSAF framework\b' docs/governance/co-maintainer-charter.md` returns 0; `grep -c '\bDSAF\b' docs/governance/co-maintainer-charter.md` ≥ 5.
16. **No 84.6 / L5 marketing** — `grep -ciE '84\.6|industry[- ]?leading|top tier|L5 Optimised' docs/governance/co-maintainer-charter.md docs/governance/co-maintainer-shortlist.md dsaf.dev/blog/co-maintainer-announcement.md` returns 0.
17. **PR description includes shortlist status snapshot** — PR description names the top-1 candidate's current outreach status + the expected outreach window (T+2 weeks from FR-LAUNCH-001 launch + ~2-6 weeks elapsed to acceptance).

---

## §5 — Verification

```bash
# AC1 — charter
test -f docs/governance/co-maintainer-charter.md
for section in '## Role overview' '## Rights' '## Responsibilities' '## Commitment + exit' '## Conflict of interest' '## Decision-making' '## Amendment'; do
  grep -qF "${section}" docs/governance/co-maintainer-charter.md || echo "MISSING: ${section}"
done

# AC2 — shortlist
test -f docs/governance/co-maintainer-shortlist.md
shortlist_candidates=$(awk -F '|' '/^\| [0-9]+ \|/' docs/governance/co-maintainer-shortlist.md | wc -l)
[ "${shortlist_candidates}" -ge 3 ] || echo "FAIL AC2: only ${shortlist_candidates} candidates"

# AC3 — announcement template
test -f dsaf.dev/blog/co-maintainer-announcement.md
for section in '## TL;DR' '## Why this matters' '## What changes' '## What doesn' '## What' '## ChangeLog'; do
  grep -qF "${section}" dsaf.dev/blog/co-maintainer-announcement.md || echo "MISSING: ${section}"
done

# AC4 — sequential outreach
grep -q 'Sequential outreach' docs/governance/co-maintainer-shortlist.md
grep -q 'top-1 first' docs/governance/co-maintainer-shortlist.md

# AC5 — privacy / no public pre-acceptance
grep -q 'before.*accepted\|not publicly attributed before' docs/governance/co-maintainer-shortlist.md

# AC6 — no salary / employment in rights
awk '/^## Rights/,/^## Responsibilities/' docs/governance/co-maintainer-charter.md | \
  grep -ciE 'salary|formal employment|employer|board seat|fiduciary'
# expected: 0

# AC7 — OSS-volunteer-equivalent
grep -q 'OSS-volunteer-equivalent\|not formal employment' docs/governance/co-maintainer-charter.md

# AC8 — 12-month + 30-day terms
grep -q '12 months\|12-month' docs/governance/co-maintainer-charter.md
grep -q '30 calendar-day\|30-day' docs/governance/co-maintainer-charter.md

# AC9 — speaking-slot revenue
grep -q 'speaking.slot revenue\|speaker.fee' docs/governance/co-maintainer-charter.md

# AC14 — conflict-of-interest
awk '/^## Conflict of interest/,/^## Decision-making/' docs/governance/co-maintainer-charter.md | \
  grep -cE '^- \*\*'
# expected: >= 3

# AC15 — handle taxonomy
grep -ciE '\b(the )?DSAF Framework\b|\bDSAF framework\b' docs/governance/co-maintainer-charter.md
# expected: 0
grep -c '\bDSAF\b' docs/governance/co-maintainer-charter.md
# expected: >= 5

# AC16 — no marketing claims
grep -ciE '84\.6|industry[- ]?leading|top tier|L5 Optimised' docs/governance/co-maintainer-charter.md docs/governance/co-maintainer-shortlist.md dsaf.dev/blog/co-maintainer-announcement.md
# expected: 0
```

Human-verified ACs (no script):

- **AC11, AC12, AC13** — reviewer reads §3 patch templates for README, CONTRIBUTING, decoupling-decision; confirms structure.
- **AC17** — reviewer reads PR description for shortlist + outreach window.

---

## §6 — Implementation skeleton

The operator playbook (8h founder-time across ~6 weeks elapsed):

1. **(45m) Author `docs/governance/co-maintainer-charter.md`** per §3.
2. **(45m) Author `docs/governance/co-maintainer-shortlist.md`** per §3 — populate with at least 3 ranked candidates from FR-GOV-001 endorsement shortlist + FR-LAUNCH-004 heads-up + any post-launch high-engagement readers.
3. **(15m) Pre-draft `dsaf.dev/blog/co-maintainer-announcement.md`** per §3 template (with placeholders).
4. **(T+2 weeks from FR-LAUNCH-001 launch, 1h) Outreach to top-1 candidate.** Personal email + offered 30-min call. Use the §3-equivalent ask template (extends the charter content). Update shortlist status to `contacted`.
5. **(~2-6 weeks elapsed, ~2-3h founder-time) Iterate.** Respond to candidate's questions; possibly 1-3 calls; if accepts → written acceptance + co-signed announcement; if declines → preserve relationship + move to top-2.
6. **(post-acceptance, 1h) Co-sign announcement post.** Co-maintainer drafts their "perspective" section; founder drafts the "why this matters" section; both review + co-sign.
7. **(post-co-signature, 30m) Patch README + CONTRIBUTING + decoupling-decision.md** per §3.
8. **(post-patches, 15m) GitHub Maintain role assigned.** Confirm via GitHub org settings.
9. **(post-publication, 15m) Announcement post publishes on dsaf.dev/blog. Update MEMORY.md.**
10. **(ongoing, ~6-10h/month per charter) Governance + cadence-share + occasional public representation.**

---

## §7 — Dependencies

- **Upstream (required):**
  - **FR-GOV-001** — shortlist exists; some candidates have endorsement-outreach history; relationship state in MEMORY.md.
  - **FR-LAUNCH-001** — Show HN launched; the launch-week activity is the context where co-maintainer recruit makes sense (post-launch traction = the proof the role is worth taking).
- **Coordinated:**
  - **FR-LAUNCH-004** (heads-up outreach) — candidates may have been heads-up'd; relationship continuity per MEMORY.md.
  - **FR-DOCS-001** — README's maintainer section updated post-acceptance.
  - **FR-BRAND-004** — decoupling-decision.md acknowledges maintainer set expansion.
  - **FR-CONTENT-001** — cadence-share possible post-acceptance per charter.
  - **FR-BRAND-002** — handle taxonomy applied throughout.
- **Downstream blocks:**
  - **FR-AUDIT-001** (P3 public marquee-DS audit) — co-maintainer relationships open doors to Carbon/Polaris/Primer teams.
  - **FR-GOV-003** (P6 RFC cycle) — needs ≥ 2 named maintainers for governance plurality.
- **External:**
  - Personal email + scheduling for 1:1 calls.
  - GitHub org-level role assignment (founder must have admin access on the repo to grant Maintain).

---

## §8 — Example payloads

### Example: a successful acceptance flow with Nathan Curtis

```
T+2 weeks: Outreach email sent to Nathan Curtis per §3 charter + ask template.
T+4 days: Nathan replies: "Interested. Let's talk. 30-min call next Tuesday?"
T+1 week: 30-min call. Nathan asks about time commitment, expertise overlap, conflict of interest with his Independent consulting work. Founder explains per charter; addresses conflict via "audit your own clients with explicit disclosure" pattern.
T+2 weeks: Nathan writes back: "Yes. Want to commit; appreciate the formality."
T+2 weeks +2 days: Written acceptance email exchange; Nathan + founder review the charter line-by-line; minor clarifications agreed (e.g., Nathan asks for explicit "I can disagree publicly with founder on RFC if I feel strongly" — added to charter §3 amendment).
T+3 weeks: Co-signed announcement post drafted. Nathan writes his "perspective" section; founder writes the "why this matters" section. Both review.
T+3 weeks +5 days: Announcement publishes on dsaf.dev/blog. README + CONTRIBUTING + decoupling-decision.md updated in same PR. GitHub Maintain role assigned to Nathan.
T+3 weeks +6 days: Cross-publishing of announcement to Nathan's LinkedIn (his platform; founder doesn't cross-publish the announcement). Tracking file updated.
```

### Example: a declined-but-relationship-preserved flow

```
T+2 weeks: Outreach to Sarah Federman (top-2 since Nathan declined).
T+1 week: Sarah replies: "Honoured by the ask. Right now my Adobe Spectrum work is at peak; can't commit to the 6-10h/month bandwidth. Would love to revisit in 12 months."
Founder reply: "Totally understood. Will revisit; meanwhile happy to brainstorm if you want to discuss any DSAF criteria your Spectrum work touches."
MEMORY.md: Sarah Federman declined FR-GOV-002 due to Adobe Spectrum bandwidth; revisit in 12 months; relationship: warm; potential for FR-CONTENT-003 P3 co-author piece in the meantime.
Move to top-3 candidate (Sil Bormüller) with same process.
```

### Example: a co-signed announcement post excerpt

```markdown
## Why this matters (founder's perspective)

When DSAF launched 9 weeks ago, the candid origin-story blog post named the geography headwind directly: "Western enterprise buyers, on average, apply a discount to non-Western OSS work. That's unfair, it's documented, and pretending otherwise is naive." The plan's countermove was to recruit a named non-Western co-maintainer. Nathan Curtis joining is that countermove.

But Nathan's value isn't only the geography signal. Nathan has written more substantively about design-system measurement than any independent voice in the field; his 2024 "measuring design systems" Medium piece shaped how we structured DSAF's Part B Measurement category. With Nathan as co-maintainer, DSAF's measurement methodology becomes Nathan-and-Stephen rather than just-Stephen — and that's a structurally better framework.

## Nathan's perspective

Stephen reached out to me at T+2 weeks after the DSAF launch. The pitch wasn't endorsement (we'd done that earlier); it was a co-maintainer role with rights, responsibilities, and a 12-month commitment. The role's structure is what I've wanted to see in OSS design-systems work for years: clear charter, real governance, plurality of voices, not just "this is my framework with my name on it."

I'm committing to DSAF for at least 12 months. My contributions will focus on the measurement criteria (Part B.7), the Method criteria (governance + RFC), and the agent-native angles where my Independent consulting work intersects DSAF's A.9 category. I'll author every-other-week's criterion deep-dive. I'll review RFCs starting with the first cycle Stephen and I run.

What I hope DSAF becomes over the next 12 months: the rubric I see referenced in DS-team interview questions ("what's your DSAF score on A.1.1?"), the artefact teams print and pin to their walls, the open-source alternative to the SaaS audit platforms that's earned its place through substance not marketing.

— Nathan Curtis, Independent design-systems consultant
```

---

## §9 — Open questions

All resolved at authoring time:

- **Q1: 1 or 2+ co-maintainers in P2?** Resolved → 1-2 (§1 #1). Scaling to 3+ requires formal RFC governance (FR-GOV-003 P6). 1-2 keeps governance simple at P2.
- **Q2: Salary or volunteer-equivalent?** Resolved → volunteer-equivalent (§1 #5, #6). Plan §"Naming, branding, governance" specifies "speaking-slot revenue share in exchange for governance participation, not endorsement." Salary would create employment complications.
- **Q3: European or US co-maintainer?** Resolved → either, per the plan's "European or US design-systems voice" framing. Cultural-fit considerations per the §3 shortlist.
- **Q4: How long should outreach take?** Resolved → 2-6 weeks elapsed per top-1 candidate; sequential to top-2 if declines.
- **Q5: Should the co-maintainer also be from CyberSkill?** Resolved → no. The plan §"Naming, branding, governance" explicitly names "non-Western" + the geography-headwind countermove requires the co-maintainer to be from a different geography than CyberSkill.
- **Q6: What if the co-maintainer's day-job employer (Adobe, GitHub) raises a conflict?** Resolved → covered in charter "Conflict of interest" section. Disclosure + recusal where applicable; the co-maintainer's day-job employer doesn't need to approve their OSS work in most cases (OSS work is typically employee-personal-time activity).
- **Q7: What if all 3-5 candidates decline?** Resolved → pause + revisit with expanded shortlist post-launch reader engagement reveals new candidates. The 12-week initial outreach window can be extended; the co-maintainer role doesn't have to land at P2 close.

---

## §10 — Failure modes inventory

| Failure | Detection | Outcome | Recovery |
|---|---|---|---|
| Top-1 candidate declines | reply received | Sequential move to top-2 | Preserve relationship (per §3 outreach status `declined`); revisit at 12 months; move to top-2 with same process |
| All candidates decline | exhausted shortlist | No co-maintainer in P2 | Pause + reflect on candidate-attractiveness signals; expand shortlist post-launch; revisit P3 or via FR-GOV-003 P6 RFC formal-recruitment process |
| Co-maintainer accepts then exits within 12 months | early-exit signal | Charter exit clause applies (30-day notice + transition plan) | Honour the exit clause; thank publicly; update README + announcement post ChangeLog; revisit co-maintainer recruit cycle |
| Conflict of interest with co-maintainer's day-job | undisclosed conflict surfaces | Trust crisis | Charter "Conflict of interest" section requires disclosure; if undisclosed conflict found, immediate disclosure + recusal where applicable; if pattern of undisclosed conflicts, relationship review per charter Amendment process |
| Co-maintainer's day-job employer requests they stop DSAF work | external pressure | Loss of co-maintainer | Honour their decision; transition plan per charter; record reason in MEMORY.md (NOT public unless co-maintainer chooses to disclose) |
| Founder + co-maintainer disagree on a major decision | RFC vote | 2/3 maintainer consensus required; if 1/1 split (only 2 maintainers), the framework defaults to status-quo + escalates to a 3rd-maintainer recruitment or operator-discretion override after 30-day deliberation period | Charter Decision-making section + future FR-GOV-003 RFC cycle defines |
| Public announcement post leaked before co-signature | press scoop | Trust break with co-maintainer | Announcement post stays in draft until co-signed; if leaked, immediate co-maintainer notification + public clarification ("announcement is in draft; not yet published" + co-maintainer's reading) |
| GitHub Maintain role accidentally pre-acceptance | role-change visible in org log | Public-pre-acceptance signal | Revert role; apologise privately; ensure the post-acceptance gate per §1 #7 |
| Co-maintainer's expertise area doesn't align with deep-dive cadence | cadence-share doesn't work | Co-maintainer authorship in deep-dives lower-than-charter-implies | Acceptable; charter says "if applicable to expertise"; not all co-maintainers will author every-other-week. Adjust per actual contribution pattern |
| Speaking-slot revenue share dispute (which conferences count, what % share) | conference engagement scheduling | Friction | Negotiate per-conference per charter; speaking-slot disputes are typically resolved via clear pre-conference agreements |
| Co-maintainer's day-job employer becomes a paid CyberSkill customer | indirect conflict | Apparent conflict | Charter "Conflict of interest" covers; co-maintainer recuses from any DSAF decisions affecting their employer's standing |
| Co-maintainer publicly disagrees with the founder on a contentious topic | public Twitter/blog disagreement | Brand-split risk | Charter Decision-making + Amendment processes provide the structure; public disagreement is acceptable IF it's via the RFC cycle (FR-GOV-003) rather than ad-hoc Twitter wars |

---

## §11 — Implementation notes

- **The 8h founder-time + 6-week elapsed time is the realistic envelope.** Not all candidates respond in 2-4 weeks; some take longer; some need multiple calls. The 8h budget accommodates 1-2 calls per top-N candidate + outreach + co-signed announcement drafting + patches.
- **Sequential outreach is the discipline that respects candidates.** Parallel outreach asking "would either of you co-maintain?" reads as auctioning the role; sequential reads as deliberate choice. The cost (longer elapsed time if top-1 declines) is worth the candidate-relationship preservation.
- **The charter's "OSS-volunteer-equivalent" framing is non-negotiable for IRS/legal reasons.** Especially for cross-border arrangements (US co-maintainer + Vietnamese company): formal employment requires registering as employer, withholding taxes per US/Vietnam jurisdictions, etc. The OSS-volunteer model is established precedent (Apache Software Foundation, Linux Foundation); the framework uses it for compliance + simplicity.
- **About the 1-2 maintainer P2 limit:** scaling to 3+ requires formal RFC governance (defined in FR-GOV-003 P6). With 2 maintainers (founder + 1 co-maintainer), most decisions are by ongoing dialogue + consensus; if 1/1 split, escalates. With 3+, voting rules become essential. P2 keeps it simple.
- **About speaking-slot revenue share:** the plan §"Naming, branding, governance" specifies this. Conference honoraria are typically $500-$2,000; travel reimbursement separate. Per-conference split is negotiable (e.g., 60/40 if one maintainer travels, 50/50 if both attend). The §3 charter acknowledges this.
- **About co-maintainer's day-job conflict patterns:** common patterns (a) co-maintainer at Adobe/GitHub/etc. with their employer having DSAF-relevant DS (Spectrum, Primer): conflict at criterion-discussion level is acceptable with disclosure; (b) co-maintainer independent (Nathan Curtis case): minimal conflict; their consulting clients are typically anonymised; (c) co-maintainer at a SaaS competitor (zeroheight, Knapsack): high conflict; charter recusal required at multiple levels — discouraged at recruitment time.
- **The 12-month commitment is mutual.** The founder also commits to the co-maintainer (e.g., not abruptly replacing them; honouring the rights for 12 months even if disagreements arise). The exit clause is the safety valve; routine disagreements work via RFC + dialogue.
- **MEMORY.md continuity per co-maintainer:** the relationship continues beyond the 12-month commitment. Even if they exit, the MEMORY.md tracks them as alumni; future FR-AUDIT-001 + FR-CONTENT-003 + conference invitations may re-engage them.

---

*End of FR-GOV-002.*
