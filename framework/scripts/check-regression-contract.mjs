#!/usr/bin/env node
/**
 * FR-CORE-002 no-silent-regression strict contract.
 */

import {
  AUDIT_OUTPUT,
  evaluateRegressionContract,
  loadRegressionPayload,
  summarize,
  writeRegressionEvidence,
} from "./regression-contract-lib.mjs";

const payload = loadRegressionPayload();
const evaluation = evaluateRegressionContract(payload);
const audit = writeRegressionEvidence(payload, evaluation);
const summary = summarize(evaluation.results);

console.log("[regression-contract]", JSON.stringify(summary));
console.log(`[regression-contract] files=${evaluation.files.length}`);
console.log(`[regression-contract] output=${AUDIT_OUTPUT.replace(`${process.cwd()}/`, "")}`);

for (const item of audit.results.filter((result) => result.status !== "pass")) {
  console.log(`[regression-contract:${item.status}] ${item.file} ${item.rule_id} ${JSON.stringify(item.observed)}`);
}

process.exit(summary.ok ? 0 : 1);
