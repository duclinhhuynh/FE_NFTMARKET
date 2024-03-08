import React , {useState}from 'react'
import Link from 'next/link'
import {GrClose} from 'react-icons/gr'

import {TiSocialFacebook, TiSocialLinkedin, TiSocialTwitter, TiSocialYoutube, TiSocialInstagram, TiArrowSortedDown, TiArrowSortedUp} from 'react-icons/ti';
// INTERNAL INPUT
import Style from './SideBar.module.css';
import images from '../../../img';
import Button from '../../Button/Button';
const SideBar = ({setOpenSideMenu}) => {
  const [openDiscover, setOpenDiscover] = useState(false);
  const [openHelp, setopenHelp] = useState(false);
  // DICOVER NAVIGATION
  const discover = [
    {
      name: "Collection",
      link: "collection"
    },
    {
      name: "Search",
      link: "Search"
    },
    {
      name: "Author Profile",
      link: "author-profile"
    },
    {
      name: "NFT Details",
      link: "NFT-details"
    },
    {
      name: "Account Setting",
      link: "account-setting"
    },
    {
      name: "Connect Wallet",
      link: "connect-wallet"
    },
    {
      name: "Blog",
      link: "blog"
    },
  ];
  // HELP CENTER
  const helpCenter = [
    {
      name: "About",
      link: "about"
    },
    {
      name: "Contact Us",
      link: "contact-us"
    },
    {
      name: "About",
      link: "about"
    },
    {
      name: "Sign Up",
      link: "sign-up"
    },
    {
      name: "Sign In",
      link: "sign-in"
    },
    {
      name: "Subscription",
      link: "subscription"
    },
  ];

  const openDiscoverMenu = () => {
    if(!openDiscover){
      setOpenDiscover(true)
    }
    else{
      setOpenDiscover(false)
    }
  };
  const openHelpMenu = () => {
    if(!openHelpMenu){
      setopenHelp(true)
    }else{
      setopenHelp(false)
    }
  };
  const closeSideBar = () => {
    setOpenSideMenu(false);
  };
  return (
    <div className={Style.SideBar}>
      <GrClose className={Style.SideBar_closeBtn} onClick={() => closeSideBar()} />

      <div className={Style.SideBar_box}>
      <image src={images.logo} alt= "logo"
       with={150} 
       height={150}/>
       <p>Discover the most ourstanding articles on all topices of NFT  </p>
       <div className={Style.SideBar_social}>
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
      <div className={Style.SideBar_menu}>
        <div>
          <div className={Style.SideBar_menu_box} 
          onclick={() => openDiscoverMenu() }>
            <p>Discover</p>  
            <TiArrowSortedDown/>  
          </div>
          {
            openDiscover && (
              <div className={Style.SideBar_discover}>
                {discover.map((el, i) => (
                  <p key = {i+1}>
                    <Link href={{pathname: `${el.link}`}}>{el.name}</Link>
                  </p>
                ))}
              </div>
            )
          }
        </div>
        <div>
          <div className={Style.SideBar_menu_box} onclick={() => openHelpMenu()}>
            <p>Help Center</p>
            <TiArrowSortedDown/>
          </div>
          {openHelp && (
              <div className={Style.SideBar_discover}>
                {helpCenter.map((el, i) => (
                  <p key={i + 1}>
                    <Link href={{pathname: `${el.link}`}}>{el.name}</Link>
                  </p>
                ))}
              </div>
          )}
        </div>
      </div>
      <div className={Style.SideBar_button}>
          <Button btnName = "Create"/>
          <Button btnName = "Connect Wallet"/>
      </div>
    </div>
  )
}

export default SideBar