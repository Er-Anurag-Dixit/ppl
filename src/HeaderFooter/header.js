import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import LeftHeader from "./leftHeader";
import RightHeader from "./rightHeader";
import { resetLoginState } from "../redux/actions";
class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  logout = () => {
    localStorage.removeItem("userId");
    this.props.resetLoginState();
  };
  render() {
    const { loginState } = this.props;
    return (
      <div>
        <div className="header">
          <LeftHeader />
          <RightHeader loginState={loginState} logout={this.logout} />
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  loginState: PropTypes.string
};

function mapStateToProps(state) {
  return { loginState: state.loginStateReducer.loginState };
}

const mapDispatchToProps = dispatch => {
  return {
    resetLoginState: () => dispatch(resetLoginState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
