import test from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

import {
  approvedConsentRows,
  countMatches,
  evaluateEndorsementContract,
  evaluateQuoteApprovalMock,
  loadEndorsementPayload,
  makeResult,
  readJson,
  safeRead,
  summarize,
  writeEndorsementEvidence,
} from "./endorsement-contract-lib.mjs";

const payload = loadEndorsementPayload();

function fixtureRepo() {
  const root = mkdtempSync(join(tmpdir(), "dsaf-endorsements-"));
  mkdirSync(join(root, "internal/branding"), { recursive: true });
  writeFileSync(join(root, payload.files.readme), [
    "Named outside-reviewer quotes are not published until explicit written consent is logged.",
    "See internal/branding/reviewer-consent-log.md.",
    "> \"<endorsement quote, <= 280 chars>\" — <Reviewer Name>, <Affiliation>",
    "",
    "> \"<endorsement quote, <= 280 chars>\" — <Reviewer Name>, <Affiliation>",
    "Do not replace them with invented praise.",
  ].join("\n"));
  writeFileSync(join(root, payload.files.consent_log), payload.consent_log_requirements.join("\n"));
  writeFileSync(join(root, payload.files.pending_quotes), payload.pending_quotes_requirements.join("\n"));
  writeFileSync(join(root, payload.files.shortlist), payload.shortlist_requirements.join("\n"));
  writeFileSync(join(root, "package.json"), JSON.stringify({ scripts: payload.required_package_scripts }));
  return root;
}

test("approvedConsentRows ignores header and empty placeholder rows", () => {
  assert.deepEqual(approvedConsentRows("| Reviewer | Quote |\n|---|---|\n| _none_ | _none_ |\n"), []);
  assert.equal(approvedConsentRows("| Nathan | Quote |\n").length, 1);
  assert.equal(countMatches("Quote quote", "quote"), 2);
});

test("safeRead and readJson expose missing and malformed states", () => {
  const root = mkdtempSync(join(tmpdir(), "dsaf-endorsement-io-"));
  try {
    assert.equal(safeRead(root, "missing.md"), null);
    assert.deepEqual(readJson(root, "missing.json"), { ok: false, value: null, error: "missing" });
    writeFileSync(join(root, "bad.json"), "{not-json");
    assert.equal(readJson(root, "bad.json").ok, false);
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateEndorsementContract passes an honest no-consent fixture with mocked approval", () => {
  const root = fixtureRepo();
  try {
    const summary = summarize(evaluateEndorsementContract(payload, root).results);
    assert.equal(summary.fail, 0);
    assert.equal(summary.mocked, 5);
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateEndorsementContract catches fabricated README quotes", () => {
  const root = fixtureRepo();
  try {
    writeFileSync(join(root, payload.files.readme), [
      "Named outside-reviewer quotes are not published until explicit written consent is logged.",
      "> \"DSAF is the criteria-graded artefact the design-systems space has been missing.\" — Nathan Curtis, Independent",
      "Do not replace them with invented praise.",
    ].join("\n"));
    const failures = evaluateEndorsementContract(payload, root).results.filter((item) => item.status === "fail");
    assert.ok(failures.some((item) => item.rule_id === "readme-placeholder-count"));
    assert.ok(failures.some((item) => item.rule_id === "readme-no-real-quotes-without-consent"));
    assert.ok(failures.some((item) => item.rule_id === "no-fabricated-quote-pattern"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateEndorsementContract catches consent and shortlist drift", () => {
  const root = fixtureRepo();
  try {
    writeFileSync(join(root, payload.files.consent_log), "| Nathan | Independent | Approved quote | README | now | quote-approved |");
    writeFileSync(join(root, payload.files.pending_quotes), "Worth running on your own design system");
    writeFileSync(join(root, payload.files.shortlist), "quote-published (2026-05-18)");
    const failures = evaluateEndorsementContract(payload, root).results.filter((item) => item.status === "fail");
    assert.ok(failures.some((item) => item.rule_id === "consent-log-empty-approved-rows"));
    assert.ok(failures.some((item) => item.rule_id === "pending-quotes-required-string"));
    assert.ok(failures.some((item) => item.rule_id === "shortlist-required-string"));
    assert.ok(failures.some((item) => item.rule_id === "no-fabricated-quote-pattern"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateEndorsementContract catches missing files and package framework/scripts", () => {
  const root = mkdtempSync(join(tmpdir(), "dsaf-endorsement-empty-"));
  try {
    writeFileSync(join(root, "package.json"), JSON.stringify({ scripts: {} }));
    const failures = evaluateEndorsementContract(payload, root).results.filter((item) => item.status === "fail");
    assert.ok(failures.some((item) => item.rule_id === "readme-exists"));
    assert.ok(failures.some((item) => item.rule_id === "consent-log-exists"));
    assert.ok(failures.some((item) => item.rule_id === "pending-quotes-exists"));
    assert.ok(failures.some((item) => item.rule_id === "shortlist-exists"));
    assert.ok(failures.some((item) => item.rule_id === "package-script"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateQuoteApprovalMock catches malformed mock shapes", () => {
  const badPayload = structuredClone(payload);
  badPayload.quote_approval_mock_contract.endpoint = "GET /bad";
  badPayload.quote_approval_mock_contract.request.approved_quotes = [{ quote: "fake" }];
  badPayload.quote_approval_mock_contract.response.status_code = 500;
  badPayload.quote_approval_mock_contract.response.body.publication_action = "publish";
  const failures = evaluateQuoteApprovalMock(badPayload).filter((item) => item.status === "fail");
  assert.ok(failures.some((item) => item.rule_id === "mock-endpoint"));
  assert.ok(failures.some((item) => item.rule_id === "mock-request-zero-approvals"));
  assert.ok(failures.some((item) => item.rule_id === "mock-response-shape"));
});

test("evaluateQuoteApprovalMock catches missing defaults", () => {
  const badPayload = structuredClone(payload);
  badPayload.quote_approval_mock_contract = {};
  const failures = evaluateQuoteApprovalMock(badPayload).filter((item) => item.status === "fail");
  assert.ok(failures.some((item) => item.rule_id === "mock-request-threshold"));
  assert.ok(failures.some((item) => item.rule_id === "mock-response-accepted"));
  assert.ok(failures.some((item) => item.rule_id === "mock-response-shape"));
});

test("writeEndorsementEvidence writes structured output and summarizes", () => {
  const root = fixtureRepo();
  const out = mkdtempSync(join(tmpdir(), "dsaf-endorsement-out-"));
  try {
    const output = join(out, "audit.json");
    const audit = writeEndorsementEvidence(payload, evaluateEndorsementContract(payload, root), output);
    const written = JSON.parse(readFileSync(output, "utf8"));
    assert.equal(audit.fr_id, "FR-DOCS-002");
    assert.equal(written.summary.fail, 0);
    assert.deepEqual(summarize([makeResult(true, "x", "file", 1, 1, "mocked"), makeResult(false, "y", "file", 1, 2)]), { pass: 0, mocked: 1, fail: 1, ok: false });
  }
  finally {
    rmSync(root, { recursive: true, force: true });
    rmSync(out, { recursive: true, force: true });
  }
});
