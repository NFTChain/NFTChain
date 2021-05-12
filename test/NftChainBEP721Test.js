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

    BEP721Contract = await ethers.getContractFactory("NftChainBEP721");
    BEP721Token = await BEP721Contract.deploy(BEP20Token.address);
    [owner, addr1, addr2, _] = await ethers.getSigners();
  });

  describe("Deployment", () => {
    it("Should assign the total supply of tokens to the owner", async () => {
      const ownerBalance = await BEP20Token.balanceOf(owner.address);
      expect(await BEP20Token.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Create inks and mint tokens", () => {
    it("Should create the first ink", async () => {
      const createInk = await BEP721Token.createInk("inkurl", 1, 1000);
      const totalInks = await BEP721Token.totalInks();
      expect(totalInks).to.equal(1);
    });
  });

  // need to update the tests with parsing the price (18 decimals)
  describe("Buy inks and tokens", () => {
    it("Should buy 1 ink and 1 token", async () => {
      // create 1 ink for addr1
      const inkUrl = "inkurl";
      const inkPrice = ethers.utils.parseEther("1000");
      console.log("PRICEEEEEEEEE", inkPrice);
      const createInk = await BEP721Token.connect(addr1).createInk(
        inkUrl,
        1,
        inkPrice
      );

      // approve BEP721 address transaction for owner
      const approveTransaction = await BEP20Token.approve(
        BEP721Token.address,
        1000
      );

      // buy 1 ink for owner
      const buyInk = await BEP721Token.buyInk(inkUrl); // sends NFTC tokens to artist (addr1) and minted token to buyer (owner)

      // check if ink got created
      const totalInks = await BEP721Token.totalInks();
      expect(totalInks).to.equal(1);

      // check if buyer got minted token
      const firstMintedTokenId = 1;
      const ownerOfToken = await BEP721Token.ownerOf(firstMintedTokenId);
      expect(ownerOfToken).to.equal(owner.address);

      // check if seller/artist got NFTC tokens
      const balanceOfArtist = await BEP20Token.balanceOf(addr1.address);
      expect(balanceOfArtist).to.equal(inkPrice);
    });

    // it("Should buy 1 token", async () => {
    //   const initialBalanceOfOwner = await BEP20Token.balanceOf(owner.address);
    //   const createInk = await BEP721Token.connect(addr1).createInk(
    //     "inkurl",
    //     1,
    //     1000
    //   );
    //   const approveTransaction = await BEP20Token.approve(
    //     BEP721Token.address,
    //     1000
    //   );
    //   const buyInk = await BEP721Token.buyInk("inkurl");

    //   // set token price for owners token
    //   const setTokenPrice = await BEP721Token.setTokenPrice(1, 50);

    //   // approve the transaction for addr1
    //   const approve = await BEP20Token.connect(addr1).approve(
    //     BEP721Token.address,
    //     50
    //   );

    //   // buy with addr1 the minted token from owner
    //   const buyToken = await BEP721Token.connect(addr1).buyToken(1);

    //   // check if addr1 got the minted token
    //   const firstMintedTokenId = 1;
    //   const ownerOfToken = await BEP721Token.ownerOf(firstMintedTokenId);
    //   expect(ownerOfToken).to.equal(addr1.address);

    //   //   const balanceOfOwner = await BEP20Token.balanceOf(owner.address);
    //   //   expect(balanceOfOwner).to.equal(initialBalanceOfOwner - 950); // 950 = bought for 1000 and sold for 50

    //   // check if addr1 paid for the token
    //   const balanceOfAddr1 = await BEP20Token.balanceOf(addr1.address);
    //   expect(balanceOfAddr1).to.equal(950);
    // });
  });
});
