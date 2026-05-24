#!/usr/bin/env node
/**
 * Run repo-level DSAF verification checks that are safe in this framework repo.
 */

import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const checks = [
  ["links", "scripts/check-links.mjs"],
  ["coverage", "scripts/check-coverage.mjs"],
  ["bundle-size", "scripts/check-bundle-size.mjs"],
  ["doc-freshness", "scripts/check-doc-freshness.mjs"],
  ["maximal-cases", "scripts/check-maximal-cases.mjs"],
  ["apca", "scripts/check-apca.mjs"],
  ["criteria-dedup-contract", "scripts/check-criteria-dedup-contract.mjs"],
  ["decoupling-contract", "scripts/check-decoupling-contract.mjs"],
  ["dsaf-25-contract", "scripts/check-dsaf-25-contract.mjs"],
  ["endorsement-contract", "scripts/check-endorsement-contract.mjs"],
  ["launch-blog-contract", "scripts/check-launch-blog-contract.mjs"],
  ["readme-contract", "scripts/check-readme-contract.mjs"],
  ["regression-contract", "scripts/check-regression-contract.mjs"],
  ["reviewer-contract", "scripts/check-reviewer-contract.mjs"],
  ["visual-assets-contract", "scripts/check-visual-assets-contract.mjs"],
  ["newsletter-contract", "scripts/check-newsletter-contract.mjs"],
];

let failed = 0;
for (const [name, script] of checks) {
  const run = spawnSync(process.execPath, [resolve(ROOT, script)], { cwd: ROOT, encoding: "utf8" });
  process.stdout.write(`\n[verify:${name}] exit ${run.status}\n`);
  if (run.stdout) process.stdout.write(run.stdout);
  if (run.stderr) process.stderr.write(run.stderr);
  if (run.status !== 0) failed++;
}

process.exit(failed === 0 ? 0 : 1);
