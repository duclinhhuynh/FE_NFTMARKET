import React, { useEffect, useState, useContext } from "react";

// INTERNAL IMPORT
import Style from "../styles/serachPage.module.css";
import { Loader } from "../components/componentsindex";
import { SearchBar } from "../components/searchPage/searchPageIndex";
import { Filter } from "../components/componentsindex";
import { NFTCardTwo } from "../components/collectionPage/collectionIndex";
//IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
const NFTPage = () => {
  const { fetchNFTS } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftCopy, setNFTCoppy] = useState([]);
  useEffect(() => {
    fetchNFTS()
      .then((item) => {
        console.log("item", item);
        if(item){
          setNfts(item.reverse());
          setNFTCoppy(item);
        }
      })
      .catch((error) => {
        console.error("Error fetching NFTs:", error);
      });
  }, []);

  // Log the updated nfts state
  useEffect(() => {
    console.log("nft", nfts)
  }, [nfts]);
  const onHandleSearch = (value) => {
    const filteredNFTS = nfts.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );
    console.log(nfts);
    if (filteredNFTS.length === 0) {
      setNfts(nftCopy);
    } else {
      setNfts(filteredNFTS);
    }
  };

  // Handle search by selected categories
  const onHandleSelect = (selectedCategories) => {
    if (selectedCategories.includes("All")) {
      // If "All" is selected, show all NFTs
      setNfts(nftCopy);
    } else if (selectedCategories.length === 0) {
      // If nothing selected, reset to original list
      setNfts(nftCopy);
    } else {
      // Filter NFTs based on selected categories
      const filteredNFTS = nftCopy.filter(({ category }) =>
        selectedCategories.includes(category)
      );
      setNfts(filteredNFTS);
    }
  };

  const onHandleSearchPrice = (value) => {
    const [minPrice, maxPrice] = value;
    const filteredNFTS = nftCopy.filter(
      ({ price }) => price >= minPrice && price <= maxPrice
    );
    setNfts(filteredNFTS);
  };

  const onClearSearch = () => {
    if (nfts.length && nftCopy.length) {
      setNfts(nftCopy);
    }
  };
  // select sort by price
  const onHandleSort = (key) => {
    let sortedNFTS = [...nfts];
    switch (key) {
      case "Lowest Price":
        sortedNFTS.sort((a, b) => a.price - b.price);
        break;
      case "Highest Price":
        sortedNFTS.sort((a, b) => b.price - a.price);
        break;
      case "Lowest ID":
        sortedNFTS.sort((a, b) => a.id - b.id);
        break;
      case "Highest ID":
        sortedNFTS.sort((a, b) => b.id - a.id);
        break;
      case "Last":
        sortedNFTS.reverse();
        break;
      default:
        break;
    }
    setNfts([...sortedNFTS]);
  };
  return (
    <div className={Style.searchPage}>
      <div className="flex w-[90%] m-auto max-sm:flex-col gap-5">
        <div className="w-1/3 max-md:w-1/2 max-sm:w-full">
          <SearchBar
            onHandleSearch={onHandleSearch}
            onClearSearch={onClearSearch}
            onHandleSearchPrice={onHandleSearchPrice}
            onHandleSort={onHandleSort}
          />
          <Filter nftCopy={nftCopy} onHandleSelect={onHandleSelect} />
        </div>
        <div className="w-3/4 max-md:w-1/2 max-sm:w-full">
          {nfts.length == 0 ? <Loader /> : <NFTCardTwo NFTData={nfts} />}
        </div>
      </div>
    </div>
  );
};

export default NFTPage;
