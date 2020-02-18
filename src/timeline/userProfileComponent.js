import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class UserProfileComponent extends React.Component {
  render() {
    const { username, stateUpdateOnTimelineClick, showMyUploads } = this.props;
    return (
      <div className="contnt_1">
        <div className="timeline_div">
          <div className="timeline_div1">
            <div className="profile_pic">
              <img
                src="/images/profileImage1.jpg"
                style={{ height: "168px" }}
              />
              <div className="profile_text">
                <a href="#">Change Profile Pic</a>
              </div>
            </div>
            <div className="profile_info">
              <div className="edit_div">
                <a href="#">
                  Edit <img src="/images/timeline_img.png" />
                </a>
              </div>
              <div className="profile_form">
                <ul>
                  <li>
                    <div className="div_name1">Name :</div>
                    <div className="div_name2">{username?.toUpperCase()}</div>
                  </li>
                  <li>
                    <div className="div_name1">Sex :</div>
                    <div className="div_name2">Male</div>
                  </li>
                  <li>
                    <div className="div_name1">Description :</div>
                    <div className="div_name3">
                      This is an example of a comment. You can create as many
                      comments like this one or sub comments as you like and
                      manage all of your content inside Account.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="timeline_div2">
            <ul>
              <li>
                <a
                  id="timeline"
                  onClick={() => {
                    document.getElementById("my_upload").className = "";
                    document.getElementById("timeline").className = "active";
                    stateUpdateOnTimelineClick();
                  }}
                  className="active"
                >
                  Timeline
                </a>
              </li>
              <li>
                <a href="#">About </a>
              </li>
              <li>
                <a href="#">Album</a>
              </li>
              <li>
                <a href="#"> Pets</a>
              </li>
              <li>
                <a
                  id="my_upload"
                  onClick={() => {
                    document.getElementById("timeline").className = "";
                    document.getElementById("my_upload").className = "active";
                    showMyUploads();
                  }}
                >
                  My Uploads{" "}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
UserProfileComponent.propTypes = {
  username: PropTypes.string,
  stateUpdateOnTimelineClick: PropTypes.func,
  showMyUploads: PropTypes.func
};
export default UserProfileComponent;
