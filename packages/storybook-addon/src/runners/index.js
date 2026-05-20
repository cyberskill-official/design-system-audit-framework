import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(here, "..", "..");
const repoRoot = resolve(packageRoot, "..", "..");

export function runDsafChecks({ cwd = repoRoot } = {}) {
  const runner = resolve(repoRoot, "scripts", "storybook-addon-runner.mjs");
  const result = spawnSync(process.execPath, [runner], {
    cwd,
    encoding: "utf8"
  });

  if (result.status !== 0) {
    return {
      ok: false,
      status: result.status,
      stdout: result.stdout,
      stderr: result.stderr,
      error: "DSAF Storybook runner failed"
    };
  }

  return JSON.parse(result.stdout);
}
