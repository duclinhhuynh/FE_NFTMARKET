import React from 'react'


import Style from './AuthorNFTCardBox.module.css'
import images from '../../img'
import { NFTCardTwo } from '../../collectionPage/collectionIndex'
import FollowerTabCard from '../../components/FollowerTab/FollowerTabCard/FollowerTabCard'
const AuthorNFTCardBox = ({
    colleciables,
    created,
    like,
    follower,
    following,
}) => {
  const colleciablesArray = [
    images.art1,
    images.art2,
    images.art3,
    images.art4,
    images.art5
  ];
  const createdArray = [
    images.create1,
    images.create2,
    images.create3,
    images.create4,
    images.create6,
  ];
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
    <div className={Style.AuthorNFTCardBox}>
        {colleciables && <NFTCardTwo NFTData={colleciablesArray}/>}
        {created && <NFTCardTwo NFTData={createdArray}/>}
        {like && <NFTCardTwo NFTData={likeArray}/>}
        {follower && <NFTCardTwo NFTData={followerArray}/>}
        {following && <NFTCardTwo NFTData={followingArray}/>}

    </div>
  )
}

export default AuthorNFTCardBox