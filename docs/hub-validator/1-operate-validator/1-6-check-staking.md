# Check Validators and Your staking(CLI)
You can check validator state with [oasys-pos-cli](docs/hub-validator/operate-validator/1-3-join-validator-cli).

## Preparation
Set staker private_key.
```bash
$ export PRIVATE_KEY=STAKER_PRIVATE_KEY
```

## Check All validator info
```bash
$ ./oaspos validator:info-all --network mainnet
```

```bash
+--------------------------------------------+--------------------------------------------+-----------------+--------+--------+
|                   Owner                    |                  Operator                  |   Total Stake   | Status | Jailed |
+--------------------------------------------+--------------------------------------------+-----------------+--------+--------+
| 0x15f41EdFE3556b853D79f96EDBae4B68c0217673 | 0xd7a54d58305934E2D725f3573b4419E905Fbdfe5 | 0 Wei           | active | no     |
| 0x86652fE437425AC63211C55b6b067B3181BBcB17 | 0x0f66c21DfB9F600278b07571dB4b5d39789A5592 | 101,280,673 OAS | active | no     |
...
```

## Check Your Staking
To fully done staking, you must wait for 1 Epoch to be run on blockchain, which is approx 1 day.

The following command checks the staking amount at the current epoch.

That's why it is necessary to check the staking amount after the next epoch following the staking process has been done.


```bash
$ ./oaspos staker:show-stakes \
  --network mainnet \
  --staker 0xaf395754eb6f542742784ce7702940c60465a46b
```

```bash
+--------------------------------------------+-------+-------+-------+
|                 Validator                  |  OAS  | WOAS  | SOAS  |
+--------------------------------------------+-------+-------+-------+
| 0x15f41EdFE3556b853D79f96EDBae4B68c0217673 | 0 Wei | 0 Wei | 0 Wei |
| 0x86652fE437425AC63211C55b6b067B3181BBcB17 | 1 Wei | 0 Wei | 0 Wei |
| 0xa505014a84e8BdC4A620470A53EAd872b0c1CA5b | 0 Wei | 0 Wei | 0 Wei |
| 0xF5100e233E0A5AF82e9C6f3DEdF6Ca2E45099eF8 | 0 Wei | 0 Wei | 0 Wei |
| 0x4e5E774D3837bd9302B83CAD94a112575411F07B | 0 Wei | 0 Wei | 0 Wei |
| 0x3C8075380217Eb85d4109226406cACda4c3BdB75 | 0 Wei | 0 Wei | 0 Wei |
| 0x9b64BE0ec5a334968b37BbD687EaDbc757DA6875 | 0 Wei | 0 Wei | 0 Wei |
| 0x3d821c7399ea97dA12e55727A378B4F5eb0289F8 | 0 Wei | 0 Wei | 0 Wei |
| 0xAf76F079631Ca0f3C090A98A2987b8D232C26447 | 0 Wei | 0 Wei | 0 Wei |
| 0xD47620F7904686E1B61bC2b16AD4Ef333623C3A4 | 0 Wei | 0 Wei | 0 Wei |
| 0xeC21628Fd017bbB0c751CB14BCbC6b81EB437241 | 0 Wei | 0 Wei | 0 Wei |
| 0x324D14607bB6853Fb0E15a02C80D59045714520F | 0 Wei | 0 Wei | 0 Wei |
| 0x5F6831BDA9d0483054EB50A48966d65D2b156C7b | 0 Wei | 0 Wei | 0 Wei |
| 0x6e28e5AF24dA4Cb7Bd669332244271eDce95f747 | 0 Wei | 0 Wei | 0 Wei |
| 0x5Ed4f15045aCfDd0392a7A0706503ae1aA2B82dc | 0 Wei | 0 Wei | 0 Wei |
| 0x5646b6E8a0856766f0ace6D008f6919ad42Df82c | 0 Wei | 0 Wei | 0 Wei |
| 0x025e6bEc8c34dBb38120840610004e8968790b7e | 0 Wei | 0 Wei | 0 Wei |
| 0xB441A6A51BF69366d903c072D3B5594Ca02Ff1e0 | 0 Wei | 0 Wei | 0 Wei |
| 0x362EE93C00D8Bffc1e0284116d7CC9513cdE959F | 0 Wei | 0 Wei | 0 Wei |
| 0x272d6bd040c2B8454f4f6F43115758fBe318ee2c | 0 Wei | 0 Wei | 0 Wei |
| 0x80e358CBB533F6c8d07d2dc5604a55aA925A95df | 0 Wei | 0 Wei | 0 Wei |
| 0xFCB42091aCBEf803e333A1b5C7079A43b0CFDE59 | 0 Wei | 0 Wei | 0 Wei |
+--------------------------------------------+-------+-------+-------+
| Total                                      | 1 Wei | 0 Wei | 0 Wei |
+--------------------------------------------+-------+-------+-------+
```
