import React from 'react'
import Image from 'next/image'
import {MdVerified} from 'react-icons/md'
//INTERNAL IMPORT
import Style from './DaysComponents.module.css'
import images from '../../../img'
const DaysComponents = ({el}) => {
  return (
    <div className={`border shadow-md ${Style.daysComponent}`}>
        <div className={Style.daysComponent_box}>
            <div className={Style.daysComponent_box_img}>
                <Image src={el.background}
                    className={Style.daysComponent_box_img_img}
                    alt='profile background'
                    width={400}
                    height={300}
                    objectFit='covers'
                />
            </div>
            <div className={Style.daysComponent_box_profile}>
                <Image src={el.pilot}
                    width={200}
                    height={100}
                    className={Style.daysComponent_box_img_1}
                    objectFit='covers'
                />
                <Image src={el.cartoon}
                    width={200}
                    height={100}
                    className={Style.daysComponent_box_img_2}
                    objectFit='covers'
                />
                 <Image src={el.background}
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
                        <Image src={el.user} alt='profile'
                            width={30}
                            height={30}
                            objectFit="covers"
                            className={`${Style.daysComponent_box_title_info_profile_img}`}
                        />
                        <div>
                            <span className='flex items-center'>Creator&nbsp;Lucas <MdVerified/></span>
                        </div>
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