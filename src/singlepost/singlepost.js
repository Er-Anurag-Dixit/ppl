import React from "react";

import SinglePostComponent from "./singlepostcomponent";
import fetchData from "../shared/sharedFunctions";
import { Routes } from "../shared/config";

const { Likes, AllComments, Comments, ImageData } = Routes;
const zero = 0;

class SinglePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageId: this.props.match.params.id,
      image: "",
      username: "",
      noOfLikes: "",
      comment: [],
      caption: "",
      PostData: [],
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

  allComments = () => {
    const imageId = this.state.imageId;
    const data = {
      imageId: imageId
    };
    fetchData(AllComments, data)
      .then(res => {
        if (res) {
          const allCommentData = res.data.dataFromDatabase.map(data => {
            return data;
          });
          this.setState({ comment: allCommentData });
        }
      })
      .catch(err => {
        if (err.message === "Network Error") {
          this.props.history.push("/errorpage");
        }
      });
  };

  uploadComment = event => {
    event.preventDefault();
    let userid = localStorage.getItem("userId");
    const commentData = {
      imageId: this.state.imageId,
      comment: event.target.comment.value,
      userId: userid
    };
    fetchData(Comments, commentData)
      .then(res => {
        if (res) {
          let comments = res.data.dataFromDatabase.map(data => {
            return data;
          });
          let imageID = { id: this.state.imageId };
          fetchData(ImageData, imageID).then(res => {
            if (res) {
              this.setState({
                PostData: [res.data?.dataBase[0]],
                comment: [...comments]
              });
            }
          });
        }
      })
      .catch(err => {
        if (err.message === "Network Error") {
          this.props.history.push("/errorpage");
        }
      });
    event.target.comment.value = null;
  };
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
    this.allComments();
  };

  notLogin = () => {
    if (!localStorage.getItem("userId")) {
      this.props.history.push("/login");
    }
  };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidMount() {
    this.notLogin();
    this.getImageData();
    window.scrollTo(0, 0);
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
        />
      </div>
    );
  }
}
export default SinglePost;
