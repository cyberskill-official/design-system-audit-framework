# DSAF deploy runbook

**Status:** operational. **Canonical host:** `https://audit.cyberskill.world/` (Vercel). **Source folder:** [`landing/`](../../../apps/landing).

## §1 — What's live

The `landing/` folder is deployed via Vercel and serves at `https://audit.cyberskill.world/`. This is the canonical, stable URL — no domain migration is planned. See [`internal/branding/domain-decision.md`](../branding/brand-decoupling-domain-decision.md) for the rationale.

### Routes

| Path | Source | Notes |
|---|---|---|
| `/` | `landing/index.html` | Hero, tiles, DSAF-25 SVG, L0–L5 ladder, cap table |
| `/card` | `landing/card/index.html` | Standalone DSAF-25 Core card |
| `/blog/launch-2026` | `landing/blog/launch-2026.md` | TASK-DOCS-003 launch post (rendered post-build — see OPS-004) |
| `/blog/co-maintainer-announcement` | `landing/blog/co-maintainer-announcement.md` | TASK-GOV-002 template |
| `/.well-known/security.txt` | `landing/.well-known/security.txt` | RFC 9116 |
| `/robots.txt`, `/sitemap.xml` | `landing/robots.txt`, `landing/sitemap.xml` | SEO |

### Security headers (configured in `landing/vercel.json`)

- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `Content-Security-Policy: default-src 'self'; …`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`

## §2 — Standard deploy flow

A Vercel project is already wired to the GitHub repo. Pushes to `main` deploy to production; PRs get preview URLs.

```bash
# Preview locally before pushing
open landing/index.html
open landing/card/index.html

# Push
git add landing/ docs/ assets/
git commit -m "landing: <change>"
git push origin main

# Vercel auto-deploys; verify via §3 commands
```

## §3 — Verification commands

Run after every deploy:

```bash
# Apex 200 + HSTS
curl -sI https://audit.cyberskill.world/ | grep -iE 'HTTP|strict-transport-security|content-security-policy'

# Canonical + OG metadata
curl -s https://audit.cyberskill.world/ | grep -E 'rel="canonical"|og:url|og:title'

# Card route
curl -sI https://audit.cyberskill.world/card | head -1

# security.txt + robots + sitemap
curl -s https://audit.cyberskill.world/.well-known/security.txt
curl -s https://audit.cyberskill.world/robots.txt
curl -s https://audit.cyberskill.world/sitemap.xml | head -10

# Lighthouse — target ≥ 95 all four pillars
npx unlighthouse https://audit.cyberskill.world/
```

## §4 — Outstanding ops gaps (agent-pickup queue)

These are tasks any AI agent with repo access can pick up. Each has a deliverable path and an acceptance criterion. Status flips from `todo` to `done` in the same PR that lands the deliverable.

| ID | Gap | Deliverable | Status |
|---|---|---|---|
| OPS-001 | No CI runs link-check / Lighthouse on PR | `.github/workflows/landing-ci.yml` (link check via `scripts/checks/check-links.mjs`; Lighthouse against the Vercel preview URL; fail PR if < 95 on any pillar) | todo |
| OPS-002 | No analytics decision logged | `internal/ops/analytics-decision.md` — choose Plausible self-hosted on a Cloudflare Worker OR document "no analytics in P0" deferral until TASK-BENCH-001 P4 | todo |
| OPS-003 | No OG image | `landing/og-image.png` 1200×630, no CyberSkill marks; wire into `<meta property="og:image">` in both HTMLs | todo |
| OPS-004 | Blog posts render as raw markdown on Vercel | `scripts/bin/render-blog.mjs` that turns `landing/blog/*.md` into `landing/blog/*.html` at build time; wire into Vercel build command | todo |
| OPS-005 | No favicon | `landing/favicon.svg` (single-file, currentColor for dark/light); `<link rel="icon" type="image/svg+xml" href="/favicon.svg">` in both HTMLs | todo |
| OPS-006 | HSTS preload submission not done | Submit `audit.cyberskill.world` at `hstspreload.org`; log accepted date in this runbook §5 | todo (operator) |
| OPS-007 | No `info@cyberskill.world` smoke-test in repo | Append a `## §5 — Activation log` block to this runbook with the date the contact-form smoke-test passed | todo (operator) |

## §5 — Activation log

_Append rows as gates pass._

| Date | Gate | Owner | Evidence |
|---|---|---|---|
| 2026-05-18 | Vercel deploy live at `audit.cyberskill.world` | operator | (see Vercel project) |

*End of deploy runbook.*
