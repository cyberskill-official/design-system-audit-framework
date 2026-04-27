#!/usr/bin/env node
/**
 * build-design-md.mjs — Generate a standalone DESIGN.md for AI agents
 * ────────────────────────────────────────────────────────────────────
 *
 * What this does:
 *   Reads the 20 main design-system files under `docs/` plus the DTCG
 *   token files under `tokens/`, and emits a single, fully self-contained
 *   `DESIGN.md` at the repo root. The output is portable: drop it into any
 *   downstream project's AI-agent context (Cursor, Claude Code, Copilot,
 *   Cline, Aider, custom MCP) and the agent has everything it needs to use
 *   the CyberSkill design system without reaching back into this repo.
 *
 * Input boundary (intentionally narrow):
 *   - docs/00-index.md
 *   - docs/00-audit-and-roadmap.md
 *   - docs/part-*.md  (the 20 doctrine parts)
 *   - tokens/*.tokens.json  (DTCG sources — values inlined into output)
 *
 *   Nothing else. No package.json, no Storybook config, no src/, no
 *   scripts/, no packages/, no lints/. The doctrine + tokens are the
 *   single source of truth.
 *
 * How to run:
 *   pnpm build:design-md           (preferred)
 *   node scripts/build-design-md.mjs
 *   node scripts/build-design-md.mjs --dry-run     (print to stdout, don't write)
 *   node scripts/build-design-md.mjs --check       (fail with exit 1 if file is stale)
 *
 * Zero dependencies — uses only Node 20+ built-ins.
 * Spec: see docs/00-audit-and-roadmap.md §11.
 */

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, dirname, resolve, relative, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

// ─── Config ────────────────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");           // Design System/
const DOCS = join(ROOT, "docs");
const TOKENS = join(ROOT, "tokens");
const OUT = join(ROOT, "DESIGN.md");

const DRY_RUN = process.argv.includes("--dry-run");
const CHECK = process.argv.includes("--check");

// ─── Helpers ───────────────────────────────────────────────────────────

const safeRead = (p) => {
  try { return readFileSync(p, "utf8"); } catch { return null; }
};

const safeReadJSON = (p) => {
  const s = safeRead(p);
  if (!s) return null;
  try { return JSON.parse(s); } catch { return null; }
};

const safeListDir = (p) => {
  try { return readdirSync(p); } catch { return []; }
};

const truncate = (s, max = 280) => {
  const t = s.replace(/\s+/g, " ").trim();
  return t.length > max ? t.slice(0, max - 1).trimEnd() + "…" : t;
};

// ─── Doctrine extraction ───────────────────────────────────────────────

/**
 * Extract H1 title, italic intro paragraph, and H2 list from a markdown file.
 * The italic intro is the first paragraph that starts with "*".
 */
function summariseDocFile(path) {
  const src = safeRead(path);
  if (!src) return null;

  const lines = src.split("\n");
  let title = null;
  let intro = null;
  const sections = [];

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim();
    if (!title && l.startsWith("# ")) {
      title = l.replace(/^#\s+/, "");
      continue;
    }
    if (title && !intro) {
      if (l.startsWith("*") && l.endsWith("*") && l.length > 2) {
        intro = l.replace(/^\*+|\*+$/g, "");
      } else if (l.startsWith("*") && !l.endsWith("*")) {
        const collected = [l];
        for (let j = i + 1; j < lines.length; j++) {
          collected.push(lines[j].trim());
          if (lines[j].trim().endsWith("*")) break;
        }
        intro = collected.join(" ").replace(/^\*+|\*+$/g, "").replace(/\s+/g, " ");
      }
    }
    if (l.startsWith("## ")) {
      sections.push(l.replace(/^##\s+/, ""));
    }
  }

  return { path, title, intro, sections };
}

function listDocParts() {
  const files = safeListDir(DOCS)
    .filter((f) => f.match(/^(00-|part-)/) && f.endsWith(".md"))
    .sort((a, b) => {
      // Numeric-ish ordering: 00-* first, then part-1, part-2, ..., part-3a, part-3b, ...
      const an = a.match(/^part-(\d+)([a-z]?)/);
      const bn = b.match(/^part-(\d+)([a-z]?)/);
      if (!an && !bn) return a.localeCompare(b);
      if (!an) return -1;
      if (!bn) return 1;
      const ai = parseInt(an[1], 10);
      const bi = parseInt(bn[1], 10);
      if (ai !== bi) return ai - bi;
      return (an[2] || "").localeCompare(bn[2] || "");
    });
  return files.map((f) => join(DOCS, f));
}

// ─── Token summarisation ───────────────────────────────────────────────

/**
 * Recursively walk a DTCG token tree; emit `{path, value, type}` records,
 * skipping `$schema`, `$description`, `$extensions` etc.
 */
function flattenTokens(obj, prefix = "") {
  const out = [];
  if (!obj || typeof obj !== "object") return out;
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith("$")) continue;
    if (v && typeof v === "object") {
      if ("$value" in v) {
        out.push({
          path: prefix ? `${prefix}.${k}` : k,
          value: v.$value,
          type: v.$type ?? null,
        });
      } else {
        out.push(...flattenTokens(v, prefix ? `${prefix}.${k}` : k));
      }
    }
  }
  return out;
}

function summariseTokens() {
  const files = safeListDir(TOKENS).filter((f) => f.endsWith(".tokens.json")).sort();
  return files.map((f) => {
    const data = safeReadJSON(join(TOKENS, f));
    if (!data) return { file: f, schema: null, description: null, tokens: [] };
    return {
      file: f,
      schema: data.$schema ?? null,
      description: data.$description ?? null,
      tokens: flattenTokens(data),
    };
  });
}

// ─── Doctrine hash (cache busting) ─────────────────────────────────────

function hashDoctrine() {
  const h = createHash("sha256");
  const inputs = [
    ...safeListDir(DOCS).filter((f) => /^(00-|part-).*\.md$/.test(f)).sort().map((f) => join(DOCS, f)),
    ...safeListDir(TOKENS).filter((f) => f.endsWith(".tokens.json")).sort().map((f) => join(TOKENS, f)),
  ];
  for (const p of inputs) {
    const s = safeRead(p);
    if (s) h.update(s).update("\n--FILE-BOUNDARY--\n");
  }
  return h.digest("hex").slice(0, 16);
}

// ─── Render ────────────────────────────────────────────────────────────

function renderTokenSection(tokens) {
  if (!tokens.length) return "_(no tokens loaded)_";
  const lines = [];
  for (const f of tokens) {
    const family = f.file.replace(/\.tokens\.json$/, "");
    lines.push(`### \`${family}\``);
    if (f.description) lines.push(`> ${f.description}`);
    lines.push("");
    if (!f.tokens.length) {
      lines.push("_(no $value-bearing tokens found)_");
      lines.push("");
      continue;
    }
    lines.push("```");
    let lastTopGroup = null;
    for (const t of f.tokens) {
      const top = t.path.split(".")[0];
      if (top !== lastTopGroup) {
        if (lastTopGroup !== null) lines.push("");
        lastTopGroup = top;
      }
      const v = typeof t.value === "string" ? t.value : JSON.stringify(t.value);
      lines.push(`${t.path.padEnd(40)} ${v}${t.type ? "  (" + t.type + ")" : ""}`);
    }
    lines.push("```");
    lines.push("");
  }
  return lines.join("\n");
}

function renderDocSection(parts) {
  const lines = [];
  for (const p of parts) {
    if (!p) continue;
    const file = basename(p.path);
    lines.push(`### ${p.title || file}`);
    lines.push(`Source: \`docs/${file}\``);
    if (p.intro) lines.push(`> ${truncate(p.intro, 360)}`);
    if (p.sections?.length) {
      lines.push("");
      lines.push("Sections:");
      for (const s of p.sections.slice(0, 14)) lines.push(`  - ${s}`);
      if (p.sections.length > 14) lines.push(`  - …and ${p.sections.length - 14} more`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

// ─── Hard-coded rules block ────────────────────────────────────────────
// Mirrors §13.2 / §13.3 of 00-audit-and-roadmap.md so downstream agents
// see them without having to fetch the full operating guide.

const RULES_BLOCK = `## Rules for AI agents

### Hard constraints — never do these

1. **Never modify the brand anchors.** Umber, Ochre, slogan ("Hiện Thực Hoá Ý Chí" / "Turn Your Will Into Real"), fonts. These are immutable per Part 1 §2.
2. **Never delete or renumber doctrine parts.** Part numbers 1–20 are stable identifiers; cross-references depend on them.
3. **Never silently translate customer-facing or legal-binding text.** All translation goes through Part 5 §7 with a named human reviewer.
4. **Never invent regulatory citations.** Cite verified statutes only; mark uncertainty as "TBD — needs legal review".
5. **Never modify the Vietnamese-first commitment.** Every UI string ships a VN counterpart or an explicit deferral note.
6. **Never bypass the change pipeline.** Even editorial fixes go through PR review per the doctrine's change protocol.
7. **Never produce content violating voice principles or banned phrases.** See Part 1 §3 (voice) + Part 14 §2.3 (banned phrases) + Part 1 §16 (anti-patterns).
8. **Never fabricate test results, telemetry data, adoption metrics, or audit scores.** Cite or refuse.
9. **Never hand-edit the generated DESIGN.md file.** Edit the source doctrine and re-generate.

### Soft constraints — strong defaults

1. Match the existing voice: warm / direct / honest / respectful (Part 1 §3).
2. Match the structure of the part being modified.
3. Use canonical phrases per Part 14 §2.6 glossary.
4. Cross-reference, don't duplicate.
5. **Carry tokens, not literals.** Use \`space.4\` not \`16px\`; \`color.semantic.danger\` not \`#B33B19\`; \`motion.duration.standard\` not \`250ms\`.
6. Carry MessageFormat 2.0 for new microcopy keys.
7. When uncertain, flag and ask. Never round up audit scores. Never guess at citations.

### Authorisation tiers

- **A0 — Read-only** (default): read, quote, regenerate this file, draft an audit (Draft status only).
- **A1 — Editorial proposal**: typo / link / formatting fixes via PR (chair owner reviews, 5-day window).
- **A2 — Substantive proposal**: new sections / expansions per the change-pipeline menu (full RFC).
- **A3 — Autonomous merge**: not currently granted to any agent.

### Audit invocation

To run an audit, follow the runbook in the audit framework (see Part *Audit & Roadmap*). The output is a single \`audit-report-{date}.md\` file. The audit flow is **SCAN → human pause → FIX → verify → re-audit**; each session must upgrade, never downgrade, the system.`;

// ─── Build the full DESIGN.md ──────────────────────────────────────────

function build() {
  const generatedAt = new Date().toISOString();
  const docHash = hashDoctrine();
  const parts = listDocParts().map(summariseDocFile).filter(Boolean);
  const tokens = summariseTokens();

  const indexPart = parts.find((p) => basename(p.path) === "00-index.md");
  const auditPart = parts.find((p) => basename(p.path) === "00-audit-and-roadmap.md");
  const numberedParts = parts.filter((p) => /^part-/.test(basename(p.path)));

  const md = `<!--
DO NOT EDIT THIS FILE BY HAND.

This file is auto-generated from the 20 doctrine parts (\`docs/00-*.md\` + \`docs/part-*.md\`)
and the DTCG token sources (\`tokens/*.tokens.json\`). It is the standalone, portable
briefing for AI agents using the CyberSkill design system in any project.

To regenerate: \`pnpm build:design-md\` (or \`node scripts/build-design-md.mjs\`).

Spec: docs/00-audit-and-roadmap.md §11.
-->

# DESIGN.md — CyberSkill Design System rules for AI agents

> Standalone briefing. When this file contradicts an agent's training data, **this file wins**.

| Field | Value |
|---|---|
| Generated at | \`${generatedAt}\` |
| Doctrine hash | \`${docHash}\` |
| Source | 20 doctrine parts + DTCG token sources |
| Slogan | Hiện Thực Hoá Ý Chí / Turn Your Will Into Real |

This file is the at-a-glance rules briefing for AI coding and design agents (Cursor, Claude Code, GitHub Copilot, Cline, Aider, custom MCP agents). It is **self-contained** — drop it into any project that uses the CyberSkill design system, and the agent will have everything it needs without reaching back into this repo.

For substantive work — drafting RFCs, auditing the doctrine, extending a part — read the full part being modified plus every part it cross-references.

---

${RULES_BLOCK}

---

## Master index

${indexPart ? `> ${truncate(indexPart.intro || "", 360)}` : "_(00-index.md not found)_"}

${indexPart?.sections?.length ? "Sections:\n" + indexPart.sections.slice(0, 14).map((s) => `  - ${s}`).join("\n") : ""}

---

## Audit framework summary

${auditPart ? `> ${truncate(auditPart.intro || "", 360)}\n\nKey sections:\n${auditPart.sections.slice(0, 16).map((s) => `  - ${s}`).join("\n")}` : "_(00-audit-and-roadmap.md not found)_"}

---

## Design tokens

> Always reference tokens by name, never by literal value. \`color.semantic.danger\` not \`#B33B19\`. \`space.4\` not \`16px\`. \`motion.duration.standard\` not \`250ms\`.

${renderTokenSection(tokens)}

---

## Doctrine parts

${renderDocSection(numberedParts)}

---

## What to do when

| Situation | Read |
|---|---|
| Building a new component | Part 3a–3h (primitives) + Part 12 (advanced) + Part 17 (lifecycle) |
| Working on a token | Part 2 (Design Language) + the token tables above |
| Writing microcopy | Part 14 (Content Design) + Part 1 §3 (voice) + Part 14 §2.3 (banned phrases) |
| Adding accessibility behaviour | Part 5 (Accessibility, Inclusion, Localization) |
| Working on theming / white-label | Part 13 (Theming, White-Label, Embedding) |
| Building an AI feature | Part 6 (AI Ethics) + Part 9 (Prompt Library) + Part 3h (AI/Chat) |
| Designing a vertical-pack surface | Part 19 (Vertical Packs) + the relevant pack section |
| Filing a doctrine RFC | Audit framework §12 + Part 8 §16 (RFC subtypes) |
| Running an audit | Audit framework §4 (playbook) + §10 (AI runbook) |
| Translating to Vietnamese | Part 5 §7 + Part 14 §9 |

---

## Brand anchors (immutable — never change)

These are pulled from Part 1 §2. Any change requires an A2 RFC AND a co-signature from the brand owner.

| Anchor | Value |
|---|---|
| Slogan | Hiện Thực Hoá Ý Chí (VN) / Turn Your Will Into Real (EN) |
| Primary brand colour | Umber |
| Secondary / accent | Ochre |
| Voice axes | warm · direct · honest · respectful |
| Typography family policy | system-stack-first; variable axes annotated in tokens |

If an agent is asked to change any of these, it must refuse and surface the request as an A2 RFC requirement.

---

## Provenance

- **Generator:** \`scripts/build-design-md.mjs\` (zero-dep Node ESM).
- **Inputs:** \`docs/00-*.md\` + \`docs/part-*.md\` + \`tokens/*.tokens.json\` only. No project-specific config (package.json, Storybook, src/, packages/) is read — the doctrine alone is canonical.
- **Doctrine hash:** \`${docHash}\` — recompute by re-running the generator; if the hash differs from the one above, the file is stale.

---

*Generated from doctrine hash \`${docHash}\` at ${generatedAt}.*
*Hiện Thực Hoá Ý Chí.*
`;

  return md;
}

// ─── Main ──────────────────────────────────────────────────────────────

function main() {
  const md = build();

  if (DRY_RUN) {
    process.stdout.write(md);
    return;
  }

  if (CHECK) {
    const existing = safeRead(OUT);
    if (existing == null) {
      console.error("[build-design-md] DESIGN.md does not exist; run without --check to create it.");
      process.exit(1);
    }
    // Strip volatile timestamp lines before comparing
    const strip = (s) => s
      .replace(/Generated at \| `[^`]+`/g, "Generated at | `<ts>`")
      .replace(/from doctrine hash `[^`]+` at [^*]+/g, "from doctrine hash `<hash>` at <ts>")
      .replace(/Generated from doctrine hash `[^`]+` at [^*]+/g, "Generated from doctrine hash `<hash>` at <ts>");
    if (strip(existing).trim() === strip(md).trim()) {
      console.log("[build-design-md] DESIGN.md is up to date.");
      return;
    }
    console.error("[build-design-md] DESIGN.md is stale. Run `pnpm build:design-md` to regenerate.");
    process.exit(1);
  }

  writeFileSync(OUT, md, "utf8");
  const rel = relative(process.cwd(), OUT);
  console.log(`[build-design-md] Wrote ${rel} (${md.length.toLocaleString()} chars).`);
}

try {
  main();
} catch (err) {
  console.error("[build-design-md] Error:", err);
  process.exit(1);
}
