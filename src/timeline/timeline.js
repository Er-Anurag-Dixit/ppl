import React from "react";
import { connect } from "react-redux";
// import socketIOClient from "socket.io-client";

import {
  updateLoginState,
  updateCategories,
  resetLoginState
} from "../redux/actions";
import fetchData from "../shared/sharedFunctions";
import { Routes, ServerUrl } from "../config";
import TimelineBodyComponent from "./timelineBodyComponent";

const {
  Likes_Post,
  // Category,
  Upload,
  AllPosts,
  UserData,
  TotalNumberOfPosts
} = Routes;

const zero = 0;
// let clicked = false;
let username = "";
let emailId = "";
let myUploads = false;
// let endpoint = ServerUrl;
let hasError = false;

// const categoryUploadForm = function() {
//   if (!clicked) {
//     clicked = true;
//     const form =
//       "category<input type='text' name='category' required/><br /><br /><input type='submit'/> &emsp;";
//     document.getElementById("category").innerHTML = form;
//   } else {
//     document.getElementById("category").innerHTML = "";
//     clicked = false;
//   }
// };

const userDetails = function() {
  let UserID = { id: localStorage.getItem("userId") };
  fetchData(UserData, UserID).then(res => {
    if (res && res.data) username = res.data[zero]?.username;
    emailId = res.data[zero]?.email;
  });
};

const DownloadImage = function(image) {
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

const totalNumberPosts = function() {
  const data = { email: myUploads ? emailId : null };
  fetchData(TotalNumberOfPosts, data).then(res => {
    if (res) {
      this.totalPosts = res.data?.counts;
    }
    new Promise(resolve => {
      resolve = true;
    });
  });
};

const likePost = function(postID) {
  let likedData = {
    postId: postID,
    userId: localStorage.getItem("userId")
  };
  fetchData(Likes_Post, likedData)
    .then(res => {
      if (res?.data) {
        let likeData = res?.data?.dataFromDatabase[0];
        for (let i = zero; i < this.state.postdata.length; i++) {
          if (this.state.postdata[i]._id === likeData._id) {
            let newpostData = this.state.postdata;
            newpostData[i].likes = likeData.likes;
            this.setState({ postdata: newpostData });
          }
        }
      }
    })
    .catch(err => {
      if (err.message === "Network Error") {
        this.props.history.push("/errorpage");
      }
    });
};

// const setupSocket = function() {
//   const socket = socketIOClient(endpoint);
//   socket.on("FromAPI", data => (this.response = data));
// };

const checkIfNotlogin = function() {
  if (!localStorage.getItem("userId")) {
    this.props.history.push("/login");
  }
};

// const uploadCategory = function(event) {
//   event.preventDefault();
//   let newCategory = event.target.category.value;
//   const categoryToBeUploaded = { category: newCategory };
//   fetchData(Category, categoryToBeUploaded)
//     .then(res => {
//       if (res && res.data && res.data.status === "Category Inserted") {
//         let allCategory = res?.data?.dataFromDatabase?.map(data => {
//           return data;
//         });
//         this.props.updateCategory(allCategory);
//       }
//       if (res && res.data?.status === "Already Exist") {
//         alert("This category already exist");
//       }
//     })
//     .catch(err => {
//       if (err.message === "Network Error") {
//         this.props.history.push("/errorpage");
//       }
//     });
//   // clicked = false;
//   document.getElementById("category").innerHTML = "";
// };

const handlePostUploadForm = function(event) {
  event.preventDefault();
  if (event?.target?.category?.value === "none") {
    document.getElementById("category123").focus();
  } else {
    let category = event.target.category.value;
    let file = event.target.file.files[0];
    let caption = event.target.description.value;
    let userName = username;
    let userEmail = emailId;
    const formdata = new FormData();
    formdata.append("username", userName);
    formdata.append("email", userEmail);
    formdata.append("caption", caption);
    formdata.append("category", category);
    formdata.append("file", file);
    fetchData(Upload, formdata).then(res => {
      if (res && res.data?.status === "Post Inserted") {
        this.allPost(zero);
      } else {
        alert("not inserted");
      }
      this.togglePopup();
    });
  }
};

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.response = false;
    this.totalPosts = "";
    this.state = {
      hasMoreItems: true,
      postdata: [],
      showPopup: false,
      items: zero
    };
    this.userDetails = userDetails.bind(this);
    this.DownloadImage = DownloadImage.bind(this);
    // this.categoryUploadForm = categoryUploadForm.bind(this);
    this.totalNumberPosts = totalNumberPosts.bind(this);
    this.likePost = likePost.bind(this);
    // this.setupSocket = setupSocket.bind(this);
    this.checkIfNotlogin = checkIfNotlogin.bind(this);
    // this.uploadCategory = uploadCategory.bind(this);
    this.handlePostUploadForm = handlePostUploadForm.bind(this);
    this.totalNumberPosts();
  }

  static getDerivedStateFromError(error) {
    return (hasError = true);
  }

  componentDidMount() {
    this.checkIfNotlogin();
    this.props.updateLoginState(localStorage.getItem("userId"));
    // this.setupSocket();
    this.userDetails();
  }
  stateUpdateOnTimelineClick = async () => {
    this.setState({ items: zero, hasMoreItems: true });
    myUploads = false;
    await this.totalNumberPosts();
    await this.allPost(this.state.items);
  };

  togglePopup = () => {
    this.setState({ showPopup: !this.state.showPopup });
  };

  loadMorePosts = () => {
    if (this.totalPosts) {
      if (this.totalPosts >= this.state.items) {
        setTimeout(async () => {
          await this.allPost(this.state.items);
        }, 1000);
      } else {
        this.setState({ hasMoreItems: false });
      }
      return new Promise(resolve => {
        resolve(true);
      });
    } else {
      return;
    }
  };

  allPost = skipPosts => {
    const post = {
      Skip: skipPosts,
      email: myUploads ? emailId : false
    };
    fetchData(AllPosts, post)
      .then(res => {
        if (res) {
          let allPostsData = res.data?.dataFromDatabase;
          if (skipPosts === zero) {
            this.setState({ postdata: allPostsData, items: skipPosts + 5 });
          } else {
            this.setState({
              items: skipPosts + 5,
              postdata: [...this.state.postdata, ...allPostsData]
            });
          }
        }
      })
      .catch(err => {
        hasError = true;
      });
  };

  showMyUploads = async () => {
    this.setState({ items: zero, hasMoreItems: true });
    myUploads = true;
    await this.totalNumberPosts();
    await this.allPost(this.state.items);
  };

  render() {
    const { showPopup, items, postdata, hasMoreItems } = this.state;
    if (hasError) {
      return (
        <div>
          <h1 style={{ padding: "200px 450px", color: "#f47b13" }}>
            404 | Something went wrong
          </h1>
        </div>
      );
    } else {
      return (
        <div>
          <TimelineBodyComponent
            togglePopup={this.togglePopup.bind(this)}
            categoryUploadForm={this.categoryUploadForm}
            uploadCategory={this.uploadCategory}
            username={username}
            showMyUploads={this.showMyUploads}
            stateUpdateOnTimelineClick={this.stateUpdateOnTimelineClick}
            handlePostUploadForm={this.handlePostUploadForm}
            items={items}
            loadMorePosts={this.loadMorePosts}
            hasMoreItems={hasMoreItems}
            postdata={postdata}
            likePost={this.likePost}
            showPopup={showPopup}
            hasError={hasError}
            downLoad={this.DownloadImage}
          />
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return { category: state.CategoryReducer.category };
}

const mapDispatchToProps = dispatch => {
  return {
    updateLoginState: data => dispatch(updateLoginState(data)),
    updateCategory: data => dispatch(updateCategories(data)),
    resetLoginState: () => dispatch(resetLoginState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
