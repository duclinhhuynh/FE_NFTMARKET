import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdVerified } from "react-icons/md";
import {
  FaRegCheckCircle,
  FaWallet,
  FaShare,
  FaRegFlag,
  FaListUl,
} from "react-icons/fa";
import { BsFillTagsFill, BsThreeDots } from "react-icons/bs";
import { FiCopy, FiRefreshCcw } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { SiWebmoney } from "react-icons/si";
import { MdCancel } from "react-icons/md";
import Style from "./NFTDescription.module.css";
import images from "../../../img";
import { NFTTabs } from "../NFTDetailsIndex";
import { fetchPrice } from "../../../api/api";
import { NFTMarketplaceContext } from "../../../Context/NFTMarketplaceContext";
// next ui
import ThemeSwitcherText from "../../theme/ThemeSwitcherText";
import { Tooltip, Button } from "@nextui-org/react";
const NFTDescription = ({ nft }) => {
  const [NFTMenu, setNFTMenu] = useState(false);
  const [history, setHistory] = useState(true);
  const [activeBtn, setActiveBtn] = useState(1);
  const [ethPrice, setEthPrice] = useState(null);
  const [showCheckShare, setShowCheckShare] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const [openMore, setOpenMore] = useState(false);
  const [offerAmount, setOfferAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // SMART CONTRACT DATA
  const { buyNFT, cancelMarketItem, currentAccount } = useContext(
    NFTMarketplaceContext
  );
  // loading
  const handleCancelMarket = async () => {
    try {
      setIsLoading(true);
      await cancelMarketItem(nft);
    } catch (error) {
      console.error("Error cancelling sale:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuy = async () => {
    try {
      setIsLoading(true);
      await buyNFT(nft);
    } catch (error) {
      console.error("Error cancelling sale:", error);
    } finally {
      setIsLoading(false);
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

  const copyAddress = () => {
    const copyText = document.getElementById("myInput");
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
  };
  const copyAddressShare = () => {
    const copyText = document.getElementById("linkItem");
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
  };
  const handleMouseDown = () => {
    setShowCheck(true);
    setTimeout(() => {
      setShowCheck(false);
    }, 700);
  };
  const handleMouseDownShare = (event) => {
    setShowCheckShare(true);
    setTimeout(() => {
      setShowCheckShare(false);
    }, 700);
  };

  // share on twitter
  const shareOnTwitter = () => {
    const url = nft.imageurl;
    const text = `This is a post check out the historical data for love you!`;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, "_blank");
  };
  const handleOpenShare = () => {
    setOpenShare(!openShare);
    setOpenMore(false);
  };
  const handleOpenMore = () => {
    setOpenMore(!openMore);
    setOpenShare(false);
  };
  // close model
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${Style.network_share}`)) {
        setOpenShare(false);
        setOpenMore(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCreateAuction = async () => {
    // Gọi hàm createAuction từ context
    await createAuction(nft.address, nft.id, "100", "0.1");
    // Có thể thực hiện các hành động khác sau khi tạo đấu giá
  };

  const handlePlaceBid = async () => {
    // Gọi hàm placeBid từ context
    await placeBid(auctionId, bidAmount);
    // Có thể thực hiện các hành động khác sau khi đặt giá
  };

  const handleEndAuction = async () => {
    // Gọi hàm endAuction từ context
    await endAuction(auctionId);
    // Có thể thực hiện các hành động khác sau khi kết thúc đấu giá
  };

  const handleGetHistory = async () => {
    // Gọi hàm getAuctionHistoryForUser từ context
    const history = await getAuctionHistoryForUser(currentAccount);
    console.log("Lịch sử đấu giá cho người dùng hiện tại:", history);
    // Có thể thực hiện các hành động khác sau khi lấy lịch sử đấu giá
  };
  return (
    <div className={Style.NFTDescription}>
      <ThemeSwitcherText>
        <div className={Style.NFTDescription_box}>
          <div className="flex justify-between">
            <p>Virtural Words</p>
            <div className={Style.NFTDescription_box_share_box}>
              <div className="relative">
                <Tooltip
                  className="shadow-xl text-textprimary shadow-md p-3"
                  showArrow={true}
                  content="Share"
                >
                  <div
                    className={`p-1.5 bg-bghorver text-textprimary rounded-xl cursor-pointer ${Style.network_share}`}
                    onClick={handleOpenShare}
                  >
                    <FaShare />
                  </div>
                </Tooltip>
                {openShare && (
                  <div
                    className={
                      "absolute min-w-[150px] bg-itembackground shadow-xl border border-bordercustom rounded-xl p-2 text-base absolute z-[1000] animate-custom scrollbar-thin scrollbar-thumb-custom scrollbar-track-transparent w-[200px] min-w-[150px] top-[40px] right-0 overflow-auto flex flex-col justify-start"
                    }
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span
                      className={`cursor-pointer text-textprimary flex items-center p-[8px] rounded-[8px] font-medium gap-2 hover:bg-bghorver ${Style.network_share}`}
                      onClick={() => copyAddressShare()}
                      onMouseDown={handleMouseDownShare}
                    >
                      <input
                        type="text"
                        hidden
                        value={nft.imageurl}
                        id="linkItem"
                      />
                      {showCheckShare ? (
                        <FaRegCheckCircle className="text-green-500" />
                      ) : (
                        <FiCopy />
                      )}
                      Copy link
                    </span>
                    <span
                      onClick={shareOnTwitter}
                      className={`cursor-pointer text-textprimary flex items-center p-[8px] rounded-[8px] font-medium gap-2 hover:bg-bghorver ${Style.network_share}`}
                    >
                      <FaXTwitter /> Share to Twitter
                    </span>
                  </div>
                )}
              </div>
              <div className="relative">
                <Tooltip
                  className="shadow-2xl text-textprimary shadow-md p-3"
                  showArrow={true}
                  content="More"
                >
                  <div
                    className={`p-1.5 bg-bghorver text-textprimary rounded-xl cursor-pointer ${Style.network_share}`}
                    onClick={handleOpenMore}
                  >
                    <BsThreeDots />
                  </div>
                </Tooltip>
                {openMore && (
                  <div
                    className={
                      "absolute min-w-[150px] bg-itembackground shadow-md border border-bordercustom rounded-xl p-2 text-base absolute z-[1000] animate-custom scrollbar-thin scrollbar-thumb-custom scrollbar-track-transparent w-[200px] min-w-[150px] top-[40px] right-0 overflow-auto flex flex-col justify-start"
                    }
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span
                      className={`text-textprimary flex items-center p-[8px] rounded-[8px] font-medium gap-2 hover:bg-bghorver cursor-pointer`}
                    >
                      <FiRefreshCcw /> Refresh metadata
                    </span>
                    <div
                      className={`text-textprimary flex items-center p-[8px] rounded-[8px] font-medium gap-2 hover:bg-bghorver cursor-pointer ${Style.network_share}`}
                    >
                      <a target="_blank" href="https://etherscan.io/">
                        <span className="flex items-center gap-2">
                          <SiWebmoney /> View Website
                        </span>
                      </a>
                    </div>
                    <span
                      className={`text-textprimary flex items-center p-[8px] rounded-[8px] font-medium gap-2 hover:bg-bghorver cursor-pointer`}
                    >
                      <FaRegFlag /> Report
                    </span>
                  </div>
                )}
              </div>
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
                  <span
                    onClick={() => copyAddress()}
                    onMouseDown={handleMouseDown}
                    className="flex cursor-pointer items-center gap-2 p-2"
                  >
                    Ronaos <MdVerified />
                    <input type="text" value={nft.seller} id="myInput" hidden />
                    {nft.seller.slice(0, 7) + "..." + nft.seller.slice(-3)}
                    {showCheck ? (
                      <FaRegCheckCircle className="flex items-center text-green-500" />
                    ) : (
                      <FiCopy className="flex items-center" />
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className={Style.NFTDescription_box_profile_bidding}>
              <div className="border border-bordercustom rounded-xl bg-itembackground">
                <div className="p-5">
                  <p>
                    <span>Auction ending in:</span>
                  </p>
                  <div
                    className={
                      Style.NFTDescription_box_profile_biding_box_timer
                    }
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
                </div>
                <div className="border-t border-bordercustom w-full"></div>
                <div className="p-5">
                  <div className="flex flex-wrap">
                    <div>
                      <small className="mt-[-10px] text-[16px]">
                        Current Bid
                      </small>
                      <div className="flex items-center">
                        <h3 className="text-[40px] font-bold">
                          {nft.price} ETH ~&nbsp;
                        </h3>
                        <span className="text-[20px] text-gray-400">
                          $
                          {ethPrice &&
                            (
                              ethPrice * parseFloat(nft.price.split(" ")[0])
                            ).toLocaleString("en-US")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      Style.NFTDescription_box_profile_biding_box_button
                    }
                  >
                    {currentAccount == nft.seller.toLowerCase() ? (
                      <Button
                        color="primary"
                        variant="bordered"
                        startContent={isLoading ? "Loading..." : <MdCancel/>}
                        onClick={handleCancelMarket}
                        isLoading = {isLoading}
                      >
                        {isLoading ? "Cancelling..." : "Cancel"}
                      </Button>
                    ) : currentAccount == nft.owner.toLowerCase() ? (
                      <Button
                        color="primary"
                        variant="bordered"
                        startContent={<FaListUl />}
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
                        startContent={isLoading ? "Loading..." : <FaWallet/>}
                        onClick={handleBuy}
                        isLoading = {isLoading}
                      >
                        {isLoading ? "Buying..." : "Buy NFT"}
                      </Button>
                    )}
                    <Button
                      color="primary"
                      variant="bordered"
                      startContent={<BsFillTagsFill />}
                      onClick={handlePlaceBid}
                    >
                      <div>Make offer</div>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="border px-5 rounded-xl border-bordercustom bg-itembackground">
                <div
                  className={Style.NFTDescription_box_profile_biding_box_tabs}
                >
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
                {/* {history && (
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
                )} */}
              </div>
            </div>
          </div>
        </div>
      </ThemeSwitcherText>
    </div>
  );
};

export default NFTDescription;
