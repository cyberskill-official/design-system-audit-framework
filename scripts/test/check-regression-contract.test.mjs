import test from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";

/** Write a fixture file, creating its parent directory tree first (robust to any layout). */
function writeFixture(root, rel, content) {
  const target = join(root, rel);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, content);
}

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
  // Payload-driven: write each required artifact containing all its required strings, so
  // the fixture cannot drift from the canonical file paths or required content.
  for (const [rel, strings] of Object.entries(payload.required_strings)) {
    writeFixture(root, rel, strings.join("\n") + "\n");
  }
  const scripts = {};
  for (const name of payload.required_package_scripts) scripts[name] = "node x";
  writeFixture(root, payload.files.package_json, JSON.stringify({ scripts }));
  // A legacy term inside an excluded path must NOT be flagged (exercised by walk tests).
  writeFixture(root, "docs/internal/feature-requests/old.md", "no-downgrade rule is allowed here by exclusion");
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
    assert.ok(!files.includes("docs/internal/feature-requests/old.md"));
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
    writeFileSync(join(root, "docs/framework/02-framework.md"), "no-downgrade rule\n");
    const failures = evaluateRegressionContract(payload, root).results.filter((item) => item.status === "fail");
    assert.ok(failures.some((item) => item.rule_id === "legacy-term-absent"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateRegressionContract catches missing package docs/framework/scripts", () => {
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
