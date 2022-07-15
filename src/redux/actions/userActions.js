import * as actionTypes from "./actionTypes";

export const login = (user) => {
  return {
    type: actionTypes.LOGIN,
    payload: user,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
    payload: null,
  };
};
