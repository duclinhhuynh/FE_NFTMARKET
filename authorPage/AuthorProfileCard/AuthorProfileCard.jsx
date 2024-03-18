import React, { useState } from 'react'
import Image from 'next/image'

import { MdVerified, MdCloudUpload, MdOutlineReportProblem, MdOutbond} from 'react-icons/md'

import {FiCopy} from 'react-icons/fi';
import { TiSocialFacebook, TiSocialLinkedin, TiSocialYoutube, TiSocialInstagram } from 'react-icons/ti';
import {BsThreeDots} from 'react-icons/bs';
//INTERNAL IMPORT
import Style from './AuthorProfileCard.module.css'
import images from '../../img'
import {Button} from '../../components/componentsindex'

const AuthorProfileCard = () => {
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
        if(!share){
            setReport(true)
            setShare(false)
        }else{
            setReport(false)
        }
    }; 

  return (
    <div className={Style.AuthorProfileCard}>
        <div className={Style.AuthorProfileCard_box}>
            <div className={Style.AuthorProfileCard_box_img}>
                <Image src={images.nft_image_1} 
                className={Style.AuthorProfileCard_box_img_img}
                width={220}
                height={220}
                />
            </div>
            <div className={Style.AuthorProfileCard_box_info}>
                <h2>Done ro {""}<span><MdVerified/></span>{""}</h2>
                <div className={Style.AuthorProfileCard_box_info_address}>
                    <input type="text" 
                    value={"0x8725f94099EE9C426B87170EefE6855B87EC5fAc"}
                    id='myInput'
                    />
                    <FiCopy onClick={() => copyAddress()} 
                    className={Style.AuthorProfileCard_box_info_address_icon}/>
                </div>
                <p>
                    Punk#3289/ Crypto collector, hoarder of NFTs.
                </p>
                <div className={Style.AuthorProfileCard_box_info_social}>
                    <a href="#">
                        <TiSocialFacebook/>
                    </a>
                    <a href="#">
                        <TiSocialInstagram/>
                    </a>
                    <a href="#">
                        <TiSocialLinkedin/>
                    </a>
                    <a href="#">
                        <TiSocialYoutube/>
                    </a>
                </div>
            </div>
            <div className={Style.AuthorProfileCard_box_share}>
                <Button btnName="Follow" handleClick={() => {}}/>
                <MdCloudUpload onClick={() => openShare()} className={Style.AuthorProfileCard_box_share_icon}/>
                {
                    share && (
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
    </div>
  )
}

export default AuthorProfileCard