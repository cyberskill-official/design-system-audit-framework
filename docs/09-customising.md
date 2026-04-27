# 09 — Customising the framework

The framework is opinionated; the criteria are not sacred. This document explains what's safe to change and what isn't, plus the standard mechanism for shipping a customised fork.

If you're auditing a generic web design system, the defaults work. Skip this file. If you're auditing an HR Tech system, a Healthcare system, a Govtech system, a Fintech system, or any other vertical with its own constraints, read on.

---

## §1 What's customisable (and what isn't)

### Customisable — the safe layer

| Layer | Change shape | When |
|---|---|---|
| **Category weights** | Re-weight `A.1`–`A.10` and `B.1`–`B.10`; sum must remain 100% per Part | Industry-specific priorities (e.g., Fintech weighs A.8 + B.9 higher) |
| **Criterion additions** | Add new criteria to existing categories | Vertical-specific concerns (e.g., HR Tech adds bias-audit criterion to B.9) |
| **Rubric tightening** | Move the 3 / 5 anchor language up | Internal targets that exceed industry norm |
| **Anchor immutables** | Add your brand's anchor immutables (slogan, primary colour, fonts, voice axes) | Every fork should declare these |
| **Banned-phrase lints** | Add system-specific terminology to the lint list | Voice / tone enforcement |
| **Check scripts** | Add new `scripts/check-*.mjs` for vertical-specific gates | E.g., HIPAA compliance check for Healthcare |
| **Templates** | Extend the audit-report template with extra sections (e.g., a "regulatory dependencies" section for Fintech) | When extra context per audit is durable |
| **Vertical packs** | Add a section per vertical pack (HR Tech, Govtech, Fintech, etc.) | Cross-cutting concerns that span multiple categories |

### Non-customisable — the framework's invariants

| Layer | Why locked |
|---|---|
| **Two modes (`SCAN`, `FIX`)** | The state machine is the framework's stability guarantee |
| **No-downgrade rule** | Removing this means the FIX cycle can silently regress; defeats the purpose |
| **The §4 human pause** | Removing this means agents can apply unauthorised fixes |
| **0–5 scoring scale** | Changing changes every prior audit's comparability |
| **FIXED vs DYNAMIC distinction** | The annual review depends on this |
| **Confidence ratings (Hi / Med / Lo)** | The 25%-Lo refusal threshold depends on this |
| **Single-file output** | Multi-file outputs split agent attention; the format is the framework |

If your fork changes any of these, it's no longer the same framework — it's a sibling framework. Ship it under a different name and we'll list it as a related project.

---

## §2 How to fork

### Soft fork — your audit, our framework

Most teams want this. You don't fork the framework repo; you reference it in your audits and supply your own customisation layer.

```
your-design-system/
├── _audit/
│   ├── audit-report-{date}.md
│   ├── _history.md
│   └── customisation.md    ← your weights + criteria additions
└── docs/
    └── 00-audit-and-roadmap.md  ← stub pointing at the framework
```

In `customisation.md`, declare:

```yaml
# customisation.md — overrides on top of the canonical framework
framework_version: 0.1.0
category_weights:
  part_a:
    A.1: 0.16    # default 0.14 — we weight tokens higher
    A.8: 0.14    # default 0.12 — we weight a11y higher
    # …
    # remaining must sum to 1.0
  part_b:
    # …
additional_criteria:
  - id: A.4.7
    title: "Regulatory change response time"
    tag: FIXED
    rubric:
      0: "No process"
      3: "Documented response process; SLA defined"
      5: "Automated regulatory feed → triage → patch within X days"
anchor_immutables:
  - slogan
  - primary_brand_colour
  - voice_axes
banned_phrases_extension:
  - "click here"   # soft-discouraged in our voice
  - "submit"        # we say "save"
```

When the agent runs an audit, it reads this file alongside the canonical framework and blends the two: defaults from the framework, overrides from `customisation.md`. The framework stays canonical; your overrides are local.

### Hard fork — your framework, your version

If you want to change the framework's invariants (modes, scoring scale, etc.), fork the repo and rename it. Conventions:

- Repo name: `<your-org>-design-system-audit-framework` or similar.
- README must declare the divergence from the canonical framework: which invariants you changed and why.
- Keep the LICENSE intact (MIT means you can sublicense, but attribution must stay).
- Open a PR back upstream proposing your invariant change as an RFC. If the canonical framework adopts the change, your fork can reabsorb.

Hard forks fragment the ecosystem; prefer soft forks where possible.

---

## §3 Industry-specific patterns

### HR Tech

Add criteria for:

- **Bias audit** (per criterion in B.9): compute disparate-impact ratio across protected classes for any algorithmic-decision UI.
- **OFCCP / EEOC compliance** (B.5 extension): cite regulatory framework, document proof of compliance per surface.
- **Lived-experience consultant review** (B.5.7 lift): named consultant, quarterly review, findings tracked.
- **Reasonable accommodation discovery flow** (B.3 extension): how the system surfaces accommodation requests.

Re-weight B.9 to 12% (default 10%) and B.5 to 14% (default 12%).

### Fintech

Add criteria for:

- **Algorithmic auditability** (B.9.6 lift): every algorithm-driven decision has a structured audit trail with timestamps, inputs, model version.
- **Adversarial-input testing** (B.3 extension): UI handles malicious / malformed input safely; no XSS, no injection, no overflow.
- **Confirmation-of-funds rigour** (B.3 extension): destructive actions on money require multi-factor confirmation per regulator's framework.
- **Locale-specific regulator gates** (B.5.8 extension): EAA + ESMA + FINRA + JFSA + others, per market.

Re-weight A.4 to 12% (default 10%) — governance matters more in money flows.

### Healthcare

Add criteria for:

- **HIPAA / GDPR Article 9 compliance**: documented data-flow diagrams, named DPO, incident-response runbook.
- **Clinical-language tier system** (B.6 extension): patient-facing strings at reading level X, clinician-facing at level Y.
- **Cognitive accessibility for distress states** (B.5 extension): trauma-informed patterns for sensitive contexts (diagnosis disclosure, etc.).
- **De-identification of test data** (`A.5` extension): no PHI in fixtures; CI gate.

Re-weight B.5 to 14% and B.9 to 12%.

### Govtech

Add criteria for:

- **Plain-language compliance per locale** (B.6 extension): local regulator's plain-language standard (e.g., US Plain Writing Act of 2010, UK GOV.UK style guide).
- **EAA + Section 508 + EN 301 549 conformance** (A.8 + B.5 lifts): all three required, not just one.
- **Public-sector procurement-ready** (A.4 + A.5 extensions): published security review, FedRAMP / IRAP / similar.
- **Multi-locale UI from day one** (A.6.5 extension): no locale shipped after launch; all official languages parity at GA.

### Education

Add criteria for:

- **Age-appropriate UX patterns** (B.5 extension): dual-mode UIs for child / adult / parent surfaces.
- **COPPA / GDPR-K / FERPA compliance** (B.9.7 extension): child-protection patterns audited.
- **Read-aloud / dyslexia-friendly fonts** (A.1.2 + B.5.6 extensions): explicit support beyond standard a11y.

---

## §4 Customisation governance

### When to update

- **Quarterly**, alongside the framework's DYNAMIC re-score cadence. Industry standards drift; your customisation drifts with them.
- **After every regulatory change** that affects your vertical (e.g., new EAA enforcement guidance).
- **After any audit cycle** where calibration notes flag systematic disagreement on a criterion. The disagreement may indicate the criterion as written doesn't fit your context.

### Who can change it

- **Soft fork (`customisation.md`)**: your team. No upstream coordination required.
- **Hard fork**: your team plus a public RFC. If a hard fork is the right move, propose it upstream too.

### How to document the change

In the customisation file, every override has a rationale:

```yaml
category_weights:
  part_b:
    B.5: 0.14
    # rationale: |
    #   We are an HR Tech system. EAA + OFCCP + state-level civil rights
    #   regulations create direct legal exposure for B.5 failures. Default
    #   weight 0.12 understates our risk profile.
    # decided: 2026-Q3
    # by: <DRI name>
```

The rationale block is part of the audit's input — agents use it when re-scoring DYNAMIC criteria, and human Co-Auditors use it during calibration.

---

## §5 Forking-of-the-framework discipline

If you ship a fork (soft or hard), publish it. The community grows when forks are visible.

| Step | What to do |
|---|---|
| Tag your customisation | `git tag custom-v0.1.0` against your design system repo |
| Open a PR upstream | Add an entry to the framework's `examples/` folder pointing at your repo |
| Submit a case study | Write 1–2 paragraphs on what you customised and why; include audit deltas |
| Maintain | When the canonical framework releases a new version, update your customisation against the new criteria; document the merge |

The framework will list your fork under "Industry forks" in the README. Visibility helps everyone.

---

## §6 What forks have NOT done well historically

Patterns to avoid, learned from prior framework attempts in the design-systems space:

- **Customising for one team's preferences masquerading as "industry needs".** If only one team in your industry would agree with the customisation, it's a team preference, not an industry pattern.
- **Adding criteria that can't be measured.** Every criterion needs a 0 / 3 / 5 anchor that's verifiable. "Has good vibes" is not a criterion.
- **Removing criteria.** Don't. If a criterion doesn't apply to your system, score it `n/a` with a one-sentence justification — don't excise it. Future audits may need it.
- **Renaming criteria.** Confuses cross-fork comparison. Add aliases if you must, but the canonical ID stays.
- **Forking and disappearing.** A published fork that hasn't shipped an audit in a year is dead. Visibility is a commitment.

---

*Continue to [`10-prompt-pack.md`](./10-prompt-pack.md) for the LLM prompt pack overview.*
