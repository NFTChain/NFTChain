// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract NFTC is ERC20 {
    constructor() public ERC20("NFTC", "NFTChain") {}

    function faucet(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
