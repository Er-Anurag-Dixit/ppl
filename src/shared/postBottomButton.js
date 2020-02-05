import React from "react";
import PropTypes from "prop-types";

export default function PostBottomButton(props) {
  const { name, value, image } = props;
  return (
    <div>
      <span className="btn_icon">
        <img src={image} alt="share" />
      </span>
      {value ? value : "0"}
      {name}
    </div>
  );
}
PostBottomButton.propType = {
  name: PropTypes.string,
  value: PropTypes.number
};
