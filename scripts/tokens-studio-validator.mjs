#!/usr/bin/env node
/**
 * Tokens Studio export validator.
 *
 * FR-INTEG-002: reads a Tokens Studio style JSON export and scores the
 * A.1 Foundations & Tokens subset used by DSAF-25.
 */

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const input = process.argv[2] ? resolve(process.argv[2]) : resolve("tokens.json");

if (!existsSync(input)) {
  console.error(`[tokens-studio-validator] Missing input: ${input}`);
  console.error("Usage: node scripts/tokens-studio-validator.mjs <tokens.json>");
  process.exit(2);
}

const source = JSON.parse(readFileSync(input, "utf8"));
const tokens = [];

function walk(node, path = []) {
  if (!node || typeof node !== "object") return;
  const hasValue = Object.prototype.hasOwnProperty.call(node, "$value") || Object.prototype.hasOwnProperty.call(node, "value");
  const hasType = Object.prototype.hasOwnProperty.call(node, "$type") || Object.prototype.hasOwnProperty.call(node, "type");
  if (hasValue) {
    tokens.push({
      path: path.join("."),
      type: hasType ? node.$type ?? node.type : null,
      value: node.$value ?? node.value,
      description: node.$description ?? node.description ?? null,
    });
    return;
  }
  for (const [key, value] of Object.entries(node)) walk(value, [...path, key]);
}

walk(source);

const byType = (type) => tokens.filter((t) => String(t.type || "").toLowerCase().includes(type));
const colorTokens = byType("color");
const dimensionTokens = tokens.filter((t) => ["dimension", "spacing", "sizing"].some((k) => String(t.type || "").toLowerCase().includes(k)));
const typographyTokens = byType("typography").concat(tokens.filter((t) => /font|lineheight|line-height|type/i.test(t.path)));
const semanticRefs = tokens.filter((t) => typeof t.value === "string" && /^\{[^}]+\}$/.test(t.value));
const descriptions = tokens.filter((t) => t.description);

function score(condition5, condition3) {
  if (condition5) return 5;
  if (condition3) return 3;
  return 0;
}

const checks = {
  "A1.1": {
    criterion: "Color tokens with primitive to semantic to component layers",
    score: score(colorTokens.length >= 12 && semanticRefs.length >= 4, colorTokens.length >= 4),
    evidence: `${colorTokens.length} color tokens; ${semanticRefs.length} alias refs`,
  },
  "A1.2": {
    criterion: "Typography scale and type tokens",
    score: score(typographyTokens.length >= 8, typographyTokens.length >= 3),
    evidence: `${typographyTokens.length} typography-related tokens`,
  },
  "A1.3": {
    criterion: "Spacing scale",
    score: score(dimensionTokens.length >= 8, dimensionTokens.length >= 4),
    evidence: `${dimensionTokens.length} dimension/spacing tokens`,
  },
  "A1.8": {
    criterion: "Token format and DTCG conformance",
    score: score(tokens.every((t) => t.type) && descriptions.length >= Math.ceil(tokens.length * 0.5), tokens.some((t) => t.type)),
    evidence: `${tokens.filter((t) => t.type).length}/${tokens.length} typed; ${descriptions.length} described`,
  },
};

const raw = Object.values(checks).reduce((sum, c) => sum + c.score, 0);
const max = Object.keys(checks).length * 5;

console.log(JSON.stringify({
  generated: new Date().toISOString(),
  input,
  token_count: tokens.length,
  score_pct: max === 0 ? 0 : Number(((raw / max) * 100).toFixed(1)),
  checks,
}, null, 2));
