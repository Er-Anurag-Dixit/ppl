import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { updateLoginState } from "../redux/actions";
import SinglePostComponent from "../components/singlepost/singlepostcomponent";
import { ServerUrl, Routes } from "../config";
import serverCall, { DownloadImage } from "../utilsFolder/utils";

const { Likes_Post, ImageData } = Routes;
const zero = 0;

const SinglePost = props => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     imageId: this.props.match.params.id,
  //     image: "",
  //     username: "",
  //     comment: [],
  //     caption: "",
  //     PostData: []
  //     // hasError: false
  //   };
  // }

  const [imageId, setImageId] = useState(props.match.params.id);
  const [PostData, setPostData] = useState([]);

  const likePost = postID => {
    let likedData = {
      postId: postID,
      userId: localStorage.getItem("userId")
    };
    serverCall(Likes_Post, likedData).then(res => {
      if (res) {
        let PostDataOnLike = PostData;
        PostDataOnLike[zero].likes = res?.data?.dataFromDatabase[zero]?.likes;
        setPostData([...PostDataOnLike]);
      }
    });
  };

  const updatePostData = () => {
    let postData = PostData;
    postData[0].noOfComments = String(Number(postData[0].noOfComments) + 1);
    setPostData([...postData]);
  };

  useEffect(() => {
    notLogin();
    getImageData();
    window.scrollTo(0, 0);
    props.updateLoginState(localStorage.getItem("userId"));
  }, []);

  useEffect(() => {}, [PostData, likePost]);

  const getImageData = () => {
    let imageID = { id: imageId };
    serverCall(ImageData, imageID)
      .then(res => {
        if (res) {
          setPostData([res.data.dataBase[0]]);
        }
      })
      .catch(err => {
        if (err.message === "Network Error") {
          props.history.push("/errorpage");
        }
      });
  };

  const notLogin = () => {
    if (!localStorage.getItem("userId")) {
      props.history.push("/login");
    }
  };

  return (
    <div>
      <SinglePostComponent
        history={props.history}
        PostData={PostData}
        likePost={likePost}
        // comment={comment}
        // uploadComment={uploadComment}
        Download={DownloadImage}
        imageId={imageId}
        updatePostData={updatePostData}
      />
    </div>
  );
};

function mapStateToProps(state) {
  return { category: state.CategoryReducer.category };
}

const mapDispatchToProps = dispatch => {
  return {
    updateLoginState: data => dispatch(updateLoginState(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
