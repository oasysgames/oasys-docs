# Usecase
 - this section will be done in 1 hours
## region
 Anywhere you like. Decentralized is our top priority. 
 
## Network 
 - Single-AZ, multi-AZ or multi-region

## Server Spec 
Check out [minumum spec](/docs/hub-validator/operate-validator/1-1-hd-requirement), `m5.xlarge` or higher instance is recommended. 
## Port configuration 
- TCP/UDP port 30303 allowed (for P2P between nodes) 
- TCP port 8545 allowed (for RPC) 
- TCP/UDP port 4101 allowed (for Instant Verifier) 
- TCP/UDP port 30301 allowed (for Bootnodes)
## Architecture diagram 
 ![diagram](/img/docs/techdocs/validator/AWSDiagram.png)
## Setting up Account in AWS
warning never use AWS root account ref. [AWS IAM UserGuide](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html)

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

* we do not store or track customer data for validator client
 
