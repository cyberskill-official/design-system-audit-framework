import { defineConfig } from 'vitepress';

export default defineConfig({
  title: "DSAF Docs",
  description: "Design System Audit Framework Documentation",
  base: "/docs/", // Hosted at /docs/ subpath on Vercel
  outDir: "./dist",
  srcDir: "../../docs",
  srcExclude: ['internal/**/*', 'templates/**/*', 'outputs/**/*'],
  ignoreDeadLinks: true,



  
  themeConfig: {
    logo: '/logo.svg', // We can add a logo later
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Framework', link: '/framework/getting-started' },
      { text: 'Main Site', link: 'https://cyberskill.world' }
    ],

    sidebar: [
      {
        text: 'Framework',
        items: [
          { text: 'Getting Started', link: '/framework/getting-started' },
          { text: 'Architecture', link: '/framework/architecture' },
          { text: 'Maturity Levels', link: '/framework/maturity-levels' },
        ]
      },
      {
        text: 'Integrations',
        items: [
          { text: 'CLI', link: '/framework/integrations/cli' },
          { text: 'Storybook Addon', link: '/framework/integrations/storybook-addon' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/cyberskill-official/design-system-audit-framework' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 CyberSkill'
    }
  }
});
