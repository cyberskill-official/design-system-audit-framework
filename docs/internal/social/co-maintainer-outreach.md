# Co-maintainer outreach script

**Use for:** EXECUTION_PLAN.md task O8. **Timing:** P2 phase or later (Months 3–6 from launch). **Sequential** — contact one candidate at a time, wait for a decision before moving to the next. **Shortlist (from `internal/governance/co-maintainer-shortlist.md`):** Nathan Curtis (rank 1) → Sil Bormüller (rank 2) → Sarah Federman (rank 3).

The co-maintainer role is OSS-volunteer-equivalent per `internal/governance/co-maintainer-charter.md`. **Do not** promise salary, equity, board seat, fiduciary status, or any employment relationship. The role is governance + maintenance + co-authored content.

---

## 1. Nathan Curtis (rank 1) — primary candidate

**Send only when:** he has already replied to either the personal-outreach (T-7d) or reviewer-outreach (T-14d) email, and the reply was positive or substantive. **Do not** send this as a cold first contact.

**Subject:** `DSAF co-maintainer — would you consider it?`

**Body:**

```
Hi Nathan,

Following our exchange about <reference the prior thread or comment topic>. I want to propose something specific.

DSAF needs a second named maintainer. Single-founder rubrics drift; rubrics with two governance voices stay closer to what working DS teams actually argue about. I'd like to invite you to consider the co-maintainer role.

The full charter is at https://github.com/cyberskill-official/design-system-audit-framework/blob/main/internal/governance/co-maintainer-charter.md — please read that first. The summary:

- The role is OSS-volunteer-equivalent. No salary, no equity, no board seat, no employer/employee relationship.
- Rights include GitHub Maintain access, an RFC vote, audit.cyberskill.world blog authorship, and a revenue share on any conference honoraria from DSAF talks.
- Responsibilities are: RFC review within 14 days when assigned, external-PR review in your area of expertise, occasional weekly-deep-dive authorship, and disclosure of conflicts.
- Commitment is 12 months expected. Either side may exit with 30 days' notice.
- Conflict-of-interest disclosure is required for own DSAF-related consulting work.

Why I'm asking you specifically:
Governance is the category I'm least confident about. The framework's A.4 criteria need someone whose public work shows they've thought about RFC processes, semver discipline, deprecation policy, and contribution models at scale. EightShapes' writing has been one of the primary references during authoring.

What I'm NOT asking for:
- Co-branding (your name doesn't become part of "DSAF by ...")
- Code contributions — the bulk of maintenance is editorial review, not coding
- Time commitment beyond ~2 hours/month on average
- Public attribution before you've co-signed the announcement post

If this is interesting:
- Read the charter
- Reply with questions or "interested, let's talk"
- We do a 30-min call to walk through what month one would actually look like
- If still aligned, you sign the charter and we co-sign the announcement at https://audit.cyberskill.world/blog/co-maintainer-announcement (template draft in the repo)

If it's not for you:
A one-line "not for me" is the right reply. No follow-up unless you want there to be one. We move to the next candidate without bad feelings.

Stephen
```

---

## 2. Sil Bormüller (rank 2) — backup candidate, contact ONLY if Nathan declines

**Subject:** `DSAF co-maintainer — would you consider it?`

**Body:**

```
Hi Sil,

Following our exchange about <prior thread>. DSAF is now at a point where I want a second named maintainer, and you're the candidate I'd most like to ask after Nathan Curtis (who has <declined / passed for now>).

Full charter: https://github.com/cyberskill-official/design-system-audit-framework/blob/main/internal/governance/co-maintainer-charter.md

The role in one paragraph: OSS-volunteer-equivalent. RFC vote, GitHub Maintain access, audit.cyberskill.world blog authorship, conference-honoraria revenue share. No salary, no equity, no employment relationship. 12-month expected commitment, 30-day exit clause, ~2 hours/month on average.

Why I'm asking you:
Into Design Systems is the community DSAF most wants to be useful to. A maintainer with one foot in that community would catch the criteria that drift away from what working DS leads actually argue about. Your community standing would also signal that the framework is a community artefact, not a CyberSkill product.

The ask is governance-flavoured (RFC review, criterion-deviation triage, weekly-deep-dive co-authorship), not coding. ~2 hours/month average; spikier during RFC cycles.

If interesting: read the charter, reply with questions or "interested, let's talk."
If not for you: one-line reply, no obligation.

Stephen
```

---

## 3. Sarah Federman (rank 3) — second backup, contact ONLY if Nathan AND Sil decline

**Subject:** `DSAF co-maintainer — would you consider it?`

**Body:**

```
Hi Sarah,

Following our exchange about <prior thread, likely accessibility-criteria read>. DSAF is at the point of needing a second named maintainer. You're a candidate I would specifically value because the framework's accessibility criteria (A.8 + B.5) and inclusive-design rows are the area I'm least confident the rubric is calibrated correctly.

Full charter: https://github.com/cyberskill-official/design-system-audit-framework/blob/main/internal/governance/co-maintainer-charter.md

The role: OSS-volunteer-equivalent. No salary, no equity, no employment. RFC vote, Maintain access, blog authorship, conference-honoraria revenue share. ~2 hours/month average, 12-month expected, 30-day exit clause.

Why I'm asking you:
Inclusive design and accessibility expertise is the single highest-leverage credibility addition the framework's governance can have. A second maintainer whose public work demonstrates careful thinking about WCAG-version churn, AT-class differences, and where the framework's self-claim caps belong, would catch criterion errors I can't catch alone.

If interesting: read the charter, reply with questions.
If not for you: one-line reply.

Stephen
```

---

## After acceptance

When a candidate replies "yes, let's do this":

1. **Schedule a 30-min call.** No assistant; founder-to-co-maintainer direct.
2. **Walk through the charter together.** Confirm understanding of: no employment, conflict-of-interest disclosure, exit terms.
3. **Co-author the announcement.** Send them the draft at `landing/blog/co-maintainer-announcement.md`. Their "Co-maintainer perspective" section is theirs to write before publication.
4. **Co-sign the announcement** by email. Both names appear on the post; co-signature is a record of mutual agreement, not just maintainer attribution.
5. **Grant GitHub Maintain access** to the `dsaf-framework` org (or the org's successor).
6. **Update the README maintainer block** to list both names.
7. **Publish the announcement post** to audit.cyberskill.world/blog/co-maintainer-announcement.
8. **Cross-publish** the announcement at T+24h per the cross-publishing template.
9. **Update `internal/governance/co-maintainer-shortlist.md`** — flip the candidate's status to `accepted-co-maintainer` and remove the other candidates from the shortlist.

## Tracking

Update `internal/governance/co-maintainer-shortlist.md` per candidate:

| Status | Meaning |
|---|---|
| `not-contacted` | Outreach not yet sent |
| `contacted` | Outreach sent, awaiting reply |
| `discussion` | Reply received, in 30-min call cycle |
| `accepted-co-maintainer` | Charter signed, announcement co-signed and live |
| `declined` | Candidate has explicitly passed |
| `paused` | Candidate is interested but can't commit right now |

*End of co-maintainer outreach script.*
