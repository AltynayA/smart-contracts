// const { expect } = require("chai");
// const { ethers } = require("hardhat");
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Token Contract Tests", function () {
  let Token, token, owner, addr1, addr2;

  const initialSupply = ethers.utils.parseEther("1000"); // 1000 MTK

  beforeEach(async function () {
    Token = await ethers.getContractFactory("Token");
    [owner, addr1, addr2] = await ethers.getSigners();
    token = await Token.deploy(initialSupply);
    await token.deployed();
  });

  it("Should assign initial supply to owner", async function () {
    const ownerBalance = await token.balanceOf(owner.address);
    expect(ownerBalance).to.equal(initialSupply);
  });

  it("Should transfer tokens successfully", async function () {
    const amount = ethers.utils.parseEther("100");
    await expect(token.transfer(addr1.address, amount))
      .to.emit(token, "Transfer")
      .withArgs(owner.address, addr1.address, amount);

    expect(await token.balanceOf(addr1.address)).to.equal(amount);
    expect(await token.balanceOf(owner.address)).to.equal(initialSupply.sub(amount));
  });
// balance check
  it("Should fail if sender has insufficient balance", async function () {
    const amount = ethers.utils.parseEther("2000"); // More than initial supply
    await expect(token.connect(addr1).transfer(owner.address, amount))
      .to.be.revertedWith("Insufficient balance");
  });
// transfer test
  it("Should fail if transferring to zero address", async function () {
    const amount = ethers.utils.parseEther("10");
    await expect(token.transfer(ethers.constants.AddressZero, amount))
      .to.be.revertedWith("Cannot transfer to zero address");
  });

  it("Should allow transfer to self and update balances correctly", async function () {
    const amount = ethers.utils.parseEther("50");
    await token.transfer(owner.address, amount); // transfer to self (edge case)
    expect(await token.balanceOf(owner.address)).to.equal(initialSupply);
  });
// gas estimation test
  it("Should estimate gas for transfer", async function () {
    const amount = ethers.utils.parseEther("10");
    const gasEstimate = await token.estimateGas.transfer(addr1.address, amount);
    console.log("Gas estimate for transfer:", gasEstimate.toString());
    expect(gasEstimate).to.be.a("object");
  });

  // storage verification
  it("Should verify storage after multiple transfers", async function () {
    const t1 = ethers.utils.parseEther("100");
    const t2 = ethers.utils.parseEther("50");

    await token.transfer(addr1.address, t1);
    await token.connect(addr1).transfer(addr2.address, t2);

    expect(await token.balanceOf(owner.address)).to.equal(initialSupply.sub(t1));
    expect(await token.balanceOf(addr1.address)).to.equal(t1.sub(t2));
    expect(await token.balanceOf(addr2.address)).to.equal(t2);
  });
// negative tests
  it("Negative test: revert on invalid transfer", async function () {
    const amount = ethers.utils.parseEther("1");
    await expect(token.connect(addr2).transfer(addr1.address, amount))
      .to.be.revertedWith("Insufficient balance");
  });
});
