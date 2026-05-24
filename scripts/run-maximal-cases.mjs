#!/usr/bin/env node
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { runMaximalAudit } from "./maximal-audit.mjs";

const ROOT = resolve(import.meta.dirname, "..");
const OUTPUT_ROOT = resolve(ROOT, "docs/generated/maximal-cases");
const FIXTURE_ROOT = resolve(ROOT, "docs/generated/design-md-fixtures");

const remoteDesignFixtures = [
  ["awesome-airbnb", "https://raw.githubusercontent.com/VoltAgent/awesome-design-md/main/design-md/airbnb/DESIGN.md"],
  ["awesome-apple", "https://raw.githubusercontent.com/VoltAgent/awesome-design-md/main/design-md/apple/DESIGN.md"],
  ["awesome-figma", "https://raw.githubusercontent.com/VoltAgent/awesome-design-md/main/design-md/figma/DESIGN.md"],
  ["awesome-linear", "https://raw.githubusercontent.com/VoltAgent/awesome-design-md/main/design-md/linear.app/DESIGN.md"],
  ["awesome-notion", "https://raw.githubusercontent.com/VoltAgent/awesome-design-md/main/design-md/notion/DESIGN.md"],
  ["awesome-cursor", "https://raw.githubusercontent.com/VoltAgent/awesome-design-md/main/design-md/cursor/DESIGN.md"],
  ["awesome-ibm", "https://raw.githubusercontent.com/VoltAgent/awesome-design-md/main/design-md/ibm/DESIGN.md"]
];

async function downloadFixture(id, url) {
  const outDir = resolve(FIXTURE_ROOT, id);
  const outPath = resolve(outDir, "DESIGN.md");
  mkdirSync(outDir, { recursive: true });
  const response = await fetch(url, {
    headers: {
      "user-agent": "DSAF-Maximal-Audit/0.1 (+https://audit.cyberskill.world)",
      "accept": "text/markdown, text/plain;q=0.9, */*;q=0.8"
    }
  });
  if (!response.ok) throw new Error(`Failed to download ${url}: ${response.status}`);
  const body = await response.text();
  writeFileSync(outPath, body);
  return outPath;
}

rmSync(FIXTURE_ROOT, { recursive: true, force: true });
const downloaded = [];
for (const [id, url] of remoteDesignFixtures) {
  downloaded.push([id, await downloadFixture(id, url)]);
}

const requestedCases = [
  {
    id: "file-cyberskill-design-system",
    input: "/Users/stephencheng/Projects/CyberSkill/design-system/DESIGN.md",
    kind: "file"
  },
  {
    id: "file-gstack-design",
    input: "/Users/stephencheng/Projects/CyberSkill/cyberos/playground/gstack/DESIGN.md",
    kind: "file"
  },
  {
    id: "file-stitch-design-taste",
    input: "/Users/stephencheng/.gemini/antigravity-ide/skills/stitch-design-taste/DESIGN.md",
    kind: "file"
  },
  ...downloaded.map(([id, path]) => ({
    id: `file-${id}`,
    input: path,
    kind: "file"
  })),
  {
    id: "url-govuk-design-system",
    input: "https://design-system.service.gov.uk/",
    kind: "url"
  },
  {
    id: "url-ibm-carbon",
    input: "https://carbondesignsystem.com/",
    kind: "url"
  },
  {
    id: "url-atlassian-design",
    input: "https://atlassian.design/",
    kind: "url"
  },
  {
    id: "url-material-design",
    input: "https://m3.material.io/",
    kind: "url"
  },
  {
    id: "url-fluent-design",
    input: "https://fluent2.microsoft.design/",
    kind: "url"
  },
  {
    id: "url-shopify-polaris",
    input: "https://polaris.shopify.com/",
    kind: "url"
  },
  {
    id: "url-github-primer",
    input: "https://primer.style/product/",
    kind: "url"
  },
  {
    id: "url-adobe-spectrum",
    input: "https://spectrum.adobe.com/",
    kind: "url"
  },
  {
    id: "url-salesforce-lightning",
    input: "https://www.lightningdesignsystem.com/",
    kind: "url"
  },
  {
    id: "url-ant-design",
    input: "https://ant.design/",
    kind: "url"
  }
];

const cases = requestedCases.filter((item) => item.kind === "url" || existsSync(item.input));
if (cases.length !== 20) {
  console.error(`[maximal-cases] expected 20 cases, found ${cases.length}`);
  for (const item of requestedCases) {
    if (item.kind === "file" && !existsSync(item.input)) console.error(`  missing ${item.input}`);
  }
  process.exit(1);
}

rmSync(OUTPUT_ROOT, { recursive: true, force: true });

const results = [];
for (const item of cases) {
  const outDir = resolve(OUTPUT_ROOT, item.id);
  const result = await runMaximalAudit({
    input: item.input,
    outDir,
    mode: "both",
    model: "auto-detected-current-agent",
    maxPages: item.kind === "url" ? 12 : 1
  });
  results.push({ id: item.id, ...result });
  console.log(`[maximal-cases] ${item.id} -> ${outDir}`);
}

console.log(JSON.stringify({ outputRoot: OUTPUT_ROOT, cases: results }, null, 2));
