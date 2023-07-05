import React, {  useEffect, useState } from "react";
import Web3 from "web3";
import { useLocation } from "react-router-dom";
import Web3Modal from "web3modal";

const Mint = () => {
  const [count, setCount]=useState(1);
  const [pagelocation, setPageLocation] = useState(useLocation().pathname);
  //totalMinted is the total amount of tokens minted
  const [totalMinted, setTotalMinted] = useState(0);
  //mint value is the amount of tokens to mint
  const [value, setValue] = useState(1);
  //connect to metamask
  const [walletConnected, setWalletConnected] = useState(false);

  // Connect Wallet
  const connectWallet = async () => {
    if (Web3.givenProvider) {
      const providerOptions = {};

      const web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true,
        providerOptions,
      });

      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);

      web3.eth.net.getId();

      const addresses = await web3.eth.getAccounts();
      const address = addresses[0];

      const { ethereum } = window;

      const networkId = await ethereum.request({
        method: "net_version",
      });

      setWalletConnected(true);
    } else {
      window.open(
        `https://metamask.app.link/dapp/hit-cat.netlify.app${pagelocation}`
      );
    }
  };

  // Contract Info
  // const CONTRACT_ADDRESS = "0x3a3138E49ac51255eDcB9A3C5cFcf8206160a042";
  // const CONTRACT_ABI = [
  //   { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  //   {
  //     anonymous: false,
  //     inputs: [
  //       {
  //         indexed: true,
  //         internalType: "address",
  //         name: "owner",
  //         type: "address",
  //       },
  //       {
  //         indexed: true,
  //         internalType: "address",
  //         name: "approved",
  //         type: "address",
  //       },
  //       {
  //         indexed: true,
  //         internalType: "uint256",
  //         name: "tokenId",
  //         type: "uint256",
  //       },
  //     ],
  //     name: "Approval",
  //     type: "event",
  //   },
  //   {
  //     anonymous: false,
  //     inputs: [
  //       {
  //         indexed: true,
  //         internalType: "address",
  //         name: "owner",
  //         type: "address",
  //       },
  //       {
  //         indexed: true,
  //         internalType: "address",
  //         name: "operator",
  //         type: "address",
  //       },
  //       {
  //         indexed: false,
  //         internalType: "bool",
  //         name: "approved",
  //         type: "bool",
  //       },
  //     ],
  //     name: "ApprovalForAll",
  //     type: "event",
  //   },
  //   {
  //     anonymous: false,
  //     inputs: [
  //       {
  //         indexed: true,
  //         internalType: "address",
  //         name: "previousOwner",
  //         type: "address",
  //       },
  //       {
  //         indexed: true,
  //         internalType: "address",
  //         name: "newOwner",
  //         type: "address",
  //       },
  //     ],
  //     name: "OwnershipTransferred",
  //     type: "event",
  //   },
  //   {
  //     anonymous: false,
  //     inputs: [
  //       {
  //         indexed: true,
  //         internalType: "address",
  //         name: "from",
  //         type: "address",
  //       },
  //       { indexed: true, internalType: "address", name: "to", type: "address" },
  //       {
  //         indexed: true,
  //         internalType: "uint256",
  //         name: "tokenId",
  //         type: "uint256",
  //       },
  //     ],
  //     name: "Transfer",
  //     type: "event",
  //   },
  //   {
  //     inputs: [
  //       { internalType: "address[]", name: "_addrs", type: "address[]" },
  //     ],
  //     name: "addArrayToWhiteList",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [{ internalType: "address", name: "_addr", type: "address" }],
  //     name: "addToWhiteList",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [{ internalType: "address", name: "", type: "address" }],
  //     name: "addressMintedBalance",
  //     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  //   {
  //     inputs: [
  //       { internalType: "address", name: "to", type: "address" },
  //       { internalType: "uint256", name: "tokenId", type: "uint256" },
  //     ],
  //     name: "approve",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [{ internalType: "address", name: "owner", type: "address" }],
  //     name: "balanceOf",
  //     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  //   {
  //     inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
  //     name: "getApproved",
  //     outputs: [{ internalType: "address", name: "", type: "address" }],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  //   {
  //     inputs: [],
  //     name: "hiddenMetadataUri",
  //     outputs: [{ internalType: "string", name: "", type: "string" }],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  //   {
  //     inputs: [
  //       { internalType: "address", name: "owner", type: "address" },
  //       { internalType: "address", name: "operator", type: "address" },
  //     ],
  //     name: "isApprovedForAll",
  //     outputs: [{ internalType: "bool", name: "", type: "bool" }],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  //   {
  //     inputs: [{ internalType: "address", name: "_addr", type: "address" }],
  //     name: "isInWhiteList",
  //     outputs: [{ internalType: "bool", name: "", type: "bool" }],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  //   {
  //     inputs: [],
  //     name: "maxMintAmountPerTx",
  //     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  //   {
  //     inputs: [],
  //     name: "maxSupply",
  //     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  //   {
  //     inputs: [
  //       { internalType: "uint256", name: "_mintAmount", type: "uint256" },
  //     ],
  //     name: "mint",
  //     outputs: [],
  //     stateMutability: "payable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [
  //       { internalType: "uint256", name: "mintAmount", type: "uint256" },
  //       { internalType: "address", name: "receiver", type: "address" },
  //     ],
  //     name: "mintForAddress",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [],
  //     name: "name",
  //     outputs: [{ internalType: "string", name: "", type: "string" }],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  //   {
  //     inputs: [],
  //     name: "nftPerAddressLimit",
  //     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  //   {
  //     inputs: [],
  //     name: "nftPresalePerAddressLimit",
  //     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  //   {
  //     inputs: [],
  //     name: "onlyWhitelisted",
  //     outputs: [{ internalType: "bool", name: "", type: "bool" }],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  //   {
  //     inputs: [],
  //     name: "owner",
  //     outputs: [{ internalType: "address", name: "", type: "address" }],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  //   {
  //     inputs: [
  //       { internalType: "uint256", name: "_mintAmount", type: "uint256" },
  //     ],
  //     name: "ownerMint",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
  //     name: "ownerMintSpecific",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
  //     name: "ownerOf",
  //     outputs: [{ internalType: "address", name: "", type: "address" }],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  //   {
  //     inputs: [],
  //     name: "paused",
  //     outputs: [{ internalType: "bool", name: "", type: "bool" }],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  //   {
  //     inputs: [],
  //     name: "presale",
  //     outputs: [{ internalType: "bool", name: "", type: "bool" }],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  //   {
  //     inputs: [],
  //     name: "presaleCost",
  //     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  //   {
  //     inputs: [],
  //     name: "publicsaleCost",
  //     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  //   {
  //     inputs: [{ internalType: "address", name: "_addr", type: "address" }],
  //     name: "removeFromWhiteList",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [],
  //     name: "renounceOwnership",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [],
  //     name: "revealed",
  //     outputs: [{ internalType: "bool", name: "", type: "bool" }],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  //   {
  //     inputs: [
  //       { internalType: "address", name: "from", type: "address" },
  //       { internalType: "address", name: "to", type: "address" },
  //       { internalType: "uint256", name: "tokenId", type: "uint256" },
  //     ],
  //     name: "safeTransferFrom",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [
  //       { internalType: "address", name: "from", type: "address" },
  //       { internalType: "address", name: "to", type: "address" },
  //       { internalType: "uint256", name: "tokenId", type: "uint256" },
  //       { internalType: "bytes", name: "_data", type: "bytes" },
  //     ],
  //     name: "safeTransferFrom",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [
  //       { internalType: "address", name: "operator", type: "address" },
  //       { internalType: "bool", name: "approved", type: "bool" },
  //     ],
  //     name: "setApprovalForAll",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [
  //       { internalType: "string", name: "_hiddenMetadataUri", type: "string" },
  //     ],
  //     name: "setHiddenMetadataUri",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [{ internalType: "uint256", name: "_cost", type: "uint256" }],
  //     name: "setNFTPerAddressLimit",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [{ internalType: "uint256", name: "_cost", type: "uint256" }],
  //     name: "setNFTPresalePerAddressLimit",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [{ internalType: "bool", name: "_state", type: "bool" }],
  //     name: "setOnlyWhitelisted",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [{ internalType: "bool", name: "_state", type: "bool" }],
  //     name: "setPaused",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [{ internalType: "bool", name: "_state", type: "bool" }],
  //     name: "setPresale",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [{ internalType: "uint256", name: "_cost", type: "uint256" }],
  //     name: "setPresaleCost",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [{ internalType: "uint256", name: "_cost", type: "uint256" }],
  //     name: "setPublicsaleCost",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [{ internalType: "bool", name: "_state", type: "bool" }],
  //     name: "setRevealed",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [{ internalType: "string", name: "_uriPrefix", type: "string" }],
  //     name: "setUriPrefix",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [{ internalType: "string", name: "_uriSuffix", type: "string" }],
  //     name: "setUriSuffix",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
  //     name: "supportsInterface",
  //     outputs: [{ internalType: "bool", name: "", type: "bool" }],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  //   {
  //     inputs: [],
  //     name: "symbol",
  //     outputs: [{ internalType: "string", name: "", type: "string" }],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  //   {
  //     inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
  //     name: "tokenURI",
  //     outputs: [{ internalType: "string", name: "", type: "string" }],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  //   {
  //     inputs: [],
  //     name: "totalSupply",
  //     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  //   {
  //     inputs: [
  //       { internalType: "address", name: "from", type: "address" },
  //       { internalType: "address", name: "to", type: "address" },
  //       { internalType: "uint256", name: "tokenId", type: "uint256" },
  //     ],
  //     name: "transferFrom",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
  //     name: "transferOwnership",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [],
  //     name: "uriPrefix",
  //     outputs: [{ internalType: "string", name: "", type: "string" }],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  //   {
  //     inputs: [],
  //     name: "uriSuffix",
  //     outputs: [{ internalType: "string", name: "", type: "string" }],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  //   {
  //     inputs: [{ internalType: "address", name: "_owner", type: "address" }],
  //     name: "walletOfOwner",
  //     outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  //   {
  //     inputs: [{ internalType: "address", name: "", type: "address" }],
  //     name: "whitelistedAddressesList",
  //     outputs: [{ internalType: "bool", name: "", type: "bool" }],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  //   {
  //     inputs: [],
  //     name: "withdraw",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  // ];
  // Fetch 
  // useEffect(async () => {
  //   if (Web3.givenProvider) {
  //     if (walletConnected) {
  //       const web3 = new Web3(Web3.givenProvider);
  //       await Web3.givenProvider.enable();

  //       const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

  //       contract.methods
  //         .totalSupply()
  //         .call()
  //         .then((response) => {
  //           setTotalMinted(response);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }
  //   }
  // }, [walletConnected]);

  // useEffect(() => {
  //   axios.get(
  //       "https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=0x27caC31B750990Eea77EE1bAc612F60590A0195c&apikey=P65RXADWW83PQUNRMN4K7H2NTK8RZ1XPYS"
  //     )
  //     .then(function (response) {
  //       setTotalMinted(response.data.result);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

  // Mint
  // const mint = async () => {
  //   if (value > 0) {
  //     if (Web3.givenProvider) {
  //       connectWallet();

  //       const web3 = new Web3(Web3.givenProvider);
  //       await Web3.givenProvider.enable();

  //       const price = 0 * value;
  //       var tokens = web3.utils.toWei(price.toString(), "ether");
  //       var bntokens = web3.utils.toBN(tokens);

  //       const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

  //       const addresses = await web3.eth.getAccounts();
  //       const address = addresses[0];

  //       contract.methods
  //         .mint(value)
  //         .send({ gasLimit: "300000", from: address, value: bntokens })
  //         .then((nft) => {
  //           alert(
  //             "Congratulations you have successfully minted your Wlcked Shark! Check Opensea."
  //           );

  //           contract.methods
  //             .totalSupply()
  //             .call()
  //             .then((response) => {
  //               setTotalMinted(response);
  //             })
  //             .catch((err) => {
  //               console.log(err);
  //             });

  //           console.log(nft);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     } else {
  //       window.open("https://metamask.io/download/");
  //     }
  //   } else {
  //     alert("Please choose quantity");
  //   }
  // };

  return (
    <React.Fragment>
      <div className="mint">
        <div className="container">
          <div className="mint-wrapper d-flex align-items-center justify-content-center flex-column">
            <div className="connect-wallet-btn">
              <button>CONNECT WALLET</button>
            </div>
            <div className="mint-logo-image">
              <img src="image/logo/logo.svg" alt="" />
            </div>
            <div className="mint-content">
              <h4>
                <span>3425</span> / <span>5980</span>
              </h4>
            </div>
            <div className="mint-count-wrapper d-flex align-items-center justify-content-center">
              <div className="mint-count-item">
                <button onClick={()=>{
                  if(count>1){
                    setCount (count - 1)
                  }
                }} >-</button>
              </div>
              <span>{count}</span>
              <div className="mint-count-item">
                <button onClick={()=>{
                  if(count<10){
                    setCount(count + 1 )
                  }
                }}>+</button>
              </div>
            </div>
            <div className="mint-btn" onClick={connectWallet}>
          <button>
            {walletConnected ? "Mint Now":"COMING SOON"}
          </button>
        </div>
            <div className="mint-content-box">
              <div className="content-box-item d-flex align-items-center justify-content-between">
                <button className="mint-list-btn">Stitchlist</button>
                <p>free mint</p>
                <p>
                  <span>5:00pm</span>UTC
                </p>
              </div>
              <div className="content-box-item content-box-item-gray d-flex align-items-center justify-content-between">
                <button className="mint-list-btn">Public</button>
                <p>0.0075eth</p>
                <p>
                  <span>6:00pm</span>UTC
                </p>
              </div>
              <div className="content-box-item content-box-item-gray d-flex align-items-center justify-content-between">
                <button className="mint-list-btn">Whitelist</button>
                <p>0.0065eth</p>
                <p>
                  <span>7:30pm</span>UTC
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Mint;
