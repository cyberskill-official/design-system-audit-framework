#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, '../..');
const OUTPUT_ROOT = resolve(ROOT, "outputs/generated/maximal-cases");
const required = ["ANALYZED_DESIGN_REPORT.md", "IMPROVED_DESIGN.md"];

if (!existsSync(OUTPUT_ROOT)) {
  console.error(`[maximal-cases:check] missing ${OUTPUT_ROOT}`);
  process.exit(1);
}

const dirs = readdirSync(OUTPUT_ROOT, { withFileTypes: true }).filter((entry) => entry.isDirectory());
const failures = [];
const fileCases = dirs.filter((dir) => dir.name.startsWith("file-"));
const urlCases = dirs.filter((dir) => dir.name.startsWith("url-"));

for (const dir of dirs) {
  for (const file of required) {
    const path = resolve(OUTPUT_ROOT, dir.name, file);
    if (!existsSync(path)) {
      failures.push(`${dir.name}/${file} missing`);
      continue;
    }
    const text = readFileSync(path, "utf8");
    if (file === "ANALYZED_DESIGN_REPORT.md" && !text.includes("## Unified Score Summary")) {
      failures.push(`${dir.name}/${file} missing Unified Score Summary`);
    }
    if (file === "ANALYZED_DESIGN_REPORT.md" && !text.includes("## Full Enterprise DSAF Criterion Scores And Suggestions")) {
      failures.push(`${dir.name}/${file} missing full enterprise DSAF criterion section`);
    }
    if (file === "ANALYZED_DESIGN_REPORT.md" && !text.includes("| ID | Type | Category | Criterion | Score | Level | Confidence | Evidence found | Missing signals | Citation refs | Required proof | Suggested improvement | Acceptance gate | Output action |")) {
      failures.push(`${dir.name}/${file} missing expanded criterion table columns`);
    }
    if (file === "ANALYZED_DESIGN_REPORT.md" && (!text.includes("| AUTO |") || !text.includes("| MANUAL |"))) {
      failures.push(`${dir.name}/${file} missing AUTO/MANUAL criterion rows`);
    }
    if (file === "ANALYZED_DESIGN_REPORT.md" && !text.includes("## Source Reference Appendix")) {
      failures.push(`${dir.name}/${file} missing source reference appendix`);
    }
    if (file === "ANALYZED_DESIGN_REPORT.md" && text.includes("## Maximal Scores")) {
      failures.push(`${dir.name}/${file} still contains old track score section`);
    }
    if (file === "ANALYZED_DESIGN_REPORT.md" && text.includes("## Further Recommendations To Monetize")) {
      failures.push(`${dir.name}/${file} should not contain monetization recommendations`);
    }
    if (file === "IMPROVED_DESIGN.md" && !text.includes("## Applied Automatable Requirements")) {
      failures.push(`${dir.name}/${file} missing doctrine requirements`);
    }
    if (file === "IMPROVED_DESIGN.md" && !text.includes("## Unified Criterion Operating Rule")) {
      failures.push(`${dir.name}/${file} missing unified criterion operating rule`);
    }
    if (file === "IMPROVED_DESIGN.md" && text.includes("## Further Recommendations To Monetize")) {
      failures.push(`${dir.name}/${file} should not contain report-only monetization section`);
    }
    if (file === "IMPROVED_DESIGN.md" && text.includes("## Three-Track Operating Rule")) {
      failures.push(`${dir.name}/${file} still contains old three-track operating rule`);
    }
    if (file === "IMPROVED_DESIGN.md" && text.includes("### Source Excerpt")) {
      failures.push(`${dir.name}/${file} still uses excerpt mode`);
    }
    if (file === "IMPROVED_DESIGN.md" && dir.name.startsWith("file-")) {
      const sourcePath = /^\- \*\*Source:\*\* (.+)$/m.exec(text)?.[1]?.trim();
      const sourceLines = sourcePath && existsSync(sourcePath)
        ? readFileSync(sourcePath, "utf8").split(/\r?\n/).length
        : 0;
      const improvedLines = text.split(/\r?\n/).length;
      if (!sourceLines || improvedLines <= sourceLines) {
        failures.push(`${dir.name}/${file} does not preserve full source plus improvement layer`);
      }
    }
  }
}

if (dirs.length !== 10) failures.push(`expected 10 case directories, found ${dirs.length}`);
if (fileCases.length !== 10) failures.push(`expected 10 file cases, found ${fileCases.length}`);
if (urlCases.length !== 0) failures.push(`expected 0 URL cases, found ${urlCases.length}`);
if (dirs.length * required.length !== 20) failures.push(`expected 20 output files, found ${dirs.length * required.length}`);

if (failures.length) {
  console.error("[maximal-cases:check] failures:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(`[maximal-cases:check] ${dirs.length} cases and ${dirs.length * required.length} outputs verified`);
