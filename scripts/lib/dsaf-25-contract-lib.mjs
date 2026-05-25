import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const ROOT = resolve(__dirname, '../..');
export const PAYLOAD_PATH = resolve(ROOT, "docs/framework/core/FR-CORE-001-dsaf-25-contract.json");
export const AUDIT_OUTPUT = resolve(ROOT, "docs/outputs/_audit/dsaf-25-contract.json");

export function loadDsaf25Payload(path = PAYLOAD_PATH) {
  return JSON.parse(readFileSync(path, "utf8"));
}

export function makeResult(condition, ruleId, file, observed, expected, statusWhenTrue = "pass") {
  return {
    rule_id: ruleId,
    file,
    status: condition ? statusWhenTrue : "fail",
    observed,
    expected,
  };
}

export function stripMarkdown(value) {
  return value
    .replace(/\*\*/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/&amp;/g, "&")
    .trim();
}

export function normalizeText(value) {
  return stripMarkdown(value).replace(/\s+/g, " ").trim();
}

export function prefixForCriterion(id) {
  const match = id.match(/^([AB]\d+)\./);
  return match ? match[1] : "";
}

export function splitMarkdownRow(line) {
  return line.split("|").slice(1, -1).map((cell) => cell.trim());
}

export function parseCriterionRows(text) {
  const rows = [];
  for (const line of text.split(/\r?\n/)) {
    if (!/^\|\s*[AB]\d+\.\d+\s*\|/.test(line)) continue;
    const cells = splitMarkdownRow(line);
    if (cells.length < 3) continue;
    rows.push({
      id: cells[0],
      name: normalizeText(cells[1]),
      tag: normalizeText(cells[2]),
    });
  }
  return rows;
}

export function parseCoreRows(text) {
  const rows = [];
  for (const line of text.split(/\r?\n/)) {
    if (!/^\|\s*\d+\s*\|\s*[AB]\d+\.\d+\s*\|/.test(line)) continue;
    const cells = splitMarkdownRow(line);
    if (cells.length < 5) continue;
    rows.push({
      number: Number(cells[0]),
      id: cells[1],
      category: normalizeText(cells[2]),
      name: normalizeText(cells[3]),
      tag: normalizeText(cells[4]),
    });
  }
  return rows;
}

export function summarize(results) {
  const counts = results.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});
  return {
    pass: counts.pass || 0,
    mocked: counts.mocked || 0,
    fail: counts.fail || 0,
    ok: !counts.fail,
  };
}

function readRequired(root, relPath) {
  const abs = resolve(root, relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, "utf8");
}

function validateManualMock(payload) {
  const contract = payload.manual_validation_contract;
  const results = [];
  for (const request of contract.mock_requests) {
    const missing = contract.request_required_fields.filter((field) => !(field in request));
    results.push(makeResult(missing.length === 0, "mock-request-shape", contract.mock_endpoint, { trial_id: request.trial_id, missing }, "all required request fields", "mocked"));
    results.push(makeResult(contract.allowed_roles.includes(request.participant_role), "mock-request-role", contract.mock_endpoint, { trial_id: request.trial_id, role: request.participant_role }, contract.allowed_roles, "mocked"));
    results.push(makeResult(request.participant_relationship !== "founder", "mock-not-founder", contract.mock_endpoint, { trial_id: request.trial_id, participant_relationship: request.participant_relationship }, "non-founder participant", "mocked"));
    if (request.participant_role === "designer") {
      results.push(makeResult(request.elapsed_seconds <= 300, "mock-designer-five-minute-read", contract.mock_endpoint, { trial_id: request.trial_id, elapsed_seconds: request.elapsed_seconds }, "<= 300 seconds", "mocked"));
    }
    if (request.participant_role === "product_manager") {
      results.push(makeResult(request.elapsed_seconds >= 600 && request.elapsed_seconds <= 5400, "mock-pm-meeting-recall-window", contract.mock_endpoint, { trial_id: request.trial_id, elapsed_seconds: request.elapsed_seconds }, "10 to 90 minutes", "mocked"));
      results.push(makeResult(Boolean(request.criterion_recalled), "mock-pm-criterion-recalled", contract.mock_endpoint, { trial_id: request.trial_id, criterion_recalled: request.criterion_recalled }, "one recalled criterion", "mocked"));
    }
  }
  const responseMissing = contract.response_required_fields.filter((field) => !(field in contract.mock_response));
  results.push(makeResult(responseMissing.length === 0, "mock-response-shape", contract.mock_endpoint, { missing: responseMissing }, "all required response fields", "mocked"));
  results.push(makeResult(contract.mock_response.accepted === true, "mock-response-accepted", contract.mock_endpoint, contract.mock_response.accepted, true, "mocked"));
  return results;
}

export function evaluateDsaf25Contract(payload, root = ROOT) {
  const results = [];
  const coreText = readRequired(root, payload.files.core_doc);
  const cardText = readRequired(root, payload.files.card_doc);
  const partAText = readRequired(root, payload.files.part_a);
  const partBText = readRequired(root, payload.files.part_b);

  for (const [key, relPath] of Object.entries(payload.files)) {
    const abs = resolve(root, relPath);
    results.push(makeResult(existsSync(abs), "artifact-exists", relPath, key, "file exists"));
  }
  if (!coreText || !cardText || !partAText || !partBText) {
    return { core_rows: [], results };
  }

  const sourceRows = [...parseCriterionRows(partAText), ...parseCriterionRows(partBText)];
  const sourceById = new Map(sourceRows.map((row) => [row.id, row]));
  const coreRows = parseCoreRows(coreText);
  const coreIds = coreRows.map((row) => row.id);
  const uniqueIds = new Set(coreIds);
  const requiredIds = payload.required_core_ids;

  results.push(makeResult(coreRows.length === payload.expected_counts.total, "core-count", payload.files.core_doc, coreRows.length, payload.expected_counts.total));
  results.push(makeResult(uniqueIds.size === coreRows.length, "core-unique-ids", payload.files.core_doc, coreIds, "no duplicates"));
  results.push(makeResult(JSON.stringify(coreIds) === JSON.stringify(requiredIds), "core-required-order", payload.files.core_doc, coreIds, requiredIds));
  results.push(makeResult(coreRows.filter((row) => row.id.startsWith("A")).length === payload.expected_counts.part_a, "part-a-count", payload.files.core_doc, coreRows.filter((row) => row.id.startsWith("A")).length, payload.expected_counts.part_a));
  results.push(makeResult(coreRows.filter((row) => row.id.startsWith("B")).length === payload.expected_counts.part_b, "part-b-count", payload.files.core_doc, coreRows.filter((row) => row.id.startsWith("B")).length, payload.expected_counts.part_b));

  const prefixes = new Set(coreRows.map((row) => prefixForCriterion(row.id)));
  for (const prefix of payload.required_category_prefixes) {
    results.push(makeResult(prefixes.has(prefix), "category-covered", payload.files.core_doc, prefix, "present"));
  }

  for (const row of coreRows) {
    const source = sourceById.get(row.id);
    results.push(makeResult(Boolean(source), "source-id-exists", payload.files.core_doc, row.id, "source criterion exists"));
    if (source) {
      results.push(makeResult(row.name === source.name, "core-name-verbatim", payload.files.core_doc, { id: row.id, observed: row.name }, source.name));
      results.push(makeResult(row.tag === source.tag, "core-tag-verbatim", payload.files.core_doc, { id: row.id, observed: row.tag }, source.tag));
    }
  }

  for (const [relPath, requiredStrings] of Object.entries(payload.required_strings)) {
    const text = readRequired(root, relPath) || "";
    for (const required of requiredStrings) {
      results.push(makeResult(text.includes(required), "required-string", relPath, required, "present"));
    }
  }

  const packageText = readRequired(root, payload.files.package_json) || "{}";
  const packageJson = JSON.parse(packageText);
  for (const scriptName of payload.required_package_scripts) {
    results.push(makeResult(Boolean(packageJson.scripts?.[scriptName]), "package-script", payload.files.package_json, scriptName, "present"));
  }

  const svgText = readRequired(root, payload.files.svg) || "";
  const svgSize = existsSync(resolve(root, payload.files.svg)) ? statSync(resolve(root, payload.files.svg)).size : 0;
  results.push(makeResult(svgSize > 0 && svgSize <= payload.asset_contract.max_svg_bytes, "svg-size", payload.files.svg, svgSize, `1..${payload.asset_contract.max_svg_bytes}`));
  for (const required of payload.asset_contract.required_svg_strings) {
    results.push(makeResult(svgText.includes(required), "svg-required-string", payload.files.svg, required, "present"));
  }

  const pdfSize = existsSync(resolve(root, payload.files.pdf)) ? statSync(resolve(root, payload.files.pdf)).size : 0;
  results.push(makeResult(pdfSize >= payload.asset_contract.min_pdf_bytes && pdfSize <= payload.asset_contract.max_pdf_bytes, "pdf-size", payload.files.pdf, pdfSize, `${payload.asset_contract.min_pdf_bytes}..${payload.asset_contract.max_pdf_bytes}`));

  const landingText = readRequired(root, payload.files.landing_card) || "";
  for (const required of payload.asset_contract.required_landing_strings) {
    results.push(makeResult(landingText.includes(required), "landing-required-string", payload.files.landing_card, required, "present"));
  }
  for (const forbidden of payload.asset_contract.forbidden_landing_strings) {
    results.push(makeResult(!landingText.includes(forbidden), "landing-forbidden-string", payload.files.landing_card, forbidden, "absent"));
  }

  for (const row of coreRows) {
    const surfaceNeedle = `${row.id} ${row.name}`;
    results.push(makeResult(cardText.includes(surfaceNeedle), "card-doc-row", payload.files.card_doc, surfaceNeedle, "present"));
    results.push(makeResult(svgText.includes(row.id), "svg-id-present", payload.files.svg, row.id, "present"));
    results.push(makeResult(landingText.includes(row.id), "landing-id-present", payload.files.landing_card, row.id, "present"));
  }

  results.push(...validateManualMock(payload));

  return {
    core_rows: coreRows,
    results,
  };
}

export function writeDsaf25Evidence(payload, evaluation, outputPath = AUDIT_OUTPUT) {
  const audit = {
    generated: new Date().toISOString(),
    fr_id: payload.fr_id,
    core_rows: evaluation.core_rows.map((row) => ({ id: row.id, category: row.category, tag: row.tag })),
    summary: summarize(evaluation.results),
    results: evaluation.results,
  };
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, JSON.stringify(audit, null, 2) + "\n");
  return audit;
}
