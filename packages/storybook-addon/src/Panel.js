export function renderPanelHtml(model) {
  const rows = model.criteria.map((criterion) => `
    <tr>
      <td><a href="${criterion.href}" target="_blank" rel="noreferrer">${criterion.id}</a></td>
      <td>${criterion.name}</td>
      <td>${criterion.score}/5</td>
      <td>${criterion.rationale}</td>
    </tr>`).join("");

  return `
    <section data-dsaf-panel>
      <h2>DSAF checks</h2>
      <table>
        <thead><tr><th>Criterion</th><th>Name</th><th>Score</th><th>Rationale</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <p>${model.footer}</p>
    </section>`;
}
