pragma solidity ^0.8.26;

contract SimpleContract {

string owner;

modifier onlyOwner() {
    require(msg.sender == owner, "Not owner");
    _;
}

function withdraw() public onlyOwner {
    // Withdraw logic
}
}