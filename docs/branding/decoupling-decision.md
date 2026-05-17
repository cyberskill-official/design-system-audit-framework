# DSAF decoupling decision

**Status:** normative launch posture.
**FRs:** FR-BRAND-001, FR-BRAND-002, FR-BRAND-004, FR-GOV-002.

## Decision

DSAF is the public methodology brand.
CyberSkill is the original authoring practice and worked-example maintainer.
The repo, public site, launch copy, governance docs, and integrations should lead with DSAF, not CyberSkill.

## Surfaces

| Surface | Primary brand | CyberSkill role |
|---|---|---|
| README | DSAF | Maintainer / worked example |
| `dsaf.dev` | DSAF | Footer provenance only |
| `docs/` | DSAF | Case-study reference only |
| `examples/cyberskill-design-system/` | CyberSkill worked example | Example subject |
| `SERVICES.md` | CyberSkill | Commercial surface, clearly separated |

## Redirect posture

**Operator override (2026-05-18):** the 12-month `audit.cyberskill.world → dsaf.dev` redirect originally specified by FR-BRAND-004 §1 #4 has been **dropped** by founder decision in the canonical-landing rebuild.
The old subdomain stops being relevant; if it still resolves it does not forward to DSAF.
Inbound citations that hit the old URL will 404 instead of redirecting.

This is a deliberate deviation from the FR-BRAND-004 spec. The trade-off accepted:

- **Lost:** SEO and citation-graph continuity from the old URL — search engines drop the inbound links over the next 6–12 months instead of inheriting them on dsaf.dev.
- **Gained:** a clean separation, no risk of the old subdomain leaking CyberSkill-as-author framing back into DSAF surfaces.

The full record of redirect rows that were going to be installed is preserved in [`url-redirect-map.md`](url-redirect-map.md) as historical reference. The FR spec itself remains unchanged.

## Maintainer posture

DSAF should move toward at least two named maintainers.
The maintainer list is a governance signal, not an employment claim.
Co-maintainers are DSAF maintainers, not CyberSkill employees by default.

## Copy guardrails

- Do not describe DSAF as a CyberSkill product.
- Do not put paid-service CTAs on DSAF's primary docs or landing page.
- Do not cite CyberSkill's example as a top-tier proof claim.
- Do not use `audit.cyberskill.world` as canonical once `dsaf.dev` is active.

*End of decoupling decision.*
