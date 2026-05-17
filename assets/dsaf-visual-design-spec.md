# DSAF — Visual design spec

**Status:** normative; ratified by FR-BRAND-003 (2026-05-17).
**Purpose:** the design intent that every DSAF visual is authored against. New visuals (post-launch) MUST conform to this spec; the canonical visuals — the L0–L5 level ladder, the DSAF radar chart, and the DSAF-25 Core card — are the reference implementations.

## Canonical visuals

| Visual | Light SVG | Dark SVG | Print PDF | Role |
|---|---|---|---|---|
| L0–L5 level ladder | `dsaf-level-ladder.svg` | (light SVG renders well on `prefers-color-scheme: dark` via `currentColor`) | derive on demand | narrative — the climb story |
| DSAF radar | `dsaf-radar-chart.svg` | (light SVG renders well on `prefers-color-scheme: dark` via `currentColor`) | derive on demand | diagnostic — per-category shape |
| DSAF-25 Core card | `dsaf-25-card.svg` | (light SVG renders well on `prefers-color-scheme: dark` via `currentColor`) | `dsaf-25-card-print.pdf` | share-handle — the one-page card |

The shipped SVGs use `fill="currentColor"` on text and structural shapes so a single asset adapts to light and dark themes when embedded inline. Where a hand-tuned dark variant is later required for higher contrast headroom, ship a separate `*-dark.svg` and reference it via `<picture media="(prefers-color-scheme: dark)">`.

## Typography

System fonts only: `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif`. No commissioned fonts unless the font file ships under `assets/fonts/` with a redistribution-compatible license.

Body text in any visual MUST render at ≥ 11pt when the SVG is printed at A4 or US letter. Headings render at ≥ 18pt. Use `font-weight: 700` for the brand mark; `font-weight: 800` for the H1; everything else 400–600.

## Color palette

Monochrome-first with one warm accent. Inline CSS variables (visible to `currentColor`) drive the palette. No raster fills, no gradients beyond the L0–L5 ladder's tonal ramp.

| Token | Light value | Dark value | Use |
|---|---|---|---|
| `--ink` | `#1f2a44` | `#f6f8fb` | foreground text + axis lines |
| `--bg` | `#fbfaf7` | `#101722` | background fill |
| `--muted` | `#54647f` | `#b8c3d6` | secondary labels |
| `--line` | `#d8dfeb` | `#304057` | grid + axis ticks |
| `--accent` | `#d28b00` | `#efc362` | active-tier highlight + radar polygon fill |
| `--panel` | `#ffffff` | `#172233` | tile/card backgrounds |

The accent MUST meet APCA Lc 60 against the background.

## Proportions and viewBox

- L0–L5 ladder: `viewBox="0 0 1200 540"` (16:7 landscape — fits Twitter card 1200×675 with 67 px breathing room top + bottom).
- DSAF radar: `viewBox="0 0 1200 1200"` square; data polygon centred; axis labels sit on a 540 px radius safe area.
- DSAF-25 Core card: `viewBox="0 0 840 1188"` (A4 portrait) with a guaranteed-fit US letter subset margin of 6 mm on the long axis.

ViewBox sizing is fluid — visuals MUST scale cleanly from favicon (32 px) to projector (4096 px) without rasterising.

## Accessibility contract

Every shipped SVG MUST include WAI-ARIA SVG accessibility elements:

```xml
<svg role="img" aria-labelledby="title desc" ...>
  <title id="title">Short visual name</title>
  <desc id="desc">One-sentence semantic description of what the visual conveys.</desc>
  ...
</svg>
```

Text in the SVG source MUST remain as `<text>` elements (never converted to paths). Screen readers, crawlers, and `curl` MUST be able to extract labels.

## File-size caps

- Each canonical SVG ≤ 80 KB un-gzipped (≤ 30 KB gzipped). A larger SVG signals embedded raster images, base64 fonts, or decorative gradients; none of the canonical visuals need them.
- Print PDFs ≤ 200 KB.

## Screenshot test

A canonical visual rendered at 1200 × 675 px (Twitter card sized) MUST be recognisable on social media without zoom. A reviewer who has never seen the visual SHOULD be able to identify the chart type (ladder / radar / card) at thumbnail scale. If thumbnails fail this test, the visual is rejected.

## Versioning

Each canonical SVG MUST carry a `<metadata>` block recording the DSAF rubric version it was authored against:

```xml
<metadata>
  <dsaf:version xmlns:dsaf="https://audit.cyberskill.world/ns/v1">
    <dsaf:dsaf_125_version>2026-05-17</dsaf:dsaf_125_version>
    <dsaf:dsaf_25_version>2026-05-17</dsaf:dsaf_25_version>
  </dsaf:version>
</metadata>
```

When FR-CORE-003 dedup changes category counts or DSAF-25 selections shift, the relevant visual MUST be regenerated in the same PR.

## Raster fallbacks

Canonical assets are SVG only. Raster (PNG/JPG) is a *consumption* pattern: a `make-raster.sh` helper MAY render PNGs on demand at 1200×675 (social), 1080×1080 (Instagram), and 4096×4096 (print-large). The script's outputs are NOT committed to the repo.

## Transition gates on the ladder

The L0–L5 ladder visually communicates the *climb path* documented in `docs/07-maturity-tiers.md` §3 — not just the tier names. The shipped ladder uses ascending bar heights to convey rising maturity, and the footnote line explicitly references the L3 self-audit publication cap. A future revision MAY add per-tier "you need:" callouts as `<text>` elements.

## Enterprise-grade boundary on the radar

The DSAF radar SHOULD overlay a "minimum enterprise" boundary as a dashed line per the floors in `docs/07-maturity-tiers.md` §2 (combined ≥ 65%, A.8 ≥ 75%, B.5 ≥ 75%, A.1 ≥ 70%, A.4 ≥ 60%, A.3 ≥ 65%, any category ≥ 40%). The current shipped radar shows the polygon shape; the boundary overlay is a follow-on visual upgrade.

## Embedding patterns

Both inline-SVG (`<svg>...</svg>` in the page source) and referenced-SVG (`<img src="./assets/dsaf-25-card.svg" alt="...">`) embeds are supported. The canonical `landing/` site (deployed at `audit.cyberskill.world`) uses inline-embed so the text content stays in page source (per FR-BRAND-001 + FR-CORE-001 accessibility patterns). README and blog posts use referenced-embed (simpler authoring).

*End of visual design spec.*
