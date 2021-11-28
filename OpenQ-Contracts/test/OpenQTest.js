const { BigNumber } = require('@ethersproject/bignumber');
const { expect } = require('chai');
require('@nomiclabs/hardhat-waffle');
const truffleAssert = require('truffle-assertions');

describe('OpenQ.sol', () => {
	let openQ;
	let owner;
	let mockToken;
	let fakeToken;
	let bountyId = 'mockIssueId';

	beforeEach(async () => {
		const OpenQ = await ethers.getContractFactory('OpenQ');
		const MockToken = await ethers.getContractFactory('MockToken');
		const FakeToken = await ethers.getContractFactory('FakeToken');

		[owner] = await ethers.getSigners();

		openQ = await OpenQ.deploy();
		await openQ.deployed();

		mockToken = await MockToken.deploy();
		await mockToken.deployed();
		fakeToken = await FakeToken.deploy();
		await fakeToken.deployed();
	});

	describe('mintBounty', () => {
		// We don't want duplicate bounties. Funds should organize around one issue.
		it('should revert if bounty already exists', async () => {
			// ARRANGE
			// ACT
			await openQ.mintBounty(bountyId);

			// ASSERT
			await expect(openQ.mintBounty(bountyId)).to.be.revertedWith('Issue already exists for given id. Find its address by calling issueToAddress on this contract with the issueId');
		});

		// Open issues should be labelled as such
		it('should correctly report if bounty is open', async () => {
			// ARRANGE
			// ACT
			await openQ.mintBounty(bountyId);

			const isOpen = await openQ.issueIsOpen(bountyId);

			// ASSERT
			await expect(isOpen).to.equal(true);
		});

		// Since the frontend is listening for this event, it's important that it is emitted correctly
		it('should emit an IssueCreated event with expected bounty id, issuer address, bounty address, and bountyMintTime', async () => {
			// ARRANGE
			const bountyAddress = "0x8aCd85898458400f7Db866d53FCFF6f0D49741FF";

			const expectedTimestamp = await setNextBlockTimestamp();

			// ACT
			// ASSERT
			await expect(openQ.mintBounty(bountyId))
				.to.emit(openQ, 'IssueCreated')
				.withArgs(bountyId, owner.address, bountyAddress, expectedTimestamp);
		});

		// Hardhat mints contracts predictably
		it('should return correct address for getBountyAddress', async () => {
			// ARRANGE
			// ACT
			const expectedIssueAddress = "0x32467b43BFa67273FC7dDda0999Ee9A12F2AaA08";

			await openQ.mintBounty(bountyId);

			const actualIssueAddress = await openQ.getBountyAddress(bountyId);

			// ASSERT
			await expect(actualIssueAddress).to.equal(expectedIssueAddress);
		});

		// Hardhat mints contracts predictably
		it('should add newly minted issueId to issueIds', async () => {
			// ARRANGE
			// ACT
			await openQ.mintBounty(bountyId);

			const newBoutnyId = await openQ.issueIds(0);

			// ASSERT
			await expect(newBoutnyId).to.equal(bountyId);
		});
	});
});

async function setNextBlockTimestamp(timestamp = 10) {
	return new Promise(async (resolve,) => {
		const blockNumBefore = await hre.ethers.provider.getBlockNumber();
		const blockBefore = await hre.ethers.provider.getBlock(blockNumBefore);
		const timestampBefore = blockBefore.timestamp;
		const expectedTimestamp = timestampBefore + timestamp;
		await network.provider.send("evm_setNextBlockTimestamp", [expectedTimestamp]);
		resolve(expectedTimestamp);
	});
}