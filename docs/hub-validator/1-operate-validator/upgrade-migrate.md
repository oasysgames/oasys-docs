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
```bash
# check your geth version
$ BIN_DIR=/usr/local/bin # set your binary directory has geth
$ VERSION=$(geth version | awk '/Version:/ && !/Go Version:/ {print $2}')

# backup your geth binary
mv $BIN_DIR/geth $BIN_DIR/geth-$VERSION
```

### 4. Downloading and Installing the Latest Version
Download and unzip the latest version:
:::caution
Ensure you download the **latest version** suitable for your CPU architecture:
- For Intel or AMD CPUs: Download geth-version_number-linux-amd64.zip
- For ARM-based CPUs: Download geth-version_number-linux-arm64.zip
::::::
```bash
$ wget https://github.com/oasysgames/oasys-validator/releases/download/<"LATEST_VERSION">/geth-<"LATEST_VERSION">-linux-<"amd64|arm64">.zip
$ unzip geth-<"LATEST_VERSION">-linux-<"amd64|arm64">.zip
```

Place the new version in the correct location and change its ownership:
```bash
$ sudo mv ./geth $BIN_DIR
$ sudo chown <"SERVICE_USER">:<"SERVICE_USER"> $BIN_DIR/geth # default SERVICE_USER is geth
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
$ sudo -u geth geth attach --exec eth.syncing ipc:/home/geth/.ethereum/geth.ipc
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

### 2. Copy old validator data
In the old validator node, Copy the old validator data to the new validator node:

```shell
# In old validator node
rsync -av /usr/lib/systemd/system/geth.service <NEW_VALIDATOR_NODE>:/usr/lib/systemd/system/geth.service # service file
rsync -av /home/geth/.ethereum/ <NEW_VALIDATOR_NODE>:/home/geth/.ethereum # geth data
```

Please ensure that the files are being correctly synchronized from the old validator node to the new validator node.

### 3. Setup new validator node
On the new validator node, execute `setup.sh` as part of the [Express setup](/docs/hub-validator/operate-validator/build-validator-node#express-setup).

:::info PASSPHRASE
When running the `setup.sh`, you will be prompted to enter the passphrase for the private key.

`Enter the passphrase for the private key`

This passphrase is the password specified to create the validator operator address in the old validator node.
:::

:::info SKIP PROCESSING STEPS
If synchronization is successful when `Copy old validator data` is performed, then `Create a genesis block`, `Create a private key`, and `Create a systemd unit` steps will be skipped.
:::

Execute the following command on both the old and new validator nodes to verify that the keystore account information matches.

```shell
sudo -u geth geth account list
```

### 4. Start new validator node
Start the Geth service on the new validator node.

```shell
# In new validator node
systemctl daemon-reload
systemctl enable geth
systemctl start geth
```

Please check the block synchronization status using [this method](https://docs.oasys.games/docs/hub-validator/operate-validator/faq#q-how-do-i-verify-the-block-synchronization-status).

### 5. Remove old validator data
Once you have confirmed that the new validator node is operating correctly, in the old validator node, remove the old validator data:

```shell
# In old validator node
rm /usr/lib/systemd/system/geth.service
```

:::info CONCURRENT OPERATION OF THE OLD VALIDATOR NODE AND THE NEW VALIDATOR NODE
Stopping the validator node will result in the cessation of rewards, so we recommend minimizing the downtime as much as possible.  
To that end, it is possible to run both the old validator node and the new validator node concurrently.  
However, please ensure that only one of the nodes generates blocks during this time. Blocks will be generated if the geth option `-–mine` is included.  
Ultimately, please ensure that the `–-mine` option is only enabled on the new validator node.
:::
