import React, {useState,useCallback} from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import Style from './DropZone.module.css'
import images from '../../img'
// import { accessSync } from 'fs'
const DropZone = ({title, heading, subHeading, name, website, description,
  royalties,fileSize, properties, category, image, uploadToIPFS,setImage,
}) => {
  const [fileUrl, setFileUrl] = useState(false);
  const onDrop = useCallback(async (acceptedFiles) => {
    try {
      console.log(acceptedFiles[0]);
      const url = await uploadToIPFS(acceptedFiles[0]); // Wait for the promise to resolve
        setFileUrl(url);
        setImage(url);
        console.log("url of drop ", url);
    } catch (error) {
      console.error("Error uploading file to IPFS:", error);
    }
  }, [setFileUrl, setImage]);
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
            <Image src={images.upload_img} alt='upload' width={100} height={100}
            className={Style.DropZone_box_input_img_img_one}
            objectFit='cover'
            />
          </div>
          <p>{heading}</p>
          <p>{subHeading}</p>
        </div>
      </div>
      {fileUrl && (
        <aside className={Style.DropZone_box_aside}>
          <div className={Style.DropZone_box_aside_box}>
            <Image src={fileUrl} alt='nft'
            width={200}
            height={200}
            objectFit='cover'
            className={Style.DropZone_box_input_img_img}
            />
            <div className={Style.DropZone_box_aside_box_preview}>
              <div className={Style.DropZone_box_aside_box_preview_one}>
                <p> <samp>NFT: </samp>
                {name || ""}
                </p>
                <p><samp>Website: </samp>
                {website || ""}
                </p>
              </div>
              <div className={Style.DropZone_box_aside_box_preview_two}>
                <p>
                  <span>Description: </span>
                  {description || ""}
                </p>
              </div>
              <div className={Style.DropZone_box_aside_box_preview_three}>
                <p>
                  <span>Royalties: </span>
                  {royalties || ""}
                </p>
                <p>
                  <span>FileSize: </span>
                  {fileSize || ""}
                </p>
                <p>
                  <span>Properties: </span>
                  {properties || ""}
                </p>
                <p>
                  <span>Category: </span>
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