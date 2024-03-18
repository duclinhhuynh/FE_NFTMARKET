import React, {useState, useEffect} from 'react'

// INTERNAL IMPORT
import Style from '../styles/author.module.css'
import {Banner, NFTCardTwo} from '../collectionPage/collectionIndex'
import {Brand, Title} from "../components/componentsindex"
import {AuthorProfileCard, AuthorTaps, TabCard} from '../authorPage/componentIndex'
import images from '../img'
const author = () => {
    const popularArray = [
        images.user1,
        images.user2,
        images.user3,
        images.user4,
        images.user5,
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
    </div>
  )
}

export default author