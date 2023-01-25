# Hub geth 

Geth is go ethereum, and Oasys is using a go ethereum based network on the Hub Layer. 
You can use it or perform checks through the command line. 

## Command-line Options

```shell
$ geth --help
```


```
NAME:
   geth - the go-ethereum command line interface

   Copyright 2013-2021 The go-ethereum Authors
```


```
USAGE:
   geth [options] [command] [command options] [arguments...]
   
VERSION:
   1.10.16-stable-20356e57
```


```
COMMANDS:
   account                            Manage accounts
   attach                             Start an interactive JavaScript environment (connect to node)
   console                            Start an interactive JavaScript environment
   db                                 Low level database operations
   dump                               Dump a specific block from storage
   dumpconfig                         Show configuration values
   dumpgenesis                        Dumps genesis block JSON configuration to stdout
   export                             Export blockchain into file
   export-preimages                   Export the preimage database into an RLP stream
   import                             Import a blockchain file
   import-preimages                   Import the preimage database from an RLP stream
   init                               Bootstrap and initialize a new genesis block
   js                                 Execute the specified JavaScript files
   license                            Display license information
   makecache                          Generate ethash verification cache (for testing)
   makedag                            Generate ethash mining DAG (for testing)
   removedb                           Remove blockchain and state databases
   show-deprecated-flags              Show flags that have been deprecated
   snapshot                           A set of commands based on the snapshot
   version                            Print version numbers
   version-check                      Checks (online) whether the current version suffers from any known security vulnerabilities
   wallet                             Manage Oasys presale wallets
   help, h                            Shows a list of commands or help for one command
```  

## Oasys Geth Options
```
  --config value                      TOML configuration file
  --datadir value                     Data directory for the databases and keystore (default: "~/.ethereum")
  --datadir.ancient value             Data directory for ancient chain segments (default = inside chaindata)
  --datadir.minfreedisk value         Minimum free disk space in MB, once reached triggers auto shut down (default = --cache.gc converted to MB, 0 = disabled)
  --keystore value                    Directory for the keystore (default = inside the datadir)
  --pcscdpath value                   Path to the smartcard daemon (pcscd) socket file
  --networkid value                   Explicitly set network id (integer)(For testnets: use --ropsten, --rinkeby, --goerli instead) (default: 1)
  --mainnet                           Oasys mainnet
  --syncmode value                    Blockchain sync mode ("snap", "full" or "light") (default: snap)
  --exitwhensynced                    Exits after block synchronisation completes
  --gcmode value                      Blockchain garbage collection mode ("full", "archive") (default: "full")
  --txlookuplimit value               Number of recent blocks to maintain transactions index for (default = about one year, 0 = entire chain) (default: 2350000)
  --ethstats value                    Reporting URL of a ethstats service (nodename:secret@host:port)
  --identity value                    Custom node name
  --lightkdf                          Reduce key-derivation RAM & CPU usage at some expense of KDF strength
  --whitelist value                   Comma separated block number-to-hash mappings to enforce (<number>=<hash>)
```  

## Performance Tuning Options
```  
  --cache value                       Megabytes of memory allocated to internal caching (default = 4096 mainnet full node, 128 light mode) (default: 1024)
  --cache.database value              Percentage of cache memory allowance to use for database io (default: 50)
  --cache.trie value                  Percentage of cache memory allowance to use for trie caching (default = 15% full mode, 30% archive mode) (default: 15)
  --cache.trie.journal value          Disk journal directory for trie cache to survive node restarts (default: "triecache")
  --cache.trie.rejournal value        Time interval to regenerate the trie cache journal (default: 1h0m0s)
  --cache.gc value                    Percentage of cache memory allowance to use for trie pruning (default = 25% full mode, 0% archive mode) (default: 25)
  --cache.snapshot value              Percentage of cache memory allowance to use for snapshot caching (default = 10% full mode, 20% archive mode) (default: 10)
  --cache.noprefetch                  Disable heuristic state prefetch during block import (less CPU and disk IO, more time waiting for data)
  --cache.preimages                   Enable recording the SHA3/keccak preimages of trie keys
```

## Account Options
```
  --unlock value                      Comma separated list of accounts to unlock
  --password value                    Password file to use for non-interactive password input
  --signer value                      External signer (url or path to ipc file)
  --allow-insecure-unlock             Allow insecure account unlocking when account-related RPCs are exposed by http
```

## Api and Console Options
```
  --ipcdisable                        Disable the IPC-RPC server
  --ipcpath value                     Filename for IPC socket/pipe within the datadir (explicit paths escape it)
  --http                              Enable the HTTP-RPC server
  --http.addr value                   HTTP-RPC server listening interface (default: "localhost")
  --http.port value                   HTTP-RPC server listening port (default: 8545)
  --http.api value                    API's offered over the HTTP-RPC interface
  --http.rpcprefix value              HTTP path path prefix on which JSON-RPC is served. Use '/' to serve on all paths.
  --http.corsdomain value             Comma separated list of domains from which to accept cross origin requests (browser enforced)
  --http.vhosts value                 Comma separated list of virtual hostnames from which to accept requests (server enforced). Accepts '*' wildcard. (default: "localhost")
  --ws                                Enable the WS-RPC server
  --ws.addr value                     WS-RPC server listening interface (default: "localhost")
  --ws.port value                     WS-RPC server listening port (default: 8546)
  --ws.api value                      API's offered over the WS-RPC interface
  --ws.rpcprefix value                HTTP path prefix on which JSON-RPC is served. Use '/' to serve on all paths.
  --ws.origins value                  Origins from which to accept websockets requests
  --graphql                           Enable GraphQL on the HTTP-RPC server. Note that GraphQL can only be started if an HTTP server is started as well.
  --graphql.corsdomain value          Comma separated list of domains from which to accept cross origin requests (browser enforced)
  --graphql.vhosts value              Comma separated list of virtual hostnames from which to accept requests (server enforced). Accepts '*' wildcard. (default: "localhost")
  --rpc.gascap value                  Sets a cap on gas that can be used in eth_call/estimateGas (0=infinite) (default: 50000000)
  --rpc.evmtimeout value              Sets a timeout used for eth_call (0=infinite) (default: 5s)
  --rpc.txfeecap value                Sets a cap on transaction fee (in ether) that can be sent via the RPC APIs (0 = no cap) (default: 1)
  --rpc.allow-unprotected-txs         Allow for unprotected (non EIP155 signed) transactions to be submitted via RPC
  --jspath loadScript                 JavaScript root path for loadScript (default: ".")
  --exec value                        Execute JavaScript statement
  --preload value                     Comma separated list of JavaScript files to preload into the console
```  

## Networking Options
```
  --bootnodes value                   Comma separated enode URLs for P2P discovery bootstrap
  --discovery.dns value               Sets DNS discovery entry points (use "" to disable DNS)
  --port value                        Network listening port (default: 30303)
  --maxpeers value                    Maximum number of network peers (network disabled if set to 0) (default: 50)
  --maxpendpeers value                Maximum number of pending connection attempts (defaults used if set to 0) (default: 0)
  --nat value                         NAT port mapping mechanism (any|none|upnp|pmp|extip:<IP>) (default: "any")
  --nodiscover                        Disables the peer discovery mechanism (manual peer addition)
  --v5disc                            Enables the experimental RLPx V5 (Topic Discovery) mechanism
  --netrestrict value                 Restricts network communication to the given IP networks (CIDR masks)
  --nodekey value                     P2P node key file
  --nodekeyhex value                  P2P node key as hex (for testing)
```  

## Logging and Debugging Options
```
  --fakepow                           Disables proof-of-work verification
  --nocompaction                      Disables db compaction after import
  --verbosity value                   Logging verbosity: 0=silent, 1=error, 2=warn, 3=info, 4=debug, 5=detail (default: 3)
  --vmodule value                     Per-module verbosity: comma-separated list of <pattern>=<level> (e.g. eth/*=5,p2p=4)
  --log.json                          Format logs with JSON
  --log.backtrace value               Request a stack trace at a specific logging statement (e.g. "block.go:271")
  --log.debug                         Prepends log messages with call-site location (file and line number)
  --pprof                             Enable the pprof HTTP server
  --pprof.addr value                  pprof HTTP server listening interface (default: "127.0.0.1")
  --pprof.port value                  pprof HTTP server listening port (default: 6060)
  --pprof.memprofilerate value        Turn on memory profiling with the given rate (default: 524288)
  --pprof.blockprofilerate value      Turn on block profiling with the given rate (default: 0)
  --pprof.cpuprofile value            Write CPU profile to the given file
  --trace value                       Write execution trace to the given file
```  

## Metrics and Stats Options
```
  --metrics                              Enable metrics collection and reporting
  --metrics.expensive                    Enable expensive metrics collection and reporting
  --metrics.addr value                   Enable stand-alone metrics HTTP server listening interface (default: "127.0.0.1")
  --metrics.port value                   Metrics HTTP server listening port (default: 6060)
  --metrics.influxdb                     Enable metrics export/push to an external InfluxDB database
  --metrics.influxdb.endpoint value      InfluxDB API endpoint to report metrics to (default: "http://localhost:8086")
  --metrics.influxdb.database value      InfluxDB database name to push reported metrics to (default: "geth")
  --metrics.influxdb.username value      Username to authorize access to the database (default: "test")
  --metrics.influxdb.password value      Password to authorize access to the database (default: "test")
  --metrics.influxdb.tags value          Comma-separated InfluxDB tags (key/values) attached to all measurements (default: "host=localhost")
  --metrics.influxdbv2                   Enable metrics export/push to an external InfluxDB v2 database
  --metrics.influxdb.token value         Token to authorize access to the database (v2 only) (default: "test")
  --metrics.influxdb.bucket value        InfluxDB bucket name to push reported metrics to (v2 only) (default: "geth")
  --metrics.influxdb.organization value  InfluxDB organization name (v2 only) (default: "geth")
```  

## Aliased (deprecated) Options
```
  --nousb                             Disables monitoring for and managing USB hardware wallets (deprecated)
```

## Misc Options
```
  --snapshot                                Enables snapshot-database mode (default = enable)
  --bloomfilter.size value                  Megabytes of memory allocated to bloom-filter for pruning (default: 2048)
  --help, -h                                show help
  --override.arrowglacier value             Manually specify Arrow Glacier fork-block, overriding the bundled setting (default: 0)
  --override.terminaltotaldifficulty value  Manually specify TerminalTotalDifficulty, overriding the bundled setting (default: 0)
```


COPYRIGHT:
   Copyright 2013-2022 The go-ethereum Authors

