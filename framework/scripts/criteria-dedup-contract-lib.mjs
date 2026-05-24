import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const ROOT = resolve(__dirname, '../..');
export const PAYLOAD_PATH = resolve(ROOT, "framework/core/FR-CORE-003-dedup-contract.json");
export const AUDIT_OUTPUT = resolve(ROOT, "outputs/_audit/criteria-dedup-contract.json");

export function loadCriteriaDedupPayload(path = PAYLOAD_PATH) {
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

export function stripMarkdown(value) {
  return value.replace(/\*\*/g, "").replace(/`([^`]+)`/g, "$1").trim();
}

export function splitMarkdownRow(line) {
  return line.split("|").slice(1, -1).map((cell) => cell.trim());
}

export function criterionPrefix(id) {
  const match = id.match(/^([AB]\d+)\./);
  return match ? match[1] : "";
}

export function criterionPart(id) {
  return id.slice(0, 1);
}

export function parseCriterionRows(text) {
  const rows = [];
  for (const line of text.split(/\r?\n/)) {
    if (!/^\|\s*[AB]\d+\.\d+\s*\|/.test(line)) continue;
    const cells = splitMarkdownRow(line);
    if (cells.length < 3) continue;
    rows.push({
      id: cells[0],
      name: stripMarkdown(cells[1]),
      tag: stripMarkdown(cells[2]),
      prefix: criterionPrefix(cells[0]),
    });
  }
  return rows;
}

export function parseAliasRows(text) {
  const rows = [];
  for (const line of text.split(/\r?\n/)) {
    if (!/^\|\s*[AB]\d+\.\d+\s*\|/.test(line)) continue;
    const cells = splitMarkdownRow(line);
    if (cells.length < 4) continue;
    rows.push({
      merged_away_id: cells[0],
      primary_id: cells[1],
      merged_date: cells[2],
      rationale: cells[3],
    });
  }
  return rows;
}

export function parseCoreIds(text) {
  return text
    .split(/\r?\n/)
    .filter((line) => /^\|\s*\d+\s*\|\s*[AB]\d+\.\d+\s*\|/.test(line))
    .map((line) => splitMarkdownRow(line)[1]);
}

export function countId(text, id) {
  const escaped = id.replace(".", "\\.");
  return [...text.matchAll(new RegExp(`\\b${escaped}\\b`, "g"))].length;
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

function read(root, relPath) {
  const abs = resolve(root, relPath);
  return existsSync(abs) ? readFileSync(abs, "utf8") : "";
}

export function evaluateCriteriaDedupContract(payload, root = ROOT) {
  const results = [];
  for (const [key, relPath] of Object.entries(payload.files)) {
    results.push(makeResult(existsSync(resolve(root, relPath)), "artifact-exists", relPath, key, "file exists"));
  }

  const partA = parseCriterionRows(read(root, payload.files.part_a));
  const partB = parseCriterionRows(read(root, payload.files.part_b));
  const liveRows = [...partA, ...partB];
  const liveIds = new Set(liveRows.map((row) => row.id));
  const aliases = parseAliasRows(read(root, payload.files.aliases));
  const aliasIds = new Set(aliases.map((row) => row.merged_away_id));
  const primaryIds = new Set(aliases.map((row) => row.primary_id));

  results.push(makeResult(liveRows.length === payload.expected_counts.total, "criteria-count-total", "framework/03-criteria-part-a.md + framework/04-criteria-part-b.md", liveRows.length, payload.expected_counts.total));
  results.push(makeResult(partA.length === payload.expected_counts.part_a, "criteria-count-part-a", payload.files.part_a, partA.length, payload.expected_counts.part_a));
  results.push(makeResult(partB.length === payload.expected_counts.part_b, "criteria-count-part-b", payload.files.part_b, partB.length, payload.expected_counts.part_b));
  results.push(makeResult(aliases.length === payload.expected_counts.aliases, "alias-count", payload.files.aliases, aliases.length, payload.expected_counts.aliases));
  results.push(makeResult(new Set(liveRows.map((row) => row.id)).size === liveRows.length, "live-id-unique", "criteria", liveRows.map((row) => row.id), "unique"));
  results.push(makeResult(aliasIds.size === aliases.length, "alias-id-unique", payload.files.aliases, aliases.map((row) => row.merged_away_id), "unique"));

  const prefixes = new Set(liveRows.map((row) => row.prefix));
  for (const prefix of payload.required_category_prefixes) {
    results.push(makeResult(prefixes.has(prefix), "category-retained", "criteria", prefix, "present"));
  }

  for (const expected of payload.expected_aliases) {
    const found = aliases.some((row) => row.merged_away_id === expected.merged_away_id && row.primary_id === expected.primary_id);
    results.push(makeResult(found, "expected-alias-present", payload.files.aliases, expected, "present"));
  }

  for (const alias of aliases) {
    results.push(makeResult(!liveIds.has(alias.merged_away_id), "alias-not-live", payload.files.aliases, alias.merged_away_id, "absent from live criteria"));
    results.push(makeResult(liveIds.has(alias.primary_id), "alias-primary-live", payload.files.aliases, alias.primary_id, "primary exists"));
    results.push(makeResult(!aliasIds.has(alias.primary_id), "alias-no-chain", payload.files.aliases, alias, "primary is not another alias"));
    results.push(makeResult(criterionPart(alias.merged_away_id) === criterionPart(alias.primary_id), "alias-same-part", payload.files.aliases, alias, "same Part A/B"));
    results.push(makeResult(Boolean(alias.merged_date) && Boolean(alias.rationale), "alias-row-complete", payload.files.aliases, alias, "date and rationale present"));
  }

  const coreIds = parseCoreIds(read(root, payload.files.dsaf_25));
  for (const id of coreIds) {
    results.push(makeResult(liveIds.has(id), "core-id-live", payload.files.dsaf_25, id, "live primary criterion"));
    results.push(makeResult(!aliasIds.has(id), "core-id-not-alias", payload.files.dsaf_25, id, "not alias"));
  }

  for (const surface of payload.alias_forbidden_surfaces) {
    const text = read(root, surface);
    for (const alias of aliases) {
      const count = countId(text, alias.merged_away_id);
      results.push(makeResult(count === 0, "alias-forbidden-surface", surface, { id: alias.merged_away_id, count }, 0));
    }
  }

  for (const [relPath, requiredStrings] of Object.entries(payload.required_strings)) {
    const text = read(root, relPath);
    for (const required of requiredStrings) {
      results.push(makeResult(text.includes(required), "required-string", relPath, required, "present"));
    }
  }

  const packageJson = JSON.parse(read(root, payload.files.package_json) || "{}");
  for (const scriptName of payload.required_package_scripts) {
    results.push(makeResult(Boolean(packageJson.scripts?.[scriptName]), "package-script", payload.files.package_json, scriptName, "present"));
  }

  return {
    criteria: liveRows.map((row) => row.id),
    aliases,
    results,
  };
}

export function writeCriteriaDedupEvidence(payload, evaluation, outputPath = AUDIT_OUTPUT) {
  const audit = {
    generated: new Date().toISOString(),
    fr_id: payload.fr_id,
    criteria_count: evaluation.criteria.length,
    aliases: evaluation.aliases,
    summary: summarize(evaluation.results),
    results: evaluation.results,
  };
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, JSON.stringify(audit, null, 2) + "\n");
  return audit;
}
