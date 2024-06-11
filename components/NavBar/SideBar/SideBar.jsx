import React , {useState}from 'react'
import Link from 'next/link'
import {GrClose} from 'react-icons/gr'
import Image from 'next/image';

import {TiSocialFacebook, TiSocialLinkedin, TiSocialTwitter, TiSocialYoutube, TiSocialInstagram, TiArrowSortedDown, TiArrowSortedUp} from 'react-icons/ti';
// INTERNAL INPUT
import Style from './SideBar.module.css';
import images from "../../../img";
import Button from '../../Button/Button';
import { useRouter } from 'next/router';
const SideBar = ({setOpenSideMenu, currentAccount, connectWallet}) => {
  const [openDiscover, setOpenDiscover] = useState(false);
  const [openHelp, setopenHelp] = useState(false);
  const router = useRouter();
  // DICOVER NAVIGATION
  const discover = [
    {
      name: "TransferFunds",
      link: "transferFunds"
    },
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
    if(!openHelp){
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
        <Image src={images.logo} alt= "logo"
        with={50} 
        height={50}/>
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
          onClick={() => openDiscoverMenu() }>
            <p>DISCOVER</p>  
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
          <div className={Style.SideBar_menu_box} onClick={() => openHelpMenu()}>
            <p>HELP CENTER</p>
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
        {currentAccount == "" 
              ? (<Button btnName="Connect Wallet" handleClick={() => connectWallet()}/> )
              : (
                <Button btnName="Create" handleClick={() => router.push("")}/>
                )
          }
      </div>
    </div>
  )
}

export default SideBar