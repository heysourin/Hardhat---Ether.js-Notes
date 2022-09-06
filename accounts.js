const {ethers} = require('ethers');

const RPC = 'https://eth-goerli.g.alchemy.com/v2/jdaXJ5PUOfC8_yHQQWEmBZhKzjH7VXEt'; // Your RPC url here
const receiverAccount = '0xf9073Bf1b4F1baf7C2547c478c89fABE1B3A7e32'; // Public address of receiver Account 
const privateKey = '1f6238ecd4622c161dd2c1bb591ff26399cc320308cce2acc9f8c4115e041ad1'; // put your private key here

const provider = new ethers.providers.JsonRpcProvider(RPC)

const wallet = new ethers.Wallet(privateKey, provider);


async function call() {
    console.log("Sender's balance before transfer->", await wallet.getAddress(), ":" , ethers.utils.formatEther(await wallet.getBalance()));//* Our own a/c address, accessing with wallet(privateKey, provider)

    const bal = await provider.getBalance(receiverAccount);
    console.log("Receiver's balance before transfer->", receiverAccount, ":" , ethers.utils.formatEther(bal));//*of the one, we want to send ether, accessing with receiverAccount address
    
    const transfer = await wallet.sendTransaction({
        to: receiverAccount,
        value: ethers.utils.parseEther('0.0000000125')//* input value is in ether but the 'ethers.utils.parseEther' will convert it into wei
    })
    
    await transfer.wait();
    
    console.log("Sender's balance after transfer->",await wallet.getAddress(), ":" ,ethers.utils.formatEther(await wallet.getBalance()));
    
    const bal2 = await provider.getBalance(receiverAccount);
    console.log("Receiver's balance after transfer->", receiverAccount, ":" ,ethers.utils.formatEther(bal2));
    
    // console.log(transfer)  //* it prints the details of the transaction

}

call();

//Run with 'node accounts.js' in terminals
