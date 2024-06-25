// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract NftAuction is Ownable {
    using SafeMath for uint256;
    using Address for address;

    uint256 public auctionDurationBlocks; // Thời gian đấu giá tính bằng số block
    uint256 public startPrice; // Giá khởi điểm
    uint256 public endBlock; // Block kết thúc đấu giá
    uint256 public tokenId; // ID của token NFT
    bool public ended; // Biến cờ cho biết đấu giá đã kết thúc hay chưa

    address payable public highestBidder; // Người đặt giá cao nhất
    uint256 public highestBid; // Giá cao nhất

    IERC721 public nftContract; // Contract của NFT

    event AuctionStarted(
        uint256 indexed tokenId,
        uint256 startPrice,
        uint256 auctionDurationBlocks,
        uint256 endBlock
    );
    event AuctionEnded(uint256 indexed tokenId, address winner, uint256 amount);

    constructor(
        address _nftContract,
        uint256 _tokenId,
        uint256 _startPrice,
        uint256 _auctionDurationBlocks
    ) {
        nftContract = IERC721(_nftContract);
        tokenId = _tokenId;
        startPrice = _startPrice;
        auctionDurationBlocks = _auctionDurationBlocks;
    }

    function startAuction() external onlyOwner {
        require(!ended, "Auction has already ended");

        // Transfer NFT đến contract này
        nftContract.transferFrom(owner(), address(this), tokenId);

        endBlock = block.number.add(auctionDurationBlocks);
        emit AuctionStarted(tokenId, startPrice, auctionDurationBlocks, endBlock);
    }

    function placeBid() external payable {
        require(block.number <= endBlock, "Auction has ended");
        require(msg.value > highestBid, "Bid must be higher than current highest bid");

        if (highestBidder != address(0)) {
            // Trả lại tiền cho người đặt giá cao nhất hiện tại
            payable(highestBidder).transfer(highestBid);
        }

        highestBidder = payable(msg.sender);
        highestBid = msg.value;
    }

    function endAuction() external onlyOwner {
        require(block.number > endBlock, "Auction has not ended yet");
        require(!ended, "Auction has already ended");

        // Chuyển NFT cho người đặt giá cao nhất
        nftContract.transferFrom(address(this), highestBidder, tokenId);

        // Kết thúc đấu giá
        ended = true;
        emit AuctionEnded(tokenId, highestBidder, highestBid);

        // Trả lại tiền cho người đặt giá cao nhất nếu còn dư
        if (highestBid > 0) {
            payable(owner()).transfer(highestBid);
        }
    }
}
