---
sidebar_position: 3
sidebar_label: Commands
---

# Wallet Commands

### Start `Geth` to run commands.

```
Geth
```
###  Wallet Balance Check

You can run `eth.getBalance` to check balance in address, please put your own address.

```
$eth.getBalance ("Wallet_Address")
```

And Output will be, like this if having 5.1 OAS

```
5100000000000000000
```

###  Transfering Token

Check `Amount_Want_To_Send` having 18 digits below 0. 

```
$eth.sendTransaction({from: "Sender_Address",to: "Receiver_Address", value: "Amount_Want_To_Send"})
```
