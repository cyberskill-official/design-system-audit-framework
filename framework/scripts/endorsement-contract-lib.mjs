import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const ROOT = resolve(__dirname, '../..');
export const PAYLOAD_PATH = resolve(ROOT, "framework/core/FR-DOCS-002-endorsement-contract.json");
export const AUDIT_OUTPUT = resolve(ROOT, "outputs/_audit/endorsement-contract.json");

export function loadEndorsementPayload(path = PAYLOAD_PATH) {
  return JSON.parse(readFileSync(path, "utf8"));
}

export function makeResult(condition, ruleId, file, observed, expected, severity = "fail") {
  return {
    rule_id: ruleId,
    file,
    status: condition ? (severity === "mocked" ? "mocked" : "pass") : "fail",
    observed,
    expected,
  };
}

export function safeRead(root, file) {
  const path = resolve(root, file);
  if (!existsSync(path)) return null;
  return readFileSync(path, "utf8");
}

export function readJson(root, file) {
  const text = safeRead(root, file);
  if (text === null) return { ok: false, value: null, error: "missing" };
  try {
    return { ok: true, value: JSON.parse(text), error: null };
  }
  catch (error) {
    return { ok: false, value: null, error: error.message };
  }
}

export function countMatches(text, pattern, flags = "gim") {
  const globalFlags = flags.includes("g") ? flags : `${flags}g`;
  return [...text.matchAll(new RegExp(pattern, globalFlags))].length;
}

export function approvedConsentRows(consentLog) {
  return consentLog
    .split(/\r?\n/)
    .filter((line) => /^\|/.test(line) && !line.includes("_none_") && !line.includes("---") && !line.includes("Reviewer |"));
}

export function evaluateQuoteApprovalMock(payload) {
  const contract = payload.quote_approval_mock_contract || {};
  const request = contract.request || {};
  const response = contract.response || {};
  const body = response.body || {};
  return [
    makeResult(contract.endpoint === "POST /mock/reviewer-quote-consent-approval", "mock-endpoint", "mock://reviewer-quote-consent-approval", contract.endpoint, "POST /mock/reviewer-quote-consent-approval", "mocked"),
    makeResult(request.fr_id === payload.fr_id && request.minimum_required_approvals === 2, "mock-request-threshold", "mock://reviewer-quote-consent-approval", { fr_id: request.fr_id, minimum_required_approvals: request.minimum_required_approvals }, { fr_id: payload.fr_id, minimum_required_approvals: 2 }, "mocked"),
    makeResult(Array.isArray(request.approved_quotes) && request.approved_quotes.length === 0, "mock-request-zero-approvals", "mock://reviewer-quote-consent-approval", request.approved_quotes, [], "mocked"),
    makeResult(response.status_code === 202 && body.accepted === true, "mock-response-accepted", "mock://reviewer-quote-consent-approval", { status_code: response.status_code, accepted: body.accepted }, { status_code: 202, accepted: true }, "mocked"),
    makeResult(body.approved_count === 0 && body.publication_action === "keep_placeholders" && body.mocked_dependency === true && typeof body.observability_key === "string", "mock-response-shape", "mock://reviewer-quote-consent-approval", body, "zero approvals and keep placeholders", "mocked"),
  ];
}

export function evaluateEndorsementContract(payload, root = ROOT) {
  const results = [];
  const files = new Set([...Object.values(payload.files), "package.json"]);
  const readme = safeRead(root, payload.files.readme);
  const consentLog = safeRead(root, payload.files.consent_log);
  const pendingQuotes = safeRead(root, payload.files.pending_quotes);
  const shortlist = safeRead(root, payload.files.shortlist);

  results.push(makeResult(readme !== null, "readme-exists", payload.files.readme, readme === null ? "missing" : "present", "present"));
  if (readme !== null) {
    const placeholders = countMatches(readme, payload.readme_requirements.placeholder_pattern, "gm");
    const realQuotes = countMatches(readme, payload.readme_requirements.forbidden_without_consent_pattern, "gm");
    results.push(makeResult(placeholders >= payload.readme_requirements.minimum_placeholders_without_consent, "readme-placeholder-count", payload.files.readme, placeholders, `>= ${payload.readme_requirements.minimum_placeholders_without_consent}`));
    results.push(makeResult(realQuotes === 0, "readme-no-real-quotes-without-consent", payload.files.readme, realQuotes, 0));
    for (const required of payload.readme_requirements.required_strings) {
      results.push(makeResult(readme.includes(required), "readme-required-string", payload.files.readme, required, "present"));
    }
  }

  results.push(makeResult(consentLog !== null, "consent-log-exists", payload.files.consent_log, consentLog === null ? "missing" : "present", "present"));
  let approvedRows = [];
  if (consentLog !== null) {
    approvedRows = approvedConsentRows(consentLog);
    results.push(makeResult(approvedRows.length === 0, "consent-log-empty-approved-rows", payload.files.consent_log, approvedRows.length, 0));
    for (const required of payload.consent_log_requirements) {
      results.push(makeResult(consentLog.includes(required), "consent-log-required-string", payload.files.consent_log, required, "present"));
    }
  }

  results.push(makeResult(pendingQuotes !== null, "pending-quotes-exists", payload.files.pending_quotes, pendingQuotes === null ? "missing" : "present", "present"));
  if (pendingQuotes !== null) {
    for (const required of payload.pending_quotes_requirements) {
      results.push(makeResult(pendingQuotes.includes(required), "pending-quotes-required-string", payload.files.pending_quotes, required, "present"));
    }
  }

  results.push(makeResult(shortlist !== null, "shortlist-exists", payload.files.shortlist, shortlist === null ? "missing" : "present", "present"));
  if (shortlist !== null) {
    for (const required of payload.shortlist_requirements) {
      results.push(makeResult(shortlist.includes(required), "shortlist-required-string", payload.files.shortlist, required, "present"));
    }
  }

  for (const [file, text] of [
    [payload.files.pending_quotes, pendingQuotes],
    [payload.files.shortlist, shortlist],
    [payload.files.readme, readme],
  ]) {
    if (text === null) continue;
    for (const pattern of payload.forbidden_fabrication_patterns) {
      const count = countMatches(text, pattern);
      results.push(makeResult(count === 0, "no-fabricated-quote-pattern", file, { pattern, count }, 0));
    }
  }

  const packageJson = readJson(root, "package.json");
  results.push(makeResult(packageJson.ok, "package-json-valid", "package.json", packageJson.error || "valid", "valid JSON"));
  if (packageJson.ok) {
    for (const [name, command] of Object.entries(payload.required_package_scripts)) {
      results.push(makeResult(packageJson.value.scripts?.[name] === command, "package-script", "package.json", { name, command: packageJson.value.scripts?.[name] }, command));
    }
  }

  for (const result of evaluateQuoteApprovalMock(payload)) results.push(result);

  return {
    files: [...files].sort(),
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
    mocked: counts.mocked || 0,
    fail: counts.fail || 0,
    ok: !counts.fail,
  };
}

export function writeEndorsementEvidence(payload, evaluation, outputPath = AUDIT_OUTPUT) {
  const audit = {
    generated: new Date().toISOString(),
    fr_id: payload.fr_id,
    observability: payload.observability,
    edge_case_matrix: payload.edge_case_matrix,
    scanned_files: evaluation.files,
    summary: summarize(evaluation.results),
    results: evaluation.results,
  };
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, JSON.stringify(audit, null, 2) + "\n");
  return audit;
}
