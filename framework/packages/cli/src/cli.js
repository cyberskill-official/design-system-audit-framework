#!/usr/bin/env node
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { parseArgs } from "node:util";
import { formatSummary, scanRepository } from "./index.js";

const USAGE = "Usage: dsaf scan [path] [--json]";

export function runCli(argv = process.argv.slice(2)) {
  const [command, ...args] = argv;
  if (!command || command === "--help" || command === "-h") {
    console.log(USAGE);
    return 0;
  }
  if (command !== "scan") {
    console.error(`[dsaf] Unknown command: ${command}`);
    console.error(USAGE);
    return 2;
  }

  let parsed;
  try {
    parsed = parseArgs({
      args,
      allowPositionals: true,
      options: {
        help: { type: "boolean", short: "h" },
        json: { type: "boolean" }
      }
    });
  } catch (error) {
    console.error(`[dsaf] ${error.message}`);
    console.error(USAGE);
    return 2;
  }

  if (parsed.values.help) {
    console.log(USAGE);
    return 0;
  }

  if (parsed.positionals.length > 1) {
    console.error(`[dsaf] Expected at most one path, received ${parsed.positionals.length}`);
    console.error(USAGE);
    return 2;
  }

  const targetArg = parsed.positionals[0] ?? ".";
  const target = resolve(targetArg);
  if (!existsSync(target)) {
    console.error(`[dsaf] Missing path: ${target}`);
    return 2;
  }
  const result = scanRepository(target);
  if (parsed.values.json) console.log(JSON.stringify(result, null, 2));
  else console.log(formatSummary(result));
  return 0;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exit(runCli());
}
