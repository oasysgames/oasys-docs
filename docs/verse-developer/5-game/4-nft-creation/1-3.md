---
---

# Smart Contract Testing

In the **Project Setup** section we already ran the `npx hardhat test` command, however we haven't looked at the code for our tests yet.
The file we are looking at is `test/test.js`.

The test will simply deploy our contract on hardhats local network, mint an NFT to the deplorer's address and confirm that it was created.
It will then also check the metadata for validity and log it to the console.

``` javascript
const { expect } = require("chai");
const { ethers } = require("hardhat");

let deployer
ethers.getSigners().then((signers) => {
  deployer = signers[0]
})

const firstTokenId = 0

describe("DinoRunner", function () {
  it("Should be able to mint an nft and read its tokenURI", async function () {
    const DinoRunner = await ethers.getContractFactory("DinoRunner");
    const dinoRunner = await DinoRunner.deploy();
    await dinoRunner.deployed();

    // Mint nft and check ownership
    const mintTokenTx = await dinoRunner.mint(deployer.address);
    await mintTokenTx.wait();
    expect(await dinoRunner.ownerOf(firstTokenId)).to.equal(deployer.address);
    console.log(`The owner of token ${firstTokenId} is ${deployer.address}`)

    // Check tokenURI
    const tokenURI = await dinoRunner.tokenURI(firstTokenId);
    expect(tokenURI).to.be.ok;
    console.log(`TokenURI: ${tokenURI}`)
  });
});
```

All test files in the `test/` folder will be executed through the `npx run test` command.

![Hardhat Test](/img/docs/techdocs/sample-game/game-hardhat-test.png)

If the test passed we can look into deploying the contract on a real test network, which we'll do in the next chapter.