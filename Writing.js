const {ethers, Wallet} = require('ethers');
const transfer = require('./transfer.json');

const RPC = 'https://goerli.infura.io/v3/4f24be74b94441fdb593ad181a978f0b'; // your rpc url here
const provider = new ethers.providers.JsonRpcProvider(RPC);

const contractAddress ='0x9f0fCF7257c7e1415DAAA73d7C6c8d7803d31f84';
const receiverAccount = '0xf9073Bf1b4F1baf7C2547c478c89fABE1B3A7e32';
const privateKey = '1f6238ecd4622c161dd2c1bb591ff26399cc320308cce2acc9f8c4115e041ad1';
const wallet = new ethers.Wallet(privateKey,provider);

const ABI =[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Transaction",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_to",
				"type": "address"
			}
		],
		"name": "_transfer",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "callOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

async function call() {
    const contract = new ethers.Contract(
        contractAddress,
        ABI,
        wallet //we need signer for write contract and send money, ie we need a signer for transactions. Metamask is a signer.
    )
	const senderAddress = await wallet.getAddress();

	//balance before transaction
    console.log(`${receiverAccount}: ${ethers.utils.formatEther(await provider.getBalance(receiverAccount))}`);
    console.log(`${senderAddress}: ${ethers.utils.formatEther(await wallet.getBalance())}`);
	
	//transaction
	const tx = await contract._transfer(receiverAccount, {
		value: ethers.utils.parseEther('0.00009'),
	});
	
	//balance after transaction
	await tx.wait();
	console.log(`${receiverAccount}: ${ethers.utils.formatEther(await provider.getBalance(receiverAccount))}`);
	console.log(`${senderAddress}: ${ethers.utils.formatEther(await wallet.getBalance())}`);
	console.log(tx);
}

call();
