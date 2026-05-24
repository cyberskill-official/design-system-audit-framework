import { ADDON_ID, PANEL_ID, buildPanelModel, renderPanelHtml } from "./index.js";

export function registerDsafPanel(api, summary) {
  const model = buildPanelModel(summary);
  const html = renderPanelHtml(model);
  return { addonId: ADDON_ID, panelId: PANEL_ID, html, api };
}
