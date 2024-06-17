import React from 'react'
import { RiSendPlaneFill } from 'react-icons/ri'
import Image from 'next/image'
import { useTheme } from 'next-themes'
//INTERNAL IMPORT
import Style from "./Subcribe.module.css"
import images from "../../img"
const Subscribe = () => {
const { theme, setTheme } = useTheme()
  return (
    <div className={Style.subscribe}>
        <div className={Style.subscribe_box}>
            <div className={Style.subscribe_box_left}>
                <h2 className={`${theme === 'light' ? 'text-dark' : 'text-white'}`}>Never miss a drop</h2>
                <p className={`${theme === 'light' ? 'text-dark' : 'text-white'}`}>A place with endless fun and the most engaging community.
                We organize a series of onboarding events to help you dive into CARV Play and start data to earn.</p>
                <div className={Style.subscribe_box_left_box}>
                    <p className={`${theme === 'light' ? 'text-dark' : 'text-white'}`}>01</p>
                    <small className={`${theme === 'light' ? 'text-dark' : 'text-white'}`}>Get more discount</small>
                </div>
                <div className={Style.subscribe_box_left_box}>
                    <p className={`${theme === 'light' ? 'text-dark' : 'text-white'}`}>02</p>
                    <small className={`${theme === 'light' ? 'text-dark' : 'text-white'}`}>Get premium magazines</small>
                </div>
                <div className='w-[60%] flex p-2 bg-primary border rounded-xl mt-5'>
                    <input type="email" placeholder='Enter your email' className='bg-primary'/>
                    <RiSendPlaneFill className={`text-white ${Style.subscribe_box_left_input_icon}`}/>
                </div>
            </div>
            <div className={Style.subcribe_box_right}>
                <Image className={Style.subcribe_box_right_image} 
                src={images.update} alt='get update' 
                height={600} 
                width={800}/>
            </div>
        </div>
    </div>
  )
}

export default Subscribe