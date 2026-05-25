# `@cyberskill/dsaf`

The Agentic Auto-Fix CLI for the Design System Audit Framework.

## Installation

```bash
npm install -g @cyberskill/dsaf
```

Ensure you have your Gemini API key ready:
```bash
export GEMINI_API_KEY="your-api-key"
```

## Commands

### 1. `dsaf fix <dir>`
Autonomously scans a directory of UI components, evaluates them against DSAF maturity criteria, and safely applies exact string-replacement patches directly to the files. It automatically creates a git branch and commits the fixes.

```bash
dsaf fix src/components
```
*Options:*
- `--no-git`: Apply fixes directly without creating a branch or commit.
- `-k, --api-key <key>`: Pass API key explicitly.

### 2. `dsaf chat <dir>`
Launch an interactive Node.js terminal chat session to discuss your code with the AI engine.

```bash
dsaf chat src/components
# DSAF> Why did my Button.tsx fail the contrast check?
```

### 3. `dsaf export <file.json>`
Convert a DSAF audit JSON output into a Jira/Linear compatible CSV file for bulk ticket creation.

```bash
dsaf export audit-results.json
```

### 4. `dsaf parse-storybook <file.json>`
Ingest `project.json` or `stories.json` from a Storybook build to prepare the components for a headless LLM audit.

```bash
dsaf parse-storybook storybook-static/project.json
```

## Custom Rulesets

Add a `dsaf.config.json` file in your target directory to override the AI's default auditing logic:

```json
{
  "rules": [
    "Never use raw pixel values for padding, always use rem.",
    "The primary brand color is exactly #F4BA17."
  ]
}
```
