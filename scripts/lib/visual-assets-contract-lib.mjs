import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { gzipSync } from "node:zlib";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const ROOT = resolve(__dirname, '../..');
export const PAYLOAD_PATH = resolve(ROOT, "docs/internal/branding/FR-BRAND-003-visual-assets-contract.json");
export const AUDIT_OUTPUT = resolve(ROOT, "docs/outputs/_audit/visual-assets-contract.json");

export function loadVisualAssetsPayload(path = PAYLOAD_PATH) {
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

export function countMatches(text, pattern) {
  return [...text.matchAll(new RegExp(pattern, "gi"))].length;
}

export function svgMetrics(text) {
  return {
    hasTitle: /<title\b/i.test(text),
    hasDesc: /<desc\b/i.test(text),
    hasMetadata: /<metadata\b/i.test(text),
    hasRoleImg: /role="img"/i.test(text),
    hasAriaLabelledby: /aria-labelledby=/i.test(text),
    textCount: countMatches(text, "<text\\b"),
    viewBox: text.match(/viewBox="([^"]+)"/)?.[1] || "",
  };
}

function read(root, relPath) {
  const abs = resolve(root, relPath);
  return existsSync(abs) ? readFileSync(abs, "utf8") : "";
}

function fileSize(root, relPath) {
  const abs = resolve(root, relPath);
  return existsSync(abs) ? statSync(abs).size : 0;
}

function validateRecognitionMock(payload) {
  const contract = payload.recognition_mock_contract;
  const results = [];
  for (const request of contract.mock_requests) {
    const missing = contract.request_required_fields.filter((field) => !(field in request));
    results.push(makeResult(missing.length === 0, "mock-request-shape", contract.mock_endpoint, { trial_id: request.trial_id, missing }, "all request fields", "mocked"));
    results.push(makeResult(contract.allowed_results.includes(request.result), "mock-request-result", contract.mock_endpoint, { trial_id: request.trial_id, result: request.result }, contract.allowed_results, "mocked"));
    results.push(makeResult(request.viewport === "1200x675", "mock-request-viewport", contract.mock_endpoint, { trial_id: request.trial_id, viewport: request.viewport }, "1200x675", "mocked"));
  }
  const responseMissing = contract.response_required_fields.filter((field) => !(field in contract.mock_response));
  results.push(makeResult(responseMissing.length === 0, "mock-response-shape", contract.mock_endpoint, { missing: responseMissing }, "all response fields", "mocked"));
  results.push(makeResult(contract.mock_response.accepted === true, "mock-response-accepted", contract.mock_endpoint, contract.mock_response.accepted, true, "mocked"));
  return results;
}

export function evaluateVisualAssetsContract(payload, root = ROOT) {
  const results = [];
  for (const asset of payload.svg_assets) {
    const text = read(root, asset.path);
    const size = fileSize(root, asset.path);
    const gzipBytes = text ? gzipSync(text).length : 0;
    const metrics = svgMetrics(text);
    results.push(makeResult(size > 0, "svg-exists", asset.path, size, "> 0 bytes"));
    results.push(makeResult(size <= payload.size_caps.max_svg_bytes, "svg-size", asset.path, size, `<= ${payload.size_caps.max_svg_bytes}`));
    results.push(makeResult(gzipBytes <= payload.size_caps.max_svg_gzip_bytes, "svg-gzip-size", asset.path, gzipBytes, `<= ${payload.size_caps.max_svg_gzip_bytes}`));
    results.push(makeResult(metrics.hasTitle && metrics.hasDesc && metrics.hasMetadata && metrics.hasRoleImg && metrics.hasAriaLabelledby, "svg-accessibility", asset.path, metrics, "title, desc, metadata, role, aria-labelledby"));
    results.push(makeResult(metrics.viewBox === asset.viewBox, "svg-viewbox", asset.path, metrics.viewBox, asset.viewBox));
    results.push(makeResult(metrics.textCount >= 8, "svg-text-elements", asset.path, metrics.textCount, ">= 8"));
    results.push(makeResult(text.includes("dsaf_125_version") && text.includes("dsaf_25_version"), "svg-version-metadata", asset.path, "version metadata", "present"));
    for (const required of asset.required_text) {
      results.push(makeResult(text.includes(required), "svg-required-text", asset.path, required, "present"));
    }
    for (const pattern of asset.required_patterns) {
      results.push(makeResult(countMatches(text, pattern) > 0, "svg-required-pattern", asset.path, pattern, ">= 1"));
    }
  }

  for (const pdf of payload.pdf_assets) {
    const abs = resolve(root, pdf);
    const size = fileSize(root, pdf);
    const header = existsSync(abs) ? readFileSync(abs).subarray(0, 5).toString("utf8") : "";
    results.push(makeResult(header === "%PDF-", "pdf-header", pdf, header, "%PDF-"));
    results.push(makeResult(size >= payload.size_caps.min_pdf_bytes && size <= payload.size_caps.max_pdf_bytes, "pdf-size", pdf, size, `${payload.size_caps.min_pdf_bytes}..${payload.size_caps.max_pdf_bytes}`));
  }

  const template = JSON.parse(read(root, payload.radar_template.path) || "{}");
  const axes = Array.isArray(template.axes) ? template.axes : [];
  results.push(makeResult(axes.length === payload.radar_template.expected_axes, "radar-axis-count", payload.radar_template.path, axes.length, payload.radar_template.expected_axes));
  results.push(makeResult(axes.filter((axis) => axis.part === "A").length === payload.radar_template.expected_part_a, "radar-part-a-count", payload.radar_template.path, axes.filter((axis) => axis.part === "A").length, payload.radar_template.expected_part_a));
  results.push(makeResult(axes.filter((axis) => axis.part === "B").length === payload.radar_template.expected_part_b, "radar-part-b-count", payload.radar_template.path, axes.filter((axis) => axis.part === "B").length, payload.radar_template.expected_part_b));
  for (const axis of axes) {
    const missing = payload.radar_template.required_axis_fields.filter((field) => !(field in axis));
    results.push(makeResult(missing.length === 0, "radar-axis-shape", payload.radar_template.path, { id: axis.id, missing }, "all required axis fields"));
  }

  for (const [relPath, requiredStrings] of Object.entries(payload.required_strings)) {
    const text = read(root, relPath);
    for (const required of requiredStrings) {
      results.push(makeResult(text.includes(required), "required-string", relPath, required, "present"));
    }
  }

  const packageJson = JSON.parse(read(root, "package.json") || "{}");
  for (const scriptName of payload.required_package_scripts) {
    results.push(makeResult(Boolean(packageJson.scripts?.[scriptName]), "package-script", "package.json", scriptName, "present"));
  }

  results.push(...validateRecognitionMock(payload));

  return { results };
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

export function writeVisualAssetsEvidence(payload, evaluation, outputPath = AUDIT_OUTPUT) {
  const audit = {
    generated: new Date().toISOString(),
    fr_id: payload.fr_id,
    summary: summarize(evaluation.results),
    results: evaluation.results,
  };
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, JSON.stringify(audit, null, 2) + "\n");
  return audit;
}
