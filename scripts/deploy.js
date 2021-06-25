const { ethers } = require("hardhat");
// const { utils } = require("ethers"); // for buyer mints
const fs = require("fs");

const main = async () => {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const balance = await deployer.getBalance();
  console.log(`Account balance: ${balance.toString()}`);

  // deploy BEP20 Token
  const BEP20Contract = await ethers.getContractFactory("NftChainERC20");
  const BEP20Token = await BEP20Contract.deploy(
    "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff"
  ); // https://polygonscan.com/address/0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff/contracts#code <=== mainnet
  console.log(`Token address: ${BEP20Token.address}`);
  const BEP20Data = {
    address: BEP20Token.address,
    abi: JSON.parse(BEP20Token.interface.format("json")),
  };
  fs.writeFileSync("client/src/NftChainERC20.json", JSON.stringify(BEP20Data));

  // deploy BEP721 Token
  const BEP721Contract = await ethers.getContractFactory("NftChainERC721");
  const BEP721Token = await BEP721Contract.deploy(BEP20Data.address); // add BEP20 token as main currency
  console.log(`Token address: ${BEP721Token.address}`);
  const BEP721Data = {
    address: BEP721Token.address,
    abi: JSON.parse(BEP721Token.interface.format("json")),
  };
  fs.writeFileSync(
    "client/src/NftChainERC721.json",
    JSON.stringify(BEP721Data)
  );
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
