import { getJwtToken } from "../utils/token";

export async function ADD_NEW_PATIENT(
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
  dueAmount
) {
  let data;

  try {
    const token = await getJwtToken().then((v) => v);

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
