const { ethers } = require("hardhat");

async function main() {
    try {
        const NFTMarketplaceFactory = await ethers.getContractFactory("NFTMarketplace");
        const deploymentTransaction = await NFTMarketplaceFactory.deploy();

        // Check if deploymentTransaction is a contract instance
        await deploymentTransaction.deployed();
        console.log(`NFTMarketplace contract deployed to address: ${deploymentTransaction.address}`);
        // transfer funds
        const MarketplaceTransferFunds = await ethers.getContractFactory("TransferFunds");
        const marketplaceTransferFunds = await MarketplaceTransferFunds.deploy();

        // Check if deploymentTransaction is a contract instance
        await marketplaceTransferFunds.deployed();
        console.log(`marketplaceTransferFunds contract deployed to address: ${marketplaceTransferFunds.address}`);

    } catch (error) {
        console.error("Deployment failed:", error);
        process.exit(1);
    }
}

main().catch((error) => {
    console.error("Error in main function:", error);
    process.exit(1);
});