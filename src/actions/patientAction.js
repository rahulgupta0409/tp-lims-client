import { requestHelper } from "../requestHelper";
import { API_URL, headers } from "../utils/constants";
import { dateRange } from "../utils/dateRange";
import { SET_ALL_PATIENTS, SET_PATIENT_TEST_DETAIL } from "./actionTypes";

export const setPatientTestDetail = (payload) => {
  return {
    type: SET_PATIENT_TEST_DETAIL,
    payload: payload,
  };
};

const setAllPatients = (payload) => {
  return {
    type: SET_ALL_PATIENTS,
    payload: payload,
  };
};

export const getAllPatientsListByDate = (startDate, endDate, callback) => {
  let startDateIST;
  let endDateIST;
  if (startDate != endDate) {
    startDateIST = dateRange(startDate, 0);
    endDateIST = dateRange(endDate, 0);
  } else {
    startDateIST = dateRange(startDate, 0);
    endDateIST = dateRange(endDate, 1);
  }
  return (dispatch) =>
    requestHelper.getRequest({
      url: `${API_URL}/patient/getAllPatientsByDateRange?startDate=${startDateIST}&endDate=${endDateIST}`,
      headers: new Headers({
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
      onSuccess: (res) => {
        dispatch(setAllPatients(res));
        callback && callback(res);
      },
      onError: (res) => {
        callback && callback(res);
      },
    });
};

export const updatePatientTestDetails = (
  patientId,
  testId,
  value,
  callback
) => {
  return (dispatch) =>
    requestHelper.putRequest({
      url: `${API_URL}/patient/updateTest/${patientId}/tests/${testId}?value=${value}`,
      headers: new Headers({
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
      onSuccess: (res) => {
        dispatch(setPatientTestDetail({ patientId, testId, value }));
        callback && callback(res);
      },
      onError: (res) => {
        callback && callback(res);
      },
    });
};
