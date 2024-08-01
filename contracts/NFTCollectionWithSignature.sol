// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTCollectionWithSignature is ERC721, Ownable {
    uint256 public nextTokenId;
    string public baseTokenURI;

    constructor(string memory name, string memory symbol, string memory baseTokenURI_)
    ERC721(name, symbol)
    Ownable(msg.sender) // 传递 msg.sender 作为初始所有者
    {
        baseTokenURI = baseTokenURI_;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    function mintTo(address recipient, bytes memory signature, string memory message) external onlyOwner {
        bytes32 messageHash = getMessageHash(message);
        bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);

        require(recoverSigner(ethSignedMessageHash, signature) == recipient, "Invalid signature");

        uint256 tokenId = nextTokenId;
        nextTokenId++;
        _mint(recipient, tokenId);
    }

    function getMessageHash(string memory _message) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_message));
    }

    function getEthSignedMessageHash(bytes32 _messageHash) public pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", _messageHash));
    }

    function recoverSigner(bytes32 _ethSignedMessageHash, bytes memory _signature) public pure returns (address) {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);
        return ecrecover(_ethSignedMessageHash, v, r, s);
    }

    function splitSignature(bytes memory sig) public pure returns (bytes32 r, bytes32 s, uint8 v) {
        require(sig.length == 65, "invalid signature length");

        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }
    }
}
