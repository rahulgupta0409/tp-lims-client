import { requestHelper } from "../requestHelper";
import { API_URL, headers } from "../utils/constants";
import { SET_ALL_DOCTORS } from "./actionTypes";

const setAllDoctors = (payload) => {
  return {
    type: SET_ALL_DOCTORS,
    payload: payload,
  };
};

export const getAllDoctors = (callback) => {
  return (dispatch) =>
    requestHelper.getRequest({
      url: `${API_URL}/doctors/getAllDoctors`,
      headers: new Headers({
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
      onSuccess: (res) => {
        dispatch(setAllDoctors(res));
        callback && callback(res);
      },
      onError: (res) => {
        callback && callback(res);
      },
    });
};