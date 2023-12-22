import { combineReducers } from "redux";

import cartReducer from "./cartReducer";
import languageReducer from "./languageReducer";
import userReducer from "./userReducer";
import themeReducer from "./themeReducer";
import paymentReducer from "./paymentReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  language: languageReducer,
  theme: themeReducer,
  user: userReducer,
  payment: paymentReducer,
});

export default rootReducer;
