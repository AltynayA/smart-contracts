// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MyToken {
    // token info
    string public name = "MyToken";
    string public symbol = "MTK";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    address public owner;

    // ledger: mapping from address to balance
    mapping(address => uint256) public balanceOf;

    // transfer event
    event Transfer(address indexed from, address indexed to, uint256 value);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    // constructor
    constructor(uint256 _initialSupply) {
        owner = msg.sender;
        uint256 scaledInitialSupply = _initialSupply * (10**decimals);

        // totalSupply = _initialSupply * (10 ** uint256(decimals)); 
        totalSupply = scaledInitialSupply;
        balanceOf[msg.sender] = scaledInitialSupply;

        emit Transfer(address(0), msg.sender, scaledInitialSupply);
    }
    // trasnfer function 
    function transfer(address to, uint256 amount) public returns (bool) {
        // address sender = msg.sender;

        require(to != address(0), "Cannot transfer to zero address");
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");

        unchecked {  // prevents overflow/underflow
            balanceOf[msg.sender] -= amount;
            balanceOf[to] += amount;
        }

        emit Transfer(msg.sender, to, amount);
        return true;
    }
    // mint new tokens (owner only)
    function mint(address to, uint256 amount) public onlyOwner {
        require(to != address(0), "Zero address");

        totalSupply += amount;
        balanceOf[to] += amount;

        emit Transfer(address(0), to, amount);

    }

    //  check the balance of the caller
    function getBalance() public view returns (uint) {
        return balanceOf[msg.sender];
    }

}

