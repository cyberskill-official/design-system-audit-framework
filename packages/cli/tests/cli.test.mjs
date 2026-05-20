import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { formatSummary, scanRepository } from "../src/index.js";
import { runCli } from "../src/cli.js";

function fixture() {
  const root = mkdtempSync(join(tmpdir(), "dsaf-cli-"));
  mkdirSync(join(root, "docs"), { recursive: true });
  mkdirSync(join(root, ".github", "workflows"), { recursive: true });
  writeFileSync(join(root, "README.md"), "Design tokens, Storybook, accessibility WCAG AA, HEART metrics, research interviews, content design, visual hierarchy.");
  writeFileSync(join(root, "tokens.json"), JSON.stringify({ color: { brand: { $type: "color", $value: "oklch(60% 0.1 220)", $description: "brand" } } }));
  writeFileSync(join(root, "docs", "governance.md"), "RFC process, semver, no dark pattern privacy consent, Core Web Vitals LCP, bundle size budget.");
  writeFileSync(join(root, ".github", "workflows", "ci.yml"), "name: CI");
  return root;
}

test("scanRepository returns a 25-row DSAF Core summary", () => {
  const result = scanRepository(fixture());
  assert.equal(result.core_count, 25);
  assert.equal(result.criteria.length, 25);
  assert.ok(result.elapsed_ms < 60000);
  assert.ok(result.score_pct > 0);
});

test("formatSummary includes the public self-audit cap", () => {
  const result = scanRepository(fixture());
  const summary = formatSummary(result);
  assert.match(summary, /DSAF-25 Core scan/);
  assert.match(summary, /public self-audit cap/);
});

test("runCli handles missing paths", () => {
  assert.equal(runCli(["scan", "/definitely/not/here"]), 2);
});
