// contracts/MockToken.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract MockToken is ERC20 {
    address public admin;

    constructor() ERC20('Mock', 'MOCK') {
        _mint(msg.sender, 10000 * 10**18);
        admin = msg.sender;
    }
}
