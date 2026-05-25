#!/usr/bin/env node
/**
 * FR-DOCS-002 endorsement consent-gate strict contract.
 */

import {
  AUDIT_OUTPUT,
  evaluateEndorsementContract,
  loadEndorsementPayload,
  summarize,
  writeEndorsementEvidence,
} from "../lib/endorsement-contract-lib.mjs";

const payload = loadEndorsementPayload();
const evaluation = evaluateEndorsementContract(payload);
const audit = writeEndorsementEvidence(payload, evaluation);
const summary = summarize(evaluation.results);

console.log("[endorsement-contract]", JSON.stringify(summary));
console.log(`[endorsement-contract] output=${AUDIT_OUTPUT.replace(`${process.cwd()}/`, "")}`);

for (const item of audit.results.filter((result) => result.status !== "pass")) {
  console.log(`[endorsement-contract:${item.status}] ${item.file} ${item.rule_id} ${JSON.stringify(item.observed)}`);
}

process.exit(summary.ok ? 0 : 1);
