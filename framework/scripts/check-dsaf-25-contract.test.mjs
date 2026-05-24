import test from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

import {
  evaluateDsaf25Contract,
  loadDsaf25Payload,
  makeResult,
  normalizeText,
  parseCoreRows,
  parseCriterionRows,
  summarize,
  writeDsaf25Evidence,
} from "./dsaf-25-contract-lib.mjs";

const payload = loadDsaf25Payload();

function sourceRows() {
  return payload.required_core_ids.map((id) => ({
    id,
    name: `Canonical ${id}`,
    tag: id.includes(".8") || id.includes("A10.") ? "DYNAMIC" : "FIXED",
  }));
}

function tableRows(rows) {
  return rows.map((row) => `| ${row.id} | **${row.name}** | ${row.tag} | 0 | 3 | 5 |`).join("\n");
}

function coreRows(rows) {
  return rows.map((row, index) => `| ${index + 1} | ${row.id} | Category ${row.id} | ${row.name} | ${row.tag} |`).join("\n");
}

function fixtureRepo() {
  const root = mkdtempSync(join(tmpdir(), "dsaf-25-contract-"));
  mkdirSync(join(root, "framework"), { recursive: true });
  mkdirSync(join(root, "outputs/assets"), { recursive: true });
  mkdirSync(join(root, "framework/core"), { recursive: true });
  mkdirSync(join(root, "framework/templates"), { recursive: true });
  mkdirSync(join(root, "internal/landing/card"), { recursive: true });
  const rows = sourceRows();
  const partA = rows.filter((row) => row.id.startsWith("A"));
  const partB = rows.filter((row) => row.id.startsWith("B"));

  writeFileSync(join(root, "framework/03-criteria-part-a.md"), `| # | Criterion | Tag | 0 | 3 | 5 |\n|---|---|---|---|---|---|\n${tableRows(partA)}\n`);
  writeFileSync(join(root, "framework/04-criteria-part-b.md"), `| # | Criterion | Tag | 0 | 3 | 5 |\n|---|---|---|---|---|---|\n${tableRows(partB)}\n`);
  writeFileSync(join(root, "framework/dsaf-25.md"), `---\ndsaf_125_version: "test"\n---\nIt is not DSAF Lite.\ndsaf_25_score%\nfull DSAF Criteria\nPublication cap\nDSAF-25 Core is the shareable entry point\nUse the full DSAF Criteria for signed audits.\n${rows.map((row) => `${row.id} ${row.name}`).join("\n")}\n| # | Source | Category | Criterion | Tag |\n|---:|---|---|---|---|\n${coreRows(rows)}\n`);
  writeFileSync(join(root, "framework/assets/dsaf-25-card.svg"), `<svg width="210mm" height="297mm" viewBox="0 0 210 297" role="img"><title>DSAF-25</title><desc>${rows.map((row) => `${row.id} ${row.name}`).join("; ")}</desc>${rows.map((row) => `<text>${row.id}</text>`).join("")}</svg>`);
  writeFileSync(join(root, "framework/assets/dsaf-25-card-print.pdf"), "x".repeat(1200));
  writeFileSync(join(root, "internal/landing/card/index.html"), `<svg aria-labelledby="t d"><title id="t">DSAF-25 Core</title><desc id="d">DSAF-25 Core</desc>${rows.map((row) => `<text>${row.id}</text>`).join("")}</svg>`);
  writeFileSync(join(root, "framework/templates/audit-report-template.md"), "dsaf_25_score: 0\n");
  writeFileSync(join(root, "README.md"), "npm run test:dsaf-25-contract\nnpm run contract:dsaf-25\n");
  writeFileSync(join(root, "package.json"), JSON.stringify({ scripts: { "contract:dsaf-25": "node x", "test:dsaf-25-contract": "node --test x" } }));
  return root;
}

test("parseCriterionRows strips markdown and preserves tags", () => {
  const rows = parseCriterionRows("| A1.1 | **Color tokens** with `aliases` | FIXED | 0 | 3 | 5 |\n");
  assert.deepEqual(rows, [{ id: "A1.1", name: "Color tokens with aliases", tag: "FIXED" }]);
});

test("parseCoreRows reads DSAF-25 table rows", () => {
  const rows = parseCoreRows("| 1 | A1.1 | Foundations | Color tokens | FIXED |\n");
  assert.equal(rows[0].number, 1);
  assert.equal(rows[0].id, "A1.1");
});

test("evaluateDsaf25Contract passes a complete fixture and records mocked human gates", () => {
  const root = fixtureRepo();
  try {
    const evaluation = evaluateDsaf25Contract(payload, root);
    const summary = summarize(evaluation.results);
    assert.equal(summary.fail, 0);
    assert.ok(summary.mocked > 0);
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateDsaf25Contract catches verbatim criterion drift", () => {
  const root = fixtureRepo();
  try {
    const text = readFileSync(join(root, "framework/dsaf-25.md"), "utf8").replace(/Canonical A1.1/g, "Reworded A1.1");
    writeFileSync(join(root, "framework/dsaf-25.md"), text);
    const failures = evaluateDsaf25Contract(payload, root).results.filter((item) => item.status === "fail");
    assert.ok(failures.some((item) => item.rule_id === "core-name-verbatim"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateDsaf25Contract catches missing category coverage", () => {
  const root = fixtureRepo();
  try {
    const text = readFileSync(join(root, "framework/dsaf-25.md"), "utf8").replace("| 25 | B10.1 | Category B10.1 | Canonical B10.1 | FIXED |", "| 25 | B9.1 | Category B9.1 | Canonical B9.1 | FIXED |");
    writeFileSync(join(root, "framework/dsaf-25.md"), text);
    const failures = evaluateDsaf25Contract(payload, root).results.filter((item) => item.status === "fail");
    assert.ok(failures.some((item) => item.rule_id === "core-unique-ids"));
    assert.ok(failures.some((item) => item.rule_id === "category-covered" && item.observed === "B10"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("manual validation mock fails malformed request roles", () => {
  const root = fixtureRepo();
  const badPayload = structuredClone(payload);
  badPayload.manual_validation_contract.mock_requests[0].participant_role = "founder";
  try {
    const failures = evaluateDsaf25Contract(badPayload, root).results.filter((item) => item.status === "fail");
    assert.ok(failures.some((item) => item.rule_id === "mock-request-role"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("writeDsaf25Evidence writes structured output", () => {
  const root = fixtureRepo();
  const out = mkdtempSync(join(tmpdir(), "dsaf-25-out-"));
  try {
    const output = join(out, "audit.json");
    const evaluation = evaluateDsaf25Contract(payload, root);
    const audit = writeDsaf25Evidence(payload, evaluation, output);
    const written = JSON.parse(readFileSync(output, "utf8"));
    assert.equal(audit.fr_id, "FR-CORE-001");
    assert.equal(written.summary.fail, 0);
  }
  finally {
    rmSync(root, { recursive: true, force: true });
    rmSync(out, { recursive: true, force: true });
  }
});

test("utility helpers normalize text and summarize failures", () => {
  assert.equal(normalizeText(" **A**   `B` "), "A B");
  assert.deepEqual(summarize([makeResult(false, "x", "file", 1, 2)]), { pass: 0, mocked: 0, fail: 1, ok: false });
});
