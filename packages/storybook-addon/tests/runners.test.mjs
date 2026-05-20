import test from "node:test";
import assert from "node:assert/strict";
import { renderPanelHtml, runDsafChecks } from "../src/index.js";

test("runDsafChecks returns the repository runner summary", () => {
  const summary = runDsafChecks();
  assert.equal(summary.ok, true);
  assert.equal(summary.checks.length, 4);
  assert.deepEqual(Object.keys(summary.criterion_map), ["coverage", "apca", "bundle_size", "doc_freshness"]);
});

test("renderPanelHtml produces a criterion table", () => {
  const html = renderPanelHtml({
    criteria: [{ id: "A7.1", name: "Coverage", score: 4, href: "https://audit.cyberskill.world/blog/deep-dives/a7-1", rationale: "coverage" }],
    footer: "cap note"
  });
  assert.match(html, /data-dsaf-panel/);
  assert.match(html, /A7\.1/);
  assert.match(html, /cap note/);
});
