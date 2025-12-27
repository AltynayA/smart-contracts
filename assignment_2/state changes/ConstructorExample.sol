// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// Demonstrate how constructor arguments alter initial storage layout.

contract ConstructorExample {
    uint public number;
    string public name;

    // constructor with arguments
    constructor(string memory _name) {
        name = _name;
    }
}
