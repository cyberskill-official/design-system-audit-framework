import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const ROOT = resolve(__dirname, '../../..');
export const PAYLOAD_PATH = resolve(ROOT, "internal/branding/FR-BRAND-002-taxonomy-contract.json");
export const AUDIT_OUTPUT = resolve(ROOT, "outputs/_audit/brand-taxonomy-contract.json");

export function loadTaxonomyPayload(path = PAYLOAD_PATH) {
  return JSON.parse(readFileSync(path, "utf8"));
}

export function walkFiles(root, payload) {
  const exts = new Set(payload.scan.extensions);
  const out = [];

  function walk(abs) {
    if (!existsSync(abs)) return;
    const stat = statSync(abs);
    const rel = relative(root, abs);
    if (payload.scan.exclude_path_contains.some((part) => rel.includes(part))) return;
    if (stat.isDirectory()) {
      for (const entry of readdirSync(abs)) {
        if (entry.startsWith(".") || entry === "node_modules" || entry === "dist") continue;
        walk(join(abs, entry));
      }
    }
    else if (exts.has(extname(abs))) {
      out.push(abs);
    }
  }

  for (const item of payload.scan.roots) walk(resolve(root, item));
  return [...new Set(out)].sort();
}

export function countMatches(text, pattern) {
  return [...text.matchAll(new RegExp(pattern, "g"))].length;
}

export function result(condition, ruleId, file, observed, expected, severity = "fail") {
  return {
    rule_id: ruleId,
    file,
    status: condition ? "pass" : severity,
    observed,
    expected,
  };
}

export function evaluateTaxonomy(payload, root = ROOT) {
  const results = [];
  const files = walkFiles(root, payload);
  const fileEntries = files.map((file) => [relative(root, file), readFileSync(file, "utf8")]);
  const requiredSources = payload.source_of_truth.map((file) => [file, readFileSync(resolve(root, file), "utf8")]);

  const readme = readFileSync(resolve(root, "README.md"), "utf8");
  results.push(result(readme.split(/\r?\n/)[0] === payload.required_readme_h1, "readme-h1", "README.md", readme.split(/\r?\n/)[0], payload.required_readme_h1));

  for (const [file, text] of requiredSources) {
    for (const term of payload.required_terms) {
      results.push(result(text.includes(term), "required-term", file, term, "present"));
    }
  }

  for (const [file, text] of fileEntries) {
    for (const pattern of payload.banned_patterns) {
      const count = countMatches(text, pattern);
      results.push(result(count === 0, "banned-pattern", file, { pattern, count }, 0));
    }
  }

  for (const [file, minimum] of Object.entries(payload.minimum_dsaf_mentions)) {
    const text = readFileSync(resolve(root, file), "utf8");
    const count = countMatches(text, "\\bDSAF\\b");
    results.push(result(count >= minimum, "minimum-dsaf-mentions", file, count, `>= ${minimum}`));
  }

  return {
    files: fileEntries.map(([file]) => file),
    results,
  };
}

export function summarize(results) {
  const counts = results.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});
  return {
    pass: counts.pass || 0,
    warn: counts.warn || 0,
    fail: counts.fail || 0,
    ok: !counts.fail,
  };
}

export function writeTaxonomyAudit(payload, evaluation, outputPath = AUDIT_OUTPUT) {
  const audit = {
    generated: new Date().toISOString(),
    fr_id: payload.fr_id,
    scanned_files: evaluation.files,
    summary: summarize(evaluation.results),
    results: evaluation.results,
  };
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, JSON.stringify(audit, null, 2) + "\n");
  return audit;
}
