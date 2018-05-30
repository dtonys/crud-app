import querystring from 'querystring';
import { put, call, fork, all } from 'redux-saga/effects';
import { takeOne } from 'redux/sagaHelpers';

import {
  LOAD_POST_LIST_REQUESTED,
  LOAD_POST_LIST_STARTED,
  LOAD_POST_LIST_SUCCESS,
  LOAD_POST_LIST_ERROR,
} from 'redux/posts/actions';

function* loadPostList(/* , action  context */ ) {
  yield put({ type: LOAD_POST_LIST_STARTED });
  try {
    const request = yield call(
      fetch,
      `https://jsonplaceholder.typicode.com/posts?${querystring.stringify({ _limit: 5 })}`,
    );
    const data = yield call( request.json.bind(request) );
    yield put({ type: LOAD_POST_LIST_SUCCESS, payload: data });
  }
  catch ( error ) {
    yield put({ type: LOAD_POST_LIST_ERROR });
  }
}

export default function* ( context ) {
  yield all([
    fork( takeOne(LOAD_POST_LIST_REQUESTED, loadPostList, context) ),
  ]);
}
