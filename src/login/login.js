import React from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";

import WelcomeComponent from "../shared/welcomeComponent";
import { Routes } from "../config";
import fetchData from "../shared/sharedFunctions";
const { Login } = Routes;
const isLogin = () => localStorage.getItem("userId");

const onLoginSubmit = function(event) {
  event.preventDefault();
  let loginData = {
    email: event.target.email.value,
    password: event.target.password.value
  };

  this.login(loginData);
  // let refOfEmail = event.target.email;
  // let refOfPassword = event.target.password;
};

export default class LoginComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      wrongEmail: "",
      wrongPassword: "",
      status: "",
      hasError: false
    };
    this.onLoginSubmit = onLoginSubmit.bind(this);
  }
  login = loginData => {
    fetchData(Login, loginData)
      .then(res => {
        if (res?.data?.status === "logged in successfully") {
          let id = res?.data?.dataFromDatabase[0]?._id;
          let username = res?.data?.dataFromDatabase[0]?.username;
          localStorage.setItem("userId", id);
          localStorage.setItem("username", username);
          this.props.history.push("/timeline");
        } else if (res?.data === "wrong password") {
          this.setState({
            wrongEmail: "",
            wrongPassword: "Wrong Password",
            status: "Please try again"
          });
        } else {
          this.setState({
            status: "Please try again",
            wrongPassword: "",
            wrongEmail: "Email-Id does not exist"
          });
        }
      })
      .catch(err => {
        if (err.message === "Network Error") {
          this.props.history.push("/errorpage");
        }
      });
  };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidMount() {
    const isUserLogin = isLogin();
    if (isUserLogin) {
      this.props.history.push("/timeline");
    }
  }
  render() {
    const { status, wrongEmail, wrongPassword, hasError } = this.state;
    if (hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return (
      <div>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="login_sec">
                <h1>Log In</h1>
                <form onSubmit={event => this.onLoginSubmit(event)}>
                  <ul>
                    <li>{status}</li>
                    <li>
                      <span>Email-ID</span>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        required
                      />
                    </li>
                    <li>{wrongEmail}</li>
                    <li>
                      <span>Password</span>
                      <input
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        required
                      />
                    </li>
                    <li>{wrongPassword}</li>
                    <li>
                      <input type="checkbox" />
                      Remember Me
                    </li>
                    <li>
                      <input type="submit" defaultValue="Log In" />
                      <a>Forgot Password</a>
                    </li>
                  </ul>
                </form>
                <div className="addtnal_acnt">
                  I do not have any account yet.
                  <Link to="/signup">Create My Account Now !</Link>
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
