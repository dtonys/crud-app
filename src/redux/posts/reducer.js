import { LOAD_POST_LIST_STARTED, LOAD_POST_LIST_SUCCESS, LOAD_POST_LIST_ERROR } from 'redux/posts/actions';


export const STORE_KEY = 'posts';
const initialState = {
  postList: {
    loaded: false,
    data: null,
  },
};

export function extractState( globalState ) {
  return globalState[STORE_KEY];
}

export default ( state = initialState, action ) => {
  switch ( action.type ) {
    case LOAD_POST_LIST_STARTED: {
      return {
        ...state,
        postList: {
          ...state.postList,
          loaded: false,
        },
      };
    }
    case LOAD_POST_LIST_SUCCESS: {
      return {
        ...state,
        postList: {
          ...state.postList,
          loaded: true,
          data: action.payload,
        },
      };
    }
    case LOAD_POST_LIST_ERROR: {
      return {
        ...state,
        postList: {
          ...state.postList,
          loaded: true,
        },
      };
    }
    default: {
      return state;
    }
  }
};
