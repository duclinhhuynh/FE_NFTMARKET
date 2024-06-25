const { ethers } = require("hardhat");

async function main() {
    try {
        const NFTMarketplaceFactory = await ethers.getContractFactory("NFTMarketplace");
        const deploymentTransaction = await NFTMarketplaceFactory.deploy();

        // Check if deploymentTransaction is a contract instance
        await deploymentTransaction.deployed();
        console.log(`NFTMarketplace contract deployed to address: ${deploymentTransaction.address}`);

        // transfer funds
        // const MarketplaceTransferFunds = await ethers.getContractFactory("TransferFunds");
        // const marketplaceTransferFunds = await MarketplaceTransferFunds.deploy();

        // // Check if deploymentTransaction is a contract instance
        // await marketplaceTransferFunds.deployed();
        // console.log(`marketplaceTransferFunds contract deployed to address: ${marketplaceTransferFunds.address}`);

         //We get the contract to deploy
         // Deploy NftAuction contract with appropriate parameters
        //   const NftAuction = await ethers.getContractFactory("NftAuction");
        //   const startingPrice = ethers.utils.parseEther("7"); // Example: 7 ETH starting price
        //   const discountRate = ethers.utils.parseEther("0.00001"); // Example: 0.00001 ETH discount rate
        //   const nftAddress = "0x681c15D5928d5BEA767777a8769F7694AaF505A7"; // Use the deployed NFT contract address
        //   const nftId = 1; // Example: NFT ID to auction
  
        //   const nftAuction = await NftAuction.deploy(startingPrice, discountRate, nftAddress, nftId);
        //   await nftAuction.deployed();
        //   console.log("NftAuction deployed to:", nftAuction.address);

    } catch (error) {
        console.error("Deployment failed:", error);
        process.exit(1);
    }
}

main().catch((error) => {
    console.error("Error in main function:", error);
    process.exit(1);
});