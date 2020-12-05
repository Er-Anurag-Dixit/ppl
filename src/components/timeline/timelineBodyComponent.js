import React, { useState } from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { FixedSizeList } from "react-window";
// import InfiniteLoader from "react-window-infinite-loader";

import Popup from "./popup.js";
import FormOpenButton from "./formOpenButton";
import "./style.css";
import Featured from "../shared/featured";
import UserProfileComponent from "./userProfileComponent";
// import CategoryList from "../shared/categories";
import Scroller from "./scroller";
import serverCall from "../../utilsFolder/utils";
// import CategoryForm from "../shared/categoryForm";
import CategoryComponent from "../shared/CategoryComponent";
import { updateCategories } from "../../redux/actions";
import { WatchEveryCategoryUpdate } from "../../redux/saga.js";
import store from "../../redux/store.js";
import { Routes } from "../../config";

const { Upload_Category, Upload } = Routes;

let k = 0;
const zero = 0;

const TimelineBodyComponent = props => {
  // const getPost = ({ index, style }) => {
  //   if (props.postdata[index]) {
  //     return (
  //       <Post
  //         style={style}
  //         data={props.postdata[index]}
  //         likePost={props.likePost}
  //         downLoad={props.downLoad}
  //       />
  //     );
  //   } else {
  //     return null;
  //   }
  // };
  // const callBackFunction = useCallback(
  //   id => {
  //     props.likePost(id);
  //   },
  //   [props.likePost]
  // );

  const [clicked, setClicked] = useState(false);
  const [emailId, setEmailId] = useState(props.emailId);

  const categoryUploadForm = () => {
    if (!clicked) {
      setClicked(true);
    } else {
      setClicked(false);
    }
  };

  const uploadCategory = function(event) {
    event.preventDefault();
    let checkIfAlreadyExist = false;
    props.category.map(data => {
      if (data.category === event.target.category.value.toLowerCase()) {
        checkIfAlreadyExist = true;
      }
    });
    if (checkIfAlreadyExist) {
      alert("This category already exist");
      event.target.category.value = "";
    } else {
      const newCategory = event.target.category.value;
      const categoryToBeUploaded = { category: newCategory };
      serverCall(Upload_Category, categoryToBeUploaded).then(res => {
        if (res?.data?.status === "Category Inserted") {
          let allCategory = res?.data?.dataFromDatabase?.map(data => {
            return data;
          });

          props.updateCategory(allCategory);
        }
      });
      setClicked(false);
    }
  };

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
      serverCall(Upload, formdata).then(res => {
        if (res?.data?.status === "Post Inserted") {
          props.allPost(zero);
        } else {
          alert("not inserted");
        }
        togglePopup();
      });
    }
  };

  const {
    togglePopup,
    // categoryUploadForm,
    // uploadCategory,
    username,
    showMyUploads,
    stateUpdateOnTimelineClick,
    // handlePostUploadForm,
    // items,
    loadMorePosts,
    hasMoreItems,
    postdata,
    likePost,
    hasError,
    downLoad
  } = props;
  if (hasError) {
    return (
      <div>
        <h1></h1>
        Something is wrong
      </div>
    );
  }
  return (
    <div>
      <Helmet>
        <title>Timeline</title>
      </Helmet>
      <div className="container">
        <div className="content">
          <div className="content_rgt">
            <FormOpenButton
              togglePopup={togglePopup}
              categoryUploadForm={categoryUploadForm}
            />
            <CategoryComponent
              uploadCategory={uploadCategory}
              clicked={clicked}
            />

            <Featured />
          </div>
          <div className="content_lft">
            <UserProfileComponent
              username={username}
              showMyUploads={showMyUploads}
              stateUpdateOnTimelineClick={stateUpdateOnTimelineClick}
            />
            <div>
              {props.showPopup ? (
                <Popup
                  handleSubmit={handlePostUploadForm}
                  togglePopup={togglePopup}
                />
              ) : null}
            </div>
            {/* <InfiniteLoader 
                   isItemLoaded={() => {
                     return !hasMoreItems;
                   }}
                   style={{ width: "100" }}
                   itemCount={10}
                   loadMoreItems={() => {
                     loadMorePosts();
                   }}
                 >
                   {({ onItemsRendered, ref }) => (
                     <FixedSizeList
                       height={3000}
                       width={750}
                     itemCount={10}
                     itemSize={650}
                     onItemsRendered={onItemsRendered}
                       ref={ref}
                     >
                       {getPost}
                     </FixedSizeList>
                   )}
                </InfiniteLoader>  */}
            <Scroller
              key={k++}
              onlikePost={likePost}
              postdata={postdata}
              downLoad={downLoad}
              loadMorePosts={loadMorePosts}
              hasMoreItems={hasMoreItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

TimelineBodyComponent.propTypes = {
  logout: PropTypes.func,
  togglePopup: PropTypes.func,
  // categoryUploadForm: PropTypes.func,
  // uploadCategory: PropTypes.func,
  username: PropTypes.string,
  showMyUploads: PropTypes.func,
  stateUpdateOnTimelineClick: PropTypes.func,
  // handlePostUploadForm: PropTypes.func,
  items: PropTypes.number,
  loadMorePosts: PropTypes.func,
  hasMoreItems: PropTypes.bool,
  postdata: PropTypes.array,
  likePost: PropTypes.func,
  showPopup: PropTypes.bool
};

function mapStateToProps(state) {
  return { category: state.CategoryReducer.category };
}

const mapDispatchToProps = dispatch => {
  return {
    updateCategory: data => dispatch(updateCategories(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineBodyComponent);
