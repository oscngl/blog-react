import * as actionTypes from "../actions/actionTypes";
import initialStates from "../initialStates";

const topicReducer = (state = initialStates.topic, action) => {
  switch (action.type) {
    case actionTypes.SELECT_TOPIC:
      return {
        state: action.payload,
      };
      break;

    case actionTypes.DESELECT_TOPIC:
      return {
        state: action.payload,
      };
      break;

    default:
      return state;
      break;
  }
};

export default topicReducer;
