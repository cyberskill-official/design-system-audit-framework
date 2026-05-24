import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { runCli } from "../src/cli.js";
import { analyzeReferences, validateTokens } from "../src/index.js";

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

test("resolves DTCG alias references for inherited token types", () => {
  const result = validateTokens({
    color: {
      brand: { $type: "color", $value: "oklch(60% 0.1 220)", $description: "Base brand color" },
      action: { $value: "{color.brand}", $description: "Action color alias" }
    }
  });

  assert.equal(result.reference_count, 1);
  assert.deepEqual(result.reference_issues, []);
  assert.equal(result.checks["A1.8"].score, 5);
});

test("reports unresolved and circular DTCG references", () => {
  const unresolved = analyzeReferences([
    { path: "color.action", type: "color", value: "{color.missing}" }
  ]);
  assert.deepEqual(unresolved.references, [
    { path: "color.action", target: "color.missing" }
  ]);
  assert.deepEqual(unresolved.issues, [
    { type: "unresolved_reference", path: "color.action", target: "color.missing" }
  ]);

  const circular = validateTokens({
    color: {
      a: { $type: "color", $value: "{color.b}", $description: "A" },
      b: { $type: "color", $value: "{color.a}", $description: "B" }
    }
  });
  assert.equal(circular.reference_count, 2);
  assert.ok(circular.reference_issues.some((issue) => issue.type === "circular_reference"));
  assert.ok(circular.checks["A1.8"].score < 5);
});

test("validates references nested inside composite token values", () => {
  const result = validateTokens({
    color: {
      shadow: { $type: "color", $value: "oklch(20% 0.01 250)", $description: "Shadow color" }
    },
    elevation: {
      card: {
        $type: "shadow",
        $value: {
          color: "{color.shadow}",
          offsetX: "{spacing.1}",
          offsetY: "2px",
          blur: "8px"
        },
        $description: "Card shadow"
      }
    }
  });

  assert.equal(result.reference_count, 2);
  assert.ok(result.reference_issues.some((issue) => issue.path === "elevation.card" && issue.target === "spacing.1"));
  assert.ok(result.checks["A1.8"].score < 5);
});

test("supports JSON Pointer refs for aliases and composite properties", () => {
  const result = validateTokens({
    color: {
      brand: { $type: "color", $value: "oklch(60% 0.1 220)", $description: "Brand" },
      action: { $ref: "#/color/brand", $description: "Action alias" }
    },
    spacing: {
      base: { $type: "dimension", $value: { value: 16, unit: "px" }, $description: "Base spacing" },
      inset: {
        $type: "dimension",
        $value: { value: 32, unit: { $ref: "#/spacing/base/$value/unit" } },
        $description: "Inset spacing"
      }
    }
  });

  assert.equal(result.reference_count, 2);
  assert.deepEqual(result.reference_issues, []);
  assert.equal(result.checks["A1.8"].score, 5);
});

test("reports unsupported external refs as unresolved", () => {
  const result = validateTokens({
    color: {
      external: { $type: "color", $ref: "other.tokens.json#/color/brand", $description: "External alias" }
    }
  });

  assert.deepEqual(result.reference_issues, [
    { type: "unresolved_reference", path: "color.external", target: "other.tokens.json#/color/brand" }
  ]);
  assert.equal(result.checks["A1.8"].score, 0);
});

test("runCli reports malformed JSON without throwing", () => {
  const root = mkdtempSync(join(tmpdir(), "dsaf-tokens-"));
  const input = join(root, "bad.tokens.json");
  const errors = [];
  const originalError = console.error;
  writeFileSync(input, "{bad-json");
  console.error = (message) => errors.push(message);

  try {
    assert.equal(runCli([input]), 1);
  } finally {
    console.error = originalError;
  }

  assert.match(errors.join("\n"), /Could not parse JSON/);
});
