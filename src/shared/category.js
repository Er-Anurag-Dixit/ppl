import React from "react";
import PropTypes from "prop-types";

export default function Category(props) {
  const { category } = props.categoryData;

  return (
    <div>
      <div>
        <li style={{ border: "outset" }}>
          <a href="#">
            <span className="list_icon">
              <img src="/images/icon_01.png" alt="up" />
            </span>
            {category}
          </a>
        </li>
      </div>
    </div>
  );
}
Category.propTypes = {
  category: PropTypes.string,
  categoryData: PropTypes.object
};
