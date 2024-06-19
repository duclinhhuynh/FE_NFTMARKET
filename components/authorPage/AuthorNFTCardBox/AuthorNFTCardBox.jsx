import React from 'react'


import Style from './AuthorNFTCardBox.module.css'
import images from '../../../img'
import { NFTCardTwo } from '../../collectionPage/collectionIndex'
import FollowerTabCard from '../../FollowerTab/FollowerTabCard/FollowerTabCard'
const AuthorNFTCardBox = ({
    colleciables,
    created,
    like,
    follower,
    following,
    nfts,
    myNFTs,
}) => {
  const likeArray = [
    images.cartoon1,
    images.cartoon2,
    images.cartoon3,
    images.cartoon4
    
  ];
  const followerArray = [
    images.user5,
    images.user4,
    images.user1,
    images.user2,
    images.user3,

  ];
  const followingArray = [
    images.user1,
    images.user2,
    images.user3,
    images.user5,
    images.user4,
  ];
  return (
    <div className={`m-auto w-[90%] ${Style.AuthorNFTCardBox}`}>
        {colleciables && <NFTCardTwo NFTData={nfts}/>}
        {created && <NFTCardTwo NFTData={myNFTs}/>}
        {like && <NFTCardTwo NFTData={likeArray}/>}
        {follower && <NFTCardTwo NFTData={followerArray}/>}
        {following && <NFTCardTwo NFTData={followingArray}/>}

    </div>
  )
}

export default AuthorNFTCardBox