import { combineReducers } from "redux"
import authReducer from "./authReducer";

const appReducers = combineReducers({
    authReducer,
})

const rootReducer = (state, action) => {
    return appReducers(state, action);
}

export default rootReducer;