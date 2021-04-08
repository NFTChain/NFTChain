const { ethers } = require("hardhat");
const { utils } = require("ethers");
const fs = require("fs");

const main = async () => {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const balance = await deployer.getBalance();
  console.log(`Account balance: ${balance.toString()}`);

  const Token = await ethers.getContractFactory("SimpleCollectible");
  const token = await Token.deploy([utils.id("T"), utils.id("Ta")]);
  console.log(`Token address: ${token.address}`);

  const data = {
    address: token.address,
    abi: JSON.parse(token.interface.format("json")),
  };
  fs.writeFileSync("client/src/SimpleCollectible.json", JSON.stringify(data));
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
