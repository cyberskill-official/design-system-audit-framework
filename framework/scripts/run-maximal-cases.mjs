#!/usr/bin/env node
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { runMaximalAudit } from "./maximal-audit.mjs";

const ROOT = resolve(import.meta.dirname, '../..');
const OUTPUT_ROOT = resolve(ROOT, "outputs/generated/maximal-cases");
const FIXTURE_ROOT = resolve(ROOT, "outputs/generated/design-md-fixtures");

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
];

const cases = requestedCases.filter((item) => existsSync(item.input));
if (cases.length !== 10) {
  console.error(`[maximal-cases] expected 10 cases, found ${cases.length}`);
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
