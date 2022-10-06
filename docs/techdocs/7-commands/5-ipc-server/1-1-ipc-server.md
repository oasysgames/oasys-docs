---
---

# Geth IPC-Server

IPC is normally available for use in local environments where the node and the console exist on the same machine. Geth creates a pipe in the computers local file system (at `ipcpath`) that configures a connection between node and console. The `geth.ipc` file can also be used by other processes on the same machine to interact with Geth.

On UNIX-based systems (Linux, OSX) the IPC is a UNIX domain socket. On Windows IPC is provided using named pipes. The IPC server is enabled by default and has access to all JSON-RPC namespaces.

HTTP based JSON-RPC API options - Ipc:
- `-ipcapi` : API's offered over the IPC-RPC interface (default: `admin,debug,eth,miner,net,personal,txpool,web3`)
- `-ipcpath` : Filename for IPC socket/pipe within the datadir (explicit paths escape it)
- `-ipcdiable` : Disable the IPC-RPC server

The listening socket is placed into the data directory by default. On Linux and macOS, the default location of the geth socket is

```
~/.ethereum/geth.ipc
```

On Windows, IPC is provided via named pipes. The default location of the geth pipe is:

```
\\.\pipe\geth.ipc
```

The location of the socket can be customized using the `--ipcpath` flag. IPC can be disabled using the `--ipcdisable` flag.




