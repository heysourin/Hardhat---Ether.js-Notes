require("@nomicfoundation/hardhat-toolbox");

const { task } = require("hardhat/config");

task("accounts", "Prints the list of ccounts", async (taskArg, hre) => {
  const accounts = await hre.ethers.getSigners();
  //? 'hre' is shortform of hardhat which is calling 'ethers' library inside it and
  //? ..then calling 'getSigners()' function. 'Signer' stores informations of accounts and more

  //! Getting the account balances
  for (const account of accounts) {
    const address = await account.getAddress();
    const balance = await account.getBalance();

    //console.log(account); //? It will show all the details of the acco

    // console.log(`${address} has balance ${balance} wei`); //? will return balance in wei
    console.log(`Address ${address} has balance ${hre.ethers.utils.formatEther(balance)} Ethers`); //? will return balance in ethers
  }
});
// /** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "hardhat",//change it to 'goerli' or anything to access your account
  networks: {
    hardhat: {},
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/iNqVsjbAtSOEgN6320pRN643VAJgOkHf",
      accounts: [""]
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
};

