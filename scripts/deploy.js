const { ethers } = require("hardhat");

async function main() {
    try {
        const NFTMarketplaceFactory = await ethers.getContractFactory("NFTMarketplace");
        const deploymentTransaction = await NFTMarketplaceFactory.deploy();

        // Check if deploymentTransaction is a contract instance
        await deploymentTransaction.waitForDeployment();
        console.log(`NFTMarketplace contract deployed to address: ${deploymentTransaction.target}`);
    } catch (error) {
        console.error("Deployment failed:", error);
        process.exit(1);
    }
}

main().catch((error) => {
    console.error("Error in main function:", error);
    process.exit(1);
});
