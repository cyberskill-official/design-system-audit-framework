#!/usr/bin/env node
/**
 * audit-init.mjs — Scaffold an audit folder in any design system repo
 * ────────────────────────────────────────────────────────────────────
 *
 * Creates the standard `_audit/` folder structure inside a target design
 * system, copies the audit-report and improvement-plan templates, and
 * initialises the audit history register. Idempotent — re-runnable
 * without overwriting existing audits.
 *
 * Usage:
 *   node audit-init.mjs <target-design-system-path>
 *   node audit-init.mjs ../my-design-system
 *
 * Zero dependencies — uses only Node 20+ built-ins.
 */

import { mkdirSync, copyFileSync, writeFileSync, existsSync, readFileSync, openSync, closeSync } from "node:fs";
import { join, dirname, resolve, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FRAMEWORK_ROOT = resolve(__dirname, "..");
const TEMPLATES = join(FRAMEWORK_ROOT, "templates");

const target = process.argv[2];
if (!target) {
  console.error("Usage: node audit-init.mjs <target-design-system-path>");
  process.exit(1);
}

const targetRoot = resolve(target);
if (!existsSync(targetRoot)) {
  console.error(`Target path does not exist: ${targetRoot}`);
  process.exit(1);
}

const auditDir = join(targetRoot, "_audit");
const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

// ─── Create the _audit/ folder ─────────────────────────────────────────

mkdirSync(auditDir, { recursive: true });

// ─── Copy audit-report-template.md → audit-report-{today}.md (if absent) ───

const reportPath = join(auditDir, `audit-report-${today}.md`);
{
  // Use 'wx' flag to atomically refuse to overwrite — survives stat-cache races.
  const tplPath = join(TEMPLATES, "audit-report-template.md");
  let body = readFileSync(tplPath, "utf8");
  body = body
    .replace(/audit_id: YYYY-MM-DD/, `audit_id: ${today}`)
    .replace(/^# Audit YYYY-MM-DD/m, `# Audit ${today}`)
    .replace(/\*End of audit-report-YYYY-MM-DD\.\*/, `*End of audit-report-${today}.*`);
  try {
    writeFileSync(reportPath, body, { encoding: "utf8", flag: "wx" });
    console.log(`✓ Created ${reportPath}`);
  } catch (err) {
    if (err.code === "EEXIST") {
      console.log(`- Skipped (already exists): ${reportPath}`);
    } else {
      throw err;
    }
  }
}

// ─── Copy improvement-plan-template.md → improvement-plan.md (if absent) ───

const planPath = join(auditDir, "improvement-plan.md");
{
  const planSrc = readFileSync(join(TEMPLATES, "improvement-plan-template.md"), "utf8");
  try {
    writeFileSync(planPath, planSrc, { encoding: "utf8", flag: "wx" });
    console.log(`✓ Created ${planPath}`);
  } catch (err) {
    if (err.code === "EEXIST") {
      console.log(`- Skipped (already exists): ${planPath}`);
    } else {
      throw err;
    }
  }
}

// ─── Create _history.md (if absent) ────────────────────────────────────

const historyPath = join(auditDir, "_history.md");
{
  const historySrc = readFileSync(join(TEMPLATES, "audit-history-register.md"), "utf8");
  try {
    writeFileSync(historyPath, historySrc, { encoding: "utf8", flag: "wx" });
    console.log(`✓ Created ${historyPath}`);
  } catch (err) {
    if (err.code === "EEXIST") {
      console.log(`- Skipped (already exists): ${historyPath}`);
    } else {
      throw err;
    }
  }
}

// ─── Print next steps ──────────────────────────────────────────────────

console.log("");
console.log("Next steps:");
console.log("");
console.log(`  1. Open the SCAN-mode prompt:`);
console.log(`     ${join(FRAMEWORK_ROOT, "prompts/scan-mode.md")}`);
console.log("");
console.log(`  2. Paste it into Claude / Cursor / Copilot, point at:`);
console.log(`     - framework: ${FRAMEWORK_ROOT}`);
console.log(`     - design system: ${targetRoot}`);
console.log(`     - report draft: ${reportPath}`);
console.log("");
console.log(`  3. The agent will populate §1–§3 of the audit report. Stop at §4 and review.`);
console.log("");
console.log(`  4. After review, paste the FIX-mode prompt to apply approved fixes.`);
console.log("");
console.log(`  5. Sign §9 and append a row to ${historyPath}.`);
