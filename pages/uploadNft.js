
import React ,{useEffect, useState, useContext} from 'react'

import Style from '../styles/uploadNFT.module.css'
import {UploadNFT} from '../uploadNFT/UploadNFTIndex'

import { NFTMarketplaceContext } from '../Context/NFTMarketplaceContext'
const uploadNft = () => {
  const {uploadToIPFS, createNFT} = useContext(NFTMarketplaceContext);
  return (
    <div className={Style.uploadNft}>
      <div className={Style.uploadNft_box}>
        <div className={Style.uploadNft_box_heading}>
          <h1>Create new nft</h1>
          <p>You can get refered display name, create your profile</p>
        </div>
        <div className={Style.uploadNft_box_title}>
         <h2>Image, Video, Audio, or 3d model</h2>
         <p>File type suported: JPG, PNG, GIF, SVG</p>
        </div>
        <div className={Style.uploadNft_box_form}>
          <UploadNFT uploadToIPFS = {uploadToIPFS}
            createNFT = {createNFT}
          />
        </div>
      </div>
    </div>
  )
}

export default uploadNft