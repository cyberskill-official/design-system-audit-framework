#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { validateTokens } from "./index.js";

export async function runCli(argv = process.argv.slice(2)) {
  const inputArg = argv[0] || "tokens.json";
  let input = inputArg;
  let source;

  if (inputArg.startsWith("http://") || inputArg.startsWith("https://")) {
    try {
      const res = await fetch(inputArg);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      source = await res.json();
    } catch (error) {
      console.error(`[tokens-validator] Could not fetch JSON: ${error.message}`);
      return 1;
    }
  } else {
    input = resolve(inputArg);
    if (!existsSync(input)) {
      console.error(`[tokens-validator] Missing input: ${input}`);
      console.error("Usage: dsaf-tokens-validator <tokens.json | url>");
      return 2;
    }
    try {
      source = JSON.parse(readFileSync(input, "utf8"));
    } catch (error) {
      console.error(`[tokens-validator] Could not parse JSON: ${error.message}`);
      return 1;
    }
  }

  const summary = validateTokens(source);
  console.log(JSON.stringify({ input, ...summary }, null, 2));
  return 0;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runCli().then(process.exit);
}
