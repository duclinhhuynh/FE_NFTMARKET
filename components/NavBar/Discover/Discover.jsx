import React, { useContext } from "react";
import Link from "next/link";

import Style from "./Discover.module.css";
import { Listbox, ListboxItem } from "@nextui-org/react";
const Discover = ({ setDiscover }) => {
  // -- DISCOVER NAVIGATION MENU
  const handleItemClick = () => {
    setDiscover(false); // Gọi hàm setDiscover để đóng Discover component khi click vào một mục
  };
  const discover = [
    {
      name: "Transfer",
      link: "transferFunds",
    },
    // {
    //   name: "Collection",
    //   link: "Collection",
    // },
    {
      name: "NFTs",
      link: "NFTPage",
    },
    {
      name: "Author Profile",
      link: "author",
    },
    // {
    //   name: "Account Setting",
    //   link: "account",
    // },
    {
      name: "Upload NFT",
      link: "uploadNft",
    },
    {
      name: "Connect Wallet",
      link: "connectWallet",
    },
    // {
    //   // name: "Blog",
    //   // link: "blog"
    // }
  ];
  return (
    <div>
      <Listbox
        aria-label="Multiple selection example"
        variant="flat"
        disallowEmptySelection
       
        // selectionMode="multiple"
        // selectedKeys={selectedKeys}
        // onSelectionChange={setSelectedKeys}
      >
        {discover.map((el, i) => (
          <ListboxItem key={i} onClick={handleItemClick}>
            <Link
              href={{ pathname: `${el.link}` }}
              className="block w-full"
              key={i + 1}
            >
              {el.name}
            </Link>
          </ListboxItem>
        ))}
      </Listbox>
    </div>
  );
};

export default Discover;
