# Contract Update

`op-geth` offers a convenient feature that allows you to deploy a contract at a specified address. This functionality can replace an existing contract with a new one.

:::danger
**This is a risky operation** and must be thoroughly tested, especially on testnets, before being applied to any production (mainnet) environment.
:::

## Procedure for Using the Contract Replacement Feature

### **Create a `contract_update.json` file** with the following format:

```json
{
  "123456": {
    "0x123456789aBCdEF123456789aBCdef123456789A": {
      "balance": "0",
      "code": "0x60806040526004361061003f5760003560e01c806312065fe014610044578063..."
    }
  }
}
```

- **Block number (`"123456"`):** Specify the future block number at which to replace the contract (choose a number sufficiently far in the future).
- **Contract address (`"0x123456789aBCdEF123456789aBCdef123456789A"`):** The address of the contract you want to replace.
- **Balance (`"balance"`):** Set this to `"0"`.
- **Code (`"code"`):** The bytecode of the new contract (i.e., the `deployedBytecode` from your Hardhat artifacts).

### **Include the following [environment](https://github.com/oasysgames/verse-layer-opstack/blob/2be820dd0cbfc0f67b01cf742a2e79842fc05a33/docker-compose.yml#L17-L42) when launching `op-geth`:**

```
GETH_DANGEROUS_CONTRACTUPDATE: /asset/contract_update.json
```

## Important Notes

- **Do not modify the contract’s storage layout**. This operation replaces only the contract’s bytecode and does not alter the contract’s state. The same principles as the proxy pattern for upgradeable contracts apply: storage must remain intact.
- The constructor of the replaced contract will not be executed. If you need to perform any operations during the replacement, please prepare an init function (or a similar function) and execute them there.
- For consistency, you must apply the **same JSON** to any other replica nodes. Otherwise, the synchronization process will stop. Additionally, **the Oasys team must also apply the same JSON** to our replica node.
  - For this reason, choose a block number sufficiently far in the future so that everyone can be prepared.
  - Once ready, **be sure to share the `contract_update.json` file** with **`Oasys`**.

## Testing Recommendations

Before applying these changes on your mainnet, please confirm the following in your testnet environment:

- Thoroughly test the replacement operation.
- Validate the behavior of the new contract in various scenarios.
- Ensure that the replacement process does not disrupt any existing functionalities.

---

## Example: Replacing a Contract to Add a `withdraw` Function

Below is a simple illustration of a scenario where the original contract lacks a `withdraw` function. We replace it with a new version that adds the missing functionality.

### Original Contract (Without `withdraw`)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OASVaultWithoutWithdraw {
    // This variable stores the owner (deployer) address
    address public owner;

    // This event logs the deposited amount
    event Deposited(address indexed from, uint256 amount);

    // The constructor sets the deployer as the owner
    constructor() {
        owner = msg.sender;
    }

    // This function allows anyone to deposit OAS into the contract using msg.value
    // However, there is no withdraw function in this contract.
    function deposit() external payable {
        emit Deposited(msg.sender, msg.value);
    }

    // This function returns the contract's current OAS balance
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
```

### Replaced Contract (With `withdraw`)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OASVault {
    // This variable stores the owner (deployer) address
    address public owner;

    // This event logs the deposited amount
    event Deposited(address indexed from, uint256 amount);

    // This event logs the withdrawn amount
    event Withdrawn(address indexed to, uint256 amount);

    // The constructor sets the deployer as the owner
    constructor() {
        owner = msg.sender;
    }

    // Modifier to allow only the owner to call certain functions
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    // This function allows anyone to deposit OAS into the contract using msg.value
    function deposit() external payable {
        // Emit the deposit event with sender and amount
        emit Deposited(msg.sender, msg.value);
    }

    // This function allows the owner to withdraw a specified amount of OAS
    function withdraw(uint256 _amount) external onlyOwner {
        require(_amount <= address(this).balance, "Insufficient balance in contract");
        
        // Transfer the requested amount to the owner
        payable(owner).transfer(_amount);

        // Emit the withdrawal event
        emit Withdrawn(owner, _amount);
    }

    // This function returns the contract's current OAS balance
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
```

### Deployment and Verification

Details of the deployment process are omitted here. For this example, it is assumed that the contract has been deployed to the address `0xCa8dd2F71d4F455CC5ABDa79D1806405712AE644`. Using the Hardhat console, a verification will be performed by depositing 1 OAS.

```ts
const contractAddr = "0xCa8dd2F71d4F455CC5ABDa79D1806405712AE644";
const [deployer] = await ethers.getSigners();
const vaultNoWithdrawAbiString = "[{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"Deposited\",\"type\":\"event\"},{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"deposit\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getBalance\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]";
const vaultNoWithdrawAbi = JSON.parse(vaultNoWithdrawAbiString);
const vaultNoWithdraw = new ethers.Contract(contractAddr, vaultNoWithdrawAbi, deployer);
await vaultNoWithdraw.deposit({ value: ethers.parseEther("1") });
(await vaultNoWithdraw.getBalance()).toString();
// '1000000000000000000' // 1 OAS
```

### Creating and Applying the `contract_update.json` File

Create a `contract_update.json` file as shown below. Specify the `deployedBytecode` of the OASVault contract for the `“code”` field. If you are using Hardhat, the `deployedBytecode` can be found in `artifacts/contracts/OASVault.sol/OASVault.json` after compilation.  
[Apply the contract_update.json file](#include-the-following-environment-when-launching-op-geth) to op-geth.

```json
{
  "123456": {
    "0xCa8dd2F71d4F455CC5ABDa79D1806405712AE644": {
      "balance": "0",
      "code": "0x60806040526004361061003f5760003560e01c806312065fe0146100445780632e1a7d4d1461006f5780638da5cb5b14610098578063d0e30db0146100c3575b600080fd5b34801561005057600080fd5b506100596100cd565b604051610066919061030b565b60405180910390f35b34801561007b57600080fd5b5061009660048036038101906100919190610357565b6100d5565b005b3480156100a457600080fd5b506100ad61027e565b6040516100ba91906103c5565b60405180910390f35b6100cb6102a2565b005b600047905090565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610163576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161015a9061043d565b60405180910390fd5b478111156101a6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161019d906104a9565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015801561020c573d6000803e3d6000fd5b5060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d582604051610273919061030b565b60405180910390a250565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b3373ffffffffffffffffffffffffffffffffffffffff167f2da466a7b24304f47e87fa2e1e5a81b9831ce54fec19055ce277ca2f39ba42c4346040516102e8919061030b565b60405180910390a2565b6000819050919050565b610305816102f2565b82525050565b600060208201905061032060008301846102fc565b92915050565b600080fd5b610334816102f2565b811461033f57600080fd5b50565b6000813590506103518161032b565b92915050565b60006020828403121561036d5761036c610326565b5b600061037b84828501610342565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006103af82610384565b9050919050565b6103bf816103a4565b82525050565b60006020820190506103da60008301846103b6565b92915050565b600082825260208201905092915050565b7f4e6f742074686520636f6e7472616374206f776e657200000000000000000000600082015250565b60006104276016836103e0565b9150610432826103f1565b602082019050919050565b600060208201905081810360008301526104568161041a565b9050919050565b7f496e73756666696369656e742062616c616e636520696e20636f6e7472616374600082015250565b60006104936020836103e0565b915061049e8261045d565b602082019050919050565b600060208201905081810360008301526104c281610486565b905091905056fea264697066735822122017982f208cef6a675408cdfd91274ec5b27b549443de77563680f5da983bb3aa64736f6c63430008180033"
    }
  }
}
```

### Verification After Reaching the Specified Block Number

After reaching the block number specified (`123456`) in the JSON, perform a functionality check. Using the Hardhat console, deposit 2 OAS and withdraw 1 OAS.

```ts
const contractAddr = "0xCa8dd2F71d4F455CC5ABDa79D1806405712AE644";
const [deployer] = await ethers.getSigners();
const vaultAbiString = "[{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"Deposited\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"Withdrawn\",\"type\":\"event\"},{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"deposit\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getBalance\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_amount\",\"type\":\"uint256\"}],\"name\":\"withdraw\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]";
const vaultAbi = JSON.parse(vaultAbiString);
const vault = new ethers.Contract(contractAddr, vaultAbi, deployer);
await vault.deposit({ value: ethers.parseEther("2") });
(await vault.getBalance()).toString();
// '3000000000000000000' // 3 OAS
await vault.withdraw(ethers.parseEther("1"));
(await vault.getBalance()).toString();
// '2000000000000000000' // 2 OAS
```

You can confirm that the withdrawal works without issues and that the contract has been successfully updated.
