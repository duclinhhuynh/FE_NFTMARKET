import React, { useEffect, useState, useContext } from "react";

// INTERNAL IMPORT
import Style from "../styles/serachPage.module.css";
import { Slider, Brand, Loader } from "../components/componentsindex";
import { SearchBar } from "../components/searchPage/searchPageIndex";
import { Filter } from "../components/componentsindex";
import {
  NFTCardTwo,
  Banner,
} from "../components/collectionPage/collectionIndex";
import images from "../img";
//IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
const searchPage = () => {
  const { fetchNFTS } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftCopy, setNFTCoppy] = useState([]);
  useEffect(() => {
    fetchNFTS()
      .then((item) => {
        setNfts(item.reverse());
        setNFTCoppy(item);
      })
      .catch((error) => {
        console.error("Error fetching NFTs:", error);
      });
  }, []); // Empty dependency array ensures the effect runs only once

  // Log the updated nfts state
  useEffect(() => {}, [nfts]);

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
  return (
    <div className={Style.searchPage}>
      <div className="flex w-[90%] m-auto max-sm:flex-col gap-5">
        <div className="w-1/3 max-md:w-1/2 max-sm:w-full">
          <SearchBar
            onHandleSearch={onHandleSearch}
            onClearSearch={onClearSearch}
            onHandleSearchPrice={onHandleSearchPrice}
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

export default searchPage;
