import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Image,
} from "@nextui-org/react";
import { FaListUl } from "react-icons/fa";
const ListNftModal = ({
  setOpenModalSell,
  openModelSell,
  accountBalance,
  createSale,
  uploadJSONToPinata,
  nft,
}) => {
  const [price, setPrice] = useState();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();
  const { id, tokenURI } = router.query;
  const [isLoadingSell, setIsLoadingSell] = useState(false);
  const fetchNFTS = async () => {
    if (!tokenURI) return;
    const response = await fetch(tokenURI);
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
    const categoryl = jsonData.hasOwnProperty("category")
      ? jsonData.category
      : "category not available";
    console.log("jsonData", jsonData);
    setImage(imageurl);
    setName(name);
    setDes(description);
    setCategory(categoryl);
  };
  useEffect(() => {
    fetchNFTS();
  }, [id]);

  const handleCreateSale = async () => {
    try {
      setIsLoadingSell(true);
      if (!name || !des || !price || !image) {
        console.log("Data Is Missing");
        setError("Data Is Missing");
      }
      console.log("all set set", tokenURI, price, true, nft.tokenId);
      const data = { name, des, image, category };
      const imghash = await uploadJSONToPinata(data);
      await createSale(imghash, price, true, nft.tokenId);
      router.push("/NFTPage");
    } catch (error) {
      console.log("Error while resell", error);
    } finally {
      setIsLoadingSell(false);
    }
  };
  const handleCloseModal = () => {
    setOpenModalSell(false);
  };
  return (
    <Modal size={"lg"} isOpen={openModelSell} className="text-textprimary">
      <div onClick={handleCloseModal}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader className="flex flex-col gap-1 ">
            List on MarketPlace
          </ModalHeader>
          <ModalBody>
            <div className="flex items-center gap-2">
              <div className="w-[50%] flex flex-col gap-4">
                <div className="flex flex-col">
                  <h2>List new price</h2>
                  <p className="text-xs">
                    Available balance: {parseFloat(accountBalance).toFixed(4)}
                  </p>
                </div>
                <Image src={image} isBlurred width={240} />
              </div>
              <div className="w-[50%] flex flex-col gap-4 relative ">
                <Input
                  isRequired
                  variant="bordered"
                  type="text"
                  label="Name your Nft"
                  maxLength={30}
                  defaultValue=""
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="max-w-xs"
                />
                <Textarea
                  isRequired
                  onChange={(e) => setDes(e.target.value)}
                  label="Description"
                  variant="bordered"
                  placeholder="Enter your description"
                  disableAnimation
                  maxLength={250}
                  disableAutosize
                  classNames={{
                    base: "max-w-xs",
                    input: "resize-y min-h-[40px]",
                  }}
                />
                <Input
                  type="number"
                  variant="bordered"
                  placeholder="Enter your balance"
                  className="max-w-xs"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={handleCloseModal}>
              Close
            </Button>
            <Button
              onClick={handleCreateSale}
              startContent={isLoadingSell ? "Loading..." : <FaListUl />}
              color="primary"
              variant="bordered"
              isLoading={isLoadingSell}
            >
              {isLoadingSell ? "Listing..." : "List on Market"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </div>
    </Modal>
  );
};

export default ListNftModal;
