# Upgrade Contracts

## Introduction

Verse-Layer has several important smart contracts deployed, such as Cross-Domain Messenger and Token Bridge (referred to as "**system contract**" hereafter).

While regular contracts are deployed through transactions, system contracts are deployed by writing compiled bytecode directly into the "**state**" of the blockchain. Therefore, if there is a need to upgrade a system contracts for some reason, it requires overwriting the state with the new bytecode.

This document presents the procedure for upgrading Verse-Layer's system contracts.

:::danger IMPORTANT
Please allow 30 to 90 minutes of maintenance time as Verse-Layer must be shut down during the upgrade.

Also, if you have deployed Verse-Layer on Oasys Mainnet, **please contact the Oasys team with the scheduled upgrade date and time**. This is because the replica node for Instant Verify that Oasys is running needs to be upgraded at the same time and real-time communication with the Oasys team is required.
:::

## Preparation

Please contact the Oasys team to inform them that the upgrade process has started.

## Stop block creation

Stop the create of new blocks.

```shell
cd /path/to/verse-layer-optimism

docker-compose exec l2geth geth attach -exec 'miner.stop()'
```

:::caution
If you are operating your own replica nodes, please perform the same tasks on those nodes as well.
:::

## Get latest block number

Get the latest block number and note it down. **Also, please contact the Oasys team with this block number.**

```shell
docker-compose exec l2geth geth attach -exec eth.blockNumber
```

## Stop containers

Stop some containers related to the upgrade.

```shell
docker-compose stop data-transport-layer l2geth
```

:::caution
If you are operating your own replica nodes, please perform the same tasks on those nodes as well.
:::

## Data Backup

I will back up the chain data just to be safe.

:::info
Disk snapshots are recommended in AWS and other cloud platforms.
:::

```shell
# You need more free disk space than this
du -hs ./data

cp -rp ./data ~/verse-backup$(date '+%Y%m%d')
```

## Create contractupdate.json

Please copy the JSON and save it as `./assets/contractupdate.json`. Also, replace the `_REPL_DEPLOY_BLOCK_` with the **latest block number plus 1**.

```json
{
  "_REPL_DEPLOY_BLOCK_": {
    "0x4200000000000000000000000000000000000010": {
      "description": "ERC20 Bridge V2 / https://github.com/oasysgames/oasys-optimism/blob/5186190c3250121179064b70d8e2fbd2d0a03ce3/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol",
      "balance": "0x0",
      "code": "0x608060405234801561001057600080fd5b50600436106100675760003560e01c80633cb747bf116100505780633cb747bf146100ca578063662a633a146100ea578063a3a79548146100fd57600080fd5b806332b7006d1461006c57806336c717c114610081575b600080fd5b61007f61007a366004610ca1565b610110565b005b6001546100a19073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b6000546100a19073ffffffffffffffffffffffffffffffffffffffff1681565b61007f6100f8366004610d12565b610126565b61007f61010b366004610daa565b6106c1565b61011f853333878787876106d8565b5050505050565b60015473ffffffffffffffffffffffffffffffffffffffff1661015e60005473ffffffffffffffffffffffffffffffffffffffff1690565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461021d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f4f564d5f58434841494e3a206d657373656e67657220636f6e7472616374207560448201527f6e61757468656e7469636174656400000000000000000000000000000000000060648201526084015b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1661025360005473ffffffffffffffffffffffffffffffffffffffff1690565b73ffffffffffffffffffffffffffffffffffffffff16636e296e456040518163ffffffff1660e01b815260040160206040518083038186803b15801561029857600080fd5b505afa1580156102ac573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102d09190610e2d565b73ffffffffffffffffffffffffffffffffffffffff1614610373576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603060248201527f4f564d5f58434841494e3a2077726f6e672073656e646572206f662063726f7360448201527f732d646f6d61696e206d657373616765000000000000000000000000000000006064820152608401610214565b61039d877f1d1d8b6300000000000000000000000000000000000000000000000000000000610a32565b801561045357508673ffffffffffffffffffffffffffffffffffffffff1663c01e1bd66040518163ffffffff1660e01b8152600401602060405180830381600087803b1580156103ec57600080fd5b505af1158015610400573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104249190610e2d565b73ffffffffffffffffffffffffffffffffffffffff168873ffffffffffffffffffffffffffffffffffffffff16145b15610567576040517f40c10f1900000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8681166004830152602482018690528816906340c10f1990604401600060405180830381600087803b1580156104c857600080fd5b505af11580156104dc573d6000803e3d6000fd5b505050508573ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff167fb0444523268717a02698be47d0803aa7468c00acbed2f8bd93a0459cde61dd898888888860405161055a9493929190610e93565b60405180910390a46106b7565b600063a9f9e67560e01b8989888a89898960405160240161058e9796959493929190610ed3565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff00000000000000000000000000000000000000000000000000000000909316929092179091526001549091506106339073ffffffffffffffffffffffffffffffffffffffff16600083610a55565b8673ffffffffffffffffffffffffffffffffffffffff168873ffffffffffffffffffffffffffffffffffffffff168a73ffffffffffffffffffffffffffffffffffffffff167f7ea89a4591614515571c2b51f5ea06494056f261c10ab1ed8c03c7590d87bce0898989896040516106ad9493929190610e93565b60405180910390a4505b5050505050505050565b6106d0863387878787876106d8565b505050505050565b6040517f9dc29fac0000000000000000000000000000000000000000000000000000000081523360048201526024810185905273ffffffffffffffffffffffffffffffffffffffff881690639dc29fac90604401600060405180830381600087803b15801561074657600080fd5b505af115801561075a573d6000803e3d6000fd5b5050505060008773ffffffffffffffffffffffffffffffffffffffff1663c01e1bd66040518163ffffffff1660e01b8152600401602060405180830381600087803b1580156107a857600080fd5b505af11580156107bc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107e09190610e2d565b9050606073ffffffffffffffffffffffffffffffffffffffff891673deaddeaddeaddeaddeaddeaddeaddeaddead000014156108d5576040517f1532ec340000000000000000000000000000000000000000000000000000000090610851908a908a908a9089908990602401610f30565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff00000000000000000000000000000000000000000000000000000000909316929092179091529050610994565b6040517fa9f9e67500000000000000000000000000000000000000000000000000000000906109149084908c908c908c908c908b908b90602401610ed3565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff000000000000000000000000000000000000000000000000000000009093169290921790915290505b6001546109b89073ffffffffffffffffffffffffffffffffffffffff168683610a55565b3373ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f73d170910aba9e6d50b102db522b1dbcd796216f5128b445aa2135272886497e8a8a89896040516106ad9493929190610e93565b6000610a3d83610ae6565b8015610a4e5750610a4e8383610b4b565b9392505050565b6000546040517f3dbb202b00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff90911690633dbb202b90610aaf90869085908790600401610f70565b600060405180830381600087803b158015610ac957600080fd5b505af1158015610add573d6000803e3d6000fd5b50505050505050565b6000610b12827f01ffc9a700000000000000000000000000000000000000000000000000000000610b4b565b8015610b455750610b43827fffffffff00000000000000000000000000000000000000000000000000000000610b4b565b155b92915050565b604080517fffffffff000000000000000000000000000000000000000000000000000000008316602480830191909152825180830390910181526044909101909152602080820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f01ffc9a700000000000000000000000000000000000000000000000000000000178152825160009392849283928392918391908a617530fa92503d91506000519050828015610c03575060208210155b8015610c0f5750600081115b979650505050505050565b73ffffffffffffffffffffffffffffffffffffffff81168114610c3c57600080fd5b50565b803563ffffffff81168114610c5357600080fd5b919050565b60008083601f840112610c6a57600080fd5b50813567ffffffffffffffff811115610c8257600080fd5b602083019150836020828501011115610c9a57600080fd5b9250929050565b600080600080600060808688031215610cb957600080fd5b8535610cc481610c1a565b945060208601359350610cd960408701610c3f565b9250606086013567ffffffffffffffff811115610cf557600080fd5b610d0188828901610c58565b969995985093965092949392505050565b600080600080600080600060c0888a031215610d2d57600080fd5b8735610d3881610c1a565b96506020880135610d4881610c1a565b95506040880135610d5881610c1a565b94506060880135610d6881610c1a565b93506080880135925060a088013567ffffffffffffffff811115610d8b57600080fd5b610d978a828b01610c58565b989b979a50959850939692959293505050565b60008060008060008060a08789031215610dc357600080fd5b8635610dce81610c1a565b95506020870135610dde81610c1a565b945060408701359350610df360608801610c3f565b9250608087013567ffffffffffffffff811115610e0f57600080fd5b610e1b89828a01610c58565b979a9699509497509295939492505050565b600060208284031215610e3f57600080fd5b8151610a4e81610c1a565b8183528181602085013750600060208284010152600060207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116840101905092915050565b73ffffffffffffffffffffffffffffffffffffffff85168152836020820152606060408201526000610ec9606083018486610e4a565b9695505050505050565b600073ffffffffffffffffffffffffffffffffffffffff808a1683528089166020840152808816604084015280871660608401525084608083015260c060a0830152610f2360c083018486610e4a565b9998505050505050505050565b600073ffffffffffffffffffffffffffffffffffffffff808816835280871660208401525084604083015260806060830152610c0f608083018486610e4a565b73ffffffffffffffffffffffffffffffffffffffff8416815260006020606081840152845180606085015260005b81811015610fba57868101830151858201608001528201610f9e565b81811115610fcc576000608083870101525b5063ffffffff9490941660408401525050601f919091017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016016080019291505056fea26469706673582212209a39db533b629cb5bf9a9511bdb255a84b6ac0ba689f89d2a9920722ef9e9f0564736f6c63430008090033"
    },
    "0x6200000000000000000000000000000000000001": {
      "description": "ERC721 Bridge V2 / https://github.com/oasysgames/oasys-optimism/blob/5186190c3250121179064b70d8e2fbd2d0a03ce3/packages/contracts/contracts/oasys/L2/messaging/L2ERC721Bridge.sol",
      "balance": "0x0",
      "code": "0x608060405234801561001057600080fd5b50600436106100675760003560e01c8063662a633a11610050578063662a633a146100ca578063a3a79548146100dd578063c4e8ddfa146100f057600080fd5b806332b7006d1461006c5780633cb747bf14610081575b600080fd5b61007f61007a366004610b96565b610110565b005b6000546100a19073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b61007f6100d8366004610c07565b610126565b61007f6100eb366004610c9f565b6106c1565b6001546100a19073ffffffffffffffffffffffffffffffffffffffff1681565b61011f853333878787876106d8565b5050505050565b60015473ffffffffffffffffffffffffffffffffffffffff1661015e60005473ffffffffffffffffffffffffffffffffffffffff1690565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461021d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f4f564d5f58434841494e3a206d657373656e67657220636f6e7472616374207560448201527f6e61757468656e7469636174656400000000000000000000000000000000000060648201526084015b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1661025360005473ffffffffffffffffffffffffffffffffffffffff1690565b73ffffffffffffffffffffffffffffffffffffffff16636e296e456040518163ffffffff1660e01b815260040160206040518083038186803b15801561029857600080fd5b505afa1580156102ac573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102d09190610d22565b73ffffffffffffffffffffffffffffffffffffffff1614610373576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603060248201527f4f564d5f58434841494e3a2077726f6e672073656e646572206f662063726f7360448201527f732d646f6d61696e206d657373616765000000000000000000000000000000006064820152608401610214565b61039d877f1d1d8b6300000000000000000000000000000000000000000000000000000000610927565b801561045357508673ffffffffffffffffffffffffffffffffffffffff1663c01e1bd66040518163ffffffff1660e01b8152600401602060405180830381600087803b1580156103ec57600080fd5b505af1158015610400573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104249190610d22565b73ffffffffffffffffffffffffffffffffffffffff168873ffffffffffffffffffffffffffffffffffffffff16145b15610567576040517f40c10f1900000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8681166004830152602482018690528816906340c10f1990604401600060405180830381600087803b1580156104c857600080fd5b505af11580156104dc573d6000803e3d6000fd5b505050508573ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff167fb0444523268717a02698be47d0803aa7468c00acbed2f8bd93a0459cde61dd898888888860405161055a9493929190610d88565b60405180910390a46106b7565b6000638f45e47760e01b8989888a89898960405160240161058e9796959493929190610dc8565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff00000000000000000000000000000000000000000000000000000000909316929092179091526001549091506106339073ffffffffffffffffffffffffffffffffffffffff1660008361094a565b8673ffffffffffffffffffffffffffffffffffffffff168873ffffffffffffffffffffffffffffffffffffffff168a73ffffffffffffffffffffffffffffffffffffffff167f7ea89a4591614515571c2b51f5ea06494056f261c10ab1ed8c03c7590d87bce0898989896040516106ad9493929190610d88565b60405180910390a4505b5050505050505050565b6106d0863387878787876106d8565b505050505050565b6040517f9dc29fac0000000000000000000000000000000000000000000000000000000081523360048201526024810185905273ffffffffffffffffffffffffffffffffffffffff881690639dc29fac90604401600060405180830381600087803b15801561074657600080fd5b505af115801561075a573d6000803e3d6000fd5b5050505060008773ffffffffffffffffffffffffffffffffffffffff1663c01e1bd66040518163ffffffff1660e01b8152600401602060405180830381600087803b1580156107a857600080fd5b505af11580156107bc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107e09190610d22565b90506060638f45e47760e01b828a8a8a8a89896040516024016108099796959493929190610dc8565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff00000000000000000000000000000000000000000000000000000000909316929092179091526001549091506108ad9073ffffffffffffffffffffffffffffffffffffffff16868361094a565b3373ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f73d170910aba9e6d50b102db522b1dbcd796216f5128b445aa2135272886497e8a8a89896040516106ad9493929190610d88565b6000610932836109db565b801561094357506109438383610a40565b9392505050565b6000546040517f3dbb202b00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff90911690633dbb202b906109a490869085908790600401610e25565b600060405180830381600087803b1580156109be57600080fd5b505af11580156109d2573d6000803e3d6000fd5b50505050505050565b6000610a07827f01ffc9a700000000000000000000000000000000000000000000000000000000610a40565b8015610a3a5750610a38827fffffffff00000000000000000000000000000000000000000000000000000000610a40565b155b92915050565b604080517fffffffff000000000000000000000000000000000000000000000000000000008316602480830191909152825180830390910181526044909101909152602080820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f01ffc9a700000000000000000000000000000000000000000000000000000000178152825160009392849283928392918391908a617530fa92503d91506000519050828015610af8575060208210155b8015610b045750600081115b979650505050505050565b73ffffffffffffffffffffffffffffffffffffffff81168114610b3157600080fd5b50565b803563ffffffff81168114610b4857600080fd5b919050565b60008083601f840112610b5f57600080fd5b50813567ffffffffffffffff811115610b7757600080fd5b602083019150836020828501011115610b8f57600080fd5b9250929050565b600080600080600060808688031215610bae57600080fd5b8535610bb981610b0f565b945060208601359350610bce60408701610b34565b9250606086013567ffffffffffffffff811115610bea57600080fd5b610bf688828901610b4d565b969995985093965092949392505050565b600080600080600080600060c0888a031215610c2257600080fd5b8735610c2d81610b0f565b96506020880135610c3d81610b0f565b95506040880135610c4d81610b0f565b94506060880135610c5d81610b0f565b93506080880135925060a088013567ffffffffffffffff811115610c8057600080fd5b610c8c8a828b01610b4d565b989b979a50959850939692959293505050565b60008060008060008060a08789031215610cb857600080fd5b8635610cc381610b0f565b95506020870135610cd381610b0f565b945060408701359350610ce860608801610b34565b9250608087013567ffffffffffffffff811115610d0457600080fd5b610d1089828a01610b4d565b979a9699509497509295939492505050565b600060208284031215610d3457600080fd5b815161094381610b0f565b8183528181602085013750600060208284010152600060207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116840101905092915050565b73ffffffffffffffffffffffffffffffffffffffff85168152836020820152606060408201526000610dbe606083018486610d3f565b9695505050505050565b600073ffffffffffffffffffffffffffffffffffffffff808a1683528089166020840152808816604084015280871660608401525084608083015260c060a0830152610e1860c083018486610d3f565b9998505050505050505050565b73ffffffffffffffffffffffffffffffffffffffff8416815260006020606081840152845180606085015260005b81811015610e6f57868101830151858201608001528201610e53565b81811115610e81576000608083870101525b5063ffffffff9490941660408401525050601f919091017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016016080019291505056fea2646970667358221220e46c052573d480e428093bf014fb26e7c5906d372c2928f7fc9073a2330dfefd64736f6c63430008090033"
    }
  }
}
```

:::danger IMPORTANT
If the file already exists, please keep the existing settings and append the new settings. This is because if existing settings are deleted, the state will be out of sync when a new replica node is built.
:::

:::caution
If you are operating your own replica nodes, please save the file on those nodes as well.
:::

## Edit docker-compose.yml 

Change the container image for the `l2geth` service.

```yaml
x-l2geth: &l2geth
  image: ghcr.io/oasysgames/oasys-optimism/l2geth:v0.1.5
```

Next, add the new environment variable to the `l2geth` service.

```yaml
x-l2geth-environment: &l2geth-environment
  DANGEROUS_UPDATE_CONTRACT: /assets/contractupdate.json
```

:::caution
If you are operating your own replica nodes, please perform the same edits on those nodes as well.
:::

## Start containers

```shell
docker-compose up -d data-transport-layer l2geth
```

:::caution
If you are operating your own replica nodes, please perform the same tasks on those nodes as well.
:::

## Move block forward

Move forward one block number.

```shell
docker-compose exec l2geth geth attach \
  -exec 'eth.sendTransaction({ from: eth.accounts[0], to: eth.accounts[0] })'
```

## Check results

Check if upgrade was successful with the following commands.

:::caution
If you are operating your own replica nodes, please perform the same tasks on those nodes as well.
:::

### Check ERC20 Bridge

Initial (V1).
```shell
docker-compose exec l2geth geth attach \
  -exec 'web3.sha3(eth.getCode("0x4200000000000000000000000000000000000010"))
    === "0xde83557775184c5d5dc21f2c5e2a0d4d3e20bb83fbc2ae0e4a5a792614783ef2"'
```

When upgrading to V2.
```shell
docker-compose exec l2geth geth attach \
  -exec 'web3.sha3(eth.getCode("0x4200000000000000000000000000000000000010"))
    === "0xb29df7dafddbe997e19eaccac1a7dd4e08abaab13613abca93da8f2ffdd7fc71"'
```

### Check ERC721 Bridge

Initial (V1).
```shell
docker-compose exec l2geth geth attach \
  -exec 'web3.sha3(eth.getCode("0x6200000000000000000000000000000000000001"))
    === "0xe6530fba7e35f17fb796d90f7938793b5d62b9d27780c93f584f87e27169902e"'
```

When upgrading to V2.
```shell
docker-compose exec l2geth geth attach \
  -exec 'web3.sha3(eth.getCode("0x6200000000000000000000000000000000000001"))
    === "0xe2cd9eec69e10fe36c3c85d78ed12c24421b981c988903d0a8f9cf4dc78fca80"'
```