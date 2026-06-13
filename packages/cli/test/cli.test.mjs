import test from "node:test";
import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import { existsSync, mkdtempSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";

// Integration tests for the built DSAF CLI. These run against the bundled dist/cli.js
// (produced by `npm run build` via esbuild). Using node:test keeps the CLI aligned with
// every other package in this repo and removes the jest + ts-jest + TypeScript toolchain,
// which was failing on jest 30 / ts-jest 29 preset resolution.

const PKG_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const CLI_PATH = join(PKG_ROOT, "dist", "cli.js");

// Ensure the bundle exists. On a fresh checkout dist/ is gitignored, so build it once.
if (!existsSync(CLI_PATH)) {
  try {
    execSync("npm run build", { cwd: PKG_ROOT, stdio: "ignore" });
  } catch {
    // fall through to the assertion below for a clear failure message
  }
}
assert.ok(existsSync(CLI_PATH), `CLI bundle not found at ${CLI_PATH}; run \`npm run build\` in packages/cli first`);

function runCommand(args) {
  try {
    return execSync(`node ${CLI_PATH} ${args}`, { encoding: "utf8", stdio: "pipe" });
  } catch (e) {
    return e.stderr || e.stdout || "";
  }
}

test("prints help information with no arguments", () => {
  const output = runCommand("");
  assert.match(output, /Usage:/);
  assert.match(output, /fix \[options\] <target-dir>/);
  assert.match(output, /chat \[options\] <target-dir>/);
  assert.match(output, /export <input-json>/);
  assert.match(output, /parse-storybook <storybook-json>/);
});

test("errors when export is run without a valid file", () => {
  const output = runCommand("export non_existent_file.json");
  assert.match(output, /Error: Input file not found/);
});

test("errors when parse-storybook is run without a valid file", () => {
  const output = runCommand("parse-storybook non_existent_storybook.json");
  assert.match(output, /Error: Storybook file not found/);
});

test("converts an audit JSON into a Jira/Linear CSV", () => {
  const work = mkdtempSync(join(tmpdir(), "dsaf-cli-export-"));
  const jsonPath = join(work, "test-audit.json");
  const csvPath = join(work, "test-audit.csv");
  try {
    writeFileSync(jsonPath, JSON.stringify({
      score: 75,
      summary: "Test summary",
      violations: [
        { rule: "Color Contrast", description: "Text contrast is too low", file: "Button.tsx", line: 10 },
      ],
    }));
    const output = runCommand(`export ${jsonPath}`);
    assert.match(output, /Exported 1 tickets/);
    const csv = readFileSync(csvPath, "utf8");
    assert.match(csv, /Summary,Description,Issue Type/);
    assert.match(csv, /\[DSAF\] Fix Color Contrast in Button\.tsx/);
  } finally {
    rmSync(work, { recursive: true, force: true });
  }
});
