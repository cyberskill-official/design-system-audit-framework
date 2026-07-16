import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

import {
  canonical,
  collectLiveSnapshot,
  collectStrings,
  evaluateLiveSnapshot,
  evaluatePrivateOperationContract,
  loadDomainPayload,
  mockDomainOperation,
  summarize,
  writeAudit,
} from "../lib/domain-contract-lib.mjs";

const payload = loadDomainPayload();

function passingSnapshot() {
  const headers = {
    "strict-transport-security": "max-age=63072000; includeSubDomains; preload",
    "content-security-policy": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
    "x-content-type-options": "nosniff",
    "x-frame-options": "DENY",
    "referrer-policy": "strict-origin-when-cross-origin",
  };
  return {
    https: { status: 200, headers },
    http: { status: 308, location: canonical.url },
    landing: {
      body: `<html><head><link rel="canonical" href="${canonical.url}"><meta property="og:url" content="${canonical.url}"></head><body>DSAF</body></html>`,
    },
    card: { status: 200 },
    securityTxt: {
      status: 200,
      body: `Contact: mailto:info@cyberskill.world\nExpires: 2027-05-17T00:00:00Z\nCanonical: ${canonical.url}.well-known/security.txt\n`,
    },
    robots: { status: 200, body: `User-agent: *\nAllow: /\nSitemap: ${canonical.url}sitemap.xml\n` },
    sitemap: { status: 200, body: `<urlset><url><loc>${canonical.url}</loc></url></urlset>` },
    dns: {
      cname: ["fc81b60f04f66eff.vercel-dns-017.com"],
      a: ["216.198.79.65"],
      aaaa: [],
      caa: [],
    },
    hstsPreload: { status: "unknown" },
  };
}

test("evaluates the private mock operation contract", () => {
  const results = evaluatePrivateOperationContract(payload);
  assert.equal(summarize(results).fail, 0);
  assert.ok(results.length > 40);
});

test("mockDomainOperation echoes deterministic operation details", () => {
  const operation = payload.private_operations[0];
  const response = mockDomainOperation(operation.request, operation.expected_response);
  assert.equal(response.status, 202);
  assert.equal(response.body.received_operation_id, operation.operation_id);
  assert.equal(response.body.received_canonical_host, canonical.host);

  const rejected = mockDomainOperation({ method: "GET", url: "/wrong", body: {} }, operation.expected_response);
  assert.equal(rejected.status, 400);
});

test("live snapshot evaluator passes public checks and marks private public gaps as mocked", () => {
  const results = evaluateLiveSnapshot(passingSnapshot(), payload);
  const summary = summarize(results);
  assert.equal(summary.fail, 0);
  assert.ok(summary.pass >= 20);
  assert.equal(summary.mocked, 3);
});

test("live snapshot evaluator fails malformed internal/landing pages", () => {
  const snapshot = passingSnapshot();
  snapshot.landing.body += "<form><input type=\"email\"></form>";
  const results = evaluateLiveSnapshot(snapshot, payload);
  const failed = results.filter((result) => result.status === "fail").map((result) => result.name);
  assert.ok(failed.some((name) => name.includes("forbidden pattern")));
});

test("collectStrings walks nested payloads", () => {
  const values = collectStrings({ a: "one", b: ["two", { c: "three" }] });
  assert.deepEqual(values, ["one", "two", "three"]);
});

test("collectLiveSnapshot supports injected fetch and DNS dependencies", async () => {
  const fetchImpl = async (url, options = {}) => {
    const headers = new Map([
      ["strict-transport-security", "max-age=63072000; includeSubDomains; preload"],
      ["content-security-policy", "default-src 'self'; frame-ancestors 'none'; form-action 'self'"],
      ["x-content-type-options", "nosniff"],
      ["x-frame-options", "DENY"],
      ["referrer-policy", "strict-origin-when-cross-origin"],
      ["location", canonical.url],
    ]);
    const text = async () => {
      if (url.endsWith("security.txt")) return `Contact: mailto:info@cyberskill.world\nExpires: 2027-05-17T00:00:00Z\nCanonical: ${canonical.url}.well-known/security.txt\n`;
      if (url.endsWith("robots.txt")) return `User-agent: *\nSitemap: ${canonical.url}sitemap.xml\n`;
      if (url.endsWith("sitemap.xml")) return `<urlset><url><loc>${canonical.url}</loc></url></urlset>`;
      if (url.includes("hstspreload.org")) return "not-json";
      return `<html><head><link rel="canonical" href="${canonical.url}"><meta property="og:url" content="${canonical.url}"></head><body>DSAF</body></html>`;
    };
    return {
      status: url.startsWith("http://") ? 308 : 200,
      headers,
      text,
    };
  };
  const resolveImpl = async (_host, type) => {
    if (type === "AAAA" || type === "CAA") throw new Error("no data");
    if (type === "CNAME") return ["example.vercel-dns-001.com"];
    return ["216.198.79.65"];
  };

  const snapshot = await collectLiveSnapshot({
    fetchImpl,
    resolveImpl,
    now: () => "2026-05-18T00:00:00.000Z",
  });

  assert.equal(snapshot.generated, "2026-05-18T00:00:00.000Z");
  assert.equal(snapshot.http.status, 308);
  assert.deepEqual(snapshot.dns.aaaa, []);
  assert.equal(snapshot.hstsPreload.status, "unknown");
  assert.equal(snapshot.hstsPreload.raw, "not-json");
});

test("writeAudit writes structured evidence", () => {
  const dir = mkdtempSync(join(tmpdir(), "dsaf-domain-contract-"));
  try {
    const outputPath = join(dir, "domain-contract.json");
    const snapshot = passingSnapshot();
    const liveResults = evaluateLiveSnapshot(snapshot, payload);
    const privateResults = evaluatePrivateOperationContract(payload);
    const audit = writeAudit(payload, snapshot, liveResults, privateResults, outputPath);
    const written = JSON.parse(readFileSync(outputPath, "utf8"));

    assert.equal(audit.summary.live.fail, 0);
    assert.equal(written.task_id, "TASK-BRAND-001");
    assert.equal(written.mock_service, "POST /mock/domain-operations");
  }
  finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
