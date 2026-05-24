# DSAF canonical landing site

`landing/` is the source-of-truth folder for the public site served at **`https://audit.cyberskill.world`**.
It is the operator-facing landing — hero, the DSAF-25 Core card, the L0–L5 ladder, the self-audit cap explainer, and the launch blog posts.

This folder is intentionally framework-only:

- No paid-service CTA, pricing, or sales form lives here.
- No CyberSkill audit-services copy lives here.
- No third-party analytics, no email-capture form.

CyberSkill audit-services content (if any) lives on `audit.cyberskill.world` and is published from a different project — never from this folder. See [`internal/branding/brand-decoupling-domain-decision.md`](../branding/brand-decoupling-domain-decision.md).

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
curl -sI https://audit.cyberskill.world/ | grep -iE 'strict-transport-security|content-security-policy'

# Card route
curl -sI https://audit.cyberskill.world/card | grep -i '^HTTP'

# security.txt
curl -s https://audit.cyberskill.world/.well-known/security.txt
```

## Deploy contract

- **Deploy target:** the `landing/` folder is the build root for the static deployment hosting `audit.cyberskill.world`.
- **Format:** plain HTML/CSS only. No build step. No JavaScript on the landing page (the SVGs are inline).
- **Performance budget:** the landing page MUST score ≥ 95 on Lighthouse across all four pillars (Performance, Accessibility, Best Practices, SEO).
- **HSTS preload:** `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` (eligible for `hstspreload.org` submission).
- **No analytics in P0:** revisit alongside FR-BENCH-001 with a privacy-respecting choice.

## Why no redirect lives here

`audit.cyberskill.world` is the canonical host. The `landing/` folder is its build root. No redirect rules ship from here — the site IS the destination. The history of the earlier "move to a neutral domain" plan is preserved in [`../branding/brand-decoupling-domain-decision.md`](../branding/brand-decoupling-domain-decision.md) as historical record.

*End of canonical landing README.*
