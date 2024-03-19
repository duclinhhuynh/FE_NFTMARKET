import React, {useState, useEffect} from 'react'

// INTERNAL IMPORT
import Style from '../styles/author.module.css'
import {Banner, NFTCardTwo} from '../collectionPage/collectionIndex'
import {Brand, Title} from "../components/componentsindex"
import {AuthorProfileCard, AuthorTaps, TabCard, AuthorNFTCardBox} from '../authorPage/componentIndex'
import FollowerTabCard from '../components/FollowerTab/FollowerTabCard/FollowerTabCard'
import images from '../img'
const author = () => {
    const popularArray = [
        images.cartoon1,
        images.cartoon2,
        images.cartoon3,
        images.cartoon4,
        images.cartoon5,
    ]
    const [colleciables, setColleciables] = useState(true);
    const [created, setCreated] = useState(false);
    const [like, setLike] = useState(false);
    const [follower, setFollower] = useState(false);
    const [following, setFollowing] = useState(false);
  return (
    <div className={Style.banner}>
        <Banner bannerImage={images.bg1}/>
        <AuthorProfileCard/>
        <AuthorTaps 
          setColleciables = {setColleciables} 
          setCreated={setCreated} 
          setLike = {setLike} 
          setFollower = {setFollower}
          setFollowing = {setFollowing}
          />
          <Title heading="Popular Creator" paragraph="Click on music icon and enjoy NFT music or audio"/>
          <AuthorNFTCardBox
            colleciables = {colleciables} 
            created={created} 
            like = {like} 
            follower = {follower}
            following = {following}
          
          />
          {/* {popularArray.map((el,i)=>(
            <FollowerTabCard key={i + 1} i = {i} el = {el}/>
          ))} */}
    </div>
  )
}

export default author