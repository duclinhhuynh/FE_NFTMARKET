# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

This is a fullstack DApp NFT Marketplace built as a study project to learn more about blockchain and smart contract development.
Made with NodeJS, Hardhat, Solidity, ReactJS, NextJS


Try running some of the following tasks:
start:
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
npm run dev

after that using account when run npx hardhat node 
import private key in your metamak 
and add network in your metamask:

Network name: http://localhost:8545
New RPC URL: http://localhost:8545)
Chain ID: 1337
Currency symbol: ETH

another way 
you can also use polygon mumbai or another 
networks: {
  hardhat: {},
    polygon_mumbai: {
       url : "projectAPI",
          accounts: 
            `0x${"yourprivatekey"}`
            ],
     }
   },
create your account at: https://www.alchemy.com/
deposit matic:https://faucet.polygon.technology/
