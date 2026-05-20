#!/usr/bin/env node
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { formatSummary, scanRepository } from "./index.js";

export function runCli(argv = process.argv.slice(2)) {
  const [command, maybePath, ...rest] = argv;
  const wantsJson = argv.includes("--json");
  if (!command || command === "--help" || command === "-h") {
    console.log("Usage: dsaf scan [path] [--json]");
    return 0;
  }
  if (command !== "scan") {
    console.error(`[dsaf] Unknown command: ${command}`);
    console.error("Usage: dsaf scan [path] [--json]");
    return 2;
  }
  const targetArg = maybePath && !maybePath.startsWith("--") ? maybePath : ".";
  const target = resolve(targetArg);
  if (!existsSync(target)) {
    console.error(`[dsaf] Missing path: ${target}`);
    return 2;
  }
  const result = scanRepository(target);
  if (wantsJson || rest.includes("--json")) console.log(JSON.stringify(result, null, 2));
  else console.log(formatSummary(result));
  return 0;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exit(runCli());
}
