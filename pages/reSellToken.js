import React, {useEffect, useState, useContext} from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Style from "../styles/reSellToken.module.css"
import fromStyle from '../accountPage/Form/Form.module.css'
import {Button, Input, Loader} from '../components/componentsindex'
import Image from 'next/image'
import formStyle from '../accountPage/Form/Form.module.css'
import { MdPriceChange } from "react-icons/md";
//IMPORT SMART CONTRACT
import { NFTMarketplaceContext,fetchNFTS } from '../Context/NFTMarketplaceContext'
const reSellToken = () => {
  const {createSale} = useContext(NFTMarketplaceContext);
  const [price , setPrice] = useState("");
  const [image, setImage] = useState("");
  const [name , setName] = useState("");
  const [des, setDes] = useState("");
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
      setImage(imageurl);
      setName(name);
      setDes(description);
};
  useEffect(() => {
    fetchNFTS();
  }, [id]);
  const resell = async () => {
    try 
    {
      await createSale(tokenURI, price , true, id);
      router.push('/author');
      console.log("price of sale", price);
    }catch (error){
      console.log("Error while resell", error);
    }
  }
  return (
    <div className={Style.reSellToken}>
      <div className={Style.reSellToken_box}>
        <h1>ReSell Your Token, Set Price</h1>
        <div className={Style.contactus_box_box}>
          <div className={Style.contactus_box_box_left}>
              { image && (
                <Image 
                className={Style.reSellToken_box_image}
                src={image} 
                alt="resell nft" width={400}
                 height={400}
                objectFit='contain'
                />
              )}
            </div>
            <div className={Style.contactus_box_box_right}>
                <div className={formStyle.Form_box_input}>
                    <label htmlFor="name">UserName</label>
                    <input type="text" placeholder={name}
                      className={formStyle.Form_box_input_userName}/>
                </div>
                <div className={formStyle.Form_box_input}>
                            <label htmlFor="description">Description</label>
                            <textarea name='' id=''
                            cols ="30" rows="6" 
                            placeholder={des}
                            ></textarea>
                        </div>
                <div className={fromStyle.Form_box_input}>
                    <label htmlFor="name"></label>
                    <div className={formStyle.Form_box_input_box}>
                      <div className={formStyle.Form_box_input_box_icon}>
                          <MdPriceChange/>
                      </div>
                      <input type="number" 
                      min={0.00001}
                      placeholder="resell price"
                      onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    </div>
                </div>
            </div>
          <div className={Style.reSellToken_box_btn}>
          <Button btnName="Resell NFT" handleClick={() => resell()}></Button>
          </div>
        </div>
      </div>
  )
}

export default reSellToken