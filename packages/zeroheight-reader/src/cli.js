#!/usr/bin/env node
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { scoreZeroheightExport } from "./index.js";

export function runCli(argv = process.argv.slice(2)) {
  const input = argv[0] ? resolve(argv[0]) : resolve("zeroheight-export");
  if (!existsSync(input)) {
    console.error(`[zeroheight-reader] Missing input: ${input}`);
    console.error("Usage: dsaf-zeroheight-reader <path-to-zeroheight-export-dir-or-index.html>");
    return 2;
  }
  try {
    console.log(JSON.stringify(scoreZeroheightExport(input), null, 2));
    return 0;
  } catch (error) {
    console.error(`[zeroheight-reader] ${error.message}`);
    return 1;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exit(runCli());
}
