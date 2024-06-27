import React, { useState } from "react";
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
} from "@nextui-org/react";
import {
  NFTMarketplaceContext,
  fetchNFTS,
} from "../../../Context/NFTMarketplaceContext";
import { BsFillTagsFill } from "react-icons/bs";
const ListNftModal = ({}) => {
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
      console.log("url resale", price, tokenURI, id);
      setIsLoading(true);
      await createSale(tokenURI, price, true, id);
      router.push("/NFTPage");
    } catch (error) {
      console.log("Error while resell", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal isOpen={openModelOffer} className="text-textprimary">
      <div onClick={handleCloseModal}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader className="flex flex-col gap-1">
            Placing an offer for item
          </ModalHeader>
          <ModalBody>
            <h2>Offer Price</h2>
            <p className="text-xs">
              Available balance: {parseFloat(accountBalance).toFixed(4)}
            </p>
            <Input
              type="text"
              label="Enter your Name"
              defaultValue=""
              className="max-w-xs"
              value={valueOffer}
              onChange={(e) => setValueOffer(e.target.value)}
            />
            <div className="flex gap-x-4 relative">
              <Textarea
                label="Description"
                variant="bordered"
                placeholder="Enter your description"
                disableAnimation
                disableAutosize
                classNames={{
                  base: "max-w-xs",
                  input: "resize-y min-h-[40px]",
                }}
              />
              <Input
                type="number"
                label="Enter your balance"
                className="max-w-xs"
                value={valueOffer}
                onChange={(e) => setValueOffer(e.target.value)}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={handleCloseModal}>
              Close
            </Button>
            <Button
              onClick={handleMakeOffer}
              startContent={isLoadingOffer ? "Loading..." : <BsFillTagsFill />}
              color="primary"
              variant="bordered"
              isLoading={isLoadingOffer}
            >
              {isLoadingOffer ? "Placing..." : "Place Offer"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </div>
    </Modal>
  );
};

export default ListNftModal;
