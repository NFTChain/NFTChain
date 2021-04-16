/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

// START FOR ETHEREUM
// const NETWORK_URL = process.env.NETWORK_URL;
// const PRIVATE_KEY = process.env.PRIVATE_KEY;
// END FOR ETHEREUM

const MNEMONIC = process.env.MNEMONIC;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: {
    compilers: [
      // FOR ETHEREUM ERC721 contract
      // {
      //   version: "0.7.6",
      //   settings: {
      //     optimizer: {
      //       enabled: true,
      //       runs: 200,
      //     },
      //   },
      // },
      // {
      //   version: "0.6.7",
      //   settings: {
      //     optimizer: {
      //       enabled: true,
      //       runs: 200,
      //     },
      //   },
      // },
      {
        version: "0.6.7",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  // FOR ETHEREUM:
  // networks: {
  //   hardhat: {
  //     chainId: 1337,
  //   },
  //   rinkeby: {
  //     url: NETWORK_URL,
  //     accounts: [`0x${PRIVATE_KEY}`],
  //   },
  // },
  // FOR BINANCE SMART CHAIN:
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    hardhat: {},
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: { mnemonic: MNEMONIC },
    },
    mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: { mnemonic: MNEMONIC },
    },
  },
};
