# DSAF Brand Audit — 2026-05-18

**task:** TASK-BRAND-002 **Scope:** handle taxonomy on repo external surfaces and live deploy. **Result:** PASS for banned noun-handle checks.

## Repo Checks

Command:

```bash
rg -n "\b(the )?DSAF Framework\b|\bDSAF framework\b|CyberSkill'?s framework|CyberSkill framework|no-silent-regression rule" README.md CONTRIBUTING.md guidelines/01-introduction.md framework/02-framework.md framework/07-maturity-tiers.md landing docs/social
```

Result:

```text
no matches
```

Surface counts:

| File | Long-name count | `DSAF` count | Component handles |
|---|---:|---:|---|
| `README.md` | 1 | 15 | DSAF Criteria, DSAF Levels, DSAF-25 Core |
| `landing/index.html` | 2 | 30 | DSAF Criteria, DSAF Levels, DSAF-25 Core |
| `landing/card/index.html` | 0 | 12 | DSAF Criteria, DSAF-25 Core |
| `CONTRIBUTING.md` | 1 | 9 | DSAF Criteria, DSAF Levels, DSAF Modes, DSAF-25 Core |

`landing/index.html` keeps the long name in metadata (`<title>` and `og:title`) for search/social previews; visible body copy now uses `DSAF`.

## Live Checks

Live check script fetched:

- `https://audit.cyberskill.world/`
- `https://audit.cyberskill.world/card`

Result:

```json
[
  {
    "url": "https://audit.cyberskill.world/",
    "status": 200,
    "banned": false,
    "longNameCount": 4,
    "dsafCount": 28
  },
  {
    "url": "https://audit.cyberskill.world/card",
    "status": 200,
    "banned": false,
    "longNameCount": 1,
    "dsafCount": 11
  }
]
```

The live deploy has no banned noun-handle forms. The repo source additionally reduces repeated visible long-name usage; that improvement lands on the next Vercel deploy.

## Files Updated During Verification

- `framework/02-framework.md` — H1 normalized from "DSAF framework spec" to "DSAF Operating Spec".
- `CONTRIBUTING.md` — legacy rule name updated and long-name repetition reduced.
- `landing/index.html` — visible brand/footer copy normalized to `DSAF`; footer link text changed to `DSAF spec`.
- `landing/card/index.html` — meta description normalized to `DSAF Criteria`.
- `internal/social/README.md` and `internal/social/show-hn.md` — social guidance avoids banned noun-handle and legacy rule phrasing.
