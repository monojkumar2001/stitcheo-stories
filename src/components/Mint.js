import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Web3 from "web3";
import Web3Modal from "web3modal";

import { MerkleTree } from "merkletreejs";

import keccak256 from "keccak256";
import {Buffer} from 'buffer';

import {
  PAGE_URI,
  NETWORK_NAME,
  NETWORK_PRIMARY_CHAIN_ID,
  NETWORK_SECONDARY_CHAIN_ID,
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
  ETHERSCAN_API_KEY,
  WHITELIST,
} from "./Config";

const Mint = () => {
  const [count, setCount] = useState(1);
  const [Path, setPath] = useState(useLocation().pathname);
  const [totalMinted, setTotalMinted] = useState(0);

  const [walletConnected, setWalletConnected] = useState(false);

  // state
  const [paused, setPaused] = useState(true);
  const [freesale, setFreeSale] = useState(null);
  const [publicsale, setPublicsale] = useState(null);

  // cost

  const [presaleCost, setPresaleCost] = useState(0);
  const [publicsaleCost, setPublicsaleCost] = useState(0);

  // Mint Address Limit  & TX limit
  const [nftFreeSalePerAddressLimit, setNftFreeSalePerAddressLimit] =
    useState(0);
  const [nftPerAddressLimit, setNftPerAddressLimit] = useState(0);
  const [nftPresalePerAddressLimit, setNftPresalePerAddressLimit] = useState(0);


  // const connectWallet = async () => {
  //   if (window.ethereum) {
  //     const providerOptions = { rpcUrl: "https://rpc-mumbai.matic.today" };
  
  //     const web3Modal = new Web3Modal({
  //       network: "mumbai",
  //       cacheProvider: true,
  //       providerOptions,
  //     });
  
  //     const provider = await web3Modal.connect();
  //     const web3 = new Web3(provider);
  
  //     web3.eth.net.getId()
  //       .then((networkId) => {
  //         if (
  //           networkId === NETWORK_PRIMARY_CHAIN_ID ||
  //           networkId === NETWORK_SECONDARY_CHAIN_ID
  //         ) {
  //           setWalletConnected(true);
  
  //           const { ethereum } = window;
  //           ethereum.on("chainChanged", () => {
  //             window.location.reload();
  //           });
  //         } else {
  //           alert(`Please change network to ${NETWORK_NAME}`);
  //         }
  //       })
  //       .catch((error) => {
  //         // Handle error (e.g., user rejected the request)
  //         console.error(error);
  //       });
  //   } else {
  //     window.open(
  //       `https://metamask.app.link/dapp/${PAGE_URI}/${Path}`,
  //       "_blank"
  //     );
  //   }
  // };
  
  // useEffect(() => {
  //   connectWallet();
  // }, []);


  const handleUserRejectedError = (error) => {
    if (error.message === "User Rejected") {
      // Handle the "User Rejected" error
      // Display an error message or take appropriate actions
      console.error("User rejected the request.");
    } else {
      // Handle other errors
      console.error(error);
    }
  };
  
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const providerOptions = { rpcUrl: "https://rpc-mumbai.matic.today" };
  
        const web3Modal = new Web3Modal({
          network: "mumbai",
          cacheProvider: true,
          providerOptions,
        });
  
        const provider = await web3Modal.connect();
        const web3 = new Web3(provider);
        
        
  
        web3.eth.net.getId()
          .then((networkId) => {
            const conver = networkId.toString().replace("n","");
           
            if (
              conver === NETWORK_PRIMARY_CHAIN_ID ||
              conver === NETWORK_SECONDARY_CHAIN_ID
            ) {
              setWalletConnected(true);
  
              const { ethereum } = window;
              ethereum.on("chainChanged", () => {
                window.location.reload();
              });
            } else {
              alert(`Please change network to ${NETWORK_NAME}`);
            }
          })
          .catch((error) => {
            handleUserRejectedError(error);
          });
      } else {
        window.open(
          `https://metamask.app.link/dapp/${PAGE_URI}/${Path}`,
          "_blank"
        );
      }
    } catch (error) {
      handleUserRejectedError(error);
    }
  };
  
  useEffect(() => {
    connectWallet();
  }, []);
  
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (window.ethereum) {
          const providerOptions = { rpcUrl: "https://rpc-mumbai.matic.today" };

          const web3Modal = new Web3Modal({
            network: "mumbai",
            cacheProvider: true,
            providerOptions,
          });

          const provider = await web3Modal.connect();
          const web3 = new Web3(provider);

          const contract = new web3.eth.Contract(
            CONTRACT_ABI,
            CONTRACT_ADDRESS
          );

          const response = await contract.methods.totalSupply().call();
          const convert = response.toString().replace("n", "");
          setTotalMinted(convert);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [walletConnected]);

  useEffect(() => {
    const fetchNFtData = async () => {
      try {
        if (window.ethereum) {
          const providerOptions = { rpcUrl: "https://rpc-mumbai.matic.today" };

          const web3Modal = new Web3Modal({
            network: "mumbai",
            cacheProvider: true,
            providerOptions,
          });

          const provider = await web3Modal.connect();
          const web3 = new Web3(provider);

          const contract = new web3.eth.Contract(
            CONTRACT_ABI,
            CONTRACT_ADDRESS
          );

          // Paused
          contract.methods
            .paused()
            .call()
            .then((res) => {
              setPaused(res);

              // Presale
              contract.methods
                .freesale()
                .call()
                .then((res) => {
                  setFreeSale(res);

                  // Presale Cost
                  contract.methods
                    .publicsale()
                    .call()
                    .then((res) => {
                      setPublicsale(res);

                      // Publicsale Cost
                      contract.methods
                        .publicsaleCost()
                        .call()
                        .then((res) => {
                          setPublicsaleCost(res);

                          contract.methods
                            .presaleCost()
                            .call()
                            .then((res) => {
                              setPresaleCost(res);

                              contract.methods
                                .nftFreeSalePerAddressLimit()
                                .call()
                                .then((res) => {
                                  setNftFreeSalePerAddressLimit(parseInt(res));

                                  contract.methods
                                    .nftPerAddressLimit()
                                    .call()
                                    .then((res) => {
                                      setNftPerAddressLimit(parseInt(res));

                                      contract.methods
                                        .nftPresalePerAddressLimit()
                                        .call()
                                        .then((res) => {
                                          setNftPresalePerAddressLimit(
                                            parseInt(res)
                                          );
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchNFtData();
  }, []);

  const FreeSaleMint = async () => {
    try {
      connectWallet();

      const providerOptions = { rpcUrl: "https://rpc-mumbai.matic.today" };

      const web3Modal = new Web3Modal({
        network: "mumbai",
        cacheProvider: true,
        providerOptions,
      });

      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      const price = 0 * count;
      console.log(price);
      var tokens = web3.utils.toWei(price.toString(), "ether");

      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

      const addresses = await web3.eth.getAccounts();
      const address = addresses[0];

      const response = await contract.methods
        .freesaleMint(count)
        .send({ gasLimit: "300000", from: address, value: tokens });
      if (response) {
        alert(
          "Congratulations! You have successfully minted your Stitched Stories. Check Opensea."
        );
      }
    } catch (e) {
      console.log(`free sale error + ${e}`);
    }
  };
  const PublicSaleMint = async () => {
    try {
      connectWallet();
  
      const providerOptions = { rpcUrl: "https://rpc-mumbai.matic.today" };
  
      const web3Modal = new Web3Modal({
        network: "mumbai",
        cacheProvider: true,
        providerOptions,
      });

      
      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);

      const convert = publicsaleCost.toString().replace("n","")
      const devide = convert / 1000000000000000000
      const price = (devide * count);
      console.log(price)
      var tokens = web3.utils.toWei(price, "ether");
      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      const addresses = await web3.eth.getAccounts();
      const address = addresses[0];
  
      const response = await contract.methods.publicsaleMint(count).send({ gasLimit: "300000", from: address, value: tokens });
  
      // Check if the transaction receipt status is "0" (reverted)
      if (response.status && response.status === "0") {
        throw new Error("Transaction has been reverted by the EVM");
      }
  
      alert(
        `Congratulations you have successfully minted your Stitched Stories Check Opensea.`
      );
    } catch (e) {
      console.log(e);
    }
  };

  const checkWhitelist = (address) => {
    const isWhitelisted = WHITELIST.includes(address);
    return isWhitelisted;
  };
  
  
  
  const PreSaleMint = async () => {
    try {
      connectWallet();
  
      const providerOptions = { rpcUrl: "https://rpc-mumbai.matic.today" };
  
      const web3Modal = new Web3Modal({
        network: "mumbai",
        cacheProvider: true,
        providerOptions,
      });
  
      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);
  
      const convert = presaleCost.toString().replace("n", "");
      const devide = convert / 1000000000000000000;
      const price = devide * count;
  
      var tokens = web3.utils.toWei(price.toString(), "ether");
  
      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  
      const addresses = await web3.eth.getAccounts();
      const address = addresses[0];
  
      window.Buffer = window.Buffer || Buffer;
  
      const leaves = WHITELIST.map((x) => keccak256(x));
      const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      const buf2hex = (x) => '0x' + Buffer.from(x).toString('hex');
  
      console.log(buf2hex(tree.getRoot()));
  
      const leaf = keccak256(address); // address from wallet using walletconnect/metamask
      const proof = tree.getProof(leaf).map((x) => buf2hex(x.data));
  
      // Check if the user's address is in the whitelist
      const isWhitelisted = checkWhitelist(address);
      if (isWhitelisted) {
        contract.methods
          .presaleMint(count, proof)
          .send({ gasLimit: "300000", from: address, value: tokens })
          .then((nft) => {
            alert(
              `Congratulations! You have successfully minted your Stitched Stories. Check Opensea.`
            );
          });
      } else {
        alert(`Sorry, you are not whitelisted for the presale.`);
      }
    } catch (e) {
      console.log(e);
    }
  };
  ;
  

  const handleClick = () => {
    if (walletConnected) {
      if (freesale === true) {
        FreeSaleMint();
      } else if (freesale === false && publicsale === true) {
        PublicSaleMint();
      } else if (freesale === false && publicsale === false) {
        PreSaleMint();
      }
    } else {
      connectWallet();
    }
  };

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
                <span>{totalMinted || "0"}</span> / <span>5980</span>
              </h4>
            </div>
            <div className="mint-count-wrapper d-flex align-items-center justify-content-center">
              <div className="mint-count-item">
                <button
                  onClick={() => {
                    if (count > 1) {
                      setCount(count - 1);
                    }
                  }}
                >
                  -
                </button>
              </div>
              <span className="numbers">{count}</span>
              <div className="mint-count-item">
                <button
                  onClick={() => {
                    if (freesale === true) {
                      if (count < nftFreeSalePerAddressLimit) {
                        setCount(count + 1);
                      }
                    } else if (freesale === false && publicsale === true) {
                      if (count < nftPerAddressLimit) {
                        setCount(count + 1);
                      }
                    } else if (freesale === false && publicsale === false) {
                      if (count < nftPresalePerAddressLimit) {
                        setCount(count + 1);
                      }
                    }
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div className="mint-btn">
              <button onClick={handleClick}>Mint</button>
            </div>
            <div className="mint-content-box">
              <div
                className={
                  freesale === true
                    ? " content-box-item d-flex align-items-center justify-content-between"
                    : "content-box-item content-box-item-gray d-flex align-items-center justify-content-between"
                }
              >
                <button className="mint-list-btn">Stitchlist</button>
                <p>free mint</p>
                <p>
                  <span>5:00pm</span> UTC
                </p>
              </div>
              <div
                className={
                  freesale === false && publicsale === true
                    ? " content-box-item d-flex align-items-center justify-content-between"
                    : "content-box-item content-box-item-gray d-flex align-items-center justify-content-between"
                }
              >
                <button className="mint-list-btn">Public</button>
                <p>0.0075eth</p>
                <p>
                  <span>6:00pm</span> UTC
                </p>
              </div>
              <div
                className={
                  freesale === false && publicsale === false
                    ? " content-box-item d-flex align-items-center justify-content-between"
                    : "content-box-item content-box-item-gray d-flex align-items-center justify-content-between"
                }
              >
                <button className="mint-list-btn">Whitelist</button>
                <p>0.0065eth</p>
                <p>
                  <span>8:00pm</span> UTC
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
