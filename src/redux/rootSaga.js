import { fork, all } from 'redux-saga/effects';

import postsSaga from 'redux/posts/saga';


export default function* rootSaga(context) {
  yield all([
    fork(postsSaga, context),
  ]);
}
