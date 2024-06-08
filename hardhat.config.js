require("@nomicfoundation/hardhat-toolbox");
require('hardhat-gas-reporter');
require('dotenv').config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  defaultNetwork: 'hardhat',
  // networks: {
  //   hardhat: {
  //     chainId: 1337,
  //   },
  // },

  networks: {
    bsctest: {
      url : "https://data-seed-prebsc-1-s1.binance.org:8545/",
      accounts: [process.env.PRIV_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.API_KEY
  },
  // networks: {
  //   hardhat: {},
  //   eth_mumbai: {
  //     url : "https://eth-sepolia.g.alchemy.com/v2/Yu1GpgDLTCPaUgiUPU-YUjVY8D68yPOe",
  //     accounts: [
  //       `0x${"ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"}`
  //     ],
  //   }
  // },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
};
