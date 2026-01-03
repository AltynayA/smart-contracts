// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleStorage {
    uint256 private _storedValue;

    // Set initial value when contract is deployed
    constructor(uint256 _initialValue) {
        _storedValue = _initialValue;
    }

    // read value (used by frontend)
    function storeValue() public view returns (uint256) {
        return _storedValue;
    }

    // Optional: change value (not required for Task A)
    function setValue(uint256 _newValue) public {
        _storedValue = _newValue;
    }
}
