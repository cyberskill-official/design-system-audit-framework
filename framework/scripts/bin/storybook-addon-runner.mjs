#!/usr/bin/env node
/**
 * Storybook integration runner for DSAF.
 *
 * FR-INTEG-001: provides the command surface a Storybook addon can call.
 * It runs the DSAF check framework/scripts and returns a compact JSON summary.
 */

import { spawnSync } from "node:child_process";
import { dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../../..');

const checks = [
  ["coverage", "framework/scripts/checks/check-coverage.mjs"],
  ["apca", "framework/scripts/checks/check-apca.mjs"],
  ["bundle_size", "framework/scripts/checks/check-bundle-size.mjs"],
  ["doc_freshness", "framework/scripts/checks/check-doc-freshness.mjs"],
];

const results = [];
for (const [name, script] of checks) {
  const started = Date.now();
  const run = spawnSync(process.execPath, [resolve(ROOT, script)], {
    cwd: ROOT,
    encoding: "utf8",
  });
  results.push({
    name,
    script,
    ok: run.status === 0,
    status: run.status,
    duration_ms: Date.now() - started,
    stdout: run.stdout.trim().split("\n").slice(-8),
    stderr: run.stderr.trim().split("\n").filter(Boolean).slice(-8),
  });
}

const summary = {
  generated: new Date().toISOString(),
  root: relative(process.cwd(), ROOT) || ".",
  ok: results.every((r) => r.ok),
  checks: results,
  criterion_map: {
    coverage: ["A7.1", "A2.4", "A5.4"],
    apca: ["A8.1", "B5.2"],
    bundle_size: ["A9.1", "B8.5"],
    doc_freshness: ["A3.7"],
  },
};

console.log(JSON.stringify(summary, null, 2));
process.exit(summary.ok ? 0 : 1);
