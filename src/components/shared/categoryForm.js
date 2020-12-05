import React from "react";
// import Category from "./category";
import { PropTypes } from "prop-types";

const CategoryForm = props => {
  const { uploadCategory } = props;
  return (
    <form onSubmit={uploadCategory}>
      category
      <input type="text" name="category" required />
      <br />
      <br />
      <input type="submit" />
    </form>
  );
};

CategoryForm.propType = {
  uploadCategory: PropTypes.func
};

export default CategoryForm;
