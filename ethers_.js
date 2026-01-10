
// provider abstraction
const { ethers } = require('ethers');
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:7545');

// alternative: browser provider (MetaMask and Ganache)
// const provider = new ethers.BrowserProvider(window.ethereum);

// signing, ABI Parsing, and Contract Interaction

// use one ganache account
const privateKey = '0x...' // example
const wallet = new ethers.Wallet(privateKey, provider);


const abi = [ /* your contract ABI */ ];
const contract = new ethers.Contract(
  '0xYourDeployedContractAddress',
  abi,
  signer // or wallet
);

// read call
const result = await contract.getValue();

// write transaction
const tx = await contract.setValue(42);
await tx.wait(); // waits for confirmation

// sign message
const signedMessage = await signer.signMessage('Hello Ganache');


try {
  const estimatedGas = await contract.setValue.estimateGas(42);
  console.log('Estimated gas:', estimatedGas.toString());

  // Or full tx estimation
  const tx = await contract.setValue.populateTransaction(42);
  const gasEstimate = await provider.estimateGas(tx);
  console.log('Full tx gas estimate:', gasEstimate.toString());
} catch (error) {
  console.error('Revert reason:', error.reason);
  console.error('Error code:', error.code);
  console.error('Full error:', error);
}

