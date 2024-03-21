import React, {useState,useCallback} from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import Style from './DropZone.module.css'
import images from '../../img'
// import { accessSync } from 'fs'
const DropZone = ({title, heading, subHeading, itemName, website, description,
  royalties,fileSize, properties,category, image,
}) => {
  const [fileUrl, setFileUrl] = useState(true);
   const onDrop = useCallback(async(acceptFile) => {
    setFileUrl(acceptFile[0]);
   });
   const {getRootProps, getInputProps} = useDropzone({
      onDrop,
      accept: "image/*",
      maxSize: 500000,
   })
  return (
    
    <div className={Style.DropZone}>
      <div className={Style.DropZone_box}{...getRootProps()}>
        <input {...getInputProps()}/>
        <div className={Style.DropZone_box_input}>
          <p>{title}</p>
          <div className={Style.DropZone_box_input_img}>
            <Image src={image} alt='upload' width={100} height={100}
            className={Style.DropZone_box_input_img_img}
            />
          </div>
          <p>{heading}</p>
          <p>{subHeading}</p>
        </div>
      </div>
      {fileUrl && (
        <aside className={Style.DropZone_box_aside}>
          <div className={Style.DropZone_box_aside_box}>
            <Image src={images.art2} alt='nft'
            width={200}
            height={200}
            objectFit='contain'
            className={Style.DropZone_box_input_img_img}
            />
            <div className={Style.DropZone_box_aside_box_preview}>
              <div className={Style.DropZone_box_aside_box_preview_one}>
                <p> <samp>NFT:</samp>
                {itemName || ""}
                </p>
                <p><samp>Website:</samp>
                {website || ""}
                </p>
              </div>
              <div className={Style.DropZone_box_aside_box_preview_two}>
                <p>
                  <span>Description</span>
                  {description || ""}
                </p>
              </div>
              <div className={Style.DropZone_box_aside_box_preview_three}>
                <p>
                  <span>Royalties</span>
                  {royalties || ""}
                </p>
                <p>
                  <span>FileSize</span>
                  {fileSize || ""}
                </p>
                <p>
                  <span>Properties</span>
                  {properties || ""}
                </p>
                <p>
                  <span>Category</span>
                  {category || ""}
                </p>
              </div>
            </div>
          </div>
        </aside>
      )}
    </div>
  )
}

export default DropZone