---
id: FR-BENCH-001
title: "Free public benchmark (lite) — static survey form, voluntary anonymous opt-in, GDPR-compliant — the highest-converting OSS→paid bridge"
module: BENCH
priority: SHOULD
status: accepted
verify: I
phase: P2
milestone: P2 · slice 1 · Community velocity
slice: 1
owner: Stephen Cheng (Founder)
created: 2026-05-17
shipped: null
related_frs: [FR-BRAND-001, FR-CORE-001, FR-CORE-004, FR-BRAND-004, FR-CONTENT-001, FR-BENCH-002, FR-REPORT-001]
depends_on: [FR-BRAND-001, FR-CORE-001]
blocks: [FR-BENCH-002, FR-REPORT-001]
source_pages:
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Phase 2 — Community velocity action 6 — 'Launch a free public benchmark: Compare your DSAF score to anonymized peers — a tiny static survey form. This is the single highest-converting OSS→paid bridge')"
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§What NOT to do item 1 — repo + dsaf.dev sacred; lead capture stays off-repo)"
source_decisions:
  - "DEC-070: lite benchmark = static survey form on dsaf.dev/benchmark; no hosted backend; the data is collected via Tally/Typeform-equivalent embeddable form"
  - "DEC-071: voluntary opt-in; GDPR-compliant (no PII collected unless respondent self-discloses in a free-text field; no IP logging beyond what the form vendor does)"
  - "DEC-072: respondents see anonymized peer comparison after submission (mean/median/p25/p75 of all responses per category); generates real value to incentivise submission"
  - "DEC-073: hosted full benchmark at benchmark.dsaf.dev is FR-BENCH-002 (P4); this FR ships the lite version at dsaf.dev/benchmark with static results page"
language: html + markdown
service: doctrine + lightweight frontend
new_files:
  - dsaf.dev/benchmark/index.html       # the survey form page
  - dsaf.dev/benchmark/results.html     # the peer-comparison results page
  - dsaf.dev/benchmark/privacy.md       # GDPR-compliant privacy policy
  - docs/bench/lite-benchmark-spec.md   # spec doc: questions, data model, anonymisation contract
modified_files:
  - dsaf.dev/index.html                 # add "Benchmark your system" link
  - README.md                           # cross-link to benchmark (per FR-DOCS-001 sacredness, link only; no CTA framing)
allowed_tools:
  - "file_read/write dsaf.dev/**, docs/bench/**, README.md"
  - "Tally / Typeform / Google Forms account for embedded form (the form vendor)"
  - "Cloudflare Pages for static hosting"
disallowed_tools:
  - "collect PII (name, email, company) as required fields — voluntary self-disclosure in free-text only"
  - "use a form vendor that doesn't honour GDPR (Tally + Typeform both do; Google Forms is borderline depending on EU data routing)"
  - "host the form on audit.cyberskill.world (decoupling rule per FR-BRAND-004)"
  - "include paid-funnel CTAs on the survey form OR results page (the benchmark is canonical OSS content per FR-BRAND-001 §1 #11 sacredness rule)"
  - "promise individual benchmark reports — the lite version returns generic anonymized stats; per-respondent personalized reports are FR-BENCH-002 P4 scope"
  - "skip the GDPR-compliant privacy policy — even voluntary anonymous data collection requires explicit privacy disclosure"
effort_hours: 8
sub_tasks:
  - "1. (1h) Author docs/bench/lite-benchmark-spec.md per §3 — questions (25 — one per DSAF-25 Core criterion + 4 demographic-anonymous-bucket questions), data model, anonymisation contract"
  - "2. (1h) Set up form vendor (Tally preferred — embeddable + GDPR-compliant + free tier); configure 29 questions per spec"
  - "3. (1.5h) Author dsaf.dev/benchmark/index.html per §3 — embed form + GDPR-compliant intro + privacy-policy link + cap-rule disclosure"
  - "4. (1.5h) Author dsaf.dev/benchmark/results.html per §3 — anonymized peer comparison (mean/median/p25/p75 per category) + interpretation guidance"
  - "5. (1h) Author dsaf.dev/benchmark/privacy.md per §3 — GDPR-compliant privacy policy (data collected, retention, anonymization, contact for deletion)"
  - "6. (30m) Patch dsaf.dev/index.html with 'Benchmark your system' link"
  - "7. (15m) Patch README.md with cross-link (per FR-DOCS-001 sacredness)"
  - "8. (45m) Verify Lighthouse score ≥ 90 on benchmark pages (form embed adds JS so ≥ 85 acceptable); verify GDPR-compliant cookie behaviour"
  - "9. (15m) PR description includes form vendor + Lighthouse screenshots + first month's expected response volume (~50-200 per plan estimate)"
risk_if_skipped: "Plan §Phase 2 action 6 names this as 'the single highest-converting OSS→paid bridge' (citing Plausible, PostHog, Cal.com as model OSS-projects that use free benchmarks/tools as lead-gen funnels). Skipping this FR caps the framework's audience-data collection — without benchmark responses, FR-REPORT-001 (P6 annual State of Design System Audits report) has no anonymous data to feed; without peer-comparison data, dsaf.dev visitors who want to know 'how do we compare' have no answer. The cost is operational (8h founder-time + ~$20-50/month form-vendor cost at scale); the value is the multi-year aggregate data + the conversion path from OSS-curious visitor to engaged-with-dsaf-data visitor. Skipping also blocks FR-BENCH-002 (P4 hosted benchmark at benchmark.dsaf.dev — needs lite-benchmark response patterns to validate the hosted-tier UX) and FR-REPORT-001 (P6 annual report — needs ≥ 12 months of benchmark data)."
---

## §1 — Specification (BCP-14 normative)

The framework SHOULD ship a lite anonymous benchmark survey at `dsaf.dev/benchmark` in P2. The benchmark is a 29-question static survey (25 DSAF-25 Core criterion self-scores + 4 demographic-anonymous-bucket questions) hosted via a GDPR-compliant form vendor (Tally preferred). Respondents see anonymized peer comparison after submission. No PII collected as required fields. No hosted backend (deferred to FR-BENCH-002 P4). The lite version is the data-collection-funnel entry; the hosted version is the future Pro tier.

1. **MUST** host the benchmark at `dsaf.dev/benchmark` (NOT audit.cyberskill.world per FR-BRAND-004 decoupling). The page embeds the form via vendor's iframe / embeddable widget; the page itself is static.
2. **MUST** ask 29 questions per §3 spec: 25 DSAF-25 Core criterion self-scores (one per criterion, 0-5 rubric anchor selection) + 4 demographic-anonymous-bucket questions (company-size bucket, design-system-age bucket, role bucket, location bucket — all bucketed to prevent re-identification).
3. **MUST NOT** collect PII as required fields. The form has ONE optional free-text "anything else?" field where respondents may self-disclose if they choose; the field's placeholder text explicitly says "optional — don't include identifying info you don't want public."
4. **MUST** use a GDPR-compliant form vendor. Tally (recommended), Typeform Pro (acceptable), Formspree (acceptable) — these honour GDPR with data-processing agreements + EU data routing. Google Forms is borderline (EU data routing inconsistent; avoid). The vendor's data-processing agreement is referenced in `dsaf.dev/benchmark/privacy.md`.
5. **MUST** publish a GDPR-compliant privacy policy at `dsaf.dev/benchmark/privacy.md` per §3. The policy enumerates: data collected (the 29 question responses + IP if the vendor logs it), data retention (12 months max; respondents may request deletion at any time), anonymization contract (responses are aggregated for peer-comparison; individual responses not displayed), contact for deletion (hello@dsaf.dev), legal basis (legitimate interest in research; consent for free-text disclosures).
6. **MUST** show anonymized peer comparison on the results page after submission per §3. The comparison shows: per-criterion mean / median / p25 / p75 across all responses; the respondent's submission highlighted as "you" on each criterion's distribution. The display only updates when ≥ 30 responses exist (low-N guard).
7. **MUST NOT** show individual responses or any identifying information on the results page. Aggregate-only display; the low-N guard (≥ 30 responses) ensures no single response is identifiable via bucket-cross-reference.
8. **MUST NOT** include paid-funnel CTAs ("Talk to a certified auditor", "Contact CyberSkill") on the survey form OR results page. The benchmark is canonical OSS content per FR-BRAND-001 §1 #11 + plan §"What NOT to do" item 1.
9. **MUST** include the cap-rule disclosure per FR-CORE-004 on the survey page intro. The respondent reads: "Self-audit scores cap at L3 (Managed) for publication without third-party verification. The benchmark shows your self-score against peers; it doesn't certify your DSAF Level."
10. **MUST** apply the FR-BRAND-002 handle taxonomy on all benchmark surfaces. `DSAF` short handle; long name once at first mention; no `Framework` noun-handle.
11. **MUST** preserve the FR-BRAND-004 decoupling. Benchmark is on dsaf.dev (the framework's surface); CyberSkill audit services remain on audit.cyberskill.world (a separate site).
12. **MUST** include a "Why this matters" intro on the survey page per §3 — explains what the benchmark measures + how the data is used (aggregate-only; feeds FR-REPORT-001 P6 annual report) + the cap-rule disclosure + the privacy policy link.
13. **MUST NOT** promise individual benchmark reports (e.g., "We'll email you your personalized DSAF report"). The lite version returns generic anonymized stats; per-respondent personalized reports are FR-BENCH-002 P4 hosted-tier feature.
14. **MUST** include a Lighthouse perf score ≥ 85 on the benchmark pages. The form vendor's embed adds JavaScript; 90+ is ideal but ≥ 85 accommodates the iframe overhead. Privacy-friendly form vendors typically add < 200KB JS.
15. **MUST** support respondent's right-to-erasure per GDPR Article 17. The privacy policy lists the contact (hello@dsaf.dev) + the form vendor's deletion process. Responses are not personally identifiable but if a respondent claims a specific response, the operator removes it from the dataset.

---

## §2 — Why this design

**Why lite + static (NOT hosted backend) (§1 #1):** the plan §Phase 2 action 6 names the benchmark as "the single highest-converting OSS→paid bridge" — but the value is the *funnel*, not the hosting infrastructure. A static form on dsaf.dev with a GDPR-compliant vendor handling data collection achieves the funnel without the backend complexity. Hosted infrastructure (FR-BENCH-002 P4) comes later when the data volume + product features justify it.

**Why 29 questions (25 + 4) (§1 #2):** the 25 DSAF-25 Core criteria are the share-handle (per FR-CORE-001); asking respondents to self-score against each is what produces benchmark data that maps cleanly back to the framework. 4 demographic-anonymous-bucket questions enable peer-comparison segmentation (company-size bucket, DS-age bucket, role bucket, location bucket) without enabling re-identification.

**Why no PII collected (§1 #3):** plan §"What NOT to do" item 1 ("repo sacred; lead capture off-repo") generalises to dsaf.dev surfaces. Voluntary anonymous benchmark is canonical content; required-PII benchmark would convert the surface to lead-gen. The optional "anything else?" free-text field lets respondents self-disclose if they want; the default is anonymous.

**Why GDPR-compliant from day one (§1 #4, #5, #15):** EU respondents will engage; even unintentional non-compliance damages the framework's authority + invites regulatory attention. GDPR-compliant from day one (DPA with form vendor; privacy policy; right-to-erasure path) is the cheap structural move; remediating non-compliance later is expensive.

**Why aggregate-only display with low-N guard (§1 #6, #7):** showing individual responses or low-N aggregates enables re-identification via bucket-cross-reference. A respondent saying "I'm in the 500-1000 employee bucket + we have a 5-year-old DS + I scored 4 on A.1.1" can be identified if the dataset has 3 respondents matching those buckets. The ≥ 30 responses low-N guard prevents this for typical bucket combinations; finer cuts would need higher N.

**Why no paid-funnel CTAs (§1 #8):** the benchmark is canonical content; paid funnels live off-repo per FR-BRAND-001 + FR-BRAND-004. Including a "Talk to an auditor" CTA on the results page converts the funnel from "anonymous community engagement" to "anonymous lead capture" — exactly the OSS-trust failure the plan warns against.

**Why cap-rule disclosure on the survey page (§1 #9, #12):** without the disclosure, respondents may interpret their score as a "DSAF Level certification." The cap rule (per FR-CORE-004) is that self-audits cap at L3 without third-party verification; the benchmark is self-score-based + therefore subject to the cap. The intro disclosure prevents misuse.

**Why generic anonymized stats only, not individual reports (§1 #13):** individual reports require user authentication + persistent state, which require a backend (FR-BENCH-002 P4). The lite version's value is *peer comparison*, not *personalized reporting*. Promising the latter without delivering damages trust.

**Why Lighthouse ≥ 85 not ≥ 95 (§1 #14):** the form vendor's iframe / embed widget adds ~100-200KB of JS. With the JS, hitting Lighthouse 95+ is hard; 85+ is achievable. The tradeoff is acceptable: the form embed is the value; perfect Lighthouse is the cost.

**Why the right-to-erasure path is auditable but rarely used (§1 #15):** GDPR Article 17 requires it. In practice, with anonymous voluntary data, the deletion request rate is < 1%; the path is the legal-compliance posture, not a high-volume operation. The privacy policy + contact email satisfy the requirement.

---

## §3 — Doctrine contract

### `docs/bench/lite-benchmark-spec.md` — the canonical spec

```markdown
---
title: "DSAF lite benchmark specification"
ratified_by: FR-BENCH-001 (2026-05-17)
status: normative
form_vendor: Tally (https://tally.so)
hosting: dsaf.dev/benchmark (static)
---

# DSAF lite benchmark — specification

## §3.1 — Questions

### Part A: DSAF-25 Core self-scores (25 questions)

For each of the 25 DSAF-25 Core criteria (per `docs/dsaf-25.md`), the respondent selects one of 6 options:

- **0 — Absent:** No evidence the system addresses this
- **1 — Mentioned:** Mentioned but not designed for
- **2 — Defined:** Designed but not built / not enforced
- **3 — Built:** Built and shipped, but not measured / not maintained
- **4 — Measured:** Built, shipped, measured, with telemetry / CI / tests
- **5 — Industry-leading:** Built, shipped, measured, externally validated, ahead of common practice
- **Don't know / Doesn't apply:** Free option

Each question's wording is the verbatim DSAF-25 Core criterion name + brief rubric anchor description (≤ 100 chars per criterion to fit form-vendor question length limits).

Example for A.1.1 — Color tokens:

```
Q1 of 25: A.1.1 Color tokens with primitive→semantic→component layers
[ ] 0 — Hex codes hard-coded throughout
[ ] 1 — Some semantic tokens, mostly hex
[ ] 2 — Semantic layer defined but not enforced
[ ] 3 — Semantic layer enforced; references primitives
[ ] 4 — As 3, plus measured (token-coverage CI)
[ ] 5 — Three-tier architecture (primitive/semantic/component); multi-brand + mode support
[ ] Don't know / Doesn't apply
```

### Part B: Demographic anonymous buckets (4 questions)

These questions enable peer-comparison segmentation without enabling re-identification. All buckets are coarse enough that any combination has expected N ≥ 30 in a 200+ response dataset.

**Q26 — Company size:**
- 1-50 employees
- 51-500 employees
- 501-5,000 employees
- 5,001+ employees

**Q27 — Design system age:**
- < 1 year old
- 1-3 years old
- 3-5 years old
- 5+ years old

**Q28 — Your role:**
- Designer (any seniority)
- Engineer (any seniority)
- Design system lead / manager
- Other (PM, ops, leadership, etc.)

**Q29 — Your location bucket:**
- North America
- Europe
- Asia-Pacific
- Latin America / Africa / Middle East

### Part C (optional): "anything else?" free-text

```
Q30 (optional): Anything else you'd like to share? (Free text — optional, don't include identifying info you don't want public)
[textarea, 500-char limit]
```

This is the only free-text field; respondents self-disclose at their discretion. The privacy policy notes that disclosures here are voluntarily public-eligible.

## §3.2 — Data model

The form vendor (Tally) returns each submission as a JSON object:

```json
{
  "submission_id": "<vendor-generated; not derived from PII>",
  "submitted_at": "2026-MM-DDThh:mm:ssZ",
  "responses": {
    "a_1_1": 3,  /* 0-5 or null for don't-know */
    "a_1_3": 5,
    "a_1_8": 2,
    /* ... 22 more criterion responses ... */
    "company_size": "501-5,000 employees",
    "ds_age": "3-5 years old",
    "role": "Design system lead / manager",
    "location": "Europe",
    "free_text": "..."
  }
}
```

No IP, no email, no name, no company name (unless self-disclosed in `free_text`). The form vendor's logs may include IP for fraud detection; that's the vendor's data, governed by the vendor's DPA.

## §3.3 — Anonymisation contract

1. **Public-facing aggregation only:** the dsaf.dev/benchmark/results.html page displays per-criterion mean / median / p25 / p75 across all responses + the same stats segmented by each demographic bucket independently (NOT cross-segmented; e.g., NOT "European DS leads at 500-5000 companies" which would lower the bucket N too far).
2. **Low-N guard ≥ 30:** no aggregate is displayed for a segment with < 30 responses. Below 30, the segment shows "insufficient data to display."
3. **Individual responses are not displayed.** Ever.
4. **Free-text disclosures are not aggregated into public stats.** Respondents who self-disclose company names in the free-text field do not have those names surfaced in the public results.
5. **Periodic dataset export (for FR-REPORT-001 P6 annual report):** the operator may export the responses for annual-report writing; the export is internal; the public report (P6) shows aggregated insights only.

## §3.4 — Results page peer-comparison spec

The `dsaf.dev/benchmark/results.html` page renders after submission. Structure:

1. **Thank-you message + privacy reminder.**
2. **Per-criterion peer comparison (25 mini-charts):**
   - For each of the 25 DSAF-25 Core criteria:
     - Bar showing the distribution of responses (0/1/2/3/4/5)
     - The respondent's selection highlighted in their bar
     - The mean + median displayed
3. **By-segment comparison (4 segments):**
   - For each demographic bucket the respondent matches (e.g., "European" + "501-5,000 employees"):
     - Per-criterion mean for that segment (if N ≥ 30 for the segment)
4. **Overall DSAF-25 score estimate:**
   - The respondent's calculated DSAF-25 score = (Σ responses / (5 × N_non_null_responses)) × 100
   - The cap rule disclosure: "This is your self-score. Per the [self-audit publication policy](https://dsaf.dev/branding/self-audit-policy), publicly cited DSAF Levels cap at L3 without third-party verification."
5. **Links to dsaf.dev/blog/deep-dives/ for criteria where you scored low.**
6. **Footer:** "Want to discuss your results in detail? Cross-reference to dsaf.dev (no paid CTAs); your data feeds FR-REPORT-001 P6 annual report; thanks."

## §3.5 — Cap-rule disclosure on survey intro

The survey page intro reads:

```
Welcome to the DSAF lite benchmark.

This is a 29-question self-scoring survey. You'll see anonymized peer comparison after submission.

What you're scoring: 25 DSAF-25 Core criteria (the one-page subset of the 125-criterion DSAF rubric). The criteria are at https://dsaf.dev/card if you want to read them first.

A note on what this benchmark is + isn't:
- It's a self-score, not a certification.
- The DSAF Level you can cite publicly caps at L3 (Managed) without third-party verification (per our [self-audit publication policy](/branding/self-audit-policy)).
- Your data feeds the annual State of Design System Audits report (FR-REPORT-001, P6), aggregated + anonymous.

Privacy: voluntary opt-in; no required PII; GDPR-compliant; [privacy policy](privacy).

Submit when ready (≤ 5 minutes).
```

## §3.6 — GDPR-compliant privacy policy

`dsaf.dev/benchmark/privacy.md` body:

```markdown
# DSAF Lite Benchmark — Privacy Policy

**Status:** Compliant with EU GDPR (Regulation (EU) 2016/679) + adjacent privacy laws (UK GDPR, CCPA where applicable).
**Last updated:** 2026-MM-DD.
**Data controller:** CyberSkill (DSAF maintainer); hello@dsaf.dev.

## What data we collect

When you submit the lite benchmark survey:

1. **The 25 DSAF-25 Core criterion self-scores you select** (0-5 or "Don't know").
2. **The 4 demographic-anonymous-bucket answers** (company size bucket, DS age bucket, role bucket, location bucket).
3. **The optional free-text "anything else?" field**, if you write in it.

We do not collect: your name, email, company name (unless you self-disclose in the free-text field), IP address (the form vendor may log this for fraud detection; that's their data, governed by their DPA).

## Form vendor

The survey is hosted via **Tally** (tally.so), a GDPR-compliant form vendor based in Belgium. Tally's data-processing agreement is at https://tally.so/help/data-processing-agreement.

## How we use the data

1. **Aggregated peer comparison:** displayed on dsaf.dev/benchmark/results.html (per-criterion mean/median/p25/p75; segmented by demographic buckets where N ≥ 30).
2. **Annual State of Design System Audits report (FR-REPORT-001, P6):** the operator aggregates the responses into the report; the report shows insights, NOT individual data.
3. **Internal research:** the operator may use the dataset for internal research (e.g., understanding which criteria are most/least adopted).

We do not: sell the data, share with marketing partners, use it for advertising.

## Data retention

- Form responses: retained for 12 months from submission, then deleted or anonymised further.
- Aggregated peer-comparison stats: retained indefinitely as part of the framework's public artefact.
- Free-text disclosures: retained for the same 12 months as the structured responses.

## Your rights under GDPR

1. **Right to access:** email hello@dsaf.dev with "DSAF benchmark access request" + the submission_id (from your post-submission email; if you didn't save it, we cannot identify your submission).
2. **Right to erasure:** email hello@dsaf.dev with "DSAF benchmark deletion request" + the submission_id. We delete the submission within 30 days.
3. **Right to rectification:** if you want to update your submission, email + the submission_id; we update the entry.
4. **Right to data portability:** email; we provide your submission's JSON.
5. **Right to object:** email; we exclude your submission from future aggregates.
6. **Right to lodge a complaint:** with your local data-protection authority.

Note: for these rights to be actionable, you need the `submission_id` from the form vendor's confirmation email; we don't have personally-identifying info linking submissions to individuals.

## Legal basis

- **For structured responses:** legitimate interest in research (GDPR Article 6(1)(f)); the research benefits the design-systems community + DSAF.
- **For free-text disclosures:** consent (GDPR Article 6(1)(a)); the form's free-text placeholder explicitly says "optional, don't include identifying info you don't want public."

## Changes

If this policy changes, we update the "Last updated" date + announce on dsaf.dev/blog.

## Contact

For privacy questions or to exercise your GDPR rights: hello@dsaf.dev.
```

## §3.7 — Dsaf.dev/index.html + README patches

Add a "Benchmark your system" link in the dsaf.dev/index.html footer (after the "Latest writing" link per FR-DOCS-003 §3):

```html
<p class="meta">
  Maintained by ...
  Latest writing: ...
  Benchmark: <a href="/benchmark">Benchmark your system (5 min, anonymous)</a>.
  Contact: ...
</p>
```

README.md update (after the FR-CORE-001 + FR-DOCS-001 + FR-DOCS-002 + FR-CONTENT-001 cross-links):

```markdown
**Benchmark your system.** [dsaf.dev/benchmark](https://dsaf.dev/benchmark) — 5-min anonymous self-scoring + peer comparison. Voluntary; GDPR-compliant; feeds the annual report.
```

(Single sentence; no CTA framing per FR-DOCS-001 sacredness rule.)

```

### Survey form intro (rendered on dsaf.dev/benchmark/index.html)

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>DSAF Lite Benchmark — anonymous self-scoring + peer comparison</title>
<meta name="description" content="29-question DSAF lite benchmark. Self-score against the 25 DSAF-25 Core criteria; see anonymized peer comparison. Voluntary, GDPR-compliant.">
<link rel="canonical" href="https://dsaf.dev/benchmark">
<!-- Existing dsaf.dev style + system-ui typography -->
</head>
<body>
<main>
<h1>DSAF Lite Benchmark</h1>

<section class="intro">
<p>This is a 29-question self-scoring survey. You'll see anonymized peer comparison after submission.</p>
<p><strong>What you're scoring:</strong> 25 DSAF-25 Core criteria (the one-page subset of the 125-criterion DSAF rubric). The criteria are at <a href="/card">/card</a> if you want to read them first.</p>
<p><strong>A note on what this benchmark is + isn't:</strong></p>
<ul>
  <li>It's a self-score, not a certification.</li>
  <li>The DSAF Level you can cite publicly caps at L3 (Managed) without third-party verification (per our <a href="/branding/self-audit-policy">self-audit publication policy</a>).</li>
  <li>Your data feeds the annual <em>State of Design System Audits</em> report (FR-REPORT-001, P6), aggregated + anonymous.</li>
</ul>
<p><strong>Privacy:</strong> voluntary opt-in; no required PII; GDPR-compliant; <a href="privacy">privacy policy</a>.</p>
<p>Submit when ready (≤ 5 minutes).</p>
</section>

<section class="form">
<!-- Tally embed: the form's HTML/JS injected here -->
<iframe src="https://tally.so/embed/DSAF_BENCHMARK_FORM_ID?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" loading="lazy" width="100%" height="0" frameborder="0" marginheight="0" marginwidth="0" title="DSAF Lite Benchmark"></iframe>
<script async src="https://tally.so/widgets/embed.js"></script>
</section>

<section class="footer-meta">
<p>Cross-references: <a href="/card">DSAF-25 Core card</a> · <a href="/branding/self-audit-policy">Self-audit publication policy</a> · <a href="/branding/decoupling-decision">Decoupling decision</a> (re audit.cyberskill.world).</p>
<p>Maintained by <a href="https://cyberskill.world">CyberSkill</a> + named co-maintainers. The framework is MIT-licensed open source.</p>
</section>
</main>
</body>
</html>
```

### Results page (dsaf.dev/benchmark/results.html)

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>DSAF Lite Benchmark — Your peer comparison</title>
<meta name="robots" content="noindex"> <!-- post-submission page; not indexable -->
<link rel="canonical" href="https://dsaf.dev/benchmark/results">
</head>
<body>
<main>
<h1>Thank you — your peer comparison</h1>

<section class="reminder">
<p>Your submission is anonymous + aggregated. Submission ID (for GDPR deletion/access requests; please save this): <code>[SUBMISSION_ID]</code>.</p>
</section>

<section class="overall-score">
<h2>Your DSAF-25 self-score</h2>
<p><strong>Your score:</strong> <span id="user-score">[CALCULATED]</span>% ([N_NON_NULL] of 25 criteria scored)</p>
<p><strong>Public cap (per self-audit publication policy):</strong> L3 (Managed) until third-party verification.</p>
<p><a href="/branding/self-audit-policy">Read the cap rule policy.</a></p>
</section>

<section class="per-criterion-distribution">
<h2>How you scored vs all respondents (per criterion)</h2>
<!-- For each of 25 criteria, render a bar chart of response distribution + highlight user's selection -->
<p><em>(Visualisations are dynamically rendered based on aggregate data; updated when N ≥ 30 responses across the dataset.)</em></p>
<!-- 25 mini-charts here -->
</section>

<section class="by-segment-comparison">
<h2>How you compare to your peer segments</h2>
<!-- For each demographic bucket the user matched, show per-criterion mean for that segment (if N ≥ 30) -->
</section>

<section class="next-steps">
<h2>Want to deepen the audit?</h2>
<ul>
  <li>Read the full 125-criterion rubric: <a href="https://github.com/CyberSkill/design-system-audit-framework/blob/main/docs/03-criteria-part-a.md">Part A — System</a> + <a href="https://github.com/CyberSkill/design-system-audit-framework/blob/main/docs/04-criteria-part-b.md">Part B — UX</a></li>
  <li>For criteria where you scored low, see the relevant weekly deep-dive: <a href="/blog/deep-dives">deep-dives index</a></li>
  <li>Run a complete audit using the prompts: <a href="https://github.com/CyberSkill/design-system-audit-framework/blob/main/prompts/scan-mode.md">scan-mode</a> + <a href="https://github.com/CyberSkill/design-system-audit-framework/blob/main/prompts/fix-mode.md">fix-mode</a></li>
</ul>
</section>

<section class="footer">
<p>Your data feeds the annual <em>State of Design System Audits</em> report (FR-REPORT-001, P6). To request access/deletion of your submission: hello@dsaf.dev + your submission ID.</p>
</section>
</main>
</body>
</html>
```
```

---

## §4 — Acceptance criteria

1. **Spec doc committed** — `docs/bench/lite-benchmark-spec.md` exists per §3 with §3.1 Questions + §3.2 Data model + §3.3 Anonymisation contract + §3.4 Results page spec + §3.5 Cap-rule disclosure + §3.6 Privacy policy.
2. **29 questions specified** — `docs/bench/lite-benchmark-spec.md` §3.1 has 25 DSAF-25 Core criterion questions + 4 demographic-bucket questions + 1 optional free-text field.
3. **GDPR-compliant privacy policy** — `dsaf.dev/benchmark/privacy.md` exists per §3.6 with: data collected, form vendor, data usage, data retention (12 months), GDPR rights (access/erasure/rectification/portability/objection), legal basis, contact.
4. **Form vendor named** — `docs/bench/lite-benchmark-spec.md` + `dsaf.dev/benchmark/privacy.md` name a GDPR-compliant vendor (Tally per recommendation; Typeform Pro / Formspree acceptable).
5. **Survey intro page committed** — `dsaf.dev/benchmark/index.html` exists per §3 with intro paragraph + cap-rule disclosure + privacy link + form embed.
6. **Results page committed** — `dsaf.dev/benchmark/results.html` exists per §3 with thank-you + per-criterion distribution + by-segment comparison + overall DSAF-25 score + cap rule disclosure + next-steps + footer.
7. **Low-N guard ≥ 30 documented** — `docs/bench/lite-benchmark-spec.md` §3.3 + §3.4 both state the "≥ 30 responses required" rule.
8. **Anonymisation contract documented** — §3.3 enumerates: aggregate-only display, low-N guard, no individual response display, free-text not aggregated, periodic export for FR-REPORT-001.
9. **No PII required** — `docs/bench/lite-benchmark-spec.md` §3.1 + form configuration confirm no required PII fields.
10. **Cap-rule disclosure present** — `dsaf.dev/benchmark/index.html` intro + `dsaf.dev/benchmark/results.html` overall-score section both reference the L3 cap rule.
11. **No paid-funnel CTAs** — `grep -ciE 'Talk to a certified|Contact (us|sales|CyberSkill)|Schedule (a|your) demo|Book (a|your) call' dsaf.dev/benchmark/*.html docs/bench/lite-benchmark-spec.md` returns 0.
12. **dsaf.dev/index.html patched** — "Benchmark your system" link added to footer.
13. **README.md patched** — single-sentence cross-link added per FR-DOCS-001 sacredness.
14. **GDPR rights enumerated** — `dsaf.dev/benchmark/privacy.md` lists access, erasure, rectification, portability, objection, complaint.
15. **Submission ID disclosure on results page** — `dsaf.dev/benchmark/results.html` "reminder" section instructs respondent to save the submission_id.
16. **Handle taxonomy compliance** — `grep -ciE '\b(the )?DSAF Framework\b|\bDSAF framework\b' dsaf.dev/benchmark/*.html docs/bench/lite-benchmark-spec.md` returns 0.
17. **Lighthouse perf ≥ 85** — PR description includes Lighthouse scores; the form-vendor embed adds JS so ≥ 85 acceptable.

---

## §5 — Verification

```bash
# AC1 — spec doc
test -f docs/bench/lite-benchmark-spec.md
for section in '## §3.1 — Questions' '## §3.2 — Data model' '## §3.3 — Anonymisation contract' '## §3.4 — Results page' '## §3.5 — Cap-rule disclosure' '## §3.6 — GDPR-compliant privacy policy'; do
  grep -qF "${section}" docs/bench/lite-benchmark-spec.md || echo "MISSING: ${section}"
done

# AC2 — 29 questions
grep -cE '^\*\*Q[0-9]+' docs/bench/lite-benchmark-spec.md  # >= 4 (demographic + free-text); criterion Q1-Q25 referenced separately
grep -c 'DSAF-25 Core' docs/bench/lite-benchmark-spec.md   # criterion-count anchor

# AC3 — privacy policy
test -f dsaf.dev/benchmark/privacy.md
for section in '## What data we collect' '## Form vendor' '## How we use the data' '## Data retention' '## Your rights under GDPR' '## Legal basis'; do
  grep -qF "${section}" dsaf.dev/benchmark/privacy.md || echo "MISSING: ${section}"
done

# AC4 — form vendor named
grep -q 'Tally\|Typeform\|Formspree' docs/bench/lite-benchmark-spec.md
grep -q 'Tally\|Typeform\|Formspree' dsaf.dev/benchmark/privacy.md

# AC5 — survey intro page
test -f dsaf.dev/benchmark/index.html
grep -qi 'cap rule\|capped at L3' dsaf.dev/benchmark/index.html
grep -q 'privacy' dsaf.dev/benchmark/index.html

# AC6 — results page
test -f dsaf.dev/benchmark/results.html
for section in 'Your DSAF-25 self-score' 'per criterion' 'peer segments' 'cap rule'; do
  grep -qi "${section}" dsaf.dev/benchmark/results.html || echo "MISSING: ${section}"
done

# AC7 — low-N guard
grep -q '≥ 30\|N ≥ 30' docs/bench/lite-benchmark-spec.md

# AC10 — cap-rule disclosure
grep -q 'self-audit-policy\|cap.*L3' dsaf.dev/benchmark/index.html
grep -q 'self-audit-policy\|cap.*L3' dsaf.dev/benchmark/results.html

# AC11 — no paid CTAs
grep -ciE 'Talk to a certified|Contact (us|sales|CyberSkill)|Schedule (a|your) demo|Book (a|your) call' dsaf.dev/benchmark/index.html dsaf.dev/benchmark/results.html docs/bench/lite-benchmark-spec.md
# expected: 0

# AC12, AC13 — patches
grep -q '/benchmark' dsaf.dev/index.html
grep -q 'benchmark' README.md

# AC14 — GDPR rights
for right in 'access' 'erasure' 'rectification' 'portability' 'objection' 'complaint'; do
  grep -qi "right to ${right}\|right.*${right}" dsaf.dev/benchmark/privacy.md || echo "MISSING right: ${right}"
done

# AC16 — handle taxonomy
grep -ciE '\b(the )?DSAF Framework\b|\bDSAF framework\b' dsaf.dev/benchmark/index.html dsaf.dev/benchmark/results.html docs/bench/lite-benchmark-spec.md
# expected: 0
```

Human-verified ACs (no script):

- **AC8** — reviewer reads §3.3 for full anonymisation contract.
- **AC9** — reviewer verifies form vendor configuration shows no required-PII fields.
- **AC15** — reviewer reads results.html for submission_id disclosure.
- **AC17** — reviewer runs Lighthouse + records scores in PR description.

---

## §6 — Implementation skeleton

The operator playbook (8h):

1. **(1h) Author `docs/bench/lite-benchmark-spec.md`** per §3 — all sub-sections.
2. **(1h) Set up Tally** — create form per §3.1 questions; configure no-required-PII; configure GDPR-compliant settings (data processing agreement reviewed); test submission flow.
3. **(1.5h) Author `dsaf.dev/benchmark/index.html`** per §3 — intro paragraphs + Tally embed + footer meta.
4. **(1.5h) Author `dsaf.dev/benchmark/results.html`** per §3 — thank-you + per-criterion distribution placeholders + by-segment comparison + cap-rule disclosure.
5. **(1h) Author `dsaf.dev/benchmark/privacy.md`** per §3 — GDPR-compliant policy with all 6 rights enumerated.
6. **(30m) Patch `dsaf.dev/index.html` + `README.md`** with cross-links per §3.
7. **(45m) Lighthouse + GDPR-compliance verification** — run Lighthouse (target ≥ 85); verify Tally's GDPR DPA is referenced; test the submission flow end-to-end.
8. **(15m) PR description** — Lighthouse screenshots + form vendor verification + first-month expected response volume (~50-200 per plan estimate).

---

## §7 — Dependencies

- **Upstream (required):**
  - **FR-BRAND-001** — dsaf.dev minted + landing page live.
  - **FR-CORE-001** — DSAF-25 Core criteria + dsaf.dev/card live; the 25 questions map to these criteria.
- **Coordinated:**
  - **FR-CORE-004** — cap rule policy at dsaf.dev/branding/self-audit-policy; benchmark intro + results page reference it.
  - **FR-BRAND-004** — decoupling rule; benchmark stays on dsaf.dev, NOT audit.cyberskill.world.
  - **FR-BRAND-002** — handle taxonomy.
- **Downstream blocks:**
  - **FR-BENCH-002** (P4 hosted benchmark at benchmark.dsaf.dev) — needs lite-benchmark response patterns to inform hosted-tier UX.
  - **FR-REPORT-001** (P6 annual State of Design System Audits report) — needs ≥ 12 months of benchmark data.
- **External:**
  - Tally account (free tier; embeddable form).
  - Cloudflare Pages (or equivalent SSG) for static hosting.

---

## §8 — Example payloads

### Example: first-month response pattern (estimated)

```
Week 1: 15-30 responses (launch-week dsaf.dev visitors)
Week 2: 8-15 responses (post-launch reader tail)
Weeks 3-4: 10-20 responses per week (steady-state once weekly deep-dives drive traffic to dsaf.dev)
Month 1 total: ~50-100 responses

By Month 3: 200-400 cumulative — low-N guard ≥ 30 satisfied for most segments
By Month 6: 500-1,000 cumulative — segments meaningful for most demographic combinations
By Month 12: 1,500-3,000 cumulative — annual-report-ready dataset for FR-REPORT-001 P6
```

### Example: anonymised peer comparison display (post-submission)

```
Your DSAF-25 self-score: 64% (24 of 25 criteria scored; 1 skipped as "Don't know")

Per-criterion distribution (A.1.1 Color tokens):
  0 (Absent):      [█] 3% of responses
  1 (Mentioned):   [██] 8%
  2 (Defined):     [████] 18%
  3 (Built):       [██████████] 38%
  4 (Measured):    [████████] 28%   ← your selection
  5 (Industry-leading): [██] 5%
Mean: 3.0; Median: 3

You're at 4 (Measured); 28% of respondents at this level; 33% at 5 or below 4 / 28% at higher / 39% lower.
```

(Real visualisation would be inline SVG or simple bar charts; the ASCII above is illustrative.)

### Example: a GDPR access request handling

```
2026-MM-DD: User emails hello@dsaf.dev with "DSAF benchmark access request — submission_id abc-123"
2026-MM-DD +2 days: Operator queries Tally's dashboard for submission_id abc-123; exports JSON; replies to user with the JSON
2026-MM-DD +2 days: Logged in MEMORY.md per relationship continuity (rare event but auditable)
```

---

## §9 — Open questions

All resolved at authoring time:

- **Q1: Form vendor — Tally vs Typeform vs Google Forms?** Resolved → Tally preferred (free tier, GDPR-compliant, EU-based, embed-friendly). Typeform Pro is acceptable (paid). Google Forms is borderline (EU data routing inconsistent).
- **Q2: Required vs optional PII?** Resolved → no required PII; one optional free-text field where respondents self-disclose at their discretion.
- **Q3: 25 questions or fewer / more?** Resolved → 25 (one per DSAF-25 Core criterion). Plus 4 demographic + 1 optional free-text = 30 questions total. Aligned with the DSAF-25 Core artefact.
- **Q4: Low-N guard threshold?** Resolved → ≥ 30 responses. Below 30, segments are at re-identification risk for unusual bucket combinations.
- **Q5: Hosted vs static?** Resolved → static (the lite version) with form vendor handling data collection. Hosted (FR-BENCH-002 P4) comes later.
- **Q6: Per-respondent personalized reports?** Resolved → no (lite version). Generic anonymized stats only. Personalized reports are FR-BENCH-002 P4 scope.
- **Q7: Annual aggregated public report timing?** Resolved → P6 (FR-REPORT-001). Needs ≥ 12 months of data.

---

## §10 — Failure modes inventory

| Failure | Detection | Outcome | Recovery |
|---|---|---|---|
| Form vendor changes GDPR compliance status | vendor status page change | Privacy policy out-of-date | Update privacy policy + transition to compliant vendor if necessary; data export/import as needed |
| Respondent submits identifying info in free-text accidentally | content scan at periodic export | Privacy risk | Anonymise / redact from internal dataset; do not publish in aggregates; if respondent requests, delete entirely |
| Low-N segment displayed mistakenly | results-page rendering bug | Re-identification risk | Test with N < 30 dataset; verify segments show "insufficient data"; deploy fix; for already-displayed cases, scrub the cached results page |
| Vendor outage / form goes down | dsaf.dev/benchmark page broken | No submissions for the outage window | Acceptable; vendor outages are typically short; if prolonged, switch vendors + import existing data |
| Survey questions become outdated as DSAF-25 evolves (FR-CORE-003 dedup) | post-dedup audit | Question wording stale | Update form questions to match the new DSAF-25 Core; respondents who answered the old questions stay in dataset with note "responded under v0.X criteria" |
| Spam submissions distort aggregates | unusual response patterns | Data quality degraded | Tally has built-in spam protection; if pattern emerges, configure additional filters (rate limiting, CAPTCHA); flag spam submissions in dataset |
| GDPR access/erasure request received | email inbox | Compliance obligation | Per §3.6 process: respond within 30 days; submission_id required for actionability |
| Reporting that benchmark scores certify the DSAF Level | misinterpretation in community | Cap-rule confusion | The cap-rule disclosure is on intro + results page; address publicly via FR-LAUNCH-001 §3 response patterns; clarify in next weekly deep-dive |
| Vendor changes pricing or sunsets form | vendor announcement | Need to migrate | Transition to backup vendor (Typeform Pro / Formspree); data export from old vendor; preserve submission_ids if possible |
| Aggregates manipulated by deliberate bad-actor submissions | unusual distribution patterns | Skewed peer comparison | Per §3.3 anonymisation: spam filters + N ≥ 30 + manual review of outliers; flag suspicious clusters |
| Cross-segment combinations (e.g., "EU + 500-5K + DS lead") below N = 30 | results-page rendering | Display gap | The §3.4 spec explicitly states segments are independent (not cross-segmented); the spec's design avoids this failure |
| Periodic dataset export for FR-REPORT-001 reveals sensitive patterns | annual review | Privacy concern | Anonymisation contract + low-N guard already in place; the annual report's editorial process adds another review layer |

---

## §11 — Implementation notes

- **The 8h budget is mostly the form setup + result page + privacy policy.** Tally setup ~1h; index.html + results.html ~3h combined; privacy.md ~1h; patches + verification ~1h.
- **About Tally specifically:** chosen for (a) free tier supports embedded forms, (b) GDPR-compliant by default with EU data routing, (c) embeddable iframe (the form lives on dsaf.dev/benchmark visually), (d) JSON export for the dataset. The vendor's reliability matters; Tally has been stable since 2022.
- **The "submission_id required for GDPR rights" framing is unusual but legally accurate.** Because the framework collects no PII linking responses to individuals, there's no other way to identify a specific submission for access/erasure. The form's confirmation email includes the submission_id; users save it if they care about GDPR rights.
- **About the low-N guard threshold:** ≥ 30 is the design choice. ≥ 50 would be more conservative; ≥ 10 would be too aggressive (high re-identification risk). 30 balances meaningful aggregates with privacy protection.
- **First-month response volume estimate:** 50-100 is conservative; high-engagement launches (e.g., if Show HN drives 5,000+ visitors to dsaf.dev in launch week) could see 200-400. The annual-report dataset target of 1,500+ is achievable within 6-12 months.
- **About the results page noindex meta:** post-submission pages should not be search-indexed; the URL is functional (after submit) but transient. The noindex prevents accidental SEO leak of result-pattern URLs.
- **The cap-rule disclosure is the load-bearing trust signal.** Without it, respondents may interpret their score as "DSAF L4" and cite that publicly without third-party verification. With it, the disclosure normalises "this is self-score; certification is separate." Per FR-CORE-004 cap rule.
- **About future iterations:** if the dataset reaches N = 1,000+, the FR may evolve to add segment-cross combinations (with N ≥ 30 per combination) + an "Industry insights" page showing patterns. That's beyond P2 scope; revisit at FR-BENCH-002 P4 + FR-REPORT-001 P6.

---

*End of FR-BENCH-001.*
