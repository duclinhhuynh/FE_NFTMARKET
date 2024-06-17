import React from 'react'
import Image from 'next/image'
import {BsCircleFill} from 'react-icons/bs'
//INTERNAL IMPORT
import Style from "./Category.module.css"
import images from '../../img';
const Category = () => {
    const CategoryArray = [
        {
            backgound:images.cartoon1
        },
        {
            backgound:images.cartoon2
        },
        {
            backgound:images.cartoon5,
        } ,
        {
            backgound:images.cartoon4
        },
        {
            backgound:images.cartoon6
        }

    ];
  return (
    <div className={Style.box_category}>
        <div className={Style.category}>
        {CategoryArray.map((el,i) => (
            <div className={`border shadow-md ${Style.category_box}`} key={1 + 1} >
                <Image src={el.backgound} 
                className={Style.category_box_img}
                alt='Background image'
                width={400}
                height={200}
                objectFit="contain"
                
                />
                <div className={Style.category_box_title}>
                    <span>
                        <BsCircleFill/>
                    </span>
                    <div className={Style.category_box_title_info}>
                        <h4>Entertainment</h4>
                        <small>1993 NFTS</small>
                    </div>
                </div>
            </div>
        ))   
        }
    </div>
    </div>
    
  )
}

export default Category