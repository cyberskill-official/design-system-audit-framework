#!/usr/bin/env node
/**
 * FR-CORE-004 self-audit publication cap contract.
 */

import {
  AUDIT_OUTPUT,
  evaluateSelfAuditContract,
  loadSelfAuditPayload,
  summarize,
  writeSelfAuditEvidence,
} from "./self-audit-contract-lib.mjs";

const payload = loadSelfAuditPayload();
const evaluation = evaluateSelfAuditContract(payload);
const audit = writeSelfAuditEvidence(payload, evaluation);
const summary = summarize(evaluation.results);

console.log("[self-audit-contract]", JSON.stringify(summary));
console.log(`[self-audit-contract] files=${evaluation.files.length}`);
console.log(`[self-audit-contract] output=${AUDIT_OUTPUT.replace(`${process.cwd()}/`, "")}`);

for (const item of evaluation.results.filter((entry) => entry.status !== "pass")) {
  console.log(`[self-audit-contract:${item.status}] ${item.file} ${item.rule_id} ${JSON.stringify(item.observed)}`);
}

if (!audit.summary.ok) process.exit(1);
