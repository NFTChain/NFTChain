// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract NFTC is ERC20 {
    constructor() ERC20("NFTC", "NFTChain") {}
    
    function faucet(address to, uint amount) external {
      _mint(to, amount);
    }
}