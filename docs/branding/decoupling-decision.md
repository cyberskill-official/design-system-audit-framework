# DSAF / CyberSkill decoupling decision

**Status:** ratified 2026-05-18 (revises the 2026-05-17 version).
**FRs:** FR-BRAND-001, FR-BRAND-002, FR-BRAND-004, FR-GOV-002.

## Decision

DSAF is the public methodology brand. CyberSkill is the original authoring practice and worked-example maintainer. The framework runs at `https://audit.cyberskill.world/` — a CyberSkill-controlled subdomain. Brand decoupling is achieved **at the content layer**, not the URL layer.

## Why we're keeping the URL on CyberSkill infra

FR-BRAND-001 and FR-BRAND-004 originally argued for a neutral domain (`dsaf.dev`) so the framework's brand wouldn't be tangled with CyberSkill's audit-services pitch. After deploying the live site, the operator decided the URL itself is a lower-priority signal than the **page content**. The trade-off accepted:

- **Risk:** Western enterprise buyers and named DS-community reviewers might read "audit.cyberskill.world" as "the CyberSkill audit-services site," not as "DSAF's home."
- **Mitigation:** the page content carries no CyberSkill-as-author framing. H1 is "DSAF — Design System Audit Framework." Footer reads "Maintained by CyberSkill as the original authoring practice," not "a CyberSkill-owned methodology."
- **Re-evaluation trigger:** if at least two named reviewers explicitly cite the URL as a credibility concern, the neutral-domain plan (FR-BRAND-001) gets re-batched.

## Surfaces

| Surface | Primary brand | CyberSkill role |
|---|---|---|
| README | DSAF | Maintainer / worked example |
| `audit.cyberskill.world` | DSAF | Host (subdomain), footer-only attribution |
| `docs/` | DSAF | Case-study reference only |
| `examples/cyberskill-design-system/` | CyberSkill worked example | Example subject |
| `SERVICES.md` | CyberSkill | Commercial surface, clearly separated |

## Redirect posture

There is no redirect to install. The canonical URL is the live URL.

Previous-batch override (2026-05-17) dropped the planned `audit.cyberskill.world → dsaf.dev` 301 redirect. The current-batch decision (2026-05-18) supersedes that one further: no neutral domain is being pursued, so no future-state redirect is planned either. The redirect-map historical record is preserved in [`url-redirect-map.md`](url-redirect-map.md).

## Maintainer posture

DSAF should still move toward at least two named maintainers (FR-GOV-002). The maintainer list is a governance signal, not a URL signal. The same playbook applies — sequential outreach starting with Nathan Curtis per [`co-maintainer-shortlist.md`](../governance/co-maintainer-shortlist.md).

As of 2026-05-18, the co-maintainer role is chartered but not accepted. Public surfaces may say the co-maintainer seat is open; they must not imply any candidate has accepted until written acceptance, co-signature, and GitHub role assignment are complete.

## Copy guardrails (unchanged from prior batch)

- Do not describe DSAF as a CyberSkill product.
- Do not put paid-service CTAs on DSAF's primary docs or landing page.
- Do not cite CyberSkill's example as proof of independent verification.
- Do use CyberSkill in footer attribution and in the worked-example folder name.
- Do route paid-audit conversations to `SERVICES.md`, not the framework surfaces.

*End of decoupling decision.*
