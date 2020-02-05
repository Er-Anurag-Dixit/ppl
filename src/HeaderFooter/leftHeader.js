import React from "react";
import { Link } from "react-router-dom";

export default function Leftheader(props) {
  return (
    <div className="header_lft">
      <div className="logo">
        <Link to="/timeline">
          <img src="/images/logo.png" />
        </Link>
      </div>
      <div className="navigatn">
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
      </div>
    </div>
  );
}
