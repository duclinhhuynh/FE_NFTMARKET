import React, {useContext} from 'react'
import Image from 'next/image'
import image from './../img'  
import {NFTMarketplaceContext} from "../Context/NFTMarketplaceContext"
const TransferFunds = () => {
  const {current} = useContext(NFTMarketplaceContext)
  return (
    <div>
      <div>hello</div>
    </div>
  )
}

export default TransferFunds
