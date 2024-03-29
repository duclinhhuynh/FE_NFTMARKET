require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  localhost: {
    url: "http://localhost:8545" // Assuming your local Ethereum node is running on this URL
  },
  // rinkeby: {
    //   url: "<Rinkeby URL>",
    //   accounts: [<Private keys or mnemonic for funded accounts>],
    //   gas: <Gas settings>,
    // },
};
