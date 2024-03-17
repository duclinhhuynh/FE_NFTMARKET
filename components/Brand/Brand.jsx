import React from 'react'
import Style from './Brand.module.css'
import Image from 'next/image'
import images from '../../img'
import {Button} from '../../components/componentsindex'
const Brand = () => {
  return (
    <div className={Style.Brand}>
        <div className={Style.Brand_box}>
            <div className={Style.Brand_box_left}>
                <Image src={images.logo} alt='brand logo'
                    width={100}
                    height={100}
                />
                <h1>Earn free crypto with carv</h1>
                <p>A creative agency that lead and inspire</p>
                <div className={Style.Brand_box_left_btn}>
                    <Button btnName="Create" handleClick={() => {}}></Button>
                    <Button btnName="Discover" handleClick={() => {}}></Button>
                </div>
            </div>
            <div className={Style.Brand_box_right}>
                <Image src={images.hero} alt="brand logo"
                    width={800}
                    height={600}
                />
            </div>
            <div className={Style.Brand_box_right}>

            </div>
        </div>
    </div>
  )
}

export default Brand