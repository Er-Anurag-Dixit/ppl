import React from "react";
import { connect } from "react-redux";

import { updateLoginState } from "../redux/actions";
import SinglePostComponent from "./singlepostcomponent";
import { ServerUrl, Routes } from "../config";
import fetchData from "../shared/sharedFunctions";

const { Likes, ImageData } = Routes;
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
      PostData: "",
      hasError: false
    };
  }
  likePost = postID => {
    let likedData = {
      postId: postID,
      userId: localStorage.getItem("userId")
    };
    fetchData(Likes, likedData)
      .then(res => {
        if (res) {
          let PostDataOnLike = this.state.PostData;
          PostDataOnLike[zero].likes = res.data.dataFromDatabase[zero].likes;
          this.setState({ PostData: PostDataOnLike });
        }
      })
      .catch(err => {
        if (err.message === "Network Error") {
          this.props.history.push("/errorpage");
        }
      });
  };

  // allComments = () => {
  //   const imageId = this.state.imageId;
  //   const data = {
  //     imageId: imageId
  //   };
  //   fetchData(AllComments, data)
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
  //   fetchData(Comments, commentData)
  //     .then(res => {
  //       if (res && res.data) {
  //         // let postData = this.state.PostData;
  //         // postData[0].noOfComments = String(
  //         //   Number(postData[0].noOfComments) + 1
  //         // );
  //         // this.setState({ PostData: postData });
  //         // let imageID = { id: this.state?.imageId };
  //         // fetchData(ImageData, imageID).then(res => {
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
    fetchData(ImageData, imageID)
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

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  DownloadImage = image => {
    fetch(ServerUrl + "/" + image).then(response => {
      response.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = image;
        a.click();
      });
    });
  };

  componentDidMount() {
    this.notLogin();
    this.getImageData();
    window.scrollTo(0, 0);
    this.props.updateLoginState(localStorage.getItem("userId"));
  }
  render() {
    const { hasError } = this.state;
    if (hasError) {
      return <div>Something went wrong</div>;
    }
    return (
      <div>
        <SinglePostComponent
          history={this.props.history}
          PostData={this.state.PostData}
          likePost={this.likePost}
          comment={this.state.comment}
          uploadComment={this.uploadComment}
          Download={this.DownloadImage}
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
