
import React ,{useEffect, useState, useContext} from 'react'

import Style from '../styles/uploadNFT.module.css'
import {UploadNFT} from '../components/uploadNFT/UploadNFTIndex'
import { NFTMarketplaceContext } from '../Context/NFTMarketplaceContext'
import ThemeSwitcherText from '../components/theme/ThemeSwitcherText'
const uploadNft = () => {
  const {uploadToIPFS, createNFT} = useContext(NFTMarketplaceContext);
  return (
    <div className={Style.uploadNft}>
      <ThemeSwitcherText>
      <div className={Style.uploadNft_box}>
        <div className={Style.uploadNft_box_heading}>
          <h1>Create an NFT</h1>
          <p>Once your item is minted you will not be able to change any of its information.</p>
        </div>
        <div className={Style.uploadNft_box_form}>
          <UploadNFT uploadToIPFS = {uploadToIPFS}
            createNFT = {createNFT}
          />
        </div>
      </div>
      </ThemeSwitcherText>
    </div>
  )
}

export default uploadNft