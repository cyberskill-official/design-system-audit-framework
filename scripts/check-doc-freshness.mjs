#!/usr/bin/env node
/**
 * check-doc-freshness.mjs — doc staleness dashboard
 * ─────────────────────────────────────────────────
 *
 * Per Part 18 §6 (auto-generated freshness signals) + audit recommendation
 * A3.7 → 4. Reports per-part:
 *   - file size
 *   - last-modified mtime (filesystem)
 *   - last-mentioned-in-RFC (heuristic: searches docs/RFCs/ for filename)
 *   - presence of each Diátaxis quadrant (per Part 18 §19)
 *   - count of cross-reference targets vs broken links
 *
 * Output: docs/_audit/doc-freshness.json + a markdown report stub.
 *
 * Zero-dep Node ESM.
 */

import { readFileSync, readdirSync, statSync, existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve, relative, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DOCS = resolve(ROOT, 'docs');
const RFCS = resolve(DOCS, 'RFCs');
const OUT_JSON = resolve(DOCS, '_audit/doc-freshness.json');
const OUT_MD = resolve(DOCS, '_audit/doc-freshness.md');

const args = process.argv.slice(2);
const opts = { json: args.includes('--json') };

// ─── List parts ────────────────────────────────────────────────────────

const partFiles = readdirSync(DOCS)
  .filter((f) => (f.startsWith('00-') || f.startsWith('part-')) && f.endsWith('.md'))
  .sort();

// ─── Search RFCs for each part filename ────────────────────────────────

const rfcFiles = existsSync(RFCS) ? readdirSync(RFCS).filter((f) => f.endsWith('.md')) : [];
const rfcContents = Object.fromEntries(
  rfcFiles.map((f) => [f, readFileSync(resolve(RFCS, f), 'utf8')]),
);

// ─── Diátaxis quadrant presence per part ───────────────────────────────

function detectQuadrants(content) {
  const lower = content.toLowerCase();
  return {
    has_introduction: /^#\s/.test(content) && /\*[^*]+\*/.test(content),  // H1 + italic intro
    has_reference: /^##\s.*reference|^##\s.*api/im.test(content) || /component-spec|^##\s\d/.test(content),
    has_explanation: /^##\s.*(why|rationale|principle|philosophy|origin)/im.test(content) || /\*\*Why:\*\*/m.test(content),
    has_how_to: /^##\s.*(how to|how-to|step.{0,3}step|workflow|playbook)/im.test(content),
    has_tutorial: /^##\s.*(tutorial|walkthrough|getting started|quickstart|first)/im.test(content),
    has_a11y_section: /^##\s.*accessibility|^###\s.*accessibility/im.test(content),
    has_references: /^##\s.*references/im.test(content),
  };
}

// ─── Cross-reference walk ──────────────────────────────────────────────

function countXrefs(content, partFiles) {
  const linkRe = /\]\(([^)]+\.md)(?:#[^)]*)?\)/g;
  let total = 0;
  let broken = 0;
  let m;
  while ((m = linkRe.exec(content)) !== null) {
    if (m[1].startsWith('http')) continue;
    total++;
    const targetBase = basename(m[1]);
    if (targetBase.endsWith('.md') && !partFiles.includes(targetBase)) {
      // Check if it's an RFC, audit, or relative path within docs
      const candidates = [
        resolve(DOCS, m[1]),
        resolve(DOCS, 'RFCs', m[1]),
      ];
      if (!candidates.some(existsSync)) broken++;
    }
  }
  return { total, broken };
}

// ─── Compute results ───────────────────────────────────────────────────

const now = Date.now();
const results = [];

for (const f of partFiles) {
  const path = resolve(DOCS, f);
  const st = statSync(path);
  const content = readFileSync(path, 'utf8');
  const ageDays = Math.floor((now - st.mtimeMs) / (1000 * 60 * 60 * 24));
  const quadrants = detectQuadrants(content);
  const xrefs = countXrefs(content, partFiles);

  // Find the most recent RFC that mentions this part
  let mostRecentRfc = null;
  for (const [rfcFile, rfcSrc] of Object.entries(rfcContents)) {
    if (rfcSrc.includes(f) || rfcSrc.includes(f.replace('.md', ''))) {
      if (!mostRecentRfc || rfcFile > mostRecentRfc) mostRecentRfc = rfcFile;
    }
  }

  // Quadrant completeness — Diátaxis 4-quadrant presence
  const quadrantsCovered = [
    quadrants.has_reference,        // Reference
    quadrants.has_explanation,      // Explanation
    quadrants.has_how_to,           // How-to
    quadrants.has_tutorial,         // Tutorial
  ].filter(Boolean).length;

  results.push({
    filename: f,
    size_bytes: st.size,
    last_modified: new Date(st.mtimeMs).toISOString(),
    age_days: ageDays,
    quadrants,
    quadrants_covered: quadrantsCovered,
    has_a11y_section: quadrants.has_a11y_section,
    xrefs_total: xrefs.total,
    xrefs_broken: xrefs.broken,
    most_recent_rfc: mostRecentRfc,
  });
}

const summary = {
  generated: new Date().toISOString(),
  total_parts: results.length,
  parts: results,
  totals: {
    total_xrefs: results.reduce((a, r) => a + r.xrefs_total, 0),
    broken_xrefs: results.reduce((a, r) => a + r.xrefs_broken, 0),
    avg_age_days: Math.round(results.reduce((a, r) => a + r.age_days, 0) / results.length),
    parts_4quadrant: results.filter((r) => r.quadrants_covered === 4).length,
    parts_3quadrant: results.filter((r) => r.quadrants_covered === 3).length,
    parts_lt3quadrant: results.filter((r) => r.quadrants_covered < 3).length,
    parts_with_a11y_section: results.filter((r) => r.has_a11y_section).length,
  },
};

mkdirSync(dirname(OUT_JSON), { recursive: true });
writeFileSync(OUT_JSON, JSON.stringify(summary, null, 2) + '\n');

// Markdown report
const md = [];
md.push(`# Doc freshness — ${summary.generated.slice(0, 10)}`);
md.push('');
md.push('Per Part 18 §6 + audit A3.7. Auto-generated by `scripts/check-doc-freshness.mjs`.');
md.push('');
md.push('## Summary');
md.push('');
md.push(`| Metric | Value |`);
md.push(`|---|---|`);
md.push(`| Total parts | ${summary.total_parts} |`);
md.push(`| Average age | ${summary.totals.avg_age_days} days |`);
md.push(`| Total xrefs | ${summary.totals.total_xrefs} |`);
md.push(`| **Broken xrefs** | **${summary.totals.broken_xrefs}** |`);
md.push(`| Parts covering 4 Diátaxis quadrants | ${summary.totals.parts_4quadrant} |`);
md.push(`| Parts covering 3 quadrants | ${summary.totals.parts_3quadrant} |`);
md.push(`| Parts covering < 3 quadrants | ${summary.totals.parts_lt3quadrant} |`);
md.push(`| Parts with explicit \`## Accessibility\` section | ${summary.totals.parts_with_a11y_section} |`);
md.push('');
md.push('## Per-part detail');
md.push('');
md.push('| Part | Age | Size | Quadrants | A11y? | Xrefs (broken) | Last RFC |');
md.push('|---|---|---|---|---|---|---|');
for (const r of results) {
  const quad = `${r.quadrants_covered}/4`;
  const a11y = r.has_a11y_section ? '✓' : '—';
  const xref = r.xrefs_broken > 0 ? `${r.xrefs_total} (**${r.xrefs_broken} broken**)` : `${r.xrefs_total}`;
  md.push(`| ${r.filename} | ${r.age_days}d | ${(r.size_bytes / 1024).toFixed(1)}KB | ${quad} | ${a11y} | ${xref} | ${r.most_recent_rfc ?? '—'} |`);
}
writeFileSync(OUT_MD, md.join('\n') + '\n');

if (opts.json) {
  process.stdout.write(JSON.stringify(summary, null, 2) + '\n');
} else {
  console.log(`[check-doc-freshness] ${summary.total_parts} parts scanned.`);
  console.log(`  Average age:        ${summary.totals.avg_age_days} days`);
  console.log(`  Total xrefs:        ${summary.totals.total_xrefs}`);
  console.log(`  Broken xrefs:       ${summary.totals.broken_xrefs}`);
  console.log(`  4-quadrant parts:   ${summary.totals.parts_4quadrant} / ${summary.total_parts}`);
  console.log(`  Parts w/ A11y §:    ${summary.totals.parts_with_a11y_section} / ${summary.total_parts}`);
  console.log(`  JSON:   ${relative(ROOT, OUT_JSON)}`);
  console.log(`  Report: ${relative(ROOT, OUT_MD)}`);
}

// Hard fail only on broken xrefs (per RFC 2026-005 lint #4)
process.exit(summary.totals.broken_xrefs > 0 ? 1 : 0);
