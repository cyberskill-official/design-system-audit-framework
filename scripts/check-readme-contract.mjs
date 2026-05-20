#!/usr/bin/env node
/**
 * FR-DOCS-001 README launch-copy strict contract.
 */

import {
  AUDIT_OUTPUT,
  evaluateReadmeContract,
  loadReadmePayload,
  summarize,
  writeReadmeEvidence,
} from "./readme-contract-lib.mjs";

const payload = loadReadmePayload();
const evaluation = evaluateReadmeContract(payload);
const audit = writeReadmeEvidence(payload, evaluation);
const summary = summarize(evaluation.results);

console.log("[readme-contract]", JSON.stringify(summary));
console.log(`[readme-contract] output=${AUDIT_OUTPUT.replace(`${process.cwd()}/`, "")}`);

for (const item of audit.results.filter((result) => result.status !== "pass")) {
  console.log(`[readme-contract:${item.status}] ${item.file} ${item.rule_id} ${JSON.stringify(item.observed)}`);
}

process.exit(summary.ok ? 0 : 1);
