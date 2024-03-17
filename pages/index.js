import React from 'react';
import Style from '../styles/index.module.css';
import { HeroSection , Service, BigNFTSlider, Subscribe, Title, Category, Filter, NFTCard, Collection,FollowerTab, AudioLive, LikeProfile, Slider, Brand} from '../components/componentsindex';

const Home = () => {
  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service/>
      <BigNFTSlider/>
      <Title heading="Lastest Audio Collection" paragraph="Discover the most outstanding NFTS in all topics of life"/>
      <AudioLive/>
      <FollowerTab/>
      <Slider/>
      <Title heading="Filter By Collection" paragraph="Discover the most outstanding NFTS in all topics of life"/>
      <Collection/>
      <Title heading="Featured NFTs" paragraph="Discover the most outstanding NFTS in all topics of life"/>
      <Filter/>
      <NFTCard/>
      <Title heading="Browse by category" paragraph="Explore the NFTs in the most featured categories. "/>
      <Category/>
      <Subscribe/>
      <Brand/>
    </div>
  )
};

export default Home;
