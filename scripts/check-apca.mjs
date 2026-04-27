#!/usr/bin/env node
//
// check-apca.mjs — APCA contrast verification (WCAG 3.0 readiness)
// ─────────────────────────────────────────────────────────────────
//
// Per `wcag-3-readiness.md` §6 ("Collect APCA contrast values alongside
// WCAG 2.x ratios"). APCA (Accessible Perceptual Contrast Algorithm) is
// the recommended contrast method in WCAG 3.0 working draft.
//
// Reads tokens/colour.tokens.json + walks the canonical foreground×background
// pairings; emits APCA Lc values and flags any that fall below the 3.0
// readiness floor (Lc 60 for body text; Lc 45 for large UI).
//
// Output: docs/_audit/apca-contrast.json
//
// Zero-dep Node ESM. Implements the published APCA-W3 0.1.9 algorithm.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const TOKENS = resolve(ROOT, 'tokens/colour.tokens.json');
const OUT = resolve(ROOT, 'docs/_audit/apca-contrast.json');

// ─── APCA-W3 (sRGB) — published 0.1.9 reference implementation ─────────

const apca_constants = {
  mainTRC: 2.4,
  Rco: 0.2126729,
  Gco: 0.7151522,
  Bco: 0.0721750,
  normBG: 0.56,
  normTXT: 0.57,
  revTXT: 0.62,
  revBG: 0.65,
  blkThrs: 0.022,
  blkClmp: 1.414,
  scaleBoW: 1.14,
  loBoWoffset: 0.027,
  scaleWoB: 1.14,
  loWoBoffset: 0.027,
  loClip: 0.1,
  deltaYmin: 0.0005,
};

function srgbToY([r, g, b]) {
  const k = apca_constants;
  const sr = Math.pow(r / 255.0, k.mainTRC);
  const sg = Math.pow(g / 255.0, k.mainTRC);
  const sb = Math.pow(b / 255.0, k.mainTRC);
  let y = sr * k.Rco + sg * k.Gco + sb * k.Bco;
  if (y < k.blkThrs) y += Math.pow(k.blkThrs - y, k.blkClmp);
  return y;
}

/** APCA Lc value for text-on-bg. Range typically -110..+110. */
function apca(textRgb, bgRgb) {
  const k = apca_constants;
  const yT = srgbToY(textRgb);
  const yB = srgbToY(bgRgb);
  if (Math.abs(yT - yB) < k.deltaYmin) return 0;

  let outputContrast = 0;
  if (yB > yT) {
    // Black text on white-ish bg
    const sapc = (Math.pow(yB, k.normBG) - Math.pow(yT, k.normTXT)) * k.scaleBoW;
    outputContrast = sapc < k.loClip ? 0 : sapc < k.loBoWoffset ? sapc - sapc * k.loBoWoffset / k.loClip : sapc - k.loBoWoffset;
  } else {
    // White text on dark-ish bg
    const sapc = (Math.pow(yB, k.revBG) - Math.pow(yT, k.revTXT)) * k.scaleWoB;
    outputContrast = sapc > -k.loClip ? 0 : sapc > -k.loWoBoffset ? sapc - sapc * k.loWoBoffset / k.loClip : sapc + k.loWoBoffset;
  }

  return Math.round(outputContrast * 100);
}

function parseHex(hex) {
  const s = hex.replace('#', '');
  if (s.length === 3) {
    return [parseInt(s[0] + s[0], 16), parseInt(s[1] + s[1], 16), parseInt(s[2] + s[2], 16)];
  }
  if (s.length === 6) {
    return [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)];
  }
  return null;
}

// ─── Pairings to validate ──────────────────────────────────────────────

const colour = JSON.parse(readFileSync(TOKENS, 'utf8'));

function lookup(path) {
  // path like "color.text.default" or "color.text.default.theme.dark"
  const parts = path.split('.');
  let cursor = colour;
  for (const p of parts) {
    if (cursor == null) return null;
    cursor = cursor[p];
  }
  if (cursor && typeof cursor === 'object' && '$value' in cursor) {
    let v = cursor.$value;
    if (typeof v === 'string' && v.startsWith('{') && v.endsWith('}')) {
      return lookup(v.slice(1, -1));
    }
    return v;
  }
  return cursor;
}

const PAIRINGS = [
  { name: 'text on surface (light)',  fg: 'color.text.default',  bg: 'color.surface.default',  floor: 60, role: 'body-text' },
  { name: 'text on surface raised',   fg: 'color.text.default',  bg: 'color.surface.raised',   floor: 60, role: 'body-text' },
  { name: 'text muted on surface',    fg: 'color.text.muted',    bg: 'color.surface.default',  floor: 45, role: 'large-ui' },
  { name: 'umber on warm-white',      fg: 'color.umber',         bg: 'color.warm-white',       floor: 60, role: 'body-text' },
  { name: 'umber on accent',          fg: 'color.umber',         bg: 'color.accent.default',   floor: 60, role: 'body-text' },
  { name: 'text default on accent',   fg: 'color.text.default',  bg: 'color.accent.default',   floor: 60, role: 'body-text' },
  { name: 'danger on surface',        fg: 'color.semantic.danger', bg: 'color.surface.default', floor: 45, role: 'large-ui' },
  { name: 'success on surface',       fg: 'color.semantic.success', bg: 'color.surface.default', floor: 45, role: 'large-ui' },
];

const results = PAIRINGS.map((p) => {
  const fgHex = lookup(p.fg);
  const bgHex = lookup(p.bg);
  if (typeof fgHex !== 'string' || typeof bgHex !== 'string') {
    return { ...p, fgHex, bgHex, lc: null, error: 'Missing token value' };
  }
  const fg = parseHex(fgHex);
  const bg = parseHex(bgHex);
  if (!fg || !bg) return { ...p, fgHex, bgHex, lc: null, error: 'Cannot parse hex' };
  const lc = apca(fg, bg);
  const passes = Math.abs(lc) >= p.floor;
  return { ...p, fgHex, bgHex, lc, passes };
});

const summary = {
  generated: new Date().toISOString(),
  algorithm: 'APCA-W3 v0.1.9',
  source: 'tokens/colour.tokens.json',
  pairings: results,
  totals: {
    total: results.length,
    pass: results.filter((r) => r.passes).length,
    fail: results.filter((r) => r.passes === false).length,
    error: results.filter((r) => r.error).length,
  },
};

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(summary, null, 2) + '\n');

console.log(`[check-apca] WCAG 3.0 APCA contrast — ${results.length} canonical pairings.`);
console.log('');
for (const r of results) {
  if (r.error) {
    console.log(`  ✗ ${r.name.padEnd(30)} ERROR: ${r.error}`);
    continue;
  }
  const flag = r.passes ? '✓' : '⚠';
  console.log(`  ${flag} ${r.name.padEnd(30)} Lc ${String(r.lc).padStart(4)}  (floor: ${r.floor}, role: ${r.role})  ${r.fgHex} on ${r.bgHex}`);
}
console.log('');
console.log(`  Pass: ${summary.totals.pass} / ${summary.totals.total}`);
console.log(`  Fail: ${summary.totals.fail}`);
console.log(`  Output: ${OUT.replace(ROOT + '/', '')}`);

// Don't fail CI for now — APCA is WCAG 3.0 readiness, not yet a hard gate
process.exit(0);
