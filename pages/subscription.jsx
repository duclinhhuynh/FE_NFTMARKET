import React from 'react'

import Style from '../styles/subscription.module.css'
import Subscription from '../components/subscription/Subscription'
import { IoDiamond } from "react-icons/io5";
const subscription = () => {
    const subscriptionArray = [
        {
            plan: "Starter",
            price: "$5/mmo",
            // popular: "popular",
            service: ["Automated Reporting", "Faster Processing", "Customizations"],
            info: "Literally you probably haven't heard of them jean shorts",
        },
        {
            plan: "BASIC",
            price: "$15/mmo",
            // popular: "popular",
            service: ["Automated Reporting", "Faster Processing", "Customizations"],
            info: "Literally you probably haven't heard of them jean shorts",
        },
        {
            plan: "Premium",
            price: "$25/mmo",
            // popular: "popular",
            service: ["Automated Reporting", "Faster Processing", "Customizations"],
            info: "Literally you probably haven't heard of them jean shorts",
        }
    ]
    
  return (
    <div className={Style.subscription}>
        <div className={Style.subscription_box}>
            <div className={Style.subscription_box_info}>
                <h1>
                    <IoDiamond/>
                    Subscription</h1>
                <p>Pricing to fit the need of any companie size.</p>
            </div>
            <div className={Style.subscription_box_box}>
                {subscriptionArray.map((el, i) => (
                    <Subscription key={i + 1} i = {1} el = {el}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default subscription