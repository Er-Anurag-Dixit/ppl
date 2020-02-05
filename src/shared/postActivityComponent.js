import React from "react";
import { Link } from "react-router-dom";
import PostBottomButton from "./postBottomButton";
import PropTypes from "prop-types";

export default function PostActivityComponent(props) {
  const { noOfComments, _id, likes } = props?.Postdata;
  const { onlikePost } = props;

  return (
    <div className="div_btm">
      <div className="btm_list">
        <ul>
          <li>
            <a href="#">
              <PostBottomButton
                value={" "}
                name={"Share"}
                image="/images/icon_001.png"
              />
            </a>
          </li>
          <li>
            <a href="#">
              <PostBottomButton
                value={" "}
                name={"flag"}
                image="/images/icon_002.png"
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
}
PostActivityComponent.propType = {
  noOfComments: PropTypes.number,
  _id: PropTypes.string,
  likes: PropTypes.array,
  onlikePost: PropTypes.func
};
