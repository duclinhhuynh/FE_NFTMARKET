import React, { useState} from 'react'
// usualy error
import{FaFilter, FaAngleDown, FaAngleUp, FaWallet, FaMusic, FaVideo, FaImages, FaUserAlt} from "react-icons/fa"
import {AiFillCloseCircle, AiFillLayout} from 'react-icons/ai'
import {MdVerified} from  'react-icons/md'
import {TiTick} from 'react-icons/ti'

// INTERNAL IMPORT 
import Style from './Filter.module.css'
import images from '../../img';
const Filter = () => {
    const [filter, setFilter] = useState(true);
    const [image, setImage] = useState(true);
    const [video, setVideo] = useState(true);
    const [music, setMusic] = useState(true);
    const openFilter = () => {
        if(!filter){
            setFilter(true);
        }else {
            setFilter(false);
        }
    }
    const openImage = () => {
        if(!image){
            setImage(true)
        }else{
            setImage(false)
        }
    }
    const openVideo = () => {
        if(!video){
            setVideo(true)
        }else{
            setVideo(false)
        }
    }
    const openMusic = () => {
        if(!music){
            setMusic(true)
        }else{
            setMusic(false)
        }
    }
  return (
    <div className={Style.filter}>
        <div className={Style.filter_box}>
            <div className={Style.filter_box_left}>
                <button onClick={() => {}}>NFTS</button>
                <button onClick={() => {}}>Arts</button>
                <button onClick={() => {}}>Musics</button>
                <button onClick={() => {}}>Sports</button>
                <button onClick={() => {}}>Photography</button>
            </div>
            <div className={Style.filter_box_right}>
                <div className={Style.filter_box_right_box}
                    onClick={() => openFilter()}>
                    <FaFilter/>
                    <span>Filter</span> 
                    {filter ? <FaAngleDown/> : <FaAngleUp/>}
                </div>
            </div>
        </div>
        {
            filter && (
                <div className={Style.filter_box_items}>
                    <div className={Style.filter_box_items_box}>
                        <div className={Style.filter_box_items_box_item}>
                            <FaWallet/>
                            <span>0.01 ETH</span>
                            <AiFillCloseCircle/>
                        </div>
                    </div>
                    <div className={Style.filter_box_items_box}>
                       <div className={Style.filter_box_items_box_item_trans} 
                       onClick={() => openImage()}>
                        <FaImages/><small>Images</small>
                        {image ? <AiFillCloseCircle/> : <TiTick/>}
                        </div> 
                    </div>
                    <div className={Style.filter_box_items_box}>
                       <div className={Style.filter_box_items_box_item_trans} 
                       onClick={() => openVideo()}>
                        <FaVideo/><small>Videos</small>
                        {video ? <AiFillCloseCircle/> : <TiTick/>}
                        </div> 
                    </div>
                    <div className={Style.filter_box_items_box}>
                       <div className={Style.filter_box_items_box_item_trans} 
                       onClick={() => openMusic()}>
                        <FaMusic/><small>Musics</small>
                        {music ? <AiFillCloseCircle/> : <TiTick/>}
                        </div> 
                    </div>
                    <div className={Style.filter_box_items_box}>
                        <div className={Style.filter_box_items_box_item}>
                            <FaUserAlt/> <span>VeriFied</span>
                            <MdVerified/>
                        </div>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default Filter