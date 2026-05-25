import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(dirname(fileURLToPath(import.meta.url))));
const sourceDir = join(root, 'docs/internal/content/deep-dives');
const outDir = join(sourceDir, "cross-publishing");

function titleFrom(source) {
  return source.match(/^#\s+(.+)$/m)?.[1] || "DSAF criterion deep-dive";
}

function canonicalFrom(source, slug) {
  return source.match(/\*\*Canonical URL:\*\*\s+`([^`]+)`/)?.[1] ||
    `https://audit.cyberskill.world/blog/deep-dives/${slug}`;
}

function criterionFrom(source) {
  return source.match(/\*\*DSAF criterion:\*\*\s+`([^`]+)`/)?.[1] || "DSAF";
}

function stripMetadata(source) {
  return source
    .replace(/\*\*Canonical URL:\*\*.*\n/, "")
    .replace(/\*\*DSAF criterion:\*\*.*\n/, "")
    .replace(/\*\*Tag:\*\*.*\n/, "")
    .replace(/\*\*Reading time:\*\*.*\n/, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

mkdirSync(outDir, { recursive: true });

for (const file of readdirSync(sourceDir).filter((name) => /^week-\d+-.+\.md$/.test(name))) {
  const slug = basename(file, ".md");
  const source = readFileSync(join(sourceDir, file), "utf8");
  const title = titleFrom(source);
  const criterion = criterionFrom(source);
  const canonical = canonicalFrom(source, slug);
  const body = stripMetadata(source);
  const description = `${criterion} deep-dive: one criterion, one example, one anti-pattern, and a self-scoring checklist.`;

  const devto = `---\ntitle: "${title.replaceAll('"', '\\"')}"\npublished: false\ndescription: "${description.replaceAll('"', '\\"')}"\ntags: designsystems, frontend, accessibility, opensource\ncanonical_url: ${canonical}\ncover_image: https://audit.cyberskill.world/assets/og/launch-2026-1200x630.png\n---\n\n> Originally published at [${canonical}](${canonical}). This dev.to copy preserves the canonical URL above.\n\n${body}\n`;

  const medium = `# ${title}\n\nThis piece was originally published at ${canonical}. Use Medium's story settings to set that URL as the canonical link before publishing.\n\n${body.replace(/^#\s+.+\n+/, "")}\n\n---\n\nCanonical version: ${canonical}\nFull DSAF Criteria: https://github.com/cyberskill-official/design-system-audit-framework\n`;

  const linkedin = `# ${title}\n\nOriginally published at ${canonical}. Cross-posting the full article here for LinkedIn readers; the canonical version remains on audit.cyberskill.world.\n\n${body.replace(/^#\s+.+\n+/, "")}\n\n---\n\nCanonical version: ${canonical}\nFull DSAF Criteria: https://github.com/cyberskill-official/design-system-audit-framework\n\n#DSAF #DesignSystems #Frontend #Accessibility\n`;

  const outputs = [
    [`${slug}.devto.md`, devto],
    [`${slug}.medium.md`, medium],
    [`${slug}.linkedin.md`, linkedin]
  ];

  for (const [name, content] of outputs) {
    const out = join(outDir, name);
    writeFileSync(out, content);
    console.log(`[cross-publish] ${file} -> internal/content/deep-dives/cross-publishing/${name}`);
  }
}
