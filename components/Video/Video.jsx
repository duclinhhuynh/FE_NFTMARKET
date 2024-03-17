import React from 'react'
import Image from 'next/image'
// INTERNAL IMPORT 
import Style from './Video.module.css'
import images from '../../img'
const Video = () => {
  return (
    <div className={Style.Video}>
        <div className={Style.Video_box}>
            <h1><span>🎥</span> The Videos</h1>
            <p>Check out our hottest videos. View more perspectioves on just about any topic</p>
            <div className={Style.Video_box_frame}>
                <div className={Style.Video_box_frame_left}>
                    <Image src={images.hero}
                        alt="Video image"
                        width={1080}
                        height={1080}
                        objectFit="cover"
                        className={Style.Video_box_frame_left_img}
                    />
                </div>
                <div className={Style.Video_box_frame_right}>         
                </div>
            </div>
        </div>
    </div>
  )
}

export default Video