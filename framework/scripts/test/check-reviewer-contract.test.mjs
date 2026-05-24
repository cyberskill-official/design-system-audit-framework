import test from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

import {
  countMatches,
  evaluateOutreachMock,
  evaluateReviewerContract,
  loadReviewerPayload,
  makeResult,
  parseShortlistRows,
  readJson,
  safeRead,
  summarize,
  uniqueValues,
  writeReviewerEvidence,
} from "../lib/reviewer-contract-lib.mjs";

const payload = loadReviewerPayload();

function shortlistText() {
  return `# DSAF reviewer shortlist

| Rank | Name | Role / affiliation | Why DSAF-relevant | Warmth | Review status (FR-GOV-001) | Heads-up status (FR-LAUNCH-004) |
|---:|---|---|---|---:|---|---|
${payload.expected_reviewers.map((name, index) => `| ${index + 1} | ${name} | Role | Relevant | ${index < 2 ? 4 : 3} | not-contacted | not-contacted |`).join("\n")}
`;
}

function fixtureRepo() {
  const root = mkdtempSync(join(tmpdir(), "dsaf-reviewers-"));
  mkdirSync(join(root, "internal/social"), { recursive: true });
  mkdirSync(join(root, "internal/branding"), { recursive: true });
  writeFileSync(join(root, payload.files.shortlist), shortlistText());
  const playbookLines = [
    "review, not endorsement",
    "would value your roast",
    "Do not ask for upvotes, reposts, public praise, or paid endorsement.",
    "Send outreach one to two weeks before Show HN.",
    "Follow up once after five business days",
    "Approved surfaces: README, audit.cyberskill.world launch page, Show HN launch comment",
    "Retraction: remove within 7 days of written request",
  ];
  const socialLines = [
    "Nathan Curtis",
    "Sil Bormüller",
    "Brad Frost",
    "exact quote text",
    "Email reply with \"approved\"",
    "README ships the quote byte-identical to your approval",
    "No ask to amplify.",
    "No follow-ups beyond the one in personal-outreach.md.",
  ];
  if (payload.files.branding_playbook === payload.files.social_drafts) {
    writeFileSync(join(root, payload.files.branding_playbook), [...playbookLines, ...socialLines].join("\n"));
  } else {
    writeFileSync(join(root, payload.files.branding_playbook), playbookLines.join("\n"));
    writeFileSync(join(root, payload.files.social_drafts), socialLines.join("\n"));
  }
  writeFileSync(join(root, payload.files.consent_log), payload.required_consent_strings.join("\n"));
  writeFileSync(join(root, payload.files.readme), payload.required_readme_strings.join("\n"));
  writeFileSync(join(root, "package.json"), JSON.stringify({ scripts: payload.required_package_scripts }));
  return root;
}

test("parseShortlistRows reads reviewer rows and helpers count uniqueness", () => {
  const rows = parseShortlistRows(shortlistText());
  assert.equal(rows.length, 10);
  assert.equal(rows[0].name, "Nathan Curtis");
  assert.equal(uniqueValues(rows.map((row) => row.name)).length, 10);
  assert.equal(countMatches("Review review", "review"), 2);
});

test("safeRead and readJson expose missing and malformed states", () => {
  const root = mkdtempSync(join(tmpdir(), "dsaf-reviewer-io-"));
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

test("evaluateReviewerContract passes a clean fixture with mocked outreach", () => {
  const root = fixtureRepo();
  try {
    const summary = summarize(evaluateReviewerContract(payload, root).results);
    assert.equal(summary.fail, 0);
    assert.equal(summary.mocked, 5);
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateReviewerContract catches duplicate names and bad status", () => {
  const root = fixtureRepo();
  try {
    writeFileSync(join(root, payload.files.shortlist), shortlistText().replace("Sil Bormüller", "Nathan Curtis").replace("not-contacted", "maybe"));
    const failures = evaluateReviewerContract(payload, root).results.filter((item) => item.status === "fail");
    assert.ok(failures.some((item) => item.rule_id === "shortlist-unique-names"));
    assert.ok(failures.some((item) => item.rule_id === "shortlist-status-value"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateReviewerContract catches missing playbook strings and forbidden asks", () => {
  const root = fixtureRepo();
  try {
    writeFileSync(join(root, payload.files.branding_playbook), "please upvote and guaranteed quote");
    writeFileSync(join(root, payload.files.social_drafts), "please retweet");
    const failures = evaluateReviewerContract(payload, root).results.filter((item) => item.status === "fail");
    assert.ok(failures.some((item) => item.rule_id === "branding-playbook-required-string"));
    assert.ok(failures.some((item) => item.rule_id === "branding-playbook-forbidden-ask"));
    assert.ok(failures.some((item) => item.rule_id === "social-draft-forbidden-ask"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateReviewerContract catches missing consent, README, and package evidence", () => {
  const root = mkdtempSync(join(tmpdir(), "dsaf-reviewer-empty-"));
  try {
    writeFileSync(join(root, "package.json"), JSON.stringify({ scripts: {} }));
    const failures = evaluateReviewerContract(payload, root).results.filter((item) => item.status === "fail");
    assert.ok(failures.some((item) => item.rule_id === "shortlist-exists"));
    assert.ok(failures.some((item) => item.rule_id === "consent-log-exists"));
    assert.ok(failures.some((item) => item.rule_id === "readme-exists"));
    assert.ok(failures.some((item) => item.rule_id === "package-script"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateOutreachMock catches malformed request and response shapes", () => {
  const badPayload = structuredClone(payload);
  badPayload.outreach_mock_contract.endpoint = "GET /bad";
  badPayload.outreach_mock_contract.request.recipients = [{ name: "Someone", status: "contacted" }];
  badPayload.outreach_mock_contract.response.status_code = 500;
  badPayload.outreach_mock_contract.response.body.accepted = false;
  badPayload.outreach_mock_contract.response.body.sent_count = 2;
  const failures = evaluateOutreachMock(badPayload).filter((item) => item.status === "fail");
  assert.ok(failures.some((item) => item.rule_id === "mock-endpoint"));
  assert.ok(failures.some((item) => item.rule_id === "mock-request-recipients"));
  assert.ok(failures.some((item) => item.rule_id === "mock-response-shape"));
});

test("evaluateOutreachMock catches missing defaults", () => {
  const badPayload = structuredClone(payload);
  badPayload.outreach_mock_contract = {};
  const failures = evaluateOutreachMock(badPayload).filter((item) => item.status === "fail");
  assert.ok(failures.some((item) => item.rule_id === "mock-request-ask-shape"));
  assert.ok(failures.some((item) => item.rule_id === "mock-request-materials"));
  assert.ok(failures.some((item) => item.rule_id === "mock-response-shape"));
});

test("writeReviewerEvidence writes structured output and summarizes", () => {
  const root = fixtureRepo();
  const out = mkdtempSync(join(tmpdir(), "dsaf-reviewer-out-"));
  try {
    const output = join(out, "audit.json");
    const audit = writeReviewerEvidence(payload, evaluateReviewerContract(payload, root), output);
    const written = JSON.parse(readFileSync(output, "utf8"));
    assert.equal(audit.fr_id, "FR-GOV-001");
    assert.equal(written.summary.fail, 0);
    assert.deepEqual(summarize([makeResult(true, "x", "file", 1, 1, "mocked"), makeResult(false, "y", "file", 1, 2)]), { pass: 0, mocked: 1, fail: 1, ok: false });
  }
  finally {
    rmSync(root, { recursive: true, force: true });
    rmSync(out, { recursive: true, force: true });
  }
});
