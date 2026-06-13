#!/usr/bin/env node
/**
 * Regression guard for the maximal-audit engine.
 *
 * Locks in two improvements so they cannot silently regress:
 *   1. Broken-symlink robustness — walkLocalFiles / loadInput must not crash when a
 *      scanned directory contains a dangling symlink (real-world failure first hit on the
 *      CyberSkill design-system, whose AGENTS.md points at an absent target).
 *   2. Scoring discrimination — keywordsForCriterion must drop near-universal design words
 *      ("design", "tokens", "system", ...) so a document does not score highly merely by
 *      being "about design". The category header must not inflate every criterion.
 */
import { mkdtempSync, mkdirSync, writeFileSync, symlinkSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { keywordsForCriterion, runMaximalAudit } from "../bin/maximal-audit.mjs";

const failures = [];
/** @param {boolean} cond @param {string} msg */
function assert(cond, msg) {
  if (!cond) failures.push(msg);
}

// ---------------------------------------------------------------------------
// 1. Broken-symlink robustness
// ---------------------------------------------------------------------------
const work = mkdtempSync(join(tmpdir(), "dsaf-robustness-"));
try {
  const src = join(work, "ds");
  mkdirSync(src, { recursive: true });
  writeFileSync(
    join(src, "DESIGN.md"),
    "# Sample\n\nColor tokens, typography scale, spacing scale, motion tokens, elevation, accessibility, governance.\n"
  );
  // Dangling symlink: target does not exist. statSync(follow) throws on this.
  symlinkSync(join(work, "does-not-exist-target"), join(src, "BROKEN.md"));

  const outDir = join(work, "out");
  let result;
  let threw = null;
  try {
    result = await runMaximalAudit({ input: join(src, "DESIGN.md"), outDir, mode: "both", model: "robustness-test", maxPages: 1 });
  } catch (err) {
    threw = err;
  }
  assert(!threw, `audit crashed on a directory containing a broken symlink: ${threw?.message ?? ""}`);
  assert(result != null && result.criteriaCount === 125, `expected 125 criteria scored, got ${result?.criteriaCount}`);
} finally {
  try { rmSync(work, { recursive: true, force: true }); } catch { /* mount may block unlink */ }
}

// ---------------------------------------------------------------------------
// 2. Scoring discrimination (stopwords)
// ---------------------------------------------------------------------------
// The near-universal umbrella words must be stripped from the category header so they
// cannot give every criterion free matches. (Genuine category nouns such as "foundations",
// "accessibility", or "governance" are legitimate signal and are intentionally kept.)
const boilerplate = keywordsForCriterion("Design Tokens (Weight: 14%) design system tokens component support style class");
for (const banned of ["design", "system", "tokens", "token", "component", "components", "support", "weight", "style", "class"]) {
  assert(!boilerplate.includes(banned), `umbrella word "${banned}" should be stopworded out of keywords, got [${boilerplate.join(", ")}]`);
}

// A real criterion must still surface its discriminating terms.
const real = keywordsForCriterion("Color tokens with primitive→semantic→component layers");
assert(real.includes("primitive"), `expected "primitive" keyword, got [${real.join(", ")}]`);
assert(real.includes("semantic"), `expected "semantic" keyword, got [${real.join(", ")}]`);
assert(real.includes("layers"), `expected "layers" keyword, got [${real.join(", ")}]`);
assert(!real.includes("tokens"), `"tokens" should be stopworded out, got [${real.join(", ")}]`);
assert(!real.includes("component"), `"component" should be stopworded out, got [${real.join(", ")}]`);

if (failures.length) {
  console.error("[engine-robustness:check] failures:");
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log("[engine-robustness:check] broken-symlink robustness + scoring discrimination verified");
