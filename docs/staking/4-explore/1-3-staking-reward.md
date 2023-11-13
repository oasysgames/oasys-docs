# Commision Reward Export

In the Oasys chain, "Commission Reward" is a reward system 
designed to encourage user participation in staking and contribute 
to the stabilization of the network.
Users can export data related to specific addresses involved in Commission Reward. 
This feature simplifies the management and analysis of staking rewards, 
enabling efficient tax operations.

## How to Use
Here is a brief overview. For more detailed information, 
please refer to the following link.
https://github.com/oasysgames/oasfi/blob/main/doc/user_guide.md#export-commission-reward-script

#### macOS:

```bash
./oasfi-macos  export-commission-reward address -c=chain_name --from_data=2023-08-16T10:00:00 --to_data=2023-10-16T10:00:00

# example
# ./oasfi-macos  export-commission-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c -c=hub_mainnet 
```

#### windows:

```bash
./oasfi-win.exe  export-commission-reward address -c=chain_name --from_data=2023-08-16T10:00:00 --to_data=2023-10-16T10:00:00

# example
# ./oasfi-win.exe  export-commission-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c -c=hub_mainnet 
```

#### linux:

```bash
./oasfi-linux  export-commission-reward address -c=chain_name --from_data=2023-08-16T10:00:00 --to_data=2023-10-16T10:00:00

# example
# ./oasfi-linux  export-commission-reward 0x272d6bd040c2b8454f4f6f43115758fbe318ee2c -c=hub_mainnet 
```

