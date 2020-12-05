import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
// import socketIOClient from "socket.io-client";

import {
  updateLoginState,
  updateCategories,
  resetLoginState
} from "../redux/actions";
import serverCall, { DownloadImage } from "../utilsFolder/utils";
import { Routes, ServerUrl } from "../config";
import TimelineBodyComponent from "../components/timeline/timelineBodyComponent";

const { Likes_Post, AllPosts, UserData, TotalNumberOfPosts } = Routes;

const zero = 0;
let username = "";
let emailId = "";
let myUploads = false;
// let endpoint = ServerUrl;
let hasError = false;

const Timeline = props => {
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [postdata, setPostdata] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [items, setItems] = useState(zero);
  const [totalPosts, setTotalPosts] = useState(zero);

  useEffect(() => {
    totalNumberPosts();
    checkIfNotlogin();
    props.updateLoginState(localStorage.getItem("userId"));
    // this.setupSocket();
    userDetails();
  }, []);

  const userDetails = ()=> {
    let UserID = { id: localStorage.getItem("userId") };
    serverCall(UserData, UserID).then(res => {
      if (res && res.data) username = res.data[zero]?.username;
      emailId = res.data[zero]?.email;
    });
  };

  const checkIfNotlogin = function() {
    if (!localStorage.getItem("userId")) {
      props.history.push("/login");
    }
  };

  const totalNumberPosts = async function() {
    const data = { email: myUploads ? emailId : null };
    serverCall(TotalNumberOfPosts, data).then(res => {
      if (res && res.data) {
        setTotalPosts(res.data?.counts);
      }
    });
  };

  const likePost = function(postID) {
    let likedData = {
      postId: postID,
      userId: localStorage.getItem("userId")
    };
    serverCall(Likes_Post, likedData).then(res => {
      if (res?.data) {
        let likeData = res?.data?.dataFromDatabase[0];
        for (let i = zero; i < postdata.length; i++) {
          if (postdata[i]._id === likeData._id) {
            let newpostData = postdata;
            newpostData[i].likes = likeData.likes;
            setPostdata([...newpostData]);
          }
        }
      }
    });
  };

  const stateUpdateOnTimelineClick = async () => {
    setHasMoreItems(true);
    setItems(zero);
    myUploads = false;
    await totalNumberPosts();
    await allPost(items);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const loadMorePosts = () => {
    if (totalPosts) {
      if (totalPosts >= items) {
        setTimeout(async () => {
          await allPost(items);
        }, 1000);
      } else {
        setHasMoreItems(false);
      }
      return new Promise(resolve => {
        resolve(true);
      });
    } else {
      return;
    }
  };

  const allPost = skipPosts => {
    const post = {
      Skip: skipPosts,
      email: myUploads ? emailId : false
    };
    serverCall(AllPosts, post).then(res => {
      if (res) {
        let allPostsData = res.data?.dataFromDatabase;
        if (skipPosts === zero) {
          setPostdata(allPostsData);
          setItems(skipPosts + 5);
        } else {
          setItems(skipPosts + 5);
          setPostdata([...postdata, ...allPostsData]);
        }
      }
    });
  };

  const showMyUploads = async () => {
    setHasMoreItems(true);
    setItems(zero);
    myUploads = true;
    await totalNumberPosts();
    await allPost(items);
  };
  return (
    <div>
      ("
      <TimelineBodyComponent
        togglePopup={togglePopup}
        username={username}
        showMyUploads={showMyUploads}
        stateUpdateOnTimelineClick={stateUpdateOnTimelineClick}
        items={items}
        loadMorePosts={loadMorePosts}
        hasMoreItems={hasMoreItems}
        postdata={postdata}
        likePost={likePost}
        showPopup={showPopup}
        hasError={hasError}
        downLoad={DownloadImage}
        emailId={emailId}
        allPost={allPost}
      />
    </div>
  );
};

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
