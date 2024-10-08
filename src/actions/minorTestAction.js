import { requestHelper } from "../requestHelper";
import { API_URL, headers } from "../utils/constants";
import { getCookie } from "../utils/cookies";
import { ADD_MINOR_LAB_TEST, SET_MINOR_TESTS } from "./actionTypes";

const setMinorTest = (payload) => {
  return {
    type: SET_MINOR_TESTS,
    payload: payload,
  };
};

export const getAllMinorTest = (callback) => {
  return (dispatch, getState) =>
    requestHelper.getRequest({
      url: `${API_URL}/minortest/getAllMinorTests`,
      headers: new Headers({
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
      onSuccess: (res) => {
        dispatch(setMinorTest(res));
        callback && callback(res);
      },
      onError: (res) => {
        callback && callback(res);
      },
    });
};

const updateMinorLabTestList = (payload) => {
  return {
    type: ADD_MINOR_LAB_TEST,
    payload: payload,
  };
}

export const addMinorLabTest = (data, callback) => {
  const createdBy = getCookie("user");
  return (dispatch) =>
    requestHelper.postRequest({
      url: `${API_URL}/minortest/getAllMinorTests`,
      headers: new Headers({
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
      body: JSON.stringify({ ...data, createdBy }),
      onSuccess: (res) => {
        dispatch(updateMinorLabTestList(res));
        callback && callback(res);
      },
      onError: (res) => {
        callback && callback(res);
      },
    });
};
