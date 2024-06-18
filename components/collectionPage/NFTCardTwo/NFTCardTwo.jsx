import React, { useState, useEffect } from "react";
import Image from "next/image";

// INTERNAL IMPORT
import { BsImage } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import Style from "./NFTCardTwo.module.css";
import { LikeProfile } from "../../componentsindex";
import Link from "next/link";
import { fetchPrice } from "../../../api/api";

const NFTCardTwo = ({ NFTData }) => {
  const [like, setLike] = useState(false);
  const [likeInc, setLikeInc] = useState(23);
  const [ethPrices, setEthPrices] = useState(null);

  const likeNFT = () => {
    if (!like) {
      setLike(true);
      setLikeInc(23);
    } else {
      setLike(false);
      setLikeInc(23 + 1);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPrice();
        setEthPrices(response.ethereum.usd);
      } catch (error) {
        console.error("Error fetching ETH price:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="flex flex-wrap gap-5 m-auto mt-10">
      {NFTData?.map((el, i) => (
        <Link href={{ pathname: "/NFTDetails", query: el }} key={i + 1}>
          <div key={i + 1} className="bg-itembackground rounded-xl shadow-xl">
            <div className="">
              <Image
                src={el.imageurl}
                alt="NFT images"
                width={250}
                height={100}
                objectFit="contain"
                className={Style.NFTCardTwo_box_img_img}
              />
            </div>
            <div className="p-3">
              <div className="flex item-center justify-between">
                <h4 className="text-lg text-textprimary font-semibold">
                  {el.name}# {el.tokenId}
                </h4>
                <h4 className="">Time</h4>
              </div>
              <div>
                <div>
                  <div className="flex justify-between">
                    <small>Current Bid</small>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-lg font-bold text-textprimary font-semibold ">
                      {el.price}
                      <span>
                        &nbsp;&nbsp;$
                        {ethPrices && (ethPrices * el.price).toFixed(0)}
                      </span>
                    </p>
                    <p className="text-lg text-textprimary">3h:4m:2s</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NFTCardTwo;
