// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// INTERNAL IMPORT FOR NFT OPENZIPLINE
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./NFTAuction.sol";

contract NFTMarketplace is ERC721URIStorage, ReentrancyGuard {
    using Counters for Counters.Counter;
    using SafeMath for uint256;

    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    uint256 listingPrice = 0.000015 ether;
    address payable owner;

    mapping(uint256 => MarketItem) private idToMarketItem;
    NFTAuction private auctionContract;
    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
        bool canceled;
        uint256 timestamp;
    }
    event MarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold,
        bool canceled,
        uint256 timestamp
    );
    // Constructor
    constructor(
        address _auctionContractAddress
    ) ERC721("Metaverse Tokens", "METT") {
        owner = payable(msg.sender);
        auctionContract = NFTAuction(_auctionContractAddress);
    }

    function updateListingPrice(uint256 _listingPrice) public {
        listingPrice = _listingPrice;
    }

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function createToken(
        string memory tokenURI,
        uint256 price,
        uint256 timesAuctions
    ) public payable nonReentrant returns (uint256) {
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        createMarketItem(newTokenId, price, timesAuctions);
        return newTokenId;
    }

    function createMarketItem(
        uint256 tokenId,
        uint256 price,
        uint256 timesAuctions
    ) private {
        require(price > 0, "Price must be greater than 0");

        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false,
            false,
            timesAuctions
        );
        _transfer(msg.sender, address(this), tokenId);
        emit MarketItemCreated(
            tokenId,
            msg.sender,
            address(this),
            price,
            false,
            false,
            timesAuctions
        );
    }

    function resellToken(
        uint256 tokenId,
        uint256 price,
        uint256 timeActions
    ) public payable nonReentrant {
        require(
            idToMarketItem[tokenId].owner == msg.sender,
            "Only item owner can perform this operation"
        );
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );
        idToMarketItem[tokenId].timestamp = timeActions;
        idToMarketItem[tokenId].sold = false;
        idToMarketItem[tokenId].canceled = false;
        idToMarketItem[tokenId].price = price;
        idToMarketItem[tokenId].seller = payable(msg.sender);
        idToMarketItem[tokenId].owner = payable(address(this));
        if (_itemsSold.current() > 0) {
            _itemsSold.decrement();
        }
        _transfer(msg.sender, address(this), tokenId);
    }

    function createMarketSale(uint256 tokenId) public payable nonReentrant {
        cancelExpiredMarketItems();
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
        // Offer[] storage offers = tokenIdToOffers[tokenId];

        // for (uint256 i = 0; i < offers.length; i++) {
        //     if (offers[i].active) {
        //         offers[i].active = false;
        //         // trả lại tiền cho bọn họ
        //         payable(offers[i].bidder).transfer(offers[i].price);
        //     }
        // }
    }

    function cancelMarketItem(uint256 tokenId) public nonReentrant {
        MarketItem storage item = idToMarketItem[tokenId];
        require(
            item.seller == msg.sender,
            "Only item seller can perform this operation"
        );
        require(item.sold == false, "Cannot cancel a sold item");
        _itemsSold.increment();
        item.owner = item.seller;
        item.seller = payable(address(0));
        item.sold = false;
        item.canceled = true;

        _transfer(address(this), msg.sender, tokenId);
    }

    function fetchMarketItem() public view returns (MarketItem[] memory) {
        uint256 itemCount = _tokenIds.current();
        uint256 unsoldItemCount = 0;
        uint256 currentIndex = 0;
        MarketItem[] memory items;

        for (uint256 i = 0; i < itemCount; i++) {
            if (
                idToMarketItem[i + 1].owner == address(this) &&
                !idToMarketItem[i + 1].canceled
            ) {
                unsoldItemCount += 1;
            }
        }

        items = new MarketItem[](unsoldItemCount);

        for (uint256 i = 0; i < itemCount; i++) {
            if (
                idToMarketItem[i + 1].owner == address(this) &&
                !idToMarketItem[i + 1].canceled
            ) {
                uint256 currentId = i + 1;
                items[currentIndex] = idToMarketItem[currentId];
                currentIndex += 1;
            }
        }

        return items;
    }

    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;
        MarketItem[] memory items;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        items = new MarketItem[](itemCount);

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                items[currentIndex] = idToMarketItem[currentId];
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

    function transferNFT(uint256 tokenId, address to) public nonReentrant {
        require(
            idToMarketItem[tokenId].owner == msg.sender,
            "Only the owner of the NFT can transfer it"
        );
        require(to != address(0), "Cannot transfer to the zero address");
        _transfer(msg.sender, to, tokenId);

        // Update the market item owner if the NFT is listed in the marketplace
        if (idToMarketItem[tokenId].owner == msg.sender) {
            idToMarketItem[tokenId].owner = payable(to);
        }
    }

    function cancelExpiredMarketItems() public {
        uint256 itemCount = _tokenIds.current();
        for (uint256 i = 1; i <= itemCount; i++) {
            if (
                idToMarketItem[i].owner == address(this) &&
                !idToMarketItem[i].canceled
            ) {
                // Kiểm tra nếu thời gian đã hết hạn
                if (block.timestamp >= idToMarketItem[i].timestamp) {
                    // Hủy MarketItem và chuyển token về cho người bán
                    idToMarketItem[i].canceled = true;
                    _transfer(
                        address(this),
                        idToMarketItem[i].seller,
                        idToMarketItem[i].tokenId
                    );
                }
            }
        }
    }

    function acceptOffer(uint256 tokenId) external nonReentrant {
        MarketItem storage item = idToMarketItem[tokenId];
        require(
            item.seller == msg.sender,
            "Only item seller can accept offers"
        );
        (address highestBidder, uint256 highestPrice) = auctionContract
            .getHighestBidder(tokenId);

        auctionContract.acceptOffer(tokenId);

        require(highestBidder != address(0), "Highest bidder is zero address");
        // transfer nft for buyer
        _transfer(address(this), highestBidder, tokenId);
                // chuyển tiền cho người bán nft
        payable(item.seller).transfer(highestPrice);
        // set owner of nft is highestbidder
        item.owner = payable(highestBidder);
        item.sold = true;
        // set address of seller is 0 avoid error nft in your bag
        item.seller = payable(address(0));
        // increment your sold
        _itemsSold.increment();
    }
}
