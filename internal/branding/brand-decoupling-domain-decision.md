# DSAF Brand Decoupling & Canonical Domain Decisions

This document is a consolidation of three historical branding strategy documents:
1. Brand Decoupling Decision (originally `internal/branding/brand-decoupling-domain-decision.md`)
2. Canonical Domain Decision (originally `internal/branding/domain-decision.md`)
3. URL Redirect Map (originally `internal/branding/brand-decoupling-domain-decision.md`)

---

## 1. Brand Decoupling Decision

**Status:** ratified 2026-05-18 (revises the 2026-05-17 version).  
**FRs:** FR-BRAND-001, FR-BRAND-002, FR-BRAND-004, FR-GOV-002.

### Decision

DSAF is the public methodology brand. CyberSkill is the original authoring practice and worked-example maintainer. The framework runs at `https://audit.cyberskill.world/` — a CyberSkill-controlled subdomain. Brand decoupling is achieved **at the content layer**, not the URL layer.

### Why we're keeping the URL on CyberSkill infra

FR-BRAND-001 and FR-BRAND-004 originally argued for a neutral domain (`dsaf.dev`) so the framework's brand wouldn't be tangled with CyberSkill's audit-services pitch. After deploying the live site, the operator decided the URL itself is a lower-priority signal than the **page content**. The trade-off accepted:

- **Risk:** Western enterprise buyers and named DS-community reviewers might read "audit.cyberskill.world" as "the CyberSkill audit-services site," not as "DSAF's home."
- **Mitigation:** the page content carries no CyberSkill-as-author framing. H1 is "DSAF — Design System Audit Framework." Footer reads "Maintained by CyberSkill as the original authoring practice," not "a CyberSkill-owned methodology."
- **Re-evaluation trigger:** if at least two named reviewers explicitly cite the URL as a credibility concern, the neutral-domain plan (FR-BRAND-001) gets re-batched.

### Surfaces

| Surface | Primary brand | CyberSkill role |
|---|---|---|
| README | DSAF | Maintainer / worked example |
| `audit.cyberskill.world` | DSAF | Host (subdomain), footer-only attribution |
| `docs/` | DSAF | Case-study reference only |
| `examples/cyberskill-design-system/` | CyberSkill worked example | Example subject |
| `SERVICES.md` | CyberSkill | Commercial surface, clearly separated |

### Redirect posture

There is no redirect to install. The canonical URL is the live URL.

Previous-batch override (2026-05-17) dropped the planned `audit.cyberskill.world → dsaf.dev` 301 redirect. The current-batch decision (2026-05-18) supersedes that one further: no neutral domain is being pursued, so no future-state redirect is planned either. The redirect-map historical record is preserved in Section 3 of this document.

### Maintainer posture

DSAF should still move toward at least two named maintainers (FR-GOV-002). The maintainer list is a governance signal, not a URL signal. The same playbook applies — sequential outreach starting with Nathan Curtis per [`co-maintainer-shortlist.md`](../governance/co-maintainer-shortlist.md).

As of 2026-05-18, the co-maintainer role is chartered but not accepted. Public surfaces may say the co-maintainer seat is open; they must not imply any candidate has accepted until written acceptance, co-signature, and GitHub role assignment are complete.

### Copy guardrails (unchanged from prior batch)

- Do not describe DSAF as a CyberSkill product.
- Do not put paid-service CTAs on DSAF's primary docs or internal/landing page.
- Do not cite CyberSkill's example as proof of independent verification.
- Do use CyberSkill in footer attribution and in the worked-example folder name.
- Do route paid-audit conversations to `SERVICES.md`, not the framework surfaces.

---

## 2. Canonical Domain Decision

**Status:** ratified 2026-05-18.  
**Canonical URL:** `https://audit.cyberskill.world/`.  
**Deploy host:** Vercel.  
**Source folder:** `landing/`.

### Decision

DSAF is published at **`https://audit.cyberskill.world/`** as its canonical public URL. The earlier plan to mint a neutral `dsaf.dev` domain (FR-BRAND-001) is **not being pursued**. The framework runs on the existing CyberSkill-controlled subdomain instead.

### Operator override on FR-BRAND-001

FR-BRAND-001 §1 #1 originally required minting `dsaf.dev` (or a fallback `.org`/`.community`) as the canonical neutral URL. That FR's rationale rested on a "decouple framework brand from CyberSkill's audit-services pitch" line of reasoning.

The operator decision (Stephen Cheng, 2026-05-18) is to keep the framework on `audit.cyberskill.world` and accept the brand-coupling trade-off:

- **Lost:** the FR-BRAND-001 / FR-BRAND-004 neutrality story — the URL clearly identifies CyberSkill as the host.
- **Gained:** no domain purchase friction; no DNS/registrar/2FA setup work; no trademark pre-clearance gate; faster path from repo to live site (which is exactly what happened — deployed in one Vercel session).

The brand-coupling is mitigated by **page content discipline**, not URL choice:

- The site's H1 reads "DSAF — Design System Audit Framework," not "a CyberSkill-owned methodology."
- The site's footer credits CyberSkill as the maintainer, not the owner.
- The handle taxonomy in `handle-taxonomy.md` continues to forbid CyberSkill-as-owner noun handles.
- The self-audit publication cap in `self-audit-policy.md` caps public claims at L3 regardless of host domain.

If future signal shows the URL itself is the friction (named reviewers, partners, or enterprise buyers explicitly cite it as a credibility problem), the neutral-domain plan can be revisited — at that point FR-BRAND-001 becomes live again as a re-batched FR.

### Deploy contract

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

### Verification

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

### Edge-case matrix

| Case | Failure vector | Expected handling | Evidence surface |
|---|---|---|---|
| HTTPS root returns non-200 | deploy or routing regression | Fail `npm run contract:domain`; do not mark FR strict-audited | `outputs/_audit/domain-contract.json` |
| HTTP does not redirect to HTTPS | transport security regression | Fail live contract check | `http.status` and `http.location` |
| HSTS/CSP/XFO headers are missing | Vercel header drift | Fail live contract check | `https.headers` |
| Landing adds `<form>` or `<input>` | accidental lead capture | Fail live contract check | forbidden-pattern checks |
| `security.txt`, robots, or sitemap disappear | static asset regression | Fail live contract check | route status checks |
| DNS CAA / AAAA / HSTS preload cannot be confirmed | private DNS or external service blocker | Mark as mocked private operation; preserve exact requested action | `internal/branding/FR-BRAND-001-domain-contract.json` |
| Registrar 2FA/vault/auto-renew evidence is private | account-access blocker | Do not fabricate evidence; use the mock operation contract | `registrar-2fa-vault` operation |
| Mail forwarding cannot be proven without inbox access | account-access blocker | Do not claim delivery; contract the expected evidence | `mail-forwarding` operation |

### Contract and observability

FR-BRAND-001 uses a split contract:

- Public host checks run live with `npm run contract:domain`.
- Private operations are isolated in `FR-BRAND-001-domain-contract.json` and validated through a mock `POST /mock/domain-operations` contract.
- Structured evidence is written to `outputs/_audit/domain-contract.json`.

This follows the repository's existing zero-dependency Node ESM pattern: a CLI script gathers evidence, emits stable console lines, and writes JSON audit output.

### Out of scope

- WHOIS privacy — not relevant; the domain is owned at the corporate level.
- Hardware-key 2FA for the registrar — handled by CyberSkill's existing infra, not a DSAF-specific gate.
- Trademark pre-clearance — deferred until a neutral domain is reconsidered.
- DNS records (CAA, MX, SPF, DMARC) — managed at the CyberSkill DNS layer; this document does not duplicate them.

### Amendment

Decisions to mint a neutral domain, retire `audit.cyberskill.world`, or split the framework from CyberSkill's audit services require an explicit operator action recorded here. Until then, this file is the source of truth.

---

## 3. URL Redirect Map (Historical Only)

**Status:** historical. **No redirects are installed.**  
**Current canonical URL:** `https://audit.cyberskill.world/` (per Section 2 above).

### Why this section exists if no redirects are live

The original FR-BRAND-004 plan was:

1. Mint a neutral `dsaf.dev` domain (per FR-BRAND-001).
2. Move framework-marketing content off `audit.cyberskill.world` to `dsaf.dev`.
3. Install a path-preserving 301 redirect from the old subdomain to the new one for at least 12 months.
4. Add a breadcrumb banner on the old subdomain pointing at the new home.

Two successive operator overrides reduced this to nothing:

- **Override 1 (2026-05-17):** dropped the 301 redirect from `audit.cyberskill.world` to `dsaf.dev`, accepting the lost-citation-graph trade-off.
- **Override 2 (2026-05-18):** dropped the neutral-domain plan entirely. `audit.cyberskill.world` IS the canonical URL — no migration is happening, so there is nothing to redirect from or to.

The file is retained because the FR specs (FR-BRAND-001, FR-BRAND-004) still describe the original plan as historical record. A future operator deciding to revive the neutral-domain plan can use the structure below as a starting point.

### Original FR-BRAND-004 redirect rules (NOT INSTALLED — historical only)

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

### Future re-evaluation

If the neutral-domain plan is revived (e.g. because named reviewers cite the URL as a credibility problem — see Section 1 above "Re-evaluation trigger"), this section becomes live again. Until then it's archive.

*End of consolidated branding/domain decisions.*
