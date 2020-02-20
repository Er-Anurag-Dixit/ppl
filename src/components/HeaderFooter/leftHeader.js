import React from "react";
import { Link } from "react-router-dom";

export default function Leftheader(props) {
  return (
    <div className="header_lft">
      <div className="logo">
        <img src="/images/logo.png" />
      </div>
      <div className="navigatn">
        {props?.loginState ? (
          <ul>
            <li>
              <Link to="/timeline">Home</Link>
            </li>
            <li>
              <a>E-Coupons</a>
            </li>
            <li>
              <a>E-Brands</a>
            </li>
            <li>
              <a>Resuse Market</a>
            </li>
            <li>
              <a>Lost and Found</a>
            </li>
          </ul>
        ) : null}
      </div>
    </div>
  );
}
