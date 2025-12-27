// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// Create a function where modifying a storage variable inside memory copy leads to unexpected
// behavior.
contract StorageBug {
    // storage array
    uint256[3] public importantNumbers = [10, 20, 35];

    // flawed function 
    // function dangerousCopyAndModify() public {
        //  attempts to copy storage array into memory
        // uint256[] memory numbers = importantNumbers;
        // modifies the storage, not the memory
        // numbers[1] = 999;
    // }

    function safeCopyAndModifyFromStorage() public view returns (uint256[] memory) {
        uint256[] memory numbers = new uint256[](importantNumbers.length);
        
        for (uint i = 0; i < importantNumbers.length; i++) {
            numbers[i] = importantNumbers[i];
    }

        numbers[1] = 999; // safe
        return numbers;
}

    function getNumber(uint256 index) external view returns (uint256) {
        return importantNumbers[index];
}
}



