const sidebars = {
  techdocs: [
    {
      type: 'category',
      label: 'Technical Materials', 
      link: {
        type: 'doc',
        id: 'techdocs/technical-materials/1-1',
      },
      collapsed: false,
      items: [
        'techdocs/technical-materials/1-2',
        'techdocs/technical-materials/1-3',
        'techdocs/technical-materials/1-4',
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
            id: 'techdocs/technologies/hub-layer/1-1',
          },
          items: [
            'techdocs/technologies/hub-layer/2-1',
            'techdocs/technologies/hub-layer/2-2',
            'techdocs/technologies/hub-layer/2-3',
            'techdocs/technologies/hub-layer/2-4',
          ],
        },
        {
          type: 'category',
          label: 'Verse-Layer, with Incredibly High UX',
          link: {
            type: 'doc',
            id: 'techdocs/technologies/verse-layer/1-1',
          },
          items: [
            'techdocs/technologies/verse-layer/2-1',
            'techdocs/technologies/verse-layer/2-2',
          ],
        },
        {  
          type: 'category',
          label: 'NFT Bridge',
          link: {
            type: 'generated-index',
          },
          items: [
            'techdocs/technologies/nft-bridge/1-1',
            'techdocs/technologies/nft-bridge/1-2',
            'techdocs/technologies/nft-bridge/1-3',
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
          'techdocs/validator/hardware-requirements/1-1',
          'techdocs/validator/chain-environment/1-1',
          'techdocs/validator/hub-layer-node-build/1-1',
          'techdocs/validator/hub-layer-client-join/1-1',
          'techdocs/validator/hub-layer-cli/1-1',
          'techdocs/validator/stakinghub/1-1',
          'techdocs/validator/verse-layer-node-build/1-1',
          'techdocs/validator/faq/1-1',
      ],
    },
    {
      type: 'category',
      label: 'Wallet',
      link: {
        type: 'generated-index',
      },
      items: [
        'techdocs/wallet/1-1',
        'techdocs/wallet/1-2',
        'techdocs/wallet/1-3',
        'techdocs/wallet/1-4',
        'techdocs/wallet/1-5',
        'techdocs/wallet/1-6',
      ],
    },
    {
      type: 'category',
      label: 'Tools',
      link: {
        type: 'generated-index',
      },
      items: [
        'techdocs/tools/1-1',
        'techdocs/tools/1-2',
        'techdocs/tools/1-3',  
      ],
    },
    {
      type: 'category',
      label: 'Smart Contract',
      link: {
        type: 'generated-index',
      },
      items: [
        'techdocs/smart-contract/1-1',
        'techdocs/smart-contract/1-2',
        'techdocs/smart-contract/1-3',
        {  
          type: 'category',
          label: 'Sample Game',
          link: {
            type: 'doc',
            id: 'techdocs/smart-contract/sample-game/1-1-sample-game',
          },
          items: [
            {
              type: 'category',
              label: 'Tutorial Overview',
              link: {
                type: 'generated-index',
              },
              items: [
                'techdocs/smart-contract/sample-game/tutorial-overview/1-1-how-to-make-a-blockchain-game',
                'techdocs/smart-contract/sample-game/tutorial-overview/1-2-project-setup',
              ],
            },
            {
              type: 'category',
              label: 'Repository Overview',
              link: {
                type: 'generated-index',
              },
              items: [
                'techdocs/smart-contract/sample-game/repository-overview/1-1-index',
                'techdocs/smart-contract/sample-game/repository-overview/1-2-constants',
                'techdocs/smart-contract/sample-game/repository-overview/1-3-scenes',
                'techdocs/smart-contract/sample-game/repository-overview/1-4-manager-classes',
              ],
            },
            {
              type: 'category',
              label: 'Blockchain Functionality Breakdown',
              link: {
                type: 'generated-index',
              },
              items: [
                'techdocs/smart-contract/sample-game/blockchain-functionality/1-1-wallet-connection',
                'techdocs/smart-contract/sample-game/blockchain-functionality/1-2-wallet-address-display',
                'techdocs/smart-contract/sample-game/blockchain-functionality/1-3-network-switching',
                'techdocs/smart-contract/sample-game/blockchain-functionality/1-4-applying-nft-image',
              ],
            },
            {
              type: 'category',
              label: 'Making an NFT to use in the game',
              link: {
                type: 'generated-index',
              },
              items: [
                'techdocs/smart-contract/sample-game/nft-creation/1-1-project-setup',
                'techdocs/smart-contract/sample-game/nft-creation/1-2-erc-721-contract',
                'techdocs/smart-contract/sample-game/nft-creation/1-3-smart-contract-testing',
                'techdocs/smart-contract/sample-game/nft-creation/1-4-smart-contract-deployment',
                'techdocs/smart-contract/sample-game/nft-creation/1-5-nft-usage',
              ],
            },
          ],
        },
        'techdocs/smart-contract/1-5',
        {  
          type: 'category',
          label: 'Build',
          link: {
            type: 'generated-index',
          },
          items: [
            'techdocs/smart-contract/build/1-1',
          ],
        },
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
            'techdocs/commands/hub-layer/1-1',
          ],
        },
        {
          type: 'category',
          label: 'Verse-Layer',
          link: {
            type: 'generated-index',
          },
          items: [
            'techdocs/commands/verse-layer/1-1',
          ],
        },
        'techdocs/commands/http-server/1-1',
        'techdocs/commands/websocket/1-1',
        'techdocs/commands/ipc-server/1-1',
        'techdocs/commands/graphql/1-1',
        'techdocs/commands/graphql/1-2',
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