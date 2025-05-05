import React from "react";
import "./Model.css";
const Model = () => {
  return (
    <div className="Roboat">
      {/* <img src={Roboat} className="Roboat" alt="Roboat" />   */}
        <div className="content">
          <h1>Model X</h1>
          <p>
            Order Online for <u>Touchless Delivery</u>
          </p>
        </div>
        <div className="links">
          <a className="custom" href="CUSTOM_ORDER.html">
            CUSTOM ORDER
          </a>
          <a className="existing" href="EXISTING_DELIVERY.html">
            EXISTING DELIVERY
          </a>
        </div>
    </div>
  );
};
export default Model;
