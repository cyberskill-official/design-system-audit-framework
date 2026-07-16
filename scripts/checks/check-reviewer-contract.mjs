#!/usr/bin/env node
/**
 * TASK-GOV-001 reviewer shortlist and outreach strict contract.
 */

import {
  AUDIT_OUTPUT,
  evaluateReviewerContract,
  loadReviewerPayload,
  summarize,
  writeReviewerEvidence,
} from "../lib/reviewer-contract-lib.mjs";

const payload = loadReviewerPayload();
const evaluation = evaluateReviewerContract(payload);
const audit = writeReviewerEvidence(payload, evaluation);
const summary = summarize(evaluation.results);

console.log("[reviewer-contract]", JSON.stringify(summary));
console.log(`[reviewer-contract] output=${AUDIT_OUTPUT.replace(`${process.cwd()}/`, "")}`);

for (const item of audit.results.filter((result) => result.status !== "pass")) {
  console.log(`[reviewer-contract:${item.status}] ${item.file} ${item.rule_id} ${JSON.stringify(item.observed)}`);
}

process.exit(summary.ok ? 0 : 1);
