import React from 'react'
import Image from 'next/image'

import images from '../../img'
import Style  from './Service.module.css'
const Service = () => {
  return (
    <div className={Style.service}>
        <div className={Style.service_box}>
            <div className={Style.service_box_item}>
                <Image src={images.filter} alt='Fillter & discover' width={100} height={100}/>
                <p className={Style.service_box_item_step}>
                    <span>step 1</span>
                </p>
                <h3>Filter & discover</h3>
                <p>
                    Connect width wallet, discover, byt NFT, sell your NFT money
                </p>

            </div>
            <div className={Style.service_box_item}>
                <Image src={images.connect} alt='Fillter & discover' width={100} height={100}/>
                <p className={Style.service_box_item_step}>
                    <span>step 2</span>
                </p>
                <h3>Connect wallet</h3>
                <p>
                    Connect width wallet, discover, byt NFT, sell your NFT money
                </p>

            </div>
            <div className={Style.service_box_item}>
                <Image src={images.earn} alt='Connect Wallet' width={100} height={100}/>
                <p className={Style.service_box_item_step}>
                    <span>step 3</span>
                </p>
                <h3>Start trading</h3>
                <p>
                    Connect width wallet, discover, byt NFT, sell your NFT money
                </p>

            </div>
            <div className={Style.service_box_item}>
                <Image src={images.trading} alt='Fillter & discover' width={100} height={100}/>
                <p className={Style.service_box_item_step}>
                    <span>step 4</span>
                </p>
                <h3>Earn money</h3>
                <p>
                    Connect width wallet, discover, byt NFT, sell your NFT money
                </p>

            </div>
        </div>   
    </div>
  )
}

export default Service