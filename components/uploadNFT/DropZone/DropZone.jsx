import React, {useState,useCallback} from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import Style from './DropZone.module.css'
import images from '../../../img'
// import { accessSync } from 'fs'
const DropZone = ({title, heading, subHeading, name,price, website, description,
  royalties,fileSize, properties, category, image, uploadFileToIPFS,setImage,
}) => {
  const [fileUrl, setFileUrl] = useState(false);
  const onDrop = useCallback(async (acceptedFiles) => {
    try {
      const url = await uploadFileToIPFS(acceptedFiles[0]); // Wait for the promise to resolve
        setFileUrl(url);
        setImage(url);
        console.log("url of drop ", url);
    } catch (error) {
      // console.error("Error uploading file to IPFS:", error);
    }
  },[setImage, uploadFileToIPFS]);
   const {getRootProps, getInputProps} = useDropzone({
      onDrop,
      accept: "image/*, .gif",
      maxSize: 500000,
   })
   
  return (
    
    <div className={`gap-2 items-center ${Style.DropZone}`}>
      <div className={`${Style.DropZone_box}`}{...getRootProps()}>
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
        <aside className={`${Style.DropZone_box_aside}`}>
          <div className={Style.DropZone_box_aside_box}>
            <img src={fileUrl} alt='nft'
            width={200}
            height={200}
            objectFit='contain'
            className={Style.DropZone_box_input_img_img}
            />
            <div>
              <div>
                <p className='border-b border-gray-400'> <samp className='font-semibold'>Name NFT: </samp>
                {name || ""}
                </p>
                <p className='border-b border-gray-400'> <samp className='font-semibold'>Supply: </samp>
                {price || ""}
                </p>
                <p className='border-b border-gray-400 tex'><samp className='font-semibold'>External link: </samp>
                {website || ""}
                </p>
              </div>
              <div>
                <p className='border-b border-gray-400'>
                  <span className='font-semibold'>Descriptions: </span>
                  {description || ""}
                </p>
              </div>
              <div >
                <p className='border-b border-gray-400'>
                  <span className='font-semibold'>Collections: </span>
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