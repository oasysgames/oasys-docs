# Explorer
After building Verse, You have to create Verse explorer. Please use [blockscout](https://docs.blockscout.com/) to create Verse explorer.

## AWS Setup
You can set up blockscout on AWS by following document.

[Ansible Deployment (AWS Cloud)](https://docs.blockscout.com/for-developers/ansible-deployment/overview)

## Manual Setup
If you set up blockscout on cloud service excepting AWS, You have to set up manually.

Manual setup is described on the following page.

[Manual Deployment](https://docs.blockscout.com/for-developers/manual-deployment)

## Environment Variable
When creating blockscout, you have to set environment variable using blockscout.

You can check environment variable lists at [this page](https://docs.blockscout.com/for-developers/information-and-settings/env-variables).

When creating verse blockscout, please set following to required environment variables.

|    Variable               |   Description                              | Value |
|---------------------------|--------------------------------------------|--------|
| DATABASE_URL              | Variable to define the Postgres Database endpoint.                     |    postgresql://user:password@localhost:5432/blockscout  `(Your DATABASE RPC)`   |
| ETHEREUM_JSONRPC_VARIANT  | Tells the application which RPC Client the node is using               |    geth `(Verse uses geth)`    |
| ETHEREUM_JSONRPC_HTTP_URL | The RPC endpoint used to fetch blocks, transactions, receipts, tokens. |    rpc.myverse.com `(Your Verse RPC)`   |
