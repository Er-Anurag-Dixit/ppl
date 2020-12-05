import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";

import Server from "../../config";
import SignupForm from "./signupForm";
import WelcomeComponent from "../shared/welcomeComponent";

const Signup = props => {
  const [heading, setHeading] = useState("Create an account");
  const [status, setStatus] = useState(null);

  useEffect(() => {
    isLogin();
  }, []);

  const submitFunction = event => {
    event.preventDefault();
    let signupData = {
      username: event.target.username.value,
      password: event.target.password.value,
      email: event.target.email.value,
      fname: event.target.fname.value,
      lname: event.target.lname.value
    };
    var eventTarget = event.target;
    axios
      .post(Server.ServerUrl + Server.Routes.Signup, signupData)
      .then(res => {
        if (res && res.data === "Email already exist") {
          setStatus("Email already Exist");
          {
            document.getElementById("input").focus();
          }
          eventTarget.email.value = null;
        } else {
          setHeading("SignUp Successfull");
          props.history.push("/login");
        }
      });
  };
  const isLogin = () => {
    if (localStorage.getItem("userId")) {
      props.history.push("/timeline");
    }
  };

  return (
    <div>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <div className="container">
        <div className="content">
          <div className="content_rgt">
            <div className="register_sec">
              <h1>{heading}</h1>
              <SignupForm submitFunction={submitFunction} status={status} />
              <div className="addtnal_acnt">
                I already have an account.
                <Link to="/login">Login My Account !</Link>
              </div>
            </div>
          </div>
          <WelcomeComponent />
        </div>
      </div>
    </div>
  );
};
export default Signup;
