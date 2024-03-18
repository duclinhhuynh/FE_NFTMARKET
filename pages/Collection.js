import React from 'react'
// INTERNAL IMPORT 
import images from '../img'
import Style from "../styles/collection.module.css"
import {Banner, CollectionProfile, NFTCardTwo} from "../collectionPage/collectionIndex"
import {Slider, Brand} from "../components/componentsindex"
import Filter from '../components/Filter/Filter'
const collection = () => {
    const collectionArray = [
        images.pilot1,
        images.pilot2,
        images.pilot3,
        images.pilot5,
        images.art1,
        images.music13,
        images.war3,
        images.war4

    ]
  return (
    <div className={Style.collection}>
        <Banner bannerImage = {images.bg1}/>
        <CollectionProfile />
        <Filter/>
        <NFTCardTwo NFTData = {collectionArray}/>
        <Slider/>
        <Brand/>
    </div>
  )
}

export default collection