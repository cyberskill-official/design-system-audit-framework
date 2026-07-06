#!/usr/bin/env node
/**
 * Validates the generated maximal-audit verification cases.
 *
 * The set of expected cases is driven by the canonical manifest
 * (scripts/test/fixtures/design-md-manifest.json) — the SAME manifest the generator
 * (scripts/bin/build-verification-cases.mjs) consumes. This keeps the generator and the
 * checker in lockstep: there is no longer a hardcoded case count that can drift from the
 * tool that produces the outputs. The output directory must contain EXACTLY the manifest
 * cases (no stale/extra directories from an exploratory run).
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "../..");
const MANIFEST_PATH = resolve(ROOT, "scripts/test/fixtures/design-md-manifest.json");
const manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
const OUTPUT_ROOT = resolve(ROOT, manifest.outputRoot);
const required = ["ANALYZED_DESIGN_REPORT.md", "IMPROVED_DESIGN.md"];
const expectedIds = manifest.cases.map((c) => c.id).sort();

/** @param {string} path @returns {number} */
function safeLineCount(path) {
  try {
    return readFileSync(path, "utf8").split(/\r?\n/).length;
  } catch {
    return 0; // e.g. source path is a directory or unreadable
  }
}

if (!existsSync(OUTPUT_ROOT)) {
  console.error(`[maximal-cases:check] missing ${OUTPUT_ROOT} — run \`npm run gen:verification-cases\` first`);
  process.exit(1);
}

const failures = [];

// The engine writes ANALYZED_DESIGN_REPORT.md at the case root and IMPROVED_DESIGN.md
// inside the output-improved/ subdirectory.
const relPathFor = (/** @type {string} */ file) =>
  file === "IMPROVED_DESIGN.md" ? `output-improved/${file}` : file;

for (const c of manifest.cases) {
  for (const file of required) {
    const path = resolve(OUTPUT_ROOT, c.id, relPathFor(file));
    if (!existsSync(path)) {
      failures.push(`${c.id}/${file} missing`);
      continue;
    }
    const text = readFileSync(path, "utf8");
    if (file === "ANALYZED_DESIGN_REPORT.md") {
      if (!text.includes("## Unified Score Summary")) failures.push(`${c.id}/${file} missing Unified Score Summary`);
      if (!text.includes("## Category Roll-up & Enterprise Floors")) failures.push(`${c.id}/${file} missing category roll-up / enterprise floors section`);
      if (!text.includes("Enterprise-grade verdict")) failures.push(`${c.id}/${file} missing enterprise-grade verdict`);
      if (!text.includes("## Full Enterprise DSAF Criterion Scores And Suggestions")) failures.push(`${c.id}/${file} missing full enterprise DSAF criterion section`);
      if (!text.includes("| ID | Type | Category | Criterion | Score | Level | Confidence | Evidence found | Missing signals | Citation refs | Required proof | Suggested improvement | Acceptance gate | Output action |")) failures.push(`${c.id}/${file} missing expanded criterion table columns`);
      if (!text.includes("| AUTO |") || !text.includes("| MANUAL |")) failures.push(`${c.id}/${file} missing AUTO/MANUAL criterion rows`);
      if (!text.includes("## Source Reference Appendix")) failures.push(`${c.id}/${file} missing source reference appendix`);
      if (text.includes("## Maximal Scores")) failures.push(`${c.id}/${file} still contains old track score section`);
      if (text.includes("## Further Recommendations To Monetize")) failures.push(`${c.id}/${file} should not contain monetization recommendations`);
    }
    if (file === "IMPROVED_DESIGN.md") {
      if (!text.includes("## Applied Automatable Requirements")) failures.push(`${c.id}/${file} missing doctrine requirements`);
      if (!text.includes("## Unified Criterion Operating Rule")) failures.push(`${c.id}/${file} missing unified criterion operating rule`);
      if (text.includes("## Further Recommendations To Monetize")) failures.push(`${c.id}/${file} should not contain report-only monetization section`);
      if (text.includes("## Three-Track Operating Rule")) failures.push(`${c.id}/${file} still contains old three-track operating rule`);
      if (text.includes("### Source Excerpt")) failures.push(`${c.id}/${file} still uses excerpt mode`);
      // File cases must preserve the full source plus an improvement layer.
      const sourcePath = /^\- \*\*Source:\*\* (.+)$/m.exec(text)?.[1]?.trim();
      const sourceLines = sourcePath && existsSync(sourcePath) ? safeLineCount(sourcePath) : 0;
      const improvedLines = text.split(/\r?\n/).length;
      if (!sourceLines || improvedLines <= sourceLines) {
        failures.push(`${c.id}/${file} does not preserve full source plus improvement layer`);
      }
    }
  }
}

// Every case must also emit a machine-readable scores.json (dsaf-scores/1) —
// the substrate for audit-diff regression gating and evolution mining.
for (const c of manifest.cases) {
  const scoresPath = resolve(OUTPUT_ROOT, c.id, "scores.json");
  if (!existsSync(scoresPath)) {
    failures.push(`${c.id}/scores.json missing`);
    continue;
  }
  try {
    const scores = JSON.parse(readFileSync(scoresPath, "utf8"));
    if (scores.schema !== "dsaf-scores/1") failures.push(`${c.id}/scores.json wrong schema: ${scores.schema}`);
    if (!Array.isArray(scores.criteria) || scores.criteria.length !== 125) failures.push(`${c.id}/scores.json expected 125 criteria, got ${scores.criteria?.length}`);
    if (typeof scores.unified_average !== "number" || scores.unified_average < 0 || scores.unified_average > 100) failures.push(`${c.id}/scores.json unified_average out of range`);
    if (!scores.engine_version) failures.push(`${c.id}/scores.json missing engine_version`);
  } catch (err) {
    failures.push(`${c.id}/scores.json unparseable: ${err instanceof Error ? err.message : String(err)}`);
  }
}

// The output directory must contain EXACTLY the manifest cases — no stale/extra dirs.
const actualDirs = readdirSync(OUTPUT_ROOT, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  .sort();
const extra = actualDirs.filter((d) => !expectedIds.includes(d));
const absent = expectedIds.filter((d) => !actualDirs.includes(d));
if (extra.length) failures.push(`unexpected case directories present: ${extra.join(", ")} (run gen:verification-cases to regenerate cleanly)`);
if (absent.length) failures.push(`expected case directories missing: ${absent.join(", ")}`);

if (failures.length) {
  console.error("[maximal-cases:check] failures:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(`[maximal-cases:check] ${manifest.cases.length} cases and ${manifest.cases.length * required.length} outputs verified`);
