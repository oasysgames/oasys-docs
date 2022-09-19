const sidebars = {
  techdocs: [
    {
      type: 'category',
      label: 'Technical Materials', 
      link: {
        type: 'doc',
        id: 'techdocs/technical-materials/lv1-technical-materials/1-1-technical-materials',
      },
      collapsed: false,
      items: [
        'techdocs/technical-materials/lv1-technical-materials/lv2-technical-materials/2-1-about-oasys',
      ],
    }, 
    {
      type: 'category',
      label: 'Technology',
      link: {
        type: 'generated-index',
      },
      items: [
        {  
          type: 'category',
          label: 'Hub-Layer',
          link: {
            type: 'doc',
            id: 'techdocs/technologies/lv1-hub-layer/1-1-hub-layer',
          },
          items: [
            'techdocs/technologies/lv1-hub-layer/lv2-hub-layer/2-1-geth-wallet',
            'techdocs/technologies/lv1-hub-layer/lv2-hub-layer/2-2-block-confirmation',
            'techdocs/technologies/lv1-hub-layer/lv2-hub-layer/2-3-validator-commission-rate',
            'techdocs/technologies/lv1-hub-layer/lv2-hub-layer/2-4-validator-claim',
            'techdocs/technologies/lv1-hub-layer/lv2-hub-layer/2-5-version-info',
          ],
        },
        {
          type: 'category',
          label: 'Verse-Layer, with Incredibly High UX',
          link: {
            type: 'doc',
            id: 'techdocs/technologies/lv1-verse-layer/1-1-verse-layer',
          },
          items: [
            'techdocs/technologies/lv1-verse-layer/lv2-verse-layer/2-1-wallet',
            'techdocs/technologies/lv1-verse-layer/lv2-verse-layer/2-2-verifier',
            'techdocs/technologies/lv1-verse-layer/lv2-verse-layer/2-3-message-relayer',
          ],
        },
        {  
          type: 'category',
          label: 'NFT Bridge',
          link: {
            type: 'generated-index',
          },
          items: [
            'techdocs/technologies/lv1-nft-bridge/1-1-nft-bridge',
            'techdocs/technologies/lv1-nft-bridge/1-2-version-info',
            'techdocs/technologies/lv1-nft-bridge/1-3-vnft-onft-bridge',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Validator',
      link: {
        type: 'generated-index',
      },
      items: [
        {  
          type: 'category',
          label: 'Hardware Requirements',
          link: {
            type: 'doc',
            id: 'techdocs/validator/lv1-hardware-requirements/1-1-hardware-requirements',
          },
          items: [
            {
              type: 'category',
              label: 'Development Guide',
              link: {
                type: 'doc',
                id: 'techdocs/validator/lv1-hardware-requirements/lv2-hardware-requirements/2-1-development-guide',
              },
              items: [
                'techdocs/validator/lv1-hardware-requirements/lv2-hardware-requirements/lv3-hardware-requirements/3-1-hub-layer-node-build',
              ],
            },
          ],
        },
          'techdocs/validator/lv1-hub-layer-node-build/1-1-hub-layer-node-build',
          'techdocs/validator/lv1-verse-layer-node-build-optimism/1-1-verse-layer-node-build-optimism',
        {
          type: 'category',
          label: 'FAQ',
          link: {
            type: 'doc',
            id: 'techdocs/validator/lv1-faq/1-1-faq',
          },
          items: [
            'techdocs/validator/lv1-faq/lv2-faq/2-1-chain-environment',
          ],
        },
        {  
          type: 'category',
          label: 'Validator Account',
          link: {
            type: 'generated-index',
          },
          items: [
            'techdocs/validator/lv1-validator-account/lv2-validator-account/2-1-integration',
            {
              type: 'category',
              label: 'Contact',
              link: {
                type: 'doc',
                id: 'techdocs/validator/lv1-validator-account/lv2-validator-account/2-2-contract',
              },
              items: [
                'techdocs/validator/lv1-validator-account/lv2-validator-account/lv3-validator-account/3-1-erc20-erc721-factory-use-case',
                'techdocs/validator/lv1-validator-account/lv2-validator-account/lv3-validator-account/3-2-smart-contract-example',
                'techdocs/validator/lv1-validator-account/lv2-validator-account/lv3-validator-account/3-3-game-example',                                
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Wallet',
      link: {
        type: 'generated-index',
      },
      items: [
        {  
          type: 'category',
          label: 'About',
          link: {
            type: 'doc',
            id: 'techdocs/wallet/lv1-about/1-1-about',
          },
          items: [
            {
              type: 'category',
              label: 'Tools',
              link: {
                type: 'doc',
                id: 'techdocs/wallet/lv1-about/lv2-about/2-1-tools',
              },
              items: [
                'techdocs/wallet/lv1-about/lv2-about/lv3-about/3-1-explolers',
              ],
            },
          ],
        },
        'techdocs/wallet/lv1-about-validator-account/1-1-about-validator-account',
        {
          type: 'category',
          label: 'Wallet Commands',
          link: {
            type: 'doc',
            id: 'techdocs/wallet/lv1-wallet-commands/1-1-wallet-commands',
          },
          items: [
            'techdocs/wallet/lv1-wallet-commands/lv2-wallet-commands/2-1-oracles',
            'techdocs/wallet/lv1-wallet-commands/lv2-wallet-commands/2-2-faucets',                                
            {
              type: 'category',
              label: 'Validator',
              link: {
                type: 'doc',
                id: 'techdocs/wallet/lv1-wallet-commands/lv2-wallet-commands/2-3-validator',
              },
              items: [
                'techdocs/wallet/lv1-wallet-commands/lv2-wallet-commands/lv3-wallet-commands/3-1-validator-guides',
                'techdocs/wallet/lv1-wallet-commands/lv2-wallet-commands/lv3-wallet-commands/3-2-validator-account',
                'techdocs/wallet/lv1-wallet-commands/lv2-wallet-commands/lv3-wallet-commands/3-3-endpoint',
                'techdocs/wallet/lv1-wallet-commands/lv2-wallet-commands/lv3-wallet-commands/3-4-errors',
                'techdocs/wallet/lv1-wallet-commands/lv2-wallet-commands/lv3-wallet-commands/3-5-parameters',                                        
              ],
            },
            'techdocs/wallet/lv1-wallet-commands/lv2-wallet-commands/2-4-faq',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Smart Contract',
      link: {
        type: 'generated-index',
      },
      items: [
        'techdocs/smart-contract/1-1-smart-contract',
      ]
    },
    {
      type: 'category',
      label: 'Commands',
      link: {
        type: 'generated-index',
      },
      items: [
        {
          type: 'category',
          label: 'Hub-Layer',
          link: {
            type: 'generated-index',
          },
          items: [
            'techdocs/commands/lv1-hub-layer/1-1-hub-layer',
          ],
        },
        {
          type: 'category',
          label: 'Verse-Layer',
          link: {
            type: 'generated-index',
          },
          items: [
            'techdocs/commands/lv1-verse-layer/1-1-verse-layer-geth',
          ],
        },
        'techdocs/commands/lv1-oasys-pos-cli/1-1-oasys-pos-cli',
      ]
    },
  ],
  whitepaper: [
    {
      type: 'autogenerated',
      dirName: 'whitepaper',
    },
  ],
};
module.exports = sidebars;