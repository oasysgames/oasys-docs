# Upgrade / Resync / Migrate Node

## Node Update Procedure

### 1. Halting Geth
First, stop the Geth process with the following command:
```sh
$ systemctl stop geth
```

### 2. Secure Your Keystore
Navigate to the default installation directory, `/home/geth/.ethereum/`. Confirm that your secret key is in `/home/geth/.ethereum/keystore/` and that `password.txt` is in `/home/geth/.ethereum/`. Before moving on, **back up both the secret key and password.txt**.

Secret key file Example:
```sh
/home/geth/.ethereum/keystore/UTC--2022-03-14T12-11-06.835917424Z--abcdabcdabcdabcdabcdabcdabcdabcdabcdabcd
```

<!-- After that, you can try using `journalctl` to check the update logs:
```sh
$ journalctl -u geth -n 1000 --no-pager
```
This command allows you to view the update logs. -->

### 3. Download the Latest Release
Download from Oasys Validator GitHub [Releases](https://github.com/oasysgames/oasys-validator/releases). For setup details, consult the `setup.sh` code in the GitHub repository.

:::caution
Ensure you download the **latest version** suitable for your CPU architecture:
- For Intel or AMD CPUs: Download geth-version_number-linux-amd64.zip
- For ARM-based CPUs: Download geth-version_number-linux-arm64.zip
::::::

### 4. Restart Geth
Restart Geth with:
```sh
$ sudo systemctl start geth
``` 

### 5. Verify Geth Status
Check Geth's status with:
```sh
$ sudo systemctl status geth
``` 
To confirm the upgrade, refer to journalctl and look for the line indicating the new version:
```sh
INFO [11-02|11:16:11.821] Starting peer-to-peer node   instance=Geth/v1.0.1-54aae939/linux-amd64/go1.17.8
```
Or use geth -h to display version info:
```sh
$ geth -h 
```

### Troubleshooting
If you encounter issues, please confirm the Geth's syncing status:
``` sh
$ sudo -u geth geth attach ipc:/home/geth/.ethereum/geth.ipc --exec eth.syncing
``` 
The output should be `false`. If it displays `true`, proceed to the Resync Nodes section below for troubleshooting steps.

## Resyncing Nodes

### 1. Halt Geth
First, stop the Geth service with this command:
```sh
$ systemctl stop geth
```

### 2. Relocate Sync Data
Move the existing sync data from `/home/geth/.ethereum/geth` to a backup location:
```sh
$ mv /home/geth/.ethereum/geth /home/geth/.ethereum/geth-backup
```

### 3. Initialize Genesis Block
Download the [latest](https://github.com/oasysgames/oasys-validator/releases/) `genesis.json` file from GitHub and initialize the genesis block with:
```sh
$ sudo geth init genesis/mainnet.json
```

### 4. Restart Geth
Restart the Geth service using:
```sh
$ systemctl start geth
```
By following these steps, you should be able to successfully resync your node.


## Migrating Validator to a New Server
To migrate your validator node to a new server, follow the steps below:

### 1. Halt Old Validator Node
On the existing validator node, execute the following command to stop the Geth service:
```shell
# On the old validator node
$ sudo systemctl stop geth
```

### 2. Remove old validator service
In the old validator node, remove the old validator service:

```shell
# In old validator node
$ rm -rf /usr/lib/systemd/system/geth.service
```

### 3. Setup new validator node
On the new validator node, execute `setup.sh` as part of the [Express setup](#express-setup).

:::info PASSPHRASE
When running the `setup.sh`, you will be prompted to enter the passphrase for the private key.

`Enter the passphrase for the private key`

This passphrase is the password specified to create the validator operator address in the old validator node.
:::

### 4. Copy old validator data
In the old validator node, Copy the old validator data to the new validator node:

```shell
# In old validator node
$ rsync -av /home/geth/.ethereum <NEW_VALIDATOR_NODE>:/home/geth/.ethereum
```

### 5. Set old validator operator address as miner
On the new validator node, modify the validator service to use the old validator operator address for the `--miner.etherbase` option:

```shell
# In new validator node

# check the old validator operator address
$ cat /home/geth/.ethereum/wallet.txt

# modify the new validator service
$ vim /usr/lib/systemd/system/geth.service
```

Set the old validator operator address to `<OLD_VALIDATOR_OPERATOR_ADDRESS>`:
```shell
Environment=ETHERBASE=<OLD_VALIDATOR_OPERATOR_ADDRESS>
```

### 6. Start new validator node
```shell
# In new validator node
$ sudo systemctl start geth
```

### 7. Remove old validator data
On the old validator node, remove the old validator data:

```shell
# On old validator node
$ rm -rf /home/geth/.ethereum
```
