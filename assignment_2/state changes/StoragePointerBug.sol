// pragma solidity ^0.8.20;

// contract StoragePointerBug {
//     // a simple storage variable 
//     uint256 public someValue = 42;

//     // A struct as a storage pointer
//     struct Data {
//         uint256 value;
//     }

//     // unexpected behavior func
//     function modifyUnexpectedly() public  {
//         // Declare a storage pointer without initializing it
//         Data storage ptr;          
//         ptr.value = 999;  
//     }
// }

