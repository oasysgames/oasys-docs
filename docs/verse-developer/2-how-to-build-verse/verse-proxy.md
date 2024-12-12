# Verse Proxy
This is proxy to control access allow list to verse layer.
Verse-Proxy is made by [Nest](https://github.com/nestjs/nest).

Verse-Proxy can control following items.
- jsonrpc method
- transaction's from, to, value
- address which can deploy smart contract
- transaction access rate

## Verse Proxy Build Steps

### 1. Git clone
```bash
git clone git@github.com:oasysgames/verse-proxy.git
```

### 2. Set access allow list
Set access allow list at following file.
Details are described later.
- `src/config/configuration.ts`
- `src/config/transactionAllowList.ts`

### 3. Set up npm
```bash
$ npm install
$ npm build
```

### 4. Run app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Control items

### Set allowed header
You can set whether you inherit proxy request's host header on verse request at `src/config/configuration.ts`.
```typescript
inheritHostHeader: true,
```

### Set allowed verse request methods
You can set allowed verse request methods by regex at `src/config/configuration.ts`.
```typescript
allowedMethods: [
  /^net_version$/,
  /^web3_clientVersion$/,
  /^eth_get.*$/,
  /^eth_sendRawTransaction$/,
  /^eth_chainId$/,
  /^eth_blockNumber$/,
  /^eth_call$/,
  /^eth_estimateGas$/,
  /^eth_gasPrice$/,
  /^eth_maxPriorityFeePerGas$/,
  /^eth_feeHistory$/,
  /^eth_.*Filter$/,
],
```

Default allowedMethods feature are following.
- It allows methods that may be requested by users
- It prohibits the methods of executing a transaction with the authority of verse-geth(e.g. eth_sendTransaction)

### Set transaction allow list
You can set allowed transaction list at `src/config/transactionAllowList.ts`.

#### from, to
You can control the from and to of a transaction.

```typescript
// elements contained in the array are allowed to be transacted.
export const getTxAllowList = (): Array<TransactionAllow> => {
  return [
    {
      fromList: ['0xaf395754eB6F542742784cE7702940C60465A46a'],
      toList: ['0xaf395754eB6F542742784cE7702940C60465A46a'],
    },
    {
      fromList: ['0xaf395754eB6F542742784cE7702940C60465A46c'],
      toList: ['0xaf395754eB6F542742784cE7702940C60465A46c'],
    },
  ];
};
```

```typescript
// '*' is wildcard.
export const getTxAllowList = (): Array<TransactionAllow> => {
  return [
    {
      fromList: ['*'],
      toList: ['*'],
    },
  ];
};
```

```typescript
// ! is exception_pattern.

// 0xaf395754eB6F542742784cE7702940C60465A46a are not allowed to be transacted.
// But any address other than 0xaf395754eB6F542742784cE7702940C60465A46a are allowed to be transacted.
export const getTxAllowList = (): Array<TransactionAllow> => {
  return [
    {
      fromList: ['!0xaf395754eB6F542742784cE7702940C60465A46a'],
      toList: ['*'],
    },
  ];
};

// Everyone are not allowed to transact to 0xaf395754eB6F542742784cE7702940C60465A46a.
// everyone are allowed to transact to any address other than 0xaf395754eB6F542742784cE7702940C60465A46a.
export const getTxAllowList = (): Array<TransactionAllow> => {
  return [
    {
      fromList: ['*'],
      toList: ['!0xaf395754eB6F542742784cE7702940C60465A46a'],
    },
  ];
};

// Multiple Setting is enabled.
// Everyone are not allowed to transact to 0xaf395754eB6F542742784cE7702940C60465A46a and 0xaf395754eB6F542742784cE7702940C60465A46c.
// everyone are allowed to transact to any address other than 0xaf395754eB6F542742784cE7702940C60465A46a and 0xaf395754eB6F542742784cE7702940C60465A46c.
export const getTxAllowList = (): Array<TransactionAllow> => {
  return [
    {
      fromList: ['*'],
      toList: [
        '!0xaf395754eB6F542742784cE7702940C60465A46a',
        '!0xaf395754eB6F542742784cE7702940C60465A46c'
      ],
    },
  ];
};
```

```typescript
// You can not set setting with normal_address and exception_pattern.
export const getTxAllowList = (): Array<TransactionAllow> => {
  return [
    {
      fromList: ['*'],
      toList: [
        '0xaf395754eB6F542742784cE7702940C60465A46a',
        '!0xaf395754eB6F542742784cE7702940C60465A46c'
      ],
    },
  ];
};
```

If you want to allow transacting factory and bridge contracts, please set those contract addresses to `to`.

```json
// Verse-Layer pre-deployed Contracts. Same address for all Verse-Layers.
L2StandardBridge: '0x4200000000000000000000000000000000000010',
L2StandardTokenFactory: '0x4200000000000000000000000000000000000012',
L2ERC721Bridge: '0x6200000000000000000000000000000000000001',
```

```typescript
export const getTxAllowList = (): Array<TransactionAllow> => {
  return [
    {
      fromList: [<FROM_YOU_WANT_TO_SET>],
      toList: [
        '0x4200000000000000000000000000000000000010',
        '0x4200000000000000000000000000000000000012',
        '0x6200000000000000000000000000000000000001',
      ],
    },
    ...
  ];
};
```

#### Value(Option)
You can control the token value of a transaction.

```typescript
// Only transactions with more than 1000000000000000000unit values are allowed.
export const getTxAllowList = (): Array<TransactionAllow> => {
  return [
    {
      fromList: ['*'],
      toList: ['*'],
      value: { gt: '1000000000000000000' },
      },
  ];
};
```

| value's key  |  Comparison Operation  |
| ---- | ---- |
|  eq  |  txValue == condition is allowed  |
|  nq  |  txValue != condition is allowed  |
|  gt  |  txValue > condition is allowed  |
|  gte  |  txValue >= condition is allowed  |
|  lt  |  txValue < condition is allowed  |
|  lte  |  txValue <= condition is allowed  |

#### Transaction access rate limit(Option)
Please refer to the section [below](/docs/verse-developer/how-to-build-verse/verse-proxy#transaction-rate-limit).

### Set contract deployer
You can control deployer of a verse at `src/config/transactionAllowList.ts`.

```typescript
// Only 0xaf395754eB6F542742784cE7702940C60465A46a can deploy
export const getDeployAllowList = (): Array<string> => {
  return ['0xaf395754eB6F542742784cE7702940C60465A46a'];
};

// wild card
// Everyone can deploy
export const getDeployAllowList = (): Array<string> => {
  return ['*'];
};

// exception_pattern
// any address other than 0xaf395754eB6F542742784cE7702940C60465A46c can deploy.
export const getDeployAllowList = (): Array<string> => {
  return ['!0xaf395754eB6F542742784cE7702940C60465A46c'];
};
```

## Batch Request
You can execute batch requests to the proxy.

If you want to make many transaction batch requests, change the parse limit in the body by environment variable.
The default body parse limit is 512kb.

```bash
MAX_BODY_BYTE_SIZE=1048576 # 1048576 byte is 1MB.
```

## Multi Processing
If you want to build proxy in multi-process, set worker count to environment variables.
The default worker count is 1.

```bash
CLUSTER_PROCESS=4
```

## Master-Verse-Node and Read-Verse-node
You can create a verse and its replica to reduce the access load on the verse.
A verse can be set on the master-node and a replica on the read-node in a proxy.
It will send read-transactions to the read-node and write-transactions to the master-node.

You can set Master-Verse-Node and Read-Verse-node by the environment variable.
```bash
VERSE_MASTER_NODE_URL=[YOUR_VERSE_URL]
VERSE_READ_NODE_URL=[YOUR_VERSE_REPLICA_URL]
```

### Check Master-Verse-Node
To check the behavior of requests to the Master-Verse-Node, an endpoint named `/master` is provided.

All transactions sent to `/master` are sent to the Master-Verse-Node.

## Transaction Rate Limit
### Datastore setting
For setting datastore to store transaction history, you have to set datastore environment variables.

```bash
# In case of redis
DATASTORE=redis
REDIS_URI=<REDIS_URI> # e.g. redis://localhost:6379/0
```

### Rate limit setting
Using `txAllowList` at `src/config/transactionAllowList.ts`, you can set transaction rate limit.

```typescript
const rateLimitA = {
  name: 'wildcard',
  interval: 86400,
  limit: 1000,
};

export const getTxAllowList = (): Array<TransactionAllow> => {
  return [
    {
      fromList: ['*'],
      toList: ['*'],
      rateLimit: rateLimitA,
    },
  ];
};
```

| RateLimit key  |  Description | Required |
| ---- | ---- | ---- |
|  name  |  RateLimit setting name. Must be unique.  | O |
|  perFrom  |  Whether the setting is restricted for each from set in fromList or not  | |
|  perTo  |  Whether the setting is restricted for each to set in the toList or not  | |
|  perMethod  |  Whether the setting is restricted for each contract method or not  | |
|  interval  |  Rate limit interval(seconds)  | O |
|  limit  |  Number of tx's allowed in the interval  | O |

Please define rateLimit variable and set `txAllowList`. because rateLimit can be shared by another txAllowList setting.

```typescript
const rateLimitA = {
  name: 'wildcard',
  perFrom: true,
  perTo: true,
  interval: 86400,
  limit: 1,
};

export const getTxAllowList = (): Array<TransactionAllow> => {
  return [
    {
      fromList: ['*'],
      toList: ['0x9809d9d94b0b3380db38b1e1a06047a2964e0041'],
      rateLimit: rateLimitA,
    },
    {
      fromList: ['*'],
      toList: ['0x40bde52e6b80ae11f34c58c14e1e7fe1f9c834c4'],
      rateLimit: rateLimitA,
    },
  ];
};
```

#### Example(limit settings per user)
Each user can perform a transaction to `0x9809d9d94b0b3380db38b1e1a06047a2964e0041` once every 60 seconds.

```typescript
const rateLimitA = {
  name: 'wildcard',
  perFrom: true,
  interval: 60,
  limit: 1,
};

export const getTxAllowList = (): Array<TransactionAllow> => {
  return [
    {
      fromList: ['*'],
      toList: ['0x9809d9d94b0b3380db38b1e1a06047a2964e0041'],
      rateLimit: rateLimitA,
    },
  ];
};
```

#### Example(limit settings per all users)
Transaction to `0x9809d9d94b0b3380db38b1e1a06047a2964e0041` can only be executed once every 60 seconds

```typescript
const rateLimitA = {
  name: 'wildcard',
  interval: 60,
  limit: 1,
};

export const getTxAllowList = (): Array<TransactionAllow> => {
  return [
    {
      fromList: ['*'],
      toList: ['0x9809d9d94b0b3380db38b1e1a06047a2964e0041'],
      rateLimit: rateLimitA,
    },
  ];
};
```

#### Example(limit settings per contract)
Transaction to `0x9809d9d94b0b3380db38b1e1a06047a2964e0041` or `0x40bde52e6b80ae11f34c58c14e1e7fe1f9c834c4` can only be executed once every 60 seconds respectively.
```typescript
const rateLimitA = {
  name: 'wildcard',
  perTo: true,
  interval: 60,
  limit: 1,
};

export const getTxAllowList = (): Array<TransactionAllow> => {
  return [
    {
      fromList: ['*'],
      toList: ['0x9809d9d94b0b3380db38b1e1a06047a2964e0041'],
      rateLimit: rateLimitA,
    },
    {
      fromList: ['*'],
      toList: ['0x40bde52e6b80ae11f34c58c14e1e7fe1f9c834c4'],
      rateLimit: rateLimitA,
    },
  ];
};
```

#### Example(limit settings per all contracts)
Both together, Transaction to `0x9809d9d94b0b3380db38b1e1a06047a2964e0041` or `0x40bde52e6b80ae11f34c58c14e1e7fe1f9c834c4` can only be executed once every 60 seconds.

```typescript
const rateLimitA = {
  name: 'wildcard',
  interval: 60,
  limit: 1,
};

export const getTxAllowList = (): Array<TransactionAllow> => {
  return [
    {
      fromList: ['*'],
      toList: ['0x9809d9d94b0b3380db38b1e1a06047a2964e0041'],
      rateLimit: rateLimitA,
    },
    {
      fromList: ['*'],
      toList: ['0x40bde52e6b80ae11f34c58c14e1e7fe1f9c834c4'],
      rateLimit: rateLimitA,
    },
  ];
};
```

### Set Addresses unlimited tx rate
Addresses set in `getDeployAllowList` and `getUnlimitedTxRateAddresses` are not rate-limited for transactions.

```typescript
// 0xaf395754eB6F542742784cE7702940C60465A46c and 0xaf395754eB6F542742784cE7702940C60465A46a are not rate-limited for transactions.
export const getDeployAllowList = (): Array<string> => {
  return ['0xaf395754eB6F542742784cE7702940C60465A46c'];
};
export const getUnlimitedTxRateAddresses = (): Array<string> => {
  return ['0xaf395754eB6F542742784cE7702940C60465A46a'];
};
```

You can set wildcard and exception_pattern
```typescript
// wild card
// Everyone are not rate-limited for transactions.
export const getDeployAllowList = (): Array<string> => {
  return [''];
};
export const getUnlimitedTxRateAddresses = (): Array<string> => {
  return ['*'];
};

// exception_pattern
// anyone cannot deploy contract.
// any address other than 0xaf395754eB6F542742784cE7702940C60465A46c are not rate-limited for transactions.
export const getDeployAllowList = (): Array<string> => {
  return [''];
};
export const getUnlimitedTxRateAddresses = (): Array<string> => {
  return ['!0xaf395754eB6F542742784cE7702940C60465A46c'];
};
```

## Reduce Metamask Access
By returning the cache of block number to the metamask, the number of accesses to the metamask can be reduced. This approach is only applicable to browsers built on Chromium (chrome, brave, and Microsoft Edge based on Chromium).

### Context
When the metamask is open in the browser, the metamask checks the block number with `eth_blockNumber` once every 5~6 seconds.

And metamask does the following when block number is updated.
- Execute `eth_getBalance` for all accounts registered in the metamask.
- Check the balance of all ERC20 accounts registered by the current account(ERC20.balanceOf).

Oasys Verse updates the block number each time a transaction is executed.
Therefore, each time a transaction is executed, there is access to update the balance of the metamask as explained above.

### How to Reduce
When there is a request for block number from metamask, the following actions should be taken
- If a block number cache exists, it is returned.
- If the cache of block number does not exist, request `eth_blockNumber` from verse to get the latest block number.

It will prevent a metamask balance update request from occurring each time the transaction updates the block number.

We create block number cache for each user using IP address and user-agent.

### Update block number Cache
The block number cache will be updated in the following cases.

- When `eth_blockNumber` is requested by metamask after the block numberCache has been deleted by the expiration
- The user block number cache is updated when a user executes a transaction by `eth_sendRawTransaction`.

In other words, if there is a change in your ERC20 balance due to a transaction you executed, you can see the change in your token balance immediately after the transaction is executed.

### Concern
Returning a block number cache to the metamask raises the following concerns.

While a block numberCache is being returned, it is impossible to confirm that another account's transaction has changed your account's token balance.

In other words, if the expiration of block numberCache is too long, you can only confirm that your account's token balance has changed once the cache_expire expires.

In addition, when a view function of a contract connected to Metamask (such as ERC20) is executed, the result is cached in Metamask.
If periodic block number checks do not progress the block number, the result of the cache is returned. Therefore, you cannot check the result of the latest view function.

### Setup
It can be enabled by setting block numberCache's expiration from the environment variable.
```bash
BLOCK_NUMBER_CACHE_EXPIRE_SEC=15 # 15 seconds
```