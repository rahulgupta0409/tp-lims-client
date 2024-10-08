import { requestHelper } from "../requestHelper";
import { API_URL, headers } from "../utils/constants";

export const getAllMajorTest = (callback) => {
  return (dispatch, getState) =>
    requestHelper.getRequest({
      url: `${API_URL}/majortest/getAllMajorTests`,
      headers: new Headers({
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
      onSuccess: (res) => {
        callback && callback(res);
      },
      onError: (res) => {
        callback && callback(res);
      },
    });
};
