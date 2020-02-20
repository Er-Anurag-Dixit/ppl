import React from "react";
import { connect } from "react-redux";

import { updateLoginState } from "../redux/actions";
import SinglePostComponent from "../components/singlepost/singlepostcomponent";
import { ServerUrl, Routes } from "../config";
import serverCall, { DownloadImage } from "../utilsFolder/utils";

const { Likes_Post, ImageData } = Routes;
const zero = 0;

class SinglePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageId: this.props.match.params.id,
      image: "",
      username: "",
      comment: [],
      caption: "",
      PostData: []
      // hasError: false
    };
  }
  likePost = postID => {
    let likedData = {
      postId: postID,
      userId: localStorage.getItem("userId")
    };
    serverCall(Likes_Post, likedData).then(res => {
      if (res) {
        let PostDataOnLike = this.state.PostData;
        PostDataOnLike[zero].likes = res.data.dataFromDatabase[zero].likes;
        this.setState({ PostData: PostDataOnLike });
      }
    });
  };

  // allComments = () => {
  //   const imageId = this.state.imageId;
  //   const data = {
  //     imageId: imageId
  //   };
  //   serverCall(AllComments, data)
  //     .then(res => {
  //       if (res) {
  //         const allCommentData = res.data.dataFromDatabase.map(data => {
  //           return data;
  //         });
  //         this.setState({ comment: allCommentData });
  //       }
  //     })
  //     .catch(err => {
  //       if (err.message === "Network Error") {
  //         this.props.history.push("/errorpage");
  //       }
  //     });
  // };

  updatePostData = () => {
    let postData = this.state.PostData;
    postData[0].noOfComments = String(Number(postData[0].noOfComments) + 1);
    this.setState({ PostData: postData });
  };

  // uploadComment = event => {
  //   event.preventDefault();
  //   let userid = localStorage?.getItem("userId");
  //   const commentData = {
  //     imageId: this.state?.imageId,
  //     comment: event.target?.comment?.value,
  //     userId: userid
  //   };
  //   serverCall(Comments, commentData)
  //     .then(res => {
  //       if (res && res.data) {
  //         // let postData = this.state.PostData;
  //         // postData[0].noOfComments = String(
  //         //   Number(postData[0].noOfComments) + 1
  //         // );
  //         // this.setState({ PostData: postData });
  //         // let imageID = { id: this.state?.imageId };
  //         // serverCall(ImageData, imageID).then(res => {
  //         //   if (res) {
  //         //     this.setState({
  //         //       PostData: [res?.data?.dataBase[0]],
  //         //       comment: [...comments]
  //         //     });
  //         //   }
  //         // });
  //       }
  //     })
  //     .catch(err => {
  //       if (err.message === "Network Error") {
  //         this.props.history.push("/errorpage");
  //       }
  //     });
  //   event.target.comment.value = null;
  // };
  getImageData = () => {
    let imageID = { id: this.state.imageId };
    serverCall(ImageData, imageID)
      .then(res => {
        if (res) {
          this.setState({ PostData: [res.data.dataBase[0]] });
        }
      })
      .catch(err => {
        if (err.message === "Network Error") {
          this.props.history.push("/errorpage");
        }
      });
  };

  notLogin = () => {
    if (!localStorage.getItem("userId")) {
      this.props.history.push("/login");
    }
  };

  componentDidMount() {
    this.notLogin();
    this.getImageData();
    window.scrollTo(0, 0);
    this.props.updateLoginState(localStorage.getItem("userId"));
  }
  render() {
    return (
      <div>
        <SinglePostComponent
          history={this.props.history}
          PostData={this.state.PostData}
          likePost={this.likePost}
          comment={this.state.comment}
          uploadComment={this.uploadComment}
          Download={DownloadImage}
          imageId={this.state.imageId}
          updatePostData={this.updatePostData}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { category: state.CategoryReducer.category };
}

const mapDispatchToProps = dispatch => {
  return {
    updateLoginState: data => dispatch(updateLoginState(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
