---
id: FR-BRAND-003
title: "Commission canonical L0–L5 ladder + radar chart SVGs into `/assets/`"
module: BRAND
priority: MUST
status: accepted
verify: I
phase: P0
milestone: P0 · slice 1 · Pre-launch hardening
slice: 1
owner: Stephen Cheng (Founder) + commissioned illustrator
created: 2026-05-17
shipped: null
related_frs: [FR-BRAND-001, FR-BRAND-002, FR-CORE-001, FR-DOCS-001, FR-CONTENT-001, FR-LAUNCH-001]
depends_on: [FR-BRAND-002, FR-CORE-001]
blocks: [FR-DOCS-001, FR-CONTENT-001, FR-LAUNCH-001]
source_pages:
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Naming, branding, governance — 'Visual identity: invest in this in Phase 0')"
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§What drives GitHub stars item 2 — 'one killer visual that gets screenshotted')"
  - "docs/Design System Audit Framework — Multi-Phase Improvement Plan.md (§Phase 0 — Pre-launch hardening, action 4)"
  - "docs/07-maturity-tiers.md (L0–L5 rubric — source of truth for the ladder)"
  - "docs/dsaf-25.md (DSAF-25 Core — source of category dimensions for the radar)"
source_decisions:
  - "DEC-020: two iconic visuals — the L0-L5 ladder (CMM-style tier chart) and the radar chart (per-category score visualisation) — every methodology brand that broke through has one or two visuals; DSAF has exactly two"
  - "DEC-021: both visuals are SVG, hand-authored (not auto-generated), monochrome-first with optional color overlay, accessible (title + desc + readable text), printable + screenshottable"
  - "DEC-022: visuals are versioned alongside DSAF-125 + DSAF-25 — if FR-CORE-003 dedup changes category counts, the radar's axes update in the same PR"
language: svg + markdown
service: doctrine + assets
new_files:
  - assets/dsaf-l0-l5-ladder.svg
  - assets/dsaf-l0-l5-ladder-dark.svg
  - assets/dsaf-l0-l5-ladder-print.pdf
  - assets/dsaf-radar.svg
  - assets/dsaf-radar-dark.svg
  - assets/dsaf-radar-print.pdf
  - assets/dsaf-visual-design-spec.md
  - assets/dsaf-radar-template.json
modified_files:
  - README.md
  - docs/01-introduction.md
  - docs/07-maturity-tiers.md
  - docs/dsaf-25.md
allowed_tools:
  - "file_read/write assets/**, docs/**, README.md"
  - "SVG authoring (Figma export, hand-edit in text editor, or commissioned illustrator)"
  - "PDF generation via Inkscape or headless Chrome from the SVG"
  - "xmllint for SVG accessibility verification"
  - "Lighthouse for embedded-SVG performance check on dsaf.dev"
disallowed_tools:
  - "ship a non-SVG raster image (PNG/JPG) as the canonical visual — SVG is the format because it's scalable, inspectable, screen-reader-extractable, and small"
  - "use a third-party hosted image (Cloudinary, Imgur, etc.) — assets live in /assets/, served from the repo and from dsaf.dev"
  - "render either visual at a fixed pixel size; viewBox-based SVG MUST scale fluidly"
  - "use proprietary fonts that won't render without a font file shipped alongside; system-ui or commonly-available web fonts only"
effort_hours: 8
sub_tasks:
  - "1. (1h) Author assets/dsaf-visual-design-spec.md per §3 — the design intent doc that the illustrator (or the founder) implements against"
  - "2. (2h) Author / commission assets/dsaf-l0-l5-ladder.svg — light-mode + dark-mode variants + print PDF (per §3 visual design)"
  - "3. (2h) Author / commission assets/dsaf-radar.svg — 20-axis radar (10 Part A + 10 Part B categories, or post-FR-CORE-003 stabilised count) — light-mode + dark-mode variants + print PDF"
  - "4. (1h) Author assets/dsaf-radar-template.json — the radar's data shape (per-category percentages) that downstream tooling (FR-INTEG-001, FR-CLI-001, FR-BENCH-001) feeds into a renderer"
  - "5. (45m) Patch README.md to embed both visuals (inline SVG or img src=./assets/...svg) above the fold"
  - "6. (30m) Patch docs/01-introduction.md to reference the visuals at the relevant moment in the prose"
  - "7. (30m) Patch docs/07-maturity-tiers.md to embed the L0-L5 ladder near §1 'The six tiers' table"
  - "8. (30m) Patch docs/dsaf-25.md to embed the radar template near the 'How to use' section"
  - "9. (15m) Run §5 verification: Lighthouse score on embedded SVGs, xmllint accessibility, file sizes within caps"
risk_if_skipped: "The plan §'What drives GitHub stars' item 2 names this as one of four levers that move methodology-repo stars: 'one killer visual that gets screenshotted on social media (DORA's elite-vs-low cluster chart; 12factor's twelve-line manifesto).' Without canonical visuals, every conference-talk slide, every Twitter post, every blog post about DSAF improvises a visual — usually a generic CMM ladder borrowed from elsewhere, or a default radar chart from a library. The brand's iconic surface becomes inconsistent and unrecognisable. The plan §'Naming, branding, governance' is explicit: 'Frameworks that broke through have one iconic visual (atomic-design's chemistry diagram; 12factor's twelve numbered cards). Commission a single radar/spider chart variant + an L0–L5 ladder graphic that becomes the framework's screenshot.' Skipping this FR also blocks FR-DOCS-001 (README rewrite needs the visuals above the fold), FR-CONTENT-001 (weekly criterion deep-dives use the radar to show category coverage), and FR-LAUNCH-001 (Show HN post uses both visuals as attached images). The cost is one focused-session-with-an-illustrator; the value is the screenshot that defines the brand for 5+ years."
---

## §1 — Description (BCP-14 normative)

The framework MUST ship two canonical hand-authored SVG visuals: the **L0–L5 ladder** (a CMM-style tier chart visualising the six DSAF Levels) and the **DSAF radar** (a 20-axis spider chart visualising per-category percentages, one axis per category). Both visuals MUST be present as light-mode SVG, dark-mode SVG, and print PDF in `/assets/`.

1. **MUST** ship the **L0–L5 ladder** at `assets/dsaf-l0-l5-ladder.svg` (light mode) and `assets/dsaf-l0-l5-ladder-dark.svg` (dark mode) + `assets/dsaf-l0-l5-ladder-print.pdf` (print). The ladder visualises the six DSAF Levels per `docs/07-maturity-tiers.md` §1: L0 Initial (< 40%), L1 Repeatable (40–55%), L2 Defined (55–65%), L3 Managed (65–75%), L4 Managed-advanced (75–85%), L5 Optimised (85%+). Each tier shows: tier name, score range, one-line meaning per the existing rubric.
2. **MUST** ship the **DSAF radar** at `assets/dsaf-radar.svg` (light), `assets/dsaf-radar-dark.svg` (dark), `assets/dsaf-radar-print.pdf` (print). The radar has 20 axes (one per DSAF Category — 10 Part A + 10 Part B) — or the post-FR-CORE-003-dedup-stabilised count. Each axis shows category name + 0–100% scale; the radar polygon shows the score per category at audit time.
3. **MUST** ship `assets/dsaf-radar-template.json` — the radar's data shape (per-category percentages with category IDs) that downstream tooling (FR-INTEG-001 Storybook addon, FR-CLI-001 `npx dsaf scan`, FR-BENCH-001 lite benchmark) feeds into the radar renderer. Format per §3.
4. **MUST** ship `assets/dsaf-visual-design-spec.md` — the design intent document. The spec defines: typography (system-ui fallback chain), color palette (monochrome-first with one accent), proportions (viewBox + safe area), accessibility contract (`<title>` + `<desc>` + readable text in SVG source), file-size caps, and the "screenshot test" (the visual at 1200×675 px must be recognisable on social media without zoom).
5. **MUST** include `<title>` and `<desc>` WAI-ARIA SVG accessibility elements in every shipped SVG. `<title>` is the visual's short name; `<desc>` is a one-sentence semantic description of what the visual conveys. Screen-reader users hearing the SVG MUST be able to identify it.
6. **MUST** make the SVG text content readable in the page source. Category names, tier names, score-range labels, and footer attribution are real `<text>` elements (not text-converted-to-paths). Search-engine crawlers and screen-readers MUST be able to extract the labels.
7. **MUST** size each SVG so the print PDF fits a single 8.5×11 letter and A4 page at the default print scale. ViewBox is sized to A4 (210×297 mm) for portrait visuals OR landscape (297×210 mm) for the wider radar. Letter (216×279 mm) is a guaranteed-fit subset.
8. **MUST** cap each SVG at 80 KB un-gzipped (≤ 30 KB gzipped). A larger SVG signals embedded raster images, base64 fonts, or decorative gradients — none of which the visuals need. The caps match `dsaf.dev/` inline-embed performance targets (per FR-BRAND-001 §1 #5 Lighthouse ≥ 95).
9. **MUST** version-pin each visual to the DSAF-125 + DSAF-25 rubric version it was generated against. SVG frontmatter (in `<metadata>` block) records `dsaf_125_version: <YYYY-MM-DD>` and `dsaf_25_version: <YYYY-MM-DD>`. When FR-CORE-003 dedup changes category counts, the radar's axes get regenerated in the same PR.
10. **MUST** ship both light-mode and dark-mode variants of each SVG. Dark mode is NOT achieved via CSS-only `prefers-color-scheme` inversion — the dark-mode SVG is a separately-authored variant with hand-tuned contrast for screen-readability. README and dsaf.dev use `<picture>` element with `media="(prefers-color-scheme: dark)"` to swap automatically.
11. **MUST** be embed-compatible with both `<svg>` inline embedding (text content stays in page source) and `<img src="...svg">` referenced embedding (text content stays in the SVG file). README and dsaf.dev/ use inline-embed (per FR-BRAND-001 + FR-CORE-001 accessibility patterns); blog posts and conference slides use referenced-embed (simpler authoring).
12. **MUST NOT** ship raster fallbacks (PNG/JPG) as canonical assets. SVG is the format. If a downstream surface (Twitter, LinkedIn, conference projector) needs a raster, it converts on demand — but the canonical asset is SVG and the assets directory is SVG-only. A `make-raster.sh` script in `assets/` MAY render PNGs on demand at common sizes (1200×675 for Twitter, 1080×1080 for Instagram, 4096×4096 for print-large) but the script's outputs are NOT committed to the repo.
13. **MUST** name the typography system in the design spec and use it consistently. System default: `system-ui, -apple-system, "Segoe UI", "Helvetica Neue", Arial, sans-serif` (the same stack as FR-BRAND-001's landing page). No commissioned fonts unless the font file ships in `assets/fonts/` AND the license permits redistribution.
14. **MUST** ensure the L0–L5 ladder visually communicates the *transition gates* (what it takes to climb from L1 to L2, L4 to L5, etc.) — not just the tier names. The ladder MAY use connecting arrows, gate labels, or per-tier "you need:" callouts to convey the climb path documented in `docs/07-maturity-tiers.md` §3.
15. **MUST** make the radar visually communicate the *enterprise-grade thresholds* — the floors documented in `docs/07-maturity-tiers.md` §2 (`A.8` ≥ 75%, `B.5` ≥ 75%, `A.1` ≥ 70%, `A.4` ≥ 60%, `A.3` ≥ 65%, any single category ≥ 40%). The radar SHOULD overlay a "minimum enterprise" boundary as a dashed line so a viewer sees at a glance whether a given audit clears all floors.

---

## §2 — Why this design

**Why two visuals, not one (§1 #1, #2):** the L0–L5 ladder and the radar do different jobs. The ladder is *narrative* — it tells the story of climbing tiers; it goes on slides, in conference-talk hero shots, on the README. The radar is *diagnostic* — it shows the per-category shape of a given system at a given moment; it goes on every audit report and on benchmark.dsaf.dev (P4). Trying to compress both into one visual collapses the narrative and the diagnosis into a less-useful hybrid. The plan's reference cases support two: DORA has the elite-vs-low cluster chart (narrative) AND the four-metrics card (diagnostic); 12-factor has the manifesto (narrative) AND each factor's own page-icon (diagnostic).

**Why hand-authored, not auto-generated (§1 #1, #2):** the visuals are the framework's brand surface. Auto-generated typography reads as "made by code"; hand-authored typography reads as "designed by someone who cared." The plan §"What drives GitHub stars" item 2 is explicit — "one killer visual that gets screenshotted." Killer doesn't come from defaults. The cost (8 founder-hours OR a commissioned illustrator at ~$500–$1500) is trivial against the value (the framework's iconic visual for 5+ years).

**Why monochrome-first + one accent (§3 visual spec):** monochrome prints; monochrome screenshots cleanly; monochrome doesn't require color-blindness contrast tuning. One accent (a single brand color — e.g., DSAF blue `#0a58ca` or a near-equivalent that meets APCA Lc 60 on white) is the affordance that distinguishes the polygon-fill on the radar and the active-tier highlight on the ladder. Multi-color visuals invite "but in our brand we use #..." conversations that the framework can't engage with — it's tooling, not branding for adopting teams.

**Why screen-reader-extractable text (§1 #5, #6, §3):** the framework's own A.8 + B.5 accessibility criteria demand it. A visual whose text isn't extractable fails the framework's own rubric. Beyond compliance: text in the SVG source means search-engine crawlers index the tier names and category names; means `curl` can grab them; means a screen-reader hearing the SVG conveys real information, not "[image]." This is also FR-CORE-001 §1 #7's pattern applied to the visuals.

**Why dark-mode is hand-authored, not CSS-inverted (§1 #10):** automatic color-inversion `filter: invert(1)` produces washed-out greys and inverts the brand accent into a clashing color. Hand-tuned dark variants have the same information density and contrast headroom but with appropriate background-foreground contrast for low-light reading. The cost is one extra SVG per visual (4 SVGs total: 2 visuals × 2 modes); the value is professional appearance on every viewer's preferred theme.

**Why version-pin to rubric (§1 #9):** the radar's axes are the DSAF Categories. If FR-CORE-003 dedup changes the category count from 20 to 18 (hypothetically), the radar's 20-axis layout is stale. The version-pin metadata is the audit-trail surface — a future reader of the SVG can verify it was generated against the current rubric. The version pin also makes regeneration mechanical: when the rubric ships v2, the radar regenerates against v2 in the same PR.

**Why no raster canonicals (§1 #12):** PNG/JPG don't scale; the same image at 200px (favicon) and 4096px (conference-projector hero) requires multiple raster files. SVG is one file, scales fluidly. The on-demand raster-conversion is a *consumption* pattern (Twitter ingests PNGs better than SVGs; LinkedIn does too) — but the *canonical* asset stays SVG. A `make-raster.sh` script is the bridge.

**Why the enterprise-grade boundary on the radar (§1 #15):** the framework's `docs/07-maturity-tiers.md` §2 enterprise-grade threshold table is the most-cited quantitative gate. A radar that doesn't show the threshold makes the viewer mentally overlay it; a radar that shows it conveys "are you above the floor?" in one glance. This is the diagnostic-value-per-pixel that justifies a 20-axis radar over a simpler chart.

**Why transition-gate visualisation on the ladder (§1 #14):** the L0–L5 tiers are easy to misread as "we're at L3, we just need to grind to L4." The actual gates per `docs/07-maturity-tiers.md` §3 are specific (e.g., "L4 → L5 requires independent third-party WCAG audit + ≥ 5 external contributors + ≥ 2 prior audits"). A ladder that just lists tier names loses this information; a ladder that calls out the gates educates the viewer in 2 seconds. The plan's "L5 is hard" framing per the source plan is exactly what the gates communicate.

---

## §3 — Doctrine contract

### `assets/dsaf-visual-design-spec.md` (NEW) — body shape

```markdown
# DSAF — Visual design spec

**Status:** normative; ratified by FR-BRAND-003 (2026-05-17).
**Purpose:** the design intent that every DSAF visual is authored against. New visuals (post-launch) MUST conform to this spec; the two canonical visuals (L0–L5 ladder + radar) are the reference implementations.

## Typography

Default stack:

```css
font-family: system-ui, -apple-system, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
```

Sizes (relative to A4 viewBox; scale fluidly):

- H1 (visual title): 18pt, weight 700
- H2 (section labels — tier names, category groups): 14pt, weight 600
- H3 (axis labels, sub-callouts): 11pt, weight 500
- Body (rubric descriptions, gate callouts): 9pt, weight 400, line-height 1.3
- Footer (attribution, version pin, URL): 7pt, weight 400

Line-height: 1.3 for body, 1.1 for headings.

## Color palette

Monochrome-first; one accent color.

**Light mode:**
- Foreground: `#111827` (near-black; ~95% black-on-white contrast)
- Background: `#ffffff`
- Accent: `#0a58ca` (DSAF blue; APCA Lc 64 on white — passes WCAG 2.x AA body-text)
- Muted: `#6b7280` (grey for secondary text)
- Dashed-line / overlay: `#9ca3af` (grey-400)

**Dark mode:**
- Foreground: `#f9fafb` (near-white)
- Background: `#0f172a` (slate-900)
- Accent: `#60a5fa` (lighter blue; APCA Lc -67 on slate-900)
- Muted: `#94a3b8` (slate-400)
- Dashed-line / overlay: `#475569` (slate-600)

No gradients. No drop shadows. No textures.

## ViewBox and safe area

**L0–L5 ladder (portrait):**
- ViewBox: `0 0 210 297` (A4 portrait, mm units)
- Safe area: 12mm margin on all sides → content area 186 × 273 mm
- Letter (216 × 279 mm) is a guaranteed-fit subset (safe-area unchanged)

**DSAF radar (landscape):**
- ViewBox: `0 0 297 210` (A4 landscape, mm units)
- Safe area: 12mm margin → content area 273 × 186 mm
- The radar polygon center is at (148.5, 105) — page center
- The radar's maximum radius is 80mm (axis labels live in the 8mm ring outside the polygon)

## Accessibility contract

Every shipped SVG MUST include:

```xml
<svg viewBox="..." xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">
  <title id="title">DSAF — L0-L5 Maturity Ladder</title>
  <desc id="desc">A vertical ladder visualising the six DSAF Levels (L0 Initial through L5 Optimised) with score ranges and transition-gate requirements per category.</desc>
  <!-- visual content -->
</svg>
```

- `<title>` is the visual's short name (≤ 50 chars).
- `<desc>` is a one-sentence semantic description (50–120 chars) of what the visual conveys.
- `role="img"` is explicit; `aria-labelledby` references both elements.
- All text content is in `<text>` elements (not `<image>` or `<path>` of glyphs). Search engines, screen readers, and `curl` MUST be able to extract.

## File-size caps

| Asset | Un-gzipped cap | Gzipped cap |
|---|---:|---:|
| `assets/dsaf-l0-l5-ladder.svg` (light) | 80 KB | 30 KB |
| `assets/dsaf-l0-l5-ladder-dark.svg` (dark) | 80 KB | 30 KB |
| `assets/dsaf-radar.svg` (light) | 80 KB | 30 KB |
| `assets/dsaf-radar-dark.svg` (dark) | 80 KB | 30 KB |
| `*.pdf` (each) | 200 KB | n/a (PDFs ship as-is) |

Caps enforced at CI gate (post-launch). Larger SVGs signal embedded raster, base64 font, or decorative gradients.

## Version pinning

Every SVG includes a `<metadata>` block:

```xml
<metadata>
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:dc="http://purl.org/dc/elements/1.1/">
    <rdf:Description>
      <dc:title>DSAF — L0-L5 Maturity Ladder</dc:title>
      <dc:creator>Stephen Cheng (Founder, CyberSkill) + commissioned illustrator</dc:creator>
      <dc:date>2026-05-17</dc:date>
      <dc:source>https://dsaf.dev/assets/dsaf-l0-l5-ladder.svg</dc:source>
      <dc:version>dsaf_125_v1 + dsaf_25_v1 (FR-CORE-001 + FR-CORE-003 ratification date 2026-05-17)</dc:version>
    </rdf:Description>
  </rdf:RDF>
</metadata>
```

## Screenshot test

A visual MUST be recognisable when rendered at 1200×675 px (Twitter card aspect, the smallest social-share size we target). The screenshot test: take the SVG, render at 1200×675 px, post to a Slack channel, ask three people "what does this show?" — they MUST be able to identify the visual's subject (DSAF Levels OR DSAF radar) without zooming or asking.

If a visual fails the screenshot test, simplify (drop secondary information, increase primary text size, increase contrast).

## What this spec is NOT

- Not a brand-system spec for adopting teams. DSAF's visuals are tools; adopting teams use their own design system.
- Not a marketing-collateral spec. Marketing assets (landing-page hero, conference banner) ship separately and MAY use a different palette.
- Not a constraint on the audit-report's own visualisations. Audit reports MAY embed the radar visual but also MAY include other charts (bar charts of per-criterion scores, etc.) at the auditor's discretion.
```

### `assets/dsaf-radar-template.json` (NEW) — body shape

```json
{
  "$schema": "https://dsaf.dev/schemas/dsaf-radar-v1.json",
  "version": "dsaf_125_v1+dsaf_25_v1",
  "version_date": "2026-05-17",
  "axes": [
    { "id": "A.1",  "name": "Foundations & Tokens",      "part": "A", "weight": 14, "value_pct": null },
    { "id": "A.2",  "name": "Component Library",         "part": "A", "weight": 13, "value_pct": null },
    { "id": "A.3",  "name": "Documentation",             "part": "A", "weight": 10, "value_pct": null },
    { "id": "A.4",  "name": "Governance & Versioning",   "part": "A", "weight": 10, "value_pct": null },
    { "id": "A.5",  "name": "Tooling & Distribution",    "part": "A", "weight": 10, "value_pct": null },
    { "id": "A.6",  "name": "Cross-platform & Theming",  "part": "A", "weight": 8,  "value_pct": null },
    { "id": "A.7",  "name": "Accessibility (system)",    "part": "A", "weight": null, "value_pct": null },
    { "id": "A.8",  "name": "Performance & Quality",     "part": "A", "weight": null, "value_pct": null },
    { "id": "A.9",  "name": "AI / MCP Readiness",        "part": "A", "weight": null, "value_pct": null },
    { "id": "A.10", "name": "<populate at FR-CORE-003 land>", "part": "A", "weight": null, "value_pct": null },
    { "id": "B.1",  "name": "Research signals",          "part": "B", "weight": null, "value_pct": null },
    { "id": "B.2",  "name": "Information architecture",  "part": "B", "weight": null, "value_pct": null },
    { "id": "B.3",  "name": "Interaction patterns",      "part": "B", "weight": null, "value_pct": null },
    { "id": "B.4",  "name": "Content & voice",           "part": "B", "weight": null, "value_pct": null },
    { "id": "B.5",  "name": "Accessibility & Inclusive", "part": "B", "weight": null, "value_pct": null },
    { "id": "B.6",  "name": "Heuristics",                "part": "B", "weight": null, "value_pct": null },
    { "id": "B.7",  "name": "Measurement",               "part": "B", "weight": null, "value_pct": null },
    { "id": "B.8",  "name": "Ethics",                    "part": "B", "weight": null, "value_pct": null },
    { "id": "B.9",  "name": "Density / data",            "part": "B", "weight": null, "value_pct": null },
    { "id": "B.10", "name": "Internationalisation",      "part": "B", "weight": null, "value_pct": null }
  ],
  "thresholds": {
    "enterprise_floor": {
      "A.1": 70,
      "A.3": 65,
      "A.4": 60,
      "A.8": 75,
      "B.5": 75,
      "any_category": 40
    }
  },
  "rendering": {
    "polygon_fill_color_light": "#0a58ca",
    "polygon_fill_opacity": 0.2,
    "polygon_stroke_color_light": "#0a58ca",
    "polygon_stroke_width": 1.5,
    "polygon_fill_color_dark": "#60a5fa",
    "polygon_stroke_color_dark": "#60a5fa",
    "threshold_overlay_color": "#9ca3af",
    "threshold_overlay_dasharray": "4 2"
  }
}
```

The template's `axes[].value_pct` is `null` initially; downstream tooling (FR-INTEG-001 Storybook addon, FR-CLI-001 `npx dsaf scan`, audit-report renderers) populates the values from a given audit's per-category scores. The renderer then draws the polygon over the radar's axes.

### `assets/dsaf-l0-l5-ladder.svg` — design intent (full SVG body authored at PR land)

The ladder is a vertical chart with six rows (one per tier), top-to-bottom L5 → L0 OR bottom-to-top L0 → L5 (the operator's design call). Each row has:

- Tier name in H2 weight (e.g., "L5 — Optimised")
- Score range in muted color (e.g., "85%+")
- One-line meaning extracted from `docs/07-maturity-tiers.md` §1
- Transition-gate callout below the row (e.g., "To reach L5: independent third-party WCAG audit + OSS release with ≥ 5 external contributors + named customer adoption + ≥ 2 prior audits + MCP server")

The L5 row is visually heaviest (larger text, accent color highlight); L0 is the lightest (smaller text, muted color). The hierarchy communicates "L5 is hard; L0 is easy" at a glance.

Vertical rules separate the tier rows. Optional: a single accent-colored "current tier" highlight that the rendering layer can position via CSS class (so a team can show "you're here" by applying `class="tier-l3"` to the row).

### `assets/dsaf-radar.svg` — design intent (full SVG body authored at PR land)

A 20-axis polar chart. Each axis is at `360° × (i / 20)` = 18° apart. Each axis has:

- Outer label: category ID + name (e.g., "A.1 Foundations & Tokens") at 11pt
- Inner concentric gridlines at 20%, 40%, 60%, 80%, 100% (muted)
- The 75% gridline for `A.8` and `B.5` is emphasized (the enterprise floor)
- The polygon, drawn by the renderer over the axes, fills based on `axes[].value_pct`
- The enterprise-floor overlay (dashed line at category-specific thresholds per `assets/dsaf-radar-template.json`) is a permanent feature of the visual

Part A axes (10) on the right semicircle; Part B axes (10) on the left semicircle. Within each Part, axes are ordered by category ID (A.1 at 12 o'clock going clockwise; B.1 at 6 o'clock going clockwise into the left half). The grouping makes Part A vs Part B visually distinct.

### `README.md` — patch (embed visuals above the fold)

After FR-BRAND-001's H1 + first-paragraph block and after FR-CORE-001's "Read DSAF-25 Core first" cross-link, embed both visuals:

```markdown
<picture>
  <source srcset="./assets/dsaf-l0-l5-ladder-dark.svg" media="(prefers-color-scheme: dark)">
  <img src="./assets/dsaf-l0-l5-ladder.svg" alt="DSAF L0-L5 Maturity Ladder — six tiers from Initial (L0, < 40%) to Optimised (L5, 85%+) with transition-gate requirements per tier" width="100%">
</picture>

<picture>
  <source srcset="./assets/dsaf-radar-dark.svg" media="(prefers-color-scheme: dark)">
  <img src="./assets/dsaf-radar.svg" alt="DSAF Radar — 20-axis spider chart (10 Part A system categories + 10 Part B UX categories) with enterprise-grade-threshold overlay" width="100%">
</picture>
```

(GitHub-rendered Markdown supports `<picture>` with `prefers-color-scheme` swap; if a downstream renderer doesn't, the fallback to the light-mode `<img>` is graceful.)

### `docs/01-introduction.md` — patch (visual reference at "What you'll produce" section)

After the "What you'll produce" subsection, add:

```markdown
The audit report's headline section embeds the **DSAF radar** ([`assets/dsaf-radar.svg`](../assets/dsaf-radar.svg)) showing per-category scores at audit time. The **DSAF L0–L5 ladder** ([`assets/dsaf-l0-l5-ladder.svg`](../assets/dsaf-l0-l5-ladder.svg)) shows where the audit lands on the tier scale. Both visuals are versioned alongside the rubric and ship in `/assets/`.
```

### `docs/07-maturity-tiers.md` — patch (embed ladder at §1 "The six tiers")

After §1's tier-table, add:

```markdown
![DSAF L0-L5 Maturity Ladder](../assets/dsaf-l0-l5-ladder.svg)

*[L0-L5 Ladder visualisation — see [`assets/dsaf-l0-l5-ladder.svg`](../assets/dsaf-l0-l5-ladder.svg) for the source.]*
```

### `docs/dsaf-25.md` — patch (embed radar template near "How to use")

After the "How to use" section's "60-second self-score" subsection, add:

```markdown
**Radar visualisation:** the DSAF-25 score can be visualised on the [DSAF radar](../assets/dsaf-radar.svg) — feed per-category percentages into [`assets/dsaf-radar-template.json`](../assets/dsaf-radar-template.json) and a renderer draws the polygon. The radar shows per-category coverage at a glance; the enterprise-grade-threshold overlay (dashed line) shows which categories clear the floor.
```

---

## §4 — Acceptance criteria

1. **Eight visual assets shipped** — `assets/dsaf-l0-l5-ladder.svg`, `assets/dsaf-l0-l5-ladder-dark.svg`, `assets/dsaf-l0-l5-ladder-print.pdf`, `assets/dsaf-radar.svg`, `assets/dsaf-radar-dark.svg`, `assets/dsaf-radar-print.pdf`, `assets/dsaf-visual-design-spec.md`, `assets/dsaf-radar-template.json` all exist in the repo.
2. **All SVGs have `<title>` and `<desc>`** — `xmllint --xpath 'count(//*[local-name()="title"])' <svg>` ≥ 1 for each SVG; same for `<desc>`. `<title>` text is ≤ 50 chars; `<desc>` text is 50–120 chars.
3. **Text content in SVG source** — `grep -ciE 'L0|L1|L2|L3|L4|L5|Initial|Repeatable|Defined|Managed|Optimised' assets/dsaf-l0-l5-ladder.svg` ≥ 6 (one match per tier); `grep -ciE 'A\.1|B\.1|Foundations|Components|Accessibility' assets/dsaf-radar.svg` ≥ 4 (sample of category labels present).
4. **File-size caps respected** — each SVG ≤ 80 KB un-gzipped; each PDF ≤ 200 KB. `wc -c assets/*.svg` and `wc -c assets/*.pdf` confirms.
5. **Both modes shipped** — for each visual, light-mode and dark-mode SVG variants are committed (4 SVGs total).
6. **PDFs are single-page** — `pdfinfo assets/dsaf-l0-l5-ladder-print.pdf | grep Pages` reports `Pages: 1`; same for `assets/dsaf-radar-print.pdf`.
7. **Visual design spec present** — `assets/dsaf-visual-design-spec.md` exists; contains `## Typography`, `## Color palette`, `## ViewBox and safe area`, `## Accessibility contract`, `## File-size caps`, `## Version pinning`, `## Screenshot test`.
8. **Radar template JSON valid** — `python3 -c "import json; json.load(open('assets/dsaf-radar-template.json'))"` exits 0; the JSON has `axes` array with 20 entries (10 Part A + 10 Part B); each entry has `id`, `name`, `part`, `value_pct` keys.
9. **Version-pin metadata present** — each SVG contains a `<metadata>` block with `dc:version` referencing the DSAF-125 / DSAF-25 version.
10. **README embeds both visuals** — `grep -q 'dsaf-l0-l5-ladder' README.md && grep -q 'dsaf-radar' README.md`. Both embedded with `<picture>` element + dark-mode `srcset`.
11. **`docs/07-maturity-tiers.md` embeds ladder** — `grep -q 'dsaf-l0-l5-ladder' docs/07-maturity-tiers.md`.
12. **`docs/dsaf-25.md` references radar template** — `grep -q 'dsaf-radar' docs/dsaf-25.md && grep -q 'dsaf-radar-template.json' docs/dsaf-25.md`.
13. **`docs/01-introduction.md` references both visuals** — `grep -q 'dsaf-l0-l5-ladder' docs/01-introduction.md && grep -q 'dsaf-radar' docs/01-introduction.md`.
14. **System-ui typography only** — `grep -ciE 'font-family' assets/*.svg | grep -v 'system-ui'` returns 0 (no custom-font references unless `assets/fonts/` ships with redistribution license).
15. **Screenshot test recorded** — PR description names the 3 reviewers who saw the 1200×675 rendering and identified each visual's subject; failed identifications drive iteration.
16. **Enterprise-grade-threshold overlay present on radar** — `grep -q 'enterprise_floor\|threshold' assets/dsaf-radar.svg` returns ≥ 1 match (overlay is rendered in the SVG source).
17. **Transition-gate callouts present on ladder** — `grep -ciE 'requires|need|gate' assets/dsaf-l0-l5-ladder.svg` ≥ 3 matches (multiple tier rows have gate callouts).

---

## §5 — Verification

```bash
# AC1 — eight assets exist
for f in assets/dsaf-l0-l5-ladder.svg \
         assets/dsaf-l0-l5-ladder-dark.svg \
         assets/dsaf-l0-l5-ladder-print.pdf \
         assets/dsaf-radar.svg \
         assets/dsaf-radar-dark.svg \
         assets/dsaf-radar-print.pdf \
         assets/dsaf-visual-design-spec.md \
         assets/dsaf-radar-template.json; do
  test -f "${f}" || echo "MISSING: ${f}"
done

# AC2 — SVG accessibility
for svg in assets/*.svg; do
  title_count=$(xmllint --xpath 'count(//*[local-name()="title"])' "${svg}" 2>/dev/null)
  desc_count=$(xmllint --xpath 'count(//*[local-name()="desc"])' "${svg}" 2>/dev/null)
  [ "${title_count}" -ge 1 ] || echo "FAIL ${svg}: missing <title>"
  [ "${desc_count}" -ge 1 ] || echo "FAIL ${svg}: missing <desc>"
done

# AC3 — text content in source (sample)
grep -cE 'L0|L1|L2|L3|L4|L5|Initial|Repeatable|Defined|Managed|Optimised' assets/dsaf-l0-l5-ladder.svg
# expected: >= 6
grep -cE 'A\.1|B\.1|Foundations|Components|Accessibility' assets/dsaf-radar.svg
# expected: >= 4

# AC4 — file-size caps
for svg in assets/*.svg; do
  size=$(wc -c < "${svg}")
  [ "${size}" -le 81920 ] || echo "OVER 80KB: ${svg} (${size} bytes)"
done
for pdf in assets/*.pdf; do
  size=$(wc -c < "${pdf}")
  [ "${size}" -le 204800 ] || echo "OVER 200KB: ${pdf} (${size} bytes)"
done

# AC6 — PDFs single-page
for pdf in assets/dsaf-l0-l5-ladder-print.pdf assets/dsaf-radar-print.pdf; do
  pages=$(pdfinfo "${pdf}" | awk '/^Pages:/ { print $2 }')
  [ "${pages}" = "1" ] || echo "FAIL ${pdf}: ${pages} pages"
done

# AC7 — design spec has the required sections
for section in '## Typography' '## Color palette' '## ViewBox and safe area' '## Accessibility contract' '## File-size caps' '## Version pinning' '## Screenshot test'; do
  grep -qF "${section}" assets/dsaf-visual-design-spec.md || echo "MISSING: ${section}"
done

# AC8 — radar template JSON valid
python3 -c "
import json, sys
d = json.load(open('assets/dsaf-radar-template.json'))
assert 'axes' in d, 'missing axes'
assert len(d['axes']) == 20, f'axes count {len(d[\"axes\"])} != 20'
for axis in d['axes']:
    for key in ['id', 'name', 'part', 'value_pct']:
        assert key in axis, f'axis {axis.get(\"id\")} missing {key}'
print('OK')
"

# AC9 — version-pin metadata in SVGs
for svg in assets/*.svg; do
  grep -q '<metadata>' "${svg}" && grep -qE 'dsaf_125|dsaf_25' "${svg}" || \
    echo "FAIL ${svg}: missing version-pin metadata"
done

# AC10 — README embeds
grep -q 'dsaf-l0-l5-ladder' README.md && grep -q 'dsaf-radar' README.md

# AC11 — maturity-tiers embeds ladder
grep -q 'dsaf-l0-l5-ladder' docs/07-maturity-tiers.md

# AC12 — dsaf-25 references radar template
grep -q 'dsaf-radar' docs/dsaf-25.md && grep -q 'dsaf-radar-template.json' docs/dsaf-25.md

# AC13 — intro references both
grep -q 'dsaf-l0-l5-ladder' docs/01-introduction.md && grep -q 'dsaf-radar' docs/01-introduction.md

# AC14 — system-ui typography only
grep -E 'font-family' assets/*.svg | grep -v 'system-ui\|sans-serif' && \
  echo "FAIL: non-system-ui font reference detected"

# AC16 — enterprise-floor overlay
grep -qE 'enterprise_floor|threshold|dashed' assets/dsaf-radar.svg

# AC17 — transition-gate callouts
grep -ciE 'requires|need|gate' assets/dsaf-l0-l5-ladder.svg | awk '$1 >= 3'
```

Human-verified ACs (no script):

- **AC5** — reviewer visually inspects both light and dark SVG variants in a browser; confirms dark-mode is hand-tuned (not CSS-inverted) by comparing the dark accent color to a CSS-invert of the light SVG.
- **AC15** — reviewer reads the PR description's screenshot-test result (3 reviewers, identification outcomes).

---

## §6 — Implementation skeleton

The operator playbook (8h):

1. **(1h) Author `assets/dsaf-visual-design-spec.md`** per §3.
2. **(2h) Author / commission `assets/dsaf-l0-l5-ladder.svg` (light) + dark variant.** Either hand-write in a text editor (preferred for the founder's first cut), or commission an illustrator (briefing them with `assets/dsaf-visual-design-spec.md` as the design intent). Apply the design intent from §3: six tier rows, hierarchy by visual weight, transition-gate callouts, monochrome + one accent.
3. **(2h) Author / commission `assets/dsaf-radar.svg` (light) + dark variant.** 20-axis polar chart with Part A on the right semicircle, Part B on the left; enterprise-floor overlay as dashed line; concentric gridlines.
4. **(15m) Render PDFs.** `inkscape --export-type=pdf assets/dsaf-l0-l5-ladder.svg --export-filename=assets/dsaf-l0-l5-ladder-print.pdf` (or headless Chrome equivalent). Same for the radar.
5. **(1h) Author `assets/dsaf-radar-template.json`** per §3.
6. **(45m) Patch README.md** to embed both visuals above the fold per §3.
7. **(30m) Patch `docs/01-introduction.md`** to reference both visuals at the "What you'll produce" section.
8. **(30m) Patch `docs/07-maturity-tiers.md`** to embed the ladder at §1.
9. **(30m) Patch `docs/dsaf-25.md`** to reference the radar template at "How to use."
10. **(30m) Screenshot test.** Render the SVG at 1200×675 px (browser zoom + screenshot, or `rsvg-convert -w 1200 -h 675`); post to Slack DM with 3 reviewers; record their identifications in the PR description.
11. **(15m) Run §5 verification.** Paste output in PR description.

---

## §7 — Dependencies

- **Upstream:**
  - **FR-BRAND-002** (handle taxonomy) — visuals use DSAF / DSAF Levels / DSAF Criteria as the canonical handles in text labels; no `Framework` noun-handle.
  - **FR-CORE-001** (DSAF-25 Core) — the radar's category axes match the DSAF-125 categories (a superset of DSAF-25); without DSAF-25 the radar's relationship to the rubric is unclear.
- **Downstream blocks:**
  - **FR-DOCS-001** (README rewrite) — the README's hero section embeds both visuals above the fold.
  - **FR-CONTENT-001** (weekly criterion deep-dives) — each deep-dive embeds the radar with the criterion's category highlighted.
  - **FR-LAUNCH-001** (Show HN) — the HN post's attached image is the L0-L5 ladder rendered at 1200×675; cross-posts use both visuals.
- **External:**
  - Optional: a commissioned illustrator (~$500–$1500 for the two visuals + dark-mode variants). The founder MAY author in-house; the design spec is the contract either way.
  - Inkscape (or headless Chrome) for SVG-to-PDF rendering.
  - `xmllint`, `pdfinfo`, `wc` for verification.

---

## §8 — Example payloads

### Example: `<title>` and `<desc>` for the L0-L5 ladder SVG

```xml
<svg viewBox="0 0 210 297" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ladder-title ladder-desc">
  <title id="ladder-title">DSAF — L0-L5 Maturity Ladder</title>
  <desc id="ladder-desc">A vertical ladder visualising the six DSAF Levels — L0 Initial, L1 Repeatable, L2 Defined, L3 Managed, L4 Managed-advanced, L5 Optimised — with score ranges and transition-gate requirements per tier.</desc>
  <metadata>...</metadata>
  <!-- visual content -->
</svg>
```

### Example: a populated `dsaf-radar-template.json` (post-audit)

```json
{
  "$schema": "https://dsaf.dev/schemas/dsaf-radar-v1.json",
  "version": "dsaf_125_v1+dsaf_25_v1",
  "audit_id": "cyberskill-2026-05-17",
  "axes": [
    { "id": "A.1", "name": "Foundations & Tokens",     "part": "A", "value_pct": 85 },
    { "id": "A.2", "name": "Component Library",        "part": "A", "value_pct": 78 },
    { "id": "A.3", "name": "Documentation",            "part": "A", "value_pct": 72 },
    { "id": "A.4", "name": "Governance & Versioning",  "part": "A", "value_pct": 65 },
    { "id": "A.5", "name": "Tooling & Distribution",   "part": "A", "value_pct": 80 },
    { "id": "A.6", "name": "Cross-platform & Theming", "part": "A", "value_pct": 60 },
    { "id": "A.7", "name": "Accessibility (system)",   "part": "A", "value_pct": 76 },
    { "id": "A.8", "name": "Performance & Quality",    "part": "A", "value_pct": 70 },
    { "id": "A.9", "name": "AI / MCP Readiness",       "part": "A", "value_pct": 55 },
    { "id": "A.10", "name": "...",                     "part": "A", "value_pct": 50 },
    { "id": "B.1", "name": "Research signals",         "part": "B", "value_pct": 60 },
    { "id": "B.2", "name": "Information architecture", "part": "B", "value_pct": 75 },
    { "id": "B.3", "name": "Interaction patterns",     "part": "B", "value_pct": 70 },
    { "id": "B.4", "name": "Content & voice",          "part": "B", "value_pct": 80 },
    { "id": "B.5", "name": "Accessibility & Inclusive", "part": "B", "value_pct": 78 },
    { "id": "B.6", "name": "Heuristics",                "part": "B", "value_pct": 65 },
    { "id": "B.7", "name": "Measurement",               "part": "B", "value_pct": 55 },
    { "id": "B.8", "name": "Ethics",                    "part": "B", "value_pct": 60 },
    { "id": "B.9", "name": "Density / data",            "part": "B", "value_pct": 70 },
    { "id": "B.10", "name": "Internationalisation",     "part": "B", "value_pct": 65 }
  ]
}
```

A renderer reads this JSON, plots the 20 values on the SVG's 20 axes, draws the polygon, and renders the enterprise-floor overlay.

### Example: the screenshot-test result in a PR description

```markdown
## Screenshot test (FR-BRAND-003 §1 #4 / §3 / AC15)

Rendered both visuals at 1200×675 px. Posted to Slack #design DM with 3 reviewers (not the founder):

- @reviewer-1 (designer, 6 years DS experience): "DSAF tier ladder, L0 to L5" + "DSAF radar chart, 20 axes" — PASS, PASS
- @reviewer-2 (engineering lead at a DS team): "CMM-style maturity ladder, looks like DSAF levels" + "spider chart of DSAF categories" — PASS, PASS
- @reviewer-3 (PM, no prior DS exposure): "tier ladder from L0 to L5 — what's the framework?" + "category-coverage chart with two colors" — PARTIAL PASS (recognised structure; needed the dsaf.dev URL footer to identify framework), PASS

Iteration: Added the dsaf.dev URL footer to both SVGs (was missing from first cut). Re-tested with @reviewer-3 — full PASS.
```

---

## §9 — Open questions

All resolved at authoring time:

- **Q1: Hand-author or commission?** Resolved → founder authors first cut; commissioning is optional. The design spec is the contract either way. If the founder's first cut fails the screenshot test, commissioning is the recovery path.
- **Q2: Two visuals or one combined?** Resolved → two. Ladder is narrative; radar is diagnostic. Different jobs, different surfaces. The plan's reference cases (DORA, 12-factor) support two.
- **Q3: Color palette — DSAF brand color?** Resolved → `#0a58ca` (DSAF blue) as the single accent. APCA Lc 64 on white. Hand-tuned dark variant uses `#60a5fa`. The brand color is a working-default; a future FR (post-launch) MAY commission a brand-color study.
- **Q4: 20-axis radar — too many axes to read?** Resolved → yes for casual readers, no for the framework's audience. A 4-axis radar (one per Part A pillar) would be more readable but lose the per-category resolution. DS teams reading the radar are reading 20 axes worth of information; the visual matches the rubric's complexity.
- **Q5: Should the radar include the DSAF-25 Core overlay too (25 axes overlaid on 20)?** Deferred → no. The DSAF-25 Core is a *subset* of the 125, not a separate dimension. A team's DSAF-25 score is derivable from the 125-category radar (the Core criteria map to specific categories). Overlaying would clutter the visual.
- **Q6: Dark mode — CSS auto-invert or hand-tune?** Resolved → hand-tune (§1 #10). CSS-invert produces washed-out colors and clashing accents.
- **Q7: Print PDF — separate file or generated on demand?** Resolved → separate file shipped. PDF generation requires a runtime (Inkscape or headless Chrome) and produces non-deterministic byte output across runs; shipping the PDF makes it a stable citation artifact.

---

## §10 — Failure modes inventory

| Failure | Detection | Outcome | Recovery |
|---|---|---|---|
| SVG > 80 KB un-gzipped | AC4 wc check | Lighthouse perf hit on dsaf.dev embed | Simplify SVG: remove decorative gradients, strip embedded raster, convert text-as-paths back to `<text>` |
| SVG text content is `<path>` not `<text>` | AC3 grep returns 0 | Screen readers can't extract; search indexes fail | Re-export SVG with "Convert text to paths" disabled (Figma, Inkscape default setting); hand-edit if necessary |
| Dark-mode SVG is CSS-inverted (washed out) | AC5 visual inspection | Bad reading experience in dark mode | Author dedicated dark-mode variant with hand-tuned contrast per §3 color palette |
| Radar axes don't match post-FR-CORE-003 category set | AC8 radar template JSON validation | Visual misaligned with rubric | When FR-CORE-003 dedup changes category count, regenerate radar SVG + radar template JSON in same PR |
| L0-L5 ladder rows out of order | reviewer spot-check | Visual reads wrong | Re-author with explicit top-to-bottom or bottom-to-top decision in §3 spec |
| Print PDF paginates to 2 pages | AC6 pdfinfo | Print breaks | ViewBox sizing wrong; re-render at A4 with 12mm margins per §3 |
| `<title>` / `<desc>` missing | AC2 xmllint | Accessibility fail | Add the elements; re-verify with xmllint |
| Custom font referenced but not shipped | AC14 grep | Font fallback rendering | Replace with system-ui stack per §3 typography |
| Screenshot test fails — reviewers can't identify visual | AC15 PR description | Iconic-visual hypothesis broken | Iterate on the SVG: increase primary text size, add URL footer, simplify decorative elements; re-test |
| Light/dark variants drift over time (only one updated) | git diff at PR | Inconsistent visuals across themes | CODEOWNERS for `assets/dsaf-*.svg` set to founder + future co-maintainer; PR-level discipline requires both variants updated together |
| Audit-report renderer (FR-INTEG-001 / CLI) reads radar template JSON with wrong schema | runtime error | Polygon doesn't draw | The template JSON is versioned (`$schema` field); downstream tooling validates against the schema; mismatch surfaces as actionable error |
| Conference projector renders the SVG poorly (color shift, font fallback) | live talk feedback | Brand presentation degraded | Pre-launch test on common projector setups; if needed, ship PNG fallbacks at 4096×2304 as a one-off via `make-raster.sh` (not committed to repo) |

---

## §11 — Implementation notes

- **The hand-authoring cost is real.** 4–6 hours of SVG-editing in a text editor is the rough estimate for one substantive visual. Commissioning a designer cuts the founder's time but adds a turnaround latency (typically 1 week + revisions). Plan accordingly: if FR-BRAND-003 is on the critical path for launch, allocate the founder time; if launch is further out, commission.
- **Why a separate dark-mode variant instead of CSS:** CSS-inversion turns `#0a58ca` (DSAF blue) into `#f5a735` (an orange-yellow that conflicts with the brand and reads as warning/danger in many cultures). Hand-tuned dark mode keeps the brand accent semantically consistent.
- **Radar polygon rendering is a downstream concern.** This FR ships the radar *axes* and the *template JSON*. The polygon itself is drawn by an audit-report renderer (the agent at FIX-mode SIGNED stage) or by FR-CLI-001 (`npx dsaf scan`). The static `assets/dsaf-radar.svg` has no polygon — just axes and threshold overlay. A renderer composes the polygon over the static SVG at render time.
- **About the `make-raster.sh` script:** the script is part of the operational toolkit, not a committed asset. It lives in `assets/make-raster.sh` and runs locally when needed (Twitter post, conference slide). The outputs are intentionally NOT committed — rasters are generated artifacts of the SVG canonical, not parallel canonicals.
- **CODEOWNERS recommendation:** `assets/dsaf-*.svg` and `assets/dsaf-radar-template.json` should be CODEOWNERS-protected to the founder + future co-maintainer (placeholder per FR-GOV-002). Visual brand drift is the failure mode that compounds silently; CODEOWNERS makes drift visible at PR review.
- **About FR-CORE-003 coordination:** if the dedup changes the category count (currently planned to stay at 20 if all 20 categories retain ≥ 1 criterion per FR-CORE-003 §1 #4), the radar's axis count regenerates. In the unlikely case of category retirement, the radar SHIFTS axes (recompute angles per `360 / n`). The radar's design accommodates 18–22 axes gracefully; beyond that range, the visual needs re-authoring.
- **About the visual's version pin:** the `dc:version` field in SVG metadata is the audit-trail surface. A reader scanning the SVG source can verify it's aligned with the current rubric. Future framework versions (DSAF v2, 2028) get new SVGs in the same `/assets/` directory with version-suffixed filenames (e.g., `assets/dsaf-l0-l5-ladder-v2.svg`); the v1 SVGs remain for backward-compatible cited content.
- **Why the design spec lives in `assets/`, not `docs/branding/`:** the spec is a designer's reference, not a general-doctrine surface. Placing it alongside the SVGs keeps the implementation surface co-located. A future co-maintainer or commissioned illustrator gets one folder to read.

---

*End of FR-BRAND-003.*
