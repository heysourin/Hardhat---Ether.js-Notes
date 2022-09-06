const {ethers} = require('ethers');

const RPC = '';
const receiverAccount = '';
const privateKey = '';
const provider = new ethers.providers.JsonRpcProvider(RPC);
const wallet = new ethers.Wallet(privateKey, provider);

async function call(){
//! Checking balance before balance transfer 
    console.log(`Sender Balance of account ${await wallet.getAddress()} is ${ethers.utils.formatEther(await wallet.getBalance())}`);

    const bal = await provider.getBalance(receiverAccount);
    console.log(`Receivers account balance of $${receiverAccount} is ${ethers.utils.formatEther(bal)}`);
    
    //! Transfering balance
    const balanceTransfer = await wallet.sendTransaction({
        to: receiverAccount,
        value: ethers.utils.parseEther("0.00001")
    });
    
    await balanceTransfer.wait();
    console.log(`Amount transferred: ${ethers.utils.formatEther(balanceTransfer.value)}`);


    console.log(`Sender Balance of account ${await wallet.getAddress()} after transaction is ${ethers.utils.formatEther(await wallet.getBalance())}`);

    const bal2 = await provider.getBalance(receiverAccount);
    console.log(`Receivers account balance of $${receiverAccount} after transaction is ${ethers.utils.formatEther(bal2)}`);
}


call();
