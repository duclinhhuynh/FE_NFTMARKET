import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdVerified, MdCloudUpload, MdReportProblem, MdOutLineDeleteSweep } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import { FaPercentage, FaWallet } from 'react-icons/fa';
import { TiSocialFacebook, TiSocialLinkedin, TiSocialTwitter, TiSocialYoutube, TiSocialInstagram, TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { BiDollar, BiTransferAlt } from 'react-icons/bi';
import Style from './NFTDescription.module.css';
import images from '../../../img';
import { Button } from '../../../components/componentsindex';
import { NFTTabs } from '../NFTDetailsIndex';
import { fetchPrice } from '../../../api/api';
import { NFTMarketplaceContext } from '../../../Context/NFTMarketplaceContext';
import path from 'path';
const NFTDescription = ({nft}) => {
    const [social, setSocial] = useState(false);
    const [NFTMenu, setNFTMenu] = useState(false);
    const [history, setHistory] = useState(true);
    const [provanannce, setProvanance] = useState(false);
    const [owner, setOwner] = useState(false);
    const [activeBtn, setActiveBtn] = useState(1);
    const [ethPrice, setEthPrice] = useState(null);

    const historyArray = [images.user1, images.user2, images.user3, images.user4, images.user5];
    const provananceArray = [images.user3, images.user4, images.user5, images.user1, images.user2,];
    const ownerArray = [images.user4, images.user5,images.user3,];

    const router = useRouter();
    const openTabs = (e) => {
        const tab = e.target.innerText;
        if (tab === 'Bid History') {
            setHistory(true);
            setProvanance(false);
            setOwner(false);
            setActiveBtn(1);
        } else if (tab === 'Provenance') {
            setHistory(false);
            setProvanance(true);
            setOwner(false);
            setActiveBtn(2);
        } else if (tab === 'Owner') {
            setHistory(false);
            setProvanance(false);
            setOwner(true);
            setActiveBtn(3);
        }
    };
    const openSocial = () => {
      if(!social) {
        setSocial(true)
        setNFTMenu(false)
      }else{
        setSocial(false)
      }
    }
    const openNFTMenu = () => {
      if(!NFTMenu){
        setNFTMenu(true)
        setSocial(false)
      }else{
        setNFTMenu(false)
      }
    }
    const openOwner = () => {
      if(!owner){
        setOwner(true)
        setHistory(false)
        setProvanance(false)
      }
      else{
        setOwner(false)
      }
    } 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchPrice();
                setEthPrice(response.ethereum.usd);
            } catch (error) {
                console.error('Error fetching ETH price:', error);
            }
        };
    
        fetchData();
    }, []);

    // SMART CONTRACT DATA
    const {buyNFT, currentAccount} = useContext(NFTMarketplaceContext)
    return (
        <div className={Style.NFTDescription}>
            <div className={Style.NFTDescription_box}>
                <div className={Style.NFTDescription_box_share}>
                    <p>Virtural Words</p>
                    <div className={Style.NFTDescription_box_share_box}>
                        <MdCloudUpload className={Style.NFTDescription_box_share_box_icon} onClick={() => setSocial(!social)} />
                        {social && (
                            <div className={Style.NFTDescription_box_share_box_social}>
                                <a href="#"><TiSocialFacebook /> FaceBook</a>
                                <a href="#"><TiSocialLinkedin /> Linkedin</a>
                                <a href="#"><TiSocialTwitter /> Twitter</a>
                                <a href="#"><TiSocialYoutube /> Youtube</a>
                                <a href="#"><TiSocialInstagram /> Instagram</a>
                            </div>
                        )}
                        <BsThreeDots className={Style.NFTDescription_box_share_box_icon} onClick={() => setNFTMenu(!NFTMenu)} />
                        {NFTMenu && (
                            <div className={Style.NFTDescription_box_share_box_social}>
                                <a href="#"><BiDollar /> Change price</a>
                                <a href="#"><BiTransferAlt /> Transfer</a>
                                <a href="#"><MdReportProblem /> Report abuse</a>
                                <a href="#"><MdOutLineDeleteSweep /> Report abuse</a>
                            </div>
                        )}
                    </div>
                </div>
                <div className={Style.NFTDescription_box_profile}>
                    <h1>{nft.name}</h1>
                    <div className={Style.NFTDescription_box_profile_box}>
                        <div className={Style.NFTDescription_box_profile_box_left}>
                            <Image src={images.user1} alt='profile' width={40} height={40} className={Style.NFTDescription_box_profile_box_left_img} />
                            <div className={Style.NFTDescription_box_profile_box_left_info}>
                                <small>Creator</small><br />
                                <span>Ronaos <MdVerified /></span>
                            </div>
                        </div>
                        <div className={Style.NFTDescription_box_profile_box_right}>
                            <Image src={images.user1} alt="profile" width={40} height={40} className={Style.NFTDescription_box_profile_box_left_img} />
                            <div className={Style.NFTDescription_box_profile_box_right_info}>
                                <small>Creator</small><br />
                                <Link href={{pathname: "/author", query: `${nft.seller}`}}></Link>
                                <span>halaka sko <MdVerified /></span>
                            </div>
                        </div>
                    </div>
                
                  <div className={Style.NFTDescription_box_profile_bidding}>
                      <p><MdVerified /><span>Auction ending in:</span></p>
                      <div className={Style.NFTDescription_box_profile_biding_box_timer}>
                          <div className={Style.NFTDescription_box_profile_biding_box_timer_item}>
                              <p>2</p>
                              <span>Days</span>
                          </div>
                          <div className={Style.NFTDescription_box_profile_biding_box_timer_item}>
                              <p>12</p>
                              <span>Hours</span>
                          </div>
                          <div className={Style.NFTDescription_box_profile_biding_box_timer_item}>
                              <p>12</p>
                              <span>Min</span>
                          </div>
                          <div className={Style.NFTDescription_box_profile_biding_box_timer_item}>
                              <p>12</p>
                              <span>sec</span>
                          </div>
                      </div>
                      <div className={Style.NFTDescription_box_profile_biding_box_price}>
                          <div className={Style.NFTDescription_box_profile_biding_box_price_bid}>
                              <small>Current Bid</small>
                              <p>{nft.price} ETH ~&nbsp;<span>${ethPrice && (ethPrice * parseFloat(nft.price.split(' ')[0])).toFixed(0)}</span></p>
                          </div>
                          <span>[102 stock]</span>
                      </div>
                      <div className={Style.NFTDescription_box_profile_biding_box_button}>
                        { currentAccount == nft.seller.toLowerCase() ? (
                            <p>
                                You can not buy your NFT
                            </p>
                        ) : currentAccount == nft.owner.toLowerCase() ? (
                          <Button icon={<FaWallet />} btnName="List on Martketplace" 
                            handleClick={() => router.push(`/reSellToken?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`)} 
                            classStyle={Style.button}/>
                        ) : (  
                          <Button icon={<FaWallet />} btnName="Buy NFT" 
                          handleClick={() => buyNFT(nft)} classStyle={Style.button} />
                        )}
                        <Button icon={<FaPercentage />} btnName="Make offer" 
                          handleClick={() => buyNFT(nft)} classStyle={Style.button} />
                      </div>
                      <div className={Style.NFTDescription_box_profile_biding_box_tabs}>
                          <button className={`${activeBtn === 1 ? Style.active : ""}`} onClick={(e) => openTabs(e)}>Bid History</button>
                          <button className={`${activeBtn === 2 ? Style.active : ""}`} onClick={(e) => openTabs(e)}>Provenance</button>
                          <button className={`${activeBtn === 3 ? Style.active : ""}`} onClick={(e) => openTabs(e)}>Owner</button>
                      </div>
                      {history && (
                          <div className={Style.NFTDescription_box_profile_biding_box_card}>
                              <NFTTabs dataTabs={historyArray} />
                          </div>
                      )}
                      {provanannce && (
                          <div className={Style.NFTDescription_box_profile_biding_box_card}>
                              <NFTTabs dataTabs={provananceArray} />
                          </div>
                      )}
                      {owner && (
                          <div className={Style.NFTDescription_box_profile_biding_box_card}>
                              <NFTTabs dataTabs={ownerArray} icon={<MdVerified/>}/>
                          </div>
                      )}
                  </div>
                </div>
            </div>
        </div>
    );
};

export default NFTDescription;
