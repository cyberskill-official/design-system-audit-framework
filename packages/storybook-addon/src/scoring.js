const CRITERION_NAMES = {
  "A2.4": "Variant and state coverage",
  "A3.7": "Documentation freshness",
  "A5.4": "Storybook interaction and QA surface",
  "A7.1": "Coverage percentage tracked",
  "A8.1": "Contrast guarantees",
  "A9.1": "Bundle budgets",
  "B5.2": "WCAG evidence",
  "B8.5": "Performance as UX"
};

const CHECK_RATIONALE = {
  coverage: "Coverage check reports token, component, and Storybook evidence.",
  apca: "APCA check reports contrast-readiness evidence.",
  bundle_size: "Bundle-size check reports package budget evidence.",
  doc_freshness: "Doc-freshness check reports staleness and xref evidence."
};

export function scoreForCheck(check) {
  if (!check || check.ok !== true) return 1;
  if (check.stdout?.some((line) => /not-applicable/i.test(line))) return 3;
  return 4;
}

export function deepDiveUrl(id) {
  return `https://audit.cyberskill.world/blog/deep-dives/${id.toLowerCase().replaceAll(".", "-")}`;
}

export function buildPanelModel(summary) {
  const criterionMap = summary?.criterion_map ?? {};
  const checks = new Map((summary?.checks ?? []).map((check) => [check.name, check]));
  const criteria = [];

  for (const [checkName, ids] of Object.entries(criterionMap)) {
    const check = checks.get(checkName);
    for (const id of ids) {
      criteria.push({
        id,
        name: CRITERION_NAMES[id] ?? "DSAF criterion",
        score: scoreForCheck(check),
        check: checkName,
        status: check?.ok ? "pass" : "fail",
        rationale: CHECK_RATIONALE[checkName] ?? "Mapped from DSAF check output.",
        href: deepDiveUrl(id)
      });
    }
  }

  return {
    ok: summary?.ok === true,
    generated: summary?.generated,
    criteria,
    footer: "Self-assessment scores from this addon are capped at public DSAF Level L3 unless independently verified."
  };
}
