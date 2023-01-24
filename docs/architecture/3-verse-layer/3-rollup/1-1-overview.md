# Original Optimistic Rollup

## Scalability 

![rollup](/img/docs/techdocs/verse/rollup.png)

Original Optimistic Rollup can scale Ethereum transactions to a high speed. 

## OVM 
<!-- TRANSLATION: Not sure what 'It's EVM contains EVM' means -->
Optimism Virtual Machine is a Scalability solution on Ethereum. It's EVM contains EVM.

OVM programs define assumptions which, based on local information, determines what Ethereum states are possible. This can be expressed as a function `satisfies_assumptions(assumptions, ethereum_state, local_information) => true/false`. If `satisfies_assumptions(...)` returns true then the `ethereum_state` is possible based on these particular assumptions, and our `local_information`.

In many L2 solutions, this takes the form of a “dispute liveness assumption.” For example, participants in a channel assume that they will dispute any malicious withdrawal. So, we return false for any Ethereum state which contains a malicious, undisputed withdrawal.



Sources: [Optimism Medium](https://medium.com/plasma-group/introducing-the-ovm-db253287af50), [Optimism Medium](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
