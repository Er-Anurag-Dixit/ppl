import React from "react";
import Post from "./posts";
import InfiniteScroll from "react-infinite-scroller";
import PostActivityComponent from "../shared/postActivityComponent";

const Scroller = props => {
  const { hasMoreItems, postdata, onlikePost, downLoad, loadMorePosts } = props;
  return (
    <InfiniteScroll
      hasMore={hasMoreItems}
      loadMore={loadMorePosts}
      loader={
        hasMoreItems ? (
          <div className="loader" key={0} style={{ marginLeft: "300px" }}>
            {" "}
            <img
              src="images/giphy.gif"
              style={{ width: "10%", height: "10%" }}
            ></img>
          </div>
        ) : (
          <div>
            <h1>Yay! You have seen it all</h1>
          </div>
        )
      }
    >
      <ul>
        {postdata.map((post, i) => (
          <div>
            <Post
              key={i}
              data={post}
              onlikePost={onlikePost}
              downLoad={downLoad}
            />
            <PostActivityComponent
              onlikePost={onlikePost}
              Postdata={post}
              nameOfImage={post.image}
              downLoad={downLoad}
            />
          </div>
        ))}
      </ul>
    </InfiniteScroll>
  );
};
export default Scroller;
