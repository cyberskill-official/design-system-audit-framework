#!/usr/bin/env node
/**
 * FR-BRAND-003 canonical visual outputs/assets strict contract.
 */

import {
  AUDIT_OUTPUT,
  evaluateVisualAssetsContract,
  loadVisualAssetsPayload,
  summarize,
  writeVisualAssetsEvidence,
} from "./visual-assets-contract-lib.mjs";

const payload = loadVisualAssetsPayload();
const evaluation = evaluateVisualAssetsContract(payload);
const audit = writeVisualAssetsEvidence(payload, evaluation);
const summary = summarize(evaluation.results);

console.log("[visual-assets-contract]", JSON.stringify(summary));
console.log(`[visual-assets-contract] output=${AUDIT_OUTPUT.replace(`${process.cwd()}/`, "")}`);

for (const item of audit.results.filter((result) => result.status !== "pass")) {
  console.log(`[visual-assets-contract:${item.status}] ${item.file} ${item.rule_id} ${JSON.stringify(item.observed)}`);
}

process.exit(summary.ok ? 0 : 1);
