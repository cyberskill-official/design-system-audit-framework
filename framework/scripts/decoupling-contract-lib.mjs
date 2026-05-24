import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const ROOT = resolve(__dirname, '../..');
export const PAYLOAD_PATH = resolve(ROOT, "internal/branding/FR-BRAND-004-decoupling-contract.json");
export const AUDIT_OUTPUT = resolve(ROOT, "outputs/_audit/decoupling-contract.json");

export function loadDecouplingPayload(path = PAYLOAD_PATH) {
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

export function countMatches(text, pattern, flags = "gi") {
  return [...text.matchAll(new RegExp(pattern, flags))].length;
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

export function walkActiveSurfaces(root, payload) {
  const exts = new Set(payload.active_surface_extensions);
  const out = [];

  function walk(abs) {
    if (!existsSync(abs)) return;
    const stat = statSync(abs);
    const rel = relative(root, abs);
    if (rel.includes("node_modules") || rel.includes("internal/feature-requests/")) return;
    if (stat.isDirectory()) {
      for (const entry of readdirSync(abs)) {
        if (entry.startsWith(".") || entry === "dist") continue;
        walk(join(abs, entry));
      }
    }
    else if (exts.has(extname(abs))) {
      out.push(abs);
    }
  }

  for (const item of payload.active_surface_neutral_domain_forbidden) {
    walk(resolve(root, item));
  }
  return [...new Set(out)].sort();
}

export function historicalRedirectRows(text) {
  return [...text.matchAll(/^\|\s*\d+\s*\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|/gm)].map((match) => ({
    old_url: match[1].trim(),
    action: match[2].trim(),
    new_url: match[3].trim(),
  }));
}

export function vercelHasRedirects(config) {
  return (Array.isArray(config.redirects) && config.redirects.length > 0)
    || (Array.isArray(config.rewrites) && config.rewrites.length > 0)
    || Object.prototype.hasOwnProperty.call(config, "redirects")
    || Object.prototype.hasOwnProperty.call(config, "rewrites");
}

export function evaluateMockContract(payload) {
  const contract = payload.deployment_mock_contract;
  const request = contract.request || {};
  const response = contract.response || {};
  const body = response.body || {};
  return [
    makeResult(contract.endpoint === "POST /mock/canonical-boundary-deployment-check", "mock-endpoint", "mock://deployment-control", contract.endpoint, "POST /mock/canonical-boundary-deployment-check", "mocked"),
    makeResult(request.fr_id === payload.fr_id && request.canonical_host === payload.canonical_host, "mock-request-identity", "mock://deployment-control", { fr_id: request.fr_id, canonical_host: request.canonical_host }, { fr_id: payload.fr_id, canonical_host: payload.canonical_host }, "mocked"),
    makeResult(Array.isArray(request.desired_redirect_rules) && request.desired_redirect_rules.length === 0, "mock-request-no-redirects", "mock://deployment-control", request.desired_redirect_rules, [], "mocked"),
    makeResult(response.status_code === 202 && body.accepted === true, "mock-response-accepted", "mock://deployment-control", { status_code: response.status_code, accepted: body.accepted }, { status_code: 202, accepted: true }, "mocked"),
    makeResult(body.redirect_rules_count === 0 && body.external_control_plane === "mocked" && typeof body.observability_key === "string", "mock-response-shape", "mock://deployment-control", body, "redirect_rules_count=0 and mocked control plane", "mocked"),
  ];
}

export function evaluateDecouplingContract(payload, root = ROOT) {
  const results = [];
  const files = new Set();

  const decision = safeRead(root, payload.files.decision_file);
  files.add(payload.files.decision_file);
  results.push(makeResult(decision !== null, "decision-file-exists", payload.files.decision_file, decision === null ? "missing" : "present", "present"));
  if (decision !== null) {
    for (const section of payload.required_decision_sections) {
      results.push(makeResult(decision.includes(section), "decision-section", payload.files.decision_file, section, "present"));
    }
    for (const required of payload.required_decision_strings) {
      results.push(makeResult(decision.includes(required), "decision-required-string", payload.files.decision_file, required, "present"));
    }
  }

  const domainDecision = safeRead(root, payload.files.domain_decision_file);
  files.add(payload.files.domain_decision_file);
  results.push(makeResult(domainDecision !== null, "domain-decision-file-exists", payload.files.domain_decision_file, domainDecision === null ? "missing" : "present", "present"));
  if (domainDecision !== null) {
    for (const required of payload.required_domain_decision_strings) {
      results.push(makeResult(domainDecision.includes(required), "domain-decision-required-string", payload.files.domain_decision_file, required, "present"));
    }
  }

  const redirectMap = safeRead(root, payload.files.redirect_map);
  files.add(payload.files.redirect_map);
  results.push(makeResult(redirectMap !== null, "redirect-map-exists", payload.files.redirect_map, redirectMap === null ? "missing" : "present", "present"));
  if (redirectMap !== null) {
    for (const required of payload.required_redirect_map_strings) {
      results.push(makeResult(redirectMap.includes(required), "redirect-map-required-string", payload.files.redirect_map, required, "present"));
    }
    const rows = historicalRedirectRows(redirectMap);
    const allowed = new Set(payload.historical_redirect_inventory.allowed_actions);
    results.push(makeResult(rows.length >= payload.historical_redirect_inventory.minimum_rows, "redirect-map-inventory-count", payload.files.redirect_map, rows.length, `>= ${payload.historical_redirect_inventory.minimum_rows}`));
    for (const row of rows) {
      results.push(makeResult(allowed.has(row.action), "redirect-map-action", payload.files.redirect_map, row, [...allowed].join(", ")));
    }
  }

  const adr = safeRead(root, payload.files.adr_file);
  files.add(payload.files.adr_file);
  results.push(makeResult(adr !== null, "adr-exists", payload.files.adr_file, adr === null ? "missing" : "present", "present"));
  if (adr !== null) {
    const isConsolidated = payload.files.adr_file.includes("brand-decoupling-domain-decision.md");
    const shapeOk = isConsolidated
      ? (adr.includes("FR-BRAND-004") && (adr.includes("Status:** accepted") || adr.includes("Status:** ratified")))
      : (adr.includes("FR-BRAND-004") && adr.includes("Status:** accepted") && adr.includes("```mermaid"));
    results.push(makeResult(shapeOk, "adr-decision-shape", payload.files.adr_file, isConsolidated ? "ratified decision" : "accepted ADR with Mermaid", "present"));
  }

  const vercel = readJson(root, payload.files.vercel_config);
  files.add(payload.files.vercel_config);
  results.push(makeResult(vercel.ok, "vercel-json-valid", payload.files.vercel_config, vercel.error || "valid", "valid JSON"));
  if (vercel.ok) {
    results.push(makeResult(!vercelHasRedirects(vercel.value), "vercel-no-redirects", payload.files.vercel_config, { redirects: vercel.value.redirects, rewrites: vercel.value.rewrites }, "no redirects or rewrites"));
    const headerValues = JSON.stringify(vercel.value.headers || []);
    results.push(makeResult(headerValues.includes("Strict-Transport-Security") && headerValues.includes("Content-Security-Policy"), "vercel-security-headers", payload.files.vercel_config, "HSTS/CSP", "present"));
  }

  const codeowners = safeRead(root, payload.files.codeowners);
  files.add(payload.files.codeowners);
  results.push(makeResult(codeowners !== null, "codeowners-exists", payload.files.codeowners, codeowners === null ? "missing" : "present", "present"));
  if (codeowners !== null) {
    for (const required of payload.required_codeowners) {
      results.push(makeResult(codeowners.includes(required), "codeowners-boundary-gate", payload.files.codeowners, required, "present"));
    }
  }

  for (const surface of payload.canonical_surfaces) {
    const text = safeRead(root, surface.path);
    files.add(surface.path);
    results.push(makeResult(text !== null, "canonical-surface-exists", surface.path, text === null ? "missing" : "present", "present"));
    if (text !== null) {
      for (const required of surface.required) {
        results.push(makeResult(text.includes(required), "canonical-surface-required-string", surface.path, required, "present"));
      }
    }
  }

  for (const file of walkActiveSurfaces(root, payload)) {
    const rel = relative(root, file);
    files.add(rel);
    const text = readFileSync(file, "utf8");
    const count = countMatches(text, "https?://dsaf\\.dev|\\bhello@dsaf\\.dev\\b");
    results.push(makeResult(count === 0, "active-surface-no-neutral-domain", rel, count, 0));
  }

  for (const file of payload.landing_public_files) {
    const text = safeRead(root, file);
    files.add(file);
    results.push(makeResult(text !== null, "landing-boundary-file-exists", file, text === null ? "missing" : "present", "present"));
    if (text !== null) {
      for (const pattern of payload.forbidden_landing_patterns) {
        const count = countMatches(text, pattern);
        results.push(makeResult(count === 0, "landing-forbidden-sales-copy", file, { pattern, count }, 0));
      }
    }
  }

  const packageJson = readJson(root, "package.json");
  files.add("package.json");
  results.push(makeResult(packageJson.ok, "package-json-valid", "package.json", packageJson.error || "valid", "valid JSON"));
  if (packageJson.ok) {
    for (const [name, command] of Object.entries(payload.required_package_scripts)) {
      results.push(makeResult(packageJson.value.scripts?.[name] === command, "package-script", "package.json", { name, command: packageJson.value.scripts?.[name] }, command));
    }
  }

  for (const result of evaluateMockContract(payload)) {
    results.push(result);
  }

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

export function writeDecouplingEvidence(payload, evaluation, outputPath = AUDIT_OUTPUT) {
  const audit = {
    generated: new Date().toISOString(),
    fr_id: payload.fr_id,
    canonical_host: payload.canonical_host,
    decision_mode: payload.decision_mode,
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
