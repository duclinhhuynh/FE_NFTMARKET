import React, {useEffect, useState, useContext} from 'react'
import { useRouter } from 'next/router'
// INTERNAL IMPORT 
import {Buton, Category, Brand} from "../components/componentsindex" 
import NFTDetailsPage from "../components/NFTDetailsPage/NFTDetailsPage"

//import smart cotract data
const NFTDetails = () => {
  // const {currentAccount} = useContext(NFTMartketplaceContext);

  const [nft, setNfts] = useState({
    imageurl : "",
    tokenId: "" ,
    name: "",
    owner: "",
    price: "",
    seller: "",
  });

  const router = useRouter();
  useEffect(() => {
    if(!router.isReady) return;
    console.log("router.query", router.query);
    setNfts(router.query)
  },[router.isReady]);
  return (
    <div>
        <NFTDetailsPage nft={nft}/>
    </div>
  )
}

export default NFTDetails