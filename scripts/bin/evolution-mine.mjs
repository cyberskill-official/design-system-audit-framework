#!/usr/bin/env node
// @ts-check
/**
 * evolution-mine.mjs — evidence-driven framework evolution proposals
 * ──────────────────────────────────────────────────────────────────
 *
 * The human-gated half of the DSAF auto-evolution loop. Reads every
 * scores.json under the verification-case output root (plus any extra dirs
 * passed as arguments), aggregates per-criterion behaviour across the whole
 * calibration corpus, and mines:
 *
 *   1. DEAD CRITERIA   — rows that score 0 in every case. Either the corpus
 *                        lacks coverage or the criterion's keywords/probes miss
 *                        real-world vocabulary. Both deserve human review.
 *   2. UNIVERSAL MISSES — keywords that never hit in any case (vocabulary gap:
 *                        candidates for the SYNONYMS map or rubric rewording).
 *   3. SATURATED ROWS  — criteria at 100 in every case (no discriminating
 *                        power left; candidates for a tightened 5-anchor).
 *   4. BAND IMBALANCE  — categories where artifact probes never fire across
 *                        repo-mode cases (probe gap: ARTIFACT_RULES candidates).
 *
 * Output: docs/outputs/generated/evolution/gap-report.json and
 *         docs/outputs/generated/evolution/proposals.md
 *
 * THIS SCRIPT NEVER MUTATES THE RUBRIC. Proposals become rubric changes only
 * through a human-reviewed PR — the same §16-style self-amendment gate the
 * memory protocol uses: the loop proposes, a person disposes.
 */

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const MANIFEST_PATH = resolve(ROOT, "scripts/test/fixtures/design-md-manifest.json");
const OUT_DIR = resolve(ROOT, "docs/outputs/generated/evolution");

/** @param {string} dir @returns {string[]} scores.json paths (case root or one level down) */
function findScoreFiles(dir) {
  if (!existsSync(dir)) return [];
  const found = [];
  const direct = join(dir, "scores.json");
  if (existsSync(direct)) found.push(direct);
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const nested = join(dir, entry.name, "scores.json");
    if (existsSync(nested)) found.push(nested);
  }
  return found;
}

function main() {
  const manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
  const roots = [resolve(ROOT, manifest.outputRoot), ...process.argv.slice(2).map((arg) => resolve(arg))];
  const scoreFiles = [...new Set(roots.flatMap((root) => findScoreFiles(root)))];
  if (!scoreFiles.length) {
    console.error("[evolution-mine] no scores.json found — run `npm run gen:verification-cases` first.");
    process.exit(1);
  }

  /** @type {Map<string, {scores: number[], missing: Map<string, number>, artifactSum: number, cases: number}>} */
  const byCriterion = new Map();
  let repoModeCases = 0;
  const caseSummaries = [];

  for (const file of scoreFiles) {
    /** @type {any} */
    let payload;
    try {
      payload = JSON.parse(readFileSync(file, "utf8"));
    } catch {
      console.warn(`[evolution-mine] skipping unparseable ${file}`);
      continue;
    }
    if (payload.schema !== "dsaf-scores/1") continue;
    const isRepo = payload.input_kind === "file" && payload.files_scanned > 1;
    if (isRepo) repoModeCases++;
    caseSummaries.push({ file, input: payload.input, unified: payload.unified_average, tier: payload.weighted?.tier });
    for (const row of payload.criteria ?? []) {
      if (!byCriterion.has(row.id)) byCriterion.set(row.id, { scores: [], missing: new Map(), artifactSum: 0, cases: 0 });
      const bucket = byCriterion.get(row.id);
      if (!bucket) continue;
      bucket.scores.push(row.score ?? 0);
      bucket.artifactSum += row.bands?.artifacts ?? 0;
      bucket.cases++;
      for (const signal of String(row.missing_signals ?? "").split(",").map((/** @type {string} */ word) => word.trim()).filter(Boolean)) {
        if (signal === "none") continue;
        bucket.missing.set(signal, (bucket.missing.get(signal) ?? 0) + 1);
      }
    }
  }

  const total = caseSummaries.length;
  const dead = [];
  const saturated = [];
  const universalMisses = [];
  const probeGaps = [];
  for (const [id, bucket] of [...byCriterion.entries()].sort((a, b) => a[0].localeCompare(b[0], undefined, { numeric: true }))) {
    const max = Math.max(...bucket.scores);
    const min = Math.min(...bucket.scores);
    if (max === 0) dead.push({ id, cases: bucket.cases });
    if (min === 100 && bucket.cases >= 3) saturated.push({ id, cases: bucket.cases });
    const everywhereMissing = [...bucket.missing.entries()].filter(([, count]) => count === bucket.cases).map(([word]) => word);
    if (everywhereMissing.length) universalMisses.push({ id, keywords: everywhereMissing.slice(0, 8) });
    if (repoModeCases > 0 && bucket.artifactSum === 0) probeGaps.push(id);
  }

  mkdirSync(OUT_DIR, { recursive: true });
  const gapReport = {
    schema: "dsaf-evolution/1",
    generated: new Date().toISOString(),
    cases: caseSummaries,
    repo_mode_cases: repoModeCases,
    dead_criteria: dead,
    saturated_criteria: saturated,
    universal_keyword_misses: universalMisses,
    artifact_probe_gaps: repoModeCases > 0 ? probeGaps : "no repo-mode cases in corpus — probe-gap mining skipped",
    disposition: "HUMAN-GATED: every item is a proposal. Rubric, keyword, and probe changes land only via reviewed PR."
  };
  writeFileSync(join(OUT_DIR, "gap-report.json"), JSON.stringify(gapReport, null, 2) + "\n", "utf8");

  const proposals = [
    "# DSAF evolution proposals (mined, human-gated)",
    "",
    `Generated ${gapReport.generated} from ${total} case(s) (${repoModeCases} repo-mode). Nothing in this file changes the rubric by itself — review, then land accepted items as ordinary PRs with a \`dsaf_125_version\` bump when criteria change.`,
    "",
    `## Dead criteria (${dead.length}) — score 0 across the whole corpus`,
    "",
    dead.length ? dead.map((row) => `- \`${row.id}\` — check: is the corpus missing this practice, or do the keywords/probes miss real vocabulary?`).join("\n") : "- none",
    "",
    `## Saturated criteria (${saturated.length}) — 100 everywhere, no discrimination left`,
    "",
    saturated.length ? saturated.map((row) => `- \`${row.id}\` — consider tightening the 5-anchor.`).join("\n") : "- none",
    "",
    `## Universal keyword misses (${universalMisses.length} criteria) — synonym/rewording candidates`,
    "",
    universalMisses.length ? universalMisses.map((row) => `- \`${row.id}\`: ${row.keywords.join(", ")}`).join("\n") : "- none",
    "",
    `## Artifact probe gaps — categories whose probes never fired in repo-mode cases`,
    "",
    typeof gapReport.artifact_probe_gaps === "string"
      ? `- ${gapReport.artifact_probe_gaps}`
      : (probeGaps.length ? probeGaps.map((id) => `- \`${id}\``).join("\n") : "- none"),
    ""
  ].join("\n");
  writeFileSync(join(OUT_DIR, "proposals.md"), proposals, "utf8");

  console.log(`[evolution-mine] ${total} case(s) mined -> ${join("docs/outputs/generated/evolution", "gap-report.json")}`);
  console.log(`[evolution-mine] dead=${dead.length} saturated=${saturated.length} vocab-gaps=${universalMisses.length} probe-gaps=${typeof gapReport.artifact_probe_gaps === "string" ? "n/a" : probeGaps.length}`);
}

main();
