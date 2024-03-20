import React, { useCallback, useState } from 'react'
import {HiOutlineMail} from 'react-icons/hi'
import {MdOutlineHttp, MdOutlineContentCopy, MdOutlineLineAxis} from 'react-icons/md'
import { TiSocialFacebook, TiSocialTwitter, TiSocialInstagram } from 'react-icons/ti'

//INTERNAL IMPORT 
import Style from './Form.module.css'
import { Button } from '../../components/componentsindex'
import { useDropzone } from 'react-dropzone'
const Form = () => {
  const [fileUrl, setFileUrl] = useState(null);

  const onDrop = useCallback(async (acceptedFile) => {
    setFileUrl(acceptedFile[0]);
  }, []);

  return (
    <div className={Style.Form}>
      <div className={Style.Form_box}>
        <form>
          <div className={Style.Form_box_input}>
            <label htmlFor="name">UserName</label>
            <input type="text" placeholder='shoai bhai'
            className={Style.Form_box_input_userName}
            />
          </div>
          <div className={Style.Form_box_input}>
            <label htmlFor="email">Email</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <HiOutlineMail/>
              </div>
              <input type='text' placeholder='Email*'/>
            </div>
          </div>
          <div className={Style.Form_box_input}>
            <label htmlFor="description">Description</label>
            <textarea name='' id=''
             cols ="30" rows="6" 
             placeholder='Some thing about yourself'
             ></textarea>
          </div>
          <div className={Style.Form_box_input}>
            <label htmlFor='website'> </label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineHttp/>
              </div>
              <input type='text' placeholder='website'/>
            </div>
          </div>
          <div className={Style.Form_box_input_social}>
            <div className={Style.Form_box_input }>
              <label htmlFor='facebook'>FaceBook</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <TiSocialFacebook/>
                </div>
                <input type='text' placeholder='https://ronalse'/>
              </div>
            </div>
            <div className={Style.Form_box_input }>
              <label htmlFor='Twitter'>Twitter</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <TiSocialTwitter/>
                </div>
                <input type='text' placeholder='https://ronalse'/>
              </div>
            </div>
            <div className={Style.Form_box_input }>
              <label htmlFor='Instagram'>Instagram</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <TiSocialInstagram/>
                </div>
                <input type='text' placeholder='https://ronalse'/>
              </div>
            </div>
          </div>
          <div className={Style.Form_box_input }>
              <label htmlFor='wallet'>Wallet</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <MdOutlineHttp/>
                </div>
                <input type='text' placeholder='https://ronalse'/>
                <div className={Style.Form_box_input_box_icon}>
                  <MdOutlineContentCopy/>
                </div>
              </div>
            </div>
            <div className={Style.Form_box_btn}>
              <Button btnName="Upload profile" 
              handleClick={() => {}}
              classStyle={Style.button}
              />
            </div>
        </form>
      </div>
    </div>
  ) 
}

export default Form