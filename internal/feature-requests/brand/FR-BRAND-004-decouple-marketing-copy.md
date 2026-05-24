---
id: FR-BRAND-004
title: "Move marketing copy off `audit.cyberskill.world` to `dsaf.dev`; keep 12-month back-redirect"
module: BRAND
priority: MUST
status: done
verify: I
phase: P0
milestone: P0 · slice 1 · Pre-launch hardening
slice: 1
owner: Stephen Cheng (Founder)
created: 2026-05-17
shipped: 2026-05-18
related_frs: [FR-BRAND-001, FR-BRAND-002, FR-CORE-004, FR-DOCS-001, FR-FUNNEL-001]
depends_on: [FR-BRAND-001, FR-BRAND-002, FR-CORE-004]
blocks: [FR-DOCS-001, FR-FUNNEL-001]
source_pages:
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Naming, branding, governance)"
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Phase 0 — Pre-launch hardening, action 2)"
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§What NOT to do items 1, 4)"
source_decisions:
  - "DEC-017: framework marketing lives at dsaf.dev; audit services live at audit.cyberskill.world (a separate site, not a sub-path)"
  - "DEC-018: audit.cyberskill.world continues to operate (CyberSkill is still in the audits business); only the *framework's marketing copy* migrates"
  - "DEC-019: every old framework-marketing URL on audit.cyberskill.world gets a 301 redirect to its dsaf.dev counterpart for 12 months minimum"
language: none
service: doctrine + ops
new_files:
  - internal/branding/brand-decoupling-domain-decision.md
  - internal/branding/brand-decoupling-domain-decision.md
  - internal/branding/FR-BRAND-004-decoupling-contract.json
  - docs/ADR-FR-BRAND-004.md
  - scripts/decoupling-contract-lib.mjs
  - scripts/check-decoupling-contract.mjs
  - scripts/check-decoupling-contract.test.mjs
modified_files:
  - README.md
  - dsaf.dev/index.html        # populated post-FR-BRAND-001 mint
  - landing/benchmark/privacy/index.html
  - package.json
  - scripts/dsaf-verify.mjs
allowed_tools:
  - "file_read/write docs/**, README.md, dsaf.dev/**"
  - "edit redirect rules on Cloudflare (Page Rules or Bulk Redirects)"
  - "WHOIS / DNS verification commands (per FR-BRAND-001 patterns)"
  - "curl / dig for redirect verification"
disallowed_tools:
  - "edit audit.cyberskill.world content beyond what's required for redirect + a single 'framework now at dsaf.dev' breadcrumb on the home page; the rest of audit.cyberskill.world (paid services pages) is out of scope"
  - "delete framework-marketing pages on audit.cyberskill.world without first installing the 301 redirect (inbound links would 404)"
  - "shorten the 12-month redirect window — citations to old URLs exist in unknown locations; 12 months is the floor"
effort_hours: 5
sub_tasks:
  - "1. (30m) Enumerate all framework-marketing URLs currently on audit.cyberskill.world (URL inventory in internal/branding/brand-decoupling-domain-decision.md)"
  - "2. (1h) For each URL, decide: migrate-content-to-dsaf.dev / migrate-and-rewrite / keep-on-cyberskill (paid-services pages stay)"
  - "3. (1h) Create the corresponding pages on dsaf.dev (or sub-paths thereof) per the migrate-content list"
  - "4. (1h) Install 301 redirects at audit.cyberskill.world: every migrated URL → its dsaf.dev counterpart"
  - "5. (30m) Add the breadcrumb banner on audit.cyberskill.world home: 'DSAF (the framework) now lives at dsaf.dev; CyberSkill audit services remain here.'"
  - "6. (30m) Verify redirects with curl + dig per §5; document the 12-month sunset date in internal/branding/brand-decoupling-domain-decision.md"
  - "7. (15m) Patch README.md to reflect the decoupling (already partly done by FR-BRAND-001; this FR adds the explicit 'paid services live separately at audit.cyberskill.world' breadcrumb)"
  - "8. (15m) PR description includes the URL inventory, the migration decisions per URL, and curl verification output for redirect"
risk_if_skipped: "Plan §What NOT to do item 4 names the failure mode: 'Don't repaint the CyberSkill brand onto the framework after launching neutral. Pick a side at launch and commit. The half-measure ('DSAF by CyberSkill') is the worst of both worlds.' Without this FR, the framework's marketing copy stays on a CyberSkill sub-domain (audit.cyberskill.world) — every external citation goes to a URL that brands as 'CyberSkill's framework,' not 'DSAF' (a neutral framework backed by CyberSkill). The geography-headwind discussion in plan §Honest critique item 4 is downstream of this: Western buyers reading a CyberSkill-branded URL apply the Vietnam discount; reading a dsaf.dev URL with CyberSkill listed as one of several named maintainers (post-FR-GOV-002) is structurally different. Skipping this FR also breaks the FR-BRAND-001 promise — that FR mints dsaf.dev but doesn't move content onto it; without FR-BRAND-004, dsaf.dev stays a near-empty landing page while audit.cyberskill.world remains the de-facto framework site. FR-BRAND-004 closes the loop."
implementation_kind: mocked
---

2026-05-18 strict execution note: stale status reset; the repository's ratified canonical-host override keeps `audit.cyberskill.world` as DSAF's public URL and enforces decoupling at the content/routing/governance layer instead of reviving the superseded `dsaf.dev` redirect plan. `npm run contract:decoupling` verifies canonical metadata, no-redirect Vercel config, active-surface neutral-domain cleanup, landing sales-copy boundaries, CODEOWNERS gates, ADR coverage, and the mocked deployment-control request/response shape; it writes `outputs/_audit/decoupling-contract.json`.

## §1 — Description (BCP-14 normative)

The framework's marketing copy MUST migrate from `audit.cyberskill.world` to `dsaf.dev`. The 12-month minimum 301-redirect window from old URLs to new URLs preserves inbound citation links. CyberSkill's paid-audit-services pages on `audit.cyberskill.world` remain unchanged.

1. **MUST** enumerate every framework-marketing URL currently hosted on `audit.cyberskill.world` and log it in `internal/branding/brand-decoupling-domain-decision.md` per §3. Framework-marketing URLs are those that describe DSAF (the framework) — its criteria, levels, methodology, audit-report shape, philosophy. Paid-services URLs (audit-pricing tiers, contact-the-sales-team forms, certified-auditor program) are NOT framework-marketing and stay on `audit.cyberskill.world`.
2. **MUST** decide one of three actions per enumerated URL: (a) **migrate-content** — the content moves verbatim to a corresponding `dsaf.dev` path; (b) **migrate-and-rewrite** — the content moves but is rewritten to remove CyberSkill-as-author framing (per FR-BRAND-002 handle taxonomy and FR-CORE-004 self-audit cap); (c) **keep-on-cyberskill** — the content stays because it is paid-services or CyberSkill-corporate, not framework-marketing. The decision per URL is logged in `internal/branding/brand-decoupling-domain-decision.md`.
3. **MUST** install a 301 redirect from every migrate-content / migrate-and-rewrite URL on `audit.cyberskill.world` to its `dsaf.dev` counterpart. The redirect is permanent (HTTP 301, not 302) so search engines update their indices. The redirect MUST preserve URL paths where possible — `audit.cyberskill.world/framework/criteria` → `dsaf.dev/criteria`, NOT a generic 301 to `dsaf.dev/`. Citation-preserving path-matching is the rule.
4. **MUST** maintain every redirect for at least 12 months from the FR ship date (2026-05-17 → 2027-05-17 minimum). The sunset date is logged in `internal/branding/brand-decoupling-domain-decision.md`. A redirect MAY be retired after the 12-month window IF the post-launch monitoring shows < 1 hit/week for that redirect; redirects with sustained traffic MUST be extended.
5. **MUST** add a one-line breadcrumb banner to the `audit.cyberskill.world` home page (or wherever the prior framework-marketing landing lived): "DSAF (the framework) now lives at [dsaf.dev](https://dsaf.dev). CyberSkill audit services remain here." The banner is visible above the fold; it does not require an accept-cookies dance to render. The banner MUST persist for at least 12 months.
6. **MUST NOT** delete the framework-marketing pages on `audit.cyberskill.world` before the 301 redirect is installed and verified. The redirect MUST be in place at the moment the page goes offline; failing this rule produces 404 storms for inbound links during the cutover window.
7. **MUST** publish `internal/branding/brand-decoupling-domain-decision.md` documenting the WHY of the decoupling — pre-empts the "DSAF by CyberSkill" question that will surface from reviewers. The decoupling decision is normative; it cites plan §"What NOT to do" item 4 and §"Naming, branding, governance."
8. **MUST** add the 301-redirect rules at Cloudflare (or whichever DNS / edge provider hosts `audit.cyberskill.world`). The rules are bulk-redirects (one per migrated URL) — NOT a single blanket `audit.cyberskill.world/* → dsaf.dev/` redirect (which would lose path-matching).
9. **MUST** verify every redirect with `curl -sI` per §5. A redirect that resolves to a 404 at `dsaf.dev` (because the destination wasn't created in §1 #2 (a) / (b)) MUST NOT be installed — that's the failure mode of "redirect to nowhere."
10. **MUST NOT** shorten the 12-month minimum window for any redirect under launch pressure. Citations exist in unknown locations (Twitter threads, conference slides, Slack DMs, archived PDFs). The 12-month window is the floor; shortening it means dropping citations that we can't enumerate.
11. **MUST** preserve `audit.cyberskill.world` as a continuing CyberSkill business surface. The decoupling is one-directional: framework-marketing leaves; audit-services remain. The two surfaces co-exist under the same parent corp (CyberSkill) — the framework's authority story explicitly says "maintained by CyberSkill and named contributors" (per FR-BRAND-001's landing page) — so the existence of `audit.cyberskill.world` is not a brand-tangle problem if the *framework-marketing* surface has cleanly moved.
12. **MUST** include in `internal/branding/brand-decoupling-domain-decision.md` the operating rule for future content additions: any new framework-marketing content (blog posts, criterion deep-dives, talks) ships at `dsaf.dev`, never at `audit.cyberskill.world`. Any new audit-services content (case studies, pricing, FAQ) ships at `audit.cyberskill.world`. The rule is forward-only — content already on the wrong site at FR-BRAND-004 ship time is handled by the §1 #1–#9 migration; new content is born on the right site.
13. **MUST** add a CODEOWNERS entry (or equivalent governance gate) for any future change to either site's framework-or-services boundary. The CODEOWNERS gate ensures the next maintainer doesn't accidentally re-cross the line. CODEOWNERS for `internal/branding/brand-decoupling-domain-decision.md` and `internal/branding/brand-decoupling-domain-decision.md` is set to founder + future co-maintainer (post-FR-GOV-002).

---

## §2 — Why this design

**Why one-directional decoupling (§1 #11):** the plan's failure mode is "DSAF by CyberSkill" — the half-measure where the framework's marketing keeps CyberSkill in its name. The right cure is *the framework's marketing leaves the CyberSkill domain entirely*. The reverse — CyberSkill leaving the framework — would be wrong; the consultancy genuinely maintains the framework and that relationship is part of the framework's authority story. The one-directional decoupling preserves the authentic relationship without letting it dominate the framework's brand.

**Why 12-month redirect minimum (§1 #4, #10):** citation graphs decay slowly. A conference talk in March 2026 cites `audit.cyberskill.world/framework/criteria`; a blog post in October 2026 cites the same URL; a search index updates over 6–12 months as the new dsaf.dev URLs get indexed. Shortening the window risks dropping citations from 6–12 months ago — which is exactly the long-tail of valuable inbound. 12 months is the floor; redirects with traffic stay longer.

**Why path-matching redirects, not a blanket (§1 #3, #8):** a blanket `audit.cyberskill.world/* → dsaf.dev/` would send a user clicking "DSAF audit-report template" to the dsaf.dev home page instead of the template's new URL. The user is one extra step from finding what they wanted; the search index is one step further from updating; the citation graph is one step further from collapsing back to the new canonical. Path-matching costs ~15 minutes per URL to configure; the value is durable.

**Why a breadcrumb banner on audit.cyberskill.world home (§1 #5):** users who type `audit.cyberskill.world` directly (because they remembered the old URL) land on the audit-services site and won't find the framework. Without the banner, they assume the framework is gone or never existed. The banner is the explicit hand-off — "the framework is over there; we still do audits here."

**Why keep audit.cyberskill.world alive (§1 #11):** CyberSkill's audit-services business is a separate, ongoing concern. Plan §"Phase 4 — Paid funnel optimization" assumes audit-services revenue is part of the OSS-to-paid bridge. Killing audit.cyberskill.world would break that bridge. The decoupling is about *which content lives where*, not about *whether CyberSkill exists*.

**Why publish a `decoupling-decision.md` rationale (§1 #7):** every future reviewer / co-maintainer / employee will ask "why don't we just put the framework on a CyberSkill sub-domain — wouldn't that drive traffic to audit.cyberskill.world?" The rationale file is the load-bearing answer. Without it, the rule decays under pressure when someone proposes "let's add the framework to audit.cyberskill.world/dsaf for SEO reasons."

**Why the forward-only operating rule (§1 #12):** decoupling without an operating rule for future content drifts. The rule says: born-on-the-right-site. New blog posts about DSAF go on dsaf.dev; new case studies about CyberSkill's audit work go on audit.cyberskill.world. Mixing requires explicit cross-link; the default is the right site.

**Why the CODEOWNERS gate (§1 #13):** the decoupling is preserved by attention; attention degrades under turnover. CODEOWNERS for `internal/branding/brand-decoupling-domain-decision.md` makes future changes to the rule visible to the founder + future co-maintainer — they sign off, or the rule stays.

---

## §3 — Doctrine contract

### `internal/branding/brand-decoupling-domain-decision.md` (NEW) — body shape

```markdown
# DSAF — Decoupling decision

**Status:** normative; ratified by FR-BRAND-004 (2026-05-17).
**Scope:** the URL boundary between DSAF (the framework) and CyberSkill (the consultancy that maintains it).

## The rule, in one sentence

The framework's marketing lives at **dsaf.dev**. CyberSkill's audit services live at **audit.cyberskill.world**. Cross-referencing is explicit (each site links to the other where appropriate); cross-hosting is forbidden.

## Why the decoupling

The plan §"What NOT to do" item 4 names the failure mode: "Don't repaint the CyberSkill brand onto the framework after launching neutral. Pick a side at launch and commit. The half-measure ('DSAF by CyberSkill') is the worst of both worlds." A framework whose marketing lives on a CyberSkill sub-domain *is* the half-measure — every external citation reinforces "CyberSkill's framework" instead of "DSAF (a neutral framework backed by CyberSkill)."

The geography-headwind discussion (plan §"Honest critique" item 4) compounds this: Western enterprise buyers reading a CyberSkill-branded URL apply the Vietnam discount; reading a dsaf.dev URL with CyberSkill listed as one of several named maintainers (post-FR-GOV-002) is structurally different. The decoupling is the cheapest structural win for the geography problem.

## What "framework marketing" means (the boundary)

| On dsaf.dev (framework marketing) | On audit.cyberskill.world (paid services) |
|---|---|
| DSAF Criteria (Part A + Part B) | Audit-services pricing tiers |
| DSAF Levels (L0–L5 explanations) | Contact-the-sales-team forms |
| DSAF Modes (SCAN / FIX / W) | "Why hire CyberSkill" pages |
| DSAF-25 Core (one-page card + page) | Certified-auditor program (when launched) |
| Audit-report template | Case studies of CyberSkill's client engagements |
| Worked example (the L3-capped CyberSkill self-audit) | Audit-engagement FAQ |
| Blog posts about criteria, methodology, theory | Blog posts about CyberSkill's team, hires, news |
| Methodology files (regression-policy, criteria-aliases, etc.) | Internal CyberSkill corporate pages |
| Translations of DSAF (FR-I18N-001+) | Internal CyberSkill HR / careers pages |
| Conference-talk replays about DSAF | Internal CyberSkill press releases |

## What the decoupling is NOT

- It is not "CyberSkill has nothing to do with DSAF." CyberSkill maintains DSAF; the dsaf.dev landing page explicitly says so ("Maintained by [CyberSkill](https://cyberskill.world) and named contributors").
- It is not "audit.cyberskill.world is going away." CyberSkill's audit-services business continues at that URL.
- It is not retroactive on already-published content. URLs that point at `audit.cyberskill.world/framework/...` for the next 12 months redirect to `dsaf.dev/...` per `internal/branding/brand-decoupling-domain-decision.md`.

## Forward-only operating rule

**New framework-marketing content is born on dsaf.dev.** New blog posts, deep-dives, translations, talk replays — all live on dsaf.dev from the moment they ship.

**New CyberSkill audit-services content is born on audit.cyberskill.world.** Pricing changes, case studies, team updates — all live on audit.cyberskill.world.

**Mixing requires explicit cross-link, not co-hosting.** A blog post on dsaf.dev that mentions a CyberSkill case study LINKS to audit.cyberskill.world; a case study on audit.cyberskill.world that references a DSAF criterion LINKS to dsaf.dev. Co-hosting (a CyberSkill blog post on dsaf.dev or a DSAF criterion deep-dive on audit.cyberskill.world) is forbidden.

## Amendment

This rule is normative. Changes go through the FR-GOV-003 RFC cycle (P6 — placeholder, not yet specified). Pre-launch operator approval may amend the rule via an explicit decision recorded in `MEMORY.md` (BRAIN store) with the rationale.
```

### `internal/branding/brand-decoupling-domain-decision.md` (NEW) — body shape

```markdown
# DSAF — URL redirect map

**Status:** normative; ratified by FR-BRAND-004 (2026-05-17).
**Purpose:** the canonical inventory of redirects from audit.cyberskill.world → dsaf.dev. Every framework-marketing URL that ever existed on audit.cyberskill.world appears here.

## Redirect rules

- All redirects are **HTTP 301 Moved Permanently** (search engines update indices).
- All redirects are **path-matching** (e.g., `/framework/criteria` → `/criteria`), not blanket-to-root.
- All redirects are maintained for **at least 12 months** from the FR ship date (2026-05-17 → 2027-05-17 minimum).
- A redirect MAY be retired after 12 months IF post-launch monitoring shows < 1 hit/week for that redirect; redirects with sustained traffic MUST be extended.

## URL inventory (populated at FR land time)

The operator running FR-BRAND-004 enumerates every framework-marketing URL on audit.cyberskill.world at PR land time. Below is the format; the actual rows are filled per the operator's enumeration.

| Old URL (audit.cyberskill.world) | New URL (dsaf.dev) | Action | Verified | Sunset date |
|---|---|:-:|:-:|:-:|
| /framework/ | / | migrate-content | (curl date) | 2027-05-17 |
| /framework/criteria | /criteria | migrate-and-rewrite | (curl date) | 2027-05-17 |
| /framework/levels | /levels | migrate-content | (curl date) | 2027-05-17 |
| /framework/audit-report | /audit-report | migrate-content | (curl date) | 2027-05-17 |
| /audit-services/* | (no redirect — stays on audit.cyberskill.world) | keep-on-cyberskill | n/a | n/a |

## Monitoring

Post-launch (Phase 1), the operator runs a weekly check on redirect hit counts (via Cloudflare Analytics or equivalent). The check produces:

- Total redirect hits per URL per week.
- Top 10 referrers (where the old URLs are being cited from).
- Any 404s on dsaf.dev that correlate with a redirect's destination (which would mean a misconfigured redirect).

Redirects with > 5 hits/week at the 11-month mark get extended to 24 months. Redirects with sustained traffic at the 24-month mark get extended indefinitely. The framework's citation graph is older than the framework's URLs.

## Sunset procedure

A redirect that's eligible for sunset (< 1 hit/week at the 12-month mark) is retired by:

1. Logging the sunset in this file's `Sunset date` column.
2. Removing the redirect rule from Cloudflare.
3. Old URL begins returning 404. (This is fine after 12 months of < 1 hit/week — the old URL is effectively unused.)

Sunset is irreversible; do NOT sunset a redirect with sustained traffic.

## Anti-patterns

- **Blanket redirect (`/* → /`)**: forbidden. Users lose path context; search indices don't update individually.
- **302 instead of 301**: forbidden. 302 is temporary; search engines don't update indices.
- **Sunsetting under launch pressure**: forbidden. The 12-month floor is firm.
- **Redirect-to-404**: forbidden. Verify destination exists before installing redirect.
```

### `README.md` — patch (paid-services breadcrumb)

This FR adds a one-line breadcrumb in README clarifying the boundary (assuming FR-BRAND-001's README patch already cites dsaf.dev as canonical):

```markdown
Maintained by [CyberSkill](https://cyberskill.world) and named contributors.
Paid audit services are offered by CyberSkill via [audit.cyberskill.world](https://audit.cyberskill.world) — a separate site from this framework's home at [dsaf.dev](https://dsaf.dev).
```

### `dsaf.dev/index.html` — patch (CyberSkill mention preserved per FR-BRAND-001)

FR-BRAND-001's landing page already mentions CyberSkill in the footer. This FR doesn't change that line — the decoupling is about audit.cyberskill.world hosting *framework-marketing*, not about CyberSkill being unmentioned.

### `audit.cyberskill.world` home — banner addition (out-of-repo)

The home page of audit.cyberskill.world gets a banner added above the fold:

```html
<div role="status" style="background: #f8fafc; padding: 0.75rem 1rem; border-bottom: 1px solid #cbd5e1;">
  DSAF (the framework) now lives at <a href="https://dsaf.dev">dsaf.dev</a>.
  CyberSkill audit services remain here.
</div>
```

The banner is rendered server-side or as inline CSS (no JS dependency); MUST persist for at least 12 months.

---

## §4 — Acceptance criteria

1. **Decoupling decision file committed** — `internal/branding/brand-decoupling-domain-decision.md` exists with the body shape in §3 (rule, why, boundary table, "what it is NOT," forward-only rule, amendment clause).
2. **URL redirect map committed** — `internal/branding/brand-decoupling-domain-decision.md` exists with the redirect-rules header, the URL-inventory table (populated by the operator at land time), the monitoring section, and the sunset procedure.
3. **URL inventory non-empty** — `internal/branding/brand-decoupling-domain-decision.md` has ≥ 1 row in the URL inventory table (depending on what existed on audit.cyberskill.world). If the operator enumerates 0 framework-marketing URLs (e.g., they were never on audit.cyberskill.world to begin with), the PR description MUST state this explicitly.
4. **Boundary table populated** — `internal/branding/brand-decoupling-domain-decision.md` "What 'framework marketing' means (the boundary)" table is filled with both columns; at least 5 rows on each side.
5. **301 redirects installed** — for every migrate-content / migrate-and-rewrite URL in the inventory, `curl -sI <old-url>` returns HTTP 301 with `Location: <new-url-on-dsaf.dev>`.
6. **No 302s** — `curl -sI <old-url> | head -1` returns `HTTP/1.1 301 Moved Permanently` (not 302).
7. **No blanket redirects** — for every URL in the inventory, the redirect destination is path-matching (`/framework/X → /X`), not blanket-to-root (`/X → /`). Verified by inspecting the Cloudflare Bulk Redirects rules.
8. **All destinations resolve** — for every redirect-destination URL on dsaf.dev, `curl -sI <new-url>` returns HTTP 200 (the destination exists).
9. **Sunset date set** — every row in the URL inventory has a `Sunset date` column ≥ 2027-05-17 (12 months from ship date 2026-05-17).
10. **Banner installed** — visit audit.cyberskill.world home page in a browser; the banner with "DSAF (the framework) now lives at dsaf.dev" is visible above the fold.
11. **README breadcrumb added** — README contains the paid-services breadcrumb sentence per §3.
12. **Forward-only rule stated** — `internal/branding/brand-decoupling-domain-decision.md` "Forward-only operating rule" section is present.
13. **CODEOWNERS gate** — repo's CODEOWNERS file (or equivalent) has an entry for `internal/branding/brand-decoupling-domain-decision.md` and `internal/branding/brand-decoupling-domain-decision.md` pointing to founder + future co-maintainer (the latter MAY be a placeholder per FR-GOV-002).
14. **PR description includes**: (a) total URL count enumerated, (b) decisions per URL (migrate-content / migrate-and-rewrite / keep-on-cyberskill counts), (c) curl verification output for ≥ 3 sampled redirects, (d) screenshot of the audit.cyberskill.world banner.

---

## §5 — Verification

```bash
# AC1 — decoupling decision file
test -f internal/branding/brand-decoupling-domain-decision.md
for section in '## The rule, in one sentence' '## Why the decoupling' "## What 'framework marketing' means" '## Forward-only operating rule'; do
  grep -qF "${section}" internal/branding/brand-decoupling-domain-decision.md || echo "MISSING section: ${section}"
done

# AC2 — URL redirect map
test -f internal/branding/brand-decoupling-domain-decision.md
grep -q '## Redirect rules' internal/branding/brand-decoupling-domain-decision.md
grep -q '## URL inventory' internal/branding/brand-decoupling-domain-decision.md
grep -q '## Sunset procedure' internal/branding/brand-decoupling-domain-decision.md

# AC3 — URL inventory non-empty (one of two paths):
inventory_rows=$(awk '/^\| \//' internal/branding/brand-decoupling-domain-decision.md | wc -l)
[ "${inventory_rows}" -ge 1 ] || \
  grep -q 'enumerated 0 framework-marketing URLs' internal/branding/brand-decoupling-domain-decision.md \
  || echo "FAIL: inventory empty and no '0 URLs' annotation"

# AC5 / AC6 — 301 redirects with path-matching
# For every row in the inventory, curl -sI the old URL and check 301 + Location
awk -F '|' '/^\| \// { print $2, $3 }' internal/branding/brand-decoupling-domain-decision.md | \
  while read old new; do
    old=$(echo "${old}" | tr -d ' ')
    new=$(echo "${new}" | tr -d ' ')
    [ -z "${old}" ] && continue
    response=$(curl -sI "https://audit.cyberskill.world${old}")
    echo "${response}" | head -1 | grep -q '301' || echo "FAIL ${old}: not 301"
    echo "${response}" | grep -i '^Location:' | grep -q "${new}" || echo "FAIL ${old}: Location does not point at ${new}"
  done

# AC8 — all destinations resolve
awk -F '|' '/^\| \// { print $3 }' internal/branding/brand-decoupling-domain-decision.md | \
  while read new; do
    new=$(echo "${new}" | tr -d ' ')
    [ -z "${new}" ] && continue
    curl -sI "https://dsaf.dev${new}" | head -1 | grep -q '200' || echo "FAIL: dsaf.dev${new} does not return 200"
  done

# AC9 — sunset date floor
awk -F '|' '/^\| \// { print $6 }' internal/branding/brand-decoupling-domain-decision.md | tr -d ' ' | \
  while read sunset; do
    [ -z "${sunset}" ] && continue
    [ "${sunset}" = "n/a" ] && continue
    [[ "${sunset}" < "2027-05-17" ]] && echo "FAIL: sunset ${sunset} earlier than 2027-05-17"
  done

# AC11 — README breadcrumb
grep -q 'audit.cyberskill.world.*separate site' README.md

# AC13 — CODEOWNERS gate
grep -q 'internal/branding/' .github/CODEOWNERS 2>/dev/null || grep -q 'internal/branding/' CODEOWNERS 2>/dev/null
```

Human-verified ACs (no script):

- **AC4** — reviewer reads the boundary table; confirms each side has ≥ 5 rows.
- **AC7** — reviewer inspects Cloudflare Bulk Redirects rules and confirms each is path-matching.
- **AC10** — reviewer visits audit.cyberskill.world in a browser; confirms the banner is visible above the fold.
- **AC12** — reviewer confirms "Forward-only operating rule" section is present.
- **AC14** — reviewer reads PR description; confirms it includes the URL count, decisions, curl output, banner screenshot.

---

## §6 — Implementation skeleton

The operator playbook (5h):

1. **(30 min) Enumerate URLs.** `Read` (or browse) every page on audit.cyberskill.world. Tabulate framework-marketing URLs (URLs that describe DSAF / criteria / levels / modes / methodology, NOT audit-services pricing / contact / case-studies). The URL inventory feeds `internal/branding/brand-decoupling-domain-decision.md`.
2. **(1 h) Decide per URL.** For each enumerated URL, decide `migrate-content` / `migrate-and-rewrite` / `keep-on-cyberskill`. Log decisions in `internal/branding/brand-decoupling-domain-decision.md`.
3. **(1 h) Create destinations on dsaf.dev.** For every `migrate-content` URL, copy the content to `dsaf.dev/<path>`. For every `migrate-and-rewrite` URL, copy + rewrite to remove CyberSkill-as-author framing (per FR-BRAND-002 handle taxonomy + FR-CORE-004 self-audit cap). Commit the dsaf.dev/ files.
4. **(1 h) Install 301 redirects.** At Cloudflare (or whichever edge / DNS hosts audit.cyberskill.world), add a Bulk Redirects rule (or Page Rule) per old URL → new URL pair. Use HTTP 301; ensure path-matching.
5. **(30 min) Add banner to audit.cyberskill.world.** Edit the home page (or the relevant template) to include the banner HTML from §3.
6. **(30 min) Verify redirects.** Run the §5 curl commands. Paste a sample of 3 redirects' output in the PR description.
7. **(15 min) Patch README.md** per §3 (add the paid-services breadcrumb sentence after the dsaf.dev canonical citation).
8. **(15 min) Author `internal/branding/brand-decoupling-domain-decision.md`** per §3.
9. **(15 min) Author `internal/branding/brand-decoupling-domain-decision.md`** per §3 (populate the URL inventory table from Step 2).
10. **(15 min) Add CODEOWNERS entries.** Either `.github/CODEOWNERS` or repo-root `CODEOWNERS` — add `internal/branding/` patterns pointing to founder + a placeholder line for future co-maintainer (FR-GOV-002 will populate the second name).
11. **(15 min) PR description.** Include: URL count, decisions, curl output, banner screenshot.

---

## §7 — Dependencies

- **Upstream:**
  - **FR-BRAND-001** (dsaf.dev minted + DNS + landing page) — the destination domain must exist before redirects can resolve.
  - **FR-BRAND-002** (handle taxonomy) — migrate-and-rewrite decisions apply the taxonomy (no `Framework` noun-handle in migrated copy).
  - **FR-CORE-004** (self-audit cap) — migrate-and-rewrite decisions apply the L3 cap rule (no "84.6%" / "L5" claims in migrated copy).
- **Downstream blocks:**
  - **FR-DOCS-001** (README rewrite) — the README's final form references dsaf.dev as canonical AND notes that audit-services live separately at audit.cyberskill.world.
  - **FR-FUNNEL-001** (P4 — Cal.com booking) — the paid-funnel CTA lives on dsaf.dev (per FR-FUNNEL-001 §1 rules) but its booking destination is operated by CyberSkill on audit.cyberskill.world; the decoupling defines that boundary.
- **External:**
  - Cloudflare (or whichever edge / DNS provider hosts audit.cyberskill.world) — Bulk Redirects feature OR Page Rules at the relevant tier.
  - The founder's content-edit access to whatever CMS / static site generator hosts audit.cyberskill.world.

---

## §8 — Example payloads

### Example 1: a curl-verified redirect

```bash
$ curl -sI https://audit.cyberskill.world/framework/criteria
HTTP/2 301
date: Fri, 18 May 2026 14:00:00 GMT
location: https://dsaf.dev/criteria
cache-control: max-age=3600
server: cloudflare
```

### Example 2: a `internal/branding/brand-decoupling-domain-decision.md` row (filled at PR land time)

```markdown
| /framework/criteria | /criteria | migrate-and-rewrite | 2026-05-17 | 2027-05-17 |
```

### Example 3: a `internal/branding/brand-decoupling-domain-decision.md` "what it is NOT" entry

```markdown
- It is not "CyberSkill has nothing to do with DSAF." CyberSkill maintains DSAF; the dsaf.dev landing page explicitly says so ("Maintained by [CyberSkill](https://cyberskill.world) and named contributors").
```

### Example 4: a PR description summary

```markdown
## FR-BRAND-004 — decoupling summary

- URL inventory: 12 framework-marketing URLs enumerated on audit.cyberskill.world.
- Decisions: 8 migrate-content + 3 migrate-and-rewrite + 1 keep-on-cyberskill (turns out to be a CyberSkill case study mislabelled as framework content).
- 301 redirects: 11 installed at Cloudflare Bulk Redirects (the 1 keep-on-cyberskill URL has no redirect).
- Verification: 3 sampled curl outputs below (all 301; all Location → dsaf.dev path-matching).
- Banner: installed on audit.cyberskill.world home (screenshot attached).
- Sunset: all 11 redirects set to 2027-05-17 minimum.
- README breadcrumb: added.
- CODEOWNERS: internal/branding/ pointed at founder + placeholder for FR-GOV-002 co-maintainer.
```

---

## §9 — Open questions

All resolved at authoring time:

- **Q1: Decouple the framework and CyberSkill entirely (move framework to a neutral org)?** Resolved → not in this FR. The neutral-org migration is FR-GOV-002 (P2). This FR migrates the *marketing copy*; the *repo* stays under CyberSkill's GitHub org until P2.
- **Q2: Why not just put the framework on a sub-domain like dsaf.cyberskill.world?** Resolved → the plan §"What NOT to do" item 4 calls this the "half-measure" failure mode. The whole point is to separate the brand. A CyberSkill sub-domain still reads as CyberSkill's framework.
- **Q3: 12 months too long? Old URLs probably die in 6 months naturally.** Resolved → 12 months is the floor. Citations in conference slides, archived PDFs, and Twitter screenshots persist for years. The cost of maintaining redirects is near-zero (Cloudflare Bulk Redirects is free); the cost of dropping a citation prematurely is the loss of a high-quality inbound link.
- **Q4: What about archived / wayback-machine versions of audit.cyberskill.world that show the old framework pages?** Resolved → out of scope. We don't control web.archive.org. The redirect is for *live* inbound traffic; archived snapshots are historical artifacts that future readers should understand as such.
- **Q5: If a user types audit.cyberskill.world thinking they want the framework, does the redirect chain confuse them?** Resolved → no, the banner on audit.cyberskill.world home explicitly says "DSAF (the framework) now lives at dsaf.dev." The redirect chain is direct (one 301 hop); search results update over time.
- **Q6: Should the CyberSkill team get a dedicated page on dsaf.dev (e.g., dsaf.dev/maintainers/cyberskill)?** Resolved → not in this FR. The dsaf.dev landing page's footer mentions CyberSkill as the maintainer; a separate maintainers page can be added when other maintainers join (post-FR-GOV-002). Premature page creation is out of scope.
- **Q7: SEO impact during the migration window?** Resolved → 301 redirects are the standard SEO-preserving migration pattern. Search engines update indices over 4–8 weeks; PageRank signals transfer cleanly via 301. Short-term SEO dip is normal; the long-term gain is dsaf.dev becoming the canonical-cited URL.

---

## §10 — Failure modes inventory

| Failure | Detection | Outcome | Recovery |
|---|---|---|---|
| Redirect installed before destination on dsaf.dev exists | AC8 curl returns 404 | Users land on broken page | Block §6 step 4 on §6 step 3 completion; verify destinations BEFORE installing redirects |
| 302 used instead of 301 | AC6 curl shows 302 | Search engines don't update indices | Change Cloudflare rule to 301; re-verify |
| Blanket redirect (`/* → /`) installed instead of path-matching | AC7 inspection | Users lose path context; SEO scrambles | Replace with per-URL rules at Cloudflare Bulk Redirects |
| Operator deletes old page on audit.cyberskill.world before installing redirect | inbound link → 404 | Citation graph breaks for 4–8 weeks | Restore page or install redirect immediately; if page is unrecoverable, install redirect to dsaf.dev anyway (better than 404) |
| Banner accidentally removed during a CMS edit | spot-check | Users typing audit.cyberskill.world don't see the framework breadcrumb | Re-add banner; consider CMS-level lock or CI gate on the page template |
| Cloudflare Bulk Redirects hits the free-tier limit | rule-add fails | Some redirects not installed | Cloudflare free tier supports 100+ bulk redirects; if exceeded, upgrade plan OR consolidate redirects (Page Rules with regex) |
| 12-month sunset triggers prematurely (operator misreads date) | redirect goes offline | Inbound link → 404 mid-window | Re-install redirect immediately; document the slip; tighten sunset-procedure approval (founder approval required) |
| audit.cyberskill.world goes offline entirely (DNS or infrastructure issue) | Cloudflare alert | All framework-redirects + audit-services break | Cloudflare's high availability handles transient outages; for prolonged outage, dsaf.dev's landing page becomes the de-facto canonical (no redirect needed since the source is down) |
| Operator forgets a URL during enumeration | post-launch monitoring shows 404s on audit.cyberskill.world | Citation graph drops that URL | Add the redirect retroactively; update `internal/branding/brand-decoupling-domain-decision.md`; sunset 12 months from the *retroactive* install date, not the FR ship date |
| Future content posted on audit.cyberskill.world that is framework-marketing | manual review | Decoupling rule violated | CODEOWNERS gate on `internal/branding/brand-decoupling-domain-decision.md` catches at PR review; reviewer rejects the placement; content moves to dsaf.dev |
| Bulk-redirect rule conflict between framework-marketing URLs and audit-services URLs (e.g., overlapping path prefixes) | testing | Some audit-services pages incorrectly redirect | Use Cloudflare's rule-priority feature; framework-marketing rules listed first, audit-services rules as exclusions if necessary |
| CyberSkill rebrand (hypothetical future) — the domain `cyberskill.world` changes | catastrophic | All redirects break | Out of scope; if it happens, FR-BRAND-005 (post-launch placeholder) handles the migration to the new domain |

---

## §11 — Implementation notes

- **Bulk-redirect tooling matters.** Cloudflare Bulk Redirects is purpose-built for this and free. Page Rules can also work but are limited to 3 free / 20 paid; Bulk Redirects supports 100s. If audit.cyberskill.world is hosted elsewhere (Vercel, Netlify, GitHub Pages), each platform has its own redirect-config mechanism — the rule shape is identical, the tooling differs.
- **Why path-matching is non-negotiable:** the value of the redirect is that a user who clicked an old link lands on the *equivalent* new page, not the home. The cost (~15 min per URL to configure) is trivial against the value (every citation preserves its semantic destination).
- **About the banner persistence:** 12 months is the floor. The banner can stay indefinitely if it doesn't degrade the audit-services site's UX. The cost of a one-line banner is zero; the value of breadcrumbing the framework's home is the user who types the old URL by habit two years later.
- **About migrate-and-rewrite vs migrate-content:** the *rewrite* is where FR-BRAND-002 (taxonomy) and FR-CORE-004 (cap rule) get applied at content level. A page that said "CyberSkill's industry-leading DSAF Framework scores its design system at 84.6%" becomes "DSAF Criteria with CyberSkill's L3-capped worked example" after the migrate-and-rewrite. The new content lives on dsaf.dev with new framing; the old content (still on audit.cyberskill.world until the redirect lands) is deprecated within the 12-month window.
- **About the keep-on-cyberskill decisions:** some content that *looks* like framework-marketing is actually audit-services case studies. A page titled "How CyberSkill audited Polaris" is a CyberSkill case study, not framework-marketing — it stays on audit.cyberskill.world (with cross-link to the relevant DSAF criterion on dsaf.dev). The judgement call is: does this page describe DSAF (framework) or describe what CyberSkill did with DSAF (services)?
- **CODEOWNERS placeholder for FR-GOV-002:** the second name in CODEOWNERS for `internal/branding/` is a placeholder until FR-GOV-002 (P2) names the co-maintainer. The placeholder is acceptable per AUTHORING §3.1 rule 3; the CODEOWNERS file's line reads `internal/branding/ @CyberSkill/founder @CyberSkill/co-maintainer-placeholder-fr-gov-002`.
- **The 12-month redirect monitoring loop is operationally important.** Cloudflare Analytics provides per-rule hit counts. Set a quarterly calendar reminder to check redirect traffic and decide on extensions / sunsets. The operational burden is ~30 minutes per quarter for the full inventory.
- **About FR-FUNNEL-001 coordination (P4):** when the paid-funnel CTA ships on dsaf.dev, the booking flow links to a Cal.com instance (per FR-FUNNEL-001 §1). The Cal.com URL is fronted by CyberSkill (the booking is for CyberSkill's audit services); the booking destination crosses the dsaf.dev → audit.cyberskill.world boundary via an explicit cross-link, not a co-host. This is the model: dsaf.dev hosts the funnel surface; audit.cyberskill.world fulfils the booking. The decoupling rule lets the two cooperate without brand-tangling.

---

*End of FR-BRAND-004.*
