const { expect } = require("chai");

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
    BEP20Token = await BEP20Contract.deploy();

    // BEP721Contract = await ethers.getContractFactory("NftChainBEP721");
    // BEP721Token = await BEP721Contract.deploy(BEP20Token.address);
    [owner, addr1, addr2, _] = await ethers.getSigners();
  });

  describe("Deployment", () => {
    it("Should assign the total supply of tokens to the owner", async () => {
      const ownerBalance = await BEP20Token.balanceOf(owner.address);
      expect(await BEP20Token.totalSupply()).to.equal(ownerBalance);
    });
  });
});
