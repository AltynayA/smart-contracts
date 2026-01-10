import hardhat from "hardhat";
const ethers = hardhat.ethers;

async function main() {
  const Counter = await ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();
  await counter.deployed();

  console.log("Counter deployed to:", counter.address);

  console.log("Count before increment:", (await counter.getCount()).toString());
  await counter.increment();
  console.log("Count after increment:", (await counter.getCount()).toString());
}

main().catch(console.error);
