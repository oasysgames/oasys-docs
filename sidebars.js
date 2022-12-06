const sidebars = {
  documentation: [
    {
      type: 'category',
      label: "What's OASYS?", 
      link: {
        type: 'doc',
        id: 'documentation/whats-oasys/1-1-whats-oasys',
      },
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'GameFi Chain', 
          link: {
            type: 'generated-index',
          },
          collapsed: false,
          items: [
            'documentation/whats-oasys/gamefi-chain/1-1-high-performance',
            'documentation/whats-oasys/gamefi-chain/1-2-decentralizaton-and-data-availability',
          ],
        }, {
          type: 'category',
          label: 'What We Provide?', 
          link: {
            type: 'generated-index',
          },
          collapsed: false,
          items: [
            'documentation/whats-oasys/what-we-provide/1-1-private-as-public',
          ],
        }, {
          type: 'category',
          label: 'OASYS Architecture', 
          link: {
            type: 'doc',
            id: 'documentation/whats-oasys/oasys-architecture/1-1-oasys-architecture',
          },
          collapsed: false,
          items: [
            'documentation/whats-oasys/oasys-architecture/1-2-original-rollup',
            'documentation/whats-oasys/oasys-architecture/1-3-incentive-logic',
          ],
        }, {
          type: 'category',
          label: 'Roadmap', 
          link: {
            type: 'doc',
            id: 'documentation/whats-oasys/roadmap/1-1-initial-functionalities',
          },
          collapsed: false,
          items: [],
        }, 
      ],
    }, {
      type: 'category',
      label: 'How Does OASYS Work?', 
      link: {
        type: 'generated-index',
      },
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Overview', 
          link: {
            type: 'generated-index',
          },
          collapsed: false,
          items: [
            {
              type: 'category',
              label: 'OASYS Architecture', 
              link: {
                type: 'generated-index',
              },
              collapsed: false,
              items: [
                'documentation/how-does-oasys-work/overview/oasys-architecture/1-1-ecosystem-per-chain',
                'documentation/how-does-oasys-work/overview/oasys-architecture/1-2-original-rollup',
                'documentation/how-does-oasys-work/overview/oasys-architecture/1-3-flexible-token-design',
              ]
            }, {
              type: 'category',
              label: 'Permissioned Chain', 
              link: {
                type: 'generated-index',
              },
              collapsed: false,
              items: [
                'documentation/how-does-oasys-work/overview/permissioned-chain/1-1-high-qualiry-database',
                'documentation/how-does-oasys-work/overview/permissioned-chain/1-2-efficient-load',
              ]
            }
          ]
        }, {
          type: 'category',
          label: 'Hub Layer', 
          link: {
            type: 'generated-index',
          },
          collapsed: false,
          items: [
            {
              type: 'category',
              label: 'Consensus Algorithm', 
              link: {
                type: 'doc',
                id: 'documentation/how-does-oasys-work/hub-layer/consensus/1-1-hub-consensus',
              },
              collapsed: false,
              items: [
                {
                  type: 'category',
                  label: 'DPoS', 
                  link: {
                    type: 'generated-index',
                  },
                  collapsed: false,
                  items: [
                    'documentation/how-does-oasys-work/hub-layer/consensus/dpos/1-1-weighted-random',
                    'documentation/how-does-oasys-work/hub-layer/consensus/dpos/1-2-mining',
                  ]
                }, {
                  type: 'category',
                  label: 'Incentive Logic', 
                  link: {
                    type: 'generated-index',
                  },
                  collapsed: false,
                  items: [
                    'documentation/how-does-oasys-work/hub-layer/consensus/incentive/1-1-validator-staker',
                    'documentation/how-does-oasys-work/hub-layer/consensus/incentive/1-2-reward-commission',
                  ]
                }
              ]
            }, {
              type: 'category',
              label: 'OASYS Ecosystem', 
              link: {
                type: 'doc',
                id: 'documentation/how-does-oasys-work/hub-layer/ecosystem/1-1-ecosystem',
              },
              collapsed: false,
              items: [
                {
                  type: 'category',
                  label: 'Fungible Token', 
                  link: {
                    type: 'generated-index',
                  },
                  collapsed: false,
                  items: [
                    'documentation/how-does-oasys-work/hub-layer/ecosystem/ft/1-1-ft-types',
                    'documentation/how-does-oasys-work/hub-layer/ecosystem/ft/1-2-bridge',
                    'documentation/how-does-oasys-work/hub-layer/ecosystem/ft/1-3-dex',
                    'documentation/how-does-oasys-work/hub-layer/ecosystem/ft/1-4-oas-tokens',
                  ]
                }, {
                  type: 'category',
                  label: 'Non Fungible Token', 
                  link: {
                    type: 'doc',
                    id: 'documentation/how-does-oasys-work/hub-layer/ecosystem/nft/1-1-nft-types',
                  },
                  collapsed: false,
                  items: [
                    'documentation/how-does-oasys-work/hub-layer/ecosystem/nft/1-1-nft-types',
                    'documentation/how-does-oasys-work/hub-layer/ecosystem/nft/1-2-bridge',
                    // 'documentation/how-does-oasys-work/hub-layer/ecosystem/nft/1-3-oasyx',
                    'documentation/how-does-oasys-work/hub-layer/ecosystem/nft/1-4-marketplace',
                  ]
                }
              ]
            }
          ]
        }, {
          type: 'category',
          label: 'Verse Layer', 
          link: {
            type: 'doc',
            id: 'documentation/how-does-oasys-work/verse-layer/1-1-verse-layer'
          },
          collapsed: false,
          items: [
            {
              type: 'category',
              label: 'Verse Consensus (PoA or PoS)', 
              link: {
                type: 'doc',
                id: 'documentation/how-does-oasys-work/verse-layer/consensus/1-1-consensus'
              },
              collapsed: false,
              items: []
            }, {
              type: 'category',
              label: 'Permissioned / Permissionless', 
              link: {
                type: 'doc',
                id: 'documentation/how-does-oasys-work/verse-layer/permission/1-1-permission'
              },
              collapsed: false,
              items: []
            }, {
              type: 'category',
              label: 'Original Rollup', 
              link: {
                type: 'doc',
                id: 'documentation/how-does-oasys-work/verse-layer/rollup/1-1-overview'
              },
              collapsed: false,
              items: [
                'documentation/how-does-oasys-work/verse-layer/rollup/1-1-overview',
                'documentation/how-does-oasys-work/verse-layer/rollup/1-2-difference',
                {
                  type: 'category',
                  label: 'Verifier', 
                  link: {
                    type: 'doc',
                    id: 'documentation/how-does-oasys-work/verse-layer/rollup/1-3-verifier'
                  },
                  collapsed: false,
                  items: [
                    'documentation/how-does-oasys-work/verse-layer/rollup/2-1-how-to-pay-network-fee',
                    'documentation/how-does-oasys-work/verse-layer/rollup/2-2-initial-verifier',
                  ]
                }
              ]
            }
          ]
        }
      ]
    }, {
      type: 'category',
      label: 'Build dApps on Verse', 
      link: {
        type: 'generated-index',
      },
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Selecting between Verse Builder or Game Builder', 
          link: {
            type: 'generated-index',
          },
          collapsed: false,
          items: [
            'documentation/build-dapps/1-1-select',
          ]
        },
        {
          type: 'category',
          label: 'How to build Verse (L2)', 
          link: {
            type: 'generated-index',
          },
          collapsed: false,
          items: [
            'documentation/build-dapps/how-to-build-verse/1-1-requirement',
            'documentation/build-dapps/how-to-build-verse/1-2-manual',
            'documentation/build-dapps/how-to-build-verse/1-3-optional-configs',
            'documentation/build-dapps/how-to-build-verse/1-4-verse-proxy',
          ]
        }, {
          type: 'category',
          label: 'How to build dApps', 
          link: {
            type: 'generated-index',
          },
          collapsed: false,
          items: [
            'documentation/build-dapps/how-to-build-dapps/1-1-verse-token',
            'documentation/build-dapps/how-to-build-dapps/1-2-o-token',
            'documentation/build-dapps/how-to-build-dapps/1-3-ex-token',
            'documentation/build-dapps/how-to-build-dapps/1-4-ordinary-contract',
          ]
        },
        {
          type: 'category',
          label: 'Module References', 
          link: {
            type: 'doc',
            id: 'documentation/build-dapps/module-references/1-1-modules'
          },
          collapsed: false,
          items: [
            'documentation/build-dapps/module-references/2-1-ethers.js',
            'documentation/build-dapps/module-references/2-2-web3.js',
          ]
        },
        {
          type: 'category',
          label: 'Game Example',
          link: {
            type: 'generated-index',
          },
          items: [
            'documentation/build-dapps/game-example/1-1',
            {
              type: 'category',
              label: 'Tutorial Overview',
              link: {
                type: 'generated-index',
              },
              items: [
                'documentation/build-dapps/game-example/tutorial/1-1',
                'documentation/build-dapps/game-example/tutorial/1-2',
              ]
            },
            {
              type: 'category',
              label: 'Repository Overview',
              link: {
                type: 'generated-index',
              },
              items: [
                'documentation/build-dapps/game-example/repository/1-1',
                'documentation/build-dapps/game-example/repository/1-2',
                'documentation/build-dapps/game-example/repository/1-3',
                'documentation/build-dapps/game-example/repository/1-4',
              ]
            },
            {
              type: 'category',
              label: 'Blockchain Functionality',
              link: {
                type: 'generated-index',
              },
              items: [
                'documentation/build-dapps/game-example/blockchain-functionality/1-1',
                'documentation/build-dapps/game-example/blockchain-functionality/1-2',
                'documentation/build-dapps/game-example/blockchain-functionality/1-3',
                'documentation/build-dapps/game-example/blockchain-functionality/1-4',
              ]
            },
            {
              type: 'category',
              label: 'NFT Creation',
              link: {
                type: 'generated-index',
              },
              items: [
                'documentation/build-dapps/game-example/nft-creation/1-1',
                'documentation/build-dapps/game-example/nft-creation/1-2',
                'documentation/build-dapps/game-example/nft-creation/1-3',
                'documentation/build-dapps/game-example/nft-creation/1-4',
                'documentation/build-dapps/game-example/nft-creation/1-5',
              ]
            },
          ]
        },
      ]
    }, {
      type: 'category',
      label: 'Operate Validator Node', 
      link: {
        type: 'generated-index',
      },
      collapsed: false,
      items: [
        'documentation/operate-validator/1-1-hd-requirement',
        'documentation/operate-validator/1-2-build-validator-node',
        'documentation/operate-validator/1-3-setup-verifier',
        'documentation/operate-validator/1-4-monitor',
      ]
    }, {
      type: 'category',
      label: 'Dev Tools', 
      link: {
        type: 'generated-index',
      },
      collapsed: false,
      items: [
        'documentation/tools/1-1-hub-geth',
        'documentation/tools/1-2-verse-geth',
        'documentation/tools/1-3-oaspos',
        'documentation/tools/1-4-graphQL',
        'documentation/tools/1-5-websocket',
      ]
    }
  ],
  // tech: [
  //   {
  //     type: 'category',
  //     label: 'Technical Materials', 
  //     link: {
  //       type: 'doc',
  //       id: 'tech/intro/1-1',
  //     },
  //     collapsed: false,
  //     items: [
  //       'tech/intro/1-2',
  //     ],
  //   }, 
  //   {
  //     type: 'category',
  //     label: 'What',
  //     link: {
  //       type: 'generated-index',
  //     },
  //     items: [
  //       {  
  //         type: 'category',
  //         label: 'GameFi',
  //         link: {
  //           type: 'doc',
  //           id: 'tech/what/gamefi/1-1',
  //         },
  //         items: [
  //           'tech/what/gamefi/2-1',
  //         ],
  //       },
  //       {
  //         type: 'category',
  //         label: 'Architecture',
  //         link: {
  //           type: 'doc',
  //           id: 'tech/what/architecture/1-1',
  //         },
  //         items: [
  //           'tech/what/architecture/2-1',
  //         ],
  //       },
  //       {  
  //         type: 'category',
  //         label: 'Provide',
  //         link: {
  //           type: 'generated-index',
  //         },
  //         items: [
  //           'tech/what/provide/1-1',
  //         ],
  //       },
  //       {  
  //         type: 'category',
  //         label: 'Roadmap',
  //         link: {
  //           type: 'generated-index',
  //         },
  //         items: [
  //           'tech/what/roadmap/1-1',
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     type: 'category',
  //     label: 'RPC Endpoints',
  //     link: {
  //       type: 'generated-index',
  //     },
  //     items: [
  //         'tech/rpc-endpoints/1-1',
  //     ],
  //   },
  //   {
  //     type: 'category',
  //     label: 'Wallet',
  //     link: {
  //       type: 'generated-index',
  //     },
  //     items: [
  //       'tech/wallet/1-1',
  //       'tech/wallet/1-2',
  //       //'tech/wallet/1-3',
  //       'tech/wallet/1-4',
  //       'tech/wallet/1-5',
  //       //'tech/wallet/1-6',
  //     ],
  //   },
  //   {  
  //     type: 'category',
  //     label: 'Build',
  //     link: {
  //       type: 'generated-index',
  //     },
  //     items: [
  //       'tech/build/1-1',
  //       {
  //         type: 'category',
  //         label: 'Library',
  //         link: {
  //           type: 'generated-index',
  //         },
  //         items: [
  //           'tech/build/library/1-1',
  //           'tech/build/library/1-2',
  //         ]
  //       },
  //       {
  //         type: 'category',
  //         label: 'ERC Token',
  //         link: {
  //           type: 'generated-index',
  //         },
  //         items: [
  //           //'tech/build/erc-token/1-1',
  //           'tech/build/erc-token/1-2',
  //         ]
  //       },
  //       // {
  //       //   type: 'category',
  //       //   label: 'Game Example',
  //       //   link: {
  //       //     type: 'generated-index',
  //       //   },
  //       //   items: [
  //       //     'tech/build/game-example/1-1',
  //       //     {
  //       //       type: 'category',
  //       //       label: 'Tutorial Overview',
  //       //       link: {
  //       //         type: 'generated-index',
  //       //       },
  //       //       items: [
  //       //         'tech/build/game-example/tutorial/1-1',
  //       //         'tech/build/game-example/tutorial/1-2',
  //       //       ]
  //       //     },
  //       //     {
  //       //       type: 'category',
  //       //       label: 'Repository Overview',
  //       //       link: {
  //       //         type: 'generated-index',
  //       //       },
  //       //       items: [
  //       //         'tech/build/game-example/repository/1-1',
  //       //         'tech/build/game-example/repository/1-2',
  //       //         'tech/build/game-example/repository/1-3',
  //       //         'tech/build/game-example/repository/1-4',
  //       //       ]
  //       //     },
  //       //     {
  //       //       type: 'category',
  //       //       label: 'Blockchain Functionality',
  //       //       link: {
  //       //         type: 'generated-index',
  //       //       },
  //       //       items: [
  //       //         'tech/build/game-example/blockchain-functionality/1-1',
  //       //         'tech/build/game-example/blockchain-functionality/1-2',
  //       //         'tech/build/game-example/blockchain-functionality/1-3',
  //       //         'tech/build/game-example/blockchain-functionality/1-4',
  //       //       ]
  //       //     },
  //       //     {
  //       //       type: 'category',
  //       //       label: 'NFT Creation',
  //       //       link: {
  //       //         type: 'generated-index',
  //       //       },
  //       //       items: [
  //       //         'tech/build/game-example/nft-creation/1-1',
  //       //         'tech/build/game-example/nft-creation/1-2',
  //       //         'tech/build/game-example/nft-creation/1-3',
  //       //         'tech/build/game-example/nft-creation/1-4',
  //       //         'tech/build/game-example/nft-creation/1-5',
  //       //       ]
  //       //     },
  //       //   ]
  //       // },
  //       {
  //         type: 'category',
  //         label: 'Qraph QL',
  //         link: {
  //           type: 'generated-index',
  //         },
  //         items: [
  //           'tech/build/graphql/1-1',
  //           //'tech/build/graphql/1-2',
  //         ]
  //       }, 
  //       'tech/build/1-2',
  //       'tech/build/1-3',
  //     ],
  //   },
  //   {
  //     type: 'category',
  //     label: 'Commands',
  //     link: {
  //       type: 'generated-index',
  //     },
  //     items: [
  //       {
  //         type: 'category',
  //         label: 'Hub-Layer',
  //         link: {
  //           type: 'generated-index',
  //         },
  //         items: [
  //           'tech/commands/hub-layer/1-1',
  //         ],
  //       },
  //       {
  //         type: 'category',
  //         label: 'Verse-Layer',
  //         link: {
  //           type: 'generated-index',
  //         },
  //         items: [
  //           'tech/commands/verse-layer/1-1',
  //         ],
  //       },
  //       'tech/commands/http-server/1-1',
  //       'tech/commands/websocket/1-1',
  //       'tech/commands/ipc-server/1-1',
  //     ],
  //   },
  // ],
  whitepaper: [
    {
      type: 'autogenerated',
      dirName: 'whitepaper',
    },
  ],
  quickstart:[ 
    {
    type: 'category',
    label: 'Quick Start', 
    link: {
      type: 'generated-index',
    },
    collapsed: false,
    items: [
      {
        type: 'category',
        label: 'Setup Metamask', 
        link: {
          type: 'doc',
          id: 'quick-start/setup-metamask/1-1-how-to-setup'
        },
        collapsed: false,
        items: [
          'quick-start/setup-metamask/1-1-how-to-setup',
          'quick-start/setup-metamask/1-2-rpc-endpoint',
        ]
      }, {
        type: 'category',
        label: 'Stake Oasys', 
        link: {
          type: 'doc',
          id: 'quick-start/stake-oasys/1-1-stake-oasys',
        },
        collapsed: false,
        items: [
          'quick-start/stake-oasys/1-1-stake-oasys',
          'quick-start/stake-oasys/1-2-stake-cli',
        ]
      },{
        type: 'category',
        label: 'Build Verse Layer', 
        link: {
          type: 'doc',
          id: 'quick-start/build-verse-layer/1-1-build-verse-on-testnet',
        },
        collapsed: false,
        items: [
          'quick-start/build-verse-layer/1-1-build-verse-on-testnet',
          'quick-start/build-verse-layer/1-2-bridge-between-verses',
        ]
      }, {
        type: 'category',
        label: 'Build dApps', 
        link: {
          id: '/whats-oasys/build-dapps/1-1-select',
        },
        collapsed: false,
        items: [
          {
            type: 'category',
            label: 'Build dApps', 
            link: {
              type: 'doc',
              id: 'quick-start/build-dapps/1-2-tutorials'
            },
            collapsed: false,
            items: [
              'quick-start/build-dapps/2-1-vft-oft',
              'quick-start/build-dapps/2-2-vnft-onft',
            ]
          }
        ]
      },
      {
        type: 'category',
        label: 'Official Links', 
        link: {
          type: 'doc',
          id: 'quick-start/official-links/1-1-official-links'
        },
        collapsed: false,
        items: []
      }
    ]
  },
],
  // hub_validator: [
  //     {
  //       type: 'category',
  //       label: 'Hub Validator', 
  //       link: {
  //         type: 'doc',
  //         id: 'hub-validator/1-1',
  //       },
  //       collapsed: false,
  //       items: [
  //         'hub-validator/1-1',
  //         'hub-validator/1-2',
  //         'hub-validator/1-3',
  //         'hub-validator/1-4',
  //         'hub-validator/1-5',
  //         'hub-validator/1-6',
  //         'hub-validator/1-7',
  //       ],
  //     },
  // ],
//   build: [
//     {
//       type: 'category',
//       label: 'Build on Oasys', 
//       link: {
//         type: 'doc',
//         id: 'build/1-1',
//       },
//       collapsed: false,
//       items: [
//         {  
//           type: 'category',
//           label: 'Verse',
//           link: {
//             type: 'doc',
//             id: 'build/verse/1-1',
//           },
//           items: [
//             'build/verse/1-1',
//           ],
//         },
//         {
//           type: 'category',
//           label: 'Game',
//           link: {
//             type: 'doc',
//             id: 'build/game/1-1',
//           },
//           items: [
//             'build/game/1-1',
//           ],
//         },
//       ],
//     },
// ],
};
module.exports = sidebars;