import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import Style from './FollowerTabCard.module.css'
import images from '../../../img'
import {MdVerified} from 'react-icons/md'
import {TiTick} from 'react-icons/ti'
const FollowerTabCard = ({i, el}) => {
    const [following, setFollowing] = useState(true)
    const followMe = () => {
        if(!following){
            setFollowing(true);
        }else{
            setFollowing(false);
        }
    }
  return (
    <div className={Style.FollowerTabCard}>
        <div className={Style.FollowerTabCard_rank}>
            <p>
                #{i + 1} <span>🏅</span>
            </p>
        </div>
        <div className={Style.FollowerTabCard_box}>
            <div className={Style.FollowerTabCard_box_img}>
                <Image src={el.imageurl || images.pilot5} 
                className={Style.FollowerTabCard_box_img_img}
                alt="profile background"
                width={400}
                height={300}
                objectFit='cover'
                />
            </div>
            <div className={Style.FollowerTabCard_box_profile}>
                <Image className={Style.FollowerTabCard_box_profile_img} alt='picture'
                   width={50} 
                   height={50}
                   src={el.user || images.user1}
                   objectFit='cover'
                />
            </div>
            <div className={Style.FollowerTabCard_box_info}>
                 <div className={Style.FollowerTabCard_box_info_name}>
                    <h4>{el.seller.slice(0 , 9)} {""} {""} 
                    <span><MdVerified/></span>
                    </h4>
                    <p>${el.total || 0} ETH</p>
                 </div>
                 <div className={Style.FollowerTabCard_box_info_following}>
                    {following ? (
                        <a onClick={() => followMe()} className={Style.FollowerTabCard_box_info_following_before}>
                            Follow{""}{" "}             
                        </a>
                    ) : (
                        <a onClick={() => followMe()} className={Style.FollowerTabCard_box_info_following_after}>
                            Following{""}{" "}
                            <span><TiTick/></span>
                        </a>
                    )}
                 </div>
            </div>
        </div>
    </div>
  )
}

export default FollowerTabCard