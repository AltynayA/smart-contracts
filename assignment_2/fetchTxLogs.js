const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

// 1. connect to Ganache
const web3 = new Web3('http://127.0.0.1:7545'); 


const txHashes = [
    // 3 transfers
    '0x601faaf1a87e62246a8f597eecc66b04f3270e2ee8d472cf2b56d1d20e323f01',
    '0x8becdee99d423f2eca1938e57e069fb4b126c0de95d6f79115e3d4c5ff33a4bd',
    '0x3813112de10bd4dc118c989a512d2c82e7b56218a185e08bcacbb91696c752c6',
    // failed transfer (insufficient balance)
    // '',
    // edge case (transfer to self)
    '0xe6bb8820b196527ac7038f770e420cd3bc19f1518063aa65283dbb9b48ad1b16',
  
    
];

// 3. make sure txLogs folder exists
const logsDir = path.join(__dirname, 'txLogs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// 4. fetch transactions and receipts, save JSON
async function fetchLogs() {
  for (let i = 0; i < txHashes.length; i++) {
    const hash = txHashes[i];
    try {
      const tx = await web3.eth.getTransaction(hash);
      const receipt = await web3.eth.getTransactionReceipt(hash);

      const logData = { tx, receipt };

      fs.writeFileSync(
        path.join(logsDir, `tx${i + 1}.json`),
        JSON.stringify(logData, null, 2)
      );

      console.log(`Saved tx${i + 1}.json for hash ${hash}`);
    } catch (err) {
      console.error(`Error fetching ${hash}:`, err.message);
    }
  }
}

fetchLogs();
