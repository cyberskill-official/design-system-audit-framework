import test from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";

/** Write a fixture file, creating its parent directory tree first (robust to any layout). */
function w(absPath, content) {
  mkdirSync(dirname(absPath), { recursive: true });
  writeFileSync(absPath, content);
}

import {
  countMatches,
  evaluateDecouplingContract,
  evaluateMockContract,
  historicalRedirectRows,
  loadDecouplingPayload,
  makeResult,
  readJson,
  safeRead,
  summarize,
  vercelHasRedirects,
  walkActiveSurfaces,
  writeDecouplingEvidence,
} from "../lib/decoupling-contract-lib.mjs";

const payload = loadDecouplingPayload();

function fixtureRepo() {
  const root = mkdtempSync(join(tmpdir(), "dsaf-decoupling-"));
  mkdirSync(join(root, ".github"), { recursive: true });
  mkdirSync(join(root, "internal"), { recursive: true });
  mkdirSync(join(root, "docs/outputs/_audit"), { recursive: true });
  mkdirSync(join(root, "apps/landing"), { recursive: true });
  mkdirSync(join(root, "docs/internal/branding"), { recursive: true });
  mkdirSync(join(root, "apps/landing/card"), { recursive: true });
  mkdirSync(join(root, "apps/landing/benchmark"), { recursive: true });
  mkdirSync(join(root, "apps/landing/benchmark/privacy"), { recursive: true });

  w(join(root, "docs/internal/branding/brand-decoupling-domain-decision.md"), [
    "# DSAF / CyberSkill decoupling decision",
    "## Decision",
    "**Status:** ratified — TASK-BRAND-004.",
    "Brand decoupling is achieved **at the content layer**, not the URL layer.",
    "The framework runs at `https://audit.cyberskill.world/` and Brand decoupling is achieved **at the content layer**, not the URL layer.",
    "## Why we're keeping the URL on CyberSkill infra",
    "## Redirect posture",
    "There is no redirect to install.",
    "## Copy guardrails",
    "- Do not describe DSAF as a CyberSkill product.",
    "- Do not put paid-service CTAs on DSAF's primary docs or internal/landing page.",
    "- Do route paid-audit conversations to `SERVICES.md`, not the framework surfaces.",
    "",
    "**Canonical URL:** `https://audit.cyberskill.world/`.",
    "The earlier plan to mint a neutral `dsaf.dev` domain",
    "is **not being pursued**",
    "The brand-coupling is mitigated by **page content discipline**, not URL choice",
    "",
    "**No redirects are installed.**",
    "**Current canonical URL:** `https://audit.cyberskill.world/`",
    "`audit.cyberskill.world` IS the canonical URL",
    "The file is retained because the task specs",
    "| # | Old URL (audit.cyberskill.world) | Action | New URL (neutral domain) |",
    "|---:|---|---|---|",
    "| 1 | `/` | migrate-and-rewrite | apex |",
    "| 2 | `/framework` | migrate-and-rewrite | apex |",
    "| 3 | `/docs/framework/criteria` | migrate-content | `/criteria` |",
    "| 4 | `/docs/framework/levels` | migrate-content | `/levels` |",
    "| 5 | `/docs/framework/dsaf-25` | migrate-content | `/card` |",
    "| 6 | `/blog/*` | migrate-content | `/blog/:slug` |",
    "| 7 | `/services/*` | keep-on-cyberskill | no migration |",
    "| 8 | `/pricing` | keep-on-cyberskill | no migration |",
    "| 9 | `/contact` | keep-on-cyberskill | no migration |",
    "| 10 | `/about` | keep-on-cyberskill | no migration |",
  ].join("\n"));

  w(join(root, "docs/internal/ADR-TASK-BRAND-004.md"), "TASK-BRAND-004\n\n**Status:** accepted\n\n```mermaid\nflowchart TD\nA-->B\n```\n");
  w(join(root, ".github/CODEOWNERS"), payload.required_codeowners.join("\n"));
  w(join(root, "apps/saas-dashboard/vercel.json"), JSON.stringify({ headers: [{ headers: [{ key: "Strict-Transport-Security" }, { key: "Content-Security-Policy" }] }] }));
  w(join(root, "README.md"), "https://audit.cyberskill.world\ndocs/internal/SERVICES.md\ndocs/internal/strategy/framework-monetization-plan.md\nmethodology surface stays neutral\n");
  // Active-surface scan mirror (the canonical scanned landing location). Clean content.
  w(join(root, "docs/internal/landing/index.html"), "<link rel=\"canonical\" href=\"https://audit.cyberskill.world/\"><meta property=\"og:url\" content=\"https://audit.cyberskill.world/\">DSAF — Design System Audit Framework");
  w(join(root, "apps/landing/index.html"), "<link rel=\"canonical\" href=\"https://audit.cyberskill.world/\"><meta property=\"og:url\" content=\"https://audit.cyberskill.world/\">DSAF — Design System Audit Framework");
  w(join(root, "apps/landing/card/index.html"), "<link rel=\"canonical\" href=\"https://audit.cyberskill.world/card\">DSAF-25 Core card");
  w(join(root, "apps/landing/benchmark/index.html"), "<link rel=\"canonical\" href=\"https://audit.cyberskill.world/benchmark/\">Benchmark");
  w(join(root, "apps/landing/benchmark/results.html"), "<link rel=\"canonical\" href=\"https://audit.cyberskill.world/benchmark/results.html\">Results");
  w(join(root, "apps/landing/benchmark/privacy/index.html"), "<link rel=\"canonical\" href=\"https://audit.cyberskill.world/benchmark/privacy/\">info@cyberskill.world");
  w(join(root, "apps/landing/README.md"), "`https://audit.cyberskill.world`\nNo paid-service CTA, pricing, or sales form lives here.\nNo redirect rules ship from here\n");
  w(join(root, "package.json"), JSON.stringify({ scripts: payload.required_package_scripts }));
  return root;
}

test("historicalRedirectRows parses the inventory table", () => {
  const rows = historicalRedirectRows("| 1 | `/framework` | migrate-content | `/framework` |\n");
  assert.deepEqual(rows[0], { old_url: "`/framework`", action: "migrate-content", new_url: "`/framework`" });
});

test("vercelHasRedirects catches redirect and rewrite keys", () => {
  assert.equal(vercelHasRedirects({ headers: [] }), false);
  assert.equal(vercelHasRedirects({ redirects: [] }), true);
  assert.equal(vercelHasRedirects({ rewrites: [{ source: "/x", destination: "/y" }] }), true);
});

test("walkActiveSurfaces includes active internal/landing files", () => {
  const root = fixtureRepo();
  try {
    // Active surfaces are scanned under docs/internal/landing (the canonical mirror),
    // not apps/landing (the built app). dist/.cache/non-matching extensions are skipped.
    w(join(root, "docs/internal/landing", "dist", "ignored.html"), "https://dsaf.dev");
    w(join(root, "docs/internal/landing", ".cache", "ignored.html"), "https://dsaf.dev");
    w(join(root, "docs/internal/landing", "ignored.json"), "{\"url\":\"https://dsaf.dev\"}");
    const files = walkActiveSurfaces(root, payload).map((file) => file.replace(root + "/", ""));
    assert.ok(files.includes("README.md"));
    assert.ok(files.includes("docs/internal/landing/index.html"));
    assert.ok(!files.includes("docs/internal/landing/dist/ignored.html"));
    assert.ok(!files.includes("docs/internal/landing/.cache/ignored.html"));
    assert.ok(!files.includes("docs/internal/landing/ignored.json"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("safeRead and readJson expose missing and malformed file states", () => {
  const root = mkdtempSync(join(tmpdir(), "dsaf-decoupling-io-"));
  try {
    assert.equal(safeRead(root, "missing.md"), null);
    assert.deepEqual(readJson(root, "missing.json"), { ok: false, value: null, error: "missing" });
    w(join(root, "bad.json"), "{not-json");
    assert.equal(readJson(root, "bad.json").ok, false);
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateDecouplingContract passes a clean fixture with mocked deployment control", () => {
  const root = fixtureRepo();
  try {
    const evaluation = evaluateDecouplingContract(payload, root);
    const summary = summarize(evaluation.results);
    assert.equal(summary.fail, 0);
    assert.equal(summary.mocked, 5);
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateDecouplingContract catches stale neutral-domain links and sales copy", () => {
  const root = fixtureRepo();
  try {
    // Sales copy on a landing_public_file (apps/landing/*) triggers landing-forbidden-sales-copy;
    // the neutral domain must appear on a scanned active surface (docs/internal/landing/*).
    w(join(root, "apps/landing/benchmark/results.html"), "book a paid audit.");
    w(join(root, "docs/internal/landing/index.html"), "See https://dsaf.dev for more.");
    const failures = evaluateDecouplingContract(payload, root).results.filter((item) => item.status === "fail");
    assert.ok(failures.some((item) => item.rule_id === "active-surface-no-neutral-domain"));
    assert.ok(failures.some((item) => item.rule_id === "landing-forbidden-sales-copy"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateDecouplingContract catches redirect config and malformed inventory", () => {
  const root = fixtureRepo();
  try {
    w(join(root, "apps/saas-dashboard/vercel.json"), JSON.stringify({ redirects: [{ source: "/x", destination: "/y" }], headers: [] }));
    w(join(root, "docs/internal/branding/brand-decoupling-domain-decision.md"), "no rows");
    const failures = evaluateDecouplingContract(payload, root).results.filter((item) => item.status === "fail");
    assert.ok(failures.some((item) => item.rule_id === "vercel-no-redirects"));
    assert.ok(failures.some((item) => item.rule_id === "redirect-map-inventory-count"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateDecouplingContract catches missing required files and malformed package JSON", () => {
  const root = mkdtempSync(join(tmpdir(), "dsaf-decoupling-empty-"));
  try {
    mkdirSync(join(root, "apps/landing"), { recursive: true });
    w(join(root, "package.json"), "{not-json");
    const failures = evaluateDecouplingContract(payload, root).results.filter((item) => item.status === "fail");
    assert.ok(failures.some((item) => item.rule_id === "decision-file-exists"));
    assert.ok(failures.some((item) => item.rule_id === "domain-decision-file-exists"));
    assert.ok(failures.some((item) => item.rule_id === "redirect-map-exists"));
    assert.ok(failures.some((item) => item.rule_id === "adr-exists"));
    assert.ok(failures.some((item) => item.rule_id === "codeowners-exists"));
    assert.ok(failures.some((item) => item.rule_id === "canonical-surface-exists"));
    assert.ok(failures.some((item) => item.rule_id === "landing-boundary-file-exists"));
    assert.ok(failures.some((item) => item.rule_id === "package-json-valid"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateDecouplingContract catches missing governance and package docs/framework/scripts", () => {
  const root = fixtureRepo();
  try {
    w(join(root, ".github/CODEOWNERS"), "");
    w(join(root, "package.json"), JSON.stringify({ scripts: {} }));
    const failures = evaluateDecouplingContract(payload, root).results.filter((item) => item.status === "fail");
    assert.ok(failures.some((item) => item.rule_id === "codeowners-boundary-gate"));
    assert.ok(failures.some((item) => item.rule_id === "package-script"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateMockContract fails bad mock response shapes", () => {
  const badPayload = structuredClone(payload);
  badPayload.deployment_mock_contract.request.desired_redirect_rules = [{ source: "/x" }];
  badPayload.deployment_mock_contract.response.status_code = 500;
  badPayload.deployment_mock_contract.response.body.accepted = false;
  badPayload.deployment_mock_contract.response.body.redirect_rules_count = 1;
  const failures = evaluateMockContract(badPayload).filter((item) => item.status === "fail");
  assert.ok(failures.some((item) => item.rule_id === "mock-request-no-redirects"));
  assert.ok(failures.some((item) => item.rule_id === "mock-response-accepted"));
  assert.ok(failures.some((item) => item.rule_id === "mock-response-shape"));
});

test("evaluateMockContract catches missing endpoint, request, and response defaults", () => {
  const badPayload = structuredClone(payload);
  badPayload.deployment_mock_contract = {};
  const failures = evaluateMockContract(badPayload).filter((item) => item.status === "fail");
  assert.ok(failures.some((item) => item.rule_id === "mock-endpoint"));
  assert.ok(failures.some((item) => item.rule_id === "mock-request-identity"));
  assert.ok(failures.some((item) => item.rule_id === "mock-request-no-redirects"));
  assert.ok(failures.some((item) => item.rule_id === "mock-response-accepted"));
  assert.ok(failures.some((item) => item.rule_id === "mock-response-shape"));
});

test("writeDecouplingEvidence writes structured output", () => {
  const root = fixtureRepo();
  const out = mkdtempSync(join(tmpdir(), "dsaf-decoupling-out-"));
  try {
    const output = join(out, "audit.json");
    const audit = writeDecouplingEvidence(payload, evaluateDecouplingContract(payload, root), output);
    const written = JSON.parse(readFileSync(output, "utf8"));
    assert.equal(audit.task_id, "TASK-BRAND-004");
    assert.equal(written.summary.fail, 0);
    assert.equal(written.canonical_host, "audit.cyberskill.world");
  }
  finally {
    rmSync(root, { recursive: true, force: true });
    rmSync(out, { recursive: true, force: true });
  }
});

test("helpers count, summarize, and result severities", () => {
  assert.equal(countMatches("DSAF dsaf", "dsaf"), 2);
  assert.deepEqual(summarize([makeResult(true, "x", "file", 1, 1, "mocked"), makeResult(false, "y", "file", 1, 2)]), { pass: 0, mocked: 1, fail: 1, ok: false });
});
