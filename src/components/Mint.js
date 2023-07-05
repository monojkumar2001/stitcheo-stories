import React from "react";

const Mint = () => {
  return (
    <>
      <div className="mint">
        <div className="container">
          <div className="mint-wrapper">
            <div className="mint-logo-image">
              <img src="image/logo/logo.svg" alt="" />
            </div>
            <div className="mint-containt">
              <h4>
                <span>3425</span>/<span>5980</span>
              </h4>
            </div>
            <div className="mint-count-wrapper">
              <div className="mint-count-item">
                <button>-</button>
              </div>
              <span>1</span>
              <div className="mint-count-item">
                <button>+</button>
              </div>
            </div>
            <div className="mint-btn">
              <button>MINT</button>
            </div>
            <div className="mint-content-box">
              <div className="content-box-item">
                <button className="mint-list-btn">stitchlist</button>
                <p>free mint</p>
                <p>
                  <span>5:00pm</span>UTC
                </p>
              </div>
              <div className="content-box-item">
                <button className="mint-list-btn">public</button>
                <p>0.0075eth</p>
                <p>
                  <span>6:00pm</span>UTC
                </p>
              </div>
              <div className="content-box-item">
                <button className="mint-list-btn">whitelist</button>
                <p>0.0065eth</p>
                <p>
                  <span>7:30pm</span>UTC
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mint;
