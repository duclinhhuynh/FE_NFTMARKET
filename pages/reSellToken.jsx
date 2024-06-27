import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
//IMPORT SMART CONTRACT
import {
  NFTMarketplaceContext,  
  // fetchNFTS,
} from "../Context/NFTMarketplaceContext";
import { FaListUl } from "react-icons/fa";
import { Button, Input, Textarea } from "@nextui-org/react";
const reSellToken = () => {
  const { createSale } = useContext(NFTMarketplaceContext);
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const router = useRouter();
  const { id, tokenURI } = router.query;
  const [isLoading, setIsLoading] = useState(false);
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

  const handleCreateSale = async () => {
    try {
      const data = {
        name: name,
        description: des,
        imageurl: image, // thêm imageurl nếu cần thiết
        price: price,
      };
  
      // Kiểm tra nếu các trường dữ liệu cần thiết có đủ hay không
      if (!data.name || !data.description || !data.price || !data.imageurl) {
        console.log("Data Is Missing");
        setError("Data Is Missing");
        setOpenError(true);
        return;
      }
  
      console.log("Data to update:", data);
  
      // Tạo JSON string từ dữ liệu
      // const jsonData = JSON.stringify(data);
  
      // // Gửi dữ liệu mới lên Pinata
      // const resFile = await axios({
      //   method: "POST",
      //   url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      //   data: jsonData,
      //   headers: {
      //     pinata_api_key: api_key,
      //     pinata_secret_key: api_serect,
      //     Authorization: `Bearer ${pinata_JWT}`,
      //   },
      // });
  
      // console.log("Pinata IPFS hash response:", resFile.data.IpfsHash);
  
      // // URL của dữ liệu đã cập nhật trên IPFS
      // const updatedDataUrl = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
      // console.log("Updated Data URL:", updatedDataUrl);
  
      // // Sử dụng URL mới để tạo hoặc bán lại token
      // await createSale(tokenURI, price, isReselling, id);
  
      // router.push("/NFTPage");
    } catch (error) {
      console.error("Error while updating and reselling:", error);
      setError("Error while updating and reselling: " + error.message);
      setOpenError(true);
    } finally {
      setIsLoading(false);
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
            <div>
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
                startContent={isLoading ? "Loading..." : <FaListUl/>}
                onClick={() => handleCreateSale()}
                isLoading = {isLoading}
              >
                 {isLoading ? "Listing..." : "List on MarketPlace"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default reSellToken;
