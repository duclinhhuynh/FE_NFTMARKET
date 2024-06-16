import React, { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Image from "next/image";
// IMPORT
import images from "../../img";
import { fetchPrice } from "../../api/api";
import Link from "next/link";
import Style from "./NFTCard.module.css";

const NFTCard = ({ NFTData }) => {
  const featureArray = [
    {
      nft: images.music6,
    },
    {
      nft: images.music10,
    },
    {
      nft: images.music9,
    },
    {
      nft: images.music13,
    },
    {
      nft: images.music3,
    },
    {
      nft: images.create1,
    },
    {
      nft: images.create2,
    },
    {
      nft: images.create3,
    },
    {
      nft: images.music7,
    },
  ];
  const [like, setLike] = useState(true);
  const [ethPrices, setEthPrices] = useState(null);
  const likeNft = () => {
    if (!like) {
      setLike(true);
    } else {
      setLike(false);
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
    <div className="w-[90%] flex flex-wrap gap-10 m-auto ">
      {NFTData.map((el, i) => (
        <Link href={{ pathname: "/NFTDetails", query: el }}>
          <div key={i + 1} className="bg-itembackground rounded-xl shadow-xl">
            <div>
              <Image
                src={el.imageurl}
                alt="NFT images"
                width={250}
                height={200}
                objectFit="contain"
                className={`rounded-t-xl ${Style.NFTCard_img}`}
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
                        &nbsp;<i>~</i>&nbsp;$
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

export default NFTCard;
