import {
  FETCH_CURRENT_USER_REQUEST,
  FETCH_CURRENT_USER_SUCCESS,
  FETCH_CURRENT_USER_FAIL,
} from "../actions/type";

const INITIAL_STATE = {
  currentUser: {},
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CURRENT_USER_REQUEST:
      return {
        ...state,
      };
    case FETCH_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.dataUsers,
      };
    case FETCH_CURRENT_USER_FAIL:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default userReducer;
