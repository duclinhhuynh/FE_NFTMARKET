import React from 'react'
import Image from 'next/image'
import  Style  from '../Footer/Footer.module.css'
import{
  TiSocialFacebook, TiSocialLinkedin, TiSocialTwitter, TiSocialYoutube, TiSocialInstagram, TiArrowSortedDown, TiArrowSortedUp
} from 'react-icons/ti';
import {RiSendPlaneFill} from 'react-icons/ri';

// ITERNAL IMPORT
import images from '../../img' 
import {Discover, HelpCenter, Hepcenter} from '../NavBar/index';
const Footer = () => {
  return (
    <div className={Style.footer}>
      <div className={Style.footer_box}>
        <div className={Style.footer_box_social}>
          <Image src={images.logo} alt='footer logo' height={100} width={100}/>
          <p>
          A non-fungible token is a unique digital identifier that is recorded on 
          a blockchain and is used to certify ownership and authenticity. 
          It cannot be copied, substituted, or subdivided. The ownership of an NFT is recorded in the blockchain and can be transferred by the owner, allowing NFTs to be sold and traded.
          </p>
          <div className={Style.footer_social}>
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
            <a href="#">
              <TiArrowSortedDown/>
            </a>
            <a href="#">
            <TiArrowSortedUp/>
          </a>
          </div>
        </div>
        <div className={`border-0 ${Style.footer_box_discover}`}>
          <h3>Discover</h3>
          <Discover />
        </div>
        <div className={Style.footer_box_help}>
          <h3>Help Center</h3>
          <HelpCenter/>
        </div>
        <div className={Style.subscribe}>
          <h3>Subcribe</h3>
            <div className={Style.subscribe_box}>
              <input className='email' placeholder='Enter your email'/>
              <RiSendPlaneFill className={Style.subscribe_box_send}/>
            </div>
            <div className={Style.subscribe_box_info}>
            <p>
            Discover, collect, and sell extraodinary NFTS OpenSea is the first largest NFT marketplace
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer