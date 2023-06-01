# Minimum Configuration
 - you will have done this configuration within 1 hour.
 - make sure you have done [the preparations](/docs/hub-validator/run-with-AWS/3-2-preparation).

## Node configuration 

[Check out Validator client Installation](/docs/hub-validator/1-operate-validator/1-2-build-validator-node)

## Architecture diagram 
 ![diagram](/img/docs/techdocs/validator/AWSDiagram.png)

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
