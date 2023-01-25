# Oaspos

Oaspos is client tool for linux. 

## Download 

[Oaspos](https://github.com/oasysgames/oasys-pos-cli/releases)

## Build 
---

```shell
$ go get && go build -o oaspos
```

## Usage
---
```shell
$ oaspos --help 

Name:
  oaspos - Command Line Tool for manage proof-of-stake of Oasys Blockchain.

  Copyright 2022 Oasys | Blockchain for The Games All Rights Reserved.
  
Version:
  1.0.0

Usage:
  oaspos [command]

Available Commands:
  completion                       Generate the autocompletion script for the specified shell
  crypto:create-account            Create a new account.
  help                             Help about any command
  staker:stake                     Stake tokens to validator.
  staker:unstake                   Unstake tokens from validator.
  validator:activate               Change the validator status to active.
  validator:claim-commissions      Withdraw validator commissions.
  validator:deactivate             Change the validator status to disable.
  validator:info                   Show validator information.
  validator:join                   Join as a validator in the proof-of-stake.
  validator:update-commission-rate Update validator commission rates.
  validator:update-operator        Update the block signing address.

Flags:
  -h, --help   help for oaspos

Use "oaspos [command] --help" for more information about a command.
```

## Validator Subcommands
---
First, set the environment variable to the private key for signing the transaction.

```shell

$ export PRIVATE_KEY=0x0123456789abcdfe...
```

### Validator Activate Command
---
Use the `$ oaspos validator:activate` command to change the validator status to active.

Errors can occurs in the following situations:
1. An error occurs if you run `activate` when you are not a validator.
2. An error occurs if the status of the validator is already activate.
3. An error occurs when rpc, chainid is not set.
4. An error occurs if the network on which the command is to operate is not set up.
5. An error occurs if the private key of the validator is not set.

```shell
# For mainnet
$ oaspos validator:activate --network mainnet [Validator Flag]

# For testnet
$ oaspos validator:activate --network testnet [Validator Flag]

# For custom
$ oaspos validator:activate --rpc https://example.com/ --chain-id 12345 [Validator Flag]
```

### Validator Deactivate Command
---
Use `$ oaspos validator:deactivate` command to change the validator status to disable.

Errors can occurs in the following situations:
1. An error occurs if you run `deactivate` when you are not a validator.
2. An error occurs if the status of the validator is already inactivated.
3. An error occurs if you use a custom network, when rpc, chainid is not set.
4. An error occurs if the network on which the command is to excute is not set up.
5. An error may occur if the private key of the validator is not set up.

```shell
# For mainnet
$ oaspos validator:deactivate --network mainnet [Validator Flag]

# For testnet
$ oaspos validator:deactivate --network testnet [Validator Flag]

# For custom
$ oaspos validator:deactivate --rpc https://example.com/ --chain-id 12345 [Validator Flag]
```

### Validator Join Command
---
Use `$ oaspos validator:join` command to join as a validator in the proof-of-stake.

Errors can occurs in the following situations:
1. An error occurs if you run `join` when you are not a operator.
2. An error occurs if the status of the operator is already joined.
3. An error occurs if you use a custom network, when rpc, chainid is not set up.
4. An error occurs if the network on which the command is to excute is not set up.
5. An error occurs if the private key of the validator is not set up.

```shell
# For mainnet
$ oaspos validator:join --network mainnet [Operator Flag]

# For testnet
$ oaspos validator:join --network testnet [Operator Flag]

# For custom
$ oaspos validator:join --rpc https://example.com/ --chain-id 12345 [Operator Flag]
```

### Update Operator Command
---
Use `$ oaspos validator:update-operator` command to update the block signing address.

Errors can occurs in the following situations:
1. An error occurs if you run `update-operator` when you are not a operator.
2. An error occurs when the address to register as operator is null.
3. An error occurs if you use a custom network, when rpc, chainid is not set up.
4. An error occurs if the network on which the command is to excute is not set up.
5. An error occurs if the private key of the validator is not set up.

```shell
# For mainnet
$ oaspos validator:join --network mainnet [Operator Flag]

# For testnet
$ oaspos validator:join --network testnet [Operator Flag]

# For custom
$ oaspos validator:join --rpc https://example.com/ --chain-id 12345 [Operator Flag]
```

### Staker Stake Command
---
Use `$ oaspos staker:stake` command to update the block signing address.

Errors can occurs in the following situations:
1. An error occurs if the address of the validator you entered does not joined.
2. An error occurs when the amount of tokens to be staked is less than or equal to 0.
3. An error occurs if you use a custom network, when rpc, chainid is not set up.
4. An error occurs if the network on which the command is to excute is not set up.
5. An error occurs if the private key of the validator is not set up.

```shell
#mainnet
$ oaspos staker:stake --network mainnet [Validator Flag, Tokentype Flag, Amount Flag]

#custom
$ oaspos staker:stake --rpc https://example.com/ --chain-id 12345 [Validator Flag, Tokentype Flag, Amount Flag]
```

### Staker Untake Command
---
Use `$ oaspos staker:unstake` command to unstake tokens form validator.

Errors can occurs in the following situations:
1. An error occurs if the address of the validator you entered does not joined.
2. An error occurs when the amount of tokens to be unstaked is less than or equal to 0.
3. An error occurs if you use a custom network, when rpc, chainid is not set up.
4. An error occurs if the network on which the command is to excute is not set up.
5. An error occurs if the private key of the validator is not set up.

```shell
#For mainnet
$ oaspos staker:unstake --network mainnet [Validator Flag, Tokentype Flag, Amount Flag]

#For custom
$ oaspos staker:unstake --rpc https://example.com/ --chain-id 12345 [Validator Flag, Tokentype Flag, Amount Flag]
```

