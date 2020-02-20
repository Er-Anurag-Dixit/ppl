import { takeEvery } from "redux-saga/effects";
import { updateCategories, Update_Categories } from "./actions";

export function* WatchEveryCategoryUpdate(data) {
  console.log("jimmy jimmy jimmy, aaja aaja aaja");
  yield takeEvery("update_category", updateCategories(data));
}
