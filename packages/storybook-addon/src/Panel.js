function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function safeHref(value) {
  const href = String(value ?? "");
  return /^https:\/\/audit\.cyberskill\.world\/blog\/deep-dives\/[a-z0-9-]+$/i.test(href) ? href : "#";
}

export function renderPanelHtml(model) {
  const rows = model.criteria.map((criterion) => `
    <tr>
      <td><a href="${escapeHtml(safeHref(criterion.href))}" target="_blank" rel="noopener noreferrer">${escapeHtml(criterion.id)}</a></td>
      <td>${escapeHtml(criterion.name)}</td>
      <td>${escapeHtml(criterion.score)}/5</td>
      <td>${escapeHtml(criterion.rationale)}</td>
    </tr>`).join("");

  return `
    <section data-dsaf-panel>
      <h2>DSAF checks</h2>
      <table>
        <thead><tr><th>Criterion</th><th>Name</th><th>Score</th><th>Rationale</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <p>${escapeHtml(model.footer)}</p>
    </section>`;
}
