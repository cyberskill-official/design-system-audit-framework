#!/usr/bin/env node
/**
 * Verify the FR-LAUNCH-006 newsletter payload and mock-service contract.
 *
 * This is intentionally dependency-free: the real newsletter submissions are
 * manual/authenticated, so this contract makes the missing service shape
 * testable without pretending that anything was published.
 */

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const PAYLOAD = resolve(ROOT, "docs/social/FR-LAUNCH-006-social-payload.json");
const expectedNewsletters = new Set(["ids-weekly", "pattern-pulse", "sidebar", "smashing"]);
const requiredRequestFields = [
  "fr_id",
  "newsletter_id",
  "canonical_url",
  "title",
  "summary",
  "copy",
  "tags",
  "author",
  "scheduled_for",
  "no_follow_up",
  "no_paid_cta",
];
const requiredResponseFields = [
  "accepted",
  "submission_id",
  "manual_review",
  "next_check_date",
];
const forbiddenText = [
  /84\.6/i,
  /industry[- ]?leading/i,
  /top tier/i,
  /L5 Optimised/i,
  /Talk to a certified/i,
  /Schedule (a|your) demo/i,
  /Book (a|your) call/i,
  /\?utm=/i,
];

function fail(message) {
  console.error(`[newsletter-contract] ${message}`);
  process.exitCode = 1;
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function collectStrings(value, out = []) {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((item) => collectStrings(item, out));
  else if (value && typeof value === "object") {
    Object.values(value).forEach((item) => collectStrings(item, out));
  }
  return out;
}

function mockSubmit(request, expectedResponse) {
  if (request.method !== "POST" || request.url !== "/mock/newsletter-submissions") {
    return { status: 400, body: { accepted: false, error: "invalid endpoint" } };
  }
  return {
    status: expectedResponse.status,
    body: {
      ...expectedResponse.body,
      received_canonical_url: request.body.canonical_url,
    },
  };
}

const payload = JSON.parse(readFileSync(PAYLOAD, "utf8"));

assert(payload.fr_id === "FR-LAUNCH-006", "payload fr_id must be FR-LAUNCH-006");
assert(payload.status.includes("mocked-dependency"), "payload status must record mocked-dependency");
assert(payload.canonical_post?.url?.startsWith("https://audit.cyberskill.world/blog/deep-dives/"), "canonical post must use the audit.cyberskill.world deep-dive URL");
assert(payload.observability?.tracking_file === "docs/launch/newsletter-submissions.md", "observability tracking file must point to newsletter runbook");
assert(Array.isArray(payload.submissions), "payload submissions must be an array");
assert(payload.submissions.length === 4, "payload must define exactly four newsletter submissions");

const seen = new Set();
for (const submission of payload.submissions) {
  const { newsletter_id: id, request, expected_response: expectedResponse } = submission;
  assert(expectedNewsletters.has(id), `unexpected newsletter_id: ${id}`);
  assert(!seen.has(id), `duplicate newsletter_id: ${id}`);
  seen.add(id);
  assert(submission.blocker && submission.blocker.length >= 20, `${id} must document the physical blocker`);
  assert(request?.method === "POST", `${id} request method must be POST`);
  assert(request?.url === "/mock/newsletter-submissions", `${id} request URL must hit the mock endpoint`);
  assert(request.headers?.["content-type"] === "application/json", `${id} content-type must be application/json`);

  for (const field of requiredRequestFields) {
    assert(Object.hasOwn(request.body, field), `${id} request body missing ${field}`);
  }

  assert(request.body.fr_id === payload.fr_id, `${id} request fr_id mismatch`);
  assert(request.body.newsletter_id === id, `${id} request newsletter_id mismatch`);
  assert(request.body.canonical_url === payload.canonical_post.url, `${id} canonical_url mismatch`);
  assert(request.body.no_follow_up === true, `${id} must set no_follow_up=true`);
  assert(request.body.no_paid_cta === true, `${id} must set no_paid_cta=true`);
  assert(Array.isArray(request.body.tags) && request.body.tags.length >= 2, `${id} tags must contain at least two entries`);
  assert(!request.body.canonical_url.includes("?"), `${id} canonical_url must not include query parameters`);

  assert(expectedResponse?.status === 202, `${id} expected response status must be 202`);
  for (const field of requiredResponseFields) {
    assert(Object.hasOwn(expectedResponse.body, field), `${id} expected response missing ${field}`);
  }
  assert(expectedResponse.body.submission_id === `mock-FR-LAUNCH-006-${id}-week-01`, `${id} submission_id must be deterministic`);
  assert(/^\d{4}-\d{2}-\d{2}$/.test(expectedResponse.body.next_check_date), `${id} next_check_date must be YYYY-MM-DD`);

  const strings = collectStrings(submission);
  for (const pattern of forbiddenText) {
    assert(!strings.some((text) => pattern.test(text)), `${id} contains forbidden text pattern ${pattern}`);
  }

  const mocked = mockSubmit(request, expectedResponse);
  assert(mocked.status === 202, `${id} mock service returned non-202`);
  assert(mocked.body.submission_id === expectedResponse.body.submission_id, `${id} mock response submission_id mismatch`);
  assert(mocked.body.received_canonical_url === payload.canonical_post.url, `${id} mock response did not echo canonical URL`);
}

for (const id of expectedNewsletters) {
  assert(seen.has(id), `missing expected newsletter_id: ${id}`);
}

if (process.exitCode) process.exit(1);

console.log("[newsletter-contract] PASS");
console.log(`[newsletter-contract] submissions=${payload.submissions.length}`);
console.log(`[newsletter-contract] mock_endpoint=${payload.mock_service.endpoint}`);
console.log(`[newsletter-contract] tracking=${payload.observability.tracking_file}`);
