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
          { text: 'Overview', link: '/framework/01-framework-overview' },
          { text: 'Criteria (Part A)', link: '/framework/03-criteria-part-a' },
          { text: 'Criteria (Part B)', link: '/framework/04-criteria-part-b' },
          { text: 'Full Criteria', link: '/framework/03-full-criteria' },
          { text: 'Maturity Tiers', link: '/framework/04-maturity-tiers' },
          { text: 'DSAF-25', link: '/framework/dsaf-25' },
          { text: 'Regression Policy', link: '/framework/05-regression-policy' },
          { text: 'Criteria Methodology', link: '/framework/06-criteria-methodology' },
        ]
      },
      {
        text: 'Integrations',
        items: [
          { text: 'Storybook Addon', link: '/framework/integrations/storybook-addon' },
          { text: 'Tokens Studio Validator', link: '/framework/integrations/tokens-studio-validator' },
          { text: 'Zeroheight Reader', link: '/framework/integrations/zeroheight-reader' },
        ]
      },
      {
        text: 'Guidelines',
        items: [
          { text: 'Introduction', link: '/guidelines/01-introduction' },
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
