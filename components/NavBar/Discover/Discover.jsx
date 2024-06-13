import React from 'react'
import Link  from 'next/link'

import  Style  from './Discover.module.css';
const Discover = () => {
  // -- DISCOVER NAVIGATION MENU
  const discover = [
    {
      name: "Transfer",
      link: "transferFunds"
    },
    {
      name: "Collection",
      link: "Collection"
    },
    {
      name: "Search",
      link: "searchPage"
    },
    {
      name: "Author Profile",
      link: "author"
    },
    {
      name: "Account Setting",
      link: "account"
    },
    {
      name: "Upload NFT",
      link: "uploadNft"
    },
    {
      name: "Connect Wallet",
      link: "connectWallet"
    },
    {
      // name: "Blog",
      // link: "blog"
    }
  ]
  return (
    <div>
      {discover.map((el, i)=> (
          <Link href={{pathname: `${el.link}`}} className={Style.discover} key = {i + 1}>{el.name}  
          </Link>
      ))}
    </div>
  );
};

export default Discover