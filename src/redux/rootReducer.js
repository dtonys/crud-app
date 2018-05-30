import { combineReducers } from 'redux';
import postsReducer, { STORE_KEY as POST_STORE_KEY } from 'redux/posts/reducer';


export default ( routeReducer ) => {
  return combineReducers({
    [POST_STORE_KEY]: postsReducer,
    location: routeReducer,
  });
};
