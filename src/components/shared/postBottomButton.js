import React from "react";
import PropTypes from "prop-types";

const PostBottomButton = props => {
  const { name, value, image } = props;
  const zero = "0";
  return (
    <div>
      <span className="btn_icon">
        <img src={image} alt="share" height="15px" width="20px" />
      </span>
      {value ? value : zero} {name}
    </div>
  );
};
PostBottomButton.propType = {
  name: PropTypes.string,
  value: PropTypes.number
};

export default PostBottomButton;
