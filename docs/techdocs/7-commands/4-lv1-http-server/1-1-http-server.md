---
---

# Geth Http-server

[HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP) is a unidirectional transport protocol that connects a client and server. The client sends a request to the server, and the server returns a response back to the client. An HTTP connection is closed after the response for a given request is sent.

HTTP is supported in every browser as well as almost all programming toolchains. Due to its ubiquity it has become the most widely used transport for interacting with Geth. To start a HTTP server in Geth, include the `--http` flag:

HTTP based JSON-RPC API options - Http:
- `--http` : Enable the HTTP-RPC server
- `--http.addr` : HTTP-RPC server listening interface (default: `localhost`)
- `--http.port` : HTTP-RPC server listening port (default: `8545`)
- `--http.api` : API's offered over the HTTP-RPC interface (default: `eth,net,web3`)
- `--http.corsdomain` :  Comma separated list of domains from which to accept cross origin requests (browser enforced)

```
geth --http
```

If no other commands are provided, Geth falls back to its default behaviour of accepting connections from the local loopback interface (127.0.0.1). The default listening port is 8545. The ip address and listening port can be customized using the `--http.addr` and `--http.port` flags:

```
geth --http -http.port 3334
```

Not all of the JSON-RPC method namespaces are enabled for HTTP requests by default. Instead, they have to be whitelisted explicitly when Geth is started. Calling non-whitelisted RPC namespaces returns an RPC error with code `-32602`.

The default whitelist allows access to the `eth`, `net` and `web3` namespaces. To enable access to other APIs like account management (`personal`) and debugging (`debug`), they must be configured using the `--http.api` flag. Enabling these APIs over HTTP is not recommended because access to these methods increases the attack surface.

```
geth --http -http.api personal,eth,net,web3
```

Since the HTTP server is reachable from any local application, additional protection is built into the server to prevent misuse of the API from web pages. To enable access to the API from a web page (for example to use the online IDE, [Remix](https://remix.ethereum.org/#optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.7+commit.e28d00a7.js)), the server needs to be configured to accept Cross-Origin requests. This is achieved using the `--http.corsdomain` flag.

```
geth --http --http.corsdomain https://remix.ethereum.org
```

The `--http.corsdomain` command also acceptsd wildcards that enable access to the RPC from any origin:

```
--http.corsdomain '*'
```
