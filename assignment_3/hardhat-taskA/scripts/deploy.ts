import * as dotenv from "dotenv";
dotenv.config();

import { network } from "hardhat";
const { ethers } = await network.connect({
  network: "hardhatOp",
  chainType: "op",
});

const [sender] = await ethers.getSigners();

console.log("Using signer:", sender.address);

// deploy Counter.sol
const Counter = await ethers.getContractFactory("Counter");

// Cast to `any` to avoid TS issues in Hardhat 3
const counter = (await Counter.deploy()) as any;

// Wait for deployment transaction and log gas
const deployTx = await counter.deploymentTransaction();
if (deployTx) {
  const deployReceipt = await deployTx.wait();
  if (deployReceipt) {
    console.log("Counter deployed in tx:", deployReceipt.transactionHash);
    console.log("🚀 Gas used for deployment:", deployReceipt.gasUsed.toString());
  }
}

// call increment() and log gas
const tx1 = await counter.increment();
const receipt1 = await tx1.wait();

console.log("Called increment()");
console.log("🚀 Gas used for increment():", receipt1.gasUsed.toString());

// send  transaction
console.log("Sending 1 wei from sender to itself...");
const tx2 = await sender.sendTransaction({ to: sender.address, value: 1n });
const receipt2 = await tx2.wait();

if (receipt2) {
  console.log("Transaction sent successfully");
  console.log("Transaction hash:", receipt2.transactionHash);

console.log("Gas used for this transaction:", receipt2.gasUsed.toString());
