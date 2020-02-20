import React from "react";
import { Link } from "react-router-dom";

export default function Rightheader(props) {
  const { loginState, logout } = props;
  return (
    <div>
      {loginState ? (
        <div className="header_rgt">
          <div className="flag_div">
            <img src="/images/flag.png" alt=" " />
          </div>
          <input type="text" placeholder="Search" className="txt_box" />
          <div className="msg_box">
            <a href="#">
              <span className="msg_count">100</span>
            </a>
          </div>

          <div className="pro_info pull-right">
            <div className="pro_icn">
              <img src="/images/pic_small.png" />
            </div>
            <div className="pro_txt">
              <b className="caret"></b>
            </div>
            <ul className="dropdown-menu" role="menu" aria-labelledby="dLabel">
              <li>
                <a tabIndex="-1" href="#">
                  My Profile
                </a>
              </li>
              <li>
                <a tabIndex="-1" href="#">
                  Message Box
                </a>
              </li>
              <li onClick={logout}>
                <Link to="/Login">Logout</Link>
              </li>
              <li className="divider"></li>
              <li>
                <a tabIndex="-1" href="#">
                  <input type="text" placeholder="search" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
