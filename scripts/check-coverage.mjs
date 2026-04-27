#!/usr/bin/env node
/**
 * check-coverage.mjs — measure design-system adoption inside src/
 * ──────────────────────────────────────────────────────────────
 *
 * Per the first-product migration plan §3 (sub-phase A4) and the audit
 * recommendation A7.1 → 4 path. Walks src/, ratios:
 *
 *   - tokenCoverage      — % of dimension/colour/duration values that go
 *                          through tokens (var(--cs-*) / @cyberskill/tokens)
 *                          vs raw literals
 *   - componentCoverage  — % of interactive primitives consumed from
 *                          src/atoms|molecules|organisms vs raw markup
 *   - storyCoverage      — % of components that ship a *.stories.tsx
 *
 * Output: _audit/coverage.json (trended over time)
 *
 * Zero-dependency Node ESM.
 */

import { readFileSync, readdirSync, writeFileSync, statSync, mkdirSync } from 'node:fs';
import { dirname, resolve, relative, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SRC = resolve(ROOT, 'src');
const OUT = resolve(ROOT, 'docs/_audit/coverage.json');

if (!resolve(dirname(OUT))) mkdirSync(dirname(OUT), { recursive: true });

// ─── Walk src/ ─────────────────────────────────────────────────────────

const SCAN_EXT = new Set(['.tsx', '.ts', '.jsx', '.js', '.css']);
const COMPONENT_EXT = new Set(['.tsx', '.jsx']);
const STORY_RE = /\.stories\.(tsx|ts|jsx|js)$/;

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith('.')) continue;
    const path = resolve(dir, entry);
    let st;
    try { st = statSync(path); } catch { continue; }
    if (st.isDirectory()) yield* walk(path);
    else yield path;
  }
}

const files = [...walk(SRC)];

// ─── Component inventory ──────────────────────────────────────────────

const componentDirs = ['atoms', 'molecules', 'organisms'];
const components = {};
for (const tier of componentDirs) {
  const tierDir = resolve(SRC, tier);
  let entries = [];
  try { entries = readdirSync(tierDir); } catch { continue; }
  for (const name of entries) {
    if (name.startsWith('.')) continue;
    const compDir = resolve(tierDir, name);
    let st;
    try { st = statSync(compDir); } catch { continue; }
    if (!st.isDirectory()) continue;
    const compFiles = readdirSync(compDir);
    components[`${tier}/${name}`] = {
      tier,
      name,
      hasIndex: compFiles.includes('index.ts') || compFiles.includes('index.tsx'),
      hasStory: compFiles.some((f) => STORY_RE.test(f)),
      hasShowcase: compFiles.some((f) => f.endsWith('.showcase.tsx')),
    };
  }
}

// ─── Token coverage — count token refs vs raw literals in src ─────────

let tokenRefs = 0;
let twTokenUtils = 0;
let rawHex = 0;
let rawPx = 0;
let rawMs = 0;
let totalScanned = 0;

const TOKEN_REF_RE = /var\(\s*--cs-[\w-]+\s*\)/g;
// Token-aware Tailwind utility classes (theme-bound via @theme directive in
// src/index.css): p-cs*, m-cs*, gap-cs*, text-{xs,sm,md,lg,h1,h2,h3,display,
// micro,small,h1-lg,h1-sm}, bg-{accent,surface,etc.}, border-border-*,
// shadow-cs-*, rounded-{md,lg,xl,full}, font-mono / font-sans.
const TW_TOKEN_UTIL_RE = /\b(?:p|m|px|py|pl|pr|pt|pb|mx|my|ml|mr|mt|mb|gap)-cs\d+\b|\btext-(?:xs|sm|md|lg|body|h1|h2|h3|display|micro|small|h1-lg|h1-sm|accent|text-muted|warm)\b|\bbg-(?:accent|accent-subtle|surface|surface-raised|surface-subtle|warm|umber|umber-dark|umber-light|umber-deep|ochre|stone|success|warning|danger|info|bone)\b|\bborder-(?:border|border-subtle|accent|umber|ochre|warm)\b|\bshadow-cs(?:-md|-lg)?\b/g;
const HEX_RE = /#[0-9a-fA-F]{3,8}\b/g;
const PX_RE = /\b\d+px\b/g;
const MS_RE = /(?<![:\w])\d+ms\b/g;

for (const f of files) {
  const ext = extname(f);
  if (!SCAN_EXT.has(ext)) continue;
  if (basename(f).match(STORY_RE)) continue; // stories often demo literals; exclude
  totalScanned++;
  let content;
  try { content = readFileSync(f, 'utf8'); } catch { continue; }
  // Strip comments crudely
  const cleaned = content.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
  tokenRefs += (cleaned.match(TOKEN_REF_RE) ?? []).length;
  twTokenUtils += (cleaned.match(TW_TOKEN_UTIL_RE) ?? []).length;
  rawHex += (cleaned.match(HEX_RE) ?? []).length;
  rawPx += (cleaned.match(PX_RE) ?? []).length;
  rawMs += (cleaned.match(MS_RE) ?? []).length;
}

// Combined token-aware count = direct CSS-var refs + token-derived Tailwind utility classes
const tokenAware = tokenRefs + twTokenUtils;
const totalTokenable = tokenAware + rawHex + rawPx + rawMs;
const tokenCoverage = totalTokenable === 0 ? 1 : tokenAware / totalTokenable;

// ─── Component coverage — counts views/App for raw markup ─────────────

const VIEW_FILES = ['App.tsx', 'main.tsx', 'views'];
const interactiveTagPattern = /<\s*(button|a|input|select|textarea)\b/g;

// Auto-discover system component names from atoms/molecules/organisms inventory
// + the cs-* web-components naming convention.
const discoveredSystemTags = Object.values(components).map((c) => c.name);
const systemTagSource = `<\\s*(${[...discoveredSystemTags, 'cs-[a-z-]+'].join('|')})\\b`;
const systemTagPattern = new RegExp(systemTagSource, 'g');

let rawMarkup = 0;
let systemMarkup = 0;

function isViewFile(f) {
  const rel = relative(SRC, f);
  return VIEW_FILES.some((v) => rel === v || rel.startsWith(v + '/'));
}

for (const f of files) {
  if (!COMPONENT_EXT.has(extname(f))) continue;
  if (basename(f).match(STORY_RE)) continue;
  if (!isViewFile(f)) continue;
  let content;
  try { content = readFileSync(f, 'utf8'); } catch { continue; }
  const cleaned = content.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
  rawMarkup += (cleaned.match(interactiveTagPattern) ?? []).length;
  systemMarkup += (cleaned.match(systemTagPattern) ?? []).length;
}

const totalMarkup = rawMarkup + systemMarkup;
const componentCoverage = totalMarkup === 0 ? 1 : systemMarkup / totalMarkup;

// ─── Story coverage ────────────────────────────────────────────────────

const totalComponents = Object.keys(components).length;
const componentsWithStories = Object.values(components).filter((c) => c.hasStory).length;
const storyCoverage = totalComponents === 0 ? 1 : componentsWithStories / totalComponents;

// ─── Output ───────────────────────────────────────────────────────────

const result = {
  generated: new Date().toISOString(),
  scanned: totalScanned,
  src_root: relative(ROOT, SRC),
  components: {
    total: totalComponents,
    by_tier: componentDirs.reduce((acc, t) => {
      acc[t] = Object.values(components).filter((c) => c.tier === t).length;
      return acc;
    }, {}),
    inventory: components,
  },
  token_coverage: {
    pct: tokenCoverage,
    token_refs: tokenRefs,
    tw_token_utils: twTokenUtils,
    token_aware_total: tokenAware,
    raw_hex: rawHex,
    raw_px: rawPx,
    raw_ms: rawMs,
    tokenable_total: totalTokenable,
  },
  component_coverage: {
    pct: componentCoverage,
    system_markup: systemMarkup,
    raw_markup: rawMarkup,
    notes: 'Counts only views/ + App.tsx + main.tsx (per migration plan A4). Raw <button> / <input> in atom IMPLEMENTATIONS is expected and not a violation.',
  },
  story_coverage: {
    pct: storyCoverage,
    components_with_stories: componentsWithStories,
    components_total: totalComponents,
    missing: Object.values(components).filter((c) => !c.hasStory).map((c) => `${c.tier}/${c.name}`),
  },
  audit_targets: {
    'A7.1 (coverage % tracked)': totalTokenable > 0 ? 4 : 3,
    'A2.4 (variant & state coverage)': storyCoverage >= 0.95 ? 5 : storyCoverage >= 0.7 ? 4 : 3,
    'A5.4 (Storybook)': componentsWithStories >= 0.7 * totalComponents ? 5 : 4,
  },
};

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(result, null, 2) + '\n');

const fmt = (n) => (n * 100).toFixed(1) + '%';

console.log(`[check-coverage] Scanned ${totalScanned} files; ${totalComponents} components.`);
console.log(`  Token coverage:     ${fmt(tokenCoverage)}  (${tokenRefs} CSS-var refs + ${twTokenUtils} TW utils / ${totalTokenable} tokenable)`);
console.log(`  Component coverage: ${fmt(componentCoverage)}  (${systemMarkup} system / ${totalMarkup} markup)`);
console.log(`  Story coverage:     ${fmt(storyCoverage)}  (${componentsWithStories} / ${totalComponents})`);
console.log(`  Output:             ${relative(ROOT, OUT)}`);

// CI gate: warn if any drops below thresholds
const STORY_FLOOR = 0.30; // baseline today; tighten as we ship Phase 2
const TOKEN_FLOOR = 0.70;
const COMP_FLOOR = 0.30;

let exit = 0;
if (storyCoverage < STORY_FLOOR) {
  console.error(`[check-coverage] WARN: story coverage ${fmt(storyCoverage)} < floor ${fmt(STORY_FLOOR)}`);
  // exit = 1 — don't fail the build today; Phase 2 Wave 2 raises the floor
}
if (tokenCoverage < TOKEN_FLOOR) {
  console.error(`[check-coverage] WARN: token coverage ${fmt(tokenCoverage)} < floor ${fmt(TOKEN_FLOOR)}`);
}
if (componentCoverage < COMP_FLOOR) {
  console.error(`[check-coverage] WARN: component coverage ${fmt(componentCoverage)} < floor ${fmt(COMP_FLOOR)}`);
}

process.exit(exit);
