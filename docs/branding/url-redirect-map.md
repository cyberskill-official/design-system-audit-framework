# DSAF — URL redirect map

**Status:** historical. **No redirects are installed.** This file is preserved as the record of what was originally planned.
**Current canonical URL:** `https://audit.cyberskill.world/` (per [`domain-decision.md`](domain-decision.md)).

## Why this file exists if no redirects are live

The original FR-BRAND-004 plan was:

1. Mint a neutral `dsaf.dev` domain (per FR-BRAND-001).
2. Move framework-marketing content off `audit.cyberskill.world` to `dsaf.dev`.
3. Install a path-preserving 301 redirect from the old subdomain to the new one for at least 12 months.
4. Add a breadcrumb banner on the old subdomain pointing at the new home.

Two successive operator overrides reduced this to nothing:

- **Override 1 (2026-05-17):** dropped the 301 redirect from `audit.cyberskill.world` to `dsaf.dev`, accepting the lost-citation-graph trade-off.
- **Override 2 (2026-05-18):** dropped the neutral-domain plan entirely. `audit.cyberskill.world` IS the canonical URL — no migration is happening, so there is nothing to redirect from or to.

The file is retained because the FR specs (FR-BRAND-001, FR-BRAND-004) still describe the original plan as historical record. A future operator deciding to revive the neutral-domain plan can use the structure below as a starting point.

## Original FR-BRAND-004 redirect rules (NOT INSTALLED — historical only)

Had the migration happened, these are the rules that would have shipped:

| # | Old URL (audit.cyberskill.world) | Action | New URL (neutral domain) |
|---:|---|---|---|
| 1 | `/` (root) | migrate-and-rewrite | apex |
| 2 | `/framework` | migrate-and-rewrite | apex |
| 3 | `/framework/criteria` | migrate-content | `/criteria` |
| 4 | `/framework/levels` | migrate-content | `/levels` |
| 5 | `/framework/dsaf-25` | migrate-content | `/card` |
| 6 | `/blog/*` (framework posts only) | migrate-content | `/blog/:slug` |
| 7 | `/services/*` | keep-on-cyberskill | (no migration) |
| 8 | `/pricing` | keep-on-cyberskill | (no migration) |
| 9 | `/contact` | keep-on-cyberskill | (no migration) |
| 10 | `/about` | keep-on-cyberskill | (no migration) |

## Future re-evaluation

If the neutral-domain plan is revived (e.g. because named reviewers cite the URL as a credibility problem — see [`decoupling-decision.md`](decoupling-decision.md) "Re-evaluation trigger"), this file becomes live again. Until then it's archive.

*End of URL redirect map (historical).*
