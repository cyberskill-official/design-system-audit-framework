# A1.1: Color tokens are governance, not naming decoration

Originally published at https://audit.cyberskill.world/blog/deep-dives/week-01-a1-1-color-tokens. Cross-posting the full article here for LinkedIn readers; the canonical version remains on audit.cyberskill.world.

## The criterion (quoted verbatim)

```
A1.1 — Color tokens with primitive to semantic to component layers

0 = Absent           No tokens exist; colours are hex codes embedded in stylesheets.
1 = Mentioned        A "tokens" file exists but it's a flat list of hex values, no layering.
2 = Defined          A primitive layer is named (e.g. `blue-500`) but no semantic layer above it.
3 = Built            Primitive + semantic layers exist (e.g. `blue-500` → `color-action-primary`);
                     consumers reference the semantic name, not the primitive.
4 = Measured         Three-layer architecture (primitive → semantic → component-scoped); the
                     component layer is generated, not hand-maintained; coverage is tracked.
5 = Industry-leading Three-layer + modern colour spaces (OKLCH / P3) + automated contrast math
                     baked into token generation + multi-mode (light / dark / high-contrast)
                     compiles from the same primitive set.
```

## Why this matters

Most design systems treat color tokens as a naming convention. The team renames `#0066cc` to `blue-500`, adds it to a `tokens.json` file, and considers tokens "done." Six months later the same hex value is referenced inline in fourteen places, three of them with subtly-different shades that nobody can explain.

The problem isn't the naming. The problem is that flat tokens — primitive-only — push every consumer to make a semantic decision at the point of use. "Should this button be `blue-500` or `blue-600`?" is an aesthetic question dressed up as a technical one, and the answer drifts. Each team's interpretation of the system gets a little further from the source until you have de-facto forks that nobody intended.

The three-layer architecture exists to push semantic decisions back into the system. A primitive (`blue-500`) is a hex value with a name. A semantic token (`color-action-primary`) is a *decision* — "the system has decided that primary action elements use this colour, and consumers should not relitigate that decision per-component." A component-scoped token (`button-primary-background`) is the last refinement: the system can change the button's specific shade without changing every other action element.

When a team takes this criterion seriously, three things change. First, design reviews stop arguing about specific hex values — they argue about whether a new use-case needs a new semantic token, which is the right level for the argument. Second, dark mode and high-contrast mode become tractable, because the primitive layer can swap and the semantic layer rebinds automatically. Third, accessibility audits get faster, because contrast guarantees live in the token math (criterion A8.1) rather than per-component.

The criterion is `FIXED` because the layering either exists in the codebase or it doesn't — there's no version of the world where "we use primitive → semantic tokens" requires re-scoring quarterly. The standards around colour spaces (OKLCH / P3 at the 5/5 level) are `DYNAMIC`, but they sit on top of this row in A1.9.

## What good looks like

[Adobe Spectrum](https://spectrum.adobe.com/page/color-system/) ships the three-layer architecture as a public reference. The primitive layer is the [global colour palette](https://spectrum.adobe.com/page/color-palette/) — `blue-400` through `blue-1400`, named by lightness. The semantic layer is the [alias system](https://spectrum.adobe.com/page/color/) — `accent-color-default`, `informative-color-default`, `notice-color-default`. The component layer is private: each Spectrum component (`sp-button`, `sp-alert`) references the semantic alias, never the primitive.

What's working in this example:

- A designer cannot reach for `blue-700` directly when designing a new component. The only public surface is the semantic alias, which forces them to either reuse an existing decision or propose a new alias via the system's RFC process (criterion A4.2).
- Dark mode is a primitive-layer swap. The semantic aliases re-resolve to different primitives in dark mode; no per-component overrides are needed.
- High-contrast mode (which Spectrum ships as a third theme) reuses the same alias names with a different primitive map. The component layer is unchanged.
- Modern colour spaces (OKLCH at the primitive level) are present — Spectrum's primitives are authored in a perceptual colour space, which makes contrast math at A8.1 directly computable.

That last point is what pushes Spectrum to 5/5 on A1.1, not just 4/5. A team can ship a perfectly clean three-layer architecture in plain sRGB and score 4/5; the 5/5 anchor requires the modern colour-space treatment that makes downstream criteria (contrast, theming) easier to satisfy.

## The anti-pattern

A design system at scale, six months into its first version. The `tokens.json` file looks like this:

```json
{
  "color": {
    "primary": { "$value": "#0066cc" },
    "primary-dark": { "$value": "#004499" },
    "primary-light": { "$value": "#3399ff" },
    "secondary": { "$value": "#ff6600" },
    "neutral-100": { "$value": "#f7f7f7" },
    "neutral-900": { "$value": "#111111" }
  }
}
```

A component uses the token correctly:

```css
.Button--primary {
  background-color: var(--color-primary);
  color: var(--color-neutral-100);
}
```

This scores 1/5 on A1.1, sometimes 2/5 if the team has been disciplined. Here's why it fails:

The token names look semantic (`primary`, `secondary`) but they're operating as primitives. There's no layer between "this hex value" and "this UI role." A second team building a `Toast` component faces the choice: use `color-primary` (already chosen for buttons; visually wrong for toasts) or hard-code a new hex value (breaks the token discipline) or invent `color-toast-background` (the right answer — but the system gave them no place to put it).

What teams typically do in this anti-pattern is invent the missing layer ad-hoc. Buttons stay on `color-primary`. The `Toast` team adds `--color-toast-background: #fff8e1` inline. The `Alert` team copies that approach with their own hex. Three months later there are forty inline hex values scattered through the components, and the `tokens.json` file is decorative.

The recovery path is not "rename everything." It's "add the missing semantic layer above the existing tokens and treat the existing tokens as the primitive layer going forward." Rename `color-primary` to `blue-500` in the primitives file, add a new `color-action-primary` semantic alias that points to it, and migrate one component at a time. The system moves from 1/5 to 3/5 the moment any one component switches from the primitive to the semantic alias.

## Checklist

- [ ] Every shipped component references a semantic token, never a primitive directly
- [ ] The semantic layer has a documented naming convention (e.g. `color-{role}-{intent}-{state}`)
- [ ] Dark mode and high-contrast mode are primitive-layer swaps, not per-component overrides
- [ ] At least one component-scoped token exists for a component with mode-specific tuning needs (e.g. `button-primary-background-hover`)
- [ ] The token files are DTCG-formatted (`$value`, `$type`) — required for A1.8 conformance
- [ ] A linter or CI check rejects PRs that introduce inline hex values in component CSS
- [ ] The primitives use a modern colour space (OKLCH / P3) for at least the brand-critical hues — required for the 5/5 anchor

A team scoring 7/7 on the checklist is at 5/5 on the rubric. A team scoring 3–4 / 7 is at 3/5 (built but not measured). A team scoring 0–2 / 7 is at 0–1 (no real token discipline yet).

## Where this lands in the rubric

A1.1 is part of **DSAF-25 Core** — row 1 of 25. In the full DSAF Criteria it sits at the top of `A.1 Foundations & Tokens`, which connects to:

- `A1.8` — DTCG conformance. The checklist's "DTCG-formatted" row is the cross-criterion bridge.
- `A1.9` — Modern colour spaces. The 5/5 anchor of A1.1 explicitly references OKLCH/P3 which is the subject of A1.9.
- `A6.1` — Light + dark mode parity. Becomes tractable only when A1.1 is at 3/5+.
- `A8.1` — Contrast guarantees. Bakes into token math only when the primitives are perceptual-colour-space-authored (the 5/5 anchor here).

## What this post does NOT say

- This is **not** a token-naming-convention guide. The names matter less than the layering. A team can ship `--color-stp-primary-bg-default` and score 5/5 if the *layers* are right.
- This is **not** advocacy for a specific token format. DTCG is the format the rubric reaches for (A1.8) but the layering structure is format-agnostic.
- This is **not** Style Dictionary marketing. Style Dictionary is one way to build the three layers; Tokens Studio is another; hand-authored layers are a third. The criterion measures the architecture, not the tooling.

---

*Score yourself on this criterion right now: open [DSAF-25 Core](https://audit.cyberskill.world/card). It takes 5 minutes.*

*Full DSAF rubric + open-source repo: [github.com/cyberskill-official/design-system-audit-framework](https://github.com/cyberskill-official/design-system-audit-framework).*

*Was this useful? The full series: [audit.cyberskill.world/blog](https://audit.cyberskill.world/blog).*

---

Canonical version: https://audit.cyberskill.world/blog/deep-dives/week-01-a1-1-color-tokens
Full DSAF Criteria: https://github.com/cyberskill-official/design-system-audit-framework

#DSAF #DesignSystems #Frontend #Accessibility
