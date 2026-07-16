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
  countMatches,
  evaluateVisualAssetsContract,
  loadVisualAssetsPayload,
  makeResult,
  summarize,
  svgMetrics,
  writeVisualAssetsEvidence,
} from "../lib/visual-assets-contract-lib.mjs";

const payload = loadVisualAssetsPayload();

function svg(asset) {
  return `<svg viewBox="${asset.viewBox}" role="img" aria-labelledby="title desc"><title>Title</title><desc>${asset.required_text.join(" ")} ${asset.required_patterns.join(" ")}</desc><metadata>{"dsaf_125_version":"x","dsaf_25_version":"x"}</metadata>${Array.from({ length: 9 }, (_, index) => `<text>${asset.required_text[index % asset.required_text.length]}</text>`).join("")}</svg>`;
}

function fixtureRepo() {
  const root = mkdtempSync(join(tmpdir(), "dsaf-visuals-"));
  for (const asset of payload.svg_assets) writeFixture(root, asset.path, svg(asset));
  for (const pdf of payload.pdf_assets) writeFixture(root, pdf, `%PDF-${"x".repeat(1500)}`);
  writeFixture(root, payload.radar_template.path, JSON.stringify({
    axes: Array.from({ length: 20 }, (_, index) => ({
      id: index < 10 ? `A.${index + 1}` : `B.${index - 9}`,
      name: `Axis ${index}`,
      part: index < 10 ? "A" : "B",
      weight: 10,
      value_pct: null,
      enterprise_floor_pct: 40,
    })),
  }));
  // Payload-driven: write exactly the files the contract payload requires, so this
  // fixture cannot drift from the canonical paths/strings (e.g. doc renames).
  for (const [rel, value] of Object.entries(payload.required_strings)) {
    const text = Array.isArray(value) ? value.join("\n") : Object.values(value).join("\n");
    writeFixture(root, rel, text);
  }
  const scripts = {};
  for (const name of payload.required_package_scripts ?? []) scripts[name] = "node x";
  writeFixture(root, "package.json", JSON.stringify({ scripts }));
  return root;
}

test("svgMetrics detects required accessibility fields", () => {
  const metrics = svgMetrics(svg(payload.svg_assets[0]));
  assert.equal(metrics.hasTitle, true);
  assert.equal(metrics.hasDesc, true);
  assert.equal(metrics.hasMetadata, true);
  assert.equal(metrics.hasRoleImg, true);
  assert.equal(metrics.hasAriaLabelledby, true);
});

test("evaluateVisualAssetsContract passes a complete fixture with mocked recognition", () => {
  const root = fixtureRepo();
  try {
    const summary = summarize(evaluateVisualAssetsContract(payload, root).results);
    assert.equal(summary.fail, 0);
    assert.ok(summary.mocked > 0);
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateVisualAssetsContract catches malformed SVG accessibility", () => {
  const root = fixtureRepo();
  try {
    writeFileSync(join(root, payload.svg_assets[0].path), "<svg></svg>");
    const failures = evaluateVisualAssetsContract(payload, root).results.filter((item) => item.status === "fail");
    assert.ok(failures.some((item) => item.rule_id === "svg-accessibility"));
    assert.ok(failures.some((item) => item.rule_id === "svg-viewbox"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateVisualAssetsContract catches PDF and radar template defects", () => {
  const root = fixtureRepo();
  try {
    writeFileSync(join(root, payload.pdf_assets[0]), "not a pdf");
    writeFileSync(join(root, payload.radar_template.path), JSON.stringify({ axes: [{ id: "A.1" }] }));
    const failures = evaluateVisualAssetsContract(payload, root).results.filter((item) => item.status === "fail");
    assert.ok(failures.some((item) => item.rule_id === "pdf-header"));
    assert.ok(failures.some((item) => item.rule_id === "radar-axis-count"));
    assert.ok(failures.some((item) => item.rule_id === "radar-axis-shape"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateVisualAssetsContract catches bad recognition mock shapes", () => {
  const root = fixtureRepo();
  const badPayload = structuredClone(payload);
  badPayload.recognition_mock_contract.mock_requests[0].viewport = "800x600";
  badPayload.recognition_mock_contract.mock_requests[1].result = "fail";
  try {
    const failures = evaluateVisualAssetsContract(badPayload, root).results.filter((item) => item.status === "fail");
    assert.ok(failures.some((item) => item.rule_id === "mock-request-viewport"));
    assert.ok(failures.some((item) => item.rule_id === "mock-request-result"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateVisualAssetsContract catches missing files and bad mock responses", () => {
  const root = fixtureRepo();
  const badPayload = structuredClone(payload);
  delete badPayload.recognition_mock_contract.mock_requests[0].asset;
  delete badPayload.recognition_mock_contract.mock_response.checked_at;
  badPayload.recognition_mock_contract.mock_response.accepted = false;
  try {
    rmSync(join(root, payload.svg_assets[0].path), { force: true });
    const failures = evaluateVisualAssetsContract(badPayload, root).results.filter((item) => item.status === "fail");
    assert.ok(failures.some((item) => item.rule_id === "svg-exists"));
    assert.ok(failures.some((item) => item.rule_id === "mock-request-shape"));
    assert.ok(failures.some((item) => item.rule_id === "mock-response-shape"));
    assert.ok(failures.some((item) => item.rule_id === "mock-response-accepted"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateVisualAssetsContract catches missing package docs/framework/scripts", () => {
  const root = fixtureRepo();
  try {
    writeFileSync(join(root, "package.json"), JSON.stringify({ scripts: {} }));
    const failures = evaluateVisualAssetsContract(payload, root).results.filter((item) => item.status === "fail");
    assert.ok(failures.some((item) => item.rule_id === "package-script"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("writeVisualAssetsEvidence writes structured output", () => {
  const root = fixtureRepo();
  const out = mkdtempSync(join(tmpdir(), "dsaf-visuals-out-"));
  try {
    const output = join(out, "audit.json");
    const audit = writeVisualAssetsEvidence(payload, evaluateVisualAssetsContract(payload, root), output);
    const written = JSON.parse(readFileSync(output, "utf8"));
    assert.equal(audit.task_id, "TASK-BRAND-003");
    assert.equal(written.summary.fail, 0);
  }
  finally {
    rmSync(root, { recursive: true, force: true });
    rmSync(out, { recursive: true, force: true });
  }
});

test("helpers count and summarize", () => {
  assert.equal(countMatches("Gate gate", "gate"), 2);
  assert.deepEqual(summarize([makeResult(false, "x", "file", 1, 2)]), { pass: 0, mocked: 0, fail: 1, ok: false });
});
