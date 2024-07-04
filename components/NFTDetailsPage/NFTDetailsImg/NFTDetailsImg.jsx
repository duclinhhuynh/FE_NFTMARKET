import React, { useState } from "react";
import { BsImages } from "react-icons/bs";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import Style from "./NFTDetailsImg.module.css";
import { useTheme } from "next-themes";
import { Button, Image } from "@nextui-org/react";
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
  const handleViewImage = () => {
    const photoUrl = nft.imageurl; // Thay đổi URL ảnh tại đây

    // Mở URL trong tab hoặc cửa sổ mới khi click vào button
    window.open(photoUrl, "_blank");
  };
  return (
    <div className={` ${Style.NFTDetailsImg}`}>
      <div className={Style.NFTDetailsImg_box}>
        <div className={`${Style.NFTDetailsImg_box_NFT}`}>
          <div className={`${Style.NFTDetailsImg_box_NFT_like}`}>
            <Button
              className="mt-1 rounded-xl"
              isIconOnly
              color="warning"
              size="sm"
              aria-label="Take a photo"
              onClick={handleViewImage}
            >
              <FaCamera size={20} />
            </Button>
            <div onClick={likeNFT} className="flex items-center gap-1">
              <span>26</span>
              <Button
                isIconOnly
                color="danger"
                aria-label="Like"
                size="sm"
                endContent={<GoHeart size={19} />}
                className="rounded-xl z-1"
              ></Button>
            </div>
          </div>
          <div className={`mb-2 ${Style.NFTDetailsImg_box_NFT_img}`}>
            <Image
              isBlurred
              src={nft.imageurl} // Ensure this path is correct
              className={`p-1 border border-bordercustom ${Style.NFTDetailsImg_box_NFT_img_img}`}
              alt="NFT image"
              width={700}
              height={800}
              objectFit="cover"
            />
          </div>
        </div>
        <div className="border border-bordercustom rounded-md mt-2 bg-itembackground">
          <div
            className={Style.NFTDetailsImg_box_description}
            onClick={openDescription}
          >
            <p className={Theme}>Description</p>
            {description ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
          </div>
          {description ? (
            <div className="border-b border-bordercustom"></div>
          ) : (
            ""
          )}
          {description && (
            <div className={`${Style.NFTDetailsImg_box_description_box}`}>
              <p className={Theme}>{nft.description}</p>
            </div>
          )}
        </div>
        <div className="border border-bordercustom rounded-md mt-2 bg-itembackground">
          <div
            className={Style.NFTDetailsImg_box_details}
            onClick={openDetails}
          >
            <p className={Theme}>Details</p>
            {details ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
          </div>
          {details ? <div className="border-b border-bordercustom"></div> : ""}
          {details && (
            <div className={`${Style.NFTDetailsImg_box_details_box}`}>
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
