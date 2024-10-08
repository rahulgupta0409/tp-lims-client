import { requestHelper } from "../requestHelper";
import { API_URL, headers } from "../utils/constants";
import { getCookie } from "../utils/cookies";
import { ADD_MAJOR_LAB_TEST, SET_MAJOR_TESTS } from "./actionTypes";

const setMajorTest = (payload) => {
  return {
    type: SET_MAJOR_TESTS,
    payload: payload,
  };
};

export const getAllMajorTest = (callback) => {
  return (dispatch, getState) =>
    requestHelper.getRequest({
      url: `${API_URL}/majortest/getAllMajorTests`,
      headers: new Headers({
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
      onSuccess: (res) => {
        dispatch(setMajorTest(res));
        callback && callback(res);
      },
      onError: (res) => {
        callback && callback(res);
      },
    });
};

const updateMajorLabTestList = (payload) => {
  return {
    type: ADD_MAJOR_LAB_TEST,
    payload: payload,
  };
}

export const addMajorLabTest = (data, callback) => {
  const createdBy = getCookie("user");
  return (dispatch) =>
    requestHelper.postRequest({
      url: `${API_URL}/majortest/addMajorLabTest`,
      headers: new Headers({
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
      body: JSON.stringify({ ...data, createdBy }),
      onSuccess: (res) => {
        dispatch(updateMajorLabTestList(res));
        callback && callback(res);
      },
      onError: (res) => {
        callback && callback(res);
      },
    });
};
