import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { MdVerified } from "react-icons/md";
import {
  FaRegCheckCircle,
  FaWallet,
  FaShare,
  FaRegFlag,
  FaListUl,
  FaCheck,
} from "react-icons/fa";
import { FaGift } from "react-icons/fa6";
import { BiBug } from "react-icons/bi";
import { BsFillTagsFill, BsThreeDots } from "react-icons/bs";
import { FiCopy, FiRefreshCcw } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { SiWebmoney } from "react-icons/si";
import { MdCancel } from "react-icons/md";
import Style from "./NFTDescription.module.css";
import images from "../../../img";
import CountDown from "../../CountDown/CountDown";
import { fetchPrice } from "../../../api/api";
import { NFTMarketplaceContext } from "../../../Context/NFTMarketplaceContext";
// modal
import OfferModal from "../Modal/OfferModal";
import ListNftModal from "../Modal/ListNftModal";
import GiftNftModal from "../Modal/GiftNftModal";
// next ui
import ThemeSwitcherText from "../../theme/ThemeSwitcherText";
import {
  Tooltip,
  Button,
  Table,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
const NFTDescription = ({ nft }) => {
  const [ethPrice, setEthPrice] = useState(null);
  const [showCheckShare, setShowCheckShare] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const [openMore, setOpenMore] = useState(false);
  const [isLoadingBuy, setIsLoadingBuy] = useState(false);
  const [isLoadingCancel, setIsLoadingCancel] = useState(false);
  const [isLoadingCancelOffer, setIsLoadingCancelOffer] = useState(false);
  const [isLoadingAccept, setIsLoadingAccept] = useState(false);
  const [isActiveOffer, setIsActiveOffer] = useState(false);
  const [isLoadingOffer, setIsLoadingOffer] = useState(false);
  const [openModelOffer, setOpenModalOffer] = useState(false);
  const [openModelSell, setOpenModalSell] = useState(false);
  const [openModelGift, setOpenModalGift] = useState(false);
  const router = useRouter();
  // data select offer
  // SMART CONTRACT DATA
  const {
    buyNFT,
    cancelMarketItem,
    unMakeOffer,
    makeOffer,
    fetchOffers,
    currentAccount,
    allOffers,
    acceptOffer,
    accountBalance,
    createSale,
    uploadJSONToPinata,
    unpinFromPinata,
    transferNFT
  } = useContext(NFTMarketplaceContext);
  // loading

  const handleOpenOffer = () => {
    setOpenModalOffer(true);
  };
  const handleOpenSell = () => {
    setOpenModalSell(true);
  };

  const handleOpenGift = () => {
    setOpenModalGift(true);
  }

  const handleCancelMarket = async () => {
    try {
      setIsLoadingCancel(true);
      await cancelMarketItem(nft);
      router.push("author");
    } catch (error) {
      console.error("Error cancelling sale:", error);
    } finally {
      setIsLoadingCancel(false);
    }
  };

  const handleBuy = async () => {
    try {
      setIsLoadingBuy(true);
      await buyNFT(nft);
      setIsLoadingBuy(false);
    } catch (error) {
      console.error("Error cancelling sale:", error);
    } finally {
      setIsLoadingBuy(false);
    }
  };

  const handleCancelOffer = async () => {
    try {
      setIsLoadingCancelOffer(true);
      await unMakeOffer(nft);
      await fetchOffers(nft.tokenId);
      setIsLoadingCancelOffer(false);
      setIsLoadingOffer(false);
      setIsActiveOffer(false);
    } catch (error) {
      console.error("Error handleCancelOffer sale:", error);
      setIsLoadingCancelOffer(false);
      return;
    }
  };
  const handleAcceptOffer = async () => {
    try {
      setIsLoadingAccept(true);
      await acceptOffer(nft.tokenId);
      await fetchOffers(nft.tokenId);
      setDisplaytimestamp(false);
    } catch (error) {
      setIsLoadingAccept(false);
      return;
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPrice();
        setEthPrice(response.ethereum.usd);
      } catch (error) {
        // console.error("Error fetching ETH price:", error);
      }
    };

    fetchData();
  }, []);
  // fetch offers
  useEffect(() => {
    const fetchAndCheckOffers = async () => {
      if (nft.tokenId) {
        const offers = await fetchOffers(nft.tokenId);
        setIsActiveOffer(
          offers.some(
            (offer) =>
              offer.bidder.toLowerCase() === currentAccount.toLowerCase() &&
              offer.active
          )
        );
      }
    };

    fetchAndCheckOffers();
  }, [fetchOffers, nft.tokenId, currentAccount]);
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
  return (
    <>
      <div className={Style.NFTDescription}>
        <ThemeSwitcherText>
          <div className={Style.NFTDescription_box}>
            <div className="flex justify-between">
              <p>Virtural Worlds</p>
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
                      Ronaldo <MdVerified />
                      <input
                        type="text"
                        value={nft.seller}
                        id="myInput"
                        hidden
                      />
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
                  <div>
                    <div className="p-5">
                      <p>
                        <span>Auction ending in:</span>
                      </p>
                      <div
                        className={
                          Style.NFTDescription_box_profile_biding_box_timer
                        }
                      >
                        {<CountDown timestamp={nft.timestamp}/>}
                      </div>
                    </div>
                    <div className="border-t border-bordercustom w-full"></div>
                  </div>
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
                      <div>
                        {currentAccount == nft.seller.toLowerCase() ? (
                          <Button
                            color="primary"
                            variant="bordered"
                            startContent={
                              isLoadingCancel ? "Loading..." : <MdCancel />
                            }
                            onClick={handleCancelMarket}
                            isLoading={isLoadingCancel}
                          >
                            {isLoadingCancel ? "Cancelling..." : "Cancel"}
                          </Button>
                        ) : currentAccount == nft.owner.toLowerCase() ? (
                          <div className="flex gap-10">
                            <Button
                              color="primary"
                              variant="bordered"
                              startContent={<FaListUl />}
                              onClick={() =>
                                // router.push(
                                //   `/reSellToken?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`
                                // )
                                handleOpenSell()
                              }
                              classStyle={Style.button}
                            >
                              Sell on Market
                            </Button>
                            <Button
                              color="primary"
                              variant="bordered"
                              startContent={<FaGift />}
                              onClick={() =>
                                // router.push(
                                //   `/reSellToken?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`
                                // )
                                handleOpenGift()
                              }
                              classStyle={Style.button}
                            >
                              Gift your NFT
                            </Button>
                          </div>
                        ) : (
                          <Button
                            color="primary"
                            variant="bordered"
                            startContent={
                              isLoadingBuy ? "Loading..." : <FaWallet />
                            }
                            onClick={handleBuy}
                            isLoading={isLoadingBuy}
                          >
                            {isLoadingBuy ? "Buying..." : "Buy NFT"}
                          </Button>
                        )}
                      </div>
                      <div>
                        {currentAccount !== nft.seller.toLowerCase() &&
                          currentAccount !== nft.owner.toLowerCase() && (
                            <div>
                              {isActiveOffer ? (
                                <Button
                                  color="primary"
                                  variant="bordered"
                                  startContent={
                                    isLoadingCancelOffer ? (
                                      "Loading..."
                                    ) : (
                                      <BsFillTagsFill />
                                    )
                                  }
                                  onClick={handleCancelOffer}
                                  isLoading={isLoadingCancelOffer}
                                >
                                  {isLoadingCancelOffer
                                    ? "Calling..."
                                    : "Cancel Offer"}
                                </Button>
                              ) : (
                                <Button
                                  color="primary"
                                  variant="bordered"
                                  startContent={
                                    isLoadingOffer ? (
                                      "Loading..."
                                    ) : (
                                      <BsFillTagsFill />
                                    )
                                  }
                                  onClick={() => handleOpenOffer()}
                                >
                                  <div>Make offer</div>
                                </Button>
                              )}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg border-bordercustom rounded-lg bg-itembackground">
                  <div className="w-full flex justify-center item-center m-auto">
                    <div className="w-full ">
                      <Table removeWrapper>
                        <TableColumn className="flex items-center">
                          <span className="text-[20px] p-2">
                            <BiBug className="text-success" />
                          </span>
                          Bidder
                        </TableColumn>
                        <TableColumn>Price</TableColumn>
                        <TableColumn>Expiration</TableColumn>

                        <TableColumn className="text-right">
                          {currentAccount.toLowerCase() ===
                            nft.seller.toLowerCase() && <p>Accept Highest</p>}
                        </TableColumn>
                        <TableBody>
                          {allOffers
                            .filter((offer) => offer.active)
                            .sort((a, b) => b.price - a.price)
                            .map((offer, index) => (
                              <TableRow key={offer.bidder + offer.timestamp}>
                                <TableCell>
                                  {offer.bidder.slice(0, 7) +
                                    "..." +
                                    offer.bidder.slice(-3)}
                                </TableCell>
                                <TableCell>{offer.price}</TableCell>
                                <TableCell>
                                  <CountDown timestamp={offer.timestamp} />
                                </TableCell>
                                <TableCell className="text-right">
                                  {/* Đặt firstRowDisplayed thành true khi hiển thị hàng đầu tiên */}
                                  {currentAccount.toLowerCase() ===
                                    nft.seller.toLowerCase() &&
                                    index === 0 && (
                                      <Button
                                        startContent={
                                          isLoadingAccept ? (
                                            "Loading..."
                                          ) : (
                                            <FaCheck />
                                          )
                                        }
                                        variant="bordered"
                                        size="sm"
                                        color="default"
                                        isLoading={isLoadingAccept}
                                        onClick={() => handleAcceptOffer()}
                                      >
                                        {isLoadingAccept
                                          ? "Accepting..."
                                          : "Accept"}
                                      </Button>
                                    )}
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ThemeSwitcherText>
      </div>
      {/* // offer modal*/}
      <div>
        <OfferModal
          openModelOffer={openModelOffer}
          setOpenModalOffer={setOpenModalOffer}
          makeOffer={makeOffer}
          fetchOffers={fetchOffers}
          setIsActiveOffer={setIsActiveOffer}
          nft={nft}
          accountBalance={accountBalance}
        />
        <ListNftModal
          setOpenModalSell={setOpenModalSell}
          openModelSell={openModelSell}
          createSale={createSale}
          nft={nft}
          accountBalance={accountBalance}
          uploadJSONToPinata={uploadJSONToPinata}
          unpinFromPinata={unpinFromPinata}
        />
        <GiftNftModal
          currentAccount={currentAccount}
          openModelGift={openModelGift}
          setOpenModalGift={setOpenModalGift}
          nft={nft}
          transferNFT={transferNFT}
        />
      </div>
    </>
  );
};

export default NFTDescription;
