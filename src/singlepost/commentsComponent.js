import React, { useState, useEffect } from "react";

import Comment from "./comment";
import fetchData from "../shared/sharedFunctions";
import { Routes } from "../config";

const { AllComments, Comments } = Routes;
const CommentsComponent = React.memo(props => {
  const { imageID, noOfComments, updatePostData } = props;

  const [comment, setComment] = useState(props.comments);

  useEffect(() => {
    allComments();
  }, [setComment, noOfComments]);

  const allComments = () => {
    const data = {
      imageId: imageID
    };
    fetchData(AllComments, data).then(res => {
      if (res && res.data) {
        const allCommentData = res.data.dataFromDatabase?.map(data => {
          return data;
        });
        setComment(allCommentData);
      }
    });
  };

  const uploadComment = event => {
    event.preventDefault();
    let userid = localStorage?.getItem("userId");
    const commentData = {
      imageId: imageID,
      comment: event.target?.comment?.value,
      userId: userid
    };
    fetchData(Comments, commentData)
      .then(res => {
        if (res && res.data) {
          updatePostData();
        }
      })
      .catch(err => {
        if (err.message === "Network Error") {
          this.props.history.push("/errorpage");
        }
      });
    event.target.comment.value = null;
  };

  return (
    <ul>
      {comment
        ? comment.map((names, i) => <Comment key={i} comments={names} />)
        : null}
      <li>
        <div className="cmnt_div1">
          <form onSubmit={uploadComment}>
            <input
              type="text"
              placeholder="Enter your Comment"
              className="cmnt_bx1"
              name="comment"
              required
            />
            <input
              type="submit"
              className="sub_bttn1"
              defaultValue="Submit Comment"
            />
          </form>
        </div>
      </li>
    </ul>
  );
});
export default CommentsComponent;
