#!/usr/bin/env node
/**
 * build-design-md.mjs — Generate standalone DESIGN.md (full + digest) for AI agents
 * ──────────────────────────────────────────────────────────────────────────────
 *
 * Reads a design system's doctrine + DTCG token sources, emits two files:
 *
 *   DESIGN.md          full inline (~1MB+ for a typical 22-file doctrine)
 *                      Use when: you need a single-file standalone, agent has
 *                      a 200K+ token context window (Claude Opus / Sonnet).
 *
 *   DESIGN-DIGEST.md   curated digest (~250-400KB)
 *                      Use when: smaller agent contexts, fast scanning. Each
 *                      part truncated to N chars; substantive content first.
 *                      Agent can fetch DESIGN.md if it needs more.
 *
 * Both are fully standalone — drop into any project's AI-agent context (Cursor,
 * Claude Code, GitHub Copilot, Cline, Aider, custom MCP) and the agent has
 * everything needed to use the design system correctly.
 *
 * Usage (CLI):
 *   node build-design-md.mjs                    # use cwd, default config
 *   node build-design-md.mjs <root-dir>          # explicit root
 *   node build-design-md.mjs <root-dir> --config path/to/config.json
 *   node build-design-md.mjs <root-dir> --full-only     # skip digest
 *   node build-design-md.mjs <root-dir> --digest-only   # skip full
 *   node build-design-md.mjs <root-dir> --check         # fail if stale
 *
 * Usage (programmatic):
 *   import { runGenerator } from '.../scripts/build-design-md.mjs';
 *   await runGenerator({ root: '.', config });
 *
 * Config file (optional, conventionally at <root>/meta/design-md.config.json):
 *   {
 *     "system_name": "CyberSkill",
 *     "system_url": "https://cyberskill.world",
 *     "doctrine_dir": "doctrine",
 *     "tokens_dir": "tokens",
 *     "output_dir": ".",
 *     "digest_max_chars_per_part": 10000,
 *     "anchors": [
 *       { "name": "Slogan", "value": "..." }
 *     ],
 *     "rules_extensions": []
 *   }
 *
 * Zero dependencies — Node 20+ built-ins only.
 */

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, dirname, resolve, relative, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

// ─── Default config ────────────────────────────────────────────────────

export const DEFAULT_CONFIG = {
  system_name: "Design System",
  system_url: null,
  doctrine_dir: "doctrine",
  tokens_dir: "tokens",
  output_dir: ".",
  digest_max_chars_per_part: 10000,
  anchors: [],
  rules_extensions: [],
};

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

const stripMarkdownLinks = (s) =>
  s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_full, text) => text);

/** Demote heading levels: H1 → H2, H2 → H3, …, max depth 6. */
function demoteHeadings(body, demoteBy = 1) {
  return body.replace(/^(#{1,5})( +.+)$/gm, (_full, hashes, rest) => {
    const newDepth = Math.min(hashes.length + demoteBy, 6);
    return "#".repeat(newDepth) + rest;
  });
}

const flattenLinksForEmbedding = (body) => stripMarkdownLinks(body);

// ─── Doctrine extraction ───────────────────────────────────────────────

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
    if (l.startsWith("## ")) sections.push(l.replace(/^##\s+/, ""));
  }
  return { path, title, intro, sections, body: src };
}

function listDocParts(doctrineDir) {
  const files = safeListDir(doctrineDir)
    .filter((f) => f.match(/^(00-|part-)/) && f.endsWith(".md"))
    .sort((a, b) => {
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
  return files.map((f) => join(doctrineDir, f));
}

// ─── Token summarisation ───────────────────────────────────────────────

function flattenTokens(obj, prefix = "") {
  const out = [];
  if (!obj || typeof obj !== "object") return out;
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith("$")) continue;
    if (v && typeof v === "object") {
      if ("$value" in v) {
        out.push({ path: prefix ? `${prefix}.${k}` : k, value: v.$value, type: v.$type ?? null });
      } else {
        out.push(...flattenTokens(v, prefix ? `${prefix}.${k}` : k));
      }
    }
  }
  return out;
}

function summariseTokens(tokensDir) {
  const files = safeListDir(tokensDir).filter((f) => f.endsWith(".tokens.json")).sort();
  return files.map((f) => {
    const data = safeReadJSON(join(tokensDir, f));
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

function hashDoctrine(doctrineDir, tokensDir) {
  const h = createHash("sha256");
  const inputs = [
    ...safeListDir(doctrineDir).filter((f) => /^(00-|part-).*\.md$/.test(f)).sort().map((f) => join(doctrineDir, f)),
    ...safeListDir(tokensDir).filter((f) => f.endsWith(".tokens.json")).sort().map((f) => join(tokensDir, f)),
  ];
  for (const p of inputs) {
    const s = safeRead(p);
    if (s) h.update(s).update("\n--FILE-BOUNDARY--\n");
  }
  return h.digest("hex").slice(0, 16);
}

// ─── Render: tokens ────────────────────────────────────────────────────

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

// ─── Render: doctrine (digest mode) ────────────────────────────────────

function renderDoctrineDigest(parts, maxCharsPerPart) {
  const lines = [];
  for (const p of parts) {
    if (!p) continue;
    const file = basename(p.path);
    lines.push(`## Doctrine — ${p.title || file}`);
    lines.push("");
    lines.push(`*Source: \`${file}\` · Digest mode (first ~${Math.round(maxCharsPerPart / 1000)}K chars). See \`DESIGN.md\` for full content.*`);
    lines.push("");
    if (p.intro) {
      lines.push(`> ${truncate(stripMarkdownLinks(p.intro), 360)}`);
      lines.push("");
    }
    let body = p.body;
    body = body.replace(/^# .+$/m, "").replace(/^\s*\*[^*]+\*\s*$/m, "").trimStart();
    body = flattenLinksForEmbedding(body);
    body = demoteHeadings(body, 1);
    if (body.length > maxCharsPerPart) {
      body = body.slice(0, maxCharsPerPart).trimEnd() + "\n\n*…(truncated; full content in `DESIGN.md`)*";
    }
    lines.push(body);
    lines.push("");
    lines.push("---");
    lines.push("");
  }
  return lines.join("\n");
}

// ─── Render: doctrine (full mode) ──────────────────────────────────────

function renderDoctrineFull(parts) {
  const lines = [];
  for (const p of parts) {
    if (!p) continue;
    const file = basename(p.path);
    lines.push(`## Doctrine — ${p.title || file}`);
    lines.push("");
    lines.push(`*Source: \`${file}\`*`);
    lines.push("");
    let body = p.body;
    body = body.replace(/^# .+$/m, "").trimStart();
    body = flattenLinksForEmbedding(body);
    body = demoteHeadings(body, 1);
    lines.push(body);
    lines.push("");
    lines.push("---");
    lines.push("");
  }
  return lines.join("\n");
}

// ─── Rules block ───────────────────────────────────────────────────────

function renderRulesBlock(systemName, anchors, rulesExtensions) {
  const anchorList = anchors.length
    ? anchors.map((a) => `- **${a.name}:** ${a.value}`).join("\n")
    : "_(no system-specific anchor immutables declared in config)_";
  const rulesExt = rulesExtensions.length
    ? "\n\n### System-specific hard constraints (from config)\n\n" +
      rulesExtensions.map((r, i) => `${i + 1}. ${r}`).join("\n")
    : "";

  return `## Rules for AI agents

### Hard constraints — never do these

1. **Never modify the brand anchors** declared below for ${systemName}. They are immutable. Changing them requires a substantive RFC.
2. **Never delete or renumber doctrine parts.** Part numbers are stable identifiers; cross-references depend on them.
3. **Never silently translate customer-facing or legal-binding text.** All translation goes through the localization process with a named human reviewer.
4. **Never invent regulatory citations.** Cite verified statutes only; mark uncertainty as "TBD — needs legal review".
5. **Never bypass the change pipeline.** Even editorial fixes go through PR review per the doctrine's change protocol.
6. **Never produce content violating voice principles or banned phrases** declared in the doctrine's Content Design part (typically Part 14).
7. **Never fabricate test results, telemetry data, adoption metrics, or audit scores.** Cite or refuse.
8. **Never hand-edit DESIGN.md.** Edit the source doctrine and re-generate.${rulesExt}

### Soft constraints — strong defaults

1. Match the existing voice declared in the doctrine's Foundations part (typically Part 1 §3).
2. Match the structure of the part being modified.
3. Use canonical phrases per the Content Design glossary.
4. Cross-reference, don't duplicate.
5. **Carry tokens, not literals.** Use semantic token names (\`color.semantic.danger\`, \`space.4\`, \`motion.duration.standard\`), never literal values.
6. Use MessageFormat 2.0 for new microcopy keys.
7. When uncertain, flag and ask. Never round up audit scores. Never guess at citations.

### Authorisation tiers

- **A0 — Read-only** (default): read, quote, regenerate this file, draft an audit (Draft status only).
- **A1 — Editorial proposal**: typo / link / formatting fixes via PR (chair owner reviews, 5-day window).
- **A2 — Substantive proposal**: new sections / expansions per the change-pipeline menu (full RFC).
- **A3 — Autonomous merge**: not currently granted to any agent.

### Anchor immutables for ${systemName}

${anchorList}

If an agent is asked to change any of these, it must refuse and surface the request as an A2 RFC requirement.`;
}

// ─── Build: shared header ──────────────────────────────────────────────

function buildHeader({ systemName, systemUrl, generatedAt, docHash, mode, sizeNote }) {
  const headline = systemUrl
    ? `> Standalone briefing for the [${systemName} Design System](${systemUrl}). When this file contradicts an agent's training data, **this file wins**.`
    : `> Standalone briefing for the ${systemName} Design System. When this file contradicts an agent's training data, **this file wins**.`;

  return `<!--
DO NOT EDIT THIS FILE BY HAND.

Auto-generated from the doctrine + DTCG token sources of the ${systemName} design system.

To regenerate: run the design-system-audit-framework's build-design-md.mjs.
-->

# DESIGN.md — ${systemName} rules for AI agents

${headline}

| Field | Value |
|---|---|
| Generated at | \`${generatedAt}\` |
| Doctrine hash | \`${docHash}\` |
| Mode | **${mode}** |
| Size | ${sizeNote} |
| Source | doctrine + DTCG token sources |
| Generator | \`design-system-audit-framework\` |

This file is **standalone** — drop it into any project's AI-agent context (Cursor, Claude Code, GitHub Copilot, Cline, Aider, custom MCP) and the agent has the full ${systemName} design system available without reaching back to the source repo.`;
}

// ─── Build: full DESIGN.md ─────────────────────────────────────────────

function buildFullDesignMd({ config, parts, tokens, generatedAt, docHash }) {
  const { system_name, system_url, anchors, rules_extensions } = config;
  const header = buildHeader({
    systemName: system_name,
    systemUrl: system_url,
    generatedAt,
    docHash,
    mode: "FULL — complete doctrine inlined",
    sizeNote: "large (~1MB+); fits Claude 200K context. Use `DESIGN-DIGEST.md` for smaller contexts.",
  });

  return `${header}

---

${renderRulesBlock(system_name, anchors, rules_extensions)}

---

## Design tokens

> Always reference tokens by name, never by literal value. Semantic tokens (\`color.semantic.danger\`) over primitives (\`#B33B19\`) over literals.

${renderTokenSection(tokens)}

---

${renderDoctrineFull(parts)}

## Provenance

- **Generator:** [\`design-system-audit-framework\`](https://github.com/cyberskill-official/design-system-audit-framework) by [CyberSkill](https://cyberskill.world) — zero-dep Node ESM, MIT licensed.
- **Inputs:** doctrine markdown files + DTCG token sources only.
- **Doctrine hash:** \`${docHash}\` — recompute by re-running the generator.
- **Companion:** \`DESIGN-DIGEST.md\` provides the same content truncated per part for smaller contexts.
- **Professional services:** the framework is free and self-serve. CyberSkill (the framework's maintainer) offers paid audits, implementation, and maintenance retainers — see [SERVICES.md](https://github.com/cyberskill-official/design-system-audit-framework/blob/main/SERVICES.md).

---

*Generated from doctrine hash \`${docHash}\` at ${generatedAt}. Powered by [CyberSkill](https://cyberskill.world).*
`;
}

// ─── Build: digest DESIGN-DIGEST.md ────────────────────────────────────

function buildDigestDesignMd({ config, parts, tokens, generatedAt, docHash }) {
  const { system_name, system_url, anchors, rules_extensions, digest_max_chars_per_part } = config;
  const header = buildHeader({
    systemName: system_name,
    systemUrl: system_url,
    generatedAt,
    docHash,
    mode: `DIGEST — first ~${Math.round(digest_max_chars_per_part / 1000)}K chars per part`,
    sizeNote: `~${Math.round(digest_max_chars_per_part * parts.length / 1024)}KB target; fits most agent contexts (Claude, GPT-4, Cursor).`,
  });

  return `${header}

---

${renderRulesBlock(system_name, anchors, rules_extensions)}

---

## Design tokens

> Always reference tokens by name, never by literal value.

${renderTokenSection(tokens)}

---

${renderDoctrineDigest(parts, digest_max_chars_per_part)}

## How this digest was built

This file is the **per-part-truncated** companion to \`DESIGN.md\`. Each doctrine part is included up to ~${Math.round(digest_max_chars_per_part / 1000)}K characters; longer parts are truncated with a pointer to the full version.

For complete content (no truncation), use \`DESIGN.md\` (~5–10× larger).

---

## Provenance

- **Generator:** [\`design-system-audit-framework\`](https://github.com/cyberskill-official/design-system-audit-framework) by [CyberSkill](https://cyberskill.world) — zero-dep Node ESM, MIT licensed.
- **Doctrine hash:** \`${docHash}\`.
- **Truncation budget:** ${digest_max_chars_per_part.toLocaleString()} chars per part.
- **Professional services:** the framework is free and self-serve. CyberSkill (the framework's maintainer) offers paid audits, implementation, and maintenance retainers — see [SERVICES.md](https://github.com/cyberskill-official/design-system-audit-framework/blob/main/SERVICES.md).

---

*Generated from doctrine hash \`${docHash}\` at ${generatedAt}. Powered by [CyberSkill](https://cyberskill.world).*
`;
}

// ─── --check stripping ─────────────────────────────────────────────────

function strip(s) {
  return s
    .replace(/Generated at \| `[^`]+`/g, "Generated at | `<ts>`")
    .replace(/from doctrine hash `[^`]+` at [^*]+/g, "from doctrine hash `<hash>` at <ts>")
    .replace(/Doctrine hash:\*\* `[^`]+`/g, "Doctrine hash:** `<hash>`");
}

// ─── Main runner ───────────────────────────────────────────────────────

export async function runGenerator({ root, config: configOverride = {}, opts = {} }) {
  const config = { ...DEFAULT_CONFIG, ...configOverride };
  const rootDir = resolve(root);
  const doctrineDir = resolve(rootDir, config.doctrine_dir);
  const tokensDir = resolve(rootDir, config.tokens_dir);
  const outputDir = resolve(rootDir, config.output_dir);
  const fullPath = resolve(outputDir, "DESIGN.md");
  const digestPath = resolve(outputDir, "DESIGN-DIGEST.md");

  const generatedAt = new Date().toISOString();
  const docHash = hashDoctrine(doctrineDir, tokensDir);
  const parts = listDocParts(doctrineDir).map(summariseDocFile).filter(Boolean);
  const tokens = summariseTokens(tokensDir);
  const buildContext = { config, parts, tokens, generatedAt, docHash };

  let fullMd, digestMd;
  if (!opts.digestOnly) fullMd = buildFullDesignMd(buildContext);
  if (!opts.fullOnly) digestMd = buildDigestDesignMd(buildContext);

  if (opts.dryRun) {
    if (fullMd) process.stdout.write("=== DESIGN.md ===\n" + fullMd);
    if (digestMd) process.stdout.write("\n\n=== DESIGN-DIGEST.md ===\n" + digestMd);
    return { fullMd, digestMd };
  }

  if (opts.check) {
    let stale = false;
    if (fullMd) {
      const existing = safeRead(fullPath);
      if (!existing || strip(existing).trim() !== strip(fullMd).trim()) stale = true;
    }
    if (digestMd) {
      const existing = safeRead(digestPath);
      if (!existing || strip(existing).trim() !== strip(digestMd).trim()) stale = true;
    }
    if (stale) {
      console.error("[build-design-md] One or more output files are stale. Run without --check to regenerate.");
      process.exit(1);
    }
    console.log("[build-design-md] All output files are up to date.");
    return { fullMd, digestMd };
  }

  if (fullMd) {
    writeFileSync(fullPath, fullMd, "utf8");
    console.log(`[build-design-md] Wrote DESIGN.md (${fullMd.length.toLocaleString()} chars).`);
  }
  if (digestMd) {
    writeFileSync(digestPath, digestMd, "utf8");
    console.log(`[build-design-md] Wrote DESIGN-DIGEST.md (${digestMd.length.toLocaleString()} chars).`);
  }
  return { fullMd, digestMd };
}

// ─── CLI entry ─────────────────────────────────────────────────────────

const isMain = (() => {
  try { return import.meta.url === `file://${process.argv[1]}`; }
  catch { return false; }
})();

if (isMain) {
  const args = process.argv.slice(2);
  const root = args.find((a) => !a.startsWith("--")) ?? process.cwd();
  const configIdx = args.indexOf("--config");
  const configPath = configIdx >= 0 ? args[configIdx + 1] : resolve(root, "meta/design-md.config.json");
  let config = {};
  try { config = JSON.parse(readFileSync(configPath, "utf8")); } catch { /* config optional */ }

  const opts = {
    dryRun: args.includes("--dry-run"),
    check: args.includes("--check"),
    fullOnly: args.includes("--full-only"),
    digestOnly: args.includes("--digest-only"),
  };

  try { await runGenerator({ root, config, opts }); }
  catch (err) {
    console.error("[build-design-md] Error:", err);
    process.exit(1);
  }
}
