#!/usr/bin/env node
/**
 * FR-CORE-003 criteria dedup strict contract.
 */

import {
  AUDIT_OUTPUT,
  evaluateCriteriaDedupContract,
  loadCriteriaDedupPayload,
  summarize,
  writeCriteriaDedupEvidence,
} from "./criteria-dedup-contract-lib.mjs";

const payload = loadCriteriaDedupPayload();
const evaluation = evaluateCriteriaDedupContract(payload);
const audit = writeCriteriaDedupEvidence(payload, evaluation);
const summary = summarize(evaluation.results);

console.log("[criteria-dedup-contract]", JSON.stringify(summary));
console.log(`[criteria-dedup-contract] criteria=${evaluation.criteria.length}`);
console.log(`[criteria-dedup-contract] aliases=${evaluation.aliases.length}`);
console.log(`[criteria-dedup-contract] output=${AUDIT_OUTPUT.replace(`${process.cwd()}/`, "")}`);

for (const item of audit.results.filter((result) => result.status !== "pass")) {
  console.log(`[criteria-dedup-contract:${item.status}] ${item.file} ${item.rule_id} ${JSON.stringify(item.observed)}`);
}

process.exit(summary.ok ? 0 : 1);
