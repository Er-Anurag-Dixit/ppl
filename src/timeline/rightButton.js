import React from "react";
import PropTypes from "prop-types";

import Button from "./button";

export default function RightButton(props) {
  const { togglePopup, categoryUploadForm } = props;

  return (
    <div>
      <Button onButtonClick={togglePopup} name={"Upload Post"} />
      <Button onButtonClick={categoryUploadForm} name={"UploadCategory"} />
    </div>
  );
}
RightButton.propTypes = {
  logout: PropTypes.func,
  togglePopup: PropTypes.func,
  categoryUploadForm: PropTypes.func
};
