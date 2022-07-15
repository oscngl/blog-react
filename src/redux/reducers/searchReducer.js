import * as actionTypes from "../actions/actionTypes";
import initialStates from "../initialStates";

const searchReducer = (state = initialStates.search, action) => {
  switch (action.type) {
    case actionTypes.SET_SEARCH_KEYWORDS:
      return {
        state: action.payload,
      };
      break;

    case actionTypes.REMOVE_SEARCH_KEYWORDS:
      return {
        state: action.payload,
      };
      break;

    default:
      return state;
      break;
  }
};

export default searchReducer;
