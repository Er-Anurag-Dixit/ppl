import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { ServerUrl } from "../../config";

const Post = React.memo(props => {
  const { caption, category, username, date, _id, image } = props.data;
  return (
    <div>
      <div className="contnt_2">
        <div className="div_a">
          <div className="div_title">{caption}</div>
          <div className="btm_rgt">
            <div className="btm_arc">{category}</div>
          </div>
          <div className="div_top">
            <div className="div_top_lft">
              <img src="/images/img_6.png" />
              {username}
            </div>
            <div className="div_top_rgt">
              <span className="span_date">
                {date ? moment(date).format("MMMM DD YYYY") : Date.now()}
              </span>
              <span className="span_time">
                {date ? moment(date).format("hh:mm:ss A") : Date.now()}
              </span>
            </div>
          </div>
          <div className="div_image">
            <Link to={"/singlepost/" + _id}>
              <img src={ServerUrl + "/" + image} alt="pet" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Post;

Post.propTypes = {
  caption: PropTypes.string,
  category: PropTypes.string,
  username: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  _id: PropTypes.string,
  image: PropTypes.string
};
