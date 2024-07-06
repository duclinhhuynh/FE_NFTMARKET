const { ethers } = require("hardhat");

async function main() {
    try {

        // const NFT = await ethers.getContractFactory("NFT");
        // const nft= await NFT.deploy();

        // // Check if deploymentTransaction is a contract instance
        // await nft.deployed();
        // console.log(`NFT contract deployed to address: ${nft.address}`);

        const NFTAuction = await ethers.getContractFactory("NFTAuction");
        const nftAuction = await NFTAuction.deploy();

        // Check if deploymentTransaction is a contract instance
        await nftAuction.deployed();
        console.log(`NFT Auction contract deployed to address: ${nftAuction.address}`);
        ///// 
        
        const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
        const nftmartketplace = await NFTMarketplace.deploy(nftAuction.address);

        // Check if deploymentTransaction is a contract instance
        await nftmartketplace.deployed();
        console.log(`NFTMarketplace contract deployed to address: ${nftmartketplace.address}`);




        // transfer funds
        // const MarketplaceTransferFunds = await ethers.getContractFactory("TransferFunds");
        // const marketplaceTransferFunds = await MarketplaceTransferFunds.deploy();

        // // Check if deploymentTransaction is a contract instance
        // await marketplaceTransferFunds.deployed();
        // console.log(`marketplaceTransferFunds contract deployed to address: ${marketplaceTransferFunds.address}`);


    } catch (error) {
        console.error("Deployment failed:", error);
        process.exit(1);
    }
}

main().catch((error) => {
    console.error("Error in main function:", error);
    process.exit(1);
});