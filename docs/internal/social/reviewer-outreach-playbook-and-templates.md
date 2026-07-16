# Reviewer Outreach Playbook and Templates

This document is a consolidation of the DSAF Reviewer Outreach Playbook (originally `internal/branding/reviewer-outreach.md`) and the Reviewer Outreach Email Templates (originally `internal/social/reviewer-outreach-playbook-and-templates.md`).

---

## 1. Reviewer Outreach Playbook

**Status:** launch-ready.  
**task:** TASK-GOV-001.

### Ask

The ask is review, not endorsement:

> We built DSAF, an open criteria set for design-system audits. I would value your roast before we launch publicly. The useful surface is the 25-row Core plus the README, not the full 125-row rubric unless you want to go deeper.

Do not ask for upvotes, reposts, public praise, or paid endorsement.

### Materials

- DSAF-25 Core card (https://audit.cyberskill.world/card)
- README draft (https://github.com/cyberskill-official/design-system-audit-framework)
- Launch blog draft (https://audit.cyberskill.world/blog/launch-2026)
- Self-audit publication policy (https://github.com/cyberskill-official/design-system-audit-framework/blob/main/internal/branding/self-audit-policy.md)

### Timing

Send outreach one to two weeks before Show HN.  
Follow up once after five business days if there is no reply.  
No second follow-up.

### Decline outcomes

| Response | Outcome |
|---|---|
| no time / no fit | no public mention |
| feedback but no quote | incorporate feedback without attribution |
| quote but private | do not publish publicly |
| quote approved | move shortlist status to `quote-approved` |

---

## 2. Reviewer Outreach Email Templates (Top 3 Shortlist)

**Use for:** EXECUTION_PLAN.md task O1 (depends on personal outreach having gone first; T-14d before Show HN).  
**Difference vs personal-outreach.md:** that file is the T-7d heads-up to 10 people. **This file is the explicit consent-gated ask for an on-record quote** from the top 3 shortlist names (Nathan Curtis, Sil Bormüller, Brad Frost).

Quotes are usable only after the consent letter is co-signed.

### 1. Nathan Curtis (rank 1)

**Subject:** `DSAF — would value your read before launch (and possibly a quote)`

**Body:**

```
Hi Nathan,

(Following up on my heads-up from <date>.) DSAF goes to Show HN on <Tuesday or Wednesday, date>. Before then, I'd value:

(a) Your read on the governance category (A.4) and the no-silent-regression rule. If they're wrong, I'd rather find out from you than from HN.

(b) If you find any of it useful: a one-paragraph quote for the README under the "External review" block. The framework's launch credibility benefits from named DS-community voices saying "I read it; here's what I think." The quote can be any honest reaction — critical, supportive, mixed. Public attribution is your call.

If the read is interesting but a quote isn't right, that's a complete answer. If the quote works, the consent flow is:

- I send you the exact quote text and proposed attribution string
- You approve in writing (email reply is enough)
- I land the quote in README byte-identical to your approval
- The quote can be retracted on 7 days' written notice

Materials:

- 25-row Core: https://audit.cyberskill.world/card
- README draft: https://github.com/cyberskill-official/design-system-audit-framework
- Launch blog post: https://audit.cyberskill.world/blog/launch-2026
- Self-audit publication policy: https://github.com/cyberskill-official/design-system-audit-framework/blob/main/internal/branding/self-audit-policy.md

If the timing is tight or this isn't a fit, a one-line reply is the right answer.

Stephen
```

---

### 2. Sil Bormüller (rank 2)

**Subject:** `DSAF — would value your read before launch (and possibly a quote)`

**Body:**

```
Hi Sil,

(Following up on my heads-up from <date>.) DSAF launches on Show HN <Tuesday or Wednesday, date>. Two asks if you have the time:

(a) A pre-launch read on whether the rubric is useful enough for the Into Design Systems audience to engage with. If your read is "this is too academic for working DS leads," that's the critique I need to hear before HN, not after.

(b) If any of it lands: a one-paragraph quote for the README. The Into Design Systems community is where the framework most wants to be useful — a quote from you signals that to the right audience.

Consent flow if the quote works:

- I send you exact quote text + attribution
- Email reply with "approved" is the consent record
- Quote ships in README byte-identical to your approval
- Retraction on 7 days' written notice

Materials:

- 25-row Core: https://audit.cyberskill.world/card
- Repo: https://github.com/cyberskill-official/design-system-audit-framework
- Launch blog post: https://audit.cyberskill.world/blog/launch-2026

Aware this is a busy time of year for the community. "Not now" is a complete answer.

Stephen
```

---

### 3. Brad Frost (rank 3)

**Subject:** `DSAF — would value your read before launch (and possibly a quote)`

**Body:**

```
Hi Brad,

(Following up on my heads-up from <date>.) DSAF goes to Show HN <Tuesday or Wednesday, date>.

The ask:

(a) A pre-launch read on whether the rubric reads as serious-design-systems methodology or whether it reads as consultancy-marketing-dressed-as-methodology. I think it's the former; I want a fresh eye to confirm.

(b) If the framework reads as serious: a one-paragraph quote for the README. The single strongest credibility signal at launch would be a named DS voice saying "this is methodology, not marketing." If you can't honestly say that, the read alone is still genuinely useful.

Consent flow if the quote works:

- I send you exact quote text + attribution
- Email reply with "approved" is the consent record
- README ships the quote byte-identical to your approval
- Retraction on 7 days' written notice

Materials:

- 25-row Core: https://audit.cyberskill.world/card
- Repo: https://github.com/cyberskill-official/design-system-audit-framework
- Launch blog post: https://audit.cyberskill.world/blog/launch-2026
- Self-audit publication policy (the part I most expect critique on): https://github.com/cyberskill-official/design-system-audit-framework/blob/main/internal/branding/self-audit-policy.md

No ask to amplify. If it's not for you, "not for me" is the right reply.

Stephen
```

---

## 3. Consent Letter Template

Send this to anyone who replies "interested in giving a quote".  
Reply with this exact text (filling in `<Reviewer name>`, `<affiliation>`, `<quote text>`):

```
Subject: DSAF reviewer consent — please confirm the text below

Hi <Reviewer name>,

Thanks for the read. The quote you've offered, copy-pasted here for confirmation:

  "<quote text>"
  — <Reviewer name>, <affiliation>

Please confirm by replying "approved" if:

- This text is byte-identical to what you intend to be published
- The attribution string above is correct
- Approved surfaces: README, audit.cyberskill.world launch page, Show HN launch comment
- The duration is 12 months minimum
- Retraction: remove within 7 days of written request

If anything in the text or attribution needs to change, reply with the corrected text and we'll re-confirm.

Stephen
```

When the reply lands, paste the exact text + the reply timestamp + the reviewer email into `internal/governance/reviewer-consent-log.md` per TASK-GOV-001 §1.

### Send protocol

- **Sequential, one at a time.** Wait for a response (or a 5-business-day silence) before contacting the next.
- **No follow-ups beyond the one in personal-outreach.md.** This file's emails ARE the follow-up.
- **No bcc.** Each thread is private.

### Tracking

Update `internal/governance/reviewer-shortlist.md` Status column per reviewer: `not-contacted` → `contacted` → `replied-positive` / `feedback-no-quote` / `quote-approved` / `quote-published` / `declined` / `no-response`.

*End of reviewer outreach playbook & drafts.*
