# DSAF Figma Plugin

Shift-left your design system audits by running DSAF directly inside Figma before writing any code.

## How it works

1. The plugin (`code.ts`) securely runs within the Figma Sandbox.
2. It extracts **Local Variables** (Design Tokens) and **Main Components** from the current page.
3. The UI (`ui.html`) forwards this data to the Next.js SaaS backend API.
4. The AI evaluates the JSON representation of the Figma design.
5. If violations are found (e.g., poor contrast, missing interactive variants), the plugin automatically selects and zooms into the failing nodes on the canvas.

## Installation & Development

1. Run `npm install` and `npm run build` in this directory to compile `code.ts`.
2. Open Figma desktop app.
3. Navigate to **Plugins > Development > Import plugin from manifest...**
4. Select the `manifest.json` file in this directory.

*Note: Ensure the SaaS Dashboard (`packages/saas-dashboard`) is running locally on port 3005 for the API connection to succeed.*
