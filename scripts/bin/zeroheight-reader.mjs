#!/usr/bin/env node
import { runCli } from "../../packages/zeroheight-reader/src/cli.js";

process.exit(await runCli(process.argv.slice(2)));
