import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";

import Server from "../shared/config";
import WelcomeComponent from "../shared/welcomeComponent";

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      heading: "Create an account",
      status: "",
      hasError: true
    };
    this.submitFunction = this.submitFunction.bind(this);
  }

  submitFunction(event) {
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
          this.setState({ status: "Email already Exist" });
          {
            document.getElementById("input").focus();
          }
          eventTarget.email.value = null;
          // console.log("Data is coming",res.data);
          // this.setState({status: res.data})
        } else {
          this.setState({ heading: "SignUp Successfull" });
          this.props.history.push("/login");
        }
      })
      .catch(err => {
        if (err.message === "Network Error") {
          this.props.history.push("/errorpage");
        }
      });
  }
  isLogin = () => {
    if (localStorage.getItem("userId")) {
      this.props.history.push("/timeline");
    }
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidMount() {
    this.isLogin();
  }

  render() {
    const { hasError, heading, status } = this.state;
    if (hasError) {
      return <div>Something Went Wrong</div>;
    }
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
                <form onSubmit={this.submitFunction}>
                  <ul>
                    <li>
                      <span>Username</span>
                      <input
                        type="text"
                        placeholder="Enter your username"
                        name="username"
                        required
                      />
                    </li>
                    <li>
                      <span>Password</span>
                      <input
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        required
                      />
                    </li>
                    <li>
                      <span>Email</span>
                      <input
                        id="input"
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        required
                      />
                    </li>
                    <li>{status}</li>
                    <li>
                      <span>First Name</span>
                      <input
                        type="text"
                        placeholder="Enter your first name"
                        name="fname"
                        required
                      />
                    </li>
                    <li>
                      <span>Last Name</span>
                      <input
                        type="text"
                        placeholder="Enter your last name"
                        name="lname"
                        required
                      />
                    </li>
                    <li>
                      <input type="checkbox" required />I agree to Term &amp;
                      Conditions
                    </li>
                    <li>
                      <input type="submit" />
                    </li>
                  </ul>
                </form>
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
  }
}
export default Signup;
