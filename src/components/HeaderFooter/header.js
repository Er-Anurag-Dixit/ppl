import React, { useCallback } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import LeftHeader from "./leftHeader";
import RightHeader from "./rightHeader";
import { resetLoginState } from "../../redux/actions";

const Header = (props) => {
  const { loginState,callResetLoginState } = props;

  const logout = useCallback(() => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    callResetLoginState();
  },[]);

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
    callResetLoginState: () => dispatch(resetLoginState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
