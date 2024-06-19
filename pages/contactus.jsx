import React from 'react'
import Image from 'next/image';
import {TiSocialFacebook, TiSocialLinkedin, TiSocialTwitter, TiSocialYoutube, TiSocialInstagram} from 'react-icons/ti';
import {HiOutlineMail} from 'react-icons/hi'
import { FaPhoneAlt ,FaAddressBook } from "react-icons/fa";
//INTERNAL IMPORT 

import Style from '../styles/contactus.module.css'
import formStyle from '../components/accountPage/Form/Form.module.css'
import {Button} from "../components/componentsindex"
const contactus = () => {
  return (
    <div className={Style.contactus}>
        <div className={Style.contactus_box}>
            <h1>Contact us</h1>
            <div className={Style.contactus_box_box}>
                <div className={Style.contactus_box_box_left}>
                    <div className={Style.contactus_box_box_left_item}>
                        <h3> <FaAddressBook/> Address</h3>
                        <p>
                            Photo booth tatood prism, portand taiyai
                        </p>
                    </div>
                    <div className={Style.contactus_box_box_left_item}>
                        <h3><HiOutlineMail/> Email</h3>
                        <p>example@example.com</p>
                    </div>
                    <div className={Style.contactus_box_box_left_item}>
                        <h3><FaPhoneAlt/> Phone</h3>
                        <p>000-123-345-466</p>
                    </div>
                    <div className={Style.contactus_box_box_left_item}>
                        <h3>Social</h3>
                        <a href='#'>
                            <TiSocialFacebook/>
                        </a>
                        <a href='#'>
                            <TiSocialInstagram/>
                        </a>
                        <a href='#'>
                            <TiSocialLinkedin/>
                        </a>
                        <a href='#'>
                            <TiSocialTwitter/>
                        </a>
                        <a href='#'>
                            <TiSocialYoutube/>
                        </a>
                    </div>
                </div>
                <div className={Style.contactus_box_box_right}>
                    <form>
                        <div className={formStyle.Form_box_input}>
                            <label htmlFor="name">UserName</label>
                            <input type="text" placeholder='shoai bhai'
                            className={formStyle.Form_box_input_userName}
                            />
                        </div>
                        <div className={formStyle.Form_box_input}>
                            <label htmlFor="email">Email</label>
                            <div className={formStyle.Form_box_input_box}>
                                <div className={formStyle.Form_box_input_box_icon}>
                                    <HiOutlineMail/>
                                </div>
                                <input type='text' placeholder='Email*'/>
                            </div>
                        </div>
                        <div className={formStyle.Form_box_input}>
                            <label htmlFor="description">Description</label>
                            <textarea name='' id=''
                            cols ="30" rows="6" 
                            placeholder='Some thing about yourself'
                            ></textarea>
                        </div>
                        <Button 
                            btnName="send message"
                            handleClick={() => {}}
                            classStyle={Style.button}
                        />
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default contactus