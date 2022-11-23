const sidebars = {
  tech: [
    {
      type: 'category',
      label: 'Technical Materials', 
      link: {
        type: 'doc',
        id: 'tech/intro/1-1',
      },
      collapsed: false,
      items: [
        'tech/intro/1-2',
        //'tech/intro/1-3',
        //'tech/intro/1-4',
      ],
    }, 
    {
      type: 'category',
      label: 'What is Oasys?',
      link: {
        type: 'generated-index',
      },
      items: [
        {  
          type: 'category',
          label: 'Architecture',
          link: {
            type: 'doc',
            id: 'tech/what/1-1',
          },
          items: [
            'tech/what/architecture/1-1',
          ],
      items: [
            {  
              type: 'category',
              label: 'gamefi',
              link: {
                type: 'doc',
              },
              items: [
                'tech/what/gamefi/1-1',
          ],
      items: [
            {  
              type: 'category',
              label: 'Provide',
              link: {
                type: 'doc',
              },
              items: [
                'tech/what/provide/1-1',
          ],
          items: [
            {  
              type: 'category',
              label: 'Roadmap',
              link: {
                type: 'doc',
              },
              items: [
                'tech/what/roadmap/1-1',
          ],
    },
    {
      type: 'category',
      label: 'RPC Endpoints',
      link: {
        type: 'generated-index',
      },
      items: [
          'tech/rpc-endpoints/1-1',
      ],
    },
    {
      type: 'category',
      label: 'Wallet',
      link: {
        type: 'generated-index',
      },
      items: [
        'tech/wallet/1-1',
        'tech/wallet/1-2',
        //'tech/wallet/1-3',
        'tech/wallet/1-4',
        'tech/wallet/1-5',
        //'tech/wallet/1-6',
      ],
    },
    {
      type: 'category',
      label: 'Tools',
      link: {
        type: 'generated-index',
      },
      items: [
        'tech/tools/1-1',
        'tech/tools/1-2',
        'tech/tools/1-3',  
      ],
    },
    {
      type: 'category',
      label: 'Smart Contract',
      link: {
        type: 'generated-index',
      },
      items: [
        'tech/smart-contract/1-1',
      ]
    },
    {  
      type: 'category',
      label: 'Build',
      link: {
        type: 'generated-index',
      },
      items: [
        'tech/build/1-1',
        {
          type: 'category',
          label: 'Library',
          link: {
            type: 'generated-index',
          },
          items: [
            'tech/build/library/1-1',
            'tech/build/library/1-2',
          ]
        },
        {
          type: 'category',
          label: 'ERC Token',
          link: {
            type: 'generated-index',
          },
          items: [
            //'tech/build/erc-token/1-1',
            'tech/build/erc-token/1-2',
          ]
        },
        // {
        //   type: 'category',
        //   label: 'Game Example',
        //   link: {
        //     type: 'generated-index',
        //   },
        //   items: [
        //     'tech/build/game-example/1-1',
        //     {
        //       type: 'category',
        //       label: 'Tutorial Overview',
        //       link: {
        //         type: 'generated-index',
        //       },
        //       items: [
        //         'tech/build/game-example/tutorial/1-1',
        //         'tech/build/game-example/tutorial/1-2',
        //       ]
        //     },
        //     {
        //       type: 'category',
        //       label: 'Repository Overview',
        //       link: {
        //         type: 'generated-index',
        //       },
        //       items: [
        //         'tech/build/game-example/repository/1-1',
        //         'tech/build/game-example/repository/1-2',
        //         'tech/build/game-example/repository/1-3',
        //         'tech/build/game-example/repository/1-4',
        //       ]
        //     },
        //     {
        //       type: 'category',
        //       label: 'Blockchain Functionality',
        //       link: {
        //         type: 'generated-index',
        //       },
        //       items: [
        //         'tech/build/game-example/blockchain-functionality/1-1',
        //         'tech/build/game-example/blockchain-functionality/1-2',
        //         'tech/build/game-example/blockchain-functionality/1-3',
        //         'tech/build/game-example/blockchain-functionality/1-4',
        //       ]
        //     },
        //     {
        //       type: 'category',
        //       label: 'NFT Creation',
        //       link: {
        //         type: 'generated-index',
        //       },
        //       items: [
        //         'tech/build/game-example/nft-creation/1-1',
        //         'tech/build/game-example/nft-creation/1-2',
        //         'tech/build/game-example/nft-creation/1-3',
        //         'tech/build/game-example/nft-creation/1-4',
        //         'tech/build/game-example/nft-creation/1-5',
        //       ]
        //     },
        //   ]
        // },
        {
          type: 'category',
          label: 'Qraph QL',
          link: {
            type: 'generated-index',
          },
          items: [
            'tech/build/graphql/1-1',
            //'tech/build/graphql/1-2',
          ]
        }, 
        'tech/build/1-2',
        'tech/build/1-3',
      ],
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
            'tech/commands/hub-layer/1-1',
          ],
        },
        {
          type: 'category',
          label: 'Verse-Layer',
          link: {
            type: 'generated-index',
          },
          items: [
            'tech/commands/verse-layer/1-1',
          ],
        },
        'tech/commands/http-server/1-1',
        'tech/commands/websocket/1-1',
        'tech/commands/ipc-server/1-1',
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