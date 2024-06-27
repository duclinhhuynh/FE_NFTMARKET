import React, { useState, useEffect, useContext, use } from "react";
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
// next ui
import ThemeSwitcherText from "../../theme/ThemeSwitcherText";
import {
  Tooltip,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  DateRangePicker,
  Select,
  SelectItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
const NFTDescription = ({ nft }) => {
  const [NFTMenu, setNFTMenu] = useState(false);
  const [history, setHistory] = useState(true);
  const [activeBtn, setActiveBtn] = useState(1);
  const [ethPrice, setEthPrice] = useState(null);
  const [showCheckShare, setShowCheckShare] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const [openMore, setOpenMore] = useState(false);
  const [valueOffer, setValueOffer] = useState();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoadingBuy, setIsLoadingBuy] = useState(false);
  const [isLoadingOffer, setIsLoadingOffer] = useState(false);
  const [isLoadingCancel, setIsLoadingCancel] = useState(false);
  const [isLoadingCancelOffer, setIsLoadingCancelOffer] = useState(false);
  const [isActiveOffer, setIsActiveOffer] = useState(false);
  const router = useRouter();
  // data select offer
  const [selectedCopy, setSelectedDataCopy] = useState({
    start: parseDate(new Date().toISOString().split("T")[0]),
    end: parseDate(
      new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]
    ),
  });
  const [selectedDates, setSelectedDates] = useState({
    start: parseDate(new Date().toISOString().split("T")[0]),
    end: parseDate(
      new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]
    ),
  });

  const duration = [
    { key: "5min", label: "5 min" },
    { key: "5h", label: "5 hours" },
    { key: "24h", label: "24 h" },
    { key: "3days", label: "3 days" },
    { key: "7days", label: "7 days" },
    { key: "1month", label: "1 month" },
    { key: "6months", label: "6 months" },
  ];
  const [selectedDuration, setSelectedDuration] = useState(duration[0].key);

  const handleSelectChange = (selectedKey) => {
    if (selectedKey instanceof Set) {
      selectedKey = Array.from(selectedKey)[0];
    }

    const selectedItem = duration.find((item) => item.key === selectedKey);

    if (!selectedItem) {
      console.error(`No duration item found for key: ${selectedKey}`);
      return;
    }

    setSelectedDuration(selectedItem.key);

    let endDate;
    const startDate = new Date();

    switch (selectedItem.key) {
      case "5min":
        endDate = new Date(startDate.getTime() + 1 * 60 * 1000);
        break;
      case "3days":
        endDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
        break;
      case "24h":
        endDate = new Date(startDate.getTime() + 1 * 24 * 60 * 60 * 1000);
        break;
      case "5h":
        endDate = new Date(startDate.getTime() + 5 * 60 * 60 * 1000);
        break;
      case "7days":
        endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        break;
      case "1month":
        endDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth() + 1,
          startDate.getDate()
        );
        break;
      case "6months":
        endDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth() + 6,
          startDate.getDate()
        );
        break;
      default:
        endDate = null;
    }

    setSelectedDates({
      start: startDate,
      end: endDate ? endDate : null,
    });
    // tách ra để tránh bug
    setSelectedDataCopy({
      start: parseDate(startDate.toISOString().split("T")[0]),
      end: endDate ? parseDate(endDate.toISOString().split("T")[0]) : null,
    });
  };

  // SMART CONTRACT DATA
  const {
    buyNFT,
    cancelMarketItem,
    unMakeOffer,
    makeOffer,
    fetchOffers,
    currentAccount,
    allOffers,
    acceptOffer
  } = useContext(NFTMarketplaceContext);
  // loading
  const handleCancelMarket = async () => {
    try {
      setIsLoadingCancel(true);
      await cancelMarketItem(nft);
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

  const handleMakeOffer = async () => {
    let desiredTimestamp = null;

    // Ensure selectedDates.end is correctly formatted
    if (selectedDates.end instanceof Date) {
      desiredTimestamp = selectedDates.end.toISOString();
    } else if (selectedDates.end) {
      desiredTimestamp = new Date(selectedDates.end).toISOString();
    } else {
      console.error("No valid end date selected.");
      return;
    }

    try {
      setIsLoadingOffer(true);
      console.log("desiredTimestamp",desiredTimestamp);
      await makeOffer(nft, valueOffer, desiredTimestamp);
      await fetchOffers(nft.tokenId);
      setIsLoadingOffer(false);
      setIsActiveOffer(true);
    } catch (error) {
      console.error("Error making offer:", error);
      setIsLoadingOffer(false);
      return;
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

  const handleOpenOffer = () => {
    onOpen();
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
                                  onClick={handleOpenOffer}
                                  onPress={onOpen}
                                  isLoading={isLoadingOffer}
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
                <div className="border rounded-xl border-bordercustom bg-itembackground">
                  <div className="w-full flex justify-center item-center m-auto bg-itembackground rounded-xl">
                    <div className="w-full">
                      <Table
                        removeWrapper
                        isCompact
                        bottomContentPlacement="outside"
                      >
                        <TableHeader >
                          <TableColumn className="flex items-center">
                            <span className="p-2 text-[20px]">
                              <BiBug className="text-success" />
                            </span>
                            Bidder
                          </TableColumn>
                          <TableColumn>Price</TableColumn>
                          <TableColumn>Time Stamp</TableColumn>
                          <TableColumn>Accept</TableColumn>
                        </TableHeader>
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
                                <TableCell>
                                  {/* Đặt firstRowDisplayed thành true khi hiển thị hàng đầu tiên */}
                                  {index === 0 && (
                                    <Button
                                       size="sm"
                                      color="default"
                                      onClick={() => acceptOffer(nft)}
                                    >
                                      Accept
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
      <div>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          className="text-textprimary"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Placing an offer for item
                </ModalHeader>
                <ModalBody>
                  <h2>Offer Price</h2>
                  <p className="text-xs">Available balance:</p>
                  <Input
                    type="number"
                    label="Enter your balance"
                    className="max-w-xs"
                    value={valueOffer}
                    onChange={(e) => setValueOffer(e.target.value)}
                  />
                  <div className="flex gap-x-4 relative">
                    <Select
                      color=""
                      items={duration}
                      label="Select fast duration"
                      placeholder="Select duration"
                      className="max-w-xs"
                      selectedKey={selectedDuration.key}
                      onSelectionChange={handleSelectChange}
                    >
                      {(item) => (
                        <SelectItem key={item.key}>{item.label}</SelectItem>
                      )}
                    </Select>
                    <DateRangePicker
                      label="Stay duration"
                      isReadOnly
                      defaultValue={selectedCopy}
                      value={selectedCopy}
                      className="max-w-xs"
                      onChange={(value) => setSelectedDataCopy(value)}
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    onClick={handleMakeOffer}
                    startContent={
                      isLoadingOffer ? "Loading..." : <BsFillTagsFill />
                    }
                    color="primary"
                    variant="bordered"
                    onPress={onClose}
                    isLoading={isLoadingOffer}
                  >
                    {isLoadingOffer ? "Placing..." : "Place Offer"}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default NFTDescription;
