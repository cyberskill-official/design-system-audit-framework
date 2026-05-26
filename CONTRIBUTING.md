# Contributing to Design System Audit Framework

Thank you for your interest in contributing! This guide covers the monorepo structure, development setup, and workflow.

## Monorepo Structure

This project uses **npm workspaces** to manage multiple packages and applications in a single repository.

```
design-system-audit-framework/
├── apps/
│   ├── landing/              # Next.js landing page
│   └── saas-dashboard/       # Next.js SaaS dashboard with multi-provider AI
├── packages/
│   ├── cli/                  # CLI auto-fixer tool
│   ├── storybook-addon/      # Storybook integration
│   ├── tokens-validator/     # Design token validator
│   ├── zeroheight-reader/    # zeroheight integration
│   ├── figma-plugin/         # Figma plugin
│   └── github-action/        # GitHub Action
├── docs/                     # Framework documentation
├── scripts/                  # Build and check scripts
└── package.json              # Root workspace config
```

## Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9 (ships with Node 18+; needed for workspaces support)

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/cyberskill-official/design-system-audit-framework.git
cd design-system-audit-framework
npm install          # installs ALL workspace dependencies from the root
```

> **Important:** Always run `npm install` from the **repository root**. Do NOT run `npm install` inside individual `packages/` or `apps/` directories — npm workspaces hoists dependencies to the root `node_modules/` and maintains a single root `package-lock.json`.

### 2. Build

```bash
npm run build        # builds all workspaces (via --workspaces --if-present)
```

To build a specific workspace:

```bash
npm run build -w packages/cli
npm run build -w apps/saas-dashboard
```

### 3. Test

```bash
npm run test         # runs tests in all workspaces
```

To run contract tests individually:

```bash
npm run test:readme-contract
npm run test:domain-contract
# ... see package.json for the full list
```

### 4. Verify

Run the full verification suite (links, coverage, bundle size, doc freshness, and all contracts):

```bash
npm run verify
```

## Working with Specific Packages

| Workspace | Path | Description |
|---|---|---|
| `landing` | `apps/landing/` | Next.js marketing/landing page |
| `saas-dashboard` | `apps/saas-dashboard/` | Next.js SaaS dashboard with multi-provider AI integration |
| `cli` | `packages/cli/` | CLI tool for auto-fixing design system issues |
| `storybook-addon` | `packages/storybook-addon/` | Storybook addon for in-IDE auditing |
| `tokens-validator` | `packages/tokens-validator/` | Validates design tokens against the framework |
| `zeroheight-reader` | `packages/zeroheight-reader/` | Reads and syncs from zeroheight |
| `figma-plugin` | `packages/figma-plugin/` | Figma plugin for design-time auditing |
| `github-action` | `packages/github-action/` | GitHub Action for CI/CD integration |

### Scoped commands

```bash
# Run a script in a specific workspace
npm run <script> -w <workspace-path>

# Example: start the landing page dev server
npm run dev -w apps/landing

# Example: build just the CLI
npm run build -w packages/cli
```

## Adding Dependencies

Always add dependencies from the **root** using the `-w` flag:

```bash
# Add a dependency to a specific workspace
npm install <package> -w packages/cli

# Add a dev dependency to a specific workspace
npm install -D <package> -w apps/saas-dashboard

# Add a root-level dev dependency
npm install -D <package> -w .
```

## Scripts Reference

| Script | Description |
|---|---|
| `npm run build` | Build all workspaces |
| `npm run test` | Test all workspaces |
| `npm run verify` | Full verification suite |
| `npm run check:links` | Verify internal/external links |
| `npm run check:coverage` | Check test coverage thresholds |
| `npm run check:bundle-size` | Check bundle size budgets |
| `npm run check:doc-freshness` | Ensure docs are up to date |
| `npm run audit:maximal` | Run maximal audit |
| `npm run contract:*` | Individual contract checks |
| `npm run test:*-contract` | Individual contract tests |

## Pull Request Guidelines

1. **Branch from `main`** — create a feature branch for your work.
2. **Run `npm run verify`** before opening a PR — this catches most issues locally.
3. **One concern per PR** — keep changes focused and reviewable.
4. **Add tests** for new functionality, especially for new contracts or validators.
5. **Update docs** if you change behavior, add packages, or modify the framework.

## Code Style

- TypeScript is preferred for packages.
- ESM (`"type": "module"`) is used throughout.
- Follow existing patterns in the codebase for consistency.

## License

By contributing, you agree that your contributions will be licensed under the project's [MIT License](./LICENSE).
