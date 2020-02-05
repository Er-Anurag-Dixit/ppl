import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { updateCategories } from "../redux/actions";
import Category from "./category";
import { Routes } from "../shared/config";
import fetchData from "../shared/sharedFunctions";
const { AllCategory } = Routes;

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  allcategories = () => {
    fetchData(AllCategory)
      .then(res => {
        if (res && res.data) {
          let allCategoryData = res.data?.dataFromDatabase?.map(category => {
            return category;
          });
          this.props.updateCategory(allCategoryData);
        }
      })
      .catch(err => {
        if (err.message === "Network Error") {
          this.props.history.push("/errorpage");
        }
      });
  };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidMount() {
    this.allcategories();
  }

  render() {
    const { category } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      return <div>Something went wrong</div>;
    }
    return (
      <div className="rght_cate">
        <div className="rght_cate_hd" id="rght_cat_bg">
          Categories
        </div>
        <br /> <br /> <br />
        <div className="rght_list">
          <ul style={{ borderRadius: "50em" }}>
            {category.map((names, i) => (
              <Category key={i} categoryData={names} />
            ))}
            <li style={{ border: "outset" }}>
              <a href="#">
                <span className="list_icon">
                  <img src="/images/icon_05.png" alt="up" />
                </span>{" "}
                Others
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
Categories.propTypes = {
  category: PropTypes.array
};

function mapStateToProps(state) {
  return { category: state.CategoryReducer.category };
}

const mapDispatchToProps = dispatch => {
  return {
    updateCategory: data => dispatch(updateCategories(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
