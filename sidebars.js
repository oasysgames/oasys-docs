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
        {
          type: 'category',
          label: 'About Oasys',
          link: {
            type: 'doc',
            id: 'techdocs/technical-materials/lv1-technical-materials/lv2-technical-materials/2-1-about-oasys',
          },
          items: [
            'techdocs/technical-materials/lv1-technical-materials/lv2-technical-materials/lv3-technical-materials/3-1-over-view',
          ],
        },
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
            'techdocs/technologies/lv1-hub-layer/lv2-hub-layer/2-1-pre-deploy',
            'techdocs/technologies/lv1-hub-layer/lv2-hub-layer/2-2-geth-wallet',
            'techdocs/technologies/lv1-hub-layer/lv2-hub-layer/2-3-block-confirmation',
            'techdocs/technologies/lv1-hub-layer/lv2-hub-layer/2-4-validator-commission-rate',
            'techdocs/technologies/lv1-hub-layer/lv2-hub-layer/2-5-validator-claim',
            'techdocs/technologies/lv1-hub-layer/lv2-hub-layer/2-6-version-info',
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
            {
              type: 'category',
              label: 'Wallet',
              link: {
                type: 'doc',
                id: 'techdocs/technologies/lv1-verse-layer/lv2-verse-layer/2-1-wallet',
              },
              items: [
                'techdocs/technologies/lv1-verse-layer/lv2-verse-layer/lv3-verse-layer/3-1-builder',
                'techdocs/technologies/lv1-verse-layer/lv2-verse-layer/lv3-verse-layer/3-2-sequencer',
                'techdocs/technologies/lv1-verse-layer/lv2-verse-layer/lv3-verse-layer/3-3-proposer',
              ],
            },
            'techdocs/technologies/lv1-verse-layer/lv2-verse-layer/2-2-verifier',
            'techdocs/technologies/lv1-verse-layer/lv2-verse-layer/2-3-l2geth',
            'techdocs/technologies/lv1-verse-layer/lv2-verse-layer/2-4-message-relayer',
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
        {
          type: 'category',
          label: 'Hub-Layer Node Build',
          link: {
            type: 'doc',
            id: 'techdocs/validator/lv1-hub-layer-node-build/1-1-hub-layer-node-build',
          },
          items: [
            'techdocs/validator/lv1-hub-layer-node-build/lv2-hub-layer-node-build/2-1-verse-layer-node-build-optimism',
          ],
        },
        {
          type: 'category',
          label: 'Verse-Layer Node Build (Optimism)',
          link: {
            type: 'doc',
            id: 'techdocs/validator/lv1-verse-layer-node-build-optimism/1-1-verse-layer-node-build-optimism',
          },
          items: [
            'techdocs/validator/lv1-verse-layer-node-build-optimism/lv2-verse-layer-node-build-optimism/2-1-requirements',
          ],
        },
        {
          type: 'category',
          label: 'Chain Environment',
          link: {
            type: 'doc',
            id: 'techdocs/validator/lv1-chain-environment/1-1-chain-environment',
          },
          items: [
            'techdocs/validator/lv1-chain-environment/lv2-chain-environment/2-1-wallet',
            'techdocs/validator/lv1-chain-environment/lv2-chain-environment/2-2-jail-period',
          ],
        },
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
            type: 'doc',
            id: 'techdocs/validator/lv1-validator-account/1-1-validator-account',
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
        {
          type: 'category',
          label: 'About Validator Account',
          link: {
            type: 'doc',
            id: 'techdocs/wallet/lv1-about-validator-account/1-1-about-validator-account',
          },
          items: [
            'techdocs/wallet/lv1-about-validator-account/lv2-about-validator-account/2-1-data-analytics',
          ],
        },
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
  ],
  whitepaper: [
    {
      type: 'autogenerated',
      dirName: 'whitepaper',
    },
  ],
};
module.exports = sidebars;