import React from "react";
import InfiniteLoader from "react-window-infinite-loader";
import Helmet from "react-helmet";
import { FixedSizeList } from "react-window";
import PropTypes from "prop-types";

import Post from "./posts";
import Popup from "./popup.js";
import RightButton from "./rightButton";
import "./style.css";
import Featured from "../shared/featured";
import UserProfileComponent from "./userProfileComponent";
import Categories from "../shared/categories";
//import InfiniteScroll from "react-infinite-scroller";

export default function TimelineBodyComponent(props) {
  const getPost = ({ index, style }) => {
    if (props.postdata[index]) {
      return (
        <Post
          style={style}
          data={props.postdata[index]}
          likePost={props.likePost}
        />
      );
    } else {
      return null;
    }
  };
  const {
    togglePopup,
    categoryUploadForm,
    uploadCategory,
    username,
    showMyUploads,
    stateUpdateOnTimelineClick,
    handlePostUploadForm,
    items,
    loadMorePosts,
    hasMoreItems,
    postdata,
    likePost
  } = props;

  return (
    <div>
      <Helmet>
        <title>Timeline</title>
      </Helmet>
      <div className="container">
        <div className="content">
          <div className="content_rgt">
            <RightButton
              togglePopup={togglePopup.bind(this)}
              categoryUploadForm={categoryUploadForm}
            />

            <form id="category" onSubmit={uploadCategory}></form>
            <Categories />
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
            <InfiniteLoader
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
            </InfiniteLoader>
            {/* <InfiniteScroll
                length={items}
                loadMore={loadMorePosts}
                hasMore={hasMoreItems}
                loader={
                  hasMoreItems ? (
                    <div
                      className="loader"
                      key={0}
                      style={{ marginLeft: "300px" }}
                    >
                      {" "}
                      <img
                        src="images/giphy.gif"
                        style={{ width: "10%", height: "10%" }}
                      ></img>
                    </div>
                  ) : (
                    <div className="" style={{ marginLeft: "300px" }}>
                      <p style={{ width: "20%", height: "10%" }}>
                        Yay! You have seen it all
                      </p>
                    </div>
                  )
                }
              >
                <ul>
                  {postdata.map((names, i) => (
                    <Post key={i} Postdata={names} likeFunction={likePost} />
                  ))}
                </ul>
              </InfiniteScroll> */}
          </div>
        </div>
      </div>
    </div>
  );
}
TimelineBodyComponent.propTypes = {
  logout: PropTypes.func,
  togglePopup: PropTypes.func,
  categoryUploadForm: PropTypes.func,

  uploadCategory: PropTypes.func,
  username: PropTypes.string,
  showMyUploads: PropTypes.func,
  stateUpdateOnTimelineClick: PropTypes.func,
  handlePostUploadForm: PropTypes.func,
  items: PropTypes.number,
  loadMorePosts: PropTypes.func,
  hasMoreItems: PropTypes.bool,
  postdata: PropTypes.array,
  likePost: PropTypes.func,
  showPopup: PropTypes.bool
};
