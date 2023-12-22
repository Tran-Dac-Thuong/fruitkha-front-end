import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  FETCH_CARTS_REQUEST,
  FETCH_CARTS_SUCCESS,
  FETCH_CARTS_FAIL,
  DELETE_CART_SUCCESS,
  DELETE_CART_FAIL,
} from "../actions/type";

const INITIAL_STATE = {
  listCarts: [],
  isLoading: false,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      return {
        ...state,
      };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
      };
    case ADD_TO_CART_FAIL:
      return {
        ...state,
      };

    case DELETE_CART_SUCCESS:
      return {
        ...state,
      };
    case DELETE_CART_FAIL:
      return {
        ...state,
      };
    case FETCH_CARTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_CARTS_SUCCESS:
      return {
        ...state,
        listCarts: action.dataCarts,
        isLoading: false,
      };
    case FETCH_CARTS_FAIL:
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
};

export default cartReducer;
