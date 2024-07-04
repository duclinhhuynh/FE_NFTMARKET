import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  DateRangePicker,
  Image,
} from "@nextui-org/react";
import { BsFillTagsFill } from "react-icons/bs";
import { parseDate } from "@internationalized/date";
const OfferModal = ({
  openModelOffer,
  setOpenModalOffer,
  fetchOffers,
  makeOffer,
  setIsActiveOffer,
  accountBalance,
  nft,
}) => {
  const [valueOffer, setValueOffer] = useState();
  const [isLoadingOffer, setIsLoadingOffer] = useState(false);
  // data select offer
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
  const handleMakeOffer = async () => {
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
    try {
      setIsLoadingOffer(true);
      await makeOffer(nft, valueOffer, desiredTimestamp);
      await fetchOffers(nft.tokenId);
      setOpenModalOffer();
      setIsLoadingOffer(false);
      setIsActiveOffer(true);
    } catch (error) {
      console.error("Error making offer:", error);
      setIsLoadingOffer(false);
      return;
    }
  };
  const handleCloseModal = () => {
    setOpenModalOffer(false);
  };
  return (
    <Modal size="md" isOpen={openModelOffer} className="text-textprimary">
      <div onClick={handleCloseModal}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader className="flex flex-col gap-1">
            Placing an offer for item
          </ModalHeader>
          <ModalBody>
            <div className="flex items-center">
              <div className="w-[49%] flex flex-col justify-between gap-5">
                <div className="m-2 flex flex-col">
                  <h2>Offer Price</h2>
                  <p className="text-xs">
                    Available balance: {parseFloat(accountBalance).toFixed(4)}
                  </p>
                </div>
                <div className="relative w-full">
                  <Image
                    isBlurred
                    src={nft.imageurl} // Ensure this path is correct
                    alt="NFT image"
                    width={240}
                    height={240}
                    className="m-0"
                    objectFit="cover"
                  />
                </div>
              </div>
              <div className="w-[51%] flex flex-col gap-4 ">
                <DateRangePicker
                  label="Stay duration"
                  isReadOnly
                  defaultValue={selectedCopy}
                  value={selectedCopy}
                  className="max-w-xs"
                  onChange={(value) => setSelectedDataCopy(value)}
                />
                <Select
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
                  type="number"
                  label="Enter your balance"
                  className="max-w-xs"
                  value={valueOffer}
                  onChange={(e) => setValueOffer(e.target.value)}
                />
                <div className="flex gap-x-4 relative"></div>
              </div>
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
              isDisabled={!(selectedDates && valueOffer)}
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

export default OfferModal;
