// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// Write three versions of a function that pushes integers into a dynamic array

contract GasOptimization {
    uint256[] public numbers;

    //  Version A: naive implementation
    function pushA(uint256 n) public {
        for (uint256 i = 0; i < n; i ++) {
            numbers.push(i);
        }
    }

    // Version B: optimized implementation
    function pushOptimized(uint256 n) public {
        // memory data
        uint256 len = numbers.length;
        for (uint256 i = 0; i < n; i ++) {
            // pushing following values 
            numbers.push(len + i);
        }
    }

    function pushMoreOptimized(uint256 n) public {
        uint256[] storage nums = numbers; // cache storage pointer

        unchecked {
            for (uint256 i = 0; i < n; i++) {
                nums.push(i); // push directly, no extra addition
            }
        }
    }

    


}


