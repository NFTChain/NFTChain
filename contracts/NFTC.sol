pragma solidity 0.6.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract NFTCToken is ERC20 {
    constructor(uint256 initialSupply) public ERC20("NFTChain", "NFTC") {
        _mint(msg.sender, initialSupply);
    }

    function faucet(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
