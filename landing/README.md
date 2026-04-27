# Landing page — audit.cyberskill.world

> Single-file static site for CyberSkill's audit services landing page. No build step. Zero JavaScript. Zero dependencies. Deploys to Vercel in 30 seconds.

## What's here

| File | Purpose |
|---|---|
| `index.html` | The complete landing page — HTML + inlined CSS, ~28 KB |
| `vercel.json` | Vercel deploy config: cleanUrls, security headers, cache directives |
| `README.md` | This file |

That's it. The page is intentionally a single static file:

- **No JavaScript** — works without JS, fully accessible to keyboard users + screen readers
- **No build step** — drag and drop deploys
- **Inlined CSS** — single round-trip, instant render
- **Mirrors the CyberSkill design system** — Umber + Ochre brand colours, system-stack typography (with Be Vietnam Pro fallback), 4 / 8 spacing scale, all sourced from the doctrine

## Visual design

Mirrors CyberSkill's design language using inlined token values:

- **Brand colours:** Umber `#45210E` (primary), Ochre `#F4BA17` (accent), Warm-white `#FAF6F1` (background)
- **Typography:** Be Vietnam Pro (display, with system stack fallback), system stack (body), JetBrains Mono (code)
- **Spacing:** 4/8 base scale (per Part 2 §3 of the doctrine)
- **Voice:** warm · direct · honest · respectful (per Part 1 §3)

The page supports automatic dark mode via `prefers-color-scheme: dark`. WCAG AA compliant on both modes (verified against the doctrine's APCA contrast values).

## Deploy

### One-time setup (5 minutes)

1. Make sure the framework repo is pushed to GitHub at `cyberskill-official/design-system-audit-framework`.
2. Go to https://vercel.com/new
3. Import the framework repo
4. **Root directory:** set to `landing/` (this is the key step — Vercel deploys this folder, not the whole repo)
5. **Framework preset:** "Other" (no build needed)
6. **Build command:** leave empty
7. **Output directory:** leave empty (defaults to root)
8. **Install command:** leave empty
9. Click **Deploy**

Vercel deploys to a temporary URL like `cyberskill-audit-abc.vercel.app` immediately.

### Custom domain (audit.cyberskill.world)

1. In the Vercel project: **Settings → Domains → Add**
2. Enter: `audit.cyberskill.world`
3. Vercel shows the DNS record to add. Typically:
   - **Type:** CNAME
   - **Name:** `audit`
   - **Target:** `cname.vercel-dns.com`
4. Add this record to your Cloudflare (or wherever cyberskill.world is hosted)
   - **Important:** if Cloudflare, set the proxy status to "DNS only" (orange cloud OFF). Otherwise Vercel SSL provisioning fails.
5. Wait 1–5 min for DNS propagation, then 1–5 min for Vercel to provision SSL via Let's Encrypt.

After both, `https://audit.cyberskill.world` serves the page.

### Verify

```bash
curl -I https://audit.cyberskill.world
```

Expected:
```
HTTP/2 200
content-type: text/html; charset=utf-8
strict-transport-security: max-age=63072000; includeSubDomains; preload
x-content-type-options: nosniff
x-frame-options: DENY
referrer-policy: strict-origin-when-cross-origin
content-security-policy: default-src 'self'; ...
```

The security headers come from `vercel.json`.

## Local preview

To preview the page before deploying:

```bash
# Option 1: open directly (most browsers handle this fine)
open landing/index.html

# Option 2: serve with any static server
npx serve landing/
# OR
python3 -m http.server 8000 -d landing/
```

For accurate testing of the security headers + cache behaviour, use Vercel's local CLI:

```bash
npm i -g vercel
cd landing/
vercel dev
```

Vercel-dev runs the same edge config locally on port 3000.

## Smoke-test checklist (before going public)

- [ ] `https://audit.cyberskill.world` loads in under 1.5s (LCP)
- [ ] All `mailto:` links open the user's mail client correctly
- [ ] Header navigation links scroll to the right sections
- [ ] FAQ items expand / collapse on click + on Enter key
- [ ] Page renders correctly on iOS Safari, Android Chrome, Desktop Chrome / Firefox / Safari
- [ ] Dark mode renders correctly when OS is in dark mode
- [ ] No console errors (check Devtools Console)
- [ ] WCAG axe scan: 0 critical / 0 serious violations
- [ ] Tab navigation works through every interactive element in logical order
- [ ] Skip link appears and works on first Tab keypress
- [ ] Lighthouse score: ≥ 95 across all four categories (Performance, Accessibility, Best Practices, SEO)
- [ ] Open Graph preview renders correctly when shared on LinkedIn / Twitter (use https://www.opengraph.xyz/ to test)

If any item fails, fix it before announcing publicly. A buggy landing page costs more credibility than waiting another day.

## Maintenance

The page is meant to be **stable**. Update it when:

- Pricing changes (Tier 1, Tier 2, Tier 3, Tier 4 anchors in `index.html`)
- New service tier added
- Email address changes (search for `info@cyberskill.world` and update)
- Major framework version released (update version mentions if any)

Otherwise, leave it alone. The less you touch a stable landing page, the more reliable it is.

## Why this approach

We considered Astro, Next.js, Vite + React, Webflow, Framer. Decided on plain HTML + inlined CSS because:

| Property | Plain HTML wins | Modern stack wins |
|---|---|---|
| Initial load time | ✓ ~50ms LCP | Adds 100–500ms hydration |
| Build complexity | ✓ Zero | Adds tooling, lockfiles, build cache |
| Deploy time | ✓ ~10 sec | 30–120 sec |
| Maintenance | ✓ Just edit HTML | Framework updates, dependency churn |
| SEO | ✓ Pure HTML, instant indexing | Sometimes hydration delays SEO |
| Accessibility | ✓ Works without JS by design | Requires care to not break SR support |

The page is a marketing surface, not an app. The complexity of a modern stack adds nothing here.

## Provenance

- **Built by:** CyberSkill, 2026-04-27
- **Voice / brand:** mirrors CyberSkill design system (Part 1 §2 anchors immutable, Part 1 §3 voice principles)
- **Tokens:** inlined from `cyberskill-official/design-system-audit-framework`'s case-study reference values
- **Page structure:** based on `Launch/10-landing-page-content.md` content brief

If the page needs to be re-skinned for a different brand (e.g., a vertical pack microsite), the design tokens at the top of the `<style>` block are the only thing you'd change.
