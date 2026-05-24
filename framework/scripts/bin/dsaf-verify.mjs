#!/usr/bin/env node
/**
 * Run repo-level DSAF verification checks that are safe in this framework repo.
 */

import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../../..');

const checks = [
  ["links", "framework/scripts/checks/check-links.mjs"],
  ["coverage", "framework/scripts/checks/check-coverage.mjs"],
  ["bundle-size", "framework/scripts/checks/check-bundle-size.mjs"],
  ["doc-freshness", "framework/scripts/checks/check-doc-freshness.mjs"],
  ["maximal-cases", "framework/scripts/checks/check-maximal-cases.mjs"],
  ["apca", "framework/scripts/checks/check-apca.mjs"],
  ["criteria-dedup-contract", "framework/scripts/checks/check-criteria-dedup-contract.mjs"],
  ["decoupling-contract", "framework/scripts/checks/check-decoupling-contract.mjs"],
  ["dsaf-25-contract", "framework/scripts/checks/check-dsaf-25-contract.mjs"],
  ["endorsement-contract", "framework/scripts/checks/check-endorsement-contract.mjs"],
  ["launch-blog-contract", "framework/scripts/checks/check-launch-blog-contract.mjs"],
  ["readme-contract", "framework/scripts/checks/check-readme-contract.mjs"],
  ["regression-contract", "framework/scripts/checks/check-regression-contract.mjs"],
  ["reviewer-contract", "framework/scripts/checks/check-reviewer-contract.mjs"],
  ["visual-assets-contract", "framework/scripts/checks/check-visual-assets-contract.mjs"],
  ["newsletter-contract", "framework/scripts/checks/check-newsletter-contract.mjs"],
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
