import CategoryReducer from "./categoryReducer";
import loginStateReducer from "./loginStateReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  CategoryReducer: CategoryReducer,
  loginStateReducer: loginStateReducer
});
export default rootReducer;
