import { getJwtToken } from "../utils/token";

export async function ADD_MAJOR_LAB_TEST(
  majorTestName,
  majorTestPrice,
  minorLabTestList,
  majorTestRemarks
) {
  let data;

  try {
    const token = await getJwtToken().then((v) => v);

    const response = await fetch(
      `http://localhost:8091/v1/majortest/addMajorLabTest`,
      {
        method: "POST",
        body: JSON.stringify({
          majorTestName,
          majorTestPrice,
          minorLabTestList,
          majorTestRemarks,
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

export async function GET_ALL_MAJOR_LAB_TESTS() {
  let data;
  try {
    const token = await getJwtToken().then((v) => v);

    const response = await fetch(
      "http://localhost:8091/v1/majortest/getAllMajorTests",
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
