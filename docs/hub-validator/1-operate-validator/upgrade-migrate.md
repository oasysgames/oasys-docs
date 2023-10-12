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

### 3. Backing Up the Old Version of Geth
To back up your old version of geth, follow these steps:
```sh
GETH_PATH=/usr/local/bin # Adjust this based on your environment
VERSION=$($GETH_PATH/geth version | grep ...)
mv $GETH_PATH/geth $GETH_PATH/geth-$VERSION
```

### 4. Downloading and Installing the Latest Version
Download and unzip the latest version:
:::caution
Ensure you download the **latest version** suitable for your CPU architecture:
- For Intel or AMD CPUs: Download geth-version_number-linux-amd64.zip
- For ARM-based CPUs: Download geth-version_number-linux-arm64.zip
::::::
```sh
wget https://github.com/oasysgames/oasys-validator/releases/download/<latest version>/geth-<latest version>-linux-<amd64|arm64>.zip
unzip geth-<latest version>-linux-<amd64|arm64>.zip
```

Place the new version in the correct location and change its ownership:
```sh
sudo mv ./geth $GETH_PATH
sudo chown geth:geth $GETH_PATH/geth
```

### 5. Restart Geth
Restart Geth with:
```sh
$ sudo systemctl start geth
``` 

### 6. Verify Geth Status
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


## Migrating Validator to new Server
Follow these steps to migrate the validator node to a new server:

### 1. Stop old validator node
In the old validator node, run the following command to stop the geth service:

```shell
# In old validator node
systemctl stop geth
```

### 2. Setup new validator node
On the new validator node, execute `setup.sh` as part of the [Express setup](#express-setup).

:::info PASSPHRASE
When running the `setup.sh`, you will be prompted to enter the passphrase for the private key.

`Enter the passphrase for the private key`

This passphrase is the password specified to create the validator operator address in the old validator node.
:::

### 3. Copy old validator data
In the old validator node, Copy the old validator data to the new validator node:

```shell
# In old validator node
rsync -av /usr/lib/systemd/system/geth.service <NEW_VALIDATOR_NODE>:/usr/lib/systemd/system/geth.service # service file
rsync -av /home/geth/.ethereum <NEW_VALIDATOR_NODE>:/home/geth/.ethereum # geth data
```

### 4. Remove old validator data
In the old validator node, remove the old validator data:

```shell
# In old validator node
rm -rf /usr/lib/systemd/system/geth.service
```

### 5. Start new validator node
```shell
# In new validator node
systemctl daemon-reload
systemctl enable geth
systemctl start geth
```