// // SPDX-License-Identifier: MIT
// pragma solidity >=0.4.22 <0.9.0;

// // INTERNAL IMPORT FOR NFT OPENZIPLINE 
// import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
// import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
// import "@openzeppelin/contracts/utils/math/SafeMath.sol";
// import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";

// contract HeroNFTMarketplace is ERC721Receiver, Ownable {
//     using SafeERC20 for IERC20;
//     IERC721Enumerable private nft;
//     IERC20 private token;

//     struct ListDetail {
//         address payable author;
//         uint256 price;
//         uint256 token Id;
//     }
//     event ListNFT(address indexed _from, uint256 _tokenId, uint256 _price);
//     event UnlistNFT(address)
// }