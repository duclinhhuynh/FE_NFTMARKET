import React, {useState} from 'react'
import Image from 'next/image'
import {TbPlayerPlay, TbPlayerPause} from 'react-icons/tb'
// INTERNAL IMPORT
import images from '../../../img'
import Style from './AudioCardSmall.module.css'
import { LikeProfile } from '../../componentsindex'
const AudioCardSmal = () => {
  const [play, setPlay] = useState(false);
  const playMusic = () => {
    if(!play){
      setPlay(true)
    }
    else{
      setPlay(false)
    }
  };
  return (
    <div className={Style.audioPlayer}>
      <div className={Style.audioPlayer_box}>
        <Image src={images.mac} alt="music"
          width={100}
          height={100}
          className={Style.audioPlayer_box_img}
        />
        <div className={Style.audioPlayer_box_info}>
          <h4>NFT music #23</h4>
          <div className={Style.audioPlayer_box_info_box}>
            <div className={Style.audioPlayer_box_like_box}>
              <LikeProfile/>
              <div className={Style.audioPlayer_box_info_box_price}>
                <small>Price</small>
                <p>1 ETH</p>
              </div>
            </div>
          </div>
        </div>
        <div className={Style.audioPlayer_box_playBtn}
             onClick={() => playMusic()}
        >
          {play ? <TbPlayerPause/> : <TbPlayerPlay/>}
        </div>
      </div>
    </div>
  )
}

export default AudioCardSmal