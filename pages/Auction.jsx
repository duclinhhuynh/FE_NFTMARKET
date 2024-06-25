import React, { useContext, useState } from "react";
import { NFTMarketplaceContext } from "./../Context/NFTMarketplaceContext";

const AuctionComponent = () => {
  const {
    createAuction,
    placeBid,
    endAuction,
    getAuctionHistoryForUser,
    currentAccount, // Assuming you have this from context
  } = useContext(NFTMarketplaceContext);

  const [auctionId, setAuctionId] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [bidAmount, setBidAmount] = useState("");

  const handleCreateAuction = async () => {
    await createAuction(nftAddress, nftId, startingPrice, discountRate);
    // Update UI or fetch data as needed
  };

  const handlePlaceBid = async () => {
    await placeBid(auctionId, bidAmount);
    // Update UI or fetch data as needed
  };

  const handleEndAuction = async () => {
    await endAuction(auctionId);
    // Update UI or fetch data as needed
  };

  const handleGetHistory = async () => {
    const history = await getAuctionHistoryForUser(currentAccount);
    console.log("Auction history for current user:", history);
    // Update UI to display history
  };

  return (
    <div>
      <h2>Auction Component</h2>
      <button onClick={handleCreateAuction}>Create Auction</button>
      <button onClick={handlePlaceBid}>Place Bid</button>
      <button onClick={handleEndAuction}>End Auction</button>
      <button onClick={handleGetHistory}>Get Auction History</button>
    </div>
  );
};

export default AuctionComponent;
