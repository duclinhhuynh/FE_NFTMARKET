import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Style from "../styles/reSellToken.module.css";
import fromStyle from "../components/accountPage/Form/Form.module.css";
import Image from "next/image";
import formStyle from "../components/accountPage/Form/Form.module.css";
//IMPORT SMART CONTRACT
import {
  NFTMarketplaceContext,
  fetchNFTS,
} from "../Context/NFTMarketplaceContext";
import { Button, Input, Textarea} from "@nextui-org/react";
const reSellToken = () => {
  const { createSale } = useContext(NFTMarketplaceContext);
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const router = useRouter();
  const { id, tokenURI } = router.query;
  const fetchNFTS = async () => {
    if (!tokenURI) return;
    const response = await fetch(tokenURI);
    console.log("respone", response);
    const data = await response.json();
    const jsonDataString = Object.keys(data)[0];
    const jsonData = JSON.parse(jsonDataString);
    // Extract name, description, and imageurl from the parsed JSON object
    const name = jsonData.hasOwnProperty("name")
      ? jsonData.name
      : "Name not available";
    const description = jsonData.hasOwnProperty("description")
      ? jsonData.description
      : "Description not available";
    const imageurl = jsonData.hasOwnProperty("imageurl")
      ? jsonData.imageurl
      : "Image URL not available";
    setImage(imageurl);
    setName(name);
    setDes(description);
  };
  useEffect(() => {
    fetchNFTS();
  }, [id]);
  const resell = async () => {
    try {
      console.log("url resale", price, tokenURI, id);
      await createSale(tokenURI, price, null, id);
      router.push("/author");
    } catch (error) {
      console.log("Error while resell", error);
    }
  };
  return (
    <div className="w-full mb-20">
      <div className="m-auto">
        <div className="flex justify-center mt-20">
          <div className="w-1/2 flex justify-center">
            {image && (
              <Image
                src={image}
                alt="resell nft"
                width={400}
                height={400}
                objectFit="contain"
              />
            )}
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <div>
              <label htmlFor="">Name your Nft</label>
              <Input
                type="text"
                variant="bordered"
                className="max-w-xs"
                placeholder={name}
                isReadOnly
              />
            </div>
            <div>
              <Textarea
                label="Description"
                variant="bordered"
                labelPlacement="outside"
                placeholder={des}
                className="max-w-xs"
                isReadOnly
              />
            </div>
            <div >
            <label htmlFor="">Type your price</label>
              <Input
                type="number"
                variant="bordered"
                className="max-w-xs"
                placeholder={price}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <Button
                color="primary"
                variant="bordered"
                onClick={() => resell()}
              >
                List on MarketPlace
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default reSellToken;
