import React, { useContext } from 'react'

import Image from 'next/image'
// INTERNAL IMPORT 
import Style from './Error.module.css'
import image from '../../img'
// IMOPRT CONTRACT

import {NFTMarketplaceContext} from '../../Context/NFTMarketplaceContext'
const Error = () => {
  const {error, setOpenError} = useContext(NFTMarketplaceContext);
  return (
    <div className={Style.error} onClick={() => setOpenError(false)}>
        <div className={Style.error_box}>
            <div className={Style.error_box_info}>
                <Image
                    alt="error"
                    width={250}
                    height={250}
                    src={image.error}
                    objectFit='cover'
                    className={Style.error_box_info_img}
                />
                <p>{error}</p>
            </div>
        </div>
    </div>
  )
}

export default Error