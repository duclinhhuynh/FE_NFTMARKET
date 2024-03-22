import React, {useState, useEffect, useContext} from "react";
import Image from "next/image";
//INTERNAL IMPORT
import Style from "./HeroSection.module.css"
import { Button } from "../componentsindex";
import images from "../../img"

//Smart contract 
import {NFTMarketplaceContext} from '../../Context/NFTMarketplaceContext'
const HeroSection = () => {
    const {titleData} = useContext(NFTMarketplaceContext)
    return (
    <div className={Style.heroSection}>
        <div className={Style.heroSection_box}>
            <div className={Style.heroSection_box_left}>
                <h1>{titleData}🖼</h1>
                <p>A place with endless fun and the most engaging community</p>
                <Button btnName='Start your search'></Button>
            </div>
            <div className={Style.heroSection_box_right}>
                <Image className={Style.responsiveImageContainer}
                src={images.hero}
                width={600}
                height={600}
                />
            </div>
        </div>
    </div>
    )
};

export default HeroSection;