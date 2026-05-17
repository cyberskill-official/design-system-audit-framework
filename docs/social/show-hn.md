# Show HN — DSAF launch post

**Use for:** EXECUTION_PLAN.md task O4.
**When to post:** Tuesday or Wednesday, 08:00–10:00 Pacific Time.
**Account requirement:** the submitter account should have prior comment karma (don't post from a fresh account on launch day).

---

## Title (use option 1 unless told otherwise)

**Option 1 (default):**
```
Show HN: DSAF – an open-source rubric for design-system audits
```

**Option 2 (if option 1 feels too dry on the day):**
```
Show HN: DSAF-25, a one-page score for your design system
```

**Option 3 (only if you want to lead with the unusual choice):**
```
Show HN: A 125-criterion audit framework for design systems, with no-silent-regression
```

## URL field

```
https://audit.cyberskill.world/
```

## Body (paste into the "text" field — HN allows submission text on Show HN posts)

```
DSAF is an open rubric for auditing the maturity of a design system. It scores 125 criteria across two halves: Part A is the system itself (tokens, components, governance, accessibility, performance, AI-readiness); Part B is the UX the system produces (research, IA, interaction, content, heuristics, Core Web Vitals, trust, measurement).

There's a 25-row Core that fits on one page if you want the share-handle without the full rubric: https://audit.cyberskill.world/card

Three things I would value critique on, in order:

1. Category boundaries. Accessibility, content, metrics, and tokens overlap if the rubric is lazy. The dedup methodology is at docs/criteria-dedup-methodology.md — I'd rather have you find the overlap I missed than pretend it isn't there.

2. The self-audit publication cap. Self-audits cite L3 maximum publicly until third-party verification. The CyberSkill worked example caps at L3 even though the interior score is higher. I'm trying to head off the "consultancy self-grades itself L5" credibility failure before it lands.

3. The no-silent-regression rule (replacing the old hard no-downgrade rule). A FIX cycle can regress a criterion only if the audit names the cause and a human approves it. The audit refuses to sign while any regression is unresolved.

What it's not: a SaaS product, a leaderboard, a competitive-positioning artefact. MIT licensed. No email-capture form. Paid audits exist as a separate CyberSkill service surface, not on this repo.

Origin story I owe you: I'm a Vietnam-based consultancy founder. I built this after enough informal "is the design system any good?" conversations that I wanted a shared rubric instead of taste. The framework is the open methodology; the consultancy is a separate commercial surface.

Happy to take roasts on the boundaries, the cap rule, the dedup, the math, the WCAG mapping, or the agent/human routing. Pointed critique is the point of posting it here.
```

## Pinned first comment (post yourself within 60 seconds of submission)

```
Author here. Three quick context notes:

- The DSAF-25 Core card is the share-handle: https://audit.cyberskill.world/card. Read that before the full 125 if you want the five-minute version.

- The framework refuses to compare two design systems against each other. There's no leaderboard. Two systems at the same combined score can have completely different shapes.

- Yes, I work for a consultancy that takes paid audit engagements. The OSS rubric is licensed MIT precisely so it doesn't depend on us. If it's wrong, please fork it, and please tell me why.

Reply within 30 minutes for the first four hours. After that, every 60–90 minutes through hour 12.
```

## Response patterns (have these ready in a scratch pad)

| Situation | Reply pattern |
|---|---|
| "125 criteria is too many" | "Agreed — that's why DSAF-25 Core exists. Did you read the one-pager at /card before the full 125? It's the entry point. The 125 is for signed audits, not first-pass reads." |
| "Self-audit cap is consultancy theatre" | "The cap is the opposite of theatre — it's how we avoid grading ourselves L5. The repo includes a worked self-audit that publicly cites L3 even though the interior is higher. The whole point is to make the cap binding." |
| "How does this differ from Sparkbox / EightShapes / Knapsack maturity reads?" | "Criteria-graded, not interview-graded. We can disagree on a specific row and resolve it; you can rerun the audit a quarter later and see deltas. Also FIXED vs DYNAMIC: WCAG version moves, the rubric updates; the system can re-score without changing." |
| "Vietnam consultancy = discount the credibility" | "Fair to call out. The framework is MIT and the criteria are public — judge the rubric, not the geography. I'd genuinely value where the criteria are wrong, not where the postal code is." |
| "Is this AI slop" | "No. The agent runs check scripts and re-scores criteria with citations; the human reviews and signs. Every score has a cite or it's marked Lo confidence and flagged. The audit refuses to sign if > 25% of criteria are Lo." |
| "No-silent-regression rule sounds heavy-handed" | "It's the soft version. We dropped the hard no-downgrade rule for exactly that reason. Regressions ARE allowed — they just need a named cause and a human approver. The audit log captures the trade-off rather than hiding it." |

## Kill-switch conditions (per `docs/launch/show-hn.md`)

Pause all cross-posts if any of these fire:

- HN flags or removes the submission
- A factual error in the repo is confirmed
- A reviewer quote in the README is shown to lack consent
- The site link is broken
- The launch copy accidentally violates the self-audit cap

If kill-switch fires, post a short comment on HN acknowledging the issue and stating the timeline to fix. Don't delete the submission.

## Tracking

After posting, capture:

| Field | Value |
|---|---|
| Submission URL | (paste live HN URL into `docs/launch/post-hn-feedback.md`) |
| Submission timestamp (UTC) | |
| Points at T+1h | |
| Points at T+6h | |
| Points at T+24h | |
| Comments at T+24h | |
| Page-front-page time (if any) | |
| Substantive critique threads | (link 3 best in feedback log) |

*End of Show HN content.*
