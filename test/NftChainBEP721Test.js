const { expect } = require("chai");
const { ethers } = require("ethers");

describe("BEP721 contract", async () => {
  let BEP20Token,
    BEP20Contract,
    BEP721Token,
    BEP721Contract,
    owner,
    addr1,
    addr2;

  beforeEach(async () => {
    BEP20Contract = await ethers.getContractFactory("NftChainBEP20");
    BEP20Token = BEP20Contract.deploy();

    BEP721Contract = await ethers.getContractFactory("NftChainBEP721");
    BEP721Token = BEP721Contract.deploy(BEP20Token.address);
    [owner, addr1, addr2, _] = await ethers.getSigners();
  });
});
