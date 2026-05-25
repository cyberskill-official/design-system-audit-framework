import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const ROOT = resolve(__dirname, '../..');
export const PAYLOAD_PATH = resolve(ROOT, "docs/framework/core/FR-CORE-002-regression-contract.json");
export const AUDIT_OUTPUT = resolve(ROOT, "docs/outputs/_audit/no-silent-regression-contract.json");

export function loadRegressionPayload(path = PAYLOAD_PATH) {
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

export function walkPolicyFiles(root, payload) {
  const out = [];
  const exts = new Set(payload.scan.extensions);
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

export function validateOverrideCase(item, payload) {
  const reasons = [];
  const delta = item.pre_score - item.post_score;
  if (!payload.allowed_causes.includes(item.cause)) reasons.push("invalid-cause");
  if (!payload.allowed_tags.includes(item.regression_tag)) reasons.push("invalid-tag");
  if (!(delta > 0)) reasons.push("not-a-regression");
  if (!item.notes) reasons.push("missing-notes");
  if (item.cause === "rubric-tightened") {
    if (item.criterion_tag !== "DYNAMIC") reasons.push("fixed-rubric-tightened");
    if (item.regression_tag !== "D-RT") reasons.push("wrong-drt-tag");
    if (item.approver !== null) reasons.push("drt-approver-present");
  }
  else {
    if (payload.override_tag_map[item.cause] !== item.regression_tag) reasons.push("wrong-override-tag");
    if (!item.approver) reasons.push("missing-approver");
  }
  return {
    valid: reasons.length === 0,
    reasons,
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

export function evaluateRegressionContract(payload, root = ROOT) {
  const results = [];
  for (const [key, relPath] of Object.entries(payload.files)) {
    results.push(makeResult(existsSync(resolve(root, relPath)), "artifact-exists", relPath, key, "file exists"));
  }

  for (const [relPath, requiredStrings] of Object.entries(payload.required_strings)) {
    const abs = resolve(root, relPath);
    const text = existsSync(abs) ? readFileSync(abs, "utf8") : "";
    for (const required of requiredStrings) {
      results.push(makeResult(text.includes(required), "required-string", relPath, required, "present"));
    }
  }

  const packageText = existsSync(resolve(root, payload.files.package_json)) ? readFileSync(resolve(root, payload.files.package_json), "utf8") : "{}";
  const packageJson = JSON.parse(packageText);
  for (const scriptName of payload.required_package_scripts) {
    results.push(makeResult(Boolean(packageJson.scripts?.[scriptName]), "package-script", payload.files.package_json, scriptName, "present"));
  }

  const files = walkPolicyFiles(root, payload);
  for (const file of files) {
    const rel = relative(root, file);
    const text = readFileSync(file, "utf8");
    for (const legacy of payload.legacy_terms) {
      if (legacy.allowed_files.includes(rel)) continue;
      const count = countPattern(text, legacy.pattern);
      results.push(makeResult(count === 0, "legacy-term-absent", rel, { pattern: legacy.pattern, count }, 0));
    }
  }

  const policyText = existsSync(resolve(root, payload.files.policy)) ? readFileSync(resolve(root, payload.files.policy), "utf8") : "";
  for (const cause of payload.allowed_causes) {
    results.push(makeResult(policyText.includes(`\`${cause}\``), "cause-defined", payload.files.policy, cause, "present"));
  }
  for (const tag of payload.allowed_tags.filter((tag) => tag !== "null")) {
    results.push(makeResult(policyText.includes(`\`${tag}\``), "tag-defined", payload.files.policy, tag, "present"));
  }
  results.push(makeResult(!policyText.includes("OVRD-RT"), "no-ovrd-rt-tag", payload.files.policy, "OVRD-RT", "absent"));

  for (const item of payload.sample_override_cases) {
    const validation = validateOverrideCase(item, payload);
    results.push(makeResult(validation.valid, "sample-override-valid", payload.files.policy, { criterion_id: item.criterion_id, reasons: validation.reasons }, "valid override shape"));
  }

  return {
    files: files.map((file) => relative(root, file)),
    results,
  };
}

export function writeRegressionEvidence(payload, evaluation, outputPath = AUDIT_OUTPUT) {
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
