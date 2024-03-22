const { ethers } = require("hardhat");

async function main() {
    try {
        const NFTMarketplaceFactory = await ethers.getContractFactory("NFTMarketplace");
        const deploymentTransaction = await NFTMarketplaceFactory.deploy();

        // Check if deploymentTransaction is a contract instance
        if (deploymentTransaction instanceof ethers.Contract) {
            console.log(`NFTMarketplace contract deployed to address: ${deploymentTransaction.address}`);
        } else {
            console.error("Deployment failed: Invalid deployment transaction");
            console.error("Deployment transaction:", deploymentTransaction);
        }
    } catch (error) {
        console.error("Deployment failed:", error);
        process.exit(1);
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});


// 0xa513E6E4b8f2a923D98304ec87F64353C4D5C853