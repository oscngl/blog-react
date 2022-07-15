import * as actionTypes from "./actionTypes";

export const selectTopic = (topic) => {
  return {
    type: actionTypes.SELECT_TOPIC,
    payload: topic,
  };
};

export const deselectTopic = () => {
  return {
    type: actionTypes.DESELECT_TOPIC,
    payload: null,
  };
};
