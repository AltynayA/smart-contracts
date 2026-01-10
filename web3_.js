


// provider abstraction
const Web3 = require('web3');
const web3 = new Web3('http://127.0.0.1:7545');

// Signing, ABI Parsing, and Contract Interaction 

const accounts = await web3.eth.getAccounts();
const privateKey = '0x...' // example 

//add account to wallet for signing
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);

const abi = [ /* your contract ABI */ ];
const contract = new web3.eth.Contract(abi, '0xYourDeployedContractAddress');

// call (read)
const result = await contract.methods.getValue().call();

// send transaction
await contract.methods.setValue(42).send({ from: accounts[0] });

// sign message
const signed = await web3.eth.accounts.sign('Hello Ganache', privateKey);


// gas est & error 

const estimatedGas = await web3.eth.estimateGas({
  to: '0xYourContractAddress',
  data: contract.methods.setValue(42).encodeABI(),
  from: accounts[0]
});

console.log('Estimated gas:', estimatedGas);