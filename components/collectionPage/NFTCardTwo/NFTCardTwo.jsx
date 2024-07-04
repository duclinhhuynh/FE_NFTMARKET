import React, { useState, useEffect } from "react";
import { Button, Image} from "@nextui-org/react";

// INTERNAL IMPORT
import Style from "./NFTCardTwo.module.css";
import Link from "next/link";
import { fetchPrice } from "../../../api/api";
import CountDown from "../../CountDown/CountDown"

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
        // console.error("Error fetching ETH price:", error);
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
                isBlurred
                src={el.imageurl}
                alt="NFT images"
                width={250}
                className={Style.NFTCardTwo_box_img_img}
              />
            </div>
            <div className="p-3">
              <div className="flex item-center justify-between">
                <h4 className="text-lg text-textprimary font-semibold">
                  {el.name}# {el.tokenId}
                </h4>
              </div>
              <div>
                <div>
                  <div className="flex justify-between">
                    <small>Current Bid</small>
                    <small className="">Time Stamp</small>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold text-textprimary font-semibold ">
                      {el.price}
                      <span className="text-sm text-gray-500">
                        &nbsp;&nbsp;$
                        {ethPrices && (ethPrices * el.price).toFixed(0)}
                      </span>
                    </p>
                    <p className="text-sm text-textprimary"><CountDown timestamp={el.timestamp}/></p>
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
