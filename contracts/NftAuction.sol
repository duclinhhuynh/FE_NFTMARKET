// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NftAuction {
    struct Auction {
        uint256 tokenId;
        address payable seller;
        uint256 startPrice;
        uint256 highestBid;
        address payable highestBidder;
        uint256 endTime;
        bool active;
    }

    mapping(uint256 => Auction) private idToAuction;
    IERC721 private nftContract;

    event AuctionCreated(
        uint256 indexed tokenId,
        uint256 startPrice,
        uint256 endTime
    );

    event BidPlaced(
        uint256 indexed tokenId,
        address bidder,
        uint256 bidAmount
    );

    event AuctionEnded(
        uint256 indexed tokenId,
        address winner,
        uint256 finalPrice
    );

    constructor(address nftContractAddress) {
        nftContract = IERC721(nftContractAddress);
    }

    /* Create an auction for a token */
    function createAuction(uint256 tokenId, uint256 startPrice, uint256 duration) public {
        require(nftContract.ownerOf(tokenId) == msg.sender, "Only item owner can create auction");
        require(nftContract.getApproved(tokenId) == address(this), "Contract must be approved to transfer token");

        idToAuction[tokenId] = Auction({
            tokenId: tokenId,
            seller: payable(msg.sender),
            startPrice: startPrice,
            highestBid: 0,
            highestBidder: payable(address(0)),
            endTime: block.timestamp + duration,
            active: true
        });

        nftContract.transferFrom(msg.sender, address(this), tokenId);
        emit AuctionCreated(tokenId, startPrice, block.timestamp + duration);
    }

    /* Place a bid on an auction */
    function placeBid(uint256 tokenId) public payable {
        Auction storage auction = idToAuction[tokenId];
        require(auction.active, "Auction is not active");
        require(block.timestamp < auction.endTime, "Auction has ended");
        require(msg.value > auction.highestBid, "Bid must be higher than current highest bid");

        if (auction.highestBid > 0) {
            auction.highestBidder.transfer(auction.highestBid);
        }

        auction.highestBid = msg.value;
        auction.highestBidder = payable(msg.sender);

        emit BidPlaced(tokenId, msg.sender, msg.value);
    }

    /* End an auction and transfer the NFT to the highest bidder */
    function endAuction(uint256 tokenId) public {
        Auction storage auction = idToAuction[tokenId];
        require(auction.active, "Auction is not active");
        require(block.timestamp >= auction.endTime, "Auction is still ongoing");

        auction.active = false;
        if (auction.highestBidder != address(0)) {
            nftContract.transferFrom(address(this), auction.highestBidder, tokenId);
            auction.seller.transfer(auction.highestBid);
            emit AuctionEnded(tokenId, auction.highestBidder, auction.highestBid);
        } else {
            nftContract.transferFrom(address(this), auction.seller, tokenId);
            emit AuctionEnded(tokenId, address(0), 0);
        }
    }

    /* Get auction details */
    function getAuctionDetails(uint256 tokenId) public view returns (Auction memory) {
        return idToAuction[tokenId];
    }
}
