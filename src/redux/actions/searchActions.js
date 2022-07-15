import * as actionTypes from "./actionTypes";

export const setSearchKeywords = (keywords) => {
  return {
    type: actionTypes.SET_SEARCH_KEYWORDS,
    payload: keywords,
  };
};

export const removeSearchKeywords = () => {
  return {
    type: actionTypes.REMOVE_SEARCH_KEYWORDS,
    payload: null,
  };
};
