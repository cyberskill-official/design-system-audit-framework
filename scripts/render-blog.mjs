import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const blogDir = join(root, "landing", "blog");

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function inlineMarkdown(value) {
  let html = escapeHtml(value);
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, text, href) => {
    const safeHref = escapeHtml(href);
    return `<a href="${safeHref}">${text}</a>`;
  });
  return html;
}

function parseFrontmatter(source) {
  if (!source.startsWith("---\n")) return [{}, source.trim()];
  const end = source.indexOf("\n---\n", 4);
  if (end === -1) return [{}, source.trim()];
  const raw = source.slice(4, end).trim();
  const body = source.slice(end + 5).trim();
  const meta = {};
  for (const line of raw.split("\n")) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*"?(.+?)"?$/);
    if (match) meta[match[1]] = match[2].replace(/^"|"$/g, "");
  }
  return [meta, body];
}

function renderMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/);
  const out = [];
  let listOpen = false;
  let codeOpen = false;
  let codeLines = [];

  const closeList = () => {
    if (listOpen) {
      out.push("</ul>");
      listOpen = false;
    }
  };

  for (const line of lines) {
    const fence = line.match(/^```([A-Za-z0-9_-]*)\s*$/);
    if (fence) {
      closeList();
      if (codeOpen) {
        out.push(`<pre><code>${codeLines.join("\n")}</code></pre>`);
        codeOpen = false;
        codeLines = [];
      } else {
        codeOpen = true;
        codeLines = [];
      }
      continue;
    }

    if (codeOpen) {
      codeLines.push(escapeHtml(line));
      continue;
    }

    if (!line.trim()) {
      closeList();
      continue;
    }

    const image = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (image) {
      closeList();
      out.push(`<figure><img src="${escapeHtml(image[2])}" alt="${escapeHtml(image[1])}"></figure>`);
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      closeList();
      const level = heading[1].length;
      out.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }

    if (line === "---") {
      closeList();
      out.push("<hr>");
      continue;
    }

    const item = line.match(/^-\s+(.+)$/);
    if (item) {
      if (!listOpen) {
        out.push("<ul>");
        listOpen = true;
      }
      out.push(`<li>${inlineMarkdown(item[1])}</li>`);
      continue;
    }

    if (line.startsWith("> ")) {
      closeList();
      out.push(`<blockquote>${inlineMarkdown(line.slice(2))}</blockquote>`);
      continue;
    }

    closeList();
    out.push(`<p>${inlineMarkdown(line)}</p>`);
  }

  closeList();
  if (codeOpen) {
    out.push(`<pre><code>${codeLines.join("\n")}</code></pre>`);
  }
  return out.join("\n");
}

function htmlTemplate({ meta, bodyHtml }) {
  const title = meta.title || "DSAF writing";
  const summary = meta.summary || "Writing about DSAF.";
  const canonical = meta.canonical || "https://audit.cyberskill.world/blog";
  const ogImage = meta.og_image || "https://audit.cyberskill.world/og-image.png";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(summary)}">
  <link rel="icon" href="/assets/dsaf-25-card.svg" type="image/svg+xml">
  <link rel="canonical" href="${escapeHtml(canonical)}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(summary)}">
  <meta property="og:url" content="${escapeHtml(canonical)}">
  <meta property="og:image" content="${escapeHtml(ogImage)}">
  <meta name="twitter:card" content="summary_large_image">
  <style>
    :root { color-scheme: light dark; --bg: #ffffff; --fg: #111827; --muted: #4b5563; --line: #d1d5db; --link: #0a58ca; }
    @media (prefers-color-scheme: dark) { :root { --bg: #0f172a; --fg: #f8fafc; --muted: #cbd5e1; --line: #334155; --link: #60a5fa; } }
    body { margin: 0; background: var(--bg); color: var(--fg); font: 18px/1.65 system-ui, -apple-system, Segoe UI, Arial, sans-serif; }
    main { width: min(760px, calc(100% - 32px)); margin: 0 auto; padding: 56px 0 72px; }
    a { color: var(--link); }
    h1 { font-size: clamp(2rem, 5vw, 3.4rem); line-height: 1.05; letter-spacing: 0; margin: 0 0 18px; }
    h2 { font-size: 1.55rem; line-height: 1.2; margin: 44px 0 12px; }
    h3 { font-size: 1.15rem; line-height: 1.3; margin: 28px 0 10px; }
    p, ul { margin: 0 0 18px; }
    li { margin-bottom: 8px; }
    code { font: .9em ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; background: color-mix(in srgb, var(--line) 35%, transparent); padding: .1em .28em; border-radius: 4px; }
    pre { overflow-x: auto; border: 1px solid var(--line); background: color-mix(in srgb, var(--line) 20%, transparent); padding: 16px; border-radius: 6px; }
    pre code { display: block; padding: 0; background: transparent; white-space: pre; }
    blockquote { margin: 22px 0; padding: 14px 18px; border-left: 3px solid var(--link); background: color-mix(in srgb, var(--line) 18%, transparent); }
    figure { margin: 28px 0; border: 1px solid var(--line); padding: 12px; }
    img { display: block; max-width: 100%; height: auto; }
    hr { border: 0; border-top: 1px solid var(--line); margin: 36px 0; }
    .meta { color: var(--muted); margin-bottom: 34px; }
  </style>
</head>
<body>
  <main>
    <p class="meta"><a href="/">DSAF</a> / <a href="/blog">Writing</a></p>
${bodyHtml}
  </main>
</body>
</html>
`;
}

mkdirSync(blogDir, { recursive: true });

const deployAssetsDir = join(root, "landing", "assets");
mkdirSync(deployAssetsDir, { recursive: true });
for (const asset of [
  "dsaf-l0-l5-ladder.svg",
  "dsaf-l0-l5-ladder-dark.svg",
  "dsaf-radar.svg",
  "dsaf-radar-dark.svg",
  "dsaf-25-card.svg"
]) {
  copyFileSync(join(root, "assets", asset), join(deployAssetsDir, asset));
  console.log(`[render-blog] assets/${asset} -> landing/assets/${asset}`);
}

const deployOgDir = join(deployAssetsDir, "og");
mkdirSync(deployOgDir, { recursive: true });
for (const asset of [
  "launch-2026-1200x630.svg",
  "launch-2026-1200x630.png"
]) {
  const source = join(root, "assets", "og", asset);
  if (existsSync(source)) {
    copyFileSync(source, join(deployOgDir, asset));
    console.log(`[render-blog] assets/og/${asset} -> landing/assets/og/${asset}`);
  }
}

function markdownFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...markdownFiles(path));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(path);
    }
  }
  return files;
}

function renderFile(path) {
  const source = readFileSync(path, "utf8");
  const [meta, body] = parseFrontmatter(source);
  const html = htmlTemplate({ meta, bodyHtml: renderMarkdown(body) });
  const slug = basename(path, ".md");
  const out = join(dirname(path), `${slug}.html`);
  writeFileSync(out, html);
  console.log(`[render-blog] ${relative(root, path)} -> ${relative(root, out)}`);

  if (slug !== "index") {
    const prettyDir = join(dirname(path), slug);
    mkdirSync(prettyDir, { recursive: true });
    const prettyOut = join(prettyDir, "index.html");
    writeFileSync(prettyOut, html);
    console.log(`[render-blog] ${relative(root, path)} -> ${relative(root, prettyOut)}`);
  }
}

for (const file of markdownFiles(blogDir)) {
  renderFile(file);
}

const deepDiveSourceDir = join(root, "docs", "content", "deep-dives");
const publicDeepDiveDir = join(blogDir, "deep-dives");
if (existsSync(deepDiveSourceDir)) {
  mkdirSync(publicDeepDiveDir, { recursive: true });
  for (const file of readdirSync(deepDiveSourceDir).filter((name) => /^week-\d+-.+\.md$/.test(name))) {
    const sourcePath = join(deepDiveSourceDir, file);
    const source = readFileSync(sourcePath, "utf8");
    const title = source.match(/^#\s+(.+)$/m)?.[1] || "DSAF criterion deep-dive";
    const canonical = source.match(/\*\*Canonical URL:\*\*\s+`([^`]+)`/)?.[1] ||
      `https://audit.cyberskill.world/blog/deep-dives/${basename(file, ".md")}`;
    const criterion = source.match(/\*\*DSAF criterion:\*\*\s+`?([^`\n]+)`?/)?.[1]?.trim() || "DSAF criterion";
    const html = htmlTemplate({
      meta: {
        title,
        summary: `${criterion} deep-dive with one example, one anti-pattern, and a self-scoring checklist.`,
        canonical,
        og_image: "https://audit.cyberskill.world/assets/og/launch-2026-1200x630.png"
      },
      bodyHtml: renderMarkdown(source)
    });
    const slug = basename(file, ".md");
    const out = join(publicDeepDiveDir, `${slug}.html`);
    writeFileSync(out, html);
    console.log(`[render-blog] ${relative(root, sourcePath)} -> ${relative(root, out)}`);
    const prettyDir = join(publicDeepDiveDir, slug);
    mkdirSync(prettyDir, { recursive: true });
    const prettyOut = join(prettyDir, "index.html");
    writeFileSync(prettyOut, html);
    console.log(`[render-blog] ${relative(root, sourcePath)} -> ${relative(root, prettyOut)}`);
  }
}
