# Contributing to the Design System Audit Framework

Thank you for considering a contribution. DSAF is intentionally opinionated, but every part of it is open to revision through the proposal flow described below.

## Three kinds of contribution

### 1. Editorial — typo fixes, broken links, clearer phrasing

Open a PR directly. One PR per file is fine. CI will run the check scripts; the PR can merge as soon as a maintainer reviews.

**Approval window:** 5 days.

### 2. Substantive — new criteria, rubric changes, new templates

File an issue first using the template `Substantive proposal`. Discuss for at least 7 days before opening the PR. The PR must include:

- A motivation section (why the change matters).
- A backward-compatibility note (does this re-score existing audits, or only future ones?).
- An impact statement (which categories shift, which numbers move).
- An update to the relevant criterion rubric anchors (0 / 3 / 5).

**Approval window:** 14 days. Two maintainer approvals required.
Until the TASK-GOV-002 co-maintainer seat is accepted, this means founder approval after the public 14-day discussion window.
After a co-maintainer is active, it means approval from both current maintainers unless an RFC explicitly defines a broader rule.

### 3. Architectural — modes, actors, scoring algorithm, the no-silent-regression rule

These are the framework's invariants. Changes require a full RFC. See `docs/rfc-template.md` (coming in v0.2). RFC discussion is at minimum 30 days and triggers a major version bump.
Before the maintainer group reaches three people, RFC approval requires all active maintainers plus a public decision note.
After the group reaches three people, RFC approval requires three maintainer approvals.

## Adding your own audit as a case study

We want this. If you've used the framework on your own design system, please open a PR adding an entry under `examples/`:

```
examples/
└── your-design-system/
    ├── README.md                  brief intro: what you audited, what tier you reached
    ├── audit-report-{date}.md     your audit (anonymise customer-specific data if you must)
    └── improvement-plan.md        what you're doing about the gaps
```

The README of the framework links every case study under "Who's using it".

## Style notes

- Markdown only (no Mermaid, no HTML, no proprietary formats).
- One sentence per line for diff-friendliness in long prose blocks.
- Cite sources. Industry-leading benchmarks (e.g., "Carbon ships 50+ components") need a verifiable URL or a year.
- No emojis in the framework docs themselves (the prompt pack and README can use them sparingly).
- No proprietary brand names in the criteria (Material, Polaris, Carbon, Spectrum are fine as references; never as defaults).

## Voice

The framework is opinionated, calm, and direct. It reads like a senior designer or staff engineer giving a junior a clear path. It does not hype, and it does not hedge to the point of unhelpfulness. When in doubt: shorter, more specific, no marketing language.

## Translations

Translations into other languages are very welcome. Open an issue first to coordinate. We accept translations as `docs/{lang}/...` mirror trees; the English version remains canonical.

## Naming and taxonomy

PRs that introduce text on external-facing surfaces (`README.md`, anything under `docs/`, anything under `audit.cyberskill.world/`, anything destined for a blog or social post) are reviewed against the DSAF handle taxonomy at [`internal/branding/handle-taxonomy.md`](../internal/branding/handle-taxonomy.md). The short version: use `DSAF` as the brand, use the long name once per surface at first mention, use `DSAF Criteria` / `DSAF Levels` / `DSAF Modes` / `DSAF-25 Core` as the component handles, and never use `Framework` as a capitalised noun-handle.

The glossary at [`internal/branding/glossary.md`](../internal/branding/glossary.md) is the source of truth for every DSAF-specific term. New coined terms are added there in the same PR that coins them.

## Maintainers

DSAF is maintained by Stephen Cheng and CyberSkill as the original authoring practice.
The co-maintainer role charter lives at [`internal/governance/co-maintainer-charter.md`](../internal/governance/co-maintainer-charter.md).
Candidates are not publicly attributed before written acceptance and co-signed announcement.
The public maintainer list in [`README.md`](../../README.md) includes the open co-maintainer seat until acceptance.
Post-acceptance, update README, this file, the announcement post, and GitHub access in that order.

## Governance

Editorial fixes can merge after maintainer review.
Substantive rubric changes require a proposal issue and 14-day discussion window.
Architecture changes use the future RFC cycle and require maintainer consensus.

For commercial audits, custom criterion sets, or vertical-pack adaptations, contact CyberSkill directly.

---

*Hiện Thực Hoá Ý Chí.*
