/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomiclabs/hardhat-waffle");

const INFURA_URL = "https://rinkeby.infura.io/v3/35cakölj";

const PRIVATE_KEY = "f927cc4aaa35e2fd272f80fkjdl";

module.exports = {
  solidity: "0.6.7",
  networks: {
    rinkeby: {
      url: INFURA_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};
