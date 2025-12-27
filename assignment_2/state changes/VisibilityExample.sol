// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Write 4 functions (public/internal/private/external) and show which can call which. 

contract VisibilityExample {

    string public lastCalled = "Nobody yet";

    function publicFunc() public pure returns (string memory) {
        return "Public function called" ;
    }

    function internalFunc() internal pure returns (string memory) {
        return "Internal function called";
        // return a + b 
    }

    function privateFunc() private pure returns (string memory) {
        return "Private function called";
    }

    function externalFunc() external pure returns (string memory) {
        return "External function called";
    }
    
// calling within the contract
    function testFromInside() public {
        // lastCalled = "testFromInside";
                
        lastCalled = publicFunc(); // works
 
        lastCalled = internalFunc(); // works

        lastCalled = privateFunc(); // works

        // lastCalled = externalFunc(); // error, can be called internally using this
        lastCalled = this.externalFunc(); // fixed via internal call
    }
}
contract ChildVisibility is VisibilityExample {
// calling from a child contract (inheritance)
    function testFromChild() public {
        lastCalled = "testFromChild";
                                                 
        lastCalled = publicFunc(); // works

        lastCalled = internalFunc(); // works

        // lastCalled = privateFunc(); // error: private cannot inherit
        // lastCalled = externalFunc();// error: external not internal
    }
}

// calling from another contract
contract Outsider {
    VisibilityExample public target;

    constructor(VisibilityExample _target) {
        target = _target;
    }

    function testFromOutside() external view {
        target.publicFunc();
        target.externalFunc();
        // target.privateFunc(); //error
        // target.internalFunc(); // error

    }
}