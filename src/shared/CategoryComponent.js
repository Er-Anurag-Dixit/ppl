import React from "react";
import CategoryForm from "./categoryForm";
import CategoryList from "./categories";

const CategoryComponent = props => {
  const { clicked, uploadCategory } = props;
  return (
    <div>
      {clicked ? <CategoryForm uploadCategory={uploadCategory} /> : null}
      <CategoryList />
    </div>
  );
};
export default CategoryComponent;
