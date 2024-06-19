import React, { useState } from 'react'
import Image from 'next/image'

import { MdVerified, MdCloudUpload, MdOutlineReportProblem, MdOutbond} from 'react-icons/md'

import {FiCopy} from 'react-icons/fi';
import { TiSocialFacebook, TiSocialLinkedin, TiSocialYoutube, TiSocialInstagram } from 'react-icons/ti';
import {BsThreeDots} from 'react-icons/bs';
import { FiHeart } from "react-icons/fi";
//INTERNAL IMPORT
import Style from './AuthorProfileCard.module.css'
import images from '../../../img'
import {Button, Chip} from "@nextui-org/react";
import ThemeSwitcherText from '../../theme/ThemeSwitcherText';
const AuthorProfileCard = ({currentAccount}) => {
    const [share, setShare] = useState(false);
    const [report, setReport] = useState(false);    
    const openShare = () => {
        if(!share){
            setShare(true)
            setReport(false)
        }else{
            setShare(false)
        }
    }; 
    const copyAddress = () => {
        const copyText = document.getElementById("myInput")

        copyText.select();
        navigator.clipboard.writeText(copyText.value);
    };
    const openReport = () => {
        if(!report){
            setReport(true)
            setShare(false)
        }else{
            setReport(false)
        }
    }; 

  return (
    <div >
        <ThemeSwitcherText>
            <div className={Style.AuthorProfileCard_box}>
                <div className={Style.AuthorProfileCard_box_img}>
                    <Image src={images.nft1} 
                    className={Style.AuthorProfileCard_box_img_img}
                    width={200}
                    height={200}
                    objectFit='cover'
                    />
                </div>
                <div className={Style.AuthorProfileCard_box_info}>
                    <div className={Style.AuthorProfileCard_box_info_address}>
                    <h2> Lucas NFT {""}<span><MdVerified/></span>{""}</h2>
                        <input type="text" 
                        value={currentAccount}
                        id='myInput'
                        />
                        <FiCopy onClick={() => copyAddress()} 
                        className={Style.AuthorProfileCard_box_info_address_icon}/>
                    </div>
                    <p>
                        Punk#3289/ Crypto collector, hoarder of NFTs.
                    </p>
                    <div className='flex flex-wrap gap-2'>
                        <Chip color="primary" variant="dot"><TiSocialFacebook/></Chip>
                        <Chip color="primary" variant="dot"><TiSocialInstagram/></Chip>
                        <Chip color="primary" variant="dot"><TiSocialLinkedin/></Chip>
                        <Chip color="primary" variant="dot"><TiSocialYoutube/></Chip>
                    </div>
                </div>
                <div className={Style.AuthorProfileCard_box_share}>
                <Button size="sm" color="danger" aria-label="Like" variant="bordered" endContent={<FiHeart size={15}/>}>
                    Follow 
                </Button>
                <Button color="danger"  size="sm" endContent={<MdCloudUpload/>}  onClick={() => openShare()}>
                    
                </Button>
                {  share && (
                        <div className={Style.AuthorProfileCard_box_share_upload}>
                            <p>
                                <span>
                                    <TiSocialFacebook/>
                                </span>{""} {""}
                                Facebook
                            </p>
                            <p>
                                <span>
                                    <TiSocialInstagram/>
                                </span>{""} {""}
                                Instagram
                            </p>
                            <p>
                                <span>
                                    <TiSocialLinkedin/>
                                </span>{""} {""}
                                Likedin
                            </p>
                            <p>
                                <span>
                                    <TiSocialYoutube/>
                                </span>{""} {""}
                                Youtube
                            </p>
                        </div>
                )}
                    <BsThreeDots onClick={() => openReport()} className={Style.AuthorProfileCard_box_share_icon}/>
                    {
                        report &&(
                            <p className={Style.AuthorProfileCard_box_share_report}>
                            <span>
                                <MdOutlineReportProblem/>
                                </span>{""} {""} 
                                Report abouse
                            </p>
                        )
                    }
                </div>
            </div>
        </ThemeSwitcherText>
    </div>
  )
}

export default AuthorProfileCard