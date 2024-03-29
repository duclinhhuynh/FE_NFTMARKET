import React , {useEffect, useState, useContext} from "react";

import Web3Modal from 'web3modal';
import {ethers} from 'ethers'
import { useRouter } from "next/router";
import axios from "axios";

const api_key  = 'ceac63b9defd3ff2e5ec'

const api_serect = '2442f9cbc26fbae2473c1a2d57d7915e5ab54290e80915523bd72d6c5f88b1bc'

const pinata_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4MjY1YzcyNC0zYzFjLTQyOWMtYTJhNS0yZjM1ZmM3NjRhZmUiLCJlbWFpbCI6ImxpbmgxODYyMDAyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJjZWFjNjNiOWRlZmQzZmYyZTVlYyIsInNjb3BlZEtleVNlY3JldCI6IjI0NDJmOWNiYzI2ZmJhZTI0NzNjMWEyZDU3ZDc5MTVlNWFiNTQyOTBlODA5MTU1MjNiZDcyZDZjNWY4OGIxYmMiLCJpYXQiOjE3MTE1MDAxMzl9.7IXPHi0dYCu_-ZGKn8-HLZlPfvHKou5KJ9H0qARV9Jo'
//INTERNAL IMPORT
import { NFTMarketplaceAddress, NFTMarketplaceABI } from "./Constants";
import path from "path";

//Fetching smart contract
const fetchContract = (signerOrProvider) => 
    new ethers.Contract(
        NFTMarketplaceAddress,
        NFTMarketplaceABI,
        signerOrProvider
    )


    // ---Connecting width smart contract

    const connectingWithSmartContract = async () => {
        try {
            const web3ModalInstance = new Web3Modal();
            const connection = await web3ModalInstance.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            
            if (!provider) {
                throw new Error("Web3 provider is undefined.");
            }
            
            const signer = provider.getSigner();
            const contract = fetchContract(signer); // Assuming fetchContract is defined elsewhere
            return contract;
        } catch (error) {
            console.log("Something went wrong while connecting with smart contract:", error);
            throw error;
        }
    };
export const NFTMarketplaceContext = React.createContext();
export const NFTMarketplaceProvider = ({children}) => {
    const titleData = "Discover, collect, and sell NFTS "

    // const checkContract = async() => {
    //     const contract = await connectingWithSmartContract();
    //     console.log("hell:", contract)
    // }
    const [currentAccount, setCurrentAccount] = useState("")
    // check if wallet is connected

    // ==USESTATE
    const router = useRouter ();
    const checkIfWalletConnected = async() => {
        try {
            if(!window.ethereum) console.log("Install MetaMark");
            const accounts = await window.ethereum.request({method: "eth_accounts"});
            if(accounts.length){
                setCurrentAccount(accounts[0]);
            }else{
                console.log("No Account");
            }
            console.log(currentAccount);
        } catch (error) {
            console.log("something wring while connecting with smart contract")
        }
    }

    useEffect(() => {
        checkIfWalletConnected();
    },[]);
    // connect wallet function
    const connectWallet = async()=> {
        try {
            if(!window.ethereum) console.log("Install MetaMark");
            const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
            setCurrentAccount(accounts[0]);
            window.location.reload();
        } catch (error) {
            console.log("Error while connecting");
        }
    }

    // upload to ipfs function
 
        // upload to ipfs function
        const uploadToIPFS = async (file) => {
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
                console.log("imgHash", imgHash);
                return imgHash;
            } catch (error) {
                console.error("Error while uploading to IPFS:", error);
                throw error;
            }
        };
        
        // createNFT function 
        const createNFT = async (name, price, imageurl, description, router) => {
            if (!name || !description || !price || !imageurl) {
              console.log("Data Is Missing");
              return;
            }
            const data = JSON.stringify({ name, description,imageurl});
            console.log("data", data);
            try {
              const resFile = await axios({
                method: "POST",
                url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
                data: data,
                headers: {
                  pinata_api_key: api_key,
                  pinata_secret_key: api_serect,
                //   "Content-Type": `application/json`,
                  Authorization: `Bearer ${pinata_JWT}`,
                },
              });
              console.log("iphashres",resFile.data.IpfsHash);
              // Upload image file to Pinata IPFS
              const imgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
              console.log(imgHash);
              await createSale(imgHash, price);
            } catch (error) {
              console.log("Error while creating NFT:", error);
            }
          };
    
        
        
        // createSale function
       const createSale = async (url, formInputPrice, isReselling, id) => {
            try {
                const ethers = require("ethers");
                console.log("url sale", url, formInputPrice, isReselling, id);
                const price = ethers.utils.parseUnits(formInputPrice, "ether");
                const contract = await connectingWithSmartContract();

                const listingPrice = await contract.getListingPrice();

                const transaction = !isReselling
                    ? await contract.createToken(url, price, { value: listingPrice.toString() })
                    : await contract.reSellToken(url, price, { value: listingPrice.toString() });

                await transaction.wait();
                router.push('/searchPage');
            } catch (error) {
                console.error("Error while creating sale:", error);
                // Handle the error here, you can throw it again if needed
                throw error;
            }
        };
 
         // --FETCH nft functino 
         const fetchNFTS = async () => {
            try {
                const contract = await connectingWithSmartContract();
                console.log("contract", contract);
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
                            const name = jsonData.hasOwnProperty('name') ? jsonData.name : 'Name not available';
                            const description = jsonData.hasOwnProperty('description') ? jsonData.description : 'Description not available';
                            const imageurl = jsonData.hasOwnProperty('imageurl') ? jsonData.imageurl : 'Image URL not available';
        
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
                                imageurl,
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
                console.error("Error fetching NFTs:", error);
                throw error;
            }
        };
        
        
        useEffect(()=> {
            fetchNFTS();
        },[])
        
        // FETCHING MY NFT OR LISTED NFTS
        const fetchMyNFTsOrListedNFTs = async(type) => {
            try {
                const contract = await connectingWithSmartContract();
                const data = type == "fetchItemsListed"
                ? await contract.fetchItemsListed() 
                : await contract.fetchMyNFT();
                console.log("mynft",contract.fetchItemsListed());
                const items = await Promise.all (
                    data.map(async ({tokenId, seller, owner, price: unfomattedPrice})=> {
                        const tokenURI = await contract.tokenURI(tokenId);
                        try{
                            const response = await fetch(tokenURI);
                            // console.log("respon", response);
                            const data = await response.json();
                            // console.log("data",data)
                            const jsonDataString = Object.keys(data)[0];
                            const jsonData = JSON.parse(jsonDataString);
                            // Extract name, description, and imageurl from the parsed JSON object
                            const name = jsonData.hasOwnProperty('name') ? jsonData.name : 'Name not available';
                            const description = jsonData.hasOwnProperty('description') ? jsonData.description : 'Description not available';
                            const imageurl = jsonData.hasOwnProperty('imageurl') ? jsonData.imageurl : 'Image URL not available';
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
                                name,
                                description,
                                tokenURI,
                            }
                        }catch (error){
                            console.error("Error fetching tokenURI data:", error);
                            throw error;
                        }
                    })
                );
                return items;
            } catch (error) {
                console.log(error)
            };
        }

        useEffect(() => {
            fetchMyNFTsOrListedNFTs();
        },[]);
         // BUY NFTs FUNCTION 
        const buyNFT = async (nft) => {
            try {
                const contract = await connectingWithSmartContract();
                const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

                const transaction = await contract.createMarketSale(nft.tokenId, {
                    value: price,
                });
                await transaction.wait();
                router.push("/author");
            } catch (error) {
                console.log("error while buying nft")
            }
        }
    return(
        <NFTMarketplaceContext.Provider value={
            {titleData,
                // checkContract
                checkIfWalletConnected,
                connectWallet,
                uploadToIPFS,
                createNFT,
                fetchNFTS,
                fetchMyNFTsOrListedNFTs,
                buyNFT,
                currentAccount,
            
            }}>
            {children}
        </NFTMarketplaceContext.Provider>
    )
}


export default NFTMarketplaceContext
