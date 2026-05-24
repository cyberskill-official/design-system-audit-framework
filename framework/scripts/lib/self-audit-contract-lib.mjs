import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const ROOT = resolve(__dirname, '../../..');
export const PAYLOAD_PATH = resolve(ROOT, "internal/branding/FR-CORE-004-self-audit-contract.json");
export const AUDIT_OUTPUT = resolve(ROOT, "outputs/_audit/self-audit-cap-contract.json");

export function loadSelfAuditPayload(path = PAYLOAD_PATH) {
  return JSON.parse(readFileSync(path, "utf8"));
}

export function makeResult(condition, ruleId, file, observed, expected) {
  return {
    rule_id: ruleId,
    file,
    status: condition ? "pass" : "fail",
    observed,
    expected,
  };
}

export function walkPublicFiles(root, payload) {
  const exts = new Set(payload.scan.extensions);
  const out = [];
  function walk(abs) {
    if (!existsSync(abs)) return;
    const rel = relative(root, abs);
    if (payload.scan.exclude_path_contains.some((part) => rel.includes(part))) return;
    const stat = statSync(abs);
    if (stat.isDirectory()) {
      for (const entry of readdirSync(abs)) {
        if (entry.startsWith(".") || entry === "node_modules" || entry === "dist") continue;
        walk(join(abs, entry));
      }
    }
    else if (exts.has(extname(abs))) out.push(abs);
  }
  for (const item of payload.scan.roots) walk(resolve(root, item));
  return [...new Set(out)].sort();
}

export function countPattern(text, pattern) {
  return [...text.matchAll(new RegExp(pattern, "gi"))].length;
}

export function evaluateSelfAuditContract(payload, root = ROOT) {
  const results = [];
  const policy = readFileSync(resolve(root, payload.policy_file), "utf8");
  results.push(makeResult(policy.includes("No third-party verification") && policy.includes("L3"), "policy-cap-table", payload.policy_file, "cap table", "L3 without third-party verification"));
  results.push(makeResult(policy.includes("Combined percentages may appear inside audit data tables"), "policy-combined-ban", payload.policy_file, "combined percentage rule", "interior-only combined percentage"));

  for (const [file, requiredStrings] of Object.entries(payload.required_public_files)) {
    const text = readFileSync(resolve(root, file), "utf8");
    for (const required of requiredStrings) {
      results.push(makeResult(text.includes(required), "required-public-framing", file, required, "present"));
    }
  }

  const files = walkPublicFiles(root, payload);
  for (const file of files) {
    const rel = relative(root, file);
    const text = readFileSync(file, "utf8");
    for (const pattern of payload.forbidden_public_patterns) {
      const count = countPattern(text, pattern);
      results.push(makeResult(count === 0, "forbidden-public-claim", rel, { pattern, count }, 0));
    }
  }

  const interior = readFileSync(resolve(root, payload.interior_audit_file), "utf8");
  for (const required of payload.interior_must_preserve) {
    results.push(makeResult(interior.includes(required), "interior-preserved", payload.interior_audit_file, required, "present"));
  }

  return {
    files: files.map((file) => relative(root, file)),
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
    fail: counts.fail || 0,
    ok: !counts.fail,
  };
}

export function writeSelfAuditEvidence(payload, evaluation, outputPath = AUDIT_OUTPUT) {
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
