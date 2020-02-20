import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import CategoryList from "../shared/categories";
import Post from "../timeline/posts";
import Featured from "../shared/featured";
import PostActivityComponent from "../shared/postActivityComponent";
import CommentsComponent from "./commentsComponent";

const SinglePostComponent = React.memo(props => {
  const {
    history,
    PostData,
    likePost,
    uploadComment,
    comment,
    Download,
    imageId,
    updatePostData
  } = props;
  return (
    <div>
      <Helmet>
        <title>Single Post</title>
      </Helmet>
      <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
      <link
        href="css/bootstrap-responsive.css"
        rel="stylesheet"
        type="text/css"
      />
      <div className="container">
        <div className="content">
          <div className="content_rgt">
            <CategoryList history={history} />
            <Featured />
          </div>
          <div className="content_lft">
            <ul>
              {PostData
                ? PostData.map((names, i) => (
                    <div key={i}>
                      <Post key={i} data={names} downLoad={Download} />
                    </div>
                  ))
                : null}
              {PostData.length ? (
                <PostActivityComponent
                  onlikePost={likePost}
                  Postdata={PostData[0]}
                  downLoad={Download}
                />
              ) : null}
            </ul>
            <div className="contnt_3">
              <CommentsComponent
                comments={comment}
                uploadComment={uploadComment}
                imageID={imageId}
                noOfComments={PostData.length ? PostData[0].noOfComments : null}
                updatePostData={updatePostData}
              />
              <div className="view_div">
                <a href="#">View more</a>
              </div>
            </div>
          </div>
        </div>
        <div className="clear" />
      </div>
    </div>
  );
});
SinglePostComponent.propTypes = {
  history: PropTypes.object,
  PostData: PropTypes.array,
  likePost: PropTypes.func,
  uploadComment: PropTypes.func,
  comment: PropTypes.array,
  downLoad: PropTypes.func
};

export default SinglePostComponent;
