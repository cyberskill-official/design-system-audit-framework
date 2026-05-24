import test from "node:test";
import assert from "node:assert/strict";
import { parseZeroheightExport, scoreZeroheightExport } from "../src/index.js";

const fixture = new URL("./fixtures/zeroheight-export-sample", import.meta.url).pathname;
const minimal = new URL("./fixtures/minimal.html", import.meta.url).pathname;

test("parses a zeroheight-style directory export", () => {
  const parsed = parseZeroheightExport(fixture);
  assert.equal(parsed.pages.length, 2);
  assert.equal(parsed.components.length, 1);
  assert.equal(parsed.navigation.hasSearch, true);
  assert.equal(parsed.navigation.hasSidebar, true);
  assert.equal(parsed.navigation.hasBreadcrumbs, true);
  assert.equal(parsed.widgets.hasFigmaEmbed, true);
  assert.equal(parsed.widgets.hasStorybookEmbed, true);
});

test("scores all ten A3/A5 validators for a complete export", () => {
  const result = scoreZeroheightExport(fixture);
  assert.equal(Object.keys(result.checks).length, 10);
  assert.equal(Object.keys(result.audit_targets).length, 10);
  assert.deepEqual(Object.keys(result.audit_targets), ["A3.1", "A3.2", "A3.3", "A3.4", "A3.5", "A3.6", "A3.7", "A5.1", "A5.2", "A5.4"]);
  assert.equal(result.checks["A3.1"].score, 5);
  assert.equal(result.checks["A3.7"].score, 5);
  assert.equal(result.checks["A5.4"].score, 5);
  assert.equal(result.score_pct, 100);
  assert.match(result.footer, /caps at L3/);
});

test("accepts a single HTML file and scores sparse exports conservatively", () => {
  const result = scoreZeroheightExport(minimal);
  assert.equal(result.page_count, 1);
  assert.equal(result.checks["A3.1"].score, 3);
  assert.equal(result.checks["A3.4"].score, 0);
  assert.equal(result.checks["A3.6"].score, 0);
  assert.equal(result.checks["A5.1"].score, 0);
  assert.ok(result.score_pct < 40);
});
