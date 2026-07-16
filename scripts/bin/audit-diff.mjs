#!/usr/bin/env node
// @ts-check
/**
 * audit-diff.mjs — no-silent-regression gate over two scores.json files
 * ─────────────────────────────────────────────────────────────────────
 *
 * Implements the enforcement half of the TASK-CORE-002 no-silent-regression
 * policy (docs/framework/05-regression-policy.md) at engine level:
 *
 *   - compares a baseline scores.json against a current scores.json
 *   - prints improvements, regressions, and the roll-up delta
 *   - renders the regression table in the policy's override-log shape
 *     (Cause `UNRESOLVED` until a human signs an override)
 *   - exits 1 when any per-criterion regression exists, unless
 *     --allow-regressions is passed (the explicit, visible override)
 *
 * Comparisons are only meaningful within one engine major version; when the
 * engine major differs the tool reports "baseline re-score required" and exits
 * 0 without judging regressions (a rubric/engine change is not a target change).
 *
 * Usage:
 *   node scripts/bin/audit-diff.mjs --baseline <old-scores.json> --current <new-scores.json> [--allow-regressions] [--out <report.md>]
 */

import { readFileSync, writeFileSync } from "node:fs";
import { parseArgs } from "node:util";

/** @param {string} path @returns {any} */
function loadScores(path) {
  const parsed = JSON.parse(readFileSync(path, "utf8"));
  if (parsed.schema !== "dsaf-scores/1" || !Array.isArray(parsed.criteria)) {
    throw new Error(`${path} is not a dsaf-scores/1 file`);
  }
  return parsed;
}

/** @param {string} version @returns {number} */
function majorOf(version) {
  return Number(String(version ?? "0").split(".")[0]) || 0;
}

function main() {
  const { values } = parseArgs({
    options: {
      baseline: { type: "string" },
      current: { type: "string" },
      out: { type: "string" },
      "allow-regressions": { type: "boolean", default: false },
      help: { type: "boolean", short: "h" }
    }
  });
  if (values.help || !values.baseline || !values.current) {
    console.log("Usage: node scripts/bin/audit-diff.mjs --baseline <scores.json> --current <scores.json> [--allow-regressions] [--out <report.md>]");
    process.exit(values.help ? 0 : 2);
  }

  const baseline = loadScores(String(values.baseline));
  const current = loadScores(String(values.current));

  const lines = [];
  lines.push("# DSAF audit diff");
  lines.push("");
  lines.push(`| Field | Baseline | Current |`);
  lines.push(`|---|---|---|`);
  lines.push(`| Generated | ${baseline.generated} | ${current.generated} |`);
  lines.push(`| Engine | ${baseline.engine_version} | ${current.engine_version} |`);
  lines.push(`| Rubric | ${baseline.rubric_version} | ${current.rubric_version} |`);
  lines.push(`| Weighted combined | ${baseline.weighted?.combined} (${baseline.weighted?.tier}) | ${current.weighted?.combined} (${current.weighted?.tier}) |`);
  lines.push(`| Enterprise floors | ${baseline.enterprise_grade?.pass ? "PASS" : "NOT YET"} | ${current.enterprise_grade?.pass ? "PASS" : "NOT YET"} |`);
  lines.push("");

  if (majorOf(baseline.engine_version) !== majorOf(current.engine_version)) {
    lines.push(`> Engine major versions differ (${baseline.engine_version} vs ${current.engine_version}).`);
    lines.push("> Scores are not comparable across engine majors — re-score the baseline with the current engine before gating regressions.");
    const report = lines.join("\n") + "\n";
    if (values.out) writeFileSync(String(values.out), report, "utf8");
    console.log(report);
    console.log("[audit-diff] engine major changed: baseline re-score required (exit 0, no regression judgement).");
    process.exit(0);
  }

  /** @type {Map<string, any>} */
  const baseById = new Map(baseline.criteria.map((/** @type {any} */ row) => [row.id, row]));
  const regressions = [];
  const improvements = [];
  const added = [];
  for (const row of current.criteria) {
    const before = baseById.get(row.id);
    if (!before) { added.push(row); continue; }
    const delta = (row.score ?? 0) - (before.score ?? 0);
    if (delta < 0) regressions.push({ id: row.id, tag: row.tag, pre: before.score ?? 0, post: row.score ?? 0, delta });
    else if (delta > 0) improvements.push({ id: row.id, pre: before.score ?? 0, post: row.score ?? 0, delta });
  }
  const removed = baseline.criteria.filter((/** @type {any} */ row) => !current.criteria.some((/** @type {any} */ cur) => cur.id === row.id));

  lines.push(`## Summary`);
  lines.push("");
  lines.push(`- Improvements: ${improvements.length}`);
  lines.push(`- Regressions: ${regressions.length}`);
  lines.push(`- Criteria added: ${added.length}; removed: ${removed.length}`);
  lines.push("");

  if (improvements.length) {
    lines.push(`## Improvements`);
    lines.push("");
    lines.push(`| Criterion | Pre | Post | Delta |`);
    lines.push(`|---|---:|---:|---:|`);
    for (const row of improvements) lines.push(`| ${row.id} | ${row.pre} | ${row.post} | +${row.delta} |`);
    lines.push("");
  }

  if (regressions.length) {
    lines.push(`## Regressions (TASK-CORE-002 override log — human signature required)`);
    lines.push("");
    lines.push(`| Criterion | Pre | Post | Delta | Cause | Approver | Date | Tag | Notes |`);
    lines.push(`|---|---:|---:|---:|---|---|---|---|---|`);
    for (const row of regressions) {
      lines.push(`| ${row.id} | ${row.pre} | ${row.post} | ${Math.abs(row.delta)} | unresolved | null | ${new Date().toISOString().slice(0, 10)} | UNRESOLVED | ${row.tag === "DYNAMIC" ? "DYNAMIC row: rubric-tightened is a valid no-approver cause if the standard moved" : "FIXED row: requires explicit override or rollback"} |`);
    }
    lines.push("");
  }

  const report = lines.join("\n") + "\n";
  if (values.out) writeFileSync(String(values.out), report, "utf8");
  console.log(report);

  if (regressions.length && !values["allow-regressions"]) {
    console.error(`[audit-diff] ${regressions.length} unapproved regression(s). Sign an override (rerun with --allow-regressions after recording the TASK-CORE-002 row) or fix the target.`);
    process.exit(1);
  }
  console.log(`[audit-diff] ${regressions.length ? "regressions explicitly allowed by flag (record the override rows!)" : "no regressions"}; ${improvements.length} improvement(s).`);
}

main();
