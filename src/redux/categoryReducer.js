import { Update_Categories } from "./actions";
const initialState = {
  category: []
};

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case Update_Categories:
      return {
        ...state,
        category: action.payload
      };
    default:
      return state;
  }
};

export default CategoryReducer;
