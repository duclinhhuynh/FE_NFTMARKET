// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./NFTMarketplace.sol";

contract NFTAuction is ReentrancyGuard {
    using SafeMath for uint256;

    struct Offer {
        address payable bidder;
        uint256 price;
        uint256 timestamp;
        bool active;
    }

    mapping(uint256 => Offer[]) public tokenIdToOffers;
    NFTMarketplace private nftMarketplaceContract;
    event OfferMade(
        uint256 indexed tokenId,
        address bidder,
        uint256 price,
        uint256 timestamp
    );
    event OfferCanceled(uint256 indexed tokenId, address bidder);
    event OfferAccepted(uint256 indexed tokenId, address bidder, uint256 price);

    function makeOffer(
        uint256 tokenId,
        uint256 price,
        uint256 timestamp
    ) external payable nonReentrant {
        require(msg.value == price, "Ether sent must equal the offer price");
        _cancelExpiredOffers(tokenId);
        Offer memory newOffer = Offer({
            bidder: payable(msg.sender),
            price: price,
            timestamp: timestamp,
            active: true
        });

        tokenIdToOffers[tokenId].push(newOffer);

        emit OfferMade(tokenId, msg.sender, price, timestamp);
    }

    function unmakeOffer(uint256 tokenId) external nonReentrant {
        Offer[] storage offers = tokenIdToOffers[tokenId];
        bool found = false;

        for (uint256 i = 0; i < offers.length; i++) {
            Offer storage offer = offers[i];
            if (offer.bidder == msg.sender && offer.active) {
                offer.active = false;
                offer.bidder.transfer(offer.price);
                emit OfferCanceled(tokenId, msg.sender);
                found = true;
                break;
            }
        }

        require(found, "No active offer found for caller");
    }

    function acceptOffer(uint256 tokenId) external nonReentrant {
        Offer[] storage offers = tokenIdToOffers[tokenId];
        require(offers.length > 0, "No offers available");
        _cancelExpiredOffers(tokenId);
        uint256 highestOfferIndex = 0;
        uint256 highestPrice = 0;
        for (uint256 i = 0; i < offers.length; i++) {
            if (offers[i].active && offers[i].price > highestPrice) {
                highestPrice = offers[i].price;
                highestOfferIndex = i;
            }
        }
        Offer storage highestOffer = offers[highestOfferIndex];
        require(highestOffer.active, "Highest offer is not active");
        require(
            highestOffer.bidder != address(0),
            "Highest offer bidder is zero address"
        );

        highestOffer.active = false;

        for (uint256 i = 0; i < offers.length; i++) {
            if (i != highestOfferIndex && offers[i].active) {
                offers[i].active = false;
                offers[i].bidder.transfer(offers[i].price);
            }
        }

        emit OfferAccepted(tokenId, highestOffer.bidder, highestOffer.price);
    }

    function handleFundTransfer(
        address payable seller,
        uint256 highestPrice
    ) external nonReentrant {
        // Transfer funds to the seller
        (bool success, ) = seller.call{value: highestPrice}("");
        require(success, "Transfer to seller failed");
    }

    function getHighestBidder(
        uint256 tokenId
    ) external view returns (address, uint256) {
        Offer[] storage offers = tokenIdToOffers[tokenId];
        uint256 highestPrice = 0;
        address highestBidder = address(0);
        for (uint256 i = 0; i < offers.length; i++) {
            if (offers[i].active && offers[i].price > highestPrice) {
                highestPrice = offers[i].price;
                highestBidder = offers[i].bidder;
            }
        }

        return (highestBidder, highestPrice);
    }

    function getOffers(uint256 tokenId) public view returns (Offer[] memory) {
        return tokenIdToOffers[tokenId];
    }

    function cancelAllOffers(uint256 tokenId) external nonReentrant {
        Offer[] storage offers = tokenIdToOffers[tokenId];
        for (uint256 i = 0; i < offers.length; i++) {
            if (offers[i].active) {
                offers[i].active = false;
                offers[i].bidder.transfer(offers[i].price);
            }
        }
    }

    function _cancelExpiredOffers(uint256 tokenId) internal {
        Offer[] storage offers = tokenIdToOffers[tokenId];
        uint256 currentTime = block.timestamp;
        for (uint256 i = 0; i < offers.length; i++) {
            if (offers[i].active && offers[i].timestamp < currentTime) {
                offers[i].active = false;
                payable(offers[i].bidder).transfer(offers[i].price);
            }
        }
    }
}
