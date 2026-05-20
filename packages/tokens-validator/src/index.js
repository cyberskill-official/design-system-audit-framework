export function flattenTokens(source) {
  const tokens = [];
  function walk(node, path = [], inheritedType = null) {
    if (!node || typeof node !== "object") return;
    const hasValue = Object.prototype.hasOwnProperty.call(node, "$value") || Object.prototype.hasOwnProperty.call(node, "value");
    const hasType = Object.prototype.hasOwnProperty.call(node, "$type") || Object.prototype.hasOwnProperty.call(node, "type");
    const nextType = hasType ? node.$type ?? node.type : inheritedType;
    if (hasValue) {
      tokens.push({
        path: path.join("."),
        type: nextType,
        value: node.$value ?? node.value,
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
const isAlias = (token) => typeof token.value === "string" && /^\{[^}]+\}$/.test(token.value);
const hasModernColor = (token) => typeof token.value === "string" && /(oklch|display-p3|color\(p3|lab\()/i.test(token.value);

function score(condition5, condition3) {
  if (condition5) return 5;
  if (condition3) return 3;
  return 0;
}

function criterion(id, name, scoreValue, evidence) {
  return { id, criterion: name, score: scoreValue, evidence };
}

export function validateTokens(source) {
  const tokens = Array.isArray(source) ? source : flattenTokens(source);
  const colors = tokens.filter((t) => hasType(t, "color") || /color|colour/i.test(t.path));
  const typography = tokens.filter((t) => hasType(t, "typography") || /font|lineheight|line-height|typography|type/i.test(t.path));
  const spacing = tokens.filter((t) => ["dimension", "spacing", "sizing"].some((k) => hasType(t, k)) || /space|spacing|size|radius/i.test(t.path));
  const elevation = tokens.filter((t) => hasType(t, "shadow") || /shadow|elevation/i.test(t.path));
  const motion = tokens.filter((t) => hasType(t, "duration") || hasType(t, "cubicBezier") || /duration|easing|motion|spring/i.test(t.path));
  const iconography = tokens.filter((t) => /icon/i.test(t.path));
  const grid = tokens.filter((t) => /grid|column|gutter|breakpoint|layout/i.test(t.path));
  const aliases = tokens.filter(isAlias);
  const componentScoped = tokens.filter((t) => /component|button|alert|card|input/i.test(t.path));
  const typed = tokens.filter((t) => t.type);
  const described = tokens.filter((t) => t.description);
  const modernColors = colors.filter(hasModernColor);

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
    "A1.8": criterion("A1.8", "Token format and DTCG conformance", score(typed.length === tokens.length && described.length >= Math.ceil(tokens.length * 0.5), typed.length >= Math.ceil(tokens.length * 0.5)), `${typed.length}/${tokens.length} typed; ${described.length} described`),
    "A1.9": criterion("A1.9", "Modern color spaces", score(modernColors.length >= 4, modernColors.length >= 1), `${modernColors.length} OKLCH/P3/Lab color tokens`)
  };

  const raw = Object.values(checks).reduce((sum, item) => sum + item.score, 0);
  const max = Object.keys(checks).length * 5;
  return {
    generated: new Date().toISOString(),
    token_count: tokens.length,
    score_pct: max === 0 ? 0 : Number(((raw / max) * 100).toFixed(1)),
    checks,
    audit_targets: Object.fromEntries(Object.entries(checks).map(([id, item]) => [id, item.score])),
    footer: "These scores are self-assessment. Public DSAF Level caps at L3 without third-party verification."
  };
}
