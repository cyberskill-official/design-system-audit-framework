figma.showUI(__html__, { width: 320, height: 400 });

figma.ui.onmessage = msg => {
  if (msg.type === 'run-audit') {
    // 1. Gather Figma Token Variables
    const variables = figma.variables.getLocalVariables().map(v => ({
      name: v.name,
      type: v.resolvedType,
      id: v.id
    }));

    // 2. Gather Main Components on current page
    const components = figma.currentPage.findAllWithCriteria({ types: ['COMPONENT', 'COMPONENT_SET'] }).map(c => ({
      name: c.name,
      id: c.id,
      width: c.width,
      height: c.height,
      type: c.type
    }));

    const auditData = {
      source: "Figma",
      variables,
      components
    };

    figma.ui.postMessage({ type: 'audit-data', data: auditData });
  }

  if (msg.type === 'highlight-violations') {
    // Look through violations and add a visual red stroke or effect to failing nodes
    // The LLM would need to return the exact Figma node ID in the `file` or `rule` field for this to be perfect.
    // We mock the highlight by drawing a red box around the first component if available.
    
    const components = figma.currentPage.findAllWithCriteria({ types: ['COMPONENT', 'COMPONENT_SET'] });
    if (components.length > 0) {
      figma.notify(`🚨 DSAF found ${msg.violations.length} violations in your Figma Components.`);
      
      // Select the components that failed (mocking selection of all components for demonstration)
      figma.currentPage.selection = components;
      figma.viewport.scrollAndZoomIntoView(components);
    }
  }
};
