import test from "node:test";
import assert from "node:assert/strict";
import { renderPanelHtml, runDsafChecks } from "../src/index.js";
import { normalizeRunnerResult } from "../src/runners/index.js";

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
  assert.match(html, /rel="noopener noreferrer"/);
  assert.match(html, /cap note/);
});

test("renderPanelHtml escapes criterion text and rejects unsafe links", () => {
  const html = renderPanelHtml({
    criteria: [{
      id: "A7.1<script>",
      name: "<img src=x>",
      score: "4",
      href: "javascript:alert(1)",
      rationale: "coverage <strong>"
    }],
    footer: "cap <note>"
  });

  assert.match(html, /A7\.1&lt;script&gt;/);
  assert.match(html, /&lt;img src=x&gt;/);
  assert.match(html, /href="#"/);
  assert.doesNotMatch(html, /javascript:alert/);
  assert.match(html, /cap &lt;note&gt;/);
});

test("normalizeRunnerResult preserves spawn and parse failures", () => {
  const spawnFailure = normalizeRunnerResult({
    status: null,
    signal: null,
    stdout: "",
    stderr: "",
    error: new Error("spawn failed")
  });
  assert.equal(spawnFailure.ok, false);
  assert.equal(spawnFailure.error, "DSAF Storybook runner could not complete");
  assert.match(spawnFailure.detail, /spawn failed/);

  const parseFailure = normalizeRunnerResult({
    status: 0,
    signal: null,
    stdout: "not json",
    stderr: ""
  });
  assert.equal(parseFailure.ok, false);
  assert.equal(parseFailure.error, "DSAF Storybook runner returned invalid JSON");
});
