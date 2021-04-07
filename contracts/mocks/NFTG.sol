// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract NFTG is ERC20 {
    constructor() ERC20("NFTG", "NFTGovernance") {}
    
    function faucet(address to, uint amount) external {
      _mint(to, amount);
    }
}