import React from 'react'
import { TiTick } from 'react-icons/ti'
import {Button} from "../componentsindex"
import Style from './Subscription.module.css'
const Subscription = ({el, i}) => {
  return (
    <div className={Style.subscription}>
        <div className={Style.subscription_box}>
            <span className={Style.subscription_box_span}>{el.plan}</span>
            <small className={Style.subscription_box_small}>{el.popular || ""}
                {el.popular || ""}
            </small>
            <p className={Style.subscription_box_price}>
                {el.price}
            </p>
            <div className={Style.subscription_box_info}>
                {el.service.map((el, i) => (
                    <p className={Style.subscription_box_info_para} key={i + 1}>
                        <span>
                            <TiTick/>
                        </span>
                        {el}
                    </p>
                ))}
            </div>
            <Button btnName="Submit" handleClick={() => {}}
            classStyle={Style.button}
            />
        </div>
    </div>
  )
}

export default Subscription