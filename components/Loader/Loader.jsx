import React from 'react'
import Style from './Loader.module.css'
import Image from 'next/image'
import img from '../../img'
const Loader = () => {
  return (
    <div className={Style.loader}>
        <div className={Style.loader_box}>
            <div className={Style.loader_box_img}>
                <Image src={img.loader} alt='loader'
                width={200}
                height={200}
                className={Style.loader_box_img_img}
                objectFit='contain'
                />
            </div>
        </div>
    </div>
  )
}

export default Loader