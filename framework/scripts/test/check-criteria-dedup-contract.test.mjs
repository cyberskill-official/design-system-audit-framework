import test from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

import {
  countId,
  criterionPart,
  criterionPrefix,
  evaluateCriteriaDedupContract,
  loadCriteriaDedupPayload,
  makeResult,
  parseAliasRows,
  parseCoreIds,
  parseCriterionRows,
  summarize,
  writeCriteriaDedupEvidence,
} from "../lib/criteria-dedup-contract-lib.mjs";

const payload = loadCriteriaDedupPayload();

function criterionLine(id) {
  return `| ${id} | **Name ${id}** | FIXED | 0 | 3 | 5 |`;
}

function makeIds(part, count, prefixes, forbidden, required) {
  const ids = [];
  const add = (id) => {
    if (!forbidden.has(id) && !ids.includes(id)) ids.push(id);
  };
  for (const id of required) {
    if (id.startsWith(part)) add(id);
  }
  for (const prefix of prefixes) add(`${prefix}.1`);
  let n = 20;
  while (ids.length < count) {
    for (const prefix of prefixes) {
      add(`${prefix}.${n}`);
      if (ids.length === count) break;
    }
    n++;
  }
  return ids.filter((id) => id.startsWith(part));
}

function fixtureRepo() {
  const root = mkdtempSync(join(tmpdir(), "dsaf-dedup-"));
  mkdirSync(join(root, "docs"), { recursive: true });
  mkdirSync(join(root, "framework"), { recursive: true });
  mkdirSync(join(root, "framework/examples/cyberskill-design-system"), { recursive: true });
  const forbidden = new Set(payload.expected_aliases.map((row) => row.merged_away_id));
  const required = new Set(payload.expected_aliases.map((row) => row.primary_id));
  const prefixesA = payload.required_category_prefixes.filter((prefix) => prefix.startsWith("A"));
  const prefixesB = payload.required_category_prefixes.filter((prefix) => prefix.startsWith("B"));
  const partAIds = makeIds("A", payload.expected_counts.part_a, prefixesA, forbidden, required);
  const partBIds = makeIds("B", payload.expected_counts.part_b, prefixesB, forbidden, required);
  const table = (ids) => `| # | Criterion | Tag | 0 | 3 | 5 |\n|---|---|---|---|---|---|\n${ids.map(criterionLine).join("\n")}\n`;
  writeFileSync(join(root, "framework/03-criteria-part-a.md"), table(partAIds));
  writeFileSync(join(root, "framework/04-criteria-part-b.md"), table(partBIds));
  writeFileSync(join(root, "framework/criteria-aliases.md"), `# DSAF criterion aliases\nMerged-away ID\nPrimary ID\nAlias IDs are never reused.\nA8 Accessibility vs B5 Accessibility & Inclusive\nA1 Tokens vs A8 accessibility tokens\n| Merged-away ID | Primary ID | Merged date | Rationale |\n|---|---|---:|---|\n${payload.expected_aliases.map((row) => `| ${row.merged_away_id} | ${row.primary_id} | 2026-05-18 | rationale |`).join("\n")}\n`);
  writeFileSync(join(root, "framework/criteria-dedup-methodology.md"), "Dedup passes consolidate true duplicates without renumbering surviving IDs.\nCompare pairs within the same Part only.\nDo not merge FIXED with DYNAMIC.\nDo not merge across Part A and Part B.\nDo not leave any category empty.\nThis is the stable DSAF-125 baseline.\n");
  writeFileSync(join(root, "framework/dsaf-25.md"), `| # | Source | Category | Criterion | Tag |\n|---:|---|---|---|---|\n${[...partAIds, ...partBIds].slice(0, 25).map((id, index) => `| ${index + 1} | ${id} | Cat | Name ${id} | FIXED |`).join("\n")}\n`);
  writeFileSync(join(root, "framework/examples/cyberskill-design-system/improvement-plan.md"), "No alias references here.\n");
  writeFileSync(join(root, "framework/examples/cyberskill-design-system/_history.md"), "P0 FR-CORE-003 Criterion rows reduced from 138 to exactly 125 13 merged-away IDs preserved\n");
  writeFileSync(join(root, "README.md"), "npm run test:criteria-dedup-contract\nnpm run contract:criteria-dedup\n");
  writeFileSync(join(root, "package.json"), JSON.stringify({ scripts: { "contract:criteria-dedup": "node x", "test:criteria-dedup-contract": "node --test x" } }));
  return root;
}

test("parsers read criteria, aliases, and core IDs", () => {
  assert.equal(criterionPrefix("A10.3"), "A10");
  assert.equal(criterionPart("B7.12"), "B");
  assert.equal(parseCriterionRows("| A1.1 | **Color** | FIXED | 0 | 3 | 5 |\n")[0].name, "Color");
  assert.equal(parseAliasRows("| B7.2 | B3.1 | 2026-05-18 | duplicate |\n")[0].primary_id, "B3.1");
  assert.deepEqual(parseCoreIds("| 1 | A1.1 | Cat | Name | FIXED |\n"), ["A1.1"]);
  assert.equal(countId("B7.1 B7.11", "B7.1"), 1);
});

test("evaluateCriteriaDedupContract passes a complete fixture", () => {
  const root = fixtureRepo();
  try {
    const summary = summarize(evaluateCriteriaDedupContract(payload, root).results);
    assert.equal(summary.fail, 0);
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateCriteriaDedupContract catches reused alias IDs", () => {
  const root = fixtureRepo();
  try {
    writeFileSync(join(root, "framework/03-criteria-part-a.md"), readFileSync(join(root, "framework/03-criteria-part-a.md"), "utf8") + criterionLine("A10.4") + "\n");
    const failures = evaluateCriteriaDedupContract(payload, root).results.filter((item) => item.status === "fail");
    assert.ok(failures.some((item) => item.rule_id === "alias-not-live"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateCriteriaDedupContract catches broken primaries and chains", () => {
  const root = fixtureRepo();
  try {
    const aliases = readFileSync(join(root, "framework/criteria-aliases.md"), "utf8")
      .replace("| A10.4 | A10.3 |", "| A10.4 | A10.6 |");
    writeFileSync(join(root, "framework/criteria-aliases.md"), aliases);
    const failures = evaluateCriteriaDedupContract(payload, root).results.filter((item) => item.status === "fail");
    assert.ok(failures.some((item) => item.rule_id === "alias-no-chain"));
    assert.ok(failures.some((item) => item.rule_id === "alias-primary-live"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateCriteriaDedupContract catches DSAF-25 alias references", () => {
  const root = fixtureRepo();
  try {
    writeFileSync(join(root, "framework/dsaf-25.md"), "| # | Source | Category | Criterion | Tag |\n|---:|---|---|---|---|\n| 1 | B7.2 | Cat | Alias | FIXED |\n");
    const failures = evaluateCriteriaDedupContract(payload, root).results.filter((item) => item.status === "fail");
    assert.ok(failures.some((item) => item.rule_id === "core-id-not-alias"));
    assert.ok(failures.some((item) => item.rule_id === "alias-forbidden-surface"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateCriteriaDedupContract catches missing package framework/scripts", () => {
  const root = fixtureRepo();
  try {
    writeFileSync(join(root, "package.json"), JSON.stringify({ scripts: {} }));
    const failures = evaluateCriteriaDedupContract(payload, root).results.filter((item) => item.status === "fail");
    assert.ok(failures.some((item) => item.rule_id === "package-script"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateCriteriaDedupContract reports missing artefacts", () => {
  const root = fixtureRepo();
  try {
    rmSync(join(root, "framework/criteria-dedup-methodology.md"), { force: true });
    const failures = evaluateCriteriaDedupContract(payload, root).results.filter((item) => item.status === "fail");
    assert.ok(failures.some((item) => item.rule_id === "artifact-exists"));
    assert.ok(failures.some((item) => item.rule_id === "required-string"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("writeCriteriaDedupEvidence writes structured output", () => {
  const root = fixtureRepo();
  const out = mkdtempSync(join(tmpdir(), "dsaf-dedup-out-"));
  try {
    const output = join(out, "audit.json");
    const audit = writeCriteriaDedupEvidence(payload, evaluateCriteriaDedupContract(payload, root), output);
    const written = JSON.parse(readFileSync(output, "utf8"));
    assert.equal(audit.fr_id, "FR-CORE-003");
    assert.equal(written.criteria_count, 125);
  }
  finally {
    rmSync(root, { recursive: true, force: true });
    rmSync(out, { recursive: true, force: true });
  }
});

test("makeResult and summarize report failures", () => {
  assert.deepEqual(summarize([makeResult(false, "x", "file", 1, 2)]), { pass: 0, fail: 1, ok: false });
});
