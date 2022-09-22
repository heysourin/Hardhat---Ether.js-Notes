const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("Greeter",async function () {
  let contract;

  beforeEach(async()=>{
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hi there");
    await greeter.deployed();
    contract = greeter;
  })

  it("Should return the new greeting once it is changed", async function(){
    // expect (await contract.greet()).to.equal("Hi there");
    assert.equal(await contract.greet(),"Hi there");
  });

  it("Should assign new value to greeting variable", async function(){
    const setGreetingTx = await contract.setGreeting("Hello there")
    await setGreetingTx.wait();
    expect (await contract.greet()).to.equal("Hello there");
  });
});


//TODO: Run with 'npx hardhat test'
