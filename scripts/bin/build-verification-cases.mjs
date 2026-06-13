#!/usr/bin/env node
/**
 * Deterministic verification-fixture generator for the DSAF maximal-audit engine.
 *
 * Reads the canonical case manifest (scripts/test/fixtures/design-md-manifest.json)
 * and runs the maximal audit on each vendored DESIGN.md fixture, writing the produced
 * ANALYZED_DESIGN_REPORT.md + IMPROVED_DESIGN.md into the manifest's outputRoot.
 *
 * This makes `npm run verify` hermetic: the verification corpus is committed inside the
 * repo, so the maximal-cases check has stable inputs that do not depend on network
 * access, git clones, or machine-specific local paths. The exploratory 30-case loop
 * (scripts/bin/self-improving-loop.mjs) is a SEPARATE tool and writes elsewhere.
 */

import { existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { runMaximalAudit } from "./maximal-audit.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const MANIFEST_PATH = resolve(ROOT, "scripts/test/fixtures/design-md-manifest.json");

/** @returns {{ outputRoot: string, cases: { id: string, fixture: string }[] }} */
function loadManifest() {
  return JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
}

async function main() {
  const manifest = loadManifest();
  const outputRoot = resolve(ROOT, manifest.outputRoot);

  // Clean prior outputs so a stale/renamed case cannot linger and fail the strict
  // case-count check. This is best-effort: some environments (e.g. certain mounted
  // filesystems) permit overwriting a file but not unlinking it. In that case we log a
  // warning and continue — the engine regenerates every manifest case in place via
  // overwriting writes, so a blocked delete does not corrupt the result.
  try {
    rmSync(outputRoot, { recursive: true, force: true });
  } catch (err) {
    console.warn(`[build-verification-cases] could not fully clean ${manifest.outputRoot} (${err instanceof Error ? err.code || err.message : String(err)}); regenerating in place.`);
  }
  mkdirSync(outputRoot, { recursive: true });

  const missing = manifest.cases.filter((c) => !existsSync(resolve(ROOT, c.fixture)));
  if (missing.length) {
    console.error("[build-verification-cases] missing vendored fixtures:");
    for (const c of missing) console.error(`  - ${c.id}: ${c.fixture}`);
    process.exit(1);
  }

  console.log(`[build-verification-cases] generating ${manifest.cases.length} verification cases...`);
  for (const c of manifest.cases) {
    const input = resolve(ROOT, c.fixture);
    const outDir = resolve(outputRoot, c.id);
    const result = await runMaximalAudit({ input, outDir, mode: "both", model: "verification-fixture", maxPages: 1 });
    console.log(`[build-verification-cases] ${c.id}: ${result.criteriaCount} criteria, unified ${result.unifiedAverage}/100`);
  }

  console.log(`[build-verification-cases] done -> ${manifest.outputRoot}`);
}

main().catch((err) => {
  console.error(`[build-verification-cases] failed: ${err instanceof Error ? err.stack || err.message : String(err)}`);
  process.exit(1);
});
