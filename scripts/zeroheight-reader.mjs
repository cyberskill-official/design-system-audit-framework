#!/usr/bin/env node
/**
 * zeroheight HTML export reader.
 *
 * FR-INTEG-003: reads a zeroheight-like HTML export and scores the A.3
 * Documentation + A.5 Tooling subset from visible text.
 */

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const input = process.argv[2] ? resolve(process.argv[2]) : resolve("zeroheight-export.html");

if (!existsSync(input)) {
  console.error(`[zeroheight-reader] Missing input: ${input}`);
  console.error("Usage: node scripts/zeroheight-reader.mjs <export.html>");
  process.exit(2);
}

const html = readFileSync(input, "utf8");
const text = html
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/\s+/g, " ")
  .trim()
  .toLowerCase();

function has(...terms) {
  return terms.some((term) => text.includes(term.toLowerCase()));
}

function score(condition5, condition3) {
  if (condition5) return 5;
  if (condition3) return 3;
  return 0;
}

const checks = {
  "A3.1": {
    criterion: "Usage guidelines per component",
    score: score(has("anatomy") && has("usage") && has("decision"), has("usage")),
  },
  "A3.3": {
    criterion: "Do's / Don'ts",
    score: score(has("do", "don't", "dont") && has("accessibility"), has("do", "don't", "dont")),
  },
  "A3.4": {
    criterion: "Accessibility notes per component",
    score: score(has("aria") && has("keyboard") && has("screen reader"), has("accessibility")),
  },
  "A4.2": {
    criterion: "RFC process",
    score: score(has("rfc") && has("proposal") && has("decision"), has("rfc", "proposal")),
  },
  "A5.4": {
    criterion: "Storybook or equivalent",
    score: score(has("storybook") && has("viewport") && has("theme"), has("storybook", "examples")),
  },
};

const raw = Object.values(checks).reduce((sum, c) => sum + c.score, 0);
const max = Object.keys(checks).length * 5;

console.log(JSON.stringify({
  generated: new Date().toISOString(),
  input,
  text_chars: text.length,
  score_pct: Number(((raw / max) * 100).toFixed(1)),
  checks,
}, null, 2));
