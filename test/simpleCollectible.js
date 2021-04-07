const { expect, use } = require("chai");
const { ethers } = require("hardhat");
const { solidity } = require("ethereum-waffle");
const { utils } = require("ethers");
use(solidity);

describe("NFTCToken deployment", async () => {
  let Token, token, owner, address1, address2;

  describe("Deployment", () => {
    it("Deployment should assign the total supply of tokens to the owner", async function () {
      const [owner] = await ethers.getSigners();

      const Token = await ethers.getContractFactory("NFTCToken");

      const hardhatToken = await Token.deploy(100000);

      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  });
});

describe("NFTGToken deployment", async () => {
  let Token, token, owner, address1, address2;

  describe("Deployment", () => {
    it("Deployment should assign the total supply of tokens to the owner", async function () {
      const [owner] = await ethers.getSigners();

      const Token = await ethers.getContractFactory("NFTGToken");

      const hardhatToken = await Token.deploy(100000);

      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  });
});

describe("SimpleCollectible", function () {
  let myContract;

  describe("YourContract", function () {
    it("Should deploy YourContract", async function () {
      const YourContract = await ethers.getContractFactory("SimpleCollectible");
      myContract = await YourContract.deploy([utils.id("T"), utils.id("Tasd")]);
    });
  });
});
