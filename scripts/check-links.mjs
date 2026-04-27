#!/usr/bin/env node
/**
 * check-links.mjs — Verify all internal markdown links resolve
 * ─────────────────────────────────────────────────────────────
 *
 * Walks every .md file in this framework folder, extracts every
 * markdown link of the form [text](path.md...) where path is relative
 * (i.e., not http://, not https://, not mailto:), and confirms each
 * resolved target exists on disk.
 *
 * Exit code 0 = clean. Exit code 1 = broken refs (with detail).
 *
 * Zero dependencies — Node 20+ built-ins only.
 */

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// ─── Walk all .md files ────────────────────────────────────────────────

function walkMarkdown(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith(".") || entry === "node_modules" || entry === "dist") continue;
    const p = join(dir, entry);
    const stat = statSync(p);
    if (stat.isDirectory()) walkMarkdown(p, out);
    else if (entry.endsWith(".md")) out.push(p);
  }
  return out;
}

const files = walkMarkdown(ROOT);

// ─── Extract & verify links ────────────────────────────────────────────

let totalLinks = 0;
let brokenLinks = [];

const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;

for (const file of files) {
  const src = readFileSync(file, "utf8");
  for (const match of src.matchAll(linkRe)) {
    const text = match[1];
    let href = match[2];

    // Strip anchor fragments
    const hashIdx = href.indexOf("#");
    const path = hashIdx >= 0 ? href.slice(0, hashIdx) : href;

    // Skip non-relative + non-md links
    if (!path) continue;                                 // pure anchor
    if (path.startsWith("http://") || path.startsWith("https://")) continue;
    if (path.startsWith("mailto:")) continue;
    if (!path.endsWith(".md") && !path.includes("/")) continue;

    totalLinks++;

    const resolved = resolve(dirname(file), path);
    if (!existsSync(resolved)) {
      brokenLinks.push({
        file: relative(ROOT, file),
        link: `[${text}](${href})`,
        resolvedTo: relative(ROOT, resolved),
      });
    }
  }
}

// ─── Report ────────────────────────────────────────────────────────────

console.log(`[check-links] Scanned ${files.length} markdown files; ${totalLinks} relative links found.`);

if (brokenLinks.length === 0) {
  console.log(`[check-links] ✓ All links resolve.`);
  process.exit(0);
}

console.error(`[check-links] ✗ ${brokenLinks.length} broken link(s):\n`);
for (const b of brokenLinks) {
  console.error(`  ${b.file}`);
  console.error(`    ${b.link}`);
  console.error(`    → ${b.resolvedTo}`);
  console.error("");
}
process.exit(1);
