import React from 'react'
import Style from './Brand.module.css'
import Image from 'next/image'
import images from '../../img'
import {Button} from "@nextui-org/react";
import { useTheme } from 'next-themes'
const Brand = () => {
const { theme, setTheme } = useTheme()
  return (
    <div className={Style.Brand}>
        <div className={Style.Brand_box}>
            <div className={Style.Brand_box_left}>
                <Image src={images.logo} alt='brand logo'
                    width={50}
                    height={50}
                    objectFit='cover'
                    className={Style.Brand_box_left_img}
                />
                <h1 className={`${theme === 'light' ? 'text-dark' : 'text-white'}`}>Earn free crypto with carv</h1>
                <p className={`${theme === 'light' ? 'text-dark' : 'text-white'}`}>A creative agency that lead and inspire</p>
                <div className={Style.Brand_box_left_btn}>
                    <Button color="primary" variant="solid" handleClick={() => {}} className={`${theme === 'light' ? 'text-white' : 'text-white'}`}>Create</Button>
                    <Button color="primary" variant="solid" handleClick={() => {}} className={`${theme === 'light' ? 'text-white' : 'text-white'}`}>Discover</Button>
                </div>
            </div>
            <div className={Style.Brand_box_right}>
                <Image src={images.brand} alt="brand logo"
                    width={800}
                    height={600}
                    objectFit='cover'
                    className={Style.Brand_box_right_img}
                />
            </div>
            <div className={Style.Brand_box_right}>

            </div>
        </div>
    </div>
  )
}

export default Brand