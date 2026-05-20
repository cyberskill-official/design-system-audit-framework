import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { validateTokens } from "../src/index.js";

const read = (name) => JSON.parse(readFileSync(new URL(`./fixtures/${name}`, import.meta.url), "utf8"));

test("scores a DTCG-conformant fixture across all nine A1 criteria", () => {
  const result = validateTokens(read("dtcg-conformant.tokens.json"));
  assert.equal(Object.keys(result.checks).length, 9);
  assert.equal(Object.keys(result.audit_targets).length, 9);
  assert.equal(result.checks["A1.1"].score, 5);
  assert.equal(result.checks["A1.8"].score, 5);
  assert.ok(result.score_pct > 75);
});

test("scores a hex-only anti-pattern low", () => {
  const result = validateTokens(read("hex-only.tokens.json"));
  assert.equal(result.checks["A1.1"].score, 3);
  assert.equal(result.checks["A1.9"].score, 0);
  assert.ok(result.score_pct < 45);
});
