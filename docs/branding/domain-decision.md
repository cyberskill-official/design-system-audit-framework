# DSAF canonical-domain decision

**Status:** ratified 2026-05-18.
**Canonical URL:** `https://audit.cyberskill.world/`.
**Deploy host:** Vercel.
**Source folder:** [`landing/`](../../landing/).

## Decision

DSAF is published at **`https://audit.cyberskill.world/`** as its canonical public URL. The earlier plan to mint a neutral `dsaf.dev` domain (FR-BRAND-001) is **not being pursued**. The framework runs on the existing CyberSkill-controlled subdomain instead.

## Operator override on FR-BRAND-001

FR-BRAND-001 §1 #1 originally required minting `dsaf.dev` (or a fallback `.org`/`.community`) as the canonical neutral URL. That FR's rationale rested on a "decouple framework brand from CyberSkill's audit-services pitch" line of reasoning.

The operator decision (Stephen Cheng, 2026-05-18) is to keep the framework on `audit.cyberskill.world` and accept the brand-coupling trade-off:

- **Lost:** the FR-BRAND-001 / FR-BRAND-004 neutrality story — the URL clearly identifies CyberSkill as the host.
- **Gained:** no domain purchase friction; no DNS/registrar/2FA setup work; no trademark pre-clearance gate; faster path from repo to live site (which is exactly what happened — deployed in one Vercel session).

The brand-coupling is mitigated by **page content discipline**, not URL choice:

- The site's H1 reads "DSAF — Design System Audit Framework," not "a CyberSkill-owned methodology."
- The site's footer credits CyberSkill as the maintainer, not the owner.
- The handle taxonomy in [`handle-taxonomy.md`](handle-taxonomy.md) continues to forbid CyberSkill-as-owner noun handles.
- The self-audit publication cap in [`self-audit-policy.md`](self-audit-policy.md) caps public claims at L3 regardless of host domain.

If future signal shows the URL itself is the friction (named reviewers, partners, or enterprise buyers explicitly cite it as a credibility problem), the neutral-domain plan can be revisited — at that point FR-BRAND-001 becomes live again as a re-batched FR.

## Deploy contract

| Item | Value |
|---|---|
| Host | Vercel |
| Build root | `landing/` |
| Build step | none (static HTML + CSS) |
| HTTPS | enforced (Vercel-managed) |
| HSTS | `max-age=63072000; includeSubDomains; preload` (per `landing/vercel.json`) |
| HSTS preload submission | submit `audit.cyberskill.world` at `hstspreload.org` |
| CSP / X-CTO / X-FO / Referrer-Policy | per `landing/vercel.json` |
| `Strict-Transport-Security` preload eligibility | confirm via curl + browser dev-tools |
| Sitemap | `https://audit.cyberskill.world/sitemap.xml` |
| robots | `https://audit.cyberskill.world/robots.txt` |
| security.txt | `https://audit.cyberskill.world/.well-known/security.txt` |

## Verification

```bash
# Apex returns 200 with HSTS
curl -sI https://audit.cyberskill.world/ | grep -iE 'HTTP|strict-transport-security'

# Card route lives
curl -sI https://audit.cyberskill.world/card | head -1

# security.txt + sitemap + robots
curl -s https://audit.cyberskill.world/.well-known/security.txt
curl -s https://audit.cyberskill.world/sitemap.xml | head -10
curl -s https://audit.cyberskill.world/robots.txt

# Lighthouse ≥ 95 all four pillars
npx unlighthouse https://audit.cyberskill.world/
```

## Edge-case matrix

| Case | Failure vector | Expected handling | Evidence surface |
|---|---|---|---|
| HTTPS root returns non-200 | deploy or routing regression | Fail `npm run contract:domain`; do not mark FR strict-audited | `docs/_audit/domain-contract.json` |
| HTTP does not redirect to HTTPS | transport security regression | Fail live contract check | `http.status` and `http.location` |
| HSTS/CSP/XFO headers are missing | Vercel header drift | Fail live contract check | `https.headers` |
| Landing adds `<form>` or `<input>` | accidental lead capture | Fail live contract check | forbidden-pattern checks |
| `security.txt`, robots, or sitemap disappear | static asset regression | Fail live contract check | route status checks |
| DNS CAA / AAAA / HSTS preload cannot be confirmed | private DNS or external service blocker | Mark as mocked private operation; preserve exact requested action | `docs/branding/FR-BRAND-001-domain-contract.json` |
| Registrar 2FA/vault/auto-renew evidence is private | account-access blocker | Do not fabricate evidence; use the mock operation contract | `registrar-2fa-vault` operation |
| Mail forwarding cannot be proven without inbox access | account-access blocker | Do not claim delivery; contract the expected evidence | `mail-forwarding` operation |

## Contract and observability

FR-BRAND-001 uses a split contract:

- Public host checks run live with `npm run contract:domain`.
- Private operations are isolated in [`FR-BRAND-001-domain-contract.json`](FR-BRAND-001-domain-contract.json) and validated through a mock `POST /mock/domain-operations` contract.
- Structured evidence is written to `docs/_audit/domain-contract.json`.

This follows the repository's existing zero-dependency Node ESM pattern: a CLI script gathers evidence, emits stable console lines, and writes JSON audit output.

## Out of scope

- WHOIS privacy — not relevant; the domain is owned at the corporate level.
- Hardware-key 2FA for the registrar — handled by CyberSkill's existing infra, not a DSAF-specific gate.
- Trademark pre-clearance — deferred until a neutral domain is reconsidered.
- DNS records (CAA, MX, SPF, DMARC) — managed at the CyberSkill DNS layer; this document does not duplicate them.

## Amendment

Decisions to mint a neutral domain, retire `audit.cyberskill.world`, or split the framework from CyberSkill's audit services require an explicit operator action recorded here. Until then, this file is the source of truth.

*End of canonical-domain decision.*
