import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import LeftHeader from "./leftHeader";
import RightHeader from "./rightHeader";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  logout = () => {
    localStorage.removeItem("userId");
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
export default connect(mapStateToProps, null)(Header);
