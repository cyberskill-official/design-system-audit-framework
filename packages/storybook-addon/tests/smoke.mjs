import { buildPanelModel, renderPanelHtml, runDsafChecks } from "../src/index.js";

const summary = runDsafChecks();
const html = renderPanelHtml(buildPanelModel(summary));
if (!summary.ok || !html.includes("data-dsaf-panel")) {
  throw new Error("DSAF Storybook addon smoke test failed");
}
console.log("storybook-addon smoke ok");
