import React, {useState, useEffect, useContext, use} from "react";
import {Image} from "@nextui-org/react";
import NextImage from "next/image";
//INTERNAL IMPORT
import Style from "./HeroSection.module.css"
// import { Button } from "../componentsindex";
import images from "../../img"
import { useRouter } from "next/router";
import { Button } from '@nextui-org/button'
import {Time} from "@internationalized/date";
import {TimeInput} from "@nextui-org/react";
import {Chip} from "@nextui-org/react";
import { CiCircleCheck } from "react-icons/ci";
//Smart contract 
import {NFTMarketplaceContext} from '../../Context/NFTMarketplaceContext'
const HeroSection = () => {
    const router = useRouter()
    const {titleData} = useContext(NFTMarketplaceContext)
    return (
    <div className={Style.heroSection}>
        <div className={Style.heroSection_box}>
            <div className={Style.heroSection_box_left}>
                <h1>{titleData}🖼</h1>
                <p color="primary">A place with endless fun and the most engaging community</p>
                <Button onClick={() => router.push('/searchPage')} color="primary" variant="bordered" 
                >Start your search</Button>
                <div className="flex item-center justify-between">
                    <div>
                    <Image
                        isBlurred
                        width={240}
                        src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
                        alt="NextUI Album Cover"
                        className="m-5"
                        />
                    </div>
                <div className="flex flex-col p-2 m-2 item-center">
                   <div className="flex gap-4 item-center">
                    <TimeInput label="Start Time" />
                    <TimeInput label="End Time" defaultValue={new Time(11, 45)} />
                    </div>
                    <Chip
                        className="m-2"
                        startContent={<CiCircleCheck size={18} />}
                        variant="faded"
                        color="success"
                    >
                        check
                    </Chip>
                    </div>
                </div>
            </div>
            <div className={Style.heroSection_box_right}>
                <NextImage className={Style.responsiveImageContainer}
                src={images.hero}
                width={600}
                height={600}
                />
            </div>
        </div>
    </div>
    )
};

export default HeroSection;