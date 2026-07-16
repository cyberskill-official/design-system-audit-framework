#!/usr/bin/env node
/**
 * TASK-CORE-001 DSAF-25 Core strict contract.
 */

import {
  AUDIT_OUTPUT,
  evaluateDsaf25Contract,
  loadDsaf25Payload,
  summarize,
  writeDsaf25Evidence,
} from "../lib/dsaf-25-contract-lib.mjs";

const payload = loadDsaf25Payload();
const evaluation = evaluateDsaf25Contract(payload);
const audit = writeDsaf25Evidence(payload, evaluation);
const summary = summarize(evaluation.results);

console.log("[dsaf-25-contract]", JSON.stringify(summary));
console.log(`[dsaf-25-contract] core_rows=${evaluation.core_rows.length}`);
console.log(`[dsaf-25-contract] output=${AUDIT_OUTPUT.replace(`${process.cwd()}/`, "")}`);

for (const item of audit.results.filter((result) => result.status !== "pass")) {
  console.log(`[dsaf-25-contract:${item.status}] ${item.file} ${item.rule_id} ${JSON.stringify(item.observed)}`);
}

process.exit(summary.ok ? 0 : 1);
