
pragma solidity ^0.8.20;

contract HelloWorld {
    // 1. stored string
    string private greeting = "Hello, World!";

    event GreetingUpdated(
        address indexed updater,
        string oldGreeting,
        string newGreeting,
        uint256 timestamp
    );

    // public getter function
    function getGreeting() public view returns (string memory) {
        return greeting;
    }

    //  update greeting func
    function setGreeting(string memory _newGreeting) public {
        // Store old value for the event
        string memory old = greeting;
        
        // update state
        greeting = _newGreeting;

        // emit event on state change
        emit GreetingUpdated(
            msg.sender,
            old,
            _newGreeting,
            block.timestamp
        );
    }

    //  message checker (internal helper)
    function _prepareMessage(string memory _text) private pure returns (string memory) {
        if (bytes(_text).length == 0) {
            return "No message given";
        }
        return _text;
    }


}