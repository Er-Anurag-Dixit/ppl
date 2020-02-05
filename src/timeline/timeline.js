import React from "react";
import { connect } from "react-redux";

import {
  updateCategories,
  updateLoginState,
  resetLoginState
} from "../redux/actions";
import fetchData from "../shared/sharedFunctions";
import { Routes } from "../shared/config";
import TimelineBodyComponent from "./timelineBodyComponent";

const {
  Likes,
  Category,
  Upload,
  AllPosts,
  UserData,
  TotalNumberOfPosts
} = Routes;
const zero = 0;
class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postdata: [],
      showPopup: false,
      items: 0,
      hasMoreItems: true,
      totalPosts: "",
      username: "",
      email: "",
      myUploads: false,
      clicked: false
    };
    this.handlePostUploadForm = this.handlePostUploadForm.bind(this);
  }
  categoryUploadForm = () => {
    if (!this.state.clicked) {
      this.state.clicked = true;
      const form =
        "category<input type='text' name='category' required/><br /><br /><input type='submit'/> &emsp;";
      document.getElementById("category").innerHTML = form;
    } else {
      document.getElementById("category").innerHTML = "";
      this.state.clicked = false;
    }
  };

  likePost = postID => {
    let likedData = {
      postId: postID,
      userId: localStorage.getItem("userId")
    };
    fetchData(Likes, likedData)
      .then(res => {
        if (res && res.data) {
          let likeData = res?.data?.dataFromDatabase[0];
          for (let i = zero; i < this.state.postdata.length; i++) {
            if (this.state.postdata[i]._id === likeData._id) {
              let postData = this.state.postdata;
              postData[i].likes = likeData.likes;
              this.setState({ postdata: postData });
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

  stateUpdateOnTimelineClick = async () => {
    this.setState({ myUploads: false, items: zero, hasMoreItems: true });
    await this.totalNumberPosts();
    await this.allPost(this.state.items);
  };

  uploadCategory = event => {
    event.preventDefault();
    let newCategory = event.target.category.value;
    const categoryToBeUploaded = { category: newCategory };
    fetchData(Category, categoryToBeUploaded)
      .then(res => {
        if (res && res.data && res.data.status === "Category Inserted") {
          let allCategory = res?.data?.dataFromDatabase?.map(data => {
            return data;
          });
          this.props.updateCategory(allCategory);
        }
        if (res && res.data.status === "Already Exist") {
          alert("This category already exist");
        }
      })
      .catch(err => {
        if (err.message === "Network Error") {
          this.props.history.push("/errorpage");
        }
      });
    this.state.clicked = false;
    document.getElementById("category").innerHTML = "";
  };

  handlePostUploadForm(event) {
    event.preventDefault();
    if (event.target.category.value === "none") {
      document.getElementById("category123").focus();
    } else {
      let category = event.target.category.value;
      let file = event.target.file.files[0];
      let caption = event.target.description.value;
      let userName = this.state.username;
      let userEmail = this.state.email;
      const formdata = new FormData();
      formdata.append("username", userName);
      formdata.append("email", userEmail);
      formdata.append("caption", caption);
      formdata.append("category", category);
      formdata.append("file", file);
      // Axios.post(Server.ServerUrl + Server.Routes.Upload, formdata);
      fetchData(Upload, formdata)
        .then(res => {
          if (res && res.data.status === "Post Inserted") {
            this.allPost(zero);
          } else {
            alert("not inserted");
          }
          this.togglePopup();
        })
        .catch(err => {
          if (err.message === "Network Error") {
            this.props.history.push("/errorpage");
          }
        });
    }
  }

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };

  loadMorePosts = () => {
    if (this.state.items <= this.state.totalPosts) {
      setTimeout(async () => {
        await this.allPost(this.state.items);
      }, 1000);
    } else {
      this.setState({ hasMoreItems: false });
    }
    return new Promise(resolve => {
      resolve(true);
    });
  };

  allPost = skipPosts => {
    const post = {
      Skip: skipPosts,
      email: this.state.myUploads ? this.state.email : false
    };
    fetchData(AllPosts, post)
      .then(res => {
        if (res) {
          let allPostsData = res.data.dataFromDatabase;
          if (skipPosts === zero) {
            this.setState({
              postdata: allPostsData,
              items: skipPosts + 5
            });
          } else {
            this.setState({
              postdata: [...this.state.postdata, ...allPostsData],
              items: skipPosts + 5
            });
          }
        }
      })
      .catch(err => {
        if (err.message === "Network Error") {
          this.props.history.push("/errorpage");
        }
      });
  };

  showMyUploads = async () => {
    this.setState({ myUploads: true, hasMoreItems: true, items: zero });
    await this.totalNumberPosts();
    await this.allPost(this.state.items);
  };

  checkNotlogin = () => {
    if (!localStorage.getItem("userId")) {
      this.props.history.push("/login");
    }
  };

  userDetails = () => {
    let UserID = { id: localStorage.getItem("userId") };
    fetchData(UserData, UserID).then(res => {
      this.setState({
        username: res.data[zero].username,
        email: res.data[zero].email
      });
    });
  };

  totalNumberPosts = () => {
    const data = { email: this.state.myUploads ? this.state.email : false };
    fetchData(TotalNumberOfPosts, data)
      .then(res => {
        if (res) {
          this.setState({ totalPosts: res.data.counts });
          // return new Promise(resolve => {
          //   resolve(true);
          // });
        }
      })
      .catch(err => {
        if (err.message === "Network Error") {
          this.props.history.push("/errorpage");
        }
      });
  };

  componentWillUnmount() {
    this.props.resetLoginState();
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidMount() {
    //console.log("component did mount");
    this.totalNumberPosts();
    this.userDetails();
    this.checkNotlogin();
    this.props.updateLoginState(localStorage.getItem("userId"));
  }

  render() {
    const {
      hasError,
      hasMoreItems,
      showPopup,
      postdata,
      items,
      username
    } = this.state;
    if (hasError) {
      return <div>Something went wrong</div>;
    }
    console.log("rensering");
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
    updateCategory: data => dispatch(updateCategories(data)),
    updateLoginState: data => dispatch(updateLoginState(data)),
    resetLoginState: () => dispatch(resetLoginState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
