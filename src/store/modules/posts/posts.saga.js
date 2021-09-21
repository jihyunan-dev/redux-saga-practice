import { takeEvery, all, call, put, takeLeading } from "redux-saga/effects";

import {
  GET_POSTS,
  getPostsSuccess,
  getPostsFailed,
  ADD_POST,
  addPostSuccess,
  addPostFailed,
} from "./posts.action";
import { getPosts, addPost } from "../../../util/api";

function* getPostsSaga() {
  try {
    const data = yield call(getPosts);
    yield put(getPostsSuccess(data));
  } catch (e) {
    yield put(getPostsFailed(e.message));
  }
}

function* getPostsWatcher() {
  yield takeLeading(GET_POSTS, getPostsSaga);
}

function* addPostSaga(action) {
  try {
    const data = yield call(addPost, action.payload);
    yield put(addPostSuccess({ ...action.payload, ...data }));
  } catch (e) {
    yield put(addPostFailed(e.message));
  }
}

function* addPostWatcher() {
  yield takeLeading(ADD_POST, addPostSaga);
}

export default function* postsSaga() {
  yield all([getPostsWatcher(), addPostWatcher()]);
}
