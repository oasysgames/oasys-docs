# Bridge
Regarding the bridge, we can identify the following four types of bridges in the Oasys Ecosystem.

1. [Between Hub and Verse Bridge](/docs/verse-developer/bridge/hub-verse)
    - The Verse is the Rollup of the Hub Layer, so the first type of bridge is achieved using the Optimism method. Optimism supports the bridge as a default feature.
2. Between Verse and Verse Bridge
    - We plan to support this in the future. If there is strong demand or a concrete business opportunity, we can accelerate our discussions.
3. Between Hub and External Chain Bridge
    - Currently, we have a bridge to Ethereum created by [Celer](https://cbridge.celer.network/1/248/USDC). A few ERC20 tokens are supported, like USDT, USDC, EPL, MCHC, TCGC.
    - We plan to expand the supporting chains soon.
4. Between Verse and External Chain Bridge
    - There are no official supporting ways for this type of bridge, but each Verse builder can bridge external resources into their chain using three types of ordinary and simple schemas. These schemas are known as `Lock-and-Mint`, `Burn-and-Release`, and `Burn-and-Mint`. Please refer to [Celer's documentation](https://cbridge-docs.celer.network/nft-bridge/introduction). In most cases, these schemas should satisfy your needs.

