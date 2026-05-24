import test from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

import {
  countPattern,
  evaluateRegressionContract,
  loadRegressionPayload,
  makeResult,
  summarize,
  validateOverrideCase,
  walkPolicyFiles,
  writeRegressionEvidence,
} from "../lib/regression-contract-lib.mjs";

const payload = loadRegressionPayload();

function fixtureRepo() {
  const root = mkdtempSync(join(tmpdir(), "dsaf-regression-"));
  mkdirSync(join(root, "docs"), { recursive: true });
  mkdirSync(join(root, "framework"), { recursive: true });
  mkdirSync(join(root, "guidelines"), { recursive: true });
  mkdirSync(join(root, "guidelines/prompts"), { recursive: true });
  mkdirSync(join(root, "framework/templates"), { recursive: true });
  mkdirSync(join(root, "internal/feature-requests"), { recursive: true });
  const common = "No-silent-regression gate override_log RE_AUDIT (awaiting override) D-RT rollback no_silent_regression: true override_count regression_count regression_tag UNRESOLVED @Human[rollback]";
  writeFileSync(join(root, "framework/regression-policy.md"), "Regressions are allowed only when they are visible, attributed, and signed.\n`rubric-tightened` `fix-side-effect` `external-dependency-change` `deliberate-policy-tradeoff` `D-RT` `OVRD-FSE` `OVRD-EDC` `OVRD-DPT` `UNRESOLVED`\nOlder audits with `no_downgrade: true` remain valid\n");
  writeFileSync(join(root, "framework/02-framework.md"), `## §4 No-silent-regression rule\n${common}\nAlways honour the no-silent-regression rule\n`);
  writeFileSync(join(root, "guidelines/06-fix-cycle.md"), common);
  writeFileSync(join(root, "framework/07-maturity-tiers.md"), "DSAF Level transitions and the no-silent-regression rule\nevery regression in a signed audit is surfaced with a cause, tag, and approval path\nD-RT\n");
  writeFileSync(join(root, "framework/templates/audit-report-template.md"), common);
  writeFileSync(join(root, "guidelines/prompts/fix-mode.md"), "No-silent-regression gate override_log Do not auto-revert. Rollback is a human decision. RE_AUDIT (awaiting override)\n");
  writeFileSync(join(root, "README.md"), "npm run test:regression-contract\nnpm run contract:regression\n");
  writeFileSync(join(root, "package.json"), JSON.stringify({ scripts: { "contract:regression": "node x", "test:regression-contract": "node --test x" } }));
  writeFileSync(join(root, "internal/feature-requests/old.md"), "no-downgrade rule is allowed here by exclusion");
  return root;
}

test("validateOverrideCase accepts D-RT only for DYNAMIC rubric tightening", () => {
  const valid = validateOverrideCase(payload.sample_override_cases[0], payload);
  assert.equal(valid.valid, true);
  const invalid = validateOverrideCase({ ...payload.sample_override_cases[0], criterion_tag: "FIXED" }, payload);
  assert.equal(invalid.valid, false);
  assert.ok(invalid.reasons.includes("fixed-rubric-tightened"));
});

test("validateOverrideCase requires approvers for override tags", () => {
  const item = { ...payload.sample_override_cases[1], approver: "" };
  const validation = validateOverrideCase(item, payload);
  assert.equal(validation.valid, false);
  assert.ok(validation.reasons.includes("missing-approver"));
});

test("validateOverrideCase rejects malformed edge cases", () => {
  const base = payload.sample_override_cases[1];
  assert.ok(validateOverrideCase({ ...base, cause: "because-we-said-so" }, payload).reasons.includes("invalid-cause"));
  assert.ok(validateOverrideCase({ ...base, regression_tag: "OVRD-RT" }, payload).reasons.includes("invalid-tag"));
  assert.ok(validateOverrideCase({ ...base, pre_score: 3, post_score: 4 }, payload).reasons.includes("not-a-regression"));
  assert.ok(validateOverrideCase({ ...base, notes: "" }, payload).reasons.includes("missing-notes"));
  assert.ok(validateOverrideCase({ ...base, regression_tag: "OVRD-FSE" }, payload).reasons.includes("wrong-override-tag"));

  const drt = payload.sample_override_cases[0];
  assert.ok(validateOverrideCase({ ...drt, regression_tag: "UNRESOLVED" }, payload).reasons.includes("wrong-drt-tag"));
  assert.ok(validateOverrideCase({ ...drt, approver: "Named reviewer" }, payload).reasons.includes("drt-approver-present"));
});

test("walkPolicyFiles honors exclusions", () => {
  const root = fixtureRepo();
  try {
    const files = walkPolicyFiles(root, payload).map((file) => file.replace(`${root}/`, ""));
    assert.ok(files.includes("README.md"));
    assert.ok(!files.includes("internal/feature-requests/old.md"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateRegressionContract passes a clean fixture", () => {
  const root = fixtureRepo();
  try {
    const summary = summarize(evaluateRegressionContract(payload, root).results);
    assert.equal(summary.fail, 0);
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateRegressionContract catches legacy term drift", () => {
  const root = fixtureRepo();
  try {
    writeFileSync(join(root, "framework/02-framework.md"), "no-downgrade rule\n");
    const failures = evaluateRegressionContract(payload, root).results.filter((item) => item.status === "fail");
    assert.ok(failures.some((item) => item.rule_id === "legacy-term-absent"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateRegressionContract catches missing package framework/scripts", () => {
  const root = fixtureRepo();
  try {
    writeFileSync(join(root, "package.json"), JSON.stringify({ scripts: {} }));
    const failures = evaluateRegressionContract(payload, root).results.filter((item) => item.status === "fail");
    assert.ok(failures.some((item) => item.rule_id === "package-script"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("writeRegressionEvidence writes structured output", () => {
  const root = fixtureRepo();
  const out = mkdtempSync(join(tmpdir(), "dsaf-regression-out-"));
  try {
    const output = join(out, "audit.json");
    const audit = writeRegressionEvidence(payload, evaluateRegressionContract(payload, root), output);
    const written = JSON.parse(readFileSync(output, "utf8"));
    assert.equal(audit.fr_id, "FR-CORE-002");
    assert.equal(written.summary.fail, 0);
  }
  finally {
    rmSync(root, { recursive: true, force: true });
    rmSync(out, { recursive: true, force: true });
  }
});

test("utility helpers count and summarize", () => {
  assert.equal(countPattern("No-downgrade no-downgrade", "no-downgrade"), 2);
  assert.deepEqual(summarize([makeResult(false, "x", "file", 1, 2)]), { pass: 0, fail: 1, ok: false });
});
