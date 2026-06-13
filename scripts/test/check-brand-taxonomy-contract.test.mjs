import test from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";

/** Write a fixture file, creating its parent directory tree first (robust to any layout). */
function w(absPath, content) {
  mkdirSync(dirname(absPath), { recursive: true });
  writeFileSync(absPath, content);
}

import {
  countMatches,
  evaluateTaxonomy,
  loadTaxonomyPayload,
  result,
  summarize,
  walkFiles,
  writeTaxonomyAudit,
} from "../lib/brand-taxonomy-contract-lib.mjs";

const payload = loadTaxonomyPayload();

function fixtureRepo() {
  const root = mkdtempSync(join(tmpdir(), "dsaf-taxonomy-"));
  mkdirSync(join(root, "internal"), { recursive: true });
  mkdirSync(join(root, "guidelines"), { recursive: true });
  mkdirSync(join(root, "apps/landing"), { recursive: true });
  mkdirSync(join(root, "docs/internal/branding"), { recursive: true });
  w(join(root, "README.md"), "# DSAF — Design System Audit Framework\n\nDSAF DSAF DSAF DSAF DSAF\n");
  w(join(root, "docs/guidelines/CONTRIBUTING.md"), "Use DSAF Criteria and DSAF Levels.\n");
  w(join(root, "docs/internal/SERVICES.md"), "Commercial work is separate from DSAF.\n");
  w(join(root, "docs/internal/landing/index.html"), "<title>DSAF — Design System Audit Framework</title>\n");
  w(join(root, "docs/internal/branding/handle-taxonomy.md"), "DSAF Design System Audit Framework DSAF Criteria DSAF-25 Core DSAF Levels DSAF Modes SCAN mode FIX mode W mode DSAF DSAF DSAF DSAF\n");
  w(join(root, "docs/internal/branding/glossary.md"), "DSAF Design System Audit Framework DSAF Criteria DSAF-25 Core DSAF Levels DSAF Modes SCAN mode FIX mode W mode DSAF DSAF DSAF DSAF\n");
  return root;
}

test("countMatches follows the contract pattern casing", () => {
  assert.equal(countMatches("DSAF framework and DSAF Framework", "\\bDSAF Framework\\b"), 1);
});

test("walkFiles honors extensions and exclusions", () => {
  const root = fixtureRepo();
  try {
    mkdirSync(join(root, "docs/internal/feature-requests"), { recursive: true });
    w(join(root, "docs/internal/feature-requests/example.md"), "DSAF Framework example");
    const files = walkFiles(root, payload).map((file) => file.replace(root + "/", ""));
    assert.ok(files.includes("README.md"));
    assert.ok(!files.includes("docs/internal/feature-requests/example.md"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateTaxonomy passes a clean fixture", () => {
  const root = fixtureRepo();
  try {
    const evaluation = evaluateTaxonomy(payload, root);
    assert.equal(summarize(evaluation.results).fail, 0);
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateTaxonomy catches banned noun handles", () => {
  const root = fixtureRepo();
  try {
    w(join(root, "docs/internal/landing/index.html"), "The DSAF Framework should fail.\n");
    const evaluation = evaluateTaxonomy(payload, root);
    const failures = evaluation.results.filter((item) => item.status === "fail");
    assert.ok(failures.some((item) => item.file === "docs/internal/landing/index.html"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("writeTaxonomyAudit writes evidence", () => {
  const root = fixtureRepo();
  const out = mkdtempSync(join(tmpdir(), "dsaf-taxonomy-out-"));
  try {
    const evaluation = evaluateTaxonomy(payload, root);
    const output = join(out, "audit.json");
    const audit = writeTaxonomyAudit(payload, evaluation, output);
    const written = JSON.parse(readFileSync(output, "utf8"));
    assert.equal(audit.fr_id, "FR-BRAND-002");
    assert.equal(written.summary.fail, 0);
  }
  finally {
    rmSync(root, { recursive: true, force: true });
    rmSync(out, { recursive: true, force: true });
  }
});

test("result supports warning severity", () => {
  assert.equal(result(false, "x", "file", 1, 2, "warn").status, "warn");
});
