import React, { useState, useEffect, useContext } from 'react';
import Style from '../styles/author.module.css';
import { AuthorProfileCard, AuthorTaps, AuthorNFTCardBox } from '../components/authorPage/componentIndex';
import { NFTMarketplaceContext } from '../Context/NFTMarketplaceContext';

const Author = () => {
  const [colleciables, setColleciables] = useState(true);
  const [created, setCreated] = useState(false);
  const [like, setLike] = useState(false);
  const [follower, setFollower] = useState(false);
  const [following, setFollowing] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [myNFTs, setMyNFTs] = useState([]);
  const { fetchMyNFTsOrListedNFTs, currentAccount } = useContext(NFTMarketplaceContext);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const ownedNFTs = await fetchMyNFTsOrListedNFTs();
        setMyNFTs(ownedNFTs);
        // console.log("Owned NFTs:", ownedNFTs);

        const listedNFTs = await fetchMyNFTsOrListedNFTs("fetchItemsListed");
        setNfts(listedNFTs);
        // console.log("Listed NFTs:", listedNFTs);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      }
    };

    fetchNFTs();
  }, [fetchMyNFTsOrListedNFTs]);

  const handleMintNFT = async () => {
    const name = 'Example NFT';
    const description = 'This is an example NFT';
    const imageurl = 'https://example.com/image.png';
    const category = 'Art';

    const tokenId = await mintNFT(name, imageurl, description, category);
    console.log("Newly minted token ID:", tokenId);

    if (tokenId) {
      console.log("NFT successfully minted and assigned to the owner.");
    }
  };

  return (
    <div className={Style.banner}>
      <AuthorTaps 
        setColleciables={setColleciables} 
        setCreated={setCreated} 
        setLike={setLike} 
        setFollower={setFollower} 
        setFollowing={setFollowing} 
      />
      <AuthorNFTCardBox
        colleciables={colleciables} 
        created={created} 
        like={like} 
        follower={follower} 
        following={following} 
        nfts={nfts} 
        myNFTs={myNFTs} 
      />
    </div>
  );
};

export default Author;
