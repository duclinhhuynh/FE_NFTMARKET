import React, {useState, useEffect, useContext} from 'react'
import Image from 'next/image';
// INTERMAL IMPORT
import Style from '../styles/connectWallets.module.css'
import images from '../img';
import {NFTMarketplaceContext} from '../Context/NFTMarketplaceContext';

const connectWallet = () => {
    const [activeBtn, setactiveBtn] = useState();
    const {currentAccount, connectWallet} = useContext(NFTMarketplaceContext);
    const providerArray = [
    {   
        provider: images.metamark,
        name: "Metamask",
    },
    {   
        provider: images.OKX,
        name: "Okx",
    },
    {   
        provider: images.walletconnect,
        name: "D app",
    },
    {   
        provider: images.rainbow,
        name: "rainbow",
    },
]
  return (
    <div className={Style.connectWallet}>
        <div className={Style.connectWallet_box}>
            <h1>Connect your wallet</h1>
            <p className={Style.connectWallet_box_para}>
                Connect with one of our wallet provider or create a new 
            </p>
            <div className={Style.connectWallet_box_provider}>
                {providerArray.map((el, i) => (
                    <div className={`${Style.connectWallet_box_provider_item}
                    ${activeBtn == i + 1 ? Style.active : ""}`} 
                    key={i + 1}
                    onClick={() => (setactiveBtn(i + 1), connectWallet())}
                    >
                        <Image src={el.provider} alt={el.provider} 
                        width={50}
                        height={50}
                        className={ Style.connectWallet_box_provider_item_img}
                        />
                        <p>{el.name}</p>
                    </div>
                ))
                }
            </div>
        </div>
    </div>
  )
}

export default connectWallet