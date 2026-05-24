import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(here, "..", "..");
const repoRoot = resolve(packageRoot, "..", "..");

export function normalizeRunnerResult(result) {
  if (result.error) {
    return {
      ok: false,
      status: result.status,
      signal: result.signal,
      stdout: result.stdout,
      stderr: result.stderr,
      error: "DSAF Storybook runner could not complete",
      detail: result.error.message
    };
  }

  if (result.status !== 0) {
    return {
      ok: false,
      status: result.status,
      signal: result.signal,
      stdout: result.stdout,
      stderr: result.stderr,
      error: "DSAF Storybook runner failed"
    };
  }

  try {
    return JSON.parse(result.stdout);
  } catch (error) {
    return {
      ok: false,
      status: result.status,
      signal: result.signal,
      stdout: result.stdout,
      stderr: result.stderr,
      error: "DSAF Storybook runner returned invalid JSON",
      detail: error.message
    };
  }
}

export function runDsafChecks({ cwd = repoRoot, timeout = 30000, maxBuffer = 1024 * 1024 } = {}) {
  const runner = resolve(repoRoot, "scripts", "storybook-addon-runner.mjs");
  const result = spawnSync(process.execPath, [runner], {
    cwd,
    encoding: "utf8",
    maxBuffer,
    timeout
  });

  return normalizeRunnerResult(result);
}
