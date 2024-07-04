import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MdOutlineCreate } from "react-icons/md";
import formStyle from "../accountPage/Form/Form.module.css";
import { DropZone } from "./UploadNFTIndex";
// next ui
import { Input, Textarea, Select, SelectItem, Button, DateRangePicker } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
const UploadNFT = ({ uploadFileToIPFS, createNFT }) => {
  const [price, setPrice] = useState(1);
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //date
  const [selectedDates, setSelectedDates] = useState({
    start: parseDate(new Date().toISOString().split("T")[0]),
    end: parseDate(
      new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]
    ),
  });

  const [selectedCopy, setSelectedDataCopy] = useState({
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
  // date

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


  const collections = [
    { key: "Image", label: "Image" },
    { key: "Photography", label: "Photography" },
    { key: "Arts", label: "Arts" },
    { key: "Musics", label: "Musics" },
    { key: "Sport", label: "Sport" },
  ];

  const router = useRouter();

  const handleCreateLoading = () => {
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
    createNFT(
      name,
      price,
      image,
      description,
      category,
      timeActions,
      router
    )
    setIsLoading(true);
  }
  const handleClearPrice = () => {
    setPrice("");
  };
  const handleClearName = () => {
    setName("");
  };
  return (
    <div className={formStyle.upload}>
      <div className="flex gap-10 max-md:flex-col">
        <div className="w-1/2 max-md:w-full">
          <DropZone
            title="File type: JPG, PNG, GIF, SVG, MP4 MAX 100MB"
            heading="Drag & drop file"
            subHeading="or Browse media on your device"
            name={name}
            price={price}
            website={website}
            description={description}
            category={category}
            setImage={setImage}
            uploadFileToIPFS={uploadFileToIPFS}
          />
        </div>
        <div className="w-1/2 max-md:w-[100%] grid gap-1">
          <div>
            <Select
              label="Choose collection"
              placeholder="Select an collection"
              disabledKeys={[
                "zebra",
                "tiger",
                "lion",
                "elephant",
                "crocodile",
                "whale",
              ]}
              variant="bordered"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="max-w-full"
            >
              {collections.map((item) => (
                <SelectItem key={item.key}>{item.label}</SelectItem>
              ))}
            </Select>
          </div>
          <div>
            <label htmlFor="name" className="font-semibold">
              Name *
            </label>
            <Input
              isInvalid={name === "" ? true : false}
              type="text"
              variant="bordered"
              onClear={handleClearName}
              placeholder="NAME YOUR NFT"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="max-w-full"
            />
            <label htmlFor="name" className="font-semibold">
              Date Auction
            </label>
            <div className="flex gap-2">
              <Select
                color=""
                variant="bordered"
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
              <DateRangePicker
                variant="bordered"
                label="Stay duration"
                isReadOnly
                defaultValue={selectedCopy}
                value={selectedCopy}
                className="max-w-xs"
                onChange={(value) => setSelectedDataCopy(value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="Price" className="font-semibold">
              Supply *
            </label>
            <div>
              <Input
                isInvalid={price === "" ? true : false}
                type="number"
                variant="bordered"
                defaultValue={1}
                placeholder="Enter your price"
                onClear={handleClearPrice}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="max-w-full"
              />
            </div>
          </div>
          <div className="">
            <label htmlFor="description" className="font-semibold">
              Description *
            </label>
            <Textarea
              isInvalid={description === ""}
              variant="bordered"
              defaultValue="Linh is a expert blockchain..."
              placeholder="Enter your description"
              onChange={(e) => setDescription(e.target.value)}
              classNames={{
                base: "max-w-full",
                input: "resize-y min-h-[40px]",
              }}
            />
          </div>
          <div>
            <label htmlFor="website" className="font-semibold">
              External link *
            </label>
            <div>
              <Input
                type="text"
                variant="bordered"
                isClearable
                placeholder="https://collection.io/item/123"
                onChange={(e) => setWebsite(e.target.value)}
                className="max-w-full"
              />
            </div>
          </div>
          <div className="m-2 flex justify-around">
              <Button
                color="secondary"
                onClick={async () => handleCreateLoading()}
                isLoading={isLoading}
                startContent={
                  isLoading ? "Loading..." : <MdOutlineCreate />
                }
                isDisabled = { !(image && category && name && selectedDates && price && description)}
              >
                {isLoading ? "Creating..." : "Create NFT"}
              </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadNFT;
