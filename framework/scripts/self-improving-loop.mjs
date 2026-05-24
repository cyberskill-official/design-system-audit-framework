#!/usr/bin/env node
/**
 * DSAF Framework-Level Self-Improving Loop script.
 * 
 * For each design system case:
 * 1. Download/resolve the target DESIGN.md input.
 * 2. Run the DSAF audit on the original input to generate an initial ANALYSIS and IMPROVED_DESIGN.md.
 * 3. Feed the generated IMPROVED_DESIGN.md back as the input to the next iteration of the loop.
 * 4. Run the audit again to check the improved posture and output the final reports.
 * 5. Clean up temporary files and write case summaries.
 */

import { existsSync, mkdirSync, rmSync, writeFileSync, copyFileSync, readFileSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { runMaximalAudit } from "./maximal-audit.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const OUTPUT_ROOT = resolve(ROOT, "outputs/generated/maximal-cases");
const FIXTURE_ROOT = resolve(ROOT, "outputs/generated/design-md-fixtures");
const TEMP_ROOT = resolve(ROOT, "outputs/generated/self-improving-temp");

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
      "user-agent": "DSAF-Self-Improving-Loop/0.1 (+https://audit.cyberskill.world)",
      "accept": "text/markdown, text/plain;q=0.9, */*;q=0.8"
    }
  });
  if (!response.ok) throw new Error(`Failed to download ${url}: ${response.status}`);
  const body = await response.text();
  writeFileSync(outPath, body);
  return outPath;
}

async function main() {
  console.log("[self-improving-loop] Initializing fixtures...");
  rmSync(FIXTURE_ROOT, { recursive: true, force: true });
  rmSync(TEMP_ROOT, { recursive: true, force: true });
  rmSync(OUTPUT_ROOT, { recursive: true, force: true });
  
  const downloaded = [];
  for (const [id, url] of remoteDesignFixtures) {
    try {
      const path = await downloadFixture(id, url);
      downloaded.push([id, path]);
      console.log(`[self-improving-loop] Downloaded fixture: ${id}`);
    } catch (err) {
      console.error(`[self-improving-loop] Failed downloading ${id}: ${err.message}`);
      process.exit(1);
    }
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
    console.error(`[self-improving-loop] Expected 10 cases, found ${cases.length}`);
    for (const item of requestedCases) {
      if (item.kind === "file" && !existsSync(item.input)) {
        console.error(`  missing case input: ${item.input}`);
      }
    }
    process.exit(1);
  }

  console.log(`[self-improving-loop] Starting loop execution for ${cases.length} cases...`);
  const summaries = [];

  for (const item of cases) {
    console.log(`\n--------------------------------------------------`);
    console.log(`[self-improving-loop] Processing case: ${item.id}`);
    console.log(`--------------------------------------------------`);

    // Iteration 1: Audit the original design file
    const tempDir = resolve(TEMP_ROOT, item.id);
    mkdirSync(tempDir, { recursive: true });
    
    console.log(`[self-improving-loop] Iteration 1: Auditing original input...`);
    const iter1Result = await runMaximalAudit({
      input: item.input,
      outDir: tempDir,
      mode: "both",
      model: "auto-detected-current-agent",
      maxPages: 1
    });

    console.log(`  Initial Average Score: ${iter1Result.unifiedAverage}%`);

    // Copy Iteration 1's IMPROVED_DESIGN.md as the input for Iteration 2
    const iter2Input = resolve(tempDir, "IMPROVED_DESIGN.md");
    if (!existsSync(iter2Input)) {
      throw new Error(`Iteration 1 failed to produce IMPROVED_DESIGN.md at ${iter2Input}`);
    }

    // Iteration 2: Audit the improved design file and output final results to final directory
    const finalDir = resolve(OUTPUT_ROOT, item.id);
    mkdirSync(finalDir, { recursive: true });

    console.log(`[self-improving-loop] Iteration 2: Auditing improved input...`);
    const iter2Result = await runMaximalAudit({
      input: iter2Input,
      outDir: finalDir,
      mode: "both",
      model: "auto-detected-current-agent",
      maxPages: 1
    });

    console.log(`  Improved Average Score: ${iter2Result.unifiedAverage}%`);
    const delta = iter2Result.unifiedAverage - iter1Result.unifiedAverage;
    console.log(`  Score Delta: +${delta}%`);

    // Rewrite source paths in outputs to point back to the original input file instead of temp input file
    const filesToPatch = ["IMPROVED_DESIGN.md", "ANALYZED_DESIGN_REPORT.md"];
    for (const filename of filesToPatch) {
      const filepath = resolve(finalDir, filename);
      if (existsSync(filepath)) {
        let content = readFileSync(filepath, "utf8");
        content = content.replaceAll(iter2Input, item.input);
        writeFileSync(filepath, content);
      }
    }

    // Write metadata for verification tracking
    const metaPath = resolve(finalDir, "loop_summary.json");
    const summary = {
      caseId: item.id,
      input: item.input,
      initialScore: iter1Result.unifiedAverage,
      improvedScore: iter2Result.unifiedAverage,
      delta,
      timestamp: new Date().toISOString()
    };
    writeFileSync(metaPath, JSON.stringify(summary, null, 2) + "\n");
    summaries.push(summary);
  }

  // Clean up iteration 1 temp directory
  rmSync(TEMP_ROOT, { recursive: true, force: true });
  console.log("\n[self-improving-loop] Execution complete. Cleaned temporary files.");
  console.log(JSON.stringify({ outputRoot: OUTPUT_ROOT, cases: summaries }, null, 2));
}

main().catch((err) => {
  console.error(`[self-improving-loop] Execution failed: ${err.stack}`);
  process.exit(1);
});
