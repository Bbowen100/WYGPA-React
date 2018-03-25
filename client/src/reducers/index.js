import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import courses from "./courses";
import auth from "./auth";

export default combineReducers({
  routerReducer,
  courses,
  auth
});
