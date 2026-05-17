# DSAF — Weekly criterion deep-dives

**Cadence:** one post per Monday for 12 weeks starting the Monday after launch.
**Format:** CEA (Context → Example → Anti-pattern), 1,400–2,000 words per post, one criterion per post.
**Canonical home:** `https://audit.cyberskill.world/blog/<slug>`.

## 12-week roadmap

| Week | Criterion | Working title | Draft status |
|---:|---|---|---|
| 1 | A1.1 | Color tokens are governance, not naming decoration | ✅ Shipped at `week-01-a1-1-color-tokens.md` |
| 2 | A2.4 | Variant matrices reveal whether a component is real | template ready |
| 3 | A3.1 | Usage guidance is a decision tree, not a screenshot gallery | template ready |
| 4 | A4.2 | RFCs are how design systems remember why | template ready |
| 5 | A8.1 | Contrast guarantees belong in token math | template ready |
| 6 | A9.1 | Bundle budgets are design-system UX | template ready |
| 7 | A10.3 | AI rules files make agent work reviewable | template ready |
| 8 | B2.1 | IA must match user language, not org structure | template ready |
| 9 | B3.3 | Error recovery is part of the component contract | template ready |
| 10 | B5.2 | WCAG AA needs product evidence, not only component claims | template ready |
| 11 | B9.1 | Dark-pattern review belongs in the rubric | template ready |
| 12 | B10.1 | HEART metrics make design-system outcomes visible | template ready |

After week 12: a Week-13 retrospective post reviews traffic, inclusion rate, recurring objections, and decides which criteria need a v2 revision.

## How to author each deep-dive (workflow for any AI agent picking up weeks 2–12)

1. Read `_template.md` in this folder.
2. Read the criterion's source rubric anchors from `docs/03-criteria-part-a.md` or `docs/04-criteria-part-b.md`.
3. Author the post per the CEA structure. **Quote the criterion verbatim** — re-coining the rubric is forbidden by FR-CORE-001 §1 #1.
4. Save as `week-XX-<criterion-id>-<short-title>.md`. Slug example: `week-02-a2-4-variant-matrices`.
5. Update this README's roadmap table — flip the row from `template ready` to `Shipped at <filename>`.
6. Update `docs/content/weekly-deep-dives.md` "First 12 topics" table.
7. Generate the cross-publish drafts using `docs/social/cross-publishing-template.md` and save as `week-XX-<...>--devto.md`, `--medium.md`, `--linkedin.md` in the same folder.

## Style invariants (apply to every post)

- **One criterion per post.** Don't bundle.
- **The criterion is quoted byte-identical** from `docs/03-criteria-part-a.md` / `docs/04-criteria-part-b.md`.
- **Anchored examples.** Each "what good looks like" example references a real, public, non-fabricated design system. Material, Polaris, Carbon, Spectrum, Primer, USWDS, GOV.UK, Workday Canvas, Atlassian Design System are the safe references. If you can't cite a real one, the example doesn't ship.
- **One anti-pattern.** Specific, named, with a hypothetical-but-plausible code or screenshot example.
- **One checklist.** 5–8 rows max. Each row is a Yes/No question, not an aspiration.
- **No paid CTA.** Per FR-BRAND-002 / FR-BRAND-004.
- **No "we" first person about teams the author isn't on.** Use "your team" or "a team" — never "we" if referring to a generic team.
- **DSAF Levels mentioned at the end.** Each post closes with "Where this lands in the rubric: this criterion is part of the DSAF-25 Core; in the full rubric it's also tied to ..." — pointing at the related rows.

## Cross-publishing cadence (per post)

| Surface | When | How |
|---|---|---|
| `audit.cyberskill.world/blog/<slug>` | Monday T+0 | Canonical |
| dev.to | T+24h | Per `docs/social/cross-publishing-template.md` |
| Medium | T+48h | Per same template |
| LinkedIn long-form | T+72h | Per same template (condensed) |
| Newsletter submissions | T+24h | Per `docs/social/newsletter-submissions.md` |

*End of deep-dives roadmap.*
