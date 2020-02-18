import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { updateCategories } from "../redux/actions";
import Category from "./category";
import { Routes } from "../config";
import fetchData from "../shared/sharedFunctions";

const { AllCategory } = Routes;

// class CategoryList extends React.PureComponent {
//   constructor(props) {
//     super(props);
//   }

//   allcategories = () => {
//     fetchData(AllCategory)
//       .then(res => {
//         if (res && res.data) {
//           let allCategoryData = res.data?.dataFromDatabase?.map(category => {
//             return category;
//           });
//           this.props.updateCategory(allCategoryData);
//         }
//       })
//       .catch(err => {
//         this.setState({ hasError: true });
//       });
//   };

//   componentDidMount() {
//     this.allcategories();
//   }

//   render() {
//     const { category } = this.props;
//     const { hasError } = this.state;
//     if (hasError) {
//       return <div>Something went wrong</div>;
//     }
//     return (
//       <div className="rght_cate">
//         <div className="rght_cate_hd" id="rght_cat_bg">
//           Categories
//         </div>
//         <br /> <br /> <br />
//         <div className="rght_list">
//           <ul style={{ borderRadius: "50em" }}>
//             {category.map((names, i) => (
//               <Category key={i} categoryData={names.category} />
//             ))}
//             <li style={{ border: "outset" }}>
//               <a href="#">
//                 <span className="list_icon">
//                   <img src="/images/icon_05.png" alt="up" />
//                 </span>{" "}
//                 Others
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     );
//   }
// }

const CategoryList = React.memo(props => {
  const allcategories = () => {
    fetchData(AllCategory).then(res => {
      if (res && res.data) {
        let allCategoryData = res.data?.dataFromDatabase?.map(category => {
          return category;
        });
        props.updateCategory(allCategoryData);
      }
    });
  };

  useEffect(() => {
    allcategories();
  }, [props.updateCategory]);

  const { category } = props;

  return (
    <div className="rght_cate">
      <div className="rght_cate_hd" id="rght_cat_bg">
        Categories
      </div>
      <br /> <br /> <br />
      <div className="rght_list">
        <ul style={{ borderRadius: "50em" }}>
          {category.map((names, i) => (
            <Category key={i} categoryData={names.category} />
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
});

CategoryList.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
