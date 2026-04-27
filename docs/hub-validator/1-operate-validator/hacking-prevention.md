# Hacking Prevention

## Off-chain Strategy

To protect the chain from fraudulent behavior—such as malicious fund extraction from exchanges, bridges, or other critical points, validators perform pre-checks on transactions before including them in a block. Suspicious or high-risk transactions are filtered out and not proposed for inclusion.

To keep up with rapidly evolving attack patterns, fraud detection logic is decoupled from the validator core and implemented as a Go plugin. This allows the protection logic to be updated and reloaded dynamically without requiring validator software upgrades or manual intervention. Validators automatically use the latest detection rules, ensuring faster response to new threats.

## On-chain Strategy

Off-chain filtering alone is not sufficient, since a fraudulent transaction may still satisfy validation rules and be accepted on-chain.

To address this, we enforce additional on-chain protections. Validators can collectively agree to reject or block specific suspicious transactions. In emergency situations, validators can temporarily pause most transaction processing, allowing only L2 rollup-related transactions.
