---
fr_id: FR-BRAND-001
audited: 2026-05-17
verdict: PASS (after revision)
score_pre_revision: 7.5/10
score_post_expansion: 9/10
score_post_revision: 10/10
issues_resolved: 10
template: dsaf-spec@1
---

## §1 — Verdict summary

The post-revision spec runs ~575 lines covering domain mint, DNS, mail forwarding, static landing, HSTS preload, security.txt, trademark pre-clearance, hardware-key 2FA, bus-factor mitigation, and handle reservation. It has 15 §1 normative clauses, 16 acceptance criteria, 14 failure-mode rows (added 3 in revision), 7 open questions resolved, and 9 implementation notes. Length is within the 400–700 substantive-FR target. All 10 findings below are mechanically resolvable inside the FR (no scope leakage into other FRs). **Score = 10/10.**

## §2 — Findings (all resolved)

### ISS-001 — Hardware-key 2FA absent from §1, only in §10 recovery
The single-largest catastrophic failure is registrar account compromise (SIM swap / credential phishing → domain transfer). Pre-revision §10 mentioned "2FA hardware key" as recovery; this is backwards — hardware-key 2FA is the **prevention** posture and belongs in §1 as a precondition, not §10 as a remedy. **Resolved:** §1 #13 (new clause) requires FIDO2 / WebAuthn hardware key with explicit ban on SMS-only 2FA, backup key enrollment in same session; AC13 verifies via registrar dashboard screenshot. Pattern: §8.6c (SHOULD vs MUST mismatch — was implicit SHOULD in §10, now MUST in §1).

### ISS-002 — Trademark pre-clearance missing from acceptance criteria
Pre-revision §11 mentioned trademark search as an "implementation note"; §6 step 1 implicitly included WHOIS but not TESS/EUIPO; §4 ACs did not enforce pre-clearance. A UDRP defence after launch is 5–20× the cost of clearing the name in 30 minutes pre-purchase. **Resolved:** §1 #14 (new clause) requires USPTO TESS + EUIPO eSearch search across classes 9 / 35 / 42, logged in `domain-decision.md` "Trademark pre-clearance" subsection; AC14 verifies the log; §10 row "Trademark complaint lands post-launch" expanded as the fallback path. Pattern: §8.5b ("done when" qualitative without measurement — now quantitative with named registries and named classes).

### ISS-003 — §1 #12 SHOULD vs §4 AC11 MUST mismatch (handle reservations)
Pre-revision §1 #12 said "SHOULD reserve matching handles" but §4 AC11 said "MUST be populated." These are throwaway-cheap reservations (cumulative cost < 30 min); the SHOULD was a false-economy. **Resolved:** §1 #12 upgraded from SHOULD to MUST with screenshot-in-PR-not-repo rule; AC11 amended to clarify evidence location (PR description, not repo, to avoid leaking founder's personal-channel login surface). Pattern: §8.6c verbatim (§1 SHOULD vs §4 MUST).

### ISS-004 — `FR-BENCH-001` reference in §11 lacks placeholder annotation
Pre-revision §11 referenced FR-BENCH-001 (P2) without the `# placeholder — not yet specified` flag required by AUTHORING §3.1 rule 3. Without annotation, a reciprocity-sweep tool would flag this as a dangling reference. **Resolved:** §11 "Why no analytics" bullet now reads "FR-BENCH-001 (the lite anonymous benchmark — placeholder, not yet specified)". §1 #11 similarly annotates FR-FUNNEL-001. Pattern: §3.1 rule 3 (placeholder annotation).

### ISS-005 — Bus-factor / co-administrator role not normative in §1
Pre-revision §10 mentioned "store registrar credentials in CyberSkill-managed password vault" as recovery; the vault setup was implicit. The renewal owner being a single-named-person (founder) is a real risk. **Resolved:** §1 #15 (new clause) requires CyberSkill-administered password vault entry + named co-administrator with read-only renewal access + audit-log requirement; AC15 verifies the log. The role is scoped to *renewal*, not *transfer*, to prevent insider-transfer risk. Pattern: §8.6a (failure-mode in §10 not enforced in §1).

### ISS-006 — Cloudflare Pages misconfigured-build failure-mode missing
Pre-revision §10 covered "Cloudflare Pages outage" (transient) but not "build root misconfigured at first deploy" (silent 404 at apex despite DNS resolving correctly). These are mechanically different failure modes. **Resolved:** §10 row added — detection via dashboard, outcome 404, recovery is build-root reset to `dsaf.dev/` subdirectory; mitigation is "don't announce the URL anywhere until AC2 + AC7 are green." Pattern: §3.10 rule 29 (failure-mode row per architectural decision).

### ISS-007 — `<org>` placeholders in landing page HTML
Pre-revision §3 `index.html` referenced `https://github.com/<org>/design-system-audit-framework` twice with `<org>` as a placeholder. Either the placeholder must be explicit (filled at PR time) or the FR must declare what the org name resolves to. **Resolved:** placeholders replaced with `CyberSkill` (the current owning org); an HTML comment in §3 notes that when FR-GOV-002 (P2) migrates the repo to a neutral `dsaf` org, the anchor hrefs MUST be updated in the same PR as the repo move, with redirects preserving inbound links. This makes the landing page deployable today and explicit about its future update path.

### ISS-008 — MX records hardcoded without "verify against Cloudflare panel" note
Pre-revision §3 hardcoded `route1.mx.cloudflare.net` etc. These are correct as of 2026-05-17 but Cloudflare may rotate them. Hardcoding without a verify-against-live-panel note is fragile. **Resolved:** §11 implementation note added — "MX records in §3 are illustrative; pull live values from the Cloudflare Email Routing → Setup pane at configuration time." Pattern: §8.6b (Debug-format / metric-label fragility — analogous to "hardcoded external value without verification step").

### ISS-009 — §1 #11 "no lead-capture form" ambiguity vs mailto link
Pre-revision §1 #11 said "no lead-capture form, paid CTA, or services pricing." A `mailto:hello@dsaf.dev` footer link is technically a contact channel that captures emails (the user's email reaches the inbox). Without clarification, a reader could read the rule either way. **Resolved:** §1 #11 amended to explicitly distinguish: `mailto:` links are allowed (passive contact channel); HTML `<form>` and `<input type="email">` are forbidden until FR-FUNNEL-001 ships. AC16 (new) verifies via `curl -s ... | grep -ciE '<(form|input)'` returns 0. Pattern: §8.6c (§1 ambiguity → §4 verifiable rule).

### ISS-010 — Registrar account hijack failure-mode not enumerated
Pre-revision §10 had "Cloudflare account compromised" generically; SIM-swap-specific failure was not enumerated. Hardware-key 2FA addresses prevention; the failure-mode row should document detection + recovery for the post-event scenario. **Resolved:** §10 row added — "Registrar account hijacked via SIM swap (SMS-2FA-only)" — detection via login-alert email, outcome attacker can transfer the domain, recovery via §1 #13 hardware-key 2FA + 60-day transfer-lock window for emergency registrar-abuse-team intervention. Pattern: §3.10 rule 29 (failure-mode coverage of each architectural decision; here, the decision to use a registrar with 2FA).

## §3 — Resolution

All 10 mechanical concerns addressed:

- §1 grew from 12 to 15 normative clauses (added #13 hardware-key 2FA, #14 trademark pre-clearance, #15 bus-factor mitigation).
- §1 #11 ambiguity resolved with mailto/form distinction.
- §1 #12 upgraded from SHOULD to MUST.
- §4 grew from 12 to 16 acceptance criteria (added AC13, AC14, AC15, AC16).
- §10 grew from 11 to 14 failure-mode rows (added Cloudflare Pages build misconfig, registrar account hijack via SIM swap, trademark complaint post-launch).
- §11 implementation notes gained MX-records-verify-against-panel guidance and FR-BENCH-001 placeholder annotation.
- §3 landing-page placeholder `<org>` replaced with explicit `CyberSkill` and an HTML comment noting the FR-GOV-002 future migration requirement.

The post-revision FR runs ~575 lines, within the 400–700 substantive-FR target. Every architectural decision has a failure-mode row, every §1 MUST has a verifiable AC, every cross-FR reference is annotated. **Score = 10/10.**

---

*End of FR-BRAND-001 audit.*
