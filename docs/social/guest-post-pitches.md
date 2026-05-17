# Guest-post pitches — Smashing / CSS-Tricks / A List Apart

**Use for:** EXECUTION_PLAN.md task O7.
**Timing:** send **T-6 to T-8 weeks** before Show HN. Editorial lead times for these publications are 6–8 weeks, so a pitch sent at launch-eve won't run before P1 ends. Send earlier than the rest of the launch outreach.

**Goal:** one published article in one of these three within 2 weeks of Show HN. **Not** all three. Three pitches because acceptance rates are low; expect 0–1 accepts.

---

## 1. Smashing Magazine

**To:** Smashing editor (current editor-in-chief contact via smashingmagazine.com/about — verify before sending; do not use a stale name)

**Subject:** `Pitch: Design-system audits need criteria, not taste`

**Body:**

```
Hi <editor name>,

I'd like to pitch a practical piece on auditing design-system maturity. Working title: "Design-system audits need criteria, not taste."

Thesis:
The standard "is our design system any good" review is a taste argument. A senior person reads the docs, spots a few gaps, writes a deck. That can be useful — but it's hard to rerun, and it's hard to tell whether the plan improved the system or reflected the auditor's preferences.

The piece would walk readers through a criteria-graded alternative: split the audit into Part A (system quality — tokens, components, governance, accessibility, performance, AI-readiness) and Part B (the UX the system produces — research, IA, interaction, content, WCAG conformance, Core Web Vitals as UX, dark patterns, HEART metrics). Score each criterion 0–5 with anchored definitions. Report a combined percentage that maps to L0–L5 maturity tiers.

The working example is DSAF (Design System Audit Framework) — an MIT-licensed rubric I built. It's live at https://audit.cyberskill.world/. The article would use DSAF as the worked example without turning into product marketing — the rubric is open, the URL doesn't gate anything, and the article's value to your readers is the *method*, not the *brand*.

Concrete outline:

1. The taste problem (3–4 paragraphs)
2. What a criterion looks like (one detailed walkthrough of A1.1 Color tokens, including FIXED vs DYNAMIC anchoring)
3. The Part A / Part B split and why scoring the UX separately matters
4. The no-silent-regression rule — why hard "no downgrade" rules teams silently disable don't work, and what replaces them
5. The self-audit publication cap — why an honest framework caps publicly cited tiers until third-party verification
6. A reader exercise: score your own DS on the 25-row Core in 5 minutes (https://audit.cyberskill.world/card)
7. Limits — what the criteria can't measure

Proposed length: 1,800–2,400 words.
No paid CTA. No email-capture form. No CyberSkill services pitch (CyberSkill maintains the framework but the framework is vendor-neutral).
I can submit a full draft within 10 days of editorial green-light.

Quick bio: Stephen Cheng, founder of CyberSkill (software consultancy, Ho Chi Minh City). Built DSAF after enough informal "is the DS any good" conversations to want a shared rubric.

Stephen
```

---

## 2. CSS-Tricks (now under DigitalOcean)

**To:** CSS-Tricks editor (verify current editor — Geoff Graham was last editor when the publication was active; check the masthead at css-tricks.com)

**Subject:** `Pitch: Practical check scripts for design-system audits`

**Body:**

```
Hi <editor name>,

I'd like to pitch a frontend-practical piece on auditing design-system quality using zero-dependency Node scripts.

Working title: "Check scripts that catch design-system regressions before they ship"

Thesis:
Most design-system reviews are slide decks. They don't catch the regressions that actually break consumers — bundle-size creep, contrast failures introduced by token edits, documentation that goes stale faster than the components do, broken cross-doc links.

The piece would walk readers through six concrete zero-dependency Node scripts (no build tooling, no SaaS, no API keys) that catch these regressions in CI:

1. check-coverage — does every shipped component have a documentation page, a Storybook entry, and a token assignment?
2. check-apca — APCA-based contrast verification on token combinations (not WCAG ratio — that's a separate, deliberately stricter check)
3. check-bundle-size — per-component bundle delta with floor budgets
4. check-doc-freshness — flag docs whose last edit predates the component's last edit by N days
5. check-links — internal + external link rot
6. check-tokens — DTCG schema conformance + format drift

Each script is part of DSAF, the open-source audit framework I maintain: https://audit.cyberskill.world/. The article would use them as the worked example — the scripts are MIT licensed, copyable, and run on any DS repo.

This is the publication's traditional sweet spot — practical frontend tooling, concrete CSS/JS, no marketing.

Proposed length: 2,000–2,800 words with code blocks.
I can submit a full draft within 10 days of editorial green-light.

Stephen Cheng
CyberSkill, Ho Chi Minh City
```

---

## 3. A List Apart

**To:** A List Apart editor (verify the current editor at alistapart.com; the publication has rotated editors)

**Subject:** `Pitch: The honest design-system maturity model`

**Body:**

```
Hi <editor name>,

I'd like to pitch a methodology piece for A List Apart.

Working title: "The honest design-system maturity model"

Thesis:
"Maturity model" is a vocabulary the design-systems field has borrowed from CMM and ITIL without honestly applying the rigour those models demand. A typical maturity-model post lists five vague tiers and lets every team self-identify into Tier 4 ("Managed, advanced") without evidence. The result is methodology that pretends to measure but mostly markets.

The piece would propose what an honest maturity model looks like for design systems:

1. Criterion-graded — every tier is defined by anchored 0–5 scores on specific criteria, not by interview impressions
2. FIXED vs DYNAMIC — criteria anchored against the world (does the token file exist?) vs criteria anchored against an evolving standard (WCAG version, DTCG schema)
3. Publication-capped — self-audits cap publicly at L3 until third-party verification, regardless of interior score. The honest model refuses to let any single team grade itself "industry-leading"
4. No-silent-regression — regressions ARE allowed, but only when they're named, attributed, and signed. The audit refuses to sign while any regression is unresolved
5. Calibration-required — every audit invites a human Co-Auditor to spot-check 5+ criteria independently, with ≥ 2-point differences triggering a discussion before sign-off

DSAF is the open-source implementation of this (https://audit.cyberskill.world/) but the piece is a methodology argument, not a product walkthrough. Readers come away with the *test* they can apply to any maturity model: would it let me grade myself L5 without evidence?

Proposed length: 2,400–3,400 words.
ALA's editorial standard is high; happy to do multiple revision rounds.

Stephen Cheng
CyberSkill, Ho Chi Minh City
```

---

## Follow-up protocol

- **One follow-up after 7 business days only if no reply.** Use the original thread, "Re:" prefix only. **No second follow-up.**
- **If accepted at one publication:** withdraw the other two pitches immediately. Do not publish substantially-similar content across publications.
- **If rejected at all three:** the rejection notes (if any) are useful editorial signal. Update `docs/launch/guest-post-pitches.md` with the rejection reasons + decision on whether to re-pitch elsewhere (Pattern Pulse, dev.to long-form, Increment, etc.).

## Tracking

| Publication | Pitched (date) | Reply (date) | Outcome | Article URL |
|---|---|---|---|---|
| Smashing Magazine | | | | |
| CSS-Tricks | | | | |
| A List Apart | | | | |

Outcomes: `accepted-with-changes`, `accepted-as-pitched`, `rejected-with-feedback`, `rejected-no-feedback`, `no-reply`.

*End of guest-post pitches.*
