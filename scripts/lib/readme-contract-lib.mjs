import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const ROOT = resolve(__dirname, '../..');
export const PAYLOAD_PATH = resolve(ROOT, "docs/framework/core/TASK-DOCS-001-readme-contract.json");
export const AUDIT_OUTPUT = resolve(ROOT, "docs/outputs/_audit/readme-contract.json");

export function loadReadmePayload(path = PAYLOAD_PATH) {
  return JSON.parse(readFileSync(path, "utf8"));
}

export function makeResult(condition, ruleId, file, observed, expected, severity = "fail") {
  return {
    rule_id: ruleId,
    file,
    status: condition ? (severity === "mocked" ? "mocked" : "pass") : "fail",
    observed,
    expected,
  };
}

export function safeRead(root, file) {
  const path = resolve(root, file);
  if (!existsSync(path)) return null;
  return readFileSync(path, "utf8");
}

export function readJson(root, file) {
  const text = safeRead(root, file);
  if (text === null) return { ok: false, value: null, error: "missing" };
  try {
    return { ok: true, value: JSON.parse(text), error: null };
  }
  catch (error) {
    return { ok: false, value: null, error: error.message };
  }
}

export function countMatches(text, pattern, flags = "gim") {
  const globalFlags = flags.includes("g") ? flags : `${flags}g`;
  return [...text.matchAll(new RegExp(pattern, globalFlags))].length;
}

export function lineNumberOf(text, needle) {
  const index = text.indexOf(needle);
  if (index < 0) return -1;
  return text.slice(0, index).split(/\r?\n/).length;
}

export function stripReadmeForWords(text) {
  return text
    .replace(/^# .*(\r?\n|$)/, " ")
    .replace(/<picture>[\s\S]*?<\/picture>/g, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[`*_>#|:.,;()[\]{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function firstWords(text, limit) {
  const words = stripReadmeForWords(text).split(/\s+/).filter(Boolean);
  return words.slice(0, limit).join(" ");
}

export function sectionBetween(text, heading) {
  const start = text.indexOf(heading);
  if (start < 0) return "";
  const after = text.slice(start + heading.length);
  const next = after.search(/\n##\s+/);
  return next < 0 ? after : after.slice(0, next);
}

export function commandLines(section) {
  const fence = section.match(/```(?:bash|sh)?\n([\s\S]*?)```/);
  if (!fence) return [];
  return fence[1]
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
}

export function readingOrderRows(section) {
  return section
    .split(/\r?\n/)
    .filter((line) => /^\|\s*\d+\s*\|/.test(line));
}

export function evaluateSkimMock(payload) {
  const contract = payload.skim_mock_contract || {};
  const request = contract.request || {};
  const response = contract.response || {};
  const body = response.body || {};
  return [
    makeResult(contract.endpoint === "POST /mock/readme-skim-review", "mock-endpoint", "mock://readme-skim-review", contract.endpoint, "POST /mock/readme-skim-review", "mocked"),
    makeResult(request.task_id === payload.task_id && request.surface === payload.readme_file, "mock-request-identity", "mock://readme-skim-review", { task_id: request.task_id, surface: request.surface }, { task_id: payload.task_id, surface: payload.readme_file }, "mocked"),
    makeResult(request.duration_seconds === 60 && request.participant_relationship === "external_mock", "mock-request-participant", "mock://readme-skim-review", { duration_seconds: request.duration_seconds, participant_relationship: request.participant_relationship }, "60s external mock", "mocked"),
    makeResult(Array.isArray(request.summary_sentences) && request.summary_sentences.length === 2, "mock-request-summary-shape", "mock://readme-skim-review", request.summary_sentences, "two summary sentences", "mocked"),
    makeResult(response.status_code === 202 && body.accepted === true && body.skim_result === "pass" && typeof body.observability_key === "string", "mock-response-shape", "mock://readme-skim-review", { status_code: response.status_code, body }, "202 accepted pass with observability key", "mocked"),
  ];
}

export function evaluateReadmeContract(payload, root = ROOT) {
  const results = [];
  const files = new Set([payload.readme_file, payload.intro_file, "package.json"]);
  const readme = safeRead(root, payload.readme_file);
  const intro = safeRead(root, payload.intro_file);

  results.push(makeResult(readme !== null, "readme-exists", payload.readme_file, readme === null ? "missing" : "present", "present"));
  if (readme !== null) {
    results.push(makeResult(readme.split(/\r?\n/)[0] === "# DSAF — Design System Audit Framework", "readme-h1", payload.readme_file, readme.split(/\r?\n/)[0], "# DSAF — Design System Audit Framework"));

    const first200 = firstWords(readme, payload.first_200.word_limit);
    results.push(makeResult(first200.split(/\s+/).length === payload.first_200.word_limit, "first-200-word-count", payload.readme_file, first200.split(/\s+/).length, payload.first_200.word_limit));
    for (const [beat, patterns] of Object.entries(payload.first_200.required_patterns)) {
      for (const pattern of patterns) {
        results.push(makeResult(countMatches(first200, pattern, "i") > 0, `first-200-${beat}`, payload.readme_file, pattern, "present"));
      }
    }

    for (const visual of payload.visuals.paths) {
      const line = lineNumberOf(readme, visual);
      results.push(makeResult(line > 0 && line <= payload.visuals.max_line, "visual-above-fold", payload.readme_file, { visual, line }, `<= ${payload.visuals.max_line}`));
    }

    const early = readme.slice(0, payload.early_cross_links.max_chars);
    for (const required of payload.early_cross_links.required) {
      results.push(makeResult(early.includes(required), "early-cross-link", payload.readme_file, required, "present"));
    }

    const quickStart = sectionBetween(readme, payload.quick_start.section);
    results.push(makeResult(quickStart.length > 0, "quick-start-section", payload.readme_file, payload.quick_start.section, "present"));
    const commands = commandLines(quickStart);
    results.push(makeResult(commands.length >= payload.quick_start.minimum_commands && commands.length <= payload.quick_start.maximum_commands, "quick-start-command-count", payload.readme_file, commands, `${payload.quick_start.minimum_commands}-${payload.quick_start.maximum_commands}`));
    for (const required of payload.quick_start.required_strings) {
      results.push(makeResult(quickStart.includes(required), "quick-start-required-string", payload.readme_file, required, "present"));
    }

    const readingOrder = sectionBetween(readme, payload.reading_order.section);
    const rows = readingOrderRows(readingOrder);
    results.push(makeResult(rows.length === payload.reading_order.expected_rows, "reading-order-row-count", payload.readme_file, rows.length, payload.reading_order.expected_rows));
    for (const link of payload.reading_order.required_links) {
      results.push(makeResult(readingOrder.includes(link), "reading-order-link", payload.readme_file, link, "present"));
    }

    for (const required of payload.required_readme_strings) {
      results.push(makeResult(readme.includes(required), "required-readme-string", payload.readme_file, required, "present"));
    }

    for (const pattern of payload.forbidden_readme_patterns) {
      const count = countMatches(readme, pattern);
      results.push(makeResult(count === 0, "forbidden-readme-pattern", payload.readme_file, { pattern, count }, 0));
    }

    const dsafMentions = countMatches(readme, "\\bDSAF\\b");
    results.push(makeResult(dsafMentions >= payload.handle_requirements.minimum_dsaf_mentions, "handle-dsaf-mentions", payload.readme_file, dsafMentions, `>= ${payload.handle_requirements.minimum_dsaf_mentions}`));
    const longNameMentions = countMatches(readme, "Design System Audit Framework");
    results.push(makeResult(longNameMentions <= payload.handle_requirements.maximum_long_name_mentions, "handle-long-name-count", payload.readme_file, longNameMentions, `<= ${payload.handle_requirements.maximum_long_name_mentions}`));
    for (const handle of payload.handle_requirements.required_component_handles) {
      results.push(makeResult(readme.includes(handle), "handle-component", payload.readme_file, handle, "present"));
    }

    const slots = countMatches(readme, payload.endorsement_slots.placeholder_pattern, "gm");
    results.push(makeResult(slots >= payload.endorsement_slots.minimum_slots, "endorsement-slot-count", payload.readme_file, slots, `>= ${payload.endorsement_slots.minimum_slots}`));
    for (const guard of payload.endorsement_slots.consent_guard_strings) {
      results.push(makeResult(readme.includes(guard), "endorsement-consent-guard", payload.readme_file, guard, "present"));
    }
  }

  results.push(makeResult(intro !== null, "intro-exists", payload.intro_file, intro === null ? "missing" : "present", "present"));
  if (intro !== null) {
    for (const required of payload.reading_order.intro_required) {
      results.push(makeResult(intro.includes(required), "intro-reading-order", payload.intro_file, required, "present"));
    }
  }

  const packageJson = readJson(root, "package.json");
  results.push(makeResult(packageJson.ok, "package-json-valid", "package.json", packageJson.error || "valid", "valid JSON"));
  if (packageJson.ok) {
    for (const [name, command] of Object.entries(payload.required_package_scripts)) {
      results.push(makeResult(packageJson.value.scripts?.[name] === command, "package-script", "package.json", { name, command: packageJson.value.scripts?.[name] }, command));
    }
  }

  for (const result of evaluateSkimMock(payload)) results.push(result);

  return {
    files: [...files].sort(),
    results,
  };
}

export function summarize(results) {
  const counts = results.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});
  return {
    pass: counts.pass || 0,
    mocked: counts.mocked || 0,
    fail: counts.fail || 0,
    ok: !counts.fail,
  };
}

export function writeReadmeEvidence(payload, evaluation, outputPath = AUDIT_OUTPUT) {
  const audit = {
    generated: new Date().toISOString(),
    task_id: payload.task_id,
    observability: payload.observability,
    edge_case_matrix: payload.edge_case_matrix,
    scanned_files: evaluation.files,
    summary: summarize(evaluation.results),
    results: evaluation.results,
  };
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, JSON.stringify(audit, null, 2) + "\n");
  return audit;
}
