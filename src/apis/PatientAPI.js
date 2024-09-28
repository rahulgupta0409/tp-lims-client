import { getJwtToken } from "../utils/token";
import { getCookie } from "../utils/cookies";
import { dateRange } from "../utils/dateRange";

export async function ADD_NEW_PATIENT(payLoad) {
  const {
    firstName,
    lastName,
    age,
    phoneNumber,
    emailId,
    labTestIds,
    orgId,
    doctorId,
    isUpi,
    isOutSampled,
    totalAmount,
    discount,
    paidAmount,
    dueAmount,
    gender,
  } = payLoad;
  let data;

  try {
    const token = await getJwtToken().then((v) => v);
    let createdBy = await getCookie("user");

    const response = await fetch(
      `http://localhost:8091/v1/patient/addPatient`,
      {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          age,
          phoneNumber,
          emailId,
          labTestIds,
          orgId,
          doctorId,
          isUpi,
          isOutSampled,
          totalAmount,
          discount,
          paidAmount,
          dueAmount,
          createdBy,
          gender,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    data = await response.json();
  } catch (error) {
    console.error("Error during fetch:", error);
  }

  return data;
}

export async function GET_ALL_PATIENTS() {
  let data;
  try {
    const token = await getJwtToken().then((v) => v);

    const response = await fetch(
      "http://localhost:8091/v1/patient/getAllPatients",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    data = await response.json();
  } catch (error) {}

  return data;
}

export async function GET_ALL_PATIENTS_BY_DATE_RANGE(startDate, endDate) {
  let data;
  let startDateIST;
  let endDateIST;
  if (startDate != endDate) {
    startDateIST = dateRange(startDate, 0);
    endDateIST = dateRange(endDate, 0);
  } else {
    startDateIST = dateRange(startDate, 0);
    endDateIST = dateRange(endDate, 1);
  }

  try {
    const token = await getJwtToken().then((v) => v);

    const response = await fetch(
      `http://localhost:8091/v1/patient/getAllPatientsByDateRange?startDate=${startDateIST}&endDate=${endDateIST}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    data = await response.json();
  } catch (error) {}
  console.log("startDateIST", startDateIST);

  return data;
}

export async function GET_ALL_PATIENTS_BY_SEARCH(searchQuery) {
  let data;

  try {
    const token = await getJwtToken().then((v) => v);

    const response = await fetch(
      `http://localhost:8091/v1/patient/searchPatients?query=${searchQuery}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    data = await response.json();
  } catch (error) {}

  return data;
}
