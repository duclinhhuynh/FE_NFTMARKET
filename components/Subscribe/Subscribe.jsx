import React from 'react'
import { RiSendPlaneFill } from 'react-icons/ri'
import Image from 'next/image'

//INTERNAL IMPORT
import Style from "./Subcribe.module.css"
import images from "../../img"
const Subscribe = () => {
  return (
    <div className={Style.subscribe}>
        <div className={Style.subscribe_box}>
            <div className={Style.subscribe_box_left}>
                <h2>Never miss a drop</h2>
                <p>A place with endless fun and the most engaging community.
                We organize a series of onboarding events to help you dive into CARV Play and start data to earn.</p>
                <div className={Style.subscribe_box_left_box}>
                    <span>01</span>
                    <small>Get more discount</small>
                </div>
                <div className={Style.subscribe_box_left_box}>
                    <span>02</span>
                    <small>Get premium magazines</small>
                </div>
                <div className={Style.subscribe_box_left_input}>
                    <input type="email" placeholder='Enter your email'/>
                    <RiSendPlaneFill className={Style.subscribe_box_left_input_icon}/>
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