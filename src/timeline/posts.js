import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import PostActivityComponent from "../shared/postActivityComponent";
import { ServerUrl } from "../shared/config";

export default function Post(props) {
  const { caption, category, username, date, _id, image } = props.data;
  const { likePost, data } = props;
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
                {date ? moment(date).format("MMMM Do YYYY") : Date.now()}
              </span>
              <span className="span_time">
                {date ? moment(date).format("hh:mm:ss a") : Date.now()}
              </span>
            </div>
          </div>
          <div className="div_image">
            <Link to={"/singlepost/" + _id}>
              <img src={ServerUrl + "/" + image} alt="pet" />
            </Link>
          </div>
          <PostActivityComponent onlikePost={likePost} Postdata={data} />
        </div>
      </div>
    </div>
  );
}
Post.propTypes = {
  caption: PropTypes.string,
  category: PropTypes.string,
  username: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  _id: PropTypes.string,
  image: PropTypes.string
};
