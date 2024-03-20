import React from 'react'
import Image from 'next/image'
import Style from './NFTTabs.module.css'
const NFTTabs = ({dataTabs, icon}) => {
  return (
    <div className={Style.NFTTabs}>
      {dataTabs.map((el,i) => (
        <div className={Style.NFTTabs_box} key= {i+1}>
          <Image src={el}
            alt="profile image"
            width={40}
            height={40}
            className={Style.NFTTabs_box_img}
          />
          <div className={Style.NFTTabs_box_info}>
            <span>Offer by 399$ <small>leonal</small></span>
            {}
            <small>March 15 - 5:12 PM</small>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NFTTabs