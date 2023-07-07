import React, { useState } from "react";


const Mint = () => {
  const [count, setCount]=useState(1);

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
            <div className="mint-btn">
          <button>
          Mint Now
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
