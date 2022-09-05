require("@nomicfoundation/hardhat-toolbox");

const { task } = require("hardhat/config");

task("accounts", "Prints the list of ccounts", async (taskArg, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    const address = await account.getAddress();
    const balance = await account.getBalance();
    console.log(`Address ${address} has balance ${hre.ethers.utils.formatEther(balance)} Ethers`); //? will return balance in ethers
  }
});

module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "goerli", //***IMP***
  networks: {
    hardhat: {},
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/iNqVsjbAtSOEgN6320pRN643VAJgOkHf",
      accounts: ["3fea66db17867a169e57be559a11a0e1e63ecdd71bffb815371ef07129f39146"]
    }
  },
};


