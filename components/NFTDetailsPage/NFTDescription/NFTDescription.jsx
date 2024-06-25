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
import { fetchPrice } from "../../../api/api";
import { NFTMarketplaceContext } from "../../../Context/NFTMarketplaceContext";
import { NFTMakeOffer } from "../NFTDetailsIndex";
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
  Listbox,
  ListboxItem,
  ListboxSection,
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
  const [offer, setOffer] = useState(true);
  const [valueOffer, setValueOffer] = useState();
  const [stateOffer, setStateOffer] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoadingBuy, setIsLoadingBuy] = useState(false);
  const [isLoadingOffer, setIsLoadingOffer] = useState(false);
  const [isLoadingCancel, setIsLoadingCancel] = useState(false);
  const [isLoadingCancelOffer, setIsLoadingCancelOffer] = useState(false);
  const [allOffers, setAllOffers] = useState([]);

  const router = useRouter();
  const duration = [
    { key: "3days", label: "3 days" },
    { key: "24h", label: "24 h" },
    { key: "1h", label: "1h" },
    { key: "7days", label: "7 days" },
    { key: "1month", label: "1 month" },
    { key: "6months", label: "6 month" },
  ];
  // SMART CONTRACT DATA
  const {
    buyNFT,
    cancelMarketItem,
    unMakeOffer,
    makeOffer,
    fetchOffers,
    currentAccount,
  } = useContext(NFTMarketplaceContext);
  // loading
  const handleCancelMarket = async () => {
    try {
      setIsLoadingCancel(true);
      await cancelMarketItem(nft);
    } catch (error) {
      console.error("Error cancelling sale:", error);
    } finally {
      setIsLoading(false);
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
    try {
      setIsLoadingOffer(true);
      await makeOffer(nft, valueOffer);
      fetchOffers(nft.tokenId);
      setStateOffer(true);
      setIsLoadingOffer(false);
    } catch (error) {
      console.error("Error handleMakeOffer sale:", error);
      setIsLoadingOffer(false);
    }
  };
  const handleCancelOffer = async () => {
    try {
      setIsLoadingCancelOffer(true);
      await unMakeOffer(nft);
      fetchOffers(nft.tokenId);
      setIsLoadingCancelOffer(false);
    } catch (error) {
      console.error("Error handleCancelOffer sale:", error);
      setIsLoadingCancelOffer(false);
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
    const fetchNFTOffers = async () => {
      try {
        const offers = await fetchOffers(nft.tokenId);
        setAllOffers(offers);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    // Fetch offers when nft.tokenId changes
    fetchNFTOffers();
  }, [allOffers, nft.tokenId]);
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

  const handleCreateAuction = async () => {
    // Gọi hàm createAuction từ context
    await createAuction(nft.address, nft.id, "100", "0.1");
    // Có thể thực hiện các hành động khác sau khi tạo đấu giá
  };

  const handlePlaceBid = async () => {
    // Gọi hàm placeBid từ context
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
                        {currentAccount != nft.owner.toLowerCase() &&
                        currentAccount != nft.seller.toLowerCase() ? (
                          <div>
                            {stateOffer ? (
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
                                startContent={<BsFillTagsFill />}
                                onClick={handleOpenOffer}
                                onPress={onOpen}
                              >
                                <div>Make offer</div>
                              </Button>
                            )}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border rounded-xl border-bordercustom bg-itembackground">
                  <div className="w-full flex justify-center item-center m-auto bg-itembackground rounded-xl shadow-md">
                    <Listbox
                      variant="flat"
                      aria-label="User Menu"
                      onAction={(key) => alert(key)}
                    
                    >
                      <ListboxItem
                          isReadOnly
                          color="primary"
                          startContent = {"Bidder"}
                          endContent={"Price"}
                        >
                       <ListboxSection title="Actions" showDivider></ListboxSection>
                      </ListboxItem>
                      {allOffers.map((offer) => (
                        <ListboxItem
                          key= {offer.price}
                          startContent = {
                          <div className="p-2 rounded-xl bg-success/10 text-success">
                            <BiBug className="text-lg "/>
                          </div>
                        }
                          endContent={`$ ${offer.price}`}
                          
                        > <p>{offer.bidder}</p>
                        </ListboxItem>
                      ))}
                    </Listbox>
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
                      label="Favorite duration"
                      placeholder="Select duration"
                      className="max-w-xs"
                    >
                      {(duration) => <SelectItem>{duration.label}</SelectItem>}
                    </Select>
                    <DateRangePicker
                      label="Stay duration"
                      isRequired
                      defaultValue={{
                        start: parseDate("2024-04-01"),
                        end: parseDate("2024-04-08"),
                      }}
                      className="max-w-xs"
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
