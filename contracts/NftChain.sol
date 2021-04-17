// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NftChain is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() public ERC721("NFTArt", "NFTA") {
        _setBaseURI("https://ipfs.io/ipfs/");
    }

    function mint(address recipient, string memory tokenURI)
        public onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 itemId = _tokenIds.current();
        _mint(recipient, itemId);
        _setTokenURI(itemId, tokenURI);

        return itemId;
    }
}
