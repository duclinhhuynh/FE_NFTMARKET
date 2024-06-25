import React, { useContext, useEffect, useState } from "react";
// react icon
import { FaEthereum } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";
import { FiCopy } from "react-icons/fi";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { IoMdClock } from "react-icons/io";
// react ui
import {
  Textarea,
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Select,
  SelectItem,
  Image,
} from "@nextui-org/react";
import { Button } from "@nextui-org/button";

import Style from "../components/accountPage/Form/Form.module.css";
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
// theme
import ThemeSwitcherText from "../components/theme/ThemeSwitcherText";

const TransferFunds = () => {
  const {
    currentAccount,
    transferEther,
    accountBalance,
    loading,
    transaction,
    transactionCount,
    getAllTransactions,
  } = useContext(NFTMarketplaceContext);
  const [transferAmount, setTransferAmount] = useState("");
  const [transferAccount, setTransferAccount] = useState("");
  const [message, setMessage] = useState("");
  const [readMess, setReadMess] = useState("");
  const [openBox, setOpenBox] = useState(false);
  const [value, setValue] = React.useState(new Set([]));
  const tokens = [
    { key: "SHIBA", label: "SHIBA" },
    { key: "BTC", label: "BTC" },
    { key: "ETH", label: "ETH" },
    { key: "DOG", label: "DOG" },
    { key: "KU", label: "KU" },
    { key: "LINH", label: "LINH" },
  ];
  useEffect(() => {
    getAllTransactions();
  }, []);
  const copyAddressAccount = () => {
    const copyText = document.getElementById("yourAddress");
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
    const copyText = document.getElementById("sendAddress");
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
    <ThemeSwitcherText>
      <div className="mt-10 mb-52">
        <div className="my-auto">
          <div className="flex justify-around sm:flex-col md:flex-row max-sm:flex-col max-sm:gap-5">
            <div className="w-1/3 md:w-[40%] sm:w-[90%] max-sm:w-[90%] mx-auto h-max shadow-md p-2 border border-bordercustom rounded-xl">
              <h2 className="text-2xl font-semibold mb-2">
                Transfer your ether
              </h2>
              <div className="bg-itembackground flex border border-bordercustom rounded-xl">
                <div className="flex flex-col justify-between w-full">
                  <input
                    type="text"
                    value={currentAccount}
                    id="yourAddress"
                    hidden
                  />
                  <input
                    type="text"
                    value={transferAccount}
                    id="sendAddress"
                    hidden
                  />
                  <div className="flex xl:flex-row max-sm:flex-col md:flex-col ">
                    <p
                      className="flex item-center text-1xl font-semibold p-5 cursor-pointer"
                      onClick={() => copyAddressAccount()}
                      onMouseDown={handleMouseDown}
                    >
                      From:&nbsp;&nbsp;
                      {currentAccount && currentAccount.length > 10
                        ? currentAccount.slice(0, 7) +
                          "..." +
                          currentAccount.slice(-3)
                        : currentAccount}
                      &nbsp;&nbsp;
                      <span className="flex ">
                        {showCheck ? <FaRegCheckCircle className="text-green-500"/> : <FiCopy />}
                      </span>
                    </p>
                    <p
                      className="flex item-center text-1xl font-semibold p-5 cursor-pointer"
                      onClick={() => copyAddressSend()}
                      onMouseDown={handleMouseDownSend}
                    >
                      To:&nbsp;&nbsp;
                      {transferAccount && transferAccount.length > 10
                        ? transferAccount.slice(0, 7) +
                          "..." +
                          transferAccount.slice(-3)
                        : transferAccount}
                      &nbsp;&nbsp;
                      <span className="flex ">
                        {showCheckSend ? <FaRegCheckCircle className="text-green-500"/> : <FiCopy />}
                      </span>
                    </p>
                  </div>
                  <p className="flex item-center text-1xl font-semibold p-5">
                    Your balance: {accountBalance} ETH
                  </p>
                </div>
              </div>
              <form>
                <label className="text-1xl mb-2" htmlFor="Ether">
                  Receive Address
                </label>
                <Input
                  type="text"
                  placeholder="0x..."
                  labelPlacement="outside"
                  onChange={(e) => setTransferAccount(e.target.value)}
                />
                <label className="text-1xl mb-2" htmlFor="Ether">
                  Your Price
                </label>
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
                        <option>BSC</option>
                        <option>USD</option>
                        <option className="">ETH</option>
                      </select>
                    </div>
                  }
                  type="number"
                />
                <div className=" flex ">
                  <Textarea
                    isInvalid={false}
                    variant="bordered"
                    label="Description"
                    placeholder="Enter your description"
                    labelPlacement="outside"
                    errorMessage="The description should be at least 255 characters long."
                    className="max-w text-primary"
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <div className="my-2">
                  <Button
                    variant="bordered"
                    color="primary"
                    onClick={() =>
                      transferEther(transferAccount, transferAmount, message)
                    }
                  >
                    Transfer your balance
                  </Button>
                </div>
              </form>
            </div>
            <div className="w-[60%] md:w-[50%] sm:w-[90%] max-sm:w-[90%] flex flex-col gap-4 mx-auto">
              <div className="bg-itembackground flex xl:flex-row md:flex-col max-sm:flex-col justify-between gap-5 border border-bordercustom rounded-xl p-5 shadow-md">
                <div className="min-w-[300px] flex flex-col gap-3">
                  <h3 className="text-gray-700 font-medium font-semibold">
                    overview
                  </h3>
                  <div>
                    <p className="text-gray-400 font-thin text-sm">
                      ETH BLANCE
                    </p>
                    <p className="flex item-center text-black-600 text-sm">
                      <FaEthereum /> {accountBalance.slice(0, 7)} ETH
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 font-thin text-sm">ETH VALUE</p>
                    <p className="flex item-center text-black-600 text-sm">
                      0.0$
                    </p>
                  </div>
                  <div>
                    <div>
                      <p className="text-gray-400 font-thin text-sm">
                        TOKEN HOLDINGS
                      </p>
                      <div className="flex item-center">
                        <div className="flex w-full max-w-xs flex-col gap-2">
                          <Select
                            label="Favorite Token"
                            variant="bordered"
                            placeholder="Select a token"
                            selectedKeys={value}
                            className="max-w-xs"
                            onSelectionChange={setValue}
                          >
                            {tokens.map((token) => (
                              <SelectItem key={token.key}>
                                {token.label}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                        <div className="flex rounded-md items-center p-2 m-2 bg-blue-500 text-white cursor-pointer">
                          <IoWalletOutline className="text-xl" />
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
                <div className="min-w-[300px] flex flex-col gap-3">
                  <h3 className="text-gray-700 font-medium font-semibold">
                    More Info
                  </h3>
                  <div>
                    <p className="text-gray-400 font-thin text-sm pb-2">
                      PRIVATE NAME TAGS
                    </p>
                    <Button
                      color="primary"
                      variant="light"
                      size="sm"
                      className="border rounded-2xl"
                    >
                      <FaPlus /> Add
                    </Button>
                  </div>
                  <div>
                    <p className="text-gray-400 font-thin text-sm p-1">
                      LAST TXN SENT
                    </p>
                    <p className="flex item-center">
                      <span className="text-blue-600 ">
                        {currentAccount.slice(0, 15)}...
                      </span>{" "}
                      from 4hr ago
                    </p>
                  </div>
                  <div>
                    <div>
                      <p className="text-gray-400 font-thin text-sm p-1">
                        FIRST TXN SENT
                      </p>
                      <p className="flex item-center">
                        <span className="text-blue-600 ">
                          {currentAccount.slice(0, 15)}...
                        </span>{" "}
                        from 4hr ago
                      </p>
                    </div>

                    <div></div>
                  </div>
                </div>
              </div>
              <div className="bg-itembackground flex justify-between gap-5 border border-bordercustom rounded-xl p-5 shadow-md">
                <div className="flex xl:flex-row md:flex-col max-sm:flex-col ">
                  <div className="min-w-[300px] flex flex-col gap-5">
                    <h3 className="text-gray-700 font-medium font-semibold">
                      Mutichain Info
                    </h3>
                    <div>
                      <p className="text-black-400 bg-transfer-500 font-thin text-sm">
                        $0 (Multichain Portfolio)
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 font-thin text-sm">
                        ETH VALUE
                      </p>
                      <p className="flex item-center text-black-600 text-sm">
                        0.0$
                      </p>
                    </div>
                  </div>
                  <div className="min-w-[300px] flex flex-col gap-5">
                    <h3 className="text-gray-700 font-medium font-semibold">
                      TRANSACTIONS
                    </h3>
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <div>
                          <GrTransaction />
                        </div>
                        <div>
                          <p className="text-gray-400 font-thin text-sm">
                            TRANSACTIONS
                          </p>
                          <p className="flex item-center text-black-600 text-sm">
                            2,402.52 M (15.4 TPS)
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-400 font-thin text-sm">
                          MED GAS PRICE
                        </p>
                        <p className="flex item-center text-black-600 text-sm">
                          18 Gwei ($1.34)
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between gap-10">
                      <div className="flex gap-1">
                        <div>
                          <IoMdClock />
                        </div>
                        <div>
                          <p className="text-gray-400 font-thin text-sm">
                            LAST FINALIZED BLOCK
                          </p>
                          <p className="flex item-center text-black-600 text-sm">
                            20075419
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-400 font-thin text-sm">
                          LAST SAFE BLOCK
                        </p>
                        <p className="flex item-center text-black-600 text-sm">
                          20075419
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* // history */}
          <h2 className="text-2xl font-semibold ml-14 my-5">
            History your transfer
          </h2>
          <div className="w-[95%] flex justify-center item-center m-auto bg-itembackground rounded-xl border border-bordercustom shadow-md">
            <Table removeWrapper aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>Transaction ID</TableColumn>
                <TableColumn>Amount</TableColumn>
                <TableColumn>FROM</TableColumn>
                <TableColumn>TO</TableColumn>
                <TableColumn>Timestamp</TableColumn>
                <TableColumn>MESSAGE</TableColumn>
              </TableHeader>
              <TableBody>
                {transaction.map((el, i) => (
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{el.amount}</TableCell>
                    <TableCell>{el.addressFrom}</TableCell>
                    <TableCell>{el.addressTo}</TableCell>
                    <TableCell>{el.timestamp}</TableCell>
                    <TableCell>{el.message}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {openBox == false ? (
            ""
          ) : (
            <div onClick={() => setOpenBox(false)}>
              <h1>Transaction Message</h1>
              <p>{readMess}</p>
            </div>
          )}
        </div>
      </div>
    </ThemeSwitcherText>
  );
};

export default TransferFunds;
