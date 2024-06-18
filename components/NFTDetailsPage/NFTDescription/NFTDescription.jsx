import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  MdVerified,
  MdCloudUpload,
  MdReportProblem,
  MdOutLineDeleteSweep,
} from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { FaPercentage, FaWallet } from "react-icons/fa";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";
import { BsFillTagsFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import { BiDollar, BiTransferAlt } from "react-icons/bi";
import { FaAnglesRight } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";
import Style from "./NFTDescription.module.css";
import images from "../../../img";
import { Button } from "@nextui-org/react";
import { NFTTabs } from "../NFTDetailsIndex";
import { fetchPrice } from "../../../api/api";
import { NFTMarketplaceContext } from "../../../Context/NFTMarketplaceContext";
import ThemeSwitcherText from "../../theme/ThemeSwitcherText";
const NFTDescription = ({ nft }) => {
  const [social, setSocial] = useState(false);
  const [NFTMenu, setNFTMenu] = useState(false);
  const [history, setHistory] = useState(true);
  const [provanannce, setProvanance] = useState(false);
  const [owner, setOwner] = useState(false);
  const [activeBtn, setActiveBtn] = useState(1);
  const [ethPrice, setEthPrice] = useState(null);

  const historyArray = [
    images.user1,
    images.user2,
    images.user3,
    images.user4,
    images.user5,
  ];
  const provananceArray = [
    images.user3,
    images.user4,
    images.user5,
    images.user1,
    images.user2,
  ];
  const ownerArray = [images.user4, images.user5, images.user3];
  const router = useRouter();
  const openTabs = (e) => {
    const tab = e.target.innerText;
    if (tab === "Bid History") {
      setHistory(true);
      setProvanance(false);
      setOwner(false);
      setActiveBtn(1);
    } else if (tab === "Provenance") {
      setHistory(false);
      setProvanance(true);
      setOwner(false);
      setActiveBtn(2);
    } else if (tab === "Owner") {
      setHistory(false);
      setProvanance(false);
      setOwner(true);
      setActiveBtn(3);
    }
  };
  const openSocial = () => {
    if (!social) {
      setSocial(true);
      setNFTMenu(false);
    } else {
      setSocial(false);
    }
  };
  const openNFTMenu = () => {
    if (!NFTMenu) {
      setNFTMenu(true);
      setSocial(false);
    } else {
      setNFTMenu(false);
    }
  };
  const openOwner = () => {
    if (!owner) {
      setOwner(true);
      setHistory(false);
      setProvanance(false);
    } else {
      setOwner(false);
    }
  };
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

  // SMART CONTRACT DATA
  const { buyNFT, currentAccount } = useContext(NFTMarketplaceContext);
  const copyAddress = () => {
    const copyText = document.getElementById("myInput");

    copyText.select();
    navigator.clipboard.writeText(copyText.value);
  };
  const [showCheck, setShowCheck] = useState(false);

  const handleMouseDown = () => {
    setShowCheck(true);
    setTimeout(() => {
      setShowCheck(false);
    }, 700);
  };
  return (
    <div className={Style.NFTDescription}>
      <ThemeSwitcherText>
        <div className={Style.NFTDescription_box}>
          <div className="flex justify-between">
            <p>Virtural Words</p>
            <div className={Style.NFTDescription_box_share_box}>
              <MdCloudUpload
                className={Style.NFTDescription_box_share_box_icon}
                onClick={() => setSocial(!social)}
              />
              {social && (
                <div className={Style.NFTDescription_box_share_box_social}>
                  <a href="#">
                    <TiSocialFacebook /> FaceBook
                  </a>
                  <a href="#">
                    <TiSocialLinkedin /> Linkedin
                  </a>
                  <a href="#">
                    <TiSocialTwitter /> Twitter
                  </a>
                  <a href="#">
                    <TiSocialYoutube /> Youtube
                  </a>
                  <a href="#">
                    <TiSocialInstagram /> Instagram
                  </a>
                </div>
              )}
              <BsThreeDots
                className={Style.NFTDescription_box_share_box_icon}
                onClick={() => setNFTMenu(!NFTMenu)}
              />
              {NFTMenu && (
                <div className={Style.NFTDescription_box_share_box_social}>
                  <a href="#">
                    <BiDollar /> Change price
                  </a>
                  <a href="#">
                    <BiTransferAlt /> Transfer
                  </a>
                  <a href="#">
                    <MdReportProblem /> Report abuse
                  </a>
                  <a href="#">
                    <MdOutLineDeleteSweep /> Report abuse
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className={Style.NFTDescription_box_profile}>
            <div className={Style.NFTDescription_box_profile_box}>
              <h1>{nft.name}</h1>
              <div className={Style.NFTDescription_box_profile_box_left}>
                <Image
                  src={images.user1}
                  alt="profile"
                  width={40}
                  height={40}
                  className={Style.NFTDescription_box_profile_box_left_img}
                />
                <div className="">
                  <small>Creator</small>
                  <br />
                  <span c
                    onClick={() => copyAddress()}
                    onMouseDown={handleMouseDown}
                    className="flex cursor-pointer items-center gap-2 p-2"
                  >
                    Ronaos <MdVerified />
                    <input type="text" value={nft.seller} id="myInput" hidden />
                    {nft.seller.slice(0, 7) + "..." + nft.seller.slice(-3)}
                    {showCheck ? (
                      <FaRegCheckCircle
                        className="flex items-center text-green-500"
                      />
                    ) : (
                      <FiCopy
                        className="flex items-center"
                      />
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className={Style.NFTDescription_box_profile_bidding}>
              <p>
                <span>Auction ending in:</span>
              </p>
              <div
                className={Style.NFTDescription_box_profile_biding_box_timer}
              >
                <div
                  className={
                    Style.NFTDescription_box_profile_biding_box_timer_item
                  }
                >
                  <p>2</p>
                  <span>Days</span>
                </div>
                <div
                  className={
                    Style.NFTDescription_box_profile_biding_box_timer_item
                  }
                >
                  <p>12</p>
                  <span>Hours</span>
                </div>
                <div
                  className={
                    Style.NFTDescription_box_profile_biding_box_timer_item
                  }
                >
                  <p>12</p>
                  <span>Min</span>
                </div>
                <div
                  className={
                    Style.NFTDescription_box_profile_biding_box_timer_item
                  }
                >
                  <p>12</p>
                  <span>sec</span>
                </div>
              </div>
              <div
                className={Style.NFTDescription_box_profile_biding_box_price}
              >
                <div
                  className={
                    Style.NFTDescription_box_profile_biding_box_price_bid
                  }
                >
                  <small>Current Bid</small>
                  <p>
                    {nft.price} ETH ~&nbsp;
                    <span>
                      $
                      {ethPrice &&
                        (
                          ethPrice * parseFloat(nft.price.split(" ")[0])
                        ).toFixed(0)}
                    </span>
                  </p>
                </div>
                <span>[102 stock]</span>
              </div>
              <div
                className={Style.NFTDescription_box_profile_biding_box_button}
              >
                {currentAccount == nft.seller.toLowerCase() ? (
                  <p>You can not buy your NFT</p>
                ) : currentAccount == nft.owner.toLowerCase() ? (
                  <Button
                    color="primary"
                    variant="bordered"
                    startContent={<FaListAlt />}
                    onClick={() =>
                      router.push(
                        `/reSellToken?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`
                      )
                    }
                    classStyle={Style.button}
                  >
                    List on Martketplace
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    variant="bordered"
                    startContent={<FaWallet />}
                    onClick={() => buyNFT(nft)}
                    classStyle={Style.button}
                  >
                    Buy NFT
                  </Button>
                )}
                <Button
                  color="primary"
                  variant="bordered"
                  startContent={<BsFillTagsFill />}
                  onClick={() => buyNFT(nft)}
                  classStyle={Style.button}
                >
                  <div>Make offer</div>
                </Button>
              </div>
              <div className={Style.NFTDescription_box_profile_biding_box_tabs}>
                <button
                  className={`${activeBtn === 1 ? Style.active : ""}`}
                  onClick={(e) => openTabs(e)}
                >
                  Bid History
                </button>
                <button
                  className={`${activeBtn === 2 ? Style.active : ""}`}
                  onClick={(e) => openTabs(e)}
                >
                  Provenance
                </button>
                <button
                  className={`${activeBtn === 3 ? Style.active : ""}`}
                  onClick={(e) => openTabs(e)}
                >
                  Owner
                </button>
              </div>
              {history && (
                <div
                  className={Style.NFTDescription_box_profile_biding_box_card}
                >
                  <NFTTabs dataTabs={historyArray} />
                </div>
              )}
              {provanannce && (
                <div
                  className={Style.NFTDescription_box_profile_biding_box_card}
                >
                  <NFTTabs dataTabs={provananceArray} />
                </div>
              )}
              {owner && (
                <div
                  className={Style.NFTDescription_box_profile_biding_box_card}
                >
                  <NFTTabs dataTabs={ownerArray} icon={<MdVerified />} />
                </div>
              )}
            </div>
          </div>
        </div>
      </ThemeSwitcherText>
    </div>
  );
};

export default NFTDescription;
