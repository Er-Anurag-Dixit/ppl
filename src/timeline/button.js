import React from "react";
import PropTypes from "prop-types";

export default function Button(props) {
  const { onButtonClick, name } = props;
  return (
    <div
      className="rght_btn"
      onClick={onButtonClick}
      style={{ borderRadius: "50em" }}
    >
      {" "}
      <span className="rght_btn_icon">
        <img src="/images/btn_icona.png" alt="up" />
      </span>{" "}
      <span className="btn_sep">
        <img src="/images/btn_sep.png" alt="sep" />
      </span>{" "}
      <a href="#">{name}</a>{" "}
    </div>
  );
}
Button.propTypes = {
  name: PropTypes.string,
  onButtonClick: PropTypes.func
};
