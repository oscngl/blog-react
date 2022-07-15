import * as actionTypes from "../actions/actionTypes";
import initialStates from "../initialStates";

const userReducer = (state = initialStates.user, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        state: action.payload,
      };
      break;

    case actionTypes.LOGOUT:
      return {
        state: action.payload,
      };
      break;

    default:
      return state;
      break;
  }
};

export default userReducer;