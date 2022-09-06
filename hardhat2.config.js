require("@nomicfoundation/hardhat-toolbox");

task("accounts", "Prints the list of accounts", async (taskArg, hre) => {
  const accounts = await hre.ethers.getSigners();
  //? 'hre' is shortform of hardhat which is calling 'ethers' library inside it and
  //? ..then calling 'getSigners()' function. 'Signer' stores informations of accounts and more

  //! Getting the account balances
  for (const account of accounts) {
    const address = await account.getAddress();
    const balance = await account.getBalance();

    // console.log(`${address} has balance ${balance} wei`); //? will return balance in wei
    // console.log(`Address ${address} has balance ${hre.ethers.utils.formatEther(balance)} Ethers`); //? will return balance in ethers
    console.log(account); //? It will show all the details of the accounts
  }
});
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    goerli: {
      url: "https://goerli.infura.io/v3/92eb3c8c2cb2483d81f1d3bbad648766",
      accounts: [
        "3fea66db17867a169e57be559a11a0e1e63ecdd71bffb815371ef07129f39146",
      ],
    },
  },
};
