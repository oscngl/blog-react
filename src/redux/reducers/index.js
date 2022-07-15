import { combineReducers } from "redux";
import userReducer from "./userReducer";
import topicReducer from "./topicReducer";
import searchReducer from "./searchReducer";

const rootReducers = combineReducers({
  userReducer,
  topicReducer,
  searchReducer,
});

export default rootReducers;
