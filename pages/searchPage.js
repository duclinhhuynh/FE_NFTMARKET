import React from 'react'

// INTERNAL IMPORT 
import Style from '../styles/serachPage.module.css'
import {Slider, Brand} from '../components/componentsindex'
import { SearchBar } from '../searchPage/searchPageIndex'
import {Filter} from '../components/componentsindex'
import {NFTCardTwo, Banner} from "../collectionPage/collectionIndex"
import images from '../img';
const searchPage = () => {
    const collectionArray = [
        images.cartoon1,
        images.cartoon2,
        images.cartoon3,
        images.cartoon4,
        images.cartoon5,
        images.cartoon6,
    ]
  return (
    <div className={Style.searchPage}>
        <Banner bannerImage={images.bg1}/>
        <SearchBar/>
        <Filter/>
        <NFTCardTwo NFTData={collectionArray}/>
        <Slider/>
        <Brand/>
    </div>
  )
}

export default searchPage