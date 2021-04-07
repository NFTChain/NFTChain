// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract NFTG is ERC20 {
    constructor() public ERC20("NFTG", "NFTGovernance") {}

    function faucet(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
