## Introduction

This is simple implementation of RSH using RPC (remote procedure call).
Communication is based on JSON-RPC standard and `node-json-rpc` npm packet.

## Instalation

```
npm i -g node-rpc-rsh
```

## How to use

Run server on host machine:

```
nrps 0.0.0.0
```

Run client on user machine and provide server ip address and command as arguments.

```
nrpc 192.168.1.100 ls
```

Passing arguments:

```
nrpc 192.168.1.100 ls -l
```

Piping input:

```
ls -l | nrpc 192.168.1.100 grep pac
```
