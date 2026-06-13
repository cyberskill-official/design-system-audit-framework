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
import { runMaximalAudit } from "../bin/maximal-audit.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../../..");
// NOTE: This exploratory loop (30 file/url/repo cases, network + git-clone dependent)
// writes to its OWN directory so it never clobbers the hermetic verification fixture set
// in docs/outputs/generated/maximal-cases (owned by scripts/bin/build-verification-cases.mjs
// and validated by scripts/checks/check-maximal-cases.mjs).
const OUTPUT_ROOT = resolve(ROOT, "docs/outputs/generated/maximal-cases-explore");
const FIXTURE_ROOT = resolve(ROOT, "docs/outputs/generated/design-md-fixtures");
const TEMP_ROOT = resolve(ROOT, "docs/outputs/generated/self-improving-temp");

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
    // 10 LOCAL FILES
    { id: "file-cyberskill-design-system", input: "/Users/stephencheng/Projects/CyberSkill/design-system/DESIGN.md", kind: "file" },
    { id: "file-gstack-design", input: "/Users/stephencheng/Projects/CyberSkill/cyberos/playground/gstack/DESIGN.md", kind: "file" },
    { id: "file-stitch-design", input: "/Users/stephencheng/.gemini/antigravity-ide/skills/stitch-design-taste/DESIGN.md", kind: "file" },
    { id: "file-awesome-airbnb", input: resolve(FIXTURE_ROOT, "awesome-airbnb/DESIGN.md"), kind: "file" },
    { id: "file-awesome-apple", input: resolve(FIXTURE_ROOT, "awesome-apple/DESIGN.md"), kind: "file" },
    { id: "file-awesome-figma", input: resolve(FIXTURE_ROOT, "awesome-figma/DESIGN.md"), kind: "file" },
    { id: "file-awesome-linear", input: resolve(FIXTURE_ROOT, "awesome-linear/DESIGN.md"), kind: "file" },
    { id: "file-awesome-notion", input: resolve(FIXTURE_ROOT, "awesome-notion/DESIGN.md"), kind: "file" },
    { id: "file-awesome-cursor", input: resolve(FIXTURE_ROOT, "awesome-cursor/DESIGN.md"), kind: "file" },
    { id: "file-awesome-ibm", input: resolve(FIXTURE_ROOT, "awesome-ibm/DESIGN.md"), kind: "file" },

    // 10 URLS
    { id: "url-atlassian", input: "https://atlassian.design", kind: "url" },
    { id: "url-polaris", input: "https://polaris.shopify.com", kind: "url" },
    { id: "url-material3", input: "https://m3.material.io", kind: "url" },
    { id: "url-fluent2", input: "https://fluent2.microsoft.design", kind: "url" },
    { id: "url-carbon", input: "https://carbondesignsystem.com", kind: "url" },
    { id: "url-primer", input: "https://primer.style", kind: "url" },
    { id: "url-lightning", input: "https://www.lightningdesignsystem.com", kind: "url" },
    { id: "url-spectrum", input: "https://spectrum.adobe.com", kind: "url" },
    { id: "url-ant", input: "https://ant.design", kind: "url" },
    { id: "url-govuk", input: "https://design-system.service.gov.uk", kind: "url" },

    // 10 REPOSITORIES
    { id: "repo-ant-design", input: "https://github.com/ant-design/ant-design", kind: "repo" },
    { id: "repo-mui", input: "https://github.com/mui/material-ui", kind: "repo" },
    { id: "repo-chakra-ui", input: "https://github.com/chakra-ui/chakra-ui", kind: "repo" },
    { id: "repo-radix-ui", input: "https://github.com/radix-ui/primitives", kind: "repo" },
    { id: "repo-tailwind", input: "https://github.com/tailwindlabs/tailwindcss", kind: "repo" },
    { id: "repo-ariakit", input: "https://github.com/ariakit/ariakit", kind: "repo" },
    { id: "repo-shadcn-ui", input: "https://github.com/shadcn-ui/ui", kind: "repo" },
    { id: "repo-headless-ui", input: "https://github.com/tailwindlabs/headlessui", kind: "repo" },
    { id: "repo-mantine", input: "https://github.com/mantinedev/mantine", kind: "repo" },
    { id: "repo-next-ui", input: "https://github.com/nextui-org/nextui", kind: "repo" }
  ];

  const cases = requestedCases.filter((item) => item.kind !== "file" || existsSync(item.input));
  if (cases.length !== 30) {
    console.error(`[self-improving-loop] Expected 30 cases, found ${cases.length}`);
    for (const item of requestedCases) {
      if (item.kind === "file" && !existsSync(item.input)) {
        console.error(`  missing case input: ${item.input}`);
      }
    }
    process.exit(1);
  }

  console.log(`[self-improving-loop] Starting loop execution for ${cases.length} cases...`);
  const summaries = [];

  const MAX_ITERATIONS = 10;

  for (const item of cases) {
    console.log(`\n--------------------------------------------------`);
    console.log(`[self-improving-loop] Processing case: ${item.id}`);
    console.log(`--------------------------------------------------`);

    let currentInput = item.input;
    let iteration = 1;
    let previousScore = 0;
    const caseDir = resolve(OUTPUT_ROOT, item.id);
    mkdirSync(caseDir, { recursive: true });

    while (iteration <= MAX_ITERATIONS) {
      console.log(`[self-improving-loop] Iteration ${iteration}: Auditing input...`);
      
      const iterResult = await runMaximalAudit({
        input: currentInput,
        outDir: caseDir,
        mode: "both",
        model: "auto-detected-current-agent",
        maxPages: 1
      });

      const currentScore = iterResult.unifiedAverage;
      console.log(`  Score: ${currentScore}%`);

      if (iteration > 1) {
        const delta = currentScore - previousScore;
        console.log(`  Score Delta: ${delta > 0 ? '+' : ''}${delta}%`);
        
        if (delta <= 0) {
          console.log(`[self-improving-loop] Stable score reached at iteration ${iteration}. Stopping loop for ${item.id}.`);
          break;
        }
      }


      // Dynamic Criteria Expansion: Suggest new criteria based on current iteration gaps
      const pendingCriteriaPath = resolve(ROOT, "docs/framework/pending_criteria.md");
      const suggestedCriterion = `| PEND-${Date.now().toString().slice(-4)} | **${item.id} Specific Needs**: Enhance coverage for ${item.id} specific scenarios | DYNAMIC | Unmet | Partial | Fully compliant. Refs: [DSAF-B] |\n`;
      
      let pendingContent = "";
      try {
        pendingContent = readFileSync(pendingCriteriaPath, "utf8");
      } catch (e) {
        pendingContent = "# Pending Criteria for Approval\n\n| # | Criterion | Tag | 0 | 3 | 5 |\n|---|---|---|---|---|---|\n";
      }
      if (!pendingContent.includes(item.id)) {
        writeFileSync(pendingCriteriaPath, pendingContent + suggestedCriterion);
        console.log(`  [self-improving-loop] Suggested new criteria appended to pending_criteria.md`);
      }

      // Prepare for next iteration
      const nextInput = resolve(caseDir, "output-improved", "IMPROVED_DESIGN.md");
      if (!existsSync(nextInput)) {
        console.error(`  Warning: IMPROVED_DESIGN.md not found. Stopping loop.`);
        break;
      }
      currentInput = nextInput;
      previousScore = currentScore;
      iteration++;
    }

    // Rewrite source paths in outputs to point back to the original input file
    const filesToPatch = ["IMPROVED_DESIGN.md", "ANALYZED_DESIGN_REPORT.md"];
    for (const filename of filesToPatch) {
      const filepath = resolve(caseDir, filename);
      if (existsSync(filepath)) {
        let content = readFileSync(filepath, "utf8");
        content = content.replaceAll(resolve(caseDir, "IMPROVED_DESIGN.md"), item.input);
        writeFileSync(filepath, content);
      }
    }

    const summary = {
      caseId: item.id,
      input: item.input,
      finalScore: previousScore,
      iterations: iteration - 1,
      timestamp: new Date().toISOString()
    };
    writeFileSync(resolve(caseDir, "loop_summary.json"), JSON.stringify(summary, null, 2) + "\n");
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
