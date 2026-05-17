# DSAF canonical landing site

`landing/` is the source-of-truth folder for the public site served at **`https://dsaf.dev`**.
It is the operator-facing landing — hero, the DSAF-25 Core card, the L0–L5 ladder, the self-audit cap explainer, and the launch blog posts.

This folder is intentionally framework-only:

- No paid-service CTA, pricing, or sales form lives here.
- No CyberSkill audit-services copy lives here.
- No third-party analytics, no email-capture form.

CyberSkill audit-services content (if any) lives on `audit.cyberskill.world` and is published from a different project — never from this folder. See [`docs/branding/decoupling-decision.md`](../docs/branding/decoupling-decision.md) and [`docs/branding/url-redirect-map.md`](../docs/branding/url-redirect-map.md).

## Structure

```
landing/
├── index.html                       hero + tiles + DSAF-25 SVG + L0–L5 ladder + self-audit cap
├── card/index.html                  /card sub-route — standalone DSAF-25 card view
├── blog/
│   ├── launch-2026.md               FR-DOCS-003 launch post
│   └── co-maintainer-announcement.md FR-GOV-002 announcement template
├── .well-known/security.txt         RFC 9116 contact + expiry
├── vercel.json                      security headers + cache rules (no redirects — landing is canonical)
└── README.md                        this file
```

## Verify locally

```bash
# Visual smoke test
open landing/index.html
open landing/card/index.html

# Headers (when deployed)
curl -sI https://dsaf.dev/ | grep -iE 'strict-transport-security|content-security-policy'

# Card route
curl -sI https://dsaf.dev/card | grep -i '^HTTP'

# security.txt
curl -s https://dsaf.dev/.well-known/security.txt
```

## Deploy contract

- **Deploy target:** the `landing/` folder is the build root for the static deployment hosting `dsaf.dev`.
- **Format:** plain HTML/CSS only. No build step. No JavaScript on the landing page (the SVGs are inline).
- **Performance budget:** the landing page MUST score ≥ 95 on Lighthouse across all four pillars (Performance, Accessibility, Best Practices, SEO).
- **HSTS preload:** `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` (eligible for `hstspreload.org` submission).
- **No analytics in P0:** revisit alongside FR-BENCH-001 with a privacy-respecting choice.

## Why no redirect lives here anymore

Earlier drafts of this folder shipped a catch-all `301 → dsaf.dev` so the old `audit.cyberskill.world` deployment forwarded everything to the new domain. With `landing/` itself becoming the canonical deploy target for `dsaf.dev`, that redirect would loop. The redirect contract for the old subdomain (whether to keep, drop, or repurpose it) is documented in [`../docs/branding/url-redirect-map.md`](../docs/branding/url-redirect-map.md).

*End of canonical landing README.*
