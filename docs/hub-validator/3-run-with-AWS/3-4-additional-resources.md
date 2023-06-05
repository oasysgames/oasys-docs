# Additional Resources

## List of public resources

- [Block explorer](https://scan.oasys.games/)
- [PoS client on Linux](/docs/hub-validator/operate-validator/1-3-join-validator#join-validator-to-pos-cli)

## Where key stored

Oasys have three validator related accounts.
Validator owner / operator is related with validation, Validator operator seals the block. 

| Role Type          | Location of Private key              |
|--------------------|--------------------------------------|
| Validator owner    | Can use any method that supports EVM |
| Validator operator | Hard Disk of Node operating PC       |
| Delegator          | Can use any method that supports EVM |

For details, please check [validator account](docs/architecture/hub-layer/consensus/dpos/1-3-validator-account)

* we do not store or track customer data for validator client.

## If you want to build multiple nodes

To avoid "double signing", Never activate 2 or more operators. To avoid this in setting, delete `--mine` option from systemd unit file.
see [here](https://github.com/oasysgames/oasys-validator/blob/9361854f410431c0e485560e46269fa3a25b3a85/.github/setup_template.sh#L184)