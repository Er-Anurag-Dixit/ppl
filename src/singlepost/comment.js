import React from "react";
import PropTypes from "prop-types";
export default function Comment(props) {
  const { user, comment } = props.comments;

  return (
    <div>
      <li>
        <div className="list_image">
          <div className="image_sec">
            <img src="/images/post_img.png" />
          </div>
          <div className="image_name">{user}</div>
        </div>
        <div className="list_info">{comment}</div>
      </li>
    </div>
  );
}
Comment.propTypes = {
  user: PropTypes.string,
  comment: PropTypes.string
};
