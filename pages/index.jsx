import React, {useState,useEffect, useContext } from 'react';
import Style from '../styles/index.module.css';
import { HeroSection , Service, BigNFTSlider, Subscribe, Title, Category, Filter, NFTCard, Collection,FollowerTab, AudioLive, LikeProfile, Slider, Brand, Video, Loader} from '../components/componentsindex';
// IMPORT CONTRACT DATA
import {NFTMarketplaceContext} from '../Context/NFTMarketplaceContext';
import { getTopCreators } from '../components/TopCreators/TopCreators';

const Home = () => {
  const {fetchNFTS} = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftCopy, setNFTCoppy] = useState([]);
  
  const {checkIfWalletConnected} = useContext(NFTMarketplaceContext);
  // CREATOR LIST 
  const creator = getTopCreators(nfts);
    useEffect(() => {
      checkIfWalletConnected();
    }, []);
  
 useEffect(() => {
      fetchNFTS()
        .then((item) => {
          setNfts(item.reverse());
          setNFTCoppy(item);
        })
        .catch((error) => {
          console.error('Error fetching NFTs:', error);
        });
    }, []); 
  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service/>
      <BigNFTSlider/>
      <Title heading="Lastest Audio Collection" paragraph="Discover the most outstanding NFTS in all topics of life"/>
      <AudioLive/>
      {nfts.length == 0 ? <Loader/> : <FollowerTab TopCreators = {creator}/>}
      <Slider/>
      <Title heading="TOP LIST 24H" paragraph="Discover the most outstanding NFTS in all topics of life"/>
      <Collection/>
      {/* <Title heading="Featured NFTs" paragraph="Discover the most outstanding NFTS in all topics of life"/> */}
      {/* <Filter/>
      {nfts.length == 0 ? <Loader/> : <NFTCard NFTData = {nfts}/>} */}
      <Title heading="Browse by category" paragraph="Explore the NFTs in the most featured categories. "/>
      <Category/>
      <Subscribe/>
      <Brand/>
    </div>
  )
};

export default Home;
