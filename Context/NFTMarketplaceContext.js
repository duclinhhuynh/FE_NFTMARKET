import React, { useEffect, useState, useCallback } from "react";

import Web3Modal from "web3modal";
import { ethers } from "ethers";

import { useRouter } from "next/router";
import axios from "axios";
const dotenv = require("dotenv");
dotenv.config();
const api_key = process.env.NEXT_PUBLIC_API_PINATA;
const api_serect = process.env.NEXT_PUBLIC_API_SECRET_PINATA;
const pinata_JWT = process.env.NEXT_PUBLIC_PINATA_JWT;
//INTERNAL IMPORT
import {
  NFTMarketplaceAddress,
  NFTMarketplaceABI,
  TransferFundsAddress,
  TransferFundsABI,
  NftAuctionAddress,
  NftAuctionABI,
} from "./Constants";

//Fetching smart contract
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
    signerOrProvider
  );

// ---Connecting width smart contract

const connectingWithSmartContract = async () => {
  try {
    const web3ModalInstance = new Web3Modal();
    const connection = await web3ModalInstance.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer); // Assuming fetchContract is defined elsewhere
    return contract;
  } catch (error) {
    console.log(
      "Something went wrong while connecting with smart contract:",
      error
    );
  }
};
const fetchTransferFundsContract = (signerOrProvider) =>
  new ethers.Contract(TransferFundsAddress, TransferFundsABI, signerOrProvider);
// transferfunds
const connectToTransferFunds = async () => {
  try {
    const web3ModalInstance = new Web3Modal();
    const connection = await web3ModalInstance.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchTransferFundsContract(signer); // Assuming fetchContract is defined elsewhere
    return contract;
  } catch (error) {
    console.log(
      "Something went wrong while connecting with smart contract:",
      error
    );
  }
};

// auction
const fetchNftAuctionContract = (signerOrProvider) =>
  new ethers.Contract(NftAuctionAddress, NftAuctionABI, signerOrProvider);
const connectToNftAuction = async () => {
  try {
    const web3ModalInstance = new Web3Modal();
    const connection = await web3ModalInstance.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchNftAuctionContract(signer);
    return contract;
  } catch (error) {
    console.log(
      "Something went wrong while connecting with NftAuction contract:",
      error
    );
  }
};

export const NFTMarketplaceContext = React.createContext();
export const NFTMarketplaceProvider = ({ children }) => {
  const titleData = "Discover, collect, and sell NFTS ";
  // --USESTAT
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [allOffers, setAllOffers] = useState([]);
  // TRANSFER FUNDs
  const [transactionCount, setTransactionCount] = useState("");
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ==USESTATE
  const checkIfWalletConnected = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const getBalance = await provider.getBalance(accounts[0]);
      const bal = ethers.utils.formatEther(getBalance);
      // console.log("api key", api_key ,api_serect, pinata_JWT);
      setAccountBalance(bal);
    } catch (error) {
      console.log("check if wallet connect error", error);
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);
  // connect wallet function
  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log("connectWallet error", error);
    }
  };

  // upload to ipfs function
  const uploadFileToIPFS = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: api_key,
          pinata_secret_key: api_serect,
          Authorization: `Bearer ${pinata_JWT}`,
          // Set appropriate Content-Type header for FormData
          "Content-Type": "multipart/form-data",
        },
      });

      const imgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
      return imgHash;
    } catch (error) {
      console.error("Error while uploading to IPFS:", error);
      throw error;
    }
  };

  const uploadJSONToPinata = async (data) => {
    try {
      const resFile = await axios({
        method: "POST",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: JSON.stringify(data),
        headers: {
          pinata_api_key: api_key,
          pinata_secret_key: api_serect,
          Authorization: `Bearer ${pinata_JWT}`,
        },
      });
  
      const ipfsHash = resFile.data.IpfsHash;
      const imgHash = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
      return imgHash;
    } catch (error) {
      console.error("Error while uploading to Pinata:", error);
      throw new Error("Failed to upload to Pinata");
    }
  };

  // createNFT function
  const createNFT = async (name, price, imageurl, description, category, router) => {
    if (!category || !name || !description || !price || !imageurl) {
      console.log("Data Is Missing");
      setError("Data Is Missing");
      setOpenError(true);
      return;
    }
  
    const data = { name, description, imageurl, category };
    console.log("Data to upload:", data);
  
    try {
      const imgHash = await uploadJSONToPinata(data);
      console.log("img hash create", imgHash);
      await createSale(imgHash, price);
      router.push("/NFTPage");
    } catch (error) {
      setError("Error while creating NFT");
      setOpenError(true);
    }
  };

  // createSale function
  const createSale = async (url, formInputPrice, isReselling, id) => {
    try {
      const ethers = require("ethers");
      // Kiểm tra và phân tích giá từ form
      const price = ethers.utils.parseUnits(formInputPrice, "ether");

      // Kết nối với hợp đồng thông minh
      const contract = await connectingWithSmartContract();

      // Lấy giá niêm yết từ hợp đồng
      const listingPrice = await contract.getListingPrice();

      // Tạo giao dịch tương ứng với trường hợp đang bán lại hay tạo mới
      let transaction;
      if (isReselling) {
        transaction = await contract.resellToken(id, price, {
          value: listingPrice.toString(),
        });
      } else {
        transaction = await contract.createToken(url, price, {
          value: listingPrice.toString(),
        });
      }

      // Chờ giao dịch được xác nhận
      console.log("Transaction submitted", transaction);
      await transaction.wait();

      // Đăng nhập giao dịch thành công
      console.log("Transaction confirmed", transaction);
    } catch (error) {
      // Xử lý lỗi và hiển thị thông báo lỗi
      console.error("Error while creating sale", error);
      setError("Error while creating sale: " + error.message);
      setOpenError(true);
    }
  };

  // --FETCH nft functino
  const fetchNFTS = async () => {
    try {
      const contract = await connectingWithSmartContract();
      const data = await contract.fetchMarketItem(); // Correct method name
      const items = await Promise.all(
        data.map(async ({ tokenId, seller, owner, price: unfomattedPrice }) => {
          const tokenURI = await contract.tokenURI(tokenId);
          try {
            const response = await fetch(tokenURI);
            const data = await response.json();
            const jsonDataString = Object.keys(data)[0];
            const jsonData = JSON.parse(jsonDataString);
            // Extract name, description, and imageurl from the parsed JSON object
            const name = jsonData.hasOwnProperty("name")
              ? jsonData.name
              : "Name not available";
            const description = jsonData.hasOwnProperty("description")
              ? jsonData.description
              : "Description not available";
            const imageurl = jsonData.hasOwnProperty("imageurl")
              ? jsonData.imageurl
              : "Image URL not available";
            const category = jsonData.hasOwnProperty("category")
              ? jsonData.category
              : "Name not available";
            const price = ethers.utils.formatUnits(
              unfomattedPrice.toString(),
              "ether"
            );
            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              name,
              description,
              category,
              imageurl,
              tokenURI,
            };
          } catch (error) {
            setError("Error fetching tokenURI data:");
            setOpenError(true);
          }
        })
      );
      return items;
    } catch (error) {
      // setError("Error fetching data");
      // setOpenError(true);
    }
  };

  useEffect(() => {
    fetchNFTS();
  }, []);

  // FETCHING MY NFT OR LISTED NFTS
  const fetchMyNFTsOrListedNFTs = async (type) => {
    try {
      const contract = await connectingWithSmartContract();
      let data;
      if (type == "fetchItemsListed") {
        data = await contract.fetchItemsListed();
      } else data = await contract.fetchMyNFTs();
      // contract.fetchMyNFTs()
      const items = await Promise.all(
        data.map(async ({ tokenId, seller, owner, price: unfomattedPrice }) => {
          const tokenURI = await contract.tokenURI(tokenId);
          try {
            const response = await fetch(tokenURI);
            // console.log("respon", response);
            const data = await response.json();
            // console.log("data",data)
            const jsonDataString = Object.keys(data)[0];
            const jsonData = JSON.parse(jsonDataString);
            // Extract name, description, and imageurl from the parsed JSON object
            const category = jsonData.hasOwnProperty("category")
              ? jsonData.category
              : "Category not available";
            const name = jsonData.hasOwnProperty("name")
              ? jsonData.name
              : "Name not available";
            const description = jsonData.hasOwnProperty("description")
              ? jsonData.description
              : "Description not available";
            const imageurl = jsonData.hasOwnProperty("imageurl")
              ? jsonData.imageurl
              : "Image URL not available";
            console.log("name", name);
            const price = ethers.utils.formatUnits(
              unfomattedPrice.toString(),
              "ether"
            );
            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              imageurl,
              category,
              name,
              description,
              tokenURI,
            };
          } catch (error) {
            console.error("Error fetching tokenURI data:", error);
            throw error;
          }
        })
      );
      return items;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyNFTsOrListedNFTs();
  }, []);
  // BUY NFTs FUNCTION
  const buyNFT = async (nft) => {
    try {
      const contract = await connectingWithSmartContract();
      const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
      console.log("nftid", nft.tokenId);
      const transaction = await contract.createMarketSale(nft.tokenId, {
        value: price,
      });
      await transaction.wait();
      router.push("/author");
    } catch (error) {
      setError("Error while buying NFT");
      throw error;
    }
  };
  // Make offer function
  const makeOffer = async (nft, price, desiredTimestamp) => {
    try {
      const contract = await connectingWithSmartContract();
      const formattedPrice = ethers.utils.parseUnits(price.toString(), "ether");

      // Chuyển desiredTimestamp thành Unix timestamp
      const unixTimestamp = Math.floor(
        new Date(desiredTimestamp).getTime() / 1000
      );

      // Gọi hàm makeOffer từ smart contract và truyền value vào transaction
      console.log("unixTimestamp", unixTimestamp);
      const transaction = await contract.makeOffer(
        nft.tokenId,
        formattedPrice,
        unixTimestamp,
        {
          value: formattedPrice,
        }
      );
      await transaction.wait();
      console.log("Offer made successfully");
    } catch (error) {
      setError("Error making offer");
      console.error("Error making offer:", error);
      throw error;
    }
  };

  // unMake offer function
  const unMakeOffer = async (nft) => {
    try {
      const contract = await connectingWithSmartContract();
      const transaction = await contract.unmakeOffer(nft.tokenId);
      await transaction.wait();
      console.log("Offer canceled successfully");
      // Xử lý sau khi hủy giá thành công (nếu cần)
    } catch (error) {
      console.error("Error canceling offer:", error);
      throw error; // Ném lại lỗi để bắt ở nơi gọi hàm unMakeOffer
    }
  };
  const acceptOffer = async (nft) => {
    try {
      const contract = await connectingWithSmartContract();
      const transaction = await contract.acceptOffer(nft.tokenId);
      await transaction.wait();
      router.push("/author")
      console.log("Offer acceptOffer successfully");
    } catch (error) {
      console.error("Error canceling offer:", error);
      throw error;
    }
  };
  // Fetch all offers
  const fetchOffers = useCallback(async (tokenId) => {
    try {
      const contract = await connectingWithSmartContract();
      const offers = await contract.getOffers(tokenId);
      const formattedOffers = offers.map((offer) => ({
        bidder: offer.bidder,
        price: ethers.utils.formatUnits(offer.price.toString(), "ether"),
        active: offer.active,
        timestamp: new Date(offer.timestamp * 1000).toISOString(),
      }));
      console.log(formattedOffers);
      setAllOffers(formattedOffers);

      return formattedOffers;
    } catch (error) {
      console.error("Error fetching offers:", error);
      return [];
    }
  }, []);
  // cancelMarketItem
  const cancelMarketItem = async (nft) => {
    try {
      const contract = await connectingWithSmartContract();
      const transaction = await contract.cancelMarketItem(nft.tokenId);
      await transaction.wait();
      router.push("/author");
    } catch (error) {
      setError("Error while unlisting token");
      console.log("Error while unlisting token", error);
      throw error;
    }
  };
  // TRANSFER FUNDs
  const transferEther = async (address, ether, message) => {
    console.log("adress", address, ether, message);
    try {
      if (currentAccount) {
        const contract = await connectToTransferFunds();
        const unfomattedPrice = ethers.utils.parseEther(ether);
        await ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: currentAccount,
              to: address,
              gas: "",
              value: unfomattedPrice._hex,
            },
          ],
        });
        const transaction = await contract.addDataToBlockChain(
          address,
          unfomattedPrice,
          message
        );
        setLoading(true);
        transaction.wait();
        setLoading(false);
        // number of transaction happened
        const transactionCount = await contract.getTransactionCount();
        setTransactionCount(transactionCount.toNumber());
        window.location.reload();
      } else {
        console.log("On etherum");
      }
    } catch (error) {
      console.log("have a eroor transfer", error);
    }
  };

  // fetch all transaction
  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const contract = await connectToTransferFunds();
        const availableTransaction = await contract.getAllTransaction();
        console.log("avaible", availableTransaction);
        const readTransaction = availableTransaction.map((transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(
            transaction.timestamps.toNumber() * 1000
          ).toLocaleDateString(),
          message: transaction.message,
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        }));
        console.log("read Transaction", readTransaction);
        setTransaction(readTransaction);
      }
    } catch (error) {
      console.log("getAlltransaction", error);
    }
  };

  // Auction functions
  const createAuction = async (
    nftAddress,
    nftId,
    startingPrice,
    discountRate
  ) => {
    try {
      const contract = await connectToNftAuction();
      const price = ethers.utils.parseEther(startingPrice);
      const discount = ethers.utils.parseEther(discountRate);
      const transaction = await contract.createAuction(
        nftAddress,
        nftId,
        price,
        discount
      );
      await transaction.wait();
      console.log("Auction created successfully");
    } catch (error) {
      console.error("Error creating auction:", error);
      setError("Error creating auction");
      setOpenError(true);
    }
  };

  const placeBid = async (auctionId, bidAmount) => {
    try {
      const contract = await connectToNftAuction();
      const bid = ethers.utils.parseEther(bidAmount);
      const transaction = await contract.placeBid(auctionId, { value: bid });
      await transaction.wait();
      console.log("Bid placed successfully");
    } catch (error) {
      console.error("Error placing bid:", error);
      setError("Error placing bid");
      setOpenError(true);
    }
  };

  const endAuction = async (auctionId) => {
    try {
      const contract = await connectToNftAuction();
      const transaction = await contract.endAuction(auctionId);
      await transaction.wait();
      console.log("Auction ended successfully");
    } catch (error) {
      console.error("Error ending auction:", error);
      setError("Error ending auction");
      setOpenError(true);
    }
  };

  return (
    <NFTMarketplaceContext.Provider
      value={{
        titleData,
        // checkContract
        checkIfWalletConnected,
        connectWallet,
        uploadFileToIPFS,
        uploadJSONToPinata,
        createNFT,
        fetchNFTS,
        fetchMyNFTsOrListedNFTs,
        buyNFT,
        createSale,
        currentAccount,
        setError,
        error,
        openError,
        setOpenError,
        transferEther,
        accountBalance,
        transactionCount,
        transaction,
        loading,
        getAllTransactions,
        createAuction,
        placeBid,
        endAuction,
        cancelMarketItem,
        makeOffer,
        unMakeOffer,
        fetchOffers,
        allOffers,
        acceptOffer,
      }}
    >
      {children}
    </NFTMarketplaceContext.Provider>
  );
};

export default NFTMarketplaceContext;
