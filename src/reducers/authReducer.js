import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SET_LOGIN_TOKEN,
} from "../actions/actionTypes";

const initialState = {
  auth: {},
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS: {
      // return { ...state, auth: { ...action.payload } };
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    }
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
}
