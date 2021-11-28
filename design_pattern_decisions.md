# Design Patterns

## Inter-Contract Execution:

A core feature of OpenQ is the way it deploys one new smart contract per bounty/issue created.

We chose to design it this way because it made the accounting system much easier.

Rather than having some complex nested mapping of funder -> [issue -> deposits], we get a neat address whos balance can be checked natively on the ERC20 contracts it is funded with.

## Oracles

We use a custom oracle for interacting with the GitHub API.

We chose not to use Chainlink and instead write our own oracle because GitHub is a single data-source provider, so much of the redundancy of Chainlink which is helpful for things like price feeds and weather wouldn't be as useful for us.

Ideally, Github would host their own Airnode from API3 which we would call.