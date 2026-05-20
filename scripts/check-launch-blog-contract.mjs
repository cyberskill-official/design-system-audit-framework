#!/usr/bin/env node
/**
 * FR-DOCS-003 launch blog strict contract.
 */

import {
  AUDIT_OUTPUT,
  evaluateLaunchBlogContract,
  loadLaunchBlogPayload,
  summarize,
  writeLaunchBlogEvidence,
} from "./launch-blog-contract-lib.mjs";

const payload = loadLaunchBlogPayload();
const evaluation = evaluateLaunchBlogContract(payload);
const audit = writeLaunchBlogEvidence(payload, evaluation);
const summary = summarize(evaluation.results);

console.log("[launch-blog-contract]", JSON.stringify(summary));
console.log(`[launch-blog-contract] output=${AUDIT_OUTPUT.replace(`${process.cwd()}/`, "")}`);

for (const item of audit.results.filter((result) => result.status !== "pass")) {
  console.log(`[launch-blog-contract:${item.status}] ${item.file} ${item.rule_id} ${JSON.stringify(item.observed)}`);
}

process.exit(summary.ok ? 0 : 1);
