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
  DateRangePicker,
  Select,
  SelectItem
} from "@nextui-org/react";
import { FaListUl } from "react-icons/fa";
import { parseDate } from "@internationalized/date";
const ListNftModal = ({
  setOpenModalSell,
  openModelSell,
  accountBalance,
  createSale,
  uploadJSONToPinata,
  unpinFromPinata,
  nft,
}) => {
  const [price, setPrice] = useState();
  const [imageurl, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDes] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();
  const { id, tokenURI } = router.query;
  const [isLoadingSell, setIsLoadingSell] = useState(false);
  const [selectedCopy, setSelectedDataCopy] = useState({
    start: parseDate(new Date().toISOString().split("T")[0]),
    end: parseDate(
      new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]
    ),
  });
  const [selectedDates, setSelectedDates] = useState({
    start: parseDate(new Date().toISOString().split("T")[0]),
    end: parseDate(
      new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]
    ),
  });

  const duration = [
    { key: "5min", label: "5 min" },
    { key: "5h", label: "5 hours" },
    { key: "24h", label: "24 h" },
    { key: "3days", label: "3 days" },
    { key: "7days", label: "7 days" },
    { key: "1month", label: "1 month" },
    { key: "6months", label: "6 months" },
  ];
  const [selectedDuration, setSelectedDuration] = useState(duration[0].key);

  const handleSelectChange = (selectedKey) => {
    if (selectedKey instanceof Set) {
      selectedKey = Array.from(selectedKey)[0];
    }

    const selectedItem = duration.find((item) => item.key === selectedKey);

    if (!selectedItem) {
      console.error(`No duration item found for key: ${selectedKey}`);
      return;
    }

    setSelectedDuration(selectedItem.key);

    let endDate;
    const startDate = new Date();

    switch (selectedItem.key) {
      case "5min":
        endDate = new Date(startDate.getTime() + 1 * 60 * 1000);
        break;
      case "3days":
        endDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
        break;
      case "24h":
        endDate = new Date(startDate.getTime() + 1 * 24 * 60 * 60 * 1000);
        break;
      case "5h":
        endDate = new Date(startDate.getTime() + 5 * 60 * 60 * 1000);
        break;
      case "7days":
        endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        break;
      case "1month":
        endDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth() + 1,
          startDate.getDate()
        );
        break;
      case "6months":
        endDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth() + 6,
          startDate.getDate()
        );
        break;
      default:
        endDate = null;
    }

    setSelectedDates({
      start: startDate,
      end: endDate ? endDate : null,
    });
    // tách ra để tránh bug
    setSelectedDataCopy({
      start: parseDate(startDate.toISOString().split("T")[0]),
      end: endDate ? parseDate(endDate.toISOString().split("T")[0]) : null,
    });
  };

  const fetchNFTS = async () => {
    try {
      if (!tokenURI) {
        console.error("tokenURI is not available");
        return;
      }

      const response = await fetch(tokenURI);
      if (!response.ok) {
        throw new Error("Failed to fetch tokenURI data");
      }

      const jsonData = await response.json();

      const name = jsonData.name || "Name not available";
      const description = jsonData.description || "Description not available";
      const imageurl = jsonData.imageurl || "Image URL not available";
      const category = jsonData.category || "Category not available";

      console.log("jsonData", jsonData);
      setImage(imageurl);
      setName(name);
      setDes(description);
      setCategory(category);
    } catch (error) {
      console.error("Error fetching tokenURI data:", error);
    }
  };
  // clear 
  const handleClearPrice = () => {
    setPrice("");
  }
  useEffect(() => {
    fetchNFTS();
  }, [id]);

  const handleCreateSale = async () => {
    try {
      let desiredTimestamp = null;
      // Ensure selectedDates.end is correctly formatted
      if (selectedDates.end instanceof Date) {
        desiredTimestamp = selectedDates.end.toISOString();
      } else if (selectedDates.end) {
        desiredTimestamp = new Date(selectedDates.end).toISOString();
      } else {
        console.error("No valid end date selected.");
        return;
      }
      const timeActions = Math.floor(
        new Date(desiredTimestamp).getTime() / 1000
      );
      setIsLoadingSell(true);
      console.log("all set set", tokenURI, price, timeActions, true, nft.tokenId);
      const unpinfshash = tokenURI.split('/').pop();
      console.log("ip hast ", unpinfshash);
      const data = { name, description, imageurl, category };
      // const imghash = await uploadJSONToPinata(data);
      await createSale(tokenURI, price, timeActions, true, nft.tokenId);
      // await unpinFromPinata(unpinfshash);
      router.push("/NFTPage");
    } catch (error) {
      // console.log("Error while resell", error);
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
                <Image src={nft.imageurl} isBlurred width={240} />
              </div>
              <div className="w-[50%] flex flex-col gap-4 relative ">
                <DateRangePicker
                  variant="bordered"
                  label="Stay duration"
                  isReadOnly
                  defaultValue={selectedCopy}
                  value={selectedCopy}
                  className="max-w-xs"
                  onChange={(value) => setSelectedDataCopy(value)}
                />
                <Select
                  variant="bordered"
                  color=""
                  items={duration}
                  label="Select fast duration"
                  placeholder="Select duration"
                  // className="max-w-xs"
                  selectedKey={selectedDuration.key}
                  onSelectionChange={handleSelectChange}
                >
                  {(item) => (
                    <SelectItem key={item.key}>{item.label}</SelectItem>
                  )}
                </Select>

                <Input
                  variant="bordered"
                  type="text"
                  label="Name your Nft"
                  maxLength={30}
                  defaultValue=""
                  value={nft.name}
                  onChange={(e) => setName(e.target.value)}
                  className="max-w-xs"
                />
                <Input
                  isRequired
                  type="number"
                  variant="bordered"
                  placeholder="Enter your balance"
                  className="max-w-xs"
                  value={price}
                  onClear={handleClearPrice}
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
              isDisabled = {!(price && selectedDates)}
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
