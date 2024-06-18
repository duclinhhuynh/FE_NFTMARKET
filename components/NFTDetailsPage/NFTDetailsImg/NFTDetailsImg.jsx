import React, { useState } from "react";
import Image from "next/image";
import { BsImages } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import Style from "./NFTDetailsImg.module.css";
import { useTheme } from "next-themes";
import {Button} from "@nextui-org/react";
import { GoHeart } from "react-icons/go";
import { FaCamera } from "react-icons/fa";
const NFTDetailsImg = ({ nft }) => {
  const [description, setDescription] = useState(true);
  const [details, setDetails] = useState(true);
  const [like, setLike] = useState(false);
  const { theme, setTheme } = useTheme();
  const Theme = theme === "light" ? "text-black" : "text-white";
  const openDescription = () => {
    setDescription(!description);
  };

  const openDetails = () => {
    setDetails(!details);
  };

  const likeNFT = () => {
    // Fixed function name from likeNFt to likeNFT
    setLike(!like);
  };

  return (
    <div className={Style.NFTDetailsImg}>
      <div className={Style.NFTDetailsImg_box}>
        <div className={Style.NFTDetailsImg_box_NFT}>
          <div className={Style.NFTDetailsImg_box_NFT_like}>
          <Button className="mt-1 rounded-xl" isIconOnly color="warning" variant="faded" size="sm" aria-label="Take a photo">
            <FaCamera size={20}/>
          </Button>
            <p onClick={likeNFT}>
              <Button isIconOnly color="danger" aria-label="Like" size="sm" className="rounded-xl">
                <GoHeart size={19}/>
              </Button>
              <span>26</span>
            </p>
          </div>
          <div className={`mb-2 ${Style.NFTDetailsImg_box_NFT_img}`}>
            <Image
              src={nft.imageurl} // Ensure this path is correct
              className={Style.NFTDetailsImg_box_NFT_img_img}
              alt="NFT image"
              width={700}
              height={800}
              objectFit="cover"
            />
          </div>
        </div>
        <div className="border rounded-md">
          <div
            className={Style.NFTDetailsImg_box_description}
            onClick={openDescription}
          >
            <p className={Theme}>Description</p>
            {description ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
          </div>
          {description && (
            <div
              className={`border-t ${Style.NFTDetailsImg_box_description_box}`}
            >
              <p className={Theme}>{nft.description}</p>
            </div>
          )}
        </div>
        <div className="border rounded-md mt-2">
          <div
            className={Style.NFTDetailsImg_box_details}
            onClick={openDetails}
          >
            <p className={Theme}>Details</p>
            {details ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
          </div>
          {details && (
            <div className={`border-t ${Style.NFTDetailsImg_box_details_box}`}>
              <small>2000 x 2000 px.IMAGE(658kb)</small>
              <p className={Theme}>
                <small>Contract Address</small>
                <br />
                {nft.seller}
              </p>
              <p className={Theme}>
                <small>Token ID</small>
                <br />
                {nft.tokenId}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NFTDetailsImg;
