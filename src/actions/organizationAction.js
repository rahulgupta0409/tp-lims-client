import { requestHelper } from "../requestHelper";
import { API_URL, headers } from "../utils/constants";
import { SET_ALL_ORGANIZATION } from "./actionTypes";

const setAllOrganization = (payload) => {
  return {
    type: SET_ALL_ORGANIZATION,
    payload: payload,
  };
};

export const getAllOrganization = (callback) => {
  return (dispatch) =>
    requestHelper.getRequest({
      url: `${API_URL}/organization/getAllOrganizations`,
      headers: new Headers({
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
      onSuccess: (res) => {
        dispatch(setAllOrganization(res));
        callback && callback(res);
      },
      onError: (res) => {
        callback && callback(res);
      },
    });
};