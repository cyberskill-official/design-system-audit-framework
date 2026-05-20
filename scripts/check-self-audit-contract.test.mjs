import test from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

import {
  countPattern,
  evaluateSelfAuditContract,
  loadSelfAuditPayload,
  makeResult,
  summarize,
  walkPublicFiles,
  writeSelfAuditEvidence,
} from "./self-audit-contract-lib.mjs";

const payload = loadSelfAuditPayload();

function fixtureRepo() {
  const root = mkdtempSync(join(tmpdir(), "dsaf-self-audit-"));
  const files = [
    "docs/branding",
    "docs",
    "landing",
    "prompts",
    "templates",
    "examples/cyberskill-design-system",
  ];
  for (const dir of files) mkdirSync(join(root, dir), { recursive: true });
  writeFileSync(join(root, "README.md"), "Complete L3 self-audit example. See the self-audit publication policy.\n");
  writeFileSync(join(root, "SERVICES.md"), "CyberSkill cites the worked example at L3.\n");
  writeFileSync(join(root, "docs/branding/self-audit-policy.md"), "No third-party verification -> L3. Combined percentages may appear inside audit data tables.\n");
  writeFileSync(join(root, "docs/01-introduction.md"), "## The self-audit publication cap\nThis caps at L3.\n");
  writeFileSync(join(root, "docs/07-maturity-tiers.md"), "## Self-audit cap rule\nL3 (Managed) maximum without third-party verification.\n");
  writeFileSync(join(root, "examples/cyberskill-design-system/README.md"), "Public cited level: L3 Managed.\n");
  writeFileSync(join(root, "examples/cyberskill-design-system/improvement-plan.md"), "Worked Example Audit (L3 self-audit, uncertified)\nCited public Level\nL3 (Managed)\n");
  writeFileSync(join(root, "examples/cyberskill-design-system/_history.md"), "L3 capped\nself-audit cap\n");
  writeFileSync(join(root, "examples/cyberskill-design-system/audit-report-2026-04-27.md"), "combined: 84.6\ntier: L5 Optimised\n| Post-audit combined score | **84.6%** (L5 Optimised) |\n");
  return root;
}

test("countPattern is case-insensitive for claim phrases", () => {
  assert.equal(countPattern("84.6% Combined and 84.6% combined", "84\\.6% combined"), 2);
});

test("walkPublicFiles excludes the preserved interior audit", () => {
  const root = fixtureRepo();
  try {
    const files = walkPublicFiles(root, payload).map((file) => file.replace(root + "/", ""));
    assert.ok(files.includes("README.md"));
    assert.ok(!files.includes("examples/cyberskill-design-system/audit-report-2026-04-27.md"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateSelfAuditContract passes a clean fixture", () => {
  const root = fixtureRepo();
  try {
    const evaluation = evaluateSelfAuditContract(payload, root);
    assert.equal(summarize(evaluation.results).fail, 0);
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateSelfAuditContract catches public CyberSkill L5 claims", () => {
  const root = fixtureRepo();
  try {
    writeFileSync(join(root, "landing/index.html"), "CyberSkill reached L5 Optimised.");
    const evaluation = evaluateSelfAuditContract(payload, root);
    assert.ok(evaluation.results.some((item) => item.status === "fail" && item.file === "landing/index.html"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("writeSelfAuditEvidence writes structured output", () => {
  const root = fixtureRepo();
  const out = mkdtempSync(join(tmpdir(), "dsaf-self-audit-out-"));
  try {
    const evaluation = evaluateSelfAuditContract(payload, root);
    const output = join(out, "audit.json");
    const audit = writeSelfAuditEvidence(payload, evaluation, output);
    const written = JSON.parse(readFileSync(output, "utf8"));
    assert.equal(audit.fr_id, "FR-CORE-004");
    assert.equal(written.summary.fail, 0);
  }
  finally {
    rmSync(root, { recursive: true, force: true });
    rmSync(out, { recursive: true, force: true });
  }
});

test("makeResult fails when condition is false", () => {
  assert.equal(makeResult(false, "rule", "file", "bad", "good").status, "fail");
});
