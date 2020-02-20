import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import LeftHeader from "./leftHeader";
import RightHeader from "./rightHeader";
import { resetLoginState } from "../../redux/actions";

const Header = props => {
  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    this.props.resetLoginState();
  };
  const { loginState } = props;
  return (
    <div>
      <div className="header">
        <LeftHeader loginState={loginState} />
        <RightHeader loginState={loginState} logout={logout} />
      </div>
    </div>
  );
};

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
