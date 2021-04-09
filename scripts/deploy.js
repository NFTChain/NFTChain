const { ethers } = require("hardhat");
// const { utils } = require("ethers"); // for buyer mints
const fs = require("fs");

const main = async () => {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const balance = await deployer.getBalance();
  console.log(`Account balance: ${balance.toString()}`);

  const Token = await ethers.getContractFactory("SimpleCollectible");
  const token = await Token.deploy(); // for buyer mints => [utils.id("T787872371871381237"), utils.id("12398129dhdö")]
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
