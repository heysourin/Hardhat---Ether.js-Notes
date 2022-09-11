// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract transfer{
    address public owner;

    event Transaction(address indexed to, uint amount);

    constructor(){
        owner = msg.sender;
    }

    function callOwner() public view returns(address){
        return owner;
    }

    function _transfer(address payable _to) public payable {
        _to.transfer(msg.value);
        emit Transaction(_to, msg.value);        
    }
}
//0x9f0fCF7257c7e1415DAAA73d7C6c8d7803d31f84

 
