import { all } from "redux-saga/effects";
import postsSaga from "./modules/posts/posts.saga";

function* rootSaga() {
  yield all([postsSaga]);
}

export default rootSaga;
