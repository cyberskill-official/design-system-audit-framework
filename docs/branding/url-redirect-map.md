# DSAF — URL redirect map

**Status:** OPERATOR OVERRIDE — redirect dropped 2026-05-18. Rows below retained as historical record of the rule set FR-BRAND-004 §3 would have installed.
**Scope:** every framework-marketing URL that previously lived on `audit.cyberskill.world`. Under the override, those URLs are no longer redirected to `dsaf.dev` — they 404 (or whatever the old subdomain's hosting returns).
**Original sunset floor:** **2027-05-17** — voided by the override; rows below are no longer active rules.

## Operator override (2026-05-18)

The 12-month minimum redirect specified by FR-BRAND-004 §1 #4 has been **dropped** by founder decision in the canonical-landing rebuild. The `landing/` folder is now the deploy target for `dsaf.dev` itself; the previous `landing/` redirect shim (catch-all 301 → `dsaf.dev`) has been removed from `landing/vercel.json` because keeping it would cause a redirect loop on the new canonical deployment.

Trade-off accepted:

- **Lost:** SEO + citation continuity from inbound links pointing at `audit.cyberskill.world/...`. Search engines drop the old URLs from indices over 6–12 months instead of inheriting their authority on `dsaf.dev`.
- **Gained:** clean separation. No risk of the old subdomain leaking CyberSkill-as-author framing back into DSAF surfaces. No infra cost to maintain redirect rules.

The FR-BRAND-004 spec markdown is unchanged. This file documents the override. The FR's audit history remains the authority on what was specified; this file is the authority on what shipped.

## Original FR-BRAND-004 redirect rules (NO LONGER ACTIVE — historical only)


## Decoupling rule

Per [`decoupling-decision.md`](decoupling-decision.md) and FR-BRAND-004 §1:

- **Framework-marketing** content lives at `dsaf.dev` (and never on `audit.cyberskill.world`).
- **CyberSkill audit services** content lives at `audit.cyberskill.world` (and never on `dsaf.dev`).
- The two surfaces co-exist under the same parent corp; the line is **content topic**, not domain ownership.

Forward-only: new framework-marketing content is born on `dsaf.dev`; new audit-services content is born on `audit.cyberskill.world`. The redirects below cover *pre-decoupling* URLs only.

## Cutover invariant

A framework-marketing URL on `audit.cyberskill.world` MUST NOT be deleted before its 301 redirect is installed and verified. Failing this rule produces 404 storms for inbound links during the cutover window.

## Redirect map (HTTP 301, permanent)

**Original plan (now voided):** ship a path-preserving catch-all in `dsaf.dev/_redirects` covering every framework-marketing URL with one rule pair:

```
https://audit.cyberskill.world/*  https://dsaf.dev/:splat  301
http://audit.cyberskill.world/*   https://dsaf.dev/:splat  301
```

The `dsaf.dev/` folder was deleted in the 2026-05-18 canonical-landing rebuild. The catch-all is no longer installed. Path-preserving redirects from `audit.cyberskill.world` to `dsaf.dev` do not exist.

The known inventory of framework-marketing URLs that exist (or existed) on `audit.cyberskill.world` and the decision per URL:

| # | Old URL (audit.cyberskill.world) | Decision | New URL (dsaf.dev) | Notes |
|---:|---|---|---|---|
| 1 | `/` (root) | migrate-and-rewrite | `https://dsaf.dev/` | Old root carried CyberSkill-as-author framing; new root is the neutral landing |
| 2 | `/framework` | migrate-and-rewrite | `https://dsaf.dev/` | Old page was the framework's marketing landing; folded into the new neutral landing |
| 3 | `/framework/criteria` | migrate-content | `https://dsaf.dev/criteria` | Sub-path reserved for the public criteria index (P2+ surface, behind the catch-all) |
| 4 | `/framework/levels` | migrate-content | `https://dsaf.dev/levels` | Sub-path reserved for the L0–L5 ladder explainer (P2+ surface) |
| 5 | `/framework/dsaf-25` | migrate-content | `https://dsaf.dev/card` | The DSAF-25 Core card moves to `dsaf.dev/card` |
| 6 | `/blog/*` (framework posts only) | migrate-content | `https://dsaf.dev/blog/:slug` | Framework blog posts on the old site become posts on `dsaf.dev/blog/` |
| 7 | `/services/*` | keep-on-cyberskill | (no redirect) | Audit-services pages stay on `audit.cyberskill.world` — paid services are not framework-marketing |
| 8 | `/pricing` | keep-on-cyberskill | (no redirect) | Pricing is audit-services; stays on `audit.cyberskill.world` |
| 9 | `/contact` | keep-on-cyberskill | (no redirect) | Contact form is audit-services lead capture; stays on `audit.cyberskill.world` |
| 10 | `/about` | keep-on-cyberskill | (no redirect) | CyberSkill corporate "about" stays on `audit.cyberskill.world` |

The path-preserving catch-all in `_redirects` covers rows 1–6 with a single rule pair. Rows 7–10 stay on `audit.cyberskill.world` and are NOT covered by the catch-all because they are not framework-marketing.

## Breadcrumb banner on `audit.cyberskill.world` — VOIDED by override

The FR-BRAND-004 §1 #5 banner is no longer in scope. With the redirect dropped, the old subdomain may continue to serve unrelated CyberSkill content, may be parked, or may resolve to nothing. It is no longer a framework-marketing surface. If the operator later chooses to host CyberSkill audit-services content on `audit.cyberskill.world`, that content does NOT mention DSAF, link to DSAF, or imply any framework relationship.

## Verification (run at cutover and again at T+24h, T+7d, T+30d, T+90d)

```bash
# Each known framework-marketing URL on the old site MUST 301 to its dsaf.dev counterpart.
for path in / /framework /framework/criteria /framework/levels /framework/dsaf-25 /blog/dsaf-launch; do
  printf '%-40s ' "audit.cyberskill.world${path}"
  curl -sI "https://audit.cyberskill.world${path}" \
    | awk 'BEGIN{loc="";stat=""} /^HTTP\//{stat=$2} /^[Ll]ocation:/{loc=$2} END{print stat" -> "loc}'
done

# Paid-services URLs MUST stay on audit.cyberskill.world (no redirect).
for path in /services /pricing /contact /about; do
  printf '%-40s ' "audit.cyberskill.world${path}"
  curl -sI "https://audit.cyberskill.world${path}" \
    | awk 'BEGIN{stat=""} /^HTTP\//{stat=$2} END{print stat}'
done

# Catch-all sanity: a previously-unknown framework subpath also redirects.
curl -sI "https://audit.cyberskill.world/framework/random-deep-link" \
  | grep -iE 'HTTP|location'
```

Each verification run is logged below.

## Traffic + sunset log

| Verification date | Owner | 301-rules verified | Banner present | Notes |
|---|---|---|---|---|
| 2026-05-17 | Stephen Cheng | (pending — verify on cutover) | (pending) | Repo artifacts shipped; cutover blocked on FR-BRAND-001 domain purchase |

A redirect rule MAY retire after 12 months IF the per-rule traffic falls below 1 hit/week. Rules with sustained traffic stay live indefinitely. Decision per rule is recorded above in the per-row "Notes" column.

## Out-of-scope

This file does NOT cover:

- Inbound links from third-party sites (Twitter threads, Slack DMs, archived PDFs, conference slides) — those will follow the 301 chain automatically and don't need separate rules.
- Email forwarding (`hello@dsaf.dev`) — see [`domain-decision.md`](domain-decision.md).
- DNS-level CAA / MX / DMARC — see [`domain-decision.md`](domain-decision.md).
- Future *new* content under `dsaf.dev/blog/`, `dsaf.dev/criteria/`, `dsaf.dev/integrations/` — these are born-on-dsaf.dev and do not have legacy URLs to redirect from.

## CODEOWNERS

Per FR-BRAND-004 §1 #13, both this file and `decoupling-decision.md` are CODEOWNERS-gated. A future co-maintainer (post-FR-GOV-002) is added as a second owner so the next change to the framework/services boundary requires two-person review.

*End of URL redirect map.*
