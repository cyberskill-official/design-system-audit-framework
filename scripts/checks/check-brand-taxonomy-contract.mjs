#!/usr/bin/env node
/**
 * FR-BRAND-002 handle taxonomy contract.
 */

import {
  AUDIT_OUTPUT,
  evaluateTaxonomy,
  loadTaxonomyPayload,
  summarize,
  writeTaxonomyAudit,
} from "../lib/brand-taxonomy-contract-lib.mjs";

const payload = loadTaxonomyPayload();
const evaluation = evaluateTaxonomy(payload);
const audit = writeTaxonomyAudit(payload, evaluation);
const summary = summarize(evaluation.results);

console.log("[brand-taxonomy-contract]", JSON.stringify(summary));
console.log(`[brand-taxonomy-contract] files=${evaluation.files.length}`);
console.log(`[brand-taxonomy-contract] output=${AUDIT_OUTPUT.replace(`${process.cwd()}/`, "")}`);

for (const item of evaluation.results.filter((entry) => entry.status !== "pass")) {
  console.log(`[brand-taxonomy-contract:${item.status}] ${item.file} ${item.rule_id} ${JSON.stringify(item.observed)}`);
}

if (!audit.summary.ok) process.exit(1);
