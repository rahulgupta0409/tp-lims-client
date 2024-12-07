import { combineReducers } from "redux";
import authReducer from "./authReducer";
import majorTest from "./majorTest";
import minorTest from "./minorTest";
import doctors from "./doctor";
import patients from "./patients";

const appReducers = combineReducers({
  authReducer,
  majorTest,
  minorTest,
  doctors,
  patients,
});

const rootReducer = (state, action) => {
  return appReducers(state, action);
};

export default rootReducer;
