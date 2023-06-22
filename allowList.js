const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

// List of addresses for allowing access of images
let allowListAddresses = [
    "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
    "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
    "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
    "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB",
    "0x617F2E2fD72FD9D5503197092aC168c91465E7f2"
  ];

//creating leaf nodes using keccak256 and creating a merkel tree using leaves created
const leafNodes = allowListAddresses.map(addr => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true});

const buf2hex = x => '0x' + x.toString('hex');

//Get root hash of the `merkleeTree` in hexadecimal format (0x)
const rootHash = merkleTree.getRoot();
console.log('Merkle Tree\n', merkleTree.toString());
console.log("Root Hash: ", buf2hex(rootHash));


const claimingAddress = leafNodes[0];  //Initial address in remix

//hexproof is the path from leaf to merkel root 
const hexProof = merkleTree.getHexProof(claimingAddress);
console.log('Merkel Proof: ', hexProof);

console.log('Is address allowed? ', merkleTree.verify(hexProof, claimingAddress, rootHash));