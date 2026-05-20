#!/usr/bin/env node
/**
 * FR-BRAND-004 content-layer decoupling strict contract.
 */

import {
  AUDIT_OUTPUT,
  evaluateDecouplingContract,
  loadDecouplingPayload,
  summarize,
  writeDecouplingEvidence,
} from "./decoupling-contract-lib.mjs";

const payload = loadDecouplingPayload();
const evaluation = evaluateDecouplingContract(payload);
const audit = writeDecouplingEvidence(payload, evaluation);
const summary = summarize(evaluation.results);

console.log("[decoupling-contract]", JSON.stringify(summary));
console.log(`[decoupling-contract] host=${payload.canonical_host}`);
console.log(`[decoupling-contract] output=${AUDIT_OUTPUT.replace(`${process.cwd()}/`, "")}`);

for (const item of audit.results.filter((result) => result.status !== "pass")) {
  console.log(`[decoupling-contract:${item.status}] ${item.file} ${item.rule_id} ${JSON.stringify(item.observed)}`);
}

process.exit(summary.ok ? 0 : 1);
