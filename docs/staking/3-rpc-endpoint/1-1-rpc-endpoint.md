# RPC Endpoints

## Mainnet
<table>
  <thead>
    <tr><th colspan="4"></th></tr>
  </thead>
  <tbody>
    <tr><td colspan="3">ChainID</td><td>248</td></tr>
    <tr><td colspan="3">Currency Symbol</td><td>OAS</td></tr>
    <tr><td rowspan="4">RPC</td><td>BlockPi</td><td>HTTPS</td><td>https://oasys.blockpi.network/v1/rpc/public</td></tr>
    <tr><td rowspan="2">Oasys</td><td>HTTPS</td><td>https://rpc.mainnet.oasys.games</td></tr>
    <tr><td>Websocket</td><td>wss://ws.mainnet.oasys.games/</td></tr>
    <tr><td>Grove</td><td>HTTPS</td><td>https://oasys.rpc.grove.city/v1/167fa7a3</td></tr>
    <tr><td colspan="3">Explorer</td><td><a href="https://explorer.oasys.games/" target="_blank" rel="noopener noreferrer">https://explorer.oasys.games/</a></td></tr>
  </tbody>
</table>

:::note About eth_newFilter Usage
For those using `eth_newFilter` on the Oasys HTTP endpoint, please switch to using WebSocket. Since the Oasys RPC endpoint is load-balanced, there is no guarantee of accessing the same node each time. If you encounter the error `filter not found` when you call `eth_getFilterChanges`, it means that your request is being processed by a different node than the one where the filter ID was generated. The testnet is the same.
:::

## Testnet (Hub Layer)
<table>
  <thead>
    <tr><th colspan="3"></th></tr>
  </thead>
  <tbody>
    <tr><td colspan="2">ChainID</td><td>9372</td></tr>
    <tr><td colspan="2">Currency Symbol</td><td>OAS</td></tr>
    <tr><td rowspan="2">RPC</td><td>HTTPS</td><td>https://rpc.testnet.oasys.games</td></tr>
    <tr><td>Websocket</td><td>wss://ws.testnet.oasys.games/</td></tr>
    <tr><td colspan="2">Explorer</td><td><a href="https://explorer.testnet.oasys.games/" target="_blank" rel="noopener noreferrer">https://explorer.testnet.oasys.games/</a></td></tr>
    <tr><td colspan="2">Faucet</td><td><a href="https://faucet.testnet.oasys.games/" target="_blank" rel="noopener noreferrer">https://faucet.testnet.oasys.games/</a></td></tr>
  </tbody>
</table>

:::caution Syncing to Testnet
If you're planning to run a testnet node, please use our provided [snapshot](/docs/hub-validator/operate-validator/upgrade-migrate#applying-the-snapshot-to-a-testnet-node) for setup. Due to a technical issue (an invalid block accidentally created in the past), the current testnet is unable to fully sync with other full nodes.
:::

## SAND Verse (Verse Layer)
Please refer to [SAND Verse](/docs/verse-developer/sandverse) to learn about SAND verse.

<table>
  <thead>
    <tr><th colspan="3"></th></tr>
  </thead>
  <tbody>
    <tr><td colspan="2">ChainID</td><td>20197</td></tr>
    <tr><td colspan="2">Currency Symbol</td><td>OAS</td></tr>
    <tr><td rowspan="2">RPC</td><td>HTTPS</td><td>https://rpc.sandverse.oasys.games</td></tr>
    <tr><td>Websocket</td><td>wss://ws.sandverse.oasys.games</td></tr>
    <tr><td colspan="2">Explorer</td><td><a href="https://scan.sandverse.oasys.games/" target="_blank" rel="noopener noreferrer">https://scan.sandverse.oasys.games/</a></td></tr>
    <tr><td colspan="2">Faucet</td><td><a href="https://faucet.sandverse.oasys.games/" target="_blank" rel="noopener noreferrer">https://faucet.sandverse.oasys.games/</a></td></tr>
  </tbody>
</table>
