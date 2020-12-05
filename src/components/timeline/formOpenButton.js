import React from "react";
import PropTypes from "prop-types";

import Button from "./button";

const FormOpenButton = React.memo(props => {
  const { togglePopup, categoryUploadForm } = props;

  return (
    <div>
      <Button onButtonClick={togglePopup} name={"Upload Post"} />
      <Button onButtonClick={categoryUploadForm} name={"UploadCategory"} />
    </div>
  );
});
FormOpenButton.propTypes = {
  logout: PropTypes.func,
  togglePopup: PropTypes.func,
  categoryUploadForm: PropTypes.func
};
export default FormOpenButton;
