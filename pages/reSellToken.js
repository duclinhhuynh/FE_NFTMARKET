import React, {useEffect, useState, useContext} from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Style from "../styles/reSellToken.module.css"
import fromStyle from '../accountPage/Form/Form.module.css'
import {Button, Input, Loader} from '../components/componentsindex'
import Image from 'next/image'
//IMPORT SMART CONTRACT
import { NFTMarketplaceContext,fetchNFTS } from '../Context/NFTMarketplaceContext'
const reSellToken = () => {
  const {createSale} = useContext(NFTMarketplaceContext);
  const [price , setPrice] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();
  const {id, tokenURI} = router.query;
  const fetchNFTS = async() => {
      if(!tokenURI) return ; 
      const response = await fetch(tokenURI);
      console.log("respone", response);
      const data = await response.json();
      const jsonDataString = Object.keys(data)[0];
      const jsonData = JSON.parse(jsonDataString);
      // Extract name, description, and imageurl from the parsed JSON object
      const name = jsonData.hasOwnProperty('name') ? jsonData.name : 'Name not available';
      const description = jsonData.hasOwnProperty('description') ? jsonData.description : 'Description not available';
      const imageurl = jsonData.hasOwnProperty('imageurl') ? jsonData.imageurl : 'Image URL not available';
    setPrice(price)
    setImage(imageurl);

};
  useEffect(() => {
    fetchNFTS();
  }, [id]);
  const resell = async () => {
    await createSale(tokenURI, price , true, id);
    router.push('/author');
  }
  return (
    <div className={Style.reSellToken}>
      <div className={Style.reSellToken_box}>
        <h1>ReSell Your Token, Set Price</h1>
        <div className={fromStyle.Form_box_input}>
            <label htmlFor="name"></label>
            <input type="number" 
            min={1}
            placeholder="resell"
            className={fromStyle.Form_box_input_userName}
            />
        </div>
      </div>
      <div className={Style.reSellToken_box_image}>
        { image && (
          <Image src={image} alt="resell nft" width={400} height={400}/>
        )}
      </div>
      <div className={Style.reSellToken_box_btn}>
        <Button btnName="Resell NFT" handleClick={() => resell()}></Button>
      </div>
    </div>
  )
}

export default reSellToken