# FR-CORE-005 - Mode W

**Mode name:** W mode
**Purpose:** reverse-engineer a website that does not yet have a design system.
**Repo-verifiable state:** v0.2 Mode W doctrine and starter outputs ready.

## Output Bundle

| Output | Path |
|---|---|
| Starter governance template | `templates/mode-w-governance-template.md` |
| Token starter contract | `docs/core/mode-w.md#tokens-json-starter` |
| Figma handoff placeholder | Human-generated Figma file; repo stores the required frame contract below. |

## Flow

1. Capture representative pages: homepage, product page, conversion page, authenticated dashboard if available, error/empty state, and mobile viewport.
2. Extract visual primitives: color, type, spacing, radius, elevation, motion.
3. Infer semantic tokens and component candidates.
4. Score against DSAF-25 with a clear "pre-DS website" flag.
5. Produce governance starter: ownership, naming, contribution, release cadence, and no-silent-regression rules.

## Tokens JSON Starter

```json
{
  "color": {
    "$type": "color",
    "primitive": {
      "brand-600": { "$value": "#1f2a44", "$description": "Extracted primary brand color" }
    },
    "semantic": {
      "text-primary": { "$value": "{color.primitive.brand-600}", "$description": "Primary text on light surfaces" }
    }
  }
}
```

## Figma Frame Contract

- Page 1: extracted primitives.
- Page 2: semantic tokens.
- Page 3: component candidates.
- Page 4: DSAF-25 gap summary.
- Page 5: governance starter.

