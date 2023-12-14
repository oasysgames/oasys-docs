// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Oasys Documentation',
  tagline: 'Oasys Blockchain for Games',
  url: 'https://docs.oasys.games', // Url to your site with no trailing slash
  baseUrl: '/',
  trailingSlash: false,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/general/OASYS_favicon.png',
  organizationName: 'oasysgames', // Usually your GitHub org/user name.
  projectName: 'oasys-docs', // Usually your repo name.
  // themes: ['@docusaurus/theme-search-algolia'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/oasysgames/oasys-docs',
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        // googleAnalytics: {
        //   trackingID: 'UA-219518834-3',
        //   anonymizeIP: true,
        // },
        // GA4 is here
        // https://docusaurus.io/docs/next/api/plugins/@docusaurus/plugin-google-gtag
        gtag: {
          trackingID: 'G-BFHQ7KS0DH',
          anonymizeIP: true,
        }
      }),
    ],
  ],


  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // metadata: [{name: 'keywords', content: 'cooking, blog'}],
      image: 'img/general/oasys_logo.jpeg',
      algolia: {
        // The application ID provided by Algolia
        appId: 'UY32N5LBZM',
  
        // Public API key: it is safe to commit it
        apiKey: 'ffd5908fc7a35a352d2265dde0833d95',
  
        indexName: 'oasysgames',
  
        // Optional: see doc section below
        contextualSearch: true,
  
        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        externalUrlRegex: 'external\\.com|domain\\.com',

        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        replaceSearchResultPathname: {
          from: '/docs/', // or as RegExp: /\/docs\//
          to: '/',
        },
  
        // Optional: Algolia search parameters
        searchParameters: {},
  
        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',
  
        //... other Algolia params
      },
      navbar: {
        title: '',
        logo: {
          alt: 'Oasys',
          src: 'img/general/oasys-logo_inline.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'staking/stake-oasys/1-1-stake',
            position: 'left',
            label: 'Users',
          },
          {
            type: 'doc',
            docId: 'verse-developer/intro',
            position: 'left',
            label: 'Verse/GameDev',
          },
          {
            type: 'doc',
            docId: 'hub-validator/operate-validator/hd-requirement',
            position: 'left',
            label: 'Validator',
          },
          {
            type: 'doc',
            docId: 'ecosystem/intro',
            position: 'left',
            label: 'Ecosystem',
          },
          {
            type: 'doc',
            docId: 'architecture/overview/oasys-architecture/1-1-ecosystem-per-chain',
            position: 'left',
            label: 'Architecture',
          },
          // {
          //   type: 'doc',
          //   docId: 'whitepaper/intro',
          //   position: 'left',
          //   label: 'Whitepaper',
          // },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/oasysgames',
            label: 'GitHub',
            position: 'left',
          },
        ],
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'White Paper',
                to: '/docs/whitepaper/intro',
              },
              {
                label: 'Technical Materials',
                to: '/docs/tech-docs/whats-oasys/1-1-whats-oasys',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/oasysgames',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://t.co/wHaFUB4R0b',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/oasys_games',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Website',
                href: 'https://www.oasys.games/',
              },
              {
                label: 'Medium',
                href: 'https://medium.com/@oasys',
              },
              {
                label: 'Audit Report',
                href: 'https://certificate.quantstamp.com/full/oasys',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Oasys | Blockchain for The Games All Rights Reserved.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
  // i18n: {
  //   defaultLocale: 'en',
  //   locales: ['en', 'ja'],
  // },
};

module.exports = config;
