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
// Repo root: scripts/bin/ is two levels below it. (Was "../../.." — a path bug
// that silently wrote loop outputs OUTSIDE the repository.)
const ROOT = resolve(__dirname, "../..");
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

  // Optional machine-local cases live in scripts/test/fixtures/local-cases.json
  // ({ "cases": [{ "id": "...", "input": "/abs/or/relative/path" }] }) or in the
  // file named by DSAF_LOCAL_CASES. Local paths are OPTIONAL by design: the loop
  // must run on any machine (CI included) without hard-coded home directories.
  /** @type {{id: string, input: string, kind: "file"}[]} */
  const localCases = [];
  const localCasesPath = process.env.DSAF_LOCAL_CASES || resolve(ROOT, "scripts/test/fixtures/local-cases.json");
  try {
    const parsed = JSON.parse(readFileSync(localCasesPath, "utf8"));
    for (const item of parsed.cases ?? []) {
      // Relative inputs resolve against the framework repo root, so sibling
      // checkouts ("../design-system") work on any machine.
      const input = resolve(ROOT, String(item.input));
      if (existsSync(input)) localCases.push({ id: String(item.id), input, kind: "file" });
      else console.warn(`[self-improving-loop] skipping missing local case ${item.id}: ${input}`);
    }
  } catch {
    console.warn(`[self-improving-loop] no local-cases file at ${localCasesPath} (optional).`);
  }

  const requestedCases = [
    ...localCases,

    // DOWNLOADED DESIGN.md FIXTURES
    ...downloaded.map(([id, path]) => ({ id: `file-${id}`, input: path, kind: "file" })),

    // PUBLIC URLS
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

    // PUBLIC REPOSITORIES (cloned shallow; artifact + verification bands light up here)
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
  if (!cases.length) {
    console.error("[self-improving-loop] no runnable cases found.");
    process.exit(1);
  }
  console.log(`[self-improving-loop] ${cases.length} runnable case(s) (${localCases.length} machine-local).`);

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
      console.log(`  Score: ${currentScore}% (weighted ${iterResult.weightedCombined}%, tier ${iterResult.tier}, enterprise floors ${iterResult.enterpriseGrade ? "PASS" : "not yet"})`);

      if (iteration > 1) {
        const delta = currentScore - previousScore;
        console.log(`  Score Delta: ${delta > 0 ? '+' : ''}${delta}%`);

        if (delta <= 0) {
          console.log(`[self-improving-loop] Stable score reached at iteration ${iteration}. Stopping loop for ${item.id}.`);
          break;
        }
      }

      // NOTE — honesty guard. The engine's three-band model means re-feeding
      // IMPROVED_DESIGN.md can only ever recover the prose band (max 40/100):
      // artifacts and verification require real files, CI, and tests in the
      // target. The loop therefore converges quickly and cannot inflate scores
      // by keyword echo. Criteria/keyword/probe proposals are NOT generated
      // here any more — run `npm run evolve:mine` after the loop; it aggregates
      // scores.json across all cases and writes human-gated proposals to
      // docs/outputs/generated/evolution/ (never mutating the rubric).

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
