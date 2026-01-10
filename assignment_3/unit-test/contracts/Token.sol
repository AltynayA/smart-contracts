// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "hardhat/console.sol";

contract Token {
    string public name = "MyToken";
    string public symbol = "MTK";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;

    event Transfer(address indexed from, address indexed to, uint256 value);

    constructor(uint256 _initialSupply) {
        totalSupply = _initialSupply;
        balanceOf[msg.sender] = _initialSupply;
        console.log("Token deployed. Initial supply:", _initialSupply);
    }

    function transfer(address _to, uint256 _value) public returns (bool) {
        console.log("Attempting transfer:");
        console.log(msg.sender);
        console.log(_to);
        console.log(_value);

        require(_to != address(0), "Cannot transfer to zero address");
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        console.log("Transfer successful. New balances:");
        console.log(msg.sender, balanceOf[msg.sender]);
        console.log(_to, balanceOf[_to]);

        emit Transfer(msg.sender, _to, _value);
        return true;
    }
}
