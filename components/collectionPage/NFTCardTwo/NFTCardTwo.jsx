import React, { useState } from 'react';
import Image from 'next/image';

// INTERNAL IMPORT
import { BsImage } from 'react-icons/bs';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { MdVerified, MdTimer } from 'react-icons/md';
import Style from './NFTCardTwo.module.css';
import { LikeProfile } from '../../componentsindex';
import Link from 'next/link';

const NFTCardTwo = ({ NFTData }) => {
  const [like, setLike] = useState(false);
  const [likeInc, setLikeInc] = useState(23);

  const likeNFT = () => {
    if (!like) {
      setLike(true);
      setLikeInc(23);
    } else {
      setLike(false);
      setLikeInc(23 + 1);
    }
  };

  return (
    <div className={Style.NFTCardTwo}>
      {NFTData?.map((el, i) => (
        <Link href={{pathname: "/NFTDetails", query:el}} key = {i + 1}>
          <div className={Style.NFTCardTwo_box} key={i + 1}>
            <div className={Style.NFTCardTwo_box_like}>
              <div className={Style.NFTCardTwo_box_like_box}>
                <div className={Style.NFTCardTwo_box_like_box_box}>
                  <BsImage className={Style.NFTCardTwo_box_like_box_box_icon} />
                  <p onClick={() => likeNFT()}>
                    {like ? <AiOutlineHeart /> : <AiFillHeart />}
                    <span>{likeInc + 1}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className={Style.NFTCardTwo_box_img}>
              <Image src={el.imageurl} 
              alt="NFT" 
              width={200} height={200} 
              objectFit="cover" 
              className={Style.NFTCardTwo_box_img_img}
              />
            </div>
            <div className={Style.NFTCardTwo_box_info}>
              <div className={Style.NFTCardTwo_box_info_left}>
                <LikeProfile />
                <p>{el.name}</p>
              </div>
              <small>4{i + 2}</small>
            </div>
            <div className='flex justify-between'>
              <div >
                <small className='p-2 ml-2'>Current Bid</small>
                <p className='border rounded-md p-2 ml-2 mb-2'>{el.price} ETH</p>
              </div>
              <div className={Style.NFTCardTwo_box_price_stock}>
                <MdTimer />
                <span>{i + 1} hours left</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NFTCardTwo;
