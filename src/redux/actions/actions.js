import axios from "axios";
import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  FETCH_CARTS_REQUEST,
  FETCH_CARTS_SUCCESS,
  FETCH_CARTS_FAIL,
  CHANGE_LANGUAGE,
  CHANGE_THEME,
  FETCH_CURRENT_USER_REQUEST,
  FETCH_CURRENT_USER_SUCCESS,
  FETCH_CURRENT_USER_FAIL,
  DELETE_CART_SUCCESS,
  DELETE_CART_FAIL,
} from "./type";

export const fetchCurrentUser = (userId) => {
  return async (dispatch, getState) => {
    dispatch(fetchCurrentUserRequest);
    try {
      let res = await axios.get(
        `http://localhost:3434/api/get-current-user/${userId}`
      );
      if (res && res.data.message === "OK") {
        console.log("check current user: ", res.data.currentUser);
        dispatch(fetchCurrentUserSuccess(res.data.currentUser));
      }
    } catch (error) {
      console.log(error);
      dispatch(fetchCurrentUserFail);
    }
  };
};

export const fetchCurrentUserRequest = () => {
  return {
    type: FETCH_CURRENT_USER_REQUEST,
  };
};

export const fetchCurrentUserSuccess = (data) => {
  return {
    type: FETCH_CURRENT_USER_SUCCESS,
    dataUsers: data,
  };
};

export const fetchCurrentUserFail = () => {
  return {
    type: FETCH_CURRENT_USER_FAIL,
  };
};

export const addToCart = (currentUserId, productId, quantity) => {
  return async (dispatch, getState) => {
    dispatch(addtoCartRequest());
    try {
      let res = await axios.post(`http://localhost:3434/api/add-to-cart/`, {
        productId: productId,
        userId: currentUserId,
        newQuantity: quantity,
      });
      if (res && res.data.message === "OK") {
        dispatch(addtoCartSuccess());
        dispatch(fetchCartItems(currentUserId));
      }
    } catch (error) {
      console.log(error);
      dispatch(addtoCartFail());
    }
  };
};

export const addtoCartRequest = () => {
  return {
    type: ADD_TO_CART_REQUEST,
  };
};

export const addtoCartSuccess = () => {
  return {
    type: ADD_TO_CART_SUCCESS,
  };
};

export const addtoCartFail = () => {
  return {
    type: ADD_TO_CART_FAIL,
  };
};

export const changeLanguage = (language) => {
  return {
    type: CHANGE_LANGUAGE,
    language: language,
  };
};

export const changeTheme = (theme) => {
  return {
    type: CHANGE_THEME,
    theme: theme,
  };
};

export const fetchCartItems = (currentUserId) => {
  return async (dispatch, getState) => {
    dispatch(fetchCartItemsRequest);
    try {
      let res = await axios.get(
        `http://localhost:3434/api/get-cart-items/${
          currentUserId ? currentUserId : 0
        }`
      );
      if (res && res.data.message === "OK") {
        dispatch(fetchCartItemsSuccess(res.data.carts));
      }
    } catch (error) {
      console.log(error);
      dispatch(fetchCartItemsFail);
    }
  };
};

export const removeFromCart = (cartId, currentUserId) => {
  return async (dispatch, getState) => {
    try {
      let res = await axios.delete(
        `http://localhost:3434/api/remove-from-cart/${cartId}`
      );
      if (res && res.data.message === "Remove success") {
        dispatch(deleteCartItemsSuccess());
        dispatch(fetchCartItems(currentUserId));
      }
    } catch (error) {
      console.log(error);
      dispatch(deleteCartItemsFail);
    }
  };
};

export const deleteCartItemsSuccess = () => {
  return {
    type: DELETE_CART_SUCCESS,
  };
};

export const deleteCartItemsFail = () => {
  return {
    type: DELETE_CART_FAIL,
  };
};

export const fetchCartItemsRequest = () => {
  return {
    type: FETCH_CARTS_REQUEST,
  };
};

export const fetchCartItemsSuccess = (data) => {
  return {
    type: FETCH_CARTS_SUCCESS,
    dataCarts: data,
  };
};

export const fetchCartItemsFail = () => {
  return {
    type: FETCH_CARTS_FAIL,
  };
};
