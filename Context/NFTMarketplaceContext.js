import React , {useEffect, useState, useContext} from "react";

import web3Modal from 'web3modal';
import {ethers} from 'ethers'
import Router from "next/router"
import axios from "axios";
import {create as ipfsHttpClient} from "ipfs-http-client"

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0")

//INTERNAL IMPORT
import { NFTMarketplaceAddress, NFTMarketplaceABI } from "./Constants";
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
            const web3ModalInstance = new web3Modal();
            const connection = await web3ModalInstance.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            if (!provider) {
                throw new Error("Web3 provider is undefined.");
            }
            const signer = provider.getSigner(); // Fix typo here
            const contract = fetchContract(signer);
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
    const uploadToIPFS = async(file) => {
        try {
            const added = client.add({content: file});
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            return url;
        } catch (error) {
            console.log("error with upload ipfs")
        }
    }
    
    // createNFT function 
    const createNFT = async(formInput, fileUrl, router) => {
        try {
            const [name, description, price] = formInput;
            if(!name || !description || !price || !fileUrl) return console.log("Data missing");

            const data = JSON.stringify({name, description, image: fileUrl});
            try {
                const added = await client.add(data);
                const url = `http:ipfs.infura.io/ipfs/${added.path}`
                await createSale(url, price);
            } catch (error) {
                
            }
        } catch (error) {
            console.log("Error while creating NFT")
        }
    }
    
    // createSale function
    const createSale = async(url, formInputPrice, isReselling, id) => {
        try {
            const price = ethers.utils.parseUnits(formInputPrice, "ether");
            const contract = await connectingWithSmartContract()
            const listingPrice = await contract.getListingPrice();
            
            const transaction = !isReselling 
                ? await contract.createToken(url, price,
                {value: listingPrice.toString()})
                : await contract.resellToken(url, price, {
                    value: listingPrice.toString()
                })
                await transaction.wait();
        } catch (error) {
            console.log("error while creating sale")
        }
    }

    // --FETCH nft functino 
    const fetchNFTS = async () => {
        try {
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const data = await contract.fetchMarketItem();

            const items = await Promise.add(
                data.map(
                    async({tokenId, seller, owner, price: unfomattedPrice})=>{
                    const tokenURI = await contract.tokenURI(tokenId)
                    const {
                        data: {image, name, description},
                    } = await axios.get(tokenURI);
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
                        tokenURI,
                    }
                }));
            return items;
        } catch (error) {
            
        }
    }
    
// FETCHING MY NFT OR LISTED NFTS
    const fetchMyNFTsOrListedNFTs = async(type) => {
        try {
            const contract = await connectingWithSmartContract();
            const data = type == "fetchItemsListed"
            ? await contract.fetchItemsListed() 
            : await contract.fetchNFTS();

            const items = await Promise.all (
                data.map(async ({tokenId, seller, owner, price: unfomattedPrice})=> {
                    const tokenURI = await contract.tokenURI(tokenId);
                    const {
                        data: {image, name, description},
                    } = await axios.get(tokenURI)
                    const price = ethers.utils.formatUnits(
                        unfomattedPrice.toString(), 
                        "ether"
                    );
                    return {
                        price,
                        tokenId: tokenId.toNumber(),
                        seller,
                        owner,
                        image,
                        name,
                        description,
                        tokenURI,
                    }
                })
            )
        } catch (error) {
            
        }
    }
// BUY NFTs FUNCTION 
const buyNFT = async (nft) => {
    try {
        const contract = await connectingWithSmartContract();
        const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

        const transaction = await contract.createMarketSale(nft.tokenId, {
            value: price,
        });
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