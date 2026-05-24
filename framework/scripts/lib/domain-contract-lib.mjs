import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { resolve as dnsResolve } from "node:dns/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const ROOT = resolve(__dirname, '../../..');
export const PAYLOAD_PATH = resolve(ROOT, "internal/branding/FR-BRAND-001-domain-contract.json");
export const AUDIT_OUTPUT = resolve(ROOT, "outputs/_audit/domain-contract.json");

export const canonical = {
  frId: "FR-BRAND-001",
  host: "audit.cyberskill.world",
  url: "https://audit.cyberskill.world/",
};

export function loadDomainPayload(path = PAYLOAD_PATH) {
  return JSON.parse(readFileSync(path, "utf8"));
}

export function check(condition, name, observed, expected, severity = "fail") {
  return {
    name,
    status: condition ? "pass" : severity,
    observed,
    expected,
  };
}

export function headerIncludes(headers, key, expectedParts) {
  const value = headers[key] || "";
  return expectedParts.every((part) => value.toLowerCase().includes(part.toLowerCase()));
}

export function collectStrings(value, out = []) {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((item) => collectStrings(item, out));
  else if (value && typeof value === "object") Object.values(value).forEach((item) => collectStrings(item, out));
  return out;
}

export function mockDomainOperation(request, expectedResponse) {
  if (request.method !== "POST" || request.url !== "/mock/domain-operations") {
    return { status: 400, body: { accepted: false, error: "invalid endpoint" } };
  }
  return {
    status: expectedResponse.status,
    body: {
      ...expectedResponse.body,
      received_operation_id: request.body.operation_id,
      received_canonical_host: request.body.canonical_host,
    },
  };
}

export function evaluatePrivateOperationContract(payload) {
  const results = [];
  const requiredRequest = payload.mock_service?.request_required_fields || [];
  const requiredResponse = payload.mock_service?.response_required_fields || [];
  const operations = payload.private_operations || [];
  const seen = new Set();

  results.push(check(payload.fr_id === canonical.frId, "payload fr_id", payload.fr_id, canonical.frId));
  results.push(check(payload.canonical_host === canonical.host, "payload canonical host", payload.canonical_host, canonical.host));
  results.push(check(Array.isArray(operations) && operations.length >= 4, "private operations count", operations.length, ">= 4"));

  for (const operation of operations) {
    const id = operation.operation_id;
    results.push(check(Boolean(id), "operation has id", id, "non-empty"));
    results.push(check(!seen.has(id), `operation ${id} unique`, id, "unique"));
    seen.add(id);
    results.push(check(Boolean(operation.blocker), `operation ${id} blocker documented`, operation.blocker, "non-empty"));
    results.push(check(operation.request?.method === "POST", `operation ${id} request method`, operation.request?.method, "POST"));
    results.push(check(operation.request?.url === "/mock/domain-operations", `operation ${id} request URL`, operation.request?.url, "/mock/domain-operations"));
    results.push(check(operation.request?.headers?.["content-type"] === "application/json", `operation ${id} content-type`, operation.request?.headers?.["content-type"], "application/json"));

    for (const field of requiredRequest) {
      results.push(check(Object.hasOwn(operation.request?.body || {}, field), `operation ${id} request field ${field}`, Object.keys(operation.request?.body || {}), field));
    }
    for (const field of requiredResponse) {
      results.push(check(Object.hasOwn(operation.expected_response?.body || {}, field), `operation ${id} response field ${field}`, Object.keys(operation.expected_response?.body || {}), field));
    }

    const body = operation.request?.body || {};
    results.push(check(body.fr_id === canonical.frId, `operation ${id} fr_id`, body.fr_id, canonical.frId));
    results.push(check(body.canonical_host === canonical.host, `operation ${id} canonical host`, body.canonical_host, canonical.host));
    results.push(check(Array.isArray(body.evidence_required) && body.evidence_required.length > 0, `operation ${id} evidence`, body.evidence_required, ">= 1 evidence item"));
    results.push(check(operation.expected_response?.status === 202, `operation ${id} expected status`, operation.expected_response?.status, 202));

    const mocked = mockDomainOperation(operation.request, operation.expected_response);
    results.push(check(mocked.status === 202, `operation ${id} mock status`, mocked.status, 202));
    results.push(check(mocked.body.received_operation_id === id, `operation ${id} mock operation echo`, mocked.body.received_operation_id, id));
    results.push(check(mocked.body.received_canonical_host === canonical.host, `operation ${id} mock host echo`, mocked.body.received_canonical_host, canonical.host));
  }

  return results;
}

export function evaluateLiveSnapshot(snapshot, payload) {
  const results = [];
  const requiredHeaders = payload.public_live_contract.required_headers;
  const forbiddenPatterns = payload.public_live_contract.forbidden_landing_patterns.map((pattern) => new RegExp(pattern, "i"));

  results.push(check(snapshot.https.status === 200, "HTTPS root status", snapshot.https.status, 200));
  results.push(check(payload.public_live_contract.http_redirect_statuses.includes(snapshot.http.status), "HTTP redirects", snapshot.http.status, payload.public_live_contract.http_redirect_statuses));
  results.push(check(snapshot.http.location === canonical.url, "HTTP redirect location", snapshot.http.location, canonical.url));

  for (const [header, parts] of Object.entries(requiredHeaders)) {
    results.push(check(headerIncludes(snapshot.https.headers, header, parts), `header ${header}`, snapshot.https.headers[header], parts));
  }

  results.push(check(snapshot.card.status === 200, "card route status", snapshot.card.status, 200));
  results.push(check(snapshot.securityTxt.status === 200, "security.txt status", snapshot.securityTxt.status, 200));
  results.push(check(/Contact:/i.test(snapshot.securityTxt.body), "security.txt contact", snapshot.securityTxt.body, "Contact"));
  results.push(check(/Expires:/i.test(snapshot.securityTxt.body), "security.txt expires", snapshot.securityTxt.body, "Expires"));
  results.push(check(snapshot.securityTxt.body.includes(`${canonical.url}.well-known/security.txt`), "security.txt canonical", snapshot.securityTxt.body, `${canonical.url}.well-known/security.txt`));
  results.push(check(snapshot.robots.status === 200, "robots status", snapshot.robots.status, 200));
  results.push(check(snapshot.robots.body.includes("Sitemap:"), "robots sitemap pointer", snapshot.robots.body, "Sitemap:"));
  results.push(check(snapshot.sitemap.status === 200, "sitemap status", snapshot.sitemap.status, 200));
  results.push(check(snapshot.sitemap.body.includes(`<loc>${canonical.url}</loc>`), "sitemap canonical root", snapshot.sitemap.body, `<loc>${canonical.url}</loc>`));

  results.push(check(snapshot.landing.body.includes(`<link rel="canonical" href="${canonical.url}">`), "internal/landing canonical link", "present", `<link rel=\"canonical\" href=\"${canonical.url}\">`));
  results.push(check(snapshot.landing.body.includes(`<meta property="og:url" content="${canonical.url}">`), "internal/landing og:url", "present", `<meta property=\"og:url\" content=\"${canonical.url}\">`));
  for (const pattern of forbiddenPatterns) {
    results.push(check(!pattern.test(snapshot.landing.body), `landing forbidden pattern ${pattern}`, pattern.test(snapshot.landing.body), false));
  }

  const hasVercelDns = [
    ...(snapshot.dns.cname || []),
    ...(snapshot.dns.a || []),
  ].length > 0;
  results.push(check(hasVercelDns, "DNS resolves", snapshot.dns, "CNAME or A record"));
  results.push(check((snapshot.dns.cname || []).some((value) => value.includes("vercel")), "DNS CNAME points to Vercel", snapshot.dns.cname, "vercel CNAME", "warn"));
  results.push(check((snapshot.dns.aaaa || []).length > 0, "DNS AAAA records", snapshot.dns.aaaa, ">= 1 AAAA record", "mocked"));
  results.push(check((snapshot.dns.caa || []).length > 0, "DNS CAA records", snapshot.dns.caa, "CAA records", "mocked"));
  results.push(check(snapshot.hstsPreload.status === "preloaded", "HSTS preload list status", snapshot.hstsPreload.status, "preloaded", "mocked"));

  return results;
}

export function summarize(results) {
  const counts = results.reduce((acc, result) => {
    acc[result.status] = (acc[result.status] || 0) + 1;
    return acc;
  }, {});
  return {
    pass: counts.pass || 0,
    warn: counts.warn || 0,
    mocked: counts.mocked || 0,
    fail: counts.fail || 0,
    ok: !counts.fail,
  };
}

async function fetchSnapshot(url, options = {}, fetchImpl = fetch) {
  const response = await fetchImpl(url, options);
  const headers = Object.fromEntries([...response.headers.entries()].map(([key, value]) => [key.toLowerCase(), value]));
  const body = options.method === "HEAD" ? "" : await response.text();
  return { status: response.status, headers, body, location: headers.location || "" };
}

async function safeResolve(host, type, resolveImpl = dnsResolve) {
  try {
    return await resolveImpl(host, type);
  }
  catch {
    return [];
  }
}

export async function collectLiveSnapshot({
  fetchImpl = fetch,
  resolveImpl = dnsResolve,
  now = () => new Date().toISOString(),
} = {}) {
  const [https, http, landing, card, securityTxt, robots, sitemap, cname, a, aaaa, caa, hstsPreload] = await Promise.all([
    fetchSnapshot(canonical.url, { method: "HEAD" }, fetchImpl),
    fetchSnapshot(`http://${canonical.host}/`, { method: "HEAD", redirect: "manual" }, fetchImpl),
    fetchSnapshot(canonical.url, {}, fetchImpl),
    fetchSnapshot(`${canonical.url}card`, { method: "HEAD" }, fetchImpl),
    fetchSnapshot(`${canonical.url}.well-known/security.txt`, {}, fetchImpl),
    fetchSnapshot(`${canonical.url}robots.txt`, {}, fetchImpl),
    fetchSnapshot(`${canonical.url}sitemap.xml`, {}, fetchImpl),
    safeResolve(canonical.host, "CNAME", resolveImpl),
    safeResolve(canonical.host, "A", resolveImpl),
    safeResolve(canonical.host, "AAAA", resolveImpl),
    safeResolve("cyberskill.world", "CAA", resolveImpl),
    fetchSnapshot(`https://hstspreload.org/api/v2/status?domain=${canonical.host}`, {}, fetchImpl).then((result) => {
      try {
        return JSON.parse(result.body);
      }
      catch {
        return { status: "unknown", raw: result.body };
      }
    }).catch((error) => ({ status: "unknown", error: error.message })),
  ]);

  return {
    generated: now(),
    canonical,
    https,
    http,
    landing,
    card,
    securityTxt,
    robots,
    sitemap,
    dns: { cname, a, aaaa, caa },
    hstsPreload,
  };
}

export function writeAudit(payload, snapshot, liveResults, privateResults, outputPath = AUDIT_OUTPUT) {
  const result = {
    generated: new Date().toISOString(),
    fr_id: canonical.frId,
    canonical_host: canonical.host,
    canonical_url: canonical.url,
    summary: {
      live: summarize(liveResults),
      private_operations: summarize(privateResults),
    },
    snapshot: {
      https: { status: snapshot.https.status, headers: snapshot.https.headers },
      http: { status: snapshot.http.status, location: snapshot.http.location },
      card: { status: snapshot.card.status },
      security_txt_status: snapshot.securityTxt.status,
      robots_status: snapshot.robots.status,
      sitemap_status: snapshot.sitemap.status,
      dns: snapshot.dns,
      hsts_preload: snapshot.hstsPreload,
    },
    live_results: liveResults,
    private_operation_results: privateResults,
    mock_service: payload.mock_service.endpoint,
  };
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, JSON.stringify(result, null, 2) + "\n");
  return result;
}
