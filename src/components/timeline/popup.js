import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { updateCategories } from "../../redux/actions";

function Popup(props) {
  const { handleSubmit, category, togglePopup } = props;

  return (
    <div
      className="popup"
      style={{
        borderStyle: "inset",
        borderWidth: "10px",
        borderRadius: "25px",
        backgroundColor: "rgba(51, 53, 52, 0.9)"
      }}
    >
      <ul style={{ textAlign: "center" }}>
        <li style={{ color: "white" }}>
          {" "}
          <h1>Upload Post</h1>
        </li>
      </ul>
      <div
        style={{
          borderRadius: "25px"
        }}
      >
        <div className="popup\_inner">
          <ul style={{ textAlign: "center" }}>
            <form onSubmit={handleSubmit}>
              <li style={{ color: "white" }}>
                {" "}
                <h4>Description</h4>
              </li>
              <li>
                {" "}
                <h4>
                  <input type="text" name="description" required />
                </h4>
              </li>
              <li>
                <h4 style={{ color: "white" }}>Category</h4>
              </li>
              <li>
                <select id="category123" name="category" required>
                  <option value="" hidden>
                    Select an Option
                  </option>
                  ;
                  {category.map((data, key) => {
                    return <option key={key}>{data.category}</option>;
                  })}
                </select>
              </li>

              <li>
                <h4 style={{ color: "white" }}>Upload Image</h4>{" "}
              </li>
              <li style={{ marginLeft: "50px" }}>
                <input
                  type="file"
                  name="file"
                  required
                  accept="image/x-png,image/gif,image/jpeg"
                />
              </li>
              <br />
              <li>
                <input type="submit" /> &emsp;
                <button onClick={togglePopup}>Cancel</button>
              </li>
            </form>
          </ul>
        </div>
      </div>
    </div>
  );
}

Popup.propTypes = {
  handleSubmit: PropTypes.func,
  category: PropTypes.array,
  togglePopup: PropTypes.func
};

function mapStateToProps(state) {
  return { category: state.CategoryReducer.category };
}

const mapDispatchToProps = dispatch => {
  return {
    updateCategory: data => dispatch(updateCategories(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
