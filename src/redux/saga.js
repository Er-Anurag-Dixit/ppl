import { takeEvery, all, put, call } from "redux-saga/effects";
import { updateCategories } from "../redux/actions";
import serverCall from "../utilsFolder/utils";
import { Routes } from "../config";

const { AllCategory } = Routes;

export const all_categories = () => {
  return {
    type: "all_category"
  };
};

function* allcategories() {
  let data = yield call(() => {
    return serverCall(AllCategory).then(res => {
      return res.data?.dataFromDatabase?.map(category => {
        return category;
      });
    });
  });
  yield put(updateCategories(data));
}

function* generatorFunction() {
  yield takeEvery("all_category", allcategories);
}

export default generatorFunction;
