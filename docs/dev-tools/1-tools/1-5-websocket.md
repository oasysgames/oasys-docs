# Geth Websocket
Websocket is a bidirectional transport protocol. A Websocket connection is maintained by client and server until it is explicitly terminated by one. Most modern browsers support Websocket which means it has good tooling.

Because Websocket is bidirectional, servers can push events to clients. That makes Websocket a good choice for use-cases involving [event subscription](https://geth.ethereum.org/docs/rpc/pubsub). Another benefit of Websocket is that after the handshake procedure, the overhead of individual messages is low, making it good for sending high number of requests.

Configuration of the WebSocket endpoint in Geth follows the same pattern as the HTTP transport. WebSocket access can be enabled using the `--ws` flag. If no additional information is provided, Geth falls back to its default behaviour which is to establish the Websocket on port 8546. The `--ws.addr`, `--ws.port` and `--ws.api` flags can be used to customize settings for the WebSocket server. For example, to start Geth with a Websocket connection for RPC using the custom port 3334 and whitelisting the `eth`, `net` and `web3` namespaces:

HTTP based JSON-RPC API options - Websocket:
- `--ws` : Enable the WS-RPC server
- `--ws.addr` : WS-RPC server listening interface (default: `localhost`)
- `--ws.port' : WS-RPC server listening port (default: `8546`)
- `--ws.api` : API's offered over the WS-RPC interface (default: `eth,net,web3`)
- `--ws.origins` : Origins from which to accept WebSocket requests

```
geth --ws --ws.port 3334 --ws.api eth,net,web3
```

Cross-Origin request protection also applies to the WebSocket server. The `--ws.origins` flag can be used to allow access to the server from web pages:

```
geth --ws --ws.origins http://myapp.example.com
```
As with `--http.corsdomain`, using the wildcard `--ws.origins '*'` allows access from any origin.

 
>Note: By default, account unlocking is forbidden when HTTP or Websocket access is enabled (i.e. by passing --http or ws flag). This is because an attacker that manages to access the node via the externally-exposed HTTP/WS port can then control the unlocked account. It is possible to force account unlock by including the --allow-insecure-unlock flag but this is unsafe and not recommended except for expert users that completely understand how it can be used safely. This is not a hypothetical risk: there are bots that continually scan for http-enabled Ethereum nodes to attack.
