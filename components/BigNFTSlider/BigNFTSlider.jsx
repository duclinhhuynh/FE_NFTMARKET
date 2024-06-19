import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AiFillFire, AiFillHeart, AiOutlineeH } from "react-icons/ai";
import { MdTimer, MdVerified } from "react-icons/md";
import {
  TbArrowBigLeftLines,
  TbArrowBigRight,
  TbArrowBigRightLine,
} from "react-icons/tb";
import { FaCamera } from "react-icons/fa";
import Style from "./BigNFTSlider.module.css";
import images from "../../img";
import { Button } from "@nextui-org/button";
// axios
import axios from "axios";
import { fetchPrice } from "../../api/api";
// theme
import ThemeSwitcherText from "../theme/ThemeSwitcherText";
const BigNFTSlider = () => {
  const [ethPrice, setEthPrice] = useState(null);
  const [idNumber, setIdNumber] = useState(1);
  const sliderData = [
    {
      title: "Hello NFT",
      id: 1,
      name: "Hades Lu",
      collection: "Gym",
      price: "1 ETH",
      like: 243,
      image: images.user1,
      nftImage: images.nft1,
      time: {
        days: 7,
        hours: 1,
        minutes: 32,
        seconds: 35,
      },
    },
    {
      title: "Buddy NFT",
      id: 2,
      name: "Shoaib Hussain",
      collection: "Home",
      price: "0.32 ETH",
      like: 30,
      image: images.user3,
      nftImage: images.nft2,
      time: {
        days: 37,
        hours: 10,
        minutes: 11,
        seconds: 35,
      },
    },
    {
      title: "Gym NFT",
      id: 3,
      name: "Daniel Phan",
      collection: "Home",
      price: "0.07 ETH",
      like: 343,
      image: images.user5,
      nftImage: images.nft4,
      time: {
        days: 12,
        hours: 4,
        minutes: 11,
        seconds: 6,
      },
    },
    {
      title: " NFT",
      id: 4,
      name: "Shoaib Hussain",
      collection: "Home",
      price: "0.2 ETH",
      like: 453,
      image: images.user2,
      nftImage: images.nft3,
      time: {
        days: 8,
        hours: 10,
        minutes: 2,
        seconds: 35,
      },
    },
  ];
  const inc = useCallback(() => {
    if (idNumber + 1 < sliderData.length) {
      // setIdNumber(setIdNumber + 1);
      setIdNumber(idNumber + 1);
    }
  }, [idNumber, sliderData.length]);
  //----- Dec
  const dec = useCallback(() => {
    if (idNumber > 0) {
      setIdNumber(idNumber - 1);
    }
  }, [idNumber]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPrice();
        setEthPrice(response.ethereum.usd);
      } catch (error) {
        console.error("Error fetching ETH price:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={Style.bigNFTSlider}>
      <ThemeSwitcherText>
        <div className={Style.bigNFTSlider_box}>
          <div className={Style.bigNFTSlider_box_left}>
            <h2>{sliderData[idNumber].title}</h2>
            <div className={Style.bigNFTSlider_box_left_creator}>
              <div className={Style.bigNFTSlider_box_left_creator_profile}>
                <Image
                  className={Style.bigNFTSlider_box_left_creator_profile_img}
                  alt="profile image"
                  src={sliderData[idNumber].image}
                  width={50}
                  height={50}
                />
                <div
                  className={Style.bigNFTSlider_box_left_creator_profile_info}
                >
                  <p>Creator</p>
                  <h4>
                    {sliderData[idNumber].name}
                    &nbsp;
                    <MdVerified />
                  </h4>
                </div>
                <div className={Style.bigNFTSlider_box_left_creator_collection}>
                  <AiFillFire
                    className={Style.bigNFTSlider_box_left_creator_icon}
                  />
                </div>
              </div>

              <div
                className={Style.bigNFTSlider_box_left_creator_collection_info}
              >
                <p>Colection</p>
                <p>{sliderData[idNumber].collection}</p>
              </div>
            </div>
            <div className={Style.bigNFTSlider_box_left_bidding}>
              <div className={Style.bigNFTSlider_box_left_bidding_box}>
                <small>Current Bid</small>
                <p className={Style.bigNFTSlider_box_left_bidding_box_icon}>
                  {sliderData[idNumber].price}{" "}
                  <span>
                    &nbsp;&nbsp; $
                    {ethPrice &&
                      (
                        ethPrice *
                        parseFloat(sliderData[idNumber].price.split(" ")[0])
                      ).toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
            <p className={Style.bigNFTSlider_box_left_bidding_box_auction}>
              <MdTimer
                className={Style.bigNFTSlider_box_left_bidding_boxixon}
              />
              <span>Auction ending in </span>
            </p>
            <div className={Style.bigNFTSlider_box_left_bidding_box_timer}>
              <div
                className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
              >
                <p>{sliderData[idNumber].time.days}</p>
                <span>Days</span>
              </div>
              <div
                className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
              >
                <p>{sliderData[idNumber].time.hours}</p>
                <span>Hours</span>
              </div>
              <div
                className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
              >
                <p>{sliderData[idNumber].time.minutes}</p>
                <span>minutes</span>
              </div>
              <div
                className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
              >
                <p>{sliderData[idNumber].time.seconds}</p>
                <span>seconds</span>
              </div>
            </div>
            <div className={Style.bigNFTSlider_box_left_button}>
              <Button color="primary" variant="bordered" onClick={() => {}}>
                Place
              </Button>
              <Button
                color="primary"
                variant="bordered"
                endContent={<FaCamera />}
                onClick={() => {}}
              >
                View
              </Button>
            </div>
            <div className={Style.bigNFTSlider_box_left_sliderBtn}>
              <TbArrowBigLeftLines
                className={Style.bigNFTSlider_box_left_sliderBtn_icon}
                onClick={() => inc()}
              />
              <TbArrowBigRightLine
                className={Style.bigNFTSlider_box_left_sliderBtn_icon}
                onClick={() => dec()}
              />
            </div>
          </div>
          <div className={Style.bigNFTSlider_box_right}>
            <div className={Style.bigNFTSlider_box_right_box}>
              <Image
                className={Style.bigNFTSlider_box_right_box_img}
                src={sliderData[idNumber].nftImage}
                alt="NFT IMAGE"
                width={900}
                height={630}
              />
              <div className={Style.bigNFTSlider_box_right_box_like}>
                <AiFillHeart />
                <span>{sliderData[idNumber].like}</span>
              </div>
            </div>
          </div>
        </div>
      </ThemeSwitcherText>
    </div>
  );
};

export default BigNFTSlider;
