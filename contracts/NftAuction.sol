// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
// import "./NFTMarketplace.sol";

// contract NFTAuction is NFTMarketplace {
//     using Counters for Counters.Counter;

//     NFTMarketplace private marketplace;

//     mapping(uint256 => Offer[]) public tokenIdToOffers;
//     mapping(uint256 => NFTMarketplace.MarketItem) private idToMarketItem;

//     struct Offer {
//         address bidder;
//         uint256 price;
//         uint256 timestamp;
//         bool active;
//     }

//     constructor(address _marketplaceAddress) {
//         marketplace = NFTMarketplace(_marketplaceAddress);
//     }

//     function makeOffer(
//         uint256 tokenId,
//         uint256 price,
//         uint256 desiredTimestamp
//     ) public payable nonReentrant {
//         require(
//             idToMarketItem[tokenId].owner != msg.sender,
//             "Owner cannot make offer on their own item"
//         );
//         require(
//             idToMarketItem[tokenId].sold == false,
//             "Cannot make offer on a sold item"
//         );
//         require(
//             idToMarketItem[tokenId].canceled == false,
//             "Cannot make offer on a canceled item"
//         );
//         require(
//             msg.value == price && price > 0,
//             "Offer price must be greater than 0 and equal to the value sent"
//         );

//         // Cancel expired offers
//         _cancelExpiredOffers(tokenId);

//         // Add offer to the list with desiredTimestamp
//         tokenIdToOffers[tokenId].push(
//             Offer({
//                 bidder: msg.sender,
//                 price: price,
//                 timestamp: desiredTimestamp,
//                 active: true
//             })
//         );
//     }

//     function unmakeOffer(uint256 tokenId) public nonReentrant {
//         Offer[] storage offers = tokenIdToOffers[tokenId];
//         for (uint256 i = 0; i < offers.length; i++) {
//             if (offers[i].bidder == msg.sender && offers[i].active) {
//                 offers[i].active = false;
//                 payable(msg.sender).transfer(offers[i].price);
//                 break;
//             }
//         }
//     }

//     // chấp nhận trả cho offer cao nhất
//     function acceptOffer(uint256 tokenId) public nonReentrant {
//         Offer[] storage offers = tokenIdToOffers[tokenId];
//         // require(
//         //     idToMarketItem[tokenId].seller == msg.sender,
//         //     "Only item owner can accept an offer"
//         // );

//         // Kiểm tra và hủy các offer hết hạn
//         _cancelExpiredOffers(tokenId);

//         uint256 highestOfferPrice = 0;
//         address highestOfferBidder;
//         uint256 highestOfferIndex = 0;
//         // Tìm offer cao nhất
//         for (uint256 i = 0; i < offers.length; i++) {
//             if (offers[i].active && offers[i].price > highestOfferPrice) {
//                 highestOfferPrice = offers[i].price;
//                 highestOfferBidder = offers[i].bidder;
//                 highestOfferIndex = i;
//             }
//         }

//         // Chấp nhận offer cao nhất
//         idToMarketItem[tokenId].owner = payable(highestOfferBidder);
//         idToMarketItem[tokenId].sold = true;
//         _itemsSold.increment();
//         _transfer(address(this), highestOfferBidder, tokenId);

//         // Chuyển tiền cho seller
//         idToMarketItem[tokenId].seller.transfer(highestOfferPrice);
//         // đặt địa chỉ để nó không nằm trên chợ nữa
//         idToMarketItem[tokenId].seller = payable(address(0));
//         // Hủy các offer còn lại
//         for (uint256 i = 0; i < offers.length; i++) {
//             if (i == highestOfferIndex && offers[i].active) {
//                 offers[i].active = false;
//             }
//             // chỉ trả cho những offer khác ngoại trừ offer cao nhất
//             else if (i != highestOfferIndex && offers[i].active) {
//                 offers[i].active = false;
//                 payable(offers[i].bidder).transfer(offers[i].price);
//             }
//         }
//     }

//     function getOffers(uint256 tokenId) public view returns (Offer[] memory) {
//         return tokenIdToOffers[tokenId];
//     }

//     function _cancelExpiredOffers(uint256 tokenId) internal {
//         Offer[] storage offers = tokenIdToOffers[tokenId];
//         uint256 currentTime = block.timestamp;
//         for (uint256 i = 0; i < offers.length; i++) {
//             if (offers[i].active && offers[i].timestamp < currentTime) {
//                 offers[i].active = false;
//                 payable(offers[i].bidder).transfer(offers[i].price);
//             }
//         }
//     }
// }
