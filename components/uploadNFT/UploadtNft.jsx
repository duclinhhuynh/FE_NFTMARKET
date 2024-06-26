import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MdOutlineCreate } from "react-icons/md";
import formStyle from "../accountPage/Form/Form.module.css";
import { DropZone } from "./UploadNFTIndex";
// next ui
import { Input, Textarea, Select, SelectItem, Button } from "@nextui-org/react";

const UploadNFT = ({ uploadToIPFS, createNFT }) => {
  const [price, setPrice] = useState(1);
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const collections = [
    { key: "Image", label: "Image" },
    { key: "Photography", label: "Photography" },
    { key: "Arts", label: "Arts" },
    { key: "Musics", label: "Musics" },
    { key: "Sport", label: "Sport" },
  ];

  const router = useRouter();

  const handleCreateLoading = () => {
    createNFT(
      name,
      price,
      image,
      description,
      category,
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
            uploadToIPFS={uploadToIPFS}
          />
        </div>
        <div className="w-1/2 max-md:w-[100%]">
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
              {collections.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
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
                placeholder="1"
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
              errorMessage="The description should be at least 255 characters long."
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
            >
              {isLoading ? "Creating..." : "Create NFT"}
            </Button>
            {/* <Button
              endContent={<BsFillCameraFill size={20} color="primary" />}
              color="success"
              onClick={() => {}}
            >
              <span className="text-white font-bold">Preview</span>
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadNFT;
