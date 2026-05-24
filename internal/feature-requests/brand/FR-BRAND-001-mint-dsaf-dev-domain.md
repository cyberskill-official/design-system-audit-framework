---
id: FR-BRAND-001
title: "Mint `dsaf.dev` (or fallback `designsystemaudit.org`) — WHOIS, DNS, basic landing page"
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
related_frs: [FR-BRAND-002, FR-BRAND-003, FR-BRAND-004, FR-DOCS-001, FR-DOCS-003]
depends_on: []
blocks: [FR-BRAND-002, FR-BRAND-004, FR-DOCS-001, FR-DOCS-003, FR-CONTENT-001, FR-BENCH-001]
source_pages:
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Naming, branding, governance)"
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Phase 0 — Pre-launch hardening, action 2)"
source_decisions:
  - "DEC-001: framework brand decoupled from CyberSkill from day one"
  - "DEC-002: URL is the long-term equity store (cf. 12factor.net, dora.dev)"
language: none
service: doctrine + DNS
new_files:
  - dsaf.dev/index.html
  - dsaf.dev/_redirects
  - internal/branding/domain-decision.md
  - internal/branding/FR-BRAND-001-domain-contract.json
  - scripts/domain-contract-lib.mjs
  - scripts/check-domain-contract.mjs
  - scripts/check-domain-contract.test.mjs
modified_files:
  - README.md
  - package.json
allowed_tools:
  - "WHOIS lookup at registrars (Namecheap, Cloudflare, Porkbun)"
  - "purchase domain (Cloudflare Registrar preferred for at-cost pricing)"
  - "DNS edits at Cloudflare"
  - "HTML/CSS edits to dsaf.dev/index.html"
disallowed_tools:
  - "purchase any TLD other than .dev or .org as the canonical (per §11 rationale)"
  - "register any domain that puts CyberSkill in the name (e.g. dsaf-by-cyberskill.com)"
  - "use a domain registrar that requires WHOIS data to be public-with-PII (use registrar's privacy proxy)"
effort_hours: 4
sub_tasks:
  - "1. (30m) WHOIS check dsaf.dev and 3 fallbacks; log results in internal/branding/domain-decision.md"
  - "2. (30m) Purchase the chosen domain via Cloudflare Registrar at-cost; enable WHOIS privacy"
  - "3. (30m) Configure DNS: A/AAAA to Cloudflare Pages (or apex CNAME flattening), CAA records"
  - "4. (1h) Hand-write a static index.html with the README's first 200 words + a single link to the repo"
  - "5. (30m) Push to Cloudflare Pages; verify TLS + HTTP/2 + IPv6"
  - "6. (30m) Add a CNAME `redirect.cyberskill.world` → `dsaf.dev` (12-month back-compat; FR-BRAND-004 ships the reverse redirect)"
  - "7. (30m) Update README.md to reference `dsaf.dev` as the canonical URL"
risk_if_skipped: "Without a canonical neutral URL, the framework's brand stays tangled with CyberSkill's audit-services pitch. Every link to the repo + every cited mention will reinforce 'consultancy with framework' rather than 'framework with consultancy.' URLs outlive repos in citation patterns — see 12factor.net (near-zero GitHub footprint yet universally cited) and dora.dev (the report, not the repo, cemented DORA). Skipping this FR forces a domain mint mid-launch when attention is at peak; the resulting brand split is the worst of both worlds (cf. plan §What NOT to do item 4)."
implementation_kind: mocked
---

**2026-05-18 strict execution note:** stale status was reset and FR-BRAND-001 was re-processed against the current backlog canonical host, `https://audit.cyberskill.world/`. Public deploy checks are live-tested by `npm run contract:domain`. Private registrar/DNS/mail/HSTS-preload requirements are account-bound blockers and are isolated in `internal/branding/FR-BRAND-001-domain-contract.json` with a mock `POST /mock/domain-operations` contract. Backlog state is `shipped + strict-audited + mocked-dependency`.

## §1 — Description (BCP-14 normative)

The framework's canonical URL MUST be `dsaf.dev` (or, if unavailable, the fallback in §1 #2). All external surfaces — README, dsaf.dev landing, social handles, future blog posts, future certification badges — MUST point at the canonical URL as the framework's source of truth.

1. **MUST** mint `dsaf.dev` at Cloudflare Registrar (at-cost pricing, ~$15/year) before any other P0 action that references the URL. If unavailable at WHOIS lookup time, use the fallback list in §1 #2 in priority order. Decision logged in `internal/branding/domain-decision.md` with WHOIS-check date and chosen registrar.
2. **MUST** evaluate fallbacks in this order if `dsaf.dev` is unavailable: (a) `dsaf.dev` via re-attempted purchase from a parker (acceptable up to $500); (b) `designsystemaudit.org` (.org because methodology, not commercial); (c) `dsaf.org`; (d) `dsaf.community`. Reject `.com`, `.io`, `.co` for methodology-repo reasons in §2.
3. **MUST** enable registrar-level WHOIS privacy. The registrant's name and email MUST NOT appear in public WHOIS records — this matters for the geography-headwind mitigation (plan §"Honest critique" item 4): an immediately-Vietnam-identifiable WHOIS is a credibility leak.
4. **MUST** configure DNS at Cloudflare with these records: `A`/`AAAA` apex to Cloudflare Pages (or `CNAME` flattening), `CAA 0 issue "letsencrypt.org"` and `CAA 0 issue "pki.goog"`, `MX` to a single forwarding inbox (`hello@dsaf.dev` → personal inbox), no other open records.
5. **MUST** serve a static `index.html` at the apex that mirrors the README's first 200 words and links to the GitHub repo. The page MUST work with JavaScript disabled, MUST score ≥ 95 on Lighthouse for Performance / Accessibility / Best Practices / SEO, and MUST load in < 800 ms p95 from a cold cache in Singapore (the framework's nearest CDN POP).
6. **MUST** enable HTTPS-only with HSTS preload eligibility (`max-age=63072000; includeSubDomains; preload`). Plain HTTP requests MUST redirect to HTTPS.
7. **MUST** publish a single forwarding inbox `hello@dsaf.dev`. The inbox MUST forward to the founder's personal email and MUST NOT auto-respond.
8. **MUST** add a placeholder `/.well-known/security.txt` per RFC 9116 with the founder's contact email and a 12-month `Expires:` date. The framework will eventually be cited in compliance work; a security.txt now costs nothing and signals seriousness.
9. **MUST** record the domain's purchase date, expiry date, and renewal owner in `internal/branding/domain-decision.md`. Domain expiry is a non-negotiable catastrophic failure (see §10); the owner MUST also configure registrar auto-renew + a second-channel reminder at T-30d.
10. **MUST** update the repository `README.md` to reference `dsaf.dev` as the canonical URL within the same PR that lands this FR. The README MUST NOT reference `audit.cyberskill.world` as canonical anymore (FR-BRAND-004 handles the reverse-redirect from the CyberSkill subdomain).
11. **MUST NOT** put any lead-capture form, paid CTA, or services pricing on `dsaf.dev` in this FR's scope. Those land in FR-FUNNEL-001 (P4 — placeholder, not yet specified) and live on a sub-path that this FR's index.html does not link to. Lead-capture on the framework's landing page is the OSS-trust failure that plan §"What NOT to do" item 1 explicitly forbids. A `mailto:hello@dsaf.dev` link in the page footer is explicitly allowed (it's a passive contact channel, not a form); an HTML `<form>` or `<input type="email">` is explicitly forbidden until FR-FUNNEL-001 ships.
12. **MUST** reserve matching handles on the four channels that move the needle for design-systems work: GitHub org (`dsaf` if free; else `dsaf-framework`), Twitter/X (`@dsaf_dev`), LinkedIn page (`DSAF`), Mastodon `@dsaf@hachyderm.io`. Reserving without populating is acceptable; reserving prevents squatters during the P1 launch window. The reservation evidence MUST be screenshots / handle URLs in the PR description (not in the repo, to avoid leaking the founder's personal channel logins).
13. **MUST** enable two-factor authentication with a hardware security key (FIDO2 / WebAuthn — YubiKey 5 or equivalent) on the registrar account before any domain is purchased. SMS-based 2FA and TOTP-app-only 2FA are explicitly insufficient — domain hijacking via SIM swap and credential phishing is the catastrophic-failure mode in §10 and the hardware key is the only widely-deployed mitigation. Backup keys (a second hardware key, stored physically separately) MUST be enrolled in the same session.
14. **MUST** complete a trademark pre-clearance search before purchase: USPTO TESS (United States) and EUIPO eSearch plus (European Union) for the literal strings "DSAF" and "Design System Audit Framework," both as marks and as exact-word filings, in classes 9 (software), 35 (consultancy / advertising), and 42 (technology consulting). Results MUST be logged in `internal/branding/domain-decision.md` under a "Trademark pre-clearance" subsection with the search date, the queries run, and a one-paragraph clearance opinion. If a conflicting registration surfaces, fall back to the next available name in §1 #2 before purchase — UDRP defence after-the-fact is 5–20× the cost of a fallback domain.
15. **MUST** mitigate the founder-as-single-point-of-failure for renewal access: the registrar credentials MUST live in a CyberSkill-administered password vault (1Password / Bitwarden) with at least one named co-administrator listed in `internal/branding/domain-decision.md` under "Renewal escalation path." The co-administrator's role is *read-only renewal access* — they cannot transfer the domain unilaterally — and the access path MUST be auditable (vault access log). This protects against the founder's hospitalisation / unavailability scenarios in §10 without creating a transfer-risk surface.

---

## §2 — Why this design

**Why `.dev` over `.com` / `.io` / `.org` (§1 #1, #2):** `.dev` is HSTS-preloaded at the TLD level (browser enforces HTTPS regardless of server config), which removes an entire class of MITM concerns. It also signals "developer-oriented methodology" rather than "commercial product," matching the framework's positioning (cf. dora.dev, web.dev). `.com` reads commercial — a liability for a methodology brand. `.io` is overplayed in dev tooling and carries Indian-Ocean-territory political baggage some buyers care about. `.org` is the natural fallback for "methodology, not commercial" — that's the reason it's #2 in the fallback list.

**Why Cloudflare Registrar (§1 #1):** at-cost pricing (no renewal price gouging), WHOIS privacy by default, DNS + Pages + Workers all in one pane, no upsell pressure. Namecheap is acceptable; GoDaddy is rejected for known renewal-price-trap history. Cloudflare Registrar requires DNS to be hosted on Cloudflare, which is fine — that's where we'd want it anyway for HTTPS / HTTP/2 / IPv6 / CDN edge.

**Why WHOIS privacy (§1 #3):** an immediately-Vietnam-identifiable WHOIS record is a credibility leak in the geography-headwind context (plan §"Honest critique" item 4). The framework's neutrality story is about *brand* — the registrant's residence is private and should stay private. WHOIS privacy is the registrar-level equivalent of *not* putting "by CyberSkill" in the framework's name.

**Why static `index.html` (no SSG, no React, no analytics — §1 #5, #6):** the landing page does exactly one thing — mirror the README's first paragraph and link to the repo. Anything more is scope creep. A static page is unbreakable (no JS = no XSS, no bundle = no Lighthouse hit), trivially fast (no SSR = no cold start), and lets us commit the page text to git so it can't drift from the README. We add a static-site generator only when content cadence justifies it (FR-CONTENT-001 starts that conversation).

**Why no lead-capture in scope (§1 #11):** plan §"What NOT to do" item 1 is explicit — *don't gate anything on email capture in the GitHub repo*. The principle generalises to the framework's landing page: the moment the landing page captures emails, the framework reads as a funnel for the consultancy. The funnel exists; it lives on a sub-path that this FR doesn't surface. Separating the framework's URL from the funnel's URL is the line that the plan asks us to hold.

**Why HSTS preload eligibility (§1 #6):** HSTS preload is the inverse of the geography-discount problem — it's a free signal of operational seriousness that costs ~15 minutes to enable and pays off forever. Enterprise security reviewers grep for HSTS preload on candidate vendor domains; we don't want to fail that grep.

**Why `/.well-known/security.txt` (§1 #8):** the framework will eventually be cited in compliance work (one of the wedge use cases for paid audits). A `security.txt` file is RFC 9116, costs nothing to publish, and signals that the project knows what compliance reviewers grep for. It's also the natural place to direct vulnerability reports against any future hosted benchmark or CLI.

---

## §3 — File shape / DNS records / landing page

### `internal/branding/domain-decision.md` (NEW)

```markdown
# Domain decision — DSAF canonical URL

**Date:** 2026-05-17
**WHOIS-check date:** <YYYY-MM-DD on day of purchase>
**Chosen domain:** <dsaf.dev | designsystemaudit.org | dsaf.org | dsaf.community>
**Registrar:** <Cloudflare Registrar | Namecheap | Porkbun>
**Purchase date:** <YYYY-MM-DD>
**Expiry date:** <YYYY-MM-DD + N years; minimum 5 years pre-paid>
**Renewal owner:** Stephen Cheng (Founder, CyberSkill)
**Auto-renew:** enabled
**T-30d reminder:** calendar event in <calendar> at <date>
**WHOIS privacy:** enabled (registrar privacy proxy)

## WHOIS-check results (priority order)

| # | Domain | Status on <date> | Notes |
|---|--------|------------------|-------|
| 1 | dsaf.dev | <available | parked $X | taken> | |
| 2 | designsystemaudit.org | <…> | |
| 3 | dsaf.org | <…> | |
| 4 | dsaf.community | <…> | |

## Why this domain

<one paragraph citing §2 of FR-BRAND-001>

## What this domain does NOT do

- No lead-capture form (per FR-BRAND-001 §1 #11; FR-FUNNEL-001 is the paid funnel and lives on a sub-path the landing page does not link to).
- No analytics in initial form (P0 scope).
- No services pricing.
- No "by CyberSkill" badge.

## What this domain replaces

`audit.cyberskill.world` as the canonical URL for framework marketing copy. FR-BRAND-004 ships the reverse-redirect.

## Handle reservations

| Channel | Handle | Reserved? | Date |
|---------|--------|-----------|------|
| GitHub org | dsaf | <…> | |
| Twitter/X | @dsaf_dev | <…> | |
| LinkedIn page | DSAF | <…> | |
| Mastodon | @dsaf@hachyderm.io | <…> | |
```

### Cloudflare DNS records

```
; Apex (CNAME flattening enabled at Cloudflare)
dsaf.dev.            300  IN  CNAME  <project>.pages.dev.
dsaf.dev.            300  IN  AAAA   <synthesised>
www.dsaf.dev.        300  IN  CNAME  dsaf.dev.

; Certificate Authority Authorization (rfc 8659)
dsaf.dev.            300  IN  CAA    0 issue "letsencrypt.org"
dsaf.dev.            300  IN  CAA    0 issue "pki.goog"
dsaf.dev.            300  IN  CAA    0 iodef "mailto:hello@dsaf.dev"

; Mail forwarding
dsaf.dev.            300  IN  MX     10 route1.mx.cloudflare.net.
dsaf.dev.            300  IN  MX     20 route2.mx.cloudflare.net.
dsaf.dev.            300  IN  MX     30 route3.mx.cloudflare.net.

; SPF / DKIM / DMARC for the forwarding inbox
dsaf.dev.            300  IN  TXT    "v=spf1 include:_spf.mx.cloudflare.net -all"
_dmarc.dsaf.dev.     300  IN  TXT    "v=DMARC1; p=reject; rua=mailto:hello@dsaf.dev"
```

### `dsaf.dev/index.html` (static — copied / kept in sync with README §0)

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>DSAF — Design System Audit Framework</title>
<meta name="description" content="A 125-criterion, agent-native, CMM-style maturity framework for design systems. Open source. Vendor-neutral. Six tiers from L0 to L5.">
<link rel="canonical" href="https://dsaf.dev/">
<style>
  :root { color-scheme: light dark; --fg: #111; --bg: #fff; --link: #0a58ca; }
  @media (prefers-color-scheme: dark) { :root { --fg: #eee; --bg: #111; --link: #4ea3ff; } }
  html, body { background: var(--bg); color: var(--fg); font: 18px/1.6 system-ui, -apple-system, "Segoe UI", sans-serif; margin: 0; }
  main { max-width: 640px; margin: 4rem auto; padding: 0 1rem; }
  h1 { font-size: 2.4rem; line-height: 1.1; margin: 0 0 1rem; }
  a { color: var(--link); }
  .meta { font-size: 0.9rem; opacity: 0.7; margin-top: 3rem; border-top: 1px solid currentColor; padding-top: 1rem; }
</style>
</head>
<body>
<main>
<h1>DSAF — Design System Audit Framework</h1>
<p>A 125-criterion, agent-native, CMM-style maturity framework for design systems. Open source. Vendor-neutral. Six tiers from L0 to L5.</p>
<p>Most maturity narratives in the design-systems space are blog posts. The few that aren't are SaaS-gated. DSAF is the missing artefact: a downloadable, criteria-graded, scriptable framework that a team can actually run.</p>
<p><a href="https://github.com/cyberskill-official/design-system-audit-framework">Read the spec on GitHub →</a></p>
<p class="meta">Maintained by <a href="https://cyberskill.world">CyberSkill</a> and named contributors. Source: <a href="https://github.com/cyberskill-official/design-system-audit-framework">design-system-audit-framework</a>. Contact: <a href="mailto:hello@dsaf.dev">hello@dsaf.dev</a>. Security: <a href="/.well-known/security.txt">security.txt</a>.</p>
<!-- NOTE: when FR-GOV-002 moves the repo to a neutral `dsaf` org, both anchor hrefs above MUST be updated in the same PR as the repo move. The redirect from CyberSkill/* preserves inbound links but the canonical URL on the landing must point at the new home. -->

</main>
</body>
</html>
```

### `dsaf.dev/.well-known/security.txt` (per RFC 9116)

```
Contact: mailto:hello@dsaf.dev
Expires: 2027-05-17T00:00:00.000Z
Acknowledgments: https://dsaf.dev/security/acknowledgments
Preferred-Languages: en, vi
Canonical: https://dsaf.dev/.well-known/security.txt
```

### `README.md` patch (canonical URL update — before/after)

**Before** (top of file, current state inferred from `guidelines/01-introduction.md` references):

```markdown
# Design System Audit Framework
A 125-criterion audit and improvement-plan toolkit for design systems …
Maintained by CyberSkill. See [audit.cyberskill.world](https://audit.cyberskill.world) for paid audits.
```

**After:**

```markdown
# DSAF — Design System Audit Framework
A 125-criterion, agent-native, CMM-style maturity framework for design systems. Open source. Vendor-neutral. Six tiers from L0 to L5.

Canonical URL: **[dsaf.dev](https://dsaf.dev)**. Repository: this GitHub project.

Maintained by [CyberSkill](https://cyberskill.world) and named contributors. Paid audits are a separate service offered by CyberSkill via [audit.cyberskill.world](https://audit.cyberskill.world); the framework itself is vendor-neutral and lives at dsaf.dev.
```

---

## §4 — Acceptance criteria

1. **WHOIS lookup logged** — `internal/branding/domain-decision.md` exists with WHOIS-check date, chosen domain, fallback evaluation table, purchase date, expiry date, renewal owner, auto-renew enabled.
2. **Domain resolves** — `dig dsaf.dev` returns the Cloudflare Pages CNAME chain; `curl -sI https://dsaf.dev/` returns `HTTP/2 200` with `strict-transport-security: max-age=63072000; includeSubDomains; preload`.
3. **Plain HTTP redirects to HTTPS** — `curl -sI http://dsaf.dev/` returns `HTTP/1.1 301` with `location: https://dsaf.dev/`.
4. **WHOIS privacy active** — `whois dsaf.dev` does NOT contain the registrant's name, email, or street address.
5. **CAA records published** — `dig CAA dsaf.dev` returns both `0 issue "letsencrypt.org"` and `0 issue "pki.goog"`.
6. **`security.txt` published** — `curl -s https://dsaf.dev/.well-known/security.txt` returns the RFC 9116 body with a future `Expires:` date.
7. **Landing page minimal** — `dsaf.dev/index.html` is < 4 KB gzipped, contains no `<script>` tags, no third-party analytics, no email-capture form, and renders the README's first 200 words verbatim.
8. **Lighthouse ≥ 95 on all four pillars** — Performance, Accessibility, Best Practices, SEO. Run locally via `npx unlighthouse https://dsaf.dev/` or Chrome DevTools Lighthouse.
9. **Forwarding inbox works** — an email sent to `hello@dsaf.dev` arrives in the founder's personal inbox within 5 minutes; SPF + DMARC pass on the receive side.
10. **README updated** — same PR that lands this FR updates `README.md` to reference `dsaf.dev` as canonical and demotes `audit.cyberskill.world` to the paid-services link only.
11. **Reservations table populated** — `internal/branding/domain-decision.md` `Handle reservations` table has Reserved=`yes` (or explicit `not available`) for GitHub org, Twitter/X, LinkedIn page, Mastodon. Evidence (screenshots / handle URLs) lives in the PR description, not in the repo.
12. **Auto-renew + T-30d reminder set** — registrar dashboard screenshot or text export attached to the PR, showing auto-renew enabled and a calendar event for T-30d before expiry.
13. **Hardware-key 2FA enrolled** — registrar account's 2FA settings show ≥ 2 FIDO2 / WebAuthn keys enrolled and SMS-based 2FA explicitly disabled. Evidence: a screenshot of the registrar's "Two-Factor Authentication" pane attached to the PR description.
14. **Trademark pre-clearance logged** — `internal/branding/domain-decision.md` contains a "Trademark pre-clearance" subsection with the USPTO TESS + EUIPO eSearch query strings, search date, hit counts per class, and a one-paragraph clearance opinion.
15. **Renewal escalation path documented** — `internal/branding/domain-decision.md` names at least one co-administrator with read-only renewal access via the vault; the vault's access-control entry MUST exist and MUST be auditable (screenshot or vault link in the PR description).
16. **No HTML form on the landing page** — `curl -s https://dsaf.dev/ | grep -ciE '<(form|input)'` returns `0`. The `mailto:hello@dsaf.dev` footer link is allowed and verified separately by AC9.

---

## §5 — Verification

```bash
# AC2 — domain resolves with HSTS preload header
curl -sI https://dsaf.dev/ | grep -i 'strict-transport-security'
# Expected: strict-transport-security: max-age=63072000; includeSubDomains; preload

# AC3 — HTTP → HTTPS redirect
curl -sI http://dsaf.dev/ | grep -iE '^(HTTP|location):'
# Expected:
#   HTTP/1.1 301 Moved Permanently
#   location: https://dsaf.dev/

# AC4 — WHOIS privacy
whois dsaf.dev | grep -iE '(Registrant Name|Registrant Email|Registrant Street)'
# Expected: empty OR contains registrar privacy proxy strings only — NEVER founder name

# AC5 — CAA records
dig +short CAA dsaf.dev
# Expected: 0 issue "letsencrypt.org" and 0 issue "pki.goog"

# AC6 — security.txt
curl -s https://dsaf.dev/.well-known/security.txt | grep -E '^(Contact|Expires|Canonical):'
# Expected: all three present; Expires is a future date

# AC7 — landing page minimal
curl -s https://dsaf.dev/ | wc -c               # < ~4096 bytes
curl -s https://dsaf.dev/ | grep -c '<script'   # 0
curl -s https://dsaf.dev/ | grep -ci 'form\b'   # 0

# AC8 — Lighthouse
npx unlighthouse https://dsaf.dev/ --threshold 95
# Or: open Chrome DevTools → Lighthouse → run all four pillars; verify all ≥ 95.

# AC9 — forwarding inbox
echo "FR-BRAND-001 inbox smoke-test" | mail -s "FR-BRAND-001 test" hello@dsaf.dev
# Wait ≤ 5 minutes; verify arrival in founder's personal inbox; verify SPF=pass + DMARC=pass in raw headers

# AC10 — README updated
grep -E 'dsaf\.dev' README.md
grep -cE 'audit\.cyberskill\.world.*canonical' README.md  # MUST be 0
```

Human-verified ACs (no script, but logged in the PR description):

- **AC1** — `internal/branding/domain-decision.md` is committed in the same PR; reviewer reads it.
- **AC11** — Handle reservations screenshots committed to the PR description (not the repo) for each channel.
- **AC12** — Registrar dashboard screenshot showing auto-renew = on; calendar invite ICS file attached to PR description.

---

## §6 — Implementation skeleton

The operator playbook is the implementation. It runs in order; each step is gated on the previous step's success.

1. **(30 min) WHOIS lookup.** Open a terminal, run `whois dsaf.dev`, `whois designsystemaudit.org`, `whois dsaf.org`, `whois dsaf.community`. Record results in `internal/branding/domain-decision.md` under "WHOIS-check results." If `dsaf.dev` is parked at < $500, evaluate the parker via `nslookup parked-domain-name-server`; if it resolves to a known squatter, proceed to fallback #2. If it's a real-person hold, send an outreach email at $250–$500 ceiling; if rejected, fall back.
2. **(30 min) Purchase + privacy.** At Cloudflare Registrar, search for the chosen domain; purchase for 5 years pre-paid (~$75); enable WHOIS privacy. Record purchase confirmation in `internal/branding/domain-decision.md`.
3. **(30 min) DNS configuration.** In Cloudflare → DNS, paste the records from §3 (the `dig` view) — set proxy=on for the apex CNAME (so Cloudflare's edge serves the TLS), proxy=off for the MX records. Verify propagation via `dig +trace dsaf.dev`.
4. **(30 min) Mail forwarding.** Cloudflare → Email → Email Routing → add `hello@dsaf.dev` → forward to `zintaen@gmail.com`. Verify with the smoke-test in §5 AC9.
5. **(1 h) Landing page.** Create a Cloudflare Pages project at `<project>.pages.dev`, point it at the framework's GitHub repo with the `dsaf.dev/` subdirectory as the build root. The Pages build is trivial — no SSG, just static assets. Commit `dsaf.dev/index.html` and `dsaf.dev/.well-known/security.txt` per §3.
6. **(15 min) HSTS preload.** In Cloudflare → SSL/TLS → Edge Certificates, enable "HSTS (HTTP Strict Transport Security)" with `max-age=63072000`, `includeSubDomains`, `preload`. Submit `dsaf.dev` to <https://hstspreload.org/> for inclusion in the major browsers' preload lists.
7. **(15 min) Handle reservations.** Reserve the four social handles per §1 #12. Most channels accept reservations without populating; if any channel requires a profile, fill the minimum (display name = "DSAF — Design System Audit Framework", bio = "Open-source design-system maturity framework. Spec at dsaf.dev.").
8. **(15 min) README patch + PR.** Apply the README patch from §3, open the PR with `internal/branding/domain-decision.md` + `dsaf.dev/*` + README diff. Run the §5 verification commands locally; paste the output in the PR description.
9. **(15 min) Auto-renew + T-30d reminder.** Confirm auto-renew is on at registrar. Create a calendar event 30 days before expiry titled "DSAF domain renewal — verify auto-renew fired."

---

## §7 — Dependencies

- **External:**
  - Cloudflare Registrar account (the founder's existing personal account; do NOT create a CyberSkill business account — that re-couples the brand).
  - Cloudflare Pages free tier (sufficient until the site hits 500 builds/month — won't happen in P0/P1).
  - <https://hstspreload.org/> submission queue (browser preload list eligibility).
  - A personal email to forward to (Gmail `zintaen@gmail.com` per `user_preferences`).
- **Internal:**
  - This is the foundational FR; no internal dependencies. Every other P0 FR that references `dsaf.dev` (FR-BRAND-002, FR-BRAND-004, FR-DOCS-001, FR-DOCS-003, FR-CONTENT-001, FR-BENCH-001) depends on this one shipping.
- **Vendor:**
  - Cloudflare's WHOIS privacy is at-cost. Namecheap's WhoisGuard is also free now (was paid pre-2021). If the chosen registrar is anyone else, verify WHOIS privacy is included and not an upsell.

---

## §8 — Example payloads

### Example `whois dsaf.dev` output (post-purchase, with privacy enabled)

```
Domain Name: dsaf.dev
Registry Domain ID: <id>
Registrar WHOIS Server: whois.cloudflare.com
Registrar URL: https://www.cloudflare.com
Updated Date: 2026-05-17T03:14:15Z
Creation Date: 2026-05-17T03:14:00Z
Registry Expiry Date: 2031-05-17T03:14:00Z
Registrar: Cloudflare, Inc.

Registrant Name: REDACTED FOR PRIVACY
Registrant Organization: REDACTED FOR PRIVACY
Registrant Email: dns@cloudflare.com
Registrant Country: US
```

### Example `curl -sI https://dsaf.dev/` (post-deploy)

```
HTTP/2 200
date: Fri, 18 May 2026 14:00:00 GMT
content-type: text/html; charset=utf-8
content-length: 1843
content-encoding: gzip
strict-transport-security: max-age=63072000; includeSubDomains; preload
content-security-policy: default-src 'self'; style-src 'self' 'unsafe-inline'
referrer-policy: strict-origin-when-cross-origin
x-content-type-options: nosniff
permissions-policy: interest-cohort=()
server: cloudflare
```

### Example handle-reservation evidence (committed to PR description, NOT to repo)

```
- GitHub org @dsaf — Reserved 2026-05-17; redirect from @dsaf-framework set for 30d.
- Twitter/X @dsaf_dev — Reserved 2026-05-17; profile minimal; bio = "Open-source design-system maturity framework. Spec at dsaf.dev."
- LinkedIn page DSAF — Reserved 2026-05-17.
- Mastodon @dsaf@hachyderm.io — Reserved 2026-05-17.
```

---

## §9 — Open questions

All resolved at authoring time:

- **Q1: `.dev` or `.org`?** Resolved → `.dev` primary, `.org` fallback. `.dev` is HSTS-preloaded at TLD level and reads as developer-methodology. `.org` is acceptable but signals non-profit (which DSAF is not — it's a methodology backed by a for-profit consultancy whose paid services are separately surfaced).
- **Q2: Subdomain or apex for the landing page?** Resolved → apex (`dsaf.dev`, not `www.dsaf.dev` or `framework.dsaf.dev`). The shortest URL is the most citable; sub-paths like `dsaf.dev/dsaf-25` are the cite-handles for downstream content.
- **Q3: Static landing or single-page React?** Resolved → static. No JS, no SSG, no React. A landing page that does one thing (mirror the README's first paragraph + link to the repo) should not be a build step.
- **Q4: Email host (Cloudflare Email Routing vs Fastmail vs Migadu)?** Resolved → Cloudflare Email Routing for the forwarding inbox. Free, configured in the same pane as DNS, no separate vendor. If we ever need a real mailbox (not forwarding) we move to Migadu (privacy-respecting, EU-hosted).
- **Q5: Reserve sub-paths now (`dsaf.dev/dsaf-25`, `dsaf.dev/criteria`, etc.)?** Deferred to FR-DOCS-001 / FR-CONTENT-001. This FR ships only the apex; sub-paths get created when the content that lives there is ready.
- **Q6: GitHub org migration today or later?** Resolved → reserve the org name (`dsaf`) today; *migrate* the repo from CyberSkill → DSAF later (P2 governance step in FR-GOV-002 vicinity). Reserving the org name prevents squatters; migrating the repo is a larger change with redirect implications.

---

## §10 — Failure modes inventory

| Failure | Detection | Outcome | Recovery |
|---|---|---|---|
| `dsaf.dev` already registered at WHOIS check | Step 1 returns "taken" | Fall back to `designsystemaudit.org` or evaluate parker | Document fallback in `internal/branding/domain-decision.md` with reason |
| Domain expires (auto-renew silently fails) | T-30d calendar reminder fires; or T+1d external monitor flags 404 | Domain enters redemption (grace) period 30 days; if missed, drops + can be re-registered | Pay redemption fee (~$80) at registrar; if dropped + sniped, immediately mint fallback and announce the change loudly |
| Cloudflare account compromised | Cloudflare login alert / 2FA prompt for unknown device | Attacker can change DNS, redirect HTTPS via origin certs | 2FA hardware-key required on the registrar account; recovery via backup codes stored offline |
| `dsaf.dev` enters legal dispute (someone trademarks "DSAF") | Cease-and-desist email to `hello@dsaf.dev` | Domain may transfer under UDRP | Pre-defence: trademark search at USPTO TESS + EUIPO eSearch in §6 step 1; if clean, dispute risk is low. If a complaint lands, consult a US/EU IP lawyer (out of scope here) |
| Cloudflare Pages outage | Cloudflare status page red | Landing page 503s | Mirror is the GitHub repo; README has the same first-paragraph content. P0 doesn't depend on the landing being up. Acceptable degradation. |
| HSTS preload submission rejected | <https://hstspreload.org/> form returns an error | Browser will not enforce HSTS on first visit (until cache built) | Fix the submission error (usually a missing `includeSubDomains` or `max-age` < 1 year), resubmit |
| WHOIS privacy lapses (registrar bug) | Random `whois` check reveals founder name | Geography-headwind credibility leak | Re-enable WHOIS privacy at registrar; file ticket if it doesn't stick |
| Email-routing inbox `hello@dsaf.dev` silently broken | Smoke-test email never arrives | Inbound contact lost — security reports + reviewer outreach drops | Re-verify Cloudflare Email Routing config; add an external healthcheck (BetterStack) that emails `hello@dsaf.dev` weekly and pages on failure |
| TLS certificate not renewed | Browser warning on next visit | Visitors see HTTPS warning, bounce | Cloudflare auto-renews via Let's Encrypt + their managed CA; if it fails, fall back to the second issuer in the CAA record (`pki.goog`); manually re-issue via Cloudflare → SSL/TLS → Origin Server |
| Handle squatters mint `@dsaf` on a fifth channel post-launch | Search alert fires | Brand confusion | Reserve all four channels in §1 #12 immediately; for a fifth (TikTok, Bluesky, Threads), reserve when each becomes relevant to design-systems audiences |
| Founder loses domain renewal access (hospitalisation, etc.) | T-30d reminder fires with no response | Domain risk | Bus-factor mitigation per §1 #15: registrar credentials in CyberSkill-managed vault; named co-administrator with read-only renewal access; documented escalation path in `internal/branding/domain-decision.md` |
| Cloudflare Pages build misconfigured at first deploy | Pages dashboard shows build failure / 404 at apex | Apex returns 404 even though DNS resolves correctly | Build root MUST be set to `dsaf.dev/` (subdirectory within the framework repo); output is treated as static. Re-trigger the deploy after correcting the build config. Mitigation: do not announce the URL anywhere until §5 AC2 + AC7 are green |
| Registrar account hijacked via SIM swap (SMS-2FA-only) | Email alert from registrar about login from unknown device | Attacker can transfer the domain | Mitigated by §1 #13: hardware-key 2FA only; SMS 2FA explicitly disabled at enrollment time. Recovery if breached: contact registrar abuse team within 60-day transfer-lock window |
| Trademark complaint lands post-launch (despite pre-clearance) | Cease-and-desist email to `hello@dsaf.dev` or UDRP filing notice | UDRP arbitration; possible transfer order | Pre-clearance per §1 #14 makes this low-probability; if it happens, escalate to US/EU IP counsel (out of scope here). Fallback names from §1 #2 remain available |

---

## §11 — Implementation notes

- **The five-year pre-pay is a defensibility signal, not a finance optimisation.** A one-year registration costs $15; a five-year costs $75 — the difference is a rounding error vs the project's seriousness. A WHOIS that shows "expires 2031" reads as commitment; "expires 2027" reads as "we'll see."
- **Cloudflare Pages > Vercel / Netlify / GitHub Pages for this landing.** Cloudflare's network is the densest in Asia (matters when the founder is in HCMC), they don't surprise-bill at scale, and the DNS + Pages + Routing all share one admin pane. Vercel is acceptable but couples us to their pricing; Netlify is fine but a second vendor; GitHub Pages has no edge caching outside the US.
- **HSTS preload is one-way.** Once submitted and accepted, removing a domain from preload lists takes 6–12 months across browser releases. Don't enable preload until you're certain about the domain choice. The fallback (if we ever needed to retire `dsaf.dev`) is to keep paying for it indefinitely and serve a permanent redirect to the new canonical — much cheaper than the brand cost of a broken-citation trail.
- **Why no analytics in P0:** the landing page doesn't need to optimise conversion in P0 — there's nothing to convert to. Analytics will land alongside FR-BENCH-001 (the lite anonymous benchmark — placeholder, not yet specified) so the privacy contract is consistent: visitor counts only, no individual fingerprinting, no third-party trackers. Plausible (self-hosted on Cloudflare Workers) is the candidate; the decision lives in FR-BENCH-001.
- **MX records in §3 are illustrative — pull live values from the Cloudflare Email Routing panel at configuration time.** Cloudflare may rotate the routing endpoints; the `route1/2/3.mx.cloudflare.net` values in §3 are correct as of 2026-05-17 but should be cross-checked against the Cloudflare Email Routing → Setup pane before adding records.
- **The README patch is part of this FR's scope.** A canonical-URL change that doesn't update the README means the README still tells visitors "go to audit.cyberskill.world" while the new landing says "the framework is at dsaf.dev." Splitting the README change into a follow-up FR is exactly the half-measure plan §"What NOT to do" item 4 warns against.
- **Handle reservations are throwaway-cheap.** Even if Mastodon and LinkedIn never get a single post, reserving them now prevents squatters during the launch window. The cost is < 30 minutes total; the alternative is a permanent third-party-controlled namespace collision.
- **`hello@dsaf.dev` is the right inbox name.** Not `info@`, not `contact@`, not `team@`. Plain `hello@` reads as "a person reads this" — which matches the actual ops shape (one founder + future contributors). When the project grows we add `security@`, `press@`, etc.; `hello@` remains the default.
- **Trademark search is in §6 step 1, not §10 only.** Pre-clearance (USPTO TESS + EUIPO eSearch for "DSAF" and "Design System Audit Framework") is cheap if done before purchase; reactive defence under UDRP is expensive. If pre-clearance turns up a hit, this FR's fallback list is what saves us.

---

*End of FR-BRAND-001.*
