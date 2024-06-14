import React, { useEffect, useState, useContext} from 'react'

// INTERNAL IMPORT 
import Style from '../styles/serachPage.module.css'
import {Slider, Brand, Loader} from '../components/componentsindex'
import { SearchBar } from '../components/searchPage/searchPageIndex'
import {Filter} from '../components/componentsindex'
import {NFTCardTwo, Banner} from "../components/collectionPage/collectionIndex"
import images from '../img';
//IMPORT SMART CONTRACT
import {NFTMarketplaceContext} from "../Context/NFTMarketplaceContext"
const searchPage = () => {
  const {fetchNFTS} = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftCopy, setNFTCoppy] = useState([]);
  
  useEffect(() => {
    fetchNFTS()
      .then((item) => {
        setNfts(item.reverse());
        setNFTCoppy(item);
        console.log(nfts);
      })
      .catch((error) => {
        console.error('Error fetching NFTs:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once

  // Log the updated nfts state
  useEffect(() => {
  }, [nfts]);

  const onHandleSearch = (value) => {
    const filteredNFTS = nfts.filter(({name}) => 
    name.toLowerCase().includes(value.toLowerCase()));

    if(filteredNFTS.length === 0) {
      setNfts(nftCopy);
    }else{
      setNfts(filteredNFTS);
    }
  }

  const onHandleSearchPrice = (value) => {
    const [minPrice, maxPrice] = value;
    const filteredNFTS = nftCopy.filter(({ price }) => 
      price >= minPrice && price <= maxPrice
    );
    setNfts(filteredNFTS);
  };



  const onClearSearch = () => {
    if (nfts.length && nftCopy.length) {
      setNfts(nftCopy);
    }
  };
    const collectionArray = [
        images.cartoon1,
        images.cartoon2,
        images.cartoon3,
        images.cartoon4,
        images.cartoon5,
        images.cartoon6,
    ];
  return (
    <div className={Style.searchPage}>
        <SearchBar 
          onHandleSearch={onHandleSearch}
          onClearSearch= {onClearSearch}
          onHandleSearchPrice = {onHandleSearchPrice}
        />
        <Filter/>
        {nfts.length == 0 ? <Loader/> : <NFTCardTwo NFTData={nfts}/> }  
        {/* <Slider/> */}
        <Brand/>
    </div>
  )
}

export default searchPage