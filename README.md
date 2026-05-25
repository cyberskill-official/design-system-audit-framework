# CyberSkill Design System Audit Framework (DSAF)

Welcome to the **Design System Audit Framework (DSAF)** — an AI-powered, agentic ecosystem for evaluating, reporting, and automatically fixing UI components to ensure strict design system maturity and accessibility compliance.

DSAF isn't just a linter; it's an intelligent agent powered by Google Gemini 2.5 Pro that understands design systems *structurally* and *visually*.

## 🌟 The DSAF Ecosystem

This repository is a monorepo containing multiple packages and internal services that make up the holistic DSAF ecosystem:

- **`packages/cli`**: The core Agentic Auto-Fix CLI.
- **`packages/saas-dashboard`**: A Next.js Web App for drag-and-drop auditing and historical score tracking.
- **`packages/figma-plugin`**: A sandboxed Figma Plugin that audits designs before they even become code.
- **`docs/internal/github-action`**: A plug-and-play CI/CD GitHub Action that blocks PRs on DSAF score regressions.
- **`internal/landing`**: The blazing-fast Vite React marketing site demonstrating the live Mini-Audit widget.

## 🚀 Getting Started

To explore the individual components, please refer to their dedicated documentation:

1. [CLI Documentation](./packages/cli/README.md) - Learn how to run `dsaf fix`, `dsaf chat`, and configure custom rulesets.
2. [SaaS Dashboard](./packages/saas-dashboard/README.md) - Deploy the Next.js UI for non-technical users.
3. [Figma Plugin](./packages/figma-plugin/README.md) - Install and run the plugin directly inside Figma.
4. [GitHub Action](./docs/internal/github-action/README.md) - Setup automated PR reviews.
5. [Landing Page](./apps/landing/README.md) - Run the React frontend.

## 🧠 Why DSAF?

Traditional linting tools rely on rigid AST parsers that fail to capture the nuanced "vibes" and structural constraints of modern design systems. DSAF leverages multimodal AI to evaluate:
- **Accessibility**: Contrast ratios, `focus-visible` states, ARIA roles, and tap targets.
- **Tokens**: Detecting hardcoded hex colors and rogue margin/padding values.
- **Typography**: Enforcing semantic header usage and line-height scalability.
- **Auto-Correction**: Generating exact string replacements and committing them to git automatically.

## ⚙️ Configuration

You can override DSAF's default rules by placing a `dsaf.config.json` at the root of your target directory:
```json
{
  "rules": [
    "Primary buttons must strictly use the background color #F4BA17",
    "All components must use relative 'rem' units for padding instead of 'px'"
  ]
}
```

## 📜 License

MIT License - Copyright (c) CyberSkill.


## 📋 Contracts

This project enforces strict contracts. Named outside-reviewer quotes are not published until explicit written consent is logged. Do not replace them with invented praise.
See `docs/internal/branding/reviewer-shortlist.md` and `docs/internal/branding/reviewer-consent-log.md`.
Example: `> "<endorsement quote"`

Key assets:
- `docs/framework/assets/dsaf-l0-l5-ladder.svg`
- `docs/framework/assets/dsaf-l0-l5-ladder-dark.svg`
- `docs/framework/assets/dsaf-radar.svg`
- `docs/framework/assets/dsaf-radar-dark.svg`

Contract checks:
`npm run test:regression-contract`, `npm run contract:regression`, `npm run test:visual-assets-contract`, `npm run contract:visual-assets`
