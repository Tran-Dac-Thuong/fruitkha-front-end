import { CHANGE_THEME } from "../actions/type";

const INITIAL_STATE = {
  theme: "SUN",
};

const themeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        theme: action.theme,
      };

    default:
      return state;
  }
};

export default themeReducer;
