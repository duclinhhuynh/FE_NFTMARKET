import React from 'react'
import Image from 'next/image'
import {MdVerified} from 'react-icons/md'
//INTERNAL IMPORT
import Style from './DaysComponents.module.css'
import images from '../../../img'
const DaysComponents = () => {
  return (
    <div className={Style.daysComponent}>
        <div className={Style.daysComponent_box}>
            <div className={Style.daysComponent_box_img}>
                <Image src={images.category}
                    className={Style.daysComponent_box_img_img}
                    alt='profile background'
                    width={400}
                    height={200}
                    objectFit='covers'
                />
            </div>
            <div className={Style.daysComponent_box_profile}>
                <Image src={images.update}
                    width={200}
                    height={100}
                    className={Style.daysComponent_box_img_1}
                    objectFit='covers'
                />
                <Image src={images.update}
                    width={200}
                    height={100}
                    className={Style.daysComponent_box_img_2}
                    objectFit='covers'
                />
                 <Image src={images.update}
                    width={200}
                    height={100}
                    className={Style.daysComponent_box_img_3}
                    objectFit='covers'
                />
            </div>
            <div className={Style.daysComponent_box_title}>
                <h2>Amazing Collection</h2>
                <div className={Style.daysComponent_box_title_info}>
                    <div className={Style.daysComponent_box_title_info_profile} >
                        <Image src={images.user1} alt='profile'
                            width={30}
                            height={30}
                            objectFit="covers"
                            className={Style.daysComponent_box_title_info_profile_img}
                        />
                        <p>Creator
                            <span>Lucas <small><MdVerified/></small></span>
                        </p>
                    </div>
                    <div className={Style.daysComponent_box_title_info_price}>
                        <small>1.2 ETH</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DaysComponents