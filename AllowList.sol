// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract AllowList {

    bytes32 public merkleRoot; 
    mapping(address => bool) public allowlistClaimed;

    constructor(bytes32 roothash) {
        merkleRoot = roothash;
    }

    //To allow access of image to address add it to allowListAddresses in js

    function verifyIfallowed(bytes32[] calldata _merkleProof) public {

        require(!allowlistClaimed[msg.sender], "Address already claimed");
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(
            MerkleProof.verify(_merkleProof, merkleRoot, leaf),
            "Invalid Merkle Proof."
        );
        allowlistClaimed[msg.sender] = true;
    }
}