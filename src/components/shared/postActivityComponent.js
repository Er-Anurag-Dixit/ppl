import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import PostBottomButton from "./postBottomButton";

const PostActivityComponent = props => {
  const { noOfComments, _id, likes, image } = props?.Postdata;
  const { onlikePost, downLoad } = props;
  return (
    <div className="div_btm">
      <div className="btm_list">
        <ul>
          <li>
            <a>
              <PostBottomButton
                value={" "}
                name={"Share"}
                image="/images/icon_001.png"
                id="flag"
              />
            </a>
          </li>
          <li>
            {" "}
            <a onClick={() => downLoad(image)}>
              <PostBottomButton
                value={" "}
                name={"Download"}
                image="/images/download.png"
              />
            </a>
          </li>

          <li
            onClick={() => {
              onlikePost(_id);
            }}
          >
            <a>
              <PostBottomButton
                value={likes.length}
                name={"Like"}
                image="/images/icon_003.png"
                id="like"
              />
            </a>
          </li>
          <li>
            <Link to={"/singlepost/" + _id}>
              <PostBottomButton
                value={noOfComments}
                name={"Comment"}
                image={"/images/icon_004.png"}
              />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

PostActivityComponent.propType = {
  noOfComments: PropTypes.number,
  _id: PropTypes.string,
  likes: PropTypes.array,
  onlikePost: PropTypes.func,
  downLoad: PropTypes.func
};

export default PostActivityComponent;
