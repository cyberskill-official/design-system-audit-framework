export function flattenTokens(source) {
  const tokens = [];
  function walk(node, path = [], inheritedType = null) {
    if (!node || typeof node !== "object") return;
    const hasValue = Object.prototype.hasOwnProperty.call(node, "$value") || Object.prototype.hasOwnProperty.call(node, "value");
    const hasRef = Object.prototype.hasOwnProperty.call(node, "$ref");
    const hasType = Object.prototype.hasOwnProperty.call(node, "$type") || Object.prototype.hasOwnProperty.call(node, "type");
    const nextType = hasType ? node.$type ?? node.type : inheritedType;
    if (hasValue || hasRef) {
      tokens.push({
        path: path.join("."),
        type: nextType,
        value: hasValue ? node.$value ?? node.value : null,
        ref: hasRef ? node.$ref : null,
        description: node.$description ?? node.description ?? null
      });
      return;
    }
    for (const [key, value] of Object.entries(node)) {
      if (key === "$type" || key === "type") continue;
      walk(value, [...path, key], nextType);
    }
  }
  walk(source);
  return tokens;
}

const hasType = (token, type) => String(token.type || "").toLowerCase().includes(type);
const pathHas = (token, pattern) => pattern.test(token.path);
const aliasTarget = (token) => {
  if (typeof token.value !== "string") return null;
  const match = token.value.match(/^\{([^}]+)\}$/);
  return match ? match[1].trim() : null;
};
const isAlias = (token) => aliasTarget(token) !== null;
const hasModernColor = (token) => typeof token.value === "string" && /(oklch|display-p3|color\(p3|lab\()/i.test(token.value);

function score(condition5, condition3) {
  if (condition5) return 5;
  if (condition3) return 3;
  return 0;
}

function criterion(id, name, scoreValue, evidence) {
  return { id, criterion: name, score: scoreValue, evidence };
}

function referencesInValue(value, byPath) {
  const direct = aliasTarget({ value });
  if (direct) return [direct];
  if (Array.isArray(value)) return value.flatMap((item) => referencesInValue(item, byPath));
  if (value && typeof value === "object") {
    const target = refTarget(value.$ref, byPath);
    const nested = Object.entries(value)
      .filter(([key]) => key !== "$ref")
      .flatMap(([, item]) => referencesInValue(item, byPath));
    return target ? [target, ...nested] : nested;
  }
  return [];
}

function pointerSegments(ref) {
  if (typeof ref !== "string" || !ref.startsWith("#/")) return null;
  return ref
    .slice(2)
    .split("/")
    .filter(Boolean)
    .map((part) => part.replaceAll("~1", "/").replaceAll("~0", "~"));
}

function pointerTarget(ref, byPath) {
  const segments = pointerSegments(ref);
  if (!segments) return null;
  for (let index = segments.length; index > 0; index--) {
    const candidate = segments.slice(0, index).join(".");
    if (byPath.has(candidate)) return candidate;
  }
  return segments.join(".");
}

function refTarget(ref, byPath) {
  if (typeof ref !== "string") return null;
  return pointerTarget(ref, byPath) ?? ref;
}

function referencesForToken(token, byPath) {
  const valueRefs = referencesInValue(token.value, byPath);
  const target = refTarget(token.ref, byPath);
  return target ? [...valueRefs, target] : valueRefs;
}

export function analyzeReferences(tokens) {
  const byPath = new Map(tokens.map((token) => [token.path, token]));
  const referencesByPath = new Map(tokens.map((token) => [token.path, referencesForToken(token, byPath)]));
  const typeByPath = new Map();
  const issues = [];
  const circular = new Set();

  function resolveType(token, stack = []) {
    if (typeByPath.has(token.path)) return typeByPath.get(token.path);
    const target = aliasTarget(token) ?? pointerTarget(token.ref, byPath);
    if (!target) {
      typeByPath.set(token.path, token.type ?? null);
      return token.type ?? null;
    }

    const targetToken = byPath.get(target);
    if (!targetToken) {
      typeByPath.set(token.path, token.type ?? null);
      return token.type ?? null;
    }

    if (stack.includes(token.path)) {
      typeByPath.set(token.path, token.type ?? null);
      return token.type ?? null;
    }

    const resolved = resolveType(targetToken, [...stack, token.path]);
    const ownType = token.type ?? resolved;
    typeByPath.set(token.path, ownType ?? null);
    return ownType ?? null;
  }

  for (const token of tokens) resolveType(token);

  const references = [];
  for (const token of tokens) {
    for (const target of referencesByPath.get(token.path) ?? []) {
      references.push({ path: token.path, target });
      if (!byPath.has(target)) {
        issues.push({ type: "unresolved_reference", path: token.path, target });
      }
    }
  }

  function detectCycles(path, stack = []) {
    if (stack.includes(path)) {
      const cycle = [...stack.slice(stack.indexOf(path)), path];
      const key = [...cycle.slice(0, -1)].sort().join(">");
      if (!circular.has(key)) {
        circular.add(key);
        const previous = cycle[cycle.length - 2] ?? path;
        issues.push({ type: "circular_reference", path: previous, target: path, cycle });
      }
      return;
    }
    for (const target of referencesByPath.get(path) ?? []) {
      if (byPath.has(target)) detectCycles(target, [...stack, path]);
    }
  }

  for (const token of tokens) detectCycles(token.path);

  for (const token of tokens) {
    if (!typeByPath.get(token.path)) {
      issues.push({ type: "missing_type", path: token.path });
    }
  }

  return {
    references,
    aliases: tokens.filter(isAlias).map((token) => ({
      path: token.path,
      target: aliasTarget(token),
      resolved_type: typeByPath.get(token.path) ?? null
    })),
    issues,
    typeByPath
  };
}

export function validateTokens(source) {
  const tokens = Array.isArray(source) ? source : flattenTokens(source);
  const referenceAnalysis = analyzeReferences(tokens);
  const colors = tokens.filter((t) => hasType(t, "color") || /color|colour/i.test(t.path));
  const typography = tokens.filter((t) => hasType(t, "typography") || /font|lineheight|line-height|typography|type/i.test(t.path));
  const spacing = tokens.filter((t) => ["dimension", "spacing", "sizing"].some((k) => hasType(t, k)) || /space|spacing|size|radius/i.test(t.path));
  const elevation = tokens.filter((t) => hasType(t, "shadow") || /shadow|elevation/i.test(t.path));
  const motion = tokens.filter((t) => hasType(t, "duration") || hasType(t, "cubicBezier") || /duration|easing|motion|spring/i.test(t.path));
  const iconography = tokens.filter((t) => /icon/i.test(t.path));
  const grid = tokens.filter((t) => /grid|column|gutter|breakpoint|layout/i.test(t.path));
  const aliases = tokens.filter(isAlias);
  const componentScoped = tokens.filter((t) => /component|button|alert|card|input/i.test(t.path));
  const typed = tokens.filter((t) => referenceAnalysis.typeByPath.get(t.path));
  const described = tokens.filter((t) => t.description);
  const modernColors = colors.filter(hasModernColor);
  const blockingReferenceIssues = referenceAnalysis.issues.filter((issue) => issue.type !== "missing_type");

  const checks = {
    "A1.1": criterion(
      "A1.1",
      "Color tokens with primitive to semantic to component layers",
      score(colors.length >= 12 && aliases.length >= 4 && componentScoped.length >= 2, colors.length >= 4),
      `${colors.length} color tokens; ${aliases.length} aliases; ${componentScoped.length} component-scoped tokens`
    ),
    "A1.2": criterion("A1.2", "Typography scale and type tokens", score(typography.length >= 8, typography.length >= 3), `${typography.length} typography tokens`),
    "A1.3": criterion("A1.3", "Spacing scale", score(spacing.length >= 8, spacing.length >= 4), `${spacing.length} spacing/dimension tokens`),
    "A1.4": criterion("A1.4", "Elevation and shadow tokens", score(elevation.length >= 4, elevation.length >= 2), `${elevation.length} elevation/shadow tokens`),
    "A1.5": criterion("A1.5", "Motion tokens", score(motion.length >= 4, motion.length >= 2), `${motion.length} motion tokens`),
    "A1.6": criterion("A1.6", "Iconography system tokens", score(iconography.length >= 4, iconography.length >= 2), `${iconography.length} iconography tokens`),
    "A1.7": criterion("A1.7", "Grid and layout tokens", score(grid.length >= 4, grid.length >= 2), `${grid.length} grid/layout tokens`),
    "A1.8": criterion(
      "A1.8",
      "Token format and DTCG conformance",
      score(
        typed.length === tokens.length && described.length >= Math.ceil(tokens.length * 0.5) && blockingReferenceIssues.length === 0,
        typed.length >= Math.ceil(tokens.length * 0.5) && blockingReferenceIssues.length === 0
      ),
      `${typed.length}/${tokens.length} typed; ${described.length} described; ${referenceAnalysis.references.length} references; ${blockingReferenceIssues.length} reference issue(s)`
    ),
    "A1.9": criterion("A1.9", "Modern color spaces", score(modernColors.length >= 4, modernColors.length >= 1), `${modernColors.length} OKLCH/P3/Lab color tokens`)
  };

  const raw = Object.values(checks).reduce((sum, item) => sum + item.score, 0);
  const max = Object.keys(checks).length * 5;
  return {
    generated: new Date().toISOString(),
    token_count: tokens.length,
    reference_count: referenceAnalysis.references.length,
    reference_issues: referenceAnalysis.issues,
    score_pct: max === 0 ? 0 : Number(((raw / max) * 100).toFixed(1)),
    checks,
    audit_targets: Object.fromEntries(Object.entries(checks).map(([id, item]) => [id, item.score])),
    footer: "These scores are self-assessment. Public DSAF Level caps at L3 without third-party verification."
  };
}
