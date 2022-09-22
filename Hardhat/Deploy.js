
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hi there");
  await greeter.deployed();

  // console.log(`Contract deployed to : ${greeter.address}`);getting the address of deployed data
  console.log(greeter); //? getting all the details
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//TODO: Run with 'npx hardhat run scripts/deploy.js'
