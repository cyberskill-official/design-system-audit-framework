# Cross-posts — 6 platforms

**Use for:** EXECUTION_PLAN.md task O5.
**Sequence:** post in this exact order, with the offsets shown, after the Show HN submission. Never post any of these BEFORE the HN submission goes live — the HN URL is the anchor.
**Concrete preferred slot:** if Show HN posts Tuesday, 2026-05-19 at 08:30 PDT / 22:30 ICT, cross-post from Tuesday 12:30-20:30 PDT / Wednesday 02:30-10:30 ICT. The exact per-platform clock table is in [`../launch/cross-posts.md`](../launch/cross-posts.md).

| # | Platform | Offset from Show HN | Post when HN is at |
|---:|---|---:|---|
| 1 | r/web_design | T+4h | ≥ 20 points |
| 2 | r/UXDesign | T+6h | ≥ 30 points OR T+6h regardless |
| 3 | r/programming | T+8h | ≥ 50 points (skip if < 30) |
| 4 | Lobste.rs | T+10h | (independent — invite-only standing required) |
| 5 | daily.dev | T+12h | (independent) |
| 6 | Designer News | T+12h | (independent) |

Each body below is a complete copy-paste. Reply to substantive comments within 2 hours on Reddit, 4 hours on Lobste.rs.

---

## 1. r/web_design (T+4h)

**Title:** `DSAF-25: a one-page maturity scorecard for design systems`

**Flair:** Resource (if available)

**Body:**

```
I built DSAF (Design System Audit Framework) as an open rubric for scoring design-system maturity. The five-minute version is the DSAF-25 Core card: https://audit.cyberskill.world/card.

DSAF-25 is the share-handle — 15 rows on system quality, 10 rows on the UX the system produces. Each row scores 0–5 with anchored definitions. Sum / 125 × 100 gives you a percentage that maps to L0–L5.

The full 125 criteria sit behind it for when you need a signed audit: https://github.com/cyberskill-official/design-system-audit-framework

What I would actually value critique on, from this sub:

- Whether the 25 rows cover the daily-practice signals a working DS lead actually cares about, or whether I picked the wrong subset.
- Whether the L3 publication cap on self-audits is defensible (the worked example caps at L3 even though the interior is higher).
- Whether the WCAG 2.2 AA criterion (B5.2) maps to how teams actually self-claim accessibility, or whether the 75% floor is unrealistic.

MIT licensed. No SaaS. No email-capture form. The repo is the surface.

HN discussion: https://news.ycombinator.com/item?id=<HN_ID_HERE>
```

> Before posting: replace `<HN_ID_HERE>` with the actual HN item ID.

---

## 2. r/UXDesign (T+6h)

**Title:** `A design-system maturity rubric that scores the UX, not just the system`

**Body:**

```
Most design-system maturity reads only look at the system itself — tokens, components, governance. DSAF splits that into Part A and adds a Part B that scores the UX the system actually produces: research method diversity, IA / mental-model match, interaction patterns, content design, WCAG conformance, voice/tone, heuristics, Core Web Vitals as UX, dark-pattern avoidance, HEART metrics.

One-page Core: https://audit.cyberskill.world/card
Full 125 criteria: https://github.com/cyberskill-official/design-system-audit-framework

What I would value critique on from UX folks specifically:

- Whether scoring "research method diversity" (B1.1) on a 0–5 scale is meaningful, or whether it conflates volume with quality.
- The dark-pattern criterion (B9.1) is currently "no-dark-pattern guarantee" — should it be more granular (e.g. distinguish accidental vs adversarial patterns)?
- The HEART metrics row (B10.1) — useful as a Part B closer, or theatre because most teams can't actually measure happiness/engagement at component granularity?

HN discussion: https://news.ycombinator.com/item?id=<HN_ID_HERE>
```

---

## 3. r/programming (T+8h, only if HN ≥ 50)

**Title:** `DSAF: markdown-native design-system audits with check scripts and LLM prompts`

**Body:**

```
DSAF is a zero-dependency, markdown-first method for auditing design systems. It ships:

- A 125-criterion rubric (with a 25-row Core: https://audit.cyberskill.world/card)
- Stable section ordering and machine-readable YAML frontmatter so an LLM agent can read, score, and update an audit report
- A no-silent-regression rule (FIXED criteria can regress, but only with an explicit override comment naming the cause)
- check-* scripts for coverage, APCA contrast, bundle size, doc freshness, link rot — all zero-dependency Node ESM
- SCAN and FIX modes with `@Agent` and `@Human` action routing

Repo: https://github.com/cyberskill-official/design-system-audit-framework
HN: https://news.ycombinator.com/item?id=<HN_ID_HERE>

The interesting bits for this sub:

- The agent doesn't run blind. Every score requires a citation. > 25% Lo-confidence triggers a refusal.
- The audit refuses to transition from RE_AUDIT to SIGNED while any regression is unresolved.
- The criterion rubric anchors (0=Absent, 1=Mentioned, 2=Defined, 3=Built, 4=Measured, 5=Industry-leading) are the same across all 125 — no per-criterion bespoke scales.

MIT licensed. Critique on the agent/human split or the no-silent-regression mechanic is what I'm here for.
```

---

## 4. Lobste.rs (T+10h)

**Title:** `DSAF: an open rubric for design-system audits, with no-silent-regression`

**Tags:** `practices, web` (if available)

**URL field:** `https://github.com/cyberskill-official/design-system-audit-framework`

**Comment to post immediately after submission:**

```
Author here. Three notes for this audience:

- Zero-dependency Node ESM scripts (`scripts/check-*.mjs`). No build step. The framework IS the markdown files.

- The no-silent-regression rule is a softening of the original hard rollback invariant — turns out hard rules teams silently turn off don't work. Now: regressions are allowed if they're named, attributed, and approved. The audit refuses to sign while any regression is unresolved.

- Five-minute version at https://audit.cyberskill.world/card. Full 125 if you want the signed-audit form.

HN context: https://news.ycombinator.com/item?id=<HN_ID_HERE>
```

---

## 5. daily.dev (T+12h)

**Title:** `Open-source design-system audits with DSAF`

**Body / first comment:**

```
DSAF is an MIT-licensed criteria-based audit framework for design systems. Score 125 rows across system quality and produced UX; report a percentage that maps to L0–L5.

Core (one page, five-minute read): https://audit.cyberskill.world/card
Repo: https://github.com/cyberskill-official/design-system-audit-framework
HN discussion: https://news.ycombinator.com/item?id=<HN_ID_HERE>

Things I'd love feedback on:

- The 25-row Core selection
- The A1 (tokens) and A8 (accessibility) criteria where most teams actually fail enterprise floors
- Whether the agent/human routing pattern (with `@Agent[fix]` and `@Human[approve]` tags) is overengineered or underengineered
```

---

## 6. Designer News (T+12h)

**Title:** `DSAF-25: one-page maturity scorecard for design systems`

**Body:**

```
A printable one-page scorecard for design-system maturity, with a 125-criterion rubric behind it for signed audits.

Card: https://audit.cyberskill.world/card
Repo: https://github.com/cyberskill-official/design-system-audit-framework
HN: https://news.ycombinator.com/item?id=<HN_ID_HERE>

Built to be arguable. The dedup methodology and the self-audit cap rule are deliberately in the open.
```

---

## Rules

- **No vote manipulation language.** "If you like it, upvote it" gets you removed from every sub here. The work has to land on its own.
- **No reposting** after a moderator removes a submission. If r/web_design removes it, do NOT post it again from a different account.
- **No paid CTA** anywhere in any of these bodies. The funnel doesn't exist on the framework surface.
- **Canonical URLs only.** `https://audit.cyberskill.world/card`, the GitHub repo, and the HN URL. No `?utm=` tracking params on any link in any body.
- **Mention Show HN ONLY in bodies after the HN URL exists.** If HN goes live at T+0, every cross-post body in this file references `<HN_ID_HERE>` — populate it before posting.

## Tracking

After each post, populate the cross-post section in `docs/launch/post-hn-feedback.md` with:

| Field | Value |
|---|---|
| Platform | r/web_design / r/UXDesign / r/programming / Lobste.rs / daily.dev / Designer News |
| Submission URL | |
| Timestamp (UTC) | |
| Points / upvotes at T+24h | |
| Comments at T+24h | |
| Substantive critique (link best 1–2) | |

*End of cross-posts content.*
