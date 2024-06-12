import React, {useContext, useState} from 'react'
import Image from 'next/image'
import image from './../img'  
// react icon
import { FaEthereum } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineContentCopy } from "react-icons/md";
import {FiCopy} from 'react-icons/fi';
import { FaRegCheckCircle } from "react-icons/fa";

// react ui
import {Textarea, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import { Button } from '@nextui-org/button'

import Style from '../components/accountPage/Form/Form.module.css';
import {NFTMarketplaceContext} from "../Context/NFTMarketplaceContext";
import img from './../img';
const TransferFunds = () => {
  const {currentAccount, transferEther, accountBalance} = useContext(NFTMarketplaceContext)
  const [transferAmount, setTransferAmount] = useState("");
  const [transferAccount, setTransferAccount] = useState("");
  const [message, setMessage] = useState("");
  const [readMess, setReadMess] = useState("");
  const [openBox, setOpenBox] = useState(false)
  const transaction = [1, 2, 3, 4, ,55,3];
  const copyAddressAccount = () => {
    const copyText = document.getElementById("myInput")
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
};
const [showCheck, setShowCheck] = useState(false);


const handleMouseDown = () => {
  setShowCheck(true);
  setTimeout(() => {
    setShowCheck(false);
  }, 700);
};
const copyAddressSend = () => {
  const copyText = document.getElementById("myInput")
  copyText.select();
  navigator.clipboard.writeText(copyText.value);
};
const [showCheckSend, setShowCheckSend] = useState(false);


const handleMouseDownSend = () => {
setShowCheckSend(true);
setTimeout(() => {
  setShowCheckSend(false);
}, 700);
};
  return (
    <div className='mt-10'>
      <div className='my-auto'>
        <div className='flex justify-around '>
        <div className='w-1/3'>
            <h2 className='text-2xl font-semibold mb-2'>Now you can transfer ether</h2>
            <div className='flex border border-solid border-yellow-500 rounded-xl' >
              <div className='flex flex-col justify-between'>
                  <input type="text" 
                        value={currentAccount}
                        id='myInput'
                        hidden
                    />
                <div className='flex '>
                  <p className='flex item-center text-1xl font-semibold p-5'
                   onClick={() => copyAddressAccount()}
                   onMouseDown={handleMouseDown}
                  >From:&nbsp;&nbsp;
                {currentAccount && currentAccount.length > 10
                        ? currentAccount.slice(0, 7) + "..." + currentAccount.slice(-3)
                        : currentAccount}
                    &nbsp;&nbsp;
                    <span className='flex '>
                    {showCheck ? <FaRegCheckCircle />
                     : <FiCopy 
                     /> 
                    }
                    </span>
                </p>
                <p className='flex item-center text-1xl font-semibold p-5'
                   onClick={() => copyAddressSend()}
                   onMouseDown={handleMouseDownSend}
                >To:&nbsp;&nbsp;
                {transferAccount && transferAccount.length > 10
                        ? transferAccount.slice(0, 7) + "..." + transferAccount.slice(-3)
                        : transferAccount}
                    &nbsp;&nbsp;
                    <span className='flex '>
                    {showCheckSend ? <FaRegCheckCircle />
                     : <FiCopy 
                     /> 
                    }
                    </span>
                </p>
                </div>
                <p className='flex item-center text-1xl font-semibold p-5'>Your balance: {accountBalance} ETH</p>
              </div>
            </div>
            <form>
                  <label className='text-1xl font-semibold mb-2' htmlFor='Ether'>Receive Address</label>
                  <Input
                    type="text"
                    placeholder="0x..."
                    labelPlacement="outside"
                    onChange={(e) => setTransferAccount(e.target.value)}
                  />
                  <label className='text-1xl font-semibold mb-2' htmlFor='Ether'>Your Price</label>
                 <Input
                    placeholder="0.00"
                    labelPlacement="outside"
                    min={0.05}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                    endContent={
                      <div className="flex items-center">
                        <label className="sr-only" htmlFor="currency">
                          Currency
                        </label>
                        <select
                          className="outline-none border-0 bg-transparent text-default-400 text-small"
                          id="currency"
                          name="currency"
                        >
                          <option>ETH</option>
                          <option>USD</option>
                          <option>BTC</option>
                        </select>
                      </div>
                    }
                    type="number"
                  />
                  <div className=" flex ">
                     <Textarea
                        isInvalid={true}
                        variant="bordered"
                        label="Description"
                        placeholder="Enter your description"
                        labelPlacement="outside"
                        errorMessage="The description should be at least 255 characters long."
                        className="max-w text-primary"
                        onChange={(e) => setMessage(e.target.value)} 
                      />
                  </div>
                  <div className='my-2'>
                    <Button 
                    onClick={() => transferEther(transferAccount,transferAmount, message)}
                    >Transer your balance</Button>
                  </div>
            </form>
          </div>
          <div className='w-1/2'>
          <h2 className='text-2xl font-semibold mb-2'>History your transfer</h2>
            <div>
              <Table removeWrapper aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn>Token</TableColumn>
                  <TableColumn>FROM</TableColumn>
                  <TableColumn>TO</TableColumn>
                  <TableColumn>MESSAGE</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow key="1">
                    <TableCell>Tony Reichert</TableCell>
                    <TableCell>CEO</TableCell>
                    <TableCell>Active</TableCell>
                    <TableCell>Active</TableCell>
                  </TableRow>
                  <TableRow key="2">
                    <TableCell>Zoey Lang</TableCell>
                    <TableCell>Technical Lead</TableCell>
                    <TableCell>Paused</TableCell>
                    <TableCell>Active</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
         {/* // history */}
         <h1>History</h1>
        <div>
          {transaction.map((el,i) => (
            <div key={i + 1}>
              <Image 
                src={image.metamark}
                width={100}
                height={100}
                alt='image'
              />
              <div>
                <p><span>Transfer Id: </span></p>
                <p><span>Amount: </span></p>
                <p><span>From: </span></p>
                <p><span>To: </span></p>
                <Button onClick={()=> (setReadMess(), setOpenBox(true))}>message</Button>
              </div>
            </div>
          ))}
        </div>
        {openBox == false ? (
          "") 
        : 
          (
            <div onClick={()=> setOpenBox(false)}>
              <h1>Transaction Message</h1>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default TransferFunds
