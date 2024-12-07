import { requestHelper } from "../requestHelper";
import { API_URL, headers } from "../utils/constants";
import { setCookie } from "../utils/cookies";
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOADING,
} from "./actionTypes";

const setLoginSession = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload: payload,
  };
};

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginSuccessAsync = (data, callback) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    requestHelper.postRequest({
      url: `${API_URL}/auth/signin`,
      headers: new Headers(headers),
      body: JSON.stringify(data),
      onSuccess: (res) => {
        localStorage.setItem("token", res.token, { expires: 1 });
        localStorage.setItem("loginSuccess", "true");
        setCookie("__rT", res.refreshToken, { expires: 7 });
        setCookie("user", res.user.fullName);
        dispatch(
          setLoginSession({
            ...res,
            headers: { ...headers, Authorization: `Bearer ${res.token}` },
          })
        );
        callback && callback(res);
      },
    });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const signupSuccessAsync = (data, callback) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING,
      payload: true,
    });
    requestHelper.postRequest({
      url: `${API_URL}/auth/signup`,
      headers: new Headers(headers),
      body: JSON.stringify(data),
      onSuccess: (res) => {
        dispatch();
        callback && callback(res);
      },
    });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};
