// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TransferFunds {
    uint256 transactionCount;

    event TransferEvent(
        address from, 
        address receiver,
        uint256 amount,
        string message,
        uint256 timestamp
    );

    struct TransferFundsStruck {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamps;
    }
    TransferFundsStruck[] transactions;

    function addDataToBlockChain(address payable receiver, uint256 amount, string memory message) public {
        transactionCount += 1;
        transactions.push(
            TransferFundsStruck(msg.sender,receiver, amount, message,block.timestamp)
        );
        emit TransferEvent(msg.sender, receiver, amount, message, block.timestamp);
    }
    function getAllTransaction()
        public 
        view
        returns (TransferFundsStruck[] memory)
        {
            return transactions;
        }
    function getTransactionCount() public view returns(uint256){
        return transactionCount;
    }
}