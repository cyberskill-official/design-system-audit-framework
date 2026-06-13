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
  commandLines,
  countMatches,
  evaluateReadmeContract,
  evaluateSkimMock,
  firstWords,
  lineNumberOf,
  loadReadmePayload,
  makeResult,
  readJson,
  readingOrderRows,
  safeRead,
  sectionBetween,
  stripReadmeForWords,
  summarize,
  writeReadmeEvidence,
} from "../lib/readme-contract-lib.mjs";

const payload = loadReadmePayload();

function fixtureReadme() {
  return `# DSAF — Design System Audit Framework

DSAF is a 125-criterion, agent-native, CMM-style maturity rubric for design systems. Why now: there is no dominant open-source, criteria-graded maturity rubric on GitHub. zeroheight, Knapsack, and Supernova are commercial platforms. How it differs: Compared with SaaS platforms, DSAF lives in your repo. Compared with Brad Frost's frontend-guidelines-questionnaire, DSAF produces scored evidence, DSAF Levels, scripted checks, SCAN/FIX modes, and a no-silent-regression record.

This launch pitch stays concrete for skeptical readers. It names the audit output, the evidence trail, the reviewer workflow, the fast DSAF-25 entry point, the full criteria path, the markdown storage model, the local verification scripts, and the human pause before fixes. It explains that the repo is useful without a vendor account, useful before a procurement cycle, and useful when a design-system team needs one repeatable maturity language across design, engineering, accessibility, product, and governance.

<picture>
  <source srcset="./docs/framework/assets/dsaf-l0-l5-ladder-dark.svg" media="(prefers-color-scheme: dark)">
  <img src="./docs/framework/assets/dsaf-l0-l5-ladder.svg" alt="DSAF Levels ladder" width="100%">
</picture>

<picture>
  <source srcset="./docs/framework/assets/dsaf-radar-dark.svg" media="(prefers-color-scheme: dark)">
  <img src="./docs/framework/assets/dsaf-radar.svg" alt="DSAF radar chart" width="100%">
</picture>

**Read DSAF-25 Core first.** If you only have 5 minutes, [docs/framework/dsaf-25.md](./docs/framework/dsaf-25.md) is the 25-criterion subset that fits on one page. The full DSAF Criteria are in docs.

## Quick Start

\`\`\`bash
${payload.quick_start.required_strings.filter((s) => !s.endsWith(".md")).join("\n")}
\`\`\`

Then open [${payload.quick_start.required_strings.find((s) => s.endsWith(".md"))}](./${payload.quick_start.required_strings.find((s) => s.endsWith(".md"))}).

## Reading Order

| # | File | Purpose |
|---|---|---|
${payload.reading_order.required_links.map((link, index) => `| ${index + 1} | [${link}](./${link}) | Step ${index + 1} |`).join("\n")}

## External Review Status

| Quote |
|---|
| Named outside-reviewer quotes are not published until explicit written consent is logged. See docs/internal/branding/reviewer-consent-log.md. |

> "<endorsement quote, <= 280 chars>" — <Reviewer Name>, <Affiliation>

> "<endorsement quote, <= 280 chars>" — <Reviewer Name>, <Affiliation>

These slots are placeholders for FR-DOCS-002. Do not replace them with invented praise.

## Governance

DSAF Modes, Complete L3 self-audit example, self-audit publication policy, docs/internal/SERVICES.md, docs/internal/strategy/framework-monetization-plan.md, methodology surface stays neutral.
`;
}

function fixtureRepo() {
  const root = mkdtempSync(join(tmpdir(), "dsaf-readme-"));
  mkdirSync(join(root, "docs"), { recursive: true });
  mkdirSync(join(root, "guidelines"), { recursive: true });
  w(join(root, "README.md"), fixtureReadme());
  w(join(root, "docs/guidelines/01-introduction.md"), payload.reading_order.intro_required.join("\n"));
  w(join(root, "package.json"), JSON.stringify({ scripts: payload.required_package_scripts }));
  return root;
}

test("word helpers strip markdown and return first words", () => {
  const text = "# Title\n\n[DSAF](./x) <picture>hidden</picture> visible `code` words";
  assert.equal(stripReadmeForWords(text), "DSAF visible code words");
  assert.equal(firstWords("one two three", 2), "one two");
});

test("section, command, table, line, and count helpers work", () => {
  const section = sectionBetween("## Quick Start\n```bash\na\n# b\nc\n```\n## Next", "## Quick Start");
  assert.deepEqual(commandLines(section), ["a", "c"]);
  assert.equal(readingOrderRows("| 1 | a |\n| x | y |").length, 1);
  assert.equal(lineNumberOf("a\nneedle\n", "needle"), 2);
  assert.equal(lineNumberOf("a\n", "missing"), -1);
  assert.equal(countMatches("DSAF dsaf", "dsaf"), 2);
});

test("safeRead and readJson expose missing and malformed states", () => {
  const root = mkdtempSync(join(tmpdir(), "dsaf-readme-io-"));
  try {
    assert.equal(safeRead(root, "missing.md"), null);
    assert.deepEqual(readJson(root, "missing.json"), { ok: false, value: null, error: "missing" });
    w(join(root, "bad.json"), "{not-json");
    assert.equal(readJson(root, "bad.json").ok, false);
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateReadmeContract passes a clean fixture with mocked skim", () => {
  const root = fixtureRepo();
  try {
    const summary = summarize(evaluateReadmeContract(payload, root).results);
    assert.equal(summary.fail, 0);
    assert.equal(summary.mocked, 5);
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateReadmeContract catches missing pitch beats and misplaced visuals", () => {
  const root = fixtureRepo();
  try {
    w(join(root, "README.md"), "# DSAF — Design System Audit Framework\n\nGeneric intro.\n".repeat(40));
    const failures = evaluateReadmeContract(payload, root).results.filter((item) => item.status === "fail");
    assert.ok(failures.some((item) => item.rule_id.startsWith("first-200-")));
    assert.ok(failures.some((item) => item.rule_id === "visual-above-fold"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateReadmeContract catches funnel copy and wrong clone URL", () => {
  const root = fixtureRepo();
  try {
    w(join(root, "README.md"), fixtureReadme().replace("cyberskill-official", "cyberskill") + "\nBook a call\n");
    const failures = evaluateReadmeContract(payload, root).results.filter((item) => item.status === "fail");
    assert.ok(failures.some((item) => item.rule_id === "quick-start-required-string"));
    assert.ok(failures.some((item) => item.rule_id === "forbidden-readme-pattern"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateReadmeContract catches reading order and endorsement regressions", () => {
  const root = fixtureRepo();
  try {
    const lastLink = payload.reading_order.required_links[payload.reading_order.required_links.length - 1];
    const lastRow = `| ${payload.reading_order.required_links.length} | [${lastLink}](./${lastLink}) | Step ${payload.reading_order.required_links.length} |\n`;
    const broken = fixtureReadme().replace(lastRow, "").replace(/> "<endorsement quote[^\n]+\n/g, "");
    w(join(root, "README.md"), broken);
    w(join(root, "docs/guidelines/01-introduction.md"), "missing intro rows");
    const failures = evaluateReadmeContract(payload, root).results.filter((item) => item.status === "fail");
    assert.ok(failures.some((item) => item.rule_id === "reading-order-row-count"));
    assert.ok(failures.some((item) => item.rule_id === "endorsement-slot-count"));
    assert.ok(failures.some((item) => item.rule_id === "intro-reading-order"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateReadmeContract catches missing files and package script regressions", () => {
  const root = mkdtempSync(join(tmpdir(), "dsaf-readme-empty-"));
  try {
    w(join(root, "package.json"), JSON.stringify({ scripts: {} }));
    const failures = evaluateReadmeContract(payload, root).results.filter((item) => item.status === "fail");
    assert.ok(failures.some((item) => item.rule_id === "readme-exists"));
    assert.ok(failures.some((item) => item.rule_id === "intro-exists"));
    assert.ok(failures.some((item) => item.rule_id === "package-script"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateSkimMock catches malformed mock shapes", () => {
  const badPayload = structuredClone(payload);
  badPayload.skim_mock_contract.endpoint = "GET /bad";
  badPayload.skim_mock_contract.request.summary_sentences = ["only one"];
  badPayload.skim_mock_contract.response.status_code = 500;
  badPayload.skim_mock_contract.response.body.accepted = false;
  const failures = evaluateSkimMock(badPayload).filter((item) => item.status === "fail");
  assert.ok(failures.some((item) => item.rule_id === "mock-endpoint"));
  assert.ok(failures.some((item) => item.rule_id === "mock-request-summary-shape"));
  assert.ok(failures.some((item) => item.rule_id === "mock-response-shape"));
});

test("evaluateSkimMock catches missing request and response defaults", () => {
  const badPayload = structuredClone(payload);
  badPayload.skim_mock_contract = {};
  const failures = evaluateSkimMock(badPayload).filter((item) => item.status === "fail");
  assert.ok(failures.some((item) => item.rule_id === "mock-request-identity"));
  assert.ok(failures.some((item) => item.rule_id === "mock-request-participant"));
  assert.ok(failures.some((item) => item.rule_id === "mock-response-shape"));
});

test("writeReadmeEvidence writes structured output and summaries handle severities", () => {
  const root = fixtureRepo();
  const out = mkdtempSync(join(tmpdir(), "dsaf-readme-out-"));
  try {
    const output = join(out, "audit.json");
    const audit = writeReadmeEvidence(payload, evaluateReadmeContract(payload, root), output);
    const written = JSON.parse(readFileSync(output, "utf8"));
    assert.equal(audit.fr_id, "FR-DOCS-001");
    assert.equal(written.summary.fail, 0);
    assert.deepEqual(summarize([makeResult(true, "x", "file", 1, 1, "mocked"), makeResult(false, "y", "file", 1, 2)]), { pass: 0, mocked: 1, fail: 1, ok: false });
  }
  finally {
    rmSync(root, { recursive: true, force: true });
    rmSync(out, { recursive: true, force: true });
  }
});
