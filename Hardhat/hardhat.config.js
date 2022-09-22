const { task } = require("hardhat/config");
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });


const QUICK_NODE_URL = process.env.QUICK_NODE_URL;
const PVT_KEY = process.env.PVT_KEY;

task("accounts", "Print the lists of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  
  for(const account of accounts){
    const address = await account.getAddress();
    const balance = await account.getBalance();
    console.log(address + ": " + hre.ethers.utils.formatEther(balance));
  }
});

module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "goerli",
  networks:{
    goerli:{
      url:QUICK_NODE_URL,
      accounts:[PVT_KEY],
    }
  }
};

//TODO: Run with 'npx hardhat accounts'
