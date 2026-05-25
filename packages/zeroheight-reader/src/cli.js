#!/usr/bin/env node
import { existsSync, writeFileSync, unlinkSync } from "node:fs";
import { resolve } from "node:path";
import { scoreZeroheightExport } from "./index.js";

export async function runCli(argv = process.argv.slice(2)) {
  const inputArg = argv[0] || "zeroheight-export";
  let input = inputArg;
  let isTemp = false;

  if (inputArg.startsWith("http://") || inputArg.startsWith("https://")) {
    try {
      const res = await fetch(inputArg);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      input = resolve(".dsaf-temp-zeroheight.html");
      writeFileSync(input, text, "utf8");
      isTemp = true;
    } catch (e) {
      console.error(`[zeroheight-reader] Could not fetch HTML: ${e.message}`);
      return 1;
    }
  } else {
    input = resolve(inputArg);
    if (!existsSync(input)) {
      console.error(`[zeroheight-reader] Missing input: ${input}`);
      console.error("Usage: dsaf-zeroheight-reader <path-or-url>");
      return 2;
    }
  }

  try {
    console.log(JSON.stringify(scoreZeroheightExport(input), null, 2));
    if (isTemp) unlinkSync(input);
    return 0;
  } catch (error) {
    console.error(`[zeroheight-reader] ${error.message}`);
    if (isTemp) unlinkSync(input);
    return 1;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runCli().then(process.exit);
}
