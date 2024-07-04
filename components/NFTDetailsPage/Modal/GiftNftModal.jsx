import React, { useState, useEffect } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Image,
} from "@nextui-org/react";
import { FaGift } from "react-icons/fa6";
const ListNftModal = ({
    openModelGift,
    setOpenModalGift,
    currentAccount,
    nft,
    transferNFT
}) => {
    const [receiver, setReceiver] = useState();
    const handleClearReceiver = () => {
        setReceiver("");
    }
    const handleCloseModal = () => {
        setOpenModalGift(false);
    };
    const [isLoadingTransfer, setIsLoadingTransfer] = useState(false);
    const handleTransferNft = async () => {
        try {
            setIsLoadingTransfer(true);
            await transferNFT(nft, receiver);
            setIsLoadingTransfer(false);
        } catch (error) {
            console.error("Error transferNFT sale:", error);
            setIsLoadingTransfer(false);
            return;
        }
    }
    return (
        <Modal size={"lg"} isOpen={openModelGift} className="text-textprimary">
            <div onClick={handleCloseModal}>
                <ModalContent onClick={(e) => e.stopPropagation()}>
                    <ModalHeader className="flex flex-col gap-1 ">
                        Gift your Axie
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex items-center gap-2">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-4">
                                    <p className="text-gray-500">
                                        You are about to gift <span className="text-textprimary">only one</span> to another person, enter receiver's <span href="" className="text-textprimary font-bold">Ronin wallet address</span> to continue:
                                    </p>
                                    <p className="text-md">
                                        From: {(currentAccount)}
                                    </p>
                                    <Input
                                        isRequired
                                        type="text"
                                        variant="bordered"
                                        placeholder="Address of receiver"
                                        className="max-w-xl"
                                        onClear={handleClearReceiver}
                                        onChange={(e) => setReceiver(e.target.value)}
                                    />
                                </div>
                                <div className="bg-itembackground p-3 rounded-xl">
                                    <Image src={nft.imageurl} width={50} />
                                    <p>
                                        If you used this axie in the Origins arena during the last 72 hours of an era,
                                        gifting it may disqualify you from the era's rewards. <a className="text-blue-400 font-medium hover:underline" href="">Learn more</a></p>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={handleCloseModal}>
                            Close
                        </Button>
                        <Button
                            onClick={handleTransferNft}
                            startContent={isLoadingTransfer ? "Loading..." : <FaGift />}
                            color="primary"
                            variant="bordered"
                            isDisabled={!(receiver)}
                            isLoading={isLoadingTransfer}
                        >
                            {isLoadingTransfer ? "Gifting..." : "Gift"}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </div>
        </Modal>
    );
};

export default ListNftModal;
