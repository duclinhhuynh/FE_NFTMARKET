import React, { useState, useEffect} from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import {BsImages} from 'react-icons/bs'
import Image from 'next/image'
// IMPORT 
import images from '../../img'
import Style from "./NFTCard.module.css"
import { fetchPrice } from '../../api/api'
const NFTCard = () => {
    const featureArray = [{
        nft: images.music6
    },
    {
        nft: images.music10
    },
    {
        nft: images.music9
    },
    {
        nft: images.music13
    },
    {
        nft: images.music3
    },
    {
        nft: images.create1
    },
    {
        nft: images.create2
    },
    {
        nft: images.create3
    },
    {
        nft: images.music7
    }

]
    const [like, setLike] = useState(true)
     const [ethPrices, setEthPrices] = useState(null);
    const likeNft = () => {
        if(!like){
            setLike(true)
        }else{
            setLike(false)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchPrice();
                setEthPrices(response.ethereum.usd);
            } catch (error) {
                console.error('Error fetching ETH price:', error);
            }
        };
    
        fetchData();
    }, []);
    return (
        <div className={Style.NFTCard}>
            {featureArray.map((el, i) => (
                <div className={Style.NFTCard_box} key={i + 1}>
                    <div className={Style.NFTCard_box_img}>
                        <Image src={el.nft} alt='NFT images' 
                        width={500}
                        height={400}
                        objectFit="contain"
                        className={Style.NFTCard_box_img_img}
                        />
                    </div>
                    <div className={Style.NFTCard_box_update}>
                        <div className={Style.NFTCard_box_update_left}>
                            <div className={Style.NFTCard_box_update_left_like}
                                onClick={() => likeNft()}>
                                {like ? (
                                    <AiOutlineHeart/>
                                ): (<AiFillHeart className={Style.NFTCard_box_update_left_like_icon}
                                />
                                )} {""} 22
                            </div>
                        </div>
                        <div className={Style.NFTCard_box_update_right}>
                            <div className={Style.NFTCard_box_update_right_info}>
                                <small>Remaining time</small>
                                <p>3h : 15m : 20s</p>
                            </div>
                        </div>
                    </div>
                    <div className={Style.NFTCard_box_update_details}>
                        <div className={Style.NFTCard_box_update_details_price}>
                            <div className={Style.NFTCard_box_update_details_price_box}>
                                <h4>Clone #17373</h4>
                                <div className={Style.NFTCard_box_update_details_price_box_box}>
                                    <div className={Style.NFTCard_box_update_details_price_box_bid}>
                                        <small>Current Bid</small>
                                        <p>2ETH<span>&nbsp;&nbsp;$
                                                {ethPrices &&
                                                    (ethPrices * 2).toFixed(0)}</span></p>
                                    </div>
                                    <div className={Style.NFTCard_box_update_details_price_box_stock}>
                                        <small>61 in stock </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={Style.NFTCard_box_update_details_category}>
                            <BsImages/>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default NFTCard