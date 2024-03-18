import React from 'react'
import Image from 'next/image';
import Style from "./Collection.module.css"
import {TiSocialFacebook, TiSocialLinkedin, TiSocialTwitter, TiSocialYoutube, TiSocialInstagram, TiArrowSortedDown, TiArrowSortedUp} from 'react-icons/ti';
import images from "../../img"
const CollectionProfile = ({collectionArray}) => {
  const cardArray = [1, 2, 3, 4];
  return (
    <div className={Style.collectionProfile}>
      <div className={Style.collectionProfile_box}>
        <div className={Style.collectionProfile_box_left}>
          <Image src={images.nft1}
          alt='nft image'
          width={800}
          height={800}
          className={Style.collectionProfile_box_left_img}
          />
          <div className={Style.collectionProfile_box_left_social}>
            <a href="#">
            <TiSocialFacebook/>
            </a>
            <a href="#">
              <TiSocialLinkedin/>
            </a>
            <a href="#">
              <TiSocialTwitter/>
            </a>
            <a href="#">
              <TiSocialYoutube/>
            </a>
            <a href="#">
              <TiSocialInstagram/>
            </a>
          </div>
          
        </div>
        <div className={Style.collectionProfile_box_middle}>
          <h1>Awesome NFTS Collections</h1>
          <p>Karafuru is home to 5,555 generative arts where colors reign supreme. Leave the drab reality and enter the world of Karafuru by Museum of Toys.</p>
          <div className={Style.collectionProfile_box_middle_box}>
            {cardArray.map((el,i) => (
                <div className={Style.collectionProfile_box_middle_box_item} key={i+1}>
                    <small>Floor price</small>
                    <small className=''>${i + 1} 64</small>
                    <span>+ {i + 2}.11%</span>
                </div>              
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollectionProfile