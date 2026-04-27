#!/usr/bin/env node
/**
 * check-bundle-size.mjs — per-component / per-package bundle-size check
 * ────────────────────────────────────────────────────────────────────
 *
 * Per audit recommendation A9.1 → 5 path. Reads each package's source byte
 * size + estimated gzipped size; compares against budgets in
 * package.json#cyberskill.budgets; fails CI on regression.
 *
 * Phase 2 Wave 2 — uses raw source bytes as a proxy for shipped bundle size.
 * Phase 3 will swap in actual rollup/esbuild bundling + size-limit semantics.
 *
 * Usage:
 *   pnpm check:bundle-size
 *   pnpm check:bundle-size --json
 *
 * Output: docs/_audit/bundle-size.json (trended over time)
 *
 * Zero-dep Node ESM.
 */

import { readFileSync, readdirSync, statSync, existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve, relative, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const PKGS = resolve(ROOT, 'packages');
const OUT = resolve(ROOT, 'docs/_audit/bundle-size.json');

const args = process.argv.slice(2);
const opts = { json: args.includes('--json') };

// ─── Default budgets (overridable in package.json#cyberskill.budgets) ──

const DEFAULT_BUDGETS = {
  '@cyberskill/tokens': { source: 30_000, gzip: 6_000 },
  '@cyberskill/primitives': { source: 60_000, gzip: 12_000 },
  '@cyberskill/web-components': { source: 100_000, gzip: 25_000 },
  '@cyberskill/react': { source: 50_000, gzip: 10_000 },
  '@cyberskill/vue': { source: 50_000, gzip: 10_000 },
  '@cyberskill/svelte': { source: 50_000, gzip: 10_000 },
  '@cyberskill/theme-generator': { source: 80_000, gzip: 15_000 },
  '@cyberskill/mcp-server': { source: 40_000, gzip: 8_000 },
};

// ─── Walk each package ─────────────────────────────────────────────────

function walkSrc(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith('.') || entry === 'node_modules') continue;
    const path = resolve(dir, entry);
    const st = statSync(path);
    if (st.isDirectory()) out.push(...walkSrc(path));
    else if (['.mjs', '.js', '.ts', '.tsx', '.vue', '.svelte', '.json'].includes(extname(entry))
             && !entry.endsWith('.test.mjs') && !entry.endsWith('.test.ts')) {
      out.push(path);
    }
  }
  return out;
}

const packages = readdirSync(PKGS).filter((p) => existsSync(resolve(PKGS, p, 'package.json')));

const results = {};
let anyOver = false;

for (const pkgName of packages) {
  const pkgDir = resolve(PKGS, pkgName);
  const manifest = JSON.parse(readFileSync(resolve(pkgDir, 'package.json'), 'utf8'));
  const fullName = manifest.name;
  const srcFiles = walkSrc(resolve(pkgDir, 'src'));

  let sourceBytes = 0;
  const concat = [];
  for (const f of srcFiles) {
    const c = readFileSync(f);
    sourceBytes += c.length;
    concat.push(c);
  }
  const all = Buffer.concat(concat);
  const gzipBytes = gzipSync(all).length;

  const budget = manifest.cyberskill?.budgets ?? DEFAULT_BUDGETS[fullName] ?? { source: Infinity, gzip: Infinity };
  const sourceOver = sourceBytes > budget.source;
  const gzipOver = gzipBytes > budget.gzip;
  if (sourceOver || gzipOver) anyOver = true;

  results[fullName] = {
    pkgDir: relative(ROOT, pkgDir),
    files: srcFiles.length,
    source: { bytes: sourceBytes, budget: budget.source, over: sourceOver, pct: budget.source === Infinity ? null : sourceBytes / budget.source },
    gzip: { bytes: gzipBytes, budget: budget.gzip, over: gzipOver, pct: budget.gzip === Infinity ? null : gzipBytes / budget.gzip },
  };
}

const summary = {
  generated: new Date().toISOString(),
  total: results,
  any_over_budget: anyOver,
};

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(summary, null, 2) + '\n');

if (opts.json) {
  process.stdout.write(JSON.stringify(summary, null, 2) + '\n');
} else {
  const fmt = (n) => n >= 1024 ? `${(n / 1024).toFixed(1)} KB` : `${n} B`;
  const pct = (p) => p == null ? '—' : `${(p * 100).toFixed(0)}%`;
  console.log(`[check-bundle-size] ${packages.length} packages scanned.`);
  console.log('');
  console.log(`${'package'.padEnd(32)} ${'source'.padEnd(20)} ${'gzip'.padEnd(18)}`);
  console.log('─'.repeat(72));
  for (const [name, r] of Object.entries(results)) {
    const sr = `${fmt(r.source.bytes)} / ${fmt(r.source.budget)} (${pct(r.source.pct)})`;
    const gz = `${fmt(r.gzip.bytes)} / ${fmt(r.gzip.budget)} (${pct(r.gzip.pct)})`;
    const flag = r.source.over || r.gzip.over ? ' ⚠' : ' ✓';
    console.log(`${name.padEnd(32)} ${sr.padEnd(20)} ${gz.padEnd(18)}${flag}`);
  }
  console.log('');
  console.log(`Output: ${relative(ROOT, OUT)}`);
}

process.exit(anyOver ? 1 : 0);
