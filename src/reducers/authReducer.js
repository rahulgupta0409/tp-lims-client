import { LOGIN_SUCCESS, SET_LOGIN_TOKEN } from "../actions/actionTypes";

const initialState = {
    auth: {}
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            return { ...state, auth: { ...action.payload } }
        }
        default:
            return state;
    }
}