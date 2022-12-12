# Glossary

## A

#### account 

An object containg address, balance, nonce, and optional storage and code. An account can be a EOA or Contract accounts.

#### address

Address is the 42 character hexadecimal address representing a smart contract or a public wallet.

#### address
Most generally, this represents an EOA or contract that can receive (destination address) or send (source address) transactions on the blockchain. More specifically, it is the rightmost 160 bits of a Keccak hash of an ECDSA public key.

#### application programming interface
An Application Programming Interface (API) is a set of definitions for how to use a piece of software. An API sits between an application and a web server, and facilitates the transfer of data between them.

## B

#### Base Fee
Every block has a reserve price known as the 'base fee'. It is the minimum gas fee a user must pay to include a transaction in the next block.

#### block
A block is a bundled unit of information that include an ordered list of transactions and consensus-related information. Blocks are proposed by proof-of-stake validators, at which point they are shared across the entire peer-to-peer network, where they can easily be independently verified by all other nodes. Consensus rules govern what contents of a block are considered valid, and any invalid blocks are disregarded by the network. The ordering of these blocks and the transactions therein create a deterministic chain of events with the end representing the current state of the network.

#### block time
The time interval between blocks being added to the blockchain. Oasys have 15 block time in Hub Layer.

## C

#### consensus
When a supermajority of nodes on the network all have the same blocks in their locally validated best blockchain. 

## D

#### Dapp
Decentralized application. At a minimum, it is a smart contract and a web user interface. More broadly, a dapp is a web application that is built on top of open, decentralized, peer-to-peer infrastructure services. In addition, many dapps include decentralized storage and/or a message protocol and platform.

#### data availability
The property of a state that any node connected to the network could download any specific part of the state that they wish to.

#### decentralization
The concept of moving the control and execution of processes away from a central entity.

#### decentralized autonomous organization (DAO)
A company or other organization that operates without hierarchical management. 

#### decentralized exchange (DEX)
A type of dapp that lets you swap tokens with peers on the network. You need OAS to use one (to pay transactions fees) but they are not subject to geographical restrictions like centralized exchanges – anyone can participate.

#### DeFi
Short for "decentralized finance," a broad category of dapps aiming to provide financial services backed by the blockchain, without any intermediaries, so anyone with an internet connection can participate.

## E

#### encryption
Encryption is the conversion of electronic data into a form unreadable by anyone except the owner of the correct decryption key.

#### epoch
A dataset for validators having 5760blocks.

#### externally owned account (EOA)
Externally owned accounts (EOAs) are accounts that are controlled by private keys, typically generated using a seed phrase. Unlike smart contracts, externally owned accounts are accounts without any code associated with them. Typically these accounts are managed with a wallet.

#### Ethereum Virtual Machine (EVM)
A stack-based virtual machine that executes bytecode. In Ethereum, the execution model specifies how the system state is altered given a series of bytecode instructions and a small tuple of environmental data. This is specified through a formal model of a virtual state machine. EVM compatible shares execution model with Ethereum.

## F

#### faucet
A service carried out via smart contract that dispenses funds in the form of free test ether that can be used on a testnet.


#### finality
Finality is the guarantee that a set of transactions before a given time will not change and can't be reverted.

## G

#### gas
A virtual fuel used in Oasys to execute smart contracts. The EVM uses an accounting mechanism to measure the consumption of gas and limit the consumption of computing resources (see Turing complete).

#### gas limit
The maximum amount of gas a transaction or block may consume.

#### gas price
Price in OAS of one unit of gas specified in a transaction.

#### genesis block
The first block in a blockchain, used to initialize a particular network and its cryptocurrency.

#### geth
Go Ethereum. One of the most prominent implementations of the Ethereum protocol, written in Go. Hub Layer is written in geth.

#### gwei
Short for gigawei, a denomination of ether, commonly utilized to price gas. 1 gwei = 109 wei. 109 gwei = 1 ether.

## H 

#### hard fork
A permanent divergence in the blockchain; also known as a hard-forking change. One commonly occurs when nonupgraded nodes can't validate blocks created by upgraded nodes that follow newer consensus rules. Not to be confused with a fork, soft fork, software fork, or Git fork. Oasys Hub Layer takes Hardfork while updating smart contract deployments.

#### hash
A fixed-length fingerprint of variable-size input, produced by a hash function(Keccak-256).

#### hashrate
The number of hash calculations made per second by computers running mining software.

## S

#### staking

Depositing a quantity of OAS (your stake) to become a validator and secure the network. A validator checks transactions and proposes blocks under a proof-of-stake consensus model. Staking gives you an economic incentive to act in the best interests of the network.



#### Source 

[Ethererum Glossary](https://ethereum.org/en/glossary)