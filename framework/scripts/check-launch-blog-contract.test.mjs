import test from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

import {
  countMatches,
  evaluateDeployMock,
  evaluateLaunchBlogContract,
  loadLaunchBlogPayload,
  makeResult,
  parseFrontmatter,
  pngDimensions,
  readJson,
  safeRead,
  summarize,
  wordCount,
  writeLaunchBlogEvidence,
} from "./launch-blog-contract-lib.mjs";

const payload = loadLaunchBlogPayload();
const pngHeader1200x630 = Buffer.from("89504e470d0a1a0a0000000d49484452000004b0000002760806000000", "hex");

function fixturePost() {
  const words = Array.from({ length: 1300 }, (_, index) => `word${index}`).join(" ");
  return `---
title: "We built DSAF because design-system audits kept becoming taste arguments"
slug: launch-2026
date: 2026-05-18
author: Stephen Cheng
summary: "The candid launch note for DSAF."
canonical: https://audit.cyberskill.world/blog/launch-2026
og_image: https://audit.cyberskill.world/assets/og/launch-2026-1200x630.png
---

# We built DSAF because design-system audits kept becoming taste arguments

## What DSAF is

125-criterion DSAF-25 Core no-silent-regression L3 until independent verification exists geography headwind is real named endorsement quotes No quote appears until the exact wording and attribution are approved in writing github.com/cyberskill-official/design-system-audit-framework Disclosure: I run CyberSkill.

![DSAF L0-L5 maturity ladder](/assets/dsaf-l0-l5-ladder.svg)

## Why we built it

${words}

## What we got wrong first

## What we got right, I think

![DSAF radar chart](/assets/dsaf-radar.svg)

## Who this is for

## What feedback would help

## What's next

## ChangeLog
`;
}

function fixtureRepo() {
  const root = mkdtempSync(join(tmpdir(), "dsaf-blog-"));
  mkdirSync(join(root, "framework/assets/og"), { recursive: true });
  mkdirSync(join(root, "internal/landing/assets/og"), { recursive: true });
  mkdirSync(join(root, "internal/landing/blog/launch-2026"), { recursive: true });
  writeFileSync(join(root, payload.files.post_markdown), fixturePost());
  writeFileSync(join(root, payload.files.blog_index), "launch-2026");
  const html = payload.rendered_html.required_strings.join("\n");
  writeFileSync(join(root, payload.files.rendered_html), html);
  writeFileSync(join(root, payload.files.rendered_flat_html), html);
  writeFileSync(join(root, payload.files.og_svg), "<svg></svg>");
  writeFileSync(join(root, payload.files.og_png), Buffer.concat([pngHeader1200x630, Buffer.alloc(6000)]));
  writeFileSync(join(root, payload.files.deploy_og_png), Buffer.concat([pngHeader1200x630, Buffer.alloc(6000)]));
  writeFileSync(join(root, "package.json"), JSON.stringify({ scripts: payload.required_package_scripts }));
  return root;
}

test("frontmatter, words, PNG, and count helpers work", () => {
  const parsed = parseFrontmatter("---\na: b\n---\nhello world");
  assert.equal(parsed.meta.a, "b");
  assert.equal(wordCount("hello [world](x) ![alt](y) `code`"), 3);
  assert.deepEqual(pngDimensions(pngHeader1200x630), { ok: true, width: 1200, height: 630 });
  assert.equal(pngDimensions(Buffer.from("bad")).ok, false);
  assert.equal(countMatches("DSAF dsaf", "dsaf"), 2);
});

test("safeRead and readJson expose missing and malformed states", () => {
  const root = mkdtempSync(join(tmpdir(), "dsaf-blog-io-"));
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

test("evaluateLaunchBlogContract passes a complete fixture with mocked deploy", () => {
  const root = fixtureRepo();
  try {
    const summary = summarize(evaluateLaunchBlogContract(payload, root).results);
    assert.equal(summary.fail, 0);
    assert.equal(summary.mocked, 5);
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateLaunchBlogContract catches frontmatter and body regressions", () => {
  const root = fixtureRepo();
  try {
    writeFileSync(join(root, payload.files.post_markdown), "---\ntitle: Too long ".repeat(20));
    const failures = evaluateLaunchBlogContract(payload, root).results.filter((item) => item.status === "fail");
    assert.ok(failures.some((item) => item.rule_id === "frontmatter-present"));
    assert.ok(failures.some((item) => item.rule_id === "body-word-count"));
    assert.ok(failures.some((item) => item.rule_id === "body-required-heading"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateLaunchBlogContract catches rendered HTML and asset defects", () => {
  const root = fixtureRepo();
  try {
    writeFileSync(join(root, payload.files.rendered_html), "missing");
    writeFileSync(join(root, payload.files.og_png), Buffer.from("bad"));
    const failures = evaluateLaunchBlogContract(payload, root).results.filter((item) => item.status === "fail");
    assert.ok(failures.some((item) => item.rule_id === "rendered-html-required-string"));
    assert.ok(failures.some((item) => item.rule_id === "og-png-dimensions"));
    assert.ok(failures.some((item) => item.rule_id === "og-png-size"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateLaunchBlogContract catches missing files and package framework/scripts", () => {
  const root = mkdtempSync(join(tmpdir(), "dsaf-blog-empty-"));
  try {
    writeFileSync(join(root, "package.json"), JSON.stringify({ scripts: {} }));
    const failures = evaluateLaunchBlogContract(payload, root).results.filter((item) => item.status === "fail");
    assert.ok(failures.some((item) => item.rule_id === "post-exists"));
    assert.ok(failures.some((item) => item.rule_id === "rendered-html-exists"));
    assert.ok(failures.some((item) => item.rule_id === "blog-index-exists"));
    assert.ok(failures.some((item) => item.rule_id === "package-script"));
  }
  finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("evaluateDeployMock catches malformed and missing shapes", () => {
  const badPayload = structuredClone(payload);
  badPayload.deploy_mock_contract.endpoint = "GET /bad";
  badPayload.deploy_mock_contract.request.approved_quote_count = 2;
  badPayload.deploy_mock_contract.response.status_code = 500;
  badPayload.deploy_mock_contract.response.body.production_deploy = "live";
  let failures = evaluateDeployMock(badPayload).filter((item) => item.status === "fail");
  assert.ok(failures.some((item) => item.rule_id === "mock-endpoint"));
  assert.ok(failures.some((item) => item.rule_id === "mock-request-blockers"));
  assert.ok(failures.some((item) => item.rule_id === "mock-response-shape"));

  badPayload.deploy_mock_contract = {};
  failures = evaluateDeployMock(badPayload).filter((item) => item.status === "fail");
  assert.ok(failures.some((item) => item.rule_id === "mock-request-identity"));
  assert.ok(failures.some((item) => item.rule_id === "mock-response-accepted"));
});

test("writeLaunchBlogEvidence writes structured output and summarizes", () => {
  const root = fixtureRepo();
  const out = mkdtempSync(join(tmpdir(), "dsaf-blog-out-"));
  try {
    const output = join(out, "audit.json");
    const audit = writeLaunchBlogEvidence(payload, evaluateLaunchBlogContract(payload, root), output);
    const written = JSON.parse(readFileSync(output, "utf8"));
    assert.equal(audit.fr_id, "FR-DOCS-003");
    assert.equal(written.summary.fail, 0);
    assert.deepEqual(summarize([makeResult(true, "x", "file", 1, 1, "mocked"), makeResult(false, "y", "file", 1, 2)]), { pass: 0, mocked: 1, fail: 1, ok: false });
  }
  finally {
    rmSync(root, { recursive: true, force: true });
    rmSync(out, { recursive: true, force: true });
  }
});
