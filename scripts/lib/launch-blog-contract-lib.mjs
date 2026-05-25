import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const ROOT = resolve(__dirname, '../..');
export const PAYLOAD_PATH = resolve(ROOT, "docs/framework/core/FR-DOCS-003-launch-blog-contract.json");
export const AUDIT_OUTPUT = resolve(ROOT, "docs/outputs/_audit/launch-blog-contract.json");

export function loadLaunchBlogPayload(path = PAYLOAD_PATH) {
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

export function parseFrontmatter(source) {
  if (!source.startsWith("---\n")) return { meta: {}, body: source };
  const end = source.indexOf("\n---\n", 4);
  if (end < 0) return { meta: {}, body: source };
  const raw = source.slice(4, end).trim();
  const body = source.slice(end + 5).trim();
  const meta = {};
  for (const line of raw.split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*"?(.+?)"?$/);
    if (match) meta[match[1]] = match[2].replace(/^"|"$/g, "");
  }
  return { meta, body };
}

export function wordCount(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[`*_>#|:.,;()[\]{}]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

export function pngDimensions(buffer) {
  const signature = buffer.subarray(0, 8).toString("hex");
  if (signature !== "89504e470d0a1a0a") return { ok: false, width: 0, height: 0 };
  return {
    ok: true,
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

export function evaluateDeployMock(payload) {
  const contract = payload.deploy_mock_contract || {};
  const request = contract.request || {};
  const response = contract.response || {};
  const body = response.body || {};
  return [
    makeResult(contract.endpoint === "POST /mock/launch-blog-deploy-verification", "mock-endpoint", "mock://launch-blog-deploy", contract.endpoint, "POST /mock/launch-blog-deploy-verification", "mocked"),
    makeResult(request.fr_id === payload.fr_id && request.canonical_url === payload.frontmatter.required.canonical, "mock-request-identity", "mock://launch-blog-deploy", { fr_id: request.fr_id, canonical_url: request.canonical_url }, { fr_id: payload.fr_id, canonical_url: payload.frontmatter.required.canonical }, "mocked"),
    makeResult(request.requires_production_deploy === true && request.approved_quote_count === 0, "mock-request-blockers", "mock://launch-blog-deploy", { requires_production_deploy: request.requires_production_deploy, approved_quote_count: request.approved_quote_count }, "production deploy required and zero approved quotes", "mocked"),
    makeResult(response.status_code === 202 && body.accepted === true, "mock-response-accepted", "mock://launch-blog-deploy", { status_code: response.status_code, accepted: body.accepted }, { status_code: 202, accepted: true }, "mocked"),
    makeResult(body.production_deploy === "mocked" && body.publication_state === "repo-rendered" && body.approved_quote_count === 0 && typeof body.observability_key === "string", "mock-response-shape", "mock://launch-blog-deploy", body, "mocked deploy, repo-rendered, zero quotes", "mocked"),
  ];
}

export function evaluateLaunchBlogContract(payload, root = ROOT) {
  const results = [];
  const files = new Set([...Object.values(payload.files), "package.json"]);
  const post = safeRead(root, payload.files.post_markdown);
  const html = safeRead(root, payload.files.rendered_html);
  const flatHtml = safeRead(root, payload.files.rendered_flat_html);
  const index = safeRead(root, payload.files.blog_index);

  results.push(makeResult(post !== null, "post-exists", payload.files.post_markdown, post === null ? "missing" : "present", "present"));
  if (post !== null) {
    const { meta, body } = parseFrontmatter(post);
    results.push(makeResult(Object.keys(meta).length > 0, "frontmatter-present", payload.files.post_markdown, meta, "non-empty"));
    results.push(makeResult((meta.title || "").length > 0 && meta.title.length <= payload.frontmatter.title_max_chars, "frontmatter-title-length", payload.files.post_markdown, meta.title, `<= ${payload.frontmatter.title_max_chars}`));
    for (const [key, expected] of Object.entries(payload.frontmatter.required)) {
      results.push(makeResult(meta[key] === expected, "frontmatter-required-value", payload.files.post_markdown, { key, value: meta[key] }, expected));
    }
    const words = wordCount(body);
    results.push(makeResult(words >= payload.body.min_words && words <= payload.body.max_words, "body-word-count", payload.files.post_markdown, words, `${payload.body.min_words}-${payload.body.max_words}`));
    for (const heading of payload.body.required_headings) {
      results.push(makeResult(body.includes(heading), "body-required-heading", payload.files.post_markdown, heading, "present"));
    }
    for (const required of payload.body.required_strings) {
      results.push(makeResult(body.includes(required), "body-required-string", payload.files.post_markdown, required, "present"));
    }
    for (const image of payload.body.required_images) {
      results.push(makeResult(body.includes(image), "body-required-image", payload.files.post_markdown, image, "present"));
    }
    for (const pattern of payload.body.forbidden_patterns) {
      const count = countMatches(body, pattern);
      results.push(makeResult(count === 0, "body-forbidden-pattern", payload.files.post_markdown, { pattern, count }, 0));
    }
  }

  for (const [file, text] of [[payload.files.rendered_html, html], [payload.files.rendered_flat_html, flatHtml]]) {
    results.push(makeResult(text !== null, "rendered-html-exists", file, text === null ? "missing" : "present", "present"));
    if (text !== null) {
      for (const required of payload.rendered_html.required_strings) {
        results.push(makeResult(text.includes(required), "rendered-html-required-string", file, required, "present"));
      }
    }
  }

  results.push(makeResult(index !== null, "blog-index-exists", payload.files.blog_index, index === null ? "missing" : "present", "present"));
  if (index !== null) {
    results.push(makeResult(index.includes("launch-2026"), "blog-index-links-post", payload.files.blog_index, "launch-2026", "present"));
  }

  for (const file of [payload.files.og_svg, payload.files.deploy_og_png]) {
    const abs = resolve(root, file);
    results.push(makeResult(existsSync(abs), "asset-exists", file, existsSync(abs) ? "present" : "missing", "present"));
  }

  const ogPath = resolve(root, payload.files.og_png);
  results.push(makeResult(existsSync(ogPath), "og-png-exists", payload.files.og_png, existsSync(ogPath) ? "present" : "missing", "present"));
  if (existsSync(ogPath)) {
    const buffer = readFileSync(ogPath);
    const dims = pngDimensions(buffer);
    const size = statSync(ogPath).size;
    results.push(makeResult(dims.ok && dims.width === payload.og_png.width && dims.height === payload.og_png.height, "og-png-dimensions", payload.files.og_png, dims, payload.og_png));
    results.push(makeResult(size >= payload.og_png.min_bytes, "og-png-size", payload.files.og_png, size, `>= ${payload.og_png.min_bytes}`));
  }

  const packageJson = readJson(root, "package.json");
  results.push(makeResult(packageJson.ok, "package-json-valid", "package.json", packageJson.error || "valid", "valid JSON"));
  if (packageJson.ok) {
    for (const [name, command] of Object.entries(payload.required_package_scripts)) {
      results.push(makeResult(packageJson.value.scripts?.[name] === command, "package-script", "package.json", { name, command: packageJson.value.scripts?.[name] }, command));
    }
  }

  for (const result of evaluateDeployMock(payload)) results.push(result);

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

export function writeLaunchBlogEvidence(payload, evaluation, outputPath = AUDIT_OUTPUT) {
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
