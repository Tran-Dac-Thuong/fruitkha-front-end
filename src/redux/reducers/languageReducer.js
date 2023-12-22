import { CHANGE_LANGUAGE } from "../actions/type";

const INITIAL_STATE = {
  language: "ENG",
};

const languageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.language,
      };

    default:
      return state;
  }
};

export default languageReducer;
