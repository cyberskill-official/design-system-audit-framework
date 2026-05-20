#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { validateTokens } from "./index.js";

export function runCli(argv = process.argv.slice(2)) {
  const input = argv[0] ? resolve(argv[0]) : resolve("tokens.json");
  if (!existsSync(input)) {
    console.error(`[tokens-validator] Missing input: ${input}`);
    console.error("Usage: dsaf-tokens-validator <tokens.json>");
    return 2;
  }
  const source = JSON.parse(readFileSync(input, "utf8"));
  const summary = validateTokens(source);
  console.log(JSON.stringify({ input, ...summary }, null, 2));
  return 0;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exit(runCli());
}
