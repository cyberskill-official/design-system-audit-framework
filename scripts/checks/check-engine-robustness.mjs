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
import { existsSync, mkdtempSync, mkdirSync, readFileSync, writeFileSync, symlinkSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { keywordsForCriterion, runMaximalAudit, level, loadDsaf25Ids } from "../bin/maximal-audit.mjs";

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

  // ── Three-band honesty guard ─────────────────────────────────────────────
  // A lone doctrine document is prose-only evidence: no artifact tree, no CI,
  // no tests. The unified average must therefore stay at or below the
  // "Defined" band (40/100). If this fails, keyword-stuffing can once again
  // fake maturity — the exact Goodhart failure the band model exists to stop.
  assert(result != null && result.unifiedAverage <= 40,
    `prose-only input must cap at the Defined band (<=40), got ${result?.unifiedAverage}`);

  // scores.json is the machine-readable substrate for audit-diff + evolution-mine.
  const scoresPath = join(outDir, "scores.json");
  assert(existsSync(scoresPath), "scores.json missing from audit output");
  if (existsSync(scoresPath)) {
    const scores = JSON.parse(readFileSync(scoresPath, "utf8"));
    assert(scores.schema === "dsaf-scores/1", `unexpected scores schema: ${scores.schema}`);
    assert(Array.isArray(scores.criteria) && scores.criteria.length === 125, `scores.json expected 125 criteria, got ${scores.criteria?.length}`);
    const sample = scores.criteria[0];
    assert(sample && typeof sample.bands?.mentions === "number", "scores.json criteria rows must carry band breakdowns");
    assert(scores.enterprise_grade && Array.isArray(scores.enterprise_grade.floors) && scores.enterprise_grade.floors.length === 7,
      "scores.json must carry the 7 enterprise floors");
  }

  // DSAF-25 profile must select exactly the 25 core rows.
  const ids25 = loadDsaf25Ids();
  assert(ids25.size === 25, `dsaf-25.md should yield 25 core ids, got ${ids25.size}`);
  const out25 = join(work, "out25");
  const result25 = await runMaximalAudit({ input: join(src, "DESIGN.md"), outDir: out25, mode: "analyze", model: "robustness-test", maxPages: 1, profile: "dsaf-25" });
  assert(result25.criteriaCount === 25, `dsaf-25 profile expected 25 criteria, got ${result25.criteriaCount}`);
} finally {
  try { rmSync(work, { recursive: true, force: true }); } catch { /* mount may block unlink */ }
}

// ---------------------------------------------------------------------------
// 1b. Tier ladder — MUST match docs/framework/04-maturity-tiers.md §1.
// The engine shipped with a divergent mapping once (>=90 L5); lock the docs ladder.
// ---------------------------------------------------------------------------
for (const [score, expected] of [[0, "L0"], [39, "L0"], [40, "L1"], [54, "L1"], [55, "L2"], [64, "L2"], [65, "L3"], [74, "L3"], [75, "L4"], [84, "L4"], [85, "L5"], [100, "L5"]]) {
  assert(level(Number(score)) === expected, `level(${score}) should be ${expected}, got ${level(Number(score))}`);
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
