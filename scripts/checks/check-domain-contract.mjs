#!/usr/bin/env node
/**
 * TASK-BRAND-001 live domain + private-operation mock contract.
 */

import {
  AUDIT_OUTPUT,
  collectLiveSnapshot,
  evaluateLiveSnapshot,
  evaluatePrivateOperationContract,
  loadDomainPayload,
  summarize,
  writeAudit,
} from "../lib/domain-contract-lib.mjs";

const payload = loadDomainPayload();
const snapshot = await collectLiveSnapshot();
const liveResults = evaluateLiveSnapshot(snapshot, payload);
const privateResults = evaluatePrivateOperationContract(payload);
const audit = writeAudit(payload, snapshot, liveResults, privateResults);
const live = summarize(liveResults);
const privateOps = summarize(privateResults);

console.log("[domain-contract] live", JSON.stringify(live));
console.log("[domain-contract] private_operations", JSON.stringify(privateOps));
console.log(`[domain-contract] output=${AUDIT_OUTPUT.replace(`${process.cwd()}/`, "")}`);

for (const result of [...liveResults, ...privateResults]) {
  if (result.status !== "pass") {
    console.log(`[domain-contract:${result.status}] ${result.name}`);
  }
}

if (!audit.summary.live.ok || !audit.summary.private_operations.ok) {
  process.exit(1);
}
