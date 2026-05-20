import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const ROOT = resolve(__dirname, "..");
export const PAYLOAD_PATH = resolve(ROOT, "docs/governance/FR-GOV-001-reviewer-contract.json");
export const AUDIT_OUTPUT = resolve(ROOT, "docs/_audit/reviewer-contract.json");

export function loadReviewerPayload(path = PAYLOAD_PATH) {
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

export function parseShortlistRows(text) {
  return text
    .split(/\r?\n/)
    .filter((line) => /^\|\s*\d+\s*\|/.test(line))
    .map((line) => {
      const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
      return {
        rank: Number(cells[0]),
        name: cells[1],
        role: cells[2],
        why: cells[3],
        warmth: Number(cells[4]),
        review_status: cells[5],
        heads_up_status: cells[6],
      };
    });
}

export function uniqueValues(values) {
  return [...new Set(values)];
}

export function evaluateOutreachMock(payload) {
  const contract = payload.outreach_mock_contract || {};
  const request = contract.request || {};
  const response = contract.response || {};
  const body = response.body || {};
  const recipients = request.recipients || [];
  return [
    makeResult(contract.endpoint === "POST /mock/reviewer-outreach-send", "mock-endpoint", "mock://reviewer-outreach-send", contract.endpoint, "POST /mock/reviewer-outreach-send", "mocked"),
    makeResult(request.fr_id === payload.fr_id && request.ask_type === "review-not-endorsement" && request.compensation === "none", "mock-request-ask-shape", "mock://reviewer-outreach-send", { fr_id: request.fr_id, ask_type: request.ask_type, compensation: request.compensation }, "review-not-endorsement unpaid ask", "mocked"),
    makeResult(Array.isArray(request.materials) && request.materials.length >= 4, "mock-request-materials", "mock://reviewer-outreach-send", request.materials, ">= 4 materials", "mocked"),
    makeResult(Array.isArray(recipients) && recipients.length === 3 && recipients.every((item) => item.name && item.status === "not-contacted"), "mock-request-recipients", "mock://reviewer-outreach-send", recipients, "3 not-contacted recipients", "mocked"),
    makeResult(response.status_code === 202 && body.accepted === true && body.sent_count === 0 && body.mocked_recipient_count === 3 && body.consent_approvals === 0, "mock-response-shape", "mock://reviewer-outreach-send", { status_code: response.status_code, body }, "202 accepted, zero sent, three mocked, zero consent", "mocked"),
  ];
}

export function evaluateReviewerContract(payload, root = ROOT) {
  const results = [];
  const files = new Set([...Object.values(payload.files), "package.json"]);
  const shortlist = safeRead(root, payload.files.shortlist);
  const brandingPlaybook = safeRead(root, payload.files.branding_playbook);
  const socialDrafts = safeRead(root, payload.files.social_drafts);
  const consentLog = safeRead(root, payload.files.consent_log);
  const readme = safeRead(root, payload.files.readme);

  results.push(makeResult(shortlist !== null, "shortlist-exists", payload.files.shortlist, shortlist === null ? "missing" : "present", "present"));
  if (shortlist !== null) {
    const rows = parseShortlistRows(shortlist);
    const names = rows.map((row) => row.name);
    const statuses = new Set(payload.status_values);
    results.push(makeResult(rows.length >= payload.expected_reviewers.length, "shortlist-row-count", payload.files.shortlist, rows.length, `>= ${payload.expected_reviewers.length}`));
    results.push(makeResult(uniqueValues(names).length === names.length, "shortlist-unique-names", payload.files.shortlist, names, "all unique"));
    for (const name of payload.expected_reviewers) {
      results.push(makeResult(names.includes(name), "shortlist-expected-name", payload.files.shortlist, name, "present"));
    }
    for (const row of rows) {
      results.push(makeResult(Number.isFinite(row.warmth) && row.warmth >= 1 && row.warmth <= 5, "shortlist-warmth-range", payload.files.shortlist, row, "1-5"));
      results.push(makeResult(statuses.has(row.review_status), "shortlist-status-value", payload.files.shortlist, row, [...statuses].join(", ")));
    }
  }

  results.push(makeResult(brandingPlaybook !== null, "branding-playbook-exists", payload.files.branding_playbook, brandingPlaybook === null ? "missing" : "present", "present"));
  if (brandingPlaybook !== null) {
    for (const required of payload.required_playbook_strings) {
      results.push(makeResult(brandingPlaybook.includes(required), "branding-playbook-required-string", payload.files.branding_playbook, required, "present"));
    }
    for (const pattern of payload.forbidden_outreach_patterns) {
      const count = countMatches(brandingPlaybook, pattern);
      results.push(makeResult(count === 0, "branding-playbook-forbidden-ask", payload.files.branding_playbook, { pattern, count }, 0));
    }
  }

  results.push(makeResult(socialDrafts !== null, "social-drafts-exists", payload.files.social_drafts, socialDrafts === null ? "missing" : "present", "present"));
  if (socialDrafts !== null) {
    for (const required of payload.required_social_draft_strings) {
      results.push(makeResult(socialDrafts.includes(required), "social-draft-required-string", payload.files.social_drafts, required, "present"));
    }
    for (const pattern of payload.forbidden_outreach_patterns) {
      const count = countMatches(socialDrafts, pattern);
      results.push(makeResult(count === 0, "social-draft-forbidden-ask", payload.files.social_drafts, { pattern, count }, 0));
    }
  }

  results.push(makeResult(consentLog !== null, "consent-log-exists", payload.files.consent_log, consentLog === null ? "missing" : "present", "present"));
  if (consentLog !== null) {
    for (const required of payload.required_consent_strings) {
      results.push(makeResult(consentLog.includes(required), "consent-log-required-string", payload.files.consent_log, required, "present"));
    }
  }

  results.push(makeResult(readme !== null, "readme-exists", payload.files.readme, readme === null ? "missing" : "present", "present"));
  if (readme !== null) {
    for (const required of payload.required_readme_strings) {
      results.push(makeResult(readme.includes(required), "readme-required-string", payload.files.readme, required, "present"));
    }
  }

  const packageJson = readJson(root, "package.json");
  results.push(makeResult(packageJson.ok, "package-json-valid", "package.json", packageJson.error || "valid", "valid JSON"));
  if (packageJson.ok) {
    for (const [name, command] of Object.entries(payload.required_package_scripts)) {
      results.push(makeResult(packageJson.value.scripts?.[name] === command, "package-script", "package.json", { name, command: packageJson.value.scripts?.[name] }, command));
    }
  }

  for (const result of evaluateOutreachMock(payload)) results.push(result);

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

export function writeReviewerEvidence(payload, evaluation, outputPath = AUDIT_OUTPUT) {
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
