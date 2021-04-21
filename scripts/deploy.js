const { ethers } = require("hardhat");
// const { utils } = require("ethers"); // for buyer mints
const fs = require("fs");

const main = async () => {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const balance = await deployer.getBalance();
  console.log(`Account balance: ${balance.toString()}`);

  // deploy BEP20 Token
  const BEP20Contract = await ethers.getContractFactory("NftChainBEP20");
  const BEP20Token = await BEP20Contract.deploy(); // for buyer mints => [utils.id("T787872371871381237"), utils.id("12398129dhdö")]
  console.log(`Token address: ${BEP20Token.address}`);
  const BEP20Data = {
    address: BEP20Token.address,
    abi: JSON.parse(BEP20Token.interface.format("json")),
  };
  fs.writeFileSync("client/src/NftChainBEP20.json", JSON.stringify(BEP20Data));

  // deploy BEP721 Token
  const BEP721Contract = await ethers.getContractFactory("NftChainBEP721");
  const BEP721Token = await BEP721Contract.deploy();
  console.log(`Token address: ${BEP721Token.address}`);
  const BEP721Data = {
    address: BEP721Token.address,
    abi: JSON.parse(BEP721Token.interface.format("json")),
  };
  fs.writeFileSync(
    "client/src/NftChainBEP721.json",
    JSON.stringify(BEP721Data)
  );

  // deploy NFT exchange
  const exchangeContract = await ethers.getContractFactory("NftDex");
  const deployedExchangeContract = await exchangeContract.deploy(
    BEP20Data.address,
    BEP721Data.address
  );
  console.log(`Token address: ${deployedExchangeContract.address}`);
  const exchangeContractData = {
    address: deployedExchangeContract.address,
    abi: JSON.parse(deployedExchangeContract.interface.format("json")),
  };
  fs.writeFileSync(
    "client/src/NftDex.json",
    JSON.stringify(exchangeContractData)
  );
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
