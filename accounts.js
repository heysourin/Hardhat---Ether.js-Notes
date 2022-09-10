const {ethers} = require('ethers');

const RPC = '';
const receiverAccount = '';
const privateKey = '';

const provider = new ethers.providers.JsonRpcProvider(RPC);//* provider provides all datas about blockchain, we will be able to know the balances through provider

const wallet = new ethers.Wallet(privateKey, provider);
//! 'new', as we are generating instances


async function call(){
//! Checking balance before balance-transfer 
console.log(`Sender Balance of account ${await wallet.getAddress()} is ${ethers.utils.formatEther(await wallet.getBalance())}`);

const bal = await provider.getBalance(receiverAccount);
console.log(`Receivers account balance of $${receiverAccount} is ${ethers.utils.formatEther(bal)}`);


//! Transfering balance
const balanceTransfer = await wallet.sendTransaction({
    to: receiverAccount,
    value: ethers.utils.parseEther("0.00001")//* input value is in ether but the 'ethers.utils.parseEther' will convert it into wei
});

await balanceTransfer.wait();
console.log(`Amount transferred: ${ethers.utils.formatEther(balanceTransfer.value)}`);


//! Checking balance after balance-transfer 
    console.log(`Sender Balance of account ${await wallet.getAddress()} after transaction is ${ethers.utils.formatEther(await wallet.getBalance())}`);

    const bal2 = await provider.getBalance(receiverAccount);
    console.log(`Receivers account balance of $${receiverAccount} after transaction is ${ethers.utils.formatEther(bal2)}`);
}


call();
