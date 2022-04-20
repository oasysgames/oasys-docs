---
sidebar_position: 2
sidebar_label: Verse-Layer node build (Optimism)
---

# Verse-Layer node build (Optimism)
## Server Environment

### Recommended Environment
|         |                            |
|---------|----------------------------|
| OS      | Linux                      |
| CPU     | 2 Core / 1.8GHz / x86_64   |
| RAM     | 8GB DISK： 100GB SSD       |
| Network | 100Mbps                    |

### Firewall Settings
- TCP port 8545 allowed (for RPC)

### Validator Build Steps
1. Install Docker Engine and docker-compose command. The procedure varies depending on your distribution.
2. Clone the Optimism repository (coming soon) provided by the Oasys Foundation.
3. Create a secret key to be used by each Optimism component. A minimum of two secret keys is required, but may be further subdivided in some cases.

```
$ docker-compose run --rm wallet
```

Secret keys are stored in `data/wallet/keys.txt`.

```
- You can share your public address with anyone. Others need it to interact with you.
- You must NEVER share the secret key with anyone! The key controls access to your funds!
- You must BACKUP your key file! Without the key, it's impossible to access account funds!

---- deployer ----
Address: 0xabababababababababababababababababababab
key:     0xabababababababababababababababababababababababababababababababab

---- proposer ----
Address: 0xcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcd
key:     0xcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcd
```
**Important: Keep the secret key in a safe place.**
4. Create an .env file using the template as a reference.
```
$ cp .env.sample.mainnet .env
```
You can modify the following.
```
# Your verse chain id
L2_CHAIN_ID

# Address and private key of "deployer"
DEPLOYER_ADDRESS
DEPLOYER_KEY

# Address and private key of "proposer"
PROPOSER_ADDRESS
PROPOSER_KEY
```
5. Deploy the Optimism system contract to the Oasys chain. In order to deploy, at least 1 OAS must be deposited in the deployer account you have just created. 
```
$ docker-compose run --rm deployer /deploy.sh
```
The following error message will appear multiple times, but can be safely ignored.
```
Error when verifying bytecode on etherscan:
HardhatError: HH303: Unrecognized task verify:verify
```
Open another terminal when the following message appears.
```
    (3) Transfer ownership of the AddressManager located at (0xC44Dd7D4650Eaa3B41446262c0823d22aD7a0B02)
        to the AddressDictator contract located at the following address:

        TRANSFER OWNERSHIP TO THE FOLLOWING ADDRESS ONLY:
        >>>>> (0x231fDB70116469Abe60564FB2459d5B09D018f0b) <<<<<

    (4) Wait for the deploy process to continue.
```
Execute the following command in a separate terminal. 
```
$ docker-compose run --rm deployer -c 'npx hardhat transfer-owner-01 --network oasys'
```
The following message appears in the original terminal 
```
Ownership successfully transferred. Invoking setAddresses...
```
When the following message appears, open another terminal again. (similar to the previous message but slightly different)
```
    (3) Transfer ownership of the L1ChugSplashProxy located at (0xC393C0F363c1565236e68C4373C244Dd995cB99a)
        to the ChugSplashDictator contract located at the following address:

        TRANSFER OWNERSHIP TO THE FOLLOWING ADDRESS ONLY:
        >>>>> (0x2f32109c72294079e2ccA3fcaB17c8a4E76f2043) <<<<<

    (4) Wait for the deploy process to continue.
```
The following message appears in the original terminal.
```
$ docker-compose run --rm deployer -c 'npx hardhat transfer-owner-02 --network oasys'
```
The following message appears in the original terminal.
```
Ownership successfully transferred. Invoking doActions...
```
Deployment of the contract is complete when the following message appears.
```
✓ Not changing owner of Lib_AddressManager because it's already correctly set
```
6. Generate a genesis block configuration file (genesis.json) for Verse.
```
$ docker-compose run --rm deployer /genesis.sh
```
7. Start Optimism.
```
$ docker-compose up -d \
  data-transport-layer \
  l2geth \
  verifier \
  batch-submitter \
  message-relayer
```

