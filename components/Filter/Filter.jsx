import React, { useState} from 'react'
// usualy error
import{FaFilter, FaAngleDown, FaAngleUp, FaWallet, FaMusic, FaVideo, FaImages, FaUserAlt} from "react-icons/fa"
import {AiFillCloseCircle, AiFillLayout} from 'react-icons/ai'
import {MdVerified} from  'react-icons/md'
import {TiTick} from 'react-icons/ti'
import {CheckboxGroup, Checkbox} from "@nextui-org/react";

// INTERNAL IMPORT 
import Style from './Filter.module.css'
import images from '../../img';
const Filter = () => {
    const [filter, setFilter] = useState(true);
    const [image, setImage] = useState(true);
    const [video, setVideo] = useState(true);
    const [music, setMusic] = useState(true);
    const [nfts, setNfts] = useState(true);
    const [arts, setArts] = useState(false);
    const [musics, setMusics] = useState(false);
    const [sport, setSport] = useState(false);
    const [photography, setPhotography] = useState(false);
    const [activeBtn, setActiveBtn] = useState(1);
    const [groupSelected, setGroupSelected] = React.useState([]);
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
    const openNfts = () => {
        if(!nfts){
            setNfts(true);
            setArts(false);
            setMusics(false);
            setSport(false);
            setPhotography(false);
            setActiveBtn(1)
        }
    }
    const openArts = () => {
        if(!arts){
            setNfts(false);
            setArts(true);
            setMusics(false);
            setSport(false);
            setPhotography(false);
            setActiveBtn(2)
        }
    }
    const openMusics = () => {
        if(!musics){
            setNfts(false);
            setArts(false);
            setMusics(true);
            setSport(false);
            setPhotography(false);
            setActiveBtn(3)
        }
    }
    const openSports = () => {
        if(!sport){
            setNfts(false);
            setArts(false);
            setMusics(false);
            setSport(true);
            setPhotography(false);
            setActiveBtn(4)
        }
    }
    const openPhotography = () => {
        if(!photography){
            setNfts(false);
            setArts(false);
            setMusics(false);
            setSport(false);
            setPhotography(true);
            setActiveBtn(5)
        }
    }
  return (
    <div className={Style.filter}>
        <div className={Style.filter_box}>
            <div className={`flex flex-col gap-2`}>
            <CheckboxGroup
                label="Select NFT"
                orientation="horizontal"
                defaultValue={["buenos-aires", "san-francisco"]}
                color='secondary'
                value={groupSelected}
                onChange={setGroupSelected}
                >
               <div className='flex gap-5'>
                    <Checkbox className='text-white' value="All">All</Checkbox>
                    <Checkbox className='text-white' value="Image">Image</Checkbox>
                    <Checkbox className='text-white' value="Photography">Photography</Checkbox>
                    <Checkbox className='text-white' value="Arts">Arts</Checkbox>
                    <Checkbox className='text-white' value="Musics">Musics</Checkbox>
                    <Checkbox className='text-white' value="Sport">Sport</Checkbox>
               </div>
            </CheckboxGroup>
            <p className="mt-4 ml-1 text-default-500">
                Selected: {groupSelected.join(", ")}
            </p>
            </div>
            {/* <div className={Style.filter_box_right}>
                <div className={Style.filter_box_right_box}
                    onClick={() => openFilter()}>
                    <FaFilter/>
                    <span>Filter</span> 
                    {filter ? <FaAngleDown/> : <FaAngleUp/>}
                </div>
            </div> */}
        </div>
        {/* {
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
        } */}
    </div>
  )
}

export default Filter