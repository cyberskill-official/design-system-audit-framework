#!/usr/bin/env node
/**
 * Compatibility CLI for FR-INTEG-002.
 *
 * The package implementation lives in packages/tokens-validator so it can be
 * published as @dsaf/tokens-validator while this repo-level script remains a
 * stable npm run target.
 */

import { runCli } from "../packages/tokens-validator/src/cli.js";

process.exit(runCli(process.argv.slice(2)));
