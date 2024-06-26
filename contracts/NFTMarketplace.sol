// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// INTERNAL IMPORT FOR NFT OPENZIPLINE
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    uint256 listingPrice = 0.000015 ether;
    address payable owner;

    mapping(uint256 => MarketItem) private idToMarketItem;
    mapping(uint256 => Offer[]) private tokenIdToOffers;

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
        bool canceled;
    }

    struct Offer {
        address bidder;
        uint256 price;
        bool active;
    }

    event MarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold,
        bool canceled
    );

    // Constructor
    constructor() ERC721("Metaverse Tokens", "METT") {
        owner = payable(msg.sender);
    }

    function updateListingPrice(uint256 _listingPrice) public payable {
        require(
            owner == msg.sender,
            "Only marketplace owner can update listing price."
        );
        listingPrice = _listingPrice;
    }

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function createToken(
        string memory tokenURI,
        uint256 price
    ) public payable returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        createMarketItem(newTokenId, price);
        return newTokenId;
    }

    function createMarketItem(uint256 tokenId, uint256 price) private {
        require(price > 0, "Price must be at least 1 wei");
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );
        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false,
            false
        );
        _transfer(msg.sender, address(this), tokenId);
        emit MarketItemCreated(
            tokenId,
            msg.sender,
            address(this),
            price,
            false,
            false
        );
    }

    function resellToken(uint256 tokenId, uint256 price) public payable {
        require(
            idToMarketItem[tokenId].owner == msg.sender,
            "Only item owner can perform this operation"
        );
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );
        idToMarketItem[tokenId].sold = false;
        idToMarketItem[tokenId].canceled = false;
        idToMarketItem[tokenId].price = price;
        idToMarketItem[tokenId].seller = payable(msg.sender);
        idToMarketItem[tokenId].owner = payable(address(this));
        _itemsSold.decrement();
        _transfer(msg.sender, address(this), tokenId);
    }

    function createMarketSale(uint256 tokenId) public payable {
        uint256 price = idToMarketItem[tokenId].price;
        address payable seller = idToMarketItem[tokenId].seller;
        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase"
        );
        idToMarketItem[tokenId].owner = payable(msg.sender);
        idToMarketItem[tokenId].sold = true;
        _itemsSold.increment();
        _transfer(address(this), msg.sender, tokenId);
        payable(owner).transfer(listingPrice);
        seller.transfer(msg.value);
        idToMarketItem[tokenId].seller = payable(address(0));
    }

    function cancelMarketItem(uint256 tokenId) public {
        MarketItem storage item = idToMarketItem[tokenId];
        require(
            item.seller == msg.sender,
            "Only item seller can perform this operation"
        );
        require(item.sold == false, "Cannot cancel a sold item");
        item.owner = payable(msg.sender);
        item.seller = payable(address(0));
        item.sold = false;
        item.canceled = true;
        _transfer(address(this), msg.sender, tokenId);
    }

    function fetchMarketItem() public view returns (MarketItem[] memory) {
        uint256 itemCount = _tokenIds.current();
        uint256 unsoldItemCount = 0;
        uint256 currentIndex = 0;
        for (uint256 i = 0; i < itemCount; i++) {
            if (
                idToMarketItem[i + 1].owner == address(this) &&
                !idToMarketItem[i + 1].canceled
            ) {
                unsoldItemCount += 1;
            }
        }
        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (
                idToMarketItem[i + 1].owner == address(this) &&
                !idToMarketItem[i + 1].canceled
            ) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchItemsListed() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function makeOffer(uint256 tokenId, uint256 price) public payable {
        require(
            idToMarketItem[tokenId].owner != msg.sender,
            "Owner cannot make offer on their own item"
        );
        require(
            idToMarketItem[tokenId].sold == false,
            "Cannot make offer on a sold item"
        );
        require(
            idToMarketItem[tokenId].canceled == false,
            "Cannot make offer on a canceled item"
        );
        require(
            msg.value == price,
            "Offer price must be equal to the value sent"
        );
        require(price > 0, "Offer price must be greater than 0");

        tokenIdToOffers[tokenId].push(
            Offer({bidder: msg.sender, price: price, active: true})
        );
    }

    function unmakeOffer(uint256 tokenId) public {
        Offer[] storage offers = tokenIdToOffers[tokenId];
        for (uint256 i = 0; i < offers.length; i++) {
            if (offers[i].bidder == msg.sender && offers[i].active) {
                offers[i].active = false;
                payable(msg.sender).transfer(offers[i].price);
                break; 
            }
        }
    }

    function getOffers(uint256 tokenId) public view returns (Offer[] memory) {
        return tokenIdToOffers[tokenId];
    }
}
