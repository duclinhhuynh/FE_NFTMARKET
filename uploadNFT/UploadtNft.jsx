
import React, { useState } from 'react';
import { MdOutlineHttp, MdOutlineAttachFile } from 'react-icons/md';
import { TiSocialInstagram, TiTick } from 'react-icons/ti';
import { LuTableProperties } from "react-icons/lu";
import { BiCategory } from "react-icons/bi";
import { FaPercent } from "react-icons/fa";
import Image from 'next/image';
import { useRouter } from 'next/router';

import formStyle from '../accountPage/Form/Form.module.css';
import images from '../img';
import { Button } from '../components/componentsindex';
import { DropZone } from '../uploadNFT/UploadNFTIndex';
import Style from './UploadNFT.module.css'
import { AiTwotoneAccountBook, AiTwotonePropertySafety } from 'react-icons/ai';

const UploadNFT = ({uploadToIPFS, createNFT}) => {
  const [price, setPrice] = useState('')
  const [active, setActive] = useState(0);
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [royalties, setRoyalties] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [properties, setProperties] = useState('');
  const [category, setCategory] = useState(0);
  const [image, setImage] = useState(null);
  const categoryArray = [
    {
      image: images.art1,
      category: "Sports Crypto Legend - Professor",
    },
    {
      image: images.art2,
      category: "Music Crypto Legend - Professor",
    },
    {
      image: images.art3,
      category: "Digital Crypto Legend - Professor",
    },
    {
      image: images.art4,
      category: "Sports Crypto Legend - Professor",
    },
    {
      image: images.art5,
      category: "Time Crypto Legend - Professor",
    },
    {
      image: images.art6,
      category: "Photography Crypto Legend - Professor",
    },
  ];
  const router = useRouter()
  return (
    <div className={formStyle.upload}>
      <DropZone
        title="JPG, PNG, WEBM, MAX 100MB"
        heading="Drag & drop file"
        subHeading="or Browse media on your device"
        name={name}
        website={website}
        description={description}
        royalties={royalties}
        fileSize={fileSize}
        category={category}
        properties={properties}
        setImage = {setImage}
        uploadToIPFS = {uploadToIPFS}
      />
      <div className={formStyle.upload_box}>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="name">Item Name</label>
          <input
            type="text"
            placeholder="Enter item name"
            className={formStyle.Form_box_input_userName}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="website">Website</label>
          <div className={formStyle.Form_box_input_box}>
            <div className={formStyle.Form_box_input_box_icon}>
              <MdOutlineHttp />
            </div>
            <input
              type="text"
              placeholder="Enter website URL"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <p className={formStyle.upload_box_input_para}>
            Crypt will include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.
          </p>
        </div>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            cols="30"
            rows="6"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="category">Choose Collection</label>
          <p className={Style.upload_box_input_para}>Choose an existing collection or create a new one</p>
          <div className={Style.upload_box_slider_div}>
            {categoryArray.map((el, i) => (
              <div
                key={i}
                className={`${Style.upload_box_slider} ${active === i + 1 ? formStyle.active : ''}`}
                onClick={() => {
                  setActive(i + 1);
                  setCategory(el.category);
                }}
              >
                <div className={Style.upload_box_slider_box}>
                  <div className={formStyle.upload_box_slider_box_img}>
                    <Image
                      src={el.image}
                      alt="background"
                      width={70}
                      height={70}
                      className={Style.upload_box_slider_box_img_img}
                    />
                  </div>
                  <div className={Style.upload_box_slider_box_img_icon}>
                    <TiTick />
                  </div>
                </div>
                <p>Crypto Legend - Professor</p>
              </div>
            ))}
          </div>
        </div>
        <div className={formStyle.Form_box_input_social}>
          <div className={formStyle.Form_box_input}>
            <label htmlFor="royalties">Royalties</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <FaPercent />
              </div>
              <input
                type="text"
                placeholder="Enter Royalties"
                value={royalties}
                onChange={(e) => setRoyalties(e.target.value)}
              />
            </div>
          </div>
          <div className={formStyle.Form_box_input}>
            <label htmlFor="size">Size</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <MdOutlineAttachFile />
              </div>
              <input
                type="text"
                placeholder="240 MB"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
              />
            </div>
          </div>
          <div className={formStyle.Form_box_input}>
            <label htmlFor="properties">Properties</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <LuTableProperties />
              </div>
              <input
                type="text"
                placeholder="Enter properties"
                value={properties}
                onChange={(e) => setProperties(e.target.value)}
              />
            </div>
          </div>
          <div className={formStyle.Form_box_input}>
            <label htmlFor="Price">Price</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <LuTableProperties />
              </div>
              <input
                type="text"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="category">Category</label>
          <div className={formStyle.Form_box_input_box}>
            <div className={formStyle.Form_box_input_box_icon}>
              <BiCategory />
            </div>
            <input
              type="text"
              placeholder="select"
              value={category}
              onChange={(e) => category(e.target.value)}
            />
          </div>
        </div>
        <div className={Style.upload_box_btn}>
          <Button
            btnName="Upload"
            handleClick= {async() => createNFT(
              name, 
              price, 
              image, 
              description, 
              router, 
              // website, 
              // royalties, 
              // fileSize, 
              // category
              )}
            classStyle={formStyle.upload_box_btn_style}
          />
          <Button
            btnName="Preview"
            handleClick={() => {
              // Handle upload logic
              
            }}
            classStyle={formStyle.upload_box_btn_style}
          />
        </div>
 
      </div>
    </div>
  );
};

export default UploadNFT;