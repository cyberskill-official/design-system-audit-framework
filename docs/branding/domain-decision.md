# DSAF domain decision

**Status:** repo-ready, external activation pending.
**FR:** FR-BRAND-001.
**Decision date:** 2026-05-17.
**Canonical URL:** `https://dsaf.dev`.

## Decision

DSAF uses `dsaf.dev` as the canonical public URL.
The fallback order is:

1. `dsaf.dev`
2. `designsystemaudit.org`
3. `dsaf.org`
4. `dsaf.community`

The repo ships the static site under [`landing/`](../../landing/) so the deploy target can be connected as soon as the domain is purchased.
Until the registrar purchase is complete, this document is the source of truth for the intended canonical domain and deployment checklist.

> **Deploy target rename (2026-05-18):** the canonical landing folder was renamed from `dsaf.dev/` to `landing/` during the rich-landing rebuild. Same content goal (canonical site for the `dsaf.dev` domain), different folder name for clarity — `landing/` reads as "the landing site" rather than as a folder mirroring a domain. Build root for the `dsaf.dev` deployment is now `landing/`.

## DNS checklist

| Record | Name | Value | Purpose |
|---|---|---|---|
| `CNAME` or flattened apex | `@` | deploy target | Static site |
| `CAA` | `@` | `0 issue "letsencrypt.org"` | Certificate authorization |
| `CAA` | `@` | `0 issue "pki.goog"` | Certificate authorization |
| `MX` | `@` | forwarding provider | `hello@dsaf.dev` |
| `TXT` | `_dmarc` | `v=DMARC1; p=none; rua=mailto:hello@dsaf.dev` | Mail monitoring |

HTTPS-only, HSTS, and security headers are configured in [`landing/vercel.json`](../../landing/vercel.json).

## Registrar controls

| Control | Requirement |
|---|---|
| Registrar | Cloudflare Registrar preferred |
| WHOIS privacy | Required |
| 2FA | Hardware security key plus backup key |
| Auto-renew | Required |
| Renewal owner | Stephen Cheng |
| Escalation path | CyberSkill password vault, one named co-admin with renewal-only access |

## Trademark pre-clearance

The operator must run USPTO and EUIPO searches for:

- `DSAF`
- `Design System Audit Framework`

Search classes:

- 9: software
- 35: consultancy / advertising
- 42: technology consulting

No conflicting mark is recorded in this repo.
The live purchase PR should paste the search date, query URLs, and clearance note here before the domain is connected.

## Handle reservations

| Channel | Target handle | Status |
|---|---|---|
| GitHub | `dsaf` or `dsaf-framework` | pending reservation |
| X/Twitter | `@dsaf_dev` | pending reservation |
| LinkedIn | `DSAF` | pending reservation |
| Mastodon | `@dsaf@hachyderm.io` | pending reservation |

Reservation evidence belongs in the PR description, not this repo, to avoid leaking account screenshots or personal channel metadata.

## Activation checklist

1. Purchase domain with WHOIS privacy enabled.
2. Enroll hardware-key 2FA and backup key.
3. Connect the `landing/` folder as the static deploy target for `dsaf.dev`.
4. Configure DNS records above.
5. Verify `https://dsaf.dev`, `https://www.dsaf.dev`, and `https://dsaf.dev/.well-known/security.txt`.
6. Confirm `curl -I https://dsaf.dev` returns HSTS and security headers.
7. Update this file with registrar purchase date, expiry date, and renewal owner.

## What is intentionally absent

No lead-capture form, paid CTA, pricing, demo booking form, or CyberSkill services pitch appears on the DSAF landing page.
The framework surface stays neutral; commercial conversion belongs on a later, clearly separated funnel path.

*End of domain decision.*
